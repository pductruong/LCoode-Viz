import { z } from 'zod';

export const DifficultySchema = z.enum(['Easy', 'Medium', 'Hard']);

export const ExampleSchema = z.object({
  input: z.record(z.any()),
  output: z.any(),
  explanation: z.string().optional(),
});

export const SolutionSchema = z.object({
  id: z.string(),
  problemId: z.string(),
  name: z.string(),
  code: z.string(),
  timeComplexity: z.string(),
  spaceComplexity: z.string(),
  steps: z.array(z.any()),
  explanation: z.string().optional(),
});

export const ProblemSchema = z.object({
  id: z.string(),
  title: z.string(),
  difficulty: DifficultySchema,
  categories: z.array(z.string()),
  description: z.string(),
  visualizationType: z.string(),
  examples: z.array(ExampleSchema),
  constraints: z.array(z.string()),
  solutions: z.array(SolutionSchema),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const CreateProblemSchema = ProblemSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export const UpdateProblemSchema = ProblemSchema.partial().omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
