import type { Quiz } from '../../../types/quiz';

export const nutrientCyclingTropicalSoilsQuiz: Quiz = {
  id: 'quiz-nutrient-cycling-tropical-soils',
  experienceSlug: 'nutrient-cycling-tropical-soils',
  title: 'Kuis Evaluasi Pemahaman: Daur Hara Tanah Hutan Hujan Tropis',
  description: 'Uji pemahaman Anda tentang paradoks tanah miskin hara di hutan hujan tropis, daur mikoriza cepat, dan dampak pelindian hara pasca-deforestasi.',
  passingScore: 70,
  questions: [
    {
      id: 'q1-nutrient-pool-location',
      type: 'single-choice',
      prompt: 'Pada ekosistem hutan hujan tropis alami yang belum terganggu, di manakah sebagian besar (>80%) cadangan hara esensial tersimpan?',
      contextNarrative: 'Bandingkan perputaran daur biologi super cepat dengan kondisi tanah mineral di bawahnya yang terlapuk kuat.',
      options: [
        {
          id: 'opt-soil-humus',
          label: 'Di dalam lapisan humus tanah tebal ratusan meter di bawah tanah.',
        },
        {
          id: 'opt-living-biomass',
          label: 'Di dalam biomassa hidup (batang pohon, daun, liana) dan jaring perakaran dangkal yang menyerap hara secara instan.',
          isCorrect: true,
        },
        {
          id: 'opt-river-gravel',
          label: 'Di dalam endapan kerikil dasar sungai.',
        },
        {
          id: 'opt-bedrock-granite',
          label: 'Di dalam batuan dasar granit padat yang belum lapuk.',
        },
      ],
      correctAnswer: 'opt-living-biomass',
      explanation: 'Di hutan hujan khatulistiwa yang hangat dan lembap, dekomposisi serasah berlangsung sangat cepat. Akar dangkal dan cendawan mikoriza langsung menyerap kembali kation hara yang terlepas (N, P, K, Ca), mengunci >80% hara di jaringan tanaman hidup dan bukan di tanah.',
      relatedConceptSlug: 'stratigraphy',
    },
    {
      id: 'q2-soil-fertility-paradox',
      type: 'true-false',
      prompt: 'Tanah hutan hujan tropis secara alami sangat kaya akan mineral dan lapisan humus tebal, itulah sebabnya hutan tropis mampu menopang pohon-pohon raksasa.',
      contextNarrative: 'Pecahkan paradoks klasik tanah tropis (tajuk rimbun vs tanah oxisol/ultisol yang tercuci).',
      options: [
        {
          id: 'opt-true',
          label: 'Benar — tanah hutan hujan tropis adalah tanah paling kaya mineral di dunia.',
        },
        {
          id: 'opt-false',
          label: 'Salah — tanah tropis (oxisol/ultisol) umumnya berusia jutaan tahun, sangat lapuk, asam, dan miskin hara; kehijauan hutan ditopang oleh daur ulang biologi cepat, bukan oleh cadangan tanah.',
          isCorrect: true,
        },
      ],
      correctAnswer: 'opt-false',
      explanation: 'Tanah hutan hujan tropis telah mengalami pelindian intensif oleh air hujan selama jutaan tahun sehingga miskin mineral hara. Ekosistem hutan yang lebat merupakan sistem daur ulang tertutup yang sangat efisien di atas tanah yang sebenarnya tandus.',
      relatedConceptSlug: 'stratigraphy',
    },
    {
      id: 'q3-deforestation-impact',
      type: 'single-choice',
      prompt: 'Mengapa pembukaan lahan hutan hujan tropis dengan metode tebas-bakar sering kali mengalami penurunan drastis kesuburan tanaman hanya dalam tempo 2 hingga 3 tahun?',
      contextNarrative: 'Pertimbangkan apa yang terjadi saat biomassa pohon dihilangkan dan tanah terpapar curah hujan tropis yang sangat lebat.',
      options: [
        {
          id: 'opt-crop-poison',
          label: 'Abu pembakaran meracuni bibit tanaman setelah tahun kedua.',
        },
        {
          id: 'opt-biomass-leached',
          label: 'Penebangan memusnahkan kolam hara biomassa pohon, dan curah hujan tropis yang lebat (>3.000 mm/tahun) mencuci habis sisa hara abu (pelindian) ke lapisan tanah dalam di luar jangkauan akar tanaman pangan.',
          isCorrect: true,
        },
        {
          id: 'opt-sunlight-loss',
          label: 'Sinar matahari berhenti menyinari lahan yang terbuka.',
        },
        {
          id: 'opt-sand-formation',
          label: 'Tanah langsung berubah menjadi air laut asin.',
        },
      ],
      correctAnswer: 'opt-biomass-leached',
      explanation: 'Pembakaran hutan hanya memberikan pasokan hara sementara dari abu. Tanpa kanopi pelindung dan tanpa jaring mikoriza perakaran hutan, hujan tropis yang deras melarutkan dan mencuci kation hara penting (K, Ca, Mg) ke dalam tanah bawah (leaching), menyebabkan tanah cepat tandus dalam beberapa musim tanam.',
      relatedConceptSlug: 'stratigraphy',
    },
  ],
};
