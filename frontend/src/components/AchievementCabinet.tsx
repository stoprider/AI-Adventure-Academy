const badgeCatalog: Record<
  string,
  { icon: string; tone: string; description: string; border: string; chip: string }
> = {
  "Explorer Start": {
    icon: "🚀",
    tone: "text-cyan-100",
    description: "Awarded after completing the first successful mission.",
    border: "border-cyan-300/20 bg-cyan-400/10",
    chip: "bg-cyan-300/15 text-cyan-100"
  },
  "Prompt Rookie": {
    icon: "✍",
    tone: "text-amber-100",
    description: "Unlocked by scoring strongly in prompt-focused missions.",
    border: "border-amber-300/20 bg-amber-400/10",
    chip: "bg-amber-300/15 text-amber-100"
  },
  "Ethics Guardian": {
    icon: "🛡",
    tone: "text-emerald-100",
    description: "Earned by mastering responsible AI and digital safety choices.",
    border: "border-emerald-300/20 bg-emerald-400/10",
    chip: "bg-emerald-300/15 text-emerald-100"
  },
  "AI Master Explorer": {
    icon: "👑",
    tone: "text-fuchsia-100",
    description: "Reserved for explorers who complete the full learning journey.",
    border: "border-fuchsia-300/20 bg-fuchsia-400/10",
    chip: "bg-fuchsia-300/15 text-fuchsia-100"
  }
};

export function AchievementCabinet({ achievements }: { achievements: string[] }) {
  const badges = achievements.length > 0 ? achievements : ["No badge yet"];

  return (
    <section className="card p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Badge Cabinet</h2>
          <p className="text-sm text-slate-300">Achievements that unlock as the explorer grows.</p>
        </div>
        <div className="rounded-full bg-fuchsia-400/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-100">
          {achievements.length} unlocked
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {badges.map((badge) => (
          <BadgeCard key={badge} badge={badge} />
        ))}
      </div>
    </section>
  );
}

function BadgeCard({ badge }: { badge: string }) {
  if (badge === "No badge yet") {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 px-4 py-5 text-slate-300">
        <div className="text-sm font-semibold">No badge yet</div>
        <div className="mt-2 text-sm text-slate-400">Complete a mission to unlock your first explorer badge.</div>
      </div>
    );
  }

  const meta = badgeCatalog[badge] ?? {
    icon: "★",
    tone: "text-white",
    description: "Special milestone unlocked during play.",
    border: "border-white/10 bg-white/5",
    chip: "bg-white/10 text-white"
  };

  return (
    <div className={`rounded-2xl border px-4 py-5 ${meta.border}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-slate-300">Achievement</div>
          <div className={`mt-2 text-lg font-bold ${meta.tone}`}>{badge}</div>
        </div>
        <div className={`rounded-2xl px-3 py-2 text-2xl ${meta.chip}`}>{meta.icon}</div>
      </div>
      <div className="mt-3 text-sm text-slate-200">{meta.description}</div>
    </div>
  );
}
