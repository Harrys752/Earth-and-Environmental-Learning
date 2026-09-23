import { useState } from 'preact/hooks';

interface SuccessionTimelineProps {
  locale?: 'en' | 'id';
}

interface Milestone {
  id: string;
  year: string;
  titleEn: string;
  titleId: string;
  stageEn: string;
  stageId: string;
  descEn: string;
  descId: string;
  badge: string;
}

const MILESTONES: Milestone[] = [
  {
    id: 'm1',
    year: '1883 (Day 0)',
    titleEn: 'Total Volcanic Sterilization',
    titleId: 'Sterilisasi Vulkanik Total',
    stageEn: 'Substrate Reset',
    stageId: 'Reset Substrat',
    descEn: 'Catastrophic caldera collapse and pyroclastic surges completely destroyed all pre-existing plant and animal life on the remaining Krakatau islands. The surface was left as bare, sterile ash, pumice, and volcanic rock.',
    descId: 'Runtuhan kaldera dahsyat dan awan panas memusnahkan seluruh kehidupan flora dan fauna di kepulauan Krakatau. Permukaan pulau tertutup abu tefra, batu apung steril, dan batuan beku tandus.',
    badge: 'Catastrophe'
  },
  {
    id: 'm2',
    year: 'Nov 1883 (+3 mo)',
    titleEn: 'First Life: Airborne Pioneer Spider',
    titleId: 'Kehidupan Pertama: Laba-laba Penerbang',
    stageEn: 'Airborne Dispersal',
    stageId: 'Dispersi Udara',
    descEn: 'A microscopic spider was the first documented living organism on the sterilized island, carried over 40 km across the Sunda Strait via atmospheric silk-ballooning.',
    descId: 'Laba-laba mikroskopis menjadi makhluk hidup pertama yang terdokumentasi di pulau steril tersebut, terbawa sejauh >40 km melintasi Selat Sunda melalui benang sutra yang terbang di udara.',
    badge: 'First Life'
  },
  {
    id: 'm3',
    year: 'Sept 1884 (+1 yr)',
    titleEn: 'Pioneer Grass & Cyanobacteria',
    titleId: 'Rumput Perintis & Sianobakteri',
    stageEn: 'Primary Colonizers',
    stageId: 'Kolonisator Primer',
    descEn: 'Windblown spores of blue-green algae formed biological soil crusts that fixed atmospheric nitrogen. The first pioneering grasses took root on coastal ash beds.',
    descId: 'Spora alga biru-hijau yang terbawa angin membentuk kerak tanah biologis yang mengikat nitrogen atmosfer. Rumpun rumput perintis pertama mulai berakar di endapan abu pesisir.',
    badge: 'Pioneers'
  },
  {
    id: 'm4',
    year: '1897 (+14 yr)',
    titleEn: 'Coastal Strand Communities',
    titleId: 'Komunitas Tumbuhan Pesisir',
    stageEn: 'Hydrochoric Establishment',
    stageId: 'Kolonisasi Arus Laut',
    descEn: 'Ocean-drifted seeds (Ipomoea pes-caprae, Casuarina equisetifolia, Scaevola taccada) established dense coastal beach and mangrove strand vegetation.',
    descId: 'Biji-bijian yang terbawa arus laut (katang-katang, cemara laut, babakoan) membentuk vegetasi pantai yang rimbun dan menstabilkan garis pesisir pulau.',
    badge: 'Coastal Zone'
  },
  {
    id: 'm5',
    year: '1919 – 1935',
    titleEn: 'Closed Tropical Rainforest Canopy',
    titleId: 'Kanopi Hutan Hujan Tropis Tertutup',
    stageEn: 'Climax Rainforest Development',
    stageId: 'Perkembangan Hutan Klimaks',
    descEn: 'Frugivorous birds and fruit bats from Java and Sumatra introduced tree seeds (Ficus, Macaranga, Neonauclea). By 1935, a multi-layered tropical secondary rainforest canopy was fully established.',
    descId: 'Burung pemakan buah dan kelelawar dari Jawa dan Sumatra menyebarkan biji pohon hutan (beringin Ficus, tutup Macaranga). Pada 1935, struktur kanopi hutan hujan tropis bertingkat telah pulih sempurna.',
    badge: 'Climax Forest'
  },
  {
    id: 'm6',
    year: '1930 – Present',
    titleEn: 'Anak Krakatau: Continuous Succession Cycles',
    titleId: 'Anak Krakatau: Siklus Suksesi Berkelanjutan',
    stageEn: 'Live Evolutionary Laboratory',
    stageId: 'Laboratorium Alami Berkelanjutan',
    descEn: 'The emergence of the new volcanic island Anak Krakatau in 1930 created an ongoing live laboratory of ecological succession, periodically reset by new eruptions (e.g., 1952, 2018).',
    descId: 'Munculnya pulau vulkanik baru Anak Krakatau pada tahun 1930 menciptakan laboratorium alami suksesi primer yang terus berulang dan direset oleh letusan baru (misalnya tahun 1952 dan 2018).',
    badge: 'Active Laboratory'
  }
];

export default function EcosystemSuccessionTimeline({ locale = 'en' }: SuccessionTimelineProps) {
  const isId = locale === 'id';
  const [activeId, setActiveId] = useState<string>('m1');

  const selected = MILESTONES.find((m) => m.id === activeId) || MILESTONES[0];

  const t = {
    badge: isId ? 'Kronologi Suksesi Primer Krakatau' : 'Krakatau Primary Succession Chronology',
    title: isId ? 'Pemulihan Ekosistem Pasca-Letusan Vulkanik' : 'Ecosystem Recolonization Timeline',
    subtitle: isId
      ? 'Catatan ilmiah terdokumentasi tentang bagaimana kehidupan kembali mengolonisasi pulau steril Krakatau 1883.'
      : 'Documented scientific record of how life returned to the sterilized islands of Krakatau after 1883.',
    interactiveHint: isId ? 'Klik setiap tonggak sejarah untuk melihat tahapan kolonisasi:' : 'Click each milestone to inspect the recolonization stage:'
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

      <p className="text-xs text-slate-400 mb-3">{t.interactiveHint}</p>

      {/* Horizontal Milestone Tracker */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-4">
        {MILESTONES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setActiveId(m.id)}
            className={`rounded-lg p-2.5 text-left border transition-all ${
              activeId === m.id
                ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300 shadow-md scale-[1.02]'
                : 'border-slate-800 bg-slate-950 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <span className="text-[10px] font-mono font-bold block opacity-75">{m.year}</span>
            <span className="text-xs font-bold block mt-0.5 line-clamp-1">
              {isId ? m.stageId : m.stageEn}
            </span>
          </button>
        ))}
      </div>

      {/* Active Stage Presentation Card */}
      <div className="rounded-lg border border-slate-800 bg-slate-950 p-5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-mono font-bold text-emerald-400">{selected.year}</span>
            <h4 className="text-base font-bold text-slate-100 mt-0.5">
              {isId ? selected.titleId : selected.titleEn}
            </h4>
          </div>
          <span className="rounded bg-slate-800 px-2.5 py-1 text-[11px] font-semibold text-slate-300">
            {selected.badge}
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {isId ? selected.descId : selected.descEn}
        </p>

        <div className="rounded bg-slate-900 p-3 border border-slate-800 text-[11px] text-slate-400">
          <span className="font-semibold text-emerald-400">
            {isId ? 'Pelajaran Ekologi: ' : 'Ecological Takeaway: '}
          </span>
          {isId
            ? 'Suksesi primer membutuhkan waktu puluhan tahun untuk membangun kembali ketebalan tanah dan jaring makanan bertingkat dari batu tandus.'
            : 'Primary succession demonstrates how biological legacies and seed dispersal vectors reconstruct complex trophic networks from bare volcanic rock over decadal timescales.'}
        </div>
      </div>
    </div>
  );
}
