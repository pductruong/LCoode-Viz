import { useParams } from 'react-router-dom';
import useProblem from '../hooks/useProblem';

function VisualizationPage() {
  const { problemId } = useParams();
  const { problem, loading, error } = useProblem(problemId);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading problem...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-8 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-semibold text-red-900 dark:text-red-100 mb-2">
            Error Loading Problem
          </h2>
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-8 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Problem Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Problem "{problemId}" could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Problem Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          {problem.title}
        </h1>
        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 rounded text-sm font-medium ${
              problem.difficulty === 'Easy'
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                : problem.difficulty === 'Medium'
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
            }`}
          >
            {problem.difficulty}
          </span>
          {problem.categories.map((cat) => (
            <span
              key={cat}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Problem Description */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Description
        </h2>
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
          {problem.description}
        </p>

        {/* Examples */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
            Examples
          </h3>
          {problem.examples.map((example, idx) => (
            <div
              key={idx}
              className="bg-gray-50 dark:bg-gray-900 p-4 rounded mb-3"
            >
              <div className="font-mono text-sm">
                <div className="text-gray-700 dark:text-gray-300">
                  <strong>Input:</strong>{' '}
                  {JSON.stringify(example.input, null, 2)}
                </div>
                <div className="text-gray-700 dark:text-gray-300 mt-1">
                  <strong>Output:</strong> {JSON.stringify(example.output)}
                </div>
                {example.explanation && (
                  <div className="text-gray-600 dark:text-gray-400 mt-2">
                    <strong>Explanation:</strong> {example.explanation}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Constraints */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
            Constraints
          </h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            {problem.constraints.map((constraint, idx) => (
              <li key={idx} className="font-mono text-sm">
                {constraint}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Solution Code Preview */}
      {problem.solutions && problem.solutions.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Solution: {problem.solutions[0].title}
          </h2>
          <div className="bg-gray-900 rounded p-4 overflow-x-auto">
            <pre className="text-gray-100 text-sm font-mono">
              {problem.solutions[0].code}
            </pre>
          </div>
          <div className="mt-4 flex gap-4 text-sm">
            <div>
              <strong className="text-gray-700 dark:text-gray-300">
                Time:
              </strong>{' '}
              <code className="text-primary-600 dark:text-primary-400">
                {problem.solutions[0].timeComplexity}
              </code>
            </div>
            <div>
              <strong className="text-gray-700 dark:text-gray-300">
                Space:
              </strong>{' '}
              <code className="text-primary-600 dark:text-primary-400">
                {problem.solutions[0].spaceComplexity}
              </code>
            </div>
          </div>
        </div>
      )}

      {/* Visualization Coming Soon */}
      <div className="mt-6 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-8 text-center">
        <div className="text-6xl mb-4">🎨</div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Interactive Visualization Coming Soon
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          Animation controls and step-by-step visualization will be implemented
          in Week 2-3.
        </p>
      </div>
    </div>
  );
}

export default VisualizationPage;
