# LCode-Viz Setup Guide

## Prerequisites

- Node.js 18+ and npm
- Git

## Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd LCode-Viz
```

### 2. Install Dependencies

**Frontend**:
```bash
npm install
```

**Backend**:
```bash
cd backend
npm install
```

### 3. Set Up the Database

```bash
cd backend
npx prisma generate          # Generate Prisma client
npx prisma migrate dev       # Run database migrations
npm run seed                 # Seed database with initial data
```

### 4. Configure Environment Variables

**Frontend** (`.env.development`):
```env
VITE_API_URL=
```
Leave empty to use Vite proxy (recommended for development).

**Backend** (`backend/.env`):
```env
DATABASE_URL="file:./dev.db"
PORT=4000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### 5. Run the Application

#### Option 1: Run Both with Single Command (Recommended)

From the root directory:
```bash
npm run dev
```

This will start both backend (port 4000) and frontend (port 3000) concurrently in a single terminal with colored output.

#### Option 2: Run Separately

**Terminal 1 - Backend**:
```bash
npm run dev:backend
# Or: cd backend && npm run dev
```
Backend will start on `http://localhost:4000`

**Terminal 2 - Frontend**:
```bash
npm run dev:frontend
# Or: vite
```
Frontend will start on `http://localhost:3000`

### 6. Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## Development Workflow

### Backend Development

- **Start dev server**: `npm run dev` (auto-reload with nodemon)
- **Generate Prisma client**: `npm run prisma:generate`
- **Create migration**: `npm run prisma:migrate`
- **Open Prisma Studio**: `npm run prisma:studio`
- **Re-seed database**: `npm run seed`
- **Build for production**: `npm run build`
- **Run tests**: `npm test`

### Frontend Development

- **Start dev server**: `npm run dev`
- **Build for production**: `npm run build`
- **Preview production build**: `npm run preview`

## Project Structure

```
LCode-Viz/
├── backend/                 # Backend API server
│   ├── src/
│   │   ├── config/         # Configuration
│   │   ├── repositories/   # Data access layer
│   │   ├── services/       # Business logic
│   │   ├── controllers/    # HTTP handlers
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Express middleware
│   │   ├── utils/          # Utilities
│   │   └── db/             # Database seeds
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   └── package.json
├── src/                     # Frontend source
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── hooks/             # Custom hooks
│   ├── services/          # Service layer
│   ├── store/             # State management
│   ├── types/             # TypeScript types
│   └── providers/         # Context providers
├── public/                 # Static assets
└── package.json
```

## API Endpoints

### Health Check
- `GET /health` - Server health status

### Problems
- `GET /api/problems` - List all problems
  - Query params: `difficulty`, `categories`, `search`
- `GET /api/problems/:id` - Get problem by ID
- `GET /api/problems/search?q=query` - Search problems
- `GET /api/problems/categories` - Get all categories

### Topics
- `GET /api/topics` - List all topics
  - Query params: `category`, `search`
- `GET /api/topics/:id` - Get topic by ID
- `GET /api/topics/search?q=query` - Search topics
- `GET /api/topics/categories` - Get all categories

## Testing the API

Using curl:

```bash
# Health check
curl http://localhost:4000/health

# Get all problems
curl http://localhost:4000/api/problems

# Get problems by difficulty
curl http://localhost:4000/api/problems?difficulty=Easy

# Search problems
curl http://localhost:4000/api/problems/search?q=sum

# Get specific problem
curl http://localhost:4000/api/problems/two-sum

# Get all topics
curl http://localhost:4000/api/topics

# Get specific topic
curl http://localhost:4000/api/topics/linked-list
```

## Database Management

### View Data

Use Prisma Studio to browse and edit data:
```bash
cd backend
npm run prisma:studio
```
Opens at `http://localhost:5555`

### Reset Database

To completely reset the database:
```bash
cd backend
rm prisma/dev.db           # Delete database
npm run prisma:migrate     # Recreate schema
npm run seed               # Reseed data
```

### Add New Problems/Topics

1. Update `backend/src/db/seed.ts`
2. Run: `npm run seed`

## Troubleshooting

### Port Already in Use

If ports 3000 or 4000 are in use:

**Frontend** (edit `vite.config.js`):
```javascript
server: {
  port: 3001,  // Change port
  // ...
}
```

**Backend** (edit `backend/.env`):
```env
PORT=4001  # Change port
```

Also update the proxy in `vite.config.js` to match the new backend port.

### Database Issues

If you encounter Prisma errors:
```bash
cd backend
npx prisma generate
npx prisma migrate reset  # WARNING: Deletes all data
npm run seed
```

### TypeScript Errors

Clear TypeScript cache:
```bash
rm -rf node_modules/.vite
npm run dev
```

### CORS Issues

Make sure:
1. Backend `CORS_ORIGIN` in `.env` matches frontend URL
2. Frontend is accessing API through proxy (Vite config)

## Production Deployment

### Backend

1. Build:
```bash
cd backend
npm run build
```

2. Set production environment variables:
```env
DATABASE_URL="your-production-db-url"
NODE_ENV=production
PORT=4000
CORS_ORIGIN=https://your-frontend-domain.com
```

3. Start:
```bash
npm start
```

### Frontend

1. Build:
```bash
npm run build
```

2. Set production environment variables (`.env.production`):
```env
VITE_API_URL=https://your-api-domain.com
```

3. Deploy `dist/` folder to static hosting (Vercel, Netlify, etc.)

## Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **State Management**: Zustand
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Animation**: Framer Motion

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite (dev) / PostgreSQL (production)
- **ORM**: Prisma
- **Validation**: Zod
- **Logger**: Winston
- **Language**: TypeScript

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture documentation, SOLID principles implementation, and design patterns used.

## Git Workflow

Current branch structure:
- `main` - Main development branch
- `pre-refactor-backup` - Backup before SOLID refactoring
- Tag: `v0.2.0-pre-refactor` - Pre-refactoring state

## Next Steps

1. Run the application and test the API
2. Explore the refactored codebase
3. Read [ARCHITECTURE.md](./ARCHITECTURE.md) for architecture details
4. Start adding new problems/topics
5. Implement remaining features (component refactoring, testing, etc.)

## Support

For issues or questions, refer to:
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Architecture documentation
- [README.md](./README.md) - Project overview
- Git commit history for implementation details
