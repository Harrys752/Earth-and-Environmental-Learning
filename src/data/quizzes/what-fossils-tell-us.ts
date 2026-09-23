import type { Quiz } from '../../types/quiz';

export const whatFossilsTellUsQuiz: Quiz = {
  id: 'quiz-what-fossils-tell-us',
  experienceSlug: 'what-fossils-tell-us',
  title: 'What Fossils Tell Us? Verification Quiz',
  description: 'Evaluate your knowledge of fossilization taphonomy, stratigraphic dating, the Sangiran Early Man Site, and empirical fact versus scientific interpretation.',
  passingScore: 70,
  questions: [
    {
      id: 'q1-fossilization-conditions',
      type: 'single-choice',
      prompt: 'Which environmental conditions are most essential for an organism\'s remains to successfully fossilize rather than decay?',
      contextNarrative: 'Consider the taphonomic process of preservation in geological sediments.',
      options: [
        {
          id: 'opt-size-misconception',
          label: 'The organism must be unusually massive in body size and exposed directly to open sunlight.',
        },
        {
          id: 'opt-rapid-burial',
          label: 'Rapid burial in fine-grained sediment (anoxic/low-oxygen environment) that protects organic tissues from scavengers, bacterial decay, and mechanical abrasion, followed by mineral-rich groundwater permineralization.',
          isCorrect: true,
        },
        {
          id: 'opt-free-floating',
          label: 'Remaining floating freely in warm open ocean water for thousands of years.',
        },
        {
          id: 'opt-volcanic-magma',
          label: 'Direct immersion inside molten basalt magma at 1,200°C.',
        },
      ],
      correctAnswer: 'opt-rapid-burial',
      explanation: 'Fossilization requires quick isolation from oxygen and biological decomposers. Rapid sediment burial by rivers, lakes, or volcanic ash mudflows seals remains, allowing dissolved minerals (calcite, silica, iron) in groundwater to slowly permeate pore spaces and replace bone or organic matter cell by cell.',
      relatedConceptSlug: 'stratigraphy',
    },
    {
      id: 'q2-fossil-record-completeness',
      type: 'true-false',
      prompt: 'The fossil record preserves a complete and comprehensive archive of nearly every species and individual organism that has ever lived on Earth.',
      contextNarrative: 'Examine the rarity of fossilization and the taphonomic biases of the rock record.',
      options: [
        {
          id: 'opt-true',
          label: 'True — fossilization is a common, universal outcome for living organisms after death.',
        },
        {
          id: 'opt-false',
          label: 'False — fossilization is an extremely rare event requiring precise conditions; soft-bodied organisms and upland species are rarely preserved, making the fossil record a fragmentary window into deep time.',
          isCorrect: true,
        },
      ],
      correctAnswer: 'opt-false',
      explanation: 'Only a minuscule fraction of past life is preserved as fossils. Organisms without hard parts (bones, shells, teeth) or those living in eroding mountainous terrains are virtually absent from the rock record, which is heavily biased toward marine and lowland depositional environments.',
      relatedConceptSlug: 'stratigraphy',
    },
    {
      id: 'q3-sangiran-significance',
      type: 'single-choice',
      prompt: 'What makes the Sangiran Early Man Site in Central Java globally significant to international paleontology?',
      contextNarrative: 'Recall the UNESCO World Heritage listing and empirical discoveries documented at Sangiran.',
      options: [
        {
          id: 'opt-sangiran-site',
          label: 'It preserves an exceptionally rich, continuous 2.4-million-year sedimentary sequence containing over 100 individual Homo erectus hominid fossils alongside stone tool industries and ancient paleofauna.',
          isCorrect: true,
        },
        {
          id: 'opt-dinosaur-feathers',
          label: 'It contains the only fully preserved Jurassic dinosaur feathers found in the southern hemisphere.',
        },
        {
          id: 'opt-synthetic-fossils',
          label: 'It is a modern laboratory where scientists grow synthetic trilobites in pressurized vats.',
        },
        {
          id: 'opt-deep-sea-trench',
          label: 'It is an active deep-sea trench 10 km beneath the ocean floor.',
        },
      ],
      correctAnswer: 'opt-sangiran-site',
      explanation: 'Inscribed as a UNESCO World Heritage Site in 1996, Sangiran is one of the premier paleoanthropological locations on Earth. Its clear stratigraphic dome reveals over 2.4 million years of environmental evolution and crucial fossil evidence of Pleistocene hominids (Homo erectus) and stone flake tools dating back ~1.2 to 1.5 million years.',
      relatedConceptSlug: 'stratigraphy',
    },
    {
      id: 'q4-stratigraphic-superposition',
      type: 'single-choice',
      prompt: 'How does the geological principle of superposition allow paleontologists to determine the relative ages of fossils found in undisturbed sedimentary strata?',
      contextNarrative: 'Apply stratigraphic principles to read the vertical sequence of layers in a rock face or excavation trench.',
      options: [
        {
          id: 'opt-superposition',
          label: 'In an undeformed sedimentary sequence, the oldest layers and their enclosed fossils lie at the bottom, while progressively younger layers lie near the top.',
          isCorrect: true,
        },
        {
          id: 'opt-reverse',
          label: 'The newest rocks are always pushed to the deepest bottom layer by Earth\'s magnetic field.',
        },
        {
          id: 'opt-color-only',
          label: 'Fossil age is determined solely by the darkness of the sediment layer\'s color.',
        },
        {
          id: 'opt-weight',
          label: 'Heavier fossils always sink to the bottom of already-hardened solid rocks.',
        },
      ],
      correctAnswer: 'opt-superposition',
      explanation: 'Under the Law of Superposition (formulated by Nicolas Steno), each sedimentary stratum is deposited on top of pre-existing layers. Therefore, in undisturbed rock sequences like Sangiran, fossils discovered in deeper strata represent older chronological time periods than those found in overlying strata.',
      relatedConceptSlug: 'stratigraphy',
    },
  ],
};
