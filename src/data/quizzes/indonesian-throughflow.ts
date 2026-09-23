import type { Quiz } from '../../types/quiz';

export const indonesianThroughflowQuiz: Quiz = {
  id: 'quiz-indonesian-throughflow',
  experienceSlug: 'indonesian-throughflow',
  title: 'Indonesian Throughflow (ITF) Verification Quiz',
  description: 'Test your understanding of the Pacific-to-Indian oceanic heat conveyor, strait passages, and ENSO climate coupling.',
  passingScore: 70,
  questions: [
    {
      id: 'q1-primary-driver',
      type: 'single-choice',
      prompt: 'What physical mechanism primarily drives the continuous southward flow of the Indonesian Throughflow (ITF)?',
      contextNarrative: 'Consider the differences in sea surface height between the tropical Pacific and Indian oceans.',
      options: [
        {
          id: 'opt-wind-local',
          label: 'Local daily land and sea breezes blowing across Java.',
        },
        {
          id: 'opt-sea-level-gradient',
          label: 'A persistent sea-surface-height (pressure) gradient where the Western Pacific sits higher than the Eastern Indian Ocean.',
          isCorrect: true,
        },
        {
          id: 'opt-underwater-pumps',
          label: 'Geothermal boiling under the Krakatau caldera pushing water southward.',
        },
        {
          id: 'opt-magnetic-forces',
          label: 'Earth’s magnetic field lines pulling saline water toward the equator.',
        },
      ],
      correctAnswer: 'opt-sea-level-gradient',
      explanation: 'Pacific trade winds pile warm equatorial water in the Western Pacific Warm Pool, raising sea surface height by roughly 20–35 cm relative to the Eastern Indian Ocean. This persistent hydraulic gradient forces huge volumes of water through Indonesian straits.',
      relatedConceptSlug: 'atmospheric-pressure',
    },
    {
      id: 'q2-unique-gateway',
      type: 'true-false',
      prompt: 'The Indonesian Throughflow is the only low-latitude oceanic pathway connecting the Pacific and Indian Oceans on Earth.',
      contextNarrative: 'Examine a world map to check if any other tropical waterways connect these two ocean basins.',
      options: [
        {
          id: 'opt-true',
          label: 'True — the Indonesian archipelago forms the sole low-latitude marine choke point between the Pacific and Indian Oceans.',
          isCorrect: true,
        },
        {
          id: 'opt-false',
          label: 'False — there are several wide ocean passages connecting the Pacific and Indian Oceans near the equator.',
        },
      ],
      correctAnswer: 'opt-true',
      explanation: 'Because continents block equatorial flow elsewhere, the Indonesian seas provide the world’s only tropical inter-ocean connection, making Indonesia a critical planetary choke point in global thermohaline heat and salinity circulation.',
      relatedConceptSlug: 'atmospheric-pressure',
    },
    {
      id: 'q3-strait-matching',
      type: 'single-choice',
      prompt: 'Which Indonesian strait acts as the primary INFLOW gateway, carrying over 80% (~11.6 Sverdrups) of upper-ocean Pacific waters into the internal seas?',
      contextNarrative: 'Identify the major channel between Kalimantan and Sulawesi.',
      options: [
        {
          id: 'opt-malacca',
          label: 'Malacca Strait',
        },
        {
          id: 'opt-makassar',
          label: 'Makassar Strait',
          isCorrect: true,
        },
        {
          id: 'opt-lombok',
          label: 'Lombok Strait (Outflow)',
        },
        {
          id: 'opt-sunda',
          label: 'Sunda Strait',
        },
      ],
      correctAnswer: 'opt-makassar',
      explanation: 'Makassar Strait is the main deep inflow conduit for the ITF, carrying ~11.6 Sv of Pacific water south into the Flores and Banda Seas before exiting into the Indian Ocean via the Lombok, Ombai, and Timor passages.',
      relatedConceptSlug: 'atmospheric-pressure',
    },
  ],
};
