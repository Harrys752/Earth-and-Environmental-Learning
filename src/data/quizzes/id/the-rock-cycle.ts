import type { Quiz } from '../../../types/quiz';

export const theRockCycleQuiz: Quiz = {
  id: 'quiz-the-rock-cycle',
  experienceSlug: 'the-rock-cycle',
  title: 'Apa Itu Siklus Batuan? Kuis Verifikasi',
  description: 'Uji pemahaman Anda tentang tiga kelas batuan utama, proses transformasi geologis, dan sifat berkelanjutan dari siklus batuan.',
  passingScore: 70,
  questions: [
    {
      id: 'q1-lithification',
      type: 'single-choice',
      prompt: 'Proses geologis manakah yang mengubah akumulasi sedimen mineral lepas menjadi batuan sedimen padat?',
      contextNarrative: 'Pikirkan bagaimana pasir dan lumpur di tepi sungai atau cekungan laut mengeras menjadi batupasir atau serpih dalam rentang waktu geologis.',
      options: [
        {
          id: 'opt-lithification',
          label: 'Litifikasi (kompaksi di bawah tekanan penimbunan dan sementasi oleh presipitasi mineral dari air tanah).',
          isCorrect: true,
        },
        {
          id: 'opt-melting',
          label: 'Pelelehan total menjadi magma yang diikuti oleh lontaran letusan eksplosif cepat.',
        },
        {
          id: 'opt-crystallization',
          label: 'Kristalisasi beku langsung dari lava bawah tanah yang sangat panas.',
        },
        {
          id: 'opt-sublimation',
          label: 'Sublimasi langsung dari gas menjadi kisi kristal padat tanpa tekanan.',
        },
      ],
      correctAnswer: 'opt-lithification',
      explanation: 'Litifikasi adalah proses yang mengubah sedimen lepas menjadi batuan sedimen padat kohesif. Seiring bertambahnya lapisan yang terakumulasi, beban lapisan penutup menyebabkan kompaksi (mengurangi ruang pori), dan mineral terlarut dalam air tanah (seperti silika atau kalsit) mengalami presipitasi untuk menyemen butiran menjadi satu.',
      relatedConceptSlug: 'stratigraphy',
    },
    {
      id: 'q2-rock-classes-matching',
      type: 'single-choice',
      prompt: 'Pasangan manakah yang secara tepat mencocokkan kelas batuan utama dengan mekanisme pembentukan geologis definisinya?',
      contextNarrative: 'Ahli geologi mengklasifikasikan batuan berdasarkan genesa dan riwayat pembentukannya, bukan sekadar warna luarnya.',
      options: [
        {
          id: 'opt-pair-igneous',
          label: 'Batuan Beku — terbentuk secara eksklusif oleh pelipatan tektonik intens tanpa pernah meleleh.',
        },
        {
          id: 'opt-pair-metamorphic',
          label: 'Batuan Metamorf — terbentuk ketika batuan yang sudah ada ditransformasikan oleh panas ekstrem dan tekanan terkurung dalam keadaan padat (tanpa meleleh sempurna).',
          isCorrect: true,
        },
        {
          id: 'opt-pair-sedimentary',
          label: 'Batuan Sedimen — terbentuk oleh pendinginan atmosferik cepat dari magma mantel plume dalam.',
        },
        {
          id: 'opt-pair-wrong',
          label: 'Batuan Beku — terbentuk oleh pembusukan biologis tanaman selama jutaan tahun.',
        },
      ],
      correctAnswer: 'opt-pair-metamorphic',
      explanation: 'Batuan metamorf (misalnya marmer, sekis, gneis) terbentuk saat batuan yang sudah ada mengalami rekristalisasi keadaan padat di bawah suhu tinggi serta tekanan diferensial atau litostatik. Jika suhu naik cukup tinggi hingga batuan meleleh sempurna, batuan tersebut masuk ke ranah batuan beku setelah kembali mendingin.',
      relatedConceptSlug: 'stratigraphy',
    },
    {
      id: 'q3-cycle-order',
      type: 'single-choice',
      prompt: 'Pernyataan manakah yang secara akurat menggambarkan sifat sekuensial dari siklus batuan Bumi?',
      contextNarrative: 'Pertimbangkan apakah batuan kerak Bumi harus mengikuti jalur satu arah yang kaku.',
      options: [
        {
          id: 'opt-fixed-start',
          label: 'Semua batuan harus bermula sebagai batuan beku, menjadi sedimen, lalu metamorf, dan tidak dapat melewati tahapan atau berbalik arah.',
        },
        {
          id: 'opt-dynamic-system',
          label: 'Siklus batuan adalah jaringan dinamis yang saling terhubung tanpa awal atau akhir yang kaku; setiap jenis batuan dapat berubah menjadi jenis apa pun melalui proses geologis yang sesuai.',
          isCorrect: true,
        },
        {
          id: 'opt-one-way-destruction',
          label: 'Batuan hanya hancur menjadi debu dan hilang secara permanen dari kerak planet.',
        },
        {
          id: 'opt-instantaneous',
          label: 'Transformasi batuan hanya terjadi saat peristiwa langka tumbukan meteorit.',
        },
      ],
      correctAnswer: 'opt-dynamic-system',
      explanation: 'Siklus batuan bersifat non-linear dan dinamis. Batuan beku dapat meleleh kembali menjadi magma secara langsung, melapuk menjadi sedimen, atau termetamorfosis di bawah tekanan penimbunan dalam. Batuan sedimen dapat melapuk kembali menjadi sedimen baru atau mengalami metamorfisme. Tidak ada garis awal yang ditentukan sebelumnya.',
      relatedConceptSlug: 'stratigraphy',
    },
    {
      id: 'q4-rock-identification',
      type: 'single-choice',
      prompt: 'Sebuah batuan berbutir kasar memiliki kristal mineral besar yang saling mengunci dan dapat dilihat dengan mata telanjang, menandakan bahwa batuan tersebut mendingin sangat lambat jauh di bawah permukaan Bumi. Termasuk klasifikasi batuan apakah ini?',
      contextNarrative: 'Cermati hubungan antara laju pendinginan magma dan ukuran pertumbuhan kristal.',
      options: [
        {
          id: 'opt-intrusive-igneous',
          label: 'Batuan Beku Intrusif (Plutonik) (mis. granit atau diorit).',
          isCorrect: true,
        },
        {
          id: 'opt-extrusive-igneous',
          label: 'Batuan Beku Ekstrusif (Vulkanik) (mis. obsidian atau basal berbutir halus).',
        },
        {
          id: 'opt-clastic-sedimentary',
          label: 'Batuan Sedimen Klastik (mis. serpih/shale).',
        },
        {
          id: 'opt-chemical-sedimentary',
          label: 'Batuan Sedimen Evaporit Kimia (mis. garam batuan / halit).',
        },
      ],
      correctAnswer: 'opt-intrusive-igneous',
      explanation: 'Ketika magma mendingin secara perlahan selama ribuan hingga jutaan tahun di kedalaman kerak (terisolasi oleh batuan samping di sekitarnya), kristal mineral memiliki waktu yang cukup untuk tumbuh besar dan saling mengunci, menghasilkan tekstur faneritik kasar khas batuan beku intrusif seperti granit.',
      relatedConceptSlug: 'stratigraphy',
    },
  ],
};
