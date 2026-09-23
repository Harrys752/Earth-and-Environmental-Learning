import type { Quiz } from '../../../types/quiz';

export const howTsunamisFormQuiz: Quiz = {
  id: 'quiz-how-tsunamis-form',
  experienceSlug: 'how-tsunamis-form',
  title: 'Kuis Evaluasi Pemahaman: Bagaimana Tsunami Terbentuk?',
  description: 'Uji pemahaman Anda tentang deformasi vertikal dasar laut megathrust, efek pendangkalan (shoaling), dan tragedi tsunami Aceh 2004.',
  passingScore: 70,
  questions: [
    {
      id: 'q1-genesis-cause',
      type: 'single-choice',
      prompt: 'Peristiwa fisik apakah yang paling sering membangkitkan gelombang tsunami destruktif lintas samudra?',
      contextNarrative: 'Pertimbangkan aksi tektonik mana yang mampu menggeser volume massa air laut paling besar seketika.',
      options: [
        {
          id: 'opt-high-winds',
          label: 'Angin badai tropis kencang dan taifun muson.',
        },
        {
          id: 'opt-vertical-seafloor',
          label: 'Dislokasi deformasi vertikal dasar laut berskala masif saat gempa megathrust bawah laut di zona subduksi.',
          isCorrect: true,
        },
        {
          id: 'opt-tidal-pull',
          label: 'Gaya tarik gravitasi bulan saat gerhana bulan total.',
        },
        {
          id: 'opt-whale-pods',
          label: 'Pergerakan migrasi paus di sepanjang paparan benua.',
        },
      ],
      correctAnswer: 'opt-vertical-seafloor',
      explanation: 'Gempa megathrust bawah laut mengangkat atau menurunkan area dasar laut secara vertikal seketika (seperti dislokasi ~15 m sepanjang 1.200 km pada 2004). Hal ini mendorong seluruh kolom air di atasnya, memicu gelombang tsunami yang menjalar ke segala arah.',
      relatedConceptSlug: 'subduction',
    },
    {
      id: 'q2-deep-ocean-danger',
      type: 'true-false',
      prompt: 'Gelombang tsunami berbentuk dinding air yang sangat tinggi dan paling berbahaya ketika melintasi samudra terbuka yang dalam (> 3.000 meter).',
      contextNarrative: 'Ingat kembali bagaimana tinggi gelombang dan panjang gelombang berubah dari laut dalam menuju zona pesisir yang dangkal.',
      options: [
        {
          id: 'opt-true',
          label: 'Benar — di laut dalam tsunami berupa tembok air raksasa yang mudah menenggelamkan kapal-kapal besar.',
        },
        {
          id: 'opt-false',
          label: 'Salah — di laut dalam amplitudo tsunami sangat rendah (< 1 meter) dengan panjang gelombang ratusan kilometer; amplifikasi berbahaya hanya terjadi saat gelombang mendangkal di pantai (shoaling).',
          isCorrect: true,
        },
      ],
      correctAnswer: 'opt-false',
      explanation: 'Di laut dalam, energi tsunami tersebar dalam panjang gelombang 100–200 km dengan tinggi kurang dari 1 meter sehingga nyaris tidak dirasakan oleh kapal. Saat memasuki perairan dangkal, kecepatan gelombang turun drastis, memampatkan panjang gelombang dan memaksa air membubung tinggi ke daratan (efek shoaling).',
      relatedConceptSlug: 'subduction',
    },
    {
      id: 'q3-aceh-vs-palu-contrast',
      type: 'single-choice',
      prompt: 'Bagaimanakah perbedaan mendasar mekanisme pembangkitan tsunami pada gempa Palu 2018 dibandingkan dengan tsunami Aceh 2004?',
      contextNarrative: 'Ingat komparasi antara deformasi vertikal megathrust primer versus longsoran bawah laut sekunder pada sesar geser.',
      options: [
        {
          id: 'opt-identical',
          label: 'Kedua peristiwa dibangkitkan oleh mekanisme patahan megathrust laut terbuka yang persis sama.',
        },
        {
          id: 'opt-palu-indirect',
          label: 'Aceh 2004 dipicu oleh patahan vertikal megathrust dasar laut primer, sedangkan Palu 2018 dipicu oleh guncangan sesar geser yang memicu longsoran tebing sedimen bawah laut dan runtuhan pantai (likuifaksi) ke dalam Teluk Palu.',
          isCorrect: true,
        },
        {
          id: 'opt-asteroid',
          label: 'Palu 2018 disebabkan oleh tumbukan asteroid di teluk.',
        },
        {
          id: 'opt-dam-burst',
          label: 'Aceh 2004 disebabkan oleh jebolnya bendungan sungai buatan.',
        },
      ],
      correctAnswer: 'opt-palu-indirect',
      explanation: 'Bencana Aceh 2004 adalah deformasi vertikal megathrust samudra klasik (Mw 9,1–9,3). Gempa Palu 2018 terjadi pada sesar geser horizontal (Mw 7,5), di mana guncangan dahsyat memicu longsoran sedimen bawah laut sekunder dan likuifaksi pesisir ke dalam teluk sempit.',
      relatedConceptSlug: 'subduction',
    },
  ],
};
