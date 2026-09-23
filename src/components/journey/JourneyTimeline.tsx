import { useState, useEffect } from 'preact/hooks';
import type { JourneyEntry } from '../../types/journey';
import { getJourneyEntries } from '../../lib/storage';
import { useTranslations } from '../../i18n';
import { getLocalizedUrl, type Locale } from '../../lib/i18nUrl';

export interface JourneyTimelineProps {
  locale?: Locale;
}

export default function JourneyTimeline({ locale = 'en' }: JourneyTimelineProps) {
  const [entries, setEntries] = useState<JourneyEntry[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const t = useTranslations(locale);

  const loadEntries = () => {
    setEntries(getJourneyEntries());
  };

  useEffect(() => {
    loadEntries();
    const handleUpdate = () => loadEntries();
    window.addEventListener('earth-learning:state-changed', handleUpdate);
    return () => window.removeEventListener('earth-learning:state-changed', handleUpdate);
  }, []);

  const filtered = filterType === 'all' ? entries : entries.filter((e) => e.type === filterType);

  // Group entries by Month Year
  const groupedByMonth = filtered.reduce((acc, entry) => {
    const d = new Date(entry.timestamp);
    const dateLocale = locale === 'id' ? 'id-ID' : 'en-US';
    const monthYear = d.toLocaleDateString(dateLocale, { month: 'long', year: 'numeric' });
    if (!acc[monthYear]) acc[monthYear] = [];
    acc[monthYear].push(entry);
    return acc;
  }, {} as Record<string, JourneyEntry[]>);

  const getTypeBadge = (type: JourneyEntry['type']) => {
    switch (type) {
      case 'learned':
        return {
          label: t.journeyTimeline.types.learned,
          class: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-800',
        };
      case 'applied':
        return {
          label: t.journeyTimeline.types.applied,
          class: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-800',
        };
      case 'built':
        return {
          label: t.journeyTimeline.types.built,
          class: 'bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-950 dark:text-purple-200 dark:border-purple-800',
        };
      case 'reflection':
        return {
          label: t.journeyTimeline.types.reflection,
          class: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800',
        };
      case 'observation':
        return {
          label: t.journeyTimeline.types.observation,
          class: 'bg-teal-100 text-teal-900 border-teal-300 dark:bg-teal-950 dark:text-teal-200 dark:border-teal-800',
        };
      case 'milestone':
        return {
          label: t.journeyTimeline.types.milestone,
          class: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950 dark:text-rose-200 dark:border-rose-800',
        };
      default:
        return {
          label: t.journeyTimeline.types.activity,
          class: 'bg-stone-100 text-stone-800 border-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:border-stone-700',
        };
    }
  };

  if (entries.length === 0) {
    return (
      <div class="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] p-8 sm:p-12 text-center max-w-lg mx-auto my-8">
        <div class="w-14 h-14 rounded-2xl bg-[var(--color-accent-subtle)] text-[var(--color-accent)] mx-auto flex items-center justify-center mb-4">
          <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
          </svg>
        </div>
        <h3 class="text-lg font-bold text-[var(--color-text)] mb-2">
          {t.journeyTimeline.emptyTitle}
        </h3>
        <p class="text-xs sm:text-sm text-[var(--color-text-muted)] mb-6 leading-relaxed">
          {t.journeyTimeline.emptyDesc}
        </p>
        <a
          href={getLocalizedUrl('/learn/why-volcanoes-form', locale)}
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-accent)] text-white text-xs font-semibold hover:bg-[var(--color-accent-hover)] transition-all shadow-sm"
        >
          <span>{t.journeyTimeline.startFlagship}</span>
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </a>
      </div>
    );
  }

  const months = Object.keys(groupedByMonth);
  const filterKeys: (keyof typeof t.journeyTimeline.filters)[] = ['all', 'learned', 'applied', 'built', 'reflection', 'observation'];

  return (
    <div class="space-y-6">
      {/* Filter Tabs */}
      <div class="flex items-center gap-1.5 flex-wrap border-b border-[var(--color-border)] pb-3">
        {filterKeys.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setFilterType(type)}
            class={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filterType === type
                ? 'bg-[var(--color-accent)] text-white shadow-sm'
                : 'bg-[var(--color-surface-hover)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
            }`}
          >
            {t.journeyTimeline.filters[type]}
          </button>
        ))}
      </div>

      {/* Grouped Month Sections */}
      <div class="space-y-8">
        {months.map((month) => (
          <div key={month} class="space-y-4">
            <div class="flex items-center gap-3">
              <h3 class="text-xs font-mono font-bold uppercase tracking-widest text-[var(--color-accent)]">
                {month}
              </h3>
              <div class="flex-1 h-px bg-[var(--color-border)]" />
            </div>

            <div class="relative pl-6 space-y-4 border-l-2 border-[var(--color-border)] ml-2">
              {groupedByMonth[month].map((entry) => {
                const badge = getTypeBadge(entry.type);
                const d = new Date(entry.timestamp);
                const dateLocale = locale === 'id' ? 'id-ID' : 'en-US';
                const dateStr = d.toLocaleDateString(dateLocale, {
                  month: 'short',
                  day: 'numeric',
                });

                return (
                  <div
                    key={entry.id}
                    class="relative rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 hover:border-[var(--color-text-dim)] transition-all shadow-sm"
                  >
                    {/* Node Dot */}
                    <div class="absolute -left-[31px] top-4 w-3.5 h-3.5 rounded-full border-2 border-[var(--color-surface)] bg-[var(--color-accent)]" />

                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div class="flex items-center gap-2">
                        <span
                          class={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${badge.class}`}
                        >
                          {badge.label}
                        </span>
                        <h4 class="text-sm font-bold text-[var(--color-text)]">
                          {entry.title}
                        </h4>
                      </div>

                      <span class="text-[11px] font-mono text-[var(--color-text-dim)] shrink-0">
                        {dateStr}
                      </span>
                    </div>

                    {entry.description && (
                      <p class="text-xs text-[var(--color-text-muted)] leading-relaxed mt-1">
                        {entry.description}
                      </p>
                    )}

                    {entry.relatedExperienceSlug && (
                      <div class="mt-3 pt-2 border-t border-[var(--color-border)]/60 text-xs">
                        <a
                          href={getLocalizedUrl(`/learn/${entry.relatedExperienceSlug}`, locale)}
                          class="inline-flex items-center gap-1 text-[var(--color-accent)] font-semibold hover:underline"
                        >
                          <span>{t.journeyTimeline.revisit}</span>
                          <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
