import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// Scientific Metadata Schema
const scientificMetadataSchema = z.object({
  source: z.array(z.string()),
  sourceType: z.enum([
    'textbook',
    'peer-reviewed',
    'government-agency',
    'university',
    'scientific-institution',
    'dataset',
    'other',
  ]),
  lastReviewed: z.string(), // ISO date
  scientificLevel: z.enum(['beginner', 'intermediate', 'advanced']),
  confidence: z.enum([
    'established',
    'well-supported',
    'emerging',
    'illustrative-model',
  ]),
  references: z.array(
    z.object({
      title: z.string(),
      url: z.string().optional(),
      publisher: z.string().optional(),
      year: z.number().optional(),
    })
  ).default([]),
  notesOnSimplification: z.string().optional(),
});

// Review Metadata Schema
const reviewMetadataSchema = z.object({
  reviewStatus: z.enum(['draft', 'reviewed', 'published', 'deprecated']),
  sourceList: z.array(z.string()).default([]),
  lastReviewed: z.string(),
  contentVersion: z.string().default('1.0.0'),
});

// Interactive Element Reference Schema
const interactiveElementSchema = z.object({
  id: z.string(),
  type: z.enum(['diagram', 'timeline', 'slider', 'simulation', 'chart', 'matching']),
  title: z.string(),
  pedagogicalPurpose: z.string(),
  isIllustrativeModel: z.boolean().default(false),
  accessibleFallbackText: z.string(),
  configKey: z.string().optional(),
});

// GeoMap Connection Schema
const geoMapConnectionSchema = z.object({
  locationSlug: z.string(),
  label: z.string(),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number(),
  }).optional(),
  geoMapDeepLinkParams: z.record(z.string(), z.string()).optional(),
  description: z.string().optional(),
});

// Real-World Connection Schema
const realWorldConnectionSchema = z.object({
  title: z.string(),
  locationName: z.string(),
  isIndonesiaFirst: z.boolean().default(true),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number(),
  }).optional(),
  description: z.string(),
  phenomenon: z.string(),
  globalGeneralization: z.string(),
  geoMapSlug: z.string().optional(),
});

// Reflection Prompt Schema
const reflectionPromptSchema = z.object({
  id: z.string(),
  prompt: z.string(),
  placeholder: z.string().optional(),
  category: z.enum(['surprise', 'observation', 'clarity', 'connection']).optional(),
});

// Learning Experiences Collection
const experiences = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/experiences' }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    tagline: z.string().optional(),
    description: z.string(),
    topic: z.string(), // topic slug
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    estimatedTime: z.enum(['5min', '10min', '20min', '30plus']),
    learningObjectives: z.array(z.string()).min(1),
    prerequisites: z.array(z.string()).default([]),
    interactiveElements: z.array(interactiveElementSchema).default([]),
    quiz: z.object({
      quizId: z.string(),
      title: z.string(),
      questionCount: z.number().optional(),
    }).optional(),
    realWorldConnections: z.array(realWorldConnectionSchema).default([]),
    geoMapConnections: z.array(geoMapConnectionSchema).default([]),
    reflection: z.array(reflectionPromptSchema).default([]),
    nextExperiences: z.array(z.string()).default([]),
    scientific: scientificMetadataSchema,
    review: reviewMetadataSchema,
    featured: z.boolean().default(false),
  }),
});

// Topics Collection
const topics = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/topics' }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    tagline: z.string().optional(),
    description: z.string(),
    category: z.enum([
      'earth-structure',
      'geology',
      'minerals',
      'rocks',
      'plate-tectonics',
      'atmosphere',
      'climate',
      'hydrology',
      'paleontology',
      'natural-hazards',
      'environmental-systems',
      'sustainability',
    ]),
    experiences: z.array(z.string()).default([]),
    relatedConcepts: z.array(z.string()).default([]),
    relatedLocations: z.array(z.string()).default([]),
    icon: z.string().optional(),
  }),
});

// Concepts Collection
const concepts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/concepts' }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    summary: z.string(),
    description: z.string(),
    domain: z.string(),
    relatedTopics: z.array(z.string()).default([]),
    relatedExperiences: z.array(z.string()).default([]),
    relatedConcepts: z.array(z.string()).default([]),
    relatedLocations: z.array(z.string()).default([]),
    scientificNotes: z.string().optional(),
  }),
});

// Projects Collection
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    relatedExperienceSlug: z.string(),
    topic: z.string(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    estimatedTime: z.string(),
    objectives: z.array(z.string()).min(1),
    instructions: z.array(z.string()).min(1),
    deliverableType: z.enum(['visualization', 'observation-log', 'report', 'model']),
  }),
});

export const collections = {
  experiences,
  topics,
  concepts,
  projects,
};
