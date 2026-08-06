# LUTUM · Plan de construcción

> Web lore-wiki **100% pixel art** del mundo de Cristina.
> Astro 5 → GitHub Pages. Marca `[x]` según avanzamos.
>
> Documento hermano: [GUIA.md](GUIA.md) (arquitectura, reglas de estilo y lista de assets).

---

## 0 · Decisiones (cerradas el 6 ago 2026)

- [x] **D1 — `/lugares` SÍ entra.** El overworld explorable cubre los 11 lugares del vault y de ahí sale la pantalla de título.
- [x] **D2 — La portada arranca con "PULSA ENTER" pero SÍ se puede bajar con scroll.** Debajo del título van el perfil del mundo y la receta divina, tal y como pidió Cristina. Da igual el SEO. Las demás pantallas (`/panteon`, `/codice`, `/cronica`, `/lugares`) sí son pantalla completa sin scroll de página; ahí el scroll sólo existe *dentro* de los paneles, con barra pixel.
- [x] **D3 — El objeto de la crónica es, de momento, un cubo negro plano.** Provisional a propósito. Lo dibujo yo, no hay que generarlo.
- [x] **D4 — Kintsugi fuera.** No entra.
- [x] **D5 — Repo y URL ya fijados.** El repositorio es **`github.com/NuvialOrganica/Lutum`**. Por tanto:
  ```js
  // astro.config.mjs
  site: 'https://nuvialorganica.github.io',
  base: '/Lutum',          // ← con L mayúscula, igual que el repo
  ```
  Todas las rutas de imagen con `import.meta.env.BASE_URL`. Acceso: Cristina pasará un **token** (no se guarda en ningún archivo del repo; se mete en el gestor de credenciales de Windows).
  En Pages hay que cambiar *Source* de «Deploy from a branch» a **«GitHub Actions»**, pero sólo se puede después del primer push (ahora el repo está vacío y Pages sale deshabilitado).

### Los 4 objetos-portal

La navegación es diegética: no hay menú, hay objetos flotando. Aparecen al final de la portada y también dentro de `/panteon`.

| Objeto | Lleva a | Estado |
|---|---|---|
| 🔨 Martillo de forja sobre yunque | `/panteon` | pedir a Cristina |
| 🔭 Telescopio de latón | `/codice` | pedir a Cristina |
| 🗺️ Pergamino enrollado | `/lugares` | pedir a Cristina |
| ⬛ Cubo negro plano | `/cronica` | **provisional a propósito**, lo dibujo yo |

---

## 1 · FASE 0 — Datos (lo primero, todo lo demás depende de esto)

- [ ] Crear repo `lutum` y el proyecto Astro base (`npm create astro@latest`)
- [ ] Copiar las 36 notas del vault a `src/content/`
- [ ] Añadir frontmatter YAML a las **13 deidades** (hoy los datos están en negritas dentro del texto)
- [ ] Añadir frontmatter YAML a los **11 lugares**
- [ ] Añadir frontmatter YAML a los **11 hechos históricos**
- [ ] Normalizar nombres duplicados: `Zarath`/`Zaarath`, `Arténica`/`Cladípolis`
- [ ] Convertir los `[[enlaces]]` de Obsidian en referencias tipadas
- [ ] Marcar como `estado: pendiente` las 4 entradas vacías (año 372, Verdantia, San Roque, Los Alcantarillados) — **se publican, no se ocultan**
- [ ] Escribir `src/content/config.ts` con los esquemas Zod
- [ ] Añadir los campos nuevos que no existen en el vault: `stats` (poder/caos/culto/huella), `iconos`, `ilustracion`, `orden`

## 2 · FASE 1 — Sistema de diseño pixel

- [ ] Fijar la **paleta de 16 colores** como variables CSS (ver GUIA)
- [ ] Autoalojar `Press Start 2P` y `VT323` en `public/fonts/` (comprobado: Press Start 2P sí tiene ñ y acentos)
- [ ] `src/styles/pixel.css`: reset + rejilla de 4px + `image-rendering:pixelated` global
- [ ] Componente `PxFrame.astro` — el marco de panel de 4px con esquinas de píxel
- [ ] Componente `PxButton.astro` — botón con sombra dura y estado `:active` hundido
- [ ] Componente `PxBar.astro` — barra de atributo por bloques
- [ ] Componente `PxDialog.astro` — cuadro de diálogo con máquina de escribir
- [ ] Utilidad `steps()` para TODAS las transiciones (nada de easing suave)
- [ ] Soporte `prefers-reduced-motion`
- [ ] Transición entre páginas tipo "cortina de píxeles" con View Transitions

## 3 · FASE 2 — Portada `/`

- [ ] Pantalla de consola: planeta pixel + `LUTUM` + `EL MUNDO DE BARRO` + `PULSA ENTER`
- [ ] Estrellas de fondo animadas (canvas a baja resolución)
- [ ] Efecto CRT: scanlines + viñeta + ligera aberración
- [ ] Al entrar/bajar → bloque **Perfil del mundo**: los 6 ejes en tarjetas pixel
- [ ] Bloque **La receta divina**: la tabla sentimiento + objeto + parte, en versión pixel
- [ ] Bloque **La estantería de Cladis**: los 4 objetos-portal flotantes
- [ ] Pie con contadores (13 deidades / 11 hechos / 11 lugares)

## 4 · FASE 3 — Panteón `/panteon` *(la pantalla principal)*

- [ ] Órbita: el planeta en el centro y las 13 deidades girando
- [ ] Arrastrar para girar la rueda + inercia
- [ ] **Hover en cualquier dios → apodo + año de nacimiento** (como ya hace Cladis) ← pedido explícito
- [ ] Sprites pixel de cada deidad en la órbita (símbolo, 16×16 escalado ×3)
- [ ] Click → panel derecha que se abre con animación de pasos
- [ ] Panel: **ILUSTRACIÓN** del dios arriba (imagen grande) ← pedido explícito
- [ ] Panel: nombre + título + insignia de alineamiento
- [ ] Panel: **CRÓNICA** (texto)
- [ ] Panel: **ATRIBUTOS** (4 barras: poder, caos, culto, huella)
- [ ] Panel: **ORIGEN** (sentimiento + objeto + parte, con icono cada uno)
- [ ] Panel: **VÍNCULOS** (botones a otros dioses)
- [ ] Filtro por alineamiento
- [ ] **Caso especial Lunaris**: dentro de su ficha, la *Cámara del Veredicto* ← pedido explícito
- [ ] Objeto flotante **telescopio** → lleva a `/codice` ← pedido explícito
- [ ] Objeto flotante **clepsidra** → lleva a `/cronica` ← pedido explícito
- [ ] Objeto flotante **mapa** → lleva a `/lugares` (si D1 = sí)
- [ ] Ficha a pantalla completa `/deidad/[slug]` para enlace directo

## 5 · FASE 4 — Códice `/codice`

- [ ] Mapa de constelaciones en canvas, versión pixel (estrellas de 2×2 y 3×3 px)
- [ ] 43 nodos + 65 vínculos ya definidos
- [ ] Líneas de constelación con trazado a píxel (Bresenham, nada de antialias)
- [ ] Arrastrar / zoom por enteros (×1, ×2, ×3)
- [ ] Panel lateral pixel con la ficha del nodo
- [ ] Buscador con teclado
- [ ] Filtros por tipo (deidad / lugar / hecho / mortal)
- [ ] Voz de La Relatora en máquina de escribir

## 6 · FASE 5 — Crónica `/cronica`

- [ ] Scroll horizontal con 5 capas de parallax, todo pixel
- [ ] Cielo interpolado entre eras
- [ ] **Cuadros flotantes**: una imagen por fecha histórica, sin tapar la escena ← pedido explícito
- [ ] 11 escenas dibujadas (mundo vacío → cosecha → parque → hueco 372 → ojo → bosque → mar → ciudad → guerra → estrellas → abismo)
- [ ] Línea de tiempo inferior clicable
- [ ] Panel de evento con marco pixel
- [ ] Navegación con teclado y con la rueda

## 7 · FASE 6 — Lugares `/lugares` *(si D1 = sí)*

- [ ] Mapa de tiles explorable con personaje
- [ ] 12 lugares con su estructura pixel
- [ ] Diálogo RPG con pestañas
- [ ] Diario de descubrimientos + minimapa
- [ ] Controles táctiles para móvil (cruceta en pantalla)
- [ ] Enlace de cada lugar a su ficha larga

## 8 · FASE 7 — Assets

> Flujo: yo monto una **página HTML de referencia** con el hueco al tamaño exacto y el prompt al lado → Cristina lo genera con ChatGPT → lo dejamos en `public/assets/`.

- [x] Montar `ASSETS.html` con los 31 assets, sus prompts y marcador de progreso
- [ ] **Tanda 1 · 13 ilustraciones de deidad** (bloquea la Fase 3)
- [x] **Tanda 2 · objetos-portal**: martillo, telescopio y pergamino ✓ recibidos y procesados
- [x] **Tanda 3 · 11 cuadros de suceso histórico** ✓ recibidos y procesados
- [x] **Tanda 4 · extras**: cursor, favicon y 2 nebulosas ✓ recibidos y procesados
- [ ] Iconos de origen (sentimiento/objeto/parte) — **los dibujo yo**, no hacen falta de ChatGPT
- [ ] Recuperar las 4 `Pasted image ...png` que el vault referencia y no están
- [x] Pipeline `herramientas/pixelizar.py` escrito y verificado: **41,6 MB → 543 KB (-99 %)**
- [ ] Atlas de iconos (cuando existan los iconos)

## 9 · FASE 8 — Astro y despliegue

- [ ] `astro.config.mjs` con `site` y `base` correctos
- [ ] Rutas dinámicas `/deidad/[slug]`, `/lugar/[slug]`, `/historia/[anio]`
- [ ] Workflow de GitHub Actions con `withastro/action`
- [ ] Activar Pages en el repo, rama `gh-pages` o artefacto
- [ ] Comprobar que todas las rutas de imagen usan `import.meta.env.BASE_URL`
- [ ] `404.astro` en pixel art
- [ ] Meta tags + Open Graph con el planeta

## 10 · FASE 9 — Pulido

- [ ] Móvil: todas las pantallas usables en vertical
- [ ] Sonido opcional (blips de menú), con interruptor y apagado por defecto
- [ ] Kintsugi en el bloque «la humanidad está restaurada» (si D4 = sí)
- [ ] Estados vacíos bonitos para las 4 entradas pendientes
- [ ] Revisión de contraste y tamaños de texto (las fuentes pixel cansan a tamaño pequeño)
- [ ] Prueba en Chrome, Firefox y móvil real
- [ ] Lighthouse ≥ 95 en rendimiento

---

## Orden real de trabajo (lo que haremos primero)

1. **FASE 1** (sistema de diseño) y **FASE 2** (portada) — se puede empezar ya, sin assets.
2. **FASE 7 tanda 1** en paralelo — pedir las 13 ilustraciones cuanto antes porque bloquean lo más importante.
3. **FASE 3** (panteón) en cuanto lleguen las ilustraciones.
4. **FASE 0** (datos) se puede ir haciendo en paralelo; mientras tanto trabajamos con un JSON provisional.
5. Luego 4, 5, 6 y por último 8 y 9.

> El primer entregable será un **HTML único** (`lutum-v1.html`) con la portada y el panteón funcionando, para verlo rápido sin montar Astro. Cuando el diseño esté aprobado, se parte en componentes Astro.
