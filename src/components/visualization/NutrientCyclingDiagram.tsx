import { useState } from 'preact/hooks';

interface NutrientCyclingProps {
  locale?: 'en' | 'id';
}

export default function NutrientCyclingDiagram({ locale = 'en' }: NutrientCyclingProps) {
  const isId = locale === 'id';
  const [mode, setMode] = useState<'tropicalVsTemperate' | 'clearedImpact'>('tropicalVsTemperate');

  const t = {
    badge: isId ? 'Ekologi Tanah & Biogeokimia Tropis' : 'Tropical Soil Ecology & Biogeochemistry',
    title: isId ? 'Siklus Hara Hutan Hujan Tropis: Paradoks Tanah Miskin' : 'Tropical Rainforest Nutrient Cycling Paradox',
    subtitle: isId
      ? 'Mengapa hutan hujan yang rimbun berdiri di atas tanah yang sangat miskin hara, dan apa yang terjadi saat hutan dibuka.'
      : 'Why lush rainforests thrive on nutrient-poor soils, and how deforestation causes rapid fertility decline.',
    tabs: {
      compare: isId ? 'Hutan Tropis vs Hutan Iklim Sedang' : 'Tropical vs Temperate Nutrient Pools',
      impact: isId ? 'Dampak Pembukaan Lahan & Pelindian' : 'Deforestation & Nutrient Leaching'
    },
    tropical: {
      title: isId ? 'Hutan Hujan Tropis (Indonesia)' : 'Tropical Rainforest (Equatorial)',
      biomass: isId ? '> 80% Hara di Biomassa Hidup' : '> 80% Nutrients in Living Biomass',
      soil: isId ? '< 20% Hara di Tanah (Oxisol/Ultisol Lapuk)' : '< 20% Nutrients in Soil (Leached Oxisols)',
      desc: isId
        ? 'Suhu hangat dan kelembapan konstan memicu dekomposisi serasah super cepat. Jaring mikoriza dan akar dangkal menyerap kembali hara seketika sebelum tercuci hujan.'
        : 'Warm, wet climate drives rapid leaf litter decay. Shallow dense roots and mycorrhizal fungi recycle nutrients instantly before rains can leach them away.'
    },
    temperate: {
      title: isId ? 'Hutan Iklim Sedang (Temperate)' : 'Temperate Forest',
      biomass: isId ? '~50% Hara di Biomassa' : '~50% Nutrients in Biomass',
      soil: isId ? '~50% Hara Tersimpan di Humus Tanah Tebal' : '~50% Nutrients Stored in Thick Soil Humus',
      desc: isId
        ? 'Musim dingin memperlambat pembusukan, memungkinkan bahan organik menumpuk membentuk lapisan tanah hitam (humus) tebal yang kaya cadangan hara jangka panjang.'
        : 'Cold winters slow decomposition, allowing thick organic humus layers to accumulate in soil as a long-term nutrient reservoir.'
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
            onClick={() => setMode('tropicalVsTemperate')}
            className={`rounded px-3 py-1.5 transition-colors ${
              mode === 'tropicalVsTemperate'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {t.tabs.compare}
          </button>
          <button
            type="button"
            onClick={() => setMode('clearedImpact')}
            className={`rounded px-3 py-1.5 transition-colors ${
              mode === 'clearedImpact'
                ? 'bg-rose-500 text-white font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {t.tabs.impact}
          </button>
        </div>
      </div>

      {mode === 'tropicalVsTemperate' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Tropical Card */}
          <div className="rounded-lg bg-slate-950 p-4 border border-emerald-900/60 space-y-3">
            <h4 className="font-bold text-sm text-emerald-400">{t.tropical.title}</h4>
            <div className="space-y-1.5">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-300">{isId ? 'Biomassa Pohon Hidup' : 'Living Biomass'}</span>
                <span className="text-emerald-400 font-mono">80 – 90%</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[85%]" />
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-300">{isId ? 'Lapisan Tanah Mineral' : 'Mineral Soil Pool'}</span>
                <span className="text-amber-400 font-mono">10 – 20%</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full w-[15%]" />
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed pt-1 border-t border-slate-800">
              {t.tropical.desc}
            </p>
          </div>

          {/* Temperate Card */}
          <div className="rounded-lg bg-slate-950 p-4 border border-blue-900/60 space-y-3">
            <h4 className="font-bold text-sm text-blue-400">{t.temperate.title}</h4>
            <div className="space-y-1.5">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-300">{isId ? 'Biomassa Pohon Hidup' : 'Living Biomass'}</span>
                <span className="text-blue-400 font-mono">~50%</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full w-[50%]" />
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-300">{isId ? 'Lapisan Humus Tanah' : 'Soil Humus Pool'}</span>
                <span className="text-amber-400 font-mono">~50%</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full w-[50%]" />
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed pt-1 border-t border-slate-800">
              {t.temperate.desc}
            </p>
          </div>
        </div>
      ) : (
        /* Deforestation Impact View */
        <div className="rounded-lg bg-slate-950 p-4 border border-rose-900/60 space-y-3 text-xs">
          <h4 className="font-bold text-sm text-rose-400">
            {isId ? 'Mengapa Lahan Bekas Tebang Hutan Cepat Kehilangan Kesuburan?' : 'The Mechanism of Rapid Post-Clearing Fertility Loss'}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="rounded bg-slate-900 p-3 border border-slate-800">
              <span className="text-rose-400 font-bold block mb-1">
                {isId ? '1. Hilangnya Kolam Hara' : '1. Biomass Pool Removed'}
              </span>
              <p className="text-slate-300">
                {isId
                  ? 'Penebangan atau pembakaran melenyapkan >80% hara yang terkunci di kanopi pohon.'
                  : 'Logging or slash-and-burn immediately eliminates >80% of the standing ecosystem nutrient pool.'}
              </p>
            </div>
            <div className="rounded bg-slate-900 p-3 border border-slate-800">
              <span className="text-amber-400 font-bold block mb-1">
                {isId ? '2. Pelindian Hujan Lebat' : '2. Heavy Leaching'}
              </span>
              <p className="text-slate-300">
                {isId
                  ? 'Curah hujan tropis tinggi (>3.000 mm/thn) mencuci kation hara (K+, Ca2+, Mg2+) ke lapisan dalam.'
                  : 'Intense tropical rainfall quickly washes dissolved nutrient ions deep beyond root reach.'}
              </p>
            </div>
            <div className="rounded bg-slate-900 p-3 border border-slate-800">
              <span className="text-cyan-400 font-bold block mb-1">
                {isId ? '3. Penurunan Hasil 2–3 Thn' : '3. 2–3 Year Yield Drop'}
              </span>
              <p className="text-slate-300">
                {isId
                  ? 'Tanpa pemupukan intensif, produktivitas tanaman pangan turun drastis dalam beberapa musim.'
                  : 'Without heavy fertilizers, crop yields decline rapidly within a few growing seasons.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
