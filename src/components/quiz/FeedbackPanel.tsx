import type { QuestionFeedback } from '../../types/quiz';

export interface FeedbackPanelProps {
  feedback: QuestionFeedback;
  onRetry?: () => void;
  onNext?: () => void;
  isLastQuestion?: boolean;
}

export default function FeedbackPanel({
  feedback,
  onRetry,
  onNext,
  isLastQuestion = false,
}: FeedbackPanelProps) {
  const { isCorrect, explanation, relatedConceptSlug, nextExplorationSlug } = feedback;

  return (
    <div
      class={`rounded-xl p-5 border mt-4 transition-all duration-200 ${
        isCorrect
          ? 'bg-emerald-50/80 border-emerald-300 dark:bg-emerald-950/40 dark:border-emerald-800'
          : 'bg-rose-50/80 border-rose-300 dark:bg-rose-950/40 dark:border-rose-800'
      }`}
      role="region"
      aria-label="Answer evaluation feedback"
    >
      <div class="flex items-start gap-3">
        <div
          class={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
            isCorrect
              ? 'bg-emerald-600 text-white dark:bg-emerald-500'
              : 'bg-rose-600 text-white dark:bg-rose-500'
          }`}
          aria-hidden="true"
        >
          {isCorrect ? (
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          )}
        </div>

        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-1">
            <span
              class={`text-sm font-bold tracking-tight ${
                isCorrect
                  ? 'text-emerald-900 dark:text-emerald-200'
                  : 'text-rose-900 dark:text-rose-200'
              }`}
            >
              {isCorrect ? 'Accurate Understanding!' : 'Concept Clarification Needed'}
            </span>
          </div>

          <div class="text-sm text-[var(--color-text)] leading-relaxed space-y-2 mt-2">
            <p class="font-normal text-[var(--color-text-muted)] dark:text-stone-300">
              <strong class="text-[var(--color-text)] font-semibold">Scientific Explanation: </strong>
              {explanation}
            </p>
          </div>

          {/* Related Discovery Links */}
          {(relatedConceptSlug || nextExplorationSlug) && (
            <div class="mt-3 pt-3 border-t border-[var(--color-border)]/60 flex flex-wrap gap-2 text-xs">
              {relatedConceptSlug && (
                <a
                  href={`/learn/concepts/${relatedConceptSlug}`}
                  class="inline-flex items-center gap-1 text-[var(--color-interactive)] hover:underline font-medium"
                >
                  <span>Review concept: {relatedConceptSlug}</span>
                  <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M7 17l9.2-9.2M17 17V7H7" />
                  </svg>
                </a>
              )}
            </div>
          )}

          {/* Actions */}
          <div class="mt-4 flex items-center gap-3">
            {!isCorrect && onRetry && (
              <button
                type="button"
                onClick={onRetry}
                class="px-3.5 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-xs font-semibold text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors cursor-pointer inline-flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
              >
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
                <span>Re-examine Question</span>
              </button>
            )}

            {onNext && (
              <button
                type="button"
                onClick={onNext}
                class="px-4 py-1.5 rounded-lg bg-[var(--color-accent)] text-white text-xs font-semibold hover:bg-[var(--color-accent-hover)] transition-colors cursor-pointer inline-flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] shadow-sm ml-auto"
              >
                <span>{isLastQuestion ? 'Complete Assessment' : 'Next Question'}</span>
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
