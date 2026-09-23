/**
 * Core Content Types for Earth & Environmental Sciences Learning Platform
 */

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export type EstimatedTimeBucket = '5min' | '10min' | '15min' | '20min' | '30plus';

export type ScientificSourceType =
  | 'textbook'
  | 'peer-reviewed'
  | 'government-agency'
  | 'university'
  | 'scientific-institution'
  | 'dataset'
  | 'other';

export type ScientificConfidence =
  | 'established'
  | 'well-supported'
  | 'emerging'
  | 'illustrative-model';

export type ReviewStatus = 'draft' | 'reviewed' | 'published' | 'deprecated';

export type TopicCategory =
  | 'earth-structure'
  | 'geology'
  | 'minerals'
  | 'rocks'
  | 'plate-tectonics'
  | 'atmosphere'
  | 'climate'
  | 'hydrology'
  | 'paleontology'
  | 'natural-hazards'
  | 'environmental-systems'
  | 'sustainability';

export interface Reference {
  title: string;
  url?: string;
  publisher?: string;
  year?: number;
}

export interface ScientificMetadata {
  source: string[];
  sourceType: ScientificSourceType;
  lastReviewed: string; // ISO date string
  scientificLevel: DifficultyLevel;
  confidence: ScientificConfidence;
  references: Reference[];
  notesOnSimplification?: string;
}

export interface ReviewMetadata {
  reviewStatus: ReviewStatus;
  sourceList: string[];
  lastReviewed: string;
  contentVersion: string;
}

export interface GeoMapConnection {
  locationSlug: string;
  label: string;
  coordinates?: { lat: number; lng: number };
  geoMapDeepLinkParams?: Record<string, string>;
  description?: string;
}

export interface RealWorldConnection {
  title: string;
  locationName: string;
  isIndonesiaFirst: boolean;
  coordinates?: { lat: number; lng: number };
  description: string;
  phenomenon: string;
  globalGeneralization: string;
  geoMapSlug?: string;
}

export interface ReflectionPrompt {
  id: string;
  prompt: string;
  placeholder?: string;
  category?: 'surprise' | 'observation' | 'clarity' | 'connection';
}

export interface InteractiveElementRef {
  id: string;
  type: 'diagram' | 'timeline' | 'slider' | 'simulation' | 'chart' | 'matching';
  title: string;
  pedagogicalPurpose: string;
  isIllustrativeModel: boolean;
  accessibleFallbackText: string;
  configKey?: string;
}

export interface QuizRef {
  quizId: string;
  title: string;
  questionCount?: number;
}

export type ContentBlockType =
  | 'prose'
  | 'diagram'
  | 'simulation'
  | 'real-world-example'
  | 'geomap-connection'
  | 'data-visualization'
  | 'quiz'
  | 'reflection'
  | 'observation-challenge'
  | 'project-activity';

export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  title?: string;
  data?: Record<string, unknown>;
  content?: string;
}

export interface LearningExperience {
  id: string;
  slug: string;
  title: string;
  tagline?: string;
  description: string;
  topic: string; // topic slug
  category?: TopicCategory;
  difficulty: DifficultyLevel;
  estimatedTime: EstimatedTimeBucket;
  learningObjectives: string[];
  prerequisites: string[]; // experience slugs
  interactiveElements?: InteractiveElementRef[];
  quiz?: QuizRef;
  realWorldConnections?: RealWorldConnection[];
  geoMapConnections?: GeoMapConnection[];
  reflection?: ReflectionPrompt[];
  nextExperiences: string[]; // experience slugs
  scientific: ScientificMetadata;
  review: ReviewMetadata;
  featured?: boolean;
}

export interface Topic {
  id: string;
  slug: string;
  title: string;
  tagline?: string;
  description: string;
  category: TopicCategory;
  experiences: string[]; // experience slugs
  relatedConcepts: string[];
  relatedLocations: string[];
  icon?: string;
}

export interface Concept {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  domain: string;
  relatedTopics: string[];
  relatedExperiences: string[];
  relatedConcepts: string[];
  relatedLocations: string[];
  scientificNotes?: string;
}

export interface EarthLocation {
  id: string;
  slug: string;
  name: string;
  country: string;
  isIndonesia: boolean;
  coordinates: { lat: number; lng: number };
  relatedExperiences: string[];
  relatedConcepts: string[];
  description: string;
  geologicalContext: string;
  geoMapDeepLinkParams?: Record<string, string>;
}

export interface LearningPath {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  estimatedTime: string;
  experiences: {
    slug: string;
    stage: 'foundation' | 'deep-dive' | 'application' | 'synthesis';
    notes?: string;
  }[];
  learningOutcomes: string[];
}

export interface ProjectActivity {
  id: string;
  slug: string;
  title: string;
  description: string;
  relatedExperienceSlug: string;
  topic: string;
  difficulty: DifficultyLevel;
  estimatedTime: string;
  objectives: string[];
  instructions: string[];
  deliverableType: 'visualization' | 'observation-log' | 'report' | 'model';
}
