import PropTypes from 'prop-types';

/**
 * QueueVisualizer - Visualizes queue operations in BFS
 *
 * Shows queue elements with their states:
 * - active: currently being processed
 * - enqueued: just added
 * - waiting: in queue, waiting to be processed
 */
function QueueVisualizer({ queue = [], visited = [], wordList = [] }) {
  // Get state color for queue item
  const getQueueItemColor = (state) => {
    switch (state) {
      case 'active':
        return 'bg-blue-500 text-white border-blue-600 ring-4 ring-blue-300';
      case 'enqueued':
        return 'bg-green-500 text-white border-green-600 animate-pulse';
      case 'waiting':
        return 'bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white border-gray-400';
      default:
        return 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600';
    }
  };

  // Get state color for word list item
  const getWordListColor = (state) => {
    switch (state) {
      case 'visiting':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-300 border-blue-300';
      case 'visited':
        return 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border-gray-300';
      case 'path':
        return 'bg-green-200 dark:bg-green-900/30 text-green-900 dark:text-green-300 border-green-400 font-bold';
      case 'target':
        return 'bg-purple-200 dark:bg-purple-900/30 text-purple-900 dark:text-purple-300 border-purple-400 font-bold';
      case 'found':
        return 'bg-emerald-500 text-white border-emerald-600 font-bold animate-pulse';
      case 'available':
      default:
        return 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Queue Visualization */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Queue (FIFO - First In, First Out)
        </h3>

        {queue.length === 0 ? (
          <div className="bg-gray-50 dark:bg-gray-900 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">Queue is empty</p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Queue Direction Labels */}
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
              <span>← Front (Dequeue)</span>
              <span>Rear (Enqueue) →</span>
            </div>

            {/* Queue Items */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {queue.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`
                      min-w-[100px] px-4 py-3 rounded-lg border-2 text-center font-mono font-semibold
                      transition-all duration-300
                      ${getQueueItemColor(item.state)}
                    `}
                  >
                    <div className="text-sm">{item.word}</div>
                    <div className="text-xs mt-1 opacity-75">
                      Lv {item.level}
                    </div>
                  </div>
                  {index < queue.length - 1 && (
                    <div className="mx-1 text-gray-400">→</div>
                  )}
                </div>
              ))}
            </div>

            {/* Queue Count */}
            <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
              {queue.length} item{queue.length !== 1 ? 's' : ''} in queue
            </div>
          </div>
        )}
      </div>

      {/* Visited Set */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Visited Set
        </h3>

        {visited.length === 0 ? (
          <div className="bg-gray-50 dark:bg-gray-900 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
            <p className="text-gray-500 dark:text-gray-400">No words visited yet</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {visited.map((word, index) => (
              <div
                key={index}
                className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded font-mono text-sm border border-gray-300 dark:border-gray-600"
              >
                {word}
              </div>
            ))}
          </div>
        )}

        <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          {visited.length} word{visited.length !== 1 ? 's' : ''} visited
        </div>
      </div>

      {/* Word List */}
      {wordList && wordList.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Word Dictionary
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {wordList.map((item, index) => (
              <div
                key={index}
                className={`
                  px-3 py-2 rounded text-center font-mono text-sm border-2
                  transition-all duration-300
                  ${getWordListColor(item.state)}
                `}
              >
                {item.word}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Legend
            </h4>
            <div className="flex flex-wrap gap-3 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Available</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-300 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Visiting</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 border-2 border-gray-300 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Visited</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-green-200 dark:bg-green-900/30 border-2 border-green-400 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">In Path</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-emerald-500 border-2 border-emerald-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Found!</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

QueueVisualizer.propTypes = {
  queue: PropTypes.arrayOf(
    PropTypes.shape({
      word: PropTypes.string.isRequired,
      level: PropTypes.number.isRequired,
      state: PropTypes.string,
    })
  ),
  visited: PropTypes.arrayOf(PropTypes.string),
  wordList: PropTypes.arrayOf(
    PropTypes.shape({
      word: PropTypes.string.isRequired,
      state: PropTypes.string,
    })
  ),
};

export default QueueVisualizer;
