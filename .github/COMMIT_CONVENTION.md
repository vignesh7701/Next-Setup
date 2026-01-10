# 📝 Git Commit Convention

We follow a simplified version of [Conventional Commits](https://www.conventionalcommits.org/) customized for our Next.js App Router structure.

## 🎨 Format
```text
type(scope): subject
```

## 🏷️ Types
| Type | Description |
| :--- | :--- |
| **feat** | A new feature |
| **fix** | A bug fix |
| **ui** | Visual changes (Tailwind, Framer Motion, Components) |
| **docs** | Documentation only changes |
| **refactor** | A code change that neither fixes a bug nor adds a feature |
| **perf** | A code change that improves performance |
| **chore** | Build process, dependencies, or tool changes |

## 🎯 Scopes
| Scope | Description |
| :--- | :--- |
| **auth** | Authentication, NextAuth, Server Actions |
| **api** | External API Routes (`app/api/v1`) |
| **db** | Mongoose models, connection logic |
| **actions** | Server Actions (`app/actions`) |
| **shared** | Shared components (`Navbar`, `Providers`) |
| **(page)** | Specific routes (e.g., `login`, `dashboard`) |
| **config** | Config files (`next.config.ts`, `tsconfig.json`) |

## ✅ Examples
- `feat(auth): implement server action for registration`
- `fix(ui): resolve mobile navbar overflow issue`
- `style(login): update glassmorphism card opacity`
- `chore(deps): upgrade next-auth to v5`
- `refactor(db): move connection logic to singleton pattern`
