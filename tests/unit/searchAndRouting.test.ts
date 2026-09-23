import { describe, it, expect } from 'vitest';
import { SEARCH_INDEX, searchKnowledgeBase } from '../../src/lib/search';
import { NODE_REGISTRY, getRelatedContent } from '../../src/lib/contentGraph';
import { GEOMAP_BASE_URL, buildGeoMapUrl } from '../../src/lib/geomap';

describe('Search Index Integrity', () => {
  it('every indexed item has a non-empty valid root-relative href', () => {
    for (const item of SEARCH_INDEX) {
      expect(item.href).toMatch(/^\/(learn|explore|projects|geomap)/);
    }
  });

  it('searches return prioritized results for query "A"', () => {
    const results = searchKnowledgeBase('A');
    expect(results.length).toBeGreaterThan(0);
    for (const res of results) {
      expect(res.href).toBeDefined();
      expect(res.href.length).toBeGreaterThan(0);
    }
  });

  it('searches for specific known topics and concepts succeed', () => {
    const subduction = searchKnowledgeBase('subduction');
    expect(subduction.some((r) => r.id === 'subduction' && r.href === '/learn/concepts/subduction')).toBe(true);

    const merapi = searchKnowledgeBase('merapi');
    expect(merapi.some((r) => r.id === 'why-volcanoes-form' || r.id === 'mount-merapi')).toBe(true);
  });
});

describe('Content Knowledge Graph Integrity', () => {
  it('every node in NODE_REGISTRY points to a valid route', () => {
    for (const [key, node] of Object.entries(NODE_REGISTRY)) {
      expect(node.id).toBe(key);
      expect(node.href).toMatch(/^\/(learn|explore|projects|geomap)/);
    }
  });

  it('getRelatedContent returns only registered nodes with no undefs', () => {
    const related = getRelatedContent('why-volcanoes-form');
    expect(related.relatedConcepts.length).toBeGreaterThan(0);
    expect(related.relatedLocations.length).toBeGreaterThan(0);
    for (const c of related.relatedConcepts) {
      expect(c.title).toBeDefined();
      expect(c.href).toBeDefined();
    }
  });
});

describe('GeoMap Centralization', () => {
  it('GEOMAP_BASE_URL is set to GeoMap-New', () => {
    expect(GEOMAP_BASE_URL).toBe('https://harrys752.github.io/GeoMap-New/');
  });

  it('buildGeoMapUrl formats location and coordinate parameters correctly', () => {
    const url = buildGeoMapUrl({
      locationSlug: 'java-volcanic-arc',
      coordinates: { lat: -7.54, lng: 110.45 },
      deepLinkParams: { zoom: '10' },
    });
    expect(url).toContain('https://harrys752.github.io/GeoMap-New/?');
    expect(url).toContain('location=java-volcanic-arc');
    expect(url).toContain('lat=-7.54');
    expect(url).toContain('lng=110.45');
    expect(url).toContain('zoom=10');
  });
});
