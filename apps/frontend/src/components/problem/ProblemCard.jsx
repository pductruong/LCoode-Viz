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
        return 'badge-success';
      case 'Medium':
        return 'badge-warning';
      case 'Hard':
        return 'badge-danger';
      default:
        return 'badge-primary';
    }
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'Medium':
        return (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
        );
      case 'Hard':
        return (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <Link
      to={`/problems/${problem.id}`}
      className="card-interactive p-6 group relative overflow-hidden"
    >
      {/* Gradient accent on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex-1 pr-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {problem.title}
          </h3>
          <span className={`${getDifficultyColor(problem.difficulty)} shrink-0`}>
            {getDifficultyIcon(problem.difficulty)}
            {problem.difficulty}
          </span>
        </div>

        {/* Categories */}
        {problem.categories && problem.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {problem.categories.slice(0, 3).map((category) => (
              <span
                key={category}
                className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-lg border border-gray-200 dark:border-gray-600"
              >
                {category}
              </span>
            ))}
            {problem.categories.length > 3 && (
              <span className="px-2.5 py-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                +{problem.categories.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Description Preview */}
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed">
          {problem.description}
        </p>

        {/* Footer with metadata */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            {problem.solutions && problem.solutions.length > 0 && (
              <span className="flex items-center gap-1" title="Solutions available">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {problem.solutions.length}
              </span>
            )}
            {problem.visualizationType && (
              <span className="flex items-center gap-1" title="Visualization type">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
                {problem.visualizationType}
              </span>
            )}
          </div>

          {/* View Button */}
          <span className="flex items-center gap-1 text-primary-600 dark:text-primary-400 text-sm font-semibold group-hover:gap-2 transition-all">
            View
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
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
