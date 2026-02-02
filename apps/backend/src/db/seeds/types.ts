/**
 * Type definitions for seed data
 */

export interface ProblemSeedData {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  categories: string[];
  description: string;
  visualizationType: string;
  examples: any[];
  constraints: string[];
  solutions: SolutionSeedData[];
}

export interface SolutionSeedData {
  name: string;
  code: string;
  timeComplexity: string;
  spaceComplexity: string;
  steps: any[];
  explanation: string;
}

export interface TopicSeedData {
  id: string;
  category: string;
  title: string;
  icon: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeToLearn: number;
  description: string;
  fullDescription: {
    definition: string;
    analogy: string;
  };
  quickFacts: {
    timeComplexity: Record<string, string>;
    spaceComplexity: string;
    whenToUse: string[];
  };
  types?: Array<{
    name: string;
    description: string;
  }>;
  operations?: Array<{
    name: string;
    timeAvg: string;
    timeWorst: string;
    space: string;
    code: string;
  }>;
  codeExamples: {
    javascript?: string;
    python?: string;
    java?: string;
  };
  pros: string[];
  cons: string[];
  whenToUse: {
    use: string[];
    avoid: string[];
  };
  commonPatterns?: any;
  visualConcepts?: any;
  relatedProblems: string[];
}
