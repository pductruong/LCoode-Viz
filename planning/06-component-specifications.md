# Component Specifications

## 1. Overview

This document provides detailed specifications for all major components in LCode-Viz, including props, state, behavior, and implementation notes.

## 2. Page Components

### 2.1 HomePage

**Purpose**: Landing page showcasing the platform and featured problems

**Props**: None (top-level route component)

**Structure**:
```typescript
function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProblems />
      <CategoryGrid />
      <Footer />
    </>
  );
}
```

**Subcomponents**:

#### Hero
```typescript
interface HeroProps {}

function Hero() {
  // Large title, subtitle, CTA buttons
  // Animations on mount
}
```

#### FeaturedProblems
```typescript
interface FeaturedProblemsProps {
  limit?: number; // Default: 8
}

function FeaturedProblems({ limit = 8 }) {
  const problems = useFeaturedProblems(limit);

  return (
    <section>
      <h2>Featured Problems</h2>
      <ProblemGrid problems={problems} />
    </section>
  );
}
```

#### CategoryGrid
```typescript
interface Category {
  id: string;
  name: string;
  icon: ReactNode;
  count: number;
}

interface CategoryGridProps {
  categories: Category[];
}

function CategoryGrid({ categories }) {
  // Display categories as cards
  // Navigate to ProblemsPage with category filter on click
}
```

### 2.2 ProblemsPage

**Purpose**: Browse and filter all available problems

**Props**: None (route component, uses URL params)

**State**:
```typescript
interface ProblemsPageState {
  filters: {
    difficulty: string[];
    categories: string[];
    searchQuery: string;
  };
  sortBy: 'number' | 'difficulty' | 'title';
  page: number;
}
```

**Structure**:
```typescript
function ProblemsPage() {
  const [filters, setFilters] = useState<Filters>({});
  const [sortBy, setSortBy] = useState('number');
  const problems = useFilteredProblems(filters, sortBy);

  return (
    <div className="flex">
      <FilterSidebar
        filters={filters}
        onFilterChange={setFilters}
      />
      <main>
        <SearchBar
          value={filters.searchQuery}
          onChange={(q) => setFilters({...filters, searchQuery: q})}
        />
        <SortControl value={sortBy} onChange={setSortBy} />
        <ProblemGrid problems={problems} />
      </main>
    </div>
  );
}
```

### 2.3 VisualizationPage

**Purpose**: Display problem with interactive visualization

**Props**:
```typescript
interface VisualizationPageProps {
  problemId: string; // from route params
}
```

**State**: Managed by `useAnimation` hook

**Structure**:
```typescript
function VisualizationPage({ problemId }: VisualizationPageProps) {
  const problem = useProblem(problemId);
  const [selectedSolution, setSelectedSolution] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  const animation = useAnimation(
    problem,
    problem.solutions[selectedSolution].id
  );

  if (!problem) return <NotFound />;

  return (
    <div className="grid lg:grid-cols-2">
      <VisualizationPanel
        visualState={animation.visualState}
        explanation={animation.explanation}
        controls={
          <ControlPanel
            isPlaying={animation.isPlaying}
            currentStep={animation.currentStep}
            totalSteps={animation.totalSteps}
            onPlay={animation.play}
            onPause={animation.pause}
            onStepForward={animation.stepForward}
            onStepBackward={animation.stepBackward}
            onGoToStep={animation.goToStep}
            speed={animation.speed}
            onSpeedChange={animation.setSpeed}
          />
        }
      />
      <CodePanel
        code={problem.solutions[selectedSolution].code}
        language={selectedLanguage}
        highlightedLines={animation.highlightedLines}
        complexity={{
          time: problem.solutions[selectedSolution].timeComplexity,
          space: problem.solutions[selectedSolution].spaceComplexity,
        }}
      />
      <ProblemDescription
        title={problem.title}
        description={problem.description}
        examples={problem.examples}
        constraints={problem.constraints}
      />
    </div>
  );
}
```

## 3. Visualization Components

### 3.1 VisualizationPanel

**Purpose**: Container for canvas and controls

**Props**:
```typescript
interface VisualizationPanelProps {
  visualState: VisualState | null;
  explanation: string;
  controls: ReactNode;
}

function VisualizationPanel({
  visualState,
  explanation,
  controls
}: VisualizationPanelProps) {
  return (
    <div className="flex flex-col">
      <Canvas visualState={visualState} />
      {controls}
      <ExplanationPanel text={explanation} />
    </div>
  );
}
```

### 3.2 Canvas

**Purpose**: Render visualizations based on state type

**Props**:
```typescript
interface CanvasProps {
  visualState: VisualState | null;
}

function Canvas({ visualState }: CanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const renderer = useRenderer(visualState?.type);

  useEffect(() => {
    if (!visualState || !containerRef.current) return;

    renderer.render(visualState, containerRef.current);

    return () => renderer.clear();
  }, [visualState?.type]);

  useEffect(() => {
    if (!visualState) return;
    renderer.update(visualState);
  }, [visualState]);

  return (
    <div
      ref={containerRef}
      className="bg-white dark:bg-gray-900 rounded-lg p-8 min-h-96"
    />
  );
}
```

### 3.3 ArrayVisualizer (Renderer)

**Purpose**: Render array visualization states

**Implementation**:
```typescript
class ArrayRenderer implements Renderer {
  private container: HTMLElement | null = null;
  private elements: Map<string, HTMLElement> = new Map();
  private pointers: Map<string, HTMLElement> = new Map();

  render(state: ArrayVisualState, container: HTMLElement): void {
    this.container = container;
    this.clear();

    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'flex flex-col gap-8';

    // Render each array
    state.arrays.forEach(array => {
      const arrayEl = this.renderArray(array);
      wrapper.appendChild(arrayEl);
    });

    // Render variables
    if (state.variables) {
      const varsEl = this.renderVariables(state.variables);
      wrapper.appendChild(varsEl);
    }

    container.appendChild(wrapper);
  }

  update(state: ArrayVisualState): void {
    // Update element states (colors)
    state.arrays.forEach(array => {
      array.values.forEach(element => {
        const el = this.elements.get(`${array.id}-${element.index}`);
        if (el) {
          this.updateElementState(el, element.state);
        }
      });
    });

    // Animate pointer positions
    state.pointers?.forEach(pointer => {
      const el = this.pointers.get(pointer.id);
      if (el) {
        this.animatePointer(el, pointer.index);
      }
    });
  }

  private renderArray(array: VisualArray): HTMLElement {
    const container = document.createElement('div');
    container.className = 'flex flex-col gap-2';

    // Label
    if (array.label) {
      const label = document.createElement('div');
      label.className = 'text-sm font-medium text-gray-600';
      label.textContent = array.label;
      container.appendChild(label);
    }

    // Array elements
    const elementsRow = document.createElement('div');
    elementsRow.className = 'flex gap-1';

    array.values.forEach(element => {
      const el = this.createArrayElement(element);
      this.elements.set(`${array.id}-${element.index}`, el);
      elementsRow.appendChild(el);
    });

    container.appendChild(elementsRow);

    // Indices
    const indicesRow = document.createElement('div');
    indicesRow.className = 'flex gap-1';

    array.values.forEach(element => {
      const idx = document.createElement('div');
      idx.className = 'w-12 h-6 flex items-center justify-center text-xs text-gray-500';
      idx.textContent = String(element.index);
      indicesRow.appendChild(idx);
    });

    container.appendChild(indicesRow);

    return container;
  }

  private createArrayElement(element: ArrayElement): HTMLElement {
    const el = document.createElement('div');
    el.className = 'w-12 h-12 flex items-center justify-center border-2 rounded font-mono transition-all duration-300';
    el.textContent = String(element.value);

    this.updateElementState(el, element.state);

    return el;
  }

  private updateElementState(el: HTMLElement, state?: string): void {
    // Remove old state classes
    el.className = el.className.replace(/bg-\S+/g, '').replace(/border-\S+/g, '');

    // Add new state classes
    switch (state) {
      case 'active':
        el.classList.add('bg-blue-500', 'border-blue-600', 'text-white');
        break;
      case 'compared':
        el.classList.add('bg-orange-500', 'border-orange-600', 'text-white');
        break;
      case 'swapped':
        el.classList.add('bg-green-500', 'border-green-600', 'text-white');
        break;
      case 'sorted':
        el.classList.add('bg-purple-500', 'border-purple-600', 'text-white');
        break;
      case 'target':
        el.classList.add('bg-red-500', 'border-red-600', 'text-white');
        break;
      default:
        el.classList.add('bg-gray-100', 'border-gray-300', 'text-gray-800');
    }
  }

  private renderVariables(variables: Variable[]): HTMLElement {
    const container = document.createElement('div');
    container.className = 'bg-gray-50 p-4 rounded border border-gray-200';

    const title = document.createElement('div');
    title.className = 'text-sm font-medium text-gray-700 mb-2';
    title.textContent = 'Variables';
    container.appendChild(title);

    const varsGrid = document.createElement('div');
    varsGrid.className = 'grid grid-cols-2 gap-2';

    variables.forEach(v => {
      const varEl = document.createElement('div');
      varEl.className = 'text-sm font-mono';
      varEl.innerHTML = `<span class="text-gray-600">${v.name}:</span> <span class="font-semibold">${JSON.stringify(v.value)}</span>`;
      varsGrid.appendChild(varEl);
    });

    container.appendChild(varsGrid);
    return container;
  }

  private animatePointer(el: HTMLElement, toIndex: number): void {
    // Smooth position transition
    el.style.transform = `translateX(${toIndex * 52}px)`; // 48px width + 4px gap
  }

  clear(): void {
    if (this.container) {
      this.container.innerHTML = '';
    }
    this.elements.clear();
    this.pointers.clear();
  }

  destroy(): void {
    this.clear();
    this.container = null;
  }
}
```

## 4. Control Components

### 4.1 ControlPanel

**Purpose**: Provide playback controls for animation

**Props**:
```typescript
interface ControlPanelProps {
  isPlaying: boolean;
  currentStep: number;
  totalSteps: number;
  speed: number;
  onPlay: () => void;
  onPause: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onGoToStep: (step: number) => void;
  onSpeedChange: (speed: number) => void;
}

function ControlPanel({
  isPlaying,
  currentStep,
  totalSteps,
  speed,
  onPlay,
  onPause,
  onStepForward,
  onStepBackward,
  onGoToStep,
  onSpeedChange,
}: ControlPanelProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
      {/* Buttons */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <Button
          onClick={() => onGoToStep(0)}
          aria-label="Skip to start"
          icon={<SkipBackIcon />}
        />
        <Button
          onClick={onStepBackward}
          aria-label="Step backward"
          icon={<ChevronLeftIcon />}
        />
        <Button
          onClick={isPlaying ? onPause : onPlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          icon={isPlaying ? <PauseIcon /> : <PlayIcon />}
          variant="primary"
          size="large"
        />
        <Button
          onClick={onStepForward}
          aria-label="Step forward"
          icon={<ChevronRightIcon />}
        />
        <Button
          onClick={() => onGoToStep(totalSteps - 1)}
          aria-label="Skip to end"
          icon={<SkipForwardIcon />}
        />
        <SpeedControl value={speed} onChange={onSpeedChange} />
      </div>

      {/* Timeline */}
      <Timeline
        current={currentStep}
        total={totalSteps}
        onChange={onGoToStep}
      />

      {/* Step counter */}
      <div className="text-center text-sm text-gray-600 mt-2">
        Step {currentStep + 1} / {totalSteps}
      </div>
    </div>
  );
}
```

### 4.2 Timeline

**Purpose**: Slider for scrubbing through animation steps

**Props**:
```typescript
interface TimelineProps {
  current: number;
  total: number;
  onChange: (step: number) => void;
}

function Timeline({ current, total, onChange }: TimelineProps) {
  return (
    <input
      type="range"
      min={0}
      max={total - 1}
      value={current}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full"
      aria-label="Animation timeline"
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={total - 1}
    />
  );
}
```

### 4.3 SpeedControl

**Purpose**: Dropdown for selecting playback speed

**Props**:
```typescript
interface SpeedControlProps {
  value: number;
  onChange: (speed: number) => void;
}

function SpeedControl({ value, onChange }: SpeedControlProps) {
  const speeds = [0.5, 1, 1.5, 2];

  return (
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="px-3 py-2 border rounded"
      aria-label="Playback speed"
    >
      {speeds.map(speed => (
        <option key={speed} value={speed}>
          {speed}x
        </option>
      ))}
    </select>
  );
}
```

## 5. Display Components

### 5.1 CodeDisplay

**Purpose**: Show solution code with syntax highlighting

**Props**:
```typescript
interface CodeDisplayProps {
  code: string;
  language: string;
  highlightedLines: number[];
  lineHighlight?: 'normal' | 'success' | 'error' | 'warning';
}

function CodeDisplay({
  code,
  language,
  highlightedLines,
  lineHighlight = 'normal',
}: CodeDisplayProps) {
  const lines = code.split('\n');

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
      <pre className="p-4 overflow-x-auto">
        <code className={`language-${language}`}>
          {lines.map((line, i) => {
            const lineNumber = i + 1;
            const isHighlighted = highlightedLines.includes(lineNumber);

            return (
              <div
                key={i}
                className={cn(
                  'flex',
                  isHighlighted && 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500'
                )}
              >
                <span className="w-12 text-gray-400 text-right mr-4 select-none">
                  {lineNumber}
                </span>
                <span>{line}</span>
              </div>
            );
          })}
        </code>
      </pre>
    </div>
  );
}
```

### 5.2 ExplanationPanel

**Purpose**: Display step explanation text

**Props**:
```typescript
interface ExplanationPanelProps {
  text: string;
  shortLabel?: string;
}

function ExplanationPanel({ text, shortLabel }: ExplanationPanelProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
      {shortLabel && (
        <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">
          {shortLabel}
        </div>
      )}
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        {text}
      </p>
    </div>
  );
}
```

### 5.3 ProblemDescription

**Purpose**: Display problem statement, examples, constraints

**Props**:
```typescript
interface ProblemDescriptionProps {
  title: string;
  description: string;
  examples: Example[];
  constraints: string[];
}

function ProblemDescription({
  title,
  description,
  examples,
  constraints,
}: ProblemDescriptionProps) {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <h1>{title}</h1>

      <div dangerouslySetInnerHTML={{ __html: marked(description) }} />

      <h3>Examples</h3>
      {examples.map((ex, i) => (
        <div key={i} className="bg-gray-50 p-4 rounded my-4">
          <div className="font-mono text-sm">
            <div><strong>Input:</strong> {formatInput(ex.input)}</div>
            <div><strong>Output:</strong> {JSON.stringify(ex.output)}</div>
          </div>
          {ex.explanation && (
            <div className="mt-2 text-sm text-gray-600">
              <strong>Explanation:</strong> {ex.explanation}
            </div>
          )}
        </div>
      ))}

      <h3>Constraints</h3>
      <ul>
        {constraints.map((c, i) => (
          <li key={i}><code>{c}</code></li>
        ))}
      </ul>
    </div>
  );
}
```

## 6. List Components

### 6.1 ProblemGrid

**Purpose**: Display grid of problem cards

**Props**:
```typescript
interface ProblemGridProps {
  problems: Problem[];
}

function ProblemGrid({ problems }: ProblemGridProps) {
  if (problems.length === 0) {
    return <EmptyState message="No problems found" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {problems.map(problem => (
        <ProblemCard key={problem.id} problem={problem} />
      ))}
    </div>
  );
}
```

### 6.2 ProblemCard

**Purpose**: Display individual problem summary

**Props**:
```typescript
interface ProblemCardProps {
  problem: Problem;
}

function ProblemCard({ problem }: ProblemCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer p-6"
      onClick={() => navigate(`/problems/${problem.id}`)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {problem.title}
        </h3>
        <DifficultyBadge difficulty={problem.difficulty} />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-3">
        {problem.categories.slice(0, 3).map(cat => (
          <span
            key={cat}
            className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded"
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Description preview */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
        {problem.description}
      </p>

      {/* CTA */}
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium transition-colors">
        Visualize
      </button>
    </div>
  );
}
```

### 6.3 FilterSidebar

**Purpose**: Provide filtering controls

**Props**:
```typescript
interface FilterSidebarProps {
  filters: {
    difficulty: string[];
    categories: string[];
    searchQuery: string;
  };
  onFilterChange: (filters: any) => void;
}

function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const categories = ['Array', 'Tree', 'Graph', /* ... */];

  const toggleDifficulty = (diff: string) => {
    const updated = filters.difficulty.includes(diff)
      ? filters.difficulty.filter(d => d !== diff)
      : [...filters.difficulty, diff];
    onFilterChange({ ...filters, difficulty: updated });
  };

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 p-6 border-r">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {/* Difficulty */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Difficulty</h3>
        {difficulties.map(diff => (
          <label key={diff} className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              checked={filters.difficulty.includes(diff)}
              onChange={() => toggleDifficulty(diff)}
            />
            <span className="text-sm">{diff}</span>
          </label>
        ))}
      </div>

      {/* Categories - similar implementation */}

      {/* Clear all */}
      <button
        onClick={() => onFilterChange({ difficulty: [], categories: [], searchQuery: '' })}
        className="text-sm text-blue-600 hover:underline"
      >
        Clear all
      </button>
    </aside>
  );
}
```

## 7. Utility Components

### 7.1 DifficultyBadge

```typescript
interface DifficultyBadgeProps {
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  const styles = {
    Easy: 'bg-green-100 text-green-800 border-green-200',
    Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Hard: 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded border ${styles[difficulty]}`}>
      {difficulty}
    </span>
  );
}
```

### 7.2 Button

```typescript
interface ButtonProps {
  onClick: () => void;
  icon?: ReactNode;
  children?: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  'aria-label': string;
}

function Button({
  onClick,
  icon,
  children,
  variant = 'secondary',
  size = 'medium',
  disabled = false,
  ...props
}: ButtonProps) {
  const baseStyles = 'rounded font-medium transition-all focus:outline-none focus:ring-2';

  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    ghost: 'hover:bg-gray-100 text-gray-700',
  };

  const sizeStyles = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size])}
      {...props}
    >
      {icon && <span className="inline-block mr-2">{icon}</span>}
      {children}
    </button>
  );
}
```

## 8. Custom Hooks

### 8.1 useProblem

```typescript
function useProblem(problemId: string): Problem | null {
  const [problem, setProblem] = useState<Problem | null>(null);

  useEffect(() => {
    // Load problem from data
    import(`../data/problems/${problemId}.js`)
      .then(module => setProblem(module.default))
      .catch(() => setProblem(null));
  }, [problemId]);

  return problem;
}
```

### 8.2 useFilteredProblems

```typescript
function useFilteredProblems(filters: Filters, sortBy: string): Problem[] {
  const allProblems = useAllProblems();

  return useMemo(() => {
    let filtered = allProblems;

    // Apply difficulty filter
    if (filters.difficulty.length > 0) {
      filtered = filtered.filter(p =>
        filters.difficulty.includes(p.difficulty)
      );
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(p =>
        p.categories.some(c => filters.categories.includes(c))
      );
    }

    // Apply search
    if (filters.searchQuery) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'number':
          return a.number - b.number;
        case 'difficulty':
          const diffOrder = { Easy: 1, Medium: 2, Hard: 3 };
          return diffOrder[a.difficulty] - diffOrder[b.difficulty];
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [allProblems, filters, sortBy]);
}
```

This comprehensive component specification should provide all the details needed to implement the LCode-Viz application!
