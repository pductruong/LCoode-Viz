export interface TopicType {
  name: string;
  description: string;
}

export interface Operation {
  name: string;
  complexity: string;
  description?: string;
}

export interface CodeExample {
  title: string;
  code: string;
  language?: string;
}

export interface WhenToUse {
  good: string[];
  avoid: string[];
}

export interface Topic {
  id: string;
  category: string;
  title: string;
  icon: string;
  difficulty: string;
  timeToLearn: number;
  description: string;
  fullDescription: any;
  quickFacts: string[];
  types?: TopicType[];
  operations?: Operation[];
  codeExamples: CodeExample[];
  pros: string[];
  cons: string[];
  whenToUse: WhenToUse;
  commonPatterns?: any;
  visualConcepts?: any;
  relatedProblems?: any;
  createdAt?: string;
  updatedAt?: string;
}
