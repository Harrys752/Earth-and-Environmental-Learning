import type { Quiz } from '../../../types/quiz';

export const whatFossilsTellUsQuiz: Quiz = {
  id: 'quiz-what-fossils-tell-us',
  experienceSlug: 'what-fossils-tell-us',
  title: 'Apa yang Diceritakan Fosil Kepada Kita? Kuis Verifikasi',
  description: 'Evaluasi pengetahuan Anda tentang tafonomi fosilisasi, penanggalan stratigrafi, Situs Manusia Purba Sangiran, serta fakta empiris versus interpretasi ilmiah.',
  passingScore: 70,
  questions: [
    {
      id: 'q1-fossilization-conditions',
      type: 'single-choice',
      prompt: 'Kondisi lingkungan manakah yang paling penting agar sisa-sisa organisme berhasil menjadi fosil dan tidak membusuk?',
      contextNarrative: 'Pertimbangkan proses tafonomi pengawetan dalam sedimen geologi.',
      options: [
        {
          id: 'opt-size-misconception',
          label: 'Organisme harus memiliki ukuran tubuh yang sangat masif dan terpapar langsung sinar matahari terbuka.',
        },
        {
          id: 'opt-rapid-burial',
          label: 'Penguburan cepat dalam sedimen berbutir halus (lingkungan anoksik/rendah oksigen) yang melindungi jaringan organik dari pemakan bangkai, pembusukan bakteri, dan abrasi mekanis, diikuti oleh permineralisasi air tanah kaya mineral.',
          isCorrect: true,
        },
        {
          id: 'opt-free-floating',
          label: 'Tetap mengapung bebas di air laut terbuka yang hangat selama ribuan tahun.',
        },
        {
          id: 'opt-volcanic-magma',
          label: 'Tercelup langsung di dalam magma basal cair pada suhu 1.200°C.',
        },
      ],
      correctAnswer: 'opt-rapid-burial',
      explanation: 'Fosilisasi membutuhkan isolasi cepat dari oksigen dan organisme pengurai biologis. Penguburan sedimen yang cepat oleh sungai, danau, atau lahar abu vulkanik menyegel sisa-sisa organisme, memungkinkan mineral terlarut (kalsit, silika, besi) dalam air tanah meresap secara perlahan ke ruang pori dan menggantikan tulang atau materi organik sel demi sel.',
      relatedConceptSlug: 'stratigraphy',
    },
    {
      id: 'q2-fossil-record-completeness',
      type: 'true-false',
      prompt: 'Catatan fosil menyimpan arsip yang lengkap dan menyeluruh dari hampir setiap spesies dan individu organisme yang pernah hidup di Bumi.',
      contextNarrative: 'Cermati kelangkaan fosilisasi dan bias tafonomi dari rekaman batuan.',
      options: [
        {
          id: 'opt-true',
          label: 'Benar — fosilisasi adalah peristiwa umum dan universal bagi organisme hidup setelah mati.',
        },
        {
          id: 'opt-false',
          label: 'Salah — fosilisasi adalah peristiwa yang sangat langka yang membutuhkan kondisi spesifik; organisme bertubuh lunak dan spesies dataran tinggi jarang terawetkan, menjadikan catatan fosil sebagai jendela yang terfragmentasi ke masa lalu.',
          isCorrect: true,
        },
      ],
      correctAnswer: 'opt-false',
      explanation: 'Hanya sebagian kecil dari kehidupan masa lalu yang terawetkan sebagai fosil. Organisme tanpa bagian keras (tulang, cangkang, gigi) atau yang hidup di wilayah pegunungan yang mengalami erosi hampir tidak ada dalam catatan batuan, yang sangat terbias pada lingkungan pengendapan laut dan dataran rendah.',
      relatedConceptSlug: 'stratigraphy',
    },
    {
      id: 'q3-sangiran-significance',
      type: 'single-choice',
      prompt: 'Apa yang membuat Situs Manusia Purba Sangiran di Jawa Tengah bernilai sangat penting bagi paleontologi internasional dunia?',
      contextNarrative: 'Ingat kembali penetapan Warisan Dunia UNESCO dan temuan empiris yang terdokumentasi di Sangiran.',
      options: [
        {
          id: 'opt-sangiran-site',
          label: 'Situs ini melestarikan urutan sedimen berkelanjutan sepanjang 2,4 juta tahun yang sangat kaya, memuat lebih dari 100 fosil individu hominid Homo erectus bersama industri alat batu dan paleofauna purba.',
          isCorrect: true,
        },
        {
          id: 'opt-dinosaur-feathers',
          label: 'Situs ini memuat satu-satunya bulu dinosaurus Jurassic yang diawetkan sepenuhnya di belahan bumi selatan.',
        },
        {
          id: 'opt-synthetic-fossils',
          label: 'Situs ini merupakan laboratorium modern tempat para ilmuwan menumbuhkan trilobita sintetis.',
        },
        {
          id: 'opt-deep-sea-trench',
          label: 'Situs ini adalah palung laut dalam aktif yang berada 10 km di bawah dasar samudra.',
        },
      ],
      correctAnswer: 'opt-sangiran-site',
      explanation: 'Ditetapkan sebagai Situs Warisan Dunia UNESCO pada tahun 1996, Sangiran adalah salah satu lokasi paleoantropologi terpenting di Bumi. Kubah stratigrafinya menyingkap lebih dari 2,4 juta tahun evolusi lingkungan dan bukti fosil penting hominid Pleistosen (Homo erectus) serta alat serpih batu yang berusia ~1,2 hingga 1,5 juta tahun.',
      relatedConceptSlug: 'stratigraphy',
    },
    {
      id: 'q4-stratigraphic-superposition',
      type: 'single-choice',
      prompt: 'Bagaimana prinsip geologi superposisi memungkinkan para paleontolog menentukan umur relatif fosil yang ditemukan dalam lapisan sedimen yang tidak terganggu?',
      contextNarrative: 'Terapkan prinsip stratigrafi untuk membaca urutan vertikal lapisan pada dinding batuan atau parit penggalian.',
      options: [
        {
          id: 'opt-superposition',
          label: 'Dalam urutan sedimen yang belum terdeformasi, lapisan tertua beserta fosil di dalamnya terletak di bagian paling bawah, sedangkan lapisan yang berangsur lebih muda berada di dekat bagian atas.',
          isCorrect: true,
        },
        {
          id: 'opt-reverse',
          label: 'Batuan terbaru selalu terdorong ke lapisan paling bawah oleh medan magnet Bumi.',
        },
        {
          id: 'opt-color-only',
          label: 'Umur fosil ditentukan semata-mata oleh kepekatan warna lapisan sedimen.',
        },
        {
          id: 'opt-weight',
          label: 'Fosil yang lebih berat selalu tenggelam ke dasar batuan padat yang sudah mengeras.',
        },
      ],
      correctAnswer: 'opt-superposition',
      explanation: 'Berdasarkan Hukum Superposisi (dirumuskan oleh Nicolas Steno), setiap lapisan sedimen diendapkan di atas lapisan yang sudah ada sebelumnya. Oleh karena itu, dalam urutan batuan yang tidak terganggu seperti di Sangiran, fosil yang ditemukan di lapisan yang lebih dalam mewakili periode waktu kronologis yang lebih tua daripada yang ditemukan di lapisan atasnya.',
      relatedConceptSlug: 'stratigraphy',
    },
  ],
};
