# LCode-Viz Setup Guide

## Project Structure Created

The project has been initialized with the following structure:

```
LCode-Viz/
├── public/                     # Static assets
├── src/
│   ├── components/
│   │   ├── common/            # Header, Footer
│   │   ├── problem/           # Problem-related components
│   │   ├── visualization/     # Visualization components
│   │   └── code/              # Code display components
│   ├── data/
│   │   └── problems/          # Problem data
│   │       ├── arrays/        # Array problems (two-sum.js created)
│   │       ├── trees/
│   │       ├── graphs/
│   │       ├── linked-lists/
│   │       └── dynamic-programming/
│   ├── engine/
│   │   └── renderers/         # Animation renderers
│   ├── hooks/                 # Custom React hooks
│   ├── pages/                 # Page components
│   ├── store/                 # Zustand state management
│   ├── styles/                # CSS files
│   ├── utils/                 # Utility functions
│   ├── App.jsx                # Main app component
│   └── main.jsx               # Entry point
├── planning/                  # Detailed planning docs
├── .eslintrc.cjs              # ESLint configuration
├── .prettierrc                # Prettier configuration
├── .gitignore                 # Git ignore rules
├── index.html                 # HTML template
├── package.json               # Dependencies
├── postcss.config.js          # PostCSS configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── vite.config.js             # Vite configuration
└── README.md                  # Project overview

```

## Installation Steps

### 1. Install Dependencies

Run this command in the project root:

```bash
npm install
```

This will install all the dependencies listed in `package.json`:
- React & React DOM
- React Router (routing)
- Zustand (state management)
- Framer Motion (animations)
- Prism.js (code highlighting)
- Tailwind CSS (styling)
- Vite (build tool)
- ESLint & Prettier (code quality)

### 2. Start Development Server

```bash
npm run dev
```

This will:
- Start the Vite dev server
- Open your browser to http://localhost:3000
- Enable hot module replacement (changes reflect instantly)

### 3. Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm run format   # Format code with Prettier
```

## What's Working Now

### ✅ Completed
- Project structure created
- React + Vite configured
- Tailwind CSS set up
- React Router configured
- Basic pages (Home, Problems, Visualization)
- Header and Footer components
- Sample problem data structure (two-sum.js)
- ESLint and Prettier configured
- Dark mode support (CSS classes ready)

### 🚧 To Be Implemented (Follow Roadmap)
- Animation engine
- Visualizers (Array, Tree, Graph, etc.)
- Control panel
- Code display with highlighting
- Problem filtering and search
- More problem data

## Current Pages

1. **Home Page** (`/`)
   - Hero section
   - Features showcase
   - Call-to-action
   - Fully styled and responsive

2. **Problems Page** (`/problems`)
   - Placeholder for problem browsing
   - Will be implemented in Phase 1, Week 4

3. **Visualization Page** (`/problems/:problemId`)
   - Placeholder for visualizations
   - Will be implemented in Phase 1, Week 3

## Next Steps (From Roadmap)

Follow the implementation roadmap in `planning/05-implementation-roadmap.md`:

### Week 1 Remaining Tasks:
1. ✅ Project setup (DONE)
2. ✅ Basic UI components (DONE)
3. Next: State management implementation
4. Next: Problem data loader

### Week 2:
- Build animation engine
- Create array visualizer
- Implement control panel

### Week 3:
- Code display component
- Complete first visualization (Two Sum)

See `planning/05-implementation-roadmap.md` for detailed day-by-day tasks.

## Development Tips

### Hot Reload
- Changes to `.jsx`, `.css` files auto-refresh
- Changes to config files require server restart

### Dark Mode
- Tailwind classes are already set up
- Use `dark:` prefix (e.g., `dark:bg-gray-900`)
- Dark mode toggle will be added later

### Adding New Problems
1. Create file in `src/data/problems/[category]/`
2. Follow the structure in `two-sum.js`
3. See `planning/02-data-schema.md` for complete schema

### Code Style
- ESLint will show errors in your editor
- Run `npm run format` before committing
- Prettier will auto-format on save (if configured in VS Code)

## Troubleshooting

### Port 3000 Already in Use
Edit `vite.config.js` and change the port:
```javascript
server: {
  port: 3001, // Change this
}
```

### Dependencies Not Installing
- Make sure Node.js version is 18+
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

### Tailwind Classes Not Working
- Check that `index.css` is imported in `main.jsx`
- Verify `tailwind.config.js` content paths are correct
- Restart dev server

## Resources

- **Planning Docs**: See `planning/` folder for detailed specifications
- **Vite Docs**: https://vitejs.dev/
- **React Docs**: https://react.dev/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Framer Motion**: https://www.framer.com/motion/

## Git Setup (Optional)

If you want to use version control:

```bash
git init
git add .
git commit -m "Initial project setup"
git branch -M main
git remote add origin https://github.com/yourusername/lcode-viz.git
git push -u origin main
```

## Ready to Code!

Your project is set up and ready for development. Start the dev server with:

```bash
npm run dev
```

Then follow the implementation roadmap in `planning/05-implementation-roadmap.md` to build out the features.

Happy coding! 🚀
