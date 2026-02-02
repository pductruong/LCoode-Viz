import PropTypes from 'prop-types';
import ProblemCard from './ProblemCard';

/**
 * ProblemGrid - Displays problems in a responsive grid layout
 * @param {Array} problems - Array of problem objects
 * @param {string} emptyMessage - Message to display when no problems
 */
function ProblemGrid({ problems, emptyMessage = 'No problems found.' }) {
  // Empty state
  if (!problems || problems.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-12 text-center">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No Problems Found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {problems.map((problem) => (
        <ProblemCard key={problem.id} problem={problem} />
      ))}
    </div>
  );
}

ProblemGrid.propTypes = {
  problems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      difficulty: PropTypes.string.isRequired,
      categories: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  emptyMessage: PropTypes.string,
};

export default ProblemGrid;
