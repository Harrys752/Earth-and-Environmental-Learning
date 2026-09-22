import { describe, it, expect } from 'vitest';
import {
  deriveMasterySignal,
  getMasteryLabel,
  computeProgressSummary,
} from '../../src/lib/progress';
import type { ExperienceProgress, QuizAttempt } from '../../src/types/user';

describe('Progress & Mastery Evaluation Module', () => {
  it('derives "none" when no activity has occurred', () => {
    const signal = deriveMasterySignal([], 0, false, false);
    expect(signal).toBe('none');
  });

  it('derives "developing" when learner explores simulations or completes application without quiz', () => {
    const signalExploration = deriveMasterySignal([], 4, false, false);
    expect(signalExploration).toBe('developing');

    const signalApplied = deriveMasterySignal([], 0, true, false);
    expect(signalApplied).toBe('developing');
  });

  it('derives "solid" when learner passes quiz with good score', () => {
    const attempt: QuizAttempt = {
      quizId: 'quiz-1',
      timestamp: new Date().toISOString(),
      answers: {},
      score: 85,
      attemptNumber: 1,
    };
    const signal = deriveMasterySignal([attempt], 2, false, false);
    expect(signal).toBe('solid');
  });

  it('derives "strong" when learner exhibits high quiz score, hands-on exploration, and application', () => {
    const attempt1: QuizAttempt = {
      quizId: 'quiz-1',
      timestamp: new Date().toISOString(),
      answers: {},
      score: 70,
      attemptNumber: 1,
    };
    const attempt2: QuizAttempt = {
      quizId: 'quiz-1',
      timestamp: new Date().toISOString(),
      answers: {},
      score: 100,
      attemptNumber: 2,
    };

    const signal = deriveMasterySignal([attempt1, attempt2], 3, true, true);
    expect(signal).toBe('strong');
  });

  it('provides descriptive labels and accessibility styling for mastery signals', () => {
    const strongInfo = getMasteryLabel('strong');
    expect(strongInfo.label).toBe('Strong Understanding');
    expect(strongInfo.badgeClass).toContain('emerald');

    const devInfo = getMasteryLabel('developing');
    expect(devInfo.label).toBe('Developing Understanding');
    expect(devInfo.badgeClass).toContain('amber');
  });

  it('computes aggregated multi-dimensional progress summary across experiences', () => {
    const progressMap: Record<string, ExperienceProgress> = {
      'exp-1': {
        experienceSlug: 'exp-1',
        status: 'completed',
        exploration: { simulationsExplored: ['s1'], diagramsInteracted: [], interactionsCount: 2 },
        quizAttempts: [],
        masterySignal: 'solid',
        isApplied: true,
        isBuilt: false,
        lastInteractedAt: new Date().toISOString(),
      },
      'exp-2': {
        experienceSlug: 'exp-2',
        status: 'started',
        exploration: { simulationsExplored: [], diagramsInteracted: [], interactionsCount: 1 },
        quizAttempts: [],
        masterySignal: 'developing',
        isApplied: false,
        isBuilt: true,
        lastInteractedAt: new Date().toISOString(),
      },
    };

    const summary = computeProgressSummary(progressMap);
    expect(summary.totalStarted).toBe(2);
    expect(summary.totalCompleted).toBe(1);
    expect(summary.totalApplied).toBe(1);
    expect(summary.totalBuilt).toBe(1);
    expect(summary.totalInteractions).toBe(3);
    expect(summary.masteryCounts.solid).toBe(1);
    expect(summary.masteryCounts.developing).toBe(1);
  });
});
