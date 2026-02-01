import { create } from 'zustand';

// Filter state separated from data state - following Single Responsibility Principle
interface FilterState {
  difficulty: string[];
  categories: string[];
  searchQuery: string;
}

interface FilterActions {
  setDifficulty: (difficulty: string[]) => void;
  setCategories: (categories: string[]) => void;
  setSearchQuery: (query: string) => void;
  toggleDifficulty: (difficulty: string) => void;
  toggleCategory: (category: string) => void;
  resetFilters: () => void;
}

const initialState: FilterState = {
  difficulty: [],
  categories: [],
  searchQuery: '',
};

const useFilterStore = create<FilterState & FilterActions>((set) => ({
  ...initialState,

  setDifficulty: (difficulty) => set({ difficulty }),

  setCategories: (categories) => set({ categories }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  toggleDifficulty: (difficulty) =>
    set((state) => ({
      difficulty: state.difficulty.includes(difficulty)
        ? state.difficulty.filter((d) => d !== difficulty)
        : [...state.difficulty, difficulty],
    })),

  toggleCategory: (category) =>
    set((state) => ({
      categories: state.categories.includes(category)
        ? state.categories.filter((c) => c !== category)
        : [...state.categories, category],
    })),

  resetFilters: () => set(initialState),
}));

export default useFilterStore;
