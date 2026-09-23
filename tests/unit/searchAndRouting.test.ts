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

  it('contains all 8 experiences and 6 topics', () => {
    const experiences = SEARCH_INDEX.filter((i) => i.type === 'experience');
    const topics = SEARCH_INDEX.filter((i) => i.type === 'topic');
    expect(experiences.length).toBe(8);
    expect(topics.length).toBe(6);

    const expectedExpSlugs = [
      'why-volcanoes-form',
      'how-rain-forms',
      'reading-rock-layers',
      'why-do-earthquakes-happen',
      'the-rock-cycle',
      'why-are-there-climate-zones',
      'what-fossils-tell-us',
      'why-do-landslides-happen',
    ];
    for (const slug of expectedExpSlugs) {
      expect(experiences.some((e) => e.id === slug)).toBe(true);
    }

    const expectedTopicSlugs = [
      'plate-tectonics',
      'atmosphere',
      'geology',
      'natural-hazards',
      'climate',
      'paleontology',
    ];
    for (const slug of expectedTopicSlugs) {
      expect(topics.some((t) => t.id === slug)).toBe(true);
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

  it('searches for specific known topics, experiences, and concepts succeed', () => {
    const subduction = searchKnowledgeBase('subduction');
    expect(subduction.some((r) => r.id === 'subduction' && r.href === '/learn/concepts/subduction')).toBe(true);

    const merapi = searchKnowledgeBase('merapi');
    expect(merapi.some((r) => r.id === 'why-volcanoes-form' || r.id === 'mount-merapi')).toBe(true);

    const earthquake = searchKnowledgeBase('earthquake');
    expect(earthquake.some((r) => r.id === 'why-do-earthquakes-happen')).toBe(true);

    const rockCycle = searchKnowledgeBase('rock cycle');
    expect(rockCycle.some((r) => r.id === 'the-rock-cycle')).toBe(true);

    const climate = searchKnowledgeBase('climate');
    expect(climate.some((r) => r.id === 'why-are-there-climate-zones')).toBe(true);

    const fossil = searchKnowledgeBase('fossil');
    expect(fossil.some((r) => r.id === 'what-fossils-tell-us')).toBe(true);

    const landslide = searchKnowledgeBase('landslide');
    expect(landslide.some((r) => r.id === 'why-do-landslides-happen')).toBe(true);
  });
});

describe('Content Knowledge Graph Integrity', () => {
  it('every node in NODE_REGISTRY points to a valid route', () => {
    for (const [key, node] of Object.entries(NODE_REGISTRY)) {
      expect(node.id).toBe(key);
      expect(node.href).toMatch(/^\/(learn|explore|projects|geomap)/);
    }
  });

  it('getRelatedContent returns only registered nodes with no undefs for all experiences', () => {
    const experienceSlugs = [
      'why-volcanoes-form',
      'how-rain-forms',
      'reading-rock-layers',
      'why-do-earthquakes-happen',
      'the-rock-cycle',
      'why-are-there-climate-zones',
      'what-fossils-tell-us',
      'why-do-landslides-happen',
    ];

    for (const slug of experienceSlugs) {
      const related = getRelatedContent(slug);
      expect(related).toBeDefined();
      for (const c of related.relatedConcepts) {
        expect(c.title).toBeDefined();
        expect(c.href).toBeDefined();
      }
      for (const e of related.relatedExperiences) {
        expect(e.title).toBeDefined();
        expect(e.href).toBeDefined();
      }
      for (const loc of related.relatedLocations) {
        expect(loc.title).toBeDefined();
        expect(loc.href).toBeDefined();
      }
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
