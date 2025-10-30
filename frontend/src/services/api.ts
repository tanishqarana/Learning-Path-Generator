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
  timeout: 10000,
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`🔄 API Call: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Success: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', error.response?.data || error.message);
    
    if (error.response?.status === 500) {
      console.error('Server error - check if backend is running on port 8000');
    }
    
    return Promise.reject(error);
  }
);

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

  // Mock data fallbacks for development
  mockGenerateLearningPath: async (studentData: StudentRequest): Promise<LearningPathResponse> => {
    console.warn('🚨 Using mock data - backend might not be running');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      student_name: studentData.name,
      target_score: studentData.target_score,
      total_modules: 12,
      total_time: 720, // 12 hours
      fitness_score: 0.87,
      weak_areas_covered: "8/10",
      estimated_weeks: 6,
      modules: [
        {
          id: 1,
          name: "Integer Properties",
          difficulty: 1,
          time_estimate: 25,
          concepts: ["integers"],
          prerequisites: [],
          readiness: 95
        },
        {
          id: 2,
          name: "Arithmetic Operations", 
          difficulty: 1,
          time_estimate: 30,
          concepts: ["arithmetic_operations"],
          prerequisites: ["integers"],
          readiness: 90
        }
        // ... more mock modules
      ]
    };
  }
};

// Helper function to check backend connectivity
export const checkBackendConnection = async (): Promise<boolean> => {
  try {
    await apiService.healthCheck();
    return true;
  } catch (error) {
    console.warn('Backend not available, using mock data');
    return false;
  }
};

export default api;