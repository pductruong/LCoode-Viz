import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * ProblemCard - Displays a problem in a card format
 * @param {Object} problem - Problem data object
 */
function ProblemCard({ problem }) {
  // Determine difficulty badge color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <Link
      to={`/problems/${problem.id}`}
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex-1 pr-2">
          {problem.title}
        </h3>
        <span
          className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${getDifficultyColor(
            problem.difficulty
          )}`}
        >
          {problem.difficulty}
        </span>
      </div>

      {/* Categories */}
      {problem.categories && problem.categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {problem.categories.slice(0, 3).map((category) => (
            <span
              key={category}
              className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
            >
              {category}
            </span>
          ))}
          {problem.categories.length > 3 && (
            <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
              +{problem.categories.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Description Preview */}
      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
        {problem.description}
      </p>

      {/* Footer with metadata */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
          {problem.solutions && problem.solutions.length > 0 && (
            <span title="Solutions available">
              📝 {problem.solutions.length} solution
              {problem.solutions.length > 1 ? 's' : ''}
            </span>
          )}
          {problem.visualizationType && (
            <span title="Visualization type">🎨 {problem.visualizationType}</span>
          )}
        </div>

        {/* View Button */}
        <span className="text-primary-600 dark:text-primary-400 text-sm font-medium">
          View →
        </span>
      </div>
    </Link>
  );
}

ProblemCard.propTypes = {
  problem: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    difficulty: PropTypes.oneOf(['Easy', 'Medium', 'Hard']).isRequired,
    categories: PropTypes.arrayOf(PropTypes.string),
    solutions: PropTypes.array,
    visualizationType: PropTypes.string,
  }).isRequired,
};

export default ProblemCard;
