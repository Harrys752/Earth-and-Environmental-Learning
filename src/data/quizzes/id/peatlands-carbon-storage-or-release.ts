import type { Quiz } from '../../../types/quiz';

export const peatlandsCarbonStorageOrReleaseQuiz: Quiz = {
  id: 'quiz-peatlands-carbon-storage-or-release',
  experienceSlug: 'peatlands-carbon-storage-or-release',
  title: 'Kuis Evaluasi Pemahaman: Dinamika Karbon Gambut & Krisis 2015',
  description: 'Uji pemahaman Anda tentang tata air gambut, bahaya kanalisasi drainase, kebakaran bawah tanah, dan emisi krisis kebakaran hutan 2015.',
  passingScore: 70,
  questions: [
    {
      id: 'q1-flammability-cause',
      type: 'single-choice',
      prompt: 'Mengapa pengeringan lahan gambut tropis melalui pembuatan kanal drainase buatan menyebabkannya menjadi sangat mudah terbakar?',
      contextNarrative: 'Pertimbangkan apa yang terjadi pada bahan organik gambut purba saat muka air pelindungnya turun drastis.',
      options: [
        {
          id: 'opt-chemical-spray',
          label: 'Kanal drainase menyemprotkan cairan minyak bumi ke permukaan tanah.',
        },
        {
          id: 'opt-drainage-aeration',
          label: 'Drainase menurunkan muka air tanah, mengekspos bahan organik purba setebal bermeter-meter ke oksigen atmosfer, dan mengeringkannya menjadi bahan bakar siap nyala.',
          isCorrect: true,
        },
        {
          id: 'opt-lightning-attraction',
          label: 'Kanal buatan menarik petir dari awan badai.',
        },
        {
          id: 'opt-soil-freezing',
          label: 'Gambut kering membeku dan meledak menjadi serpihan tajam.',
        },
      ],
      correctAnswer: 'opt-drainage-aeration',
      explanation: 'Gambut alami yang sehat mengandung 90% air berdasarkan beratnya sehingga mustahil terbakar. Ketika kanal buatan menguras air tanah, gambut mengering dan oksigen masuk ke pori-pori tanah, mengubah timbunan karbon purba menjadi bahan bakar yang sangat mudah terbakar.',
      relatedConceptSlug: 'atmospheric-pressure',
    },
    {
      id: 'q2-extinguishing-difficulty',
      type: 'true-false',
      prompt: 'Kebakaran lahan gambut biasanya jauh lebih mudah dan lebih cepat dipadamkan dibandingkan kebakaran rumput ilalang biasa di permukaan.',
      contextNarrative: 'Ingat kembali karakteristik kebakaran bawah tanah (smoldering combustion) pada lahan gambut.',
      options: [
        {
          id: 'opt-true',
          label: 'Benar — api gambut hanya membakar pucuk rumput dan langsung padam oleh hujan rintik-rintik.',
        },
        {
          id: 'opt-false',
          label: 'Salah — api gambut membara lambat di bawah permukaan tanah (kedalaman bermeter-meter), menjalar tanpa terlihat selama berminggu-minggu, dan sulit dipadamkan oleh air permukaan.',
          isCorrect: true,
        },
      ],
      correctAnswer: 'opt-false',
      explanation: 'Api gambut membakar bahan organik bawah permukaan secara membara (smoldering). Api merayap di lorong akar kering di bawah tanah, menciptakan rongga bawah tanah yang runtuh dan terus mengeluarkan kabut asap tebal berminggu-minggu meskipun diguyur hujan di permukaan.',
      relatedConceptSlug: 'atmospheric-pressure',
    },
    {
      id: 'q3-2015-disproportionate-risk',
      type: 'single-choice',
      prompt: 'Pada krisis kebakaran hutan Indonesia tahun 2015, lahan gambut hanya mencakup ~12% dari total luas daratan nasional, tetapi menyumbang berapa persen dari total titik api kebakaran pada tahun tersebut?',
      contextNarrative: 'Refleksikan data ilmiah kebakaran yang dipublikasikan (Miettinen et al. 2017 / Atmos. Chem. Phys. 2019).',
      options: [
        {
          id: 'opt-12pct',
          label: '12% (sebanding dengan luas lahan)',
        },
        {
          id: 'opt-53pct',
          label: '53% dari total kebakaran',
          isCorrect: true,
        },
        {
          id: 'opt-99pct',
          label: '99% dari total kebakaran',
        },
        {
          id: 'opt-2pct',
          label: 'Kurang dari 2%',
        },
      ],
      correctAnswer: 'opt-53pct',
      explanation: 'Lebih dari 53% kebakaran tahun 2015 terkonsentrasi di lahan gambut yang terdegradasi. Disproporsi yang sangat besar ini membuktikan bahwa gambut kering merupakan hotspot bahaya kebakaran dan pelepasan emisi karbon ekstrem saat terjadi kemarau El Niño.',
      relatedConceptSlug: 'atmospheric-pressure',
    },
  ],
};
