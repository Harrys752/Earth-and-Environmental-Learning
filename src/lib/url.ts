/**
 * Centralized URL helper for base-aware internal path resolution.
 * Ensures all internal navigation and asset links respect Astro's BASE_URL
 * when deployed to GitHub Pages project sites.
 */
export function withBase(path: string): string {
  if (!path) return import.meta.env.BASE_URL;
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('//') ||
    path.startsWith('mailto:')
  ) {
    return path;
  }
  const base = import.meta.env.BASE_URL; // includes trailing slash (e.g., '/Earth-and-Environmental-Learning/')
  const clean = path.replace(/^\/+/, '');
  return `${base}${clean}`;
}
