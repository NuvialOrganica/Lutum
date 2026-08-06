import { defineConfig } from 'astro/config';

// La web vive en https://nuvialorganica.github.io/Lutum/
// OJO: `base` tiene que coincidir EXACTAMENTE con el nombre del repo (L mayúscula).
// Todas las rutas de imagen deben usar import.meta.env.BASE_URL o darán 404 en producción.
export default defineConfig({
  site: 'https://nuvialorganica.github.io',
  base: '/Lutum',
  output: 'static',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});
