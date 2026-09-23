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
        <div class="w-full aspect-[2/1] min-h-[220px] sm:min-h-[280px] flex items-center justify-center">
          <svg
            viewBox="0 0 600 300"
            class="w-full h-full"
            role="img"
            aria-label={`Schematic cross section for ${model.title}`}
          >
            {/* Background Mantle (Asthenosphere) */}
            <rect x="0" y="0" width="600" height="300" fill="#2d1d17" />

            {boundary === 'convergent-subduction' && (
              <g id="subduction-schematic">
                {/* Ocean Layer */}
                <path d="M 0,60 L 260,60 L 230,100 L 0,100 Z" fill="#1b4d63" opacity="0.6" />
                <text x="50" y="80" fill="#7fd3ed" font-size="11" font-family="monospace">
                  Indian Ocean (Trench)
                </text>

                {/* Subducting Oceanic Plate */}
                <path
                  d="M 0,100 L 220,100 L 400,280 L 350,280 L 180,120 L 0,120 Z"
                  fill="#4a5568"
                  stroke="#2d3748"
                  stroke-width="2"
                />
                <text x="70" y="115" fill="#e2e8f0" font-size="10" font-weight="bold">
                  Oceanic Lithosphere ({subductionRate} cm/yr →)
                </text>

                {/* Overriding Continental Plate (Java/Sunda) */}
                <path
                  d="M 230,100 L 600,100 L 600,160 L 300,160 Z"
                  fill="#7c604b"
                  stroke="#564234"
                  stroke-width="2"
                />
                <text x="420" y="130" fill="#ffffff" font-size="11" font-weight="bold">
                  Continental Crust (Sunda Plate)
                </text>

                {/* Mantle Wedge (Asthenosphere above slab) */}
                <path d="M 230,100 L 300,160 L 600,160 L 600,300 L 380,300 Z" fill="#8c3f23" opacity="0.8" />
                <text x="360" y="210" fill="#fbd38d" font-size="10" font-family="monospace">
                  Mantle Wedge (Flux Melting Zone)
                </text>

                {/* Water dehydration arrows from descending slab */}
                <g stroke="#63b3ed" stroke-width="2" stroke-dasharray="3,3">
                  <line x1="280" y1="180" x2="320" y2="150" />
                  <line x1="310" y1="210" x2="350" y2="180" />
                  <line x1="340" y1="240" x2="380" y2="200" />
                </g>
                <text x="250" y="200" fill="#90cdf4" font-size="9">
                  H₂O release ({slabWaterContent} wt%)
                </text>

                {/* Ascending Magma Diapirs */}
                <g fill="#f56565" opacity="0.9">
                  <circle cx="390" cy="170" r="10" />
                  <circle cx="420" cy="150" r="14" />
                  <circle cx="460" cy="130" r="18" />
                  <path d="M 450,110 L 470,110 L 460,70 Z" fill="#e53e3e" />
                </g>

                {/* Surface Volcano (e.g. Merapi) */}
                <path d="M 420,100 L 460,40 L 500,100 Z" fill="#a0aec0" stroke="#718096" stroke-width="2" />
                <path d="M 455,40 L 465,40 L 460,25 Z" fill="#feb2b2" />
                <text x="440" y="30" fill="#fc8181" font-size="11" font-weight="bold">
                  Volcanic Arc (Mount Merapi)
                </text>
              </g>
            )}

            {boundary === 'convergent-collision' && (
              <g id="collision-schematic">
                {/* Continental Plate 1 */}
                <path d="M 0,100 L 260,100 L 290,60 L 300,160 L 0,160 Z" fill="#8c6d58" />
                {/* Continental Plate 2 */}
                <path d="M 600,100 L 340,100 L 310,60 L 300,160 L 600,160 Z" fill="#6d5545" />

                {/* Thickened Mountain Range Crust */}
                <polygon points="260,100 300,20 340,100" fill="#b7791f" />
                <polygon points="270,100 300,35 330,100" fill="#ecc94b" />
                <text x="240" y="30" fill="#ffffff" font-size="12" font-weight="bold">
                  Orogenic Mountain Belt
                </text>
                <text x="240" y="190" fill="#fbd38d" font-size="10" font-family="monospace">
                  Crustal Thickening (No Subduction Volcanism)
                </text>
              </g>
            )}

            {boundary === 'divergent-oceanic' && (
              <g id="divergent-schematic">
                {/* Oceanic Plate Left moving West */}
                <rect x="0" y="90" width="280" height="40" fill="#4a5568" />
                <text x="80" y="115" fill="#ffffff" font-size="11">
                  ← Oceanic Plate (Spreading West)
                </text>

                {/* Oceanic Plate Right moving East */}
                <rect x="320" y="90" width="280" height="40" fill="#4a5568" />
                <text x="360" y="115" fill="#ffffff" font-size="11">
                  Oceanic Plate (Spreading East) →
                </text>

                {/* Decompression Upwelling Magma */}
                <path d="M 280,300 L 300,90 L 320,300 Z" fill="#dd6b20" opacity="0.8" />
                <polygon points="290,90 300,75 310,90" fill="#f6ad55" />
                <text x="220" y="65" fill="#fbd38d" font-size="11" font-weight="bold">
                  Central Rift Valley
                </text>
                <text x="220" y="220" fill="#feebc8" font-size="10" font-family="monospace">
                  Decompression Melting (Basalt)
                </text>
              </g>
            )}

            {boundary === 'transform-fault' && (
              <g id="transform-schematic">
                {/* Block A sliding UP/North */}
                <polygon points="50,60 280,60 280,240 50,240" fill="#5a677d" />
                <text x="120" y="140" fill="#ffffff" font-size="14" font-weight="bold">
                  Plate A (↑ North)
                </text>

                {/* Fault Plane */}
                <line x1="290" y1="40" x2="290" y2="260" stroke="#f56565" stroke-width="4" stroke-dasharray="6,6" />
                <text x="240" y="275" fill="#feb2b2" font-size="11" font-family="monospace">
                  Strike-Slip Fault Line
                </text>

                {/* Block B sliding DOWN/South */}
                <polygon points="300,60 550,60 550,240 300,240" fill="#4a5568" />
                <text x="360" y="160" fill="#ffffff" font-size="14" font-weight="bold">
                  Plate B (↓ South)
                </text>
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
