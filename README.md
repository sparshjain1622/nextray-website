# Nextray Technologies — Website

Monorepo with separate **frontend** (Next.js) and **backend** (Express API), connected via a **shared** types package.

## Folder structure

```
nextray/
├── frontend/          # Next.js website (UI, pages, components)
├── backend/           # Express API (forms, future email/DB)
├── shared/            # Shared types & validation (Zod schemas)
└── package.json       # Root workspace — run both together
```

## Getting started

```bash
# Install all dependencies (root + workspaces)
npm install

# Copy env files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local

# Run frontend (port 3000) + backend (port 4000) together
npm run dev
```

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend + backend |
| `npm run dev:frontend` | Frontend only |
| `npm run dev:backend` | Backend only |
| `npm run build` | Build both |
| `npm run lint` | Lint frontend |

## How frontend & backend stay in sync

Form field names, validation rules, and API response types live in **`shared/src/types/forms.ts`**.

When you add or change a form field:

1. Update the Zod schema in `shared/`
2. Update the form fields in `frontend/` (SiteForm / page)
3. Backend routes automatically use the same schema — no duplicate validation logic

## API endpoints

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/health` | Health check |
| POST | `/api/contact` | Contact inquiry form |
| POST | `/api/associates` | Partnership application form |

## Deploy (production)

**Stack:** Vercel (frontend) + Render (API) + Supabase (PostgreSQL) + Gmail SMTP

See **[DEPLOY.md](./DEPLOY.md)** for the full step-by-step guide (free `.vercel.app` + `.onrender.com` URLs).
