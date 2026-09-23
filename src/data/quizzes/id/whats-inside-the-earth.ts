import type { Quiz } from '../../../types/quiz';

export const whatsInsideTheEarthQuiz: Quiz = {
  id: 'quiz-whats-inside-the-earth',
  experienceSlug: 'whats-inside-the-earth',
  title: 'Kuis Evaluasi Pemahaman: Apa Isi di Dalam Bumi?',
  description: 'Uji pemahaman Anda tentang lapisan konsentris Bumi, perambatan gelombang seismik, dan zona bayangan inti luar.',
  passingScore: 70,
  questions: [
    {
      id: 'q1-outer-core-liquid',
      type: 'single-choice',
      prompt: 'Bagaimana para geofisikawan mengetahui bahwa inti luar Bumi berwujud cair dan bukan padat?',
      contextNarrative: 'Ingat kembali bagaimana perbedaan jenis gelombang seismik merambat melalui wujud zat yang berbeda.',
      options: [
        {
          id: 'opt-drill-samples',
          label: 'Pemboran vulkanik dalam telah mengambil sampel cairan besi langsung dari inti Bumi.',
        },
        {
          id: 'opt-s-wave-shadow',
          label: 'Gelombang geser seismik (Gelombang S) tidak dapat merambat melalui zat cair, sehingga menciptakan zona bayangan gelombang S global di sisi berlawanan episentrum gempa.',
          isCorrect: true,
        },
        {
          id: 'opt-magnetic-only',
          label: 'Inti luar memancarkan cahaya merah membara yang dapat diamati dari palung laut terdalam.',
        },
        {
          id: 'opt-gravity-only',
          label: 'Gravitasi Bumi menghilang secara berkala di kawasan khatulistiwa.',
        },
      ],
      correctAnswer: 'opt-s-wave-shadow',
      explanation: 'Gelombang S memerlukan medium padat yang memiliki kekuatan geser untuk dapat merambat. Ketika menabrak inti luar yang cair, gelombang S terhenti total, membentuk zona bayangan gelombang S antara sudut 103° hingga 180° di seluruh permukaan Bumi.',
      relatedConceptSlug: 'plate-tectonics-process',
    },
    {
      id: 'q2-drilling-depth',
      type: 'true-false',
      prompt: 'Manusia telah berhasil mengebor cukup dalam hingga mengambil sampel batuan mantel Bumi secara langsung.',
      contextNarrative: 'Bandingkan kedalaman Kola Superdeep Borehole dengan ketebalan kerak Bumi.',
      options: [
        {
          id: 'opt-true',
          label: 'Benar — pemboran industri secara rutin menembus ratusan kilometer ke dalam mantel.',
        },
        {
          id: 'opt-false',
          label: 'Salah — pemboran terdalam hanya mencapai ~12,2 km, baru menembus sepertiga kerak benua terluar.',
          isCorrect: true,
        },
      ],
      correctAnswer: 'opt-false',
      explanation: 'Pemboran Kola Superdeep Borehole di Rusia hanya mencapai kedalaman 12.262 meter (12,2 km). Karena kerak benua memiliki ketebalan 30–70 km, manusia belum pernah mengebor langsung hingga ke mantel Bumi.',
      relatedConceptSlug: 'plate-tectonics-process',
    },
    {
      id: 'q3-layer-ordering',
      type: 'ordering',
      prompt: 'Urutkan lapisan internal Bumi dari permukaan paling luar hingga ke pusat planet.',
      contextNarrative: 'Susun lapisan konsentris Bumi dari yang paling dangkal hingga yang paling dalam.',
      orderingItems: [
        { id: 'item-crust', label: 'Kerak Bumi (Lapisan silikat terluar, 0–70 km)', correctOrder: 0 },
        { id: 'item-mantle', label: 'Mantel Bumi (Silikat konvektif kental, 70–2.890 km)', correctOrder: 1 },
        { id: 'item-outer-core', label: 'Inti Luar (Logam besi-nikel cair, 2.890–5.150 km)', correctOrder: 2 },
        { id: 'item-inner-core', label: 'Inti Dalam (Bola kristal besi padat, 5.150–6.371 km)', correctOrder: 3 },
      ],
      correctAnswer: ['item-crust', 'item-mantle', 'item-outer-core', 'item-inner-core'],
      explanation: 'Urutan dari permukaan ke pusat Bumi: Kerak (0–70 km) → Mantel (70–2.890 km) → Inti Luar (2.890–5.150 km) → Inti Dalam (5.150–6.371 km).',
      relatedConceptSlug: 'plate-tectonics-process',
    },
  ],
};
