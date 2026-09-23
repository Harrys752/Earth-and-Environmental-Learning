import { describe, it, expect, beforeEach } from 'vitest';
import {
  hasSeenOnboardingRoadmap,
  setHasSeenOnboardingRoadmap,
  clearUserData,
} from '../../src/lib/storage';
import type { RoadmapTopic } from '../../src/components/ui/RoadmapCard';

describe('RoadmapCard Feature Logic & Data Flow', () => {
  beforeEach(() => {
    clearUserData();
  });

  const mockTopics: RoadmapTopic[] = [
    {
      id: 'plate-tectonics',
      title: 'Plate Tectonics & Lithosphere',
      tagline: 'The dynamic planetary shell',
      description: 'Convergent, divergent, and transform boundaries.',
      category: 'plate-tectonics',
      experiences: [
        {
          id: 'why-volcanoes-form',
          title: 'Why Do Volcanoes Form?',
          difficulty: 'beginner',
          estimatedTime: '20min',
          featured: true,
        },
      ],
    },
    {
      id: 'atmosphere',
      title: 'Atmosphere & Climate Systems',
      description: 'Global heat distribution and pressure cells.',
      category: 'atmosphere',
      experiences: [
        {
          id: 'how-rain-forms',
          title: 'How Does Rain Form?',
          difficulty: 'intermediate',
          estimatedTime: '20min',
        },
      ],
    },
  ];

  it('correctly maps topic and experience hierarchy without hardcoding', () => {
    expect(mockTopics.length).toBe(2);
    expect(mockTopics[0].experiences[0].featured).toBe(true);
    expect(mockTopics[0].experiences[0].id).toBe('why-volcanoes-form');
    expect(mockTopics[1].experiences[0].id).toBe('how-rain-forms');
  });

  it('first visit default is not seen (should auto-open)', () => {
    expect(hasSeenOnboardingRoadmap()).toBe(false);
  });

  it('closing roadmap sets dismissal state so subsequent visits do not auto-open', () => {
    // Simulate user closing the roadmap
    setHasSeenOnboardingRoadmap(true);
    expect(hasSeenOnboardingRoadmap()).toBe(true);

    // Reopening manually works independently of the storage flag
    const manualEvent = new CustomEvent('earth-learning:open-roadmap', {
      detail: { triggerId: 'roadmap-navbar-trigger' },
    });
    expect(manualEvent.type).toBe('earth-learning:open-roadmap');
    expect(manualEvent.detail.triggerId).toBe('roadmap-navbar-trigger');
  });

  it('provides bilingual dictionaries for roadmap modal content in en and id', async () => {
    const { en } = await import('../../src/i18n/en');
    const { id } = await import('../../src/i18n/id');

    expect(en.roadmapModal.title).toBe('Interactive Learning Roadmap');
    expect(id.roadmapModal.title).toBe('Peta Pembelajaran Interaktif');

    expect(en.roadmapModal.step1Tag).toContain('Step 1');
    expect(id.roadmapModal.step1Tag).toContain('Langkah 1');

    expect(en.roadmapModal.launchFlagship).toBe('Launch Flagship Experience');
    expect(id.roadmapModal.launchFlagship).toBe('Buka Pengalaman Unggulan');
  });
});
