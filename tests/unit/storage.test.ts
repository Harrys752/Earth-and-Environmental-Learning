import { describe, it, expect, beforeEach } from 'vitest';
import {
  loadState,
  getProgress,
  updateExperienceStatus,
  recordExploration,
  addJourneyEntry,
  getJourneyEntries,
  saveReflection,
  getReflections,
  clearUserData,
  setAppliedState,
  setBuiltState,
  hasSeenOnboardingRoadmap,
  setHasSeenOnboardingRoadmap,
} from '../../src/lib/storage';

describe('Storage Abstraction Layer', () => {
  beforeEach(() => {
    clearUserData();
  });

  it('initializes default empty state with default preferences', () => {
    const state = loadState();
    expect(state.version).toBe(1);
    expect(state.completedExperiences).toEqual([]);
    expect(state.journeyEntries).toEqual([]);
    expect(state.preferences.theme).toBe('system');
  });

  it('retrieves default progress for unvisited experience', () => {
    const progress = getProgress('why-volcanoes-form');
    expect(progress.experienceSlug).toBe('why-volcanoes-form');
    expect(progress.status).toBe('not-started');
    expect(progress.masterySignal).toBe('none');
    expect(progress.isApplied).toBe(false);
    expect(progress.isBuilt).toBe(false);
  });

  it('updates experience status to started and completed', () => {
    updateExperienceStatus('why-volcanoes-form', 'started');
    let p = getProgress('why-volcanoes-form');
    expect(p.status).toBe('started');
    expect(p.startedAt).toBeDefined();

    updateExperienceStatus('why-volcanoes-form', 'completed');
    p = getProgress('why-volcanoes-form');
    expect(p.status).toBe('completed');
    expect(p.completedAt).toBeDefined();

    const state = loadState();
    expect(state.completedExperiences).toContain('why-volcanoes-form');
  });

  it('records exploration interactions without duplicate IDs', () => {
    recordExploration('why-volcanoes-form', 'simulation', 'subduction');
    recordExploration('why-volcanoes-form', 'simulation', 'subduction');
    recordExploration('why-volcanoes-form', 'diagram', 'crust-mantle');

    const p = getProgress('why-volcanoes-form');
    expect(p.status).toBe('started');
    expect(p.exploration.simulationsExplored).toEqual(['subduction']);
    expect(p.exploration.diagramsInteracted).toEqual(['crust-mantle']);
    expect(p.exploration.interactionsCount).toBe(3);
  });

  it('supports independent orthogonal applied and built states', () => {
    setAppliedState('why-volcanoes-form', true, 'Observed andesite rock');
    let p = getProgress('why-volcanoes-form');
    expect(p.isApplied).toBe(true);
    expect(p.appliedNote).toBe('Observed andesite rock');
    expect(p.isBuilt).toBe(false); // Built remains false, orthogonal

    setBuiltState('why-volcanoes-form', true, 'volcanic-hazard-map');
    p = getProgress('why-volcanoes-form');
    expect(p.isBuilt).toBe(true);
    expect(p.builtProjectSlug).toBe('volcanic-hazard-map');
  });

  it('creates and sorts journey entries in reverse chronological order', () => {
    addJourneyEntry({
      type: 'learned',
      source: 'automatic',
      title: 'First Lesson',
    });

    addJourneyEntry({
      type: 'applied',
      source: 'manual',
      title: 'Field Observation',
    });

    const entries = getJourneyEntries();
    expect(entries.length).toBe(2);
    expect(entries[0].title).toBe('Field Observation');
    expect(entries[1].title).toBe('First Lesson');
  });

  it('saves reflection and automatically creates a Journey entry', () => {
    const refl = saveReflection({
      experienceSlug: 'why-volcanoes-form',
      prompt: 'What surprised you about subduction?',
      response: 'That water actually causes mantle rock to melt via flux melting!',
      promptCategory: 'surprise',
    });

    expect(refl.id).toBeDefined();
    const storedRefls = getReflections('why-volcanoes-form');
    expect(storedRefls.length).toBe(1);
    expect(storedRefls[0].response).toContain('flux melting');

    const journey = getJourneyEntries();
    expect(journey.some((e) => e.type === 'reflection')).toBe(true);
  });

  it('persists and manages hasSeenOnboardingRoadmap preference flag', () => {
    expect(hasSeenOnboardingRoadmap()).toBe(false);
    setHasSeenOnboardingRoadmap(true);
    expect(hasSeenOnboardingRoadmap()).toBe(true);
    expect(loadState().preferences.hasSeenOnboardingRoadmap).toBe(true);

    clearUserData();
    expect(hasSeenOnboardingRoadmap()).toBe(false);
  });
});
