import PropTypes from 'prop-types';

/**
 * ComplexityTable - Displays operation time/space complexity table
 */
function ComplexityTable({ operations }) {
  // Get color based on complexity
  const getComplexityColor = (complexity) => {
    if (complexity.includes('O(1)')) {
      return 'text-green-600 dark:text-green-400 font-semibold';
    } else if (complexity.includes('O(log n)')) {
      return 'text-blue-600 dark:text-blue-400 font-semibold';
    } else if (complexity.includes('O(n)')) {
      return 'text-yellow-600 dark:text-yellow-400 font-semibold';
    } else if (complexity.includes('O(n log n)')) {
      return 'text-orange-600 dark:text-orange-400 font-semibold';
    } else if (complexity.includes('O(n²)') || complexity.includes('O(n^2)')) {
      return 'text-red-600 dark:text-red-400 font-semibold';
    }
    return 'text-gray-700 dark:text-gray-300 font-semibold';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Operation
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Average
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Worst
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Space
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Code Example
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {operations.map((operation, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {operation.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <code className={`font-mono ${getComplexityColor(operation.timeAvg)}`}>
                    {operation.timeAvg}
                  </code>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <code className={`font-mono ${getComplexityColor(operation.timeWorst)}`}>
                    {operation.timeWorst}
                  </code>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <code className={`font-mono ${getComplexityColor(operation.space)}`}>
                    {operation.space}
                  </code>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <code className="font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">
                    {operation.code}
                  </code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="bg-gray-50 dark:bg-gray-900 px-6 py-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-1">
            <span className="text-green-600 dark:text-green-400 font-semibold font-mono">
              O(1)
            </span>
            <span className="text-gray-500 dark:text-gray-400">- Constant</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-blue-600 dark:text-blue-400 font-semibold font-mono">
              O(log n)
            </span>
            <span className="text-gray-500 dark:text-gray-400">- Logarithmic</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-yellow-600 dark:text-yellow-400 font-semibold font-mono">
              O(n)
            </span>
            <span className="text-gray-500 dark:text-gray-400">- Linear</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-orange-600 dark:text-orange-400 font-semibold font-mono">
              O(n log n)
            </span>
            <span className="text-gray-500 dark:text-gray-400">- Linearithmic</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-red-600 dark:text-red-400 font-semibold font-mono">
              O(n²)
            </span>
            <span className="text-gray-500 dark:text-gray-400">- Quadratic</span>
          </div>
        </div>
      </div>
    </div>
  );
}

ComplexityTable.propTypes = {
  operations: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      timeAvg: PropTypes.string.isRequired,
      timeWorst: PropTypes.string.isRequired,
      space: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ComplexityTable;
