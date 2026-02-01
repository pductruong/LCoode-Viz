import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * TopicCard - Preview card for learning topics
 */
function TopicCard({ topic }) {
  // Get difficulty badge color
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

  const getDifficultyLabel = (difficulty) => {
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  };

  return (
    <Link
      to={`/learn/${topic.category}/${topic.id}`}
      className="group bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200"
    >
      {/* Icon & Title */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="text-4xl group-hover:scale-110 transition-transform duration-200">
            {topic.icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {topic.title}
            </h3>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
        {topic.description}
      </p>

      {/* Meta Info */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3">
          {/* Difficulty Badge */}
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(
              topic.difficulty
            )}`}
          >
            {getDifficultyLabel(topic.difficulty)}
          </span>

          {/* Time Estimate */}
          <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
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
            {topic.timeToLearn} min
          </span>
        </div>

        {/* Learn Arrow */}
        <span className="text-primary-600 dark:text-primary-400 text-sm font-medium group-hover:translate-x-1 transition-transform duration-200">
          Learn →
        </span>
      </div>
    </Link>
  );
}

TopicCard.propTypes = {
  topic: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    difficulty: PropTypes.oneOf(['beginner', 'intermediate', 'advanced'])
      .isRequired,
    timeToLearn: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
};

export default TopicCard;
