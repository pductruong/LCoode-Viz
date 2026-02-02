import PropTypes from 'prop-types';
import { ELEMENT_STATES } from '../../engine/animationTypes';

/**
 * ArrayVisualizer - Renders an array with visual effects
 *
 * Features:
 * - Element highlighting based on state
 * - Pointers showing array indices
 * - Variables display
 * - Smooth animations
 */
function ArrayVisualizer({ array, pointers = [], variables = [] }) {
  if (!array || array.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-12 text-center">
        <p className="text-gray-500 dark:text-gray-400">No array to display</p>
      </div>
    );
  }

  // Get element color based on state
  const getElementColor = (state) => {
    switch (state) {
      case ELEMENT_STATES.ACTIVE:
        return 'bg-blue-500 text-white border-blue-600';
      case ELEMENT_STATES.COMPARING:
        return 'bg-yellow-400 text-gray-900 border-yellow-500';
      case ELEMENT_STATES.SORTED:
        return 'bg-green-500 text-white border-green-600';
      case ELEMENT_STATES.TARGET:
        return 'bg-purple-500 text-white border-purple-600';
      case ELEMENT_STATES.SWAPPING:
        return 'bg-orange-500 text-white border-orange-600';
      case ELEMENT_STATES.PIVOT:
        return 'bg-red-500 text-white border-red-600';
      case ELEMENT_STATES.FOUND:
        return 'bg-emerald-500 text-white border-emerald-600';
      case ELEMENT_STATES.DEFAULT:
      default:
        return 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600';
    }
  };

  // Get pointers for a specific index
  const getPointersForIndex = (index) => {
    return pointers.filter((p) => p.index === index);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      {/* Variables Display */}
      {variables && variables.length > 0 && (
        <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
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
                    {JSON.stringify(variable.value)}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Array Visualization */}
      <div className="relative">
        {/* Array Elements */}
        <div className="flex items-end justify-center gap-2 mb-12">
          {array.map((element, index) => {
            const elementPointers = getPointersForIndex(index);
            const hasPointers = elementPointers.length > 0;

            return (
              <div key={index} className="relative flex flex-col items-center">
                {/* Pointers Above Element */}
                {hasPointers && (
                  <div className="absolute -top-10 flex flex-col items-center gap-1">
                    {elementPointers.map((pointer, pIdx) => (
                      <div
                        key={pIdx}
                        className="flex flex-col items-center"
                        style={{ marginTop: `${pIdx * 20}px` }}
                      >
                        <span
                          className={`text-xs font-bold ${pointer.color || 'text-primary-600'}`}
                        >
                          {pointer.name}
                        </span>
                        <span
                          className={`text-lg ${pointer.color || 'text-primary-600'}`}
                        >
                          ↓
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Array Element */}
                <div
                  className={`
                    w-16 h-16 flex items-center justify-center
                    border-2 rounded-lg font-bold text-lg
                    transition-all duration-300
                    ${getElementColor(element.state)}
                    ${hasPointers ? 'transform scale-110' : ''}
                  `}
                >
                  {element.value}
                </div>

                {/* Index Label */}
                <span className="mt-2 text-xs text-gray-500 dark:text-gray-400 font-mono">
                  [{element.index}]
                </span>

                {/* Element Label (if any) */}
                {element.label && (
                  <span className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                    {element.label}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Legend
          </h3>
          <div className="flex flex-wrap gap-3 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-blue-500 border border-blue-600 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">Active</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-yellow-400 border border-yellow-500 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">Comparing</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-green-500 border border-green-600 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">Sorted</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-purple-500 border border-purple-600 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">Target</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-emerald-500 border border-emerald-600 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">Found</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ArrayVisualizer.propTypes = {
  array: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      index: PropTypes.number.isRequired,
      state: PropTypes.string,
      label: PropTypes.string,
    })
  ).isRequired,
  pointers: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.string,
    })
  ),
  variables: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
      type: PropTypes.string,
    })
  ),
};

export default ArrayVisualizer;
