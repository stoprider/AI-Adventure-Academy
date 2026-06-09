import { CelebrationState } from "../types";

export function CelebrationOverlay({
  celebration,
  onClose
}: {
  celebration: CelebrationState | null;
  onClose: () => void;
}) {
  if (!celebration) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/55 px-4 backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 18 }, (_, index) => (
          <span
            key={index}
            className="absolute h-3 w-3 animate-bounce rounded-full"
            style={{
              left: `${8 + (index % 6) * 15}%`,
              top: `${10 + Math.floor(index / 6) * 18}%`,
              background: index % 3 === 0 ? "#67e8f9" : index % 3 === 1 ? "#fb923c" : "#f9a8d4",
              animationDuration: `${0.8 + (index % 4) * 0.16}s`
            }}
          />
        ))}
      </div>

      <section className="surface-elevated relative w-full max-w-lg rounded-[2rem] border border-amber-300/30 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.22),transparent_35%),linear-gradient(180deg,rgba(15,23,42,0.98),rgba(30,41,59,0.98))] p-8 text-center shadow-2xl">
        <div className="mx-auto mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-amber-400/15 text-4xl text-amber-100">
          ★
        </div>
        <div className="text-sm font-bold uppercase tracking-[0.3em] text-amber-200">Mission Complete</div>
        <h2 className="mt-3 text-3xl font-bold text-white">{celebration.missionTitle}</h2>
        <p className="mt-3 text-lg text-slate-200">คะแนน {celebration.score}/100 ผ่านภารกิจสำเร็จแล้ว</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-emerald-400/10 p-4 text-emerald-100">+{celebration.xpEarned} XP</div>
          <div className="rounded-2xl bg-amber-400/10 p-4 text-amber-100">+{celebration.coinsEarned} Coins</div>
        </div>
        <button type="button" onClick={onClose} className="button-primary mt-6 w-full">
          ไปต่อกันเลย
        </button>
      </section>
    </div>
  );
}
