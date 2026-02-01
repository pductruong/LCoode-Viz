// Example problem data structure
// This will be used in future implementation

export const twoSum = {
  id: 'two-sum',
  number: 1,
  title: '1. Two Sum',
  difficulty: 'Easy',
  categories: ['Array', 'Hash Table'],

  description: `
Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.
  `.trim(),

  examples: [
    {
      input: { nums: [2, 7, 11, 15], target: 9 },
      output: [0, 1],
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
    },
    {
      input: { nums: [3, 2, 4], target: 6 },
      output: [1, 2]
    }
  ],

  constraints: [
    "2 <= nums.length <= 10⁴",
    "-10⁹ <= nums[i] <= 10⁹",
    "-10⁹ <= target <= 10⁹",
    "Only one valid answer exists."
  ],

  solutions: [
    {
      id: 'hash-map',
      language: 'javascript',
      title: 'Hash Map (Optimal)',
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

      // Animation steps for example: [2, 7, 11, 15], target = 9
      steps: [
        {
          stepNumber: 0,
          description: 'Initialize: Create empty hash map and start at index 0',
          array: [
            { value: 2, index: 0, state: 'default' },
            { value: 7, index: 1, state: 'default' },
            { value: 11, index: 2, state: 'default' },
            { value: 15, index: 3, state: 'default' },
          ],
          pointers: [{ name: 'i', index: 0, color: 'text-blue-500' }],
          variables: [
            { name: 'target', value: 9 },
            { name: 'map', value: '{}' },
          ],
          highlight: { line: 2 },
          operation: 'Initialize',
        },
        {
          stepNumber: 1,
          description: 'i=0: Calculate complement = 9 - 2 = 7',
          array: [
            { value: 2, index: 0, state: 'active' },
            { value: 7, index: 1, state: 'default' },
            { value: 11, index: 2, state: 'default' },
            { value: 15, index: 3, state: 'default' },
          ],
          pointers: [{ name: 'i', index: 0, color: 'text-blue-500' }],
          variables: [
            { name: 'target', value: 9 },
            { name: 'nums[i]', value: 2 },
            { name: 'complement', value: 7 },
            { name: 'map', value: '{}' },
          ],
          highlight: { line: 4 },
          operation: 'Calculate complement',
        },
        {
          stepNumber: 2,
          description: 'i=0: Complement 7 not in map, add nums[0]=2 to map',
          array: [
            { value: 2, index: 0, state: 'comparing' },
            { value: 7, index: 1, state: 'default' },
            { value: 11, index: 2, state: 'default' },
            { value: 15, index: 3, state: 'default' },
          ],
          pointers: [{ name: 'i', index: 0, color: 'text-blue-500' }],
          variables: [
            { name: 'target', value: 9 },
            { name: 'nums[i]', value: 2 },
            { name: 'complement', value: 7 },
            { name: 'map', value: '{2: 0}' },
          ],
          highlight: { line: 9 },
          operation: 'Add to map',
        },
        {
          stepNumber: 3,
          description: 'i=1: Calculate complement = 9 - 7 = 2',
          array: [
            { value: 2, index: 0, state: 'default' },
            { value: 7, index: 1, state: 'active' },
            { value: 11, index: 2, state: 'default' },
            { value: 15, index: 3, state: 'default' },
          ],
          pointers: [{ name: 'i', index: 1, color: 'text-blue-500' }],
          variables: [
            { name: 'target', value: 9 },
            { name: 'nums[i]', value: 7 },
            { name: 'complement', value: 2 },
            { name: 'map', value: '{2: 0}' },
          ],
          highlight: { line: 4 },
          operation: 'Calculate complement',
        },
        {
          stepNumber: 4,
          description: 'i=1: Found! Complement 2 exists in map at index 0',
          array: [
            { value: 2, index: 0, state: 'found' },
            { value: 7, index: 1, state: 'found' },
            { value: 11, index: 2, state: 'default' },
            { value: 15, index: 3, state: 'default' },
          ],
          pointers: [
            { name: 'i', index: 1, color: 'text-blue-500' },
            { name: 'j', index: 0, color: 'text-green-500' },
          ],
          variables: [
            { name: 'target', value: 9 },
            { name: 'nums[i]', value: 7 },
            { name: 'complement', value: 2 },
            { name: 'map', value: '{2: 0}' },
            { name: 'result', value: '[0, 1]' },
          ],
          highlight: { line: 7 },
          operation: 'Found solution!',
        },
        {
          stepNumber: 5,
          description: 'Return indices [0, 1]. Solution: nums[0] + nums[1] = 2 + 7 = 9',
          array: [
            { value: 2, index: 0, state: 'target', label: 'Index 0' },
            { value: 7, index: 1, state: 'target', label: 'Index 1' },
            { value: 11, index: 2, state: 'default' },
            { value: 15, index: 3, state: 'default' },
          ],
          pointers: [],
          variables: [
            { name: 'result', value: '[0, 1]' },
            { name: 'sum', value: '2 + 7 = 9' },
          ],
          highlight: { line: 7 },
          operation: 'Complete',
        },
      ],
    }
  ]
};

export default twoSum;
