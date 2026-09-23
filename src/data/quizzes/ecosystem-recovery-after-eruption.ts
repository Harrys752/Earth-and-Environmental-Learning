import type { Quiz } from '../../types/quiz';

export const ecosystemRecoveryAfterEruptionQuiz: Quiz = {
  id: 'quiz-ecosystem-recovery-after-eruption',
  experienceSlug: 'ecosystem-recovery-after-eruption',
  title: 'Ecosystem Recovery After Volcanic Eruption Verification Quiz',
  description: 'Evaluate your understanding of primary ecological succession, pioneer colonizers, and the documented recolonization timeline of Krakatau.',
  passingScore: 70,
  questions: [
    {
      id: 'q1-pioneer-species',
      type: 'single-choice',
      prompt: 'In ecological science, what is a "pioneer species"?',
      contextNarrative: 'Consider the traits of the very first organisms able to survive on bare, sterile volcanic ash or rock.',
      options: [
        {
          id: 'opt-large-mammals',
          label: 'Apex predatory mammals that require dense forest cover.',
        },
        {
          id: 'opt-hardy-colonizer',
          label: 'Hardy, highly dispersible organisms capable of surviving and establishing on bare, nutrient-poor substrates without pre-existing soil.',
          isCorrect: true,
        },
        {
          id: 'opt-climax-trees',
          label: 'Massive hardwood rainforest canopy trees that require deep humus.',
        },
        {
          id: 'opt-domesticated-crops',
          label: 'Agricultural crop plants planted by human settlers.',
        },
      ],
      correctAnswer: 'opt-hardy-colonizer',
      explanation: 'Pioneer species (such as windborne cyanobacteria, microscopic spiders, mosses, and hardy grasses) possess broad tolerance limits and high dispersal capabilities, allowing them to initiate biological soil formation on barren volcanic substrates.',
      relatedConceptSlug: 'volcanic-arcs',
    },
    {
      id: 'q2-krakatau-ordering',
      type: 'ordering',
      prompt: 'Order the documented stages of ecological recolonization on the sterilized Krakatau islands chronologically after the 1883 eruption.',
      contextNarrative: 'Arrange the succession milestones from the immediate aftermath to the mature climax forest.',
      orderingItems: [
        { id: 'item-spider', label: 'First life sighted (airborne ballooning spider, Nov 1883)', correctOrder: 0 },
        { id: 'item-grass', label: 'Pioneer grasses and nitrogen-fixing cyanobacteria (1884)', correctOrder: 1 },
        { id: 'item-coastal', label: 'Sea-drifted coastal strand plant communities (1897)', correctOrder: 2 },
        { id: 'item-rainforest', label: 'Developing closed tropical secondary rainforest canopy (1931–1935)', correctOrder: 3 },
      ],
      correctAnswer: ['item-spider', 'item-grass', 'item-coastal', 'item-rainforest'],
      explanation: 'Chronology: Spider (3 months post-eruption) → Grasses & Algae (1 year) → Coastal strand vegetation (14 years) → Closed tropical rainforest canopy (50 years).',
      relatedConceptSlug: 'volcanic-arcs',
    },
    {
      id: 'q3-climax-equilibrium',
      type: 'true-false',
      prompt: 'Once an island ecosystem reaches a mature climax rainforest community, ecological change stops completely and forever.',
      contextNarrative: 'Consider the ongoing activity of Anak Krakatau since 1930.',
      options: [
        {
          id: 'opt-true',
          label: 'True — climax communities are completely static and immune to disturbances.',
        },
        {
          id: 'opt-false',
          label: 'False — natural disturbances, such as renewed eruptions from Anak Krakatau, continuously restart succession cycles.',
          isCorrect: true,
        },
      ],
      correctAnswer: 'opt-false',
      explanation: 'Ecosystems are dynamic. Subsequent volcanic eruptions from Anak Krakatau (e.g., 1952, 2018) repeatedly reset portions of the islands, demonstrating that ecological succession is an ongoing, cyclical process.',
      relatedConceptSlug: 'volcanic-arcs',
    },
  ],
};
