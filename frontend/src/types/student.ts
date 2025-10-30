export interface Student {
  student_id?: string;
  name: string;
  goal: string;
  target_score: number;
  known_concepts: Record<string, number>;
  available_time_week: number;
  preferred_difficulty_pace: 'slow' | 'medium' | 'fast';
  learning_style: 'visual' | 'reading_writing' | 'balanced' | 'kinesthetic';
  completed_modules?: string[];
  struggling_concepts?: string[];
}

export interface StudentRequest {
  name: string;
  target_score: number;
  available_time_week: number;
  known_concepts: Record<string, number>;
  preferred_difficulty_pace: string;
  learning_style: string;
  goal: string;
}

export interface StudentProfileResponse {
  name: string;
  target_score: number;
  recommended_study_approach: string;
  estimated_preparation_time: string;
  strong_areas: string[];
  weak_areas: string[];
  overall_proficiency: number;
}