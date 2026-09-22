import type { Quiz } from '../../types/quiz';

export const whyVolcanoesFormQuiz: Quiz = {
  id: 'quiz-why-volcanoes-form',
  experienceSlug: 'why-volcanoes-form',
  title: 'Why Do Volcanoes Form? Conceptual Verification',
  description: 'Assess your conceptual grasp of subduction dynamics, mantle melting mechanisms, and volcanic arc genesis.',
  passingScore: 70,
  questions: [
    {
      id: 'q1-melting-mechanism',
      type: 'single-choice',
      prompt: 'What is the primary physical mechanism that generates magma at oceanic-continental subduction zones like the Java Trench?',
      contextNarrative: 'Consider the temperature and state of the mantle wedge above the descending oceanic slab.',
      options: [
        {
          id: 'opt-friction',
          label: 'Frictional heating along the fault plane melts both plates completely into liquid lava.',
        },
        {
          id: 'opt-flux-melting',
          label: 'Flux melting: Water and hydrous fluids released from the sinking slab lower the melting point of the hot mantle wedge.',
          isCorrect: true,
        },
        {
          id: 'opt-decompression',
          label: 'Decompression melting: The sinking slab expands as pressure drops, causing rapid boiling.',
        },
        {
          id: 'opt-core-heat',
          label: 'Direct plumes of liquid iron surging directly upward from the outer core.',
        },
      ],
      correctAnswer: 'opt-flux-melting',
      explanation: 'At subduction zones, the key trigger is flux melting (hydration melting). The subducting oceanic plate carries water trapped in hydrous minerals (such as serpentinite and clays). As depth and pressure increase past ~100 km, these minerals break down, releasing supercritical water into the hot asthenospheric mantle wedge above. This lowers the peridotite melting temperature by hundreds of degrees, causing partial melting without needing an increase in temperature.',
      relatedConceptSlug: 'subduction',
      nextExplorationSlug: 'plate-tectonics-process',
    },
    {
      id: 'q2-volcanic-arc-offset',
      type: 'single-choice',
      prompt: 'Why are the volcanoes of Java located 200 to 300 kilometers inland from the offshore oceanic trench?',
      contextNarrative: 'Observe the geometry of the sinking Indo-Australian plate beneath the island of Java.',
      options: [
        {
          id: 'opt-random',
          label: 'Volcanoes form randomly across the continent wherever the crust happens to be thin.',
        },
        {
          id: 'opt-depth-threshold',
          label: 'The subducting slab must plunge to approximately 100–150 km depth before pressure and temperature release enough fluid to trigger mantle melting.',
          isCorrect: true,
        },
        {
          id: 'opt-wind',
          label: 'Oceanic trade winds push rising magma plumes hundreds of kilometers eastward.',
        },
        {
          id: 'opt-sea-level',
          label: 'Volcanoes cannot emerge underwater due to the immense hydrostatic pressure of the ocean.',
        },
      ],
      correctAnswer: 'opt-depth-threshold',
      explanation: 'The descending oceanic plate dips at an angle (typically 30°–60°). It must travel hundreds of kilometers horizontally while plunging to ~100–150 km depth before reaching the pressure-temperature conditions required for metamorphic dehydration. Because the slab only dehydrates once it reaches this critical depth, the resulting melt rises vertically to form a volcanic chain (volcanic arc) set back at a predictable distance from the subduction trench.',
      relatedConceptSlug: 'volcanic-arcs',
    },
    {
      id: 'q3-andesite-composition',
      type: 'multiple-choice',
      prompt: 'Which of the following processes contribute to making volcanic arc lavas (like those at Mount Merapi) far more explosive than Hawaiian shield volcano lavas? (Select all that apply)',
      options: [
        {
          id: 'opt-silica',
          label: 'High silica (SiO₂) content and fractional crystallization increase magma viscosity, trapping pressurized volcanic gases.',
          isCorrect: true,
        },
        {
          id: 'opt-volatiles',
          label: 'Subduction fluids supply high concentrations of dissolved water and carbon dioxide, which expand violently during ascent.',
          isCorrect: true,
        },
        {
          id: 'opt-basalt-fluid',
          label: 'Arc lavas are purely ultra-fluid liquid basalt that allows gases to escape smoothly without building pressure.',
          isCorrect: false,
        },
        {
          id: 'opt-crust-assimilation',
          label: 'Magma chambers stall in continental crust, melting and assimilating surrounding silica-rich country rocks.',
          isCorrect: true,
        },
      ],
      correctAnswer: ['opt-silica', 'opt-volatiles', 'opt-crust-assimilation'],
      explanation: 'Subduction-zone stratovolcanoes like Mount Merapi erupt intermediate to felsic magmas (primarily andesite and dacite). Higher silica content (~55-65% SiO₂) creates polymerized silicate chains, dramatically increasing viscosity. Simultaneously, the subduction process enriches magma with dissolved volatiles (H₂O and CO₂). When magma rises, these gases expand violently; because the viscous magma resists expansion, explosive pressure builds until catastrophic fragmentation or pyroclastic flow occurs.',
      relatedConceptSlug: 'volcanic-arcs',
    },
    {
      id: 'q4-stages-ordering',
      type: 'ordering',
      prompt: 'Arrange the sequence of volcanic genesis events in chronological order, from earliest (top) to latest (bottom):',
      orderingItems: [
        { id: 'step-subduct', label: 'Oceanic lithosphere sinks into the asthenosphere at a convergent boundary', correctOrder: 0 },
        { id: 'step-dehydrate', label: 'Hydrous minerals break down under high pressure, expelling water into the mantle wedge', correctOrder: 1 },
        { id: 'step-partial-melt', label: 'Flux melting creates buoyant, less-dense basaltic-andesitic magma diapirs', correctOrder: 2 },
        { id: 'step-ascend', label: 'Magma ascends through the crust, pooling and differentiating in shallow magma chambers', correctOrder: 3 },
        { id: 'step-erupt', label: 'Gas overpressure triggers explosive eruption and volcanic dome growth', correctOrder: 4 },
      ],
      correctAnswer: ['step-subduct', 'step-dehydrate', 'step-partial-melt', 'step-ascend', 'step-erupt'],
      explanation: 'The process starts with tectonic plate convergence, driving oceanic lithosphere downward. Metamorphic dehydration follows as pressure climbs past 3 GPa (~100 km). The released fluids induce flux melting of mantle peridotite. The resulting buoyant melt ascends gravitationally through the lithosphere, differentiates in crustal chambers, and culminates in surface eruptions.',
      relatedConceptSlug: 'plate-tectonics-process',
    },
    {
      id: 'q5-boundary-matching',
      type: 'matching',
      prompt: 'Match each plate boundary type with its distinctive geological signature:',
      matchingPairs: [
        {
          id: 'pair-subduction',
          left: 'Oceanic-Continental Subduction (Java Trench)',
          right: 'Deep trench, Wadati-Benioff seismic zone, explosive stratovolcanic arc',
        },
        {
          id: 'pair-divergent',
          left: 'Mid-Ocean Ridge (Mid-Atlantic)',
          right: 'Decompression melting, rift valley, effusive pillow basalts',
        },
        {
          id: 'pair-transform',
          left: 'Transform Fault (Great Sumatran Fault)',
          right: 'Horizontal strike-slip shearing, shallow earthquakes, no deep volcanism',
        },
      ],
      correctAnswer: {
        'pair-subduction': 'Deep trench, Wadati-Benioff seismic zone, explosive stratovolcanic arc',
        'pair-divergent': 'Decompression melting, rift valley, effusive pillow basalts',
        'pair-transform': 'Horizontal strike-slip shearing, shallow earthquakes, no deep volcanism',
      },
      explanation: 'Each tectonic boundary produces distinct physical phenomena: subduction creates deep trenches and explosive volcanic arcs via flux melting; divergent boundaries create mid-ocean ridges through decompression melting; and transform faults produce horizontal shear without melting.',
      relatedConceptSlug: 'plate-tectonics-process',
    },
    {
      id: 'q6-indonesia-geotectonics',
      type: 'true-false',
      prompt: 'True or False: Indonesia possesses more active volcanoes than almost any other country primarily because it sits at the triple junction of converging tectonic plates (Indo-Australian, Eurasian/Sunda, and Pacific plates).',
      options: [
        { id: 'true', label: 'True' },
        { id: 'false', label: 'False' },
      ],
      correctAnswer: 'true',
      explanation: 'True. Indonesia is one of the most volcanically and seismically active regions on Earth because of its unique geotectonic setting. The Indo-Australian Plate subducts northward beneath the Sunda Plate along the 5,000-km-long Sunda Arc (Sumatra, Java, Bali, Nusa Tenggara), while the Pacific and Philippine Sea plates converge from the east, driving intense subduction-related flux melting across the archipelago.',
      relatedConceptSlug: 'volcanic-arcs',
    },
  ],
};
