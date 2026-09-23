import type { Quiz } from '../../../types/quiz';

export const whyVolcanoesFormQuizId: Quiz = {
  id: 'quiz-why-volcanoes-form',
  experienceSlug: 'why-volcanoes-form',
  title: 'Mengapa Gunung Api Terbentuk? Evaluasi Konseptual',
  description: 'Uji pemahaman konseptual Anda tentang dinamika subduksi, mekanisme pelelehan mantel (flux melting), dan pembentukan busur vulkanik.',
  passingScore: 70,
  questions: [
    {
      id: 'q1-melting-mechanism',
      type: 'single-choice',
      prompt: 'Apakah mekanisme fisik utama yang menghasilkan magma pada zona subduksi samudra-benua seperti di Palung Jawa?',
      contextNarrative: 'Pertimbangkan temperatur dan kondisi baji mantel (mantle wedge) di atas lempeng samudra yang menunjam.',
      options: [
        {
          id: 'opt-friction',
          label: 'Pemanasan gesekan di sepanjang bidang sesar melelehkan kedua lempeng secara total menjadi lava cair.',
        },
        {
          id: 'opt-flux-melting',
          label: 'Pelelehan fluks (flux melting): Air dan fluida hidrous yang dilepaskan lempeng yang menunjam menurunkan titik leleh batuan baji mantel yang panas.',
          isCorrect: true,
        },
        {
          id: 'opt-decompression',
          label: 'Pelelehan dekompresi: Lempeng yang menunjam mengembang karena tekanan turun mendadak.',
        },
        {
          id: 'opt-core-heat',
          label: 'Pluma besi cair yang memancar langsung ke atas dari inti luar Bumi.',
        },
      ],
      correctAnswer: 'opt-flux-melting',
      explanation: 'Pada zona subduksi, pemicu utamanya adalah pelelehan fluks (flux melting / pelelehan hidrasi). Lempeng samudra membawa air yang terikat dalam mineral hidrous (seperti serpentinit dan lempung). Saat kedalaman melampaui ~100 km, mineral ini terdehidrasi, melepaskan air superkritis ke baji mantel astenosfer di atasnya. Penambahan air ini memutuskan ikatan silikat dan menurunkan titik leleh peridotit hingga ratusan derajat Celsius, menghasilkan magma tanpa memerlukan kenaikan temperatur.',
      relatedConceptSlug: 'subduction',
      nextExplorationSlug: 'plate-tectonics-process',
    },
    {
      id: 'q2-volcanic-arc-offset',
      type: 'single-choice',
      prompt: 'Mengapa jajaran gunung api di Pulau Jawa berjarak 200 hingga 300 kilometer di utara palung laut tempat lempeng bertubrukan?',
      contextNarrative: 'Amati geometri sudut penunjaman lempeng Indo-Australia di bawah Pulau Jawa.',
      options: [
        {
          id: 'opt-random',
          label: 'Gunung api terbentuk secara acak di mana pun kerak benua kebetulan tipis.',
        },
        {
          id: 'opt-depth-threshold',
          label: 'Lempeng samudra harus menunjam hingga kedalaman kritis 100–150 km sebelum tekanan dan suhu cukup tinggi untuk melepaskan fluida pembuat magma.',
          isCorrect: true,
        },
        {
          id: 'opt-wind',
          label: 'Angin pasat samudra mendorong pluma magma ratusan kilometer ke arah timur.',
        },
        {
          id: 'opt-sea-level',
          label: 'Gunung api tidak bisa muncul di bawah laut karena tekanan hidrostatik air yang terlalu besar.',
        },
      ],
      correctAnswer: 'opt-depth-threshold',
      explanation: 'Lempeng samudra menunjam dengan sudut kemiringan tertentu (biasanya 30°–60°). Lempeng tersebut harus bergerak ratusan kilometer secara lateral ke bawah hingga mencapai kedalaman ~100–150 km agar kondisi tekanan-suhu memicu dehidrasi metamorfik. Karena fluida baru lepas pada kedalaman kritis ini, magma yang terbentuk naik vertikal membentuk jajaran busur vulkanik yang berjarak teratur dari palung.',
      relatedConceptSlug: 'volcanic-arcs',
    },
    {
      id: 'q3-andesite-composition',
      type: 'multiple-choice',
      prompt: 'Proses mana sajakah yang membuat lava busur vulkanik (seperti Gunung Merapi) jauh lebih eksplosif dibandingkan lava gunung api perisai di Hawaii? (Pilih semua yang benar)',
      options: [
        {
          id: 'opt-silica',
          label: 'Kandungan silika (SiO₂) yang tinggi dan kristalisasi fraksional meningkatkan viskositas (kekentalan) magma, menjebak gas vulkanik bertekanan tinggi.',
          isCorrect: true,
        },
        {
          id: 'opt-volatiles',
          label: 'Fluida dari proses subduksi menyuplai konsentrasi tinggi air terlarut dan karbon dioksida yang memuai dahsyat saat naik ke permukaan.',
          isCorrect: true,
        },
        {
          id: 'opt-basalt-fluid',
          label: 'Lava busur kepulauan adalah basal ultra-encer yang membuat gas keluar dengan lancar tanpa tekanan.',
          isCorrect: false,
        },
        {
          id: 'opt-crust-assimilation',
          label: 'Kantung magma tertahan di kerak benua, melelehkan dan mengasimilasi batuan samping yang kaya silika.',
          isCorrect: true,
        },
      ],
      correctAnswer: ['opt-silica', 'opt-volatiles', 'opt-crust-assimilation'],
      explanation: 'Stratovulkan zona subduksi seperti Merapi menghasilkan magma intermediet (andesit hingga dasit). Kandungan silika tinggi (~55–65% SiO₂) membentuk rantai polimer silikat yang membuat magma sangat kental (viskos). Pada saat yang sama, gas terlarut (H₂O dan CO₂) yang terperangkap memuai secara eksplosif ketika magma mendekati permukaan, memicu fragmentasi dahsyat dan awan panas guguran (pyroclastic density currents / wedhus gembel).',
      relatedConceptSlug: 'volcanic-arcs',
    },
    {
      id: 'q4-stages-ordering',
      type: 'ordering',
      prompt: 'Urutkan tahapan pembentukan gunung api subduksi secara kronologis, dari yang paling awal (atas) hingga paling akhir (bawah):',
      orderingItems: [
        { id: 'step-subduct', label: 'Litosfer samudra menunjam ke astenosfer pada batas konvergen', correctOrder: 0 },
        { id: 'step-dehydrate', label: 'Mineral hidrous terurai akibat tekanan tinggi, melepaskan air ke baji mantel', correctOrder: 1 },
        { id: 'step-partial-melt', label: 'Pelelehan fluks menghasilkan diapir magma basal-andesitik yang lebih ringan dan mengapung', correctOrder: 2 },
        { id: 'step-ascend', label: 'Magma naik menembus kerak, berkumpul dan berdiferensiasi di kantung magma dangkal', correctOrder: 3 },
        { id: 'step-erupt', label: 'Tekanan gas berlebih memicu letusan eksplosif dan pertumbuhan kubah lava', correctOrder: 4 },
      ],
      correctAnswer: ['step-subduct', 'step-dehydrate', 'step-partial-melt', 'step-ascend', 'step-erupt'],
      explanation: 'Proses diawali oleh konvergensi lempeng tektonik yang mendorong litosfer samudra ke kedalaman. Dehidrasi metamorfik terjadi saat tekanan melampaui 3 GPa (~100 km). Fluida memicu pelelehan fluks peridotit mantel. Magma yang terbentuk naik secara gravitasi karena densitasnya lebih rendah, mengalami diferensiasi di kerak, dan berpuncak pada erupsi di permukaan.',
      relatedConceptSlug: 'plate-tectonics-process',
    },
    {
      id: 'q5-boundary-matching',
      type: 'matching',
      prompt: 'Pasangkan setiap jenis batas lempeng dengan fenomena geologis khasnya:',
      matchingPairs: [
        {
          id: 'pair-subduction',
          left: 'Subduksi Samudra-Benua (Palung Jawa)',
          right: 'Palung dalam, zona seismik Wadati-Benioff, busur stratovulkan eksplosif',
        },
        {
          id: 'pair-divergent',
          left: 'Punggung Tengah Samudra (Atlantik)',
          right: 'Pelelehan dekompresi, lembah retakan (rift), basal bantal efusif',
        },
        {
          id: 'pair-transform',
          left: 'Sesar Transform / Mendatar (Sesar Besar Sumatra)',
          right: 'Pergeseran geser mendatar, gempa dangkal, tanpa vulkanisme dalam',
        },
      ],
      correctAnswer: {
        'pair-subduction': 'Palung dalam, zona seismik Wadati-Benioff, busur stratovulkan eksplosif',
        'pair-divergent': 'Pelelehan dekompresi, lembah retakan (rift), basal bantal efusif',
        'pair-transform': 'Pergeseran geser mendatar, gempa dangkal, tanpa vulkanisme dalam',
      },
      explanation: 'Setiap batas tektonik menghasilkan fenomena fisik yang unik: subduksi menciptakan palung dan busur vulkanik eksplosif via pelelehan fluks; batas divergen menciptakan pemekaran samudra via pelelehan dekompresi; dan sesar mendatar menghasilkan pergeseran lateral tanpa pelelehan dalam.',
      relatedConceptSlug: 'plate-tectonics-process',
    },
    {
      id: 'q6-indonesia-geotectonics',
      type: 'true-false',
      prompt: 'Benar atau Salah: Indonesia memiliki gunung api aktif terbanyak di dunia terutama karena posisinya di pertemuan tiga lempeng tektonik besar (Lempeng Indo-Australia, Eurasia/Sunda, dan Pasifik).',
      options: [
        { id: 'true', label: 'Benar' },
        { id: 'false', label: 'Salah' },
      ],
      correctAnswer: 'true',
      explanation: 'Benar. Indonesia merupakan salah satu kawasan paling aktif secara vulkanik dan seismik karena letak tektoniknya. Lempeng Indo-Australia menunjam ke utara di bawah Lempeng Sunda sepanjang Busur Sunda sepanjang 5.000 km, sementara Lempeng Pasifik dan Laut Filipina menekan dari timur, memicu pelelehan fluks intensif di bawah kepulauan ini.',
      relatedConceptSlug: 'volcanic-arcs',
    },
  ],
};
