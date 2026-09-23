import { useState } from 'preact/hooks';

interface ThroughflowMapProps {
  locale?: 'en' | 'id';
}

export default function ThroughflowMap({ locale = 'en' }: ThroughflowMapProps) {
  const isId = locale === 'id';
  const [ensoPhase, setEnsoPhase] = useState<'neutral' | 'lanina' | 'elnino'>('neutral');

  // Parameters based on ENSO phase
  const volumeTransportSv = ensoPhase === 'lanina' ? 18.5 : ensoPhase === 'elnino' ? 10.2 : 15.0;
  const heatTransportPW = ensoPhase === 'lanina' ? 1.25 : ensoPhase === 'elnino' ? 0.72 : 1.0;
  const flowSpeedFactor = ensoPhase === 'lanina' ? 1.4 : ensoPhase === 'elnino' ? 0.65 : 1.0;

  const t = {
    badge: isId ? 'Oseanografi & Iklim Skematis' : 'Schematic Oceanography & Climate',
    title: isId ? 'Arlindo: Arus Lintas Indonesia (Indonesian Throughflow / ITF)' : 'Indonesian Throughflow (ITF) Dynamics',
    subtitle: isId
      ? 'Satu-satunya jalur samudra lintang rendah di dunia yang menghubungkan Pasifik Barat dan Samudra Hindia.'
      : 'The world’s only low-latitude oceanic pathway connecting the western Pacific and Indian Oceans.',
    ensoToggle: isId ? 'Pilih Fase Osilasi ENSO:' : 'Select ENSO Climate Phase:',
    stats: {
      volume: isId ? 'Transpor Volume Total' : 'Total Volume Transport',
      heat: isId ? 'Ekspor Energi Panas' : 'Heat Energy Flux',
      gradient: isId ? 'Gradien Tinggi Muka Laut' : 'Sea Surface Height Slope'
    },
    phases: {
      neutral: isId ? 'Netral (Rata-rata 15 Sv)' : 'Neutral (Average 15 Sv)',
      lanina: isId ? 'La Niña (Arus Sangat Kuat / 18.5 Sv)' : 'La Niña (Enhanced Flow / 18.5 Sv)',
      elnino: isId ? 'El Niño (Arus Melemah / 10.2 Sv)' : 'El Niño (Weakened Flow / 10.2 Sv)'
    },
    straits: {
      makassar: isId ? 'Selat Makassar (Inflow Utama ~80%)' : 'Makassar Strait (Main Inflow ~80%)',
      lombok: isId ? 'Selat Lombok (Outflow)' : 'Lombok Strait (Outflow)',
      ombai: isId ? 'Selat Ombai (Outflow)' : 'Ombai Strait (Outflow)',
      timor: isId ? 'Celah Timor (Outflow)' : 'Timor Passage (Outflow)'
    },
    oceanBodies: {
      pacific: isId ? 'Samudra Pasifik Barat (Muka Laut Lebih Tinggi)' : 'Western Pacific (Higher Sea Level)',
      indian: isId ? 'Samudra Hindia Timur (Muka Laut Lebih Rendah)' : 'Eastern Indian Ocean (Lower Sea Level)'
    }
  };

  return (
    <div className="my-8 rounded-xl border border-slate-700/70 bg-slate-900/90 p-5 shadow-xl backdrop-blur-sm">
      <div className="mb-4 border-b border-slate-800 pb-3">
        <span className="inline-block rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-cyan-400">
          {t.badge}
        </span>
        <h3 className="mt-1 text-lg font-bold text-slate-100">{t.title}</h3>
        <p className="text-xs text-slate-400">{t.subtitle}</p>
      </div>

      {/* ENSO Mode Selector */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-800 bg-slate-950 p-3">
        <span className="text-xs font-semibold text-slate-300">{t.ensoToggle}</span>
        <div className="flex gap-1.5 text-xs">
          <button
            type="button"
            onClick={() => setEnsoPhase('lanina')}
            className={`rounded px-2.5 py-1 transition-colors ${
              ensoPhase === 'lanina'
                ? 'bg-blue-500 text-white font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            La Niña
          </button>
          <button
            type="button"
            onClick={() => setEnsoPhase('neutral')}
            className={`rounded px-2.5 py-1 transition-colors ${
              ensoPhase === 'neutral'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Neutral
          </button>
          <button
            type="button"
            onClick={() => setEnsoPhase('elnino')}
            className={`rounded px-2.5 py-1 transition-colors ${
              ensoPhase === 'elnino'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            El Niño
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 text-xs">
        <div className="rounded-lg bg-slate-950 p-3 border border-slate-800">
          <span className="text-[10px] uppercase text-slate-400 font-semibold block">{t.stats.volume}</span>
          <span className="text-lg font-bold text-cyan-400 font-mono">
            ~{volumeTransportSv} <span className="text-xs font-normal">Sverdrup (Sv)</span>
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">1 Sv = 1,000,000 m³/detik</span>
        </div>
        <div className="rounded-lg bg-slate-950 p-3 border border-slate-800">
          <span className="text-[10px] uppercase text-slate-400 font-semibold block">{t.stats.heat}</span>
          <span className="text-lg font-bold text-amber-400 font-mono">
            ~{heatTransportPW} <span className="text-xs font-normal">Petawatt (10¹⁵ W)</span>
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">
            {isId ? 'Regulator panas iklim global' : 'Global conveyor belt heat sink'}
          </span>
        </div>
        <div className="rounded-lg bg-slate-950 p-3 border border-slate-800">
          <span className="text-[10px] uppercase text-slate-400 font-semibold block">{t.stats.gradient}</span>
          <span className="text-sm font-bold text-emerald-400 font-mono">
            {ensoPhase === 'lanina' ? '+35 cm' : ensoPhase === 'elnino' ? '+15 cm' : '+25 cm'} (Pasifik → Hindia)
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">
            {isId ? 'Pendorong gravitasi arus utama' : 'Pressure gradient driving flow'}
          </span>
        </div>
      </div>

      {/* Schematic Map SVG */}
      <div className="overflow-hidden rounded-lg border border-slate-800 bg-slate-950 p-3">
        <svg viewBox="0 0 680 340" className="w-full h-auto select-none" role="img">
          {/* Background Oceanic Basin */}
          <rect x="10" y="10" width="660" height="320" fill="#09182a" rx="8" />

          {/* Western Pacific (Top Right Basin) */}
          <rect x="420" y="20" width="230" height="150" fill="#0369a1" opacity="0.3" rx="4" />
          <text x="440" y="45" fill="#38bdf8" fontSize="11" fontWeight="bold">
            {t.oceanBodies.pacific}
          </text>
          <text x="440" y="62" fill="#7dd3fc" fontSize="9">
            Warm Pool (+25cm Head)
          </text>

          {/* Indian Ocean (Bottom Left Basin) */}
          <rect x="30" y="180" width="260" height="130" fill="#075985" opacity="0.3" rx="4" />
          <text x="50" y="295" fill="#38bdf8" fontSize="11" fontWeight="bold">
            {t.oceanBodies.indian}
          </text>

          {/* Schematic Landmasses (Islands of Indonesia) */}
          {/* Kalimantan (Borneo) */}
          <path d="M 210,50 L 320,40 L 330,140 L 220,150 Z" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
          <text x="235" y="100" fill="#94a3b8" fontSize="11" fontWeight="bold">KALIMANTAN</text>

          {/* Sulawesi */}
          <path d="M 370,50 L 440,60 L 410,100 L 450,130 L 400,160 L 365,110 Z" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
          <text x="380" y="110" fill="#94a3b8" fontSize="10" fontWeight="bold">SULAWESI</text>

          {/* Sumatra */}
          <path d="M 40,80 L 170,180 L 130,200 L 30,110 Z" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
          <text x="60" y="140" fill="#94a3b8" fontSize="11" fontWeight="bold">SUMATRA</text>

          {/* Java */}
          <path d="M 140,210 L 290,210 L 290,230 L 140,230 Z" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
          <text x="190" y="225" fill="#94a3b8" fontSize="10" fontWeight="bold">JAWA</text>

          {/* Nusa Tenggara / Bali / Lombok / Timor */}
          <path d="M 305,215 L 340,215 L 340,230 L 305,230 Z" fill="#1e293b" stroke="#475569" strokeWidth="1" />
          <text x="310" y="225" fill="#64748b" fontSize="7">BALI</text>

          <path d="M 355,215 L 420,215 L 420,230 L 355,230 Z" fill="#1e293b" stroke="#475569" strokeWidth="1" />
          <text x="365" y="225" fill="#64748b" fontSize="7">FLORES</text>

          <path d="M 450,225 L 530,245 L 510,265 L 440,245 Z" fill="#1e293b" stroke="#475569" strokeWidth="1" />
          <text x="465" y="250" fill="#64748b" fontSize="8" fontWeight="bold">TIMOR</text>

          {/* Papua */}
          <path d="M 520,70 L 640,90 L 640,170 L 540,160 Z" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
          <text x="560" y="125" fill="#94a3b8" fontSize="11" fontWeight="bold">PAPUA</text>

          {/* FLOW ARROWS: MAKASSAR STRAIT (Main Inflow) */}
          <g>
            <path
              d="M 500,45 Q 380,30 350,90 T 345,170"
              fill="none"
              stroke="#06b6d4"
              strokeWidth={4 * flowSpeedFactor}
              strokeDasharray="6 3"
            >
              <animate attributeName="stroke-dashoffset" from="30" to="0" dur={`${1.2 / flowSpeedFactor}s`} repeatCount="indefinite" />
            </path>
            <rect x="300" y="70" width="80" height="20" rx="3" fill="#082f49" stroke="#0ea5e9" strokeWidth="1" />
            <text x="306" y="83" fill="#7dd3fc" fontSize="8" fontWeight="bold">
              {isId ? 'Selat Makassar (11,6 Sv)' : 'Makassar St. (11.6 Sv)'}
            </text>
          </g>

          {/* OUTFLOW PATHWAYS */}
          {/* 1. Lombok Strait */}
          <path
            d="M 345,175 Q 330,195 348,225 T 320,280"
            fill="none"
            stroke="#f59e0b"
            strokeWidth={2.5 * flowSpeedFactor}
            strokeDasharray="4 2"
          >
            <animate attributeName="stroke-dashoffset" from="20" to="0" dur={`${1.0 / flowSpeedFactor}s`} repeatCount="indefinite" />
          </path>
          <text x="270" y="260" fill="#fde047" fontSize="8" fontWeight="bold">
            {isId ? 'Selat Lombok' : 'Lombok Strait'}
          </text>

          {/* 2. Ombai Strait & Timor Passage */}
          <path
            d="M 350,175 Q 430,190 435,225 T 410,290"
            fill="none"
            stroke="#f59e0b"
            strokeWidth={3 * flowSpeedFactor}
            strokeDasharray="5 2"
          >
            <animate attributeName="stroke-dashoffset" from="25" to="0" dur={`${1.1 / flowSpeedFactor}s`} repeatCount="indefinite" />
          </path>
          <path
            d="M 440,180 Q 500,200 490,235 T 460,300"
            fill="none"
            stroke="#f59e0b"
            strokeWidth={3 * flowSpeedFactor}
            strokeDasharray="5 2"
          >
            <animate attributeName="stroke-dashoffset" from="25" to="0" dur={`${1.1 / flowSpeedFactor}s`} repeatCount="indefinite" />
          </path>
          <text x="440" y="285" fill="#fde047" fontSize="8" fontWeight="bold">
            {isId ? 'Celah Timor & Ombai' : 'Timor & Ombai Outflows'}
          </text>
        </svg>
      </div>

      <div className="mt-3 rounded-lg border border-slate-800 bg-slate-950/80 p-3 text-xs text-slate-300 leading-relaxed">
        <span className="font-bold text-cyan-400 block mb-1">
          {isId ? 'Kopling Iklim & Arlindo: ' : 'Climate Coupling & Throughflow: '}
        </span>
        {isId
          ? 'Arlindo bertindak sebagai katup termal utama Bumi. Selama fase La Niña, angin pasat Pasifik menguat, menumpuk lebih banyak air hangat di Pasifik Barat, sehingga transpor Arlindo meningkat tajam (~18,5 Sv). Sebaliknya saat El Niño, gradien tekanan mendatar dan aliran Arlindo melemah (~10,2 Sv).'
          : 'The ITF serves as Earth’s primary oceanic thermal choke point. During La Niña, intense Pacific trade winds pile warm water in the Western Pacific, steepening the sea-level gradient and boosting flow (~18.5 Sv). During El Niño, the pressure slope collapses, weakening throughput (~10.2 Sv).'}
      </div>
    </div>
  );
}
