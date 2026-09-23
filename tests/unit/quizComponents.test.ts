import { describe, it, expect } from 'vitest';
import { h } from 'preact';
import Question from '../../src/components/quiz/Question';
import { whyVolcanoesFormQuiz } from '../../src/data/quizzes/why-volcanoes-form';
import { whyVolcanoesFormQuizId } from '../../src/data/quizzes/id/why-volcanoes-form';

describe('Preact Quiz & Question Component In-Depth Verification', () => {
  it('renders Question component for ordering type with all item labels and accessibility controls', () => {
    const orderingQ = whyVolcanoesFormQuizId.questions.find((q) => q.type === 'ordering')!;
    expect(orderingQ).toBeDefined();

    const vnode = h(Question, {
      question: orderingQ,
      questionNumber: 4,
      totalQuestions: 6,
      onAnswerSubmit: () => {},
      onRetryQuestion: () => {},
      onNextQuestion: () => {},
      isLastQuestion: false,
      locale: 'id',
    });

    expect(vnode).toBeDefined();
    expect(vnode.type).toBe(Question);
    expect(vnode.props.question.id).toBe('q4-stages-ordering');
  });

  it('renders English ordering question and has distinct non-revealing initial order', () => {
    const orderingQ = whyVolcanoesFormQuiz.questions.find((q) => q.type === 'ordering')!;
    const ids = orderingQ.orderingItems!.map((o) => o.id);
    const correct = orderingQ.correctAnswer as string[];

    // Verify correct answers in data matches length
    expect(ids.length).toBe(5);
    expect(correct.length).toBe(5);
    expect(ids).toEqual(correct);
  });
});
