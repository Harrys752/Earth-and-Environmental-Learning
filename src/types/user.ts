/**
 * User State and Progress Types
 * Follows multi-dimensional progress architecture (non-linear state tracking)
 */

import type { JourneyEntry, Reflection, UnlockedMilestone } from './journey';

export type ExperienceStatus = 'not-started' | 'started' | 'completed';

export type MasterySignal = 'none' | 'developing' | 'solid' | 'strong';

export interface ExplorationActivity {
  simulationsExplored: string[]; // IDs of simulations manipulated
  diagramsInteracted: string[]; // IDs of interactive diagrams explored
  interactionsCount: number;
  lastExploredAt?: string;
}

export interface QuizAttempt {
  quizId: string;
  timestamp: string;
  answers: Record<string, unknown>;
  score: number; // percentage, 0-100
  attemptNumber: number;
}

/**
 * Multi-dimensional progress for a single learning experience.
 * Core status, exploration, mastery signal, applied, and built are orthogonal dimensions.
 */
export interface ExperienceProgress {
  experienceSlug: string;
  
  // Core experience status
  status: ExperienceStatus;
  startedAt?: string;
  completedAt?: string;

  // Exploration dimension
  exploration: ExplorationActivity;

  // Assessment & Mastery dimension (derived soft indicator, not hard score)
  quizAttempts: QuizAttempt[];
  highestQuizScore?: number;
  masterySignal: MasterySignal;

  // Applied dimension (e.g. real-world observation challenge completed)
  isApplied: boolean;
  appliedAt?: string;
  appliedNote?: string;

  // Built dimension (e.g. project completed or built output)
  isBuilt: boolean;
  builtAt?: string;
  builtProjectSlug?: string;

  lastInteractedAt: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  motionPreference: 'normal' | 'reduced';
  soundEffects: boolean;
  fontSize: 'standard' | 'large';
  hasSeenOnboardingRoadmap?: boolean;
}

export interface LocalState {
  version: number;
  userProgress: Record<string, ExperienceProgress>;
  completedExperiences: string[];
  savedItems: string[];
  journeyEntries: JourneyEntry[];
  reflections: Reflection[];
  unlockedMilestones: UnlockedMilestone[];
  preferences: UserPreferences;
  lastActive: string;
}
