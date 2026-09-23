import { useState, useEffect } from 'preact/hooks';
import type { Question as QuestionType, QuestionFeedback } from '../../types/quiz';
import AnswerOption from './AnswerOption';
import FeedbackPanel from './FeedbackPanel';
import { useTranslations } from '../../i18n';
import type { Locale } from '../../lib/i18nUrl';

export interface QuestionProps {
  question: QuestionType;
  questionNumber: number;
  totalQuestions: number;
  onAnswerSubmit: (questionId: string, answer: unknown) => void;
  onRetryQuestion?: (questionId: string) => void;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
  activeFeedback?: QuestionFeedback;
  locale?: Locale;
}

function getInitialOrdering(question: QuestionType): string[] {
  if (!question.orderingItems || question.orderingItems.length === 0) return [];
  const ids = question.orderingItems.map((o) => o.id);
  if (ids.length <= 1) return ids;

  const correct = Array.isArray(question.correctAnswer) ? (question.correctAnswer as string[]) : [];

  // Reverse items as default non-revealing order
  let initial = [...ids].reverse();

  // If reversing happens to match the correct order, shift by 1 to ensure scrambled initial order
  if (correct.length > 0 && JSON.stringify(initial) === JSON.stringify(correct)) {
    initial = [...initial.slice(1), initial[0]];
  }

  return initial;
}

export default function Question({
  question,
  questionNumber,
  totalQuestions,
  onAnswerSubmit,
  onRetryQuestion,
  onNextQuestion,
  isLastQuestion,
  activeFeedback,
  locale = 'en',
}: QuestionProps) {
  const t = useTranslations(locale);

  // Internal selection state depending on question type
  const [singleAnswer, setSingleAnswer] = useState<string>('');
  const [multiAnswers, setMultiAnswers] = useState<string[]>([]);
  const [matchingAnswers, setMatchingAnswers] = useState<Record<string, string>>({});
  const [orderedItems, setOrderedItems] = useState<string[]>(() => getInitialOrdering(question));
  const [hasInteractedOrdering, setHasInteractedOrdering] = useState<boolean>(false);
  const [calcAnswer, setCalcAnswer] = useState<string>('');
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  const resetQuestionState = (targetQuestion: QuestionType = question) => {
    setSingleAnswer('');
    setMultiAnswers([]);
    setMatchingAnswers({});
    setOrderedItems(getInitialOrdering(targetQuestion));
    setHasInteractedOrdering(false);
    setCalcAnswer('');
    setDraggedIdx(null);
  };

  // Synchronize internal state when the active question changes
  useEffect(() => {
    resetQuestionState(question);
  }, [question.id]);

  const isAnswered = !!activeFeedback;

  const handleSingleSelect = (id: string) => {
    if (isAnswered) return;
    setSingleAnswer(id);
  };

  const handleMultiSelect = (id: string) => {
    if (isAnswered) return;
    setMultiAnswers((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleMatchSelect = (leftId: string, rightVal: string) => {
    if (isAnswered) return;
    setMatchingAnswers((prev) => ({ ...prev, [leftId]: rightVal }));
  };

  const moveOrderItem = (index: number, direction: 'up' | 'down') => {
    if (isAnswered) return;
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= orderedItems.length) return;
    const updated = [...orderedItems];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setOrderedItems(updated);
    setHasInteractedOrdering(true);
  };

  const handleDragStart = (e: DragEvent, idx: number) => {
    if (isAnswered) return;
    setDraggedIdx(idx);
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', String(idx));
    }
  };

  const handleDragOver = (e: DragEvent) => {
    if (isAnswered) return;
    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'move';
    }
  };

  const handleDrop = (e: DragEvent, toIdx: number) => {
    if (isAnswered) return;
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === toIdx) {
      setDraggedIdx(null);
      return;
    }
    const updated = [...orderedItems];
    const [moved] = updated.splice(draggedIdx, 1);
    updated.splice(toIdx, 0, moved);
    setOrderedItems(updated);
    setHasInteractedOrdering(true);
    setDraggedIdx(null);
  };

  const handleRetry = () => {
    resetQuestionState(question);
    if (onRetryQuestion) {
      onRetryQuestion(question.id);
    }
  };

  const handleSubmit = (e?: Event) => {
    if (e) e.preventDefault();
    if (isAnswered) return;

    let answerPayload: unknown = null;

    switch (question.type) {
      case 'single-choice':
      case 'true-false':
      case 'identification':
        answerPayload = singleAnswer;
        break;
      case 'multiple-choice':
        answerPayload = multiAnswers;
        break;
      case 'matching':
        answerPayload = matchingAnswers;
        break;
      case 'ordering':
        answerPayload = orderedItems;
        break;
      case 'calculation':
        answerPayload = parseFloat(calcAnswer);
        break;
      case 'interactive':
        answerPayload = question.interactiveSpec?.targetState;
        break;
    }

    if (answerPayload !== null && answerPayload !== undefined && answerPayload !== '') {
      onAnswerSubmit(question.id, answerPayload);
    }
  };

  const hasSelectedValue = () => {
    switch (question.type) {
      case 'single-choice':
      case 'true-false':
      case 'identification':
        return !!singleAnswer;
      case 'multiple-choice':
        return multiAnswers.length > 0;
      case 'matching':
        return Object.keys(matchingAnswers).length === (question.matchingPairs?.length || 0);
      case 'ordering':
        return orderedItems.length > 0 && hasInteractedOrdering;
      case 'calculation':
        return calcAnswer.trim().length > 0;
      case 'interactive':
        return true;
      default:
        return false;
    }
  };

  return (
    <div class="space-y-5">
      {/* Question Header & Meta */}
      <div class="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
        <span class="text-xs font-semibold tracking-wider uppercase text-[var(--color-text-dim)]">
          {t.quizComponent.questionProgress.replace('{current}', String(questionNumber)).replace('{total}', String(totalQuestions))}
        </span>
        <span class="text-xs px-2 py-0.5 rounded-full bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[var(--color-text-muted)] capitalize">
          {question.type.replace('-', ' ')}
        </span>
      </div>

      {/* Prompt */}
      <div>
        <h3 class="text-lg sm:text-xl font-semibold text-[var(--color-text)] leading-snug">
          {question.prompt}
        </h3>
        {question.contextNarrative && (
          <p class="text-sm text-[var(--color-text-muted)] mt-2 leading-relaxed">
            {question.contextNarrative}
          </p>
        )}
      </div>

      {/* Render based on question type */}
      <div class="pt-2">
        {/* Choice / True-False / Identification */}
        {(question.type === 'single-choice' ||
          question.type === 'true-false' ||
          question.type === 'identification') &&
          question.options && (
            <div
              class="space-y-2.5"
              role="radiogroup"
              aria-label={`Options for Question ${questionNumber}`}
            >
              {question.options.map((opt) => (
                <AnswerOption
                  key={opt.id}
                  option={opt}
                  selected={singleAnswer === opt.id}
                  onSelect={handleSingleSelect}
                  disabled={isAnswered}
                  isMultiple={false}
                />
              ))}
            </div>
          )}

        {/* Multiple Choice */}
        {question.type === 'multiple-choice' && question.options && (
          <div
            class="space-y-2.5"
            role="group"
            aria-label={`Options for Question ${questionNumber} (multiple choice)`}
          >
            <div class="text-xs text-[var(--color-text-muted)] mb-2 italic">
              {t.quizComponent.multipleChoiceHint}
            </div>
            {question.options.map((opt) => (
              <AnswerOption
                key={opt.id}
                option={opt}
                selected={multiAnswers.includes(opt.id)}
                onSelect={handleMultiSelect}
                disabled={isAnswered}
                isMultiple={true}
              />
            ))}
          </div>
        )}

        {/* Matching */}
        {question.type === 'matching' && question.matchingPairs && (
          <div class="space-y-3">
            <div class="text-xs text-[var(--color-text-muted)] italic">
              {t.quizComponent.matchingHint}
            </div>
            <div class="space-y-2.5">
              {question.matchingPairs.map((pair) => (
                <div
                  key={pair.id}
                  class="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] gap-3"
                >
                  <span class="text-sm font-semibold text-[var(--color-text)] sm:w-1/3">
                    {pair.left}
                  </span>
                  <select
                    disabled={isAnswered}
                    value={matchingAnswers[pair.id] || ''}
                    onChange={(e) =>
                      handleMatchSelect(pair.id, (e.target as HTMLSelectElement).value)
                    }
                    class="sm:w-2/3 px-3 py-2 text-xs rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none"
                    aria-label={`Match for ${pair.left}`}
                  >
                    <option value="">{t.quizComponent.matchingSelectDefault}</option>
                    {question.matchingPairs?.map((p) => (
                      <option key={p.right} value={p.right}>
                        {p.right}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ordering */}
        {question.type === 'ordering' && question.orderingItems && (
          <div class="space-y-3">
            <div class="text-xs text-[var(--color-text-muted)] italic">
              {t.quizComponent.orderingHint}
            </div>
            <div
              class="space-y-2.5"
              role="list"
              aria-label={`Ordering sequence for question ${questionNumber}`}
            >
              {orderedItems.map((itemId, idx) => {
                const item = question.orderingItems?.find((o) => o.id === itemId);
                if (!item) return null;
                const isDragging = draggedIdx === idx;
                return (
                  <div
                    key={itemId}
                    role="listitem"
                    draggable={!isAnswered}
                    onDragStart={(e) => handleDragStart(e, idx)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, idx)}
                    class={`flex items-center justify-between p-3.5 sm:p-4 rounded-xl border transition-all duration-150 gap-3 ${
                      isDragging
                        ? 'border-[var(--color-accent)] bg-[var(--color-surface-hover)] opacity-50 shadow-md'
                        : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-text-dim)]/40'
                    }`}
                  >
                    <div class="flex items-center gap-3 flex-1 min-w-0">
                      <span class="w-7 h-7 rounded-lg bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs font-mono font-bold flex items-center justify-center text-[var(--color-text-muted)] shrink-0">
                        {idx + 1}
                      </span>
                      <span class="text-sm font-medium text-[var(--color-text)] leading-snug">
                        {item.label}
                      </span>
                    </div>
                    {!isAnswered && (
                      <div class="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => moveOrderItem(idx, 'up')}
                          class="p-2 min-w-[36px] min-h-[36px] rounded-lg hover:bg-[var(--color-surface-hover)] disabled:opacity-25 cursor-pointer disabled:cursor-not-allowed text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] flex items-center justify-center"
                          aria-label={t.quizComponent.moveUp.replace('{label}', item.label)}
                          title={t.quizComponent.moveUp.replace('{label}', item.label)}
                        >
                          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <polyline points="18 15 12 9 6 15" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          disabled={idx === orderedItems.length - 1}
                          onClick={() => moveOrderItem(idx, 'down')}
                          class="p-2 min-w-[36px] min-h-[36px] rounded-lg hover:bg-[var(--color-surface-hover)] disabled:opacity-25 cursor-pointer disabled:cursor-not-allowed text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] flex items-center justify-center"
                          aria-label={t.quizComponent.moveDown.replace('{label}', item.label)}
                          title={t.quizComponent.moveDown.replace('{label}', item.label)}
                        >
                          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Calculation */}
        {question.type === 'calculation' && (
          <div class="space-y-3">
            <div class="flex items-center gap-3 max-w-xs">
              <input
                type="number"
                step="any"
                disabled={isAnswered}
                placeholder={t.quizComponent.calcPlaceholder}
                value={calcAnswer}
                onInput={(e) => setCalcAnswer((e.target as HTMLInputElement).value)}
                class="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] font-mono text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none"
                aria-label="Calculated answer input"
              />
              {question.calculationSpec?.unit && (
                <span class="text-sm font-semibold text-[var(--color-text-muted)] shrink-0">
                  {question.calculationSpec.unit}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      {!isAnswered && (
        <div class="pt-3">
          <button
            type="button"
            disabled={!hasSelectedValue()}
            onClick={() => handleSubmit()}
            class="px-5 py-2.5 rounded-xl bg-[var(--color-accent)] text-white text-sm font-semibold hover:bg-[var(--color-accent-hover)] transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
          >
            {t.quizComponent.verifyButton}
          </button>
        </div>
      )}

      {/* Feedback Panel */}
      {isAnswered && activeFeedback && (
        <FeedbackPanel
          feedback={activeFeedback}
          onRetry={handleRetry}
          onNext={onNextQuestion}
          isLastQuestion={isLastQuestion}
          locale={locale}
        />
      )}
    </div>
  );
}
