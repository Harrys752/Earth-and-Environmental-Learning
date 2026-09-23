import { describe, it, expect } from 'vitest';
import { resolveCollectionForLocale } from '../../src/lib/contentResolver';

describe('resolveCollectionForLocale', () => {
  it('deduplicates collection items and returns exactly one canonical item per slug for en', () => {
    const rawItems = [
      { id: 'why-volcanoes-form', data: { title: 'Why Volcanoes Form' } },
      { id: 'id/why-volcanoes-form', data: { title: 'Mengapa Gunung Api Terbentuk' } },
      { id: 'how-rain-forms', data: { title: 'How Rain Forms' } },
      { id: 'id/how-rain-forms', data: { title: 'Bagaimana Hujan Terbentuk' } },
      { id: 'english-only-item', data: { title: 'English Only' } },
    ];

    const resolved = resolveCollectionForLocale(rawItems as any, 'en');

    expect(resolved).toHaveLength(3);
    const slugs = resolved.map((item) => (item.id as string).replace(/^id\//, ''));
    expect(slugs).toEqual(['why-volcanoes-form', 'how-rain-forms', 'english-only-item']);

    // For en locale, each item should be the English one
    expect(resolved[0].id).toBe('why-volcanoes-form');
    expect(resolved[0].data.title).toBe('Why Volcanoes Form');
    expect(resolved[1].id).toBe('how-rain-forms');
  });

  it('resolves Indonesian translated entries when locale is id and falls back to EN when missing', () => {
    const rawItems = [
      { id: 'why-volcanoes-form', data: { title: 'Why Volcanoes Form' } },
      { id: 'id/why-volcanoes-form', data: { title: 'Mengapa Gunung Api Terbentuk' } },
      { id: 'untranslated-experience', data: { title: 'Untranslated Experience' } },
    ];

    const resolved = resolveCollectionForLocale(rawItems as any, 'id');

    expect(resolved).toHaveLength(2);

    // First item has an id/ translation -> resolves to id/
    expect(resolved[0].id).toBe('id/why-volcanoes-form');
    expect(resolved[0].data.title).toBe('Mengapa Gunung Api Terbentuk');

    // Second item has no id/ translation -> falls back to EN entry
    expect(resolved[1].id).toBe('untranslated-experience');
    expect(resolved[1].data.title).toBe('Untranslated Experience');
  });

  it('handles slug properties if id is absent or formatted differently', () => {
    const rawItems = [
      { slug: 'geology', data: { name: 'Geology' } },
      { slug: 'id/geology', data: { name: 'Geologi' } },
      { slug: 'oceanography', data: { name: 'Oceanography' } },
    ];

    const resolved = resolveCollectionForLocale(rawItems as any, 'id');

    expect(resolved).toHaveLength(2);
    expect(resolved[0].slug).toBe('id/geology');
    expect(resolved[0].data.name).toBe('Geologi');
    expect(resolved[1].slug).toBe('oceanography');
  });
});
