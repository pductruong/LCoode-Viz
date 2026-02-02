# 🎯 LCode-Viz

An interactive platform for visualizing and learning data structures, algorithms, and LeetCode problems through animated step-by-step solutions.

## 📋 Overview

LCode-Viz is a comprehensive educational platform that helps developers understand algorithms and data structures through visual, interactive problem-solving. Built as a modern monorepo, it provides:

- **Interactive Problem Visualizations**: Step-by-step animated solutions for LeetCode problems
- **Learn Section**: In-depth tutorials on data structures and algorithms
- **Multiple Visualization Types**: Arrays, graphs, trees, linked lists, and more
- **Code Examples**: Multiple programming languages with syntax highlighting
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## ✨ Features

### Problem Visualizations
- Step-by-step animation of algorithm execution
- Visual representation of data structures (arrays, graphs, trees, etc.)
- Interactive controls (play, pause, step forward/backward)
- Real-time state tracking (variables, pointers, comparisons)
- Multiple solution approaches with complexity analysis

### Learning Resources
- Comprehensive topic explanations
- Time and space complexity breakdowns
- When to use/avoid specific data structures
- Code examples in JavaScript, Python, and Java
- Related problem recommendations

### Developer Experience
- Modern TypeScript monorepo architecture
- Hot module reloading for rapid development
- Comprehensive API documentation
- Modular seed data structure
- Type-safe API client

## 🏗️ Architecture

This is a **pnpm monorepo** with the following structure:

```
lcode-viz/
├── apps/
│   ├── backend/          # Express API server with Prisma ORM
│   └── frontend/         # React + Vite application
├── packages/
│   ├── api-client/       # Type-safe API client
│   ├── config/           # Shared configuration
│   ├── schemas/          # Zod validation schemas
│   └── types/            # Shared TypeScript types
├── ARCHITECTURE.md       # Detailed architecture documentation
├── CHANGELOG.md          # Version history and changes
└── README.md             # This file
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Router** - Client-side routing
- **Zustand** - State management
- **Prism.js** - Syntax highlighting

### Backend
- **Express** - Web framework
- **TypeScript** - Type safety
- **Prisma** - ORM and database toolkit
- **SQLite** - Embedded database
- **Zod** - Runtime validation
- **Winston** - Logging

### Shared
- **pnpm** - Fast, disk-efficient package manager
- **TypeScript** - Monorepo type safety
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **pnpm** >= 8.x

```bash
# Install pnpm if you haven't already
npm install -g pnpm
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/lcode-viz.git
cd lcode-viz
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Set up the database**
```bash
cd apps/backend
pnpm prisma:generate
pnpm seed
```

4. **Start development servers**

From the root directory:
```bash
pnpm dev
```

This starts both servers concurrently:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

Or run them individually:
```bash
# Terminal 1 - Backend
cd apps/backend
pnpm dev:watch

# Terminal 2 - Frontend
cd apps/frontend
pnpm dev
```

## 📦 Available Scripts

### Root Level

```bash
pnpm dev          # Start both backend and frontend
pnpm build        # Build all apps
pnpm lint         # Lint all packages
pnpm format       # Format all code
pnpm type-check   # Type-check all packages
pnpm test         # Run backend tests
pnpm clean        # Clean all build artifacts
```

### Backend (`apps/backend`)

```bash
pnpm dev          # Start server (no watch)
pnpm dev:watch    # Start server with auto-reload
pnpm build        # Build for production
pnpm start        # Start production server
pnpm seed         # Seed database with problems and topics
pnpm prisma:generate   # Generate Prisma client
pnpm prisma:migrate    # Run database migrations
pnpm prisma:studio     # Open Prisma Studio (DB GUI)
pnpm test         # Run tests
pnpm lint         # Lint code
pnpm format       # Format code
```

### Frontend (`apps/frontend`)

```bash
pnpm dev          # Start dev server (http://localhost:3000)
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm lint         # Lint code
pnpm format       # Format code
```

## 📚 Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Detailed system architecture and design decisions
- **[CONTRIBUTING.md](./apps/backend/CONTRIBUTING.md)** - Guide for adding problems and topics
- **[CHANGELOG.md](./CHANGELOG.md)** - Version history and release notes
- **[Seed Data README](./apps/backend/src/db/seeds/README.md)** - Seed data structure reference

## 🎓 Adding Content

### Adding a New Problem

1. Create a problem file in `apps/backend/src/db/seeds/problems/`
2. Export it from `problems/index.ts`
3. Run `pnpm seed` to update the database

See [CONTRIBUTING.md](./apps/backend/CONTRIBUTING.md) for detailed instructions and examples.

### Adding a New Topic

1. Create a topic file in `apps/backend/src/db/seeds/topics/`
2. Export it from `topics/index.ts`
3. Run `pnpm seed` to update the database

See [CONTRIBUTING.md](./apps/backend/CONTRIBUTING.md) for detailed instructions and examples.

## 🧪 Testing

### Backend Tests
```bash
cd apps/backend
pnpm test         # Run all tests
pnpm test:watch   # Run tests in watch mode
```

### API Testing
```bash
# Start the backend server
pnpm dev

# Test endpoints
curl http://localhost:5000/api/problems
curl http://localhost:5000/api/problems/1
curl http://localhost:5000/api/topics
curl http://localhost:5000/api/topics/linked-list
```

## 🏗️ Building for Production

### Build All Apps
```bash
pnpm build
```

### Build Individual Apps
```bash
# Backend
cd apps/backend
pnpm build

# Frontend
cd apps/frontend
pnpm build
```

### Preview Production Build
```bash
cd apps/frontend
pnpm preview
```

## 📁 Project Structure

```
lcode-viz/
├── apps/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── db/
│   │   │   │   ├── seed.ts              # Main seed script
│   │   │   │   └── seeds/
│   │   │   │       ├── types.ts         # TypeScript interfaces
│   │   │   │       ├── problems/        # Problem seed data
│   │   │   │       │   ├── index.ts
│   │   │   │       │   ├── twoSum.ts
│   │   │   │       │   └── ...
│   │   │   │       └── topics/          # Topic seed data
│   │   │   │           ├── index.ts
│   │   │   │           ├── linkedList.ts
│   │   │   │           └── ...
│   │   │   ├── routes/                  # API routes
│   │   │   ├── utils/                   # Utilities
│   │   │   └── server.ts                # Express server
│   │   ├── prisma/
│   │   │   ├── schema.prisma            # Database schema
│   │   │   └── dev.db                   # SQLite database
│   │   ├── CONTRIBUTING.md              # Contributing guide
│   │   └── package.json
│   └── frontend/
│       ├── src/
│       │   ├── components/              # React components
│       │   ├── pages/                   # Page components
│       │   ├── providers/               # Context providers
│       │   ├── services/                # API services
│       │   ├── hooks/                   # Custom hooks
│       │   ├── utils/                   # Utilities
│       │   ├── App.tsx
│       │   └── main.tsx
│       └── package.json
├── packages/
│   ├── api-client/                      # Type-safe API client
│   ├── config/                          # Shared configuration
│   ├── schemas/                         # Zod schemas
│   └── types/                           # Shared TypeScript types
├── ARCHITECTURE.md
├── CHANGELOG.md
├── README.md
├── package.json
└── pnpm-workspace.yaml
```

## 🔧 Development Workflow

### 1. Feature Development
```bash
# Create a feature branch
git checkout -b feature/add-binary-search

# Make your changes
# Add new problem/topic files
# Update seed data

# Test your changes
pnpm seed
pnpm dev

# Verify in browser
open http://localhost:3000
```

### 2. Code Quality
```bash
# Lint code
pnpm lint

# Format code
pnpm format

# Type-check
pnpm type-check

# Run tests
pnpm test
```

### 3. Commit Changes
```bash
git add .
git commit -m "feat: add binary search problem with visualization"
git push origin feature/add-binary-search
```

## 🗄️ Database Management

### View Database
```bash
cd apps/backend
pnpm prisma:studio
# Opens Prisma Studio at http://localhost:5555
```

### Reset Database
```bash
cd apps/backend
rm prisma/dev.db
pnpm prisma:generate
pnpm seed
```

### Modify Schema
1. Edit `apps/backend/prisma/schema.prisma`
2. Run migration:
```bash
pnpm prisma:migrate
```
3. Update seed data if needed
4. Re-seed database:
```bash
pnpm seed
```

## 🌐 API Endpoints

### Problems
- `GET /api/problems` - List all problems
- `GET /api/problems/:id` - Get specific problem
- `GET /api/problems/category/:category` - Filter by category

### Topics
- `GET /api/topics` - List all topics
- `GET /api/topics/:id` - Get specific topic
- `GET /api/topics/category/:category` - Filter by category

### Health Check
- `GET /api/health` - Server health status

## 🎨 Visualization Types

LCode-Viz supports multiple visualization types:

- **Array**: Step-by-step array manipulation (Two Sum, Container With Most Water)
- **Graph**: BFS/DFS traversal with queue visualization (Word Ladder)
- **Zigzag**: Grid-based pattern visualization (Zigzag Conversion)
- **Tree**: Binary tree traversal and manipulation
- **Linked List**: Node-based visualization

Each visualization type provides:
- Interactive playback controls
- State tracking (variables, pointers)
- Visual highlighting (active, comparing, found, etc.)
- Step-by-step explanations

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./apps/backend/CONTRIBUTING.md) for:

- How to add new problems
- How to add new topics
- Code style guidelines
- Testing requirements
- Pull request process

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- LeetCode for problem inspiration
- The open-source community for amazing tools and libraries
- All contributors who help improve this platform

## 📧 Contact

For questions, suggestions, or issues:
- Open an issue on GitHub
- Email: your-email@example.com

---

**Built with ❤️ for developers learning algorithms and data structures**
