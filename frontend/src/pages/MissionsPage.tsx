import { useEffect, useMemo, useRef, useState } from "react";
import { MissionCard } from "../components/MissionCard";
import { Mission, ProgressItem } from "../types";

export function MissionsPage({ missions, progress }: { missions: Mission[]; progress: ProgressItem[] }) {
  const categories = ["all", "chat", "image", "problem", "detect", "ethics"] as const;
  const statusFilters = ["all", "not-started", "in-progress", "completed"] as const;
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number]>("all");
  const [selectedStatus, setSelectedStatus] = useState<(typeof statusFilters)[number]>("all");
  const progressMap = useMemo(() => new Map(progress.map((item) => [item.mission_id, item])), [progress]);
  const missionsGridRef = useRef<HTMLDivElement | null>(null);

  const filteredMissions = useMemo(() => {
    return missions.filter((mission) => {
      const matchCategory = selectedCategory === "all" || mission.category === selectedCategory;
      const missionProgress = progressMap.get(mission.id);
      const matchStatus =
        selectedStatus === "all"
          ? true
          : selectedStatus === "not-started"
            ? !missionProgress
            : selectedStatus === "in-progress"
              ? Boolean(missionProgress && missionProgress.completed === 0)
              : Boolean(missionProgress && missionProgress.completed === 1);

      return matchCategory && matchStatus;
    });
  }, [missions, progressMap, selectedCategory, selectedStatus]);

  const categoryCounts = useMemo(() => {
    return categories.reduce<Record<string, number>>((acc, category) => {
      acc[category] = category === "all" ? missions.length : missions.filter((mission) => mission.category === category).length;
      return acc;
    }, {});
  }, [categories, missions]);

  const statusCounts = useMemo(() => {
    return statusFilters.reduce<Record<string, number>>((acc, status) => {
      acc[status] = missions.filter((mission) => {
        const missionProgress = progressMap.get(mission.id);
        if (status === "all") return true;
        if (status === "not-started") return !missionProgress;
        if (status === "in-progress") return Boolean(missionProgress && missionProgress.completed === 0);
        return Boolean(missionProgress && missionProgress.completed === 1);
      }).length;
      return acc;
    }, {});
  }, [missions, progressMap, statusFilters]);

  useEffect(() => {
    if (missionsGridRef.current) {
      missionsGridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedCategory, selectedStatus]);

  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold text-white">Mission Hub</h1>
        <p className="text-slate-300">เลือกด่านตามความสนใจ หรือไล่จากเลเวล 1 ถึง 7 เพื่อค่อย ๆ เก่งขึ้นแบบนักสำรวจตัวจริง</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              selectedCategory === category
                ? "border-cyan-300/30 bg-cyan-300 text-slate-950"
                : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
            }`}
          >
            <span>{category === "all" ? "ทุกหมวด" : category}</span>
            <span className="ml-2 rounded-full bg-black/10 px-2 py-0.5 text-xs">{categoryCounts[category]}</span>
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {statusFilters.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setSelectedStatus(status)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              selectedStatus === status
                ? "border-emerald-300/30 bg-emerald-300 text-slate-950"
                : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
            }`}
          >
            <span>{labelStatus(status)}</span>
            <span className="ml-2 rounded-full bg-black/10 px-2 py-0.5 text-xs">{statusCounts[status]}</span>
          </button>
        ))}
      </div>
      <div className="rounded-2xl bg-white/5 px-4 py-3 text-sm text-slate-300">
        แสดง {filteredMissions.length} ด่าน จากหมวด <span className="font-semibold text-white">{selectedCategory === "all" ? "ทั้งหมด" : selectedCategory}</span>
        {" "}และสถานะ <span className="font-semibold text-white">{labelStatus(selectedStatus)}</span>
      </div>
      <div ref={missionsGridRef} className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredMissions.map((mission) => (
          <div
            key={mission.id}
            className={`space-y-2 ${selectedCategory !== "all" || selectedStatus !== "all" ? "animate-pulseRing rounded-[2rem]" : ""}`}
          >
            <div className="flex flex-wrap gap-2 pl-1">
              <MissionStatusBadge progress={progressMap.get(mission.id)} />
            </div>
            <MissionCard mission={mission} />
          </div>
        ))}
      </div>
    </section>
  );
}

function MissionStatusBadge({ progress }: { progress?: ProgressItem }) {
  if (!progress) {
    return <span className="rounded-full bg-slate-700/80 px-3 py-1 text-xs font-semibold text-slate-200">ยังไม่เริ่ม</span>;
  }

  if (progress.completed === 1) {
    return <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-100">ผ่านแล้ว {progress.score} คะแนน</span>;
  }

  return <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-100">กำลังพยายาม {progress.score} คะแนน</span>;
}

function labelStatus(status: "all" | "not-started" | "in-progress" | "completed") {
  switch (status) {
    case "not-started":
      return "ยังไม่เริ่ม";
    case "in-progress":
      return "กำลังพยายาม";
    case "completed":
      return "ผ่านแล้ว";
    default:
      return "ทุกสถานะ";
  }
}
