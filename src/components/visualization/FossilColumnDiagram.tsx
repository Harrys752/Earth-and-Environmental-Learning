import { useState } from 'preact/hooks';
import { recordExploration } from '../../lib/storage';
import type { Locale } from '../../i18n';

interface StratigraphicLayer {
  formation: string;
  age: string;
  depth: string;
  rockType: string;
  fossilContent: string;
  environment: string;
  color: string;
}

const SANGIRAN_STRATA_EN: StratigraphicLayer[] = [
  {
    formation: 'Notopuro Formation (Upper Strata)',
    age: '~250,000 to 150,000 years ago (Late Pleistocene)',
    depth: '0 – 20 meters',
    rockType: 'Volcanic lahar deposits, volcanic breccia, and tuffaceous sands',
    fossilContent: 'Few fossils due to high-energy volcanic mudflows; stone flakes and late Pleistocene fauna.',
    environment: 'Terrestrial volcanic apron with lahars originating from Mount Lawu and Mount Merapi ancestors.',
    color: 'bg-amber-900/40 border-amber-700/50 text-amber-200',
  },
  {
    formation: 'Kabuh (Bapang) Formation (Primary Fossil Horizon)',
    age: '~1.2 to 0.7 million years ago (Middle Pleistocene)',
    depth: '20 – 60 meters',
    rockType: 'Fluvial cross-bedded sandstones, river gravels, and andesitic tuff layers',
    fossilContent: 'Over 60+ Homo erectus specimens (craniums, mandibles), Stegodon trigonocephalus (pygmy elephant), Bubalus palaeokerabau, and stone flake tools.',
    environment: 'Broad meandering tropical river systems, savanna-woodland ecotones supporting diverse Pleistocene megafauna.',
    color: 'bg-emerald-900/40 border-emerald-700/50 text-emerald-200',
  },
  {
    formation: 'Pucangan (Sangiran) Formation (Lower Early Horizon)',
    age: '~1.8 to 1.2 million years ago (Early Pleistocene)',
    depth: '60 – 120 meters',
    rockType: 'Black claystone (lahar/swamp facies), marine-to-freshwater transition deposits',
    fossilContent: 'Early archaic Homo erectus (Meganthropus jaws), giant tortoise (Geochelone), crocodiles, and freshwater mollusks.',
    environment: 'Coastal swamp, estuarine mudflats, and mangrove lagoons transitioning as Java uplifted from the sea.',
    color: 'bg-slate-800/80 border-slate-600/50 text-slate-200',
  },
  {
    formation: 'Kalibeng (Puren) Formation (Basal Marine Bed)',
    age: '~2.4 to 1.8 million years ago (Late Pliocene)',
    depth: '120+ meters (Deepest Bed)',
    rockType: 'Bluish-grey marine marl, limestone, and globigerina silts',
    fossilContent: 'Deep marine foraminifera, corals, shark teeth, and marine bivalves (no hominid fossils).',
    environment: 'Open shallow marine tropical sea before tectonic collision uplifted the island of Java above sea level.',
    color: 'bg-cyan-950/60 border-cyan-800/50 text-cyan-200',
  },
];

const SANGIRAN_STRATA_ID: StratigraphicLayer[] = [
  {
    formation: 'Formasi Notopuro (Lapisan Atas)',
    age: '~250.000 hingga 150.000 tahun lalu (Pleistosen Akhir)',
    depth: '0 – 20 meter',
    rockType: 'Endapan lahar vulkanik, breksi vulkanik, dan pasir tufaan',
    fossilContent: 'Sedikit fosil karena lahar vulkanik berenergi tinggi; serpihan batu dan fauna Pleistosen akhir.',
    environment: 'Kipas vulkanik darat dengan lahar yang berasal dari leluhur Gunung Lawu dan Gunung Merapi.',
    color: 'bg-amber-900/40 border-amber-700/50 text-amber-200',
  },
  {
    formation: 'Formasi Kabuh (Bapang) (Horizon Fosil Utama)',
    age: '~1,2 hingga 0,7 juta tahun lalu (Pleistosen Tengah)',
    depth: '20 – 60 meter',
    rockType: 'Batupasir silang-siur fluvial, kerikil sungai, dan lapisan tuf andesitik',
    fossilContent: 'Lebih dari 60+ spesimen Homo erectus (tengkorak, rahang bawah), Stegodon trigonocephalus (gajah purba), Bubalus palaeokerabau, dan alat serpih batu.',
    environment: 'Sistem sungai meander tropis yang luas, ekoton sabana-hutan terbuka yang mendukung beragam megafauna Pleistosen.',
    color: 'bg-emerald-900/40 border-emerald-700/50 text-emerald-200',
  },
  {
    formation: 'Formasi Pucangan (Sangiran) (Horizon Awal Bawah)',
    age: '~1,8 hingga 1,2 juta tahun lalu (Pleistosen Awal)',
    depth: '60 – 120 meter',
    rockType: 'Batulempung hitam (fasies lahar/rawa), endapan transisi laut ke air tawar',
    fossilContent: 'Homo erectus purba awal (rahang Meganthropus), kura-kura raksasa (Geochelone), buaya, dan moluska air tawar.',
    environment: 'Rawa pesisir, dataran lumpur muara, dan laguna bakau yang bertransisi saat Pulau Jawa terangkat dari laut.',
    color: 'bg-slate-800/80 border-slate-600/50 text-slate-200',
  },
  {
    formation: 'Formasi Kalibeng (Puren) (Lapisan Laut Dasar)',
    age: '~2,4 hingga 1,8 juta tahun lalu (Pliosen Akhir)',
    depth: '120+ meter (Lapisan Terdalam)',
    rockType: 'Napal laut abu-abu kebiruan, batugamping, dan lanau globigerina',
    fossilContent: 'Foraminifera laut dalam, karang, gigi hiu, dan bivalvia laut (tidak ada fosil hominid).',
    environment: 'Laut tropis dangkal terbuka sebelum tumbukan tektonik mengangkat pulau Jawa ke atas permukaan laut.',
    color: 'bg-cyan-950/60 border-cyan-800/50 text-cyan-200',
  },
];

export default function FossilColumnDiagram({
  experienceSlug = 'what-fossils-tell-us',
  locale = 'en',
}: {
  experienceSlug?: string;
  locale?: Locale;
}) {
  const [selectedIdx, setSelectedIdx] = useState<number>(1); // default to Kabuh formation
  const isId = locale === 'id';
  const strata = isId ? SANGIRAN_STRATA_ID : SANGIRAN_STRATA_EN;
  const activeLayer = strata[selectedIdx];

  const handleSelect = (idx: number) => {
    setSelectedIdx(idx);
    if (experienceSlug) {
      recordExploration(experienceSlug, 'diagram', `strata:${strata[idx].formation}`);
    }
  };

  return (
    <div class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7 space-y-6 shadow-sm">
      <div class="border-b border-[var(--color-border)] pb-4 space-y-1">
        <div class="flex items-center gap-2">
          <h4 class="text-base sm:text-lg font-bold text-[var(--color-text)]">
            {isId
              ? 'Kolom Stratigrafi & Penjelajah Horizon Fosil Kubah Sangiran'
              : 'Sangiran Dome Stratigraphic Column & Fossil Horizon Explorer'}
          </h4>
          <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800">
            {isId ? 'Arsip Situs Warisan Dunia UNESCO' : 'UNESCO World Heritage Site Archive'}
          </span>
        </div>
        <p class="text-xs text-[var(--color-text-muted)]">
          {isId
            ? 'Amati tumpukan lapisan sedimen berusia 2,4 juta tahun di Jawa Tengah untuk melihat bagaimana Prinsip Superposisi mengorelasikan hominid purba dengan lingkungan masa lalu.'
            : 'Inspect 2.4 million years of stacked sedimentary layers in Central Java to see how the Principle of Superposition correlates ancient hominids with past environments.'}
        </p>
      </div>

      {/* Stratigraphic Layer Stack Visualizer */}
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div class="lg:col-span-5 space-y-2 select-none">
          <div class="text-[10px] font-mono text-[var(--color-text-dim)] uppercase font-bold flex justify-between">
            <span>{isId ? 'Lapisan Termuda (Atas)' : 'Youngest Layer (Top)'}</span>
            <span>{isId ? '↓ Superposisi' : '↓ Superposition'}</span>
          </div>

          {strata.map((layer, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <div
                key={layer.formation}
                onClick={() => handleSelect(idx)}
                class={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${layer.color} ${
                  isSelected
                    ? 'ring-2 ring-amber-400 shadow-md scale-[1.02]'
                    : 'opacity-80 hover:opacity-100'
                }`}
              >
                <div class="flex items-center justify-between text-xs font-bold">
                  <span>{layer.formation.split('(')[0]}</span>
                  <span class="font-mono text-[10px]">{layer.depth}</span>
                </div>
                <div class="text-[11px] font-mono opacity-90 mt-1">
                  {layer.age.split('(')[0]}
                </div>
              </div>
            );
          })}

          <div class="text-[10px] font-mono text-[var(--color-text-dim)] uppercase font-bold text-right pt-1">
            {isId ? 'Lapisan Tertua (Bawah) ↑' : 'Oldest Layer (Bottom) ↑'}
          </div>
        </div>

        {/* Selected Layer Empirical Details */}
        <div class="lg:col-span-7 p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-hover)] space-y-4">
          <div class="space-y-1">
            <span class="text-[10px] font-mono uppercase font-bold text-[var(--color-accent)] tracking-wider">
              {isId ? 'Detail Horizon Stratigrafi' : 'Stratigraphic Horizon Detail'}
            </span>
            <h5 class="text-base font-bold text-[var(--color-text)]">
              {activeLayer.formation}
            </h5>
            <div class="text-xs font-mono text-[var(--color-text-dim)]">
              {isId ? 'Usia Geologi: ' : 'Geological Age: '}
              <strong class="text-[var(--color-text)]">{activeLayer.age}</strong>
            </div>
          </div>

          <div class="space-y-3 text-xs">
            <div class="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-1">
              <span class="font-mono font-bold text-[10px] text-[var(--color-text-muted)] uppercase block">
                {isId ? 'Litologi & Jenis Batuan' : 'Lithology & Rock Type'}
              </span>
              <p class="text-[var(--color-text)] leading-relaxed">{activeLayer.rockType}</p>
            </div>

            <div class="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-1">
              <span class="font-mono font-bold text-[10px] text-[var(--color-accent)] uppercase block">
                {isId ? 'Temuan Fosil & Bukti Hominid' : 'Fossil Discoveries & Hominid Evidence'}
              </span>
              <p class="text-[var(--color-text)] font-medium leading-relaxed">{activeLayer.fossilContent}</p>
            </div>

            <div class="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-1">
              <span class="font-mono font-bold text-[10px] text-[var(--color-secondary)] uppercase block">
                {isId ? 'Rekonstruksi Lingkungan Purba' : 'Paleoenvironment Reconstruction'}
              </span>
              <p class="text-[var(--color-text-muted)] leading-relaxed">{activeLayer.environment}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
