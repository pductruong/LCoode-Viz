import { useEffect } from 'react';
import { useServices } from '../providers/ServiceProvider';
import useTopicStore from '../store/topicStore';

/**
 * Hook to load a specific topic by ID
 * Business logic layer - coordinates between service and store
 * Automatically loads when topicId changes
 */
export function useLoadTopic(topicId: string) {
  const { topicService } = useServices();
  const { setCurrentTopic, setLoading, setError } = useTopicStore();

  useEffect(() => {
    let cancelled = false;

    const loadTopic = async () => {
      setLoading(true);
      setError(null);

      try {
        const topic = await topicService.getById(topicId);

        if (!cancelled) {
          if (topic) {
            setCurrentTopic(topic);
          } else {
            setError('Topic not found');
          }
        }
      } catch (error) {
        if (!cancelled) {
          const message = error instanceof Error ? error.message : 'Failed to load topic';
          setError(message);
          console.error('Error loading topic:', error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadTopic();

    return () => {
      cancelled = true;
      setCurrentTopic(null);
    };
  }, [topicId, topicService, setCurrentTopic, setLoading, setError]);
}
