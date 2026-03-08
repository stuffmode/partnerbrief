# Development Guide

## Branch Strategy

- `main` - Production-ready code
- `develop` - Integration branch
- `feature/*` - New features
- `fix/*` - Bug fixes

## Code Conventions

- **Components**: PascalCase, one component per file
- **Utilities**: camelCase exports in `/lib/`
- **Types**: PascalCase interfaces in `/types/`
- **API Routes**: REST conventions in `/app/api/`

## Adding a New Data Source

1. Create a new client in `/lib/api/<source>.ts`
2. Add the connection type to `DataSource["type"]` in `/types/index.ts`
3. Add the env variable to `.env.local`
4. Document in `docs/SETUP.md`

## Adding a New Page

1. Create a folder under `/app/<route>/`
2. Add `page.tsx` with a default export
3. Add navigation link in `components/layout/Header.tsx`
