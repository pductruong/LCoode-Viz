import { useState, useEffect, useMemo } from 'react';
import TopicCard from '../components/learn/TopicCard';
import { useLoadTopics } from '../hooks/useLoadTopics';
import useTopicStore from '../store/topicStore';

/**
 * LearnPage - Main learning hub for data structures and algorithms
 * Updated to use new service-based architecture
 */
function LearnPage() {
  const [activeCategory, setActiveCategory] = useState('Data Structures');
  const [searchQuery, setSearchQuery] = useState('');

  // Use new hooks
  const { loadTopics } = useLoadTopics();
  const { topics, loading, error } = useTopicStore();

  // Load topics on mount
  useEffect(() => {
    if (topics.length === 0 && !loading && !error) {
      loadTopics();
    }
  }, [topics.length, loading, error, loadTopics]);

  const categories = [
    { id: 'Data Structures', label: 'Data Structures', icon: '🏗️' },
    { id: 'Algorithms', label: 'Algorithms', icon: '⚙️' },
    { id: 'Patterns', label: 'Patterns', icon: '🎯' }
  ];

  // Filter topics based on category and search
  const filteredTopics = useMemo(() => {
    let result = topics;

    // Filter by category
    if (activeCategory) {
      result = result.filter(topic => topic.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(topic =>
        topic.title.toLowerCase().includes(query) ||
        topic.description.toLowerCase().includes(query)
      );
    }

    return result;
  }, [topics, activeCategory, searchQuery]);

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
        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading topics...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
            <div className="text-4xl mb-2">⚠️</div>
            <h3 className="text-xl font-semibold text-red-900 dark:text-red-200 mb-2">
              Failed to load topics
            </h3>
            <p className="text-red-700 dark:text-red-300">{error}</p>
            <button
              onClick={loadTopics}
              className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Content - only show when not loading and no error */}
        {!loading && !error && (
          <>
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
          </>
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
