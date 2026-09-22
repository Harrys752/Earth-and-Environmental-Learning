import { useState, useEffect } from 'preact/hooks';
import { searchKnowledgeBase, type SearchResult } from '../../lib/search';
import { withBase } from '../../lib/base';

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    // Check URL parameters for query
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const q = params.get('q');
      if (q) {
        setQuery(q);
        const res = searchKnowledgeBase(q);
        setResults(res);
        setHasSearched(true);
      }
    }
  }, []);

  const handleInput = (val: string) => {
    setQuery(val);
    if (!val.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }
    const res = searchKnowledgeBase(val);
    setResults(res);
    setHasSearched(true);
  };

  return (
    <div class="space-y-6">
      {/* Search Input Field */}
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--color-text-dim)]">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onInput={(e) => handleInput((e.target as HTMLInputElement).value)}
          placeholder="Search volcanoes, subduction, stratigraphy, rain formation, Merapi, Karangsambung..."
          class="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] placeholder-[var(--color-text-dim)] text-base focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none shadow-sm transition-all"
          aria-label="Search earth sciences platform"
          autofocus
        />
        {query && (
          <button
            type="button"
            onClick={() => handleInput('')}
            class="absolute inset-y-0 right-0 pr-4 flex items-center text-xs text-[var(--color-text-dim)] hover:text-[var(--color-text)] cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>

      {/* Suggested Quick Searches */}
      {!hasSearched && (
        <div class="flex items-center gap-2 flex-wrap text-xs text-[var(--color-text-muted)]">
          <span class="font-semibold">Suggested Inquiries:</span>
          {['Subduction', 'Mount Merapi', 'Rain formation', 'Karangsambung', 'Stratigraphy'].map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => handleInput(term)}
              class="px-2.5 py-1 rounded-lg bg-[var(--color-surface-hover)] border border-[var(--color-border)] hover:border-[var(--color-accent)] cursor-pointer transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      )}

      {/* Search Results Display */}
      {hasSearched && (
        <div class="space-y-4">
          <div class="flex items-center justify-between text-xs text-[var(--color-text-muted)] border-b border-[var(--color-border)] pb-2">
            <span>
              Found <strong>{results.length}</strong> matching items for "{query}"
            </span>
            <span class="font-mono text-[var(--color-text-dim)]">Priority Ranked</span>
          </div>

          {results.length > 0 ? (
            <div class="space-y-3">
              {results.map((item) => (
                <article
                  key={item.id}
                  class="p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)] transition-all shadow-sm space-y-2"
                >
                  <div class="flex items-center justify-between gap-2 flex-wrap text-xs">
                    <div class="flex items-center gap-2">
                      <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[var(--color-accent)]">
                        {item.type}
                      </span>
                      {item.topic && (
                        <span class="text-[var(--color-text-dim)] font-medium">
                          {item.topic}
                        </span>
                      )}
                    </div>
                    <span class="text-[10px] font-mono text-[var(--color-text-dim)]">
                      {item.matchReason}
                    </span>
                  </div>

                  <h3 class="text-base font-bold text-[var(--color-text)]">
                    <a href={item.href} class="hover:text-[var(--color-accent)] transition-colors">
                      {item.title}
                    </a>
                  </h3>

                  <p class="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {item.summary}
                  </p>

                  <div class="pt-2 flex items-center justify-between text-xs">
                    <a
                      href={item.href}
                      class="font-semibold text-[var(--color-accent)] hover:underline inline-flex items-center gap-1"
                    >
                      <span>Open {item.type}</span>
                      <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div class="rounded-2xl border border-dashed border-[var(--color-border)] p-8 text-center max-w-md mx-auto space-y-3">
              <h4 class="text-base font-bold text-[var(--color-text)]">
                No Direct Matches Found
              </h4>
              <p class="text-xs text-[var(--color-text-muted)] leading-relaxed">
                We couldn't find matches for "{query}". Try broader geological terms like "tectonics", "rain", or "volcano".
              </p>
              <div class="pt-2">
                <a
                  href={withBase('/explore/topics')}
                  class="text-xs font-semibold text-[var(--color-accent)] hover:underline"
                >
                  Browse all topics instead →
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
