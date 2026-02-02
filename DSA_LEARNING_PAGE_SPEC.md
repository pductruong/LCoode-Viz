# Data Structures & Algorithms Learning Page - Specification

**Version**: 1.0
**Date**: February 1, 2026
**Status**: Draft for Review

---

## Overview

A dedicated learning page that teaches data structures and algorithms through interactive visualizations, clear explanations, and practical examples.

---

## Goals

### Primary Goals
1. **Educational**: Teach DS&A concepts from basics to advanced
2. **Interactive**: Visual learning with animations
3. **Practical**: Connect concepts to LeetCode problems
4. **Progressive**: Learn step-by-step with clear progression

### User Benefits
- Understand fundamental concepts before solving problems
- Visual learning with animations
- Quick reference for DS&A operations
- See time/space complexity in action
- Bridge theory to practice (LeetCode problems)

---

## Page Structure

### Route
- **URL**: `/learn`
- **Navigation**: Add "Learn" link to header (between Home and Problems)

### Layout

```
┌─────────────────────────────────────────────────┐
│ Header (with Learn link)                       │
├─────────────────────────────────────────────────┤
│                                                 │
│  Hero Section                                   │
│  - Title: "Learn Data Structures & Algorithms" │
│  - Subtitle: Interactive visual guide          │
│  - Search bar (filter topics)                  │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  Category Tabs                                  │
│  [Data Structures] [Algorithms] [Patterns]     │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  Topic Cards Grid                               │
│  ┌────────┐ ┌────────┐ ┌────────┐              │
│  │ Array  │ │  Tree  │ │ Graph  │              │
│  └────────┘ └────────┘ └────────┘              │
│                                                 │
├─────────────────────────────────────────────────┤
│ Footer                                          │
└─────────────────────────────────────────────────┘
```

---

## Content Categories

### 1. Data Structures

#### **Linear Data Structures**
- **Array**
  - What: Contiguous memory, fixed/dynamic size
  - Operations: Access O(1), Insert O(n), Delete O(n), Search O(n)
  - Use cases: Random access, ordered data
  - Visual: Array cells with indices
  - Related problems: Two Sum, Best Time to Buy Stock

- **Linked List**
  - What: Nodes connected by pointers
  - Types: Singly, Doubly, Circular
  - Operations: Insert O(1), Delete O(1), Search O(n)
  - Use cases: Dynamic size, frequent insertions
  - Visual: Nodes with arrows
  - Related problems: Reverse Linked List, Detect Cycle

- **Stack**
  - What: LIFO (Last In, First Out)
  - Operations: Push O(1), Pop O(1), Peek O(1)
  - Use cases: Undo/redo, DFS, expression evaluation
  - Visual: Stack of plates
  - Related problems: Valid Parentheses, Min Stack

- **Queue**
  - What: FIFO (First In, First Out)
  - Operations: Enqueue O(1), Dequeue O(1)
  - Use cases: BFS, task scheduling
  - Visual: Line of people
  - Related problems: Word Ladder (BFS queue)

#### **Non-Linear Data Structures**
- **Binary Tree**
  - What: Nodes with up to 2 children
  - Types: Full, Complete, Perfect, Balanced
  - Traversals: Inorder, Preorder, Postorder, Level-order
  - Visual: Tree diagram with nodes and edges
  - Related problems: Binary Tree Level Order

- **Binary Search Tree (BST)**
  - What: Ordered binary tree (left < root < right)
  - Operations: Search O(log n), Insert O(log n), Delete O(log n)
  - Use cases: Sorted data, fast search
  - Visual: BST with ordering
  - Related problems: Validate BST

- **Heap**
  - What: Complete binary tree (min/max heap)
  - Operations: Insert O(log n), Extract O(log n), Peek O(1)
  - Use cases: Priority queue, K largest elements
  - Visual: Heap structure with parent-child relations
  - Related problems: Kth Largest Element

- **Hash Table**
  - What: Key-value pairs with hash function
  - Operations: Insert O(1), Search O(1), Delete O(1)
  - Collision: Chaining, Open addressing
  - Use cases: Fast lookup, caching
  - Visual: Buckets with hash function
  - Related problems: Two Sum, Group Anagrams

- **Graph**
  - What: Vertices connected by edges
  - Types: Directed, Undirected, Weighted
  - Representations: Adjacency list, Adjacency matrix
  - Visual: Nodes with edges
  - Related problems: Word Ladder, Course Schedule

- **Trie (Prefix Tree)**
  - What: Tree for string prefixes
  - Operations: Insert O(m), Search O(m), StartsWith O(m)
  - Use cases: Autocomplete, spell check
  - Visual: Tree with character nodes
  - Related problems: Implement Trie

---

### 2. Algorithms

#### **Searching**
- **Linear Search**
  - Time: O(n), Space: O(1)
  - Visual: Check each element sequentially

- **Binary Search**
  - Time: O(log n), Space: O(1)
  - Prerequisite: Sorted array
  - Visual: Divide and conquer
  - Related problems: Search Insert Position

#### **Sorting**
- **Bubble Sort**
  - Time: O(n²), Space: O(1)
  - Visual: Adjacent swaps, bubbling up

- **Selection Sort**
  - Time: O(n²), Space: O(1)
  - Visual: Select minimum, place in position

- **Insertion Sort**
  - Time: O(n²), Space: O(1)
  - Visual: Insert into sorted portion

- **Merge Sort**
  - Time: O(n log n), Space: O(n)
  - Visual: Divide, sort, merge

- **Quick Sort**
  - Time: O(n log n) avg, Space: O(log n)
  - Visual: Pivot, partition, recurse

#### **Graph Algorithms**
- **Breadth-First Search (BFS)**
  - Time: O(V + E), Space: O(V)
  - Use: Shortest path, level-order
  - Visual: Level-by-level exploration
  - Related problems: Word Ladder

- **Depth-First Search (DFS)**
  - Time: O(V + E), Space: O(V)
  - Use: Path finding, cycle detection
  - Visual: Deep exploration
  - Related problems: Number of Islands

- **Dijkstra's Algorithm**
  - Time: O((V + E) log V), Space: O(V)
  - Use: Shortest path in weighted graph
  - Visual: Priority queue, distance updates

#### **Dynamic Programming**
- **Fibonacci**
  - Memoization vs Tabulation
  - Visual: DP table/tree

- **Longest Common Subsequence**
  - 2D DP table
  - Visual: Grid with choices

---

### 3. Common Patterns

#### **Two Pointers**
- When: Sorted array, palindrome check
- Examples: Two Sum II, Container With Most Water
- Visual: Two arrows moving

#### **Sliding Window**
- When: Subarray/substring problems
- Examples: Longest Substring Without Repeating
- Visual: Window moving across array

#### **Fast & Slow Pointers**
- When: Cycle detection, middle finding
- Examples: Linked List Cycle
- Visual: Tortoise and hare

#### **Binary Search Pattern**
- When: Sorted data, search space reduction
- Examples: Search in Rotated Array
- Visual: Divide and conquer

#### **BFS/DFS Pattern**
- When: Tree/graph traversal
- Examples: Word Ladder, Number of Islands
- Visual: Level-order vs depth-first

#### **Backtracking**
- When: Generate permutations, combinations
- Examples: Permutations, N-Queens
- Visual: Decision tree

---

## Individual Topic Page Structure

### URL Pattern
- `/learn/:category/:topic`
- Example: `/learn/data-structures/array`

### Topic Page Layout

```
┌─────────────────────────────────────────┐
│ Breadcrumb: Learn > Data Structures > Array
├─────────────────────────────────────────┤
│                                         │
│ Topic Header                            │
│ - Icon                                  │
│ - Title: "Array"                        │
│ - Difficulty: Beginner/Intermediate     │
│ - Time to learn: 15 mins                │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│ Quick Facts                             │
│ - Time Complexity: O(...)               │
│ - Space Complexity: O(...)              │
│ - When to use: ...                      │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│ What is it?                             │
│ - Clear definition                      │
│ - Real-world analogy                    │
│ - Diagram/illustration                  │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│ Visual Demonstration                    │
│ - Interactive animation                 │
│ - Step controls                         │
│ - Operation examples                    │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│ Operations & Complexity                 │
│ Table:                                  │
│ Operation | Time | Space | Code         │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│ Code Examples                           │
│ - JavaScript implementation             │
│ - Common operations                     │
│ - Syntax highlighting                   │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│ Pros & Cons                             │
│ Advantages | Disadvantages              │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│ When to Use                             │
│ - Use cases                             │
│ - Best scenarios                        │
│ - Avoid when...                         │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│ Related LeetCode Problems               │
│ - Problem cards (link to our problems)  │
│ - Difficulty indicator                  │
│ - "Try Problem" button                  │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│ Practice Quiz (Optional)                │
│ - Multiple choice questions             │
│ - Instant feedback                      │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│ Related Topics                          │
│ - Links to similar structures           │
│ - Next recommended topic                │
│                                         │
└─────────────────────────────────────────┘
```

---

## Example: Array Topic Content

### Header
```
Icon: 📊
Title: Array
Difficulty: 🟢 Beginner
Time: 10 minutes
```

### Quick Facts
```
✓ Time Complexity:
  - Access: O(1)
  - Search: O(n)
  - Insert: O(n)
  - Delete: O(n)

✓ Space Complexity: O(n)

✓ When to use:
  - Random access needed
  - Fixed or known size
  - Ordered collection
```

### What is it?
```
An array is a collection of elements stored in contiguous memory
locations. Each element can be accessed directly using its index.

Real-world analogy:
Think of an array like a row of mailboxes in an apartment building.
Each mailbox has a number (index) and you can go directly to any
mailbox if you know its number.

[Visual: Mailbox illustration or array cells]
```

### Visual Demonstration
```
Interactive animation showing:
1. Creating an array
2. Accessing element at index
3. Inserting element (shift elements)
4. Deleting element (shift elements)
5. Searching for element

Controls: Play, Pause, Step, Reset, Speed
```

### Operations Table
```
| Operation      | Average | Worst | Example Code           |
|----------------|---------|-------|------------------------|
| Access         | O(1)    | O(1)  | arr[i]                |
| Search         | O(n)    | O(n)  | arr.indexOf(x)        |
| Insert (end)   | O(1)    | O(n)  | arr.push(x)           |
| Insert (start) | O(n)    | O(n)  | arr.unshift(x)        |
| Delete (end)   | O(1)    | O(1)  | arr.pop()             |
| Delete (start) | O(n)    | O(n)  | arr.shift()           |
```

### Code Examples
```javascript
// Creating an array
const arr = [1, 2, 3, 4, 5];

// Accessing elements
console.log(arr[0]); // 1 (O(1))

// Searching
const index = arr.indexOf(3); // O(n)

// Inserting
arr.push(6);        // End: O(1)
arr.unshift(0);     // Start: O(n)
arr.splice(2, 0, 1.5); // Middle: O(n)

// Deleting
arr.pop();          // End: O(1)
arr.shift();        // Start: O(n)
arr.splice(2, 1);   // Middle: O(n)
```

### Pros & Cons
```
✅ Advantages:
- Fast access by index: O(1)
- Memory efficient (contiguous)
- Simple to understand
- Cache-friendly

❌ Disadvantages:
- Fixed size (in many languages)
- Expensive insertions/deletions: O(n)
- Wasted space if not full
- Not efficient for searching unsorted data
```

### When to Use
```
✓ Use when:
- You need random access by index
- Size is known or doesn't change often
- Reading is more common than writing
- Memory locality is important

✗ Avoid when:
- Frequent insertions/deletions
- Size is highly dynamic
- Only need sequential access
```

### Related Problems
```
[Problem Card: Two Sum]
Difficulty: Easy
Uses array for storing numbers and indices

[Problem Card: Best Time to Buy Stock]
Difficulty: Easy
Array represents stock prices over time
```

### Practice Quiz
```
Q1: What is the time complexity of accessing an element by index?
○ O(n)
● O(1)  ← Correct!
○ O(log n)
○ O(n²)

Q2: When is inserting into an array O(1)?
● At the end (if space available)  ← Correct!
○ At the beginning
○ In the middle
○ Always O(n)
```

---

## Components Needed

### New Components

1. **LearnPage.jsx**
   - Main learning hub
   - Category tabs
   - Topic grid
   - Search/filter

2. **TopicCard.jsx**
   - Topic preview card
   - Icon, title, difficulty
   - Progress indicator (optional)
   - Link to topic page

3. **TopicDetailPage.jsx**
   - Individual topic page
   - All sections (what, visual, code, etc.)
   - Related problems
   - Navigation

4. **DSAVisualizer.jsx**
   - Generic visualizer for operations
   - Array, Stack, Queue, Tree demos
   - Interactive controls

5. **CodeBlock.jsx**
   - Syntax highlighted code
   - Copy button
   - Language selector

6. **ComplexityTable.jsx**
   - Operation complexity table
   - Color-coded performance

7. **ProsConsList.jsx**
   - Advantages/disadvantages
   - Icons and formatting

8. **QuizCard.jsx** (Optional)
   - Multiple choice questions
   - Instant feedback
   - Scoring

---

## Data Structure

### Topic Data Format

```javascript
// src/data/learn/array.js
export const arrayTopic = {
  id: 'array',
  category: 'data-structures',
  title: 'Array',
  icon: '📊',
  difficulty: 'beginner', // beginner, intermediate, advanced
  timeToLearn: 10, // minutes

  quickFacts: {
    timeComplexity: {
      access: 'O(1)',
      search: 'O(n)',
      insert: 'O(n)',
      delete: 'O(n)',
    },
    spaceComplexity: 'O(n)',
    whenToUse: [
      'Random access needed',
      'Fixed or known size',
      'Ordered collection'
    ]
  },

  description: {
    definition: 'An array is...',
    analogy: 'Think of an array like...',
    diagram: '/images/array-diagram.png' // optional
  },

  operations: [
    {
      name: 'Access',
      timeAvg: 'O(1)',
      timeWorst: 'O(1)',
      space: 'O(1)',
      code: 'arr[i]'
    },
    // ... more operations
  ],

  codeExamples: {
    javascript: `// code here`,
    python: `# code here`, // optional
  },

  pros: [
    'Fast access by index: O(1)',
    'Memory efficient',
    // ...
  ],

  cons: [
    'Fixed size',
    'Expensive insertions',
    // ...
  ],

  whenToUse: {
    use: ['...'],
    avoid: ['...']
  },

  relatedProblems: [
    { id: 'two-sum', difficulty: 'easy' },
    // ...
  ],

  quiz: [ // optional
    {
      question: 'What is...',
      options: ['A', 'B', 'C', 'D'],
      correctIndex: 0,
      explanation: '...'
    }
  ],

  relatedTopics: [
    { id: 'linked-list', title: 'Linked List' },
    { id: 'stack', title: 'Stack' }
  ]
};
```

---

## Visual Design

### Color Scheme
```
Beginner:    Green (#10B981)
Intermediate: Yellow (#F59E0B)
Advanced:     Red (#EF4444)

Categories:
Data Structures: Blue (#3B82F6)
Algorithms:      Purple (#8B5CF6)
Patterns:        Orange (#F97316)
```

### Icons
- Array: 📊
- Linked List: 🔗
- Stack: 📚
- Queue: ⏭️
- Tree: 🌳
- Graph: 🕸️
- Hash Table: #️⃣
- Heap: ⛰️
- Trie: 🌲

---

## Features

### Phase 1 (MVP)
- ✅ Learn page route
- ✅ Topic cards for 5 data structures (Array, Linked List, Stack, Queue, Hash Table)
- ✅ Basic topic detail pages
- ✅ Operations table
- ✅ Code examples
- ✅ Related problems linking
- ✅ Dark mode support

### Phase 2 (Enhanced)
- ⏳ Interactive visualizations for each DS
- ⏳ Search/filter functionality
- ⏳ Progress tracking
- ⏳ More data structures (Tree, Graph, Heap)
- ⏳ Algorithm animations

### Phase 3 (Advanced)
- ⏳ Practice quizzes
- ⏳ Code playground (run code)
- ⏳ Comparison tool (compare DS)
- ⏳ Learning paths
- ⏳ Bookmarks/favorites

---

## User Flow

### Learning Journey

```
1. User clicks "Learn" in header
   ↓
2. Sees learning hub with categories
   ↓
3. Clicks "Data Structures" tab
   ↓
4. Browses topic cards (Array, Stack, etc.)
   ↓
5. Clicks "Array" card
   ↓
6. Reads about arrays
   - What it is
   - Operations
   - Code examples
   - Pros/cons
   ↓
7. Sees related problems (Two Sum)
   ↓
8. Clicks "Try Problem"
   ↓
9. Navigates to Two Sum problem page
   ↓
10. Solves problem with animation
   ↓
11. Returns to learn page (breadcrumb)
   ↓
12. Continues to next topic
```

---

## Integration with Existing Features

### Navigation
- Add "Learn" link to Header (between Home and Problems)
- Breadcrumbs: Learn > Category > Topic
- Back buttons to navigate up

### Cross-linking
- Problem pages link to relevant topics
  - "Learn about Arrays" link on Two Sum
  - "Learn about BFS" link on Word Ladder
- Topic pages link to problems
  - Related problems section

### Consistent Design
- Use existing color scheme
- Same card styles as ProblemCard
- Consistent animations
- Dark mode throughout

---

## SEO & Accessibility

### Meta Tags
- Title: "Learn [Topic] - LCode-Viz"
- Description: "Interactive visual guide to [Topic]..."
- Keywords: data structures, algorithms, visualization

### Accessibility
- Semantic HTML (h1, h2, sections)
- ARIA labels on interactive elements
- Keyboard navigation
- Alt text on visuals
- Color contrast compliance

---

## Future Enhancements

### Interactive Playground
```javascript
// Code editor in the browser
const arr = [1, 2, 3];
arr.push(4);
// See visualization update in real-time
```

### Learning Paths
```
Path: "Beginner to Advanced Arrays"
1. Array basics ✓
2. Two pointers ✓
3. Sliding window ⏳
4. Binary search ⏳
```

### Achievements/Badges
- "Array Master" - Complete all array topics
- "Graph Explorer" - Complete all graph topics
- "Problem Solver" - Solve 10 problems

### Spaced Repetition
- Review suggestions
- "Time to review: Hash Tables"
- Practice reminders

---

## Success Metrics

### User Engagement
- Time spent on learn pages
- Topics completed
- Problems solved after learning
- Return rate to learn section

### Educational Impact
- Topics → Problems conversion rate
- Problem success rate after learning
- User feedback/ratings

---

## Questions for Review

Before implementation, please consider:

1. **Content Depth**: How detailed should each topic be?
   - Brief overview vs comprehensive guide?
   - Multiple complexity levels?

2. **Interactive Elements**: Which visualizations are priority?
   - Start with static diagrams?
   - Full animations from the start?

3. **Scope**: How many topics for MVP?
   - Start with 5 DS + 3 algorithms?
   - Or focus on just 3 DS deeply?

4. **Quiz/Practice**: Include from the start or later phase?
   - Just content initially?
   - Add quizzes in Phase 2?

5. **Code Languages**: JavaScript only or multi-language?
   - JS first, add Python/Java later?

6. **Progress Tracking**: Build now or later?
   - Simple "visited" tracking?
   - Full progress system later?

---

## Next Steps

After your review and feedback:

1. **Refine Spec**: Update based on your input
2. **Create Data**: Write content for first 3-5 topics
3. **Build Components**: Start with LearnPage and TopicCard
4. **Add Routes**: Set up /learn routing
5. **Test**: Ensure navigation and display works
6. **Iterate**: Add more topics and features

---

**Status**: ⏸️ Awaiting Review

Please review this specification and let me know:
- What you'd like to change
- What to prioritize
- What to defer to later phases
- Any additional features or ideas

Once approved, we'll start implementation! 🚀
