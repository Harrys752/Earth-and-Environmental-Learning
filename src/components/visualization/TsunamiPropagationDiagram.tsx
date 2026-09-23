import { useState } from 'preact/hooks';

interface TsunamiPropagationDiagramProps {
  locale?: 'en' | 'id';
}

export default function TsunamiPropagationDiagram({ locale = 'en' }: TsunamiPropagationDiagramProps) {
  const isId = locale === 'id';
  const [activeTab, setActiveTab] = useState<'propagation' | 'acehVsPalu'>('propagation');

  const t = {
    badge: isId ? 'Fisika Gelombang Seismik & Bahaya Pesisir' : 'Wave Physics & Coastal Hazard Model',
    title: isId ? 'Pembentukan Tsunami & Efek Dangkal (Shoaling)' : 'Tsunami Genesis & Shoaling Dynamics',
    subtitle: isId
      ? 'Bagaimana deformasi dasar laut vertikal saat gempa megathrust bermutasi menjadi gelombang destruktif di pantai.'
      : 'How vertical seafloor megathrust displacement evolves into catastrophic coastal shoaling waves.',
    tabs: {
      prop: isId ? 'Fisika Perambatan & Shoaling' : 'Propagation & Shoaling Physics',
      contrast: isId ? 'Komparasi: Aceh 2004 vs Palu 2018' : 'Case Contrast: Aceh 2004 vs Palu 2018'
    },
    deepOcean: {
      title: isId ? 'Samudra Dalam (Kedalaman ~4.000 m)' : 'Open Deep Ocean (~4,000 m depth)',
      speed: isId ? 'Kecepatan: ~800 km/jam (Setara Pesawat Jet)' : 'Velocity: ~800 km/h (Jet Airliner Speed)',
      wavelength: isId ? 'Panjang Gelombang: 100 – 200 km' : 'Wavelength: 100 – 200 km',
      height: isId ? 'Tinggi Gelombang: < 1 meter (Nyaris Tak Terasa di Kapal)' : 'Wave Amplitude: < 1 meter (Imperceptible to ships)'
    },
    shallowCoast: {
      title: isId ? 'Perairan Dangkal Pesisir (Kedalaman < 50 m)' : 'Shallow Coastal Waters (< 50 m depth)',
      speed: isId ? 'Kecepatan: Melambat drastis (~30 – 50 km/jam)' : 'Velocity: Drops sharply (~30 – 50 km/h)',
      wavelength: isId ? 'Panjang Gelombang: Mampat (< 5 km)' : 'Wavelength: Compressed (< 5 km)',
      height: isId ? 'Tinggi Limpasan (Runup): Melonjak hingga 20 – 50 meter!' : 'Runup Height: Surges to 20 – 51 meters!'
    }
  };

  return (
    <div className="my-8 rounded-xl border border-slate-700/70 bg-slate-900/90 p-5 shadow-xl backdrop-blur-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <span className="inline-block rounded-full bg-rose-500/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-rose-400">
            {t.badge}
          </span>
          <h3 className="mt-1 text-lg font-bold text-slate-100">{t.title}</h3>
          <p className="text-xs text-slate-400">{t.subtitle}</p>
        </div>
        <div className="flex gap-1.5 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('propagation')}
            className={`rounded px-3 py-1.5 transition-colors ${
              activeTab === 'propagation'
                ? 'bg-rose-500 text-white font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {t.tabs.prop}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('acehVsPalu')}
            className={`rounded px-3 py-1.5 transition-colors ${
              activeTab === 'acehVsPalu'
                ? 'bg-rose-500 text-white font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {t.tabs.contrast}
          </button>
        </div>
      </div>

      {activeTab === 'propagation' ? (
        <div>
          {/* Shoaling Physics SVG */}
          <div className="overflow-hidden rounded-lg border border-slate-800 bg-slate-950 p-3 mb-4">
            <svg viewBox="0 0 700 280" className="w-full h-auto select-none" role="img">
              {/* Bathymetry Profile (Slope from deep ocean to shallow beach) */}
              <path
                d="M 20,220 L 280,220 L 460,190 L 600,120 L 680,100 L 680,260 L 20,260 Z"
                fill="#1e293b"
                stroke="#475569"
                strokeWidth="2"
              />

              {/* Water Layer */}
              <path
                d="M 20,60 Q 150,55 280,60 T 460,55 Q 520,30 580,25 Q 610,15 630,90 L 680,100 L 680,260 L 20,260 Z"
                fill="#0369a1"
                opacity="0.5"
              />

              {/* Seafloor Megathrust Uplift at left */}
              <g transform="translate(60, 200)">
                <polygon points="0,0 20,-15 40,0" fill="#f43f5e" />
                <line x1="20" y1="20" x2="20" y2="-15" stroke="#fb7185" strokeWidth="2.5" />
                <text x="-10" y="38" fill="#fda4af" fontSize="9" fontWeight="bold">
                  {isId ? 'Dislokasi Seafloor (~15 m)' : 'Megathrust Uplift (~15 m)'}
                </text>
              </g>

              {/* Deep Ocean Waves (low height, wide wavelength) */}
              <path
                d="M 20,60 Q 80,50 140,60 T 260,60"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2.5"
              />
              <text x="70" y="42" fill="#bae6fd" fontSize="9">
                {isId ? 'Gelombang Lebar & Cepat (800 km/h)' : 'Low Amplitude, Fast (800 km/h)'}
              </text>

              {/* Shoaling Wave Surge near Coast */}
              <path
                d="M 460,60 C 510,50 540,15 580,20 C 600,25 615,50 630,95"
                fill="none"
                stroke="#f43f5e"
                strokeWidth="4"
              />
              {/* Wave Runup label */}
              <text x="500" y="15" fill="#fecdd3" fontSize="11" fontWeight="bold">
                {isId ? 'Efek Shoaling (>30–50 m Runup)' : 'Shoaling Amplification (>30-51 m Runup)'}
              </text>

              {/* Coast & Coconut trees */}
              <line x1="600" y1="120" x2="680" y2="100" stroke="#10b981" strokeWidth="3" />
              <rect x="640" y="80" width="12" height="20" fill="#94a3b8" />
              <text x="635" y="70" fill="#e2e8f0" fontSize="9" fontWeight="bold">
                {isId ? 'Daratan Pesisir' : 'Coastal City'}
              </text>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="rounded-lg bg-slate-950 p-3.5 border border-slate-800 space-y-1">
              <h4 className="font-bold text-cyan-400">{t.deepOcean.title}</h4>
              <p className="text-slate-300">• {t.deepOcean.speed}</p>
              <p className="text-slate-300">• {t.deepOcean.wavelength}</p>
              <p className="text-slate-300">• {t.deepOcean.height}</p>
            </div>
            <div className="rounded-lg bg-slate-950 p-3.5 border border-slate-800 space-y-1">
              <h4 className="font-bold text-rose-400">{t.shallowCoast.title}</h4>
              <p className="text-slate-300">• {t.shallowCoast.speed}</p>
              <p className="text-slate-300">• {t.shallowCoast.wavelength}</p>
              <p className="text-slate-300">• {t.shallowCoast.height}</p>
            </div>
          </div>
        </div>
      ) : (
        /* Aceh vs Palu Contrast View */
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="rounded-lg bg-slate-950 p-4 border border-rose-900/50 space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-sm text-rose-400">Sumatra-Aceh (2004)</span>
                <span className="font-mono text-slate-400">Mw 9.1 – 9.3</span>
              </div>
              <p className="text-slate-200 font-semibold">
                {isId ? 'Mekanisme: Deformasi Vertikal Megathrust Primer' : 'Mechanism: Primary Megathrust Vertical Displacement'}
              </p>
              <p className="text-slate-300 leading-relaxed">
                {isId
                  ? 'Sesar naik raksasa sepanjang 1.200–1.600 km tergelincir sejauh rata-rata 15 meter, mengangkat dasar laut secara vertikal seketika dan mendorong massa air samudra luas. Menghasilkan tsunami trans-samudra lintas 14 negara dengan runup hingga 51 meter di Aceh.'
                  : 'Massive undersea thrust fault rupture over 1,200–1,600 km with ~15 m displacement vertically uplifted the oceanic water column, generating a trans-oceanic tsunami across 14 nations with runups reaching 51 meters.'}
              </p>
            </div>

            <div className="rounded-lg bg-slate-950 p-4 border border-amber-900/50 space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-sm text-amber-400">Palu-Sulawesi (2018)</span>
                <span className="font-mono text-slate-400">Mw 7.5</span>
              </div>
              <p className="text-slate-200 font-semibold">
                {isId ? 'Mekanisme: Longsoran Bawah Laut Sekunder & Likuifaksi' : 'Mechanism: Secondary Submarine Landslides & Liquefaction'}
              </p>
              <p className="text-slate-300 leading-relaxed">
                {isId
                  ? 'Sesar Palu-Koro berkarakter sesar geser (strike-slip horizontal) yang normalnya tidak membangkitkan tsunami besar. Namun, guncangan hebat memicu longsoran tebing sedimen bawah laut dan runtuhan pantai ke dalam Teluk Palu yang sempit, menciptakan tsunami lokal dahsyat dalam tempo kurang dari 3 menit.'
                  : 'The strike-slip Palu-Koro fault had primarily horizontal slip. However, intense shaking triggered secondary submarine sediment landslides and coastal liquefaction collapses into narrow Palu Bay, generating a catastrophic localized tsunami within 3 minutes.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
