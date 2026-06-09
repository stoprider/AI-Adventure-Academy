# Deployment Environment Checklist

## Frontend

Set these for Vercel, Netlify, or another static host:

```bash
VITE_API_URL=https://your-backend-domain/api
```

Checks:

- Confirm the backend URL is reachable from the deployed frontend
- Confirm CORS allows the deployed frontend origin when not using `*`
- Rebuild frontend after changing `VITE_API_URL`

## Backend

Set these for Render, Railway, Vercel Functions, Netlify Functions, or another Node host:

```bash
PORT=4000
DB_PATH=backend/data/academy.sqlite
CORS_ORIGIN=*
```

Checks:

- Use a writable path for SQLite if deploying as a long-running Node service
- Avoid local SQLite for highly persistent multi-user production workloads
- Set `CORS_ORIGIN` to the real frontend domain for stricter security
- Re-seed only when you intentionally want demo/sample data

## Final Pre-Deploy Checks

```bash
npm --workspace backend run test
npm --workspace backend run build
npm --workspace frontend run build
```

- Verify `README.md`, `LICENSE`, and `CONTRIBUTING.md` are present
- Verify `.gitignore` excludes local database and temp artifacts
- Verify sample data is appropriate for a public demo
