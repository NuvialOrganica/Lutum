# LUTUM

Enciclopedia del mundo de rol **Lutum**, en pixel art.

🌐 **https://nuvialorganica.github.io/Lutum/**

---

## Qué hay aquí

```
web/            el sitio (Astro 5, salida estática)
herramientas/   pixelizar.py — convierte los PNG de IA en pixel art de verdad
PLAN.md         checklist de construcción, por fases
GUIA.md         arquitectura, paleta, reglas de estilo y lista de assets
ASSETS.html     los assets que hacen falta, con sus prompts (abrir con doble clic)
```

## Para trabajar en la web

```bash
cd web
npm install
npm run dev      # http://localhost:4321/Lutum/
npm run build    # genera web/dist/
```

## Para añadir imágenes nuevas

Los PNG que salen de ChatGPT son «estilo pixel art»: llevan antialiasing, miles
de colores y pesan megas. Hay que pasarlos por el conversor antes de usarlos.

1. Deja los originales en una carpeta `Assets/` en la raíz (no va al repo, pesa demasiado).
2. Ejecuta:

```bash
python herramientas/pixelizar.py --solo deidades --revisar
```

Eso los baja a su resolución lógica, limpia los bordes, reduce la paleta y los
deja en `web/public/assets/`. En la última tanda: **41,6 MB → 543 KB**.

Con `--revisar` genera además una hoja de contacto ampliada para mirar el
resultado a ojo antes de darlo por bueno.

## Despliegue

Automático: cada push a `main` dispara la acción de `.github/workflows/deploy.yml`,
que compila `web/` y publica en GitHub Pages.

> **Sólo la primera vez:** en *Settings → Pages*, poner **Source = «GitHub Actions»**.
> Hasta que no haya contenido en el repo, esa opción aparece deshabilitada.

## Reglas del diseño

Están en [GUIA.md](GUIA.md), pero las tres que más se notan:

- **Rejilla de 4 px.** Todo tamaño, margen y desplazamiento es múltiplo de 4.
- **Escalado sólo por enteros.** Los sprites van a ×1, ×2, ×3. Nunca a ×1,5.
- **Animación por pasos.** Todas las transiciones con `steps()`. Un movimiento
  suave delata al instante que no es pixel art de verdad.
