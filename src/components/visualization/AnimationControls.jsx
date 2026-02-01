import PropTypes from 'prop-types';
import { PLAYBACK_SPEEDS } from '../../engine/animationTypes';

/**
 * AnimationControls - Control panel for animation playback
 *
 * Features:
 * - Play/Pause button
 * - Step forward/backward buttons
 * - Reset button
 * - Speed selector
 * - Progress bar
 * - Step counter
 */
function AnimationControls({
  isPlaying,
  isPaused,
  currentStepIndex,
  totalSteps,
  speed,
  progress,
  isAtStart,
  isAtEnd,
  onPlay,
  onPause,
  onTogglePlayPause,
  onNextStep,
  onPreviousStep,
  onReset,
  onSpeedChange,
}) {
  // Speed options
  const speedOptions = [
    { value: PLAYBACK_SPEEDS.VERY_SLOW, label: '0.25x' },
    { value: PLAYBACK_SPEEDS.SLOW, label: '0.5x' },
    { value: PLAYBACK_SPEEDS.NORMAL, label: '1x' },
    { value: PLAYBACK_SPEEDS.FAST, label: '1.5x' },
    { value: PLAYBACK_SPEEDS.VERY_FAST, label: '2x' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Step {currentStepIndex + 1} of {totalSteps}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-primary-600 dark:bg-primary-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center gap-2 mb-4">
        {/* Reset Button */}
        <button
          onClick={onReset}
          disabled={isAtStart && !isPlaying}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Reset to start"
          aria-label="Reset"
        >
          <svg
            className="w-5 h-5 text-gray-700 dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>

        {/* Previous Step Button */}
        <button
          onClick={onPreviousStep}
          disabled={isAtStart || isPlaying}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Previous step"
          aria-label="Previous step"
        >
          <svg
            className="w-5 h-5 text-gray-700 dark:text-gray-300"
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
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={onTogglePlayPause}
          disabled={totalSteps === 0}
          className="p-3 rounded-lg bg-primary-600 hover:bg-primary-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title={isPlaying ? 'Pause' : 'Play'}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            // Pause icon
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            // Play icon
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Next Step Button */}
        <button
          onClick={onNextStep}
          disabled={isAtEnd || isPlaying}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Next step"
          aria-label="Next step"
        >
          <svg
            className="w-5 h-5 text-gray-700 dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Speed Selector */}
        <div className="ml-4">
          <label className="sr-only">Playback speed</label>
          <select
            value={speed}
            onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            title="Playback speed"
          >
            {speedOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Status Message */}
      <div className="text-center">
        {isPlaying && (
          <p className="text-sm text-primary-600 dark:text-primary-400">
            ▶ Playing at {speed}x speed
          </p>
        )}
        {isPaused && (
          <p className="text-sm text-yellow-600 dark:text-yellow-400">
            ⏸ Paused
          </p>
        )}
        {!isPlaying && !isPaused && isAtEnd && (
          <p className="text-sm text-green-600 dark:text-green-400">
            ✓ Animation complete
          </p>
        )}
        {!isPlaying && !isPaused && !isAtEnd && totalSteps > 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Ready to play
          </p>
        )}
        {totalSteps === 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No animation loaded
          </p>
        )}
      </div>
    </div>
  );
}

AnimationControls.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  isPaused: PropTypes.bool.isRequired,
  currentStepIndex: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
  speed: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
  isAtStart: PropTypes.bool.isRequired,
  isAtEnd: PropTypes.bool.isRequired,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onTogglePlayPause: PropTypes.func.isRequired,
  onNextStep: PropTypes.func.isRequired,
  onPreviousStep: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onSpeedChange: PropTypes.func.isRequired,
};

export default AnimationControls;
