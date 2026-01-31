# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Animation engine implementation
- Array visualizer
- Tree visualizer
- Graph visualizer
- Problem browsing and filtering
- Code display with syntax highlighting
- Dark mode toggle
- Mobile responsive design

---

## [0.1.0] - 2026-01-31

### Added - Initial Project Setup

#### Planning & Documentation
- Created comprehensive planning documentation (7 documents, ~7,500 lines)
  - Technical specification (requirements, tech stack, architecture)
  - Data schema definitions with TypeScript types
  - Animation system design and architecture
  - UI/UX design system with color palette and layouts
  - 12-week implementation roadmap with detailed tasks
  - Component specifications for all major components
  - Planning overview and navigation guide
- Added main README.md with project overview
- Added SETUP.md with detailed setup instructions
- Added QUICKSTART.md for quick reference
- Created changes/ folder with initialization summaries

#### Project Configuration
- Initialized Vite + React 18 project structure
- Configured Tailwind CSS with custom theme
  - Primary blue color palette
  - Dark mode support (class strategy)
  - Custom spacing and typography
- Set up ESLint with React rules
- Configured Prettier for code formatting
- Added PostCSS with Autoprefixer
- Created .gitignore for Node.js projects
- Set up package.json with all dependencies

#### Dependencies Installed (340 packages)
- **Core**: react@18.3.1, react-dom@18.3.1
- **Routing**: react-router-dom@6.22.0
- **State**: zustand@4.5.0
- **Animations**: framer-motion@11.0.5
- **Styling**: tailwindcss@3.4.1
- **Code Highlighting**: prismjs@1.29.0
- **Build**: vite@5.4.0
- **Dev Tools**: eslint@8.57.0, prettier@3.2.5

#### Source Code
- Created application entry point (main.jsx)
- Implemented App.jsx with React Router
  - Routes: Home, Problems, Visualization
  - Layout structure with Header and Footer
- Added global styles with Tailwind directives (index.css)
- Built common components:
  - Header with navigation
  - Footer with copyright
- Implemented page components:
  - HomePage with hero, features, and CTAs
  - ProblemsPage (placeholder)
  - VisualizationPage (placeholder with dynamic routing)

#### Project Structure
- Created organized folder structure:
  - `src/components/` - React components (common, code, problem, visualization)
  - `src/pages/` - Page components
  - `src/data/problems/` - Problem data by category (arrays, trees, graphs, etc.)
  - `src/engine/` - Animation engine (ready for implementation)
  - `src/hooks/` - Custom React hooks
  - `src/store/` - Zustand state management
  - `src/styles/` - CSS files
  - `src/utils/` - Utility functions
  - `planning/` - All planning documents

#### Example Data
- Created Two Sum problem example (src/data/problems/arrays/two-sum.js)
  - Complete problem structure
  - Solution with code
  - Time/space complexity
  - Examples and constraints
  - Ready for animation steps

#### Development Environment
- Development server configured (port 3000, auto-increment)
- Hot module replacement enabled
- Auto-open browser on dev start
- npm scripts: dev, build, preview, lint, format

### Technical Details
- **Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.0
- **Node Version**: 18+
- **Package Manager**: npm
- **Code Style**: ESLint + Prettier
- **CSS Framework**: Tailwind CSS 3.4.1

### Project Stats
- Planning documents: 7 files
- Configuration files: 8 files
- Source code files: 11 files
- Directories created: 19
- npm packages: 340
- Total lines of planning: ~7,500

---

## Version History

### Version Format
- **Major.Minor.Patch** (Semantic Versioning)
- **Major**: Breaking changes, major features
- **Minor**: New features, backwards compatible
- **Patch**: Bug fixes, small improvements

### Release Schedule
- v0.1.0 - Initial setup (Week 1)
- v0.2.0 - Animation engine (Week 2-3) [Planned]
- v0.3.0 - Multiple visualizers (Week 4-7) [Planned]
- v0.4.0 - Polish & mobile (Week 8-10) [Planned]
- v1.0.0 - Public launch (Week 12) [Planned]

---

## Notes

### Unreleased Section
- Add changes here as you develop
- Move to versioned section when releasing

### Categories
Use these categories for changes:
- **Added** - New features
- **Changed** - Changes to existing functionality
- **Deprecated** - Soon-to-be removed features
- **Removed** - Removed features
- **Fixed** - Bug fixes
- **Security** - Security improvements

### Links
[Unreleased]: https://github.com/yourusername/lcode-viz/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/yourusername/lcode-viz/releases/tag/v0.1.0
