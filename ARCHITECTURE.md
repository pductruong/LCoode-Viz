# LCode-Viz System Architecture

## Table of Contents

1. [System Overview](#system-overview)
2. [Monorepo Structure](#monorepo-structure)
3. [Technology Stack](#technology-stack)
4. [Architecture Diagrams](#architecture-diagrams)
5. [Package Architecture](#package-architecture)
6. [Data Flow](#data-flow)
7. [Database Design](#database-design)
8. [API Design](#api-design)
9. [Frontend Architecture](#frontend-architecture)
10. [Backend Architecture](#backend-architecture)
11. [Development Workflow](#development-workflow)
12. [Deployment Architecture](#deployment-architecture)

---

## System Overview

LCode-Viz is a visual learning platform for algorithm visualization, built as a **pnpm monorepo** with shared packages for type safety and code reuse across the stack.

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Layer                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │            React SPA (Vite + TypeScript)                  │  │
│  │  - Problem Browser  - Visualization Engine  - UI/UX      │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/REST
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         API Layer                               │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │         Express.js REST API (TypeScript + ESM)           │  │
│  │  - Controllers  - Services  - Repositories  - Middleware │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ Prisma ORM
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Data Persistence                           │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                  SQLite Database                          │  │
│  │  - Problems  - Solutions  - Topics  - Metadata           │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Shared Packages Layer                        │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌──────────┐ │
│  │   Types    │  │  Schemas   │  │ API Client │  │  Config  │ │
│  │ (TypeScript)│  │   (Zod)   │  │  (Fetch)   │  │ (ESLint) │ │
│  └────────────┘  └────────────┘  └────────────┘  └──────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## Monorepo Structure

### Directory Layout

```
lcode-viz/
├── apps/                          # Application packages
│   ├── frontend/                  # React frontend application
│   │   ├── src/
│   │   │   ├── components/        # React components
│   │   │   ├── pages/             # Page components
│   │   │   ├── services/          # Business logic
│   │   │   ├── store/             # State management (Zustand)
│   │   │   ├── hooks/             # Custom React hooks
│   │   │   ├── engine/            # Animation engine
│   │   │   ├── providers/         # React context providers
│   │   │   └── styles/            # Global styles
│   │   ├── package.json
│   │   └── vite.config.js
│   │
│   └── backend/                   # Express API backend
│       ├── src/
│       │   ├── config/            # Configuration
│       │   ├── controllers/       # Request handlers
│       │   ├── services/          # Business logic
│       │   ├── repositories/      # Data access layer
│       │   ├── routes/            # API routes
│       │   ├── middleware/        # Express middleware
│       │   ├── utils/             # Utilities
│       │   └── db/                # Database utilities
│       ├── prisma/
│       │   ├── schema.prisma      # Database schema
│       │   └── migrations/        # Database migrations
│       └── package.json
│
├── packages/                      # Shared packages
│   ├── types/                     # @lcode-viz/types
│   │   ├── src/
│   │   │   ├── domain/            # Domain types
│   │   │   ├── api/               # API types
│   │   │   └── filters/           # Filter types
│   │   └── package.json
│   │
│   ├── schemas/                   # @lcode-viz/schemas
│   │   ├── src/
│   │   │   ├── problem.schema.ts  # Zod schemas
│   │   │   ├── topic.schema.ts
│   │   │   ├── filters.schema.ts
│   │   │   └── env.schema.ts
│   │   └── package.json
│   │
│   ├── api-client/                # @lcode-viz/api-client
│   │   ├── src/
│   │   │   ├── http-client.ts     # Base HTTP client
│   │   │   ├── problem-client.ts  # Problem API client
│   │   │   └── topic-client.ts    # Topic API client
│   │   └── package.json
│   │
│   └── config/                    # @lcode-viz/config
│       ├── eslint/                # ESLint configs
│       ├── prettier/              # Prettier config
│       └── tsconfig/              # TypeScript configs
│
├── package.json                   # Root workspace config
├── pnpm-workspace.yaml            # Workspace definition
└── tsconfig.base.json             # Base TypeScript config
```

### Package Dependency Graph

```
┌─────────────────┐
│   @lcode-viz/   │
│     config      │ ◄─────────────────────┐
└─────────────────┘                       │
                                          │
┌─────────────────┐                       │
│   @lcode-viz/   │                       │
│     types       │ ◄───────────┐         │
└─────────────────┘             │         │
         ▲                      │         │
         │                      │         │
         │                      │         │
┌─────────────────┐     ┌──────┴──────┐  │
│   @lcode-viz/   │     │ @lcode-viz/ │  │
│    schemas      │     │ api-client  │  │
└─────────────────┘     └─────────────┘  │
         ▲                      ▲         │
         │                      │         │
         │                      │         │
    ┌────┴─────┐         ┌─────┴────┐    │
    │ backend  │         │ frontend │────┘
    └──────────┘         └──────────┘
```

---

## Technology Stack

### Frontend

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | React 18.3 | UI component library |
| Build Tool | Vite 5.4 | Fast dev server & bundler |
| Language | TypeScript 5.9 | Type safety |
| State Management | Zustand 4.5 | Global state |
| Routing | React Router 6.22 | Client-side routing |
| Styling | Tailwind CSS 3.4 | Utility-first CSS |
| Animations | Framer Motion 11.0 | Animation library |
| Syntax Highlighting | Prism.js 1.29 | Code highlighting |

### Backend

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Runtime | Node.js (ES Modules) | JavaScript runtime |
| Framework | Express 5.2 | Web framework |
| Language | TypeScript 5.9 | Type safety |
| ORM | Prisma 5.22 | Database ORM |
| Database | SQLite | Embedded database |
| Validation | Zod 3.23 | Runtime validation |
| Logging | Winston 3.19 | Structured logging |
| Dev Server | tsx 4.21 | TypeScript execution |

### Shared Packages

| Package | Technology | Purpose |
|---------|-----------|---------|
| Types | TypeScript | Shared type definitions |
| Schemas | Zod | Runtime validation schemas |
| API Client | Fetch API | HTTP client abstraction |
| Config | ESLint, Prettier | Code quality tools |

### Development Tools

| Tool | Version | Purpose |
|------|---------|---------|
| pnpm | 10.28 | Package manager |
| TypeScript | 5.9.3 | Type checking |
| ESLint | 8.57 | Linting |
| Prettier | 3.2.5 | Code formatting |

---

## Architecture Diagrams

### System Context Diagram (C4 Level 1)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                         Internet                            │
│                                                             │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTPS
                         │
                         ▼
              ┌─────────────────────┐
              │                     │
              │    Web Browser      │
              │   (User Device)     │
              │                     │
              └──────────┬──────────┘
                         │
                         │ HTTP/REST
                         │
                         ▼
┌────────────────────────────────────────────────────────────┐
│                                                            │
│                    LCode-Viz System                        │
│                                                            │
│  ┌──────────────────┐         ┌─────────────────────┐    │
│  │   Frontend SPA   │◄────────┤   Backend API       │    │
│  │  (React + Vite)  │  Fetch  │ (Express + Prisma)  │    │
│  └──────────────────┘         └──────────┬──────────┘    │
│                                           │               │
│                                           │ SQL           │
│                                           ▼               │
│                                  ┌────────────────┐       │
│                                  │ SQLite Database│       │
│                                  └────────────────┘       │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### Container Diagram (C4 Level 2)

```
┌───────────────────────────────────────────────────────────────┐
│                         Frontend                              │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────────────┐ │
│  │   React     │  │  Zustand    │  │  Animation Engine    │ │
│  │ Components  │  │   Store     │  │   (Framer Motion)    │ │
│  └─────────────┘  └─────────────┘  └──────────────────────┘ │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │            @lcode-viz/api-client                        │ │
│  └─────────────────────────────────────────────────────────┘ │
└───────────────────────────────┬───────────────────────────────┘
                                │
                                │ HTTP REST
                                │ /api/problems, /api/topics
                                │
┌───────────────────────────────▼───────────────────────────────┐
│                         Backend                               │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────────────┐ │
│  │ Controllers │──│  Services   │──│   Repositories       │ │
│  │  (Routes)   │  │  (Logic)    │  │  (Data Access)       │ │
│  └─────────────┘  └─────────────┘  └──────────┬───────────┘ │
│                                               │               │
│  ┌──────────────────────────────────────────┐ │               │
│  │         @lcode-viz/schemas               │ │               │
│  │         (Validation Layer)               │ │               │
│  └──────────────────────────────────────────┘ │               │
└───────────────────────────────────────────────┼───────────────┘
                                                │
                                                │ Prisma ORM
                                                │
┌───────────────────────────────────────────────▼───────────────┐
│                     SQLite Database                           │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────────────┐ │
│  │  Problems   │  │   Topics    │  │     Solutions        │ │
│  └─────────────┘  └─────────────┘  └──────────────────────┘ │
└───────────────────────────────────────────────────────────────┘
```

### Component Diagram - Shared Packages (C4 Level 3)

```
┌─────────────────────────────────────────────────────────────┐
│                    Shared Packages                          │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │            @lcode-viz/types                           │ │
│  │  ┌─────────────┐ ┌─────────────┐ ┌────────────────┐ │ │
│  │  │   domain/   │ │    api/     │ │   filters/     │ │ │
│  │  │  Problem    │ │ ApiResponse │ │ FilterCriteria │ │ │
│  │  │  Topic      │ │  ApiError   │ │                │ │ │
│  │  │  Solution   │ │             │ │                │ │ │
│  │  └─────────────┘ └─────────────┘ └────────────────┘ │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │           @lcode-viz/schemas                          │ │
│  │  ┌─────────────┐ ┌─────────────┐ ┌────────────────┐ │ │
│  │  │  Problem    │ │   Topic     │ │    Filters     │ │ │
│  │  │   Schema    │ │   Schema    │ │    Schema      │ │ │
│  │  │   (Zod)     │ │   (Zod)     │ │    (Zod)       │ │ │
│  │  └─────────────┘ └─────────────┘ └────────────────┘ │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │          @lcode-viz/api-client                        │ │
│  │  ┌─────────────┐ ┌─────────────┐ ┌────────────────┐ │ │
│  │  │   HTTP      │ │  Problem    │ │     Topic      │ │ │
│  │  │  Client     │ │ API Client  │ │   API Client   │ │ │
│  │  │  (Base)     │ │             │ │                │ │ │
│  │  └─────────────┘ └─────────────┘ └────────────────┘ │ │
│  └───────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## Package Architecture

### @lcode-viz/types

**Purpose**: Type-safe contracts between frontend and backend

**Exports**:
```typescript
// Domain types
export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export interface Problem { ... }
export interface Topic { ... }
export interface Solution { ... }

// API types
export interface ApiResponse<T> { ... }
export interface ApiError { ... }

// Filter types
export interface FilterCriteria { ... }
export interface TopicFilterCriteria { ... }
```

**Dependencies**: None (pure types)

**Consumers**: Backend, Frontend, API Client, Schemas

---

### @lcode-viz/schemas

**Purpose**: Runtime validation with Zod

**Exports**:
```typescript
// Validation schemas
export const ProblemSchema = z.object({ ... });
export const TopicSchema = z.object({ ... });
export const FilterCriteriaSchema = z.object({ ... });
export const envSchema = z.object({ ... });

// Create/Update schemas
export const CreateProblemSchema = ...;
export const UpdateProblemSchema = ...;
```

**Dependencies**:
- zod@^3.23.8
- @lcode-viz/types

**Consumers**: Backend (request validation)

---

### @lcode-viz/api-client

**Purpose**: Type-safe HTTP client for API communication

**Exports**:
```typescript
// Base HTTP client
export class HttpClient {
  get<T>(endpoint: string): Promise<T>
  post<T>(endpoint: string, data: unknown): Promise<T>
  put<T>(endpoint: string, data: unknown): Promise<T>
  delete<T>(endpoint: string): Promise<T>
}

// Domain-specific clients
export class ProblemApiClient {
  getProblems(params?: {...}): Promise<Problem[]>
  getProblem(id: string): Promise<Problem>
  searchProblems(query: string): Promise<Problem[]>
  getCategories(): Promise<string[]>
}

export class TopicApiClient {
  getTopics(params?: {...}): Promise<Topic[]>
  getTopic(id: string): Promise<Topic>
  searchTopics(query: string): Promise<Topic[]>
  getCategories(): Promise<string[]>
}
```

**Dependencies**:
- @lcode-viz/types

**Consumers**: Frontend

---

### @lcode-viz/config

**Purpose**: Shared tooling configurations

**Structure**:
```
config/
├── eslint/
│   ├── base.js      # Common ESLint rules
│   ├── react.js     # React-specific rules
│   └── node.js      # Node.js-specific rules
├── prettier/
│   └── index.json   # Prettier configuration
└── tsconfig/
    ├── base.json    # Base TypeScript config
    ├── react.json   # React app config
    └── node.json    # Node.js config
```

**Consumers**: All packages

---

## Data Flow

### Request Flow - Problem Listing

```
┌─────────────┐
│   Browser   │
│  (Client)   │
└──────┬──────┘
       │
       │ 1. User navigates to /problems
       ▼
┌─────────────────────┐
│  ProblemsPage.tsx   │
│  ┌───────────────┐  │
│  │ useProblems() │  │  2. Hook fetches data
│  └───────┬───────┘  │
└──────────┼──────────┘
           │
           │ 3. Calls service
           ▼
┌─────────────────────────┐
│  ProblemService.ts      │
│  ┌───────────────────┐  │
│  │ getProblems()     │  │
│  └────────┬──────────┘  │
└───────────┼─────────────┘
            │
            │ 4. Uses API client
            ▼
┌──────────────────────────────┐
│  @lcode-viz/api-client       │
│  ┌────────────────────────┐  │
│  │ ProblemApiClient       │  │
│  │ .getProblems(filters)  │  │
│  └────────┬───────────────┘  │
└───────────┼──────────────────┘
            │
            │ 5. HTTP GET /api/problems?difficulty=Easy
            ▼
┌──────────────────────────────┐
│  Backend API                 │
│  ┌────────────────────────┐  │
│  │ GET /api/problems      │  │
│  │ problemController.ts   │  │
│  └────────┬───────────────┘  │
│           │                  │
│           │ 6. Delegates to service
│           ▼                  │
│  ┌────────────────────────┐  │
│  │ ProblemService.ts      │  │
│  └────────┬───────────────┘  │
│           │                  │
│           │ 7. Calls repository
│           ▼                  │
│  ┌────────────────────────┐  │
│  │ ProblemRepository.ts   │  │
│  └────────┬───────────────┘  │
└───────────┼──────────────────┘
            │
            │ 8. Prisma query
            ▼
┌──────────────────────────────┐
│  SQLite Database             │
│  ┌────────────────────────┐  │
│  │ SELECT * FROM Problem  │  │
│  │ WHERE difficulty = ?   │  │
│  └────────┬───────────────┘  │
└───────────┼──────────────────┘
            │
            │ 9. Returns data
            │
            └──────────► [Flows back through layers]
                        │
                        ▼
                   ┌─────────────┐
                   │   Browser   │
                   │  (Renders)  │
                   └─────────────┘
```

### State Management Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend State                           │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Zustand Store                          │   │
│  │  ┌───────────────┐  ┌─────────────┐  ┌──────────┐ │   │
│  │  │ problemStore  │  │ topicStore  │  │ appStore │ │   │
│  │  │  - problems   │  │  - topics   │  │  - theme │ │   │
│  │  │  - loading    │  │  - loading  │  │  - nav   │ │   │
│  │  │  - error      │  │  - error    │  │          │ │   │
│  │  └───────────────┘  └─────────────┘  └──────────┘ │   │
│  └─────────────────────────────────────────────────────┘   │
│                          ▲                                  │
│                          │                                  │
│  ┌───────────────────────┴───────────────────────────┐     │
│  │              React Components                      │     │
│  │  ┌──────────┐  ┌──────────┐  ┌────────────────┐  │     │
│  │  │  Pages   │  │Components│  │  Custom Hooks  │  │     │
│  │  │          │  │          │  │  - useProblems │  │     │
│  │  └──────────┘  └──────────┘  └────────────────┘  │     │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Database Design

### Entity Relationship Diagram

```
┌─────────────────────────────────┐
│          Problem                │
├─────────────────────────────────┤
│ id: String (PK)                 │
│ title: String                   │
│ difficulty: String              │
│ categories: String (JSON)       │
│ description: String             │
│ visualizationType: String       │
│ examples: String (JSON)         │
│ constraints: String (JSON)      │
│ createdAt: DateTime             │
│ updatedAt: DateTime             │
└────────────┬────────────────────┘
             │
             │ 1:N
             │
             ▼
┌─────────────────────────────────┐
│          Solution               │
├─────────────────────────────────┤
│ id: String (PK)                 │
│ problemId: String (FK)          │
│ name: String                    │
│ code: String                    │
│ timeComplexity: String          │
│ spaceComplexity: String         │
│ steps: String (JSON)            │
│ explanation: String?            │
└─────────────────────────────────┘


┌─────────────────────────────────┐
│           Topic                 │
├─────────────────────────────────┤
│ id: String (PK)                 │
│ category: String                │
│ title: String                   │
│ icon: String                    │
│ difficulty: String              │
│ timeToLearn: Int                │
│ description: String             │
│ fullDescription: String (JSON)  │
│ quickFacts: String (JSON)       │
│ types: String? (JSON)           │
│ operations: String? (JSON)      │
│ codeExamples: String (JSON)     │
│ pros: String (JSON)             │
│ cons: String (JSON)             │
│ whenToUse: String (JSON)        │
│ commonPatterns: String? (JSON)  │
│ visualConcepts: String? (JSON)  │
│ relatedProblems: String? (JSON) │
│ createdAt: DateTime             │
│ updatedAt: DateTime             │
└─────────────────────────────────┘
```

### Prisma Schema

```prisma
model Problem {
  id                String     @id
  title             String
  difficulty        String     // "Easy", "Medium", "Hard"
  categories        String     // JSON array
  description       String
  visualizationType String
  examples          String     // JSON array
  constraints       String     // JSON array
  solutions         Solution[]
  createdAt         DateTime   @default(now())
  updatedAt         DateTime   @updatedAt
}

model Solution {
  id              String  @id @default(uuid())
  problemId       String
  problem         Problem @relation(fields: [problemId], references: [id], onDelete: Cascade)
  name            String
  code            String
  timeComplexity  String
  spaceComplexity String
  steps           String  // JSON array
  explanation     String?
}

model Topic {
  id              String   @id
  category        String
  title           String
  icon            String
  difficulty      String
  timeToLearn     Int
  description     String
  fullDescription String   // JSON
  quickFacts      String   // JSON array
  types           String?  // JSON
  operations      String?  // JSON
  codeExamples    String   // JSON array
  pros            String   // JSON array
  cons            String   // JSON array
  whenToUse       String   // JSON
  commonPatterns  String?  // JSON (optional)
  visualConcepts  String?  // JSON (optional)
  relatedProblems String?  // JSON (optional)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

---

## API Design

### REST API Endpoints

#### Problems API

| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|--------------|
| GET | `/api/problems` | List all problems | `difficulty`, `categories`, `search` |
| GET | `/api/problems/:id` | Get single problem | - |
| GET | `/api/problems/search` | Search problems | `q` |
| GET | `/api/problems/categories` | Get available categories | - |

#### Topics API

| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|--------------|
| GET | `/api/topics` | List all topics | `category`, `search` |
| GET | `/api/topics/:id` | Get single topic | - |
| GET | `/api/topics/search` | Search topics | `q` |
| GET | `/api/topics/categories` | Get available categories | - |

### API Response Format

All API responses follow a standardized format:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
  meta?: {
    timestamp: string;
    [key: string]: any;
  };
}
```

**Success Response Example**:
```json
{
  "success": true,
  "data": [
    {
      "id": "two-sum",
      "title": "1. Two Sum",
      "difficulty": "Easy",
      "categories": ["array", "hash-table"]
    }
  ],
  "meta": {
    "timestamp": "2026-02-02T10:00:00Z"
  }
}
```

**Error Response Example**:
```json
{
  "success": false,
  "error": {
    "message": "Problem not found",
    "code": "NOT_FOUND"
  },
  "meta": {
    "timestamp": "2026-02-02T10:00:00Z"
  }
}
```

---

## Frontend Architecture

### Component Hierarchy

```
App
├── ServiceProvider (Context)
│   └── Router
│       ├── HomePage
│       │   ├── Header
│       │   ├── SearchBar
│       │   └── ProblemGrid
│       │       └── ProblemCard (×N)
│       │
│       ├── ProblemsPage
│       │   ├── FilterSidebar
│       │   └── ProblemGrid
│       │       └── ProblemCard (×N)
│       │
│       ├── VisualizationPage
│       │   ├── AnimationControls
│       │   ├── ArrayVisualizer
│       │   ├── CodeDisplay
│       │   └── ExplanationPanel
│       │
│       ├── LearnPage
│       │   └── TopicCard (×N)
│       │
│       ├── TopicDetailPage
│       │   ├── ComplexityTable
│       │   ├── CodeBlock
│       │   └── LinkedListVisualizer
│       │
│       └── Footer
```

### State Management Strategy

**Zustand Stores**:

1. **problemStore** - Problem data and loading state
   ```typescript
   {
     problems: Problem[]
     selectedProblem: Problem | null
     loading: boolean
     error: string | null
   }
   ```

2. **topicStore** - Topic data and loading state
   ```typescript
   {
     topics: Topic[]
     selectedTopic: Topic | null
     loading: boolean
     error: string | null
   }
   ```

3. **filterStore** - Filter criteria
   ```typescript
   {
     difficulty: string[]
     categories: string[]
     searchQuery: string
   }
   ```

4. **animationStore** - Animation state
   ```typescript
   {
     isPlaying: boolean
     currentStep: number
     speed: number
   }
   ```

### Service Layer Pattern

```
Components
    │
    ├── Custom Hooks (useProblems, useTopic)
    │       │
    │       └── Services (ProblemService, TopicService)
    │               │
    │               └── API Clients (@lcode-viz/api-client)
    │                       │
    │                       └── HTTP Client
    │                               │
    │                               └── Backend API
```

---

## Backend Architecture

### Layered Architecture

```
┌────────────────────────────────────────────────────────┐
│                    Routes Layer                        │
│  Express route handlers - HTTP request/response        │
└────────────────┬───────────────────────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────────────────────┐
│                  Controllers Layer                     │
│  Handle HTTP-specific logic (req/res transformation)   │
└────────────────┬───────────────────────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────────────────────┐
│                   Services Layer                       │
│  Business logic, orchestration, validation             │
└────────────────┬───────────────────────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────────────────────┐
│                 Repositories Layer                     │
│  Data access abstraction, Prisma queries               │
└────────────────┬───────────────────────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────────────────────┐
│                  Database (SQLite)                     │
│  Data persistence via Prisma ORM                       │
└────────────────────────────────────────────────────────┘
```

### Dependency Injection Pattern

```typescript
// Composition root in server.ts
const problemRepository = new ProblemRepository(prisma);
const problemService = new ProblemService(problemRepository);
const problemController = new ProblemController(problemService);

// Controllers depend on services
class ProblemController {
  constructor(private problemService: ProblemService) {}
}

// Services depend on repositories
class ProblemService {
  constructor(private repository: IProblemRepository) {}
}

// Repositories depend on Prisma
class ProblemRepository implements IProblemRepository {
  constructor(private prisma: PrismaClient) {}
}
```

### Middleware Stack

```
Request
   │
   ▼
┌──────────────┐
│ CORS         │ ◄─ Origin validation
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Body Parser  │ ◄─ JSON parsing
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Logger       │ ◄─ Request logging (Winston)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Routes       │ ◄─ Route handlers
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Error Handler│ ◄─ Global error handling
└──────┬───────┘
       │
       ▼
    Response
```

---

## Development Workflow

### Local Development

```bash
# 1. Install dependencies
pnpm install

# 2. Set up database
pnpm --filter @lcode-viz/backend prisma:generate
pnpm --filter @lcode-viz/backend prisma:migrate
pnpm --filter @lcode-viz/backend seed

# 3. Run development servers
pnpm dev  # Both frontend and backend

# 4. Open browser
# Frontend: http://localhost:3000
# Backend:  http://localhost:4000
```

### Build Process

```bash
# Type check all packages
pnpm type-check

# Build all packages
pnpm build

# Individual builds
pnpm --filter @lcode-viz/backend build
pnpm --filter @lcode-viz/frontend build
```

### Testing Strategy

```
┌─────────────────────────────────────────┐
│         Testing Pyramid                 │
│                                         │
│              ┌─────────┐                │
│              │   E2E   │                │
│              └─────────┘                │
│          ┌───────────────┐              │
│          │  Integration  │              │
│          └───────────────┘              │
│      ┌───────────────────────┐          │
│      │      Unit Tests       │          │
│      └───────────────────────┘          │
│                                         │
└─────────────────────────────────────────┘
```

**Unit Tests**: Jest for backend business logic
**Integration Tests**: Supertest for API endpoints
**E2E Tests**: (Future) Playwright/Cypress

---

## Deployment Architecture

### Production Deployment (Proposed)

```
┌─────────────────────────────────────────────────────────┐
│                      CDN (Vercel/Netlify)               │
│  ┌───────────────────────────────────────────────────┐  │
│  │         Static Assets (Frontend Build)            │  │
│  │  - index.html, JS bundles, CSS, images           │  │
│  └───────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────┘
                         │
                         │ HTTPS
                         │
                         ▼
                 ┌───────────────┐
                 │   Browser     │
                 └───────┬───────┘
                         │
                         │ API Calls
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│              Backend (Heroku/Railway/Fly.io)            │
│  ┌───────────────────────────────────────────────────┐  │
│  │            Express.js Server                      │  │
│  │  ┌─────────────────────────────────────────────┐ │  │
│  │  │         SQLite Database File                │ │  │
│  │  │  (or PostgreSQL for production)             │ │  │
│  │  └─────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Environment Configuration

**Development**:
- Frontend: localhost:3000
- Backend: localhost:4000
- Database: SQLite file

**Production**:
- Frontend: CDN (static hosting)
- Backend: Cloud platform (with environment variables)
- Database: PostgreSQL or managed SQLite

---

## Performance Considerations

### Frontend Optimization

- **Code Splitting**: Lazy load routes with React.lazy()
- **Bundle Size**: Tree-shaking with Vite
- **Caching**: Service worker for offline support (future)
- **Image Optimization**: Lazy loading for images

### Backend Optimization

- **Database Indexing**: Index on frequently queried fields
- **Query Optimization**: Use Prisma's query optimization
- **Caching**: Redis for frequently accessed data (future)
- **Rate Limiting**: Prevent abuse (future)

---

## Security Considerations

### Frontend Security

- **XSS Prevention**: React's built-in escaping
- **CSRF Protection**: Not needed (no auth yet)
- **Content Security Policy**: Strict CSP headers
- **HTTPS Only**: Force HTTPS in production

### Backend Security

- **CORS**: Configured for allowed origins
- **Input Validation**: Zod schemas validate all inputs
- **SQL Injection**: Prevented by Prisma ORM
- **Error Handling**: No sensitive data in error messages
- **Rate Limiting**: (Future) Protect against DDoS

---

## Future Enhancements

### Planned Architecture Changes

1. **Authentication Layer**
   - Add user authentication (JWT)
   - User progress tracking
   - Saved visualizations

2. **Caching Layer**
   - Redis for API responses
   - Client-side caching with React Query

3. **Real-time Features**
   - WebSocket for collaborative learning
   - Live code execution

4. **Microservices** (Long-term)
   - Separate visualization service
   - Code execution service

5. **Database Migration**
   - Move to PostgreSQL for production
   - Add read replicas for scaling

---

## Conclusion

This architecture provides:

✅ **Type Safety**: End-to-end TypeScript with shared types
✅ **Code Reuse**: Shared packages eliminate duplication
✅ **Maintainability**: Clear separation of concerns
✅ **Scalability**: Easy to add new features or services
✅ **Developer Experience**: Fast builds, hot reload, type checking
✅ **Testability**: Dependency injection and layered architecture

The monorepo structure enables rapid development while maintaining code quality and type safety across the entire stack.
