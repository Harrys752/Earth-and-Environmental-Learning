import type { Quiz } from '../../../types/quiz';

export const whyDoEarthquakesHappenQuiz: Quiz = {
  id: 'quiz-why-do-earthquakes-happen',
  experienceSlug: 'why-do-earthquakes-happen',
  title: 'Mengapa Gempa Bumi Terjadi? Kuis Verifikasi',
  description: 'Evaluasi pemahaman Anda tentang lentingan elastis (elastic rebound), kinematika sesar, dan mekanisme gempa Palu 2018.',
  passingScore: 70,
  questions: [
    {
      id: 'q1-elastic-rebound',
      type: 'single-choice',
      prompt: 'Apa yang dimaksud dengan "lentingan elastis" (elastic rebound) dalam konteks terjadinya gempa bumi?',
      contextNarrative: 'Pertimbangkan bagaimana lempeng tektonik mengakumulasi regangan fisik selama beberapa dekade atau abad sebelum gempa terjadi.',
      options: [
        {
          id: 'opt-new-fault',
          label: 'Bidang sesar baru tercipta pada batuan yang sebelumnya tidak retak setiap kali terjadi gempa bumi.',
        },
        {
          id: 'opt-strain-release',
          label: 'Batuan yang terkunci oleh friksi/gesekan perlahan melengkung dan menyimpan energi regangan elastis di bawah tegasan tektonik, kemudian tiba-tiba pecah dan melenting kembali untuk melepaskan energi sebagai gelombang seismik.',
          isCorrect: true,
        },
        {
          id: 'opt-magma-pressure',
          label: 'Kantong magma cair memuai hingga tekanan gas meledak ke udara.',
        },
        {
          id: 'opt-ocean-tides',
          label: 'Tarikan pasang surut gravitasi dari bulan memaksa lempeng tektonik terpisah dalam siklus harian.',
        },
      ],
      correctAnswer: 'opt-strain-release',
      explanation: 'Teori lentingan elastis menjelaskan bahwa gaya tektonik terus menekan bidang sesar yang terkunci gesekan. Batuan di kedua sisi mengalami deformasi elastis seperti busur panah yang ditarik. Ketika tegasan yang terakumulasi melampaui kekuatan gesek batuan, terjadi patahan getas seketika—melepaskan energi elastis yang tersimpan sebagai gelombang kejut seismik yang merambat.',
      relatedConceptSlug: 'plate-tectonics-process',
    },
    {
      id: 'q2-palu-tsunami',
      type: 'true-false',
      prompt: 'Sesar geser (transform / strike-slip) tidak akan pernah dapat memicu tsunami dalam kondisi apa pun.',
      contextNarrative: 'Renungkan tsunami anomali yang diamati selama gempa Sesar Palu-Koro Mw 7,5 tahun 2018 di Sulawesi Tengah.',
      options: [
        {
          id: 'opt-true',
          label: 'Benar — pergeseran sesar horizontal murni tidak dapat memindahkan air laut secara vertikal.',
        },
        {
          id: 'opt-false',
          label: 'Salah — guncangan sesar geser dapat memicu longsoran sedimen bawah laut sekunder dan runtuhan likuefaksi pesisir ke dalam teluk, membangkitkan gelombang tsunami lokal yang mematikan.',
          isCorrect: true,
        },
      ],
      correctAnswer: 'opt-false',
      explanation: 'Meskipun sesar geser murni biasanya tidak menghasilkan tsunami samudra terbuka yang besar melalui perpindahan dasar laut vertikal, peristiwa Palu 2018 membuktikan bahwa guncangan hebat dapat memicu longsoran bawah laut sekunder yang masif dan runtuhnya garis pantai di teluk sempit (Teluk Palu), menciptakan gelombang tsunami lokal yang merusak hanya dalam hitungan menit.',
      relatedConceptSlug: 'subduction',
    },
    {
      id: 'q3-fault-matching',
      type: 'single-choice',
      prompt: 'Tipe batas sesar manakah yang diwakili oleh Sesar Palu-Koro di Sulawesi dan Sesar Besar Sumatra (Great Sumatran Fault)?',
      contextNarrative: 'Analisis pergerakan relatif blok kerak di sepanjang zona sesar aktif utama di Indonesia ini.',
      options: [
        {
          id: 'opt-convergent',
          label: 'Batas Megathrust Konvergen (satu lempeng menindih lempeng lain secara vertikal).',
        },
        {
          id: 'opt-transform',
          label: 'Sesar Geser / Mendatar (Transform / Strike-Slip) (blok kerak bergeser secara horizontal melewati satu sama lain).',
          isCorrect: true,
        },
        {
          id: 'opt-divergent',
          label: 'Lembah Retakan Divergen (lempeng saling menjauh disertai ekstrusi basal dasar laut).',
        },
        {
          id: 'opt-subduction',
          label: 'Palung Subduksi Samudra.',
        },
      ],
      correctAnswer: 'opt-transform',
      explanation: 'Sesar Palu-Koro adalah sesar geser (mendatar) aktif yang bergerak mengiri (sinistral) dengan laju pergeseran yang luar biasa sekitar 7 cm/tahun. Sesar Besar Sumatra adalah sistem sesar mendatar menganan (dekstral) utama lainnya yang mengakomodasi konvergensi miring di sepanjang tulang punggung Pulau Sumatra.',
      relatedConceptSlug: 'plate-tectonics-process',
    },
    {
      id: 'q4-slip-accumulation',
      type: 'single-choice',
      prompt: 'Jika Sesar Palu-Koro mengakomodasi laju pergeseran rata-rata ~7 cm per tahun, kira-kira berapa potensi pergeseran kumulatif yang terkumpul di zona sesar yang terkunci selama 100 tahun?',
      contextNarrative: 'Catatan: Ini mewakili akumulasi gerakan tektonik jangka panjang, bukan semata-mata pergeseran pasti dalam satu peristiwa tunggal.',
      options: [
        {
          id: 'opt-70cm',
          label: '0,7 meter (70 cm)',
        },
        {
          id: 'opt-7m',
          label: '7 meter (700 cm)',
          isCorrect: true,
        },
        {
          id: 'opt-70m',
          label: '70 meter (7.000 cm)',
        },
        {
          id: 'opt-0',
          label: '0 meter (tegasan hilang begitu saja menjadi panas tanpa hambatan)',
        },
      ],
      correctAnswer: 'opt-7m',
      explanation: 'Pada laju 7 cm/tahun, 100 tahun pergerakan yang terkunci mengakumulasi sekitar 700 cm (7 meter) potensi pergeseran slip. Dalam robekan sesar geser besar, beberapa meter pergeseran horizontal mendadak dapat dilepaskan di sepanjang jejak permukaan hanya dalam beberapa detik.',
      relatedConceptSlug: 'plate-tectonics-process',
    },
  ],
};
