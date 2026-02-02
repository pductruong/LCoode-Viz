# Contributing Guide: Adding Problems and Topics

This guide explains how to add new problems and topics to LCode-Viz.

## Table of Contents
- [Adding New Problems](#adding-new-problems)
- [Adding New Topics](#adding-new-topics)
- [Data Structure Reference](#data-structure-reference)
- [Testing Your Changes](#testing-your-changes)

---

## Adding New Problems

### Step 1: Create a New Problem File

Create a new file in `src/db/seeds/problems/` with a descriptive name (e.g., `reverseLinkedList.ts`).

```typescript
import { ProblemSeedData } from '../types.js';

export const reverseLinkedListProblem: ProblemSeedData = {
  id: 206,
  title: 'Reverse Linked List',
  difficulty: 'Easy',
  category: 'Linked List',
  description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',

  examples: [
    {
      input: 'head = [1,2,3,4,5]',
      output: '[5,4,3,2,1]',
      explanation: 'The linked list is reversed from 1->2->3->4->5 to 5->4->3->2->1'
    },
    {
      input: 'head = [1,2]',
      output: '[2,1]',
      explanation: 'The linked list is reversed from 1->2 to 2->1'
    }
  ],

  constraints: [
    'The number of nodes in the list is the range [0, 5000]',
    '-5000 <= Node.val <= 5000'
  ],

  solution: {
    approach: 'Iterative',
    intuition: 'We can reverse the linked list iteratively by changing the next pointers of each node to point to the previous node.',
    algorithm: [
      'Initialize three pointers: prev = null, current = head, next = null',
      'Iterate through the list:',
      '  - Store next node: next = current.next',
      '  - Reverse current node\'s pointer: current.next = prev',
      '  - Move pointers one step forward: prev = current, current = next',
      'Return prev (new head of reversed list)'
    ],
    code: `class Solution {
  reverseList(head) {
    let prev = null;
    let current = head;

    while (current !== null) {
      // Store next node
      const next = current.next;

      // Reverse current node's pointer
      current.next = prev;

      // Move pointers one step forward
      prev = current;
      current = next;
    }

    return prev;
  }
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    steps: [
      {
        step: 1,
        description: 'Initialize pointers',
        code: 'let prev = null, current = head',
        state: { prev: null, current: 'head', list: [1, 2, 3, 4, 5] }
      },
      {
        step: 2,
        description: 'Reverse first node pointer',
        code: 'current.next = prev',
        state: { prev: null, current: 1, list: [1, 2, 3, 4, 5], reversed: [1] }
      },
      // Add more steps for visualization
    ]
  }
};
```

### Step 2: Export from Problems Index

Add your problem to `src/db/seeds/problems/index.ts`:

```typescript
import { reverseLinkedListProblem } from './reverseLinkedList.js';
import { twoSumProblem } from './twoSum.js';
// ... other imports

export const problems = [
  twoSumProblem,
  reverseLinkedListProblem,  // Add your problem here
  // ... other problems
];
```

### Step 3: Run the Seed Script

```bash
pnpm seed
```

You should see:
```
✓ Seeded problem: 206. Reverse Linked List
```

---

## Adding New Topics

### Step 1: Create a New Topic File

Create a new file in `src/db/seeds/topics/` (e.g., `arrays.ts`):

```typescript
import { TopicSeedData } from '../types.js';

export const arraysTopic: TopicSeedData = {
  id: 'arrays',
  category: 'Data Structures',
  title: 'Arrays',
  icon: '📊',
  difficulty: 'beginner',
  timeToLearn: 30,

  description: 'A collection of elements stored in contiguous memory locations, accessible by index',

  fullDescription: {
    definition: 'An array is a data structure that stores a collection of elements in contiguous memory locations. Each element can be accessed directly using its index.',
    analogy: 'Think of an array like a row of lockers, each with a number. You can instantly open any locker if you know its number.'
  },

  quickFacts: {
    timeComplexity: {
      access: 'O(1)',
      search: 'O(n)',
      insertEnd: 'O(1)',
      insertMiddle: 'O(n)',
      deleteEnd: 'O(1)',
      deleteMiddle: 'O(n)'
    },
    spaceComplexity: 'O(n)',
    whenToUse: [
      'Need random access by index',
      'Size is known or fixed',
      'Memory locality is important'
    ]
  },

  types: [
    {
      name: 'Static Array',
      description: 'Fixed size, allocated at compile time'
    },
    {
      name: 'Dynamic Array',
      description: 'Grows automatically (e.g., JavaScript arrays, Python lists)'
    }
  ],

  operations: [
    {
      name: 'Access',
      timeAvg: 'O(1)',
      timeWorst: 'O(1)',
      space: 'O(1)',
      code: 'arr[index]'
    },
    {
      name: 'Search',
      timeAvg: 'O(n)',
      timeWorst: 'O(n)',
      space: 'O(1)',
      code: 'arr.indexOf(value)'
    },
    {
      name: 'Insert (end)',
      timeAvg: 'O(1)',
      timeWorst: 'O(n)',
      space: 'O(1)',
      code: 'arr.push(value)'
    }
  ],

  codeExamples: {
    javascript: `// Creating an array
const arr = [1, 2, 3, 4, 5];

// Accessing elements - O(1)
console.log(arr[0]); // 1
console.log(arr[arr.length - 1]); // 5

// Searching - O(n)
const index = arr.indexOf(3); // 2

// Inserting
arr.push(6);        // End: O(1)
arr.unshift(0);     // Start: O(n)
arr.splice(2, 0, 1.5); // Middle: O(n)

// Deleting
arr.pop();          // End: O(1)
arr.shift();        // Start: O(n)
arr.splice(2, 1);   // Middle: O(n)

// Iteration
arr.forEach(item => console.log(item)); // O(n)
const doubled = arr.map(x => x * 2);    // O(n)
const evens = arr.filter(x => x % 2 === 0); // O(n)`,

    python: `# Creating an array (list in Python)
arr = [1, 2, 3, 4, 5]

# Accessing elements - O(1)
print(arr[0])   # 1
print(arr[-1])  # 5

# Searching - O(n)
index = arr.index(3)  # 2

# Inserting
arr.append(6)       # End: O(1)
arr.insert(0, 0)    # Start: O(n)
arr.insert(2, 1.5)  # Middle: O(n)

# Deleting
arr.pop()          # End: O(1)
arr.pop(0)         # Start: O(n)
del arr[2]         # Middle: O(n)`
  },

  pros: [
    'O(1) random access by index',
    'Cache-friendly due to contiguous memory',
    'Simple and widely supported',
    'Efficient for sequential access'
  ],

  cons: [
    'Fixed size (for static arrays)',
    'Expensive insertion/deletion in middle',
    'Memory waste if over-allocated',
    'Resizing dynamic arrays can be costly'
  ],

  whenToUse: {
    use: [
      'Need random access by index',
      'Size is known or doesn\'t change often',
      'Reading is more common than writing',
      'Memory locality is important'
    ],
    avoid: [
      'Frequent insertions/deletions in middle',
      'Size is highly dynamic and unpredictable',
      'Only need sequential access',
      'Memory is extremely limited'
    ]
  },

  relatedProblems: [
    { id: 1, title: 'Two Sum', difficulty: 'Easy' },
    { id: 26, title: 'Remove Duplicates from Sorted Array', difficulty: 'Easy' }
  ]
};
```

### Step 2: Export from Topics Index

Add your topic to `src/db/seeds/topics/index.ts`:

```typescript
import { linkedListTopic } from './linkedList.js';
import { arraysTopic } from './arrays.js';
// ... other imports

export const topics = [
  linkedListTopic,
  arraysTopic,  // Add your topic here
  // ... other topics
];
```

### Step 3: Run the Seed Script

```bash
pnpm seed
```

You should see:
```
✓ Seeded topic: Arrays
```

---

## Data Structure Reference

### ProblemSeedData Interface

```typescript
interface ProblemSeedData {
  id: number;                    // LeetCode problem number
  title: string;                 // Problem title
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;              // e.g., 'Array', 'Linked List', 'Dynamic Programming'
  description: string;           // Problem statement

  examples: Array<{
    input: string;               // Input example
    output: string;              // Expected output
    explanation?: string;        // Optional explanation
  }>;

  constraints: string[];         // Problem constraints

  solution: {
    approach: string;            // e.g., 'Two Pointers', 'Hash Map'
    intuition: string;           // High-level explanation
    algorithm: string[];         // Step-by-step algorithm
    code: string;                // Solution code
    timeComplexity: string;      // e.g., 'O(n)'
    spaceComplexity: string;     // e.g., 'O(1)'
    steps: Array<{               // Visualization steps
      step: number;
      description: string;
      code: string;
      state: Record<string, any>;
    }>;
    explanation?: string;        // Optional detailed explanation
  };
}
```

### TopicSeedData Interface

```typescript
interface TopicSeedData {
  id: string;                    // Unique identifier (kebab-case)
  category: string;              // e.g., 'Data Structures', 'Algorithms'
  title: string;                 // Display title
  icon: string;                  // Emoji icon
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeToLearn: number;           // Estimated minutes

  description: string;           // Short description

  fullDescription: {
    definition: string;          // Formal definition
    analogy: string;             // Real-world analogy
  };

  quickFacts: {
    timeComplexity: Record<string, string>;  // Operation -> complexity
    spaceComplexity: string;
    whenToUse: string[];
  };

  types?: Array<{                // Optional: Different types/variants
    name: string;
    description: string;
  }>;

  operations?: Array<{           // Optional: Common operations
    name: string;
    timeAvg: string;
    timeWorst: string;
    space: string;
    code: string;
  }>;

  codeExamples: {
    javascript?: string;         // At least one language required
    python?: string;
    java?: string;
  };

  pros: string[];                // Advantages
  cons: string[];                // Disadvantages

  whenToUse: {
    use: string[];               // When to use it
    avoid: string[];             // When to avoid it
  };

  commonPatterns?: string[];     // Optional: Common patterns
  visualConcepts?: any;          // Optional: Visualization data
  relatedProblems: Array<{       // Related LeetCode problems
    id: number;
    title: string;
    difficulty: string;
  }>;
}
```

---

## Testing Your Changes

### 1. Verify Data Structure

Before seeding, verify your data matches the interfaces:

```bash
# TypeScript will catch type errors
pnpm build
```

### 2. Run Seed Script

```bash
pnpm seed
```

Check for:
- ✓ Success messages for each item
- No error messages
- Correct counts

### 3. Test API Endpoints

Start the backend server:

```bash
pnpm dev
```

Test endpoints:

```bash
# Get all problems
curl http://localhost:5000/api/problems

# Get specific problem
curl http://localhost:5000/api/problems/206

# Get all topics
curl http://localhost:5000/api/topics

# Get specific topic
curl http://localhost:5000/api/topics/arrays
```

### 4. Test Frontend Display

Start the frontend:

```bash
cd ../frontend
pnpm dev
```

Navigate to:
- Problems: `http://localhost:3000/problems`
- Problem detail: `http://localhost:3000/problems/206`
- Topics: `http://localhost:3000/learn`
- Topic detail: `http://localhost:3000/learn/Data%20Structures/arrays`

Verify:
- No console errors
- All sections display correctly
- Code examples render with syntax highlighting
- Navigation works properly

---

## Common Issues and Solutions

### Issue: "Unknown argument" error when seeding

**Cause**: Field name doesn't match Prisma schema

**Solution**: Check `prisma/schema.prisma` for correct field names

### Issue: "Cannot read properties of undefined"

**Cause**: Missing required field or incorrect data structure

**Solution**: Verify all required fields are present and match the interface

### Issue: Code examples not displaying

**Cause**: `codeExamples` is empty or malformed

**Solution**: Ensure at least one language (javascript, python, or java) has code

### Issue: Visualization steps not working

**Cause**: `steps` array is empty or has incorrect structure

**Solution**: Include at least 2-3 steps with proper state objects

---

## File Structure

```
apps/backend/
├── src/
│   └── db/
│       ├── seed.ts              # Main seed script
│       └── seeds/
│           ├── types.ts         # TypeScript interfaces
│           ├── problems/
│           │   ├── index.ts     # Export all problems
│           │   ├── twoSum.ts
│           │   ├── zigzag.ts
│           │   └── ...          # Add new problem files here
│           └── topics/
│               ├── index.ts     # Export all topics
│               ├── linkedList.ts
│               └── ...          # Add new topic files here
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── dev.db                  # SQLite database
└── CONTRIBUTING.md             # This file
```

---

## Best Practices

### For Problems:

1. **Use clear examples**: Include at least 2-3 examples with explanations
2. **Add visualization steps**: Include 3-5 key steps showing state changes
3. **Write clean code**: Use proper formatting and comments
4. **Test edge cases**: Consider empty inputs, single elements, etc.
5. **Match LeetCode**: Use official problem numbers and titles

### For Topics:

1. **Start simple**: Begin with definition and basic examples
2. **Use analogies**: Help beginners understand with real-world comparisons
3. **Include code**: Show practical implementation in at least JavaScript
4. **Link problems**: Connect theory to practice with related problems
5. **Be accurate**: Verify time/space complexity claims

### General:

1. **Follow naming conventions**: Use camelCase for files, kebab-case for IDs
2. **Add comments**: Explain complex or non-obvious code
3. **Keep it modular**: One file per problem/topic
4. **Test thoroughly**: Verify both backend and frontend
5. **Document changes**: Update this guide if adding new patterns

---

## Questions or Issues?

If you encounter problems or have questions:

1. Check the existing problem/topic files for examples
2. Review the TypeScript interfaces in `src/db/seeds/types.ts`
3. Verify the Prisma schema in `prisma/schema.prisma`
4. Test with the API endpoints before checking the frontend
5. Check browser console for frontend errors

Happy contributing! 🚀
