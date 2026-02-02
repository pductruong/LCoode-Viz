# Migration Guide: New Modular Seed Structure

## Overview

The seed data has been refactored from a single large `seed.ts` file into a modular, maintainable structure.

## Benefits

### 1. **Separation of Concerns**
- Each problem is in its own file
- Easy to find and edit specific problems
- No need to scroll through thousands of lines

### 2. **Reusable Helpers**
```typescript
// Before (verbose):
array: [
  { value: 1, index: 0, state: 'default' },
  { value: 2, index: 1, state: 'default' },
  { value: 3, index: 2, state: 'default' },
]

// After (concise):
array: createArray([1, 2, 3])
```

### 3. **Type Safety**
- Full TypeScript support
- Autocomplete for problem properties
- Catch errors at compile time

### 4. **Easy to Scale**
- Adding new problems: Just create a new file
- No merge conflicts with team members
- Git diffs are much cleaner

### 5. **Better Organization**
```
seeds/
├── problems/
│   ├── 001-two-sum.ts           ← 150 lines
│   ├── 011-container.ts          ← 200 lines
│   └── 127-word-ladder.ts        ← 250 lines
└── topics/
    ├── arrays.ts                 ← 100 lines
    └── linked-list.ts            ← 120 lines

vs.

seed.ts                           ← 1200+ lines (hard to navigate)
```

## Comparison

### Old Way (seed.ts)

```typescript
// All in one massive file
await prisma.problem.create({
  data: {
    id: 'two-sum',
    title: '1. Two Sum',
    // ... 50 lines of data
    solutions: {
      create: [{
        steps: JSON.stringify([
          {
            stepNumber: 1,
            description: '...',
            array: [
              { value: 2, index: 0, state: 'default' },
              { value: 7, index: 1, state: 'default' },
              // ... lots of boilerplate
            ],
            pointers: [
              { name: 'i', index: 0 },
            ],
            variables: [
              { name: 'target', value: 9 },
            ],
          },
          // ... 20 more steps
        ])
      }]
    }
  }
});
// ... repeat for 50+ problems
```

### New Way (Modular)

**File: `problems/001-two-sum.ts`**
```typescript
import { ProblemSeedData } from '../types';
import { createArray, createPointer, createVariable } from '../helpers';

export const twoSumProblem: ProblemSeedData = {
  id: 'two-sum',
  title: '1. Two Sum',
  difficulty: 'Easy',
  categories: ['Array', 'Hash Table'],
  // ... clean, organized data
  solutions: [{
    steps: [
      {
        stepNumber: 1,
        description: 'Initialize variables',
        array: createArray([2, 7, 11, 15]),
        pointers: [createPointer('i', 0)],
        variables: [createVariable('target', 9)],
      },
      // ... more steps
    ],
  }],
};
```

**File: `seed-new.ts`** (Simple and clean!)
```typescript
import { problems } from './problems';

for (const problem of problems) {
  await prisma.problem.create({ data: problem });
}
```

## Migration Steps

### Step 1: Verify New Structure Works ✅

```bash
# Test the new seed script
pnpm tsx src/db/seeds/seed-new.ts

# Verify data was seeded correctly
curl http://localhost:4000/api/problems
```

### Step 2: Migrate Remaining Problems

Create files for:
- `006-zigzag-conversion.ts`
- `127-word-ladder.ts`

Use the existing examples as templates.

### Step 3: Migrate Topics

Create files in `topics/` directory:
- `linked-list.ts`
- `arrays.ts`
- `graph.ts`

### Step 4: Switch to New Seed Script

```bash
# Backup old file (already done)
# Update package.json
{
  "scripts": {
    "seed": "tsx src/db/seeds/seed-new.ts"  // Changed from seed.ts
  }
}

# Delete old file
rm src/db/seed.ts.backup
```

## File Size Comparison

| File | Old | New | Reduction |
|------|-----|-----|-----------|
| seed.ts | 1200+ lines | 60 lines | **95% smaller** |
| Per problem | N/A | 150-250 lines | **Easy to edit** |

## Adding New Problems

### Before
1. Open massive seed.ts file
2. Scroll to find where to add
3. Copy-paste 200 lines of boilerplate
4. Risk breaking other problems
5. Merge conflicts with teammates

### After
1. Create new file: `042-problem-name.ts`
2. Copy template from existing problem
3. Fill in your data with helpers
4. Add to `problems/index.ts` exports
5. Done! ✨

## Real Example: Adding a New Problem

```typescript
// problems/042-trapping-rain-water.ts
import { ProblemSeedData } from '../types';
import { createArray, createPointer, createVariable } from '../helpers';

export const trappingRainWater: ProblemSeedData = {
  id: 'trapping-rain-water',
  title: '42. Trapping Rain Water',
  difficulty: 'Hard',
  categories: ['Array', 'Two Pointers', 'Stack'],
  description: 'Given n non-negative integers representing an elevation map...',
  visualizationType: 'array',
  examples: [{ /* ... */ }],
  constraints: ['1 <= height.length <= 2 * 10⁴'],
  solutions: [{
    name: 'Two Pointers',
    code: `function trap(height) { /* ... */ }`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    steps: [
      {
        stepNumber: 1,
        description: 'Initialize left and right pointers',
        array: createArray([0,1,0,2,1,0,1,3,2,1,2,1]),
        pointers: [
          createPointer('left', 0),
          createPointer('right', 11),
        ],
        variables: [
          createVariable('leftMax', 0),
          createVariable('rightMax', 0),
          createVariable('water', 0),
        ],
      },
      // ... more steps
    ],
    explanation: 'Use two pointers approach...',
  }],
};
```

Then just add one line to `problems/index.ts`:
```typescript
export const problems = [
  twoSumProblem,
  containerWithMostWaterProblem,
  trappingRainWater,  // ← That's it!
];
```

## Conclusion

The new modular structure provides:
- ✅ **Better organization**: Each problem in its own file
- ✅ **Less boilerplate**: Helper functions reduce code
- ✅ **Type safety**: Full TypeScript support
- ✅ **Scalability**: Easy to add 100+ problems
- ✅ **Maintainability**: Changes are isolated
- ✅ **Team-friendly**: No merge conflicts

**Ready to migrate? Follow the steps above!** 🚀
