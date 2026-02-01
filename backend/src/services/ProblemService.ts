import { Problem } from '@prisma/client';
import { IProblemRepository } from '../repositories/IProblemRepository';

export interface FilterCriteria {
  difficulty?: string[];
  categories?: string[];
  searchQuery?: string;
}

export class ProblemService {
  constructor(private repository: IProblemRepository) {}

  async getAll(): Promise<Problem[]> {
    return this.repository.findAll();
  }

  async getById(id: string): Promise<Problem | null> {
    return this.repository.findById(id);
  }

  async getByCategory(category: string): Promise<Problem[]> {
    return this.repository.findByCategory(category);
  }

  async getByDifficulty(difficulty: string): Promise<Problem[]> {
    return this.repository.findByDifficulty(difficulty);
  }

  async search(query: string): Promise<Problem[]> {
    return this.repository.search(query);
  }

  async filter(criteria: FilterCriteria): Promise<Problem[]> {
    let problems = await this.repository.findAll();

    // Apply difficulty filter
    if (criteria.difficulty && criteria.difficulty.length > 0) {
      problems = problems.filter((p) =>
        criteria.difficulty!.includes(p.difficulty)
      );
    }

    // Apply category filter
    if (criteria.categories && criteria.categories.length > 0) {
      problems = problems.filter((p) => {
        const categories = JSON.parse(p.categories);
        return categories.some((c: string) =>
          criteria.categories!.includes(c)
        );
      });
    }

    // Apply search filter
    if (criteria.searchQuery) {
      const query = criteria.searchQuery.toLowerCase();
      problems = problems.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    return problems;
  }

  async create(problem: Omit<Problem, 'createdAt' | 'updatedAt'>): Promise<Problem> {
    return this.repository.create(problem);
  }

  async update(id: string, problem: Partial<Problem>): Promise<Problem> {
    return this.repository.update(id, problem);
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }

  async getCategories(): Promise<string[]> {
    const problems = await this.repository.findAll();
    const categoriesSet = new Set<string>();

    problems.forEach((p) => {
      const categories = JSON.parse(p.categories);
      categories.forEach((c: string) => categoriesSet.add(c));
    });

    return Array.from(categoriesSet).sort();
  }
}
