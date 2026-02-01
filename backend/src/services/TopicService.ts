import { Topic } from '@prisma/client';
import { ITopicRepository } from '../repositories/ITopicRepository';

export interface TopicFilterCriteria {
  category?: string;
  searchQuery?: string;
}

export class TopicService {
  constructor(private repository: ITopicRepository) {}

  async getAll(): Promise<Topic[]> {
    return this.repository.findAll();
  }

  async getById(id: string): Promise<Topic | null> {
    return this.repository.findById(id);
  }

  async getByCategory(category: string): Promise<Topic[]> {
    return this.repository.findByCategory(category);
  }

  async search(query: string): Promise<Topic[]> {
    return this.repository.search(query);
  }

  async filter(criteria: TopicFilterCriteria): Promise<Topic[]> {
    let topics = await this.repository.findAll();

    // Apply category filter
    if (criteria.category) {
      topics = topics.filter(
        (t) => t.category.toLowerCase() === criteria.category!.toLowerCase()
      );
    }

    // Apply search filter
    if (criteria.searchQuery) {
      const query = criteria.searchQuery.toLowerCase();
      topics = topics.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query)
      );
    }

    return topics;
  }

  async create(topic: Omit<Topic, 'createdAt' | 'updatedAt'>): Promise<Topic> {
    return this.repository.create(topic);
  }

  async update(id: string, topic: Partial<Topic>): Promise<Topic> {
    return this.repository.update(id, topic);
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }

  async getCategories(): Promise<string[]> {
    const topics = await this.repository.findAll();
    const categoriesSet = new Set<string>();

    topics.forEach((t) => categoriesSet.add(t.category));

    return Array.from(categoriesSet).sort();
  }
}
