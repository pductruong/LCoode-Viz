import { useMemo, useCallback } from 'react';
import useProblems from '../hooks/useProblems';
import { useFilteredProblems } from '../hooks/useFilteredProblems';
import useFilterStore from '../store/filterStore';
import SearchBar from '../components/common/SearchBar';
import FilterSidebar from '../components/problem/FilterSidebar';
import ProblemGrid from '../components/problem/ProblemGrid';

function ProblemsPage() {
  const { problems, loading, error } = useProblems();
  const filteredProblems = useFilteredProblems();
  const { searchQuery, setSearchQuery, difficulty, categories, setDifficulty, setCategories } = useFilterStore();

  // Extract unique categories from all problems
  const availableCategories = useMemo(() => {
    const categorySet = new Set<string>();
    problems.forEach((problem) => {
      problem.categories?.forEach((cat) => categorySet.add(cat));
    });
    return Array.from(categorySet).sort();
  }, [problems]);

  // Create filters object for FilterSidebar compatibility
  const filters = useMemo(() => ({
    difficulties: difficulty,
    categories: categories,
  }), [difficulty, categories]);

  // Handle filter changes from FilterSidebar
  // Memoize to prevent infinite loop in FilterSidebar's useEffect
  const handleFilterChange = useCallback((newFilters: { difficulties: string[]; categories: string[] }) => {
    setDifficulty(newFilters.difficulties);
    setCategories(newFilters.categories);
  }, [setDifficulty, setCategories]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Browse Problems
      </h1>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading problems...
          </p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-8 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-semibold text-red-900 dark:text-red-100 mb-2">
            Error Loading Problems
          </h2>
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Main Content */}
      {!loading && !error && (
        <>
          {/* Stats Bar */}
          {problems.length > 0 && (
            <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {filteredProblems.length === problems.length
                      ? 'Total Problems'
                      : `Showing ${filteredProblems.length} of ${problems.length} problems`}
                  </p>
                  <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                    {filteredProblems.length}
                  </p>
                </div>
                <div className="text-6xl">🎯</div>
              </div>
            </div>
          )}

          {/* Search Bar */}
          {problems.length > 0 && (
            <div className="mb-6">
              <SearchBar
                placeholder="Search by title, description, or category..."
                onSearch={setSearchQuery}
              />
            </div>
          )}

          {/* Main Layout: Sidebar + Grid */}
          {problems.length > 0 ? (
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Filter Sidebar */}
              <aside className="lg:w-64 flex-shrink-0">
                <FilterSidebar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  availableCategories={availableCategories}
                />
              </aside>

              {/* Problem Grid */}
              <main className="flex-1">
                <ProblemGrid
                  problems={filteredProblems}
                  emptyMessage={
                    searchQuery || difficulty.length > 0 || categories.length > 0
                      ? 'No problems match your filters. Try adjusting your search or filters.'
                      : 'No problems available yet.'
                  }
                />
              </main>
            </div>
          ) : (
            // Empty state when no problems at all
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-12 text-center">
              <div className="text-6xl mb-4">📚</div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                No Problems Yet
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Problems will be added soon!
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProblemsPage;
