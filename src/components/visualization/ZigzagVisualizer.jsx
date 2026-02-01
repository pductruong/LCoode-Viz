import PropTypes from 'prop-types';

/**
 * ZigzagVisualizer - Visualizes the zigzag pattern for string conversion
 *
 * Shows:
 * - 2D grid with zigzag pattern
 * - Current position indicator
 * - Row contents
 * - Character placement animation
 */
function ZigzagVisualizer({ grid = [], rows = [], position = null, readingRow = null, finalResult = null, variables = [] }) {
  // Get character color based on state
  const getCharColor = (state) => {
    switch (state) {
      case 'added':
        return 'bg-green-500 text-white border-green-600 animate-pulse shadow-lg scale-110';
      case 'placed':
        return 'bg-blue-200 dark:bg-blue-900/30 text-blue-900 dark:text-blue-300 border-blue-400';
      case 'complete':
        return 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-400';
      case 'reading':
        return 'bg-yellow-400 text-gray-900 border-yellow-500 font-bold shadow-lg';
      case 'result':
        return 'bg-green-200 dark:bg-green-900/30 text-green-900 dark:text-green-300 border-green-400 font-bold';
      default:
        return 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600';
    }
  };

  // Get row color based on state
  const getRowColor = (state) => {
    switch (state) {
      case 'current':
      case 'active':
        return 'bg-blue-100 dark:bg-blue-900/20 border-blue-400 dark:border-blue-600';
      case 'reading':
        return 'bg-yellow-100 dark:bg-yellow-900/20 border-yellow-400 dark:border-yellow-600';
      case 'complete':
        return 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600';
      case 'waiting':
        return 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700';
      default:
        return 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    }
  };

  // Calculate grid dimensions
  const maxRow = Math.max(...grid.map(g => g.row), 0);
  const maxCol = Math.max(...grid.map(g => g.col), 0);
  const numRows = maxRow + 1;
  const numCols = maxCol + 1;

  // Create 2D grid structure
  const gridMatrix = Array(numRows).fill(null).map(() => Array(numCols).fill(null));
  grid.forEach(item => {
    gridMatrix[item.row][item.col] = item;
  });

  return (
    <div className="space-y-6">
      {/* Variables Display */}
      {variables && variables.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Variables
          </h3>
          <div className="flex flex-wrap gap-4">
            {variables.map((variable, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-900 px-3 py-2 rounded"
              >
                <span className="font-mono text-sm">
                  <span className="text-primary-600 dark:text-primary-400 font-semibold">
                    {variable.name}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400"> = </span>
                  <span className="text-gray-900 dark:text-white">
                    {typeof variable.value === 'string' ? `"${variable.value}"` : JSON.stringify(variable.value)}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Zigzag Grid */}
      {grid.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Zigzag Pattern Grid
          </h3>

          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              {gridMatrix.map((row, rowIndex) => (
                <div key={rowIndex} className="flex items-center gap-2 mb-2">
                  {/* Row label */}
                  <div className="w-12 text-right pr-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                      Row {rowIndex}
                    </span>
                  </div>

                  {/* Grid cells */}
                  {row.map((cell, colIndex) => (
                    <div
                      key={colIndex}
                      className={`
                        relative w-12 h-12 flex items-center justify-center
                        border-2 rounded font-mono font-bold text-lg
                        transition-all duration-300
                        ${cell ? getCharColor(cell.state) : 'border-dashed border-gray-200 dark:border-gray-700'}
                      `}
                    >
                      {cell ? cell.char : ''}

                      {/* Current position indicator */}
                      {position && position.row === rowIndex && position.col === colIndex && (
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                          <div className="text-primary-600 dark:text-primary-400 text-2xl animate-bounce">
                            ↓
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Grid info */}
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            {grid.length} character{grid.length !== 1 ? 's' : ''} • {' '}
            {numRows} row{numRows !== 1 ? 's' : ''} × {numCols} column{numCols !== 1 ? 's' : ''}
          </div>
        </div>
      )}

      {/* Row Contents */}
      {rows && rows.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Row Contents
          </h3>

          <div className="space-y-3">
            {rows.map((row, index) => (
              <div
                key={index}
                className={`
                  p-4 rounded-lg border-2 transition-all duration-300
                  ${getRowColor(row.state)}
                  ${readingRow === index ? 'ring-2 ring-yellow-400' : ''}
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Row {index}:
                    </span>
                    <span className="font-mono text-lg font-bold">
                      {row.content || '(empty)'}
                    </span>
                  </div>

                  {readingRow === index && (
                    <span className="text-xs bg-yellow-500 text-white px-2 py-1 rounded font-semibold">
                      Reading
                    </span>
                  )}
                </div>

                {row.content && (
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    Length: {row.content.length}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Final Result */}
      {finalResult && (
        <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-3">
            Final Result
          </h3>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-green-300 dark:border-green-700">
            <div className="font-mono text-2xl font-bold text-green-600 dark:text-green-400 text-center break-all">
              {finalResult}
            </div>
          </div>
          <div className="mt-3 text-sm text-green-700 dark:text-green-400 text-center">
            ✓ Conversion complete! Length: {finalResult.length}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Legend
        </h4>
        <div className="flex flex-wrap gap-3 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-6 h-6 bg-green-500 border-2 border-green-600 rounded"></div>
            <span className="text-gray-600 dark:text-gray-400">Just Added</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-6 h-6 bg-blue-200 dark:bg-blue-900/30 border-2 border-blue-400 rounded"></div>
            <span className="text-gray-600 dark:text-gray-400">Placed</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-6 h-6 bg-yellow-400 border-2 border-yellow-500 rounded"></div>
            <span className="text-gray-600 dark:text-gray-400">Reading</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 border-2 border-gray-400 rounded"></div>
            <span className="text-gray-600 dark:text-gray-400">Complete</span>
          </div>
        </div>
      </div>
    </div>
  );
}

ZigzagVisualizer.propTypes = {
  grid: PropTypes.arrayOf(
    PropTypes.shape({
      char: PropTypes.string.isRequired,
      row: PropTypes.number.isRequired,
      col: PropTypes.number.isRequired,
      state: PropTypes.string,
    })
  ),
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      rowIndex: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
      state: PropTypes.string,
    })
  ),
  position: PropTypes.shape({
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired,
  }),
  readingRow: PropTypes.number,
  finalResult: PropTypes.string,
  variables: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    })
  ),
};

export default ZigzagVisualizer;
