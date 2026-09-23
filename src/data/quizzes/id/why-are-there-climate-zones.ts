import type { Quiz } from '../../../types/quiz';

export const whyAreThereClimateZonesQuiz: Quiz = {
  id: 'quiz-why-are-there-climate-zones',
  experienceSlug: 'why-are-there-climate-zones',
  title: 'Mengapa Ada Zona Iklim? Kuis Verifikasi',
  description: 'Nilai pemahaman Anda tentang geometri insolasi matahari, pemanasan khatulistiwa, zona iklim, dan pola musiman tropis.',
  passingScore: 70,
  questions: [
    {
      id: 'q1-solar-insolation-geometry',
      type: 'single-choice',
      prompt: 'Mengapa wilayah kutub menerima energi panas matahari per meter persegi yang jauh lebih sedikit dibandingkan wilayah khatulistiwa?',
      contextNarrative: 'Pikirkan geometri radiasi sinar matahari paralel yang menyinari permukaan lengkung bola Bumi.',
      options: [
        {
          id: 'opt-distance-misconception',
          label: 'Karena kutub berjarak jutaan kilometer lebih jauh dari Matahari dibandingkan khatulistiwa.',
        },
        {
          id: 'opt-beam-spreading',
          label: 'Karena sinar matahari mengenai permukaan melengkung di dekat kutub pada sudut miring yang dangkal, menyebarkan jumlah energi matahari yang sama ke area permukaan yang jauh lebih luas dan menembus atmosfer yang lebih tebal.',
          isCorrect: true,
        },
        {
          id: 'opt-ozone-blocking',
          label: 'Karena ozon kutub memantulkan 100% sinar matahari kembali ke luar angkasa secara permanen.',
        },
        {
          id: 'opt-core-heat',
          label: 'Karena inti panas Bumi hanya memancarkan panas keluar melalui khatulistiwa dan tidak pernah melalui kutub.',
        },
      ],
      correctAnswer: 'opt-beam-spreading',
      explanation: 'Miskonsepsi mendasar adalah anggapan bahwa kutub dingin karena lebih jauh dari Matahari. Pada kenyataannya, perbedaan jarak tersebut dapat diabaikan. Karena Bumi bulat, sinar matahari mengenai khatulistiwa hampir tegak lurus (memusatkan energi pada tapak sempit), sedangkan pada lintang tinggi berkas sinar yang sama mengenai secara miring, menyebarkan fluks energinya ke area yang lebih luas dan kehilangan lebih banyak energi melalui jalur atmosfer yang lebih panjang.',
      relatedConceptSlug: 'atmospheric-pressure',
    },
    {
      id: 'q2-indonesia-seasons',
      type: 'true-false',
      prompt: 'Seperti negara beriklim sedang di Eropa atau Amerika Utara, Indonesia yang berada di khatulistiwa mengalami empat musim termal yang berbeda (semi, panas, gugur, dan dingin).',
      contextNarrative: 'Pertimbangkan variasi tahunan sudut matahari dan panjang siang hari di sepanjang khatulistiwa.',
      options: [
        {
          id: 'opt-true',
          label: 'Benar — setiap negara di Bumi mengalami siklus empat musim suhu yang berbeda setiap tahun.',
        },
        {
          id: 'opt-false',
          label: 'Salah — di dekat lintang 0°, insolasi matahari yang tinggi dan panjang siang hari ~12 jam tetap konsisten sepanjang tahun; variasi musiman ditentukan oleh presipitasi monsun (musim hujan dan kemarau) daripada fluktuasi suhu.',
          isCorrect: true,
        },
      ],
      correctAnswer: 'opt-false',
      explanation: 'Karena Indonesia terletak tepat di sepanjang khatulistiwa (antara ~6°LU dan 11°LS), ketinggian matahari di tengah hari tetap tinggi sepanjang 12 bulan, mempertahankan suhu rata-rata yang hangat (26–28°C) sepanjang tahun. Musim diatur oleh pergeseran sistem angin monsun yang menyebabkan periode basah (hujan) dan kering (kemarau), bukan musim dingin atau musim gugur termal.',
      relatedConceptSlug: 'atmospheric-pressure',
    },
    {
      id: 'q3-climate-zones-matching',
      type: 'single-choice',
      prompt: 'Pita lintang manakah yang secara tepat mendefinisikan Zona Iklim Tropis di Bumi?',
      contextNarrative: 'Identifikasi batas geografis tempat Matahari dapat melintas tepat di atas kepala saat tengah hari surya.',
      options: [
        {
          id: 'opt-tropical-bounds',
          label: 'Antara Garis Balik Utara / Tropic of Cancer (23,5°LU) dan Garis Balik Selatan / Tropic of Capricorn (23,5°LS), berpusat di Khatulistiwa (0°).',
          isCorrect: true,
        },
        {
          id: 'opt-temperate-bounds',
          label: 'Antara 66,5°LU dan 90°LU (Lingkar Arktik hingga Kutub Utara).',
        },
        {
          id: 'opt-polar-bounds',
          label: 'Tepat di antara 45°LU dan 60°LU.',
        },
        {
          id: 'opt-random-bounds',
          label: 'Wilayah mana pun yang terletak di atas ketinggian 3.000 meter terlepas dari garis lintangnya.',
        },
      ],
      correctAnswer: 'opt-tropical-bounds',
      explanation: 'Wilayah Tropis membentang dari 23,5°LU hingga 23,5°LS. Di dalam sabuk ini, sinar matahari jatuh hampir vertikal sepanjang tahun, menghasilkan rata-rata insolasi tahunan tertinggi dan membentuk zona iklim terhangat di Bumi.',
      relatedConceptSlug: 'atmospheric-pressure',
    },
    {
      id: 'q4-climate-vs-weather',
      type: 'single-choice',
      prompt: 'Apa perbedaan ilmiah utama antara "cuaca" dan "iklim"?',
      contextNarrative: 'Bedakan antara variabilitas atmosfer harian jangka pendek dan tren statistik jangka panjang.',
      options: [
        {
          id: 'opt-weather-vs-climate',
          label: 'Cuaca menggambarkan kondisi atmosfer jangka pendek dari hari ke hari (misalnya badai petir hari ini di Jakarta), sedangkan iklim menggambarkan pola statistik jangka panjang dan rata-rata cuaca selama beberapa dekade (biasanya 30+ tahun).',
          isCorrect: true,
        },
        {
          id: 'opt-opposite',
          label: 'Iklim menggambarkan curah hujan hari ini, sedangkan cuaca adalah rata-rata 30 tahun.',
        },
        {
          id: 'opt-altitude',
          label: 'Cuaca hanya terjadi di stratosfer, sedangkan iklim terbatas pada dasar samudra.',
        },
        {
          id: 'opt-predictability',
          label: 'Iklim berubah setiap jam, sedangkan cuaca tetap konstan selama berabad-abad.',
        },
      ],
      correctAnswer: 'opt-weather-vs-climate',
      explanation: '"Iklim adalah apa yang Anda harapkan; cuaca adalah apa yang Anda dapatkan." Cuaca mewakili dinamika atmosfer sesaat atau harian, sedangkan iklim mencirikan garis dasar statistik, variabilitas, dan norma musiman yang dihimpun selama periode referensi klimatologis standar 30 tahun.',
      relatedConceptSlug: 'atmospheric-pressure',
    },
  ],
};
