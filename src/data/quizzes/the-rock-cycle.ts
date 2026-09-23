import type { Quiz } from '../../types/quiz';

export const theRockCycleQuiz: Quiz = {
  id: 'quiz-the-rock-cycle',
  experienceSlug: 'the-rock-cycle',
  title: 'What Is the Rock Cycle? Verification Quiz',
  description: 'Test your understanding of the three rock classes, transformative geologic processes, and the continuous nature of the rock cycle.',
  passingScore: 70,
  questions: [
    {
      id: 'q1-lithification',
      type: 'single-choice',
      prompt: 'Which geological process transforms loose accumulated mineral sediment into solid sedimentary rock?',
      contextNarrative: 'Think about how sand and silt on a riverbank or ocean basin become hardened sandstone or shale over geological time.',
      options: [
        {
          id: 'opt-lithification',
          label: 'Lithification (compaction under burial pressure and cementation by mineral-precipitating groundwater).',
          isCorrect: true,
        },
        {
          id: 'opt-melting',
          label: 'Total melting into magma followed by rapid explosive ejection.',
        },
        {
          id: 'opt-crystallization',
          label: 'Direct igneous crystallization from superheated subterranean lava.',
        },
        {
          id: 'opt-sublimation',
          label: 'Direct sublimation from gas into solid crystal lattices without pressure.',
        },
      ],
      correctAnswer: 'opt-lithification',
      explanation: 'Lithification is the process that turns loose sediment into cohesive sedimentary rock. As layers accumulate, overburden weight causes compaction (reducing pore space), and dissolved minerals in groundwater (such as silica or calcite) precipitate to cement grains together.',
      relatedConceptSlug: 'stratigraphy',
    },
    {
      id: 'q2-rock-classes-matching',
      type: 'single-choice',
      prompt: 'Which pairing correctly matches a primary rock class with its defining geological formation mechanism?',
      contextNarrative: 'Geologists classify rocks based on their genesis and genetic history rather than outward color alone.',
      options: [
        {
          id: 'opt-pair-igneous',
          label: 'Igneous — formed exclusively by intense tectonic folding without ever melting.',
        },
        {
          id: 'opt-pair-metamorphic',
          label: 'Metamorphic — formed when pre-existing rocks are transformed by intense heat and confining pressure in the solid state (without completely melting).',
          isCorrect: true,
        },
        {
          id: 'opt-pair-sedimentary',
          label: 'Sedimentary — formed by the rapid atmospheric cooling of deep mantle plume magma.',
        },
        {
          id: 'opt-pair-wrong',
          label: 'Igneous — formed by biological plant decomposition over millions of years.',
        },
      ],
      correctAnswer: 'opt-pair-metamorphic',
      explanation: 'Metamorphic rocks (e.g., marble, schist, gneiss) form when existing rocks undergo solid-state recrystallization under extreme temperature and differential or lithostatic pressure. If temperature gets high enough to fully melt the rock, it enters the igneous realm upon cooling.',
      relatedConceptSlug: 'stratigraphy',
    },
    {
      id: 'q3-cycle-order',
      type: 'single-choice',
      prompt: 'Which statement accurately describes the sequential nature of Earth\'s rock cycle?',
      contextNarrative: 'Consider whether Earth\'s crustal rock must follow a strict, one-way conveyor belt.',
      options: [
        {
          id: 'opt-fixed-start',
          label: 'All rocks must start as igneous, become sedimentary, then metamorphic, and cannot skip steps or reverse direction.',
        },
        {
          id: 'opt-dynamic-system',
          label: 'The rock cycle is a continuous, interconnected network with no fixed beginning or end; any rock type can transform into any other type through appropriate geologic processes.',
          isCorrect: true,
        },
        {
          id: 'opt-one-way-destruction',
          label: 'Rocks only ever break down into dust and are permanently lost from the planetary crust.',
        },
        {
          id: 'opt-instantaneous',
          label: 'Rock transformations only take place during rare meteorite impacts.',
        },
      ],
      correctAnswer: 'opt-dynamic-system',
      explanation: 'The rock cycle is non-linear and dynamic. An igneous rock can be remelted back into magma directly, weathered into sediment, or metamorphosed under deep burial pressure. Sedimentary rock can be weathered again into new sediment or metamorphosed. There is no predetermined starting line.',
      relatedConceptSlug: 'stratigraphy',
    },
    {
      id: 'q4-rock-identification',
      type: 'single-choice',
      prompt: 'A coarse-grained rock has large, interlocking mineral crystals visible to the naked eye, indicating it cooled very slowly deep beneath Earth\'s surface. What rock classification does this belong to?',
      contextNarrative: 'Examine the relationship between magma cooling rate and crystal growth size.',
      options: [
        {
          id: 'opt-intrusive-igneous',
          label: 'Intrusive (Plutonic) Igneous rock (e.g., granite or diorite).',
          isCorrect: true,
        },
        {
          id: 'opt-extrusive-igneous',
          label: 'Extrusive (Volcanic) Igneous rock (e.g., obsidian or fine basalt).',
        },
        {
          id: 'opt-clastic-sedimentary',
          label: 'Clastic Sedimentary rock (e.g., shale).',
        },
        {
          id: 'opt-chemical-sedimentary',
          label: 'Chemical evaporite rock (e.g., rock salt).',
        },
      ],
      correctAnswer: 'opt-intrusive-igneous',
      explanation: 'When magma cools slowly over thousands to millions of years deep in the crust (insulated by surrounding country rock), mineral crystals have time to grow large and interlock, producing coarse phaneritic textures characteristic of intrusive igneous rocks like granite.',
      relatedConceptSlug: 'stratigraphy',
    },
  ],
};
