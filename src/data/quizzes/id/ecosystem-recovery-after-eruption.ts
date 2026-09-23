import type { Quiz } from '../../../types/quiz';

export const ecosystemRecoveryAfterEruptionQuiz: Quiz = {
  id: 'quiz-ecosystem-recovery-after-eruption',
  experienceSlug: 'ecosystem-recovery-after-eruption',
  title: 'Kuis Evaluasi Pemahaman: Pemulihan Ekosistem Pasca-Letusan Vulkanik',
  description: 'Uji pemahaman Anda tentang suksesi ekologis primer, spesies perintis, dan kronologi ilmiah rekolonisasi flora-fauna di Krakatau.',
  passingScore: 70,
  questions: [
    {
      id: 'q1-pioneer-species',
      type: 'single-choice',
      prompt: 'Dalam ilmu ekologi, apakah yang dimaksud dengan "spesies perintis" (pioneer species)?',
      contextNarrative: 'Pertimbangkan karakteristik organisme pertama yang mampu bertahan hidup di atas abu vulkanik atau batuan beku steril.',
      options: [
        {
          id: 'opt-large-mammals',
          label: 'Mamalia predator puncak yang membutuhkan kanopi hutan lebat.',
        },
        {
          id: 'opt-hardy-colonizer',
          label: 'Organisme tangguh dengan daya sebar tinggi yang mampu bertahan dan tumbuh di atas substrat tandus tanpa adanya lapisan tanah sebelumnya.',
          isCorrect: true,
        },
        {
          id: 'opt-climax-trees',
          label: 'Pohon hutan hujan berkayu keras yang memerlukan tanah humus sangat dalam.',
        },
        {
          id: 'opt-domesticated-crops',
          label: 'Tanaman budidaya pertanian yang ditanam manusia.',
        },
      ],
      correctAnswer: 'opt-hardy-colonizer',
      explanation: 'Spesies perintis (seperti sianobakteri pengikat nitrogen, laba-laba mikro terbang, lumut, dan rumput pantai) memiliki toleransi lingkungan luas dan kemampuan dispersi tinggi untuk memulai pembentukan tanah biologis pada batuan vulkanik steril.',
      relatedConceptSlug: 'volcanic-arcs',
    },
    {
      id: 'q2-krakatau-ordering',
      type: 'ordering',
      prompt: 'Urutkan tahapan dokumentasi ilmiah rekolonisasi ekologis di kepulauan Krakatau secara kronologis setelah letusan dahsyat 1883.',
      contextNarrative: 'Susun tonggak sejarah suksesi dari pasca-letusan langsung hingga terbentuknya kembali hutan klimaks.',
      orderingItems: [
        { id: 'item-spider', label: 'Kehidupan pertama terlihat (laba-laba penerbang sutra, Nov 1883)', correctOrder: 0 },
        { id: 'item-grass', label: 'Rumput perintis dan sianobakteri pengikat nitrogen (1884)', correctOrder: 1 },
        { id: 'item-coastal', label: 'Komunitas vegetasi pantai dari biji terbawa arus laut (1897)', correctOrder: 2 },
        { id: 'item-rainforest', label: 'Kanopi hutan hujan tropis sekunder tertutup (1931–1935)', correctOrder: 3 },
      ],
      correctAnswer: ['item-spider', 'item-grass', 'item-coastal', 'item-rainforest'],
      explanation: 'Kronologi: Laba-laba (3 bulan pasca-letusan) → Rumput & Alga (1 tahun) → Vegetasi pantai (14 tahun) → Hutan hujan tropis rimbun (50 tahun).',
      relatedConceptSlug: 'volcanic-arcs',
    },
    {
      id: 'q3-climax-equilibrium',
      type: 'true-false',
      prompt: 'Setelah ekosistem pulau mencapai komunitas hutan klimaks yang matang, perubahan ekologis berhenti secara total untuk selamanya.',
      contextNarrative: 'Pertimbangkan aktivitas vulkanik Anak Krakatau yang terus berlangsung sejak 1930.',
      options: [
        {
          id: 'opt-true',
          label: 'Benar — komunitas klimaks bersifat statis permanen dan kebal terhadap gangguan alam.',
        },
        {
          id: 'opt-false',
          label: 'Salah — gangguan alam, seperti letusan baru dari Anak Krakatau, secara berkala mereset dan mengulang siklus suksesi.',
          isCorrect: true,
        },
      ],
      correctAnswer: 'opt-false',
      explanation: 'Ekosistem bersifat dinamis. Letusan-letusan berkala dari Anak Krakatau (misalnya 1952 dan 2018) mereset sebagian vegetasi pulau, membuktikan bahwa suksesi ekologis adalah proses siklik yang terus berjalan.',
      relatedConceptSlug: 'volcanic-arcs',
    },
  ],
};
