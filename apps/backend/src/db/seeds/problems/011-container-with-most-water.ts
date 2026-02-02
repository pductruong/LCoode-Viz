import { ProblemSeedData } from '../types';
import { createArray, createPointer, createVariable } from '../helpers';

export const containerWithMostWaterProblem: ProblemSeedData = {
  id: 'container-with-most-water',
  title: '11. Container With Most Water',
  difficulty: 'Medium',
  categories: ['Array', 'Two Pointers', 'Greedy'],
  description: `You are given an integer array \`height\` of length \`n\`. There are \`n\` vertical lines drawn such that the two endpoints of the \`i\`th line are \`(i, 0)\` and \`(i, height[i])\`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

**Notice** that you may not slant the container.`,
  visualizationType: 'array',
  examples: [
    {
      input: { height: [1, 8, 6, 2, 5, 4, 8, 3, 7] },
      output: 49,
      explanation:
        'The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49 (between index 1 and index 8: min(8,7) * (8-1) = 7 * 7 = 49).',
    },
    {
      input: { height: [1, 1] },
      output: 1,
      explanation: 'The container is formed between index 0 and 1, with area = min(1,1) * (1-0) = 1.',
    },
    {
      input: { height: [4, 3, 2, 1, 4] },
      output: 16,
      explanation: 'The container is formed between index 0 and 4, with area = min(4,4) * (4-0) = 16.',
    },
  ],
  constraints: [
    'n == height.length',
    '2 <= n <= 10⁵',
    '0 <= height[i] <= 10⁴',
  ],
  solutions: [
    {
      name: 'Two Pointers (Optimal)',
      code: `function maxArea(height) {
  let maxArea = 0;
  let left = 0;
  let right = height.length - 1;

  while (left < right) {
    // Calculate current area
    const width = right - left;
    const minHeight = Math.min(height[left], height[right]);
    const area = width * minHeight;

    // Update maximum area
    maxArea = Math.max(maxArea, area);

    // Move pointer with smaller height inward
    // (moving the larger one can only decrease area)
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxArea;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      steps: [
        {
          stepNumber: 1,
          description: 'Initialize two pointers at start and end',
          array: createArray([1, 8, 6, 2, 5, 4, 8, 3, 7], [
            'active',
            'default',
            'default',
            'default',
            'default',
            'default',
            'default',
            'default',
            'active',
          ]),
          pointers: [createPointer('left', 0), createPointer('right', 8)],
          variables: [createVariable('maxArea', 0), createVariable('width', 8)],
        },
        {
          stepNumber: 2,
          description: 'Calculate area: min(1,7) × 8 = 8',
          array: createArray([1, 8, 6, 2, 5, 4, 8, 3, 7], [
            'comparing',
            'default',
            'default',
            'default',
            'default',
            'default',
            'default',
            'default',
            'comparing',
          ]),
          pointers: [createPointer('left', 0), createPointer('right', 8)],
          variables: [
            createVariable('maxArea', 8),
            createVariable('currentArea', 8),
            createVariable('minHeight', 1),
            createVariable('calculation', 'min(1,7) × 8 = 8'),
          ],
        },
        {
          stepNumber: 3,
          description: 'Move left pointer (height[0]=1 < height[8]=7)',
          array: createArray([1, 8, 6, 2, 5, 4, 8, 3, 7], [
            'default',
            'active',
            'default',
            'default',
            'default',
            'default',
            'default',
            'default',
            'active',
          ]),
          pointers: [createPointer('left', 1), createPointer('right', 8)],
          variables: [createVariable('maxArea', 8)],
          operation: 'Move smaller height',
        },
        {
          stepNumber: 4,
          description: 'Calculate area: min(8,7) × 7 = 49',
          array: createArray([1, 8, 6, 2, 5, 4, 8, 3, 7], [
            'default',
            'found',
            'default',
            'default',
            'default',
            'default',
            'default',
            'default',
            'found',
          ]),
          pointers: [createPointer('left', 1), createPointer('right', 8)],
          variables: [
            createVariable('maxArea', 49),
            createVariable('currentArea', 49),
            createVariable('minHeight', 7),
            createVariable('calculation', 'min(8,7) × 7 = 49'),
          ],
        },
        {
          stepNumber: 5,
          description: 'Move right pointer (height[8]=7 < height[1]=8)',
          array: createArray([1, 8, 6, 2, 5, 4, 8, 3, 7], [
            'default',
            'active',
            'default',
            'default',
            'default',
            'default',
            'default',
            'active',
            'default',
          ]),
          pointers: [createPointer('left', 1), createPointer('right', 7)],
          variables: [createVariable('maxArea', 49)],
          operation: 'Move smaller height',
        },
        {
          stepNumber: 6,
          description: 'Calculate area: min(8,3) × 6 = 18',
          array: createArray([1, 8, 6, 2, 5, 4, 8, 3, 7], [
            'default',
            'comparing',
            'default',
            'default',
            'default',
            'default',
            'default',
            'comparing',
            'default',
          ]),
          pointers: [createPointer('left', 1), createPointer('right', 7)],
          variables: [
            createVariable('maxArea', 49),
            createVariable('currentArea', 18),
            createVariable('minHeight', 3),
            createVariable('calculation', 'min(8,3) × 6 = 18'),
          ],
        },
        {
          stepNumber: 7,
          description: 'Move right pointer (height[7]=3 < height[1]=8)',
          array: createArray([1, 8, 6, 2, 5, 4, 8, 3, 7], [
            'default',
            'active',
            'default',
            'default',
            'default',
            'default',
            'active',
            'default',
            'default',
          ]),
          pointers: [createPointer('left', 1), createPointer('right', 6)],
          variables: [createVariable('maxArea', 49)],
          operation: 'Move smaller height',
        },
        {
          stepNumber: 8,
          description: 'Calculate area: min(8,8) × 5 = 40',
          array: createArray([1, 8, 6, 2, 5, 4, 8, 3, 7], [
            'default',
            'comparing',
            'default',
            'default',
            'default',
            'default',
            'comparing',
            'default',
            'default',
          ]),
          pointers: [createPointer('left', 1), createPointer('right', 6)],
          variables: [
            createVariable('maxArea', 49),
            createVariable('currentArea', 40),
            createVariable('minHeight', 8),
            createVariable('calculation', 'min(8,8) × 5 = 40'),
          ],
        },
        {
          stepNumber: 9,
          description: 'Continue until pointers meet',
          array: createArray([1, 8, 6, 2, 5, 4, 8, 3, 7], [
            'default',
            'default',
            'active',
            'default',
            'default',
            'default',
            'active',
            'default',
            'default',
          ]),
          pointers: [createPointer('left', 2), createPointer('right', 6)],
          variables: [createVariable('maxArea', 49), createVariable('currentArea', 32)],
        },
        {
          stepNumber: 10,
          description: 'Pointers meet - return maxArea = 49',
          array: createArray([1, 8, 6, 2, 5, 4, 8, 3, 7], [
            'default',
            'default',
            'default',
            'default',
            'default',
            'default',
            'sorted',
            'default',
            'default',
          ]),
          pointers: [createPointer('left', 6), createPointer('right', 6)],
          variables: [createVariable('maxArea', 49), createVariable('result', 49)],
        },
      ],
      explanation:
        'Use two pointers starting from both ends. Always move the pointer with the smaller height inward, as moving the larger one can only decrease the area. This greedy approach guarantees we find the maximum area in O(n) time.',
    },
  ],
};
