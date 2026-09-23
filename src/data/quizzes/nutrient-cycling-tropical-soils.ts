import type { Quiz } from '../../types/quiz';

export const nutrientCyclingTropicalSoilsQuiz: Quiz = {
  id: 'quiz-nutrient-cycling-tropical-soils',
  experienceSlug: 'nutrient-cycling-tropical-soils',
  title: 'Nutrient Cycling in Tropical Soils Verification Quiz',
  description: 'Evaluate your understanding of nutrient distribution in tropical vs temperate ecosystems, mycorrhizal recycling, and post-deforestation soil fertility decline.',
  passingScore: 70,
  questions: [
    {
      id: 'q1-nutrient-pool-location',
      type: 'single-choice',
      prompt: 'In an undisturbed, mature tropical rainforest ecosystem, where is the vast majority (>80%) of the essential nutrient pool held?',
      contextNarrative: 'Contrast the rapid biological recycling loop with the heavily leached underlying mineral soil.',
      options: [
        {
          id: 'opt-soil-humus',
          label: 'In deep underground soil humus layers hundreds of meters thick.',
        },
        {
          id: 'opt-living-biomass',
          label: 'In the standing living biomass (tree trunks, leaves, vines) and shallow rapid-uptake root networks.',
          isCorrect: true,
        },
        {
          id: 'opt-river-gravel',
          label: 'In riverbed gravel deposits.',
        },
        {
          id: 'opt-bedrock-granite',
          label: 'Inside unweathered solid granite bedrock.',
        },
      ],
      correctAnswer: 'opt-living-biomass',
      explanation: 'In humid equatorial rainforests, warm temperatures and moisture drive near-instantaneous decomposition. Dense shallow root mats and mycorrhizal fungi immediately reabsorb released mineral ions (N, P, K, Ca), locking over 80% of the ecosystem’s nutrients within living plant tissue rather than the soil.',
      relatedConceptSlug: 'stratigraphy',
    },
    {
      id: 'q2-soil-fertility-paradox',
      type: 'true-false',
      prompt: 'Tropical rainforest soils are naturally extremely rich in minerals and deep humus, which is why they support such gigantic trees.',
      contextNarrative: 'Resolve the classic tropical soil paradox (lush canopy vs highly weathered oxisols/ultisols).',
      options: [
        {
          id: 'opt-true',
          label: 'True — tropical soils are among the most mineral-rich soils on Earth.',
        },
        {
          id: 'opt-false',
          label: 'False — tropical soils (oxisols/ultisols) are typically ancient, heavily weathered, acidic, and nutrient-poor; the lush vegetation is sustained by rapid biological recycling, not soil reserves.',
          isCorrect: true,
        },
      ],
      correctAnswer: 'opt-false',
      explanation: 'Tropical rainforest soils are often millions of years old and have had soluble nutrient cations leached away by millenia of intense rainfall. The lush aboveground forest is a closed, tight recycling loop that thrives despite the nutrient-poor mineral soil underneath.',
      relatedConceptSlug: 'stratigraphy',
    },
    {
      id: 'q3-deforestation-impact',
      type: 'single-choice',
      prompt: 'Why do farmers who clear tropical rainforest by slash-and-burn often observe a severe drop in crop productivity within just 2 to 3 years?',
      contextNarrative: 'Consider what happens to the ecosystem nutrient pool when the tree canopy is removed and exposed to heavy tropical downpours.',
      options: [
        {
          id: 'opt-crop-poison',
          label: 'The ash poisons agricultural seeds after 2 years.',
        },
        {
          id: 'opt-biomass-leached',
          label: 'Clearing removes the standing biomass nutrient reserve, and heavy equatorial rainfall (>3,000 mm/year) rapidly leaches the remaining ash nutrients deep into the subsoil beyond shallow crop roots.',
          isCorrect: true,
        },
        {
          id: 'opt-sunlight-loss',
          label: 'The sun stops shining on cleared land.',
        },
        {
          id: 'opt-sand-formation',
          label: 'The soil turns into ocean seawater.',
        },
      ],
      correctAnswer: 'opt-biomass-leached',
      explanation: 'Burning temporarily fertilizes the topsoil with an ash flush. However, without the forest canopy to buffer rain and without the dense root-mycorrhizal sponge to catch ions, intense tropical rains quickly leach mobile nutrients (K, Ca, Mg) down into deep subsoil, exhausting crop fertility rapidly.',
      relatedConceptSlug: 'stratigraphy',
    },
  ],
};
