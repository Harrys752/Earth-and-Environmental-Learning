/**
 * Journey and Milestone Types
 */

export type JourneyEntryType =
  | 'learned'
  | 'applied'
  | 'built'
  | 'reflection'
  | 'observation'
  | 'milestone'
  | 'external-achievement';

export type JourneyEntrySource = 'automatic' | 'manual';

export interface JourneyEntry {
  id: string;
  type: JourneyEntryType;
  source: JourneyEntrySource;
  timestamp: string; // ISO datetime
  title: string;
  description?: string;
  relatedExperienceSlug?: string;
  relatedTopicSlug?: string;
  relatedConceptSlug?: string;
  metadata?: {
    tags?: string[];
    locationName?: string;
    mediaNote?: string;
    quizScore?: number;
    externalUrl?: string;
  };
}

export interface Reflection {
  id: string;
  experienceSlug: string;
  prompt: string;
  response: string;
  timestamp: string;
  promptCategory?: 'surprise' | 'observation' | 'clarity' | 'connection';
}

export interface Milestone {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  category: 'exploration' | 'comprehension' | 'observation' | 'synthesis';
  criteriaDescription: string;
}

export interface UnlockedMilestone {
  milestoneId: string;
  unlockedAt: string;
}
