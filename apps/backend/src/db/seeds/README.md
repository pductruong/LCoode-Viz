# Seed Data Directory

This directory contains all seed data for the LCode-Viz application, organized into modular TypeScript files for easy maintenance and scalability.

## Directory Structure

```
seeds/
├── README.md                                  # This file
├── types.ts                                   # TypeScript interfaces for seed data
├── helpers.ts                                 # Helper functions for creating visualization data
├── problems/
│   ├── index.ts                               # Exports problems array
│   ├── 001-two-sum.ts
│   ├── 006-zigzag-conversion.ts
│   ├── 011-container-with-most-water.ts
│   └── 127-word-ladder.ts
└── topics/
    ├── index.ts                               # Exports topics array
    └── linkedList.ts
```

## Quick Start

### Adding a New Problem

1. Create a new file in `problems/` with a descriptive name (e.g., `reverseLinkedList.ts`)
2. Define your problem using the `ProblemSeedData` interface
3. Export the problem from `problems/index.ts`
4. Run `pnpm seed` to populate the database

See the [detailed contributing guide](/home/truongpd5/SideProjects/LCode-Viz/apps/backend/CONTRIBUTING.md) for step-by-step examples.

### Adding a New Topic

1. Create a new file in `topics/` with a descriptive name (e.g., `arrays.ts`, `trees.ts`)
2. Define your topic using the `TopicSeedData` interface
3. Export the topic from `topics/index.ts`
4. Run `pnpm seed` to populate the database

See the [detailed contributing guide](/home/truongpd5/SideProjects/LCode-Viz/apps/backend/CONTRIBUTING.md) for complete examples.

## File Naming Conventions

### Problems
Use descriptive names that clearly identify the problem:
- `twoSum.ts` or `001-two-sum.ts`
- `reverseLinkedList.ts` or `206-reverse-linked-list.ts`
- `containerWithMostWater.ts` or `011-container-with-most-water.ts`

### Topics
Use descriptive names matching the data structure or concept:
- `linkedList.ts`
- `arrays.ts`
- `binaryTrees.ts`
- `graphs.ts`

## Key Interfaces

### ProblemSeedData
Defines the structure for algorithm problems including:
- Basic metadata (id, title, difficulty, categories)
- Problem description and examples
- Constraints and test cases
- Solutions with step-by-step visualization data

### TopicSeedData
Defines the structure for learning topics including:
- Category information and difficulty level
- Descriptions and analogies
- Time/space complexity facts
- Code examples in multiple languages
- Pros, cons, and usage guidelines
- Related problems

See [`types.ts`](./types.ts) for complete interface definitions.

## Running Seeds

To populate the database with seed data:

```bash
pnpm seed
```

This command will:
1. Clear existing data from the database
2. Import all problems from `problems/index.ts`
3. Import all topics from `topics/index.ts`
4. Create database records with relationships
5. Display a summary of seeded data

## Testing Your Changes

After seeding the database:

1. **API Endpoints**: Test that data is accessible via REST API
   - `GET /api/problems` - List all problems
   - `GET /api/problems/:id` - Get specific problem
   - `GET /api/topics` - List all topics
   - `GET /api/topics/:id` - Get specific topic

2. **Frontend Display**: Verify the visualization works correctly in the UI
   - Problem list page shows your problem
   - Problem detail page displays correctly
   - Animation steps play smoothly
   - All metadata renders as expected

3. **Code Quality**: Ensure your seed data follows the project conventions
   - TypeScript types are satisfied
   - Helper functions are used where appropriate
   - Code examples are properly formatted

## Helper Functions

The `helpers.ts` file provides utilities for creating visualization step data. These reduce boilerplate and ensure consistency:

- `createArray()` - Create array visualization elements
- `createPointer()` - Create pointer indicators
- `createVariable()` - Create variable displays
- `createGraphNode()` - Create graph nodes
- `createGraphEdge()` - Create graph edges
- And more...

See [`helpers.ts`](./helpers.ts) for available helper functions.

## Additional Resources

- [Contributing Guide](/home/truongpd5/SideProjects/LCode-Viz/apps/backend/CONTRIBUTING.md) - Detailed examples and best practices
- [Migration Guide](./MIGRATION_GUIDE.md) - Historical migration documentation
- [Types Reference](./types.ts) - Complete TypeScript interface definitions
