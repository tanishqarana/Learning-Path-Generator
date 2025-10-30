export const DIFFICULTY_LEVELS = {
  1: 'Beginner',
  2: 'Easy',
  3: 'Intermediate',
  4: 'Advanced',
  5: 'Expert'
} as const;

export const LEARNING_STYLES = {
  visual: 'Visual',
  reading_writing: 'Reading/Writing',
  balanced: 'Balanced',
  kinesthetic: 'Kinesthetic'
} as const;

export const PACE_OPTIONS = {
  slow: 'Slow & Steady',
  medium: 'Medium Pace',
  fast: 'Fast Pace'
} as const;

export const AVAILABILITY_OPTIONS = [
  { label: 'Casual (2-3 hours)', value: 180 },
  { label: 'Standard (4-6 hours)', value: 360 },
  { label: 'Intensive (7-10 hours)', value: 600 },
  { label: 'Immersive (10+ hours)', value: 720 },
];

export const CONCEPT_AREAS = [
  'arithmetic_operations',
  'integers',
  'fractions',
  'algebra',
  'geometry',
  'word_problems',
  'data_interpretation',
  'probability',
  'statistics',
  'calculus'
];