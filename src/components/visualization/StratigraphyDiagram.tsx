import { useState } from 'preact/hooks';

interface StratigraphyDiagramProps {
  locale?: 'en' | 'id';
}

export default function StratigraphyDiagram({ locale = 'en' }: StratigraphyDiagramProps) {
  const isId = locale === 'id';
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  const t = {
    badge: isId ? 'Diagram Stratigrafi Skematis' : 'Schematic Stratigraphic Diagram',
    title: isId ? 'Hukum Steno & Hubungan Stratigrafi' : "Steno's Laws & Stratigraphic Principles",
    subtitle: isId
      ? 'Visualisasi prinsip superposisi, ketidakselarasan bersudut, dan intrusi pemotong batuan.'
      : 'Visualizing superposition, angular unconformity, and cross-cutting igneous intrusions.',
    laws: {
      superposition: isId ? 'Hukum Superposisi' : 'Law of Superposition',
      superpositionDesc: isId
        ? 'Lapisan paling bawah (tua) diendapkan lebih dahulu dibandingkan lapisan di atasnya (muda).'
        : 'In undisturbed strata, the oldest layer lies at the base, with progressively younger layers above.',
      horizontality: isId ? 'Horisontalitas Awal' : 'Original Horizontality',
      horizontalityDesc: isId
        ? 'Sedimen diendapkan mendatar. Kemiringan lapisan bawah terjadi akibat deformasi tektonik sebelum erosi.'
        : 'Sediments settle horizontally. Tilted lower strata indicate tectonic deformation prior to erosion.',
      crosscutting: isId ? 'Hubungan Pemotongan' : 'Cross-Cutting Relationships',
      crosscuttingDesc: isId
        ? 'Dike magma basaltik (Intrusi) memotong lapisan A–C, membuktikan intrusi berusia lebih muda dari lapisan yang dipotong.'
        : 'The igneous dike cuts across layers A–C, proving the intrusion is younger than the rock units it penetrates.',
      unconformity: isId ? 'Ketidakselarasan Bersudut' : 'Angular Unconformity',
      unconformityDesc: isId
        ? 'Garis erosi purba mewakili celah waktu geologi (ratusan juta tahun) antara deformasi dan pengendapan baru.'
        : 'Erosional contact surface representing a long gap of missing time between tilted and flat beds.'
    },
    units: {
      layerD: isId ? 'Lapisan D: Batu Gamping (Paling Muda)' : 'Layer D: Limestone (Youngest Bed)',
      layerC: isId ? 'Lapisan C: Serpih Marin' : 'Layer C: Marine Shale',
      layerB: isId ? 'Lapisan B: Batu Pasir Kuarsa' : 'Layer B: Quartz Sandstone',
      layerA: isId ? 'Lapisan A: Konglomerat Kerakal (Paling Tua)' : 'Layer A: Basal Conglomerate (Oldest Bed)',
      dike: isId ? 'Dike Magma Basaltik (Intrusi)' : 'Basaltic Magma Dike (Intrusion)',
      unconformityLine: isId ? 'Permukaan Erosi / Ketidakselarasan' : 'Erosional Unconformity Surface'
    }
  };

  return (
    <div className="my-8 rounded-xl border border-slate-700/70 bg-slate-900/90 p-5 shadow-xl backdrop-blur-sm">
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <span className="inline-block rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            {t.badge}
          </span>
          <h3 className="mt-1 text-lg font-bold text-slate-100">{t.title}</h3>
          <p className="text-xs text-slate-400">{t.subtitle}</p>
        </div>
        <div className="flex gap-1.5 text-xs">
          <button
            type="button"
            onClick={() => setActiveLayer(activeLayer === 'superposition' ? null : 'superposition')}
            className={`rounded px-2.5 py-1 transition-colors ${
              activeLayer === 'superposition'
                ? 'bg-emerald-500 text-slate-950 font-semibold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {isId ? 'Superposisi' : 'Superposition'}
          </button>
          <button
            type="button"
            onClick={() => setActiveLayer(activeLayer === 'unconformity' ? null : 'unconformity')}
            className={`rounded px-2.5 py-1 transition-colors ${
              activeLayer === 'unconformity'
                ? 'bg-amber-500 text-slate-950 font-semibold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {isId ? 'Ketidakselarasan' : 'Unconformity'}
          </button>
          <button
            type="button"
            onClick={() => setActiveLayer(activeLayer === 'crosscutting' ? null : 'crosscutting')}
            className={`rounded px-2.5 py-1 transition-colors ${
              activeLayer === 'crosscutting'
                ? 'bg-rose-500 text-white font-semibold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {isId ? 'Intrusi Pemotong' : 'Cross-Cutting'}
          </button>
        </div>
      </div>

      {/* Main Schematic Cross-Section SVG */}
      <div className="relative overflow-hidden rounded-lg border border-slate-800 bg-slate-950 p-2">
        <svg
          viewBox="0 0 700 360"
          className="w-full h-auto max-h-[420px] select-none"
          role="img"
          aria-label={t.title}
        >
          <defs>
            {/* Pattern for Sandstone (dots) */}
            <pattern id="sandstonePattern" width="12" height="12" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="1.2" fill="#d97706" opacity="0.6" />
              <circle cx="9" cy="9" r="1.2" fill="#d97706" opacity="0.6" />
            </pattern>

            {/* Pattern for Shale (horizontal dashes) */}
            <pattern id="shalePattern" width="16" height="8" patternUnits="userSpaceOnUse">
              <line x1="2" y1="4" x2="8" y2="4" stroke="#94a3b8" strokeWidth="1" opacity="0.6" />
              <line x1="10" y1="8" x2="16" y2="8" stroke="#94a3b8" strokeWidth="1" opacity="0.6" />
            </pattern>

            {/* Pattern for Limestone (brick/block pattern) */}
            <pattern id="limestonePattern" width="24" height="12" patternUnits="userSpaceOnUse">
              <line x1="0" y1="12" x2="24" y2="12" stroke="#38bdf8" strokeWidth="1" opacity="0.5" />
              <line x1="12" y1="0" x2="12" y2="12" stroke="#38bdf8" strokeWidth="1" opacity="0.5" />
            </pattern>

            {/* Pattern for Conglomerate (pebbles/ellipses) */}
            <pattern id="conglomeratePattern" width="20" height="20" patternUnits="userSpaceOnUse">
              <ellipse cx="6" cy="6" rx="4" ry="2.5" fill="#a8a29e" opacity="0.5" />
              <ellipse cx="15" cy="14" rx="3" ry="2" fill="#78716c" opacity="0.6" />
            </pattern>

            {/* Dike Igneous Texture */}
            <pattern id="dikePattern" width="10" height="10" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="10" y2="10" stroke="#f43f5e" strokeWidth="1.5" opacity="0.7" />
              <line x1="10" y1="0" x2="0" y2="10" stroke="#f43f5e" strokeWidth="1.5" opacity="0.7" />
            </pattern>
          </defs>

          {/* LOWER TILTED SECTION (Pre-existing deformed strata) */}
          <g transform="translate(0, 0)">
            {/* Tilted Layer A (Oldest Conglomerate) */}
            <path
              d="M 20,340 L 480,340 L 480,240 L 20,300 Z"
              fill="#44403c"
              stroke="#57534e"
              strokeWidth="1.5"
            />
            <path
              d="M 20,340 L 480,340 L 480,240 L 20,300 Z"
              fill="url(#conglomeratePattern)"
            />

            {/* Tilted Layer B (Sandstone) */}
            <path
              d="M 20,300 L 480,240 L 480,180 L 20,240 Z"
              fill="#78350f"
              stroke="#92400e"
              strokeWidth="1.5"
            />
            <path
              d="M 20,300 L 480,240 L 480,180 L 20,240 Z"
              fill="url(#sandstonePattern)"
            />

            {/* Tilted Layer C (Shale) */}
            <path
              d="M 20,240 L 480,180 L 480,140 L 20,200 Z"
              fill="#1e293b"
              stroke="#334155"
              strokeWidth="1.5"
            />
            <path
              d="M 20,240 L 480,180 L 480,140 L 20,200 Z"
              fill="url(#shalePattern)"
            />
          </g>

          {/* IGNEOUS DIKE (Cross-cutting layers A, B, C but truncated at the unconformity) */}
          <g>
            <path
              d="M 160,340 L 190,340 L 310,160 L 280,160 Z"
              fill="#881337"
              stroke={activeLayer === 'crosscutting' ? '#fb7185' : '#e11d48'}
              strokeWidth={activeLayer === 'crosscutting' ? '3' : '2'}
            />
            <path
              d="M 160,340 L 190,340 L 310,160 L 280,160 Z"
              fill="url(#dikePattern)"
            />
            {/* Metamorphic contact aureole glow around dike */}
            <path
              d="M 155,340 L 160,340 L 280,160 L 275,160 Z"
              stroke="#fbbf24"
              strokeWidth="2"
              strokeDasharray="3 3"
              opacity="0.8"
            />
            <path
              d="M 190,340 L 195,340 L 315,160 L 310,160 Z"
              stroke="#fbbf24"
              strokeWidth="2"
              strokeDasharray="3 3"
              opacity="0.8"
            />
          </g>

          {/* ANGULAR UNCONFORMITY SURFACE (Wavy Erosional Line) */}
          <path
            d="M 20,180 Q 80,175 150,182 T 300,165 T 480,175"
            fill="none"
            stroke={activeLayer === 'unconformity' ? '#f59e0b' : '#d97706'}
            strokeWidth={activeLayer === 'unconformity' ? '4' : '2.5'}
            strokeDasharray={activeLayer === 'unconformity' ? 'none' : '4 2'}
          />

          {/* UPPER HORIZONTAL STRATA (Younger deposit sitting on unconformity) */}
          {/* Layer D (Limestone Bed) */}
          <rect
            x="20"
            y="90"
            width="460"
            height="85"
            fill="#0c4a6e"
            stroke={activeLayer === 'superposition' ? '#38bdf8' : '#0284c7'}
            strokeWidth="1.5"
          />
          <rect
            x="20"
            y="90"
            width="460"
            height="85"
            fill="url(#limestonePattern)"
          />

          {/* Top Surface Ground / Vegetation Line */}
          <line x1="20" y1="90" x2="480" y2="90" stroke="#10b981" strokeWidth="2.5" />

          {/* LABELS & ANNOTATIONS */}
          {/* Right-side Legend / Age Arrow */}
          <g transform="translate(505, 70)">
            {/* Youngest / Oldest Arrow */}
            <line x1="25" y1="20" x2="25" y2="270" stroke="#64748b" strokeWidth="2" />
            <polygon points="25,12 20,24 30,24" fill="#38bdf8" />
            <polygon points="25,278 20,266 30,266" fill="#a8a29e" />

            <text x="35" y="25" fill="#38bdf8" fontSize="11" fontWeight="bold">
              {isId ? 'LEBIH MUDA' : 'YOUNGER'}
            </text>
            <text x="35" y="40" fill="#94a3b8" fontSize="9">
              {isId ? 'Lapisan atas' : 'Upper strata'}
            </text>

            <text x="35" y="265" fill="#a8a29e" fontSize="11" fontWeight="bold">
              {isId ? 'LEBIH TUA' : 'OLDER'}
            </text>
            <text x="35" y="280" fill="#64748b" fontSize="9">
              {isId ? 'Lapisan bawah' : 'Base strata'}
            </text>
          </g>

          {/* Unit Callout Labels */}
          {/* Layer D Label */}
          <g>
            <rect x="35" y="110" width="160" height="24" rx="4" fill="#0f172a" stroke="#0284c7" strokeWidth="1" />
            <text x="45" y="126" fill="#7dd3fc" fontSize="10" fontWeight="600">
              {isId ? 'Lapisan D: Batu Gamping' : 'Layer D: Flat Limestone'}
            </text>
          </g>

          {/* Unconformity Callout */}
          <g>
            <rect
              x="300"
              y="140"
              width="170"
              height="24"
              rx="4"
              fill="#451a03"
              stroke="#f59e0b"
              strokeWidth="1.5"
            />
            <text x="310" y="156" fill="#fde68a" fontSize="10" fontWeight="bold">
              {isId ? 'Ketidakselarasan Bersudut' : 'Angular Unconformity'}
            </text>
          </g>

          {/* Dike Magma Callout */}
          <g>
            <rect x="180" y="255" width="150" height="24" rx="4" fill="#4c0519" stroke="#f43f5e" strokeWidth="1" />
            <text x="190" y="271" fill="#fecdd3" fontSize="10" fontWeight="600">
              {isId ? 'Dike Magma (Intrusi)' : 'Basaltic Dike (Intrusion)'}
            </text>
          </g>

          {/* Tilted Strata Group Callout */}
          <g>
            <rect x="350" y="280" width="120" height="42" rx="4" fill="#1c1917" stroke="#78716c" strokeWidth="1" />
            <text x="358" y="297" fill="#e7e5e4" fontSize="9" fontWeight="bold">
              {isId ? 'Lapisan A–C Terdorong' : 'Tilted Beds A–C'}
            </text>
            <text x="358" y="312" fill="#a8a29e" fontSize="8">
              {isId ? 'Miring akibat Tektonik' : 'Tectonically Deformed'}
            </text>
          </g>
        </svg>
      </div>

      {/* Dynamic Descriptive Card Based on Selection */}
      <div className="mt-3 rounded-lg border border-slate-800 bg-slate-950/80 p-3 text-xs text-slate-300">
        {activeLayer === 'superposition' && (
          <div>
            <span className="font-bold text-emerald-400">{t.laws.superposition}: </span>
            {t.laws.superpositionDesc}
          </div>
        )}
        {activeLayer === 'unconformity' && (
          <div>
            <span className="font-bold text-amber-400">{t.laws.unconformity}: </span>
            {t.laws.unconformityDesc}
          </div>
        )}
        {activeLayer === 'crosscutting' && (
          <div>
            <span className="font-bold text-rose-400">{t.laws.crosscutting}: </span>
            {t.laws.crosscuttingDesc}
          </div>
        )}
        {!activeLayer && (
          <div className="text-slate-400">
            <span className="font-medium text-slate-200">
              {isId ? 'Prinsip Geologi Kunci: ' : 'Key Geological Principle: '}
            </span>
            {isId
              ? 'Urutan kronologis: Lapisan A, B, C diendapkan mendatar -> Ditekuk oleh tektonik -> Ditembus oleh Dike Magma -> Tererosi datar -> Lapisan D diendapkan di atas ketidakselarasan.'
              : 'Chronological sequence: Beds A, B, C deposited horizontally -> Tilted by tectonics -> Cut by Magma Dike -> Planed by erosion -> Layer D deposited flat above unconformity.'}
          </div>
        )}
      </div>
    </div>
  );
}
