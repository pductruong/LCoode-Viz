import { useEffect } from 'react';
import useProblemStore from '../store/problemStore';

/**
 * Hook to load and access all problems
 * @returns {object} Problems list and loading state
 */
function useProblems() {
  const { problems, loading, error, loadProblems } = useProblemStore();

  useEffect(() => {
    // Load problems if not already loaded
    if (problems.length === 0 && !loading) {
      loadProblems();
    }
  }, [problems.length, loading, loadProblems]);

  return {
    problems,
    loading,
    error,
  };
}

export default useProblems;
