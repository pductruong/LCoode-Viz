import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// App-wide state (theme, preferences, etc.)
const useAppStore = create(
  persist(
    (set) => ({
      // State
      theme: 'light', // 'light' | 'dark'
      language: 'javascript', // Default code language

      // Actions
      setTheme: (theme) => set({ theme }),

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),

      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'lcode-viz-storage', // localStorage key
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
      }),
    }
  )
);

export default useAppStore;
