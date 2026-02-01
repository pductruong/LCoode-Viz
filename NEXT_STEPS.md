# Next Steps - Completing the Integration

## Current Status ✅

The SOLID refactoring is **substantially complete**:

- ✅ Backend REST API fully functional
- ✅ Frontend service layer implemented
- ✅ Stores refactored (state-only)
- ✅ Custom hooks created
- ✅ TypeScript infrastructure set up
- ✅ Documentation complete

## What's Left: Update Frontend Pages

The frontend pages still use the old store methods (like `loadProblems()`) that no longer exist. You need to update them to use the new **custom hooks**.

---

## Step 1: Update ProblemsPage

**File**: `src/pages/ProblemsPage.jsx` → Rename to `.tsx`

**Current Code** (old approach):
```jsx
import useProblemStore from '../store/problemStore';

function ProblemsPage() {
  const { problems, loading, loadProblems } = useProblemStore();

  useEffect(() => {
    loadProblems(); // ❌ This method no longer exists
  }, []);
}
```

**New Code** (using hooks):
```tsx
import { useEffect } from 'react';
import { useLoadProblems } from '../hooks/useLoadProblems';
import { useFilteredProblems } from '../hooks/useFilteredProblems';
import useProblemStore from '../store/problemStore';
import useFilterStore from '../store/filterStore';

function ProblemsPage() {
  // Use custom hooks
  const { loadProblems } = useLoadProblems();
  const filteredProblems = useFilteredProblems();
  const { loading, error } = useProblemStore();
  const { searchQuery, setSearchQuery, difficulty, toggleDifficulty } = useFilterStore();

  // Load problems on mount
  useEffect(() => {
    loadProblems(); // ✅ Hook handles service call
  }, [loadProblems]);

  // Render with filteredProblems instead of problems
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {filteredProblems.map(problem => (
        <ProblemCard key={problem.id} problem={problem} />
      ))}
    </div>
  );
}
```

---

## Step 2: Update VisualizationPage

**File**: `src/pages/VisualizationPage.jsx` → Rename to `.tsx`

**Current Code**:
```jsx
const { currentProblem, loadProblem } = useProblemStore();

useEffect(() => {
  loadProblem(problemId); // ❌ Method doesn't exist
}, [problemId]);
```

**New Code**:
```tsx
import { useParams } from 'react-router-dom';
import { useLoadProblem } from '../hooks/useLoadProblem';
import useProblemStore from '../store/problemStore';

function VisualizationPage() {
  const { problemId } = useParams<{ problemId: string }>();

  // Hook automatically loads when problemId changes
  useLoadProblem(problemId!);

  const { currentProblem, loading, error } = useProblemStore();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!currentProblem) return <div>Problem not found</div>;

  return (
    <div>
      <h1>{currentProblem.title}</h1>
      {/* Rest of visualization */}
    </div>
  );
}
```

---

## Step 3: Update LearnPage

**File**: `src/pages/LearnPage.jsx` → Rename to `.tsx`

**Current Code**:
```jsx
const { topics, loading, loadTopics } = useTopicStore();

useEffect(() => {
  loadTopics(); // ❌ Method doesn't exist
}, []);
```

**New Code**:
```tsx
import { useEffect } from 'react';
import { useLoadTopics } from '../hooks/useLoadTopics';
import useTopicStore from '../store/topicStore';

function LearnPage() {
  const { loadTopics } = useLoadTopics();
  const { topics, loading, error } = useTopicStore();

  useEffect(() => {
    loadTopics(); // ✅ Hook handles service call
  }, [loadTopics]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {topics.map(topic => (
        <TopicCard key={topic.id} topic={topic} />
      ))}
    </div>
  );
}
```

---

## Step 4: Update TopicDetailPage

**File**: `src/pages/TopicDetailPage.jsx` → Rename to `.tsx`

**Current Code**:
```jsx
const { currentTopic, loadTopic } = useTopicStore();

useEffect(() => {
  loadTopic(topicId); // ❌ Method doesn't exist
}, [topicId]);
```

**New Code**:
```tsx
import { useParams } from 'react-router-dom';
import { useLoadTopic } from '../hooks/useLoadTopic';
import useTopicStore from '../store/topicStore';

function TopicDetailPage() {
  const { topicId } = useParams<{ topicId: string }>();

  // Hook automatically loads when topicId changes
  useLoadTopic(topicId!);

  const { currentTopic, loading, error } = useTopicStore();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!currentTopic) return <div>Topic not found</div>;

  return (
    <div>
      <h1>{currentTopic.title}</h1>
      {/* Rest of topic content */}
    </div>
  );
}
```

---

## Step 5: Delete Old Problem/Topic Data Files (Optional)

Since data now comes from the API/database, you can **optionally** remove the old static data files:

```bash
# These are no longer used (data is in database)
rm -rf src/data/problems/
# Keep src/data/learn/ if you want to reference it for adding more topics
```

**Note**: Keep `src/data/learn/` temporarily for reference when adding new topics to the database.

---

## Step 6: Test the Application

1. **Start Backend**:
```bash
cd backend
npm run dev
```

2. **Start Frontend**:
```bash
npm run dev
```

3. **Test Each Page**:
   - Navigate to `/problems` - should load problems from API
   - Navigate to `/problems/two-sum` - should load specific problem
   - Navigate to `/learn` - should load topics from API
   - Navigate to `/learn/data-structures/linked-list` - should load specific topic

4. **Check Browser Console**:
   - Open DevTools → Network tab
   - Should see requests to `/api/problems`, `/api/topics`
   - Check for any errors

---

## Step 7: Add Search and Filter UI (Optional Enhancement)

Now that you have `useFilterStore`, you can add filter controls:

```tsx
import useFilterStore from '../store/filterStore';

function FilterSidebar() {
  const { difficulty, toggleDifficulty } = useFilterStore();

  return (
    <div>
      <h3>Difficulty</h3>
      {['Easy', 'Medium', 'Hard'].map(d => (
        <label key={d}>
          <input
            type="checkbox"
            checked={difficulty.includes(d)}
            onChange={() => toggleDifficulty(d)}
          />
          {d}
        </label>
      ))}
    </div>
  );
}
```

---

## Troubleshooting

### Error: "loadProblems is not a function"
- **Cause**: Page is using old store method
- **Fix**: Update to use `useLoadProblems()` hook

### Error: "Cannot read property 'id' of undefined"
- **Cause**: Data structure changed (backend returns different format)
- **Fix**: Check API response format, ensure API clients are parsing JSON correctly

### Error: "Network request failed"
- **Cause**: Backend not running or proxy misconfigured
- **Fix**:
  1. Make sure backend is running on port 4000
  2. Check `vite.config.js` proxy configuration
  3. Check browser Network tab for actual request URL

### Data Not Showing
- **Cause**: Database might be empty
- **Fix**:
```bash
cd backend
npm run seed  # Re-seed database
```

---

## Quick Reference: Hook Usage

| Old (Store Method) | New (Hook) |
|-------------------|------------|
| `loadProblems()` | `useLoadProblems()` → `loadProblems()` |
| `loadProblem(id)` | `useLoadProblem(id)` → auto-loads |
| `loadTopics()` | `useLoadTopics()` → `loadTopics()` |
| `loadTopic(id)` | `useLoadTopic(id)` → auto-loads |

---

## Commit Your Changes

After updating all pages:

```bash
git add src/pages/
git commit -m "refactor(pages): update to use new service hooks

- Updated ProblemsPage to use useLoadProblems
- Updated VisualizationPage to use useLoadProblem
- Updated LearnPage to use useLoadTopics
- Updated TopicDetailPage to use useLoadTopic
- All pages now load data from REST API

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Success Criteria ✅

You'll know it's working when:

1. ✅ Backend shows API requests in console (e.g., `GET /api/problems`)
2. ✅ Frontend Network tab shows successful API calls
3. ✅ Problems page displays problems from database
4. ✅ Clicking a problem loads visualization
5. ✅ Learn page displays topics from database
6. ✅ Clicking a topic loads topic details
7. ✅ No console errors

---

## Phase 6 (Optional): Component Refactoring

Once everything works, you can optionally:

1. Split components into Container/Presenter pattern
2. Create `VisualizerFactory` for extensibility
3. Extract reusable UI components

But this is **not required** for the app to function!

---

## Need Help?

- **Architecture**: See [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Setup**: See [SETUP.md](./SETUP.md)
- **API Docs**: Check `ARCHITECTURE.md` API Endpoints section
- **Git History**: `git log --oneline` to see implementation details

---

## Summary

**You're 90% done!** The hard work (backend, services, stores, hooks) is complete. Just update the **4 main pages** to use the new hooks, and you'll have a fully functional app with clean architecture following SOLID principles! 🚀
