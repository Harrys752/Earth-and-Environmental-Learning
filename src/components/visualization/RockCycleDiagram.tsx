import { useState } from 'preact/hooks';
import { recordExploration } from '../../lib/storage';

export type RockStage = 'igneous' | 'sedimentary' | 'metamorphic';

interface RockStageInfo {
  title: string;
  category: string;
  formationProcess: string;
  indonesiaExample: string;
  keyMinerals: string;
  nextTransitions: { label: string; process: string; target: RockStage }[];
  simplifiedNote: string;
}

const ROCK_STAGES: Record<RockStage, RockStageInfo> = {
  igneous: {
    title: 'Igneous Rocks',
    category: 'Formed from Molten Rock (Magma / Lava)',
    formationProcess: 'Cooling and crystallization of silicate melt either deep underground (intrusive / plutonic, e.g. granite, gabbro) or erupted at the surface (extrusive / volcanic, e.g. andesite, basalt).',
    indonesiaExample: 'Andesite lava domes and pyroclastic deposits of Mount Merapi, Central Java.',
    keyMinerals: 'Plagioclase feldspar, pyroxene, amphibole, quartz, olivine.',
    nextTransitions: [
      {
        label: 'Weathering, Erosion & Lithification',
        process: 'Exposed to tropical rain and rivers, physical breakdown produces sediment that compacts into rock.',
        target: 'sedimentary',
      },
      {
        label: 'Intense Heat & Tectonic Pressure',
        process: 'Buried deep in a subduction collision zone without melting, minerals recrystallize into foliated rock.',
        target: 'metamorphic',
      },
    ],
    simplifiedNote: 'Igneous crystallization rates determine crystal size: rapid surface cooling produces fine-grained aphanitic textures, while slow magma chamber cooling produces coarse-grained phaneritic textures.',
  },
  sedimentary: {
    title: 'Sedimentary Rocks',
    category: 'Formed from Compacted & Cemented Particles',
    formationProcess: 'Weathered mineral fragments, organic debris, or chemical precipitates deposited in horizontal layers and lithified through compaction and mineral cementation.',
    indonesiaExample: 'Layered marine claystones, sandstones, and volcanic tuff beds in the Luk Ulo River, Karangsambung.',
    keyMinerals: 'Quartz grains, clay minerals, calcite, feldspar clasts, fossil fragments.',
    nextTransitions: [
      {
        label: 'Deep Tectonic Burial & Metamorphism',
        process: 'Subjected to high confining pressures and geothermal heat along plate boundaries, transforming into schist or marble.',
        target: 'metamorphic',
      },
      {
        label: 'Deep Subduction & Total Melting',
        process: 'Plunging past 100+ km depth into the asthenosphere, melting completely back into silicate magma.',
        target: 'igneous',
      },
    ],
    simplifiedNote: 'The Principle of Superposition dictates that in undisturbed sedimentary strata, younger layers deposit sequentially on top of older layers.',
  },
  metamorphic: {
    title: 'Metamorphic Rocks',
    category: 'Transformed by Heat & Differential Pressure',
    formationProcess: 'Solid-state recrystallization of existing protoliths (igneous, sedimentary, or older metamorphic rocks) under elevated temperature and directional shear stress without full melting.',
    indonesiaExample: 'High-pressure, low-temperature blueschist and eclogite uplifted in the Karangsambung tectonic mélange.',
    keyMinerals: 'Glaucophane, garnet, mica, kyanite, quartz, chlorite.',
    nextTransitions: [
      {
        label: 'Uplift, Weathering & Erosion',
        process: 'Exposed by mountain building and eroded by tropical rains, breaking down into mineral sand grains.',
        target: 'sedimentary',
      },
      {
        label: 'Excess Thermal Melting (Anatexis)',
        process: 'Heating beyond the rock melting point transforms metamorphic rock into fresh granitic or andesitic magma.',
        target: 'igneous',
      },
    ],
    simplifiedNote: 'Metamorphism occurs entirely in the solid state. If the rock melts completely, it crosses into the igneous domain.',
  },
};

export default function RockCycleDiagram({ experienceSlug = 'the-rock-cycle' }: { experienceSlug?: string }) {
  const [selectedStage, setSelectedStage] = useState<RockStage>('igneous');
  const [showDetails, setShowDetails] = useState(false);

  const stage = ROCK_STAGES[selectedStage];

  const handleSelect = (s: RockStage) => {
    setSelectedStage(s);
    if (experienceSlug) {
      recordExploration(experienceSlug, 'diagram', `rock-stage:${s}`);
    }
  };

  return (
    <div class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7 space-y-6 shadow-sm">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4">
        <div>
          <div class="flex items-center gap-2">
            <h4 class="text-base sm:text-lg font-bold text-[var(--color-text)]">
              Continuous Rock Cycle Transformation Explorer
            </h4>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800">
              Interactive Model
            </span>
          </div>
          <p class="text-xs text-[var(--color-text-muted)] mt-1">
            Click any rock class to trace how temperature, pressure, weathering, and plate tectonics continuously transform materials.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowDetails(!showDetails)}
          class="text-xs font-semibold px-3 py-1.5 rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] text-[var(--color-interactive)] transition-colors self-start sm:self-auto cursor-pointer"
        >
          {showDetails ? 'Hide Model Notes' : 'How the Cycle Functions'}
        </button>
      </div>

      {showDetails && (
        <div class="rounded-xl p-4 bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs space-y-2">
          <p class="text-[var(--color-text)]">
            <strong class="font-semibold">Core Principle: </strong>
            The rock cycle has <strong>no single starting point and no final destination</strong>. Any rock can transform into any other rock class given appropriate geological conditions.
          </p>
          <p class="text-[var(--color-text-muted)]">
            <strong class="font-semibold text-[var(--color-text)]">Indonesian Context: </strong>
            In Indonesia, young subduction volcanoes continuously create fresh igneous andesite, which weathers in the equatorial climate to create rich sedimentary soils, while tectonic subduction drags older crust down to produce high-pressure metamorphic blueschist.
          </p>
        </div>
      )}

      {/* Rock Class Selector Buttons */}
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {(['igneous', 'sedimentary', 'metamorphic'] as RockStage[]).map((st) => {
          const isSelected = selectedStage === st;
          return (
            <button
              key={st}
              type="button"
              onClick={() => handleSelect(st)}
              class={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-[var(--color-accent)] bg-[var(--color-accent-subtle)] text-[var(--color-accent)] shadow-sm ring-2 ring-[var(--color-accent)]/30'
                  : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)]'
              }`}
            >
              <div>
                <span class="text-[10px] font-mono uppercase font-bold tracking-wider opacity-75">
                  Rock Class
                </span>
                <div class="text-sm font-bold text-[var(--color-text)] capitalize mt-0.5">
                  {st} Rocks
                </div>
              </div>
              <div class="text-[11px] opacity-80 mt-2">
                {st === 'igneous' && 'Cooling of Magma/Lava'}
                {st === 'sedimentary' && 'Compacted Sediment & Clasts'}
                {st === 'metamorphic' && 'Heat & Pressure Alteration'}
              </div>
            </button>
          );
        })}
      </div>

      {/* Dynamic Diagram Visualizer */}
      <div class="rounded-xl border border-[var(--color-border)] bg-stone-900 text-stone-100 p-5 select-none space-y-4">
        <div class="flex items-center justify-between flex-wrap gap-2 text-xs font-mono border-b border-stone-800 pb-3">
          <span class="text-amber-400 font-bold uppercase tracking-wider">
            Active Focus: {stage.title}
          </span>
          <span class="text-stone-400">
            {stage.category}
          </span>
        </div>

        <div class="space-y-3">
          <div class="text-sm text-stone-200 leading-relaxed">
            {stage.formationProcess}
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div class="p-3 rounded-lg bg-stone-800/80 border border-stone-700 text-xs space-y-1">
              <span class="text-stone-400 text-[10px] uppercase font-mono block">Indonesian Field Setting</span>
              <div class="text-stone-100 font-semibold">{stage.indonesiaExample}</div>
            </div>

            <div class="p-3 rounded-lg bg-stone-800/80 border border-stone-700 text-xs space-y-1">
              <span class="text-stone-400 text-[10px] uppercase font-mono block">Diagnostic Mineral Assemblage</span>
              <div class="text-stone-100 font-mono text-[11px]">{stage.keyMinerals}</div>
            </div>
          </div>
        </div>

        {/* Transformation Paths Out of this Rock Class */}
        <div class="pt-4 border-t border-stone-800 space-y-2">
          <span class="text-[11px] font-mono uppercase text-amber-300 font-bold block">
            Where Can This Rock Go Next in the Cycle?
          </span>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {stage.nextTransitions.map((trans) => (
              <div
                key={trans.target}
                onClick={() => handleSelect(trans.target)}
                class="p-3 rounded-xl bg-stone-800 border border-stone-700 hover:border-amber-400 transition-all cursor-pointer space-y-1 group"
              >
                <div class="flex items-center justify-between text-xs font-bold text-amber-300 group-hover:text-amber-200">
                  <span>→ Transform to {trans.target.toUpperCase()}</span>
                  <span class="text-[10px] font-mono">Click to inspect</span>
                </div>
                <div class="text-[11px] text-stone-300 leading-relaxed">
                  <strong class="text-stone-100">{trans.label}: </strong>
                  {trans.process}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
