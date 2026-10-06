# OpenAI API Integration Guide

เอกสารนี้อธิบายวิธีการเชื่อมต่อ OpenAI API เพื่อให้ AI Adventure Academy สามารถพูดภาษาอีสานจริง ๆ และให้คำปรึกษาผู้เรียนแบบเป็นตัวจริง

## ขั้นที่ 1: ตั้งค่า Environment Variables

สร้างไฟล์ `.env.local` ในโฟลเดอร์ `backend/`:

```env
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxx
OPENAI_MODEL=gpt-4o-mini  # หรือ gpt-3.5-turbo สำหรับราคาประหยัด
ENABLE_AI_API=true
```

## ขั้นที่ 2: ติดตั้ง OpenAI SDK

```bash
cd backend
npm install openai dotenv
```

อัปเดต `backend/package.json`:
```json
{
  "dependencies": {
    "openai": "^4.52.0",
    "dotenv": "^16.4.4"
  }
}
```

## ขั้นที่ 3: สร้าง AI Service

สร้างไฟล์ `backend/src/services/aiService.ts`:

```typescript
import OpenAI from "openai";
import { ENABLE_AI_API } from "../config.js";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface AiChatOptions {
  language?: "thai" | "isan"; // "isan" for Isan dialect
  studentLevel?: number; // 1-7
  context?: string; // Mission or topic context
}

/**
 * Send a message to OpenAI GPT and get a response in Thai/Isan
 */
export async function chatWithAI(
  userMessage: string,
  options: AiChatOptions = {}
) {
  if (!ENABLE_AI_API) {
    throw new Error("AI API is not enabled");
  }

  const { language = "isan", studentLevel = 1, context = "" } = options;

  // System prompt tailored for Isan students (ages 12-15)
  const systemPrompt = buildSystemPrompt(language, studentLevel, context);

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply =
      response.choices[0]?.message?.content || "ไม่ได้รับการตอบกลับ";

    return {
      reply,
      usage: {
        promptTokens: response.usage?.prompt_tokens || 0,
        completionTokens: response.usage?.completion_tokens || 0,
      },
    };
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error(
      `Failed to get AI response: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Evaluate a student's answer using AI (more sophisticated than keyword matching)
 */
export async function evaluateAnswerWithAI(
  missionId: string,
  studentAnswer: string,
  rubric: string,
  language: "thai" | "isan" = "isan"
) {
  if (!ENABLE_AI_API) {
    throw new Error("AI API is not enabled");
  }

  const systemPrompt = `คุณเป็นครูประเมินผลที่เป็นกลาง ให้คะแนนตามเกณฑ์ด้านล่าง
ตอบเป็นข้อมูล JSON ในรูปแบบนี้:
{
  "score": <0-100>,
  "feedback": "<ข้อเสนอแนะในภาษา${language === "isan" ? "อีสาน" : "ไทย"}>",
  "strengths": ["<จุดแข็ง>"],
  "improvements": ["<จุดปรับปรุง>"]
}`;

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: `เกณฑ์การประเมิน:\n${rubric}\n\nคำตอบของนักเรียน:\n${studentAnswer}`,
        },
      ],
      temperature: 0.5, // Lower temperature for consistent grading
      max_tokens: 300,
    });

    const responseText =
      response.choices[0]?.message?.content || "{}";

    // Parse JSON response
    const result = JSON.parse(responseText);
    return {
      score: Math.round(result.score || 0),
      feedback: result.feedback || "ไม่ได้รับคำติชม",
      strengths: result.strengths || [],
      improvements: result.improvements || [],
    };
  } catch (error) {
    console.error("AI evaluation error:", error);
    throw new Error(
      `Failed to evaluate answer: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Generate personalized hints for a student stuck on a mission
 */
export async function generateHintWithAI(
  missionId: string,
  missionDescription: string,
  studentLevel: number,
  language: "thai" | "isan" = "isan"
) {
  if (!ENABLE_AI_API) {
    throw new Error("AI API is not enabled");
  }

  const systemPrompt = `คุณเป็นครูชี้แนว ให้คำแนะนำแบบค่อย ๆ ไม่ใหญ่เกินไป
สำหรับนักเรียนระดับ ${studentLevel} (อายุ 12-15 ปี)
ตอบในภาษา${language === "isan" ? "อีสาน" : "ไทย"} ที่เข้าใจง่าย`;

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: `ภารกิจ: ${missionDescription}\n\nช่วยให้คำแนะนำ (ไม่ใช่คำตอบ)`,
        },
      ],
      temperature: 0.6,
      max_tokens: 200,
    });

    return (
      response.choices[0]?.message?.content || "ลองนึกถึงข้อมูลที่เรียนไปก่อน"
    );
  } catch (error) {
    console.error("Hint generation error:", error);
    return "ขออภัย อยากคิดซ่ำนิดนึง";
  }
}

/**
 * Build system prompt adapted to language and student level
 */
function buildSystemPrompt(
  language: "thai" | "isan",
  studentLevel: number,
  context: string
): string {
  const languageNote =
    language === "isan"
      ? `\nใช้ภาษาอีสาน ที่เข้าใจง่าย อย่างไม่เป็นทางการ เหมาะกับเด็ก 12-15 ปี\nตัวอย่าง: "เด็ก" แทน "บุคคล", "บ้านต่อ" หรือ "ก็ไป" แทน "ระหว่างนั้น"\nแต่ก็ยังต้องให้ข้อมูลถูกต้องและสมเหตุสมผล`
      : `\nใช้ภาษาไทยที่เข้าใจง่าย อย่างไม่เป็นทางการ เหมาะกับเด็ก 12-15 ปี`;

  return `คุณเป็นครู AI ที่เป็นมิตรและชอบช่วย AI Adventure Academy${languageNote}

ช่วยให้ความรู้เกี่ยวกับ AI โดยตั้งสมมติฐานว่าเด็กเพิ่งเริ่มเรียน
- อธิบายแนวคิดตามระดับ (ระดับ ${studentLevel}/7)
- ให้ตัวอย่างในชีวิตจริงที่เกี่ยวข้อง
- เขียนสั้น ชัด เข้าใจง่าย
- ถ้าเด็กสับสน ให้ถามคำถามกลับเพื่อเข้าใจมากขึ้น
${context ? `\nบริบทปัจจุบัน: ${context}` : ""}`;
}
```

## ขั้นที่ 4: ปรับปรุง Config

อัปเดต `backend/src/config.ts`:

```typescript
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export const ENABLE_AI_API = process.env.ENABLE_AI_API === "true";
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

// Validate API key when AI is enabled
if (ENABLE_AI_API && !OPENAI_API_KEY) {
  console.warn(
    "⚠️  AI API enabled but OPENAI_API_KEY not found in environment"
  );
}

// ... existing config
```

## ขั้นที่ 5: สร้าง Routes เพื่อเรียกใช้ AI

สร้างหรือปรับปรุง `backend/src/routes/ai.ts`:

```typescript
import { Router } from "express";
import {
  chatWithAI,
  evaluateAnswerWithAI,
  generateHintWithAI,
} from "../services/aiService.js";
import { db } from "../db/database.js";

export const aiRouter = Router();

/**
 * POST /api/ai/chat
 * สำหรับคุยกับ AI ทั่วไป
 */
aiRouter.post("/chat", async (req, res) => {
  try {
    const { message, missionId, playerLevel, language = "isan" } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Missing message" });
    }

    // Get mission context if provided
    let context = "";
    if (missionId) {
      const missions = await import("../data/missions.js");
      const mission = missions.missions.find((m) => m.id === missionId);
      context = mission
        ? `Mission: ${mission.title} - ${mission.description}`
        : "";
    }

    const result = await chatWithAI(message, {
      language,
      studentLevel: playerLevel || 1,
      context,
    });

    res.json({
      reply: result.reply,
      usage: result.usage,
    });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({
      error:
        error instanceof Error ? error.message : "Failed to process chat",
    });
  }
});

/**
 * POST /api/ai/evaluate
 * ประเมินคำตอบของนักเรียน
 */
aiRouter.post("/evaluate", async (req, res) => {
  try {
    const { missionId, answer, language = "isan" } = req.body;

    if (!missionId || !answer) {
      return res.status(400).json({ error: "Missing missionId or answer" });
    }

    // Get mission rubric
    const missions = await import("../data/missions.js");
    const mission = missions.missions.find((m) => m.id === missionId);

    if (!mission) {
      return res.status(404).json({ error: "Mission not found" });
    }

    const rubric = `
ภารกิจ: ${mission.title}
เป้าหมาย: ${mission.objective}
คำสำคัญที่คาดหวัง: ${mission.answer_key.join(", ")}
คำอธิบาย: ${mission.explanation}
    `;

    const evaluation = await evaluateAnswerWithAI(
      missionId,
      answer,
      rubric,
      language
    );

    res.json({
      ...evaluation,
      completed: evaluation.score >= 60,
    });
  } catch (error) {
    console.error("Evaluation error:", error);
    res.status(500).json({
      error:
        error instanceof Error ? error.message : "Failed to evaluate answer",
    });
  }
});

/**
 * GET /api/ai/hint/:missionId
 * สำหรับเด็กที่ติดขัด
 */
aiRouter.get("/hint/:missionId", async (req, res) => {
  try {
    const { missionId } = req.params;
    const { playerLevel = 1, language = "isan" } = req.query;

    const missions = await import("../data/missions.js");
    const mission = missions.missions.find((m) => m.id === missionId);

    if (!mission) {
      return res.status(404).json({ error: "Mission not found" });
    }

    const hint = await generateHintWithAI(
      missionId,
      mission.description,
      Number(playerLevel),
      language as "thai" | "isan"
    );

    res.json({ hint });
  } catch (error) {
    console.error("Hint error:", error);
    res.status(500).json({
      error:
        error instanceof Error ? error.message : "Failed to generate hint",
    });
  }
});
```

## ขั้นที่ 6: เพิ่ม Route ลงใน App

อัปเดต `backend/src/app.ts`:

```typescript
import { aiRouter } from "./routes/ai.js";

// ... existing setup

app.use("/api/ai", aiRouter);

// ... rest of app
```

## ขั้นที่ 7: ทดสอบ

```bash
# Start backend
npm --workspace backend run dev

# Test chat endpoint
curl -X POST http://localhost:4000/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "AI คืออะไร",
    "playerLevel": 1,
    "language": "isan"
  }'

# Test evaluation
curl -X POST http://localhost:4000/api/ai/evaluate \
  -H "Content-Type: application/json" \
  -d '{
    "missionId": "lvl1-ai-basics",
    "answer": "AI เป็นเครื่องมือที่ช่วยคนคิดและวิเคราะห์ มนุษย์ต้องกำหนดทิศทาง",
    "language": "isan"
  }'

# Test hint
curl http://localhost:4000/api/ai/hint/lvl1-ai-basics?playerLevel=1&language=isan
```

## ขั้นที่ 8: อัปเดต Frontend (ถ้าต้องการ)

หากอยากให้นักเรียนใช้ AI chat โดยตรง ให้สร้าง component เช่น `AIChatBox.tsx`:

```typescript
import { useState } from "react";

export function AIChatBox({ missionId, playerLevel, language = "isan" }) {
  const [messages, setMessages] = useState<
    Array<{ role: "user" | "ai"; content: string }>
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          missionId,
          playerLevel,
          language,
        }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "ai", content: data.reply }]);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="h-64 overflow-y-auto space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded ${
              msg.role === "user"
                ? "bg-blue-500 text-white ml-auto max-w-xs"
                : "bg-gray-200 text-black max-w-xs"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="ถาม AI ตรงนี้..."
        disabled={loading}
        className="w-full p-2 border rounded"
      />
      <button
        onClick={sendMessage}
        disabled={loading}
        className="bg-blue-600 text-white p-2 rounded disabled:opacity-50"
      >
        {loading ? "กำลังคิด..." : "ส่ง"}
      </button>
    </div>
  );
}
```

## ✅ การตรวจสอบ

- ✅ AI ตอบภาษาอีสานจริง ๆ แบบเข้าใจง่าย
- ✅ ประเมินคำตอบแบบเพิ่มเติม ไม่ใช่แค่ keyword matching
- ✅ ให้คำแนะนำที่เหมาะกับระดับ
- ✅ เก็บ API cost ด้วยการใช้ `max_tokens` และ `gpt-4o-mini`
- ✅ ตัวหลัง ยังสามารถแสดงผลโดยไม่อาศัย AI ได้ (keyword matching ตามเดิม)

## 💡 ปรับปรุงเพิ่มเติม

1. **เก็บ conversation history**: ให้ AI จำสำหรับเด็กแต่ละคน
2. **Caching**: เก็บคำตอบบ่อยไว้ไม่ต้องเรียก API ทุกครั้ง
3. **Error handling**: ถ้า API ล่มให้กลับมาใช้ keyword matching
4. **Rate limiting**: จำกัดจำนวนครั้งที่เรียก OpenAI ต่อนักเรียน
5. **สำหรับ Isan dialects**: ระบุให้ AI รู้ว่าให้ตอบแบบอีสานแท้ บ่มือเป็นไทยมาตรฐาน

