# LUTUM · Guía técnica y de estilo

> Cómo debe estar montada la web para que sea rápida, mantenible y **100% pixel art**.
> Documento hermano: [PLAN.md](PLAN.md) (checklist de tareas).

---

## 1 · Resumen en 10 líneas

Web estática hecha con **Astro 5**, desplegada en **GitHub Pages** desde una GitHub Action.
El contenido del vault vive en **Content Collections** validadas con Zod, así que el texto se escribe en `.md` y no se toca código para añadir un dios o un lugar.
El HTML sale **pre-renderizado**: el texto no necesita JavaScript. Sólo se hidratan cuatro «islas» (órbita, mapa estelar, crónica, overworld) y sólo cuando entran en pantalla.
Todo lo visual es pixel art real: canvas a baja resolución escalado por enteros, sprites en PNG indexado y fuentes bitmap autoalojadas.
Sin framework de UI, sin librerías de animación, sin CDN. Todo lo interactivo ya está escrito en JS plano en los prototipos.

**Objetivo de rendimiento:** primera carga < 400 KB sin contar ilustraciones, Lighthouse ≥ 95.

---

## 2 · Estructura de carpetas

```
lutum/
├─ public/
│  ├─ fonts/                    PressStart2P.woff2, VT323.woff2  (autoalojadas)
│  ├─ assets/
│  │  ├─ planeta.png            ya lo tenemos (pixel, transparente)
│  │  ├─ fondo.png              ya lo tenemos (nebulosa pixel)
│  │  ├─ deidades/              13 ilustraciones ← Cristina
│  │  ├─ objetos/               martillo, telescopio, mapa ← Cristina (+ cubo provisional)
│  │  ├─ historia/              11 cuadros de suceso ← Cristina
│  │  └─ ui/                    atlas de iconos, cursor, favicon
│  └─ .nojekyll                 obligatorio en GitHub Pages
│
├─ src/
│  ├─ content/
│  │  ├─ config.ts              esquemas Zod
│  │  ├─ deidades/              13 .md
│  │  ├─ lugares/               11 .md
│  │  └─ historia/              11 .md
│  │
│  ├─ styles/
│  │  ├─ pixel.css              reset + rejilla 4px + reglas duras
│  │  └─ paleta.css             las 16 variables de color
│  │
│  ├─ components/
│  │  ├─ ui/                    PxFrame · PxButton · PxBar · PxDialog · PxTabs
│  │  ├─ Portada.astro
│  │  ├─ RecetaDivina.astro     sentimiento + objeto + parte
│  │  ├─ EstanteriaObjetos.astro los 4 portales flotantes
│  │  ├─ FichaDeidad.astro      ilustración + crónica + atributos + origen
│  │  └─ CamaraVeredicto.astro  sólo dentro de Lunaris
│  │
│  ├─ islands/                  JS puro, se importa con client:visible
│  │  ├─ orbita.js              /panteon
│  │  ├─ codice.js              /codice
│  │  ├─ cronica.js             /cronica
│  │  └─ overworld.js           /lugares
│  │
│  ├─ layouts/
│  │  ├─ Base.astro             head, fuentes, CRT, transiciones
│  │  └─ Pantalla.astro         pantalla completa sin scroll
│  │
│  └─ pages/
│     ├─ index.astro            portada (con scroll) + perfil + receta + estantería
│     ├─ panteon.astro
│     ├─ codice.astro
│     ├─ cronica.astro
│     ├─ lugares.astro
│     ├─ deidad/[slug].astro
│     ├─ lugar/[slug].astro
│     ├─ historia/[anio].astro
│     └─ 404.astro
│
├─ .github/workflows/deploy.yml
└─ astro.config.mjs
```

---

## 3 · Mapa de navegación

La navegación es **diegética**: no hay menú, hay objetos.

```
            ┌──────────────────────────────┐
            │  /  PORTADA                  │
            │  planeta + LUTUM             │
            │  "PULSA ENTER"               │
            │      ↓ scroll                │
            │  Perfil del mundo (6 ejes)   │
            │  La receta divina (tabla)    │
            │  LA ESTANTERÍA DE CLADIS     │
            └──┬────┬────┬────┬────────────┘
               │    │    │    │
      martillo │    │    │    │ mapa
               ▼    │    │    ▼
        ┌───────────┐│    │  ┌──────────┐
        │ /panteon  ││    │  │ /lugares │
        │ la órbita ││    │  │ overworld│
        └─────┬─────┘│    │  └──────────┘
              │      │    │
   telescopio │      │    │ cubo negro
              ▼      ▼    ▼
        ┌──────────┐  ┌───────────┐
        │ /codice  │  │ /cronica  │
        │ estrellas│  │ 1176 años │
        └──────────┘  └───────────┘
```

Los cuatro objetos aparecen **también dentro de `/panteon`**, flotando en la escena, porque es lo que pidió Cristina: «una imagen suelta de una constelación, objeto o telescopio que lleve a esta página».

---

## 4 · Reglas de estilo pixel art (innegociables)

Estas reglas son lo que separa «una web oscura con fuente de píxeles» de una web que de verdad parece un juego de 16 bits.

| Regla | Cómo |
|---|---|
| **Rejilla de 4 px** | Todo padding, margen, tamaño y desplazamiento es múltiplo de 4. Nada de `13px`. |
| **Nada de curvas** | `border-radius: 0` siempre. Los redondeos se dibujan con escalones de píxel. |
| **Nada de desenfoque** | Prohibido `blur()`, `box-shadow` suave y gradientes con banding. Sólo sombras duras: `box-shadow: 8px 8px 0 #0A0410`. |
| **Escalado entero** | Los sprites se escalan ×2, ×3, ×4. Nunca ×1.5. `image-rendering: pixelated`. |
| **Animación por pasos** | Todas las transiciones con `steps(n)`: `transition: transform .2s steps(4)`. El movimiento continuo delata que no es pixel art. |
| **Paleta cerrada** | 16 colores. Si hace falta un color nuevo, se cambia la paleta, no se añade una excepción. |
| **Canvas a baja resolución** | Los lienzos se dibujan a 384×216 o 480×270 y se escalan con CSS. Nunca dibujar a resolución de pantalla. |
| **Texto bitmap** | `Press Start 2P` para titulares y UI, `VT323` para texto largo. Tamaños múltiplos del tamaño base de la fuente. |
| **Sin subpíxel** | `Math.round()` en cualquier posición de canvas. Un sprite en x=12.4 se ve borroso. |
| **Sin scroll de página** | Salvo la portada, cada vista ocupa exactamente la pantalla. El scroll sólo existe *dentro* de paneles, con barra pixel propia (`::-webkit-scrollbar` cuadrada de 8 px). |

### Efecto CRT (capa global, en `Base.astro`)

```css
.scanlines{ background: repeating-linear-gradient(0deg,
   rgba(0,0,0,.22) 0 2px, transparent 2px 4px); mix-blend-mode: multiply }
.vineta{ background: radial-gradient(ellipse at 50% 48%,
   transparent 52%, rgba(10,4,16,.86) 100%) }
```

Ambas con `pointer-events:none` y `position:fixed`. Se desactivan con `prefers-reduced-motion` y con un interruptor en el pie.

---

## 5 · Paleta de 16 colores

Sacada del planeta que generó Cristina. Se define una vez en `paleta.css` y no se toca.

| # | Hex | Nombre | Uso principal |
|---|---|---|---|
| 00 | `#0A0410` | negro vino | fondo base, sombras duras |
| 01 | `#1A0A18` | tinta | fondo de panel |
| 02 | `#2E1230` | violeta oscuro | paneles secundarios |
| 03 | `#4A1B3E` | violeta | bordes apagados |
| 04 | `#6B2A4E` | vino | rellenos medios |
| 05 | `#8E1247` | vino intenso | bordes de panel, etiquetas |
| 06 | `#B4183E` | rojo | alertas, sangre, ruina |
| 07 | `#C9186B` | magenta | acento fuerte |
| 08 | `#E85D97` | fucsia | **color de marca**, enlaces, activo |
| 09 | `#F5A8C0` | rosa claro | texto secundario destacado |
| 10 | `#F7E3B0` | crema | **texto principal**, titulares |
| 11 | `#FFFBF0` | blanco hueso | brillos, luz |
| 12 | `#C97A2E` | ámbar oscuro | metal, madera |
| 13 | `#F0B25A` | oro | anotaciones, juntas, avisos |
| 14 | `#3A2B63` | azul noche | agua, cielo profundo |
| 15 | `#6B4A9E` | violeta claro | magia, ilusión, Miraxis |

Regla de contraste: texto largo siempre `#F7E3B0` o `#F5A8C0` sobre `#0A0410`/`#1A0A18`. El fucsia nunca para párrafos, sólo para acentos.

---

## 6 · Modelo de datos

`src/content/config.ts`:

```ts
const deidad = z.object({
  nombre: z.string(),
  titulo: z.string(),
  seccion: z.enum(['superiores','accidente','otros']),
  orden: z.number(),
  alineamiento: z.string(),
  dominios: z.array(z.string()),
  arma: z.string().optional(),
  simbolo: z.string(),
  anio: z.number().nullable(),
  anioTexto: z.string(),              // "Año 612", "Desconocido"
  // la receta divina
  sentimiento: z.string(),
  objeto: z.string(),
  parte: z.string(),
  iconos: z.object({                   // claves del atlas de iconos
    sentimiento: z.string(),
    objeto: z.string(),
    parte: z.string(),
  }),
  // ficha
  stats: z.object({ poder:z.number(), caos:z.number(),
                    culto:z.number(), huella:z.number() }),
  ilustracion: z.string(),             // /assets/deidades/cladis.png
  paleta: z.array(z.string()).length(4), // 4 colores propios del dios
  vinculos: z.array(reference('deidades')),
  templo: reference('lugares').optional(),
  estado: z.enum(['completo','pendiente']).default('completo'),
})
```

Lo mismo para `lugares` (añade `coords: {x,y}` para el overworld y `tipo`) e `historia` (añade `consecuencia`, `nacen[]`, `etiquetas[]`, `cuadro` con la imagen flotante).

**Por qué así:** con `reference()` de Astro, los `[[enlaces]]` de Obsidian se convierten en relaciones tipadas. Si Cristina renombra un dios y se rompe un vínculo, **falla el build** en vez de dejar un enlace muerto en producción.

---

## 7 · Optimización — decisiones que importan de verdad

### 7.1 No pasar el pixel art por el optimizador de imágenes
`astro:assets` reescala y convierte a WebP con remuestreo suave: **destroza el pixel art**. Los PNG de sprites e ilustraciones van en `public/assets/` y se sirven tal cual, con `image-rendering: pixelated`. Sí se pueden optimizar a mano con paleta indexada (PNG-8), que en pixel art reduce el peso un 60-80 % sin perder un solo píxel.

### 7.2 Un atlas en vez de treinta peticiones
Los ~30 iconos de origen (sentimiento/objeto/parte) van en **un solo PNG de 8×4 celdas de 32×32** y se recortan con `background-position`. Una petición en lugar de treinta.

### 7.3 Islas, no páginas interactivas
Cada pantalla pesada es un `<div>` vacío + un script con `client:visible`. El texto de las fichas se renderiza en el servidor: se lee sin JavaScript y lo indexa Google.

### 7.4 Canvas a resolución lógica
384×216 (16:9) para el overworld, 480×270 para la crónica. Se escala con CSS a un múltiplo entero. Ventaja doble: se ve como un juego real **y** el coste de dibujado es constante, así que va igual de fluido en un móvil que en un PC.

### 7.5 Fuentes autoalojadas
Nada de Google Fonts: dos `.woff2` en `public/fonts/` con `font-display: block`. Con fuentes bitmap el `swap` es horroroso (se ve un instante en Arial y salta todo el layout). Ahorra además dos conexiones externas.

### 7.6 Transiciones de página nativas
`<ViewTransitions />` de Astro con una cortina de píxeles hecha con `steps()`. Cambiar de pantalla no recarga fondo, fuentes ni CRT.

### 7.7 GitHub Pages
Repo: **`github.com/NuvialOrganica/Lutum`** → la web quedará en `https://nuvialorganica.github.io/Lutum/`.

```js
// astro.config.mjs
export default defineConfig({
  site: 'https://nuvialorganica.github.io',
  base: '/Lutum',            // ← L mayúscula, exactamente como el repo
  output: 'static',
})
```

En *Settings → Pages*, **Source** debe ser **«GitHub Actions»**, no «Deploy from a branch». Ahora mismo aparece deshabilitado porque el repo está vacío: se activa después del primer push.
Y **todas** las rutas de imagen con `import.meta.env.BASE_URL`, o en producción salen 404. Es el fallo número uno al desplegar en Pages con subcarpeta. Además, `public/.nojekyll` para que no se ignoren carpetas que empiezan por guion bajo.

### 7.8 Accesibilidad sin romper la estética
- Todo lo clicable es `<button>` o `<a>` de verdad, con foco visible (un marco pixel, no un `outline` del navegador).
- Los canvas llevan una alternativa en texto: la lista de los 12 lugares y de los 11 eventos existe también como HTML, escondida visualmente pero navegable.
- `prefers-reduced-motion` apaga flotaciones, parallax y scanlines.
- Tamaño mínimo de texto: 16 px reales para `VT323` y 8 px para `Press Start 2P` (que rinde como 16).

---

## 8 · Componentes que hay que escribir

| Componente | Qué hace | Se usa en |
|---|---|---|
| `PxFrame` | Marco de panel de 4 px con esquinas de píxel y sombra dura | Todo |
| `PxButton` | Botón con estado hundido al pulsar | Todo |
| `PxBar` | Barra de atributo por bloques (10 celdas) | Ficha de deidad |
| `PxDialog` | Cuadro de diálogo con máquina de escribir y pestañas | Overworld, fichas |
| `PxTabs` | Pestañas estilo consola | Diálogos y fichas |
| `Estrellas` | Canvas de estrellas parpadeando | Fondo global |
| `Crt` | Scanlines + viñeta + interruptor | Layout base |
| `RecetaDivina` | Los tres bloques sentimiento + objeto + parte | Portada y ficha |
| `FichaDeidad` | Ilustración + crónica + atributos + origen + vínculos | Panteón, `/deidad/[slug]` |
| `CamaraVeredicto` | El juicio de Lunaris con veredicto aleatorio | Sólo Lunaris |
| `EstanteriaObjetos` | Los 4 portales flotantes | Portada y panteón |
| `CuadroFlotante` | La imagen suelta de cada suceso histórico | Crónica |

---

## 9 · Assets que hay que pedir a Cristina

> **Flujo:** yo monto una página `referencia-assets.html` con el hueco al tamaño exacto, el prompt escrito al lado y un ejemplo de cómo quedaría. Cristina lo genera con ChatGPT y lo deja en la carpeta. Yo lo enchufo.

**Reglas comunes para todos los prompts:**
- Estilo: *pixel art 16 bits, sin antialiasing, paleta limitada*
- Colores: **fucsia `#E85D97`, rosa `#F5A8C0`, crema `#F7E3B0`, vino `#8E1247`, violeta noche `#2E1230`, oro `#F0B25A`**
- **Fondo transparente** (salvo los cuadros de suceso, que llevan escena)
- **Sin texto ni letras** en la imagen
- Formato PNG, cuadrado salvo que se indique

### Tanda 1 — 13 ilustraciones de deidad `1024×1024` *(bloquea el panteón)*
Busto o cuerpo entero centrado, mirando de frente, fondo transparente.

| Archivo | Qué pedir |
|---|---|
| `cladis.png` | Diosa artesana, martillo de forja, mirada penetrante, manos enormes, delantal, aura rosa |
| `egon.png` | Dios de la muerte, ojos de llama roja, látigo de sombras, rosa con espinas |
| `lunaris.png` | Figura pálida de cuello antinaturalmente largo, cabeza con fases lunares superpuestas, hoz de luz negra |
| `armonia.png` | Figura andrógina etérea, cabello multicolor flotando, lira dorada |
| `miraxis.png` | Figura sonriente con ojos de espejo roto, abanico de espejos |
| `valther.png` | Mercader de dedos dorados como lingotes, balanza encadenada |
| `vigilis.png` | Globo ocular gigante flotando, rodeado de llamas divinas |
| `arbo.png` | Humanoide alto de corteza y hojas, flores brotando del cuerpo |
| `lydara.png` | Dama de las aguas junto a un delfín radiante, perla luminosa |
| `zax.png` | Mago astrónomo con capa estelar, lanza-tridente, aurora azul |
| `zarath.png` | Figura oscura y hermosa, esfera negra en llamas, pica medieval |
| `litt.png` | Niño de ojos azules y ropas blancas, llama suave entre las manos |
| `relatora.png` | Figura con capa blanca; rostro y manos hechos de constelaciones |

### Tanda 2 — 3 objetos-portal `512×512`
Objeto solo, centrado, fondo transparente, con un brillo tenue.
- `martillo.png` — martillo de forja cruzado sobre un yunque → lleva al Panteón
- `telescopio.png` — telescopio de latón sobre trípode → lleva al Códice
- `mapa.png` — pergamino enrollado a medias → lleva a Lugares
- ~~`cubo.png`~~ — el portal de la Crónica es **un cubo negro plano provisional**, lo dibujo yo. Es feo a propósito: cuando Cristina lo vea, decidirá qué objeto quiere de verdad.

### Tanda 3 — 11 cuadros de suceso `800×600` *(bloquea la crónica)*
Escena horizontal, **con fondo** (no transparente), como una viñeta de videojuego.
`a0` creación · `a138` cosecha de mundos · `a367` el parque cayendo · `a372` una lámina en blanco rota · `a501` el ojo en el cielo · `a612` bosque renaciendo · `a708` castillo junto al mar · `a738` ciudad en obras · `a978` campo de batalla con gólems · `a1103` ciudad de torres bajo aurora azul · `a1176` la explosión y el pozo

### Tanda 4 — extras
- `cursor.png` 32×32 — un cincel o una llave inglesa pixel
- `favicon.png` 64×64 — el planeta simplificado
- 2 variantes más de nebulosa de fondo (una violeta fría, una dorada)

### Lo que NO hace falta pedir
Los ~30 iconos de origen (sentimiento / objeto / parte), los sprites de la órbita, los tiles del mapa y los marcos de UI: **los dibujo yo directamente en canvas o CSS**. Salen más limpios y pesan la centésima parte.

---

## 10 · Qué se reaprovecha de los 8 prototipos

| De | Se reaprovecha | Hay que rehacer |
|---|---|---|
| 01 Fragmentos | La lógica de órbita, arrastre, inercia y filtros | Toda la piel: pasar a pixel |
| 04 Juicio Lunar | La Cámara del Veredicto entera | Piel pixel; el resto del prototipo se descarta |
| 05 Códice | La física del grafo, los 43 nodos y 65 vínculos, el buscador | Dibujado a píxel, sin antialias |
| 06 Overworld | Prácticamente todo: mapa, tiles, colisiones, diálogos | Añadir controles táctiles |
| 07 PANTHEON.SYS | El layout de ficha completo (es justo el mockup de Cristina), los 13 sprites, las barras | Sustituir el sprite grande por la ilustración |
| 08 Crónica | Parallax, escenas, línea de tiempo | Añadir los cuadros flotantes |
| 02 Plano · 03 Kintsugi | Ideas sueltas | No entran de momento |

---

## 11 · Riesgos y cómo los evitamos

1. **Que ChatGPT no genere pixel art de verdad.** Los generadores hacen «estilo pixel» con antialias. Mitigación: al recibir cada imagen la paso por un cuantizador (reducir a la paleta de 16 y bajar a resolución lógica) para que encaje con el resto. Si una queda mal, se pide de nuevo con el prompt ajustado.
2. **Que la web sea preciosa y no se pueda leer.** Las fuentes pixel cansan. Mitigación: `VT323` a 20-24 px para todo el texto largo, `Press Start 2P` sólo en títulos y etiquetas cortas.
3. **Que las rutas se rompan en GitHub Pages.** Es el fallo más común. Mitigación: fijar `base` en la Fase 0 y usar siempre `import.meta.env.BASE_URL`.
4. **Que el peso se dispare con 13 ilustraciones de 1024×1024.** Mitigación: paleta indexada + `loading="lazy"` + sólo se carga la del dios seleccionado.
5. **Que el móvil quede fuera.** Los prototipos son de escritorio. Mitigación: cada fase incluye su versión vertical, no se deja para el final.

---

## 12 · Pixel art: qué se usa y por qué (investigado el 6 ago 2026)

### 12.1 El problema de los assets generados por IA

Las imágenes que salen de ChatGPT son **«estilo pixel art», no pixel art**: tienen antialiasing, miles de colores y 1024-1448 px de lado. Si se meten tal cual en la web pasan dos cosas malas: pesan una barbaridad (los 20 assets sumaban **41,6 MB**) y, al escalarlas, se ven borrosas justo en lo contrario de lo que queremos.

La solución es un paso de conversión, ya escrito en **`herramientas/pixelizar.py`**:

1. **Premultiplicar el alfa** antes de reducir. Sin esto, el filtro mezcla el color de los píxeles invisibles y aparece un halo oscuro en todos los bordes. Es el error clásico.
2. **Reducir a la resolución lógica** con filtro de área (`BOX`), no bicúbico.
3. **Alfa binario**: 0 o 255. En pixel art no existen los píxeles medio transparentes.
4. **Paleta reducida sin dither.** El difuminado en pixel art se ve como suciedad, no como textura.
5. **PNG indexado.**

Resultado medido: **41,6 MB → 543 KB (-99 %)** y por fin nítidas.

```bash
python herramientas/pixelizar.py                  # todo
python herramientas/pixelizar.py --solo deidades  # cuando lleguen las ilustraciones
python herramientas/pixelizar.py --revisar        # hojas de contacto para revisar a ojo
```

**Resoluciones lógicas elegidas** (regla: el tamaño en pantalla debe ser múltiplo entero de la resolución de arte):

| Grupo | Arte | En pantalla | Colores |
|---|---|---|---|
| Ilustraciones de deidad | 192×192 | 384 px (×2) | 48 |
| Objetos-portal | 128×128 | 256 px (×2) | 32 |
| Cuadros de suceso | 192×144 | 384×288 (×2) | 48 |
| Fondos de nebulosa | 480×480 | pantalla completa | 64 |
| Planeta | 256×256 | grande | 64 |
| Favicon / cursor | 64 / 32 | 1:1 | 24 |

### 12.2 Marcos y botones: 9-slice con `border-image`

Para que un marco pixel se estire a cualquier tamaño **sin deformar las esquinas** la técnica es el 9-slice, que en CSS existe de serie:

```css
.marco{
  border: 12px solid transparent;          /* 4 px de arte × 3 de escala */
  border-image: url(marco.png) 4 fill repeat;
  image-rendering: pixelated;
}
```

`4` es el grosor del borde **en píxeles del arte**, y `repeat` (no `stretch`) es lo que mantiene el patrón nítido. Es lo que usan por dentro tanto NES.css como RPGUI.

### 12.3 De dónde salen los iconos y elementos de UI

En vez de dibujar 30 iconos a mano y que canten, se parte de bases CC0 y se repintan con nuestra paleta:

- **[Kenney · Pixel UI Pack](https://kenney.nl/assets/pixel-ui-pack)** — 750 elementos CC0: paneles 9-slice, botones, barras, casillas. Es la mina principal.
- **[Kenney · Game Icons](https://kenney.nl/assets/game-icons)** — 105 iconos CC0.
- **[Kenney · Input Prompts Pixel 16×](https://kenney-assets.itch.io/input-prompts-pixel-16)** — teclas y botones a 16×16, para los avisos de «PULSA ENTER» y los controles del overworld.
- **[itch.io · assets CC0 con etiqueta iconos](https://itch.io/game-assets/assets-cc0/tag-icons)** — para huecos concretos.

Todo CC0: se puede usar en cualquier proyecto, incluso comercial, sin atribución. Aun así conviene poner los créditos en el pie.

**Referencias de framework** (para mirar cómo lo resuelven, no para adoptarlas: traen su propia estética y no encajan con la paleta de Lutum):
- **[RPGUI](https://github.com/RonenNess/RPGUI)** — framework de GUI de RPG clásico en web, zlib, gráficos de dominio público de Buch.
- **[NES.css](https://dev.to/khangnd/10-retro-css-frameworks-to-relive-your-childhood-nph)** — framework CSS estilo NES.
- **[9-slicer](https://leanrada.com/wares/9-slicer/)** — herramienta que genera el CSS de `border-image` a partir de una imagen.

### 12.4 Tipografías

- **Press Start 2P** (Google Fonts, OFL) para titulares y UI. **Comprobado a nivel de glifo**: tiene `Á É Í Ó Ú Ñ ü ¿ ¡`, así que el español se ve bien. Es la única fuente pixel de Google Fonts con presencia real.
- **VT323** (Google Fonts, OFL) para texto largo: a 20-24 px se lee cómodo, que es el punto flaco de las fuentes pixel.
- Alternativa si VT323 cansa: **[Departure Mono](https://www.departuremono.com/)** (OFL), monoespaciada pixel más moderna.

Las tres se autoalojan en `public/fonts/` con `font-display: block` — nada de CDN.
