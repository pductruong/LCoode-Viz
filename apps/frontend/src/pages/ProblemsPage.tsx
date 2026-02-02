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
  const handleFilterChange = useCallback((newFilters: { difficulties: string[]; categories: string[] }) => {
    setDifficulty(newFilters.difficulties);
    setCategories(newFilters.categories);
  }, [setDifficulty, setCategories]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-700 dark:to-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm font-semibold text-white">
                Curated LeetCode Problems
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Browse Problems
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Explore algorithm challenges with interactive visualizations
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-primary-200 dark:border-primary-900 rounded-full"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary-600 dark:border-primary-400 rounded-full border-t-transparent animate-spin"></div>
              </div>
            </div>
            <p className="mt-6 text-gray-600 dark:text-gray-400 font-medium">
              Loading problems...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="card p-8 text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-danger-100 dark:bg-danger-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-danger-600 dark:text-danger-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Error Loading Problems
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Content - only show when not loading and no error */}
        {!loading && !error && (
          <>
            {/* Stats Bar */}
            {problems.length > 0 && (
              <div className="card p-6 mb-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gradient mb-1">
                        {filteredProblems.length}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {filteredProblems.length === problems.length ? 'Total' : 'Showing'}
                      </div>
                    </div>
                    {filteredProblems.length !== problems.length && (
                      <>
                        <div className="h-12 w-px bg-gray-200 dark:bg-gray-700"></div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-400 dark:text-gray-500 mb-1">
                            {problems.length}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Total
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-2 bg-success-50 dark:bg-success-900/20 rounded-lg">
                      <div className="w-3 h-3 rounded-full bg-success-500"></div>
                      <span className="text-sm font-medium text-success-700 dark:text-success-400">Easy</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-warning-50 dark:bg-warning-900/20 rounded-lg">
                      <div className="w-3 h-3 rounded-full bg-warning-500"></div>
                      <span className="text-sm font-medium text-warning-700 dark:text-warning-400">Medium</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-danger-50 dark:bg-danger-900/20 rounded-lg">
                      <div className="w-3 h-3 rounded-full bg-danger-500"></div>
                      <span className="text-sm font-medium text-danger-700 dark:text-danger-400">Hard</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Search Bar */}
            {problems.length > 0 && (
              <div className="mb-8">
                <SearchBar
                  placeholder="Search by title, description, or category..."
                  onSearch={setSearchQuery}
                />
              </div>
            )}

            {/* Main Layout: Sidebar + Grid */}
            {problems.length > 0 ? (
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Filter Sidebar */}
                <aside className="lg:w-72 flex-shrink-0">
                  <div className="lg:sticky lg:top-24">
                    <FilterSidebar
                      filters={filters}
                      onFilterChange={handleFilterChange}
                      availableCategories={availableCategories}
                    />
                  </div>
                </aside>

                {/* Problem Grid */}
                <main className="flex-1 min-w-0">
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
              <div className="card p-12 text-center max-w-2xl mx-auto">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  No Problems Yet
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  We're working hard to add more algorithm challenges. Check back soon!
                </p>
                <a href="https://github.com/yourusername/lcode-viz" target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex">
                  Contribute on GitHub
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ProblemsPage;
