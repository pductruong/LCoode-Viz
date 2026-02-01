import { useState } from 'react';
import { Link } from 'react-router-dom';
import TopicCard from '../components/learn/TopicCard';

/**
 * LearnPage - Main learning hub for data structures and algorithms
 */
function LearnPage() {
  const [activeCategory, setActiveCategory] = useState('data-structures');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample topics - will be replaced with actual data later
  const sampleTopics = {
    'data-structures': [
      {
        id: 'array',
        title: 'Array',
        icon: '📊',
        difficulty: 'beginner',
        timeToLearn: 10,
        description: 'Contiguous memory storage for elements with fast random access',
        category: 'data-structures'
      },
      {
        id: 'linked-list',
        title: 'Linked List',
        icon: '🔗',
        difficulty: 'beginner',
        timeToLearn: 15,
        description: 'Dynamic data structure with nodes connected by pointers',
        category: 'data-structures'
      },
      {
        id: 'stack',
        title: 'Stack',
        icon: '📚',
        difficulty: 'beginner',
        timeToLearn: 12,
        description: 'LIFO (Last In, First Out) data structure',
        category: 'data-structures'
      }
    ],
    'algorithms': [
      {
        id: 'binary-search',
        title: 'Binary Search',
        icon: '🔍',
        difficulty: 'beginner',
        timeToLearn: 15,
        description: 'Efficient search algorithm for sorted arrays',
        category: 'algorithms'
      },
      {
        id: 'bfs',
        title: 'Breadth-First Search',
        icon: '🌊',
        difficulty: 'intermediate',
        timeToLearn: 20,
        description: 'Level-order graph/tree traversal algorithm',
        category: 'algorithms'
      }
    ],
    'patterns': [
      {
        id: 'two-pointers',
        title: 'Two Pointers',
        icon: '👉👈',
        difficulty: 'beginner',
        timeToLearn: 15,
        description: 'Technique using two pointers to traverse data',
        category: 'patterns'
      },
      {
        id: 'sliding-window',
        title: 'Sliding Window',
        icon: '🪟',
        difficulty: 'intermediate',
        timeToLearn: 18,
        description: 'Pattern for subarray/substring problems',
        category: 'patterns'
      }
    ]
  };

  const categories = [
    { id: 'data-structures', label: 'Data Structures', icon: '🏗️' },
    { id: 'algorithms', label: 'Algorithms', icon: '⚙️' },
    { id: 'patterns', label: 'Patterns', icon: '🎯' }
  ];

  // Filter topics based on search query
  const filteredTopics = (sampleTopics[activeCategory] || []).filter(topic =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-700 dark:to-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Learn Data Structures & Algorithms
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
              Master the fundamentals through interactive visualizations and clear explanations
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search topics..."
                  className="block w-full pl-10 pr-3 py-3 border border-transparent rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  flex items-center gap-2 px-4 py-4 border-b-2 font-medium text-sm transition-colors whitespace-nowrap
                  ${
                    activeCategory === category.id
                      ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }
                `}
              >
                <span className="text-xl">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="mb-8">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredTopics.length} topic{filteredTopics.length !== 1 ? 's' : ''}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>

        {/* Topics */}
        {filteredTopics.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTopics.map((topic) => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No topics found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or browse different categories
            </p>
          </div>
        )}

        {/* Coming Soon Notice */}
        <div className="mt-12 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-6 text-center">
          <p className="text-gray-700 dark:text-gray-300">
            <strong>More topics coming soon!</strong> We're continuously adding new content to help you master data structures and algorithms.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Have a topic request?{' '}
            <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline">
              Let us know
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LearnPage;
