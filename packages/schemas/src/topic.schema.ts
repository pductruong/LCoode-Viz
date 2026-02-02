import { z } from 'zod';

export const TopicTypeSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export const OperationSchema = z.object({
  name: z.string(),
  complexity: z.string(),
  description: z.string().optional(),
});

export const CodeExampleSchema = z.object({
  title: z.string(),
  code: z.string(),
  language: z.string().optional(),
});

export const WhenToUseSchema = z.object({
  good: z.array(z.string()),
  avoid: z.array(z.string()),
});

export const TopicSchema = z.object({
  id: z.string(),
  category: z.string(),
  title: z.string(),
  icon: z.string(),
  difficulty: z.string(),
  timeToLearn: z.number(),
  description: z.string(),
  fullDescription: z.any(),
  quickFacts: z.array(z.string()),
  types: z.array(TopicTypeSchema).optional(),
  operations: z.array(OperationSchema).optional(),
  codeExamples: z.array(CodeExampleSchema),
  pros: z.array(z.string()),
  cons: z.array(z.string()),
  whenToUse: WhenToUseSchema,
  commonPatterns: z.any().optional(),
  visualConcepts: z.any().optional(),
  relatedProblems: z.any().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const CreateTopicSchema = TopicSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export const UpdateTopicSchema = TopicSchema.partial().omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
