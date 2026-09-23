/**
 * Persistence Abstraction Layer
 * Wraps browser LocalStorage with memory fallback, typed APIs, and cross-island event sync.
 */

import type {
  LocalState,
  ExperienceProgress,
  ExperienceStatus,
  UserPreferences,
  QuizAttempt,
} from '../types/user';
import type { JourneyEntry, Reflection } from '../types/journey';

const STORAGE_KEY = 'earth_learning_v1_state';
const CURRENT_VERSION = 1;

const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'system',
  motionPreference: 'normal',
  soundEffects: false,
  fontSize: 'standard',
  hasSeenOnboardingRoadmap: false,
};

export function getDefaultState(): LocalState {
  return {
    version: CURRENT_VERSION,
    userProgress: {},
    completedExperiences: [],
    savedItems: [],
    journeyEntries: [],
    reflections: [],
    unlockedMilestones: [],
    preferences: { ...DEFAULT_PREFERENCES },
    lastActive: new Date().toISOString(),
  };
}

// In-memory fallback for environments where LocalStorage is restricted/disabled
let inMemoryState: LocalState = getDefaultState();
let isStorageAvailable: boolean | null = null;

function checkStorageAvailability(): boolean {
  if (typeof window === 'undefined') return false;
  if (isStorageAvailable !== null) return isStorageAvailable;
  try {
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
    isStorageAvailable = true;
  } catch {
    isStorageAvailable = false;
    console.warn('LocalStorage is unavailable. Falling back to session memory.');
  }
  return isStorageAvailable;
}

function notifySubscribers() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('earth-learning:state-changed'));
  }
}

export function loadState(): LocalState {
  if (typeof window === 'undefined' || !checkStorageAvailability()) {
    return inMemoryState;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return inMemoryState;
    const parsed = JSON.parse(raw) as LocalState;
    if (parsed.version !== CURRENT_VERSION) {
      // Future migration logic can live here
      inMemoryState = { ...getDefaultState(), ...parsed, version: CURRENT_VERSION };
      return inMemoryState;
    }
    inMemoryState = parsed;
    return parsed;
  } catch (err) {
    console.error('Failed to parse local state, resetting to default', err);
    inMemoryState = getDefaultState();
    return inMemoryState;
  }
}

export function persistState(state: LocalState): void {
  state.lastActive = new Date().toISOString();
  inMemoryState = state;

  if (typeof window !== 'undefined' && checkStorageAvailability()) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.warn('Could not write state to LocalStorage:', err);
    }
    notifySubscribers();
  }
}

/**
 * Returns empty initial progress structure for an experience
 */
export function createDefaultProgress(experienceSlug: string): ExperienceProgress {
  return {
    experienceSlug,
    status: 'not-started',
    exploration: {
      simulationsExplored: [],
      diagramsInteracted: [],
      interactionsCount: 0,
    },
    quizAttempts: [],
    masterySignal: 'none',
    isApplied: false,
    isBuilt: false,
    lastInteractedAt: new Date().toISOString(),
  };
}

export function getProgress(experienceSlug: string): ExperienceProgress {
  const state = loadState();
  return state.userProgress[experienceSlug] || createDefaultProgress(experienceSlug);
}

export function getAllProgress(): Record<string, ExperienceProgress> {
  const state = loadState();
  return state.userProgress;
}

export function saveProgress(progress: ExperienceProgress): void {
  const state = loadState();
  progress.lastInteractedAt = new Date().toISOString();
  state.userProgress[progress.experienceSlug] = progress;

  if (progress.status === 'completed' && !state.completedExperiences.includes(progress.experienceSlug)) {
    state.completedExperiences.push(progress.experienceSlug);
  } else if (progress.status !== 'completed') {
    state.completedExperiences = state.completedExperiences.filter((s) => s !== progress.experienceSlug);
  }

  persistState(state);
}

export function updateExperienceStatus(
  experienceSlug: string,
  status: ExperienceStatus
): ExperienceProgress {
  const progress = getProgress(experienceSlug);
  const now = new Date().toISOString();
  progress.status = status;
  if (status === 'started' && !progress.startedAt) {
    progress.startedAt = now;
  }
  if (status === 'completed') {
    progress.completedAt = now;
  }
  saveProgress(progress);
  return progress;
}

export function recordExploration(
  experienceSlug: string,
  type: 'simulation' | 'diagram',
  itemId: string
): ExperienceProgress {
  const progress = getProgress(experienceSlug);
  if (progress.status === 'not-started') {
    progress.status = 'started';
    progress.startedAt = new Date().toISOString();
  }

  if (type === 'simulation' && !progress.exploration.simulationsExplored.includes(itemId)) {
    progress.exploration.simulationsExplored.push(itemId);
  } else if (type === 'diagram' && !progress.exploration.diagramsInteracted.includes(itemId)) {
    progress.exploration.diagramsInteracted.push(itemId);
  }
  progress.exploration.interactionsCount += 1;
  progress.exploration.lastExploredAt = new Date().toISOString();

  saveProgress(progress);
  return progress;
}

export function recordQuizAttempt(
  experienceSlug: string,
  attempt: QuizAttempt,
  masterySignal: 'none' | 'developing' | 'solid' | 'strong'
): ExperienceProgress {
  const progress = getProgress(experienceSlug);
  progress.quizAttempts.push(attempt);
  if (progress.highestQuizScore === undefined || attempt.score > progress.highestQuizScore) {
    progress.highestQuizScore = attempt.score;
  }
  progress.masterySignal = masterySignal;
  saveProgress(progress);
  return progress;
}

export function setAppliedState(
  experienceSlug: string,
  applied: boolean,
  note?: string
): ExperienceProgress {
  const progress = getProgress(experienceSlug);
  progress.isApplied = applied;
  if (applied) {
    progress.appliedAt = new Date().toISOString();
    if (note) progress.appliedNote = note;
  }
  saveProgress(progress);
  return progress;
}

export function setBuiltState(
  experienceSlug: string,
  built: boolean,
  projectSlug?: string
): ExperienceProgress {
  const progress = getProgress(experienceSlug);
  progress.isBuilt = built;
  if (built) {
    progress.builtAt = new Date().toISOString();
    if (projectSlug) progress.builtProjectSlug = projectSlug;
  }
  saveProgress(progress);
  return progress;
}

// ---------------------------------------------------------------------------
// Journey Operations
// ---------------------------------------------------------------------------

export function getJourneyEntries(): JourneyEntry[] {
  const state = loadState();
  return state.journeyEntries.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

export function addJourneyEntry(
  entryData: Omit<JourneyEntry, 'id' | 'timestamp'>
): JourneyEntry {
  const state = loadState();
  const newEntry: JourneyEntry = {
    ...entryData,
    id: `entry_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toISOString(),
  };
  state.journeyEntries.unshift(newEntry);
  persistState(state);
  return newEntry;
}

export function getReflections(experienceSlug?: string): Reflection[] {
  const state = loadState();
  if (experienceSlug) {
    return state.reflections.filter((r) => r.experienceSlug === experienceSlug);
  }
  return state.reflections;
}

export function saveReflection(
  reflectionData: Omit<Reflection, 'id' | 'timestamp'>
): Reflection {
  const state = loadState();
  const newReflection: Reflection = {
    ...reflectionData,
    id: `refl_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toISOString(),
  };
  state.reflections.push(newReflection);

  // Also automatically log as a Journey Entry
  addJourneyEntry({
    type: 'reflection',
    source: 'manual',
    title: `Reflected on: ${reflectionData.prompt.substring(0, 45)}...`,
    description: reflectionData.response,
    relatedExperienceSlug: reflectionData.experienceSlug,
  });

  persistState(state);
  return newReflection;
}

// ---------------------------------------------------------------------------
// Preferences & Data Management
// ---------------------------------------------------------------------------

export function getPreferences(): UserPreferences {
  return loadState().preferences;
}

export function hasSeenOnboardingRoadmap(): boolean {
  return !!loadState().preferences.hasSeenOnboardingRoadmap;
}

export function setHasSeenOnboardingRoadmap(seen: boolean): void {
  savePreferences({ hasSeenOnboardingRoadmap: seen });
}

export function savePreferences(prefs: Partial<UserPreferences>): UserPreferences {
  const state = loadState();
  state.preferences = { ...state.preferences, ...prefs };
  persistState(state);
  return state.preferences;
}

export function exportUserData(): string {
  return JSON.stringify(loadState(), null, 2);
}

export function clearUserData(): void {
  if (typeof window !== 'undefined' && checkStorageAvailability()) {
    window.localStorage.removeItem(STORAGE_KEY);
  }
  inMemoryState = getDefaultState();
  notifySubscribers();
}
