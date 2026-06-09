import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../lib/api";
import { CelebrationState, EvaluationResult, Mission, Player } from "../types";

interface MissionDetailPageProps {
  missions: Mission[];
  player: Player | null;
  onCommitProgress: (payload: { missionId: string; score: number; completed: boolean; xpEarned: number; coinsEarned: number }) => Promise<void>;
  onCelebrate: (payload: CelebrationState | null) => void;
}

export function MissionDetailPage({ missions, player, onCommitProgress, onCelebrate }: MissionDetailPageProps) {
  const { missionId } = useParams();
  const mission = useMemo(() => missions.find((item) => item.id === missionId), [missions, missionId]);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const promptHints = getPromptHints(mission?.category);

  if (!mission) {
    return (
      <div className="card p-8">
        <p className="text-slate-300">ไม่พบภารกิจนี้</p>
        <Link to="/missions" className="button-secondary mt-4 inline-flex">
          กลับไปหน้าด่าน
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="card p-6">
        <div className="text-xs uppercase tracking-[0.2em] text-cyan-200">
          Level {mission.level} • {mission.category}
        </div>
        <h1 className="mt-2 text-3xl font-bold text-white">{mission.title}</h1>
        <p className="mt-3 text-slate-300">{mission.description}</p>
        <div className="mt-6 rounded-3xl bg-slate-950/60 p-5">
          <div className="text-sm font-semibold text-amber-200">โจทย์ภารกิจ</div>
          <p className="mt-2 text-lg text-white">{mission.prompt}</p>
          <p className="mt-3 text-sm text-slate-400">{mission.objective}</p>
        </div>
        {!player && (
          <div className="mt-4 rounded-2xl bg-amber-500/10 p-4 text-amber-100">
            แนะนำให้สร้าง Guest Profile ก่อน เพื่อบันทึกคะแนนและความคืบหน้า
          </div>
        )}
      </section>

      <section className="card p-6">
        <h2 className="text-2xl font-bold text-white">ลองตอบภารกิจ</h2>
        <p className="mt-2 text-slate-300">พิมพ์ prompt หรือคำอธิบายคำตอบของคุณ ระบบจะให้คะแนนและอธิบายสิ่งที่ควรปรับปรุง</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {promptHints.map((hint) => (
            <span key={hint} className="rounded-full bg-white/5 px-3 py-2 text-sm text-cyan-100">
              {hint}
            </span>
          ))}
        </div>
        <textarea
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          rows={9}
          className="mt-4 w-full rounded-3xl border border-white/10 bg-slate-950/90 p-4 text-white outline-none placeholder:text-slate-500"
          placeholder="เช่น A friendly robot student in a bright futuristic classroom, colorful illustration..."
        />
        <button
          className="button-primary mt-4"
          disabled={submitting || !answer.trim()}
          onClick={async () => {
            setSubmitting(true);
            try {
              const evaluation = await api.evaluateMission(mission.id, answer);
              setResult(evaluation);
              if (player) {
                await onCommitProgress({
                  missionId: mission.id,
                  score: evaluation.score,
                  completed: evaluation.completed,
                  xpEarned: evaluation.xpEarned,
                  coinsEarned: evaluation.coinsEarned
                });
              }
              if (evaluation.completed) {
                onCelebrate({
                  missionTitle: mission.title,
                  score: evaluation.score,
                  xpEarned: evaluation.xpEarned,
                  coinsEarned: evaluation.coinsEarned
                });
              }
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {submitting ? "กำลังประเมิน..." : "ส่งคำตอบ"}
        </button>

        {result && (
          <div className="mt-5 rounded-3xl border border-emerald-300/20 bg-emerald-400/10 p-5">
            <div className="text-sm uppercase tracking-[0.2em] text-emerald-200">Mission Result</div>
            <div className="mt-2 text-4xl font-bold text-white">{result.score}/100</div>
            <p className="mt-2 text-emerald-100">{result.feedback}</p>
            <p className="mt-3 text-slate-200">AI Hint: {result.explanation}</p>
            <div className="mt-4 text-sm text-amber-100">
              ได้รับ {result.xpEarned} XP และ {result.coinsEarned} Coins
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function getPromptHints(category?: Mission["category"]) {
  switch (category) {
    case "image":
      return ["ใส่ตัวละคร", "บอกฉาก", "เพิ่มอารมณ์", "ระบุสไตล์ภาพ"];
    case "chat":
      return ["บอกบริบท", "ถามเป็นข้อ", "ขอตัวอย่าง", "ขอสรุปท้ายคำตอบ"];
    case "problem":
      return ["ระบุเงื่อนไข", "คิดเรื่องเวลา", "คิดเรื่องความยุติธรรม", "ขอขั้นตอนชัดเจน"];
    case "ethics":
      return ["เช็กแหล่งข้อมูล", "ระวังข้อมูลส่วนตัว", "ไม่รีบแชร์", "คิดผลกระทบ"];
    default:
      return ["สังเกตรายละเอียด", "ให้เหตุผล", "เปรียบเทียบหลายมุม"];
  }
}
