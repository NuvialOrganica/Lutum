import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/**
 * ¿Existe ya este fichero en `public/`?
 *
 * Sólo se puede llamar desde el frontmatter de un .astro: se resuelve al
 * compilar y no llega nada de esto al navegador. Sirve para que un asset
 * pendiente entre solo en cuanto alguien lo deje en la carpeta, sin tener
 * que tocar código ni acordarse de quitar un marcador provisional.
 */
export const hayAsset = (ruta: string): boolean => {
  try {
    return existsSync(
      fileURLToPath(new URL(`../../public/${ruta.replace(/^\//, '')}`, import.meta.url)),
    );
  } catch {
    return false;
  }
};
