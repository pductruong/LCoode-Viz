import { ProblemSeedData } from '../types';
import {
  createVariable,
  createQueueItem,
  createWordListItem,
  createGraphNode,
  createGraphEdge,
} from '../helpers';

export const wordLadderProblem: ProblemSeedData = {
  id: 'word-ladder',
  title: '127. Word Ladder',
  difficulty: 'Hard',
  categories: ['Graph', 'BFS', 'String'],
  description:
    'A transformation sequence from word beginWord to word endWord using a dictionary wordList.',
  visualizationType: 'graph',
  examples: [
    {
      input: {
        beginWord: 'hit',
        endWord: 'cog',
        wordList: ['hot', 'dot', 'dog', 'lot', 'log', 'cog'],
      },
      output: 5,
    },
  ],
  constraints: ['1 <= beginWord.length <= 10', 'All words have the same length'],
  solutions: [
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
      steps: [
        {
          stepNumber: 1,
          description: 'Initialize BFS with beginWord "hit" in queue',
          queue: [createQueueItem('hit', 1, 'active')],
          visited: ['hit'],
          wordList: [
            createWordListItem('hot', 'available'),
            createWordListItem('dot', 'available'),
            createWordListItem('dog', 'available'),
            createWordListItem('lot', 'available'),
            createWordListItem('log', 'available'),
            createWordListItem('cog', 'target'),
          ],
          graph: {
            nodes: [createGraphNode('hit', 'hit', 1, 'current')],
            edges: [],
          },
          variables: [
            createVariable('beginWord', 'hit'),
            createVariable('endWord', 'cog'),
            createVariable('level', 1),
          ],
        },
        {
          stepNumber: 2,
          description: 'Process "hit": Find neighbors with 1 letter difference',
          queue: [createQueueItem('hot', 2, 'enqueued')],
          visited: ['hit', 'hot'],
          wordList: [
            createWordListItem('hot', 'visiting'),
            createWordListItem('dot', 'available'),
            createWordListItem('dog', 'available'),
            createWordListItem('lot', 'available'),
            createWordListItem('log', 'available'),
            createWordListItem('cog', 'target'),
          ],
          graph: {
            nodes: [
              createGraphNode('hit', 'hit', 1, 'visited'),
              createGraphNode('hot', 'hot', 2, 'enqueued'),
            ],
            edges: [createGraphEdge('hit', 'hot', 'active')],
          },
          variables: [
            createVariable('currentWord', 'hit'),
            createVariable('neighbor', 'hot'),
            createVariable('level', 2),
          ],
          operation: 'hit → hot (change i to o)',
        },
        {
          stepNumber: 3,
          description: 'Process "hot": Find neighbors "dot" and "lot"',
          queue: [createQueueItem('dot', 3, 'enqueued'), createQueueItem('lot', 3, 'waiting')],
          visited: ['hit', 'hot', 'dot', 'lot'],
          wordList: [
            createWordListItem('hot', 'visited'),
            createWordListItem('dot', 'visiting'),
            createWordListItem('dog', 'available'),
            createWordListItem('lot', 'visiting'),
            createWordListItem('log', 'available'),
            createWordListItem('cog', 'target'),
          ],
          graph: {
            nodes: [
              createGraphNode('hit', 'hit', 1, 'visited'),
              createGraphNode('hot', 'hot', 2, 'processing'),
              createGraphNode('dot', 'dot', 3, 'enqueued'),
              createGraphNode('lot', 'lot', 3, 'enqueued'),
            ],
            edges: [
              createGraphEdge('hit', 'hot', 'visited'),
              createGraphEdge('hot', 'dot', 'active'),
              createGraphEdge('hot', 'lot', 'active'),
            ],
          },
          variables: [
            createVariable('currentWord', 'hot'),
            createVariable('neighbors', 'dot, lot'),
            createVariable('level', 3),
          ],
          operation: 'hot → dot, hot → lot',
        },
        {
          stepNumber: 4,
          description: 'Process "dot": Find neighbor "dog"',
          queue: [createQueueItem('lot', 3, 'waiting'), createQueueItem('dog', 4, 'enqueued')],
          visited: ['hit', 'hot', 'dot', 'lot', 'dog'],
          wordList: [
            createWordListItem('hot', 'visited'),
            createWordListItem('dot', 'visited'),
            createWordListItem('dog', 'visiting'),
            createWordListItem('lot', 'visited'),
            createWordListItem('log', 'available'),
            createWordListItem('cog', 'target'),
          ],
          graph: {
            nodes: [
              createGraphNode('hit', 'hit', 1, 'visited'),
              createGraphNode('hot', 'hot', 2, 'visited'),
              createGraphNode('dot', 'dot', 3, 'processing'),
              createGraphNode('lot', 'lot', 3, 'visited'),
              createGraphNode('dog', 'dog', 4, 'enqueued'),
            ],
            edges: [
              createGraphEdge('hit', 'hot', 'visited'),
              createGraphEdge('hot', 'dot', 'visited'),
              createGraphEdge('hot', 'lot', 'visited'),
              createGraphEdge('dot', 'dog', 'active'),
            ],
          },
          variables: [
            createVariable('currentWord', 'dot'),
            createVariable('neighbor', 'dog'),
            createVariable('level', 4),
          ],
          operation: 'dot → dog (change t to g)',
        },
        {
          stepNumber: 5,
          description: 'Process "lot": Find neighbor "log"',
          queue: [createQueueItem('dog', 4, 'waiting'), createQueueItem('log', 4, 'enqueued')],
          visited: ['hit', 'hot', 'dot', 'lot', 'dog', 'log'],
          wordList: [
            createWordListItem('hot', 'visited'),
            createWordListItem('dot', 'visited'),
            createWordListItem('dog', 'visited'),
            createWordListItem('lot', 'visited'),
            createWordListItem('log', 'visiting'),
            createWordListItem('cog', 'target'),
          ],
          graph: {
            nodes: [
              createGraphNode('hit', 'hit', 1, 'visited'),
              createGraphNode('hot', 'hot', 2, 'visited'),
              createGraphNode('dot', 'dot', 3, 'visited'),
              createGraphNode('lot', 'lot', 3, 'processing'),
              createGraphNode('dog', 'dog', 4, 'visited'),
              createGraphNode('log', 'log', 4, 'enqueued'),
            ],
            edges: [
              createGraphEdge('hit', 'hot', 'visited'),
              createGraphEdge('hot', 'dot', 'visited'),
              createGraphEdge('hot', 'lot', 'visited'),
              createGraphEdge('dot', 'dog', 'visited'),
              createGraphEdge('lot', 'log', 'active'),
            ],
          },
          variables: [
            createVariable('currentWord', 'lot'),
            createVariable('neighbor', 'log'),
            createVariable('level', 4),
          ],
          operation: 'lot → log (change t to g)',
        },
        {
          stepNumber: 6,
          description: 'Process "dog": Find neighbor "cog" (target!)',
          queue: [createQueueItem('log', 4, 'waiting'), createQueueItem('cog', 5, 'enqueued')],
          visited: ['hit', 'hot', 'dot', 'lot', 'dog', 'log', 'cog'],
          wordList: [
            createWordListItem('hot', 'visited'),
            createWordListItem('dot', 'visited'),
            createWordListItem('dog', 'path'),
            createWordListItem('lot', 'visited'),
            createWordListItem('log', 'visited'),
            createWordListItem('cog', 'found'),
          ],
          graph: {
            nodes: [
              createGraphNode('hit', 'hit', 1, 'visited'),
              createGraphNode('hot', 'hot', 2, 'visited'),
              createGraphNode('dot', 'dot', 3, 'visited'),
              createGraphNode('lot', 'lot', 3, 'visited'),
              createGraphNode('dog', 'dog', 4, 'processing'),
              createGraphNode('log', 'log', 4, 'visited'),
              createGraphNode('cog', 'cog', 5, 'found'),
            ],
            edges: [
              createGraphEdge('hit', 'hot', 'visited'),
              createGraphEdge('hot', 'dot', 'visited'),
              createGraphEdge('hot', 'lot', 'visited'),
              createGraphEdge('dot', 'dog', 'visited'),
              createGraphEdge('lot', 'log', 'visited'),
              createGraphEdge('dog', 'cog', 'active'),
            ],
          },
          variables: [
            createVariable('currentWord', 'dog'),
            createVariable('neighbor', 'cog'),
            createVariable('level', 5),
          ],
          operation: 'dog → cog (change d to c)',
        },
        {
          stepNumber: 7,
          description: 'Found target! Transformation length = 5',
          queue: [createQueueItem('cog', 5, 'active')],
          visited: ['hit', 'hot', 'dot', 'lot', 'dog', 'log', 'cog'],
          wordList: [
            createWordListItem('hot', 'path'),
            createWordListItem('dot', 'path'),
            createWordListItem('dog', 'path'),
            createWordListItem('lot', 'visited'),
            createWordListItem('log', 'visited'),
            createWordListItem('cog', 'found'),
          ],
          graph: {
            nodes: [
              createGraphNode('hit', 'hit', 1, 'path'),
              createGraphNode('hot', 'hot', 2, 'path'),
              createGraphNode('dot', 'dot', 3, 'path'),
              createGraphNode('lot', 'lot', 3, 'visited'),
              createGraphNode('dog', 'dog', 4, 'path'),
              createGraphNode('log', 'log', 4, 'visited'),
              createGraphNode('cog', 'cog', 5, 'found'),
            ],
            edges: [
              createGraphEdge('hit', 'hot', 'path'),
              createGraphEdge('hot', 'dot', 'path'),
              createGraphEdge('hot', 'lot', 'visited'),
              createGraphEdge('dot', 'dog', 'path'),
              createGraphEdge('lot', 'log', 'visited'),
              createGraphEdge('dog', 'cog', 'path'),
            ],
          },
          pathFound: ['hit', 'hot', 'dot', 'dog', 'cog'],
          variables: [
            createVariable('result', 5),
            createVariable('path', 'hit → hot → dot → dog → cog'),
          ],
        },
      ],
      explanation: 'M is the length of each word, N is the total number of words in the input word list',
    },
  ],
};
