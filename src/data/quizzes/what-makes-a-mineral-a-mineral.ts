import type { Quiz } from '../../types/quiz';

export const whatMakesAMineralAMineralQuiz: Quiz = {
  id: 'quiz-what-makes-a-mineral-a-mineral',
  experienceSlug: 'what-makes-a-mineral-a-mineral',
  title: 'What Makes a Mineral a Mineral? Verification Quiz',
  description: 'Evaluate your understanding of the 5 mineral criteria, mineral vs rock distinctions, and Indonesian lateritic nickel ore properties.',
  passingScore: 70,
  questions: [
    {
      id: 'q1-definition-criteria',
      type: 'single-choice',
      prompt: 'Which of the following is NOT part of the mandatory scientific definition of a mineral?',
      contextNarrative: 'Recall the 5 criteria that every substance must satisfy to be classified as a true mineral.',
      options: [
        {
          id: 'opt-naturally-occurring',
          label: 'Must be naturally occurring.',
        },
        {
          id: 'opt-must-be-organic',
          label: 'Must be formed from organic plant or animal tissues.',
          isCorrect: true,
        },
        {
          id: 'opt-ordered-crystal',
          label: 'Must possess an ordered internal crystalline atomic structure.',
        },
        {
          id: 'opt-definite-chemical',
          label: 'Must have a definite (or definable range of) chemical composition.',
        },
      ],
      correctAnswer: 'opt-must-be-organic',
      explanation: 'Minerals are by scientific definition strictly INORGANIC. Organic compounds produced purely by living biological tissues (such as wood, amber, or coal) are not minerals.',
      relatedConceptSlug: 'stratigraphy',
    },
    {
      id: 'q2-rock-vs-mineral',
      type: 'true-false',
      prompt: 'A rock and a mineral are scientifically identical and can be used interchangeably.',
      contextNarrative: 'Consider how granite or basalt is composed compared to quartz or feldspar.',
      options: [
        {
          id: 'opt-true',
          label: 'True — rocks and minerals have the same atomic definition.',
        },
        {
          id: 'opt-false',
          label: 'False — a mineral is a pure crystalline compound, while a rock is an aggregate mixture of one or more minerals.',
          isCorrect: true,
        },
      ],
      correctAnswer: 'opt-false',
      explanation: 'A mineral is a single homogeneous crystalline chemical compound with a definite formula. A rock is a heterogeneous aggregate or mixture of multiple minerals (e.g., granite contains quartz, feldspar, and biotite).',
      relatedConceptSlug: 'stratigraphy',
    },
    {
      id: 'q3-nickel-laterite',
      type: 'single-choice',
      prompt: 'What geological process is primarily responsible for forming Indonesia’s world-leading nickel laterite deposits in Sulawesi and Halmahera?',
      contextNarrative: 'Connect Indonesia’s hot, humid equatorial climate to the chemical transformation of ultramafic bedrock.',
      options: [
        {
          id: 'opt-meteor-impact',
          label: 'Prehistoric meteorite impacts that deposited extraterrestrial nickel dust.',
        },
        {
          id: 'opt-tropical-weathering',
          label: 'Intense, prolonged tropical chemical weathering of olivine-rich peridotite bedrock under high rainfall and heat.',
          isCorrect: true,
        },
        {
          id: 'opt-sandstone-sediment',
          label: 'Windblown sand dunes in ancient desert basins.',
        },
        {
          id: 'opt-glacial-scraping',
          label: 'Glacial ice sheet scraping during the Pleistocene ice ages.',
        },
      ],
      correctAnswer: 'opt-tropical-weathering',
      explanation: 'Lateritic nickel ores form through intense chemical weathering (laterization) of ultramafic peridotite rocks in warm, wet tropical climates like Sulawesi. Soluble elements (silica, magnesium) leach away, leaving highly concentrated nickel-rich garnierite and limonite layers near the surface.',
      relatedConceptSlug: 'stratigraphy',
    },
  ],
};
