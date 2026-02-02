import { z } from 'zod';

export const FilterCriteriaSchema = z.object({
  difficulty: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  searchQuery: z.string().optional(),
});

export const TopicFilterCriteriaSchema = z.object({
  category: z.string().optional(),
  searchQuery: z.string().optional(),
});
