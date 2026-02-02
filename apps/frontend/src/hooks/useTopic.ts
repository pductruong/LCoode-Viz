import { useLoadTopic } from './useLoadTopic';
import useTopicStore from '../store/topicStore';

/**
 * Hook to load and access a specific topic
 * Updated to use new service-based architecture
 * @param {string} topicId - The topic ID to load
 * @returns {object} Topic data and loading state
 */
function useTopic(topicId: string | undefined) {
  // Use the new hook that auto-loads the topic
  if (topicId) {
    useLoadTopic(topicId);
  }

  const { currentTopic, loading, error } = useTopicStore();

  return {
    topic: currentTopic,
    loading,
    error,
  };
}

export default useTopic;
