import { useState } from 'preact/hooks';
import type { JourneyEntryType } from '../../types/journey';
import { addJourneyEntry } from '../../lib/storage';
import { useTranslations } from '../../i18n';
import type { Locale } from '../../lib/i18nUrl';

export interface JourneyEntryFormProps {
  locale?: Locale;
}

export default function JourneyEntryForm({ locale = 'en' }: JourneyEntryFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState<JourneyEntryType>('observation');
  const [description, setDescription] = useState('');
  const [locationName, setLocationName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const t = useTranslations(locale);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (!title.trim()) return;

    addJourneyEntry({
      type,
      source: 'manual',
      title: title.trim(),
      description: description.trim() || undefined,
      metadata: {
        locationName: locationName.trim() || undefined,
      },
    });

    setTitle('');
    setDescription('');
    setLocationName('');
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      setIsOpen(false);
    }, 2000);
  };

  return (
    <div class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm">
      {!isOpen ? (
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 class="text-base font-bold text-[var(--color-text)]">
              {t.journeyForm.bannerTitle}
            </h4>
            <p class="text-xs text-[var(--color-text-muted)] mt-1">
              {t.journeyForm.bannerDesc}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            class="px-4 py-2.5 rounded-xl bg-[var(--color-secondary)] text-white text-xs font-semibold hover:opacity-95 transition-all cursor-pointer inline-flex items-center gap-1.5 shrink-0 shadow-sm"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>{t.journeyForm.logButton}</span>
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} class="space-y-4">
          <div class="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
            <h4 class="text-sm font-bold text-[var(--color-text)] uppercase tracking-wider font-mono">
              {t.journeyForm.formTitle}
            </h4>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              class="text-xs text-[var(--color-text-dim)] hover:text-[var(--color-text)] cursor-pointer"
            >
              {t.journeyForm.cancel}
            </button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-[var(--color-text)] mb-1">
                {t.journeyForm.categoryLabel}
              </label>
              <select
                value={type}
                onChange={(e) => setType((e.target as HTMLSelectElement).value as JourneyEntryType)}
                class="w-full px-3 py-2 text-xs rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-hover)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none"
              >
                <option value="observation">{t.journeyForm.categories.observation}</option>
                <option value="applied">{t.journeyForm.categories.applied}</option>
                <option value="built">{t.journeyForm.categories.built}</option>
                <option value="reflection">{t.journeyForm.categories.reflection}</option>
                <option value="external-achievement">{t.journeyForm.categories.externalAchievement}</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-semibold text-[var(--color-text)] mb-1">
                {t.journeyForm.locationLabel}
              </label>
              <input
                type="text"
                placeholder={t.journeyForm.locationPlaceholder}
                value={locationName}
                onInput={(e) => setLocationName((e.target as HTMLInputElement).value)}
                class="w-full px-3 py-2 text-xs rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-hover)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-[var(--color-text)] mb-1">
              {t.journeyForm.titleLabel}
            </label>
            <input
              type="text"
              required
              placeholder={t.journeyForm.titlePlaceholder}
              value={title}
              onInput={(e) => setTitle((e.target as HTMLInputElement).value)}
              class="w-full px-3 py-2 text-xs rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-hover)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-[var(--color-text)] mb-1">
              {t.journeyForm.notesLabel}
            </label>
            <textarea
              rows={3}
              placeholder={t.journeyForm.notesPlaceholder}
              value={description}
              onInput={(e) => setDescription((e.target as HTMLTextAreaElement).value)}
              class="w-full px-3 py-2 text-xs rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-hover)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none resize-y"
            />
          </div>

          <div class="flex items-center justify-between pt-2">
            <span class="text-xs text-[var(--color-text-muted)]">
              {isSuccess ? t.journeyForm.successMsg : t.journeyForm.storageNotice}
            </span>

            <button
              type="submit"
              disabled={!title.trim()}
              class="px-5 py-2 rounded-xl bg-[var(--color-accent)] text-white text-xs font-semibold hover:bg-[var(--color-accent-hover)] transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
            >
              {t.journeyForm.submit}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
