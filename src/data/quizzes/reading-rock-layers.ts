import type { Quiz } from '../../types/quiz';

export const readingRockLayersQuiz: Quiz = {
  id: 'quiz-reading-rock-layers',
  experienceSlug: 'reading-rock-layers',
  title: 'Reading Rock Layers & Geological Stratigraphy',
  description: 'Test your understanding of Nicolaus Steno’s stratigraphic principles, unconformities, and relative dating of Earth history.',
  passingScore: 70,
  questions: [
    {
      id: 'q1-superposition',
      type: 'single-choice',
      prompt: 'According to the Law of Superposition, in an undisturbed sequence of sedimentary strata:',
      options: [
        {
          id: 'opt-top-oldest',
          label: 'The oldest rock layer lies at the top because it was exposed to air first.',
        },
        {
          id: 'opt-bottom-oldest',
          label: 'The oldest rock layer lies at the bottom, and each overlying layer is progressively younger.',
          isCorrect: true,
        },
        {
          id: 'opt-same-age',
          label: 'All sedimentary layers in a single outcrop were deposited simultaneously during one catastrophic event.',
        },
      ],
      correctAnswer: 'opt-bottom-oldest',
      explanation: 'Formulated by Nicolaus Steno in 1669, the Law of Superposition states that in an undisturbed sequence of sedimentary rocks, each bed is younger than the one beneath it and older than the one above it, because younger sediments must be deposited on top of preexisting surfaces.',
      relatedConceptSlug: 'stratigraphy',
    },
    {
      id: 'q2-cross-cutting',
      type: 'single-choice',
      prompt: 'If a basaltic igneous dike cuts vertically through five flat horizontal limestone layers, which rock feature is younger?',
      options: [
        {
          id: 'opt-limestone',
          label: 'The horizontal limestone layers are younger because they surround the dike.',
        },
        {
          id: 'opt-dike-younger',
          label: 'The basaltic dike is younger because a geological feature must already exist before it can be cut through (Principle of Cross-Cutting Relationships).',
          isCorrect: true,
        },
        {
          id: 'opt-cannot-tell',
          label: 'It is physically impossible to determine relative ages without radiometric uranium-lead dating.',
        },
      ],
      correctAnswer: 'opt-dike-younger',
      explanation: 'The Principle of Cross-Cutting Relationships states that an intrusive igneous body, fault, or fracture that cuts across another rock layer must be younger than the rock unit it cuts through. The limestone layers had to be deposited, lithified, and present before magma could fracture and intrude across them.',
      relatedConceptSlug: 'stratigraphy',
    },
    {
      id: 'q3-karangsambung-melange',
      type: 'single-choice',
      prompt: 'Why is Karangsambung in Central Java internationally renowned among geologists as a living textbook of plate tectonics?',
      options: [
        {
          id: 'opt-meteorite',
          label: 'It contains the largest meteorite impact crater in Southeast Asia.',
        },
        {
          id: 'opt-subduction-melange',
          label: 'It preserves an ancient subduction accretionary complex (tectonic mélange) where ancient deep-ocean crust and pillow basalts were scraped off and uplifted onto land.',
          isCorrect: true,
        },
        {
          id: 'opt-active-lava-lake',
          label: 'It hosts a permanent boiling liquid lava lake.',
        },
      ],
      correctAnswer: 'opt-subduction-melange',
      explanation: 'Karangsambung Geopark exposes an ancient Cretaceous subduction accretionary complex (mélange) dating back over 120 million years. Oceanic pillow basalts, red chert deposited on abyssal ocean plains, and high-pressure metamorphic rocks (eclogite and blueschist) that formed 50–100 km deep were scraped off the descending plate and tectonically exhumed to the surface.',
      relatedConceptSlug: 'subduction',
    },
  ],
};
