/**
 * Gestos de dos dedos.
 *
 * El mapa del mundo y el cielo del códice se acercaban sólo con la rueda del
 * ratón. En un teléfono no hay rueda, así que hasta ahora simplemente **no se
 * podían acercar**: se arrastraban y poco más. Esto añade pellizco y doble
 * toque, que es como se espera que funcione un mapa en un móvil.
 *
 * Está aparte porque las dos pantallas lo necesitan igual pero guardan la
 * escala de forma distinta: cada una pasa su propia función de acercar.
 */

interface Opciones {
  /** Elemento que recibe los dedos. */
  zona: HTMLElement;
  /**
   * Acercar por un factor, hacia un punto dado en coordenadas de la zona.
   * Es la misma función que ya usa la rueda del ratón.
   */
  acercar: (factor: number, cx: number, cy: number) => void;
  /** Volver al encaje inicial. Se usa en el segundo doble toque. */
  ajustar?: () => void;
  /** Si está acercado ahora mismo, para saber qué hace el doble toque. */
  estaAcercado?: () => boolean;
  /**
   * Puntos donde el doble toque NO debe hacer nada, en coordenadas de página.
   *
   * Sin esto, doblar el toque sobre una estrella o una chincheta abre su ficha
   * con el primer toque y acerca con el segundo: dos cosas a la vez y ninguna
   * a propósito. Sobre algo que se abre manda el toque simple; el doble toque
   * se queda para el hueco vacío.
   */
  hayAlgoEn?: (x: number, y: number) => boolean;
}

/** Distancia entre dos dedos. */
function separacion(a: PointerEvent, b: PointerEvent): number {
  return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
}

export function montarGestos(
  { zona, acercar, ajustar, estaAcercado, hayAlgoEn }: Opciones,
): void {
  /** Dedos que hay ahora mismo sobre la zona, por identificador. */
  const dedos = new Map<number, PointerEvent>();
  let separacionPrevia = 0;

  zona.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'touch') return;
    dedos.set(e.pointerId, e);
    if (dedos.size === 2) {
      const [a, b] = [...dedos.values()];
      separacionPrevia = separacion(a!, b!);
    }
  });

  zona.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'touch' || !dedos.has(e.pointerId)) return;
    dedos.set(e.pointerId, e);
    if (dedos.size !== 2) return;

    const [a, b] = [...dedos.values()];
    const ahora = separacion(a!, b!);
    if (!separacionPrevia || !ahora) return;

    // Umbral pequeño: sin él, el temblor de la mano acerca y aleja sin parar.
    const factor = ahora / separacionPrevia;
    if (Math.abs(factor - 1) < 0.01) return;

    const caja = zona.getBoundingClientRect();
    // El centro es el punto medio de los dos dedos: acercar «hacia donde se
    // está mirando» y no hacia el centro de la pantalla.
    acercar(
      factor,
      (a!.clientX + b!.clientX) / 2 - caja.left,
      (a!.clientY + b!.clientY) / 2 - caja.top,
    );
    separacionPrevia = ahora;
  });

  const soltar = (e: PointerEvent) => {
    dedos.delete(e.pointerId);
    if (dedos.size < 2) separacionPrevia = 0;
  };
  zona.addEventListener('pointerup', soltar);
  zona.addEventListener('pointercancel', soltar);

  /* ---------------------------------------------------- doble toque ----- */
  if (!ajustar) return;

  let ultimoToque = 0;
  let ultimoX = 0;
  let ultimoY = 0;

  zona.addEventListener('pointerup', (e) => {
    if (e.pointerType !== 'touch' || dedos.size > 0) return;
    if (hayAlgoEn?.(e.clientX, e.clientY)) { ultimoToque = 0; return; }
    const t = e.timeStamp;
    const cerca = Math.hypot(e.clientX - ultimoX, e.clientY - ultimoY) < 40;

    if (t - ultimoToque < 300 && cerca) {
      const caja = zona.getBoundingClientRect();
      // Si ya está acercado, el segundo doble toque devuelve la vista entera.
      if (estaAcercado?.()) ajustar();
      else acercar(2, e.clientX - caja.left, e.clientY - caja.top);
      ultimoToque = 0;         // que no encadene un triple toque
      return;
    }
    ultimoToque = t;
    ultimoX = e.clientX;
    ultimoY = e.clientY;
  });
}

/**
 * Cuánto hay que mover el dedo (o el ratón) para que cuente como arrastre y no
 * como toque.
 *
 * Con el ratón bastan 6 px. Con el dedo no: la yema cubre bastante más que un
 * puntero y casi nadie levanta el dedo exactamente donde lo puso, así que con
 * el mismo umbral la mitad de los toques se perdían como si fueran arrastres.
 */
export const umbralArrastre = (tipo: string): number => (tipo === 'touch' ? 14 : 6);
