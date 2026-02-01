import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * FilterSidebar - Sidebar with filters for difficulty and categories
 * @param {Object} filters - Current filter state { difficulties: [], categories: [] }
 * @param {Function} onFilterChange - Callback when filters change
 * @param {Array} availableCategories - List of all available categories
 */
function FilterSidebar({
  filters = { difficulties: [], categories: [] },
  onFilterChange,
  availableCategories = [],
}) {
  const [selectedDifficulties, setSelectedDifficulties] = useState(
    filters.difficulties || []
  );
  const [selectedCategories, setSelectedCategories] = useState(
    filters.categories || []
  );

  const difficulties = ['Easy', 'Medium', 'Hard'];

  // Sync internal state when external filters change (e.g., from URL or reset)
  useEffect(() => {
    setSelectedDifficulties(filters.difficulties || []);
    setSelectedCategories(filters.categories || []);
  }, [filters.difficulties, filters.categories]);

  // Helper to notify parent of changes
  const notifyChange = (newDifficulties, newCategories) => {
    if (onFilterChange) {
      onFilterChange({
        difficulties: newDifficulties,
        categories: newCategories,
      });
    }
  };

  // Toggle difficulty filter
  const toggleDifficulty = (difficulty) => {
    setSelectedDifficulties((prev) => {
      const newDifficulties = prev.includes(difficulty)
        ? prev.filter((d) => d !== difficulty)
        : [...prev, difficulty];
      // Notify parent immediately with new values
      notifyChange(newDifficulties, selectedCategories);
      return newDifficulties;
    });
  };

  // Toggle category filter
  const toggleCategory = (category) => {
    setSelectedCategories((prev) => {
      const newCategories = prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category];
      // Notify parent immediately with new values
      notifyChange(selectedDifficulties, newCategories);
      return newCategories;
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedDifficulties([]);
    setSelectedCategories([]);
    notifyChange([], []);
  };

  const hasActiveFilters =
    selectedDifficulties.length > 0 || selectedCategories.length > 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Filters
        </h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Difficulty Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Difficulty
        </h3>
        <div className="space-y-2">
          {difficulties.map((difficulty) => {
            const isSelected = selectedDifficulties.includes(difficulty);
            const colorClasses = {
              Easy: 'text-green-700 dark:text-green-400',
              Medium: 'text-yellow-700 dark:text-yellow-400',
              Hard: 'text-red-700 dark:text-red-400',
            };

            return (
              <label
                key={difficulty}
                className="flex items-center cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleDifficulty(difficulty)}
                  className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500 focus:ring-2"
                />
                <span
                  className={`ml-3 text-sm font-medium ${
                    isSelected
                      ? colorClasses[difficulty]
                      : 'text-gray-700 dark:text-gray-300'
                  } group-hover:text-gray-900 dark:group-hover:text-white`}
                >
                  {difficulty}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Category Filter */}
      {availableCategories.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Categories
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {availableCategories.map((category) => {
              const isSelected = selectedCategories.includes(category);

              return (
                <label
                  key={category}
                  className="flex items-center cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleCategory(category)}
                    className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500 focus:ring-2"
                  />
                  <span
                    className={`ml-3 text-sm ${
                      isSelected
                        ? 'text-gray-900 dark:text-white font-medium'
                        : 'text-gray-700 dark:text-gray-300'
                    } group-hover:text-gray-900 dark:group-hover:text-white`}
                  >
                    {category}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Active Filters Count */}
      {hasActiveFilters && (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {selectedDifficulties.length + selectedCategories.length} filter
            {selectedDifficulties.length + selectedCategories.length > 1
              ? 's'
              : ''}{' '}
            active
          </p>
        </div>
      )}
    </div>
  );
}

FilterSidebar.propTypes = {
  filters: PropTypes.shape({
    difficulties: PropTypes.arrayOf(PropTypes.string),
    categories: PropTypes.arrayOf(PropTypes.string),
  }),
  onFilterChange: PropTypes.func,
  availableCategories: PropTypes.arrayOf(PropTypes.string),
};

export default FilterSidebar;
