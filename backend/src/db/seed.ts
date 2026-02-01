import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

const prisma = new PrismaClient();

async function seed() {
  logger.info('Starting database seed...');

  try {
    // Clear existing data
    await prisma.solution.deleteMany();
    await prisma.problem.deleteMany();
    await prisma.topic.deleteMany();

    // Seed Two Sum problem
    await prisma.problem.create({
      data: {
        id: 'two-sum',
        title: '1. Two Sum',
        difficulty: 'Easy',
        categories: JSON.stringify(['Array', 'Hash Table']),
        description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.',
        visualizationType: 'array',
        examples: JSON.stringify([
          {
            input: { nums: [2, 7, 11, 15], target: 9 },
            output: [0, 1],
            explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
          },
          {
            input: { nums: [3, 2, 4], target: 6 },
            output: [1, 2],
          },
        ]),
        constraints: JSON.stringify([
          '2 <= nums.length <= 10⁴',
          '-10⁹ <= nums[i] <= 10⁹',
          '-10⁹ <= target <= 10⁹',
          'Only one valid answer exists.',
        ]),
        solutions: {
          create: [
            {
              name: 'Hash Map (Optimal)',
              code: `function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement), i];
    }

    map.set(nums[i], i);
  }

  return [];
}`,
              timeComplexity: 'O(n)',
              spaceComplexity: 'O(n)',
              steps: JSON.stringify([]),
              explanation: 'Use a hash map to store complements',
            },
          ],
        },
      },
    });

    // Seed Zigzag Conversion problem
    await prisma.problem.create({
      data: {
        id: 'zigzag-conversion',
        title: '6. Zigzag Conversion',
        difficulty: 'Medium',
        categories: JSON.stringify(['String', 'Pattern']),
        description: 'The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows.',
        visualizationType: 'zigzag',
        examples: JSON.stringify([
          {
            input: { s: 'PAYPALISHIRING', numRows: 3 },
            output: 'PAHNAPLSIIGYIR',
          },
        ]),
        constraints: JSON.stringify([
          '1 <= s.length <= 1000',
          's consists of English letters',
        ]),
        solutions: {
          create: [],
        },
      },
    });

    // Seed Word Ladder problem
    await prisma.problem.create({
      data: {
        id: 'word-ladder',
        title: '127. Word Ladder',
        difficulty: 'Hard',
        categories: JSON.stringify(['Graph', 'BFS', 'String']),
        description: 'A transformation sequence from word beginWord to word endWord using a dictionary wordList.',
        visualizationType: 'graph',
        examples: JSON.stringify([
          {
            input: {
              beginWord: 'hit',
              endWord: 'cog',
              wordList: ['hot', 'dot', 'dog', 'lot', 'log', 'cog'],
            },
            output: 5,
          },
        ]),
        constraints: JSON.stringify([
          '1 <= beginWord.length <= 10',
          'All words have the same length',
        ]),
        solutions: {
          create: [],
        },
      },
    });

    // Seed Linked List topic
    await prisma.topic.create({
      data: {
        id: 'linked-list',
        category: 'Data Structures',
        title: 'Linked List',
        icon: '🔗',
        difficulty: 'Beginner',
        timeToLearn: 45,
        description: 'A linear data structure where elements are stored in nodes',
        fullDescription: JSON.stringify({
          intro: 'A linked list is a linear data structure...',
          sections: [],
        }),
        quickFacts: JSON.stringify([
          'Dynamic size',
          'Easy insertion/deletion',
          'Sequential access',
        ]),
        types: JSON.stringify([
          { name: 'Singly Linked List', description: 'One-way direction' },
          { name: 'Doubly Linked List', description: 'Two-way direction' },
        ]),
        operations: JSON.stringify([
          { name: 'Append', complexity: 'O(1)' },
          { name: 'Prepend', complexity: 'O(1)' },
          { name: 'Delete', complexity: 'O(n)' },
        ]),
        codeExamples: JSON.stringify([
          {
            title: 'Node Class',
            code: 'class Node { constructor(data) { this.data = data; this.next = null; } }',
          },
        ]),
        pros: JSON.stringify([
          'Dynamic size',
          'Easy insertion/deletion at beginning',
        ]),
        cons: JSON.stringify([
          'No random access',
          'Extra memory for pointers',
        ]),
        whenToUse: JSON.stringify({
          good: ['Frequent insertions/deletions', 'Unknown size'],
          avoid: ['Need random access', 'Memory constrained'],
        }),
      },
    });

    logger.info('Database seeded successfully!');
  } catch (error) {
    logger.error('Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seed();
