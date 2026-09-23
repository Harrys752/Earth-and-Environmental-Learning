import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://harrys752.github.io/Earth-and-Environmental-Learning/',
  base: '/Earth-and-Environmental-Learning/',
  output: 'static',
  integrations: [
    preact({ compat: false }),
    mdx(),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
