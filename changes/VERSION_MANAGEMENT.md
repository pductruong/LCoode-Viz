# Version Management Guide

This guide explains how to manage versions and track changes in the LCode-Viz project.

---

## Version Numbering (Semantic Versioning)

We follow [Semantic Versioning 2.0.0](https://semver.org/)

### Format: MAJOR.MINOR.PATCH

```
v1.2.3
│ │ │
│ │ └─ PATCH: Bug fixes, small improvements
│ └─── MINOR: New features (backwards compatible)
└───── MAJOR: Breaking changes, major releases
```

### Examples

- `0.1.0` → `0.1.1` - Fixed a bug (PATCH)
- `0.1.1` → `0.2.0` - Added new visualizer (MINOR)
- `0.9.0` → `1.0.0` - Public launch (MAJOR)

### Version Stages

- **0.x.x** - Development/Beta
- **1.0.0** - First stable release
- **1.x.x** - Stable with incremental improvements

---

## Current Version Structure

```
changes/
├── VERSION_MANAGEMENT.md       (this file)
├── v0.1.0/
│   ├── INITIALIZATION_SUMMARY.md
│   └── QUICK_SUMMARY.md
└── templates/
    └── VERSION_TEMPLATE.md
```

---

## How to Create a New Version

### Step 1: Update CHANGELOG.md

Before creating a new version, document all changes in `CHANGELOG.md`:

```markdown
## [Unreleased]

### Added
- New feature X
- New component Y

### Changed
- Updated feature Z

### Fixed
- Bug fix A
```

### Step 2: Bump Version

Use npm scripts to bump the version:

```bash
# For bug fixes (0.1.0 → 0.1.1)
npm run version:patch

# For new features (0.1.0 → 0.2.0)
npm run version:minor

# For breaking changes (0.9.0 → 1.0.0)
npm run version:major
```

This will:
- Update version in `package.json`
- Create a git commit
- Create a git tag

### Step 3: Move Changelog Entries

Move the `[Unreleased]` section to a new version section in `CHANGELOG.md`:

```markdown
## [Unreleased]
<!-- Empty for now -->

## [0.2.0] - 2026-02-15

### Added
- Animation engine implementation
- Array visualizer with controls
```

### Step 4: Create Version Folder

Create a folder for the new version:

```bash
mkdir -p changes/v0.2.0
```

### Step 5: Document the Version

Create a summary document in the version folder:

```bash
# Copy template
cp changes/templates/VERSION_TEMPLATE.md changes/v0.2.0/SUMMARY.md

# Edit with version details
```

### Step 6: Commit Changes

```bash
git add .
git commit -m "Release v0.2.0: Animation engine and array visualizer"
git tag v0.2.0
```

---

## Version Workflow

### Daily Development

```bash
# Work on features
# Edit files
# Test changes

# Before committing, format code
npm run format

# Commit changes
git add .
git commit -m "feat: add animation control panel"
```

### Weekly Progress

Update `CHANGELOG.md` under `[Unreleased]` section with what you've done.

### When Ready to Release

1. Review all changes
2. Update CHANGELOG.md
3. Bump version: `npm run version:minor`
4. Move changelog entries
5. Create version folder with summary
6. Push to repository (when ready)

---

## Git Commit Message Conventions

Use conventional commits for clarity:

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Build/config changes

### Examples

```bash
feat(animation): add play/pause controls
fix(visualizer): correct array pointer position
docs(readme): update setup instructions
style(components): format with prettier
refactor(engine): simplify state management
test(animation): add unit tests for engine
chore(deps): update react to 18.3.1
```

### Scope Examples
- `animation` - Animation system
- `visualizer` - Visualization components
- `data` - Problem data
- `ui` - User interface
- `engine` - Core engine
- `docs` - Documentation

---

## Changelog Categories

### Added ✨
For new features or functionality
```markdown
### Added
- Animation control panel with play/pause
- Tree visualizer component
- Dark mode toggle
```

### Changed 🔄
For changes to existing functionality
```markdown
### Changed
- Improved animation smoothness
- Updated color palette
- Refactored state management
```

### Deprecated ⚠️
For soon-to-be removed features
```markdown
### Deprecated
- Old animation API (use new API instead)
```

### Removed 🗑️
For removed features
```markdown
### Removed
- Legacy visualizer code
- Unused dependencies
```

### Fixed 🐛
For bug fixes
```markdown
### Fixed
- Animation timing issue
- Memory leak in renderer
- Broken dark mode styles
```

### Security 🔒
For security improvements
```markdown
### Security
- Updated vulnerable dependencies
- Fixed XSS vulnerability
```

---

## Version Milestones

### Planned Releases

| Version | Target | Focus | Status |
|---------|--------|-------|--------|
| v0.1.0 | Week 1 | Initial setup | ✅ Complete |
| v0.2.0 | Week 3 | Animation engine + array visualizer | 🔄 In Progress |
| v0.3.0 | Week 5 | Tree & linked list visualizers | ⏳ Planned |
| v0.4.0 | Week 7 | Graph & matrix visualizers | ⏳ Planned |
| v0.5.0 | Week 8 | Mobile responsive | ⏳ Planned |
| v0.6.0 | Week 9 | Dark mode + accessibility | ⏳ Planned |
| v0.7.0 | Week 10 | Performance optimization | ⏳ Planned |
| v0.8.0 | Week 11 | Testing & polish | ⏳ Planned |
| v1.0.0 | Week 12 | Public launch | ⏳ Planned |

---

## Git Tags

### Creating Tags

Tags are created automatically when you run `npm version`, but you can also create them manually:

```bash
# Annotated tag (recommended)
git tag -a v0.2.0 -m "Release v0.2.0: Animation engine"

# List all tags
git tag

# View tag details
git show v0.2.0
```

### Pushing Tags

```bash
# Push specific tag
git push origin v0.2.0

# Push all tags
git push origin --tags
```

---

## Version Documentation Structure

Each version should have a folder with:

```
changes/v0.2.0/
├── SUMMARY.md              # What was added/changed
├── BREAKING_CHANGES.md     # Breaking changes (if any)
├── MIGRATION.md            # Migration guide (if needed)
└── SCREENSHOTS/            # Screenshots of new features
```

---

## Quick Commands

```bash
# Check current version
npm version

# See what changed since last tag
git log v0.1.0..HEAD --oneline

# See differences between versions
git diff v0.1.0 v0.2.0

# List all versions
git tag -l

# Create new patch version
npm run version:patch

# Create new minor version
npm run version:minor

# Create new major version
npm run version:major
```

---

## Best Practices

### DO ✅
- Document ALL changes in CHANGELOG.md
- Use semantic versioning consistently
- Create git tags for releases
- Write clear commit messages
- Update version documentation
- Test before bumping version

### DON'T ❌
- Skip changelog updates
- Bump major version for small changes
- Forget to create version folders
- Use vague commit messages
- Release without testing
- Mix unrelated changes in one commit

---

## Example Workflow

### Week 2 Development

```bash
# Day 1: Start animation engine
git checkout -b feature/animation-engine
# ... code ...
git commit -m "feat(engine): add AnimationController class"

# Day 2: Continue development
# ... code ...
git commit -m "feat(engine): implement step management"

# Day 3: Add visualizer
# ... code ...
git commit -m "feat(visualizer): create array renderer"

# Day 4: Fix bug
# ... code ...
git commit -m "fix(visualizer): correct element positioning"

# End of Week 2: Ready to release
git checkout main
git merge feature/animation-engine

# Update CHANGELOG.md with all changes
# Then bump version
npm run version:minor  # Creates v0.2.0

# Create version documentation
mkdir changes/v0.2.0
# ... document changes ...

git push origin main
git push origin v0.2.0
```

---

## Version History

| Version | Date | Description |
|---------|------|-------------|
| v0.1.0 | 2026-01-31 | Initial project setup |

---

## Resources

- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Tagging](https://git-scm.com/book/en/v2/Git-Basics-Tagging)

---

**Current Version**: v0.1.0
**Next Version**: v0.2.0 (Planned for Week 3)
