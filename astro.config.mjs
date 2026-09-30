// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { firm } from './src/data/firm.ts';

// Static multi-page site. Every word of content is in the server-returned HTML.
export default defineConfig({
  site: 'https://hickokkim.com',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  compressHTML: true,
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/contact/thanks/') && !page.endsWith('/404/') && !page.includes('/vcard/'),
      changefreq: 'monthly',
      // lastmod is the date the content was last substantively reviewed, the same date the
      // pages show ("Last reviewed") and put in their schema dateModified, not the build
      // time, which would change on every deploy and teach search engines to ignore it.
      // When Insights articles exist, give each its own `updated` date in serialize().
      lastmod: new Date(firm.lastReviewed + 'T12:00:00Z'),
    }),
  ],
});
