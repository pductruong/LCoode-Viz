/**
 * Linked List - Learning Topic Data
 *
 * Complete educational content for Linked List data structure
 */

export const linkedListTopic = {
  id: 'linked-list',
  category: 'data-structures',
  title: 'Linked List',
  icon: '🔗',
  difficulty: 'beginner',
  timeToLearn: 15,

  // Quick summary for card preview
  description: 'A linear data structure where elements are stored in nodes, each containing data and a reference (pointer) to the next node in the sequence.',

  // Detailed description
  fullDescription: {
    definition: `A linked list is a linear data structure where elements are not stored in contiguous memory locations. Instead, each element (called a node) contains two parts: the data and a pointer/reference to the next node in the sequence. This structure allows for efficient insertion and deletion operations.`,

    analogy: `Think of a linked list like a treasure hunt where each clue (node) contains:
1. The treasure piece (data)
2. Directions to the next clue (pointer)

To find all treasures, you start at the first clue and follow the chain. Unlike an array (where all treasures are in a row), you must follow each clue sequentially to reach the end.`,

    keyPoints: [
      'Nodes are connected by pointers, not stored contiguously',
      'Dynamic size - grows and shrinks easily',
      'Sequential access only - no direct access by index',
      'Three main types: Singly, Doubly, and Circular linked lists'
    ]
  },

  // Quick reference facts
  quickFacts: {
    timeComplexity: {
      access: 'O(n)',
      search: 'O(n)',
      insertAtHead: 'O(1)',
      insertAtTail: 'O(n)',
      insertAtPosition: 'O(n)',
      deleteAtHead: 'O(1)',
      deleteAtTail: 'O(n)',
      deleteAtPosition: 'O(n)',
    },
    spaceComplexity: 'O(n)',
    whenToUse: [
      'Frequent insertions and deletions',
      'Unknown or dynamic size',
      'No need for random access',
      'Implementing stacks, queues, or graphs'
    ]
  },

  // Types of linked lists
  types: [
    {
      name: 'Singly Linked List',
      description: 'Each node points to the next node only',
      diagram: 'HEAD → [1|→] → [2|→] → [3|→] → null',
      useCase: 'Simple forward traversal, stack implementation'
    },
    {
      name: 'Doubly Linked List',
      description: 'Each node has pointers to both next and previous nodes',
      diagram: 'null ← [←|1|→] ↔ [←|2|→] ↔ [←|3|→] → null',
      useCase: 'Bidirectional traversal, implementing deques, browser history'
    },
    {
      name: 'Circular Linked List',
      description: 'Last node points back to the first node',
      diagram: '[1|→] → [2|→] → [3|→] ↺ (back to 1)',
      useCase: 'Round-robin scheduling, multiplayer games'
    }
  ],

  // Operations with complexity
  operations: [
    {
      name: 'Access (by index)',
      timeAvg: 'O(n)',
      timeWorst: 'O(n)',
      space: 'O(1)',
      code: 'traverse from head n times',
      explanation: 'Must traverse from head to reach index n'
    },
    {
      name: 'Search',
      timeAvg: 'O(n)',
      timeWorst: 'O(n)',
      space: 'O(1)',
      code: 'while (node.val !== target)',
      explanation: 'Must check each node until found'
    },
    {
      name: 'Insert at Head',
      timeAvg: 'O(1)',
      timeWorst: 'O(1)',
      space: 'O(1)',
      code: 'newNode.next = head',
      explanation: 'Just update head pointer'
    },
    {
      name: 'Insert at Tail',
      timeAvg: 'O(n)',
      timeWorst: 'O(n)',
      space: 'O(1)',
      code: 'traverse to end, add node',
      explanation: 'Must traverse to find tail (O(1) with tail pointer)'
    },
    {
      name: 'Insert at Position',
      timeAvg: 'O(n)',
      timeWorst: 'O(n)',
      space: 'O(1)',
      code: 'traverse to pos, update pointers',
      explanation: 'Traverse to position, then O(1) pointer updates'
    },
    {
      name: 'Delete at Head',
      timeAvg: 'O(1)',
      timeWorst: 'O(1)',
      space: 'O(1)',
      code: 'head = head.next',
      explanation: 'Just update head pointer'
    },
    {
      name: 'Delete at Tail',
      timeAvg: 'O(n)',
      timeWorst: 'O(n)',
      space: 'O(1)',
      code: 'traverse to second-last',
      explanation: 'Must traverse to find second-to-last node'
    },
    {
      name: 'Delete at Position',
      timeAvg: 'O(n)',
      timeWorst: 'O(n)',
      space: 'O(1)',
      code: 'traverse to pos, update pointers',
      explanation: 'Traverse to position, then O(1) pointer updates'
    }
  ],

  // Code implementations
  codeExamples: {
    javascript: `// Node class
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

// Linked List class
class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  // Insert at head - O(1)
  insertAtHead(val) {
    const newNode = new ListNode(val, this.head);
    this.head = newNode;
    this.size++;
  }

  // Insert at tail - O(n)
  insertAtTail(val) {
    const newNode = new ListNode(val);

    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }

  // Insert at position - O(n)
  insertAtPosition(val, index) {
    if (index < 0 || index > this.size) return false;

    if (index === 0) {
      this.insertAtHead(val);
      return true;
    }

    const newNode = new ListNode(val);
    let current = this.head;

    for (let i = 0; i < index - 1; i++) {
      current = current.next;
    }

    newNode.next = current.next;
    current.next = newNode;
    this.size++;
    return true;
  }

  // Delete at head - O(1)
  deleteAtHead() {
    if (!this.head) return null;

    const deletedNode = this.head;
    this.head = this.head.next;
    this.size--;
    return deletedNode.val;
  }

  // Delete at position - O(n)
  deleteAtPosition(index) {
    if (index < 0 || index >= this.size) return null;

    if (index === 0) return this.deleteAtHead();

    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      current = current.next;
    }

    const deletedNode = current.next;
    current.next = current.next.next;
    this.size--;
    return deletedNode.val;
  }

  // Search - O(n)
  search(val) {
    let current = this.head;
    let index = 0;

    while (current) {
      if (current.val === val) return index;
      current = current.next;
      index++;
    }
    return -1;
  }

  // Get value at index - O(n)
  get(index) {
    if (index < 0 || index >= this.size) return null;

    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    return current.val;
  }

  // Reverse the list - O(n)
  reverse() {
    let prev = null;
    let current = this.head;

    while (current) {
      const next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    this.head = prev;
  }

  // Print the list
  print() {
    const values = [];
    let current = this.head;

    while (current) {
      values.push(current.val);
      current = current.next;
    }

    console.log(values.join(' -> ') + ' -> null');
  }
}

// Example usage
const list = new LinkedList();
list.insertAtHead(3);  // 3 -> null
list.insertAtHead(2);  // 2 -> 3 -> null
list.insertAtHead(1);  // 1 -> 2 -> 3 -> null
list.insertAtTail(4);  // 1 -> 2 -> 3 -> 4 -> null
list.print();          // "1 -> 2 -> 3 -> 4 -> null"

console.log(list.search(3));  // 2 (index)
console.log(list.get(2));     // 3 (value at index 2)

list.reverse();
list.print();          // "4 -> 3 -> 2 -> 1 -> null"`
  },

  // Advantages
  pros: [
    'Dynamic size - grows and shrinks easily without reallocation',
    'Efficient insertions and deletions at known positions: O(1) after reaching position',
    'No wasted memory - only allocates what\'s needed',
    'Easy to implement stacks, queues, and other ADTs',
    'Can be easily extended (doubly linked, circular, etc.)',
    'No need to know size in advance'
  ],

  // Disadvantages
  cons: [
    'No random access - must traverse from head: O(n)',
    'Extra memory for storing pointers (overhead per node)',
    'Not cache-friendly - nodes scattered in memory',
    'Slower access compared to arrays',
    'Reverse traversal difficult (unless doubly linked)',
    'More complex to implement than arrays'
  ],

  // When to use
  whenToUse: {
    use: [
      'Frequent insertions and deletions (especially at head)',
      'Size is unknown or varies significantly',
      'Don\'t need random access by index',
      'Implementing other data structures (stack, queue, graph adjacency list)',
      'Memory is fragmented (can\'t allocate large contiguous block)',
      'Need to easily split or merge lists'
    ],
    avoid: [
      'Need fast random access by index',
      'Limited memory (pointer overhead is significant)',
      'Cache performance is critical',
      'Frequently searching for elements',
      'Need to access last element often (without tail pointer)',
      'Simple sequential access of fixed-size data (use array instead)'
    ]
  },

  // Common patterns and techniques
  commonPatterns: [
    {
      name: 'Two Pointers (Fast & Slow)',
      description: 'Use two pointers moving at different speeds to detect cycles or find middle',
      useCase: 'Detect cycle, find middle node, find kth from end',
      code: `let slow = head, fast = head;
while (fast && fast.next) {
  slow = slow.next;
  fast = fast.next.next;
}`
    },
    {
      name: 'Dummy Node',
      description: 'Use a dummy node before head to simplify edge cases',
      useCase: 'Removing nodes, merging lists, reversing',
      code: `const dummy = new ListNode(0);
dummy.next = head;
// Now you can easily modify head`
    },
    {
      name: 'Reverse in Groups',
      description: 'Reverse portions of the list while maintaining connections',
      useCase: 'Reverse k nodes, palindrome check',
      code: `let prev = null, curr = head;
while (curr) {
  let next = curr.next;
  curr.next = prev;
  prev = curr;
  curr = next;
}`
    },
    {
      name: 'Merge Two Lists',
      description: 'Merge two sorted lists into one sorted list',
      useCase: 'Merge sort, combine sorted sequences',
      code: `while (l1 && l2) {
  if (l1.val < l2.val) {
    tail.next = l1;
    l1 = l1.next;
  } else {
    tail.next = l2;
    l2 = l2.next;
  }
  tail = tail.next;
}`
    }
  ],

  // Common pitfalls
  commonMistakes: [
    {
      mistake: 'Losing reference to head',
      example: 'head = head.next before saving old head',
      fix: 'Always save reference: const oldHead = head'
    },
    {
      mistake: 'Null pointer errors',
      example: 'current.next.val without checking if next exists',
      fix: 'Always check: if (current && current.next)'
    },
    {
      mistake: 'Infinite loops',
      example: 'Not advancing pointer in while loop',
      fix: 'Ensure pointer moves: current = current.next'
    },
    {
      mistake: 'Not updating size',
      example: 'Adding/removing nodes without updating size counter',
      fix: 'Always increment/decrement size variable'
    }
  ],

  // Visual representations
  visualConcepts: [
    {
      concept: 'Singly Linked List Structure',
      ascii: `
HEAD
 ↓
[1|→] → [2|→] → [3|→] → null
 ↑       ↑       ↑
data   data    data
next   next    next
      `,
      description: 'Each node contains data and a next pointer'
    },
    {
      concept: 'Inserting at Head',
      ascii: `
Before: HEAD → [2|→] → [3|→] → null

Step 1: Create new node
        NEW
         ↓
        [1|?]

Step 2: Point new node to current head
        NEW
         ↓
        [1|→] → [2|→] → [3|→] → null

Step 3: Update HEAD
        HEAD
         ↓
        [1|→] → [2|→] → [3|→] → null
      `,
      description: 'O(1) operation - just update pointers'
    },
    {
      concept: 'Deleting a Node',
      ascii: `
Before: [1|→] → [2|→] → [3|→] → null
                 ↑
              (delete this)

Step 1: Find previous node
        [1|→] → [2|→] → [3|→] → null
         ↑       ↑
        prev   target

Step 2: Update previous.next to skip target
        [1|→] ⤸        [3|→] → null
         ↑     ⤹ [2|X]
        prev   (garbage collected)
      `,
      description: 'Skip the node by updating pointers'
    }
  ],

  // Related LeetCode problems
  relatedProblems: [
    {
      id: 'reverse-linked-list',
      title: '206. Reverse Linked List',
      difficulty: 'Easy',
      topics: ['Linked List', 'Recursion'],
      description: 'Reverse a singly linked list'
    },
    {
      id: 'merge-two-sorted-lists',
      title: '21. Merge Two Sorted Lists',
      difficulty: 'Easy',
      topics: ['Linked List', 'Recursion'],
      description: 'Merge two sorted linked lists'
    },
    {
      id: 'linked-list-cycle',
      title: '141. Linked List Cycle',
      difficulty: 'Easy',
      topics: ['Linked List', 'Two Pointers'],
      description: 'Detect if a linked list has a cycle'
    },
    {
      id: 'remove-nth-from-end',
      title: '19. Remove Nth Node From End',
      difficulty: 'Medium',
      topics: ['Linked List', 'Two Pointers'],
      description: 'Remove nth node from end of list'
    }
  ],

  // Interview tips
  interviewTips: [
    'Always clarify if it\'s singly or doubly linked',
    'Ask about edge cases: empty list, single node, cycles',
    'Consider using a dummy node to simplify edge cases',
    'Draw diagrams - visualize pointer movements',
    'Check for null before accessing .next',
    'Consider both iterative and recursive solutions',
    'For two-pointer problems, think about fast/slow pointers',
    'Remember: reversing is often useful'
  ],

  // Practice exercises
  practiceExercises: [
    {
      title: 'Implement a Linked List',
      difficulty: 'Easy',
      description: 'Implement basic operations: insert, delete, search, reverse'
    },
    {
      title: 'Find Middle Node',
      difficulty: 'Easy',
      description: 'Find the middle node using slow/fast pointers'
    },
    {
      title: 'Detect and Remove Cycle',
      difficulty: 'Medium',
      description: 'Detect if there\'s a cycle and remove it'
    },
    {
      title: 'Reverse in K Groups',
      difficulty: 'Hard',
      description: 'Reverse nodes in groups of k'
    }
  ],

  // Additional resources
  resources: [
    {
      type: 'visualization',
      title: 'VisuAlgo - Linked List',
      url: 'https://visualgo.net/en/list'
    },
    {
      type: 'article',
      title: 'Linked List vs Array',
      description: 'When to use which data structure'
    }
  ]
};

export default linkedListTopic;
