import { useState, useEffect } from 'preact/hooks';
import { getSwitchTargetUrl, parseLocalePath, type Locale } from '../../lib/i18nUrl';
import { savePreferences } from '../../lib/storage';

export interface LanguageSwitcherProps {
  currentLocale?: Locale;
}

export default function LanguageSwitcher({ currentLocale: propLocale }: LanguageSwitcherProps) {
  const [currentLocale, setCurrentLocale] = useState<Locale>(propLocale || 'en');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { locale } = parseLocalePath(window.location.pathname);
      setCurrentLocale(locale);
    }
  }, [propLocale]);

  const handleSwitch = (e: MouseEvent) => {
    e.preventDefault();
    const nextLocale: Locale = currentLocale === 'en' ? 'id' : 'en';
    savePreferences({ locale: nextLocale });

    if (typeof window !== 'undefined') {
      const info = getSwitchTargetUrl(window.location.pathname, nextLocale);
      window.location.href = info.url;
    }
  };

  const nextLocale = currentLocale === 'en' ? 'id' : 'en';
  const buttonLabel = nextLocale.toUpperCase();
  const tooltipText = currentLocale === 'en'
    ? 'Ganti ke Bahasa Indonesia'
    : 'Switch to English';

  return (
    <div class="relative inline-flex items-center">
      <button
        type="button"
        id="language-switcher-button"
        onClick={handleSwitch}
        class="h-9 px-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] flex items-center gap-1.5 transition-colors cursor-pointer select-none text-xs font-mono font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
        title={tooltipText}
        aria-label={`Current language: ${currentLocale.toUpperCase()}. Switch to ${nextLocale.toUpperCase()}`}
      >
        <svg
          class="w-3.5 h-3.5 text-[var(--color-text-muted)]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span>{buttonLabel}</span>
      </button>
    </div>
  );
}
