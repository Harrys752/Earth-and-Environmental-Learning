import type { Quiz } from '../../../types/quiz';

export const whyDoLandslidesHappenQuiz: Quiz = {
  id: 'quiz-why-do-landslides-happen',
  experienceSlug: 'why-do-landslides-happen',
  title: 'Mengapa Tanah Longsor Terjadi? Kuis Verifikasi',
  description: 'Evaluasi pengetahuan Anda tentang mekanika stabilitas lereng, kejenuhan curah hujan, tekanan air pori, dan faktor bahaya longsor di Indonesia.',
  passingScore: 70,
  questions: [
    {
      id: 'q1-rainfall-mechanism',
      type: 'single-choice',
      prompt: 'Bagaimana curah hujan lebat yang berkepanjangan memicu keruntuhan lereng yang membawa bencana dan tanah longsor?',
      contextNarrative: 'Pikirkan apa yang terjadi di dalam pori-pori dan batas butiran tanah lereng bukit saat air hujan meresap ke dalam tanah.',
      options: [
        {
          id: 'opt-rain-mechanism',
          label: 'Air hujan meresap ke dalam tanah, menambah beban fisik yang signifikan (beban gravitasi) sekaligus meningkatkan tekanan air pori yang mendorong butiran tanah terpisah dan secara drastis mengurangi ketahanan geser friksional.',
          isCorrect: true,
        },
        {
          id: 'opt-cooling-only',
          label: 'Air hujan mendinginkan batuan dasar hingga gunung tiba-tiba menyusut dan langsung hancur seketika.',
        },
        {
          id: 'opt-chemical-evaporation',
          label: 'Air hujan dengan cepat melarutkan 100% batuan dasar granit menjadi uap gas.',
        },
        {
          id: 'opt-no-effect',
          label: 'Air hujan sama sekali tidak memiliki dampak mekanis terhadap stabilitas tanah atau gesekan lereng.',
        },
      ],
      correctAnswer: 'opt-rain-mechanism',
      explanation: 'Air bertindak baik sebagai beban gravitasi pendorong maupun agen pelumas. Saat ruang pori di antara partikel tanah terisi air di bawah tekanan hidrolik positif, tegangan normal efektif menurun, sehingga mengurangi gesekan antarpartikel secara drastis di sepanjang bidang gelincir potensial.',
      relatedConceptSlug: 'plate-tectonics-process',
    },
    {
      id: 'q2-earthquake-vs-rainfall-trigger',
      type: 'true-false',
      prompt: 'Semua tanah longsor di Indonesia disebabkan langsung oleh guncangan tanah akibat gempa bumi.',
      contextNarrative: 'Cermati hubungan antara musim hujan monsun di Indonesia dan catatan peristiwa bencana longsor.',
      options: [
        {
          id: 'opt-true',
          label: 'Benar — lereng bukit tidak pernah runtuh di bawah gravitasi kecuali dipicu oleh patahan sesar seismik.',
        },
        {
          id: 'opt-false',
          label: 'Salah — meskipun gempa kuat dapat memicu likuefaksi dan longsoran ko-seismik (misalnya Palu 2018), sebagian besar tanah longsor di Indonesia dipicu oleh curah hujan monsun musiman yang tinggi yang menjenuhkan lereng vulkanik curam.',
          isCorrect: true,
        },
      ],
      correctAnswer: 'opt-false',
      explanation: 'Menurut BNPB (Badan Nasional Penanggulangan Bencana), curah hujan merupakan pemicu paling umum dari kejadian tanah longsor di seluruh dataran tinggi vulkanik dan pegunungan Indonesia, terutama antara bulan Desember dan Februari. Guncangan seismik adalah pemicu ko-seismik yang penting, tetapi menyumbang sebagian kecil dari total peristiwa tahunan.',
      relatedConceptSlug: 'plate-tectonics-process',
    },
    {
      id: 'q3-landslide-risk-factors',
      type: 'single-choice',
      prompt: 'Kombinasi faktor manakah yang menciptakan risiko bahaya TERTINGGI terjadinya keruntuhan lereng yang dahsyat?',
      contextNarrative: 'Analisis variabel topografi, geologi, dan antropogenik yang mempengaruhi kestabilan lereng.',
      options: [
        {
          id: 'opt-high-risk-combo',
          label: 'Gradien lereng yang curam (>30°), tanah vulkanik lapuk yang tebal, deforestasi atau hilangnya perakaran pohon yang dalam, dan curah hujan monsun lebat selama beberapa hari berturut-turut.',
          isCorrect: true,
        },
        {
          id: 'opt-low-risk-bedrock',
          label: 'Topografi horizontal mendatar (kemiringan 0°) di atas batuan dasar basal padat yang belum lapuk dengan tutupan hutan hujan primer lebat.',
        },
        {
          id: 'opt-dry-desert',
          label: 'Lereng landai 5° di gurun gersang tanpa presipitasi dan tanpa air tanah.',
        },
        {
          id: 'opt-paved-highway-flat',
          label: 'Jalan beton datar terekayasa di atas batuan dasar tanpa kemiringan.',
        },
      ],
      correctAnswer: 'opt-high-risk-combo',
      explanation: 'Topografi yang curam meningkatkan tegasan geser gravitasi yang sejajar dengan lereng. Tanah tropis lapuk yang tebal menyediakan material gembur yang melimpah, sementara deforestasi menghilangkan jaringan perakaran (kohesi mekanis) dan intersepsi kanopi, membuat lereng sangat rentan terhadap penjenuhan air yang cepat saat hujan lebat.',
      relatedConceptSlug: 'plate-tectonics-process',
    },
    {
      id: 'q4-factor-of-safety',
      type: 'single-choice',
      prompt: 'Dalam rekayasa geoteknik dan geomorfologi, kapan suatu lereng bukit mengalami keruntuhan (tanah longsor)?',
      contextNarrative: 'Pertimbangkan rasio yang dikenal sebagai Faktor Keamanan (Factor of Safety / FoS: gaya penahan dibagi gaya pendorong).',
      options: [
        {
          id: 'opt-failure-condition',
          label: 'Ketika tegasan geser gravitasi pendorong melampaui kekuatan geser maksimum (friksi penahan dan kohesi) dari material lereng (Faktor Keamanan / FoS < 1,0).',
          isCorrect: true,
        },
        {
          id: 'opt-safety-high',
          label: 'Ketika gaya penahan dua kali lebih kuat daripada gaya pendorong (Faktor Keamanan / FoS > 2,0).',
        },
        {
          id: 'opt-moon-alignment',
          label: 'Hanya selama peristiwa gerhana bulan total.',
        },
        {
          id: 'opt-humidity-zero',
          label: 'Ketika kelembapan relatif di udara turun menjadi 0%.',
        },
      ],
      correctAnswer: 'opt-failure-condition',
      explanation: 'Lereng berada dalam keadaan stabil selama gaya penahan (kekuatan geser dari friksi internal dan kohesi) melebihi gaya pendorong (tegasan geser akibat gravitasi). Ketika pemicu seperti hujan lebat atau percepatan seismik mendorong Faktor Keamanan (FoS) di bawah 1,0, terjadilah keruntuhan lereng.',
      relatedConceptSlug: 'plate-tectonics-process',
    },
  ],
};
