import { useEffect, useState } from "react";
import { LeaderboardPanel } from "../components/LeaderboardPanel";
import { api } from "../lib/api";
import { StatPill } from "../components/StatPill";
import { Player } from "../types";

interface AdminResponse {
  stats: {
    totalPlayers: number;
    averageScore: number;
    mostClearedMission: { title?: string; count: number } | null;
    mostStuckMission: { title?: string; count: number } | null;
  };
  players: Player[];
  leaderboard: Player[];
}

export function AdminPage() {
  const [data, setData] = useState<AdminResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void api
      .getAdminStats()
      .then((result) => setData(result as AdminResponse))
      .catch(() => setError("ยังโหลดข้อมูล dashboard ไม่สำเร็จ ลองตรวจ backend หรือ refresh อีกครั้ง"));
  }, []);

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-slate-300">สรุปพฤติกรรมผู้เล่นเบื้องต้นและโหลดรายงาน Excel จาก backend ได้ทันที</p>
        </div>
        <a
          href={`${import.meta.env.VITE_API_URL || "http://localhost:4000/api"}/admin/export`}
          className="button-primary inline-flex"
        >
          Export Excel
        </a>
      </div>

      {error && <div className="rounded-2xl bg-rose-500/10 p-4 text-rose-100">{error}</div>}

      {!data && !error && <div className="card p-6 text-slate-300">กำลังโหลดข้อมูล dashboard...</div>}

      {data && (
        <>
          <div className="grid gap-4 md:grid-cols-4">
            <StatPill label="Players" value={data.stats.totalPlayers} />
            <StatPill label="Average Score" value={data.stats.averageScore} />
            <StatPill label="Most Cleared" value={data.stats.mostClearedMission?.title || "-"} />
            <StatPill label="Most Stuck" value={data.stats.mostStuckMission?.title || "-"} />
          </div>

          <div className="card overflow-x-auto p-0">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-white/5 text-slate-300">
                <tr>
                  <th className="px-4 py-3">Nickname</th>
                  <th className="px-4 py-3">Level</th>
                  <th className="px-4 py-3">XP</th>
                  <th className="px-4 py-3">Coins</th>
                  <th className="px-4 py-3">Created</th>
                </tr>
              </thead>
              <tbody>
                {data.players.map((player) => (
                  <tr key={player.id} className="border-t border-white/5">
                    <td className="px-4 py-3 text-white">{player.nickname}</td>
                    <td className="px-4 py-3 text-slate-300">{player.level}</td>
                    <td className="px-4 py-3 text-slate-300">{player.xp}</td>
                    <td className="px-4 py-3 text-slate-300">{player.coins}</td>
                    <td className="px-4 py-3 text-slate-400">{player.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <LeaderboardPanel players={data.leaderboard} />
        </>
      )}
    </section>
  );
}
