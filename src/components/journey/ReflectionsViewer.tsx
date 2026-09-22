import { useState, useEffect } from 'preact/hooks';
import type { Reflection } from '../../types/journey';
import { getReflections } from '../../lib/storage';
import { withBase } from '../../lib/base';

export default function ReflectionsViewer() {
  const [reflections, setReflections] = useState<Reflection[]>([]);

  const loadReflections = () => {
    setReflections(getReflections());
  };

  useEffect(() => {
    loadReflections();
    const handleUpdate = () => loadReflections();
    window.addEventListener('earth-learning:state-changed', handleUpdate);
    return () => window.removeEventListener('earth-learning:state-changed', handleUpdate);
  }, []);

  if (reflections.length === 0) {
    return (
      <div class="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] p-8 sm:p-12 text-center max-w-lg mx-auto">
        <div class="w-12 h-12 rounded-2xl bg-[var(--color-accent-subtle)] text-[var(--color-accent)] mx-auto flex items-center justify-center mb-4">
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <h3 class="text-base font-bold text-[var(--color-text)] mb-2">
          No Reflections Logged Yet
        </h3>
        <p class="text-xs sm:text-sm text-[var(--color-text-muted)] mb-6 leading-relaxed">
          At the end of each learning experience, you can record short reflections, personal questions, or outdoor observations.
        </p>
        <a
          href={withBase('/learn/why-volcanoes-form')}
          class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--color-accent)] text-white text-xs font-semibold hover:bg-[var(--color-accent-hover)] transition-all"
        >
          Explore Why Do Volcanoes Form?
        </a>
      </div>
    );
  }

  return (
    <div class="space-y-4">
      {reflections.map((refl) => {
        const d = new Date(refl.timestamp);
        const dateStr = d.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });

        return (
          <article
            key={refl.id}
            class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-3 shadow-sm hover:border-[var(--color-accent)]/50 transition-all"
          >
            <div class="flex items-center justify-between gap-2 flex-wrap text-xs">
              <span class="font-mono font-semibold uppercase tracking-wider text-[var(--color-accent)]">
                {refl.promptCategory || 'Scientific Insight'}
              </span>
              <span class="font-mono text-[var(--color-text-dim)]">{dateStr}</span>
            </div>

            <h4 class="text-sm font-semibold text-[var(--color-text)]">
              "{refl.prompt}"
            </h4>

            <p class="text-sm text-[var(--color-text-muted)] leading-relaxed bg-[var(--color-surface-hover)] p-4 rounded-xl border border-[var(--color-border)]">
              {refl.response}
            </p>

            <div class="pt-2 flex items-center justify-between text-xs">
              <span class="text-[var(--color-text-dim)]">
                Recorded locally in browser
              </span>
              <a
                href={`/learn/${refl.experienceSlug}`}
                class="font-semibold text-[var(--color-accent)] hover:underline inline-flex items-center gap-1"
              >
                <span>Revisit Source Experience</span>
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </a>
            </div>
          </article>
        );
      })}
    </div>
  );
}
