import type { Quiz } from '../../types/quiz';

export const howRainFormsQuiz: Quiz = {
  id: 'quiz-how-rain-forms',
  experienceSlug: 'how-rain-forms',
  title: 'How Does Rain Form? Atmospheric Physics Quiz',
  description: 'Test your understanding of vapor saturation, adiabatic cooling, condensation nuclei, and tropical precipitation dynamics.',
  passingScore: 70,
  questions: [
    {
      id: 'q1-cooling-mechanism',
      type: 'single-choice',
      prompt: 'Why does ascending air cool down as it rises into the troposphere?',
      options: [
        {
          id: 'opt-space-cold',
          label: 'Because outer space is freezing and chills the upper atmosphere directly.',
        },
        {
          id: 'opt-adiabatic-expansion',
          label: 'Adiabatic expansion: Surrounding atmospheric pressure decreases with altitude, causing the air parcel to expand and do work, which consumes thermal kinetic energy.',
          isCorrect: true,
        },
        {
          id: 'opt-friction-loss',
          label: 'Air loses friction as it moves away from the rough ground surface.',
        },
        {
          id: 'opt-sunlight-loss',
          label: 'Air molecules block sunlight from warming the parcel as it ascends.',
        },
      ],
      correctAnswer: 'opt-adiabatic-expansion',
      explanation: 'As an air parcel rises, external atmospheric pressure drops with height. The parcel expands into the lower pressure environment. To expand, the gas molecules push outward against surrounding air, performing mechanical work. This work consumes thermal kinetic energy from within the parcel, causing its temperature to decline without any heat exchange with surrounding air (adiabatic cooling). Dry air cools at ~9.8°C/km (dry adiabatic lapse rate), and moist air cools at ~5–6°C/km once condensation begins releasing latent heat.',
      relatedConceptSlug: 'condensation',
    },
    {
      id: 'q2-nuclei-role',
      type: 'single-choice',
      prompt: 'What happens if atmospheric air becomes 100% humid (supersaturated) in a hypothetical environment completely devoid of aerosols or particles?',
      options: [
        {
          id: 'opt-instant-rain',
          label: 'Water vapor condenses immediately into torrential rainfall.',
        },
        {
          id: 'opt-no-condensation',
          label: 'Water vapor cannot easily condense into liquid droplets because it lacks condensation nuclei to overcome high surface-tension energy barriers.',
          isCorrect: true,
        },
        {
          id: 'opt-freezing',
          label: 'The water vapor instantly sublimates into giant ice crystals.',
        },
      ],
      correctAnswer: 'opt-no-condensation',
      explanation: 'Water vapor requires microscopic airborne particles (cloud condensation nuclei, or CCN)—such as sea salt spray, mineral dust, volcanic sulfate aerosols, or organic pollen—to condense at modest relative humidities near 100%. Without CCN (homogeneous nucleation), water vapor requires extreme supersaturation (over 400% relative humidity) to form liquid water because very tiny proto-droplets experience immense surface tension that causes them to evaporate almost instantly.',
      relatedConceptSlug: 'condensation',
    },
    {
      id: 'q3-orographic-precipitation',
      type: 'multiple-choice',
      prompt: 'Why does Bogor, West Java receive over 4,000 mm of annual rainfall, earning its title as Indonesia’s "City of Rain"? (Select all that apply)',
      options: [
        {
          id: 'opt-orographic-lift',
          label: 'Moist oceanic air blown across the Java Sea is forced upward by the slopes of Mount Salak and Mount Gede-Pangrango (orographic lifting).',
          isCorrect: true,
        },
        {
          id: 'opt-convective-heating',
          label: 'Intense equatorial daytime solar heating drives rapid diurnal convective updrafts every afternoon.',
          isCorrect: true,
        },
        {
          id: 'opt-subduction-steam',
          label: 'Magma from deep subduction trenches constantly boils surface groundwater into instant rain clouds.',
          isCorrect: false,
        },
        {
          id: 'opt-sea-salt-ccn',
          label: 'Abundant maritime sea spray and volcanic particles act as efficient cloud condensation nuclei.',
          isCorrect: true,
        },
      ],
      correctAnswer: ['opt-orographic-lift', 'opt-convective-heating', 'opt-sea-salt-ccn'],
      explanation: 'Bogor’s extreme rainfall is an ideal case study of combined orographic lifting and equatorial convection. Warm, moisture-saturated air from the Java Sea travels inland and encounters the steep volcanic topography of Mount Salak and Mount Pangrango. Forced upward, the air cools adiabatically past its dew point. Afternoon solar insolation supercharges this with convection, generating intense localized cumulonimbus storm clouds almost daily.',
      relatedConceptSlug: 'atmospheric-pressure',
    },
    {
      id: 'q4-droplet-coalescence',
      type: 'ordering',
      prompt: 'Order the life stages of cloud water from invisible gas to falling rain droplet:',
      orderingItems: [
        { id: 's1-evap', label: 'Solar energy evaporates surface water into invisible water vapor gas', correctOrder: 0 },
        { id: 's2-lift', label: 'Air parcel ascends and expands adiabatically until relative humidity reaches 100%', correctOrder: 1 },
        { id: 's3-ccn', label: 'Vapor condenses onto microscopic aerosols (CCN) forming cloud droplets (~20 μm)', correctOrder: 2 },
        { id: 's4-collide', label: 'Collision-coalescence: larger falling droplets sweep up smaller droplets, growing to >2 mm', correctOrder: 3 },
        { id: 's5-fall', label: 'Droplet terminal velocity exceeds the cloud updraft velocity, falling as precipitation', correctOrder: 4 },
      ],
      correctAnswer: ['s1-evap', 's2-lift', 's3-ccn', 's4-collide', 's5-fall'],
      explanation: 'The rain formation sequence progresses from phase transition (evaporation), transport and adiabatic cooling, nucleated condensation into micro-droplets, mechanical collision-coalescence, to gravitational fall when terminal velocity overcomes the rising air updraft.',
      relatedConceptSlug: 'condensation',
    },
  ],
};
