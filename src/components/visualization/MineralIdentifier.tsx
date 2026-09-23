import { useState } from 'preact/hooks';

interface MineralIdentifierProps {
  locale?: 'en' | 'id';
}

interface MineralSpec {
  id: string;
  nameEn: string;
  nameId: string;
  formula: string;
  hardness: string;
  streak: string;
  luster: string;
  cleavage: string;
  indonesiaContextEn: string;
  indonesiaContextId: string;
  color: string;
}

const MINERALS: MineralSpec[] = [
  {
    id: 'garnierite',
    nameEn: 'Garnierite (Nickel Laterite Ore)',
    nameId: 'Garnierit (Bijih Nikel Laterit)',
    formula: '(Ni,Mg)3Si2O5(OH)4',
    hardness: '2.0 – 4.0 (Mohs)',
    streak: 'White to pale greenish',
    luster: 'Earthy to waxy',
    cleavage: 'None (amorphous / fine mixture)',
    color: '#10b981',
    indonesiaContextEn: 'Primary nickel ore of Sulawesi and Halmahera, enriched by tropical chemical weathering of ultramafic peridotite bedrock. Indonesia holds >60% of global production.',
    indonesiaContextId: 'Bijih nikel utama di Sulawesi dan Halmahera, diperkaya oleh pelapukan kimiawi tropis intensif terhadap batuan dasar peridotit ultramafik. Indonesia menguasai >60% produksi global.'
  },
  {
    id: 'quartz',
    nameEn: 'Quartz (Kuarsa)',
    nameId: 'Kuarsa (Quartz)',
    formula: 'SiO2',
    hardness: '7.0 (Mohs)',
    streak: 'White (harder than streak plate)',
    luster: 'Vitreous (glassy)',
    cleavage: 'None (conchoidal fracture)',
    color: '#38bdf8',
    indonesiaContextEn: 'Extremely resistant framework silicate. Abundant in Indonesian river sand, volcanic ash, and hydrothermal gold/copper vein systems.',
    indonesiaContextId: 'Silikat kerangka yang sangat resisten terhadap pelapukan. Melimpah di pasir sungai, abu vulkanik, dan urat hidrotermal emas/tembaga di Indonesia.'
  },
  {
    id: 'pyrite',
    nameEn: 'Pyrite (Fool’s Gold)',
    nameId: 'Pirit (Emas Palsu)',
    formula: 'FeS2',
    hardness: '6.0 – 6.5 (Mohs)',
    streak: 'Greenish-black to brownish',
    luster: 'Metallic',
    cleavage: 'Poor (conchoidal/uneven fracture)',
    color: '#eab308',
    indonesiaContextEn: 'Common iron sulfide in volcanic solfataras (e.g., Kawah Ijen) and hydrothermal porphyry mineral deposits.',
    indonesiaContextId: 'Belerang besi umum di solfatara gunung api aktif (seperti Kawah Ijen) dan endapan mineral porfiri tembaga-emas.'
  },
  {
    id: 'calcite',
    nameEn: 'Calcite (Kalsit)',
    nameId: 'Kalsit (Calcite)',
    formula: 'CaCO3',
    hardness: '3.0 (Mohs)',
    streak: 'White',
    luster: 'Vitreous to pearly',
    cleavage: 'Perfect rhombohedral (3 directions)',
    color: '#cbd5e1',
    indonesiaContextEn: 'Primary component of limestone karst landscapes across Java (Sewu Karst) and Papua (Lorentz). Effervesces strongly in dilute acid.',
    indonesiaContextId: 'Komponen utama batugamping di bentang alam karst Gunungsewu (Jawa) dan Papua. Bereaksi menghasilkan buih gas CO2 saat terkena asam encer.'
  }
];

export default function MineralIdentifier({ locale = 'en' }: MineralIdentifierProps) {
  const isId = locale === 'id';
  const [selectedId, setSelectedId] = useState<string>('garnierite');

  const selected = MINERALS.find((m) => m.id === selectedId) || MINERALS[0];

  const t = {
    badge: isId ? 'Identifikasi Mineral Interaktif' : 'Interactive Mineral Diagnostic',
    title: isId ? 'Kriteria Ilmiah Mineral & Sifat Diagnostik' : 'Scientific Mineral Criteria & Diagnostic Properties',
    subtitle: isId
      ? 'Membedakan mineral sejati (5 kriteria ilmiah) dari batuan, serta menguji sifat fisik spesimen geologi.'
      : 'Distinguishing true minerals (5 scientific criteria) from rocks, and testing diagnostic physical properties.',
    fiveCriteria: isId ? '5 Syarat Mutlak Mineral:' : 'The 5 Mandatory Mineral Criteria:',
    criteriaList: isId ? [
      '1. Terbentuk Alami (bukan sintetis buatan manusia)',
      '2. Anorganik (bukan materi biologis hidup)',
      '3. Berwujud Padat pada kondisi permukaan',
      '4. Komposisi Kimia Definitif (formula kimia pasti/terbatas)',
      '5. Struktur Kristal Teratur (kisi atom berkala)'
    ] : [
      '1. Naturally Occurring (not synthetic/artificial)',
      '2. Inorganic (not composed of living biological tissues)',
      '3. Solid at standard surface conditions',
      '4. Definite Chemical Composition (fixed/defined formula)',
      '5. Ordered Crystalline Atomic Lattice'
    ],
    labels: {
      formula: isId ? 'Rumus Kimia' : 'Chemical Formula',
      hardness: isId ? 'Kekerasan (Skala Mohs)' : 'Mohs Hardness',
      streak: isId ? 'Warna Cerat (Streak)' : 'Streak (Powder Color)',
      luster: isId ? 'Kilap (Luster)' : 'Luster',
      cleavage: isId ? 'Belahan / Pecahan' : 'Cleavage / Fracture',
      geoSignificance: isId ? 'Signifikansi Geologis di Indonesia' : 'Geological Context in Indonesia'
    }
  };

  return (
    <div className="my-8 rounded-xl border border-slate-700/70 bg-slate-900/90 p-5 shadow-xl backdrop-blur-sm">
      <div className="mb-4 border-b border-slate-800 pb-3">
        <span className="inline-block rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-emerald-400">
          {t.badge}
        </span>
        <h3 className="mt-1 text-lg font-bold text-slate-100">{t.title}</h3>
        <p className="text-xs text-slate-400">{t.subtitle}</p>
      </div>

      {/* 5 Criteria Banner */}
      <div className="mb-4 rounded-lg border border-emerald-500/20 bg-emerald-950/20 p-3 text-xs text-emerald-300">
        <span className="font-bold block mb-1">{t.fiveCriteria}</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 text-[11px] text-emerald-200/90">
          {t.criteriaList.map((crit, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <span className="text-emerald-400">✓</span> {crit}
            </div>
          ))}
        </div>
      </div>

      {/* Mineral Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {MINERALS.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setSelectedId(m.id)}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              selectedId === m.id
                ? 'bg-emerald-500 text-slate-950 shadow-md scale-[1.02]'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {isId ? m.nameId : m.nameEn}
          </button>
        ))}
      </div>

      {/* Detail Card */}
      <div className="rounded-lg border border-slate-800 bg-slate-950 p-4 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-base font-bold text-slate-100">
              {isId ? selected.nameId : selected.nameEn}
            </h4>
            <span className="font-mono text-xs text-emerald-400 font-semibold">{selected.formula}</span>
          </div>
          <span
            className="w-4 h-4 rounded-full border border-slate-600 shadow-sm"
            style={{ backgroundColor: selected.color }}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="rounded bg-slate-900 p-2.5 border border-slate-800">
            <span className="text-[10px] font-semibold text-slate-400 block uppercase">{t.labels.hardness}</span>
            <span className="font-medium text-slate-100">{selected.hardness}</span>
          </div>
          <div className="rounded bg-slate-900 p-2.5 border border-slate-800">
            <span className="text-[10px] font-semibold text-slate-400 block uppercase">{t.labels.streak}</span>
            <span className="font-medium text-slate-100">{selected.streak}</span>
          </div>
          <div className="rounded bg-slate-900 p-2.5 border border-slate-800">
            <span className="text-[10px] font-semibold text-slate-400 block uppercase">{t.labels.luster}</span>
            <span className="font-medium text-slate-100">{selected.luster}</span>
          </div>
          <div className="rounded bg-slate-900 p-2.5 border border-slate-800">
            <span className="text-[10px] font-semibold text-slate-400 block uppercase">{t.labels.cleavage}</span>
            <span className="font-medium text-slate-100">{selected.cleavage}</span>
          </div>
        </div>

        <div className="rounded bg-slate-900/90 p-3 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
          <span className="text-[11px] font-bold text-amber-400 block mb-1 uppercase tracking-wide">
            {t.labels.geoSignificance}
          </span>
          {isId ? selected.indonesiaContextId : selected.indonesiaContextEn}
        </div>
      </div>
    </div>
  );
}
