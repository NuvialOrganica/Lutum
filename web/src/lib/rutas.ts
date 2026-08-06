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
