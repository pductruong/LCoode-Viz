# LCode-Viz Architecture

## Overview

LCode-Viz has been refactored to follow SOLID principles with a clean separation of concerns between frontend and backend.

## SOLID Principles Applied

### 1. Single Responsibility Principle (SRP)

Each module has ONE well-defined responsibility:

- **Stores**: State management ONLY
  - `problemStore.ts`: Manages problem state
  - `topicStore.ts`: Manages topic state
  - `filterStore.ts`: Manages filter state

- **Services**: Business logic ONLY
  - `ProblemService.ts`: Problem business logic
  - `TopicService.ts`: Topic business logic

- **API Clients**: HTTP communication ONLY
  - `problemApiClient.ts`: Problem API calls
  - `topicApiClient.ts`: Topic API calls

- **Repositories** (Backend): Data access ONLY
  - `ProblemRepository.ts`: Database queries for problems
  - `TopicRepository.ts`: Database queries for topics

- **Controllers** (Backend): HTTP request handling ONLY
  - `problemController.ts`: Handle problem endpoints
  - `topicController.ts`: Handle topic endpoints

### 2. Open/Closed Principle (OCP)

System is **open for extension, closed for modification**:

- **Service Registry**: New services can be added to ServiceContainer without modifying existing code
- **Repository Pattern**: Can swap database implementations without changing service logic
- **Strategy Pattern**: Filter strategies can be extended without modifying core logic

### 3. Liskov Substitution Principle (LSP)

All implementations are substitutable:

- Any `IProblemService` implementation can replace `ProblemService`
- Any `ITopicService` implementation can replace `TopicService`
- Mock services can replace real services for testing

### 4. Interface Segregation Principle (ISP)

Interfaces are focused and minimal:

- `IDataService<T>`: Base interface with only `getAll()`, `getById()`, `search()`
- `IProblemService`: Extends with problem-specific methods only
- `ITopicService`: Extends with topic-specific methods only

### 5. Dependency Inversion Principle (DIP)

High-level modules depend on abstractions:

- **Frontend**: Components depend on `IProblemService` interface, not concrete implementation
- **Backend**: Services depend on repository interfaces, not concrete implementations
- **Dependency Injection**: ServiceContainer provides all dependencies

## Architecture Layers

### Backend Architecture

```
┌─────────────────────────────────────┐
│         HTTP Layer                  │
│  (Express Routes + Controllers)     │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      Business Logic Layer           │
│         (Services)                  │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│       Data Access Layer             │
│      (Repositories)                 │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│         Database                    │
│    (Prisma + SQLite)                │
└─────────────────────────────────────┘
```

### Frontend Architecture

```
┌─────────────────────────────────────┐
│      Presentation Layer             │
│       (React Components)            │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      Business Logic Layer           │
│       (Custom Hooks)                │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│        Service Layer                │
│  (Services + API Clients)           │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│         State Layer                 │
│       (Zustand Stores)              │
└─────────────────────────────────────┘
```

## Data Flow

### Loading Problems Example

```
1. Component calls useLoadProblems() hook
2. Hook calls problemService.getAll()
3. Service calls problemApiClient.getProblems()
4. API Client makes HTTP request to /api/problems
5. Backend route calls problemController.listProblems()
6. Controller calls problemService.filter()
7. Service calls problemRepository.findAll()
8. Repository queries Prisma/Database
9. Data flows back through layers
10. Hook updates problemStore state
11. Component re-renders with new data
```

## Directory Structure

### Frontend

```
src/
├── components/          # React components
├── pages/              # Page components
├── hooks/              # Custom hooks (business logic)
│   ├── useLoadProblems.ts
│   ├── useLoadProblem.ts
│   ├── useFilteredProblems.ts
│   ├── useLoadTopics.ts
│   └── useLoadTopic.ts
├── services/           # Service layer
│   ├── interfaces/     # Service interfaces (DIP)
│   ├── api/           # API clients
│   ├── ProblemService.ts
│   ├── TopicService.ts
│   └── ServiceContainer.ts  # DI container
├── store/             # State management (SRP)
│   ├── problemStore.ts
│   ├── topicStore.ts
│   └── filterStore.ts
├── types/             # TypeScript types
│   ├── domain/        # Domain models
│   ├── api/           # API types
│   └── filters/       # Filter types
└── providers/         # React context providers
    └── ServiceProvider.tsx
```

### Backend

```
backend/
├── src/
│   ├── config/             # Configuration
│   │   ├── database.ts
│   │   └── env.ts
│   ├── models/             # Data models (Prisma generated)
│   ├── repositories/       # Data access layer (DIP)
│   │   ├── IProblemRepository.ts
│   │   ├── ProblemRepository.ts
│   │   ├── ITopicRepository.ts
│   │   └── TopicRepository.ts
│   ├── services/           # Business logic (SRP)
│   │   ├── ProblemService.ts
│   │   └── TopicService.ts
│   ├── controllers/        # HTTP handlers
│   │   ├── problemController.ts
│   │   └── topicController.ts
│   ├── routes/             # API routes
│   │   ├── index.ts
│   │   ├── problems.ts
│   │   └── topics.ts
│   ├── middleware/         # Express middleware
│   │   ├── errorHandler.ts
│   │   └── cors.ts
│   ├── utils/              # Utilities
│   │   ├── logger.ts
│   │   └── response.ts
│   └── db/                 # Database management
│       └── seed.ts
└── prisma/
    └── schema.prisma       # Database schema
```

## Benefits of This Architecture

### 1. **Maintainability**
- Clear separation of concerns
- Each module has one responsibility
- Easy to locate and fix bugs

### 2. **Testability**
- Services can be easily mocked
- Repositories can be swapped for testing
- Hooks can be tested independently

### 3. **Scalability**
- Easy to add new features
- Can swap implementations without breaking changes
- Clear extension points

### 4. **Type Safety**
- Full TypeScript coverage
- Type-safe API calls
- Compile-time error detection

### 5. **Flexibility**
- Can swap data sources (API ↔ Local ↔ Mock)
- Easy to add new endpoints
- Can migrate to different database

## API Endpoints

### Problems

- `GET /api/problems` - List all problems (with filters)
- `GET /api/problems/:id` - Get single problem
- `GET /api/problems/search?q=query` - Search problems
- `GET /api/problems/categories` - Get all categories

### Topics

- `GET /api/topics` - List all topics (with filters)
- `GET /api/topics/:id` - Get single topic
- `GET /api/topics/search?q=query` - Search topics
- `GET /api/topics/categories` - Get all categories

## Environment Variables

### Frontend (.env.development)
```
VITE_API_URL=  # Empty for proxy, or http://localhost:4000 for direct
```

### Backend (backend/.env)
```
DATABASE_URL="file:./dev.db"
PORT=4000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

## Running the Application

### Development Mode

1. **Start Backend**:
```bash
cd backend
npm run dev
```

2. **Start Frontend**:
```bash
npm run dev
```

3. Frontend runs on `http://localhost:3000`
4. Backend runs on `http://localhost:4000`
5. Frontend proxies `/api/*` requests to backend

### Database Setup

```bash
cd backend
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run migrations
npm run seed             # Seed database
```

## Design Patterns Used

1. **Repository Pattern**: Data access abstraction
2. **Service Pattern**: Business logic encapsulation
3. **Dependency Injection**: Loose coupling
4. **Factory Pattern**: Service creation
5. **Strategy Pattern**: Filtering strategies
6. **Observer Pattern**: React hooks + Zustand
7. **Singleton Pattern**: ServiceContainer

## Future Improvements

1. Add unit tests for services
2. Add integration tests for API endpoints
3. Implement caching layer
4. Add request/response validation with Zod
5. Implement authentication/authorization
6. Add rate limiting
7. Implement pagination for large datasets
8. Add WebSocket support for real-time updates
