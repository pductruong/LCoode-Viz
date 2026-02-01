import { Problem } from '../types/domain/Problem';
import { FilterCriteria } from '../types/filters/FilterCriteria';
import { IProblemService } from './interfaces/IProblemService';
import { ProblemApiClient } from './api/problemApiClient';

export class ProblemService implements IProblemService {
  constructor(private apiClient: ProblemApiClient) {}

  async getAll(): Promise<Problem[]> {
    return this.apiClient.getProblems();
  }

  async getById(id: string): Promise<Problem | null> {
    try {
      return await this.apiClient.getProblem(id);
    } catch (error) {
      console.error('Error fetching problem:', error);
      return null;
    }
  }

  async search(query: string): Promise<Problem[]> {
    return this.apiClient.searchProblems(query);
  }

  async filter(criteria: FilterCriteria): Promise<Problem[]> {
    const params: {
      difficulty?: string;
      categories?: string;
      search?: string;
    } = {};

    if (criteria.difficulty && criteria.difficulty.length > 0) {
      params.difficulty = criteria.difficulty.join(',');
    }

    if (criteria.categories && criteria.categories.length > 0) {
      params.categories = criteria.categories.join(',');
    }

    if (criteria.searchQuery) {
      params.search = criteria.searchQuery;
    }

    return this.apiClient.getProblems(params);
  }

  async getByCategory(category: string): Promise<Problem[]> {
    return this.filter({ categories: [category] });
  }

  async getByDifficulty(difficulty: string): Promise<Problem[]> {
    return this.filter({ difficulty: [difficulty] });
  }

  async getCategories(): Promise<string[]> {
    return this.apiClient.getCategories();
  }
}
