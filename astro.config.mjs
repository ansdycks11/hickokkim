// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static multi-page site. Every word of content is in the server-returned HTML.
export default defineConfig({
  site: 'https://hickokkim.com',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  compressHTML: true,
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/contact/thanks/') && !page.endsWith('/404/'),
      changefreq: 'monthly',
      lastmod: new Date(),
    }),
  ],
});
