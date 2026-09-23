import type { Quiz } from '../../../types/quiz';

export const whatMakesAMineralAMineralQuiz: Quiz = {
  id: 'quiz-what-makes-a-mineral-a-mineral',
  experienceSlug: 'what-makes-a-mineral-a-mineral',
  title: 'Kuis Evaluasi Pemahaman: Apa yang Membuat Mineral Menjadi Mineral?',
  description: 'Uji pemahaman Anda tentang 5 kriteria mutlak mineral, perbedaan mineral vs batuan, dan pembentukan bijih nikel laterit di Indonesia.',
  passingScore: 70,
  questions: [
    {
      id: 'q1-definition-criteria',
      type: 'single-choice',
      prompt: 'Manakah dari pernyataan berikut yang BUKAN merupakan bagian dari definisi ilmiah mutlak sebuah mineral?',
      contextNarrative: 'Ingat kembali 5 kriteria yang wajib dipenuhi suatu zat agar dapat diklasifikasikan sebagai mineral sejati.',
      options: [
        {
          id: 'opt-naturally-occurring',
          label: 'Harus terbentuk secara alami di alam.',
        },
        {
          id: 'opt-must-be-organic',
          label: 'Harus terbentuk dari jaringan organik tumbuhan atau hewan hidup.',
          isCorrect: true,
        },
        {
          id: 'opt-ordered-crystal',
          label: 'Harus memiliki struktur kisi atom kristal internal yang teratur.',
        },
        {
          id: 'opt-definite-chemical',
          label: 'Harus memiliki komposisi kimia definitif (formula tertentu).',
        },
      ],
      correctAnswer: 'opt-must-be-organic',
      explanation: 'Mineral secara definisi ilmiah mutlak bersifat ANORGANIK. Zat-zat organik yang dihasilkan murni dari jaringan biologis makhluk hidup (seperti kayu, ambar, atau batu bara) tidak diklasifikasikan sebagai mineral.',
      relatedConceptSlug: 'stratigraphy',
    },
    {
      id: 'q2-rock-vs-mineral',
      type: 'true-false',
      prompt: 'Batuan dan mineral adalah dua istilah yang identik secara ilmiah dan dapat saling menggantikan.',
      contextNarrative: 'Perhatikan bagaimana batuan granit tersusun dibandingkan dengan mineral kuarsa atau feldspar.',
      options: [
        {
          id: 'opt-true',
          label: 'Benar — batuan dan mineral memiliki definisi atomik yang persis sama.',
        },
        {
          id: 'opt-false',
          label: 'Salah — mineral adalah senyawa kristalin homogen, sedangkan batuan adalah agregat (campuran) dari satu atau lebih mineral.',
          isCorrect: true,
        },
      ],
      correctAnswer: 'opt-false',
      explanation: 'Mineral adalah zat tunggal homogen dengan struktur kristal dan rumus kimia tertentu. Batuan adalah agregat heterogen yang tersusun dari campuran beberapa mineral (contohnya granit tersusun atas kuarsa, feldspar, dan biotit).',
      relatedConceptSlug: 'stratigraphy',
    },
    {
      id: 'q3-nickel-laterite',
      type: 'single-choice',
      prompt: 'Proses geologis apakah yang paling bertanggung jawab atas pembentukan cadangan nikel laterit kelas dunia di Sulawesi dan Halmahera?',
      contextNarrative: 'Hubungkan iklim tropis khatulistiwa Indonesia yang basah dan panas dengan pelapukan batuan dasar ultramafik.',
      options: [
        {
          id: 'opt-meteor-impact',
          label: 'Tumbukan meteorit purba yang mengendapkan debu nikel luar angkasa.',
        },
        {
          id: 'opt-tropical-weathering',
          label: 'Pelapukan kimiawi tropis yang intens dan berkepanjangan terhadap batuan peridotit ultramafik di bawah curah hujan dan suhu tinggi.',
          isCorrect: true,
        },
        {
          id: 'opt-sandstone-sediment',
          label: 'Pengendapan bukit pasir oleh angin di cekungan gurun purba.',
        },
        {
          id: 'opt-glacial-scraping',
          label: 'Pengikisan oleh gletser es kutub selama zaman es Pleistosen.',
        },
      ],
      correctAnswer: 'opt-tropical-weathering',
      explanation: 'Bijih nikel laterit terbentuk melalui proses pelapukan kimiawi intensif (lateritisasi) terhadap batuan peridotit di iklim tropis basah. Unsur-unsur yang mudah larut (seperti silika dan magnesium) tercuci keluar, meninggalkan konsentrasi nikel tinggi (garnierit/limonit) di dekat permukaan tanah.',
      relatedConceptSlug: 'stratigraphy',
    },
  ],
};
