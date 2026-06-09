import { Player } from "../types";

export function LeaderboardPanel({ players }: { players: Player[] }) {
  return (
    <section className="card p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-white">Explorer Leaderboard</h2>
          <p className="text-sm text-slate-300">ตัวอย่างการจัดอันดับสำหรับห้องเรียนหรือกิจกรรมแข่งขัน</p>
        </div>
        <div className="rounded-full bg-amber-400/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-amber-100">
          Class Ranking
        </div>
      </div>
      <div className="grid gap-3">
        {players.map((player, index) => (
          <div key={player.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
            <div className="flex items-center gap-4">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                  index === 0
                    ? "bg-amber-400/20 text-amber-100"
                    : index === 1
                      ? "bg-slate-300/20 text-slate-100"
                      : index === 2
                        ? "bg-orange-400/20 text-orange-100"
                        : "bg-cyan-400/10 text-cyan-100"
                }`}
              >
                #{index + 1}
              </div>
              <div>
                <div className="font-semibold text-white">{player.nickname}</div>
                <div className="text-sm text-slate-400">Level {player.level}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-cyan-100">{player.xp} XP</div>
              <div className="text-sm text-slate-400">{player.coins} Coins</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
