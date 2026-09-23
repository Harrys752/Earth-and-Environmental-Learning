import { useState } from 'preact/hooks';

interface CarbonCycleDiagramProps {
  locale?: 'en' | 'id';
}

export default function CarbonCycleDiagram({ locale = 'en' }: CarbonCycleDiagramProps) {
  const isId = locale === 'id';
  const [viewMode, setViewMode] = useState<'global' | 'mangrove'>('mangrove');

  const t = {
    badge: isId ? 'Biogeokimia & Karbon Biru Skematis' : 'Schematic Biogeochemistry & Blue Carbon',
    title: isId ? 'Daur Karbon Bumi & Sekuestrasi Mangrove Indonesia' : "Earth's Carbon Cycle & Indonesia's Blue Carbon Sink",
    subtitle: isId
      ? 'Fluks karbon antara atmosfer, biosfer, samudra, dan tanah sedimen bakau anoksik berdensitas tinggi.'
      : 'Carbon fluxes across atmosphere, biosphere, oceans, and high-density anoxic mangrove sediments.',
    toggles: {
      global: isId ? 'Daur Karbon Global (4 Reservoir)' : 'Global Carbon Reservoirs',
      mangrove: isId ? 'Fokus Karbon Biru Mangrove (Indonesia)' : 'Indonesia Mangrove Blue Carbon Focus'
    },
    mangroveStats: {
      title: isId ? 'Neraca Karbon Ekosistem Mangrove Indonesia' : "Indonesia's Mangrove Carbon Reservoir Allocation",
      area: isId ? 'Luas: ~3 Juta Hektar (23% dari Total Mangrove Dunia)' : 'Area: ~3 Million Hectares (23% of Global Total)',
      stock: isId ? 'Total Simpanan: ~3,14 Miliar Ton Karbon (~1/3 Karbon Biru Global)' : 'Total Stock: ~3.14 Billion Tonnes C (~1/3 Global Coastal Blue Carbon)',
      soilShare: isId ? '78% Karbon Tersimpan di Dalam Tanah Berlumpur Anoksik' : '78% Carbon Stored Deep in Anoxic Waterlogged Soil',
      biomassShare: isId ? '20% Biomassa Pohon Hidup' : '20% Living Tree Biomass',
      woodShare: isId ? '2% Kayu Lapuk' : '2% Dead Organic Wood'
    }
  };

  return (
    <div className="my-8 rounded-xl border border-slate-700/70 bg-slate-900/90 p-5 shadow-xl backdrop-blur-sm">
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
            onClick={() => setViewMode('mangrove')}
            className={`rounded px-3 py-1.5 transition-colors ${
              viewMode === 'mangrove'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {t.toggles.mangrove}
          </button>
          <button
            type="button"
            onClick={() => setViewMode('global')}
            className={`rounded px-3 py-1.5 transition-colors ${
              viewMode === 'global'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {t.toggles.global}
          </button>
        </div>
      </div>

      {viewMode === 'mangrove' ? (
        <div className="space-y-4">
          {/* Mangrove Cross Section SVG */}
          <div className="overflow-hidden rounded-lg border border-slate-800 bg-slate-950 p-3">
            <svg viewBox="0 0 680 280" className="w-full h-auto select-none" role="img">
              {/* Atmosphere Layer (Sky) */}
              <rect x="10" y="10" width="660" height="90" fill="#0f172a" />
              <text x="30" y="35" fill="#94a3b8" fontSize="11" fontWeight="bold">
                {isId ? 'Atmosfer: Gas Karbon Dioksida (CO₂)' : 'Atmosphere: Atmospheric CO2 Pool'}
              </text>

              {/* Photosynthesis arrow going down */}
              <g transform="translate(180, 45)">
                <line x1="0" y1="0" x2="0" y2="40" stroke="#10b981" strokeWidth="2.5" strokeDasharray="3 2" />
                <polygon points="-4,40 4,40 0,47" fill="#10b981" />
                <text x="8" y="25" fill="#34d399" fontSize="9" fontWeight="bold">
                  {isId ? 'Fotosintesis Cepat' : 'Photosynthesis'}
                </text>
              </g>

              {/* Tidal Water Layer */}
              <rect x="10" y="100" width="660" height="50" fill="#0284c7" opacity="0.4" />
              <line x1="10" y1="100" x2="670" y2="100" stroke="#38bdf8" strokeWidth="2" />
              <text x="500" y="125" fill="#7dd3fc" fontSize="9" fontWeight="bold">
                {isId ? 'Pasang Surut Pesisir' : 'Tidal Water Column'}
              </text>

              {/* Mangrove Trees (20% living biomass) */}
              <g transform="translate(260, 60)">
                {/* Canopy */}
                <circle cx="0" cy="0" r="25" fill="#047857" />
                <circle cx="20" cy="-5" r="20" fill="#059669" />
                <circle cx="-20" cy="-5" r="18" fill="#10b981" />
                {/* Prop roots (Stilt roots in water) */}
                <line x1="0" y1="20" x2="-25" y2="60" stroke="#78350f" strokeWidth="3" />
                <line x1="0" y1="20" x2="25" y2="60" stroke="#78350f" strokeWidth="3" />
                <line x1="0" y1="20" x2="0" y2="60" stroke="#78350f" strokeWidth="3.5" />
                <text x="-40" y="-35" fill="#6ee7b7" fontSize="10" fontWeight="bold">
                  {isId ? 'Biomassa Pohon (20%)' : 'Living Biomass (20%)'}
                </text>
              </g>

              {/* Anoxic Waterlogged Soil Layer (78% of carbon) */}
              <rect x="10" y="150" width="660" height="120" fill="#1c1917" stroke="#44403c" strokeWidth="1" />
              <text x="30" y="180" fill="#f59e0b" fontSize="11" fontWeight="bold">
                {isId ? 'Sedimen Tanah Gambut/Lumpur Bakau (78% dari Total Karbon)' : 'Waterlogged Anoxic Soil Pool (78% of Total Carbon)'}
              </text>
              <text x="30" y="200" fill="#a8a29e" fontSize="9">
                {isId
                  ? 'Kondisi jenuh air tanpa oksigen menghentikan pembusukan bakteri, mengunci karbon ribuan tahun.'
                  : 'Zero-oxygen waterlogged state prevents bacterial decomposition, locking carbon for millennia.'}
              </text>

              {/* Dead wood buried (2%) */}
              <rect x="420" y="210" width="80" height="12" rx="3" fill="#78350f" />
              <text x="510" y="220" fill="#d6d3d1" fontSize="8">
                {isId ? 'Kayu Lapuk (2%)' : 'Dead Wood (2%)'}
              </text>
            </svg>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="rounded-lg bg-slate-950 p-3.5 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                {isId ? 'Luas Mangrove Indonesia' : 'Indonesian Mangrove Area'}
              </span>
              <span className="text-base font-bold text-emerald-400 font-mono">~3.000.000 ha</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">23% luas mangrove dunia</span>
            </div>
            <div className="rounded-lg bg-slate-950 p-3.5 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                {isId ? 'Stok Karbon Biru' : 'Blue Carbon Stock'}
              </span>
              <span className="text-base font-bold text-cyan-400 font-mono">3,14 Miliar Ton C</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">~1/3 cadangan pesisir global</span>
            </div>
            <div className="rounded-lg bg-slate-950 p-3.5 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                {isId ? 'Densitas vs Hutan Darat' : 'Carbon Density vs Land Forest'}
              </span>
              <span className="text-base font-bold text-amber-400 font-mono">3 – 5x Lebih Padat</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Akumulasi sedimen bawah tanah</span>
            </div>
          </div>
        </div>
      ) : (
        /* Global Carbon Reservoirs View */
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="rounded-lg bg-slate-950 p-3.5 border border-slate-800 space-y-1.5">
            <h4 className="font-bold text-cyan-400">{isId ? '1. Atmosfer' : '1. Atmosphere'}</h4>
            <p className="text-slate-300">~800 GtC (Gas CO₂ & Metana CH₄).</p>
            <p className="text-[11px] text-slate-400">Cepat bersirkulasi melalui respirasi dan fotosintesis.</p>
          </div>
          <div className="rounded-lg bg-slate-950 p-3.5 border border-slate-800 space-y-1.5">
            <h4 className="font-bold text-emerald-400">{isId ? '2. Biosfer' : '2. Biosphere'}</h4>
            <p className="text-slate-300">~600 GtC (Tumbuhan & Hewan).</p>
            <p className="text-[11px] text-slate-400">Karbon organik aktif yang mengalir di jaring-jaring makanan.</p>
          </div>
          <div className="rounded-lg bg-slate-950 p-3.5 border border-slate-800 space-y-1.5">
            <h4 className="font-bold text-blue-400">{isId ? '3. Samudra' : '3. Ocean'}</h4>
            <p className="text-slate-300">~38.000 GtC (Karbon Anorganik Terlarut).</p>
            <p className="text-[11px] text-slate-400">Penyerap karbon terbesar di luar batuan kerak.</p>
          </div>
          <div className="rounded-lg bg-slate-950 p-3.5 border border-slate-800 space-y-1.5">
            <h4 className="font-bold text-amber-400">{isId ? '4. Geosfer' : '4. Geosphere'}</h4>
            <p className="text-slate-300">&gt; 100.000.000 GtC (Batugamping & Fosil).</p>
            <p className="text-[11px] text-slate-400">Siklus geologis lambat (jutaan tahun pelapukan dan subduksi).</p>
          </div>
        </div>
      )}
    </div>
  );
}
