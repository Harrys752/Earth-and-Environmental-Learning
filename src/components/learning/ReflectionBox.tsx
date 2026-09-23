import { useState, useEffect } from 'preact/hooks';
import { getReflections, saveReflection } from '../../lib/storage';
import { useTranslations } from '../../i18n';
import type { Locale } from '../../lib/i18nUrl';

export interface ReflectionBoxProps {
  experienceSlug: string;
  prompt: string;
  placeholder?: string;
  category?: 'surprise' | 'observation' | 'clarity' | 'connection';
  locale?: Locale;
}

export default function ReflectionBox({
  experienceSlug,
  prompt,
  placeholder,
  category = 'observation',
  locale = 'en',
}: ReflectionBoxProps) {
  const [response, setResponse] = useState('');
  const [savedReflections, setSavedReflections] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const t = useTranslations(locale);

  const effectivePlaceholder = placeholder || t.reflectionBox.defaultPlaceholder;

  useEffect(() => {
    const existing = getReflections(experienceSlug);
    setSavedReflections(existing.map((r) => r.response));
  }, [experienceSlug]);

  const handleSave = (e: Event) => {
    e.preventDefault();
    if (!response.trim()) return;

    setIsSubmitting(true);
    saveReflection({
      experienceSlug,
      prompt,
      response: response.trim(),
      promptCategory: category,
    });

    setSavedReflections((prev) => [response.trim(), ...prev]);
    setResponse('');
    setIsSubmitting(false);
    setJustSaved(true);

    setTimeout(() => {
      setJustSaved(false);
    }, 3500);
  };

  return (
    <div class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-7 space-y-4 shadow-sm my-6">
      <div class="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--color-accent)] font-semibold">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span>{t.reflectionBox.heading}</span>
      </div>

      <h4 class="text-base sm:text-lg font-bold text-[var(--color-text)] leading-snug">
        {prompt}
      </h4>

      <form onSubmit={handleSave} class="space-y-3">
        <textarea
          rows={3}
          value={response}
          onInput={(e) => setResponse((e.target as HTMLTextAreaElement).value)}
          placeholder={effectivePlaceholder}
          class="w-full p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-hover)] text-sm text-[var(--color-text)] placeholder-[var(--color-text-dim)] focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none transition-all resize-y"
          aria-label={prompt}
        />

        <div class="flex items-center justify-between">
          <span class="text-xs text-[var(--color-text-muted)]">
            {t.reflectionBox.localNotice}
          </span>

          <button
            type="submit"
            disabled={!response.trim() || isSubmitting}
            class="px-4 py-2 rounded-xl bg-[var(--color-secondary)] text-white text-xs font-semibold hover:opacity-95 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-sm focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)]"
          >
            {justSaved ? t.reflectionBox.savedButton : t.reflectionBox.submitButton}
          </button>
        </div>
      </form>

      {/* Prior Reflections if any */}
      {savedReflections.length > 0 && (
        <div class="border-t border-[var(--color-border)] pt-4 space-y-2.5">
          <span class="text-[11px] font-mono text-[var(--color-text-dim)] uppercase tracking-wider block">
            {t.reflectionBox.priorReflections} ({savedReflections.length})
          </span>
          <div class="space-y-2">
            {savedReflections.map((r, i) => (
              <div
                key={i}
                class="p-3 rounded-lg bg-[var(--color-surface-hover)] text-xs text-[var(--color-text)] leading-relaxed border border-[var(--color-border)]"
              >
                "{r}"
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
