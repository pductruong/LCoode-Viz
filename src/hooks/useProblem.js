import { useEffect } from 'react';
import useProblemStore from '../store/problemStore';

/**
 * Hook to load and access a specific problem
 * @param {string} problemId - The problem ID to load
 * @returns {object} Problem data and loading state
 */
function useProblem(problemId) {
  const { currentProblem, loading, error, loadProblem, clearProblem } =
    useProblemStore();

  useEffect(() => {
    if (problemId) {
      loadProblem(problemId);
    }

    // Cleanup on unmount
    return () => clearProblem();
  }, [problemId, loadProblem, clearProblem]);

  return {
    problem: currentProblem,
    loading,
    error,
  };
}

export default useProblem;
