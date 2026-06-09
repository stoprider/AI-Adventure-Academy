# System Architecture Diagram

```mermaid
flowchart TD
  A[Student / Admin Browser] --> B[React + TypeScript + Vite Frontend]
  B --> C[REST API Layer]
  C --> D[Express Application]
  D --> E[Game Engine Service]
  D --> F[Admin Analytics Service]
  D --> G[Player Service]
  G --> H[(SQLite Database)]
  F --> H
  E --> I[Missions Data]
  D --> J[Excel Export Service]
  J --> K[XLSX File Download]
```

## Architecture Notes

- Frontend เป็น Single Page Application
- Backend ใช้ Express และแยก route ตาม domain
- SQLite ใช้สำหรับ prototype และ portfolio-friendly setup
- Game Engine ใช้ rule-based scoring เพื่อให้ demo ทำงานได้จริงโดยไม่พึ่ง external API
- เตรียม `serverless-http` handler สำหรับ deploy แบบ serverless
