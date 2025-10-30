export interface Module {
  id: number;
  name: string;
  difficulty: number;
  time_estimate: number;
  concepts: string[];
  prerequisites: string[];
  description?: string;
  topics?: string[];
}

export interface ModuleResponse {
  id: number;
  name: string;
  difficulty: number;
  time_estimate: number;
  concepts: string[];
  prerequisites: string[];
  readiness: number;
  description?: string;
}