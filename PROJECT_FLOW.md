# Project Flow (LCode-Viz)

This document explains how data and UI flow through the current app (as of today).

## 1) App startup

1. `src/main.jsx` boots React and renders `<App />`.
2. `src/App.jsx` sets up the router and global layout.
   - Header + Footer are always shown.
   - Routes:
     - `/` → `HomePage`
     - `/problems` → `ProblemsPage`
     - `/problems/:problemId` → `VisualizationPage`

## 2) Problems list flow (`/problems`)

1. `ProblemsPage` calls `useProblems()`.
2. `useProblems` reads Zustand state from `useProblemStore` and triggers `loadProblems()` if the list is empty.
3. `loadProblems()` dynamically imports problem data (currently only `two-sum`).
4. The store updates `problems`, which re-renders the page with cards linking to `/problems/:problemId`.

## 3) Problem detail flow (`/problems/:problemId`)

1. `VisualizationPage` reads the URL param and calls `useProblem(problemId)`.
2. `useProblem` invokes `loadProblem(problemId)` on mount and clears state on unmount.
3. `loadProblem` dynamically imports the matching problem (currently only `two-sum`).
4. The page renders:
   - problem metadata (title, difficulty, categories)
   - description + examples + constraints
   - solution preview (first solution only)
   - a placeholder block for the future visualization player

## 4) Data source flow

- Problems are stored as local JS modules under `src/data/problems/...`.
- Each problem file exports a structured object, including metadata, examples, constraints, and solutions.
- Today, the store uses dynamic imports to fetch this data at runtime (no backend).

Example file:
- `src/data/problems/arrays/two-sum.js`

## 5) State management (Zustand)

`src/store/problemStore.js` manages:
- `problems` (list)
- `currentProblem` (detail view)
- `loading` + `error`

It exposes the following actions:
- `loadProblems()` → fetches the full list (currently one problem)
- `loadProblem(problemId)` → fetches a single problem
- `clearProblem()` → resets detail state

## 6) Current limitations (important for contributors)

- Only one problem (`two-sum`) is wired into the store.
- The visualization engine and renderers are not implemented yet.
- The detail page only shows the first solution, and only as static code.

## 7) Minimal flow diagram

```
Browser → main.jsx → App.jsx (Router)
  ├─ / → HomePage
  ├─ /problems → ProblemsPage → useProblems → problemStore.loadProblems → data import
  └─ /problems/:id → VisualizationPage → useProblem → problemStore.loadProblem → data import
```

## 8) Where to extend next

- Add more problem files under `src/data/problems/`.
- Update `loadProblems` and `loadProblem` to import the full catalog.
- Build the animation engine in `src/engine/` and replace the placeholder block on `VisualizationPage`.
