# Animation System Design

## 1. Overview

The animation system is the core of LCode-Viz, responsible for managing the visualization lifecycle, state transitions, and rendering of algorithm execution steps.

## 2. System Architecture

```
┌─────────────────────────────────────────────────┐
│           User Controls (UI)                    │
│  [Play] [Pause] [Step] [Speed] [Timeline]       │
└──────────────────┬──────────────────────────────┘
                   │ User Actions
                   ▼
┌─────────────────────────────────────────────────┐
│         Animation Controller                    │
│  - Manages playback state                       │
│  - Handles user commands                        │
│  - Controls timeline                            │
└──────────────────┬──────────────────────────────┘
                   │ Step Commands
                   ▼
┌─────────────────────────────────────────────────┐
│          Animation Engine                       │
│  - Step state management                        │
│  - Interpolation & transitions                  │
│  - Event emission                               │
└──────────────────┬──────────────────────────────┘
                   │ Visual State
                   ▼
┌─────────────────────────────────────────────────┐
│           Renderer Layer                        │
│  [Array] [Tree] [Graph] [LinkedList] [Matrix]   │
└──────────────────┬──────────────────────────────┘
                   │ DOM/Canvas Updates
                   ▼
┌─────────────────────────────────────────────────┐
│              Display (Canvas/SVG)               │
└─────────────────────────────────────────────────┘
```

## 3. Core Components

### 3.1 Animation Controller

**Responsibilities**:
- Manage playback state (playing, paused, stopped)
- Handle user interactions from control panel
- Control animation speed
- Manage timeline scrubbing

**API**:
```typescript
class AnimationController {
  // State
  private isPlaying: boolean;
  private currentStep: number;
  private totalSteps: number;
  private speed: number; // 0.5x, 1x, 1.5x, 2x

  // Methods
  play(): void;
  pause(): void;
  stop(): void;
  stepForward(): void;
  stepBackward(): void;
  goToStep(step: number): void;
  setSpeed(speed: number): void;
  reset(): void;

  // Events
  onStepChange: (step: number) => void;
  onPlayStateChange: (isPlaying: boolean) => void;
}
```

**State Machine**:
```
     ┌─────────┐
     │ STOPPED │
     └────┬────┘
          │ load()
          ▼
     ┌─────────┐
     │  READY  │◄──────┐
     └────┬────┘       │
          │            │
     play()│       pause()
          │            │
          ▼            │
     ┌─────────┐       │
     │ PLAYING ├───────┘
     └────┬────┘
          │
    end() │
          ▼
     ┌─────────┐
     │ FINISHED│
     └─────────┘
```

### 3.2 Animation Engine

**Responsibilities**:
- Load animation steps from problem data
- Calculate current visual state
- Handle interpolation between steps
- Emit events for state changes

**API**:
```typescript
class AnimationEngine {
  private steps: AnimationStep[];
  private currentStepIndex: number;
  private interpolationProgress: number; // 0-1

  // Initialization
  loadProblem(problem: Problem, solutionId: string): void;

  // Step Management
  getCurrentStep(): AnimationStep;
  getNextStep(): AnimationStep | null;
  getPreviousStep(): AnimationStep | null;
  goToStep(index: number): void;

  // State Calculation
  getCurrentVisualState(): VisualState;
  getInterpolatedState(from: number, to: number, progress: number): VisualState;

  // Metadata
  getTotalSteps(): number;
  getCurrentStepNumber(): number;
  getStepExplanation(): string;
  getHighlightedLines(): number[];

  // Events
  onStateChange: (state: VisualState) => void;
}
```

### 3.3 Interpolation System

Smooth transitions between animation steps are crucial for understanding.

**Linear Interpolation**:
```typescript
function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}
```

**Easing Functions**:
```typescript
type EasingFunction = (t: number) => number;

const easings = {
  linear: (t) => t,
  easeInOut: (t) => t < 0.5
    ? 2 * t * t
    : -1 + (4 - 2 * t) * t,
  easeOut: (t) => t * (2 - t),
  spring: (t) => { /* spring physics */ }
};
```

**Position Interpolation** (for arrays, pointers):
```typescript
interface Position {
  x: number;
  y: number;
}

function interpolatePosition(
  from: Position,
  to: Position,
  t: number,
  easing: EasingFunction = easings.easeInOut
): Position {
  const progress = easing(t);
  return {
    x: lerp(from.x, to.x, progress),
    y: lerp(from.y, to.y, progress)
  };
}
```

**State Interpolation** (for element states):
```typescript
function interpolateArrayState(
  fromState: ArrayVisualState,
  toState: ArrayVisualState,
  t: number
): ArrayVisualState {
  // Interpolate element positions
  // Transition element states with cross-fade
  // Animate pointer movements
  // Update variable values with smooth counters
}
```

### 3.4 Renderer Layer

Each visualization type has a dedicated renderer.

**Base Renderer Interface**:
```typescript
interface Renderer {
  render(state: VisualState, container: HTMLElement): void;
  update(state: VisualState): void;
  clear(): void;
  destroy(): void;
}
```

**Array Renderer**:
```typescript
class ArrayRenderer implements Renderer {
  private container: HTMLElement;
  private elements: Map<string, HTMLElement>;

  render(state: ArrayVisualState, container: HTMLElement): void {
    // Create array elements
    // Position elements
    // Render pointers
    // Display variables
  }

  update(state: ArrayVisualState): void {
    // Update element values
    // Transition element states (colors)
    // Animate pointer positions
    // Update variable displays
  }

  private renderArray(array: VisualArray): void;
  private renderPointer(pointer: Pointer): void;
  private renderVariables(variables: Variable[]): void;
}
```

**Tree Renderer**:
```typescript
class TreeRenderer implements Renderer {
  private svg: SVGElement;
  private nodeElements: Map<string, SVGGElement>;
  private edgeElements: Map<string, SVGLineElement>;

  render(state: TreeVisualState, container: HTMLElement): void {
    // Calculate node positions (tree layout algorithm)
    // Render nodes as circles
    // Render edges as lines
    // Apply initial states
  }

  update(state: TreeVisualState): void {
    // Update node states (colors)
    // Highlight traversal path
    // Animate transitions
  }

  private calculateLayout(root: TreeNode): Map<string, Position>;
  private renderNode(node: TreeNode, position: Position): SVGGElement;
  private renderEdge(from: Position, to: Position): SVGLineElement;
}
```

## 4. Animation Timing

### 4.1 Timeline Management

```typescript
class Timeline {
  private startTime: number;
  private pausedTime: number;
  private speed: number;

  constructor(totalDuration: number) {
    this.totalDuration = totalDuration;
  }

  // Get current time in animation
  getCurrentTime(): number {
    if (this.paused) {
      return this.pausedTime;
    }
    return (Date.now() - this.startTime) * this.speed;
  }

  // Get progress (0-1)
  getProgress(): number {
    return this.getCurrentTime() / this.totalDuration;
  }

  pause(): void;
  resume(): void;
  seek(time: number): void;
  setSpeed(speed: number): void;
}
```

### 4.2 Frame Loop

```typescript
class AnimationLoop {
  private animationFrameId: number | null = null;
  private lastFrameTime: number = 0;

  start(callback: (deltaTime: number) => void): void {
    const loop = (currentTime: number) => {
      const deltaTime = currentTime - this.lastFrameTime;
      this.lastFrameTime = currentTime;

      callback(deltaTime);

      this.animationFrameId = requestAnimationFrame(loop);
    };

    this.animationFrameId = requestAnimationFrame(loop);
  }

  stop(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }
}
```

### 4.3 Step Duration Calculation

```typescript
function calculateStepDuration(step: AnimationStep, speed: number): number {
  const baseDuration = step.duration || 500; // ms
  return baseDuration / speed;
}

function calculateTotalDuration(steps: AnimationStep[], speed: number): number {
  return steps.reduce((total, step) => {
    return total + calculateStepDuration(step, speed);
  }, 0);
}
```

## 5. React Integration

### 5.1 Custom Hooks

**useAnimation Hook**:
```typescript
function useAnimation(problem: Problem, solutionId: string) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [visualState, setVisualState] = useState<VisualState | null>(null);

  const engineRef = useRef<AnimationEngine>(new AnimationEngine());
  const controllerRef = useRef<AnimationController>(new AnimationController());

  useEffect(() => {
    // Initialize engine with problem data
    engineRef.current.loadProblem(problem, solutionId);

    // Set up event listeners
    controllerRef.current.onStepChange = (step) => {
      engineRef.current.goToStep(step);
      setCurrentStep(step);
      setVisualState(engineRef.current.getCurrentVisualState());
    };

    // Initial render
    setVisualState(engineRef.current.getCurrentVisualState());
  }, [problem, solutionId]);

  const play = useCallback(() => {
    controllerRef.current.play();
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    controllerRef.current.pause();
    setIsPlaying(false);
  }, []);

  const stepForward = useCallback(() => {
    controllerRef.current.stepForward();
  }, []);

  const stepBackward = useCallback(() => {
    controllerRef.current.stepBackward();
  }, []);

  const goToStep = useCallback((step: number) => {
    controllerRef.current.goToStep(step);
  }, []);

  return {
    currentStep,
    totalSteps: engineRef.current.getTotalSteps(),
    isPlaying,
    speed,
    visualState,
    explanation: engineRef.current.getStepExplanation(),
    highlightedLines: engineRef.current.getHighlightedLines(),
    play,
    pause,
    stepForward,
    stepBackward,
    goToStep,
    setSpeed
  };
}
```

**Usage in Component**:
```typescript
function VisualizationPage({ problemId, solutionId }) {
  const problem = useProblem(problemId);
  const animation = useAnimation(problem, solutionId);

  return (
    <div>
      <VisualizationCanvas state={animation.visualState} />
      <ControlPanel
        isPlaying={animation.isPlaying}
        currentStep={animation.currentStep}
        totalSteps={animation.totalSteps}
        onPlay={animation.play}
        onPause={animation.pause}
        onStepForward={animation.stepForward}
        onStepBackward={animation.stepBackward}
        onGoToStep={animation.goToStep}
      />
      <ExplanationPanel text={animation.explanation} />
      <CodeDisplay
        code={problem.solutions[0].code}
        highlightedLines={animation.highlightedLines}
      />
    </div>
  );
}
```

### 5.2 Performance Optimization

**Memoization**:
```typescript
const VisualizationCanvas = React.memo(({ state }) => {
  // Only re-render when state actually changes
  return <Canvas state={state} />;
}, (prevProps, nextProps) => {
  return deepEqual(prevProps.state, nextProps.state);
});
```

**Lazy Renderer Creation**:
```typescript
function useRenderer(type: string) {
  return useMemo(() => {
    switch (type) {
      case 'array': return new ArrayRenderer();
      case 'tree': return new TreeRenderer();
      case 'graph': return new GraphRenderer();
      default: return new ArrayRenderer();
    }
  }, [type]);
}
```

## 6. Visualization Techniques

### 6.1 Array Visualization

**Layout**:
```
┌────┬────┬────┬────┬────┐
│  2 │  7 │ 11 │ 15 │  3 │
└────┴────┴────┴────┴────┘
  0    1    2    3    4
  ↑              ↑
 left          right
```

**States & Colors**:
- Default: `#e5e7eb` (gray)
- Active: `#3b82f6` (blue)
- Compared: `#f59e0b` (orange)
- Swapped: `#10b981` (green)
- Sorted: `#6366f1` (purple)
- Target: `#ef4444` (red)

**Animations**:
- Swap: Elements cross-fade positions
- Pointer move: Smooth linear movement
- Highlight: Color transition with glow effect

### 6.2 Tree Visualization

**Layout Algorithm** (Binary Tree):
```typescript
function calculateTreeLayout(
  node: TreeNode,
  x: number,
  y: number,
  horizontalGap: number
): Map<string, Position> {
  const positions = new Map();

  if (!node) return positions;

  positions.set(node.id, { x, y });

  if (node.left) {
    const leftPositions = calculateTreeLayout(
      node.left,
      x - horizontalGap,
      y + VERTICAL_GAP,
      horizontalGap / 2
    );
    positions = new Map([...positions, ...leftPositions]);
  }

  if (node.right) {
    const rightPositions = calculateTreeLayout(
      node.right,
      x + horizontalGap,
      y + VERTICAL_GAP,
      horizontalGap / 2
    );
    positions = new Map([...positions, ...rightPositions]);
  }

  return positions;
}
```

**Rendering**:
```svg
<!-- Node -->
<circle cx="100" cy="50" r="20" fill="#3b82f6" />
<text x="100" y="55" text-anchor="middle">5</text>

<!-- Edge -->
<line x1="100" y1="70" x2="70" y2="130" stroke="#000" stroke-width="2" />
```

### 6.3 Graph Visualization

**Force-Directed Layout** (using D3.js force simulation):
```typescript
function createForceSimulation(nodes: GraphNode[], edges: GraphEdge[]) {
  return d3.forceSimulation(nodes)
    .force('link', d3.forceLink(edges).distance(100))
    .force('charge', d3.forceManyBody().strength(-300))
    .force('center', d3.forceCenter(width / 2, height / 2));
}
```

## 7. Accessibility

### 7.1 Keyboard Controls

- `Space`: Play/Pause
- `→`: Step forward
- `←`: Step backward
- `Home`: Go to first step
- `End`: Go to last step
- `+/-`: Adjust speed

### 7.2 Screen Reader Support

```typescript
function getStepAnnouncement(step: AnimationStep): string {
  return `Step ${step.stepNumber + 1}: ${step.explanation}`;
}

// Usage
<div role="status" aria-live="polite" aria-atomic="true">
  {getStepAnnouncement(currentStep)}
</div>
```

### 7.3 Color Blind Friendly

Use patterns in addition to colors:
- Active: Solid + pulsing border
- Sorted: Checkmark icon
- Target: Star icon

## 8. Testing Strategy

### 8.1 Unit Tests

```typescript
describe('AnimationEngine', () => {
  it('should load problem steps correctly', () => {
    const engine = new AnimationEngine();
    engine.loadProblem(twoSumProblem, 'hash-map');
    expect(engine.getTotalSteps()).toBe(9);
  });

  it('should advance to next step', () => {
    const engine = new AnimationEngine();
    engine.loadProblem(twoSumProblem, 'hash-map');
    const initialStep = engine.getCurrentStepNumber();
    engine.goToStep(1);
    expect(engine.getCurrentStepNumber()).toBe(initialStep + 1);
  });

  it('should interpolate between array states', () => {
    const fromState = { /* ... */ };
    const toState = { /* ... */ };
    const interpolated = interpolateArrayState(fromState, toState, 0.5);
    // Assertions
  });
});
```

### 8.2 Integration Tests

```typescript
describe('VisualizationPage', () => {
  it('should play animation when play button is clicked', async () => {
    render(<VisualizationPage problemId="two-sum" />);

    const playButton = screen.getByRole('button', { name: /play/i });
    fireEvent.click(playButton);

    await waitFor(() => {
      expect(screen.getByText(/Step 2/i)).toBeInTheDocument();
    });
  });
});
```

### 8.3 Visual Regression Tests

Capture screenshots of visualizations at key steps and compare against baselines.

## 9. Performance Targets

- Animation frame rate: 60 FPS
- Step transition: < 16ms (1 frame)
- Initial render: < 100ms
- Memory usage: < 50MB for typical problem
- Support up to 1000 steps without lag

## 10. Future Enhancements

- **Custom Animations**: Allow problem authors to define custom animation commands
- **3D Visualizations**: For advanced data structures
- **Audio Cues**: Sound effects for key events
- **Recording**: Export animation as video
- **Interactive Mode**: User can modify inputs and see results
- **Comparison View**: Show multiple algorithms side-by-side
