import { describe, it, expect } from 'vitest';
import { evaluateQuestion, evaluateQuiz } from '../../src/lib/quizEngine';
import { whyVolcanoesFormQuiz } from '../../src/data/quizzes/why-volcanoes-form';
import { whyVolcanoesFormQuizId } from '../../src/data/quizzes/id/why-volcanoes-form';
import { howRainFormsQuiz } from '../../src/data/quizzes/how-rain-forms';
import type { Question, QuestionFeedback } from '../../src/types/quiz';

describe('Quiz System - Ordering Question UI & Scoring', () => {
  it('correctly validates why-volcanoes-form ordering question in English', () => {
    const orderingQ = whyVolcanoesFormQuiz.questions.find((q) => q.type === 'ordering');
    expect(orderingQ).toBeDefined();
    expect(orderingQ?.orderingItems).toBeDefined();
    expect(orderingQ?.orderingItems?.length).toBe(5);

    // Initial reversed order (scrambled)
    const reversedOrder = orderingQ!.orderingItems!.map((i) => i.id).reverse();
    const wrongEval = evaluateQuestion(orderingQ!, reversedOrder);
    expect(wrongEval.isCorrect).toBe(false);
    expect(wrongEval.scoreFraction).toBeLessThan(1);

    // Correct full order
    const correctOrder = orderingQ!.correctAnswer as string[];
    const correctEval = evaluateQuestion(orderingQ!, correctOrder);
    expect(correctEval.isCorrect).toBe(true);
    expect(correctEval.scoreFraction).toBe(1.0);
    expect(correctEval.explanation).toContain('tectonic plate convergence');
  });

  it('correctly validates why-volcanoes-form ordering question in Indonesian', () => {
    const orderingQ = whyVolcanoesFormQuizId.questions.find((q) => q.type === 'ordering');
    expect(orderingQ).toBeDefined();
    expect(orderingQ?.orderingItems).toBeDefined();
    expect(orderingQ?.orderingItems?.length).toBe(5);

    // Incorrect order test
    const incorrectOrder = ['step-erupt', 'step-ascend', 'step-partial-melt', 'step-dehydrate', 'step-subduct'];
    const wrongEval = evaluateQuestion(orderingQ!, incorrectOrder);
    expect(wrongEval.isCorrect).toBe(false);

    // Correct order test
    const correctOrder = ['step-subduct', 'step-dehydrate', 'step-partial-melt', 'step-ascend', 'step-erupt'];
    const correctEval = evaluateQuestion(orderingQ!, correctOrder);
    expect(correctEval.isCorrect).toBe(true);
    expect(correctEval.scoreFraction).toBe(1.0);
  });

  it('correctly validates how-rain-forms ordering question', () => {
    const orderingQ = howRainFormsQuiz.questions.find((q) => q.type === 'ordering');
    expect(orderingQ).toBeDefined();
    expect(orderingQ?.orderingItems?.length).toBe(5);

    const correctOrder = ['s1-evap', 's2-lift', 's3-ccn', 's4-collide', 's5-fall'];
    const correctEval = evaluateQuestion(orderingQ!, correctOrder);
    expect(correctEval.isCorrect).toBe(true);
  });
});

describe('Quiz System - State Reset & Retry Handler Reliability', () => {
  // Simulates Quiz state store lifecycle across consecutive retries and multiple question types
  class QuizSessionSimulator {
    answers: Record<string, unknown> = {};
    feedbacks: Record<string, QuestionFeedback> = {};
    activeInputs: Record<string, unknown> = {};

    submitAnswer(question: Question, answer: unknown) {
      const fb = evaluateQuestion(question, answer);
      this.answers[question.id] = answer;
      this.feedbacks[question.id] = fb;
      this.activeInputs[question.id] = answer;
      return fb;
    }

    retryQuestion(questionId: string) {
      delete this.answers[questionId];
      delete this.feedbacks[questionId];
      delete this.activeInputs[questionId];
    }

    isQuestionAnswered(questionId: string) {
      return !!this.feedbacks[questionId];
    }

    getFeedback(questionId: string) {
      return this.feedbacks[questionId];
    }
  }

  it('handles multiple consecutive retries on single-choice questions without state corruption', () => {
    const session = new QuizSessionSimulator();
    const qSingle = whyVolcanoesFormQuiz.questions[0]; // q1-melting-mechanism

    // Attempt 1: Wrong answer
    const fb1 = session.submitAnswer(qSingle, 'opt-friction');
    expect(fb1.isCorrect).toBe(false);
    expect(session.isQuestionAnswered(qSingle.id)).toBe(true);

    // User clicks Retry (Attempt 1 -> Retry)
    session.retryQuestion(qSingle.id);
    expect(session.isQuestionAnswered(qSingle.id)).toBe(false);
    expect(session.answers[qSingle.id]).toBeUndefined();
    expect(session.getFeedback(qSingle.id)).toBeUndefined();

    // Attempt 2: Another wrong answer (consecutive wrong attempt)
    const fb2 = session.submitAnswer(qSingle, 'opt-core-heat');
    expect(fb2.isCorrect).toBe(false);
    expect(session.isQuestionAnswered(qSingle.id)).toBe(true);

    // User clicks Retry again (Attempt 2 -> Retry)
    session.retryQuestion(qSingle.id);
    expect(session.isQuestionAnswered(qSingle.id)).toBe(false);

    // Attempt 3: Correct answer
    const fb3 = session.submitAnswer(qSingle, 'opt-flux-melting');
    expect(fb3.isCorrect).toBe(true);
    expect(session.isQuestionAnswered(qSingle.id)).toBe(true);
    expect(fb3.scoreFraction).toBe(1.0);
  });

  it('handles multiple consecutive retries on ordering questions without state corruption', () => {
    const session = new QuizSessionSimulator();
    const qOrder = whyVolcanoesFormQuiz.questions.find((q) => q.type === 'ordering')!;

    // Attempt 1: Wrong initial scrambled order
    const wrong1 = ['step-erupt', 'step-ascend', 'step-partial-melt', 'step-dehydrate', 'step-subduct'];
    const fb1 = session.submitAnswer(qOrder, wrong1);
    expect(fb1.isCorrect).toBe(false);
    expect(session.isQuestionAnswered(qOrder.id)).toBe(true);

    // Retry 1
    session.retryQuestion(qOrder.id);
    expect(session.isQuestionAnswered(qOrder.id)).toBe(false);

    // Attempt 2: Second wrong attempt with partial error
    const wrong2 = ['step-subduct', 'step-partial-melt', 'step-dehydrate', 'step-ascend', 'step-erupt'];
    const fb2 = session.submitAnswer(qOrder, wrong2);
    expect(fb2.isCorrect).toBe(false);
    expect(session.isQuestionAnswered(qOrder.id)).toBe(true);

    // Retry 2
    session.retryQuestion(qOrder.id);
    expect(session.isQuestionAnswered(qOrder.id)).toBe(false);

    // Attempt 3: Fully correct order
    const correct = ['step-subduct', 'step-dehydrate', 'step-partial-melt', 'step-ascend', 'step-erupt'];
    const fb3 = session.submitAnswer(qOrder, correct);
    expect(fb3.isCorrect).toBe(true);
    expect(fb3.scoreFraction).toBe(1.0);
  });

  it('handles consecutive retries on multiple-choice questions', () => {
    const session = new QuizSessionSimulator();
    const qMulti = whyVolcanoesFormQuiz.questions.find((q) => q.type === 'multiple-choice')!;

    // Attempt 1: Wrong selection
    const fb1 = session.submitAnswer(qMulti, ['opt-basalt-fluid']);
    expect(fb1.isCorrect).toBe(false);

    // Retry 1
    session.retryQuestion(qMulti.id);
    expect(session.isQuestionAnswered(qMulti.id)).toBe(false);

    // Attempt 2: Incomplete selection
    const fb2 = session.submitAnswer(qMulti, ['opt-silica']);
    expect(fb2.isCorrect).toBe(false);

    // Retry 2
    session.retryQuestion(qMulti.id);
    expect(session.isQuestionAnswered(qMulti.id)).toBe(false);

    // Attempt 3: All correct selections
    const fb3 = session.submitAnswer(qMulti, ['opt-silica', 'opt-volatiles', 'opt-crust-assimilation']);
    expect(fb3.isCorrect).toBe(true);
    expect(fb3.scoreFraction).toBe(1.0);
  });

  it('evaluates entire quiz cleanly after retries and score contribution matches', () => {
    const fullAnswers: Record<string, unknown> = {
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

    const finalResult = evaluateQuiz(whyVolcanoesFormQuiz, fullAnswers, []);
    expect(finalResult.passed).toBe(true);
    expect(finalResult.scorePercentage).toBe(100);
    expect(finalResult.correctCount).toBe(6);
    expect(finalResult.totalQuestions).toBe(6);
  });
});
