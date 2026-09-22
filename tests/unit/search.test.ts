import { describe, it, expect } from 'vitest';
import { searchKnowledgeBase } from '../../src/lib/search';

describe('Search Engine Ranking & Filtering', () => {
  it('returns empty results for blank query', () => {
    expect(searchKnowledgeBase('')).toEqual([]);
    expect(searchKnowledgeBase('   ')).toEqual([]);
  });

  it('ranks exact and partial title matches highest', () => {
    const results = searchKnowledgeBase('Why Do Volcanoes Form?');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].id).toBe('why-volcanoes-form');
    expect(results[0].score).toBeGreaterThanOrEqual(100);
  });

  it('finds items by scientific keywords and regional locations', () => {
    const resultsMerapi = searchKnowledgeBase('Merapi');
    expect(resultsMerapi.some((r) => r.id === 'mount-merapi' || r.id === 'why-volcanoes-form')).toBe(true);

    const resultsRain = searchKnowledgeBase('Bogor rain');
    expect(resultsRain.some((r) => r.id === 'how-rain-forms' || r.id === 'bogor-rain-belt')).toBe(true);
  });
});
