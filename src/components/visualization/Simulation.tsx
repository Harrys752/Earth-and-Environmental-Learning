import { useState } from 'preact/hooks';
import { recordExploration } from '../../lib/storage';
import InteractiveSlider from './InteractiveSlider';
import type { Locale } from '../../lib/i18nUrl';

export type BoundaryType =
  | 'convergent-subduction'
  | 'convergent-collision'
  | 'divergent-oceanic'
  | 'transform-fault';

export interface SimulationProps {
  experienceSlug?: string;
  initialBoundary?: BoundaryType;
  locale?: Locale;
}

interface BoundaryModelData {
  title: string;
  subheading: string;
  indonesiaExample: string;
  meltingMechanism: string;
  volcanicActivity: string;
  earthquakeProfile: string;
  rockTypes: string;
  modelDescription: string;
  whatModelSimplifies: string;
}

const BOUNDARY_MODELS_EN: Record<BoundaryType, BoundaryModelData> = {
  'convergent-subduction': {
    title: 'Oceanic-Continental Subduction',
    subheading: 'Dense oceanic lithosphere sinks beneath continental crust',
    indonesiaExample: 'Java Trench & Sunda Arc (Indo-Australian Plate subducting beneath Sunda Plate)',
    meltingMechanism: 'Flux Melting: Hydrous minerals in the sinking slab release water into the hot asthenospheric mantle wedge, lowering the peridotite melting point.',
    volcanicActivity: 'High. Explosive composite stratovolcanoes (andesite/dacite) forming a curvilinear volcanic arc.',
    earthquakeProfile: 'Deep Wadati-Benioff zone seismicity ranging from shallow trench ruptures (tsunamigenic) to >600 km deep mantle quakes.',
    rockTypes: 'Andesite, Dacite, Rhyolite, Diorite, Granodiorite.',
    modelDescription: 'The oceanic slab bends into the subduction trench. As it descends past ~100 km depth, rising fluids induce partial melting in the mantle wedge. Magma diapirs ascend through the upper plate crust, pooling in magma chambers and erupting at the surface.',
    whatModelSimplifies: 'Thermal buoyancy, mantle corner flow vectors, and 3D slab tearing are simplified to 2D kinematics. Timescales are accelerated from millions of years to seconds.',
  },
  'convergent-collision': {
    title: 'Continental-Continental Collision',
    subheading: 'Two buoyant continental crust masses collide without subduction',
    indonesiaExample: 'Collision between Australian continental margin and Banda Arc (Timor region)',
    meltingMechanism: 'Minimal to None: Neither plate sinks deep enough into the asthenosphere to induce flux melting; crust undergoes ductile deformation and thrust stacking.',
    volcanicActivity: 'Extremely Low / Absent (no active subduction volcanism).',
    earthquakeProfile: 'Shallow to intermediate depth intra-crustal thrust earthquakes, often high magnitude over broad zones.',
    rockTypes: 'Gneiss, Schist, Granitic intrusions from crustal anatexis.',
    modelDescription: 'Because continental crust is buoyant (density ~2.7 g/cm³), it resists subduction into the mantle. The collision buckles the lithosphere into immense thrust belts, mountain roots, and thickened crust.',
    whatModelSimplifies: 'Complex nappe structures, syn-orogenic sedimentation, and metamorphic reactions are represented as generalized compressive shortening.',
  },
  'divergent-oceanic': {
    title: 'Oceanic Divergent Boundary (Mid-Ocean Ridge)',
    subheading: 'Plates pull apart, allowing mantle upwelling and seafloor creation',
    indonesiaExample: 'Global analogue: Mid-Indian Ridge; regional analogue: Celebes Sea spreading basin (inactive)',
    meltingMechanism: 'Decompression Melting: Upwelling asthenospheric mantle depressurizes adiabatically without losing heat, crossing the solidus curve to produce basaltic melt.',
    volcanicActivity: 'Non-explosive, effusive fissure eruptions producing pillow basalts and sheet flows along ridge crests.',
    earthquakeProfile: 'Shallow, low-to-moderate magnitude extensional normal-fault earthquakes concentrated along the central rift valley.',
    rockTypes: 'Basalt, Gabbro, Serpentine, Dunite.',
    modelDescription: 'Tensional stress pulls tectonic plates apart. Asthenospheric mantle rises into the gap, decompressing and generating basaltic magma that solidifies into new oceanic crust and lithosphere.',
    whatModelSimplifies: 'Hydrothermal convection cells, transform offsets, and episodic magma replenishment cycles are simplified.',
  },
  'transform-fault': {
    title: 'Transform Plate Boundary (Strike-Slip)',
    subheading: 'Plates slide past each other horizontally without crust creation or destruction',
    indonesiaExample: 'Great Sumatran Fault (Semangko Fault) accommodating oblique subduction slip along Sumatra',
    meltingMechanism: 'None: Lithosphere moves laterally; no vertical decompression or fluid-induced melting occurs.',
    volcanicActivity: 'None directly associated with pure strike-slip motion (volcanism nearby is driven by adjacent subduction).',
    earthquakeProfile: 'Shallow focal depth strike-slip earthquakes with severe localized ground acceleration.',
    rockTypes: 'Mylonites, Cataclasites, fault gouge in shear zones.',
    modelDescription: 'Plates grind past one another along vertical fault planes. Frictional locking stores elastic strain energy until slip occurs in rapid seismic rupture events.',
    whatModelSimplifies: 'Restraining and releasing bends that produce pull-apart basins or flower structures are represented as a planar fault interface.',
  },
};

const BOUNDARY_MODELS_ID: Record<BoundaryType, BoundaryModelData> = {
  'convergent-subduction': {
    title: 'Subduksi Samudra-Benua',
    subheading: 'Litosfer samudra padat menunjam ke bawah kerak benua',
    indonesiaExample: 'Palung Jawa & Busur Sunda (Lempeng Indo-Australia menunjam di bawah Lempeng Sunda)',
    meltingMechanism: 'Pelelehan Fluks: Pelepasan air dari lempeng samudra ke baji mantel astenosfer menurunkan titik leleh peridotit.',
    volcanicActivity: 'Tinggi. Stratovulkan komposit eksplosif (andesit/dasit) membentuk busur vulkanik melengkung.',
    earthquakeProfile: 'Seismisitas zona Wadati-Benioff dari gempa dangkal dekat palung hingga gempa mantel dalam >600 km.',
    rockTypes: 'Andesit, Dasit, Riolit, Diorit, Granodiorit.',
    modelDescription: 'Lempeng samudra menekuk ke dalam palung subduksi. Pada kedalaman >100 km, pelepasan fluida memicu pelelehan parsial baji mantel dan pembentukan magma busur vulkanik.',
    whatModelSimplifies: 'Daya apung termal dan dinamika fluida 3D disederhanakan menjadi kinematika 2D berkecepatan tinggi.',
  },
  'convergent-collision': {
    title: 'Tabrakan Benua-Benua',
    subheading: 'Dua kerak benua bertubrukan tanpa penunjaman ke mantel dalam',
    indonesiaExample: 'Tubrukan tepi benua Australia dengan Busur Banda (wilayah Timor)',
    meltingMechanism: 'Sangat Sedikit/Tidak Ada: Kerak benua mengapung dan terdeformasi tebal tanpa penunjaman mantel dalam.',
    volcanicActivity: 'Sangat Rendah / Tidak Ada (tidak ada vulkanisme subduksi aktif).',
    earthquakeProfile: 'Gempa sesar anjak kerak dangkal-menengah bermagnitudo besar di zona deformasi luas.',
    rockTypes: 'Gneis, Sekis, Granit hasil anateksis kerak benua.',
    modelDescription: 'Karena densitas kerak benua ringan (~2.7 g/cm³), tubrukan menghasilkan pelipatan kerak, sesar sungkup, dan akar pegunungan yang tebal.',
    whatModelSimplifies: 'Kompleksitas sesar sungkup dan metamorfisme regional disederhanakan menjadi pemendekan lateral.',
  },
  'divergent-oceanic': {
    title: 'Batas Divergen Samudra (Punggung Tengah Samudra)',
    subheading: 'Lempeng bergerak menjauh, memicu naiknya mantel dan pembentukan kerak baru',
    indonesiaExample: 'Analogi global: Punggung Samudra Hindia; regional: Pemekaran purba Laut Sulawesi',
    meltingMechanism: 'Pelelehan Dekompresi: Mantel astenosfer naik dan kehilangan tekanan secara adiabatik sehingga meleleh.',
    volcanicActivity: 'Non-eksplosif, lelehan efusif celah membentuk basal bantal (pillow basalt) di dasar laut.',
    earthquakeProfile: 'Gempa sesar normal dangkal bermagnitudo rendah-sedang di lembah celah pemekaran.',
    rockTypes: 'Basal, Gabro, Serpentin, Dunit.',
    modelDescription: 'Regangan tektonik menarik lempeng saling menjauh. Mantel astenosfer naik mengisi celah dan membeku menjadi kerak samudra baru.',
    whatModelSimplifies: 'Sirkulasi hidrotermal dan rekahan transform disederhanakan dalam model 2D.',
  },
  'transform-fault': {
    title: 'Batas Transform (Sesar Geser Mendatar)',
    subheading: 'Lempeng bergeser mendatar tanpa pembentukan atau pemusnahan kerak',
    indonesiaExample: 'Sesar Besar Sumatra (Sesar Semangko) yang membelah Pulau Sumatra',
    meltingMechanism: 'Tidak Ada: Litosfer bergeser lateral tanpa dekompresi vertikal atau penambahan fluida.',
    volcanicActivity: 'Tidak ada vulkanisme langsung dari sesar mendatar murni.',
    earthquakeProfile: 'Gempa dangkal kuat di sepanjang bidang sesar dengan kerusakan lokal signifikan.',
    rockTypes: 'Milonit, Kataklasit, Breksi sesar.',
    modelDescription: 'Lempeng saling bergesekan pada bidang vertikal. Gaya gesek mengunci lempeng hingga tegangan terlepas mendadak sebagai gempa bumi.',
    whatModelSimplifies: 'Geometri cekungan pull-apart lokal disederhanakan menjadi garis sesar planar.',
  },
};

export default function Simulation({
  experienceSlug = 'why-volcanoes-form',
  initialBoundary = 'convergent-subduction',
  locale = 'en',
}: SimulationProps) {
  const [boundary, setBoundary] = useState<BoundaryType>(initialBoundary);
  const [subductionRate, setSubductionRate] = useState<number>(6); // cm/year
  const [slabWaterContent, setSlabWaterContent] = useState<number>(5); // percent hydrous mineral breakdown
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const models = locale === 'id' ? BOUNDARY_MODELS_ID : BOUNDARY_MODELS_EN;
  const model = models[boundary];

  const handleBoundaryChange = (type: BoundaryType) => {
    setBoundary(type);
    if (experienceSlug) {
      recordExploration(experienceSlug, 'simulation', `boundary:${type}`);
    }
  };

  const isId = locale === 'id';

  return (
    <div class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7 space-y-6 shadow-sm">
      {/* Simulation Header */}
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4">
        <div>
          <div class="flex items-center gap-2">
            <h4 class="text-base sm:text-lg font-bold text-[var(--color-text)]">
              {isId ? 'Simulator Batas Lempeng & Genesis Magma' : 'Plate Boundary & Magma Genesis Simulator'}
            </h4>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800">
              {isId ? 'Model Sains Ilustratif' : 'Illustrative Scientific Model'}
            </span>
          </div>
          <p class="text-xs text-[var(--color-text-muted)] mt-1">
            {isId
              ? 'Atur kinematika batas lempeng dan amati mekanisme pelelehan, kegempaan, serta vulkanisme yang dihasilkan.'
              : 'Manipulate boundary kinematics and observing resulting melting mechanisms, seismicity, and volcanism.'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowExplanation(!showExplanation)}
          class="text-xs font-semibold px-3 py-1.5 rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] text-[var(--color-interactive)] transition-colors self-start sm:self-auto cursor-pointer"
        >
          {showExplanation
            ? isId ? 'Sembunyikan Detail Model Sains' : 'Hide Scientific Model Details'
            : isId ? 'Penjelasan Model Sains' : 'What this Model Represents'}
        </button>
      </div>

      {/* Model Scientific Scope Note */}
      {showExplanation && (
        <div class="rounded-xl p-4 bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs space-y-2">
          <p class="text-[var(--color-text)]">
            <strong class="font-semibold">{isId ? 'Cakupan Model: ' : 'Model Scope: '}</strong>
            {model.modelDescription}
          </p>
          <p class="text-[var(--color-text-muted)]">
            <strong class="font-semibold text-[var(--color-text)]">{isId ? 'Penyederhanaan & Batasan: ' : 'Simplifications & Limitations: '}</strong>
            {model.whatModelSimplifies}
          </p>
        </div>
      )}

      {/* Boundary Selector Tabs */}
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-2">
        <button
          type="button"
          onClick={() => handleBoundaryChange('convergent-subduction')}
          class={`p-3 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
            boundary === 'convergent-subduction'
              ? 'border-[var(--color-accent)] bg-[var(--color-accent-subtle)] text-[var(--color-accent)] shadow-sm'
              : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)]'
          }`}
        >
          <div class="font-bold text-[var(--color-text)]">{isId ? 'Zona Subduksi' : 'Subduction Zone'}</div>
          <div class="text-[10px] opacity-80 mt-0.5">{isId ? 'Samudra → Benua' : 'Oceanic → Continental'}</div>
        </button>

        <button
          type="button"
          onClick={() => handleBoundaryChange('convergent-collision')}
          class={`p-3 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
            boundary === 'convergent-collision'
              ? 'border-[var(--color-accent)] bg-[var(--color-accent-subtle)] text-[var(--color-accent)] shadow-sm'
              : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)]'
          }`}
        >
          <div class="font-bold text-[var(--color-text)]">{isId ? 'Tubrukan Benua' : 'Continental Collision'}</div>
          <div class="text-[10px] opacity-80 mt-0.5">{isId ? 'Benua → Benua' : 'Continent → Continent'}</div>
        </button>

        <button
          type="button"
          onClick={() => handleBoundaryChange('divergent-oceanic')}
          class={`p-3 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
            boundary === 'divergent-oceanic'
              ? 'border-[var(--color-accent)] bg-[var(--color-accent-subtle)] text-[var(--color-accent)] shadow-sm'
              : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)]'
          }`}
        >
          <div class="font-bold text-[var(--color-text)]">{isId ? 'Punggung Samudra' : 'Mid-Ocean Ridge'}</div>
          <div class="text-[10px] opacity-80 mt-0.5">{isId ? 'Pemekaran Dasar Laut' : 'Seafloor Spreading'}</div>
        </button>

        <button
          type="button"
          onClick={() => handleBoundaryChange('transform-fault')}
          class={`p-3 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
            boundary === 'transform-fault'
              ? 'border-[var(--color-accent)] bg-[var(--color-accent-subtle)] text-[var(--color-accent)] shadow-sm'
              : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)]'
          }`}
        >
          <div class="font-bold text-[var(--color-text)]">{isId ? 'Sesar Transform' : 'Transform Fault'}</div>
          <div class="text-[10px] opacity-80 mt-0.5">{isId ? 'Pergeseran Mendatar' : 'Strike-Slip Shearing'}</div>
        </button>
      </div>

      {/* Parameter Controls (for Subduction mode) */}
      {boundary === 'convergent-subduction' && (
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-hover)]">
          <InteractiveSlider
            id="subduction-rate"
            label={isId ? 'Laju Konvergensi' : 'Convergence Rate'}
            value={subductionRate}
            min={2}
            max={12}
            step={1}
            unit="cm/year"
            description={isId ? 'Laju konvergensi Palung Jawa berkisar 6-7 cm/tahun.' : 'Java Trench convergence rate is approximately 6-7 cm/yr.'}
            onChange={(val) => {
              setSubductionRate(val);
              if (experienceSlug) recordExploration(experienceSlug, 'simulation', `rate:${val}`);
            }}
          />
          <InteractiveSlider
            id="slab-water"
            label={isId ? 'Hidrasi Lempeng' : 'Slab Hydration'}
            value={slabWaterContent}
            min={1}
            max={10}
            step={1}
            unit="wt %"
            description={isId ? 'Mineral lempung dan serpentinit terurai melepas air di kedalaman.' : 'Hydrous serpentinite & clay minerals breaking down at depth.'}
            onChange={(val) => {
              setSlabWaterContent(val);
              if (experienceSlug) recordExploration(experienceSlug, 'simulation', `hydration:${val}`);
            }}
          />
        </div>
      )}

      {/* Dynamic Animated Cross-Section SVG Diagram */}
      <div class="rounded-xl border border-[var(--color-border)] bg-stone-900 text-stone-100 p-4 relative overflow-hidden select-none">
        <div class="absolute top-3 left-3 text-xs font-mono px-2 py-1 rounded bg-black/70 border border-stone-700 text-amber-400 z-10">
          {model.title}
        </div>

        {/* Scaled SVG schematic */}
        <div class="w-full aspect-[2/1] min-h-[240px] sm:min-h-[300px] flex items-center justify-center">
          <svg
            viewBox="0 0 600 300"
            class="w-full h-full"
            role="img"
            aria-label={`Schematic cross section for ${model.title}`}
          >
            <defs>
              {/* Mantle wedge thermal gradient */}
              <radialGradient id="mantleWedgeHeat" cx="60%" cy="50%" r="60%">
                <stop offset="0%" stop-color="#f97316" stop-opacity="0.9" />
                <stop offset="60%" stop-color="#ea580c" stop-opacity="0.7" />
                <stop offset="100%" stop-color="#8c351e" stop-opacity="0.9" />
              </radialGradient>

              {/* Magma chamber glow */}
              <radialGradient id="magmaGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#fef08a" />
                <stop offset="40%" stop-color="#f97316" />
                <stop offset="100%" stop-color="#ef4444" stop-opacity="0.8" />
              </radialGradient>
            </defs>

            {/* Background Asthenospheric Mantle */}
            <rect x="0" y="0" width="600" height="300" fill="#24140e" />

            {/* 1. SUBDUCTION ZONE (Oceanic-Continental) */}
            {boundary === 'convergent-subduction' && (() => {
              // Reactivity variables
              const animSpeedSec = Math.max(0.6, (14 - subductionRate) * 0.35);
              const bubbleRadius = 2.5 + slabWaterContent * 0.6;
              const bubbleOpacity = 0.35 + slabWaterContent * 0.065;
              const magmaGlowScale = 0.6 + (slabWaterContent / 10) * 0.6;

              return (
                <g id="subduction-schematic">
                  {/* Mantle Wedge (Asthenosphere beneath continental crust and above descending slab) */}
                  <path
                    d="M 230,120 L 600,120 L 600,300 L 430,300 Z"
                    fill="url(#mantleWedgeHeat)"
                  />
                  <text x="360" y="215" fill="#fbd38d" font-size="10" font-family="monospace" font-weight="bold">
                    {isId ? 'Baji Mantel (Zona Pelelehan Fluks)' : 'Mantle Wedge (Flux Melting Zone)'}
                  </text>

                  {/* Subducting Oceanic Lithosphere (Indo-Australian Plate) plunging beneath continental crust */}
                  <path
                    d="M 0,90 L 170,90 Q 205,95 230,120 L 430,300 L 365,300 L 190,145 Q 165,125 0,125 Z"
                    fill="#334155"
                    stroke="#1e293b"
                    stroke-width="2"
                  />

                  {/* Animated Motion Vectors along subducting plate */}
                  <path
                    d="M 10,107 L 170,107 Q 195,112 215,132 L 395,295"
                    fill="none"
                    stroke="#38bdf8"
                    stroke-width="2"
                    stroke-dasharray="6,6"
                    opacity="0.85"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="24"
                      to="0"
                      dur={`${animSpeedSec}s`}
                      repeatCount="indefinite"
                    />
                  </path>

                  {/* Plate label on top surface */}
                  <text x="25" y="112" fill="#e2e8f0" font-size="10" font-weight="bold">
                    {isId ? `Litosfer Samudra (${subductionRate} cm/thn →)` : `Oceanic Lithosphere (${subductionRate} cm/yr →)`}
                  </text>

                  {/* Overriding Continental Crust (Sunda Plate / Java) */}
                  {/* Elevation ordering: Land surface sits at y=70 (above sea level y=75), rising to volcanic cone */}
                  <path
                    d="M 230,120 L 290,70 L 420,70 L 460,25 L 500,70 L 600,70 L 600,155 L 260,155 Z"
                    fill="#785c46"
                    stroke="#564132"
                    stroke-width="2"
                  />

                  {/* Volcanic Cone Layers & Shading */}
                  <polygon points="420,70 460,25 500,70" fill="#8d6e53" stroke="#564132" stroke-width="1.5" />
                  <polygon points="450,70 460,25 470,70" fill="#a17d5d" />

                  {/* Stratovolcano Crater and Summit Glow */}
                  <path d="M 456,25 L 464,25 L 460,18 Z" fill="#ef4444" />
                  <text x="440" y="16" fill="#f87171" font-size="10" font-weight="bold">
                    {isId ? 'Busur Vulkanik (Gn. Merapi)' : 'Volcanic Arc (Mt. Merapi)'}
                  </text>

                  {/* Continental Crust Label */}
                  <text x="490" y="110" fill="#ffffff" font-size="10" font-weight="bold">
                    {isId ? 'Kerak Benua (Lempeng Sunda)' : 'Continental Crust (Sunda)'}
                  </text>

                  {/* Ocean Water Body (Indian Ocean) sitting above oceanic plate down to Trench */}
                  <path
                    d="M 0,75 L 290,75 L 230,120 L 170,90 L 0,90 Z"
                    fill="#0284c7"
                    opacity="0.5"
                  />
                  {/* Sea Level indicator line */}
                  <line x1="0" y1="75" x2="290" y2="75" stroke="#38bdf8" stroke-width="1" stroke-dasharray="4,4" opacity="0.8" />
                  <text x="15" y="70" fill="#7dd3fc" font-size="9" font-family="monospace">
                    {isId ? 'Permukaan Laut (Samudra Hindia)' : 'Sea Level (Indian Ocean)'}
                  </text>

                  {/* Deep Subduction Trench Notch */}
                  <line x1="230" y1="100" x2="230" y2="120" stroke="#f87171" stroke-width="1.5" />
                  <text x="160" y="145" fill="#bae6fd" font-size="9" font-family="monospace" font-weight="bold">
                    {isId ? 'Palung Jawa (~7.000 m)' : 'Java Trench (~7,000 m)'}
                  </text>

                  {/* Reactive H₂O Release Dehydration vectors from slab */}
                  <g>
                    {[
                      { cx: 280, cy: 175, tx: 320, ty: 145 },
                      { cx: 310, cy: 205, tx: 350, ty: 175 },
                      { cx: 340, cy: 235, tx: 380, ty: 200 },
                      { cx: 370, cy: 265, tx: 410, ty: 225 },
                    ].map((pt, i) => (
                      <g key={i}>
                        <line
                          x1={pt.cx}
                          y1={pt.cy}
                          x2={pt.tx}
                          y2={pt.ty}
                          stroke="#67e8f9"
                          stroke-width="1.5"
                          stroke-dasharray="3,3"
                        />
                        <circle
                          cx={(pt.cx + pt.tx) / 2}
                          cy={(pt.cy + pt.ty) / 2}
                          r={bubbleRadius}
                          fill="#38bdf8"
                          opacity={bubbleOpacity}
                        >
                          <animate
                            attributeName="cy"
                            from={pt.cy}
                            to={pt.ty}
                            dur={`${animSpeedSec * 1.5}s`}
                            repeatCount="indefinite"
                          />
                        </circle>
                      </g>
                    ))}
                  </g>
                  <text x="250" y="195" fill="#a5f3fc" font-size="9" font-family="monospace">
                    H₂O ({slabWaterContent} wt%)
                  </text>

                  {/* Ascending Magma Diapirs & Crustal Magma Chamber */}
                  <g opacity={0.9}>
                    {/* Partial melt zone */}
                    <ellipse
                      cx="410"
                      cy="190"
                      rx={20 * magmaGlowScale}
                      ry={14 * magmaGlowScale}
                      fill="url(#magmaGlow)"
                      opacity="0.85"
                    />

                    {/* Rising magma conduits */}
                    <circle cx="435" cy="155" r={5 + slabWaterContent * 0.4} fill="#f97316" />
                    <circle cx="450" cy="125" r={6 + slabWaterContent * 0.5} fill="#f97316" />

                    {/* Crustal Magma Chamber */}
                    <ellipse
                      cx="460"
                      cy="90"
                      rx={18 * magmaGlowScale}
                      ry={12 * magmaGlowScale}
                      fill="url(#magmaGlow)"
                      stroke="#ea580c"
                      stroke-width="1"
                    />
                    <text x="478" y="93" fill="#fed7aa" font-size="8" font-family="monospace">
                      {isId ? 'Kantung Magma' : 'Magma Chamber'}
                    </text>

                    {/* Volcanic Conduit feeding peak */}
                    <line x1="460" y1="80" x2="460" y2="28" stroke="#ef4444" stroke-width="3" />
                  </g>
                </g>
              );
            })()}

            {/* 2. CONTINENTAL COLLISION */}
            {boundary === 'convergent-collision' && (
              <g id="collision-schematic">
                {/* Continental Plate 1 (Left) */}
                <path d="M 0,75 L 240,75 L 270,30 L 300,165 L 0,165 Z" fill="#8c6d58" stroke="#5c4535" stroke-width="2" />
                {/* Continental Plate 2 (Right) */}
                <path d="M 600,75 L 360,75 L 330,30 L 300,165 L 600,165 Z" fill="#6d5545" stroke="#483629" stroke-width="2" />

                {/* Thickened Orogenic Mountain Range (Himalayan / Timor Style) */}
                <polygon points="240,75 300,15 360,75" fill="#b7791f" stroke="#78350f" stroke-width="2" />
                <polygon points="260,75 300,30 340,75" fill="#f59e0b" />

                <text x="215" y="12" fill="#fef08a" font-size="11" font-weight="bold">
                  {isId ? 'Sabuk Pegunungan Orogenik' : 'Orogenic Mountain Belt'}
                </text>
                <text x="210" y="215" fill="#fbd38d" font-size="10" font-family="monospace">
                  {isId ? 'Penebalan Kerak & Akar Isostasi (Tanpa Vulkanisme)' : 'Crustal Thickening & Deep Root (No Volcanism)'}
                </text>

                {/* Compression arrows */}
                <path d="M 120,70 L 170,70" stroke="#fde047" stroke-width="2" marker-end="url(#arrow)" />
                <path d="M 480,70 L 430,70" stroke="#fde047" stroke-width="2" marker-end="url(#arrow)" />
              </g>
            )}

            {/* 3. MID-OCEAN RIDGE */}
            {boundary === 'divergent-oceanic' && (
              <g id="divergent-schematic">
                {/* Ocean Water Layer above Ridge */}
                <rect x="0" y="45" width="600" height="40" fill="#0284c7" opacity="0.5" />
                <line x1="0" y1="45" x2="600" y2="45" stroke="#38bdf8" stroke-width="1" stroke-dasharray="4,4" opacity="0.8" />
                <text x="20" y="40" fill="#7dd3fc" font-size="9" font-family="monospace">
                  {isId ? 'Permukaan Samudra' : 'Sea Level'}
                </text>

                {/* Oceanic Plate Left spreading West */}
                <path d="M 0,85 L 275,85 L 290,105 L 270,145 L 0,145 Z" fill="#334155" stroke="#1e293b" stroke-width="2" />
                <text x="60" y="115" fill="#e2e8f0" font-size="10" font-weight="bold">
                  {isId ? '← Lempeng Samudra (Pemekaran Barat)' : '← Oceanic Plate (Spreading West)'}
                </text>

                {/* Oceanic Plate Right spreading East */}
                <path d="M 600,85 L 325,85 L 310,105 L 330,145 L 600,145 Z" fill="#334155" stroke="#1e293b" stroke-width="2" />
                <text x="360" y="115" fill="#e2e8f0" font-size="10" font-weight="bold">
                  {isId ? 'Lempeng Samudra (Pemekaran Timur) →' : 'Oceanic Plate (Spreading East) →'}
                </text>

                {/* Central Rift Valley Notch & Decompression Magma */}
                <path d="M 270,300 L 290,105 L 300,90 L 310,105 L 330,300 Z" fill="url(#mantleWedgeHeat)" />
                <polygon points="290,105 300,80 310,105" fill="#f97316" />

                <text x="220" y="70" fill="#fef08a" font-size="11" font-weight="bold">
                  {isId ? 'Lembah Retakan Celah Pusat (Rift Valley)' : 'Central Rift Valley'}
                </text>
                <text x="210" y="235" fill="#fed7aa" font-size="10" font-family="monospace">
                  {isId ? 'Pelelehan Dekompresi (Magma Basal)' : 'Decompression Melting (Basaltic Melt)'}
                </text>
              </g>
            )}

            {/* 4. TRANSFORM FAULT */}
            {boundary === 'transform-fault' && (
              <g id="transform-schematic">
                {/* Block A sliding North */}
                <polygon points="50,60 280,60 280,240 50,240" fill="#475569" stroke="#334155" stroke-width="2" />
                <text x="110" y="130" fill="#ffffff" font-size="13" font-weight="bold">
                  {isId ? 'Lempeng A (↑ Geser ke Utara)' : 'Plate A (↑ Shearing North)'}
                </text>
                <path d="M 165,150 L 165,185" stroke="#f87171" stroke-width="3" />
                <polygon points="160,155 165,145 170,155" fill="#f87171" />

                {/* Vertical Fault Plane Line */}
                <line x1="290" y1="40" x2="290" y2="260" stroke="#ef4444" stroke-width="4" stroke-dasharray="6,6" />
                <text x="225" y="275" fill="#fca5a5" font-size="10" font-family="monospace" font-weight="bold">
                  {isId ? 'Bidang Sesar Mendatar (Sesar Geser)' : 'Strike-Slip Fault Plane'}
                </text>

                {/* Block B sliding South */}
                <polygon points="300,60 550,60 550,240 300,240" fill="#334155" stroke="#1e293b" stroke-width="2" />
                <text x="360" y="150" fill="#ffffff" font-size="13" font-weight="bold">
                  {isId ? 'Lempeng B (↓ Geser ke Selatan)' : 'Plate B (↓ Shearing South)'}
                </text>
                <path d="M 425,160 L 425,195" stroke="#f87171" stroke-width="3" />
                <polygon points="420,190 425,200 430,190" fill="#f87171" />
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* Real-time Scientific Readout Card */}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <div class="space-y-2">
          <span class="text-[11px] font-mono uppercase tracking-wider text-[var(--color-accent)] font-semibold">
            {isId ? 'Proses Geologi Utama' : 'Primary Geological Process'}
          </span>
          <h5 class="text-sm font-bold text-[var(--color-text)]">{model.subheading}</h5>
          <p class="text-xs text-[var(--color-text-muted)] leading-relaxed">
            <strong class="text-[var(--color-text)]">{isId ? 'Mekanisme Pelelehan: ' : 'Melting Mechanism: '}</strong>
            {model.meltingMechanism}
          </p>
          <p class="text-xs text-[var(--color-text-muted)] leading-relaxed">
            <strong class="text-[var(--color-text)]">{isId ? 'Aktivitas Vulkanik: ' : 'Volcanic Activity: '}</strong>
            {model.volcanicActivity}
          </p>
        </div>

        <div class="space-y-2 border-t md:border-t-0 md:border-l border-[var(--color-border)] pt-3 md:pt-0 md:pl-4">
          <span class="text-[11px] font-mono uppercase tracking-wider text-[var(--color-secondary)] font-semibold">
            {isId ? 'Studi Regional & Kegempaan' : 'Regional Anchor & Seismicity'}
          </span>
          <p class="text-xs text-[var(--color-text)] leading-relaxed">
            <strong class="text-[var(--color-secondary)]">{isId ? 'Contoh di Indonesia: ' : 'Indonesian Example: '}</strong>
            {model.indonesiaExample}
          </p>
          <p class="text-xs text-[var(--color-text-muted)] leading-relaxed">
            <strong class="text-[var(--color-text)]">{isId ? 'Karakteristik Gempa: ' : 'Earthquake Signature: '}</strong>
            {model.earthquakeProfile}
          </p>
          <p class="text-xs text-[var(--color-text-muted)] leading-relaxed">
            <strong class="text-[var(--color-text)]">{isId ? 'Jenis Batuan Khas: ' : 'Typical Rock Types: '}</strong>
            {model.rockTypes}
          </p>
        </div>
      </div>

      {/* Accessible Non-Visual Description for Screen Readers (§19.1) */}
      <div class="sr-only" aria-live="polite">
        <h5>Non-visual explanation of current simulation state</h5>
        <p>Selected boundary: {model.title}.</p>
        <p>{model.modelDescription}</p>
        <p>Melting mechanism: {model.meltingMechanism}.</p>
        <p>Indonesian real-world context: {model.indonesiaExample}.</p>
      </div>
    </div>
  );
}
