import { useState } from 'preact/hooks';

interface EarthLayersDiagramProps {
  locale?: 'en' | 'id';
}

export default function EarthLayersDiagram({ locale = 'en' }: EarthLayersDiagramProps) {
  const isId = locale === 'id';
  const [selectedLayer, setSelectedLayer] = useState<string>('crust');
  const [showSeismicWaves, setShowSeismicWaves] = useState<boolean>(true);

  const t = {
    badge: isId ? 'Model Geofisika Skematis' : 'Schematic Geophysics Model',
    title: isId ? 'Struktur Interior Bumi & Bukti Seismik' : "Earth's Internal Structure & Seismic Evidence",
    subtitle: isId
      ? 'Eksplorasi lapisan konsentris Bumi dan bagaimana perambatan gelombang seismik membuktikan inti luar berwujud cair.'
      : 'Explore concentric planetary layers and how seismic wave shadow zones prove the outer core is liquid.',
    toggleSeismic: isId ? 'Tampilkan Gelombang Seismik (P & S)' : 'Show Seismic Waves (P & S Waves)',
    layers: {
      crust: {
        name: isId ? 'Kerak Bumi (Crust)' : 'Crust',
        depth: '0 – 70 km',
        state: isId ? 'Padat & Rapuh' : 'Solid & Brittle',
        temp: '0 – 700°C',
        comp: isId ? 'Silikat aluminosilikat (Granit & Basalt)' : 'Silicate rock (Granite & Basalt)',
        desc: isId
          ? 'Lapisan terluar yang sangat tipis (hanya ~1% volume Bumi). Titik terdalam yang pernah dibor manusia adalah Kola Superdeep Borehole (~12,2 km), baru menembus sepertiga kerak benua.'
          : 'Thin outer silicate skin (~1% Earth volume). The Kola Superdeep Borehole (~12.2 km) is the deepest human drill hole, barely penetrating the continental crust.'
      },
      mantle: {
        name: isId ? 'Mantel Bumi (Mantle)' : 'Mantle',
        depth: '70 – 2,890 km',
        state: isId ? 'Padat (Duktil / Mengalir Lambat)' : 'Solid (Ductile / Slowly Flowing)',
        temp: '1,000 – 3,700°C',
        comp: isId ? 'Peridotit kaya Besi-Magnesium' : 'Iron-magnesium silicate (Peridotite)',
        desc: isId
          ? 'Mencakup 84% volume Bumi. Meskipun berwujud padat di bawah tekanan tinggi, mantel mengalami konveksi termal lambat selama jutaan tahun yang menggerakkan lempeng tektonik di atasnya.'
          : 'Accounts for 84% of Earth volume. High pressure keeps it solid, yet heat drives slow plastic convection over millions of years, dragging tectonic plates.'
      },
      outerCore: {
        name: isId ? 'Inti Luar (Outer Core)' : 'Outer Core',
        depth: '2,890 – 5,150 km',
        state: isId ? 'Cair (Liquid)' : 'Liquid',
        temp: '4,000 – 5,000°C',
        comp: isId ? 'Paduan Besi-Nikel Cair (Fe-Ni)' : 'Liquid Iron-Nickel alloy (Fe-Ni)',
        desc: isId
          ? 'Gelombang S tidak dapat menembus fluida, menciptakan zona bayangan S di seberang Bumi. Konveksi besi cair di inti luar membangkitkan medan geomagnetik planet kita (dinamo Bumi).'
          : 'S-waves cannot pass through liquid, producing a global S-wave shadow zone. Circulating molten iron generates Earth’s protective geomagnetic field via dynamo action.'
      },
      innerCore: {
        name: isId ? 'Inti Dalam (Inner Core)' : 'Inner Core',
        depth: '5,150 – 6,371 km',
        state: isId ? 'Padat (Solid Kristalin)' : 'Solid Crystalline',
        temp: '5,200 – 6,000°C',
        comp: isId ? 'Besi-Nikel Padat bertekanan ultra-tinggi' : 'Solid crystalline Iron-Nickel alloy',
        desc: isId
          ? 'Meskipun suhunya sepanas permukaan Matahari (~5.500°C), tekanan ekstrem (~3,6 juta atmosfer) memaksa atom besi mengkristal menjadi bola logam padat.'
          : 'As hot as the Sun’s surface (~5,500°C), but extreme pressure (~3.6 million atm) compresses iron-nickel atoms into a solid metallic crystal sphere.'
      }
    }
  };

  const current = (t.layers as any)[selectedLayer];

  return (
    <div className="my-8 rounded-xl border border-slate-700/70 bg-slate-900/90 p-5 shadow-xl backdrop-blur-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <span className="inline-block rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-cyan-400">
            {t.badge}
          </span>
          <h3 className="mt-1 text-lg font-bold text-slate-100">{t.title}</h3>
          <p className="text-xs text-slate-400">{t.subtitle}</p>
        </div>
        <button
          type="button"
          onClick={() => setShowSeismicWaves(!showSeismicWaves)}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
            showSeismicWaves
              ? 'bg-cyan-500 text-slate-950 shadow-md'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          {t.toggleSeismic}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* SVG Diagram */}
        <div className="lg:col-span-7 flex justify-center bg-slate-950 p-4 rounded-lg border border-slate-800">
          <svg viewBox="0 0 420 420" className="w-full max-w-[380px] h-auto select-none" role="img">
            {/* Concentric Circles */}
            {/* Crust (outermost thin blue ring) */}
            <circle
              cx="210"
              cy="210"
              r="190"
              fill={selectedLayer === 'crust' ? '#0284c7' : '#0369a1'}
              stroke="#38bdf8"
              strokeWidth={selectedLayer === 'crust' ? 4 : 2}
              className="cursor-pointer transition-all hover:opacity-90"
              onClick={() => setSelectedLayer('crust')}
            />

            {/* Mantle */}
            <circle
              cx="210"
              cy="210"
              r="182"
              fill={selectedLayer === 'mantle' ? '#d97706' : '#b45309'}
              stroke="#fbbf24"
              strokeWidth={selectedLayer === 'mantle' ? 4 : 1.5}
              className="cursor-pointer transition-all hover:opacity-90"
              onClick={() => setSelectedLayer('mantle')}
            />

            {/* Outer Core */}
            <circle
              cx="210"
              cy="210"
              r="105"
              fill={selectedLayer === 'outerCore' ? '#dc2626' : '#991b1b'}
              stroke="#f87171"
              strokeWidth={selectedLayer === 'outerCore' ? 4 : 1.5}
              className="cursor-pointer transition-all hover:opacity-90"
              onClick={() => setSelectedLayer('outerCore')}
            />

            {/* Inner Core */}
            <circle
              cx="210"
              cy="210"
              r="42"
              fill={selectedLayer === 'innerCore' ? '#fef08a' : '#fde047'}
              stroke="#ffffff"
              strokeWidth={selectedLayer === 'innerCore' ? 3 : 1}
              className="cursor-pointer transition-all hover:opacity-90"
              onClick={() => setSelectedLayer('innerCore')}
            />

            {/* Kola Borehole indicator (12 km - barely a pixel) */}
            <line x1="210" y1="20" x2="210" y2="28" stroke="#ef4444" strokeWidth="3" />
            <text x="220" y="26" fill="#f87171" fontSize="9" fontWeight="bold">
              Kola (12.2 km)
            </text>

            {/* Seismic wave paths */}
            {showSeismicWaves && (
              <g opacity="0.85">
                {/* Earthquake epicenter at top */}
                <circle cx="210" cy="20" r="5" fill="#e11d48" />
                <circle cx="210" cy="20" r="10" fill="none" stroke="#fb7185" strokeWidth="1" strokeDasharray="2 2" />

                {/* P-waves (compressional, penetrate all layers) */}
                <path d="M 210,25 Q 140,120 145,340" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />
                <path d="M 210,25 Q 280,120 275,340" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />
                <path d="M 210,25 L 210,395" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />

                {/* S-waves (shear, reflected / blocked at outer core boundary) */}
                <path d="M 210,25 Q 90,130 35,240" fill="none" stroke="#f59e0b" strokeWidth="2" />
                <path d="M 210,25 Q 330,130 385,240" fill="none" stroke="#f59e0b" strokeWidth="2" />

                {/* S-wave Shadow Zone label */}
                <path d="M 40,260 A 190 190 0 0 0 380 260" fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 3" />
                <text x="210" y="380" textAnchor="middle" fill="#fda4af" fontSize="10" fontWeight="bold">
                  {isId ? 'Zona Bayangan Gelombang S (103°–180°)' : 'S-Wave Shadow Zone (103°–180°)'}
                </text>
              </g>
            )}

            {/* Center crosshair */}
            <circle cx="210" cy="210" r="2" fill="#0f172a" />
          </svg>
        </div>

        {/* Info & Layer Selector */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {['crust', 'mantle', 'outerCore', 'innerCore'].map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedLayer(key)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                  selectedLayer === key
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {(t.layers as any)[key].name.split(' (')[0]}
              </button>
            ))}
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-4 space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h4 className="text-sm font-bold text-cyan-300">{current.name}</h4>
              <span className="text-xs font-mono text-slate-400">{current.depth}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded bg-slate-900/90 p-2">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">{isId ? 'Wujud Fisik' : 'State'}</span>
                <span className="font-medium text-slate-200">{current.state}</span>
              </div>
              <div className="rounded bg-slate-900/90 p-2">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">{isId ? 'Temperatur' : 'Temp'}</span>
                <span className="font-medium text-amber-300">{current.temp}</span>
              </div>
            </div>

            <div className="text-xs text-slate-300 leading-relaxed pt-1">
              <span className="text-slate-400 font-semibold block text-[10px] uppercase mb-0.5">{isId ? 'Komposisi Kimia' : 'Composition'}</span>
              {current.comp}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed pt-1 border-t border-slate-800/80">
              {current.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
