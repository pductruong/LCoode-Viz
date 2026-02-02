import { ProblemSeedData } from '../types';

export const twoSumProblem: ProblemSeedData = {
  id: 'two-sum',
  title: '1. Two Sum',
  difficulty: 'Easy',
  categories: ['Array', 'Hash Table'],
  description:
    'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.',
  visualizationType: 'array',
  examples: [
    {
      input: { nums: [2, 7, 11, 15], target: 9 },
      output: [0, 1],
      explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
    },
    {
      input: { nums: [3, 2, 4], target: 6 },
      output: [1, 2],
    },
  ],
  constraints: [
    '2 <= nums.length <= 10⁴',
    '-10⁹ <= nums[i] <= 10⁹',
    '-10⁹ <= target <= 10⁹',
    'Only one valid answer exists.',
  ],
  solutions: [
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
      steps: [
        {
          stepNumber: 1,
          description: 'Initialize empty hash map and start iteration',
          array: [
            { value: 2, index: 0, state: 'default' },
            { value: 7, index: 1, state: 'default' },
            { value: 11, index: 2, state: 'default' },
            { value: 15, index: 3, state: 'default' },
          ],
          pointers: [{ name: 'i', index: 0 }],
          variables: [
            { name: 'target', value: 9 },
            { name: 'map', value: '{}' },
          ],
        },
        {
          stepNumber: 2,
          description: 'Check index 0: complement = 9 - 2 = 7',
          array: [
            { value: 2, index: 0, state: 'active' },
            { value: 7, index: 1, state: 'default' },
            { value: 11, index: 2, state: 'default' },
            { value: 15, index: 3, state: 'default' },
          ],
          pointers: [{ name: 'i', index: 0 }],
          variables: [
            { name: 'target', value: 9 },
            { name: 'complement', value: 7 },
            { name: 'map', value: '{}' },
          ],
          operation: 'Calculate complement',
        },
        {
          stepNumber: 3,
          description: 'Complement 7 not in map, store 2 → 0',
          array: [
            { value: 2, index: 0, state: 'comparing' },
            { value: 7, index: 1, state: 'default' },
            { value: 11, index: 2, state: 'default' },
            { value: 15, index: 3, state: 'default' },
          ],
          pointers: [{ name: 'i', index: 0 }],
          variables: [
            { name: 'target', value: 9 },
            { name: 'map', value: '{2: 0}' },
          ],
          operation: 'Add to map',
        },
        {
          stepNumber: 4,
          description: 'Check index 1: complement = 9 - 7 = 2',
          array: [
            { value: 2, index: 0, state: 'default' },
            { value: 7, index: 1, state: 'active' },
            { value: 11, index: 2, state: 'default' },
            { value: 15, index: 3, state: 'default' },
          ],
          pointers: [{ name: 'i', index: 1 }],
          variables: [
            { name: 'target', value: 9 },
            { name: 'complement', value: 2 },
            { name: 'map', value: '{2: 0}' },
          ],
          operation: 'Calculate complement',
        },
        {
          stepNumber: 5,
          description: 'Found! Complement 2 exists in map at index 0',
          array: [
            { value: 2, index: 0, state: 'found' },
            { value: 7, index: 1, state: 'found' },
            { value: 11, index: 2, state: 'default' },
            { value: 15, index: 3, state: 'default' },
          ],
          pointers: [
            { name: 'i', index: 1 },
            { name: 'found', index: 0 },
          ],
          variables: [
            { name: 'target', value: 9 },
            { name: 'result', value: '[0, 1]' },
            { name: 'sum', value: '2 + 7 = 9' },
          ],
          operation: 'Return indices',
        },
      ],
      explanation: 'Use a hash map to store complements',
    },
  ],
};
