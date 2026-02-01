/**
 * LeetCode 127. Word Ladder
 *
 * A transformation sequence from word beginWord to word endWord using a dictionary wordList
 * is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:
 * - Every adjacent pair of words differs by a single letter.
 * - Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.
 * - sk == endWord
 */

export const wordLadder = {
  id: 'word-ladder',
  number: 127,
  title: '127. Word Ladder',
  difficulty: 'Hard',
  categories: ['Hash Table', 'String', 'Breadth-First Search'],
  visualizationType: 'graph',

  description: `
A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:

- Every adjacent pair of words differs by a single letter.
- Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.
- sk == endWord

Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.
  `.trim(),

  examples: [
    {
      input: {
        beginWord: 'hit',
        endWord: 'cog',
        wordList: ['hot', 'dot', 'dog', 'lot', 'log', 'cog']
      },
      output: 5,
      explanation: 'One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> "cog", which is 5 words long.'
    },
    {
      input: {
        beginWord: 'hit',
        endWord: 'cog',
        wordList: ['hot', 'dot', 'dog', 'lot', 'log']
      },
      output: 0,
      explanation: 'The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.'
    }
  ],

  constraints: [
    '1 <= beginWord.length <= 10',
    'endWord.length == beginWord.length',
    '1 <= wordList.length <= 5000',
    'wordList[i].length == beginWord.length',
    'beginWord, endWord, and wordList[i] consist of lowercase English letters',
    'beginWord != endWord',
    'All the words in wordList are unique'
  ],

  solutions: [
    {
      id: 'bfs',
      language: 'javascript',
      title: 'Breadth-First Search (BFS)',
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
      explanation: 'M is the length of each word, N is the total number of words in the input word list',

      // Animation steps for example: "hit" -> "cog"
      steps: [
        {
          stepNumber: 0,
          description: 'Initialize: Create word set, queue with [beginWord, 1], and visited set',
          operation: 'Initialize',
          highlight: { line: 2 },
          variables: [
            { name: 'beginWord', value: 'hit' },
            { name: 'endWord', value: 'cog' },
            { name: 'level', value: 1 },
          ],
          queue: [
            { word: 'hit', level: 1, state: 'active' }
          ],
          visited: ['hit'],
          wordList: [
            { word: 'hot', state: 'available' },
            { word: 'dot', state: 'available' },
            { word: 'dog', state: 'available' },
            { word: 'lot', state: 'available' },
            { word: 'log', state: 'available' },
            { word: 'cog', state: 'available' },
          ],
          graph: {
            nodes: [
              { id: 'hit', label: 'hit', state: 'current', level: 1 }
            ],
            edges: []
          }
        },
        {
          stepNumber: 1,
          description: 'Dequeue "hit" (level 1). Try transformations by changing each letter',
          operation: 'Dequeue',
          highlight: { line: 9 },
          variables: [
            { name: 'word', value: 'hit' },
            { name: 'level', value: 1 },
          ],
          queue: [],
          visited: ['hit'],
          wordList: [
            { word: 'hot', state: 'available' },
            { word: 'dot', state: 'available' },
            { word: 'dog', state: 'available' },
            { word: 'lot', state: 'available' },
            { word: 'log', state: 'available' },
            { word: 'cog', state: 'available' },
          ],
          graph: {
            nodes: [
              { id: 'hit', label: 'hit', state: 'processing', level: 1 }
            ],
            edges: []
          }
        },
        {
          stepNumber: 2,
          description: 'Found "hot" (1 letter change: h→h, i→o, t→t). Add to queue at level 2',
          operation: 'Enqueue neighbor',
          highlight: { line: 18 },
          variables: [
            { name: 'word', value: 'hit' },
            { name: 'newWord', value: 'hot' },
            { name: 'level', value: 2 },
          ],
          queue: [
            { word: 'hot', level: 2, state: 'enqueued' }
          ],
          visited: ['hit', 'hot'],
          wordList: [
            { word: 'hot', state: 'visiting' },
            { word: 'dot', state: 'available' },
            { word: 'dog', state: 'available' },
            { word: 'lot', state: 'available' },
            { word: 'log', state: 'available' },
            { word: 'cog', state: 'available' },
          ],
          graph: {
            nodes: [
              { id: 'hit', label: 'hit', state: 'visited', level: 1 },
              { id: 'hot', label: 'hot', state: 'enqueued', level: 2 }
            ],
            edges: [
              { from: 'hit', to: 'hot', state: 'active' }
            ]
          }
        },
        {
          stepNumber: 3,
          description: 'Dequeue "hot" (level 2). Try all transformations',
          operation: 'Dequeue',
          highlight: { line: 9 },
          variables: [
            { name: 'word', value: 'hot' },
            { name: 'level', value: 2 },
          ],
          queue: [],
          visited: ['hit', 'hot'],
          wordList: [
            { word: 'hot', state: 'visited' },
            { word: 'dot', state: 'available' },
            { word: 'dog', state: 'available' },
            { word: 'lot', state: 'available' },
            { word: 'log', state: 'available' },
            { word: 'cog', state: 'available' },
          ],
          graph: {
            nodes: [
              { id: 'hit', label: 'hit', state: 'visited', level: 1 },
              { id: 'hot', label: 'hot', state: 'processing', level: 2 }
            ],
            edges: [
              { from: 'hit', to: 'hot', state: 'visited' }
            ]
          }
        },
        {
          stepNumber: 4,
          description: 'Found "dot" and "lot" (1 letter from "hot"). Add both to queue at level 3',
          operation: 'Enqueue neighbors',
          highlight: { line: 18 },
          variables: [
            { name: 'word', value: 'hot' },
            { name: 'level', value: 3 },
          ],
          queue: [
            { word: 'dot', level: 3, state: 'enqueued' },
            { word: 'lot', level: 3, state: 'enqueued' }
          ],
          visited: ['hit', 'hot', 'dot', 'lot'],
          wordList: [
            { word: 'hot', state: 'visited' },
            { word: 'dot', state: 'visiting' },
            { word: 'dog', state: 'available' },
            { word: 'lot', state: 'visiting' },
            { word: 'log', state: 'available' },
            { word: 'cog', state: 'available' },
          ],
          graph: {
            nodes: [
              { id: 'hit', label: 'hit', state: 'visited', level: 1 },
              { id: 'hot', label: 'hot', state: 'visited', level: 2 },
              { id: 'dot', label: 'dot', state: 'enqueued', level: 3 },
              { id: 'lot', label: 'lot', state: 'enqueued', level: 3 }
            ],
            edges: [
              { from: 'hit', to: 'hot', state: 'visited' },
              { from: 'hot', to: 'dot', state: 'active' },
              { from: 'hot', to: 'lot', state: 'active' }
            ]
          }
        },
        {
          stepNumber: 5,
          description: 'Dequeue "dot" (level 3). Try transformations',
          operation: 'Dequeue',
          highlight: { line: 9 },
          variables: [
            { name: 'word', value: 'dot' },
            { name: 'level', value: 3 },
          ],
          queue: [
            { word: 'lot', level: 3, state: 'waiting' }
          ],
          visited: ['hit', 'hot', 'dot', 'lot'],
          wordList: [
            { word: 'hot', state: 'visited' },
            { word: 'dot', state: 'visited' },
            { word: 'dog', state: 'available' },
            { word: 'lot', state: 'visiting' },
            { word: 'log', state: 'available' },
            { word: 'cog', state: 'available' },
          ],
          graph: {
            nodes: [
              { id: 'hit', label: 'hit', state: 'visited', level: 1 },
              { id: 'hot', label: 'hot', state: 'visited', level: 2 },
              { id: 'dot', label: 'dot', state: 'processing', level: 3 },
              { id: 'lot', label: 'lot', state: 'enqueued', level: 3 }
            ],
            edges: [
              { from: 'hit', to: 'hot', state: 'visited' },
              { from: 'hot', to: 'dot', state: 'visited' },
              { from: 'hot', to: 'lot', state: 'visited' }
            ]
          }
        },
        {
          stepNumber: 6,
          description: 'Found "dog" (1 letter from "dot": t→g). Add to queue at level 4',
          operation: 'Enqueue neighbor',
          highlight: { line: 18 },
          variables: [
            { name: 'word', value: 'dot' },
            { name: 'newWord', value: 'dog' },
            { name: 'level', value: 4 },
          ],
          queue: [
            { word: 'lot', level: 3, state: 'waiting' },
            { word: 'dog', level: 4, state: 'enqueued' }
          ],
          visited: ['hit', 'hot', 'dot', 'lot', 'dog'],
          wordList: [
            { word: 'hot', state: 'visited' },
            { word: 'dot', state: 'visited' },
            { word: 'dog', state: 'visiting' },
            { word: 'lot', state: 'visiting' },
            { word: 'log', state: 'available' },
            { word: 'cog', state: 'available' },
          ],
          graph: {
            nodes: [
              { id: 'hit', label: 'hit', state: 'visited', level: 1 },
              { id: 'hot', label: 'hot', state: 'visited', level: 2 },
              { id: 'dot', label: 'dot', state: 'visited', level: 3 },
              { id: 'lot', label: 'lot', state: 'enqueued', level: 3 },
              { id: 'dog', label: 'dog', state: 'enqueued', level: 4 }
            ],
            edges: [
              { from: 'hit', to: 'hot', state: 'visited' },
              { from: 'hot', to: 'dot', state: 'visited' },
              { from: 'hot', to: 'lot', state: 'visited' },
              { from: 'dot', to: 'dog', state: 'active' }
            ]
          }
        },
        {
          stepNumber: 7,
          description: 'Dequeue "lot" (level 3). Try transformations',
          operation: 'Dequeue',
          highlight: { line: 9 },
          variables: [
            { name: 'word', value: 'lot' },
            { name: 'level', value: 3 },
          ],
          queue: [
            { word: 'dog', level: 4, state: 'waiting' }
          ],
          visited: ['hit', 'hot', 'dot', 'lot', 'dog'],
          wordList: [
            { word: 'hot', state: 'visited' },
            { word: 'dot', state: 'visited' },
            { word: 'dog', state: 'visiting' },
            { word: 'lot', state: 'visited' },
            { word: 'log', state: 'available' },
            { word: 'cog', state: 'available' },
          ],
          graph: {
            nodes: [
              { id: 'hit', label: 'hit', state: 'visited', level: 1 },
              { id: 'hot', label: 'hot', state: 'visited', level: 2 },
              { id: 'dot', label: 'dot', state: 'visited', level: 3 },
              { id: 'lot', label: 'lot', state: 'processing', level: 3 },
              { id: 'dog', label: 'dog', state: 'enqueued', level: 4 }
            ],
            edges: [
              { from: 'hit', to: 'hot', state: 'visited' },
              { from: 'hot', to: 'dot', state: 'visited' },
              { from: 'hot', to: 'lot', state: 'visited' },
              { from: 'dot', to: 'dog', state: 'visited' }
            ]
          }
        },
        {
          stepNumber: 8,
          description: 'Found "log" (1 letter from "lot": t→g). Add to queue at level 4',
          operation: 'Enqueue neighbor',
          highlight: { line: 18 },
          variables: [
            { name: 'word', value: 'lot' },
            { name: 'newWord', value: 'log' },
            { name: 'level', value: 4 },
          ],
          queue: [
            { word: 'dog', level: 4, state: 'waiting' },
            { word: 'log', level: 4, state: 'enqueued' }
          ],
          visited: ['hit', 'hot', 'dot', 'lot', 'dog', 'log'],
          wordList: [
            { word: 'hot', state: 'visited' },
            { word: 'dot', state: 'visited' },
            { word: 'dog', state: 'visiting' },
            { word: 'lot', state: 'visited' },
            { word: 'log', state: 'visiting' },
            { word: 'cog', state: 'available' },
          ],
          graph: {
            nodes: [
              { id: 'hit', label: 'hit', state: 'visited', level: 1 },
              { id: 'hot', label: 'hot', state: 'visited', level: 2 },
              { id: 'dot', label: 'dot', state: 'visited', level: 3 },
              { id: 'lot', label: 'lot', state: 'visited', level: 3 },
              { id: 'dog', label: 'dog', state: 'enqueued', level: 4 },
              { id: 'log', label: 'log', state: 'enqueued', level: 4 }
            ],
            edges: [
              { from: 'hit', to: 'hot', state: 'visited' },
              { from: 'hot', to: 'dot', state: 'visited' },
              { from: 'hot', to: 'lot', state: 'visited' },
              { from: 'dot', to: 'dog', state: 'visited' },
              { from: 'lot', to: 'log', state: 'active' }
            ]
          }
        },
        {
          stepNumber: 9,
          description: 'Dequeue "dog" (level 4). Try transformations',
          operation: 'Dequeue',
          highlight: { line: 9 },
          variables: [
            { name: 'word', value: 'dog' },
            { name: 'level', value: 4 },
          ],
          queue: [
            { word: 'log', level: 4, state: 'waiting' }
          ],
          visited: ['hit', 'hot', 'dot', 'lot', 'dog', 'log'],
          wordList: [
            { word: 'hot', state: 'visited' },
            { word: 'dot', state: 'visited' },
            { word: 'dog', state: 'visited' },
            { word: 'lot', state: 'visited' },
            { word: 'log', state: 'visiting' },
            { word: 'cog', state: 'available' },
          ],
          graph: {
            nodes: [
              { id: 'hit', label: 'hit', state: 'visited', level: 1 },
              { id: 'hot', label: 'hot', state: 'visited', level: 2 },
              { id: 'dot', label: 'dot', state: 'visited', level: 3 },
              { id: 'lot', label: 'lot', state: 'visited', level: 3 },
              { id: 'dog', label: 'dog', state: 'processing', level: 4 },
              { id: 'log', label: 'log', state: 'enqueued', level: 4 }
            ],
            edges: [
              { from: 'hit', to: 'hot', state: 'visited' },
              { from: 'hot', to: 'dot', state: 'visited' },
              { from: 'hot', to: 'lot', state: 'visited' },
              { from: 'dot', to: 'dog', state: 'visited' },
              { from: 'lot', to: 'log', state: 'visited' }
            ]
          }
        },
        {
          stepNumber: 10,
          description: 'Found "cog" (1 letter from "dog": d→c). Add to queue at level 5',
          operation: 'Enqueue neighbor',
          highlight: { line: 18 },
          variables: [
            { name: 'word', value: 'dog' },
            { name: 'newWord', value: 'cog' },
            { name: 'level', value: 5 },
          ],
          queue: [
            { word: 'log', level: 4, state: 'waiting' },
            { word: 'cog', level: 5, state: 'enqueued' }
          ],
          visited: ['hit', 'hot', 'dot', 'lot', 'dog', 'log', 'cog'],
          wordList: [
            { word: 'hot', state: 'visited' },
            { word: 'dot', state: 'visited' },
            { word: 'dog', state: 'visited' },
            { word: 'lot', state: 'visited' },
            { word: 'log', state: 'visiting' },
            { word: 'cog', state: 'target' },
          ],
          graph: {
            nodes: [
              { id: 'hit', label: 'hit', state: 'visited', level: 1 },
              { id: 'hot', label: 'hot', state: 'visited', level: 2 },
              { id: 'dot', label: 'dot', state: 'visited', level: 3 },
              { id: 'lot', label: 'lot', state: 'visited', level: 3 },
              { id: 'dog', label: 'dog', state: 'visited', level: 4 },
              { id: 'log', label: 'log', state: 'enqueued', level: 4 },
              { id: 'cog', label: 'cog', state: 'target', level: 5 }
            ],
            edges: [
              { from: 'hit', to: 'hot', state: 'visited' },
              { from: 'hot', to: 'dot', state: 'visited' },
              { from: 'hot', to: 'lot', state: 'visited' },
              { from: 'dot', to: 'dog', state: 'visited' },
              { from: 'lot', to: 'log', state: 'visited' },
              { from: 'dog', to: 'cog', state: 'found' }
            ]
          }
        },
        {
          stepNumber: 11,
          description: 'Dequeue "log" (level 4). Note: "cog" already in queue!',
          operation: 'Dequeue',
          highlight: { line: 9 },
          variables: [
            { name: 'word', value: 'log' },
            { name: 'level', value: 4 },
          ],
          queue: [
            { word: 'cog', level: 5, state: 'waiting' }
          ],
          visited: ['hit', 'hot', 'dot', 'lot', 'dog', 'log', 'cog'],
          wordList: [
            { word: 'hot', state: 'visited' },
            { word: 'dot', state: 'visited' },
            { word: 'dog', state: 'visited' },
            { word: 'lot', state: 'visited' },
            { word: 'log', state: 'visited' },
            { word: 'cog', state: 'target' },
          ],
          graph: {
            nodes: [
              { id: 'hit', label: 'hit', state: 'visited', level: 1 },
              { id: 'hot', label: 'hot', state: 'visited', level: 2 },
              { id: 'dot', label: 'dot', state: 'visited', level: 3 },
              { id: 'lot', label: 'lot', state: 'visited', level: 3 },
              { id: 'dog', label: 'dog', state: 'visited', level: 4 },
              { id: 'log', label: 'log', state: 'processing', level: 4 },
              { id: 'cog', label: 'cog', state: 'target', level: 5 }
            ],
            edges: [
              { from: 'hit', to: 'hot', state: 'visited' },
              { from: 'hot', to: 'dot', state: 'visited' },
              { from: 'hot', to: 'lot', state: 'visited' },
              { from: 'dot', to: 'dog', state: 'visited' },
              { from: 'lot', to: 'log', state: 'visited' },
              { from: 'dog', to: 'cog', state: 'found' },
              { from: 'log', to: 'cog', state: 'found' }
            ]
          }
        },
        {
          stepNumber: 12,
          description: 'Dequeue "cog" (level 5). Found endWord! Return 5',
          operation: 'Found solution!',
          highlight: { line: 12 },
          variables: [
            { name: 'word', value: 'cog' },
            { name: 'level', value: 5 },
            { name: 'result', value: 5 },
          ],
          queue: [],
          visited: ['hit', 'hot', 'dot', 'lot', 'dog', 'log', 'cog'],
          wordList: [
            { word: 'hot', state: 'path' },
            { word: 'dot', state: 'path' },
            { word: 'dog', state: 'path' },
            { word: 'lot', state: 'visited' },
            { word: 'log', state: 'visited' },
            { word: 'cog', state: 'found' },
          ],
          graph: {
            nodes: [
              { id: 'hit', label: 'hit', state: 'path', level: 1 },
              { id: 'hot', label: 'hot', state: 'path', level: 2 },
              { id: 'dot', label: 'dot', state: 'path', level: 3 },
              { id: 'lot', label: 'lot', state: 'visited', level: 3 },
              { id: 'dog', label: 'dog', state: 'path', level: 4 },
              { id: 'log', label: 'log', state: 'visited', level: 4 },
              { id: 'cog', label: 'cog', state: 'found', level: 5 }
            ],
            edges: [
              { from: 'hit', to: 'hot', state: 'path' },
              { from: 'hot', to: 'dot', state: 'path' },
              { from: 'hot', to: 'lot', state: 'visited' },
              { from: 'dot', to: 'dog', state: 'path' },
              { from: 'lot', to: 'log', state: 'visited' },
              { from: 'dog', to: 'cog', state: 'path' },
              { from: 'log', to: 'cog', state: 'visited' }
            ]
          },
          pathFound: ['hit', 'hot', 'dot', 'dog', 'cog']
        }
      ]
    }
  ]
};

export default wordLadder;
