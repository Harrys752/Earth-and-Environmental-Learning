import { describe, it, expect, beforeEach } from 'vitest';
import {
  clearUserData,
  getProgress,
  updateExperienceStatus,
  recordExploration,
  recordQuizAttempt,
  addJourneyEntry,
  getJourneyEntries,
  setAppliedState,
  setBuiltState,
  saveReflection,
} from '../../src/lib/storage';
import { evaluateQuiz } from '../../src/lib/quizEngine';
import { whyVolcanoesFormQuiz } from '../../src/data/quizzes/why-volcanoes-form';

describe('End-to-End Integration Flow: Inquiry → Exploration → Quiz → Journey', () => {
  beforeEach(() => {
    clearUserData();
  });

  it('orchestrates complete inquiry chain across all orthogonal progress dimensions', () => {
    const slug = 'why-volcanoes-form';

    // 1. User arrives and begins inquiry
    updateExperienceStatus(slug, 'started');
    let progress = getProgress(slug);
    expect(progress.status).toBe('started');
    expect(progress.startedAt).toBeDefined();

    // 2. User explores interactive simulation & cross-section diagram
    recordExploration(slug, 'simulation', 'subduction-kinematics');
    recordExploration(slug, 'diagram', 'crust-mantle-cross-section');
    progress = getProgress(slug);
    expect(progress.exploration.interactionsCount).toBe(2);
    expect(progress.exploration.simulationsExplored).toContain('subduction-kinematics');

    // 3. User takes conceptual verification quiz
    const answers = {
      'q1-melting-mechanism': 'opt-flux-melting',
      'q2-volcanic-arc-offset': 'opt-depth-threshold',
      'q3-andesite-composition': ['opt-silica', 'opt-volatiles', 'opt-crust-assimilation'],
      'q4-stages-ordering': ['step-subduct', 'step-dehydrate', 'step-partial-melt', 'step-ascend', 'step-erupt'],
      'q5-boundary-matching': {
        'pair-subduction': 'Deep trench, Wadati-Benioff seismic zone, explosive stratovolcanic arc',
        'pair-divergent': 'Decompression melting, rift valley, effusive pillow basalts',
        'pair-transform': 'Horizontal strike-slip shearing, shallow earthquakes, no deep volcanism',
      },
      'q6-indonesia-geotectonics': 'true',
    };

    const evalResult = evaluateQuiz(whyVolcanoesFormQuiz, answers, progress.quizAttempts);
    expect(evalResult.passed).toBe(true);
    expect(evalResult.scorePercentage).toBe(100);

    // Save quiz attempt
    recordQuizAttempt(
      slug,
      {
        quizId: whyVolcanoesFormQuiz.id,
        timestamp: evalResult.timestamp,
        answers,
        score: evalResult.scorePercentage,
        attemptNumber: 1,
      },
      evalResult.masteryContribution
    );

    // Mark core experience completed
    updateExperienceStatus(slug, 'completed');

    // Automatically create milestone journey entry
    addJourneyEntry({
      type: 'learned',
      source: 'automatic',
      title: `Completed Assessment: ${whyVolcanoesFormQuiz.title}`,
      description: `Scored ${evalResult.scorePercentage}%. Derived mastery: ${evalResult.masteryContribution}.`,
      relatedExperienceSlug: slug,
    });

    // 4. User completes outdoor rock observation challenge (Applied dimension)
    setAppliedState(slug, true, 'Examined volcanic andesite sample with plagioclase crystals');

    // 5. User submits personal reflection
    saveReflection({
      experienceSlug: slug,
      prompt: 'What surprised you about subduction zones?',
      response: 'That the subducting ocean floor does not melt directly, but acts as a chemical catalyst injecting water into the mantle wedge.',
      promptCategory: 'surprise',
    });

    // 6. User completes synthesis hazard mapping project (Built dimension)
    setBuiltState(slug, true, 'volcanic-hazard-map');
    addJourneyEntry({
      type: 'built',
      source: 'manual',
      title: 'Completed Mount Merapi Hazard Zoning Project',
      relatedExperienceSlug: slug,
    });

    // Verify Final Integrated State
    const finalProgress = getProgress(slug);
    expect(finalProgress.status).toBe('completed');
    expect(finalProgress.masterySignal).toBe('solid');
    expect(finalProgress.isApplied).toBe(true);
    expect(finalProgress.isBuilt).toBe(true);
    expect(finalProgress.exploration.interactionsCount).toBe(2);

    const journeyEntries = getJourneyEntries();
    expect(journeyEntries.length).toBe(3); // learned (quiz) + reflection + built (project)
    expect(journeyEntries.some((e) => e.type === 'learned')).toBe(true);
    expect(journeyEntries.some((e) => e.type === 'reflection')).toBe(true);
    expect(journeyEntries.some((e) => e.type === 'built')).toBe(true);
  });
});
