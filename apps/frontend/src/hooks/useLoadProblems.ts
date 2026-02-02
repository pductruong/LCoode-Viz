import { useCallback } from 'react';
import { useServices } from '../providers/ServiceProvider';
import useProblemStore from '../store/problemStore';

/**
 * Hook to load all problems from API
 * Business logic layer - coordinates between service and store
 */
export function useLoadProblems() {
  const { problemService } = useServices();
  const { setProblems, setLoading, setError } = useProblemStore();

  const loadProblems = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const problems = await problemService.getAll();
      setProblems(problems);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load problems';
      setError(message);
      console.error('Error loading problems:', error);
    } finally {
      setLoading(false);
    }
  }, [problemService, setProblems, setLoading, setError]);

  return { loadProblems };
}
