import type { Quiz } from '../../types/quiz';

export const whyDoEarthquakesHappenQuiz: Quiz = {
  id: 'quiz-why-do-earthquakes-happen',
  experienceSlug: 'why-do-earthquakes-happen',
  title: 'Why Do Earthquakes Happen? Verification Quiz',
  description: 'Evaluate your understanding of elastic rebound, fault kinematics, and the 2018 Palu earthquake mechanism.',
  passingScore: 70,
  questions: [
    {
      id: 'q1-elastic-rebound',
      type: 'single-choice',
      prompt: 'What is "elastic rebound" in the context of earthquake genesis?',
      contextNarrative: 'Consider how tectonic plates accumulate physical strain over decades or centuries before an earthquake occurs.',
      options: [
        {
          id: 'opt-new-fault',
          label: 'A brand-new fault plane is created in previously unfractured rock each time an earthquake happens.',
        },
        {
          id: 'opt-strain-release',
          label: 'Frictionally locked rock slowly bends and stores elastic strain energy under tectonic stress, then suddenly ruptures and snaps back to release energy as seismic waves.',
          isCorrect: true,
        },
        {
          id: 'opt-magma-pressure',
          label: 'Molten magma chambers expand until gas pressure explodes outward into the air.',
        },
        {
          id: 'opt-ocean-tides',
          label: 'Gravitational tidal pulling from the moon forces tectonic plates apart on a daily cycle.',
        },
      ],
      correctAnswer: 'opt-strain-release',
      explanation: 'Elastic rebound theory explains that tectonic forces continuously push on locked fault surfaces. The rocks on either side deform elastically like a drawn bowstring. When accumulated stress exceeds frictional resistance, sudden brittle failure occurs—releasing stored elastic energy as propagating seismic shockwaves.',
      relatedConceptSlug: 'plate-tectonics-process',
    },
    {
      id: 'q2-palu-tsunami',
      type: 'true-false',
      prompt: 'Strike-slip (transform) faults can never trigger a tsunami under any circumstances.',
      contextNarrative: 'Reflect on the anomalous tsunami observed during the 2018 Mw 7.5 Palu-Koro earthquake in Central Sulawesi.',
      options: [
        {
          id: 'opt-true',
          label: 'True — pure horizontal fault slip cannot displace water vertically.',
        },
        {
          id: 'opt-false',
          label: 'False — strike-slip shaking can trigger secondary submarine sediment landslides and coastal liquefaction collapses into bays, generating deadly local tsunami waves.',
          isCorrect: true,
        },
      ],
      correctAnswer: 'opt-false',
      explanation: 'While pure strike-slip faults typically do not generate major open-ocean tsunamis via vertical seafloor displacement, the 2018 Palu event proved that intense shaking can trigger catastrophic secondary submarine landslides and coastal collapse within confined bays (Palu Bay), creating destructive localized tsunami waves within minutes.',
      relatedConceptSlug: 'subduction',
    },
    {
      id: 'q3-fault-matching',
      type: 'single-choice',
      prompt: 'Which fault boundary type is represented by the Palu-Koro Fault in Sulawesi and the Great Sumatran Fault?',
      contextNarrative: 'Analyze the relative motion of the crustal blocks along these major active Indonesian fault zones.',
      options: [
        {
          id: 'opt-convergent',
          label: 'Convergent Megathrust Boundary (one plate overriding another vertically).',
        },
        {
          id: 'opt-transform',
          label: 'Transform / Strike-Slip Fault (crustal blocks sliding horizontally past each other).',
          isCorrect: true,
        },
        {
          id: 'opt-divergent',
          label: 'Divergent Rift Valley (plates pulling apart with seafloor basalt extrusion).',
        },
        {
          id: 'opt-subduction',
          label: 'Oceanic Subduction Trench.',
        },
      ],
      correctAnswer: 'opt-transform',
      explanation: 'The Palu-Koro Fault is an active strike-slip (transform) fault moving left-laterally at an exceptional rate of approximately 7 cm/year. The Great Sumatran Fault is another major right-lateral strike-slip system accommodating oblique convergence along the spine of Sumatra.',
      relatedConceptSlug: 'plate-tectonics-process',
    },
    {
      id: 'q4-slip-accumulation',
      type: 'single-choice',
      prompt: 'If the Palu-Koro Fault accommodates an average slip rate of ~7 cm per year, roughly how much cumulative displacement potential builds up across the locked fault zone over 100 years?',
      contextNarrative: 'Note: This represents long-term accumulated tectonic motion, not necessarily the exact slip in a single event.',
      options: [
        {
          id: 'opt-70cm',
          label: '0.7 meters (70 cm)',
        },
        {
          id: 'opt-7m',
          label: '7 meters (700 cm)',
          isCorrect: true,
        },
        {
          id: 'opt-70m',
          label: '70 meters (7,000 cm)',
        },
        {
          id: 'opt-0',
          label: '0 meters (stress dissipates harmlessly into heat)',
        },
      ],
      correctAnswer: 'opt-7m',
      explanation: 'At 7 cm/year, 100 years of locked motion accumulates approximately 700 cm (7 meters) of potential slip displacement. In major strike-slip ruptures, several meters of sudden horizontal offset can be released along the surface trace in just a few seconds.',
      relatedConceptSlug: 'plate-tectonics-process',
    },
  ],
};
