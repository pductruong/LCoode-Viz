import { useMemo } from 'react';
import useProblemStore from '../store/problemStore';
import useFilterStore from '../store/filterStore';
import { Problem } from '@lcode-viz/types/domain';

/**
 * Hook to get filtered problems based on current filter state
 * Business logic for client-side filtering
 */
export function useFilteredProblems(): Problem[] {
  const { problems } = useProblemStore();
  const { difficulty, categories, searchQuery } = useFilterStore();

  const filteredProblems = useMemo(() => {
    let filtered = problems;

    // Apply difficulty filter
    if (difficulty.length > 0) {
      filtered = filtered.filter((p) => difficulty.includes(p.difficulty));
    }

    // Apply category filter
    if (categories.length > 0) {
      filtered = filtered.filter((p) =>
        p.categories.some((c) => categories.includes(c))
      );
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [problems, difficulty, categories, searchQuery]);

  return filteredProblems;
}
