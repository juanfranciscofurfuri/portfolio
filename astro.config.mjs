// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://juanfurfuriportfolio.netlify.app',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    // Los demos llevan noindex: listarlos en el sitemap sería pedirle a Google
    // que indexe algo que la propia página le prohíbe indexar.
    sitemap({ filter: (page) => !page.includes("/demo/") }),
  ],
});
