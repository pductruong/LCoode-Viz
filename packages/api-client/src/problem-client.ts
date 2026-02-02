import type { Problem } from '@lcode-viz/types/domain';
import { HttpClient } from './http-client.js';

export class ProblemApiClient {
  constructor(private http: HttpClient) {}

  async getProblems(params?: {
    difficulty?: string;
    categories?: string;
    search?: string;
  }): Promise<Problem[]> {
    const queryParams = new URLSearchParams();
    if (params?.difficulty) queryParams.append('difficulty', params.difficulty);
    if (params?.categories) queryParams.append('categories', params.categories);
    if (params?.search) queryParams.append('search', params.search);

    const query = queryParams.toString();
    const endpoint = query ? `/api/problems?${query}` : '/api/problems';

    const problems = await this.http.get<Problem[]>(endpoint);

    // Parse JSON strings from backend
    return problems.map((p) => ({
      ...p,
      categories: typeof p.categories === 'string'
        ? JSON.parse(p.categories)
        : p.categories,
      examples: typeof p.examples === 'string'
        ? JSON.parse(p.examples)
        : p.examples,
      constraints: typeof p.constraints === 'string'
        ? JSON.parse(p.constraints)
        : p.constraints,
      solutions: p.solutions?.map((s) => ({
        ...s,
        steps: typeof s.steps === 'string' ? JSON.parse(s.steps) : s.steps,
      })) || [],
    }));
  }

  async getProblem(id: string): Promise<Problem> {
    const problem = await this.http.get<Problem>(`/api/problems/${id}`);

    // Parse JSON strings from backend
    return {
      ...problem,
      categories: typeof problem.categories === 'string'
        ? JSON.parse(problem.categories)
        : problem.categories,
      examples: typeof problem.examples === 'string'
        ? JSON.parse(problem.examples)
        : problem.examples,
      constraints: typeof problem.constraints === 'string'
        ? JSON.parse(problem.constraints)
        : problem.constraints,
      solutions: problem.solutions?.map((s) => ({
        ...s,
        steps: typeof s.steps === 'string' ? JSON.parse(s.steps) : s.steps,
      })) || [],
    };
  }

  async searchProblems(query: string): Promise<Problem[]> {
    const problems = await this.http.get<Problem[]>(
      `/api/problems/search?q=${encodeURIComponent(query)}`
    );

    return problems.map((p) => ({
      ...p,
      categories: typeof p.categories === 'string'
        ? JSON.parse(p.categories)
        : p.categories,
      examples: typeof p.examples === 'string'
        ? JSON.parse(p.examples)
        : p.examples,
      constraints: typeof p.constraints === 'string'
        ? JSON.parse(p.constraints)
        : p.constraints,
      solutions: p.solutions?.map((s) => ({
        ...s,
        steps: typeof s.steps === 'string' ? JSON.parse(s.steps) : s.steps,
      })) || [],
    }));
  }

  async getCategories(): Promise<string[]> {
    return this.http.get<string[]>('/api/problems/categories');
  }
}
