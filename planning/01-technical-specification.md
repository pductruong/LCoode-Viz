# Technical Specification

## 1. System Overview

LCode-Viz is a client-side web application that provides interactive visualizations for LeetCode algorithm solutions. The system operates entirely in the browser without requiring a backend server.

## 2. Technical Requirements

### 2.1 Functional Requirements

#### FR1: Problem Browsing
- Users can browse a catalog of LeetCode problems
- Filter by difficulty (Easy, Medium, Hard)
- Filter by category (Arrays, Trees, Graphs, Dynamic Programming, etc.)
- Search by problem name or number
- Sort by difficulty, category, or problem number

#### FR2: Solution Visualization
- Display problem description and constraints
- Show solution code in multiple programming languages
- Provide step-by-step animation of algorithm execution
- Highlight current line of code being executed
- Show data structure states at each step
- Display time and space complexity

#### FR3: Animation Controls
- Play/Pause animation
- Step forward/backward through execution
- Adjust animation speed (0.5x, 1x, 1.5x, 2x)
- Scrub to specific step using timeline slider
- Reset to initial state
- Skip to end state

#### FR4: Explanations
- Show textual explanation for each step
- Highlight key insights and patterns
- Display algorithm approach overview

### 2.2 Non-Functional Requirements

#### NFR1: Performance
- Initial page load < 3 seconds
- Animation frame rate: 60 FPS
- Support for problems with up to 1000 animation steps
- Lazy load problem data (load on demand)

#### NFR2: Usability
- Responsive design (desktop, tablet, mobile)
- Intuitive controls requiring no tutorial
- Keyboard shortcuts for common actions
- Accessibility (ARIA labels, keyboard navigation)

#### NFR3: Maintainability
- Modular architecture for easy extension
- Clear separation between data and presentation
- Documented code with JSDoc comments
- Standardized problem definition format

#### NFR4: Browser Support
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 3. Technology Stack

### 3.1 Core Framework
**Choice: React with Vite**

**Rationale**:
- Component-based architecture fits visualization needs
- Large ecosystem with animation libraries
- Excellent developer experience with hot reload
- Vite provides fast build times and modern tooling

**Alternatives Considered**:
- Vue.js: Simpler learning curve but smaller ecosystem for animations
- Svelte: Better performance but less mature ecosystem
- Next.js: Unnecessary complexity for static site

### 3.2 Animation Library
**Choice: Framer Motion**

**Rationale**:
- React-first animation library
- Declarative API (easy to define states)
- Built-in spring physics
- Good performance with GPU acceleration

**Alternatives Considered**:
- D3.js: More powerful but steeper learning curve, overkill for basic animations
- GSAP: Imperative API harder to maintain
- CSS Transitions: Limited control for complex animations

### 3.3 Code Display
**Choice: Prism.js with react-simple-code-editor**

**Rationale**:
- Lightweight syntax highlighting
- Support for multiple languages
- Easy to customize themes
- No heavy editor overhead (Monaco is too heavy)

### 3.4 UI Framework
**Choice: Tailwind CSS**

**Rationale**:
- Utility-first approach speeds development
- Excellent responsive design support
- Small bundle size with tree-shaking
- Easy to customize theme

### 3.5 State Management
**Choice: Zustand**

**Rationale**:
- Minimal boilerplate compared to Redux
- Simple API for global state
- Good TypeScript support
- Sufficient for application needs

**Alternatives Considered**:
- Context API: Can cause unnecessary re-renders
- Redux Toolkit: Too much boilerplate for this use case
- Jotai/Recoil: More complex than needed

### 3.6 Build Tool
**Choice: Vite**

**Rationale**:
- Extremely fast dev server
- Optimized production builds
- Native ES modules support
- Modern defaults

### 3.7 Deployment
**Choice: Vercel or Netlify**

**Rationale**:
- Free tier for static sites
- Automatic deployments from Git
- CDN distribution
- Easy custom domain setup

## 4. Data Flow Architecture

```
User Interaction
      ↓
  UI Components
      ↓
  State Management (Zustand)
      ↓
  Animation Engine
      ↓
  Renderers (Array/Tree/Graph)
      ↓
  Canvas/DOM Updates
```

### 4.1 State Structure

```javascript
{
  // Global App State
  app: {
    theme: 'light' | 'dark',
    selectedLanguage: 'javascript' | 'python' | 'java' | 'cpp'
  },

  // Problem Browser State
  problemList: {
    problems: Problem[],
    filters: {
      difficulty: string[],
      categories: string[],
      searchQuery: string
    },
    sortBy: 'difficulty' | 'number' | 'category'
  },

  // Visualization State
  visualization: {
    currentProblem: Problem | null,
    currentSolution: Solution | null,
    animationState: {
      currentStep: number,
      totalSteps: number,
      isPlaying: boolean,
      playbackSpeed: number,
      direction: 'forward' | 'backward'
    },
    visualState: any // Current visual representation
  }
}
```

## 5. Component Architecture

### 5.1 Component Hierarchy

```
App
├── Header
│   ├── Logo
│   ├── Navigation
│   └── ThemeToggle
├── Router
│   ├── HomePage
│   │   ├── Hero
│   │   ├── FeaturedProblems
│   │   └── CategoryGrid
│   ├── ProblemsPage
│   │   ├── FilterSidebar
│   │   │   ├── DifficultyFilter
│   │   │   ├── CategoryFilter
│   │   │   └── SearchBar
│   │   └── ProblemGrid
│   │       └── ProblemCard[]
│   └── VisualizationPage
│       ├── ProblemHeader
│       │   ├── ProblemTitle
│       │   ├── Difficulty
│       │   └── LanguageSelector
│       ├── MainContent
│       │   ├── VisualizationPanel
│       │   │   ├── Canvas
│       │   │   │   ├── ArrayVisualizer
│       │   │   │   ├── TreeVisualizer
│       │   │   │   ├── GraphVisualizer
│       │   │   │   └── LinkedListVisualizer
│       │   │   ├── ControlPanel
│       │   │   │   ├── PlayPauseButton
│       │   │   │   ├── StepButtons
│       │   │   │   ├── TimelineSlider
│       │   │   │   └── SpeedControl
│       │   │   └── StepExplanation
│       │   └── CodePanel
│       │       ├── CodeDisplay
│       │       └── ComplexityInfo
│       └── ProblemDescription
│           ├── Statement
│           ├── Examples
│           └── Constraints
└── Footer
```

### 5.2 Key Component Responsibilities

#### VisualizationPage
- Orchestrates the entire visualization experience
- Loads problem data
- Manages animation lifecycle
- Coordinates state between child components

#### AnimationEngine
- Core service (not a React component)
- Manages step progression
- Calculates interpolated states for smooth transitions
- Emits events for state changes

#### Canvas
- Renders visual elements based on current state
- Handles canvas/SVG drawing
- Delegates to specific visualizers

#### ControlPanel
- User input for animation control
- Triggers animation engine commands
- Displays current step info

## 6. Performance Optimization

### 6.1 Code Splitting
- Route-based splitting (Home, Problems, Visualization)
- Lazy load visualizers (only load tree visualizer when needed)
- Lazy load problem data (fetch on demand)

### 6.2 Rendering Optimization
- Use React.memo for expensive components
- Virtualized lists for problem catalog (react-window)
- Canvas-based rendering for complex visualizations
- RequestAnimationFrame for smooth animations

### 6.3 Asset Optimization
- SVG for icons and simple graphics
- WebP images with fallbacks
- Minified and tree-shaken JavaScript
- CSS purging for unused styles

## 7. Security Considerations

### 7.1 Content Security
- Sanitize any user-generated content (future feature)
- No eval() or Function() constructor usage
- Safe HTML rendering (DOMPurify if needed)

### 7.2 Dependencies
- Regular dependency audits (npm audit)
- Use exact versions in package.json
- Review dependencies before adding

## 8. Testing Strategy

### 8.1 Unit Tests
- Test animation engine logic
- Test state management stores
- Test utility functions
- Target: 70% code coverage

### 8.2 Component Tests
- Test rendering of key components
- Test user interactions (click, keyboard)
- Test edge cases (empty states, errors)
- Tool: React Testing Library

### 8.3 E2E Tests
- Test critical user flows
- Test on multiple browsers
- Tool: Playwright
- Run in CI/CD pipeline

### 8.4 Visual Regression Tests
- Capture snapshots of visualizations
- Detect unintended visual changes
- Tool: Percy or Chromatic

## 9. Accessibility

### 9.1 WCAG 2.1 AA Compliance
- Color contrast ratios ≥ 4.5:1
- Keyboard navigation for all interactive elements
- ARIA labels for screen readers
- Focus indicators on all focusable elements

### 9.2 Specific Considerations
- Alt text for visualizations
- Textual description of each animation step
- Keyboard shortcuts documented
- Skip links for navigation

## 10. Internationalization (Future)

### 10.1 Preparation
- Use i18n library (react-i18next)
- Externalize all strings
- Support RTL languages
- Date/number formatting

## 11. Analytics (Future)

### 11.1 Metrics to Track
- Popular problems viewed
- Average time spent on visualizations
- Animation control usage patterns
- Search queries and filters used
- Browser/device distribution

### 11.2 Privacy
- No personal data collection
- Anonymous usage statistics only
- GDPR/CCPA compliant
- Opt-out mechanism

## 12. Development Environment

### 12.1 Required Tools
- Node.js (v18 or higher)
- npm or pnpm
- Git
- VS Code (recommended) with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense

### 12.2 Code Quality
- ESLint for code linting
- Prettier for code formatting
- Husky for pre-commit hooks
- Conventional commits for commit messages

## 13. CI/CD Pipeline

### 13.1 Continuous Integration
- Run on every pull request
- Steps:
  1. Install dependencies
  2. Run linter
  3. Run unit tests
  4. Run build
  5. Run E2E tests

### 13.2 Continuous Deployment
- Auto-deploy main branch to production
- Deploy preview for pull requests
- Rollback capability

## 14. Monitoring

### 14.1 Error Tracking
- Tool: Sentry (free tier)
- Track JavaScript errors
- Track performance issues
- Source maps for debugging

### 14.2 Performance Monitoring
- Core Web Vitals tracking
- Lighthouse CI in PR checks
- Real user monitoring (RUM)
