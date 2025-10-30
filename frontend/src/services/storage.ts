// Local storage service for persisting app data

const STORAGE_KEYS = {
  STUDENT_DATA: 'learnpath_student_data',
  LEARNING_PATH: 'learnpath_learning_path', 
  PROGRESS: 'learnpath_progress',
  SETTINGS: 'learnpath_settings',
  ASSESSMENT_RESULTS: 'learnpath_assessment_results'
} as const;

export const storageService = {
  // Student Data
  saveStudentData(data: any): void {
    this.setItem(STORAGE_KEYS.STUDENT_DATA, data);
  },

  getStudentData(): any {
    return this.getItem(STORAGE_KEYS.STUDENT_DATA);
  },

  // Learning Path
  saveLearningPath(path: any): void {
    this.setItem(STORAGE_KEYS.LEARNING_PATH, path);
  },

  getLearningPath(): any {
    return this.getItem(STORAGE_KEYS.LEARNING_PATH);
  },

  // Progress
  saveProgress(progress: any): void {
    this.setItem(STORAGE_KEYS.PROGRESS, progress);
  },

  getProgress(): any {
    return this.getItem(STORAGE_KEYS.PROGRESS);
  },

  updateModuleProgress(moduleId: number, progress: number): void {
    const currentProgress = this.getProgress() || {};
    currentProgress[moduleId] = progress;
    this.saveProgress(currentProgress);
  },

  // Assessment Results
  saveAssessmentResults(results: any): void {
    this.setItem(STORAGE_KEYS.ASSESSMENT_RESULTS, results);
  },

  getAssessmentResults(): any {
    return this.getItem(STORAGE_KEYS.ASSESSMENT_RESULTS);
  },

  // Settings
  saveSettings(settings: any): void {
    this.setItem(STORAGE_KEYS.SETTINGS, settings);
  },

  getSettings(): any {
    return this.getItem(STORAGE_KEYS.SETTINGS) || {};
  },

  // Generic methods
  setItem(key: string, value: any): void {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },

  getItem(key: string): any {
    try {
      if (typeof window !== 'undefined') {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      }
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },

  removeItem(key: string): void {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },

  clearAll(): void {
    try {
      if (typeof window !== 'undefined') {
        Object.values(STORAGE_KEYS).forEach(key => {
          localStorage.removeItem(key);
        });
      }
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },

  // Export data for backup
  exportData(): string {
    const data: Record<string, any> = {};
    Object.values(STORAGE_KEYS).forEach(key => {
      data[key] = this.getItem(key);
    });
    return JSON.stringify(data, null, 2);
  },

  // Import data from backup
  importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      Object.entries(data).forEach(([key, value]) => {
        this.setItem(key, value);
      });
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }
};

export default storageService;