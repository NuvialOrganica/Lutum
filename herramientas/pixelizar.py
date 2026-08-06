#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
pixelizar.py — convierte los assets generados por IA en pixel art de verdad.

Las imágenes que salen de ChatGPT son «estilo pixel art»: tienen antialiasing,
miles de colores y una resolución enorme. Para la web eso es un problema doble:
pesan muchísimo y, al escalarlas, se ven borrosas en vez de nítidas.

Este script hace tres cosas por cada imagen:

  1. La baja a su RESOLUCIÓN LÓGICA real (la rejilla de píxeles que queremos),
     con filtro de área y premultiplicando el alfa para que los bordes no se
     ensucien de negro.
  2. Recorta el alfa a binario (0 o 255). En pixel art no existen los píxeles
     medio transparentes.
  3. Reduce la paleta a N colores sin difuminado, y guarda PNG indexado.

Resultado: de ~2,5 MB por imagen a ~20-60 KB, y por fin nítida al escalar.

Uso:
    python herramientas/pixelizar.py                 # procesa todo
    python herramientas/pixelizar.py --solo deidades # sólo un grupo
    python herramientas/pixelizar.py --listar        # ver qué haría
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

from PIL import Image, ImageChops

RAIZ = Path(__file__).resolve().parent.parent
ENTRADA = RAIZ / "Assets"
SALIDA = RAIZ / "web" / "public" / "assets"

# ---------------------------------------------------------------------------
# Configuración por grupo.
#   res     = resolución lógica de arte (el tamaño real en píxeles «gordos»)
#   colores = tamaño de la paleta
#   alfa    = si conserva transparencia
#   destino = subcarpeta dentro de public/assets/
#
# Regla de oro: la resolución de arte se elige para que el tamaño en pantalla
# sea un múltiplo ENTERO de ella. 192 de arte mostrado a 384 px = x2 exacto.
# ---------------------------------------------------------------------------
GRUPOS = {
    "deidades": {
        "res": (192, 192), "colores": 48, "alfa": True, "destino": "deidades",
        "patron": ["cladis", "egon", "lunaris", "armonia", "miraxis", "valther",
                   "vigilis", "arbo", "lydara", "zax", "zarath", "litt", "relatora"],
        "nota": "se muestran a 384 px (x2)",
    },
    "objetos": {
        "res": (128, 128), "colores": 32, "alfa": True, "destino": "objetos",
        "patron": ["martillo", "telescopio", "pergamino"],
        "nota": "se muestran a 256 px (x2)",
    },
    "historia": {
        "res": (192, 144), "colores": 48, "alfa": False, "destino": "historia",
        "patron": ["a0", "a138", "a367", "a372", "a501", "a612",
                   "a708", "a738", "a978", "a1103", "a1176"],
        "nota": "cuadros flotantes, 384x288 en pantalla (x2)",
    },
    "fondos": {
        "res": (480, 480), "colores": 64, "alfa": False, "destino": "fondos",
        "patron": ["fondo pixel art", "nebulosa-fria", "nebulosa-calida"],
        "renombrar": {"fondo pixel art": "fondo"},
        "nota": "de fondo, se estiran a pantalla completa",
    },
    "planeta": {
        "res": (256, 256), "colores": 64, "alfa": True, "destino": "",
        "patron": ["planeta pixel art"],
        "renombrar": {"planeta pixel art": "planeta"},
        "nota": "el protagonista, se ve grande",
    },
    "ui": {
        "res": (64, 64), "colores": 24, "alfa": True, "destino": "ui",
        "patron": ["favicon", "cursor"],
        "res_por_archivo": {"cursor": (32, 32)},
        "nota": "iconos diminutos",
    },
}


# ---------------------------------------------------------------------------
def premultiplicar(img: Image.Image) -> Image.Image:
    """Multiplica RGB por alfa.

    Sin esto, al reducir una imagen con transparencia el filtro mezcla el color
    de los píxeles invisibles (normalmente negro) y aparece un halo sucio en
    todos los bordes.
    """
    r, g, b, a = img.split()
    return Image.merge("RGBA", (
        ImageChops.multiply(r, a),
        ImageChops.multiply(g, a),
        ImageChops.multiply(b, a),
        a,
    ))


def desmultiplicar_y_binarizar(img: Image.Image, umbral: int = 128) -> Image.Image:
    """Deshace el premultiplicado y deja el alfa en 0 o 255.

    Las dos cosas van juntas y en este orden: hay que dividir por el alfa
    ORIGINAL antes de aplastarlo, o los bordes salen oscuros. En pixel art no
    existen los píxeles medio transparentes, así que después se recorta a
    blanco o negro.
    """
    datos = bytearray(img.tobytes())
    for i in range(0, len(datos), 4):
        a = datos[i + 3]
        if a == 0:
            datos[i] = datos[i + 1] = datos[i + 2] = 0
            continue
        if a < 255:
            for k in range(3):
                v = datos[i + k] * 255 // a
                datos[i + k] = 255 if v > 255 else v
        datos[i + 3] = 255 if a >= umbral else 0
    return Image.frombytes("RGBA", img.size, bytes(datos))


def recortar_a_contenido(img: Image.Image, margen: int = 0) -> Image.Image:
    """Quita el vacío transparente de alrededor para aprovechar la resolución."""
    caja = img.getbbox()
    if caja is None:
        return img
    if margen:
        x0, y0, x1, y1 = caja
        caja = (max(0, x0 - margen), max(0, y0 - margen),
                min(img.width, x1 + margen), min(img.height, y1 + margen))
    return img.crop(caja)


def encajar(img: Image.Image, res: tuple[int, int], con_alfa: bool) -> Image.Image:
    """Reduce a la resolución de arte manteniendo la proporción.

    Con alfa: se centra dentro del lienzo, sin deformar.
    Sin alfa: se recorta al centro para llenar el lienzo entero.
    """
    dw, dh = res
    if con_alfa:
        escala = min(dw / img.width, dh / img.height)
        nw, nh = max(1, round(img.width * escala)), max(1, round(img.height * escala))
        chico = img.resize((nw, nh), Image.BOX)
        lienzo = Image.new("RGBA", res, (0, 0, 0, 0))
        lienzo.paste(chico, ((dw - nw) // 2, (dh - nh) // 2))
        return lienzo
    escala = max(dw / img.width, dh / img.height)
    nw, nh = max(1, round(img.width * escala)), max(1, round(img.height * escala))
    chico = img.resize((nw, nh), Image.BOX)
    izq, arr = (nw - dw) // 2, (nh - dh) // 2
    return chico.crop((izq, arr, izq + dw, arr + dh))


def indexar(img: Image.Image, colores: int, con_alfa: bool) -> Image.Image:
    """Reduce la paleta y devuelve un PNG indexado.

    Sin difuminado a propósito: el dither mete ruido que en pixel art se ve
    como suciedad, no como textura.
    """
    if not con_alfa:
        return img.convert("RGB").quantize(colors=colores, method=Image.MEDIANCUT,
                                           dither=Image.NONE)

    # Con transparencia: se reserva el índice 0 para el vacío.
    mascara = img.split()[3].point(lambda v: 255 if v >= 128 else 0)
    plano = img.convert("RGB").quantize(colors=max(2, colores - 1),
                                        method=Image.MEDIANCUT, dither=Image.NONE)

    paleta = plano.getpalette()[: max(2, colores - 1) * 3]
    idx = plano.load()
    salida = Image.new("P", img.size, 0)
    salida.putpalette([255, 0, 255] + paleta)          # 0 = transparente
    sal, msk = salida.load(), mascara.load()
    for y in range(img.height):
        for x in range(img.width):
            sal[x, y] = 0 if msk[x, y] == 0 else idx[x, y] + 1
    salida.info["transparency"] = 0
    return salida


# ---------------------------------------------------------------------------
def procesar(origen: Path, destino: Path, res, colores, con_alfa) -> dict:
    img = Image.open(origen)
    tam_ini = origen.stat().st_size

    if con_alfa:
        img = img.convert("RGBA")
        img = recortar_a_contenido(img)
        img = premultiplicar(img)
        img = encajar(img, res, True)
        img = desmultiplicar_y_binarizar(img)
    else:
        img = img.convert("RGB")
        img = encajar(img, res, False)

    final = indexar(img, colores, con_alfa)
    destino.parent.mkdir(parents=True, exist_ok=True)
    final.save(destino, optimize=True)

    tam_fin = destino.stat().st_size
    return {
        "res": f"{res[0]}x{res[1]}",
        "colores": len(final.getpalette() or []) // 3,
        "antes": tam_ini,
        "despues": tam_fin,
        "ahorro": 100 - (tam_fin * 100 // max(1, tam_ini)),
    }


def kb(n: int) -> str:
    return f"{n/1024:.0f} KB" if n < 1024 * 1024 else f"{n/1048576:.1f} MB"


def hoja_de_contacto(grupo: str, cfg: dict, dir_out: Path) -> Path | None:
    """Junta todo un grupo en una sola imagen ampliada, para revisarlo de un vistazo.

    Se dibuja sobre un damero para que se vea dónde hay transparencia de verdad
    y dónde hay un halo sucio.
    """
    from PIL import ImageDraw

    rutas = []
    for base in cfg["patron"]:
        nombre = cfg.get("renombrar", {}).get(base, base)
        p = dir_out / cfg["destino"] / f"{nombre}.png"
        if p.is_file():
            rutas.append((nombre, p))
    if not rutas:
        return None

    zoom = 2 if cfg["res"][0] >= 192 else 3
    cw, chh = cfg["res"][0] * zoom, cfg["res"][1] * zoom
    cols = min(4, len(rutas))
    filas = (len(rutas) + cols - 1) // cols
    hoja = Image.new("RGB", (cols * (cw + 12) + 12, filas * (chh + 30) + 12), (16, 6, 20))
    d = ImageDraw.Draw(hoja)

    if cfg["alfa"]:  # damero de fondo
        for y in range(0, hoja.height, 16):
            for x in range(0, hoja.width, 16):
                if (x // 16 + y // 16) % 2 == 0:
                    d.rectangle([x, y, x + 15, y + 15], fill=(38, 16, 40))

    for i, (nombre, p) in enumerate(rutas):
        im = Image.open(p).convert("RGBA")
        im = im.resize((im.width * zoom, im.height * zoom), Image.NEAREST)
        x = 12 + (i % cols) * (cw + 12)
        y = 12 + (i // cols) * (chh + 30)
        hoja.paste(im, (x, y), im)
        d.text((x, y + chh + 6), nombre, fill=(247, 227, 176))

    destino = Path(__file__).resolve().parent / f"revision-{grupo}.png"
    hoja.save(destino)
    return destino


def main() -> int:
    ap = argparse.ArgumentParser(description="Convierte los assets de IA en pixel art real.")
    ap.add_argument("--solo", help="procesar sólo un grupo: " + ", ".join(GRUPOS))
    ap.add_argument("--listar", action="store_true", help="enseñar qué haría, sin tocar nada")
    ap.add_argument("--revisar", action="store_true",
                    help="generar una hoja de contacto ampliada por grupo para revisar el resultado")
    ap.add_argument("--entrada", default=str(ENTRADA))
    ap.add_argument("--salida", default=str(SALIDA))
    args = ap.parse_args()

    dir_in, dir_out = Path(args.entrada), Path(args.salida)
    if not dir_in.is_dir():
        print(f"no encuentro la carpeta de origen: {dir_in}", file=sys.stderr)
        return 2

    grupos = {args.solo: GRUPOS[args.solo]} if args.solo else GRUPOS
    if args.solo and args.solo not in GRUPOS:
        print(f"grupo desconocido. Hay: {', '.join(GRUPOS)}", file=sys.stderr)
        return 2

    total_antes = total_despues = hechos = faltan = 0
    for nombre, cfg in grupos.items():
        print(f"\n\033[95m{nombre.upper()}\033[0m  ({cfg['nota']})")
        for base in cfg["patron"]:
            origen = dir_in / f"{base}.png"
            if not origen.is_file():
                print(f"  · {base:22s} \033[90mfalta, aún no está\033[0m")
                faltan += 1
                continue

            salida_nombre = cfg.get("renombrar", {}).get(base, base)
            res = cfg.get("res_por_archivo", {}).get(base, cfg["res"])
            destino = dir_out / cfg["destino"] / f"{salida_nombre}.png"

            if args.listar:
                print(f"  · {base:22s} -> {destino.relative_to(RAIZ)}  "
                      f"{res[0]}x{res[1]}, {cfg['colores']} colores")
                continue

            r = procesar(origen, destino, res, cfg["colores"], cfg["alfa"])
            total_antes += r["antes"]; total_despues += r["despues"]; hechos += 1
            print(f"  ✓ {salida_nombre:22s} {r['res']:>9s}  {r['colores']:>3d} col  "
                  f"{kb(r['antes']):>8s} -> {kb(r['despues']):>8s}  (-{r['ahorro']}%)")

    if args.revisar and not args.listar:
        print()
        for nombre, cfg in grupos.items():
            ruta = hoja_de_contacto(nombre, cfg, dir_out)
            if ruta:
                print(f"  hoja de revisión -> {ruta.relative_to(RAIZ)}")

    if not args.listar and hechos:
        print(f"\n\033[92m{hechos} imágenes\033[0m  "
              f"{kb(total_antes)} -> \033[92m{kb(total_despues)}\033[0m  "
              f"(-{100 - total_despues*100//max(1,total_antes)}%)")
    if faltan:
        print(f"\033[90m{faltan} pendientes de que las genere Cristina\033[0m")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
