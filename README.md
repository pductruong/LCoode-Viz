# LCode-Viz

A visual learning platform for LeetCode problems with interactive animations to help users understand algorithmic solutions step-by-step.

## Overview

LCode-Viz is an educational web application designed to make learning algorithms and data structures more intuitive through visual representations. Users can explore pre-implemented LeetCode solutions with synchronized animations that demonstrate how each algorithm works internally.

## Core Features

- **Animated Solution Visualizations**: Step-by-step animations showing how algorithms process data
- **Pre-implemented Solutions**: Curated collection of LeetCode problems with optimized solutions
- **Interactive Controls**: Play, pause, step forward/backward through algorithm execution
- **Multiple Language Support**: Solutions available in popular programming languages (Python, JavaScript, Java, C++)
- **Explanation Panels**: Side-by-side code and visualization with detailed explanations
- **Problem Categorization**: Browse by difficulty, topic (arrays, trees, graphs, DP, etc.), or company tags

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Frontend (SPA)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Problem    │  │  Animation   │  │    Code      │  │
│  │   Browser    │  │   Engine     │  │   Display    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   Data Layer (Static)                   │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Problem Definitions + Solutions + Animations    │  │
│  │         (JSON/JS modules in codebase)            │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Component Breakdown

#### 1. Frontend Application

**Technology Stack (Proposed)**:
- **Framework**: React/Next.js or Vue.js
- **Animation Library**: D3.js, GSAP, or Framer Motion
- **Styling**: Tailwind CSS or styled-components
- **Code Display**: Monaco Editor or Prism.js with syntax highlighting

**Key Components**:
- **Problem List View**: Browse and search problems
- **Problem Detail View**: Display problem description, constraints, examples
- **Visualization Canvas**: Render animations (arrays, trees, graphs, etc.)
- **Code Panel**: Display solution code with line highlighting
- **Control Panel**: Playback controls (play/pause/step/speed)
- **Explanation Panel**: Step-by-step textual explanations

#### 2. Animation Engine

The animation engine is responsible for:
- Parsing algorithm steps from solution definitions
- Managing animation state and timeline
- Rendering visual elements (nodes, edges, arrays, pointers)
- Synchronizing code highlighting with visual steps

**Animation State Machine**:
```
Initial State → [Step 1] → [Step 2] → ... → [Final State]
     ↑                                            │
     └────────────────────────────────────────────┘
```

#### 3. Data Structure

Each problem will be defined as a structured module/JSON containing:

```javascript
{
  id: "two-sum",
  title: "1. Two Sum",
  difficulty: "easy",
  category: ["array", "hash-table"],
  description: "...",
  examples: [...],
  solutions: [
    {
      language: "javascript",
      code: "...",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      steps: [
        {
          line: 5,
          visualState: {...},
          explanation: "Initialize hash map"
        },
        // ... more steps
      ]
    }
  ],
  testCases: [...]
}
```

## Project Structure (Proposed)

```
lcode-viz/
├── public/
│   └── assets/
│       └── images/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── SearchBar.jsx
│   │   ├── problem/
│   │   │   ├── ProblemList.jsx
│   │   │   ├── ProblemCard.jsx
│   │   │   └── ProblemDetail.jsx
│   │   ├── visualization/
│   │   │   ├── VisualizationCanvas.jsx
│   │   │   ├── ArrayVisualizer.jsx
│   │   │   ├── TreeVisualizer.jsx
│   │   │   ├── GraphVisualizer.jsx
│   │   │   └── ControlPanel.jsx
│   │   └── code/
│   │       ├── CodeEditor.jsx
│   │       └── CodeHighlighter.jsx
│   ├── data/
│   │   └── problems/
│   │       ├── arrays/
│   │       │   ├── two-sum.js
│   │       │   ├── best-time-to-buy-stock.js
│   │       │   └── ...
│   │       ├── trees/
│   │       ├── graphs/
│   │       ├── dynamic-programming/
│   │       └── index.js
│   ├── engine/
│   │   ├── AnimationEngine.js
│   │   ├── StateManager.js
│   │   └── renderers/
│   │       ├── ArrayRenderer.js
│   │       ├── TreeRenderer.js
│   │       └── GraphRenderer.js
│   ├── hooks/
│   │   ├── useAnimation.js
│   │   └── useProblem.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Problems.jsx
│   │   └── Visualize.jsx
│   ├── styles/
│   ├── utils/
│   └── App.jsx
├── package.json
└── README.md
```

## How It Works

### 1. Problem Definition Phase (Developer)
- Implement solution for a LeetCode problem
- Break down solution into discrete steps
- Define visual state for each step (what data structures look like)
- Write explanations for each step
- Add to problem data repository

### 2. Runtime Phase (User)
- User selects a problem from the catalog
- Frontend loads problem definition and solution steps
- Animation engine initializes with the first state
- User controls playback:
  - **Play**: Automatically advances through steps
  - **Step Forward/Backward**: Manual step control
  - **Scrub**: Jump to specific step
- Visualization updates in sync with code highlighting and explanations

### 3. Visualization Rendering
- Animation engine determines current step
- Renderer translates step data into visual elements
- Smooth transitions between states using animation library
- Code panel highlights relevant lines
- Explanation panel shows step description

## Technology Decisions

### Why Static Data (No Backend)?
- **Simplicity**: Easier to deploy and maintain
- **Performance**: No API latency, instant loading
- **Cost**: Can be hosted on free static hosting (Netlify, Vercel, GitHub Pages)
- **Versioning**: Solutions tracked in git with the codebase
- **Extensibility**: Easy for contributors to add new problems via PRs

### Animation Approach
Two possible approaches:

**Option 1: Declarative State-Based**
- Define what the visualization should look like at each step
- Engine handles transitions between states
- More flexible and easier to author

**Option 2: Imperative Command-Based**
- Define explicit animation commands (move, highlight, create, destroy)
- More control but harder to author
- Better for complex custom animations

**Recommendation**: Start with Option 1 for faster iteration

## Development Phases

### Phase 1: Foundation
- [ ] Set up project structure
- [ ] Implement basic UI layout
- [ ] Create array visualizer component
- [ ] Build animation engine MVP
- [ ] Implement 2-3 simple problems (e.g., Two Sum, Reverse Array)

### Phase 2: Core Features
- [ ] Add tree and linked list visualizers
- [ ] Implement code highlighting synchronization
- [ ] Add playback controls (play/pause/step/speed)
- [ ] Create problem browsing and filtering
- [ ] Implement 10-15 common problems across categories

### Phase 3: Enhancement
- [ ] Add graph visualizer
- [ ] Implement explanation panel with rich text
- [ ] Add theme switching (light/dark mode)
- [ ] Create mobile-responsive design
- [ ] Add 20+ more problems

### Phase 4: Polish
- [ ] Optimize performance
- [ ] Add animations polish and transitions
- [ ] Implement search and advanced filtering
- [ ] Add problem difficulty progression
- [ ] User feedback and analytics

## Contributing

To add a new problem:

1. Create a new file in `src/data/problems/[category]/`
2. Follow the problem definition schema
3. Implement the solution with step breakdown
4. Define visual states for each step
5. Test the visualization
6. Submit a pull request

## Future Enhancements

- **User Progress Tracking**: Save which problems users have viewed
- **Custom Input**: Allow users to input custom test cases
- **Comparison Mode**: Show multiple solutions side-by-side
- **Explanation Videos**: Embed video walkthroughs for complex problems
- **Community Solutions**: Allow users to submit alternative visualizations
- **Mobile App**: Native mobile application
- **Quiz Mode**: Test understanding with interactive questions

## License

TBD

## Contact

TBD
