import { Topic } from '../types/domain/Topic';
import { TopicFilterCriteria } from '../types/filters/FilterCriteria';
import { ITopicService } from './interfaces/ITopicService';
import { TopicApiClient } from './api/topicApiClient';

export class TopicService implements ITopicService {
  constructor(private apiClient: TopicApiClient) {}

  async getAll(): Promise<Topic[]> {
    return this.apiClient.getTopics();
  }

  async getById(id: string): Promise<Topic | null> {
    try {
      return await this.apiClient.getTopic(id);
    } catch (error) {
      console.error('Error fetching topic:', error);
      return null;
    }
  }

  async search(query: string): Promise<Topic[]> {
    return this.apiClient.searchTopics(query);
  }

  async filter(criteria: TopicFilterCriteria): Promise<Topic[]> {
    const params: {
      category?: string;
      search?: string;
    } = {};

    if (criteria.category) {
      params.category = criteria.category;
    }

    if (criteria.searchQuery) {
      params.search = criteria.searchQuery;
    }

    return this.apiClient.getTopics(params);
  }

  async getByCategory(category: string): Promise<Topic[]> {
    return this.filter({ category });
  }

  async getCategories(): Promise<string[]> {
    return this.apiClient.getCategories();
  }
}
