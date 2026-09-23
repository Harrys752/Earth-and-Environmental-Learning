import { useState } from 'preact/hooks';

interface SubsidenceSimulatorProps {
  locale?: 'en' | 'id';
}

export default function SubsidenceSimulator({ locale = 'en' }: SubsidenceSimulatorProps) {
  const isId = locale === 'id';
  const [pumpingRate, setPumpingRate] = useState<number>(75); // 0 to 100%

  // Physical calculations (illustrative model)
  const subsidenceRateCmPerYear = ((pumpingRate / 100) * 12).toFixed(1);
  const tenYearSubsidenceMeters = ((parseFloat(subsidenceRateCmPerYear) * 10) / 100).toFixed(2);
  const porePressureLossPercent = Math.round(pumpingRate * 0.85);

  const t = {
    badge: isId ? 'Model Hidrogeologi Skematis' : 'Schematic Hydrogeology Model',
    title: isId ? 'Simulasi Penurunan Tanah Jakarta (Subsidence)' : 'Jakarta Land Subsidence & Aquifer Simulator',
    subtitle: isId
      ? 'Interaksi antara ekstraksi air tanah dalam, hilangnya tekanan pori, dan pemadatan permanen lapisan lempung.'
      : 'Interaction between deep groundwater pumping, pore pressure loss, and irreversible clay compaction.',
    sliderLabel: isId ? 'Laju Ekstraksi Air Tanah Industri & Domestik:' : 'Groundwater Extraction Rate:',
    stats: {
      rate: isId ? 'Laju Penurunan Muka Tanah' : 'Annual Subsidence Rate',
      tenYear: isId ? 'Proyeksi Amblesan 10 Tahun' : '10-Year Cumulative Sinking',
      poreLoss: isId ? 'Kehilangan Tekanan Pori' : 'Pore Pressure Deficit',
      status: isId ? 'Tingkat Kerentanan Banjir Rob' : 'Coastal Inundation Risk'
    },
    riskLevels: {
      low: isId ? 'Rendah (Recharge Alami Seimbang)' : 'Low (Equilibrium Recharge)',
      moderate: isId ? 'Sedang (Mulai Terjadi Pemadatan)' : 'Moderate (Onset of Compaction)',
      critical: isId ? 'Kritis (Amblesan Cepat di Pesisir/Ancol)' : 'Critical (Severe Coastal Subsidence / Ancol)'
    },
    layers: {
      surface: isId ? 'Permukaan Kota (Jakarta Utara / Tanggul Laut)' : 'Urban Ground Surface (North Jakarta)',
      shallowAquifer: isId ? 'Akuifer Dangkal (Tercemar / Menipis)' : 'Shallow Aquifer (Depleted)',
      clayAquitard: isId ? 'Lapisan Lempung Mampat (Clay Compaction Zone)' : 'Compressible Marine Clay Aquitard',
      deepAquifer: isId ? 'Akuifer Dalam Bertekanan (Deep Confined Aquifer)' : 'Deep Confined Aquifer (Pumped)',
      bedrock: isId ? 'Batuan Dasar Vulkanik / Sedimen Tua' : 'Consolidated Geological Bedrock'
    },
    scientificNote: isId
      ? 'Mekanika Fisika: Ketika air dipompa melebihi imbuhan alami, air keluar dari pori-pori mikroskopis lempung. Butiran lempung pipih merapat dan menyusun ulang secara permanen. Pemadatan lempung ini tidak dapat balik (irreversible) meskipun pemompaan dihentikan di masa depan.'
      : 'Physical Mechanics: When extraction exceeds recharge, pore pressure drops. Microscopic clay plates collapse and permanently realign under overburden weight. This clay compaction is mechanically irreversible even if pumping is halted.'
  };

  const riskStatus =
    pumpingRate < 30
      ? t.riskLevels.low
      : pumpingRate < 70
      ? t.riskLevels.moderate
      : t.riskLevels.critical;

  const riskColor =
    pumpingRate < 30 ? 'text-emerald-400' : pumpingRate < 70 ? 'text-amber-400' : 'text-rose-400';

  // Coordinate adjustments based on pumping rate
  const groundY = 60 + (pumpingRate / 100) * 20; // 60 to 80
  const clayThickness = 50 - (pumpingRate / 100) * 15; // compacts from 50 to 35

  return (
    <div className="my-8 rounded-xl border border-slate-700/70 bg-slate-900/90 p-5 shadow-xl backdrop-blur-sm">
      <div className="mb-4 border-b border-slate-800 pb-3">
        <span className="inline-block rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-cyan-400">
          {t.badge}
        </span>
        <h3 className="mt-1 text-lg font-bold text-slate-100">{t.title}</h3>
        <p className="text-xs text-slate-400">{t.subtitle}</p>
      </div>

      {/* Slider Control */}
      <div className="mb-5 rounded-lg border border-slate-800 bg-slate-950 p-4">
        <div className="flex items-center justify-between text-xs mb-2">
          <label htmlFor="pumping-slider" className="font-semibold text-slate-200">
            {t.sliderLabel}
          </label>
          <span className="font-mono text-cyan-400 font-bold">{pumpingRate}% (Intensitas Pemompaan)</span>
        </div>
        <input
          id="pumping-slider"
          type="range"
          min="10"
          max="100"
          value={pumpingRate}
          onInput={(e) => setPumpingRate(Number((e.target as HTMLInputElement).value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />
        <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
          <span>{isId ? 'Imbuhan Alami Rendah (10%)' : 'Natural Recharge (10%)'}</span>
          <span>{isId ? 'Kondisi Aktual Jakarta (75-90%)' : 'Current Jakarta Over-extraction (75-90%)'}</span>
          <span>{isId ? 'Maksimum (100%)' : 'Peak Pumping (100%)'}</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5 text-xs">
        <div className="rounded-lg bg-slate-950 p-3 border border-slate-800">
          <span className="text-[10px] uppercase text-slate-400 font-semibold block">{t.stats.rate}</span>
          <span className="text-base font-bold text-rose-400 font-mono">
            {subsidenceRateCmPerYear} <span className="text-xs font-normal">cm/thn</span>
          </span>
        </div>
        <div className="rounded-lg bg-slate-950 p-3 border border-slate-800">
          <span className="text-[10px] uppercase text-slate-400 font-semibold block">{t.stats.tenYear}</span>
          <span className="text-base font-bold text-amber-300 font-mono">
            ~{tenYearSubsidenceMeters} <span className="text-xs font-normal">meter</span>
          </span>
        </div>
        <div className="rounded-lg bg-slate-950 p-3 border border-slate-800">
          <span className="text-[10px] uppercase text-slate-400 font-semibold block">{t.stats.poreLoss}</span>
          <span className="text-base font-bold text-cyan-400 font-mono">{porePressureLossPercent}%</span>
        </div>
        <div className="rounded-lg bg-slate-950 p-3 border border-slate-800">
          <span className="text-[10px] uppercase text-slate-400 font-semibold block">{t.stats.status}</span>
          <span className={`text-xs font-bold leading-tight block ${riskColor}`}>{riskStatus}</span>
        </div>
      </div>

      {/* Cross Section SVG */}
      <div className="overflow-hidden rounded-lg border border-slate-800 bg-slate-950 p-3">
        <svg viewBox="0 0 650 300" className="w-full h-auto select-none" role="img">
          <defs>
            <pattern id="sandPatternSub" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#0284c7" opacity="0.6" />
              <circle cx="7" cy="7" r="1" fill="#0284c7" opacity="0.6" />
            </pattern>
            <pattern id="clayPatternSub" width="14" height="6" patternUnits="userSpaceOnUse">
              <line x1="0" y1="3" x2="10" y2="3" stroke="#e2e8f0" strokeWidth="0.8" opacity="0.4" />
            </pattern>
          </defs>

          {/* Sea Level (Java Sea / Jakarta Bay) at left */}
          <rect x="20" y="65" width="140" height="225" fill="#0369a1" opacity="0.4" />
          <line x1="20" y1="65" x2="160" y2="65" stroke="#38bdf8" strokeWidth="2.5" />
          <text x="30" y="58" fill="#38bdf8" fontSize="10" fontWeight="bold">
            {isId ? 'Laut Jawa (Muka Air Laut 0 m)' : 'Java Sea (Sea Level 0 m)'}
          </text>

          {/* Sea Wall Barrier */}
          <rect x="155" y="45" width="12" height="70" fill="#475569" stroke="#94a3b8" strokeWidth="1" />
          <text x="140" y="38" fill="#cbd5e1" fontSize="8" fontWeight="bold">
            {isId ? 'Tanggul Laut' : 'Sea Wall'}
          </text>

          {/* Urban Surface (City ground sinking dynamically) */}
          <path
            d={`M 167,${groundY} L 630,${groundY} L 630,110 L 167,110 Z`}
            fill="#334155"
            stroke="#64748b"
            strokeWidth="1.5"
          />
          {/* City Buildings schematic */}
          <rect x="200" y={groundY - 18} width="16" height="18" fill="#94a3b8" />
          <rect x="220" y={groundY - 26} width="22" height="26" fill="#cbd5e1" />
          <rect x="280" y={groundY - 15} width="18" height="15" fill="#94a3b8" />
          <rect x="360" y={groundY - 32} width="24" height="32" fill="#e2e8f0" />
          <rect x="450" y={groundY - 20} width="20" height="20" fill="#94a3b8" />
          <text x="210" y={groundY - 32} fill="#e2e8f0" fontSize="9" fontWeight="bold">
            {isId ? 'Wilayah Jakarta Utara (Tenggelam di Bawah Muka Laut)' : 'North Jakarta Subsiding Zone'}
          </text>

          {/* Sinking Indicator Arrows */}
          <g transform="translate(400, 20)">
            <line x1="0" y1="0" x2="0" y2={groundY - 25} stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 2" />
            <polygon points={`-4,${groundY - 25} 4,${groundY - 25} 0,${groundY - 18}`} fill="#f43f5e" />
          </g>

          {/* Shallow Aquifer */}
          <rect x="167" y="110" width="463" height="35" fill="#075985" opacity="0.7" />
          <rect x="167" y="110" width="463" height="35" fill="url(#sandPatternSub)" />
          <text x="180" y="132" fill="#bae6fd" fontSize="9" fontWeight="bold">
            {t.layers.shallowAquifer}
          </text>

          {/* Compressible Clay Layer (Compacts with slider) */}
          <rect x="167" y="145" width="463" height={clayThickness} fill="#78350f" opacity="0.85" />
          <rect x="167" y="145" width="463" height={clayThickness} fill="url(#clayPatternSub)" />
          <text x="180" y={145 + clayThickness / 2 + 3} fill="#fed7aa" fontSize="9" fontWeight="bold">
            {t.layers.clayAquitard} ({Math.round(clayThickness)}m)
          </text>

          {/* Deep Confined Aquifer with Extraction Well */}
          <rect x="167" y={145 + clayThickness} width="463" height={290 - (145 + clayThickness)} fill="#0369a1" />
          <rect x="167" y={145 + clayThickness} width="463" height={290 - (145 + clayThickness)} fill="url(#sandPatternSub)" />
          <text x="180" y={145 + clayThickness + 20} fill="#38bdf8" fontSize="9" fontWeight="bold">
            {t.layers.deepAquifer}
          </text>

          {/* Deep Well Pipe drawing water */}
          <line x1="372" y1={groundY} x2="372" y2="240" stroke="#f59e0b" strokeWidth="3" />
          <circle cx="372" cy="240" r="6" fill="#ef4444" />
          {/* Suction animation / flow lines */}
          <line x1="330" y1="240" x2="365" y2="240" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="414" y1="240" x2="379" y2="240" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
          <text x="385" y="244" fill="#fde047" fontSize="8" fontWeight="bold">
            {isId ? 'Pompa Air Industri' : 'Deep Extraction Well'}
          </text>
        </svg>
      </div>

      <div className="mt-3 rounded-lg border border-slate-800 bg-slate-950/80 p-3 text-xs text-slate-300 leading-relaxed">
        <span className="font-bold text-cyan-400 block mb-1">
          {isId ? 'Prinsip Ilmiah: ' : 'Scientific Principle: '}
        </span>
        {t.scientificNote}
      </div>
    </div>
  );
}
