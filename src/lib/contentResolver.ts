/**
 * Centralized Content Resolver for i18n Deduplication & Fallbacks
 * Ensures every listing and aggregation surface returns exactly ONE canonical entry per slug,
 * resolving to the real translation if available, or the English fallback with isFallback flag.
 */

import type { Locale } from './i18nUrl';

export interface BaseCollectionEntry {
  id?: string;
  slug?: string;
  data: {
    id?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

function isIndonesianEntry(item: BaseCollectionEntry): boolean {
  if (typeof item.id === 'string' && item.id.startsWith('id/')) return true;
  if (typeof item.slug === 'string' && item.slug.startsWith('id/')) return true;
  return false;
}

function getCanonicalSlug(item: BaseCollectionEntry): string {
  const raw = (item.id || item.slug || item.data?.id || '').toString();
  return raw.replace(/^id\//, '');
}

/**
 * Resolves a collection array to exactly one entry per unique slug for the requested locale.
 */
export function resolveCollectionForLocale<T extends BaseCollectionEntry>(
  allEntries: T[],
  locale: Locale
): (T & { isFallback?: boolean; canonicalSlug: string })[] {
  const map = new Map<string, T & { isFallback?: boolean; canonicalSlug: string }>();

  // Extract all unique clean slugs in original declaration order
  const uniqueSlugs: string[] = [];
  for (const item of allEntries) {
    const slug = getCanonicalSlug(item);
    if (slug && !uniqueSlugs.includes(slug)) {
      uniqueSlugs.push(slug);
    }
  }

  for (const slug of uniqueSlugs) {
    if (locale === 'id') {
      // Find authentic Indonesian entry first
      const idEntry = allEntries.find((e) => {
        return getCanonicalSlug(e) === slug && isIndonesianEntry(e);
      });

      if (idEntry) {
        map.set(slug, {
          ...idEntry,
          canonicalSlug: slug,
          isFallback: false,
        });
      } else {
        // Fallback to English entry
        const enEntry = allEntries.find((e) => {
          return getCanonicalSlug(e) === slug && !isIndonesianEntry(e);
        });

        if (enEntry) {
          map.set(slug, {
            ...enEntry,
            canonicalSlug: slug,
            isFallback: true,
          });
        }
      }
    } else {
      // English locale: only return the English entry
      const enEntry = allEntries.find((e) => {
        return getCanonicalSlug(e) === slug && !isIndonesianEntry(e);
      });

      if (enEntry) {
        map.set(slug, {
          ...enEntry,
          canonicalSlug: slug,
          isFallback: false,
        });
      }
    }
  }

  return Array.from(map.values());
}
