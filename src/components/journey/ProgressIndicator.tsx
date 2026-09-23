import { useState, useEffect } from 'preact/hooks';
import type { ExperienceProgress } from '../../types/user';
import { getProgress, setAppliedState } from '../../lib/storage';
import { getMasteryLabel } from '../../lib/progress';
import { useTranslations } from '../../i18n';
import type { Locale } from '../../lib/i18nUrl';

export interface ProgressIndicatorProps {
  experienceSlug: string;
  locale?: Locale;
  class?: string;
}

export default function ProgressIndicator({
  experienceSlug,
  locale = 'en',
  class: className = '',
}: ProgressIndicatorProps) {
  const [progress, setProgress] = useState<ExperienceProgress | null>(null);
  const t = useTranslations(locale);

  const loadProgress = () => {
    setProgress(getProgress(experienceSlug));
  };

  useEffect(() => {
    loadProgress();

    const handleUpdate = () => loadProgress();
    window.addEventListener('earth-learning:state-changed', handleUpdate);
    return () => window.removeEventListener('earth-learning:state-changed', handleUpdate);
  }, [experienceSlug]);

  if (!progress) return null;

  const masteryInfo = getMasteryLabel(progress.masterySignal);
  const isStarted = progress.status === 'started' || progress.status === 'completed';
  const isCompleted = progress.status === 'completed';
  const hasExplored = (progress.exploration?.interactionsCount || 0) > 0;

  const toggleApplied = () => {
    setAppliedState(experienceSlug, !progress.isApplied, 'User verified in field or real world');
  };

  return (
    <div
      class={`rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 space-y-4 shadow-sm ${className}`}
      aria-label="Multi-dimensional experience progress"
    >
      <div class="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
        <span class="text-xs font-mono uppercase tracking-wider text-[var(--color-text-dim)] font-semibold">
          {t.progress.dimensionsTitle}
        </span>
        <span
          class={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
            isCompleted
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200'
              : isStarted
              ? 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-200'
              : 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300'
          }`}
        >
          {isCompleted ? t.progress.completedBadge : isStarted ? t.progress.startedBadge : t.progress.notStartedBadge}
        </span>
      </div>

      {/* 5 Orthogonal Dimensions Grid */}
      <div class="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
        {/* Dimension 1: Started */}
        <div
          class={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 ${
            isStarted
              ? 'border-[var(--color-accent)] bg-[var(--color-accent-subtle)]/40 text-[var(--color-accent)]'
              : 'border-[var(--color-border)] bg-[var(--color-surface-hover)] text-[var(--color-text-dim)] opacity-60'
          }`}
        >
          <div class="text-base font-bold">{isStarted ? '✓' : '○'}</div>
          <div class="text-[11px] font-bold">{t.progress.dimStarted}</div>
          <div class="text-[10px] text-[var(--color-text-muted)] font-mono">{t.progress.dimInquiry}</div>
        </div>

        {/* Dimension 2: Explored */}
        <div
          class={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 ${
            hasExplored
              ? 'border-[var(--color-interactive)] bg-[var(--color-interactive-subtle)]/40 text-[var(--color-interactive)]'
              : 'border-[var(--color-border)] bg-[var(--color-surface-hover)] text-[var(--color-text-dim)] opacity-60'
          }`}
        >
          <div class="text-base font-bold font-mono">
            {progress.exploration?.interactionsCount || 0}
          </div>
          <div class="text-[11px] font-bold">{t.progress.dimExplored}</div>
          <div class="text-[10px] text-[var(--color-text-muted)] font-mono">{t.progress.dimSimulations}</div>
        </div>

        {/* Dimension 3: Mastery / Assessment */}
        <div
          title={`${masteryInfo.label}: ${masteryInfo.description}`}
          class={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 ${
            progress.masterySignal !== 'none'
              ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
              : 'border-[var(--color-border)] bg-[var(--color-surface-hover)] text-[var(--color-text-dim)] opacity-60'
          }`}
        >
          <div class="text-base font-bold">
            {progress.highestQuizScore !== undefined ? `${progress.highestQuizScore}%` : '—'}
          </div>
          <div class="text-[11px] font-bold">{t.progress.dimMastery}</div>
          <div class="text-[10px] truncate max-w-[80px] text-[var(--color-text-muted)] font-mono">
            {progress.masterySignal === 'none' ? t.progress.none : progress.masterySignal}
          </div>
        </div>

        {/* Dimension 4: Applied */}
        <button
          type="button"
          onClick={toggleApplied}
          class={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
            progress.isApplied
              ? 'border-[var(--color-secondary)] bg-[var(--color-secondary-subtle)] text-[var(--color-secondary)] shadow-sm'
              : 'border-[var(--color-border)] bg-[var(--color-surface-hover)] text-[var(--color-text-dim)] hover:border-[var(--color-text-muted)]'
          }`}
          title={t.progress.applyTooltip}
        >
          <div class="text-base font-bold">{progress.isApplied ? '✓' : '+'}</div>
          <div class="text-[11px] font-bold">{t.progress.dimApplied}</div>
          <div class="text-[10px] text-[var(--color-text-muted)] font-mono">
            {progress.isApplied ? t.progress.logged : t.progress.clickToLog}
          </div>
        </button>

        {/* Dimension 5: Built */}
        <div
          class={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 col-span-2 sm:col-span-1 ${
            progress.isBuilt
              ? 'border-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300 shadow-sm'
              : 'border-[var(--color-border)] bg-[var(--color-surface-hover)] text-[var(--color-text-dim)] opacity-60'
          }`}
        >
          <div class="text-base font-bold">{progress.isBuilt ? '★' : '○'}</div>
          <div class="text-[11px] font-bold">{t.progress.dimBuilt}</div>
          <div class="text-[10px] text-[var(--color-text-muted)] font-mono">{t.progress.dimProject}</div>
        </div>
      </div>
    </div>
  );
}
