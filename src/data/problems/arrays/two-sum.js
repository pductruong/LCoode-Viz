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

      // Animation steps will be added in Phase 2
      steps: []
    }
  ]
};

export default twoSum;
