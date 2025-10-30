import { ModuleResponse } from './module';

export interface LearningPathResponse {
  student_name: string;
  target_score: number;
  total_modules: number;
  total_time: number;
  fitness_score: number;
  weak_areas_covered: string;
  estimated_weeks: number;
  modules: ModuleResponse[];
}

export interface LearningPathProgress {
  completed_modules: number;
  total_modules: number;
  time_spent: number;
  total_time: number;
  concepts_mastered: number;
  total_concepts: number;
  current_streak: number;
}