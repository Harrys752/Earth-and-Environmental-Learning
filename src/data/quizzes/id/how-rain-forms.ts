import type { Quiz } from '../../../types/quiz';

export const howRainFormsQuiz: Quiz = {
  id: 'quiz-how-rain-forms',
  experienceSlug: 'how-rain-forms',
  title: 'Bagaimana Hujan Terbentuk? Kuis Fisika Atmosfer',
  description: 'Uji pemahaman Anda tentang kejenuhan uap air, pendinginan adiabatik, inti kondensasi, dan dinamika presipitasi tropis.',
  passingScore: 70,
  questions: [
    {
      id: 'q1-cooling-mechanism',
      type: 'single-choice',
      prompt: 'Mengapa parsel udara yang naik mengalami penurunan suhu saat membumbung ke lapisan troposfer?',
      options: [
        {
          id: 'opt-space-cold',
          label: 'Karena luar angkasa sangat dingin dan mendinginkan atmosfer bagian atas secara langsung.',
        },
        {
          id: 'opt-adiabatic-expansion',
          label: 'Ekspansi adiabatik: Tekanan atmosfer di sekitarnya menurun seiring bertambahnya ketinggian, menyebabkan parsel udara memuai dan melakukan kerja mekanik, yang menghabiskan energi kinetik termal internalnya.',
          isCorrect: true,
        },
        {
          id: 'opt-friction-loss',
          label: 'Udara kehilangan gesekan saat bergerak menjauh dari permukaan tanah yang kasar.',
        },
        {
          id: 'opt-sunlight-loss',
          label: 'Molekul udara menghalangi sinar matahari untuk menghangatkan parsel saat naik.',
        },
      ],
      correctAnswer: 'opt-adiabatic-expansion',
      explanation: 'Saat parsel udara naik, tekanan atmosfer luar menurun seiring ketinggian. Parsel memuai ke lingkungan bertekanan lebih rendah. Untuk memuai, molekul gas mendorong udara di sekitarnya ke luar dan melakukan kerja mekanis. Kerja ini mengonsumsi energi kinetik termal dari dalam parsel, menyebabkan suhunya turun tanpa pertukaran panas dengan udara luar (pendinginan adiabatik). Udara kering mendingin pada laju ~9,8°C/km (laju penurunan adiabatik kering), dan udara lembap mendingin pada ~5–6°C/km setelah kondensasi mulai melepaskan panas laten.',
      relatedConceptSlug: 'condensation',
    },
    {
      id: 'q2-nuclei-role',
      type: 'single-choice',
      prompt: 'Apa yang terjadi jika udara atmosfer mencapai kelembapan 100% (jenuh) dalam lingkungan hipotetis yang benar-benar bersih tanpa aerosol atau partikel sama sekali?',
      options: [
        {
          id: 'opt-instant-rain',
          label: 'Uap air langsung terkondensasi seketika menjadi hujan lebat.',
        },
        {
          id: 'opt-no-condensation',
          label: 'Uap air tidak dapat terkondensasi dengan mudah menjadi tetesan cair karena ketiadaan inti kondensasi untuk mengatasi hambatan energi tegangan permukaan yang sangat tinggi.',
          isCorrect: true,
        },
        {
          id: 'opt-freezing',
          label: 'Uap air langsung menyublim seketika menjadi kristal es raksasa.',
        },
      ],
      correctAnswer: 'opt-no-condensation',
      explanation: 'Uap air membutuhkan partikel mikroskopis yang melayang di udara (inti kondensasi awan / CCN)—seperti semprotan garam laut, debu mineral, aerosol sulfat vulkanik, atau serbuk sari organik—untuk berkondensasi pada kelembapan relatif mendekati 100%. Tanpa CCN (nukleasi homogen), uap air membutuhkan kejenuhan ekstrem (kelembapan relatif lebih dari 400%) untuk membentuk air cair karena tetesan purba mikroskopis mengalami tegangan permukaan yang sangat besar sehingga menguap kembali hampir seketika.',
      relatedConceptSlug: 'condensation',
    },
    {
      id: 'q3-orographic-precipitation',
      type: 'multiple-choice',
      prompt: 'Mengapa Kota Bogor di Jawa Barat menerima curah hujan tahunan lebih dari 4.000 mm, sehingga menyandang julukan "Kota Hujan"? (Pilih semua yang sesuai)',
      options: [
        {
          id: 'opt-orographic-lift',
          label: 'Udara maritim lembap yang tertiup melintasi Laut Jawa dipaksa naik oleh lereng Gunung Salak dan Gunung Gede-Pangrango (pengangkatan orografis).',
          isCorrect: true,
        },
        {
          id: 'opt-convective-heating',
          label: 'Pemanasan matahari khatulistiwa yang intens di siang hari memicu arus konveksi udara ke atas yang kuat setiap sore.',
          isCorrect: true,
        },
        {
          id: 'opt-subduction-steam',
          label: 'Magma dari palung subduksi dalam terus-menerus mendidihkan air tanah permukaan menjadi awan hujan seketika.',
          isCorrect: false,
        },
        {
          id: 'opt-sea-salt-ccn',
          label: 'Semprotan garam laut maritim yang melimpah dan partikel vulkanik berfungsi sebagai inti kondensasi awan yang sangat efisien.',
          isCorrect: true,
        },
      ],
      correctAnswer: ['opt-orographic-lift', 'opt-convective-heating', 'opt-sea-salt-ccn'],
      explanation: 'Curah hujan ekstrem di Bogor merupakan studi kasus ideal dari kombinasi pengangkatan orografis dan konveksi khatulistiwa. Udara hangat yang jenuh uap air dari Laut Jawa bergerak ke daratan dan berhadapan dengan topografi vulkanik curam Gunung Salak dan Gunung Pangrango. Dipaksa membumbung naik, udara mendingin secara adiabatik melampaui titik embunnya. Insolasi matahari di sore hari semakin memperkuat proses ini melalui konveksi, memicu terbentuknya awan badai kumulonimbus lokal hampir setiap hari.',
      relatedConceptSlug: 'atmospheric-pressure',
    },
    {
      id: 'q4-droplet-coalescence',
      type: 'ordering',
      prompt: 'Urutkan tahapan pembentukan air awan mulai dari gas tak kasat mata hingga menjadi tetesan hujan yang jatuh:',
      orderingItems: [
        { id: 's1-evap', label: 'Energi radiasi matahari menguapkan air permukaan menjadi gas uap air tak kasat mata', correctOrder: 0 },
        { id: 's2-lift', label: 'Parsel udara naik dan memuai secara adiabatik hingga kelembapan relatif mencapai 100%', correctOrder: 1 },
        { id: 's3-ccn', label: 'Uap air mengembun pada aerosol mikroskopis (CCN) membentuk tetesan awan (~20 μm)', correctOrder: 2 },
        { id: 's4-collide', label: 'Proses tumbukan-koalesensi: tetesan yang jatuh menyapu tetesan yang lebih kecil, tumbuh hingga >2 mm', correctOrder: 3 },
        { id: 's5-fall', label: 'Kecepatan terminal tetesan melampaui kecepatan arus udara ke atas (updraft), lalu jatuh sebagai presipitasi', correctOrder: 4 },
      ],
      correctAnswer: ['s1-evap', 's2-lift', 's3-ccn', 's4-collide', 's5-fall'],
      explanation: 'Rangkaian pembentukan hujan berlanjut dari transisi fase (evaporasi), pengangkutan dan pendinginan adiabatik, kondensasi bernukleasi menjadi tetesan mikro awan, proses mekanis tumbukan dan penggabungan (koalesensi), hingga jatuhnya air akibat gravitasi saat kecepatan terminal tetesan melampaui daya angkat arus udara panas ke atas.',
      relatedConceptSlug: 'condensation',
    },
  ],
};
