import { en, type TranslationDictionary } from './en';
import { id } from './id';

export type Locale = 'en' | 'id';

export const dictionaries: Record<Locale, TranslationDictionary> = {
  en,
  id,
};

export const defaultLocale: Locale = 'en';

export function getDictionary(locale?: string): TranslationDictionary {
  if (locale === 'id') return id;
  return en;
}

export function useTranslations(locale?: string): TranslationDictionary {
  return getDictionary(locale);
}
