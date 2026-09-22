/**
 * Quiz and Assessment Types
 */

export type QuestionType =
  | 'single-choice'
  | 'multiple-choice'
  | 'true-false'
  | 'matching'
  | 'ordering'
  | 'calculation'
  | 'identification'
  | 'interactive';

export interface ChoiceOption {
  id: string;
  label: string;
  sublabel?: string;
  isCorrect?: boolean; // For single/multiple choice
  explanation?: string; // Optional option-specific feedback
}

export interface MatchingPair {
  id: string;
  left: string;
  right: string;
}

export interface OrderingItem {
  id: string;
  label: string;
  correctOrder: number; // 0-indexed correct rank
}

export interface CalculationSpec {
  unit?: string;
  targetValue: number;
  tolerance?: number; // Allowed error margin, e.g. 0.1
  stepByStepSolution: string;
}

export interface IdentificationSpec {
  imageUrl?: string;
  imageAlt?: string;
  clues: string[];
  diagnosticFeatures: string[];
}

export interface InteractiveQuestionSpec {
  interactiveType: 'slider' | 'boundary-selector' | 'cycle-step';
  targetState: Record<string, unknown>;
  tolerancePrompt?: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  prompt: string;
  contextNarrative?: string;
  options?: ChoiceOption[];
  matchingPairs?: MatchingPair[];
  orderingItems?: OrderingItem[];
  calculationSpec?: CalculationSpec;
  identificationSpec?: IdentificationSpec;
  interactiveSpec?: InteractiveQuestionSpec;
  correctAnswer: unknown; // typed according to question type in scoring engine
  explanation: string; // REQUIRED: Pedagogical reason why right/wrong
  conceptSnippet?: string; // Short micro-review of key concept
  relatedConceptSlug?: string;
  nextExplorationSlug?: string;
  hint?: string;
}

export interface Quiz {
  id: string;
  experienceSlug: string;
  title: string;
  description?: string;
  passingScore?: number; // e.g. 70
  questions: Question[];
}

export interface QuestionFeedback {
  questionId: string;
  isCorrect: boolean;
  scoreFraction: number; // 0.0 to 1.0
  userAnswer: unknown;
  correctAnswer: unknown;
  explanation: string;
  relatedConceptSlug?: string;
  nextExplorationSlug?: string;
}

export interface QuizEvaluationResult {
  quizId: string;
  totalQuestions: number;
  correctCount: number;
  scorePercentage: number;
  passed: boolean;
  questionFeedbacks: QuestionFeedback[];
  masteryContribution: 'none' | 'developing' | 'solid' | 'strong';
  timestamp: string;
}
