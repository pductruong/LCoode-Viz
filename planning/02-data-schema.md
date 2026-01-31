# Data Schema Definition

## 1. Overview

This document defines the data structures used throughout LCode-Viz. All problem data is stored as JavaScript/JSON modules in the codebase.

## 2. Problem Definition Schema

### 2.1 Complete Problem Object

```typescript
interface Problem {
  // Metadata
  id: string;                    // Unique identifier (e.g., "two-sum")
  number: number;                // LeetCode problem number
  title: string;                 // Full title (e.g., "1. Two Sum")
  difficulty: "Easy" | "Medium" | "Hard";
  categories: Category[];        // Problem categories/topics
  companies: string[];           // Companies that ask this question (optional)

  // Problem Content
  description: string;           // Problem statement (markdown)
  examples: Example[];           // Input/output examples
  constraints: string[];         // Problem constraints
  hints: string[];               // Hints for solving (optional)

  // Solutions
  solutions: Solution[];         // Array of solutions in different languages

  // Related
  relatedProblems: string[];     // IDs of related problems (optional)
  tags: string[];                // Additional tags (optional)
}
```

### 2.2 Category Enum

```typescript
type Category =
  | "Array"
  | "String"
  | "Hash Table"
  | "Dynamic Programming"
  | "Math"
  | "Sorting"
  | "Greedy"
  | "Depth-First Search"
  | "Breadth-First Search"
  | "Tree"
  | "Binary Search"
  | "Matrix"
  | "Bit Manipulation"
  | "Two Pointers"
  | "Binary Search Tree"
  | "Stack"
  | "Heap (Priority Queue)"
  | "Graph"
  | "Linked List"
  | "Backtracking"
  | "Sliding Window"
  | "Divide and Conquer"
  | "Recursion"
  | "Trie"
  | "Union Find";
```

### 2.3 Example Object

```typescript
interface Example {
  input: Record<string, any>;    // Named inputs
  output: any;                   // Expected output
  explanation?: string;          // Explanation of the example
  image?: string;                // Optional diagram URL
}
```

**Example Instance**:
```javascript
{
  input: {
    nums: [2, 7, 11, 15],
    target: 9
  },
  output: [0, 1],
  explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
}
```

## 3. Solution Schema

### 3.1 Solution Object

```typescript
interface Solution {
  id: string;                    // Unique solution ID
  language: ProgrammingLanguage;
  title: string;                 // Solution title (e.g., "Hash Map Approach")
  code: string;                  // Complete solution code

  // Complexity
  timeComplexity: string;        // Big-O notation (e.g., "O(n)")
  spaceComplexity: string;       // Big-O notation

  // Explanation
  approach: string;              // High-level approach (markdown)
  keyInsights: string[];         // Key insights/patterns

  // Animation Data
  steps: AnimationStep[];        // Step-by-step execution

  // Metadata
  optimized: boolean;            // Is this the optimal solution?
  difficulty: "Beginner" | "Intermediate" | "Advanced"; // Solution difficulty
}
```

### 3.2 Programming Language

```typescript
type ProgrammingLanguage =
  | "javascript"
  | "python"
  | "java"
  | "cpp"
  | "go"
  | "rust";
```

## 4. Animation Schema

### 4.1 Animation Step

```typescript
interface AnimationStep {
  stepNumber: number;            // Step index (0-based)

  // Code Reference
  lineNumbers: number[];         // Lines of code being executed
  lineHighlight?: "normal" | "success" | "error" | "warning";

  // Visual State
  visualState: VisualState;      // What to display

  // Explanation
  explanation: string;           // What's happening in this step
  shortLabel?: string;           // Brief label (e.g., "Initialize", "Compare")

  // Transition
  duration?: number;             // Animation duration in ms (default: 500)
  delay?: number;                // Delay before this step (ms)
}
```

### 4.2 Visual State

The visual state is polymorphic based on the visualization type:

```typescript
type VisualState =
  | ArrayVisualState
  | TreeVisualState
  | GraphVisualState
  | LinkedListVisualState
  | MatrixVisualState
  | CustomVisualState;
```

### 4.3 Array Visual State

```typescript
interface ArrayVisualState {
  type: "array";
  arrays: VisualArray[];         // Can show multiple arrays
  pointers?: Pointer[];          // Pointers/indices
  variables?: Variable[];        // Show variable values
}

interface VisualArray {
  id: string;                    // Unique identifier
  label?: string;                // Array label (e.g., "nums")
  values: ArrayElement[];
  position?: "top" | "middle" | "bottom";
}

interface ArrayElement {
  value: any;                    // Element value
  index: number;                 // Index
  state?: "default" | "active" | "compared" | "swapped" | "sorted" | "target";
  highlight?: string;            // Hex color for custom highlight
}

interface Pointer {
  id: string;
  label: string;                 // Pointer name (e.g., "left", "right", "i")
  arrayId: string;               // Which array it points to
  index: number;                 // Current index
  color?: string;                // Pointer color
}

interface Variable {
  name: string;
  value: any;
  type?: "number" | "string" | "boolean" | "object";
}
```

**Example - Two Sum Animation Step**:
```javascript
{
  stepNumber: 5,
  lineNumbers: [8],
  visualState: {
    type: "array",
    arrays: [{
      id: "nums",
      label: "nums",
      values: [
        { value: 2, index: 0, state: "default" },
        { value: 7, index: 1, state: "active" },
        { value: 11, index: 2, state: "default" },
        { value: 15, index: 3, state: "default" }
      ]
    }],
    pointers: [{
      id: "i",
      label: "i",
      arrayId: "nums",
      index: 1,
      color: "#3b82f6"
    }],
    variables: [
      { name: "target", value: 9, type: "number" },
      { name: "map", value: { "2": 0 }, type: "object" }
    ]
  },
  explanation: "Check if complement (9 - 7 = 2) exists in hash map",
  shortLabel: "Check Map"
}
```

### 4.4 Tree Visual State

```typescript
interface TreeVisualState {
  type: "tree";
  root: TreeNode | null;
  highlightedNodes?: string[];   // Node IDs to highlight
  traversalPath?: string[];      // Show traversal order
}

interface TreeNode {
  id: string;                    // Unique node ID
  value: any;                    // Node value
  left?: TreeNode;
  right?: TreeNode;
  state?: "default" | "active" | "visited" | "target" | "path";
  position?: { x: number, y: number }; // Optional manual positioning
}
```

**Example - Binary Tree Traversal**:
```javascript
{
  stepNumber: 3,
  lineNumbers: [5, 6],
  visualState: {
    type: "tree",
    root: {
      id: "1",
      value: 1,
      state: "active",
      left: {
        id: "2",
        value: 2,
        state: "visited"
      },
      right: {
        id: "3",
        value: 3,
        state: "default"
      }
    },
    traversalPath: ["1", "2"]
  },
  explanation: "Visit root node and traverse left subtree"
}
```

### 4.5 Graph Visual State

```typescript
interface GraphVisualState {
  type: "graph";
  nodes: GraphNode[];
  edges: GraphEdge[];
  layout?: "force" | "circular" | "hierarchical" | "custom";
}

interface GraphNode {
  id: string;
  label: string;
  value?: any;
  state?: "default" | "active" | "visited" | "queued" | "target";
  position?: { x: number, y: number };
  color?: string;
}

interface GraphEdge {
  id: string;
  source: string;                // Source node ID
  target: string;                // Target node ID
  weight?: number;               // Edge weight
  directed?: boolean;            // Is directed edge?
  state?: "default" | "active" | "traversed";
  color?: string;
}
```

### 4.6 Linked List Visual State

```typescript
interface LinkedListVisualState {
  type: "linkedlist";
  lists: VisualLinkedList[];
  pointers?: ListPointer[];
}

interface VisualLinkedList {
  id: string;
  label?: string;
  head: ListNode | null;
  orientation?: "horizontal" | "vertical";
}

interface ListNode {
  id: string;
  value: any;
  next?: ListNode;
  state?: "default" | "active" | "target" | "deleted";
}

interface ListPointer {
  id: string;
  label: string;
  listId: string;
  nodeId: string | null;         // null for null pointer
  color?: string;
}
```

### 4.7 Matrix Visual State

```typescript
interface MatrixVisualState {
  type: "matrix";
  matrix: MatrixCell[][];
  pointers?: MatrixPointer[];
}

interface MatrixCell {
  value: any;
  row: number;
  col: number;
  state?: "default" | "active" | "visited" | "path" | "target";
  highlight?: string;
}

interface MatrixPointer {
  id: string;
  label: string;
  row: number;
  col: number;
  color?: string;
}
```

## 5. Complete Example: Two Sum Problem

```javascript
export const twoSum = {
  // Metadata
  id: "two-sum",
  number: 1,
  title: "1. Two Sum",
  difficulty: "Easy",
  categories: ["Array", "Hash Table"],
  companies: ["Google", "Amazon", "Apple", "Facebook"],

  // Problem Content
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
    },
    {
      input: { nums: [3, 3], target: 6 },
      output: [0, 1]
    }
  ],

  constraints: [
    "2 <= nums.length <= 10⁴",
    "-10⁹ <= nums[i] <= 10⁹",
    "-10⁹ <= target <= 10⁹",
    "Only one valid answer exists."
  ],

  hints: [
    "A brute force approach would be to check every pair. Can you do better?",
    "What if you stored the numbers you've seen so far?"
  ],

  // Solutions
  solutions: [
    {
      id: "hash-map",
      language: "javascript",
      title: "Hash Map (Optimal)",
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
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      approach: `
Use a hash map to store numbers we've seen and their indices. For each number:
1. Calculate its complement (target - current number)
2. Check if complement exists in hash map
3. If yes, return the indices
4. If no, add current number to hash map
      `.trim(),
      keyInsights: [
        "Hash map provides O(1) lookup time",
        "Single pass through array is sufficient",
        "We build the hash map as we go, not upfront"
      ],
      optimized: true,
      difficulty: "Intermediate",

      steps: [
        {
          stepNumber: 0,
          lineNumbers: [1],
          visualState: {
            type: "array",
            arrays: [{
              id: "nums",
              label: "nums",
              values: [
                { value: 2, index: 0, state: "default" },
                { value: 7, index: 1, state: "default" },
                { value: 11, index: 2, state: "default" },
                { value: 15, index: 3, state: "default" }
              ]
            }],
            variables: [
              { name: "target", value: 9, type: "number" }
            ]
          },
          explanation: "Initialize with input array nums and target value 9",
          shortLabel: "Input"
        },
        {
          stepNumber: 1,
          lineNumbers: [2],
          visualState: {
            type: "array",
            arrays: [{
              id: "nums",
              label: "nums",
              values: [
                { value: 2, index: 0, state: "default" },
                { value: 7, index: 1, state: "default" },
                { value: 11, index: 2, state: "default" },
                { value: 15, index: 3, state: "default" }
              ]
            }],
            variables: [
              { name: "target", value: 9, type: "number" },
              { name: "map", value: {}, type: "object" }
            ]
          },
          explanation: "Create empty hash map to store numbers and their indices",
          shortLabel: "Initialize Map"
        },
        {
          stepNumber: 2,
          lineNumbers: [4],
          visualState: {
            type: "array",
            arrays: [{
              id: "nums",
              label: "nums",
              values: [
                { value: 2, index: 0, state: "active" },
                { value: 7, index: 1, state: "default" },
                { value: 11, index: 2, state: "default" },
                { value: 15, index: 3, state: "default" }
              ]
            }],
            pointers: [{
              id: "i",
              label: "i",
              arrayId: "nums",
              index: 0,
              color: "#3b82f6"
            }],
            variables: [
              { name: "target", value: 9, type: "number" },
              { name: "map", value: {}, type: "object" }
            ]
          },
          explanation: "Start loop: i = 0, current number is 2",
          shortLabel: "i = 0"
        },
        {
          stepNumber: 3,
          lineNumbers: [5],
          visualState: {
            type: "array",
            arrays: [{
              id: "nums",
              label: "nums",
              values: [
                { value: 2, index: 0, state: "active" },
                { value: 7, index: 1, state: "default" },
                { value: 11, index: 2, state: "default" },
                { value: 15, index: 3, state: "default" }
              ]
            }],
            pointers: [{
              id: "i",
              label: "i",
              arrayId: "nums",
              index: 0,
              color: "#3b82f6"
            }],
            variables: [
              { name: "target", value: 9, type: "number" },
              { name: "complement", value: 7, type: "number" },
              { name: "map", value: {}, type: "object" }
            ]
          },
          explanation: "Calculate complement: 9 - 2 = 7",
          shortLabel: "Calculate Complement"
        },
        {
          stepNumber: 4,
          lineNumbers: [7],
          visualState: {
            type: "array",
            arrays: [{
              id: "nums",
              label: "nums",
              values: [
                { value: 2, index: 0, state: "active" },
                { value: 7, index: 1, state: "default" },
                { value: 11, index: 2, state: "default" },
                { value: 15, index: 3, state: "default" }
              ]
            }],
            pointers: [{
              id: "i",
              label: "i",
              arrayId: "nums",
              index: 0,
              color: "#3b82f6"
            }],
            variables: [
              { name: "target", value: 9, type: "number" },
              { name: "complement", value: 7, type: "number" },
              { name: "map", value: {}, type: "object" }
            ]
          },
          explanation: "Check if 7 exists in map - it doesn't",
          shortLabel: "Check Map"
        },
        {
          stepNumber: 5,
          lineNumbers: [11],
          visualState: {
            type: "array",
            arrays: [{
              id: "nums",
              label: "nums",
              values: [
                { value: 2, index: 0, state: "default" },
                { value: 7, index: 1, state: "default" },
                { value: 11, index: 2, state: "default" },
                { value: 15, index: 3, state: "default" }
              ]
            }],
            pointers: [{
              id: "i",
              label: "i",
              arrayId: "nums",
              index: 0,
              color: "#3b82f6"
            }],
            variables: [
              { name: "target", value: 9, type: "number" },
              { name: "map", value: { "2": 0 }, type: "object" }
            ]
          },
          explanation: "Add 2 and its index 0 to the map",
          shortLabel: "Add to Map"
        },
        {
          stepNumber: 6,
          lineNumbers: [4],
          visualState: {
            type: "array",
            arrays: [{
              id: "nums",
              label: "nums",
              values: [
                { value: 2, index: 0, state: "default" },
                { value: 7, index: 1, state: "active" },
                { value: 11, index: 2, state: "default" },
                { value: 15, index: 3, state: "default" }
              ]
            }],
            pointers: [{
              id: "i",
              label: "i",
              arrayId: "nums",
              index: 1,
              color: "#3b82f6"
            }],
            variables: [
              { name: "target", value: 9, type: "number" },
              { name: "map", value: { "2": 0 }, type: "object" }
            ]
          },
          explanation: "Next iteration: i = 1, current number is 7",
          shortLabel: "i = 1"
        },
        {
          stepNumber: 7,
          lineNumbers: [5],
          visualState: {
            type: "array",
            arrays: [{
              id: "nums",
              label: "nums",
              values: [
                { value: 2, index: 0, state: "default" },
                { value: 7, index: 1, state: "active" },
                { value: 11, index: 2, state: "default" },
                { value: 15, index: 3, state: "default" }
              ]
            }],
            pointers: [{
              id: "i",
              label: "i",
              arrayId: "nums",
              index: 1,
              color: "#3b82f6"
            }],
            variables: [
              { name: "target", value: 9, type: "number" },
              { name: "complement", value: 2, type: "number" },
              { name: "map", value: { "2": 0 }, type: "object" }
            ]
          },
          explanation: "Calculate complement: 9 - 7 = 2",
          shortLabel: "Calculate Complement"
        },
        {
          stepNumber: 8,
          lineNumbers: [7, 8],
          visualState: {
            type: "array",
            arrays: [{
              id: "nums",
              label: "nums",
              values: [
                { value: 2, index: 0, state: "target" },
                { value: 7, index: 1, state: "target" },
                { value: 11, index: 2, state: "default" },
                { value: 15, index: 3, state: "default" }
              ]
            }],
            pointers: [{
              id: "i",
              label: "i",
              arrayId: "nums",
              index: 1,
              color: "#3b82f6"
            }],
            variables: [
              { name: "target", value: 9, type: "number" },
              { name: "complement", value: 2, type: "number" },
              { name: "map", value: { "2": 0 }, type: "object" },
              { name: "result", value: [0, 1], type: "object" }
            ]
          },
          explanation: "Found! Complement 2 exists at index 0. Return [0, 1]",
          shortLabel: "Found Solution",
          lineHighlight: "success"
        }
      ]
    }
  ],

  relatedProblems: ["3sum", "4sum", "two-sum-ii"],
  tags: ["fundamental", "interview-favorite"]
};
```

## 6. File Organization

```
src/data/problems/
├── index.js              # Exports all problems
├── arrays/
│   ├── two-sum.js
│   ├── three-sum.js
│   ├── best-time-to-buy-stock.js
│   └── ...
├── trees/
│   ├── invert-binary-tree.js
│   ├── max-depth-binary-tree.js
│   └── ...
├── graphs/
│   ├── number-of-islands.js
│   ├── clone-graph.js
│   └── ...
└── ...
```

## 7. Validation

Each problem should be validated against the schema before being added to the application. Create a validation script:

```javascript
function validateProblem(problem) {
  // Check required fields
  // Validate types
  // Ensure animation steps are valid
  // Check code syntax
}
```

## 8. Best Practices

1. **Consistent IDs**: Use kebab-case for all IDs
2. **Comprehensive Steps**: Include enough steps to show algorithm clearly
3. **Clear Explanations**: Each step explanation should be self-contained
4. **Test Cases**: Verify animations work with all provided examples
5. **Code Quality**: Solution code should be clean and idiomatic
6. **Complexity**: Always include time/space complexity analysis
