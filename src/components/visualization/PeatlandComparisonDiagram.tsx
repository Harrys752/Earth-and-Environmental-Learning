import { useState } from 'preact/hooks';

interface PeatlandComparisonProps {
  locale?: 'en' | 'id';
}

export default function PeatlandComparisonDiagram({ locale = 'en' }: PeatlandComparisonProps) {
  const isId = locale === 'id';
  const [peatState, setPeatState] = useState<'intact' | 'drained'>('drained');

  const t = {
    badge: isId ? 'Dinamika Lahan Gambut & Iklim' : 'Peatland Hydrology & Carbon Dynamics',
    title: isId ? 'Gambut Tropis: Penyimpan Karbon Raksasa vs Pelepas Emisi' : 'Tropical Peatlands: Carbon Sink vs Fire Crisis',
    subtitle: isId
      ? 'Membandingkan lahan gambut alami jenuh air dengan gambut terdrainase yang rentan kebakaran bawah tanah.'
      : 'Comparing intact waterlogged peat sinks with drained, dry peat prone to underground smoldering fires.',
    toggleLabel: isId ? 'Kondisi Lahan Gambut:' : 'Peatland Hydrological State:',
    modes: {
      intact: isId ? 'Gambut Alami (Jenuh Air / Karbon Terkunci)' : 'Intact Peatland (Waterlogged Sink)',
      drained: isId ? 'Gambut Terdrainase (Kanal Kering / Terbakar)' : 'Drained & Burned (Carbon Emitter)'
    },
    crisisData: {
      title: isId ? 'Data Krisis Kebakaran Gambut Indonesia 2015' : 'Key Facts: The 2015 Indonesian Peatland Fire Crisis',
      stat1: isId ? '53% Kebakaran Terjadi di Lahan Gambut (Meski Hanya 12% Luas Daratan)' : '53% of 2015 Fires Occurred on Peatland (Only 12% of Total Land)',
      stat2: isId ? 'Emisi: ~781 Teragram (Tg) CO₂ (Melampaui Emisi Uni Eropa Saat Itu)' : 'Emissions: ~781 Tg CO2 (Exceeded Total European Union Emissions)',
      stat3: isId ? '71% Total Emisi Partikulat Berbahaya (PM2.5) Bersumber dari Gambut' : '71% of Total PM2.5 Haze Particulate Emissions from Peat Burning'
    }
  };

  return (
    <div className="my-8 rounded-xl border border-slate-700/70 bg-slate-900/90 p-5 shadow-xl backdrop-blur-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <span className="inline-block rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-amber-400">
            {t.badge}
          </span>
          <h3 className="mt-1 text-lg font-bold text-slate-100">{t.title}</h3>
          <p className="text-xs text-slate-400">{t.subtitle}</p>
        </div>
        <div className="flex gap-1.5 text-xs">
          <button
            type="button"
            onClick={() => setPeatState('intact')}
            className={`rounded px-3 py-1.5 transition-colors ${
              peatState === 'intact'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {t.modes.intact.split(' (')[0]}
          </button>
          <button
            type="button"
            onClick={() => setPeatState('drained')}
            className={`rounded px-3 py-1.5 transition-colors ${
              peatState === 'drained'
                ? 'bg-rose-500 text-white font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {t.modes.drained.split(' (')[0]}
          </button>
        </div>
      </div>

      {/* Schematic Cross-Section SVG */}
      <div className="overflow-hidden rounded-lg border border-slate-800 bg-slate-950 p-3 mb-4">
        <svg viewBox="0 0 680 260" className="w-full h-auto select-none" role="img">
          {peatState === 'intact' ? (
            /* INTACT PEATLAND */
            <g>
              {/* Sky */}
              <rect x="10" y="10" width="660" height="70" fill="#0f172a" />
              {/* Pristine Rainforest Canopy */}
              <g transform="translate(100, 60)">
                <circle cx="0" cy="0" r="30" fill="#065f46" />
                <circle cx="60" cy="-5" r="28" fill="#047857" />
                <circle cx="120" cy="5" r="25" fill="#059669" />
                <circle cx="200" cy="-10" r="35" fill="#065f46" />
                <circle cx="280" cy="0" r="30" fill="#047857" />
                <circle cx="360" cy="-5" r="32" fill="#065f46" />
                <circle cx="440" cy="5" r="26" fill="#059669" />
                <circle cx="520" cy="-8" r="30" fill="#047857" />
              </g>

              {/* Water Table Level (High, near surface) */}
              <line x1="10" y1="85" x2="670" y2="85" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4 2" />
              <text x="30" y="78" fill="#7dd3fc" fontSize="9" fontWeight="bold">
                {isId ? 'Muka Air Gambut Tinggi (Tepat di Bawah Permukaan)' : 'High Natural Water Table (Near Surface)'}
              </text>

              {/* Waterlogged Anoxic Peat Layer (Up to 10m deep) */}
              <rect x="10" y="90" width="660" height="160" fill="#292524" stroke="#44403c" strokeWidth="1" />
              <text x="30" y="125" fill="#10b981" fontSize="12" fontWeight="bold">
                {isId ? 'Lapisan Gambut Jenuh Air (Tebal Hingga 10 Meter)' : 'Waterlogged Peat Layer (Up to 10m Thick)'}
              </text>
              <text x="30" y="145" fill="#a8a29e" fontSize="9">
                {isId
                  ? 'Kondisi tanpa oksigen (anoksik) mengunci materi tanaman purba selama ribuan tahun tanpa membusuk.'
                  : 'Anoxic submerged state locks prehistoric plant matter without decomposing, acting as a massive carbon sink.'}
              </text>
            </g>
          ) : (
            /* DRAINED & BURNING PEATLAND */
            <g>
              {/* Haze Sky (PM2.5 smoke) */}
              <rect x="10" y="10" width="660" height="70" fill="#451a03" />
              <text x="30" y="30" fill="#fca5a5" fontSize="10" fontWeight="bold">
                {isId ? 'Kabut Asap Beracun & Emisi CO₂ Masif (PM2.5)' : 'Toxic Haze & Massive CO2 Emissions (PM2.5)'}
              </text>

              {/* Drainage Canals digging down */}
              <polygon points="120,70 140,150 160,70" fill="#0284c7" />
              <polygon points="500,70 520,150 540,70" fill="#0284c7" />
              <text x="90" y="65" fill="#93c5fd" fontSize="8" fontWeight="bold">
                {isId ? 'Kanal Drainase' : 'Drainage Canal'}
              </text>
              <text x="470" y="65" fill="#93c5fd" fontSize="8" fontWeight="bold">
                {isId ? 'Kanal Drainase' : 'Drainage Canal'}
              </text>

              {/* Dropped Water Table */}
              <line x1="10" y1="150" x2="670" y2="150" stroke="#0284c7" strokeWidth="2" strokeDasharray="4 2" />
              <text x="200" y="142" fill="#93c5fd" fontSize="9" fontWeight="bold">
                {isId ? 'Muka Air Turun Drastis Akibat Kanalisasi' : 'Lowered Water Table from Canals'}
              </text>

              {/* Dry, Aerated Flammable Upper Peat */}
              <rect x="10" y="70" width="660" height="80" fill="#78350f" opacity="0.9" />

              {/* Underground Smoldering Fire Zones (Flame / Glow) */}
              <g transform="translate(260, 90)">
                <ellipse cx="0" cy="0" rx="40" ry="18" fill="#ef4444" opacity="0.8" />
                <ellipse cx="0" cy="0" rx="25" ry="10" fill="#f59e0b" />
                <text x="-45" y="-12" fill="#fee2e2" fontSize="9" fontWeight="bold">
                  {isId ? 'Api Membara Bawah Tanah' : 'Underground Smoldering Fire'}
                </text>
              </g>

              {/* Lower Wet Peat */}
              <rect x="10" y="150" width="660" height="100" fill="#1c1917" stroke="#44403c" strokeWidth="1" />
              <text x="30" y="180" fill="#f87171" fontSize="11" fontWeight="bold">
                {isId ? 'Gambut Kering Mengalami Oksidasi & Kebakaran Berminggu-minggu' : 'Dry Peat Aeration & Subsurface Smoldering for Weeks'}
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* 2015 Crisis Facts Grid */}
      <div className="rounded-lg border border-slate-800 bg-slate-950 p-4 space-y-2.5">
        <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wide">
          {t.crisisData.title}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="rounded bg-slate-900 p-2.5 border border-slate-800">
            <span className="text-rose-400 font-bold block mb-1">53%</span>
            <span className="text-slate-300">{t.crisisData.stat1}</span>
          </div>
          <div className="rounded bg-slate-900 p-2.5 border border-slate-800">
            <span className="text-amber-400 font-bold block mb-1">~781 Tg CO₂</span>
            <span className="text-slate-300">{t.crisisData.stat2}</span>
          </div>
          <div className="rounded bg-slate-900 p-2.5 border border-slate-800">
            <span className="text-cyan-400 font-bold block mb-1">71% PM2.5</span>
            <span className="text-slate-300">{t.crisisData.stat3}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
