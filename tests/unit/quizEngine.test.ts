import { describe, it, expect } from 'vitest';
import { evaluateQuestion, evaluateQuiz } from '../../src/lib/quizEngine';
import type { Question, Quiz } from '../../src/types/quiz';

describe('Quiz Evaluation Engine', () => {
  const sampleQuestion: Question = {
    id: 'q1',
    type: 'single-choice',
    prompt: 'What causes flux melting in the mantle wedge?',
    options: [
      { id: 'opt-water', label: 'Water released from the subducting slab', isCorrect: true },
      { id: 'opt-fire', label: 'Magma from core', isCorrect: false },
    ],
    correctAnswer: 'opt-water',
    explanation: 'Dehydration of the oceanic crust releases supercritical water that disrupts peridotite bonds, lowering its melting temperature.',
    relatedConceptSlug: 'subduction',
  };

  it('evaluates single-choice correctly with full explanation payload', () => {
    const feedbackCorrect = evaluateQuestion(sampleQuestion, 'opt-water');
    expect(feedbackCorrect.isCorrect).toBe(true);
    expect(feedbackCorrect.scoreFraction).toBe(1.0);
    expect(feedbackCorrect.explanation).toBe(sampleQuestion.explanation);
    expect(feedbackCorrect.relatedConceptSlug).toBe('subduction');

    const feedbackWrong = evaluateQuestion(sampleQuestion, 'opt-fire');
    expect(feedbackWrong.isCorrect).toBe(false);
    expect(feedbackWrong.scoreFraction).toBe(0.0);
    expect(feedbackWrong.explanation).toBe(sampleQuestion.explanation);
  });

  it('evaluates multiple-choice correctly', () => {
    const multiQuestion: Question = {
      id: 'q-multi',
      type: 'multiple-choice',
      prompt: 'Select all features of volcanic arcs:',
      options: [
        { id: 'opt-viscous', label: 'Viscous andesitic magma', isCorrect: true },
        { id: 'opt-stratovolcano', label: 'Composite stratovolcanoes', isCorrect: true },
        { id: 'opt-dry', label: 'Completely dry without water', isCorrect: false },
      ],
      correctAnswer: ['opt-viscous', 'opt-stratovolcano'],
      explanation: 'Volcanic arcs produce viscous, volatile-rich andesite and dacite stratovolcanoes.',
    };

    const feedbackFull = evaluateQuestion(multiQuestion, ['opt-viscous', 'opt-stratovolcano']);
    expect(feedbackFull.isCorrect).toBe(true);
    expect(feedbackFull.scoreFraction).toBe(1.0);

    const feedbackPartial = evaluateQuestion(multiQuestion, ['opt-viscous']);
    expect(feedbackPartial.isCorrect).toBe(false);
    expect(feedbackPartial.scoreFraction).toBe(0.5);

    const feedbackWithWrong = evaluateQuestion(multiQuestion, ['opt-viscous', 'opt-dry']);
    expect(feedbackWithWrong.isCorrect).toBe(false);
    expect(feedbackWithWrong.scoreFraction).toBe(0);
  });

  it('evaluates ordering questions', () => {
    const orderQuestion: Question = {
      id: 'q-order',
      type: 'ordering',
      prompt: 'Arrange stages in chronological order:',
      orderingItems: [
        { id: 'stage-1', label: 'Deposition', correctOrder: 0 },
        { id: 'stage-2', label: 'Lithification', correctOrder: 1 },
        { id: 'stage-3', label: 'Uplift', correctOrder: 2 },
      ],
      correctAnswer: ['stage-1', 'stage-2', 'stage-3'],
      explanation: 'Sediments must first deposit, then turn to rock, and finally get uplifted.',
    };

    const resultRight = evaluateQuestion(orderQuestion, ['stage-1', 'stage-2', 'stage-3']);
    expect(resultRight.isCorrect).toBe(true);
    expect(resultRight.scoreFraction).toBe(1.0);

    const resultWrong = evaluateQuestion(orderQuestion, ['stage-3', 'stage-2', 'stage-1']);
    expect(resultWrong.isCorrect).toBe(false);
    expect(resultWrong.scoreFraction).toBeCloseTo(0.33, 1);
  });

  it('evaluates matching pairs correctly', () => {
    const matchQuestion: Question = {
      id: 'q-match',
      type: 'matching',
      prompt: 'Match plate boundaries:',
      correctAnswer: {
        'subduction': 'Java Trench',
        'divergent': 'Mid-Atlantic',
      },
      explanation: 'Subduction forms the Java Trench while divergent spreading forms the Mid-Atlantic ridge.',
    };

    const correctMatch = evaluateQuestion(matchQuestion, {
      'subduction': 'Java Trench',
      'divergent': 'Mid-Atlantic',
    });
    expect(correctMatch.isCorrect).toBe(true);
    expect(correctMatch.scoreFraction).toBe(1.0);

    const partialMatch = evaluateQuestion(matchQuestion, {
      'subduction': 'Java Trench',
      'divergent': 'Wrong Ridge',
    });
    expect(partialMatch.isCorrect).toBe(false);
    expect(partialMatch.scoreFraction).toBe(0.5);
  });

  it('evaluates calculation questions with tolerance margins', () => {
    const calcQuestion: Question = {
      id: 'q-calc',
      type: 'calculation',
      prompt: 'Calculate plate convergence rate:',
      calculationSpec: {
        targetValue: 6.5,
        tolerance: 0.5,
        stepByStepSolution: 'Rate = distance / time = 65 km / 10 Myr = 6.5 cm/yr.',
      },
      correctAnswer: 6.5,
      explanation: 'The Java Trench convergence rate is approximately 6.5 cm/year.',
    };

    const exact = evaluateQuestion(calcQuestion, 6.5);
    expect(exact.isCorrect).toBe(true);

    const withinTolerance = evaluateQuestion(calcQuestion, 6.8);
    expect(withinTolerance.isCorrect).toBe(true);

    const outsideTolerance = evaluateQuestion(calcQuestion, 7.5);
    expect(outsideTolerance.isCorrect).toBe(false);
  });

  it('evaluates an entire quiz and derives qualitative soft mastery signal', () => {
    const sampleQuiz: Quiz = {
      id: 'test-quiz',
      experienceSlug: 'why-volcanoes-form',
      title: 'Volcanism Test',
      passingScore: 70,
      questions: [sampleQuestion],
    };

    const evalResult = evaluateQuiz(sampleQuiz, { q1: 'opt-water' });
    expect(evalResult.passed).toBe(true);
    expect(evalResult.scorePercentage).toBe(100);
    expect(evalResult.correctCount).toBe(1);
    expect(evalResult.masteryContribution).toBe('solid');
  });
});
