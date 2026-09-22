import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Dynamically determine base path:
// 1. Respect explicit BASE_URL or ASTRO_BASE environment variables.
// 2. If deployed in GitHub Actions (GITHUB_REPOSITORY present):
//    - If repo ends with .github.io (user site) -> '/'
//    - Otherwise use actual repository name -> '/<repo-name>/'
// 3. Fallback to '/' for local development.
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

  return '/';
}

// https://astro.build/config
export default defineConfig({
  site: 'https://harrys752.github.io',
  base: '/Earth-and-Environmental-Learning',
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

