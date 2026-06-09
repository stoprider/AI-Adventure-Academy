import { Mission } from "../types.js";

export const missions: Mission[] = [
  {
    id: "lvl1-ai-basics",
    title: "AI คือเพื่อนผู้ช่วยแบบไหน",
    level: 1,
    category: "chat",
    prompt: "ชาวเมืองสงสัยว่า AI คืออะไร",
    description: "เลือกวิธีอธิบาย AI ให้เพื่อนเข้าใจแบบง่ายที่สุด",
    objective: "อธิบายว่า AI เป็นเครื่องมือที่ช่วยคิด ช่วยวิเคราะห์ และต้องมีคนใช้อย่างรับผิดชอบ",
    answer_key: ["ช่วย", "เรียนรู้", "มนุษย์"],
    explanation: "AI ไม่ได้คิดแทนคนทั้งหมด แต่ช่วยงานที่มีรูปแบบหรือข้อมูลจำนวนมากได้ดี",
    xp_reward: 20,
    coin_reward: 10
  },
  {
    id: "lvl2-prompt-basics",
    title: "คำสั่งชัด ภาพชัด",
    level: 2,
    category: "chat",
    prompt: "ช่วย NPC เขียน prompt ให้ชัดเจนขึ้น",
    description: "เรียนรู้ว่าคำอธิบายที่เจาะจงทำให้ผลลัพธ์ดีขึ้น",
    objective: "เลือก prompt ที่มีตัวละคร สถานที่ และสไตล์ครบ",
    answer_key: ["ตัวละคร", "สถานที่", "สไตล์"],
    explanation: "Prompt ที่ดีควรบอกให้ครบว่าอยากได้อะไร อยู่ที่ไหน และบรรยากาศแบบไหน",
    xp_reward: 25,
    coin_reward: 10
  },
  {
    id: "lvl3-space-cat",
    title: "สร้างแมวอวกาศ",
    level: 3,
    category: "image",
    prompt: "สร้างแมวอวกาศ",
    description: "พิมพ์ prompt ให้ระบบสร้างภาพแมวอวกาศดูน่าสนใจ",
    objective: "ใส่คำสำคัญเกี่ยวกับแมว อวกาศ ชุดนักบิน หรือดาวเคราะห์",
    answer_key: ["cat", "space", "astronaut", "planet", "galaxy", "แมว", "อวกาศ"],
    explanation: "เมื่อเราเพิ่มรายละเอียด AI จะเข้าใจทิศทางของภาพได้ดีขึ้น",
    xp_reward: 30,
    coin_reward: 20
  },
  {
    id: "lvl3-robot-student",
    title: "หุ่นยนต์นักเรียน",
    level: 3,
    category: "image",
    prompt: "สร้างหุ่นยนต์นักเรียน",
    description: "ออกแบบ prompt สำหรับหุ่นยนต์ที่ดูเป็นมิตรและพร้อมเรียนรู้",
    objective: "ใส่คำเกี่ยวกับ robot, student, classroom, friendly",
    answer_key: ["robot", "student", "classroom", "friendly", "หุ่นยนต์", "นักเรียน"],
    explanation: "คำคุณศัพท์อย่าง friendly หรือ colorful ช่วยกำหนดอารมณ์ของภาพ",
    xp_reward: 30,
    coin_reward: 20
  },
  {
    id: "lvl4-chat-quest",
    title: "คุยกับครูหุ่นยนต์",
    level: 4,
    category: "chat",
    prompt: "ถามคำถามให้ได้ข้อมูลที่นำไปใช้แก้ภารกิจได้จริง",
    description: "เรียนรู้การถาม AI แบบมีเป้าหมาย",
    objective: "ถามเป็นข้อ ๆ ระบุบริบทและสิ่งที่ต้องการ",
    answer_key: ["ขั้นตอน", "ตัวอย่าง", "สรุป", "บริบท"],
    explanation: "Prompt engineering คือการออกแบบคำถามให้ AI ตอบตรงจุดมากขึ้น",
    xp_reward: 35,
    coin_reward: 20
  },
  {
    id: "lvl5-exam-seating",
    title: "จัดโต๊ะสอบ 500 คน",
    level: 5,
    category: "problem",
    prompt: "โรงเรียนมีนักเรียน 500 คน ต้องจัดโต๊ะสอบอย่างยุติธรรมและรวดเร็ว",
    description: "เลือกแนวทางแก้ปัญหาที่ AI ช่วยเสนอได้ดีที่สุด",
    objective: "คำนึงถึงจำนวนห้อง ความจุ ความยุติธรรม และการลดเวลาทำงานครู",
    answer_key: ["capacity", "fairness", "rooms", "schedule"],
    explanation: "AI เหมาะกับงานวางแผนเมื่อมีเงื่อนไขหลายอย่างและข้อมูลจำนวนมาก",
    xp_reward: 40,
    coin_reward: 25
  },
  {
    id: "lvl6-ethics-fakenews",
    title: "ข่าวจริงหรือข่าวปลอม",
    level: 6,
    category: "ethics",
    prompt: "เจอข่าวจาก AI ต้องทำอย่างไร",
    description: "เลือกพฤติกรรมที่ปลอดภัยก่อนแชร์ต่อ",
    objective: "ตรวจแหล่งที่มา เช็กหลายแหล่ง และไม่รีบแชร์",
    answer_key: ["ตรวจ", "แหล่งที่มา", "หลายแหล่ง", "ไม่แชร์ทันที"],
    explanation: "AI อาจสร้างข้อมูลผิดได้ เราต้องตรวจสอบเสมอ",
    xp_reward: 45,
    coin_reward: 30
  },
  {
    id: "lvl7-master-explorer",
    title: "AI Master Explorer",
    level: 7,
    category: "detect",
    prompt: "แยกให้ออกว่าสิ่งไหนสร้างโดย AI หรือมนุษย์",
    description: "ใช้เหตุผลจากรายละเอียด ความสมจริง และแหล่งที่มา",
    objective: "สังเกตความผิดปกติและอธิบายเหตุผลในการตัดสินใจ",
    answer_key: ["รายละเอียด", "เหตุผล", "ความสมจริง"],
    explanation: "การคิดอย่างมีวิจารณญาณสำคัญกว่าการเดาให้ถูกอย่างเดียว",
    xp_reward: 50,
    coin_reward: 35
  }
];
