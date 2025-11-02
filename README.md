## Next.js — Clean Setup

### Prerequisites
- Node.js 18+ installed
- npm, yarn, or pnpm

### Create the app
From an empty folder:
- JavaScript:
    - npx create-next-app@latest .
- TypeScript:
    - npx create-next-app@latest . --typescript

Follow prompts (use the App Router by default in recent Next.js versions).

### Common scripts (package.json)
- dev: start dev server
    - npm run dev
- build: production build
    - npm run build
- start: run production server
    - npm start
- lint: run ESLint
    - npm run lint

### Minimal project layout
- /app or /pages — route entry (App Router uses /app)
- /public — static assets
- /styles — global CSS
- /components — UI components
- /lib — utilities, API clients
- /hooks — custom hooks
- next.config.js — app config
- .env.local — local env variables (don't commit)

Example next.config.js:
```js
/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    images: { domains: [] },
};
```

### Environment variables
- Use .env.local for secrets
- Prefix client-exposed vars with NEXT_PUBLIC_ (e.g., NEXT_PUBLIC_API_URL)

### Optional tooling
- Type checking: built-in TypeScript support
- Linting: ESLint (create-next-app can scaffold)
- Formatting: Prettier
- Tailwind CSS: follow Tailwind docs (`npx tailwindcss init -p` + config)

### Quick checklist
1. Create app
2. Install dev tools (ESLint/Prettier/Tailwind) as needed
3. Add basic folder structure (components, lib)
4. Add .env.local and gitignore it
5. Run npm run dev and open http://localhost:3000

This gives a minimal, clean starting point for building a Next.js app.