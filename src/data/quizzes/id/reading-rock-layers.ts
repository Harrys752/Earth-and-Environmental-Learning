import type { Quiz } from '../../../types/quiz';

export const readingRockLayersQuiz: Quiz = {
  id: 'quiz-reading-rock-layers',
  experienceSlug: 'reading-rock-layers',
  title: 'Membaca Lapisan Batuan & Stratigrafi Geologi',
  description: 'Uji pemahaman Anda tentang prinsip-prinsip stratigrafi Nicolaus Steno, ketidakselarasan, dan penanggalan relatif sejarah Bumi.',
  passingScore: 70,
  questions: [
    {
      id: 'q1-superposition',
      type: 'single-choice',
      prompt: 'Berdasarkan Hukum Superposisi, pada urutan lapisan batuan sedimen yang belum terganggu:',
      options: [
        {
          id: 'opt-top-oldest',
          label: 'Lapisan batuan tertua berada di bagian paling atas karena terpapar udara terlebih dahulu.',
        },
        {
          id: 'opt-bottom-oldest',
          label: 'Lapisan batuan tertua berada di bagian paling bawah, dan setiap lapisan di atasnya berangsur-angsur lebih muda.',
          isCorrect: true,
        },
        {
          id: 'opt-same-age',
          label: 'Semua lapisan sedimen dalam satu singkapan terendapkan secara serentak dalam satu peristiwa bencana dahsyat.',
        },
      ],
      correctAnswer: 'opt-bottom-oldest',
      explanation: 'Dirumuskan oleh Nicolaus Steno pada tahun 1669, Hukum Superposisi menyatakan bahwa dalam urutan batuan sedimen yang tidak terganggu, setiap lapisan lebih muda daripada lapisan di bawahnya dan lebih tua daripada lapisan di atasnya, karena sedimen yang lebih baru harus diendapkan di atas permukaan yang sudah ada sebelumnya.',
      relatedConceptSlug: 'stratigraphy',
    },
    {
      id: 'q2-cross-cutting',
      type: 'single-choice',
      prompt: 'Jika sebuah retas (dike) batuan beku basaltik memotong secara vertikal lima lapisan batugamping horizontal yang mendatar, fitur batuan manakah yang berumur lebih muda?',
      options: [
        {
          id: 'opt-limestone',
          label: 'Lapisan batugamping horizontal berumur lebih muda karena mengelilingi retas.',
        },
        {
          id: 'opt-dike-younger',
          label: 'Retas basaltik berumur lebih muda karena suatu fitur geologi harus sudah ada terlebih dahulu sebelum dapat dipotong (Prinsip Hubungan Pemotongan / Cross-Cutting Relationships).',
          isCorrect: true,
        },
        {
          id: 'opt-cannot-tell',
          label: 'Secara fisik mustahil menentukan umur relatif tanpa penanggalan radiometrik uranium-timbal.',
        },
      ],
      correctAnswer: 'opt-dike-younger',
      explanation: 'Prinsip Hubungan Pemotongan (Cross-Cutting Relationships) menyatakan bahwa tubuh batuan beku intrusif, sesar, atau rekahan yang memotong lapisan batuan lain harus berumur lebih muda daripada unit batuan yang diterobosnya. Lapisan batugamping harus sudah diendapkan, terlitifikasi, dan ada di tempat sebelum magma dapat menerobos dan memotongnya.',
      relatedConceptSlug: 'stratigraphy',
    },
    {
      id: 'q3-karangsambung-melange',
      type: 'single-choice',
      prompt: 'Mengapa Karangsambung di Jawa Tengah diakui secara internasional oleh para ahli geologi sebagai buku teks hidup tektonik lempeng?',
      options: [
        {
          id: 'opt-meteorite',
          label: 'Wilayah ini memiliki kawah tumbukan meteorit terbesar di Asia Tenggara.',
        },
        {
          id: 'opt-subduction-melange',
          label: 'Wilayah ini melestarikan kompleks akresi subduksi purba (bancuh / mélange tektonik) tempat kerak samudera purba dan lava bantal terkeruk dan terangkat ke daratan.',
          isCorrect: true,
        },
        {
          id: 'opt-active-lava-lake',
          label: 'Wilayah ini memiliki danau lava cair mendidih permanen.',
        },
      ],
      correctAnswer: 'opt-subduction-melange',
      explanation: 'Geopark Karangsambung menyingkap kompleks akresi subduksi purba Zaman Kapur (mélange) yang berusia lebih dari 120 juta tahun. Lava bantal samudera, rijang merah yang diendapkan di dataran abisal samudra dalam, dan batuan metamorf bertekanan tinggi (eklogit dan sekis biru) yang terbentuk di kedalaman 50–100 km terkeruk dari lempeng yang menghunjam dan terangkat secara tektonik ke permukaan.',
      relatedConceptSlug: 'subduction',
    },
  ],
};
