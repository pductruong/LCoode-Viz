import { useEffect } from 'react';
import { useLoadProblems } from './useLoadProblems';
import useProblemStore from '../store/problemStore';

/**
 * Hook to load and access all problems
 * Updated to use new service-based architecture
 * @returns {object} Problems list and loading state
 */
function useProblems() {
  const { loadProblems } = useLoadProblems();
  const { problems, loading, error } = useProblemStore();

  useEffect(() => {
    // Load problems on mount if not already loaded
    if (problems.length === 0 && !loading && !error) {
      loadProblems();
    }
  }, [problems.length, loading, error, loadProblems]);

  return {
    problems,
    loading,
    error,
  };
}

export default useProblems;
