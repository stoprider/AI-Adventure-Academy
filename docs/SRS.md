# Software Requirements Specification (SRS)

## 1. Introduction

### 1.1 Purpose
เอกสารนี้กำหนดความต้องการของระบบ AI Adventure Academy ซึ่งเป็นเกมการศึกษาเกี่ยวกับ AI สำหรับนักเรียนระดับมัธยมต้น เพื่อใช้เป็นแนวทางในการออกแบบ พัฒนา ทดสอบ และส่งมอบระบบ

### 1.2 Scope
ระบบจะช่วยให้นักเรียนเรียนรู้แนวคิดพื้นฐานของ AI ผ่านภารกิจเชิงเกม เช่น การเขียน prompt, การตัดสินว่า AI หรือมนุษย์สร้าง, การใช้ AI ช่วยแก้ปัญหา และการใช้ AI อย่างรับผิดชอบ โดยรองรับผู้เล่นแบบ Guest Mode และมีหน้าผู้ดูแลสำหรับดูสถิติ

### 1.3 Target Users

- นักเรียนอายุ 12-15 ปีที่ไม่มีพื้นฐาน AI
- ครูหรือผู้ปกครองที่ใช้ระบบประกอบกิจกรรม
- ผู้ดูแลระบบที่ต้องการดูข้อมูลสรุปและ export รายงาน

## 2. Overall Description

### 2.1 Product Perspective
ระบบเป็น Web Application แบบ full-stack ใช้งานผ่านเบราว์เซอร์ รองรับอุปกรณ์หลายขนาด และสามารถ deploy แบบ frontend static + backend serverless หรือ Express service ได้

### 2.2 Product Functions

- สร้างโปรไฟล์ผู้เล่นแบบ Guest Mode
- แสดงด่านและภารกิจตามระดับ
- ประเมินคำตอบของผู้เล่นในภารกิจต่าง ๆ
- บันทึกคะแนน XP เหรียญ และความคืบหน้า
- แสดง Daily Challenge และระบบ gamification
- แสดงสถิติในหน้า admin และ export Excel

### 2.3 Constraints

- ผู้เล่นไม่ต้องสมัครสมาชิก
- ต้องใช้ SQLite เป็นฐานข้อมูลเริ่มต้น
- ต้องอ่านง่าย สีสันสดใส และใช้งานง่ายสำหรับเด็ก
- ต้องรองรับการต่อยอดในอนาคต เช่น เชื่อม AI API จริง

## 3. Functional Requirements

### FR-01 Guest Mode
ระบบต้องให้ผู้เล่นเริ่มเกมได้โดยใส่เพียงชื่อเล่น

### FR-02 Mission Listing
ระบบต้องแสดงรายการด่านพร้อมชื่อ คำอธิบาย ระดับ และรางวัล

### FR-03 Mission Evaluation
ระบบต้องรับคำตอบจากผู้เล่นและประเมินคะแนนพร้อม feedback

### FR-04 Progress Tracking
ระบบต้องบันทึกคะแนนของแต่ละด่านและสถานะ completed

### FR-05 Gamification
ระบบต้องรองรับ XP, level, coins, achievements, daily challenge และ badge collection

### FR-06 AI Image Challenge
ระบบต้องมีด่านที่ให้ผู้เล่นพิมพ์ prompt สำหรับสร้างภาพและอธิบายผลของ prompt ต่อผลลัพธ์

### FR-07 AI Chat Assistant Quest
ระบบต้องมีด่านที่ฝึกถาม AI อย่างเหมาะสม

### FR-08 Detect AI or Human
ระบบต้องมีเกมให้ผู้เล่นตัดสินว่าภาพหรือข้อความสร้างโดย AI หรือมนุษย์ พร้อมเฉลย

### FR-09 AI Problem Solver
ระบบต้องมีสถานการณ์จำลองที่ AI ใช้ช่วยคิดวางแผน

### FR-10 AI Ethics Mini Game
ระบบต้องครอบคลุม Fake News, Copyright, Privacy, Hallucination และ Cyber Safety

### FR-11 Admin Dashboard
ระบบต้องให้ผู้ดูแลดูจำนวนผู้เล่น คะแนนเฉลี่ย ด่านที่ผ่านมากที่สุด และด่านที่ติดมากที่สุด

### FR-12 Export Report
ระบบต้อง export ข้อมูลออกเป็นไฟล์ Excel ได้

## 4. Non-Functional Requirements

### NFR-01 Performance
หน้าเว็บหลักควรตอบสนองภายใน 3 วินาทีในสภาพแวดล้อมปกติ

### NFR-02 Usability
ปุ่มต้องมีขนาดใหญ่ ตัวอักษรอ่านง่าย และ flow ต้องไม่ซับซ้อน

### NFR-03 Responsiveness
ต้องรองรับมือถือ แท็บเล็ต และเดสก์ท็อป

### NFR-04 Maintainability
ต้องแยก frontend, backend, docs และ data ชัดเจน

### NFR-05 Scalability
logic ประเมินผลและฐานข้อมูลต้องสามารถเปลี่ยนไปใช้ external AI service หรือ database อื่นในอนาคตได้

## 5. Acceptance Criteria

- ผู้เล่นใหม่สามารถเริ่มเล่นได้ภายใน 1 นาที
- ผู้เล่นสามารถส่งคำตอบภารกิจและเห็นคะแนนได้ทันที
- ผู้ดูแลสามารถดู dashboard และ export รายงานได้
- ระบบทำงานได้บน localhost และพร้อม deploy ได้จริง
