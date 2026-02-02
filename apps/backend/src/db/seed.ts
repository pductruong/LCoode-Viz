import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger.js';
import { problems } from './seeds/problems/index.js';
import { topics } from './seeds/topics/index.js';

const prisma = new PrismaClient();

async function seed() {
  logger.info('Starting database seed...');

  try {
    // Clear existing data
    await prisma.solution.deleteMany();
    await prisma.problem.deleteMany();
    await prisma.topic.deleteMany();

    // Seed problems
    for (const problemData of problems) {
      const { solutions, ...problemFields } = problemData;

      await prisma.problem.create({
        data: {
          ...problemFields,
          categories: JSON.stringify(problemFields.categories),
          examples: JSON.stringify(problemFields.examples),
          constraints: JSON.stringify(problemFields.constraints),
          solutions: {
            create: solutions.map((solution) => ({
              ...solution,
              steps: JSON.stringify(solution.steps),
            })),
          },
        },
      });

      logger.info(`✓ Seeded problem: ${problemFields.title}`);
    }

    // Seed topics
    for (const topicData of topics) {
      await prisma.topic.create({
        data: {
          id: topicData.id,
          category: topicData.category,
          title: topicData.title,
          icon: topicData.icon,
          difficulty: topicData.difficulty,
          timeToLearn: topicData.timeToLearn,
          description: topicData.description,
          fullDescription: JSON.stringify(topicData.fullDescription),
          quickFacts: JSON.stringify(topicData.quickFacts),
          types: topicData.types ? JSON.stringify(topicData.types) : undefined,
          operations: topicData.operations
            ? JSON.stringify(topicData.operations)
            : undefined,
          codeExamples: JSON.stringify(topicData.codeExamples),
          pros: JSON.stringify(topicData.pros),
          cons: JSON.stringify(topicData.cons),
          whenToUse: JSON.stringify(topicData.whenToUse),
          commonPatterns: topicData.commonPatterns
            ? JSON.stringify(topicData.commonPatterns)
            : undefined,
          visualConcepts: topicData.visualConcepts
            ? JSON.stringify(topicData.visualConcepts)
            : undefined,
          relatedProblems: JSON.stringify(topicData.relatedProblems),
        },
      });

      logger.info(`✓ Seeded topic: ${topicData.title}`);
    }

    logger.info('Database seeded successfully!');
  } catch (error) {
    logger.error('Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seed();
