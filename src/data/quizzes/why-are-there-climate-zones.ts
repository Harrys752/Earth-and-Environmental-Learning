import type { Quiz } from '../../types/quiz';

export const whyAreThereClimateZonesQuiz: Quiz = {
  id: 'quiz-why-are-there-climate-zones',
  experienceSlug: 'why-are-there-climate-zones',
  title: 'Why Are There Climate Zones? Verification Quiz',
  description: 'Assess your understanding of solar insolation geometry, equatorial heating, climate zones, and tropical seasonal patterns.',
  passingScore: 70,
  questions: [
    {
      id: 'q1-solar-insolation-geometry',
      type: 'single-choice',
      prompt: 'Why do polar regions receive significantly less solar heat energy per square meter than equatorial regions?',
      contextNarrative: 'Think about the geometry of incoming parallel solar radiation striking Earth\'s curved spherical surface.',
      options: [
        {
          id: 'opt-distance-misconception',
          label: 'Because the poles are millions of kilometers farther away from the Sun than the equator.',
        },
        {
          id: 'opt-beam-spreading',
          label: 'Because sunlight strikes the curved surface near the poles at an oblique, shallow angle, spreading the same amount of solar energy over a much larger surface area and traversing thicker atmosphere.',
          isCorrect: true,
        },
        {
          id: 'opt-ozone-blocking',
          label: 'Because polar ozone permanently reflects 100% of incoming sunlight back into deep space.',
        },
        {
          id: 'opt-core-heat',
          label: 'Because Earth\'s hot core only radiates outward through the equator and never through the poles.',
        },
      ],
      correctAnswer: 'opt-beam-spreading',
      explanation: 'A fundamental misconception is that poles are cold because they are farther from the sun. In reality, the difference in distance is negligible. Because Earth is spherical, rays hit the equator nearly perpendicularly (concentrating energy on a small footprint), while at high latitudes the same beam strikes obliquely, spreading its flux across a wider area and losing more energy through a longer atmospheric path.',
      relatedConceptSlug: 'atmospheric-pressure',
    },
    {
      id: 'q2-indonesia-seasons',
      type: 'true-false',
      prompt: 'Like temperate countries in Europe or North America, equatorial Indonesia experiences four distinct thermal seasons (spring, summer, autumn, and winter).',
      contextNarrative: 'Consider the annual variation in solar angle and day length experienced along the equator.',
      options: [
        {
          id: 'opt-true',
          label: 'True — every country on Earth cycles through four distinct temperature seasons each year.',
        },
        {
          id: 'opt-false',
          label: 'False — near 0° latitude, high solar insolation and ~12-hour day lengths remain consistent year-round; seasonal variations are defined by monsoonal precipitation (wet and dry seasons) rather than temperature swings.',
          isCorrect: true,
        },
      ],
      correctAnswer: 'opt-false',
      explanation: 'Because Indonesia sits directly along the equator (between ~6°N and 11°S), midday solar elevation remains high all 12 months, maintaining warm average temperatures (26–28°C) year-round. Seasons are governed by shifting monsoonal wind systems causing wet (rainy) and dry periods, not thermal winters or autumns.',
      relatedConceptSlug: 'atmospheric-pressure',
    },
    {
      id: 'q3-climate-zones-matching',
      type: 'single-choice',
      prompt: 'Which latitude band correctly defines the Tropical Climate Zone on Earth?',
      contextNarrative: 'Identify the geographic boundaries where the Sun can pass directly overhead at solar noon.',
      options: [
        {
          id: 'opt-tropical-bounds',
          label: 'Between the Tropic of Cancer (23.5°N) and the Tropic of Capricorn (23.5°S), centered on the Equator (0°).',
          isCorrect: true,
        },
        {
          id: 'opt-temperate-bounds',
          label: 'Between 66.5°N and 90°N (the Arctic Circle to the North Pole).',
        },
        {
          id: 'opt-polar-bounds',
          label: 'Strictly between 45°N and 60°N.',
        },
        {
          id: 'opt-random-bounds',
          label: 'Any region located above 3,000 meters elevation regardless of latitude.',
        },
      ],
      correctAnswer: 'opt-tropical-bounds',
      explanation: 'The Tropics span from 23.5°N to 23.5°S. Within this belt, solar rays hit almost vertically throughout the year, yielding the highest average annual insolation and forming Earth\'s warmest climate zone.',
      relatedConceptSlug: 'atmospheric-pressure',
    },
    {
      id: 'q4-climate-vs-weather',
      type: 'single-choice',
      prompt: 'What is the primary scientific difference between "weather" and "climate"?',
      contextNarrative: 'Distinguish between day-to-day atmospheric variability and long-term statistical trends.',
      options: [
        {
          id: 'opt-weather-vs-climate',
          label: 'Weather describes short-term, day-to-day atmospheric conditions (e.g., today\'s thunderstorm in Jakarta), whereas climate describes the long-term statistical patterns and averages of weather over decades (typically 30+ years).',
          isCorrect: true,
        },
        {
          id: 'opt-opposite',
          label: 'Climate describes today\'s rainfall, while weather is the 30-year average.',
        },
        {
          id: 'opt-altitude',
          label: 'Weather only happens in the stratosphere, while climate is confined to the ocean floor.',
        },
        {
          id: 'opt-predictability',
          label: 'Climate changes every hour, whereas weather remains constant for centuries.',
        },
      ],
      correctAnswer: 'opt-weather-vs-climate',
      explanation: '"Climate is what you expect; weather is what you get." Weather represents instantaneous or daily atmospheric behavior, whereas climate characterizes the statistical baseline, variability, and seasonal norms compiled across standard 30-year climatological reference periods.',
      relatedConceptSlug: 'atmospheric-pressure',
    },
  ],
};
