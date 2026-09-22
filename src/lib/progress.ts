/**
 * Multi-Dimensional Progress and Mastery Evaluation
 * 
 * Implements orthogonal dimensions of learner development:
 * 1. Core Lifecycle: started / completed
 * 2. Exploration Activity: depth of interactive manipulation
 * 3. Understanding & Mastery: soft pedagogical signal derived from quiz performance + attempts
 * 4. Applied: engagement with real-world observation or application
 * 5. Built: creation of models, projects, or synthesis artifacts
 */

import type { ExperienceProgress, MasterySignal } from '../types/user';
import type { QuizAttempt } from '../types/user';

export interface ProgressSummary {
  totalStarted: number;
  totalCompleted: number;
  totalApplied: number;
  totalBuilt: number;
  totalInteractions: number;
  masteryCounts: Record<MasterySignal, number>;
}

/**
 * Derives a soft mastery indicator from multiple pedagogical signals.
 * Never outputs false-precision percentage numbers as mastery.
 */
export function deriveMasterySignal(
  attempts: QuizAttempt[],
  interactionsCount: number,
  isApplied: boolean,
  isBuilt: boolean
): MasterySignal {
  if (!attempts || attempts.length === 0) {
    // If learner hasn't taken a quiz yet, but has explored and built/applied
    if (isBuilt && isApplied) return 'solid';
    if (isApplied || interactionsCount >= 3) return 'developing';
    return 'none';
  }

  // Get best and most recent scores
  const bestScore = Math.max(...attempts.map((a) => a.score));
  const recentScore = attempts[attempts.length - 1].score;
  const attemptCount = attempts.length;

  // Multi-signal evaluation
  let signalScore = 0;

  // 1. Quiz performance component
  if (bestScore >= 90) signalScore += 3;
  else if (bestScore >= 70) signalScore += 2;
  else if (bestScore >= 50) signalScore += 1;

  // 2. Resilience / deliberate practice bonus (retrying to improve understanding)
  if (attemptCount >= 2 && recentScore >= bestScore) {
    signalScore += 0.5;
  }

  // 3. Hands-on exploration depth
  if (interactionsCount >= 2) {
    signalScore += 0.5;
  }

  // 4. Real-world application component
  if (isApplied) {
    signalScore += 1;
  }

  // 5. Synthesis / Built component
  if (isBuilt) {
    signalScore += 1;
  }

  // Classify into qualitative levels
  if (signalScore >= 4.5) return 'strong';
  if (signalScore >= 2.5) return 'solid';
  if (signalScore >= 1) return 'developing';
  return 'none';
}

/**
 * Returns human-readable label and description for a mastery signal.
 */
export function getMasteryLabel(signal: MasterySignal): {
  label: string;
  description: string;
  badgeClass: string;
} {
  switch (signal) {
    case 'strong':
      return {
        label: 'Strong Understanding',
        description: 'Demonstrated conceptual clarity, exploration, and application.',
        badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-800',
      };
    case 'solid':
      return {
        label: 'Solid Understanding',
        description: 'Grasped core scientific processes and successfully verified concepts.',
        badgeClass: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-800',
      };
    case 'developing':
      return {
        label: 'Developing Understanding',
        description: 'Actively exploring phenomena and testing preliminary hypotheses.',
        badgeClass: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800',
      };
    case 'none':
    default:
      return {
        label: 'Inquiry in Progress',
        description: 'Ready to investigate concepts and test understanding.',
        badgeClass: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700',
      };
  }
}

/**
 * Aggregates all progress entries across the user workspace
 */
export function computeProgressSummary(
  progressMap: Record<string, ExperienceProgress>
): ProgressSummary {
  const summary: ProgressSummary = {
    totalStarted: 0,
    totalCompleted: 0,
    totalApplied: 0,
    totalBuilt: 0,
    totalInteractions: 0,
    masteryCounts: {
      none: 0,
      developing: 0,
      solid: 0,
      strong: 0,
    },
  };

  for (const progress of Object.values(progressMap)) {
    if (progress.status === 'started' || progress.status === 'completed') {
      summary.totalStarted += 1;
    }
    if (progress.status === 'completed') {
      summary.totalCompleted += 1;
    }
    if (progress.isApplied) {
      summary.totalApplied += 1;
    }
    if (progress.isBuilt) {
      summary.totalBuilt += 1;
    }
    summary.totalInteractions += progress.exploration?.interactionsCount || 0;
    summary.masteryCounts[progress.masterySignal || 'none'] += 1;
  }

  return summary;
}
