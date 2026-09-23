import type { Quiz } from '../../types/quiz';

export const theCarbonCycleQuiz: Quiz = {
  id: 'quiz-the-carbon-cycle',
  experienceSlug: 'the-carbon-cycle',
  title: 'The Carbon Cycle & Blue Carbon Verification Quiz',
  description: 'Evaluate your understanding of planetary carbon reservoirs, long-term geological vs short-term biological cycling, and Indonesian mangrove blue carbon storage.',
  passingScore: 70,
  questions: [
    {
      id: 'q1-mangrove-soil-storage',
      type: 'single-choice',
      prompt: 'Why do coastal mangrove forest soils store 3 to 5 times more carbon per hectare than upland tropical terrestrial forests?',
      contextNarrative: 'Consider the biochemical effect of waterlogged, low-oxygen (anoxic) conditions on bacterial decomposers.',
      options: [
        {
          id: 'opt-high-winds',
          label: 'Strong coastal winds compress carbon dust into the mud.',
        },
        {
          id: 'opt-waterlogged-anoxic',
          label: 'Tidal waterlogging creates anoxic (zero-oxygen) soil conditions, which drastically slows down bacterial decomposition of roots and organic matter, locking carbon for centuries.',
          isCorrect: true,
        },
        {
          id: 'opt-salt-crystal',
          label: 'Sea salt converts organic carbon into solid diamonds instantly.',
        },
        {
          id: 'opt-crabs-only',
          label: 'Crabs bury plastic waste deep underground.',
        },
      ],
      correctAnswer: 'opt-waterlogged-anoxic',
      explanation: 'In waterlogged mangrove sediments, oxygen is severely depleted. Anaerobic conditions prevent fungi and aerobic bacteria from rapidly decomposing organic leaf litter and root biomass, allowing thick organic carbon layers to accumulate without rotting.',
      relatedConceptSlug: 'stratigraphy',
    },
    {
      id: 'q2-mangrove-carbon-allocation',
      type: 'true-false',
      prompt: 'In Indonesian mangrove ecosystems, the vast majority of carbon is stored above ground in the living tree trunks and leaves, with very little in the soil.',
      contextNarrative: 'Recall the percentage distribution of carbon in mangroves (soil vs biomass vs dead wood).',
      options: [
        {
          id: 'opt-true',
          label: 'True — tree trunks hold ~80% of total ecosystem carbon.',
        },
        {
          id: 'opt-false',
          label: 'False — approximately 78% of mangrove carbon is stored deep underground in anoxic soils, with only ~20% in living tree biomass.',
          isCorrect: true,
        },
      ],
      correctAnswer: 'opt-false',
      explanation: 'Extensive field research by CIFOR (Murdiyarso et al. 2015; Donato et al. 2011) confirmed that ~78% of carbon in Indonesian mangroves is sequestered in belowground soils, making soil conservation the most vital factor in blue carbon protection.',
      relatedConceptSlug: 'stratigraphy',
    },
    {
      id: 'q3-reservoir-matching',
      type: 'single-choice',
      prompt: 'Which Earth carbon reservoir contains the largest absolute quantity of carbon on the planet (>100 million Gigatonnes of C), participating primarily in slow geological cycles over millions of years?',
      contextNarrative: 'Think of limestone rock formations, deep seafloor carbonates, and buried fossil organic sediments.',
      options: [
        {
          id: 'opt-atmosphere',
          label: 'Atmosphere (~800 GtC)',
        },
        {
          id: 'opt-geosphere',
          label: 'Geosphere / Lithosphere (Sedimentary carbonate rocks and buried carbon, >100,000,000 GtC)',
          isCorrect: true,
        },
        {
          id: 'opt-biosphere',
          label: 'Terrestrial Biosphere (~600 GtC)',
        },
        {
          id: 'opt-soil-surface',
          label: 'Surface Soil Humus (~1,500 GtC)',
        },
      ],
      correctAnswer: 'opt-geosphere',
      explanation: 'The geosphere (crustal rocks, limestone CaCO3, and fossil deposits) holds over 99.9% of Earth’s carbon. Carbon moves into the geosphere through biological sedimentation and subduction, and returns to the atmosphere via volcanic degassing and silicate weathering over geological timescales.',
      relatedConceptSlug: 'stratigraphy',
    },
  ],
};
