import type { Quiz } from '../../../types/quiz';

export const jakartaSinkingCityGroundwaterQuiz: Quiz = {
  id: 'quiz-jakarta-sinking-city-groundwater',
  experienceSlug: 'jakarta-sinking-city-groundwater',
  title: 'Kuis Evaluasi Pemahaman: Mengapa Jakarta Tenggelam & Air Tanah',
  description: 'Uji pemahaman Anda tentang tekanan pori akuifer, pemadatan lempung tak terpulihkan, dan dinamika penurunan tanah pesisir.',
  passingScore: 70,
  questions: [
    {
      id: 'q1-primary-cause',
      type: 'single-choice',
      prompt: 'Berdasarkan kajian ilmiah para ahli geologi ITB dan Badan Geologi ESDM, faktor utama apakah yang menyebabkan 80–90% penurunan muka tanah di Jakarta?',
      contextNarrative: 'Pertimbangkan dampak hidrologis pemompaan masif dari akuifer dalam di kawasan perkotaan.',
      options: [
        {
          id: 'opt-weight-buildings',
          label: 'Beban fisik bangunan gedung pencakar langit yang menekan tanah ke bawah.',
        },
        {
          id: 'opt-excessive-groundwater',
          label: 'Pengambilan air tanah dalam secara berlebihan yang melampaui kemampuan imbuhan alami akuifer.',
          isCorrect: true,
        },
        {
          id: 'opt-tectonic-sinking',
          label: 'Penunjaman lempeng tektonik yang langsung menarik Pulau Jawa ke bawah.',
        },
        {
          id: 'opt-sea-level-only',
          label: 'Kenaikan muka air laut global semata.',
        },
      ],
      correctAnswer: 'opt-excessive-groundwater',
      explanation: 'Lebih dari 80–90% amblesan tanah Jakarta dipicu oleh penyedotan air tanah dalam yang tidak terkendali. Pemompaan ini menghilangkan tekanan air pori hidrostatik, menyebabkan lapisan lempung (aquitard) di sekitarnya termampatkan dan memadat secara permanen.',
      relatedConceptSlug: 'atmospheric-pressure',
    },
    {
      id: 'q2-irreversible-compaction',
      type: 'true-false',
      prompt: 'Setelah lapisan lempung dalam memadat akibat hilangnya air tanah, tanah akan kembali naik ke ketinggian semula secara alami jika seluruh pemompaan dihentikan.',
      contextNarrative: 'Renungkan sifat mekanis butiran mineral lempung saat mengalami pembebanan vertikal tinggi.',
      options: [
        {
          id: 'opt-true',
          label: 'Benar — lapisan tanah lempung elastis seperti spons dan akan membal kembali secara sempurna.',
        },
        {
          id: 'opt-false',
          label: 'Salah — pemadatan lempung bersifat plastis permanen (irreversible); penurunan muka tanah tidak dapat pulih kembali.',
          isCorrect: true,
        },
      ],
      correctAnswer: 'opt-false',
      explanation: 'Partikel lempung berbentuk lempengan mikroskopis pipih. Ketika tekanan air pori hilang, lempengan tersebut menyusun ulang menjadi struktur rapat yang padat di bawah gravitasi. Deformasi plastis ini tidak dapat kembali seperti semula meskipun akuifer diisi air kembali.',
      relatedConceptSlug: 'atmospheric-pressure',
    },
    {
      id: 'q3-subsidence-estimation',
      type: 'single-choice',
      prompt: 'Jika suatu wilayah pesisir di Jakarta Utara mengalami amblesan dengan laju rata-rata 8 cm per tahun, berapakah perkiraan total penurunan tanah vertikal dalam waktu 10 tahun?',
      contextNarrative: 'Hitung akumulasi penurunan (menggunakan laju rata-rata skematis).',
      options: [
        {
          id: 'opt-8cm',
          label: 'Total 8 cm',
        },
        {
          id: 'opt-80cm',
          label: 'Sekitar 80 cm (0,8 meter)',
          isCorrect: true,
        },
        {
          id: 'opt-8m',
          label: 'Sekitar 8 meter',
        },
        {
          id: 'opt-zero',
          label: '0 cm karena pasang surut laut menyeimbangkannya',
        },
      ],
      correctAnswer: 'opt-80cm',
      explanation: '8 cm/tahun × 10 tahun = 80 cm (0,8 meter). Di wilayah pesisir rendah yang ketinggiannya sudah mendekati muka laut, amblesan hampir satu meter ini meningkatkan frekuensi dan keparahan banjir pasang rob di balik tanggul laut.',
      relatedConceptSlug: 'atmospheric-pressure',
    },
  ],
};
