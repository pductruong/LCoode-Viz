export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Example {
  input: Record<string, any>;
  output: any;
  explanation?: string;
}

export interface Solution {
  id: string;
  problemId: string;
  name: string;
  code: string;
  timeComplexity: string;
  spaceComplexity: string;
  steps: any[];
  explanation?: string;
}

export interface Problem {
  id: string;
  title: string;
  difficulty: Difficulty;
  categories: string[];
  description: string;
  visualizationType: string;
  examples: Example[];
  constraints: string[];
  solutions: Solution[];
  createdAt?: string;
  updatedAt?: string;
}
