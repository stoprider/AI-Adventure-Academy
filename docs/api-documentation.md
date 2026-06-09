# API Documentation

Base URL:

```text
http://localhost:4000/api
```

## Health

### GET `/health`

Response:

```json
{
  "status": "ok",
  "service": "ai-adventure-academy-api"
}
```

## Game

### GET `/game/missions`
ดึงรายการด่านทั้งหมด

### GET `/game/daily-challenge`
ดึงด่านประจำวัน

### GET `/game/detect-samples`
ดึงตัวอย่างสำหรับเกม Detect AI or Human

### POST `/game/evaluate`
ประเมินคำตอบผู้เล่น

Request:

```json
{
  "missionId": "lvl3-space-cat",
  "answer": "A cute space cat astronaut floating near Saturn"
}
```

Response:

```json
{
  "score": 88,
  "matchedKeywords": ["cat", "space", "astronaut"],
  "feedback": "ยอดเยี่ยมมาก Prompt นี้ชัดเจนและมีรายละเอียดดี",
  "completed": true,
  "xpEarned": 30,
  "coinsEarned": 20,
  "explanation": "เมื่อเราเพิ่มรายละเอียด AI จะเข้าใจทิศทางของภาพได้ดีขึ้น"
}
```

## Players

### POST `/players`
สร้าง guest player

Request:

```json
{
  "nickname": "NovaKid"
}
```

### GET `/players/:id`
ดึงข้อมูลผู้เล่นและ progress

### POST `/players/:id/progress`
บันทึกผลลัพธ์หลังจบภารกิจ

Request:

```json
{
  "missionId": "lvl3-space-cat",
  "score": 88,
  "completed": true,
  "xpEarned": 30,
  "coinsEarned": 20
}
```

## Admin

### GET `/admin/stats`
ดึงข้อมูล dashboard และรายการผู้เล่น

### GET `/admin/export`
ดาวน์โหลดรายงาน Excel
