import { create } from 'zustand';
import { Problem } from '@lcode-viz/types/domain';

// State only - following Single Responsibility Principle
interface ProblemState {
  problems: Problem[];
  currentProblem: Problem | null;
  loading: boolean;
  error: string | null;
}

interface ProblemActions {
  setProblems: (problems: Problem[]) => void;
  setCurrentProblem: (problem: Problem | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState: ProblemState = {
  problems: [],
  currentProblem: null,
  loading: false,
  error: null,
};

const useProblemStore = create<ProblemState & ProblemActions>((set) => ({
  ...initialState,

  // State setters only - no business logic
  setProblems: (problems) => set({ problems }),

  setCurrentProblem: (problem) => set({ currentProblem: problem }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  reset: () => set(initialState),
}));

export default useProblemStore;
