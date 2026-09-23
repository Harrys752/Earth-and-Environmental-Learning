import { withBase } from './url';

export type Locale = 'en' | 'id';

export const TRANSLATED_EXPERIENCE_SLUGS = new Set([
  'why-volcanoes-form',
  'how-rain-forms',
  'reading-rock-layers',
  'the-rock-cycle',
  'what-fossils-tell-us',
  'why-are-there-climate-zones',
  'why-do-earthquakes-happen',
  'why-do-landslides-happen',
]);

export const TRANSLATED_TOPIC_SLUGS = new Set([
  'plate-tectonics',
  'atmosphere',
  'climate',
  'geology',
  'natural-hazards',
  'paleontology',
]);

export const TRANSLATED_CONCEPT_SLUGS = new Set([
  'atmospheric-pressure',
  'condensation',
  'plate-tectonics-process',
  'stratigraphy',
  'subduction',
  'volcanic-arcs',
]);

export const TRANSLATED_PROJECT_SLUGS = new Set([
  'volcanic-hazard-map',
]);

/**
 * List of paths known to have full Indonesian translations.
 */
export const PHASE_1_TRANSLATED_PATHS = new Set([
  '/',
  '',
  '/about',
  '/geomap',
  '/search',
  '/explore',
  '/explore/topics',
  '/explore/experiences',
  '/explore/discoveries',
  '/learn',
  '/journey',
  '/journey/timeline',
  '/journey/reflections',
  '/journey/projects',
  ...Array.from(TRANSLATED_TOPIC_SLUGS).map((s) => `/explore/topics/${s}`),
  ...Array.from(TRANSLATED_EXPERIENCE_SLUGS).map((s) => `/learn/${s}`),
  ...Array.from(TRANSLATED_CONCEPT_SLUGS).map((s) => `/learn/concepts/${s}`),
  ...Array.from(TRANSLATED_PROJECT_SLUGS).map((s) => `/projects/${s}`),
]);

/**
 * Checks whether an experience slug has a real Indonesian translation.
 */
export function isExperienceTranslated(slug: string): boolean {
  const cleanSlug = slug.replace(/^id\//, '');
  return TRANSLATED_EXPERIENCE_SLUGS.has(cleanSlug);
}

/**
 * Checks whether a topic slug has a real Indonesian translation.
 */
export function isTopicTranslated(slug: string): boolean {
  const cleanSlug = slug.replace(/^id\//, '');
  return TRANSLATED_TOPIC_SLUGS.has(cleanSlug);
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
