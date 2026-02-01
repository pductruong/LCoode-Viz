import { Problem } from '@prisma/client';

export interface IProblemRepository {
  findAll(): Promise<Problem[]>;
  findById(id: string): Promise<Problem | null>;
  findByCategory(category: string): Promise<Problem[]>;
  findByDifficulty(difficulty: string): Promise<Problem[]>;
  search(query: string): Promise<Problem[]>;
  create(problem: Omit<Problem, 'createdAt' | 'updatedAt'>): Promise<Problem>;
  update(id: string, problem: Partial<Problem>): Promise<Problem>;
  delete(id: string): Promise<void>;
}
