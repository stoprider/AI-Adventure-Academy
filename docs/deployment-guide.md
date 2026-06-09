# Deployment Guide

## Option 1: Vercel

เหมาะสำหรับ deploy frontend และ backend แบบ serverless

### Frontend

- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `VITE_API_URL=https://your-backend-domain/api`

### Backend

- ใช้ไฟล์ `backend/api/index.ts`
- ตั้งค่า project ให้ชี้มายัง backend
- ติดตั้ง dependencies จาก `backend/package.json`

ตัวอย่าง `vercel.json`

```json
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/backend/api/index.ts" },
    { "source": "/(.*)", "destination": "/frontend/dist/$1" }
  ]
}
```

## Option 2: Netlify

เหมาะสำหรับ frontend static และ serverless function

### Frontend

- Base directory: `frontend`
- Build command: `npm run build`
- Publish directory: `frontend/dist`

### Backend Function

- ใช้ไฟล์ `backend/netlify/functions/server.ts`
- ตั้ง `netlify.toml` ให้ redirect `/api/*` ไปยัง function

ตัวอย่าง `netlify.toml`

```toml
[build]
command = "npm run build"
publish = "frontend/dist"

[functions]
directory = "backend/netlify/functions"

[[redirects]]
from = "/api/*"
to = "/.netlify/functions/server/:splat"
status = 200
```

## Recommended Portfolio Deployment

- Frontend: Netlify หรือ Vercel
- Backend: Render, Railway, Vercel Functions หรือ Netlify Functions
- Database: SQLite สำหรับ demo หรือเปลี่ยนเป็น PostgreSQL สำหรับ production จริง
