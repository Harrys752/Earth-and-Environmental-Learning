import { useState, useEffect } from 'preact/hooks';
import { getPreferences, savePreferences } from '../../lib/storage';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const prefs = getPreferences();
    setTheme(prefs.theme || 'system');
    applyTheme(prefs.theme || 'system');
  }, []);

  const applyTheme = (targetTheme: 'light' | 'dark' | 'system') => {
    const root = document.documentElement;
    if (targetTheme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
      root.setAttribute('data-theme', targetTheme);
    }
  };

  const toggleTheme = () => {
    const nextTheme: 'light' | 'dark' = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    savePreferences({ theme: nextTheme });
    applyTheme(nextTheme);
  };

  if (!mounted) {
    return (
      <div class="w-9 h-9 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-center opacity-50" />
    );
  }

  const isDark = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      class="w-9 h-9 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] flex items-center justify-center transition-colors cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
      title={`Current mode: ${theme}. Click to switch to ${isDark ? 'light' : 'dark'} mode.`}
      aria-label={`Toggle theme, current is ${theme}`}
    >
      {isDark ? (
        // Sun Icon
        <svg class="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      ) : (
        // Moon Icon
        <svg class="w-4 h-4 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      )}
    </button>
  );
}
