# Changes & Version History

This folder tracks all version releases and changes to the LCode-Viz project.

---

## Structure

```
changes/
├── README.md                   # This file
├── VERSION_MANAGEMENT.md       # Version management guide
├── v0.1.0/                     # Version 0.1.0 files
│   ├── INITIALIZATION_SUMMARY.md
│   └── QUICK_SUMMARY.md
├── v0.2.0/                     # Version 0.2.0 files (upcoming)
│   └── SUMMARY.md
└── templates/
    └── VERSION_TEMPLATE.md     # Template for new versions
```

---

## Versions

### Released

| Version | Date | Description | Status |
|---------|------|-------------|--------|
| [v0.1.0](v0.1.0/) | 2026-01-31 | Initial project setup | ✅ Released |

### Upcoming

| Version | Target | Description | Status |
|---------|--------|-------------|--------|
| v0.2.0 | Week 3 | Animation engine + array visualizer | 🔄 In Progress |
| v0.3.0 | Week 5 | Tree & linked list visualizers | ⏳ Planned |
| v0.4.0 | Week 7 | Graph & matrix visualizers | ⏳ Planned |
| v0.5.0 | Week 8 | Mobile responsive design | ⏳ Planned |
| v1.0.0 | Week 12 | Public launch | ⏳ Planned |

---

## Quick Navigation

- **Latest Release**: [v0.1.0](v0.1.0/QUICK_SUMMARY.md)
- **Version Guide**: [VERSION_MANAGEMENT.md](VERSION_MANAGEMENT.md)
- **Main Changelog**: [../CHANGELOG.md](../CHANGELOG.md)
- **Roadmap**: [../planning/05-implementation-roadmap.md](../planning/05-implementation-roadmap.md)

---

## How to Use

### Reading Version History
1. Browse version folders (e.g., `v0.1.0/`)
2. Read SUMMARY.md for overview
3. Check specific docs for details

### Creating New Version
1. Read [VERSION_MANAGEMENT.md](VERSION_MANAGEMENT.md)
2. Update [CHANGELOG.md](../CHANGELOG.md)
3. Run `npm run version:minor` (or patch/major)
4. Create version folder
5. Copy template and fill in details

---

## Version Naming

We use [Semantic Versioning](https://semver.org/):

- **v0.x.x** - Development/Beta
- **v1.0.0** - First stable release
- **v1.x.x** - Stable with improvements
- **v2.0.0** - Major breaking changes

---

## Current Status

**Active Version**: v0.1.0
**Development Phase**: Foundation (Week 1)
**Next Release**: v0.2.0 (Week 3)

---

## Resources

- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

Last Updated: 2026-01-31
