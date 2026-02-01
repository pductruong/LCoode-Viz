import { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * LinkedListVisualizer - Interactive visualization of linked list operations
 */
function LinkedListVisualizer({ initialType = 'singly' }) {
  const [type, setType] = useState(initialType);
  const [nodes, setNodes] = useState([1, 2, 3, 4]);
  const [inputValue, setInputValue] = useState('');
  const [insertPosition, setInsertPosition] = useState('tail');
  const [highlightIndex, setHighlightIndex] = useState(null);
  const [message, setMessage] = useState('');

  // Show temporary message
  const showMessage = (msg, duration = 2000) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), duration);
  };

  // Insert node
  const handleInsert = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      showMessage('Please enter a valid number');
      return;
    }

    let newNodes = [...nodes];
    let index;

    switch (insertPosition) {
      case 'head':
        newNodes.unshift(value);
        index = 0;
        showMessage(`Inserted ${value} at head - O(1)`);
        break;
      case 'tail':
        newNodes.push(value);
        index = newNodes.length - 1;
        showMessage(`Inserted ${value} at tail - O(n)`);
        break;
      case 'position': {
        const pos = Math.min(Math.max(0, nodes.length / 2), nodes.length);
        newNodes.splice(Math.floor(pos), 0, value);
        index = Math.floor(pos);
        showMessage(`Inserted ${value} at position ${Math.floor(pos)} - O(n)`);
        break;
      }
      default:
        return;
    }

    setNodes(newNodes);
    setInputValue('');

    // Highlight the inserted node
    setHighlightIndex(index);
    setTimeout(() => setHighlightIndex(null), 1500);
  };

  // Delete node
  const handleDelete = (position) => {
    if (nodes.length === 0) {
      showMessage('List is empty');
      return;
    }

    let newNodes = [...nodes];
    let deletedValue;
    let index;

    switch (position) {
      case 'head':
        deletedValue = newNodes.shift();
        index = 0;
        showMessage(`Deleted ${deletedValue} from head - O(1)`);
        break;
      case 'tail':
        deletedValue = newNodes.pop();
        index = nodes.length - 1;
        showMessage(`Deleted ${deletedValue} from tail - O(n)`);
        break;
      case 'middle': {
        const pos = Math.floor(nodes.length / 2);
        deletedValue = newNodes.splice(pos, 1)[0];
        index = pos;
        showMessage(`Deleted ${deletedValue} from position ${pos} - O(n)`);
        break;
      }
      default:
        return;
    }

    // Highlight before deletion
    setHighlightIndex(index);
    setTimeout(() => {
      setNodes(newNodes);
      setHighlightIndex(null);
    }, 500);
  };

  // Search for a value
  const handleSearch = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      showMessage('Please enter a valid number to search');
      return;
    }

    const index = nodes.indexOf(value);
    if (index !== -1) {
      setHighlightIndex(index);
      showMessage(`Found ${value} at position ${index} - O(n)`);
      setTimeout(() => setHighlightIndex(null), 2000);
    } else {
      showMessage(`Value ${value} not found - O(n)`);
    }
    setInputValue('');
  };

  // Reverse the list
  const handleReverse = () => {
    setNodes([...nodes].reverse());
    showMessage('Reversed the list - O(n)');
  };

  // Clear all nodes
  const handleClear = () => {
    setNodes([]);
    showMessage('Cleared the list');
  };

  // Reset to default
  const handleReset = () => {
    setNodes([1, 2, 3, 4]);
    setHighlightIndex(null);
    showMessage('Reset to default');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      {/* Type Selector Tabs */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex space-x-4">
          <button
            onClick={() => setType('singly')}
            className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              type === 'singly'
                ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Singly Linked List
          </button>
          <button
            onClick={() => setType('doubly')}
            className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              type === 'doubly'
                ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Doubly Linked List
          </button>
          <button
            onClick={() => setType('circular')}
            className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              type === 'circular'
                ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Circular Linked List
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="mb-6 space-y-4">
        {/* Insert Controls */}
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Value
            </label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter number"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="flex-1 min-w-[150px]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Insert At
            </label>
            <select
              value={insertPosition}
              onChange={(e) => setInsertPosition(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
            >
              <option value="head">Head (O(1))</option>
              <option value="tail">Tail (O(n))</option>
              <option value="position">Middle (O(n))</option>
            </select>
          </div>

          <button
            onClick={handleInsert}
            disabled={!inputValue}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-colors font-medium"
          >
            Insert
          </button>

          <button
            onClick={handleSearch}
            disabled={!inputValue}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors font-medium"
          >
            Search
          </button>
        </div>

        {/* Operation Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleDelete('head')}
            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition-colors"
          >
            Delete Head
          </button>
          <button
            onClick={() => handleDelete('tail')}
            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition-colors"
          >
            Delete Tail
          </button>
          <button
            onClick={() => handleDelete('middle')}
            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition-colors"
          >
            Delete Middle
          </button>
          <button
            onClick={handleReverse}
            className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm transition-colors"
          >
            Reverse
          </button>
          <button
            onClick={handleClear}
            className="px-3 py-1.5 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm transition-colors"
          >
            Clear
          </button>
          <button
            onClick={handleReset}
            className="px-3 py-1.5 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Message Display */}
      {message && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-900 dark:text-blue-200">{message}</p>
        </div>
      )}

      {/* Visualization */}
      <div className="min-h-[200px] flex items-center justify-center overflow-x-auto p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
        {nodes.length === 0 ? (
          <div className="text-center">
            <div className="text-4xl mb-2">🔗</div>
            <p className="text-gray-500 dark:text-gray-400">Empty List</p>
            <p className="text-sm text-gray-400 dark:text-gray-500">HEAD → null</p>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            {/* HEAD Label */}
            <div className="text-sm font-mono font-semibold text-primary-600 dark:text-primary-400">
              HEAD
            </div>

            {/* Nodes */}
            {nodes.map((value, index) => (
              <div key={index} className="flex items-center gap-2">
                {/* Node */}
                <div
                  className={`
                    relative flex items-center border-2 rounded-lg transition-all duration-300
                    ${
                      highlightIndex === index
                        ? 'border-yellow-500 bg-yellow-100 dark:bg-yellow-900/30 scale-110 shadow-lg'
                        : 'border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800'
                    }
                  `}
                >
                  {/* Data part */}
                  <div className="px-4 py-3 border-r-2 border-gray-400 dark:border-gray-600">
                    <span className="font-mono text-lg font-semibold text-gray-900 dark:text-white">
                      {value}
                    </span>
                  </div>

                  {/* Pointer part */}
                  <div className="px-3 py-3 flex flex-col items-center gap-1">
                    {type === 'doubly' && (
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs text-gray-500 dark:text-gray-400">prev</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs text-primary-600 dark:text-primary-400">next</span>
                    </div>
                  </div>

                  {/* Index label */}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                      [{index}]
                    </span>
                  </div>
                </div>

                {/* Arrow between nodes */}
                {index < nodes.length - 1 && (
                  <div className="flex flex-col items-center justify-center">
                    {type === 'doubly' ? (
                      <>
                        {/* Forward arrow */}
                        <svg className="w-6 h-3 text-primary-500 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        {/* Backward arrow */}
                        <svg className="w-6 h-3 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                        </svg>
                      </>
                    ) : (
                      <svg className="w-6 h-6 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Null terminator */}
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <div className="px-4 py-3 border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-800">
                <span className="font-mono text-sm text-gray-600 dark:text-gray-400">null</span>
              </div>
            </div>

            {/* Circular indicator for circular linked list */}
            {type === 'circular' && nodes.length > 0 && (
              <div className="ml-4">
                <svg className="w-12 h-12 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        <p>
          <strong>Current size:</strong> {nodes.length} node{nodes.length !== 1 ? 's' : ''}
        </p>
        <p className="mt-1">
          <strong>List type:</strong> {type === 'singly' ? 'Singly' : type === 'doubly' ? 'Doubly' : 'Circular'} Linked List
        </p>
      </div>
    </div>
  );
}

LinkedListVisualizer.propTypes = {
  initialType: PropTypes.oneOf(['singly', 'doubly', 'circular']),
};

export default LinkedListVisualizer;
