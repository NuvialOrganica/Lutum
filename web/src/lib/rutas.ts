/**
 * Rutas con el `base` de Astro aplicado.
 *
 * En GitHub Pages la web cuelga de /Lutum/, así que cualquier ruta absoluta
 * escrita a pelo («/assets/x.png») da 404 en producción aunque funcione en
 * local. Este helper es la única forma correcta de construirlas.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Ruta a un fichero de `public/`. url('assets/planeta.png') */
export const url = (ruta: string): string => `${BASE}/${ruta.replace(/^\//, '')}`;

/** Ruta a una página interna. pagina('panteon') */
export const pagina = (ruta = ''): string => {
  const limpia = ruta.replace(/^\/|\/$/g, '');
  return limpia ? `${BASE}/${limpia}/` : `${BASE}/`;
};

/**
 * URL absoluta con dominio, para Open Graph y el canonical.
 *
 * Ahí una ruta relativa no vale: quien lee la etiqueta es un servidor de
 * Twitter o de WhatsApp, que no tiene ni idea de dónde vive la página. Sin
 * dominio, la tarjeta sale sin imagen.
 *
 * En local `site` no está puesto y no pasa nada: sólo importa en producción,
 * y ahí `astro.config.mjs` lo declara.
 */
export const absoluta = (ruta: string): string => {
  const sitio = import.meta.env.SITE;
  if (!sitio) return ruta;
  return new URL(ruta, sitio).href;
};
