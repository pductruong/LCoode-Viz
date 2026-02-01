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
      // Import all available problems
      const { twoSum } = await import('../data/problems/arrays/two-sum.js');
      const { wordLadder } = await import('../data/problems/graphs/word-ladder.js');
      const { zigzagConversion } = await import('../data/problems/strings/zigzag-conversion.js');

      set({ problems: [twoSum, wordLadder, zigzagConversion], loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Load specific problem by ID
  loadProblem: async (problemId) => {
    set({ loading: true, error: null });
    try {
      // Dynamic import based on problem ID
      if (problemId === 'two-sum') {
        const { twoSum } = await import('../data/problems/arrays/two-sum.js');
        set({ currentProblem: twoSum, loading: false });
      } else if (problemId === 'word-ladder') {
        const { wordLadder } = await import('../data/problems/graphs/word-ladder.js');
        set({ currentProblem: wordLadder, loading: false });
      } else if (problemId === 'zigzag-conversion') {
        const { zigzagConversion } = await import('../data/problems/strings/zigzag-conversion.js');
        set({ currentProblem: zigzagConversion, loading: false });
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
