import { withBase } from './url';

export type Locale = 'en' | 'id';

/**
 * List of paths known to have full Indonesian translations in Phase 1.
 */
export const PHASE_1_TRANSLATED_PATHS = new Set([
  '/',
  '',
  '/about',
  '/geomap',
  '/search',
  '/explore',
  '/explore/topics',
  '/explore/topics/plate-tectonics',
  '/explore/experiences',
  '/explore/discoveries',
  '/learn',
  '/learn/why-volcanoes-form',
  '/journey',
  '/journey/timeline',
  '/journey/reflections',
  '/journey/projects',
]);

/**
 * Checks whether an experience slug has a real Indonesian translation.
 */
export function isExperienceTranslated(slug: string): boolean {
  const cleanSlug = slug.replace(/^id\//, '');
  return cleanSlug === 'why-volcanoes-form';
}

/**
 * Checks whether a topic slug has a real Indonesian translation.
 */
export function isTopicTranslated(slug: string): boolean {
  const cleanSlug = slug.replace(/^id\//, '');
  return cleanSlug === 'plate-tectonics';
}

/**
 * Normalizes a full URL or pathname by stripping the base path and trailing slash.
 */
export function normalizePath(pathname: string): string {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
  let p = pathname;
  if (base && p.startsWith(base)) {
    p = p.slice(base.length);
  }
  const repoBase = '/Earth-and-Environmental-Learning';
  if (p.startsWith(repoBase)) {
    p = p.slice(repoBase.length);
  }
  p = p.replace(/\/+$/, '');
  return p === '' ? '/' : p;
}

/**
 * Extracts the current locale and un-localized canonical path from a given pathname.
 */
export function parseLocalePath(pathname: string): { locale: Locale; canonicalPath: string } {
  const clean = normalizePath(pathname);
  if (clean === '/id' || clean.startsWith('/id/')) {
    const canonical = clean.slice(3) || '/';
    return { locale: 'id', canonicalPath: canonical.startsWith('/') ? canonical : `/${canonical}` };
  }
  return { locale: 'en', canonicalPath: clean };
}

/**
 * Checks if an authentic translation exists for a given canonical path (not fallback).
 */
export function hasTranslation(canonicalPath: string, locale: Locale): boolean {
  if (locale === 'en') return true; // All content exists in English
  const normalized = canonicalPath.replace(/\/+$/, '') || '/';
  return PHASE_1_TRANSLATED_PATHS.has(normalized);
}

/**
 * Converts a canonical path into a localized path with base-URL prefixing.
 */
export function getLocalizedUrl(canonicalPath: string, targetLocale: Locale): string {
  const clean = canonicalPath.replace(/^\/+/, '');
  if (targetLocale === 'id') {
    return withBase(clean ? `id/${clean}` : 'id');
  }
  return withBase(clean);
}

/**
 * Resolves the counterpart URL when switching languages from the current page.
 * Always targets the same position/slug in the target locale (never redirects to homepage),
 * relying on static fallback route generation for untranslated content.
 */
export function getSwitchTargetUrl(currentPathname: string, targetLocale: Locale): { url: string; isDirectTranslation: boolean } {
  const { canonicalPath } = parseLocalePath(currentPathname);
  const isAvailable = hasTranslation(canonicalPath, targetLocale);

  return {
    url: getLocalizedUrl(canonicalPath, targetLocale),
    isDirectTranslation: isAvailable,
  };
}
