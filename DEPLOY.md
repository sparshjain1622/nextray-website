# Nextray — Production Deploy (Render + Supabase + Vercel)

Stack for initial launch using **free subdomains** (no custom domain yet).

| Piece | Service | Free URL example |
|-------|---------|------------------|
| Frontend | Vercel | `https://nextray.vercel.app` |
| Backend API | Render | `https://nextray-api.onrender.com` |
| Database | Supabase PostgreSQL | (connection string only) |
| Email | Gmail SMTP | → `jsparsh11@gmail.com` |

Replace example URLs with your actual Vercel/Render URLs after deploy.

---

## Step 1 — Supabase (PostgreSQL)

1. Go to [supabase.com](https://supabase.com) → **New project**
2. Name: `nextray` · Region: closest to India (e.g. Mumbai/Singapore) · strong DB password
3. Wait for project to finish provisioning
4. **Project Settings → Database → Connection string → URI** (Transaction pooler or Direct)
5. Copy the **URI** under **Connection pooling → Session mode** (port **6543**), not the direct `:5432` URL.
   ```
   postgresql://postgres.[ref]:[PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres
   ```
6. Add `?sslmode=require` at the end if not present. Encode `@` in password as `%40`.

**Save as `DATABASE_URL`** — you’ll paste this into Render.

---

## Step 2 — Gmail App Password (SMTP)

Gmail won’t work with your normal password. You need an **App Password**:

1. Google Account → **Security** → enable **2-Step Verification**
2. **Security → App passwords** → create app “Nextray” → **Mail**
3. Copy the 16-character password (no spaces)

Use in Render:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=jsparsh11@gmail.com
SMTP_PASS=<16-char-app-password>
SMTP_FROM=jsparsh11@gmail.com
NOTIFY_EMAIL=jsparsh11@gmail.com
```

Contact and associates form submissions will email **jsparsh11@gmail.com**.

---

## Step 3 — Render (Backend API)

1. [render.com](https://render.com) → **New → Web Service**
2. Connect your GitHub repo
3. Settings:

| Field | Value |
|-------|--------|
| **Name** | `nextray-api` |
| **Root Directory** | *(leave empty — repo root)* |
| **Runtime** | Node |
| **Root Directory** | *(leave empty — repo root, NOT `backend`)* |
| **Build Command** | `npm install && npm run build:api` |
| **Start Command** | `npm run start:api` |
| **Release Command** | `npm run db:setup:api` |

> **Build failed with "No workspaces found"?** Render deployed an old commit or wrong root. Use **Manual Deploy → Deploy latest commit** and ensure Root Directory is empty. Latest monorepo commit must include `frontend/`, `backend/`, `shared/` folders.

4. **Environment variables** (Environment tab):

```env
NODE_ENV=production
DATABASE_URL=<Supabase URI from Step 1>
FRONTEND_URL=https://YOUR-APP.vercel.app
JWT_SECRET=<run: openssl rand -hex 32>
ADMIN_EMAIL=admin@nextray-tech.com
ADMIN_PASSWORD=<choose-strong-password>
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=jsparsh11@gmail.com
SMTP_PASS=<gmail-app-password>
SMTP_FROM=jsparsh11@gmail.com
NOTIFY_EMAIL=jsparsh11@gmail.com
```

5. Deploy → note your URL: `https://nextray-api.onrender.com` (yours may differ)

6. **Test:**
   ```bash
   curl https://nextray-api.onrender.com/api/health
   curl https://nextray-api.onrender.com/api/products
   ```

### Render free tier notes

- Service **sleeps after ~15 min** inactive — first request may take 30–60s (cold start)
- **Uploads** (`/uploads`) are **not persistent** on free tier — datasheets may be lost on redeploy. OK for now; move to S3 later.

---

## Step 4 — Vercel (Frontend)

1. [vercel.com](https://vercel.com) → import repo (or use existing linked project)
2. Settings:

| Field | Value |
|-------|--------|
| **Root Directory** | `frontend` |
| **Framework** | Next.js |

3. **Environment variables:**

```env
NEXT_PUBLIC_API_URL=https://nextray-api.onrender.com
NEXT_PUBLIC_SITE_URL=https://YOUR-APP.vercel.app
```

Use your **actual Render API URL** and **actual Vercel URL**.

4. Deploy → note URL: `https://nextray-xxxx.vercel.app`

5. **Update Render** `FRONTEND_URL` to match your Vercel URL exactly, then **redeploy Render** (CORS).

6. **Redeploy Vercel** after any env change (`NEXT_PUBLIC_*` is baked in at build time).

---

## Step 5 — Smoke test checklist

- [ ] `https://YOUR.vercel.app` — homepage loads
- [ ] `/contact` — submit form → email arrives at jsparsh11@gmail.com
- [ ] `/admin` — login with `ADMIN_EMAIL` / `ADMIN_PASSWORD`
- [ ] Admin → add category → appears on site nav
- [ ] `/api/health` on Render returns `ok`

---

## Step 6 — Later (when you buy nextray-tech.com)

1. Vercel → Domains → add `www.nextray-tech.com`
2. DNS: CNAME `www` → Vercel
3. Optional: CNAME `api` → Render custom domain
4. Update env vars:
   - `NEXT_PUBLIC_SITE_URL=https://www.nextray-tech.com`
   - `FRONTEND_URL=https://www.nextray-tech.com`
5. Redeploy both services

---

## Local dev with Supabase (optional)

Point local backend at the same Supabase DB (or a second Supabase project):

```bash
# backend/.env
DATABASE_URL="postgresql://..."
```

Then:

```bash
npm run db:setup -w @nextray/backend
npm run dev
```

Or keep a separate Supabase “dev” project so production data stays clean.

---

## Quick reference — who talks to whom

```
Browser → Vercel (frontend)
       → Render (API) via NEXT_PUBLIC_API_URL
       → Supabase (DB) via Render DATABASE_URL
       → Gmail (SMTP) on form submit
```
