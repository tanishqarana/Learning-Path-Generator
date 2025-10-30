import axios from 'axios';
import { StudentRequest, StudentProfileResponse } from '../types/student';
import { LearningPathResponse } from '../types/learning-path';
import { Module } from '../types/module';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  // Generate learning path
  generateLearningPath: async (studentData: StudentRequest): Promise<LearningPathResponse> => {
    const response = await api.post<LearningPathResponse>('/generate-path', studentData);
    return response.data;
  },

  // Get student profile analysis
  getStudentProfile: async (name: string, targetScore: number): Promise<StudentProfileResponse> => {
    const response = await api.get<StudentProfileResponse>('/student/profile', {
      params: { name, target_score: targetScore }
    });
    return response.data;
  },

  // List all modules
  listAllModules: async (): Promise<{ total_modules: number; modules: Module[] }> => {
    const response = await api.get('/modules/list');
    return response.data;
  },

  // Assess student knowledge
  assessKnowledge: async (knownConcepts: Record<string, number>) => {
    const response = await api.post('/student/assess', knownConcepts);
    return response.data;
  },

  // Health check
  healthCheck: async () => {
    const response = await api.get('/health');
    return response.data;
  },
};

export default api;