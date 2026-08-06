# LUTUM · Plan de la versión móvil

> Objetivo: que en un teléfono la web **no sea la de escritorio encogida**, sino
> algo pensado para el pulgar — con barra inferior tipo aplicación y cada
> pantalla recolocada.
>
> Documentos hermanos: [PLAN.md](PLAN.md) · [GUIA.md](GUIA.md)

---

## 0 · ¿Es posible? Sí. Cómo, y por qué así

**Se hace con una capa CSS, no con una segunda web.**

Astro genera HTML estático, así que en el servidor no hay forma de saber qué
dispositivo pide la página. Las tres salidas posibles:

| Vía | Veredicto |
|---|---|
| Rutas aparte (`/m/panteon`) | **No.** Duplica el mantenimiento, parte los enlaces compartidos y un hosting estático no puede redirigir por dispositivo. |
| Detectar el navegador con JS y reescribir | **No.** Parpadeo al cargar, se rompe sin JS y el agente de usuario miente. |
| Punto de corte por CSS + `matchMedia` para lo poco que necesita JS | **Sí.** Un solo HTML, mismas URLs, cero duplicación. |

El corte es **`max-width: 720px`**, más `(pointer:coarse)` donde lo que importa
es el dedo y no el tamaño. Nada de listas de modelos ni de agentes de usuario.

> **Ojo con la premisa del sitio.** La estantería dice literalmente *«Aquí no
> hay menú. Hay objetos.»* Una barra de pestañas normal se la carga. La salida:
> en el móvil la barra **son los mismos objetos** — martillo, telescopio, reloj,
> pergamino — en pequeño. No es un menú, es la estantería convertida en dique.
> En escritorio no aparece: allí la navegación diegética se queda como está.

---

## 1 · Lo que hoy está roto en un teléfono

No es opinión; está comprobado en el código y midiendo en el navegador.

- [x] **No se puede acercar nada.** El zoom del mapa y del códice va sólo por
      `wheel`. En toda la web no hay **ni un** gesto táctil. En el móvil el mapa
      y el cielo se pueden arrastrar, pero no ampliar: cero.
- [x] **El índice de los 27 lugares no existe en el móvil.** Está en
      `display:none` por debajo de 720 px. La leyenda, igual. No se adaptó
      funcionalidad: se borró.
- [x] **Los rótulos al pasar por encima no existen si no hay ratón.** Lo que
      pidió Cristina — ver apodo y año de cada dios — sólo se dispara con
      `:hover`. Con el dedo no hay hover: o abres la ficha de uno en uno, o no
      te enteras de quién es quién.
- [x] **Los paneles entran desde la derecha** ocupando la pantalla entera. En un
      teléfono lo natural es que suban desde abajo.
- [x] **La tabla de los nueve accidentes** se lee moviéndola de lado dentro de
      su caja. Funciona, pero en un móvil una tabla que se arrastra es de lo
      peor que hay.
- [x] **Ningún respeto por la zona segura** del iPhone: nada usa
      `env(safe-area-inset-*)`, así que la barra inferior chocaría con la raya
      de inicio.
- [x] **`100svh` a pelo en 9 sitios.** Con barra inferior hay que descontarla o
      todo queda tapado por debajo.

---

## 2 · FASE M1 — La barra inferior

- [x] Componente `BarraMovil.astro`, fija abajo, sólo visible ≤720 px
- [x] Cinco destinos con su sprite: **MUNDO** (planeta) · **PANTEÓN** (martillo)
      · **CÓDICE** (telescopio) · **CRÓNICA** (reloj) · **LUGARES** (pergamino)
- [x] Estado activo marcado (color de marca + placa hundida), leyendo la ruta
- [x] Altura como variable (`--barra-movil`) para que las pantallas la descuenten
- [x] `padding-bottom: env(safe-area-inset-bottom)` para el iPhone
- [x] Zona tocable de 48 px de alto real aunque el icono sea de 24
- [x] Se monta en `Base.astro`, así entra en las seis pantallas de una vez
- [x] El botón «volver» de arriba a la izquierda sobra en el móvil cuando ya hay
      barra: se oculta salvo en las fichas de deidad, donde sí hace falta

## 3 · FASE M2 — Los paneles pasan a ser hojas que suben

Afecta a panteón, códice y lugares, que hoy comparten el mismo patrón lateral.

- [x] El panel sube desde abajo hasta el 88 % de la pantalla, no desde la derecha
- [x] Asa de arrastre pixel arriba, y se cierra tirando hacia abajo
- [x] Se queda **por encima** de la barra inferior, y la barra sigue accesible
- [x] Fondo oscurecido detrás; tocar fuera cierra
- [x] El scroll de dentro no arrastra la página (`overscroll-behavior:contain`,
      ya está puesto)
- [x] La animación sigue siendo por `steps()` — nada de deslizamientos suaves

## 4 · FASE M3 — Gestos de verdad

- [x] **Pellizco para acercar** en `/lugares` y `/codice`, con el punto medio de
      los dos dedos como centro
- [x] Doble toque para acercar de golpe; otro doble toque para volver a ajustar
- [x] Un solo dedo arrastra (ya funciona) — hay que asegurar que el pellizco no
      dispara la apertura de ficha por error
- [x] En la crónica, deslizar de lado avanza por eras con imán al cuadro
- [x] Umbral de arrastre más alto con el dedo que con el ratón: el dedo tiembla
      más, y hoy son 6 px para ambos

## 5 · FASE M4 — Cada pantalla, recolocada

**Portada `/`**
- [x] `PULSA ENTER` pasa a `TOCA PARA ENTRAR` cuando no hay teclado
- [x] Perfil del mundo: los 6 ejes en dos columnas en vez de una fila que encoge
- [x] Receta divina: la tabla de nueve accidentes se convierte en **fichas
      apiladas**, una por accidente. Se acabó arrastrar una tabla
- [x] Estantería: los 4 objetos en 2×2, más grandes, no en fila

**Panteón `/panteon`**
- [x] La rueda cabe entera y centrada (comprobado: los astros van de 29 a 353
      en 390 px). No hizo falta subirla: el sitio que le faltaba lo daba el
      rótulo de Cladis, que ahora lleva placa
- [x] Los nombres de los dioses se ven **siempre** en el móvil, no al pasar por
      encima. Es lo que pidió Cristina y hoy no se cumple con el dedo
- [x] Los filtros de alineamiento, en fila deslizable con imán (`scroll-snap`)

**Códice `/codice`**
- [x] El buscador sube al borde (en el móvil no hay botón de volver que le
      estorbe) y ocupa el ancho. Las sugerencias se quedan colgando de él:
      ya salen a lo ancho y justo bajo el dedo, una hoja aparte sobraba
- [x] Índice y filtros recuperados: los filtros en tira deslizable con imán y
      el índice como tira desplegable. Sigue siendo un `<details>`, así que
      funciona sin JavaScript

**Crónica `/cronica`**
- [x] Selector de era como fila deslizable abajo, encima de la barra
- [x] Que el cuadro flotante quepa entero en vertical

**Lugares `/lugares`**
- [x] **Devolver el índice de los 27**, como hoja inferior
- [x] Devolver la leyenda dentro de esa hoja
- [ ] ~~Los rótulos de las chinchetas cercanas, visibles sin tocar~~ —
      **descartado a propósito.** Con 27 nombres encima de un mapa de 390 px
      no se ve el mapa. El índice, que vuelve a existir, cubre la misma
      necesidad sin taparlo.

## 6 · FASE M5 — Rematar

- [x] Repasar las seis pantallas a 360, 390 y 430 px de ancho
- [x] Comprobar en horizontal: un móvil tumbado es ancho pero muy bajo
- [x] Que nada dependa de `:hover` para funcionar
- [x] Zonas tocables de 44 px. Auditados los **193** elementos pulsables de
      las seis pantallas: **101 estaban por debajo de 36 px**, las 27
      chinchetas del mapa entre ellas. Quedan 11, todas marcas de año de la
      crónica: van a 35 px unas de otras y ensancharlas las solaparía entre
      sí, así que se agrandaron sólo a lo alto
- [ ] Que el teclado al abrirse no tape el buscador
- [ ] Probarlo en un móvil de verdad, no sólo en el navegador encogido

---

## Lo que NO va a cambiar

- **El escritorio no se toca.** Todo va dentro de consultas de medios; si algo
  se ve distinto en grande, es un fallo.
- **Ni una URL nueva.** Mismos enlaces para todos.
- **Ni un contenido distinto.** Mismo HTML; cambia la disposición, no lo que se
  cuenta.
- **Sigue siendo 100 % pixel art.** Nada de esquinas redondeadas ni
  deslizamientos suaves porque «en móvil se lleva».

## Estado

**Hecho, salvo dos cosas.** Queda probarlo en un teléfono de verdad (yo sólo
puedo medir el navegador) y comprobar que el teclado al abrirse no tapa el
buscador del códice, que también necesita un aparato real.

Todo lo demás está comprobado midiendo el DOM a 360, 390, 430 y en horizontal:
ninguna pantalla desborda a lo ancho, la barra ocupa exactamente lo que se le
reserva, y en escritorio la variable vale 0 y no se pinta nada.

## Cómo quedó la barra

Objeto + etiqueta debajo. Y los objetos son **los que ya existían** —planeta,
martillo, telescopio, reloj y pergamino—, no iconos nuevos: llegué a dibujar
cinco a 16×16 y se descartaron. Se enseñan a 32 px, que divide exacto los 128
del original (y los 256 del planeta), así que el dibujo no se ensucia.
