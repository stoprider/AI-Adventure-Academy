import { Link } from "react-router-dom";
import { Mission } from "../types";

export function MissionCard({ mission }: { mission: Mission }) {
  return (
    <article className="card flex h-full flex-col justify-between">
      <div>
        <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
          Level {mission.level} • {mission.category}
        </div>
        <h3 className="text-xl font-bold text-white">{mission.title}</h3>
        <p className="mt-2 text-slate-300">{mission.description}</p>
        <p className="mt-3 text-sm text-slate-400">Objective: {mission.objective}</p>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-amber-200">+{mission.xp_reward} XP • +{mission.coin_reward} Coins</div>
        <Link to={`/missions/${mission.id}`} className="button-secondary">
          เล่นด่านนี้
        </Link>
      </div>
    </article>
  );
}
