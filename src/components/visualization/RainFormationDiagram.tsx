import type { Locale } from '../../lib/i18nUrl';

export interface RainFormationDiagramProps {
  locale?: Locale;
}

export default function RainFormationDiagram({ locale = 'en' }: RainFormationDiagramProps) {
  const isId = locale === 'id';

  return (
    <div class="rounded-2xl border border-[var(--color-border)] bg-stone-900 text-stone-100 p-5 sm:p-7 space-y-4 shadow-sm select-none">
      <div class="flex items-center justify-between border-b border-stone-800 pb-3">
        <div class="flex items-center gap-2">
          <h4 class="text-sm sm:text-base font-bold text-stone-100">
            {isId ? 'Diagram Skematis: Fisika Pembentukan Hujan Tropis' : 'Schematic Diagram: Tropical Rain Formation Physics'}
          </h4>
          <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sky-950 text-sky-300 border border-sky-800">
            {isId ? 'Diagram Sains' : 'Scientific Diagram'}
          </span>
        </div>
        <span class="text-xs font-mono text-stone-400">
          {isId ? 'Pendinginan Adiabatik & Koalesensi' : 'Adiabatic Cooling & Coalescence'}
        </span>
      </div>

      <div class="w-full aspect-[2/1] min-h-[240px] sm:min-h-[300px] flex items-center justify-center">
        <svg
          viewBox="0 0 700 350"
          class="w-full h-full"
          role="img"
          aria-label={isId ? 'Diagram proses pembentukan hujan tropis' : 'Diagram of tropical rain formation processes'}
        >
          <defs>
            {/* Cloud Gradient */}
            <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#cbd5e1" stop-opacity="0.95" />
              <stop offset="70%" stop-color="#64748b" stop-opacity="0.95" />
              <stop offset="100%" stop-color="#334155" stop-opacity="0.95" />
            </linearGradient>

            {/* Atmosphere Sky Gradient */}
            <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#0f172a" />
              <stop offset="60%" stop-color="#1e293b" />
              <stop offset="100%" stop-color="#0c4a6e" />
            </linearGradient>

            {/* Sunlight beam */}
            <linearGradient id="sunBeam" x1="0%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stop-color="#fef08a" stop-opacity="0.3" />
              <stop offset="100%" stop-color="#fef08a" stop-opacity="0" />
            </linearGradient>
          </defs>

          {/* Atmosphere Background */}
          <rect x="0" y="0" width="700" height="350" fill="url(#skyGrad)" rx="8" />

          {/* Solar Insolation (Top Left) */}
          <circle cx="70" cy="45" r="24" fill="#facc15" opacity="0.85" />
          <polygon points="70,45 10,290 180,290" fill="url(#sunBeam)" />
          <text x="100" y="45" fill="#fef08a" font-size="10" font-family="monospace" font-weight="bold">
            {isId ? 'Radiasi Surya (Evaporasi)' : 'Solar Insolation (Evaporation)'}
          </text>

          {/* Ocean Water Body (Bottom Left) */}
          <path d="M 0,270 L 260,270 L 290,290 L 0,290 Z" fill="#0369a1" opacity="0.8" />
          <line x1="0" y1="270" x2="260" y2="270" stroke="#38bdf8" stroke-width="1.5" />
          <text x="20" y="285" fill="#bae6fd" font-size="10" font-family="monospace">
            {isId ? 'Laut Jawa (Permukaan Air Hangat)' : 'Java Sea (Warm Surface Water)'}
          </text>

          {/* Mountain Topography (Orographic Barrier - Mt. Salak / Gede) */}
          <path
            d="M 260,270 L 380,240 L 520,130 L 580,180 L 660,110 L 700,160 L 700,350 L 0,350 L 0,290 L 290,290 Z"
            fill="#292524"
            stroke="#44403c"
            stroke-width="2"
          />
          <text x="510" y="115" fill="#e7e5e4" font-size="11" font-weight="bold">
            {isId ? 'Gn. Salak & Gede (Barrier Orografis)' : 'Mt. Salak & Gede (Orographic Lift)'}
          </text>

          {/* Rising Warm Humid Air Parcels (Convective & Orographic Updraft) */}
          <g stroke="#38bdf8" stroke-width="2" stroke-dasharray="4,4">
            <path d="M 120,260 Q 140,200 200,160" fill="none" />
            <path d="M 180,260 Q 210,190 260,150" fill="none" />
            <path d="M 280,250 Q 320,180 360,140" fill="none" />
            <path d="M 380,220 Q 420,160 450,130" fill="none" />
          </g>

          <text x="140" y="225" fill="#7dd3fc" font-size="9" font-family="monospace">
            {isId ? 'Parsel Udara Naik (-9.8°C/km)' : 'Rising Air Parcel (-9.8°C/km)'}
          </text>

          {/* Lifting Condensation Level (LCL) / Cloud Base Horizontal Line */}
          <line x1="160" y1="140" x2="680" y2="140" stroke="#f43f5e" stroke-width="1.5" stroke-dasharray="6,4" />
          <text x="170" y="133" fill="#fda4af" font-size="10" font-family="monospace" font-weight="bold">
            {isId ? 'Lifting Condensation Level (LCL / Dasar Awan ~1.000 m, RH=100%)' : 'Lifting Condensation Level (LCL / Cloud Base ~1,000m, RH=100%)'}
          </text>

          {/* Cumulonimbus / Cumulus Cloud Structure */}
          <path
            d="M 220,140 Q 200,100 240,80 Q 270,50 330,60 Q 380,30 440,50 Q 490,20 540,50 Q 580,70 600,100 Q 640,110 630,140 Z"
            fill="url(#cloudGrad)"
            stroke="#94a3b8"
            stroke-width="1.5"
          />

          {/* Cloud Condensation Nuclei (CCN) Callout inside Cloud */}
          <g>
            <circle cx="280" cy="105" r="3" fill="#fbbf24" />
            <circle cx="330" cy="90" r="4" fill="#38bdf8" />
            <circle cx="390" cy="75" r="5" fill="#38bdf8" />
            <circle cx="450" cy="85" r="7" fill="#60a5fa" />
            <circle cx="510" cy="95" r="9" fill="#2563eb" />
          </g>

          {/* Collision-Coalescence Process Annotation */}
          <text x="260" y="75" fill="#f8fafc" font-size="10" font-weight="bold">
            {isId ? 'Tumbukan & Koalesensi Tetesan' : 'Droplet Collision & Coalescence'}
          </text>
          <text x="260" y="90" fill="#cbd5e1" font-size="8" font-family="monospace">
            {isId ? 'Inti Kondensasi (CCN: Garam Laut & Abu) → Tetesan Awan (20 μm) → Tetesan Hujan (>2 mm)' : 'CCN (Sea Salt & Ash) → Cloud Droplets (20 μm) → Raindrops (>2 mm)'}
          </text>

          {/* Falling Torrential Tropical Rain Droplets (Presipitasi) */}
          <g stroke="#60a5fa" stroke-width="2" stroke-linecap="round">
            {[
              { x: 300, y: 150 }, { x: 340, y: 160 }, { x: 380, y: 155 }, { x: 420, y: 150 },
              { x: 460, y: 165 }, { x: 500, y: 160 }, { x: 540, y: 155 }, { x: 580, y: 150 },
              { x: 320, y: 190 }, { x: 360, y: 200 }, { x: 400, y: 195 }, { x: 440, y: 190 },
              { x: 480, y: 205 }, { x: 520, y: 200 }, { x: 560, y: 195 },
              { x: 340, y: 230 }, { x: 380, y: 240 }, { x: 420, y: 235 }, { x: 460, y: 230 },
              { x: 360, y: 270 }, { x: 400, y: 275 }, { x: 440, y: 265 }
            ].map((p, idx) => (
              <line key={idx} x1={p.x} y1={p.y} x2={p.x - 6} y2={p.y + 18} />
            ))}
          </g>

          <text x="350" y="320" fill="#93c5fd" font-size="11" font-weight="bold">
            {isId ? 'Presipitasi Hujan Lebat (Bogor >4.000 mm/thn)' : 'Heavy Tropical Precipitation (Bogor >4,000 mm/yr)'}
          </text>
        </svg>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-stone-300">
        <div class="p-3 rounded-xl bg-stone-800/60 border border-stone-700/50">
          <div class="font-bold text-sky-400 mb-1">1. {isId ? 'Evaporasi & Pengangkatan' : 'Evaporation & Lifting'}</div>
          <p class="text-[11px] text-stone-400">
            {isId
              ? 'Radiasi matahari menguapkan air laut; udara maritim lembap dipaksa naik oleh pemanasan konvektif dan lereng gunung.'
              : 'Solar radiation evaporates ocean water; moist air ascends through thermal convection and orographic slopes.'}
          </p>
        </div>
        <div class="p-3 rounded-xl bg-stone-800/60 border border-stone-700/50">
          <div class="font-bold text-amber-400 mb-1">2. {isId ? 'Kondensasi pada CCN' : 'CCN Condensation'}</div>
          <p class="text-[11px] text-stone-400">
            {isId
              ? 'Pendinginan adiabatik menurunkan suhu hingga titik embun di LCL; uap air mengembun pada aerosol membentuk tetesan awan.'
              : 'Adiabatic expansion cools rising air to its dew point at LCL; vapor condenses on aerosols forming micro-droplets.'}
          </p>
        </div>
        <div class="p-3 rounded-xl bg-stone-800/60 border border-stone-700/50">
          <div class="font-bold text-emerald-400 mb-1">3. {isId ? 'Koalesensi & Hujan' : 'Coalescence & Rain'}</div>
          <p class="text-[11px] text-stone-400">
            {isId
              ? 'Tetesan bertumbukan dan bergabung hingga gravitasi mengatasi arus udara naik, jatuh sebagai presipitasi lebat.'
              : 'Droplets collide and coalesce until gravity overcomes rising updrafts, falling as torrential tropical rain.'}
          </p>
        </div>
      </div>
    </div>
  );
}
