import { useState, useEffect, useRef } from 'preact/hooks';
import { useTranslations } from '../../i18n';
import { parseLocalePath, getLocalizedUrl, type Locale } from '../../lib/i18nUrl';
import { hasSeenOnboardingRoadmap, setHasSeenOnboardingRoadmap } from '../../lib/storage';

export interface RoadmapExperience {
  id: string;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  featured?: boolean;
}

export interface RoadmapTopic {
  id: string;
  title: string;
  tagline?: string;
  description: string;
  category: string;
  experiences: RoadmapExperience[];
}

export interface Props {
  topics: RoadmapTopic[];
  isHomePage?: boolean;
  locale?: Locale;
}

export default function RoadmapCard({ topics = [], isHomePage = false, locale: propLocale }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentLocale, setCurrentLocale] = useState<Locale>(propLocale || 'en');
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);

    if (typeof window !== 'undefined') {
      const { locale } = parseLocalePath(window.location.pathname);
      setCurrentLocale(locale);
    }

    // Auto-open on first visit to homepage
    if (isHomePage && !hasSeenOnboardingRoadmap()) {
      setIsOpen(true);
    }

    // Listen for manual open trigger from navbar or buttons
    const handleOpenEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ triggerId?: string }>;
      if (customEvent.detail?.triggerId) {
        triggerElementRef.current = document.getElementById(customEvent.detail.triggerId);
      } else if (document.activeElement instanceof HTMLElement) {
        triggerElementRef.current = document.activeElement;
      }
      setIsOpen(true);
    };

    window.addEventListener('earth-learning:open-roadmap', handleOpenEvent);
    return () => {
      window.removeEventListener('earth-learning:open-roadmap', handleOpenEvent);
    };
  }, [isHomePage]);

  // Focus trap and keyboard handling
  useEffect(() => {
    if (!isOpen) return;

    // Focus close button on open
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const closeModal = () => {
    setHasSeenOnboardingRoadmap(true);
    setIsOpen(false);
    // Return focus to trigger element
    if (triggerElementRef.current) {
      triggerElementRef.current.focus();
    }
  };

  if (!mounted || !isOpen) {
    return null;
  }

  const t = useTranslations(currentLocale);

  const getExperienceHref = (expId: string) => {
    return getLocalizedUrl(`/learn/${expId}`, currentLocale);
  };

  const getTopicHref = (topicId: string) => {
    return getLocalizedUrl(`/explore/topics/${topicId}`, currentLocale);
  };

  const flagshipHref = getLocalizedUrl('/learn/why-volcanoes-form', currentLocale);

  return (
    <div
      class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 lg:p-6 bg-slate-950/60 dark:bg-black/80 backdrop-blur-md transition-opacity duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeModal();
        }
      }}
      aria-hidden="false"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="roadmap-title"
        aria-describedby="roadmap-desc"
        class="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[var(--color-surface)]/95 dark:bg-[var(--color-surface)]/90 backdrop-blur-2xl border border-[var(--color-border)] shadow-2xl rounded-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div class="px-6 py-5 border-b border-[var(--color-border)] bg-[var(--color-surface)]/80 flex items-start justify-between gap-4 shrink-0">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
              <span class="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--color-accent)]">
                {t.roadmapModal.curriculumBadge}
              </span>
            </div>

            <h2 id="roadmap-title" class="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] tracking-tight">
              {t.roadmapModal.title}
            </h2>

            <p id="roadmap-desc" class="text-xs sm:text-sm text-[var(--color-text-muted)] max-w-2xl leading-relaxed">
              {t.roadmapModal.description}{' '}
              <strong class="text-[var(--color-text)] font-semibold">
                {t.roadmapModal.loopHighlight}
              </strong>.
            </p>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeModal}
            class="p-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-hover)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] shrink-0"
            aria-label={t.roadmapModal.closeAria}
            title={t.roadmapModal.closeTitle}
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div class="p-6 overflow-y-auto space-y-8 flex-1">
          {/* 4-Step Pedagogical Loop Card */}
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div class="p-3.5 rounded-2xl border border-[var(--color-accent)]/30 bg-[var(--color-accent-subtle)]/30 space-y-1.5">
              <div class="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--color-accent)]">
                {t.roadmapModal.step1Tag}
              </div>
              <h4 class="text-xs font-bold text-[var(--color-text)]">{t.roadmapModal.step1Title}</h4>
              <p class="text-[11px] text-[var(--color-text-muted)] leading-relaxed">
                {t.roadmapModal.step1Desc}
              </p>
            </div>

            <div class="p-3.5 rounded-2xl border border-[var(--color-secondary)]/30 bg-[var(--color-secondary-subtle)]/30 space-y-1.5">
              <div class="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--color-secondary)]">
                {t.roadmapModal.step2Tag}
              </div>
              <h4 class="text-xs font-bold text-[var(--color-text)]">{t.roadmapModal.step2Title}</h4>
              <p class="text-[11px] text-[var(--color-text-muted)] leading-relaxed">
                {t.roadmapModal.step2Desc}
              </p>
            </div>

            <div class="p-3.5 rounded-2xl border border-[var(--color-interactive)]/30 bg-[var(--color-interactive-subtle)]/30 space-y-1.5">
              <div class="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--color-interactive)]">
                {t.roadmapModal.step3Tag}
              </div>
              <h4 class="text-xs font-bold text-[var(--color-text)]">{t.roadmapModal.step3Title}</h4>
              <p class="text-[11px] text-[var(--color-text-muted)] leading-relaxed">
                {t.roadmapModal.step3Desc}
              </p>
            </div>

            <div class="p-3.5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-hover)] space-y-1.5">
              <div class="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--color-text-dim)]">
                {t.roadmapModal.step4Tag}
              </div>
              <h4 class="text-xs font-bold text-[var(--color-text)]">{t.roadmapModal.step4Title}</h4>
              <p class="text-[11px] text-[var(--color-text-muted)] leading-relaxed">
                {t.roadmapModal.step4Desc}
              </p>
            </div>
          </div>

          {/* Available Scientific Domains & Tracks */}
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-base font-bold text-[var(--color-text)] flex items-center gap-2">
                <span>{t.roadmapModal.domainsTitle}</span>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[var(--color-text-muted)]">
                  {t.roadmapModal.domainsCount.replace('{count}', String(topics.length))}
                </span>
              </h3>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topics.map((top) => {
                const isTopicUntranslated = currentLocale === 'id' && top.id !== 'plate-tectonics';
                return (
                  <div
                    key={top.id}
                    class="p-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)] transition-all flex flex-col justify-between space-y-3"
                  >
                    <div class="space-y-2">
                      <div class="flex items-center gap-2 flex-wrap">
                        <span class="px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold tracking-wider bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[var(--color-accent)]">
                          {top.category}
                        </span>
                        {isTopicUntranslated && (
                          <span
                            class="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold uppercase bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800"
                            title={t.common.untranslatedBadgeLabel}
                          >
                            {t.common.untranslatedBadge}
                          </span>
                        )}
                      </div>

                      <h4 class="text-sm font-bold text-[var(--color-text)] flex items-center gap-1.5">
                        <span>{top.title}</span>
                      </h4>

                      <p class="text-xs text-[var(--color-text-muted)] line-clamp-2 leading-relaxed">
                        {top.description}
                      </p>
                    </div>

                    <div class="space-y-2 pt-3 border-t border-[var(--color-border)]">
                      <span class="text-[10px] font-mono text-[var(--color-text-dim)] block uppercase font-semibold">
                        {t.roadmapModal.includedModules}
                      </span>
                      <ul class="space-y-1.5 text-xs">
                        {top.experiences.map((exp) => {
                          const isExpUntranslated = currentLocale === 'id' && exp.id !== 'why-volcanoes-form';
                          return (
                            <li key={exp.id}>
                              <a
                                href={getExperienceHref(exp.id)}
                                onClick={closeModal}
                                class={`inline-flex items-center gap-1.5 hover:underline font-medium flex-wrap ${
                                  exp.featured ? 'text-[var(--color-accent)] font-bold' : 'text-[var(--color-text)]'
                                }`}
                              >
                                <span>{exp.title}</span>
                                {exp.featured && (
                                  <span class="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-[var(--color-accent)] text-white">
                                    {t.roadmapModal.flagshipBadge}
                                  </span>
                                )}
                                {isExpUntranslated && (
                                  <span
                                    class="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold uppercase bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800"
                                    title={t.common.untranslatedBadgeLabel}
                                  >
                                    {t.common.untranslatedBadge}
                                  </span>
                                )}
                              </a>
                            </li>
                          );
                        })}
                      </ul>

                      <div class="pt-2">
                        <a
                          href={getTopicHref(top.id)}
                          onClick={closeModal}
                          class="text-[11px] font-semibold text-[var(--color-secondary)] hover:underline inline-flex items-center gap-1"
                        >
                          <span>{t.roadmapModal.viewDomain}</span>
                          <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div class="px-6 py-4 border-t border-[var(--color-border)] bg-[var(--color-surface)]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div class="text-xs text-[var(--color-text-dim)]">
            {t.roadmapModal.footerNotice}
          </div>

          <div class="flex items-center gap-2 flex-wrap">
            <a
              href={flagshipHref}
              onClick={closeModal}
              class="px-4 py-2 rounded-xl bg-[var(--color-accent)] text-white text-xs font-semibold hover:bg-[var(--color-accent-hover)] transition-all shadow-sm inline-flex items-center gap-1.5"
            >
              <span>{t.roadmapModal.launchFlagship}</span>
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </a>

            <button
              type="button"
              onClick={closeModal}
              class="px-4 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-hover)] text-[var(--color-text)] text-xs font-semibold hover:bg-[var(--color-surface)] transition-all cursor-pointer"
            >
              {t.roadmapModal.exploreFreely}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
