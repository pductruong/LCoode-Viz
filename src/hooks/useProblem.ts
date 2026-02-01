import { useLoadProblem } from './useLoadProblem';
import useProblemStore from '../store/problemStore';

/**
 * Hook to load and access a specific problem
 * Updated to use new service-based architecture
 * @param {string} problemId - The problem ID to load
 * @returns {object} Problem data and loading state
 */
function useProblem(problemId: string | undefined) {
  // Use the new hook that auto-loads the problem
  if (problemId) {
    useLoadProblem(problemId);
  }

  const { currentProblem, loading, error } = useProblemStore();

  return {
    problem: currentProblem,
    loading,
    error,
  };
}

export default useProblem;
