# SDLC Documentation

## Methodology
ใช้แนวทาง Agile แบบแบ่ง iteration สั้น ๆ เพราะโปรเจกต์นี้มีทั้งงาน UX เด็ก งานตรรกะเกม และงานเอกสาร จึงเหมาะกับการพัฒนาเป็นรอบและทดสอบกับผู้ใช้เป้าหมายได้ต่อเนื่อง

## 1. Planning

- ระบุกลุ่มเป้าหมาย: นักเรียนอายุ 12-15 ปี
- กำหนดเป้าหมายการเรียนรู้: AI basics, prompt, ethics, problem solving
- เลือก tech stack ที่เบาและ deploy ง่าย
- กำหนดตัวชี้วัดสำเร็จ เช่น จำนวนด่านที่เล่นจบ คะแนนเฉลี่ย และเวลาใช้งาน

## 2. Requirements Analysis

- เก็บ requirement เชิงการสอนและเชิงเกม
- แยก feature เป็น player flow, game logic, admin analytics, deployment
- นิยามข้อมูลหลัก: players, progress, achievements, missions

## 3. System Design

- Frontend SPA ด้วย React + TypeScript + TailwindCSS
- Backend REST API ด้วย Express
- SQLite สำหรับ data persistence
- Rule-based evaluation engine สำหรับ prototype และ demo
- Architecture แบบแยก presentation, service, data access

## 4. Development

- Sprint 1: Project setup และฐานข้อมูล
- Sprint 2: Guest flow, mission listing, mission evaluation
- Sprint 3: Gamification, detect game, ethics content
- Sprint 4: Admin dashboard, export Excel, docs, deployment

## 5. Testing

- Unit test logic ประเมินคะแนนและคำนวณเลเวล
- API test สำหรับ players, missions, admin
- Responsive UI test บน mobile, tablet, desktop
- UAT กับนักเรียนหรือครูเพื่อดูความเข้าใจและความสนุก

## 6. Deployment

- Frontend deploy ไป Vercel หรือ Netlify
- Backend deploy เป็น serverless handler หรือ Node service
- เก็บ environment variables เช่น `VITE_API_URL`, `PORT`, `DB_PATH`

## 7. Maintenance and Future Enhancement

- เชื่อม AI image API จริง
- เพิ่มระบบ leaderboard และ class code
- เพิ่ม content authoring tool สำหรับครู
- ย้าย database ไป PostgreSQL เมื่อมีผู้ใช้จำนวนมาก
