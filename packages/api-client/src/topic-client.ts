import type { Topic } from '@lcode-viz/types/domain';
import { HttpClient } from './http-client.js';

export class TopicApiClient {
  constructor(private http: HttpClient) {}

  async getTopics(params?: {
    category?: string;
    search?: string;
  }): Promise<Topic[]> {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);

    const query = queryParams.toString();
    const endpoint = query ? `/api/topics?${query}` : '/api/topics';

    const topics = await this.http.get<Topic[]>(endpoint);

    // Parse JSON strings from backend
    return topics.map((t) => ({
      ...t,
      fullDescription: typeof t.fullDescription === 'string'
        ? JSON.parse(t.fullDescription)
        : t.fullDescription,
      quickFacts: typeof t.quickFacts === 'string'
        ? JSON.parse(t.quickFacts)
        : t.quickFacts,
      types: t.types && typeof t.types === 'string'
        ? JSON.parse(t.types)
        : t.types,
      operations: t.operations && typeof t.operations === 'string'
        ? JSON.parse(t.operations)
        : t.operations,
      codeExamples: typeof t.codeExamples === 'string'
        ? JSON.parse(t.codeExamples)
        : t.codeExamples,
      pros: typeof t.pros === 'string' ? JSON.parse(t.pros) : t.pros,
      cons: typeof t.cons === 'string' ? JSON.parse(t.cons) : t.cons,
      whenToUse: typeof t.whenToUse === 'string'
        ? JSON.parse(t.whenToUse)
        : t.whenToUse,
      commonPatterns: t.commonPatterns && typeof t.commonPatterns === 'string'
        ? JSON.parse(t.commonPatterns)
        : t.commonPatterns,
      visualConcepts: t.visualConcepts && typeof t.visualConcepts === 'string'
        ? JSON.parse(t.visualConcepts)
        : t.visualConcepts,
      relatedProblems: t.relatedProblems && typeof t.relatedProblems === 'string'
        ? JSON.parse(t.relatedProblems)
        : t.relatedProblems,
    }));
  }

  async getTopic(id: string): Promise<Topic> {
    const topic = await this.http.get<Topic>(`/api/topics/${id}`);

    // Parse JSON strings from backend
    return {
      ...topic,
      fullDescription: typeof topic.fullDescription === 'string'
        ? JSON.parse(topic.fullDescription)
        : topic.fullDescription,
      quickFacts: typeof topic.quickFacts === 'string'
        ? JSON.parse(topic.quickFacts)
        : topic.quickFacts,
      types: topic.types && typeof topic.types === 'string'
        ? JSON.parse(topic.types)
        : topic.types,
      operations: topic.operations && typeof topic.operations === 'string'
        ? JSON.parse(topic.operations)
        : topic.operations,
      codeExamples: typeof topic.codeExamples === 'string'
        ? JSON.parse(topic.codeExamples)
        : topic.codeExamples,
      pros: typeof topic.pros === 'string' ? JSON.parse(topic.pros) : topic.pros,
      cons: typeof topic.cons === 'string' ? JSON.parse(topic.cons) : topic.cons,
      whenToUse: typeof topic.whenToUse === 'string'
        ? JSON.parse(topic.whenToUse)
        : topic.whenToUse,
      commonPatterns: topic.commonPatterns && typeof topic.commonPatterns === 'string'
        ? JSON.parse(topic.commonPatterns)
        : topic.commonPatterns,
      visualConcepts: topic.visualConcepts && typeof topic.visualConcepts === 'string'
        ? JSON.parse(topic.visualConcepts)
        : topic.visualConcepts,
      relatedProblems: topic.relatedProblems && typeof topic.relatedProblems === 'string'
        ? JSON.parse(topic.relatedProblems)
        : topic.relatedProblems,
    };
  }

  async searchTopics(query: string): Promise<Topic[]> {
    const topics = await this.http.get<Topic[]>(
      `/api/topics/search?q=${encodeURIComponent(query)}`
    );

    return topics.map((t) => ({
      ...t,
      fullDescription: typeof t.fullDescription === 'string'
        ? JSON.parse(t.fullDescription)
        : t.fullDescription,
      quickFacts: typeof t.quickFacts === 'string'
        ? JSON.parse(t.quickFacts)
        : t.quickFacts,
      types: t.types && typeof t.types === 'string'
        ? JSON.parse(t.types)
        : t.types,
      operations: t.operations && typeof t.operations === 'string'
        ? JSON.parse(t.operations)
        : t.operations,
      codeExamples: typeof t.codeExamples === 'string'
        ? JSON.parse(t.codeExamples)
        : t.codeExamples,
      pros: typeof t.pros === 'string' ? JSON.parse(t.pros) : t.pros,
      cons: typeof t.cons === 'string' ? JSON.parse(t.cons) : t.cons,
      whenToUse: typeof t.whenToUse === 'string'
        ? JSON.parse(t.whenToUse)
        : t.whenToUse,
      commonPatterns: t.commonPatterns && typeof t.commonPatterns === 'string'
        ? JSON.parse(t.commonPatterns)
        : t.commonPatterns,
      visualConcepts: t.visualConcepts && typeof t.visualConcepts === 'string'
        ? JSON.parse(t.visualConcepts)
        : t.visualConcepts,
      relatedProblems: t.relatedProblems && typeof t.relatedProblems === 'string'
        ? JSON.parse(t.relatedProblems)
        : t.relatedProblems,
    }));
  }

  async getCategories(): Promise<string[]> {
    return this.http.get<string[]>('/api/topics/categories');
  }
}
