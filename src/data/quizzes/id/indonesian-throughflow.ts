import type { Quiz } from '../../../types/quiz';

export const indonesianThroughflowQuiz: Quiz = {
  id: 'quiz-indonesian-throughflow',
  experienceSlug: 'indonesian-throughflow',
  title: 'Kuis Evaluasi Pemahaman: Arus Lintas Indonesia (Arlindo)',
  description: 'Uji pemahaman Anda tentang pembawa kalor samudra Pasifik-Hindia, jalur selat utama, dan keterkaitan dengan dinamika iklim ENSO.',
  passingScore: 70,
  questions: [
    {
      id: 'q1-primary-driver',
      type: 'single-choice',
      prompt: 'Mekanisme fisik apakah yang menjadi pendorong utama aliran konstan Arus Lintas Indonesia (Arlindo) dari utara ke selatan?',
      contextNarrative: 'Pertimbangkan perbedaan tinggi muka air laut antara kawasan tropis Samudra Pasifik dan Samudra Hindia.',
      options: [
        {
          id: 'opt-wind-local',
          label: 'Angin darat dan angin laut harian lokal di sekitar Pulau Jawa.',
        },
        {
          id: 'opt-sea-level-gradient',
          label: 'Gradien tekanan hidrolik tetap di mana permukaan Samudra Pasifik Barat berada 20–35 cm lebih tinggi daripada Samudra Hindia Timur.',
          isCorrect: true,
        },
        {
          id: 'opt-underwater-pumps',
          label: 'Pendidihan geotermal di bawah kaldera Krakatau yang mendorong air ke selatan.',
        },
        {
          id: 'opt-magnetic-forces',
          label: 'Garis medan magnet Bumi yang menarik air asin menuju khatulistiwa.',
        },
      ],
      correctAnswer: 'opt-sea-level-gradient',
      explanation: 'Angin pasat Pasifik menumpuk air hangat di Kolam Hangat Pasifik Barat (Western Pacific Warm Pool), menaikkan muka laut sekitar 20–35 cm lebih tinggi dari Samudra Hindia. Kemiringan permukaan laut yang persisten ini mengalirkan massa air masif melintasi selat-selat Indonesia.',
      relatedConceptSlug: 'atmospheric-pressure',
    },
    {
      id: 'q2-unique-gateway',
      type: 'true-false',
      prompt: 'Arus Lintas Indonesia (Arlindo) adalah satu-satunya jalur samudra lintang rendah di planet Bumi yang menghubungkan Samudra Pasifik dan Samudra Hindia.',
      contextNarrative: 'Periksa peta dunia untuk melihat apakah ada jalur laut tropis lain yang menghubungkan kedua samudra raksasa tersebut.',
      options: [
        {
          id: 'opt-true',
          label: 'Benar — kepulauan Indonesia merupakan satu-satunya celah maritim khatulistiwa penghubung Pasifik dan Hindia.',
          isCorrect: true,
        },
        {
          id: 'opt-false',
          label: 'Salah — terdapat beberapa jalur laut tropis lebar lainnya di dekat khatulistiwa.',
        },
      ],
      correctAnswer: 'opt-true',
      explanation: 'Karena benua lain memblokir aliran khatulistiwa di tempat lain, laut kepulauan Indonesia menjadi satu-satunya jalur penghubung antar-samudra di daerah tropis, menjadikannya titik pengatur vital dalam sirkulasi termohalin dan neraca panas global.',
      relatedConceptSlug: 'atmospheric-pressure',
    },
    {
      id: 'q3-strait-matching',
      type: 'single-choice',
      prompt: 'Selat di Indonesia manakah yang bertindak sebagai gerbang MASUK (inflow) utama, mengalirkan lebih dari 80% (~11,6 Sverdrup) massa air Pasifik ke laut dalam nusantara?',
      contextNarrative: 'Identifikasi perairan utama di antara Pulau Kalimantan dan Pulau Sulawesi.',
      options: [
        {
          id: 'opt-malacca',
          label: 'Selat Malaka',
        },
        {
          id: 'opt-makassar',
          label: 'Selat Makassar',
          isCorrect: true,
        },
        {
          id: 'opt-lombok',
          label: 'Selat Lombok (Jalur Keluar)',
        },
        {
          id: 'opt-sunda',
          label: 'Selat Sunda',
        },
      ],
      correctAnswer: 'opt-makassar',
      explanation: 'Selat Makassar adalah arteri inflow terdalam dan terbesar bagi Arlindo (~11,6 Sv), menyalurkan air Pasifik ke Laut Flores dan Laut Banda sebelum keluar ke Samudra Hindia melalui Selat Lombok, Selat Ombai, dan Celah Timor.',
      relatedConceptSlug: 'atmospheric-pressure',
    },
  ],
};
