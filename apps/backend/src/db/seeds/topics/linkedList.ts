import { TopicSeedData } from '../types';

export const linkedListTopic: TopicSeedData = {
  id: 'linked-list',
  category: 'Data Structures',
  title: 'Linked List',
  icon: '🔗',
  difficulty: 'beginner',
  timeToLearn: 45,
  description:
    'A linear data structure where elements are stored in nodes, each pointing to the next node',
  fullDescription: {
    definition:
      'A linked list is a linear data structure where elements are stored in nodes. Each node contains data and a reference (pointer) to the next node in the sequence.',
    analogy:
      "Think of a linked list like a treasure hunt where each clue (node) tells you where to find the next clue. You must follow the chain from start to finish - you can't jump to the middle.",
  },
  quickFacts: {
    timeComplexity: {
      access: 'O(n)',
      search: 'O(n)',
      insertHead: 'O(1)',
      insertTail: 'O(1)',
      deleteHead: 'O(1)',
      deleteTail: 'O(n)',
    },
    spaceComplexity: 'O(n)',
    whenToUse: [
      'Frequent insertions/deletions at beginning',
      'Dynamic size is needed',
      "Don't need random access",
    ],
  },
  types: [
    { name: 'Singly Linked List', description: 'One-way direction' },
    { name: 'Doubly Linked List', description: 'Two-way direction' },
    { name: 'Circular Linked List', description: 'Last node points to first' },
  ],
  operations: [
    {
      name: 'Access',
      timeAvg: 'O(n)',
      timeWorst: 'O(n)',
      space: 'O(1)',
      code: 'traverse from head',
    },
    {
      name: 'Search',
      timeAvg: 'O(n)',
      timeWorst: 'O(n)',
      space: 'O(1)',
      code: 'while (current) { ... }',
    },
    {
      name: 'Insert (head)',
      timeAvg: 'O(1)',
      timeWorst: 'O(1)',
      space: 'O(1)',
      code: 'node.next = head; head = node',
    },
    {
      name: 'Insert (tail)',
      timeAvg: 'O(1)',
      timeWorst: 'O(1)',
      space: 'O(1)',
      code: 'tail.next = node; tail = node',
    },
    {
      name: 'Delete (head)',
      timeAvg: 'O(1)',
      timeWorst: 'O(1)',
      space: 'O(1)',
      code: 'head = head.next',
    },
    {
      name: 'Delete (middle)',
      timeAvg: 'O(n)',
      timeWorst: 'O(n)',
      space: 'O(1)',
      code: 'prev.next = current.next',
    },
  ],
  codeExamples: {
    javascript: `// Node class
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

// Linked List class
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // Insert at head - O(1)
  insertAtHead(data) {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
    if (!this.tail) this.tail = newNode;
    this.size++;
  }

  // Insert at tail - O(1)
  insertAtTail(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  // Delete head - O(1)
  deleteHead() {
    if (!this.head) return null;
    const deletedData = this.head.data;
    this.head = this.head.next;
    if (!this.head) this.tail = null;
    this.size--;
    return deletedData;
  }

  // Search - O(n)
  search(data) {
    let current = this.head;
    while (current) {
      if (current.data === data) return true;
      current = current.next;
    }
    return false;
  }

  // Print list
  print() {
    let current = this.head;
    const values = [];
    while (current) {
      values.push(current.data);
      current = current.next;
    }
    console.log(values.join(' -> '));
  }
}

// Usage
const list = new LinkedList();
list.insertAtHead(3);
list.insertAtHead(2);
list.insertAtHead(1);
list.insertAtTail(4);
list.print(); // 1 -> 2 -> 3 -> 4`,
  },
  pros: ['Dynamic size', 'Efficient insertion/deletion at head', 'Memory efficient'],
  cons: ['No random access', 'Extra memory for pointers', 'Not cache-friendly'],
  whenToUse: {
    use: [
      'Frequent insertions/deletions at beginning',
      'Dynamic size is needed',
      "Don't need random access",
      'Implementing stacks or queues',
    ],
    avoid: [
      'Need random access by index',
      'Memory locality is critical',
      'Frequent searches are needed',
      'Need to access elements from the end',
    ],
  },
  relatedProblems: [],
};
