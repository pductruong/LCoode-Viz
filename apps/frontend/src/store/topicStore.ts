import { create } from 'zustand';
import { Topic } from '@lcode-viz/types/domain';

// State only - following Single Responsibility Principle
interface TopicState {
  topics: Topic[];
  currentTopic: Topic | null;
  loading: boolean;
  error: string | null;
}

interface TopicActions {
  setTopics: (topics: Topic[]) => void;
  setCurrentTopic: (topic: Topic | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState: TopicState = {
  topics: [],
  currentTopic: null,
  loading: false,
  error: null,
};

const useTopicStore = create<TopicState & TopicActions>((set) => ({
  ...initialState,

  // State setters only - no business logic
  setTopics: (topics) => set({ topics }),

  setCurrentTopic: (topic) => set({ currentTopic: topic }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  reset: () => set(initialState),
}));

export default useTopicStore;
