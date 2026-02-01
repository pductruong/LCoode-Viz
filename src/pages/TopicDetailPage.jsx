import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import CodeBlock from '../components/learn/CodeBlock';
import ComplexityTable from '../components/learn/ComplexityTable';
import LinkedListVisualizer from '../components/learn/LinkedListVisualizer';
import useTopicStore from '../store/topicStore';

/**
 * TopicDetailPage - Detailed view of a single learning topic
 */
function TopicDetailPage() {
  const { category, topicId } = useParams();
  const navigate = useNavigate();

  // Get topic from store
  const { currentTopic, loading, error, loadTopic, clearCurrentTopic } = useTopicStore();

  // Load topic on mount or when topicId changes
  useEffect(() => {
    loadTopic(topicId);

    // Clear topic on unmount
    return () => clearCurrentTopic();
  }, [topicId]);

  // Use sample data as fallback for topics not yet implemented
  const sampleTopic = {
    id: topicId,
    category: category,
    title: 'Array',
    icon: '📊',
    difficulty: 'beginner',
    timeToLearn: 10,

    description: {
      definition:
        'An array is a collection of elements stored in contiguous memory locations. Each element can be accessed directly using its index.',
      analogy:
        'Think of an array like a row of mailboxes in an apartment building. Each mailbox has a number (index) and you can go directly to any mailbox if you know its number.',
    },

    quickFacts: {
      timeComplexity: {
        access: 'O(1)',
        search: 'O(n)',
        insert: 'O(n)',
        delete: 'O(n)',
      },
      spaceComplexity: 'O(n)',
      whenToUse: [
        'Random access by index is needed',
        'Size is known or fixed',
        'Memory locality is important',
      ],
    },

    operations: [
      {
        name: 'Access',
        timeAvg: 'O(1)',
        timeWorst: 'O(1)',
        space: 'O(1)',
        code: 'arr[i]',
      },
      {
        name: 'Search',
        timeAvg: 'O(n)',
        timeWorst: 'O(n)',
        space: 'O(1)',
        code: 'arr.indexOf(x)',
      },
      {
        name: 'Insert (end)',
        timeAvg: 'O(1)',
        timeWorst: 'O(n)',
        space: 'O(1)',
        code: 'arr.push(x)',
      },
      {
        name: 'Insert (start)',
        timeAvg: 'O(n)',
        timeWorst: 'O(n)',
        space: 'O(1)',
        code: 'arr.unshift(x)',
      },
      {
        name: 'Delete (end)',
        timeAvg: 'O(1)',
        timeWorst: 'O(1)',
        space: 'O(1)',
        code: 'arr.pop()',
      },
      {
        name: 'Delete (start)',
        timeAvg: 'O(n)',
        timeWorst: 'O(n)',
        space: 'O(1)',
        code: 'arr.shift()',
      },
    ],

    codeExamples: {
      javascript: `// Creating an array
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
arr.splice(2, 1);   // Middle: O(n)`,
    },

    pros: [
      'Fast access by index: O(1)',
      'Memory efficient (contiguous storage)',
      'Simple to understand and use',
      'Cache-friendly due to locality',
    ],

    cons: [
      'Fixed size in many languages',
      'Expensive insertions/deletions: O(n)',
      'Wasted space if not full',
      'Not efficient for unsorted search',
    ],

    whenToUse: {
      use: [
        'Need random access by index',
        'Size is known or doesn\'t change often',
        'Reading is more common than writing',
        'Memory locality is important',
      ],
      avoid: [
        'Frequent insertions/deletions',
        'Size is highly dynamic',
        'Only need sequential access',
      ],
    },

    relatedProblems: [
      { id: 'two-sum', title: 'Two Sum', difficulty: 'Easy' },
    ],
  };

  // Use currentTopic from store if available, otherwise use sample data
  const topic = currentTopic || sampleTopic;

  // Map fullDescription to description format for backward compatibility
  const displayTopic = {
    ...topic,
    description: topic.fullDescription || topic.description || {
      definition: topic.description || '',
      analogy: ''
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading topic...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !currentTopic) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-8 text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-red-900 dark:text-red-200 mb-2">
              Topic Not Found
            </h2>
            <p className="text-red-700 dark:text-red-300 mb-6">{error}</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => navigate('/learn')}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
              >
                Back to Learn
              </button>
              <button
                onClick={() => loadTopic(topicId)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm">
            <Link
              to="/learn"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              Learn
            </Link>
            <svg
              className="h-5 w-5 text-gray-400 mx-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-500 dark:text-gray-400 capitalize">
              {category.replace('-', ' ')}
            </span>
            <svg
              className="h-5 w-5 text-gray-400 mx-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-900 dark:text-white font-medium">
              {displayTopic.title}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="text-6xl">{displayTopic.icon}</div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {displayTopic.title}
              </h1>
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded text-sm font-medium ${getDifficultyColor(
                    displayTopic.difficulty
                  )}`}
                >
                  {displayTopic.difficulty.charAt(0).toUpperCase() +
                    displayTopic.difficulty.slice(1)}
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {displayTopic.timeToLearn} minutes to learn
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Facts */}
        <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Facts
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Time Complexity
              </h3>
              <ul className="space-y-1 text-sm">
                {Object.entries(displayTopic.quickFacts.timeComplexity).map(
                  ([operation, complexity]) => (
                    <li
                      key={operation}
                      className="text-gray-600 dark:text-gray-400"
                    >
                      <span className="font-mono text-primary-600 dark:text-primary-400">
                        {complexity}
                      </span>{' '}
                      - {operation.charAt(0).toUpperCase() + operation.slice(1)}
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                When to Use
              </h3>
              <ul className="space-y-1 text-sm">
                {displayTopic.quickFacts.whenToUse.map((useCase, idx) => (
                  <li
                    key={idx}
                    className="text-gray-600 dark:text-gray-400 flex items-start gap-2"
                  >
                    <span className="text-green-600 dark:text-green-400 mt-1">
                      ✓
                    </span>
                    {useCase}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* What is it? */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            What is it?
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              {displayTopic.description.definition}
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border-l-4 border-primary-500">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                💡 Real-world Analogy
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {displayTopic.description.analogy}
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Visualization - Only for linked-list */}
        {topicId === 'linked-list' && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Interactive Visualization
            </h2>
            <LinkedListVisualizer type="singly" />
          </section>
        )}

        {/* Operations & Complexity */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Operations & Complexity
          </h2>
          <ComplexityTable operations={displayTopic.operations} />
        </section>

        {/* Code Examples */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Code Examples
          </h2>
          <CodeBlock
            code={displayTopic.codeExamples.javascript}
            language="javascript"
          />
        </section>

        {/* Pros & Cons */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Pros & Cons
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-green-200 dark:border-green-800 p-6">
              <h3 className="text-lg font-semibold text-green-700 dark:text-green-400 mb-4">
                ✅ Advantages
              </h3>
              <ul className="space-y-2">
                {displayTopic.pros.map((pro, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2"
                  >
                    <span className="text-green-600 dark:text-green-400 mt-0.5">
                      •
                    </span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-red-200 dark:border-red-800 p-6">
              <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-4">
                ❌ Disadvantages
              </h3>
              <ul className="space-y-2">
                {displayTopic.cons.map((con, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2"
                  >
                    <span className="text-red-600 dark:text-red-400 mt-0.5">
                      •
                    </span>
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* When to Use */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            When to Use
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-green-700 dark:text-green-400 mb-3">
                  ✓ Use when:
                </h3>
                <ul className="space-y-2">
                  {displayTopic.whenToUse.use.map((useCase, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2"
                    >
                      <span className="text-green-600 dark:text-green-400 mt-0.5">
                        ✓
                      </span>
                      {useCase}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-red-700 dark:text-red-400 mb-3">
                  ✗ Avoid when:
                </h3>
                <ul className="space-y-2">
                  {displayTopic.whenToUse.avoid.map((avoidCase, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2"
                    >
                      <span className="text-red-600 dark:text-red-400 mt-0.5">
                        ✗
                      </span>
                      {avoidCase}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Related Problems */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Related LeetCode Problems
          </h2>
          <div className="space-y-3">
            {displayTopic.relatedProblems.map((problem) => (
              <Link
                key={problem.id}
                to={`/problems/${problem.id}`}
                className="block bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg hover:border-primary-300 dark:hover:border-primary-600 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {problem.title}
                      </h3>
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${
                          problem.difficulty === 'Easy'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}
                      >
                        {problem.difficulty}
                      </span>
                    </div>
                  </div>
                  <span className="text-primary-600 dark:text-primary-400 text-sm font-medium">
                    Try Problem →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between pt-8 border-t border-gray-200 dark:border-gray-700">
          <Link
            to="/learn"
            className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Learn
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TopicDetailPage;
