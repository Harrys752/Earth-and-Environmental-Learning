import type { Quiz } from '../../types/quiz';

export const jakartaSinkingCityGroundwaterQuiz: Quiz = {
  id: 'quiz-jakarta-sinking-city-groundwater',
  experienceSlug: 'jakarta-sinking-city-groundwater',
  title: "Jakarta's Sinking City & Groundwater Verification Quiz",
  description: 'Evaluate your understanding of aquifer pore pressure, irreversible clay compaction, and coastal subsidence dynamics.',
  passingScore: 70,
  questions: [
    {
      id: 'q1-primary-cause',
      type: 'single-choice',
      prompt: 'According to scientific investigations by ITB and Geological Agency geologists, what is the primary cause (80–90%) of Jakarta’s rapid land subsidence?',
      contextNarrative: 'Consider the hydrological impact of massive urban extraction from deep confined aquifers.',
      options: [
        {
          id: 'opt-weight-buildings',
          label: 'The physical weight of high-rise skyscrapers pushing down on the earth.',
        },
        {
          id: 'opt-excessive-groundwater',
          label: 'Excessive extraction of deep groundwater exceeding natural aquifer recharge rates.',
          isCorrect: true,
        },
        {
          id: 'opt-tectonic-sinking',
          label: 'Rapid tectonic subduction directly pulling the island of Java downward.',
        },
        {
          id: 'opt-sea-level-only',
          label: 'Global sea-level rise pushing the land lower.',
        },
      ],
      correctAnswer: 'opt-excessive-groundwater',
      explanation: 'Over 80–90% of Jakarta’s subsidence is driven by excessive deep groundwater pumping. Pumping depressurizes the aquifer system, causing surrounding compressible clay layers (aquitards) to mechanically collapse and compact under overburden weight.',
      relatedConceptSlug: 'atmospheric-pressure',
    },
    {
      id: 'q2-irreversible-compaction',
      type: 'true-false',
      prompt: 'Once deep clay layers compact due to groundwater extraction, the ground surface will naturally rebound to its original height if all pumping stops.',
      contextNarrative: 'Reflect on the mechanical properties of clay minerals and pore rearrangement under high vertical load.',
      options: [
        {
          id: 'opt-true',
          label: 'True — clay layers act like elastic sponges and will spring back to full height.',
        },
        {
          id: 'opt-false',
          label: 'False — clay compaction is mechanically plastic and irreversible; the loss of ground elevation is permanent.',
          isCorrect: true,
        },
      ],
      correctAnswer: 'opt-false',
      explanation: 'Clay particles are flat microscopic plates. When pore water pressure is drained, these plates collapse into a tightly packed, reoriented structure under gravitational load. This plastic compaction cannot be reversed simply by refilling the aquifer.',
      relatedConceptSlug: 'atmospheric-pressure',
    },
    {
      id: 'q3-subsidence-estimation',
      type: 'single-choice',
      prompt: 'If a coastal neighborhood in North Jakarta subsides at a steady average rate of 8 cm per year, what would be the approximate cumulative vertical drop over 10 years?',
      contextNarrative: 'Calculate the cumulative displacement (using illustrative average rates without implying precise single-point forecasts).',
      options: [
        {
          id: 'opt-8cm',
          label: '8 cm total',
        },
        {
          id: 'opt-80cm',
          label: 'Approximately 80 cm (0.8 meters)',
          isCorrect: true,
        },
        {
          id: 'opt-8m',
          label: 'Approximately 8 meters',
        },
        {
          id: 'opt-zero',
          label: '0 cm because sea tides cancel out sinking',
        },
      ],
      correctAnswer: 'opt-80cm',
      explanation: '8 cm/year × 10 years = 80 cm (0.8 meters). In low-lying coastal areas already near sea level, a drop of nearly a meter drastically increases tidal flooding frequency (banjir rob) behind sea walls.',
      relatedConceptSlug: 'atmospheric-pressure',
    },
  ],
};
