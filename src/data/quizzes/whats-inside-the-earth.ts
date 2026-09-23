import type { Quiz } from '../../types/quiz';

export const whatsInsideTheEarthQuiz: Quiz = {
  id: 'quiz-whats-inside-the-earth',
  experienceSlug: 'whats-inside-the-earth',
  title: "What's Inside the Earth? Verification Quiz",
  description: "Test your understanding of Earth's concentric layers, seismic wave propagation, and how shadow zones reveal the liquid outer core.",
  passingScore: 70,
  questions: [
    {
      id: 'q1-outer-core-liquid',
      type: 'single-choice',
      prompt: 'How do geophysicists know that Earth’s outer core is a liquid rather than a solid?',
      contextNarrative: 'Recall how different types of seismic shockwaves travel through various states of matter.',
      options: [
        {
          id: 'opt-drill-samples',
          label: 'Deep volcanic drill holes have physically extracted liquid iron samples from the core.',
        },
        {
          id: 'opt-s-wave-shadow',
          label: 'Shear seismic waves (S-waves) cannot travel through liquids, creating a worldwide S-wave shadow zone on the opposite side of earthquakes.',
          isCorrect: true,
        },
        {
          id: 'opt-magnetic-only',
          label: 'The outer core glows red-hot and can be directly seen through deep ocean trenches.',
        },
        {
          id: 'opt-gravity-only',
          label: 'Earth’s gravitational pull disappears near the equator.',
        },
      ],
      correctAnswer: 'opt-s-wave-shadow',
      explanation: 'S-waves (shear waves) require a solid medium with shear strength to propagate. When seismic waves hit the liquid outer core, S-waves are completely blocked, producing an S-wave shadow zone between 103° and 180° around the globe from any earthquake epicenter.',
      relatedConceptSlug: 'plate-tectonics-process',
    },
    {
      id: 'q2-drilling-depth',
      type: 'true-false',
      prompt: 'Humanity has successfully drilled deep enough into the ground to directly sample Earth’s mantle.',
      contextNarrative: 'Consider the depth of the Kola Superdeep Borehole relative to Earth’s crustal thickness.',
      options: [
        {
          id: 'opt-true',
          label: 'True — drilling operations routinely reach hundreds of kilometers into the mantle.',
        },
        {
          id: 'opt-false',
          label: 'False — the deepest borehole reached only ~12.2 km, barely penetrating the outermost continental crust.',
          isCorrect: true,
        },
      ],
      correctAnswer: 'opt-false',
      explanation: 'The Kola Superdeep Borehole in Russia reached approximately 12,262 meters (12.2 km). Since continental crust is typically 30–70 km thick, we have never directly drilled into or sampled the pristine in-situ mantle.',
      relatedConceptSlug: 'plate-tectonics-process',
    },
    {
      id: 'q3-layer-ordering',
      type: 'ordering',
      prompt: 'Order Earth’s internal layers from the outermost surface to the exact planetary center.',
      contextNarrative: 'Arrange the concentric shells from shallowest to deepest.',
      orderingItems: [
        { id: 'item-crust', label: 'Crust (Silicate outer shell, 0–70 km)', correctOrder: 0 },
        { id: 'item-mantle', label: 'Mantle (Viscous convective silicates, 70–2,890 km)', correctOrder: 1 },
        { id: 'item-outer-core', label: 'Outer Core (Liquid iron-nickel alloy, 2,890–5,150 km)', correctOrder: 2 },
        { id: 'item-inner-core', label: 'Inner Core (Solid crystalline iron-nickel sphere, 5,150–6,371 km)', correctOrder: 3 },
      ],
      correctAnswer: ['item-crust', 'item-mantle', 'item-outer-core', 'item-inner-core'],
      explanation: 'From the surface down: Crust (0–70 km) → Mantle (70–2,890 km) → Outer Core (2,890–5,150 km) → Inner Core (5,150–6,371 km at Earth’s center).',
      relatedConceptSlug: 'plate-tectonics-process',
    },
  ],
};
