import type { Quiz } from '../../types/quiz';

export const whyDoLandslidesHappenQuiz: Quiz = {
  id: 'quiz-why-do-landslides-happen',
  experienceSlug: 'why-do-landslides-happen',
  title: 'Why Do Landslides Happen? Verification Quiz',
  description: 'Evaluate your knowledge of slope stability mechanics, rainfall saturation, pore-water pressure, and Indonesian landslide hazard factors.',
  passingScore: 70,
  questions: [
    {
      id: 'q1-rainfall-mechanism',
      type: 'single-choice',
      prompt: 'How does prolonged, intense rainfall trigger catastrophic slope failures and landslides?',
      contextNarrative: 'Think about what happens inside the pores and grain boundaries of hillside soil when water infiltrates.',
      options: [
        {
          id: 'opt-rain-mechanism',
          label: 'Rainwater infiltrates the soil, adding significant physical weight (gravitational load) while elevating pore-water pressure, which pushes soil grains apart and drastically reduces frictional shear resistance.',
          isCorrect: true,
        },
        {
          id: 'opt-cooling-only',
          label: 'Rain cools the bedrock until the mountain suddenly contracts and shatters instantly.',
        },
        {
          id: 'opt-chemical-evaporation',
          label: 'Rain rapidly dissolves 100% of the granite bedrock into gaseous steam.',
        },
        {
          id: 'opt-no-effect',
          label: 'Rain has zero mechanical effect on soil stability or slope friction.',
        },
      ],
      correctAnswer: 'opt-rain-mechanism',
      explanation: 'Water acts both as a driving load and a lubricating agent. As pore spaces between soil particles fill with water under positive hydraulic pressure, effective normal stress decreases, drastically lowering inter-particle friction along potential slip planes.',
      relatedConceptSlug: 'plate-tectonics-process',
    },
    {
      id: 'q2-earthquake-vs-rainfall-trigger',
      type: 'true-false',
      prompt: 'All landslides in Indonesia are directly caused by earthquake ground shaking.',
      contextNarrative: 'Examine the relationship between Indonesia\'s monsoonal wet seasons and recorded slope disaster events.',
      options: [
        {
          id: 'opt-true',
          label: 'True — slopes never fail under gravity unless triggered by seismic fault rupture.',
        },
        {
          id: 'opt-false',
          label: 'False — while strong earthquakes can trigger devastating liquefaction and co-seismic slides (e.g. Palu 2018), the overwhelming majority of Indonesian landslides are triggered by heavy seasonal monsoon rainfall saturating steep volcanic slopes.',
          isCorrect: true,
        },
      ],
      correctAnswer: 'opt-false',
      explanation: 'According to BNPB (Indonesian National Disaster Management Agency), rainfall is by far the most frequent trigger of landslides across Indonesia\'s volcanic and mountainous highlands, particularly between December and February. Seismic shaking is an important co-seismic trigger, but accounts for a much smaller fraction of total events.',
      relatedConceptSlug: 'plate-tectonics-process',
    },
    {
      id: 'q3-landslide-risk-factors',
      type: 'single-choice',
      prompt: 'Which combination of factors creates the HIGHEST hazard risk for catastrophic slope failure?',
      contextNarrative: 'Analyze topographical, geological, and anthropogenic variables affecting slope stability.',
      options: [
        {
          id: 'opt-high-risk-combo',
          label: 'Steep slope gradient (>30°), thick weathered volcanic soil, deforestation or deep-root removal, and heavy multi-day monsoon rainfall.',
          isCorrect: true,
        },
        {
          id: 'opt-low-risk-bedrock',
          label: 'Flat horizontal topography (0° gradient) situated on solid, unweathered basalt bedrock with dense native rainforest.',
        },
        {
          id: 'opt-dry-desert',
          label: 'Gentle 5° slope in an arid desert with zero precipitation and no groundwater.',
        },
        {
          id: 'opt-paved-highway-flat',
          label: 'Engineered flat concrete pavement on bedrock with zero incline.',
        },
      ],
      correctAnswer: 'opt-high-risk-combo',
      explanation: 'Steep topography increases the gravitational shear stress parallel to the slope. Thick, weathered tropical soils provide ample mobile material, while deforestation removes the root network (mechanical cohesion) and canopy interception, leaving the slope vulnerable to rapid saturation during heavy rains.',
      relatedConceptSlug: 'plate-tectonics-process',
    },
    {
      id: 'q4-factor-of-safety',
      type: 'single-choice',
      prompt: 'In geotechnical engineering and geomorphology, when does a hillside slope experience failure (a landslide)?',
      contextNarrative: 'Consider the ratio known as the Factor of Safety (resisting forces divided by driving forces).',
      options: [
        {
          id: 'opt-failure-condition',
          label: 'When the gravitational shear driving stress exceeds the maximum shear strength (resisting friction and cohesion) of the slope material (Factor of Safety < 1.0).',
          isCorrect: true,
        },
        {
          id: 'opt-safety-high',
          label: 'When resisting forces are twice as strong as driving forces (Factor of Safety > 2.0).',
        },
        {
          id: 'opt-moon-alignment',
          label: 'Only during a total lunar eclipse.',
        },
        {
          id: 'opt-humidity-zero',
          label: 'When relative humidity in the air drops to 0%.',
        },
      ],
      correctAnswer: 'opt-failure-condition',
      explanation: 'A slope is stable as long as the resisting forces (shear strength from internal friction and cohesion) exceed the driving forces (shear stress from gravity). When triggers like heavy rainfall or seismic acceleration push the Factor of Safety below 1.0, failure occurs.',
      relatedConceptSlug: 'plate-tectonics-process',
    },
  ],
};
