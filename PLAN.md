# LUTUM · Plan de construcción

> Web lore-wiki **100% pixel art** del mundo de Cristina.
> Astro 5 → GitHub Pages. Marca `[x]` según avanzamos.
>
> Documento hermano: [GUIA.md](GUIA.md) (arquitectura, reglas de estilo y lista de assets).

---

## 0 · Decisiones (cerradas el 6 ago 2026)

- [x] **D1 — `/lugares` SÍ entra.** El overworld explorable cubre los 11 lugares del vault y de ahí sale la pantalla de título.
- [x] **D2 — La portada arranca con "PULSA ENTER" pero SÍ se puede bajar con scroll.** Debajo del título van el perfil del mundo y la receta divina, tal y como pidió Cristina. Da igual el SEO. Las demás pantallas (`/panteon`, `/codice`, `/cronica`, `/lugares`) sí son pantalla completa sin scroll de página; ahí el scroll sólo existe *dentro* de los paneles, con barra pixel.
- [x] **D3 — El objeto de la crónica es un reloj de arena agrietado con arena rosa.** El cubo negro plano cumplió su función: en cuanto Cristina lo vio, decidió. Ya está generado y montado.
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
| ⏳ Reloj de arena agrietado | `/cronica` | ✓ generado y montado |

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

- [x] Fijar la **paleta de 16 colores** como variables CSS → `src/styles/paleta.css`
- [x] Autoalojar `Press Start 2P` y `VT323` en `public/fonts/` (30 KB; comprobado que la primera tiene ñ y acentos)
- [x] `src/styles/pixel.css`: reset + rejilla de 4px + `image-rendering:pixelated` global
- [x] Marco pixel `.marco` — esquinas mordidas sólo con `box-shadow`, sin imágenes. Se resolvió como clase, no como componente: se usa en cualquier etiqueta y no obliga a envolver nada
- [ ] Componente `PxButton.astro` — botón con sombra dura y estado `:active` hundido *(de momento resuelto ad hoc en cada sitio)*
- [ ] Componente `PxBar.astro` — barra de atributo por bloques
- [ ] Componente `PxDialog.astro` — cuadro de diálogo con máquina de escribir
- [x] Todas las transiciones y animaciones con `steps()`
- [x] Soporte `prefers-reduced-motion` + interruptor del CRT que se recuerda
- [ ] Transición entre páginas tipo "cortina de píxeles" con View Transitions

## 3 · FASE 2 — Portada `/`

- [x] Pantalla de consola: planeta pixel + `LUTUM` + `EL MUNDO DE BARRO` + `PULSA ENTER` (que funciona de verdad)
- [x] Estrellas de fondo animadas a 1/4 de resolución y 12 fps. El lienzo se mide del hueco real: fijarlo a 320×180 hacía que en ventanas estrechas los píxeles salieran rectangulares
- [x] Efecto CRT: scanlines + viñeta, con interruptor
- [x] Bloque **Perfil del mundo**: los 6 ejes en tarjetas pixel
- [x] Bloque **La receta divina**: fórmula de crafteo + tabla de los nueve accidentes
- [x] Bloque **La estantería de Cladis**: los 4 objetos-portal flotantes
- [x] Pie con contadores

## 4 · FASE 3 — Panteón `/panteon` *(la pantalla principal)*

- [x] Órbita: Cladis (el planeta) en el centro y las otras 12 girando a su alrededor
- [x] Arrastrar para girar la rueda + inercia. Gira a 12 fps y redondeando a píxel entero: a 60 fps suaves los sigilos caían en medios píxeles y salían borrosos
- [x] **Hover en cualquier dios → nombre, apodo y año** ← pedido explícito de Cristina
- [x] 13 sigilos 16×16 dibujados a mano, a ×3 en la rueda. Se generan como SVG en compilación (cero JS, cero peticiones)
- [x] Click → cajón derecho con animación de pasos. Las 13 fichas van pre-renderizadas en el HTML: se leen sin JavaScript
- [x] Panel: **ILUSTRACIÓN** arriba, con marcador de RETRATO PENDIENTE mientras no llegue el PNG
- [x] Panel: nombre + título + insignias de alineamiento y año
- [x] Panel: **CRÓNICA**
- [x] Panel: **ATRIBUTOS**, 4 barras de 10 bloques
- [x] Panel: **ORIGEN** con un icono pixel propio para cada casilla (16 iconos dibujados a mano, reutilizados con distinta paleta)
- [x] Panel: **VÍNCULOS**, saltan de una ficha a otra sin recargar
- [x] Filtro por alineamiento
- [x] **Caso especial Lunaris**: la *Cámara del Veredicto* dentro de su ficha, con las fases girando a saltos ← pedido explícito
- [x] Objeto flotante **telescopio** → `/codice` ← pedido explícito
- [x] Objeto flotante **cubo negro** → `/cronica` (provisional, como se acordó)
- [x] Objeto flotante **pergamino** → `/lugares`
- [x] Ficha a pantalla completa en `/deidad/[slug]` (13 páginas) y enlace directo con `/panteon/#slug`

## 5 · FASE 4 — Códice `/codice`

- [x] Mapa de constelaciones en canvas a 1/3 de resolución: estrellas de cuatro puntas dibujadas con rectángulos enteros
- [x] 43 nodos + 65 vínculos. Las 13 deidades se leen de `deidades.ts`, no se duplican
- [x] Líneas con Bresenham, punteadas las apagadas y sólidas las de la constelación activa
- [x] Arrastrar y zoom con la rueda. El reparto se calcula una vez con semilla fija: el mismo cielo siempre, y nada se mueve solo
- [x] Panel lateral con ficha, datos, susurro de La Relatora y saltos a los vecinos
- [x] Buscador con sugerencias
- [x] Filtros por tipo, y un índice completo desplegable que además sirve sin JavaScript
- [x] Voz de La Relatora en cada ficha

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
- [ ] **Tanda 1 · 13 ilustraciones de deidad** — ya NO bloquea: el panteón funciona con marcador y las imágenes se enchufan soltándolas en `Assets/` y corriendo el script
- [x] **Tanda 2 · objetos-portal**: martillo, telescopio, pergamino y reloj ✓ los cuatro recibidos y procesados
- [x] **Tanda 3 · 11 cuadros de suceso histórico** ✓ recibidos y procesados
- [x] **Tanda 4 · extras**: cursor, favicon y 2 nebulosas ✓ recibidos y procesados
- [ ] Iconos de origen (sentimiento/objeto/parte) — **los dibujo yo**, no hacen falta de ChatGPT
- [ ] Recuperar las 4 `Pasted image ...png` que el vault referencia y no están
- [x] Pipeline `herramientas/pixelizar.py` escrito y verificado: **41,6 MB → 543 KB (-99 %)**
- [ ] Atlas de iconos (cuando existan los iconos)

## 9 · FASE 8 — Astro y despliegue

- [x] `astro.config.mjs` con `site` y `base` correctos (verificado: todas las rutas del build llevan `/Lutum/`)
- [ ] Rutas dinámicas `/deidad/[slug]`, `/lugar/[slug]`, `/historia/[anio]`
- [x] Workflow de GitHub Actions con `withastro/action` — **el job de construir ya pasa en verde**
- [ ] ⚠️ **BLOQUEADO — lo tiene que hacer Cristina:** *Settings → Pages → Source = «GitHub Actions»*. Yo soy colaborador, no admin, y por API da 404. El job de desplegar se queda en cola hasta que lo active
- [x] Todas las rutas pasan por `src/lib/rutas.ts` (`url()` y `pagina()`)
- [x] `404.astro` en pixel art
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
