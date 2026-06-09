import { useEffect, useState } from "react";
import { api } from "../lib/api";

interface Sample {
  id: string;
  type: string;
  content: string;
  answer: string;
  explanation: string;
}

export function DetectPage() {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [revealed, setRevealed] = useState<Record<string, string>>({});

  useEffect(() => {
    void api.getDetectSamples().then((result) => setSamples(result.samples));
  }, []);

  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold text-white">Detect AI or Human</h1>
        <p className="text-slate-300">สังเกตรายละเอียดแล้วลองเดาว่าตัวอย่างนี้มีแนวโน้มมาจาก AI หรือมนุษย์</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {samples.map((sample) => (
          <div key={sample.id} className="card p-6">
            <p className="text-lg text-white">{sample.content}</p>
            <div className="mt-4 flex gap-3">
              <button className="button-secondary" onClick={() => setRevealed((current) => ({ ...current, [sample.id]: "human" }))}>
                Human
              </button>
              <button className="button-secondary" onClick={() => setRevealed((current) => ({ ...current, [sample.id]: "ai" }))}>
                AI
              </button>
            </div>
            {revealed[sample.id] && (
              <div className="mt-4 rounded-2xl bg-slate-950/70 p-4">
                <div className="font-semibold text-white">
                  {revealed[sample.id] === sample.answer ? "ตอบถูก" : "ลองใหม่ได้"}
                </div>
                <div className="mt-2 text-slate-300">เฉลย: {sample.answer.toUpperCase()}</div>
                <div className="mt-1 text-slate-400">{sample.explanation}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
