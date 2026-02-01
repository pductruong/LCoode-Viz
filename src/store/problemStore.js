import { create } from 'zustand';

// Problem store for managing problem data and state
const useProblemStore = create((set, get) => ({
  // State
  problems: [],
  currentProblem: null,
  loading: false,
  error: null,

  // Actions
  setProblems: (problems) => set({ problems }),

  setProblem: (problem) => set({ currentProblem: problem }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  // Load all problems
  loadProblems: async () => {
    set({ loading: true, error: null });
    try {
      // For now, we'll import problems dynamically
      // Later this will load all problems from the data folder
      const { twoSum } = await import('../data/problems/arrays/two-sum.js');
      set({ problems: [twoSum], loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Load specific problem by ID
  loadProblem: async (problemId) => {
    set({ loading: true, error: null });
    try {
      // Dynamic import based on problem ID
      // For now, we only have two-sum
      if (problemId === 'two-sum') {
        const { twoSum } = await import('../data/problems/arrays/two-sum.js');
        set({ currentProblem: twoSum, loading: false });
      } else {
        throw new Error('Problem not found');
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Clear current problem
  clearProblem: () => set({ currentProblem: null }),
}));

export default useProblemStore;
