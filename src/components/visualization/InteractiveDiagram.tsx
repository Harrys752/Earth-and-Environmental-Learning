import { useState } from 'preact/hooks';
import { recordExploration } from '../../lib/storage';
import type { Locale } from '../../i18n';

export interface DiagramLayer {
  id: string;
  name: string;
  depthKm?: string;
  composition: string;
  description: string;
  color: string;
}

export interface InteractiveDiagramProps {
  id: string;
  title: string;
  experienceSlug?: string;
  accessibleDescription: string;
  layers?: DiagramLayer[];
  locale?: Locale;
}

export default function InteractiveDiagram({
  id,
  title,
  experienceSlug,
  accessibleDescription,
  locale = 'en',
  layers = [
    {
      id: 'crust',
      name: 'Oceanic & Continental Crust',
      depthKm: '0 – 35 km',
      composition: 'Basaltic (oceanic) and granitic (continental) rocks rich in silica and alumina.',
      description: 'The brittle outer solid shell of Earth where plate motions and surface landforms reside.',
      color: '#c44d2d',
    },
    {
      id: 'lithospheric-mantle',
      name: 'Lithospheric Mantle',
      depthKm: '35 – 100 km',
      composition: 'Rigid peridotite rock welded to the crust.',
      description: 'Together with the crust, forms the moving tectonic plates that glide atop the asthenosphere.',
      color: '#8b4513',
    },
    {
      id: 'asthenosphere',
      name: 'Asthenosphere (Upper Mantle)',
      depthKm: '100 – 410 km',
      composition: 'Ductile, partially molten silicate peridotite (1-2% partial melt).',
      description: 'High temperatures and pressures allow plastic solid-state flow, facilitating plate motion and mantle convection.',
      color: '#e66a47',
    },
    {
      id: 'transition-zone',
      name: 'Mantle Transition Zone & Lower Mantle',
      depthKm: '410 – 2,891 km',
      composition: 'High-pressure minerals: wadsleyite, ringwoodite, and bridgmanite.',
      description: 'Acts as a major reservoir for water transported deep by sinking subducted slabs.',
      color: '#d97706',
    },
  ],
}: InteractiveDiagramProps) {
  const [selectedLayerId, setSelectedLayerId] = useState<string>(layers[0]?.id || '');
  const isId = locale === 'id';

  const activeLayer = layers.find((l) => l.id === selectedLayerId) || layers[0];

  const handleSelectLayer = (layerId: string) => {
    setSelectedLayerId(layerId);
    if (experienceSlug) {
      recordExploration(experienceSlug, 'diagram', `${id}:${layerId}`);
    }
  };

  return (
    <div class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7 space-y-5 shadow-sm">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--color-border)] pb-3">
        <div>
          <h4 class="text-base font-bold text-[var(--color-text)]">{title}</h4>
          <span class="text-xs text-[var(--color-text-dim)]">
            {isId
              ? 'Diagram Penampang Interaktif • Klik lapisan untuk memeriksa'
              : 'Interactive Cross-Section Diagram • Click layers to inspect'}
          </span>
        </div>
        <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[var(--color-text-muted)] self-start sm:self-auto">
          {isId ? 'Skema Ilustrasi' : 'Illustrative Schematic'}
        </span>
      </div>

      {/* Visually accessible text fallback for screen readers */}
      <div class="sr-only" aria-live="polite">
        <p>{accessibleDescription}</p>
        <p>
          {isId
            ? `Sedang memeriksa lapisan: ${activeLayer.name}. ${activeLayer.description} Komposisi: ${activeLayer.composition}.`
            : `Currently inspecting layer: ${activeLayer.name}. ${activeLayer.description} Composition: ${activeLayer.composition}.`}
        </p>
      </div>

      {/* Grid: Diagram visual + Detail card */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Layer selector / visual stack */}
        <div class="md:col-span-6 space-y-2">
          {layers.map((layer) => {
            const isSelected = layer.id === selectedLayerId;
            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => handleSelectLayer(layer.id)}
                class={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'border-[var(--color-accent)] bg-[var(--color-accent-subtle)] shadow-sm'
                    : 'border-[var(--color-border)] bg-[var(--color-surface-hover)] hover:border-[var(--color-text-dim)]'
                }`}
                aria-pressed={isSelected}
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm"
                    style={{ backgroundColor: layer.color }}
                  />
                  <div>
                    <div class="text-sm font-semibold text-[var(--color-text)]">
                      {layer.name}
                    </div>
                    {layer.depthKm && (
                      <div class="text-[11px] font-mono text-[var(--color-text-muted)]">
                        {isId ? 'Kedalaman: ' : 'Depth: '}{layer.depthKm}
                      </div>
                    )}
                  </div>
                </div>
                <svg
                  class={`w-4 h-4 text-[var(--color-text-muted)] transition-transform ${
                    isSelected ? 'transform rotate-90 text-[var(--color-accent)]' : ''
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            );
          })}
        </div>

        {/* Selected Layer Scientific Detail Card */}
        <div class="md:col-span-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-hover)] p-5 space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-xs font-mono uppercase tracking-wider text-[var(--color-accent)] font-semibold">
              {isId ? 'Pemeriksaan Lapisan' : 'Layer Inspection'}
            </span>
            {activeLayer.depthKm && (
              <span class="text-xs font-mono px-2 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)]">
                {activeLayer.depthKm}
              </span>
            )}
          </div>

          <div>
            <h5 class="text-lg font-bold text-[var(--color-text)]">
              {activeLayer.name}
            </h5>
            <p class="text-xs sm:text-sm text-[var(--color-text-muted)] mt-2 leading-relaxed">
              {activeLayer.description}
            </p>
          </div>

          <div class="border-t border-[var(--color-border)] pt-3 text-xs space-y-1">
            <strong class="text-[var(--color-text)] block font-semibold">
              {isId ? 'Komposisi Mineral & Keadaan:' : 'Mineral Composition & State:'}
            </strong>
            <span class="text-[var(--color-text-muted)] leading-normal block">
              {activeLayer.composition}
            </span>
          </div>
        </div>
      </div>

      <div class="text-[11px] text-[var(--color-text-dim)] border-t border-[var(--color-border)] pt-3">
        <strong>{isId ? 'Catatan Aksesibilitas: ' : 'Accessibility Note: '}</strong>
        {isId
          ? 'Diagram interaktif ini mendemonstrasikan pelapisan struktural. Semua properti ilmiah dijelaskan secara lengkap dalam teks di atas.'
          : 'This interactive diagram demonstrates structural layering. All scientific properties are fully described in plain text above.'}
      </div>
    </div>
  );
}
