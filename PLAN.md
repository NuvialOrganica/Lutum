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

## 1 · FASE 0 — Datos

> **Se hizo de otra manera.** El vault acabó volcado a módulos TypeScript
> tipados (`src/data/*.ts`) en vez de a colecciones de contenido con Zod. Para
> construir da igual y fue más rápido, pero **queda una decisión abierta**: si
> Cristina va a editar el lore ella misma, editar `.md` con frontmatter es muy
> distinto de editar `.ts`. Ver «Decisión pendiente» al final.

- [x] Repo y proyecto Astro base
- [x] Las 36 notas del vault volcadas a `src/data/` (deidades, códice, crónica, lugares)
- [x] Datos estructurados de las 13 deidades — hoy tipados en TS, no en frontmatter
- [x] Los lugares, ampliados de 11 a **27** con el mapa canónico
- [x] Los 11 hechos históricos, con color de cielo y suelo por era
- [x] `Zarath`/`Zaarath` unificado (en los datos ya sólo existe `zarath`)
- [x] Los `[[enlaces]]` de Obsidian, convertidos en referencias tipadas (`vinculos`)
- [x] Las entradas vacías se marcan y **se publican**, no se ocultan
- [x] Campos nuevos que no existen en el vault: `stats`, `iconos`, `ilustracion`, `orden`
- [ ] `Arténica`/`Cladípolis` y `Estiaria`/`Estelaria` — **esperando a Cristina**,
      son incoherencias reales del lore, no erratas que pueda decidir yo
- [ ] *(opcional)* Pasar a colecciones de contenido si el lore lo va a editar ella

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

- [x] Recorrido horizontal con parallax: estrellas, montañas, suelo y guijarros, cada capa a su velocidad
- [x] Cielo interpolado entre eras, pintado en bandas de 4 px: un degradado continuo en pixel art se ve como suciedad
- [x] **Cuadros flotantes**: los 11 cuadros enmarcados con su placa de año, flotando por delante del paisaje ← pedido explícito de Cristina
- [x] Las 11 eras, del mundo vacío al Abismo. El paisaje es procedural y la ilustración lleva el peso
- [x] Línea de tiempo inferior clicable, con la marca activa resaltada
- [x] Panel de evento con marco pixel y etiquetas
- [x] Rueda, arrastre, flechas, Inicio y Fin. Y sin JavaScript la cronología se lee igual, en vertical

## 7 · FASE 6 — Lugares `/lugares` *(si D1 = sí)*

> **Cambio de rumbo:** iba a ser un mapa de tiles inventado con un personaje que
> camina. Cristina pasó el **mapa canónico del mundo**, así que se descarta la
> geografía inventada: manda el mapa real. Se pixeliza y se le clavan chinchetas.

- [x] Mapa canónico pixelizado (`mapa.jpg`, 385 KB) y servido a tamaño completo
- [x] Lienzo arrastrable y con zoom; las chinchetas se contra-escalan para medir
      siempre lo mismo en pantalla
- [x] **27 lugares** con sus coordenadas verificadas una a una sobre el mapa
- [x] 13 con ficha completa del vault; los otros 14 salen igual, marcados
      «sólo en el mapa» ← los huecos se publican a propósito
- [x] Panel lateral con la ficha, rótulo al pasar por encima y aviso de pendiente
- [x] Índice de los 27, leyenda, contador y botones de zoom
- [x] Enlace profundo (`/lugares/#neblisco`), botón de volver e historial
- [ ] Páginas sueltas `/lugar/[slug]` *(el panel ya cubre el caso; queda para
      cuando haya fichas largas de verdad)*

## 8 · FASE 7 — Assets

> Flujo: yo monto una **página HTML de referencia** con el hueco al tamaño exacto y el prompt al lado → Cristina lo genera con ChatGPT → lo dejamos en `public/assets/`.

- [x] Montar `ASSETS.html` con los 31 assets, sus prompts y marcador de progreso
- [ ] **Tanda 1 · 13 ilustraciones de deidad** — ya NO bloquea: el panteón funciona con marcador y las imágenes se enchufan soltándolas en `Assets/` y corriendo el script
- [x] **Tanda 2 · objetos-portal**: martillo, telescopio, pergamino y reloj ✓ los cuatro recibidos y procesados
- [x] **Tanda 3 · 11 cuadros de suceso histórico** ✓ recibidos y procesados
- [x] **Tanda 4 · extras**: cursor, favicon y 2 nebulosas ✓ recibidos y procesados
- [x] Iconos de origen (sentimiento/objeto/parte) — dibujados a mano en `sprites.ts`, 16 rejillas de 16x16
- [ ] Recuperar las 4 `Pasted image ...png` que el vault referencia y no están
- [x] Pipeline `herramientas/pixelizar.py` escrito y verificado: **41,6 MB → 543 KB (-99 %)**
- [ ] Atlas de iconos (cuando existan los iconos)

## 9 · FASE 8 — Astro y despliegue

- [x] `astro.config.mjs` con `site` y `base` correctos (verificado: todas las rutas del build llevan `/Lutum/`)
- [x] Ruta dinámica `/deidad/[slug]` (13 fichas)
- [ ] `/lugar/[slug]` y `/historia/[anio]` — el panel lateral ya cubre ambos casos;
      sólo valen la pena cuando haya fichas largas que enlazar desde fuera
- [x] Workflow de GitHub Actions con `withastro/action` — **el job de construir ya pasa en verde**
- [ ] ⚠️ **BLOQUEADO — lo tiene que hacer Cristina:** *Settings → Pages → Source = «GitHub Actions»*. Yo soy colaborador, no admin, y por API da 404. El job de desplegar se queda en cola hasta que lo active
- [x] Todas las rutas pasan por `src/lib/rutas.ts` (`url()` y `pagina()`)
- [x] `404.astro` en pixel art
- [x] Meta tags + Open Graph. La tarjeta (`og.png`, 1200×630, 30 KB) la compone
      el navegador desde `herramientas/tarjeta-og.html` con las fuentes reales,
      porque Pillow no lee woff2. Las URLs salen absolutas vía `absoluta()`:
      con rutas relativas ni WhatsApp ni Discord enseñan imagen

## 10 · FASE 9 — Pulido

- [x] Móvil: las seis pantallas comprobadas en vertical a 375 y 390 px. Ninguna
      desborda a lo ancho. Tres fallos reales encontrados y corregidos: el mapa
      salía al 12 % (la regla global `img{max-width:100%}` lo encogía antes de
      escalarlo), el rótulo de Cladis se cruzaba con la órbita, y el buscador
      del códice se metía debajo del botón de volver
- [ ] Sonido opcional (blips de menú), con interruptor y apagado por defecto
- [ ] Kintsugi en el bloque «la humanidad está restaurada» (si D4 = sí)
- [x] Estados vacíos bonitos para las entradas pendientes (códice, crónica, panteón y lugares)
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
