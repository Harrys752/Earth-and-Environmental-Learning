import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Dynamically determine base path for GitHub Pages project site:
function getBasePath() {
  if (process.env.BASE_URL) return process.env.BASE_URL;
  if (process.env.ASTRO_BASE) return process.env.ASTRO_BASE;

  if (process.env.GITHUB_REPOSITORY) {
    const parts = process.env.GITHUB_REPOSITORY.split('/');
    const repoName = parts[1];
    if (!repoName || repoName.toLowerCase().endsWith('.github.io')) {
      return '/';
    }
    return `/${repoName}/`;
  }

  // Default to the GitHub repository name for project site deployment
  return '/Earth-and-Environmental-Learning/';
}

// https://astro.build/config
export default defineConfig({
  site: 'https://harrys752.github.io',
  base: getBasePath(),
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
