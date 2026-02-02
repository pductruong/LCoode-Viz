import { Topic } from '@prisma/client';

export interface ITopicRepository {
  findAll(): Promise<Topic[]>;
  findById(id: string): Promise<Topic | null>;
  findByCategory(category: string): Promise<Topic[]>;
  search(query: string): Promise<Topic[]>;
  create(topic: Omit<Topic, 'createdAt' | 'updatedAt'>): Promise<Topic>;
  update(id: string, topic: Partial<Topic>): Promise<Topic>;
  delete(id: string): Promise<void>;
}
