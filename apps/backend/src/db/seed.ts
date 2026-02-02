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
              steps: require('fs').readFileSync('/tmp/two-sum.json', 'utf8'),
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
          create: [
            {
              name: 'Row-by-Row Approach',
              code: `function convert(s, numRows) {
  if (numRows === 1) return s;

  const rows = Array(numRows).fill('');
  let currentRow = 0;
  let goingDown = false;

  for (const char of s) {
    rows[currentRow] += char;

    // Change direction at top and bottom rows
    if (currentRow === 0 || currentRow === numRows - 1) {
      goingDown = !goingDown;
    }

    currentRow += goingDown ? 1 : -1;
  }

  return rows.join('');
}`,
              timeComplexity: 'O(n)',
              spaceComplexity: 'O(n)',
              steps: require('fs').readFileSync('/tmp/zigzag.json', 'utf8'),
              explanation: 'Visit characters in zigzag order and append to respective rows',
            },
          ],
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
          create: [
            {
              name: 'Breadth-First Search (BFS)',
              code: `function ladderLength(beginWord, endWord, wordList) {
  const wordSet = new Set(wordList);

  // If endWord is not in wordList, no solution
  if (!wordSet.has(endWord)) return 0;

  const queue = [[beginWord, 1]];
  const visited = new Set([beginWord]);

  while (queue.length > 0) {
    const [word, level] = queue.shift();

    // Found the endWord
    if (word === endWord) return level;

    // Try all possible transformations
    for (let i = 0; i < word.length; i++) {
      for (let c = 97; c <= 122; c++) { // 'a' to 'z'
        const char = String.fromCharCode(c);
        const newWord = word.slice(0, i) + char + word.slice(i + 1);

        if (wordSet.has(newWord) && !visited.has(newWord)) {
          queue.push([newWord, level + 1]);
          visited.add(newWord);
        }
      }
    }
  }

  return 0; // No transformation sequence found
}`,
              timeComplexity: 'O(M² × N)',
              spaceComplexity: 'O(M × N)',
              steps: require('fs').readFileSync('/tmp/word-ladder.json', 'utf8'),
              explanation: 'M is the length of each word, N is the total number of words in the input word list',
            },
          ],
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
        difficulty: 'beginner',
        timeToLearn: 45,
        description: 'A linear data structure where elements are stored in nodes, each pointing to the next node',
        fullDescription: JSON.stringify({
          definition: 'A linked list is a linear data structure where elements are stored in nodes. Each node contains data and a reference (pointer) to the next node in the sequence.',
          analogy: 'Think of a linked list like a treasure hunt where each clue (node) tells you where to find the next clue. You must follow the chain from start to finish - you can\'t jump to the middle.',
        }),
        quickFacts: JSON.stringify({
          timeComplexity: {
            access: 'O(n)',
            search: 'O(n)',
            insertHead: 'O(1)',
            insertTail: 'O(1)',
            deleteHead: 'O(1)',
            deleteTail: 'O(n)',
          },
          spaceComplexity: 'O(n)',
          whenToUse: [
            'Frequent insertions/deletions at beginning',
            'Dynamic size is needed',
            'Don\'t need random access',
          ],
        }),
        types: JSON.stringify([
          { name: 'Singly Linked List', description: 'One-way direction' },
          { name: 'Doubly Linked List', description: 'Two-way direction' },
          { name: 'Circular Linked List', description: 'Last node points to first' },
        ]),
        operations: JSON.stringify([
          {
            name: 'Access',
            timeAvg: 'O(n)',
            timeWorst: 'O(n)',
            space: 'O(1)',
            code: 'traverse from head',
          },
          {
            name: 'Search',
            timeAvg: 'O(n)',
            timeWorst: 'O(n)',
            space: 'O(1)',
            code: 'while (current) { ... }',
          },
          {
            name: 'Insert (head)',
            timeAvg: 'O(1)',
            timeWorst: 'O(1)',
            space: 'O(1)',
            code: 'node.next = head; head = node',
          },
          {
            name: 'Insert (tail)',
            timeAvg: 'O(1)',
            timeWorst: 'O(1)',
            space: 'O(1)',
            code: 'tail.next = node; tail = node',
          },
          {
            name: 'Delete (head)',
            timeAvg: 'O(1)',
            timeWorst: 'O(1)',
            space: 'O(1)',
            code: 'head = head.next',
          },
          {
            name: 'Delete (middle)',
            timeAvg: 'O(n)',
            timeWorst: 'O(n)',
            space: 'O(1)',
            code: 'prev.next = current.next',
          },
        ]),
        codeExamples: JSON.stringify({
          javascript: `// Node class
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

// Linked List class
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // Add to beginning: O(1)
  prepend(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.size++;
  }

  // Add to end: O(1)
  append(data) {
    const newNode = new Node(data);
    if (!this.tail) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  // Search: O(n)
  find(data) {
    let current = this.head;
    while (current) {
      if (current.data === data) return current;
      current = current.next;
    }
    return null;
  }

  // Delete: O(n)
  delete(data) {
    if (!this.head) return false;

    if (this.head.data === data) {
      this.head = this.head.next;
      if (!this.head) this.tail = null;
      this.size--;
      return true;
    }

    let current = this.head;
    while (current.next) {
      if (current.next.data === data) {
        current.next = current.next.next;
        if (!current.next) this.tail = current;
        this.size--;
        return true;
      }
      current = current.next;
    }
    return false;
  }
}`,
        }),
        pros: JSON.stringify([
          'Dynamic size - no need to declare size upfront',
          'Efficient insertions/deletions at beginning: O(1)',
          'Memory efficient - only allocates what\'s needed',
          'Easy to implement stack/queue operations',
        ]),
        cons: JSON.stringify([
          'No random access - must traverse from head',
          'Extra memory for storing pointers/references',
          'Poor cache locality compared to arrays',
          'Reverse traversal difficult (singly linked)',
        ]),
        whenToUse: JSON.stringify({
          use: [
            'Frequent insertions/deletions at beginning',
            'Size is unknown or highly dynamic',
            'Implementing stacks or queues',
            'Memory needs to grow/shrink dynamically',
          ],
          avoid: [
            'Need random access by index',
            'Memory is very constrained',
            'Frequent access to middle elements',
            'Cache performance is critical',
          ],
        }),
        relatedProblems: JSON.stringify([
          { id: 'reverse-linked-list', title: 'Reverse Linked List', difficulty: 'Easy' },
          { id: 'merge-two-sorted-lists', title: 'Merge Two Sorted Lists', difficulty: 'Easy' },
          { id: 'linked-list-cycle', title: 'Linked List Cycle', difficulty: 'Easy' },
        ]),
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
