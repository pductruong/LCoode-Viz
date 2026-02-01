import { useEffect } from 'react';
import { useServices } from '../providers/ServiceProvider';
import useProblemStore from '../store/problemStore';

/**
 * Hook to load a specific problem by ID
 * Business logic layer - coordinates between service and store
 * Automatically loads when problemId changes
 */
export function useLoadProblem(problemId: string) {
  const { problemService } = useServices();
  const { setCurrentProblem, setLoading, setError } = useProblemStore();

  useEffect(() => {
    let cancelled = false;

    const loadProblem = async () => {
      setLoading(true);
      setError(null);

      try {
        const problem = await problemService.getById(problemId);

        if (!cancelled) {
          if (problem) {
            setCurrentProblem(problem);
          } else {
            setError('Problem not found');
          }
        }
      } catch (error) {
        if (!cancelled) {
          const message = error instanceof Error ? error.message : 'Failed to load problem';
          setError(message);
          console.error('Error loading problem:', error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadProblem();

    return () => {
      cancelled = true;
      setCurrentProblem(null);
    };
  }, [problemId, problemService, setCurrentProblem, setLoading, setError]);
}
