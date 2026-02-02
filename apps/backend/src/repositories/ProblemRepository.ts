import { Problem } from '@prisma/client';
import { prisma } from '../config/database';
import { IProblemRepository } from './IProblemRepository';

export class ProblemRepository implements IProblemRepository {
  async findAll(): Promise<Problem[]> {
    return prisma.problem.findMany({
      include: {
        solutions: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: string): Promise<Problem | null> {
    return prisma.problem.findUnique({
      where: { id },
      include: {
        solutions: true,
      },
    });
  }

  async findByCategory(category: string): Promise<Problem[]> {
    return prisma.problem.findMany({
      where: {
        categories: {
          contains: category,
        },
      },
      include: {
        solutions: true,
      },
    });
  }

  async findByDifficulty(difficulty: string): Promise<Problem[]> {
    return prisma.problem.findMany({
      where: {
        difficulty: difficulty as any,
      },
      include: {
        solutions: true,
      },
    });
  }

  async search(query: string): Promise<Problem[]> {
    const lowerQuery = query.toLowerCase();
    return prisma.problem.findMany({
      where: {
        OR: [
          { title: { contains: lowerQuery } },
          { description: { contains: lowerQuery } },
        ],
      },
      include: {
        solutions: true,
      },
    });
  }

  async create(problem: Omit<Problem, 'createdAt' | 'updatedAt'>): Promise<Problem> {
    return prisma.problem.create({
      data: problem,
      include: {
        solutions: true,
      },
    });
  }

  async update(id: string, problem: Partial<Problem>): Promise<Problem> {
    return prisma.problem.update({
      where: { id },
      data: problem,
      include: {
        solutions: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.problem.delete({
      where: { id },
    });
  }
}
