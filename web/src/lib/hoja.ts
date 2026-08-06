/**
 * Hoja inferior del móvil: arrastrar hacia abajo para cerrar, y tocar fuera.
 *
 * El panteón, el códice y los lugares tienen el mismo panel con tres nombres
 * distintos. Esto lo monta una vez y los tres se comportan igual; si el gesto
 * cambia, cambia en un sitio.
 *
 * Los estilos viven en `styles/pixel.css`, bajo `.hoja-inferior`.
 */

/** Cuánto hay que bajar para que se cierre, en píxeles. */
const UMBRAL_CIERRE = 90;

export function montarHoja(
  hoja: HTMLElement,
  velo: HTMLElement | null,
  cerrar: () => void,
): void {
  const asa = hoja.querySelector<HTMLElement>('.hoja-asa');

  // Tocar el velo cierra. Es lo que espera cualquiera que haya usado un móvil.
  velo?.addEventListener('click', cerrar);

  if (!asa) return;

  let arrastrando = false;
  let inicioY = 0;
  let recorrido = 0;

  const soltar = () => {
    if (!arrastrando) return;
    arrastrando = false;
    hoja.classList.remove('arrastrando');
    hoja.style.transform = '';
    if (recorrido > UMBRAL_CIERRE) cerrar();
  };

  asa.addEventListener('pointerdown', (e) => {
    // Sólo con el dedo o el ratón principal, y sólo donde la hoja es hoja.
    if (!matchMedia('(max-width:720px)').matches) return;
    arrastrando = true;
    inicioY = e.clientY;
    recorrido = 0;
    hoja.classList.add('arrastrando');
    asa.setPointerCapture(e.pointerId);
  });

  asa.addEventListener('pointermove', (e) => {
    if (!arrastrando) return;
    // Sólo hacia abajo: tirar hacia arriba no debe despegarla del borde.
    recorrido = Math.max(0, e.clientY - inicioY);
    hoja.style.transform = `translateY(${Math.round(recorrido)}px)`;
  });

  asa.addEventListener('pointerup', soltar);
  asa.addEventListener('pointercancel', soltar);
}
