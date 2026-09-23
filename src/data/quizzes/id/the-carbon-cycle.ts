import type { Quiz } from '../../../types/quiz';

export const theCarbonCycleQuiz: Quiz = {
  id: 'quiz-the-carbon-cycle',
  experienceSlug: 'the-carbon-cycle',
  title: 'Kuis Evaluasi Pemahaman: Daur Karbon & Karbon Biru',
  description: 'Uji pemahaman Anda tentang reservoir karbon keplanetan, daur geologis vs biologis, dan sekuestrasi karbon biru hutan mangrove Indonesia.',
  passingScore: 70,
  questions: [
    {
      id: 'q1-mangrove-soil-storage',
      type: 'single-choice',
      prompt: 'Mengapa tanah sedimen hutan mangrove pesisir mampu menyimpan karbon 3 hingga 5 kali lebih padat per hektar dibandingkan hutan darat tropis biasa?',
      contextNarrative: 'Pertimbangkan pengaruh kondisi jenuh air pasang surut tanpa oksigen (anoksik) terhadap bakteri pengurai.',
      options: [
        {
          id: 'opt-high-winds',
          label: 'Angin kencang pesisir menekan debu karbon langsung ke dalam lumpur.',
        },
        {
          id: 'opt-waterlogged-anoxic',
          label: 'Genangan air pasang menciptakan kondisi tanah anoksik (tanpa oksigen), yang secara drastis memperlambat dekomposisi bakteri sehingga mengunci bahan organik selama berabad-abad.',
          isCorrect: true,
        },
        {
          id: 'opt-salt-crystal',
          label: 'Garam laut mengubah karbon organik menjadi bongkahan intan secara instan.',
        },
        {
          id: 'opt-crabs-only',
          label: 'Kepiting bakau mengubur sampah plastik ke dalam lumpur dalam.',
        },
      ],
      correctAnswer: 'opt-waterlogged-anoxic',
      explanation: 'Dalam sedimen lumpur mangrove yang jenuh air, oksigen sangat minim. Kondisi anaerobik ini mencegah jamur dan bakteri aerob mendegradasi serasah daun dan perakaran kayu, sehingga karbon organik menumpuk membentuk lapisan tebal tanpa mengalami pembusukan.',
      relatedConceptSlug: 'stratigraphy',
    },
    {
      id: 'q2-mangrove-carbon-allocation',
      type: 'true-false',
      prompt: 'Pada ekosistem mangrove di Indonesia, sebagian besar karbon tersimpan di atas tanah pada batang pohon dan dedaunan yang hidup, dan sangat sedikit yang ada di tanah.',
      contextNarrative: 'Ingat kembali alokasi persentase karbon pada mangrove (tanah vs biomassa vs kayu lapuk).',
      options: [
        {
          id: 'opt-true',
          label: 'Benar — batang pohon mangrove menyimpan ~80% dari total karbon ekosistem.',
        },
        {
          id: 'opt-false',
          label: 'Salah — sekitar 78% karbon mangrove tersimpan di bawah tanah pada lapisan sedimen anoksik, dan hanya ~20% yang berada di biomassa pohon hidup.',
          isCorrect: true,
        },
      ],
      correctAnswer: 'opt-false',
      explanation: 'Riset CIFOR (Murdiyarso et al. 2015; Donato et al. 2011) membuktikan bahwa ~78% karbon pada hutan bakau Indonesia terkunci di dalam sedimen lumpur bawah tanah. Karena itu, menjaga keutuhan tanah pesisir adalah kunci utama perlindungan karbon biru.',
      relatedConceptSlug: 'stratigraphy',
    },
    {
      id: 'q3-reservoir-matching',
      type: 'single-choice',
      prompt: 'Reservoir karbon Bumi manakah yang menyimpan jumlah karbon absolut terbesar di planet kita (>100 juta Gigaton C) yang bersirkulasi lambat dalam skala waktu jutaan tahun?',
      contextNarrative: 'Pikirkan tentang lapisan batugamping, sedimen karbonat laut dalam, dan cadangan bahan bakar fosil.',
      options: [
        {
          id: 'opt-atmosphere',
          label: 'Atmosfer (~800 GtC)',
        },
        {
          id: 'opt-geosphere',
          label: 'Geosfer / Litosfer (Batuan sedimen karbonat dan fosil kerak bumi, >100.000.000 GtC)',
          isCorrect: true,
        },
        {
          id: 'opt-biosphere',
          label: 'Biosfer Daratan (~600 GtC)',
        },
        {
          id: 'opt-soil-surface',
          label: 'Humus Permukaan Tanah (~1.500 GtC)',
        },
      ],
      correctAnswer: 'opt-geosphere',
      explanation: 'Geosfer (batuan kerak, batugamping CaCO3, dan endapan fosil) menyimpan lebih dari 99,9% seluruh karbon di Bumi. Karbon masuk ke geosfer melalui sedimentasi biologis dan subduksi, lalu kembali ke atmosfer lewat letusan gunung api dan pelapukan batuan dalam skala geologis jutaan tahun.',
      relatedConceptSlug: 'stratigraphy',
    },
  ],
};
