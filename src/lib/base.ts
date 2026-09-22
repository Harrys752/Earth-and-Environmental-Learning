/**
 * Utility to safely format internal URL paths with Astro's BASE_URL.
 * This guarantees proper base prefixing when deployed on GitHub Pages
 * under subfolders like /Earth-and-Environmental-Learning/.
 */
export function withBase(path: string = '/'): string {
  if (!path) return import.meta.env.BASE_URL || '/';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('mailto:') ||
    path.startsWith('#')
  ) {
    return path;
  }

  const rawBase = import.meta.env.BASE_URL || '/';
  const base = rawBase.endsWith('/') ? rawBase.slice(0, -1) : rawBase;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  return `${base}${cleanPath}`;
}
