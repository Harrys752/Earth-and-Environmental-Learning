/**
 * Quiz Scoring and Pedagogical Evaluation Engine
 * Handles scoring and feedback generation for all 8 supported question types.
 */

import type {
  Quiz,
  Question,
  QuestionFeedback,
  QuizEvaluationResult,
} from '../types/quiz';
import { deriveMasterySignal } from './progress';
import type { QuizAttempt } from '../types/user';

/**
 * Evaluates a single question given user response
 */
export function evaluateQuestion(
  question: Question,
  userAnswer: unknown
): QuestionFeedback {
  let isCorrect = false;
  let scoreFraction = 0;

  if (userAnswer === undefined || userAnswer === null) {
    return {
      questionId: question.id,
      isCorrect: false,
      scoreFraction: 0,
      userAnswer: null,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
      relatedConceptSlug: question.relatedConceptSlug,
      nextExplorationSlug: question.nextExplorationSlug,
    };
  }

  switch (question.type) {
    case 'single-choice':
    case 'true-false': {
      isCorrect = String(userAnswer).trim().toLowerCase() === String(question.correctAnswer).trim().toLowerCase();
      scoreFraction = isCorrect ? 1.0 : 0.0;
      break;
    }

    case 'multiple-choice': {
      // Expecting array of selected option IDs
      const userSelected = Array.isArray(userAnswer) ? (userAnswer as string[]) : [String(userAnswer)];
      const correctSelected = Array.isArray(question.correctAnswer)
        ? (question.correctAnswer as string[])
        : [String(question.correctAnswer)];

      const userSet = new Set(userSelected.map((s) => String(s).trim()));
      const correctSet = new Set(correctSelected.map((s) => String(s).trim()));

      let correctCount = 0;
      let incorrectCount = 0;

      for (const item of userSet) {
        if (correctSet.has(item)) {
          correctCount++;
        } else {
          incorrectCount++;
        }
      }

      // Exact match for 100%, or partial credit
      const isExactMatch = userSet.size === correctSet.size && correctCount === correctSet.size && incorrectCount === 0;
      if (isExactMatch) {
        isCorrect = true;
        scoreFraction = 1.0;
      } else {
        const netCorrect = Math.max(0, correctCount - incorrectCount);
        scoreFraction = correctSet.size > 0 ? netCorrect / correctSet.size : 0;
        isCorrect = scoreFraction >= 0.99;
      }
      break;
    }

    case 'matching': {
      // Expecting record of leftId -> rightId
      const userPairs = (userAnswer || {}) as Record<string, string>;
      const correctPairs = (question.correctAnswer || {}) as Record<string, string>;
      const keys = Object.keys(correctPairs);

      if (keys.length === 0) {
        isCorrect = true;
        scoreFraction = 1.0;
      } else {
        let matches = 0;
        for (const k of keys) {
          if (userPairs[k] === correctPairs[k]) {
            matches++;
          }
        }
        scoreFraction = matches / keys.length;
        isCorrect = matches === keys.length;
      }
      break;
    }

    case 'ordering': {
      // Expecting array of item IDs in selected order
      const userOrder = Array.isArray(userAnswer) ? (userAnswer as string[]) : [];
      const correctOrder = Array.isArray(question.correctAnswer) ? (question.correctAnswer as string[]) : [];

      if (userOrder.length !== correctOrder.length) {
        isCorrect = false;
        scoreFraction = 0;
      } else {
        let correctPositions = 0;
        for (let i = 0; i < correctOrder.length; i++) {
          if (userOrder[i] === correctOrder[i]) {
            correctPositions++;
          }
        }
        scoreFraction = correctOrder.length > 0 ? correctPositions / correctOrder.length : 0;
        isCorrect = scoreFraction === 1.0;
      }
      break;
    }

    case 'calculation': {
      const userNum = Number(userAnswer);
      const target = Number(question.correctAnswer);
      const tolerance = question.calculationSpec?.tolerance ?? 0.05;

      if (!isNaN(userNum) && !isNaN(target)) {
        const diff = Math.abs(userNum - target);
        isCorrect = diff <= tolerance;
        scoreFraction = isCorrect ? 1.0 : 0.0;
      } else {
        isCorrect = false;
        scoreFraction = 0.0;
      }
      break;
    }

    case 'identification': {
      const userIdent = String(userAnswer).trim().toLowerCase();
      const correctIdent = String(question.correctAnswer).trim().toLowerCase();
      isCorrect = userIdent === correctIdent;
      scoreFraction = isCorrect ? 1.0 : 0.0;
      break;
    }

    case 'interactive': {
      // Compare user target state with expected state
      const userState = (userAnswer || {}) as Record<string, unknown>;
      const targetState = (question.correctAnswer || {}) as Record<string, unknown>;
      const targetKeys = Object.keys(targetState);

      let matched = 0;
      for (const k of targetKeys) {
        if (String(userState[k]) === String(targetState[k])) {
          matched++;
        }
      }
      isCorrect = targetKeys.length > 0 && matched === targetKeys.length;
      scoreFraction = isCorrect ? 1.0 : 0.0;
      break;
    }

    default: {
      isCorrect = false;
      scoreFraction = 0;
    }
  }

  return {
    questionId: question.id,
    isCorrect,
    scoreFraction,
    userAnswer,
    correctAnswer: question.correctAnswer,
    explanation: question.explanation,
    relatedConceptSlug: question.relatedConceptSlug,
    nextExplorationSlug: question.nextExplorationSlug,
  };
}

/**
 * Evaluates an entire quiz attempt and derives pedagogical signals
 */
export function evaluateQuiz(
  quiz: Quiz,
  userAnswers: Record<string, unknown>,
  pastAttempts: QuizAttempt[] = []
): QuizEvaluationResult {
  const feedbacks: QuestionFeedback[] = [];
  let totalScoreFraction = 0;

  for (const question of quiz.questions) {
    const answer = userAnswers[question.id];
    const feedback = evaluateQuestion(question, answer);
    feedbacks.push(feedback);
    totalScoreFraction += feedback.scoreFraction;
  }

  const totalQuestions = quiz.questions.length;
  const correctCount = feedbacks.filter((f) => f.isCorrect).length;
  const scorePercentage = totalQuestions > 0 ? Math.round((totalScoreFraction / totalQuestions) * 100) : 0;
  const passThreshold = quiz.passingScore ?? 70;
  const passed = scorePercentage >= passThreshold;

  // Synthesize with prior history for mastery signal
  const currentAttempt: QuizAttempt = {
    quizId: quiz.id,
    timestamp: new Date().toISOString(),
    answers: userAnswers,
    score: scorePercentage,
    attemptNumber: pastAttempts.length + 1,
  };

  const masteryContribution = deriveMasterySignal(
    [...pastAttempts, currentAttempt],
    1,
    false,
    false
  );

  return {
    quizId: quiz.id,
    totalQuestions,
    correctCount,
    scorePercentage,
    passed,
    questionFeedbacks: feedbacks,
    masteryContribution,
    timestamp: new Date().toISOString(),
  };
}
