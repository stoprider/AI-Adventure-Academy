import { useEffect, useState } from "react";
import { LeaderboardPanel } from "../components/LeaderboardPanel";
import { StatPill } from "../components/StatPill";
import { api } from "../lib/api";
import { DailyChallenge, Player } from "../types";

interface ClassroomData {
  stats: {
    totalPlayers: number;
    averageScore: number;
    mostClearedMission: { title?: string; count: number } | null;
    mostStuckMission: { title?: string; count: number } | null;
  };
  leaderboard: Player[];
}

export function ClassroomDemoPage() {
  const [data, setData] = useState<ClassroomData | null>(null);
  const [challenge, setChallenge] = useState<DailyChallenge | null>(null);

  useEffect(() => {
    void api.getAdminStats().then((result) => setData(result as unknown as ClassroomData));
    void api.getDailyChallenge().then((result) => setChallenge(result.challenge));
  }, []);

  const sections = data ? buildSections(data.leaderboard) : [];
  const distribution = data ? buildDistribution(data.leaderboard) : [];
  const insights = data ? buildInsights(data) : [];

  return (
    <section className="space-y-6">
      <div className="card bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.22),transparent_35%),linear-gradient(135deg,rgba(15,23,42,0.98),rgba(30,41,59,0.94))] p-8">
        <div className="mb-3 inline-flex rounded-full bg-cyan-300/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-cyan-100">
          Classroom Demo
        </div>
        <h1 className="text-4xl font-bold text-white">Teacher and Judge Showcase</h1>
        <p className="mt-3 max-w-3xl text-slate-200">
          A portfolio-friendly screen for presenting class activity, leaderboard momentum, and today's mission in one place.
        </p>
      </div>

      {data && (
        <div className="grid gap-4 md:grid-cols-4">
          <StatPill label="Students" value={data.stats.totalPlayers} />
          <StatPill label="Avg Score" value={data.stats.averageScore} />
          <StatPill label="Top Mission" value={data.stats.mostClearedMission?.title || "-"} />
          <StatPill label="Needs Support" value={data.stats.mostStuckMission?.title || "-"} />
        </div>
      )}

      {challenge && (
        <div className="card p-6">
          <div className="mb-3 inline-flex rounded-full bg-amber-400/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-amber-100">
            Daily Mission Board
          </div>
          <h2 className="text-2xl font-bold text-white">{challenge.title}</h2>
          <p className="mt-2 text-slate-300">{challenge.prompt}</p>
          <p className="mt-2 text-sm text-slate-400">{challenge.objective}</p>
        </div>
      )}

      {sections.length > 0 && (
        <div className="grid gap-4 xl:grid-cols-3">
          {sections.map((section) => (
            <div key={section.title} className="card p-5">
              <div className="text-xs uppercase tracking-[0.2em] text-cyan-100">{section.title}</div>
              <div className="mt-2 text-3xl font-bold text-white">{section.count}</div>
              <div className="mt-1 text-sm text-slate-300">{section.description}</div>
            </div>
          ))}
        </div>
      )}

      {distribution.length > 0 && (
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="card p-6">
            <h2 className="text-2xl font-bold text-white">Progress Distribution</h2>
            <div className="mt-5 space-y-4">
              {distribution.map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between text-sm text-slate-200">
                    <span>{item.label}</span>
                    <span>{item.count} students</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-white/5">
                    <div className={`h-full rounded-full ${item.barClass}`} style={{ width: `${item.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-2xl font-bold text-white">Teacher Insights</h2>
            <div className="mt-4 grid gap-3">
              {insights.map((insight) => (
                <div key={insight.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-sm font-bold text-white">{insight.title}</div>
                  <div className="mt-2 text-sm text-slate-300">{insight.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {data && <LeaderboardPanel players={data.leaderboard} />}
    </section>
  );
}

function buildSections(players: Player[]) {
  return [
    {
      title: "Ready to Mentor",
      count: players.filter((player) => player.level >= 6).length,
      description: "Students ready to help peers with advanced missions."
    },
    {
      title: "Midway Explorers",
      count: players.filter((player) => player.level >= 3 && player.level < 6).length,
      description: "Students building confidence with prompts and problem solving."
    },
    {
      title: "New Recruits",
      count: players.filter((player) => player.level < 3).length,
      description: "Students who may benefit from guided onboarding and first missions."
    }
  ];
}

function buildDistribution(players: Player[]) {
  const total = Math.max(players.length, 1);
  const buckets = [
    {
      label: "Starter Levels 1-2",
      count: players.filter((player) => player.level <= 2).length,
      barClass: "bg-gradient-to-r from-slate-400 to-slate-300"
    },
    {
      label: "Builder Levels 3-4",
      count: players.filter((player) => player.level >= 3 && player.level <= 4).length,
      barClass: "bg-gradient-to-r from-cyan-400 to-sky-400"
    },
    {
      label: "Explorer Levels 5-7",
      count: players.filter((player) => player.level >= 5).length,
      barClass: "bg-gradient-to-r from-amber-400 to-orange-400"
    }
  ];

  return buckets.map((bucket) => ({
    ...bucket,
    percent: Math.max((bucket.count / total) * 100, bucket.count > 0 ? 10 : 0)
  }));
}

function buildInsights(data: ClassroomData) {
  const leader = data.leaderboard[0];

  return [
    {
      title: "Challenge of the day",
      description: `Current strongest mission trend: ${data.stats.mostClearedMission?.title || "No clear leader yet"}.`
    },
    {
      title: "Peer helper candidate",
      description: leader
        ? `${leader.nickname} is leading the room and could demo prompt-writing strategies to classmates.`
        : "No peer helper candidate yet."
    },
    {
      title: "Coaching focus",
      description: data.stats.mostStuckMission?.title
        ? `Consider reteaching ${data.stats.mostStuckMission.title} with guided examples.`
        : "No major stuck mission detected yet, which is a strong sign of healthy pacing."
    }
  ];
}
