import { useCallback } from 'react';
import { useServices } from '../providers/ServiceProvider';
import useTopicStore from '../store/topicStore';

/**
 * Hook to load all topics from API
 * Business logic layer - coordinates between service and store
 */
export function useLoadTopics() {
  const { topicService } = useServices();
  const { setTopics, setLoading, setError } = useTopicStore();

  const loadTopics = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const topics = await topicService.getAll();
      setTopics(topics);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load topics';
      setError(message);
      console.error('Error loading topics:', error);
    } finally {
      setLoading(false);
    }
  }, [topicService, setTopics, setLoading, setError]);

  return { loadTopics };
}
