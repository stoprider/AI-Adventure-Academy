# Installation Guide

## Prerequisites

- Node.js 20+
- npm 10+

## Steps

1. เปิด terminal ในโฟลเดอร์โปรเจกต์
2. ติดตั้ง dependencies

```bash
npm install
```

3. seed ฐานข้อมูลตัวอย่าง

```bash
npm --workspace backend run seed
```

4. รันระบบ

```bash
npm run dev
```

5. รัน test backend

```bash
npm --workspace backend run test
```

## Environment Variables

### Frontend

```bash
VITE_API_URL=http://localhost:4000/api
```

### Backend

```bash
PORT=4000
DB_PATH=backend/data/academy.sqlite
CORS_ORIGIN=*
```
