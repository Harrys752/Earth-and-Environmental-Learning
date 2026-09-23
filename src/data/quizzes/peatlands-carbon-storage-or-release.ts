import type { Quiz } from '../../types/quiz';

export const peatlandsCarbonStorageOrReleaseQuiz: Quiz = {
  id: 'quiz-peatlands-carbon-storage-or-release',
  experienceSlug: 'peatlands-carbon-storage-or-release',
  title: "Peatland Carbon Dynamics & 2015 Crisis Verification Quiz",
  description: 'Evaluate your understanding of peatland water tables, drainage flammability, underground smoldering fires, and emissions from the 2015 Indonesian fire crisis.',
  passingScore: 70,
  questions: [
    {
      id: 'q1-flammability-cause',
      type: 'single-choice',
      prompt: 'Why does artificially draining a tropical peatland with canals cause it to become extremely flammable and fire-prone?',
      contextNarrative: 'Consider what happens to organic matter when the protective water table drops.',
      options: [
        {
          id: 'opt-chemical-spray',
          label: 'Drainage canals spray flammable petroleum onto the soil.',
        },
        {
          id: 'opt-drainage-aeration',
          label: 'Draining drops the water table, exposing meters-thick prehistoric organic plant matter to atmospheric oxygen and drying it into ready-to-burn fuel.',
          isCorrect: true,
        },
        {
          id: 'opt-lightning-attraction',
          label: 'Canals attract lightning strikes from clouds.',
        },
        {
          id: 'opt-soil-freezing',
          label: 'Dry peat freezes and shatters into explosive shards.',
        },
      ],
      correctAnswer: 'opt-drainage-aeration',
      explanation: 'Intact peat is 90% water by weight and cannot burn. When artificial drainage canals lower the water table, the spongy organic peat dries out. Atmospheric oxygen infiltrates the pore spaces, transforming the carbon-rich soil into highly flammable tinder.',
      relatedConceptSlug: 'atmospheric-pressure',
    },
    {
      id: 'q2-extinguishing-difficulty',
      type: 'true-false',
      prompt: 'Peatland fires are typically easier and faster to extinguish than ordinary surface grass fires.',
      contextNarrative: 'Recall the subsurface smoldering behavior of peat fires.',
      options: [
        {
          id: 'opt-true',
          label: 'True — peat fires remain strictly on the top surface and extinguish with light rain.',
        },
        {
          id: 'opt-false',
          label: 'False — peat fires smolder meters deep underground in an oxygen-deprived glow, creeping unnoticed for weeks and resisting surface water drops.',
          isCorrect: true,
        },
      ],
      correctAnswer: 'opt-false',
      explanation: 'Peat fires burn through subsurface smoldering combustion. The fire creeps underground along dry root channels and peat seams, creating dangerous subterranean voids and emitting toxic smoke for weeks despite surface rainfall.',
      relatedConceptSlug: 'atmospheric-pressure',
    },
    {
      id: 'q3-2015-disproportionate-risk',
      type: 'single-choice',
      prompt: 'During the severe 2015 Indonesian fire crisis, peatlands made up only ~12% of the country’s total land area, but accounted for what percentage of that year’s total fires?',
      contextNarrative: 'Reflect on the peer-reviewed fire distribution figures (Miettinen et al. 2017 / Atmos. Chem. Phys. 2019).',
      options: [
        {
          id: 'opt-12pct',
          label: '12% (proportional to land area)',
        },
        {
          id: 'opt-53pct',
          label: '53% of total fires',
          isCorrect: true,
        },
        {
          id: 'opt-99pct',
          label: '99% of total fires',
        },
        {
          id: 'opt-2pct',
          label: 'Less than 2%',
        },
      ],
      correctAnswer: 'opt-53pct',
      explanation: 'Over 53% of all 2015 fires occurred on peatlands despite peat making up just 12% of land area. This massive disproportion demonstrates that drained peat soils represent an extraordinarily high fire hazard and greenhouse emission source during El Niño droughts.',
      relatedConceptSlug: 'atmospheric-pressure',
    },
  ],
};
