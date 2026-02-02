import { Topic } from '@prisma/client';
import { prisma } from '../config/database';
import { ITopicRepository } from './ITopicRepository';

export class TopicRepository implements ITopicRepository {
  async findAll(): Promise<Topic[]> {
    return prisma.topic.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: string): Promise<Topic | null> {
    return prisma.topic.findUnique({
      where: { id },
    });
  }

  async findByCategory(category: string): Promise<Topic[]> {
    return prisma.topic.findMany({
      where: {
        category: {
          equals: category,
        },
      },
    });
  }

  async search(query: string): Promise<Topic[]> {
    const lowerQuery = query.toLowerCase();
    return prisma.topic.findMany({
      where: {
        OR: [
          { title: { contains: lowerQuery } },
          { description: { contains: lowerQuery } },
        ],
      },
    });
  }

  async create(topic: Omit<Topic, 'createdAt' | 'updatedAt'>): Promise<Topic> {
    return prisma.topic.create({
      data: topic,
    });
  }

  async update(id: string, topic: Partial<Topic>): Promise<Topic> {
    return prisma.topic.update({
      where: { id },
      data: topic,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.topic.delete({
      where: { id },
    });
  }
}
