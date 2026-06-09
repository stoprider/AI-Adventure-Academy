# AI Adventure Academy

AI Adventure Academy คือ Web Application แนวเกมการศึกษาเกี่ยวกับ AI สำหรับนักเรียนอายุ 12-15 ปี เน้นการเรียนรู้ผ่านการเล่นในธีมเมืองอนาคต โดยใช้ React + TypeScript + Vite สำหรับ frontend, Node.js + Express สำหรับ backend และ SQLite สำหรับฐานข้อมูล

## Highlights

- Guest Mode เริ่มเล่นได้ทันที
- 5 โหมดเกม: Image, Chat, Detect, Problem Solver, Ethics
- XP, Level, Coins, Progress Tracking
- Admin Dashboard พร้อม Export Excel
- Responsive รองรับมือถือ แท็บเล็ต และคอมพิวเตอร์
- ออกแบบให้ต่อยอดไปใช้ AI API จริงได้ในอนาคต

## Monorepo Structure

```text
.
|-- backend
|-- docs
|-- frontend
|-- package.json
`-- README.md
```

รายละเอียดเชิงลึกอยู่ใน [docs/source-code-structure.md](/e:/AI%20Adventure%20Academy/docs/source-code-structure.md)

## Quick Start

```bash
npm install
npm --workspace backend run seed
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`

## Run Tests

```bash
npm --workspace backend run test
```

- Covers game scoring, level logic, guest player flow, and core API smoke tests

## Release Checklist

Before commit or publish:

```bash
npm --workspace backend run test
npm --workspace backend run build
npm --workspace frontend run build
```

- Verify `VITE_API_URL` points to the intended backend
- Keep `backend/data/*.sqlite*` out of version control unless you intentionally want demo data committed
- Re-run `npm --workspace backend run seed` only when you want to refresh sample content

## Main Documents

- [SRS](/e:/AI%20Adventure%20Academy/docs/SRS.md)
- [SDLC](/e:/AI%20Adventure%20Academy/docs/SDLC.md)
- [Architecture Diagram](/e:/AI%20Adventure%20Academy/docs/system-architecture.md)
- [Database Schema](/e:/AI%20Adventure%20Academy/docs/database-schema.md)
- [API Documentation](/e:/AI%20Adventure%20Academy/docs/api-documentation.md)
- [Wireframes](/e:/AI%20Adventure%20Academy/docs/wireframes.md)
- [UI Design Concept](/e:/AI%20Adventure%20Academy/docs/ui-design-concept.md)
- [Installation Guide](/e:/AI%20Adventure%20Academy/docs/installation-guide.md)
- [Deployment Guide](/e:/AI%20Adventure%20Academy/docs/deployment-guide.md)
- [Deployment Env Checklist](/e:/AI%20Adventure%20Academy/docs/deployment-env-checklist.md)
- [Portfolio Summary](/e:/AI%20Adventure%20Academy/docs/portfolio-summary.md)
- [GitHub Copy Pack](/e:/AI%20Adventure%20Academy/docs/github-copy.md)
- [Release Notes v1.0.0](/e:/AI%20Adventure%20Academy/docs/release-notes-v1.0.0.md)
- [Contributing Guide](/e:/AI%20Adventure%20Academy/CONTRIBUTING.md)

## Production Notes

- ใช้ SQLite เพื่อเริ่มต้นได้ง่าย เหมาะกับ portfolio, demo, school project และการแข่งขัน
- สามารถแทน game evaluation logic ด้วย OpenAI, image generation API หรือ moderation API ได้ภายหลัง
- Backend มี route สำหรับ export รายงาน Excel และเตรียม handler สำหรับ serverless deployment

## Suggested Next Steps

1. เชื่อมต่อ AI API จริงสำหรับสร้างภาพและช่วยประเมินคำตอบ
2. เพิ่มระบบเสียงประกอบจริงด้วย Web Audio หรือ asset MP3
3. เพิ่ม analytics รายด่านและระบบ Daily Challenge แบบหมุนโจทย์จากฐานข้อมูล
4. เพิ่ม test suite สำหรับ backend routes และ frontend flows
