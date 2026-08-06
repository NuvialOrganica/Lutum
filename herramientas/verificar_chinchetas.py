# -*- coding: utf-8 -*-
"""Dibuja las chinchetas sobre el mapa para comprobarlas a ojo.

Las coordenadas se sacan de `web/src/data/lugares.ts`, que es la única
fuente: si se copiasen a un JSON aparte, tarde o temprano dejarían de
coincidir y esta herramienta diría que todo está bien mintiendo.

    python herramientas/verificar_chinchetas.py

Deja el resultado en `herramientas/_chinchetas.png` (no se versiona).
"""
from PIL import Image, ImageDraw
import io, re, sys

RAIZ = 'web/src/data/lugares.ts'
MAPA = 'Assets/mapa.jpeg'
SALIDA = 'herramientas/_chinchetas.png'

fuente = io.open(RAIZ, encoding='utf-8').read()

# Cada lugar declara slug, x e y; el orden dentro del objeto es estable.
patron = re.compile(
    r"slug:\s*'([a-z0-9-]+)'.*?\bx:\s*([\d.]+).*?\by:\s*([\d.]+)",
    re.S,
)
puntos = patron.findall(fuente)
if not puntos:
    sys.exit('no se ha encontrado ningún lugar en ' + RAIZ)

im = Image.open(MAPA).convert('RGB')
d = ImageDraw.Draw(im)
W, H = im.size
ROSA = (255, 40, 140)

for i, (slug, sx, sy) in enumerate(puntos):
    x, y = int(float(sx) * W), int(float(sy) * H)
    r = 14
    d.ellipse([x - r, y - r, x + r, y + r], outline=ROSA, width=5)
    d.line([x - r - 8, y, x + r + 8, y], fill=ROSA, width=3)
    d.line([x, y - r - 8, x, y + r + 8], fill=ROSA, width=3)
    d.text((x + r + 6, y - 8), '%d %s' % (i, slug), fill=(255, 255, 0))

im.save(SALIDA)
print('%d chinchetas sobre %dx%d -> %s' % (len(puntos), W, H, SALIDA))
