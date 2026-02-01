import { create } from 'zustand';

/**
 * Topic Store - Manages learning topics data
 *
 * Loads topic content dynamically from data files
 * Provides topics by category and individual topic lookup
 */

const useTopicStore = create((set, get) => ({
  // State
  topics: [],
  currentTopic: null,
  loading: false,
  error: null,

  // Load all available topics metadata
  loadTopics: async () => {
    set({ loading: true, error: null });

    try {
      // Import all topic files
      // Currently we only have linked-list, but this structure allows easy expansion
      const topicModules = {
        'linked-list': () => import('../data/learn/data-structures/linked-list.js'),
        // Future topics can be added here:
        // 'array': () => import('../data/learn/data-structures/array.js'),
        // 'binary-search': () => import('../data/learn/algorithms/binary-search.js'),
      };

      const loadedTopics = [];

      for (const [topicId, importFn] of Object.entries(topicModules)) {
        try {
          const module = await importFn();
          const topic = module.linkedListTopic || module.default;
          if (topic) {
            loadedTopics.push(topic);
          }
        } catch (error) {
          console.error(`Failed to load topic: ${topicId}`, error);
        }
      }

      set({ topics: loadedTopics, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Get topics by category
  getTopicsByCategory: (category) => {
    const { topics } = get();
    if (!category || category === 'all') {
      return topics;
    }
    return topics.filter(topic => topic.category === category);
  },

  // Load a specific topic by ID
  loadTopic: async (topicId) => {
    set({ loading: true, error: null });

    try {
      let topic = null;

      // Check if already loaded
      const { topics } = get();
      const cachedTopic = topics.find(t => t.id === topicId);

      if (cachedTopic) {
        set({ currentTopic: cachedTopic, loading: false });
        return cachedTopic;
      }

      // Dynamic import based on topic ID
      switch (topicId) {
        case 'linked-list': {
          const module = await import('../data/learn/data-structures/linked-list.js');
          topic = module.linkedListTopic || module.default;
          break;
        }
        // Future topics:
        // case 'array': {
        //   const module = await import('../data/learn/data-structures/array.js');
        //   topic = module.arrayTopic || module.default;
        //   break;
        // }
        default:
          throw new Error(`Topic not found: ${topicId}`);
      }

      if (!topic) {
        throw new Error(`Failed to load topic: ${topicId}`);
      }

      set({ currentTopic: topic, loading: false });
      return topic;
    } catch (error) {
      set({ error: error.message, loading: false, currentTopic: null });
      return null;
    }
  },

  // Search topics by query
  searchTopics: (query) => {
    const { topics } = get();
    if (!query || query.trim() === '') {
      return topics;
    }

    const lowerQuery = query.toLowerCase();
    return topics.filter(topic =>
      topic.title.toLowerCase().includes(lowerQuery) ||
      topic.description.toLowerCase().includes(lowerQuery) ||
      topic.category.toLowerCase().includes(lowerQuery)
    );
  },

  // Get topics by difficulty
  getTopicsByDifficulty: (difficulty) => {
    const { topics } = get();
    if (!difficulty) {
      return topics;
    }
    return topics.filter(topic => topic.difficulty === difficulty);
  },

  // Clear current topic
  clearCurrentTopic: () => {
    set({ currentTopic: null });
  },

  // Reset store
  reset: () => {
    set({
      topics: [],
      currentTopic: null,
      loading: false,
      error: null,
    });
  },
}));

export default useTopicStore;
