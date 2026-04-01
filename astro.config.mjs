import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: process.env.VITE_SITE_URL || 'https://sus-soil.eu',
  integrations: [react(), tailwind({ applyBaseStyles: false })],
  vite: {
    build: {
      // Keep media as cacheable files instead of inlining data URIs into HTML.
      assetsInlineLimit: 0,
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});
