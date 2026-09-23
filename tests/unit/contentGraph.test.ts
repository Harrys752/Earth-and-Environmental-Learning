import { describe, it, expect } from 'vitest';
import { getRelatedContent, NODE_REGISTRY } from '../../src/lib/contentGraph';

describe('Knowledge Content Graph Resolver', () => {
  it('resolves related concepts, experiences, and locations for flagship experience', () => {
    const related = getRelatedContent('why-volcanoes-form');

    expect(related.relatedConcepts.length).toBeGreaterThanOrEqual(2);
    expect(related.relatedConcepts.some((c) => c.id === 'subduction')).toBe(true);

    expect(related.relatedLocations.length).toBeGreaterThanOrEqual(1);
    expect(related.relatedLocations.some((l) => l.id === 'java-volcanic-arc')).toBe(true);

    expect(related.relatedExperiences.length).toBeGreaterThanOrEqual(1);
  });

  it('handles unknown entities gracefully without throwing', () => {
    const related = getRelatedContent('non-existent-slug');
    expect(related.relatedExperiences).toEqual([]);
    expect(related.relatedConcepts).toEqual([]);
    expect(related.relatedLocations).toEqual([]);
  });

  it('maintains node registry with valid metadata for all mapped entities', () => {
    for (const [key, node] of Object.entries(NODE_REGISTRY)) {
      expect(node.id).toBe(key);
      expect(node.title).toBeDefined();
      expect(node.summary).toBeDefined();
      expect(node.href).toBeDefined();
    }
  });
});
