import { Link } from "react-router-dom";
import { AchievementCabinet } from "../components/AchievementCabinet";
import { HeroPanel } from "../components/HeroPanel";
import { MissionCard } from "../components/MissionCard";
import { StatPill } from "../components/StatPill";
import { DailyChallenge, Mission, OnboardingStep, Player, ProgressItem } from "../types";

interface HomePageProps {
  player: Player | null;
  missions: Mission[];
  progress: ProgressItem[];
  dailyChallenge: DailyChallenge | null;
  onStartGuest: (nickname: string) => Promise<void>;
  showOnboarding: boolean;
  onDismissOnboarding: () => void;
  onboardingStep: OnboardingStep;
  onboardingStepIndex: number;
  onboardingTotalSteps: number;
  onNextOnboarding: () => void;
  onPreviousOnboarding: () => void;
  onFinishOnboarding: () => void;
}

const levelLabels = [
  "Level 1: รู้จัก AI",
  "Level 2: Prompt พื้นฐาน",
  "Level 3: AI สร้างภาพ",
  "Level 4: AI ช่วยคิด",
  "Level 5: AI แก้ปัญหา",
  "Level 6: AI อย่างรับผิดชอบ",
  "Level 7: AI Master Explorer"
];

export function HomePage({
  player,
  missions,
  progress,
  dailyChallenge,
  onStartGuest,
  showOnboarding,
  onDismissOnboarding,
  onboardingStep,
  onboardingStepIndex,
  onboardingTotalSteps,
  onNextOnboarding,
  onPreviousOnboarding,
  onFinishOnboarding
}: HomePageProps) {
  const completedCount = progress.filter((item) => item.completed === 1).length;
  const completionRate = missions.length ? Math.round((completedCount / missions.length) * 100) : 0;
  const achievements = player ? parseAchievements(player.achievements) : [];

  return (
    <div className="space-y-8">
      {showOnboarding && !player && (
        <OnboardingModal
          step={onboardingStep}
          stepIndex={onboardingStepIndex}
          totalSteps={onboardingTotalSteps}
          onDismiss={onDismissOnboarding}
          onNext={onNextOnboarding}
          onPrevious={onPreviousOnboarding}
          onFinish={onFinishOnboarding}
        />
      )}
      <HeroPanel />

      <section id="start" className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="card p-6">
          <h2 className="text-2xl font-bold text-white">เริ่มแบบ Guest Mode</h2>
          <p className="mt-2 text-slate-300">ไม่ต้องสมัครสมาชิก เด็กสามารถเริ่มเล่นได้ทันทีและระบบจะเก็บความคืบหน้าไว้ในเครื่องนี้</p>
          {player ? (
            <div className="mt-4 rounded-2xl bg-emerald-500/10 p-4 text-emerald-200">
              พร้อมลุยแล้ว {player.nickname} ตอนนี้คุณอยู่เลเวล {player.level}
            </div>
          ) : (
            <GuestForm onSubmit={onStartGuest} />
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <StatPill label="Total Levels" value="7" />
          <StatPill label="Completed" value={completedCount} />
          <StatPill label="Game Modes" value="5" />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="card p-6">
          <div className="mb-3 inline-flex rounded-full bg-amber-400/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-amber-100">
            Daily Challenge
          </div>
          {dailyChallenge && (
            <>
              <h2 className="text-2xl font-bold text-white">{dailyChallenge.title}</h2>
              <p className="mt-2 text-slate-300">{dailyChallenge.prompt}</p>
              <p className="mt-3 text-sm text-slate-400">{dailyChallenge.objective}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link to={`/missions/${dailyChallenge.id}`} className="button-primary">
                  เล่นด่านวันนี้
                </Link>
                <div className="rounded-2xl bg-white/5 px-4 py-3 text-sm text-amber-100">
                  Reward: +{dailyChallenge.xp_reward} XP • +{dailyChallenge.coin_reward} Coins
                </div>
              </div>
            </>
          )}
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Explorer Progress</h2>
            <span className="text-sm font-semibold text-cyan-100">{completionRate}% complete</span>
          </div>
          <div className="mt-4 h-4 overflow-hidden rounded-full bg-white/5">
            <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-orange-400" style={{ width: `${completionRate}%` }} />
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {levelLabels.map((label, index) => {
              const unlocked = (player?.level ?? 1) >= index + 1;
              return (
                <div
                  key={label}
                  className={`rounded-2xl border px-4 py-3 text-sm ${
                    unlocked
                      ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-100"
                      : "border-white/10 bg-white/5 text-slate-300"
                  }`}
                >
                  {label}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <AchievementCabinet achievements={achievements} />
        <div className="card p-6">
          <h2 className="text-2xl font-bold text-white">Explorer Snapshot</h2>
          <p className="mt-2 text-slate-300">Track badge unlocks, level growth, and mission completion in one quick glance.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/5 p-4 text-slate-200">Unlocked badges: {achievements.length}</div>
            <div className="rounded-2xl bg-white/5 p-4 text-slate-200">Completed missions: {completedCount}</div>
            <div className="rounded-2xl bg-white/5 p-4 text-slate-200">Current level: {player?.level ?? 1}</div>
            <div className="rounded-2xl bg-white/5 p-4 text-slate-200">XP total: {player?.xp ?? 0}</div>
          </div>
        </div>
      </section>

      <section id="levels" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Adventure Levels</h2>
          <Link to="/missions" className="button-primary">
            ดูทุกด่าน
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {missions.slice(0, 6).map((mission) => (
            <MissionCard key={mission.id} mission={mission} />
          ))}
        </div>
      </section>
    </div>
  );
}

function parseAchievements(raw: string) {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function OnboardingModal({
  step,
  stepIndex,
  totalSteps,
  onDismiss,
  onNext,
  onPrevious,
  onFinish
}: {
  step: OnboardingStep;
  stepIndex: number;
  totalSteps: number;
  onDismiss: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onFinish: () => void;
}) {
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === totalSteps - 1;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur">
      <section className="surface-elevated card relative w-full max-w-3xl overflow-hidden border-cyan-300/20 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.25),transparent_35%),linear-gradient(135deg,rgba(15,23,42,0.96),rgba(30,41,59,0.95))] p-6 md:p-8">
        <button
          type="button"
          onClick={onDismiss}
          className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200"
        >
          ปิด
        </button>

        <div className="mb-3 inline-flex rounded-full bg-cyan-300/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-cyan-100">
          Explorer Onboarding
        </div>
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-white md:text-3xl">{step.title}</h2>
          <div className="text-sm text-cyan-100">
            {stepIndex + 1}/{totalSteps}
          </div>
        </div>

        <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-orange-400"
            style={{ width: `${((stepIndex + 1) / totalSteps) * 100}%` }}
          />
        </div>

        <div key={step.id} className="surface-elevated mt-6 grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] bg-white/5 p-5">
            <p className="text-lg leading-8 text-slate-100">{step.description}</p>
            <div className="mt-4 rounded-2xl bg-amber-400/10 p-4 text-amber-100">
              Mission Tip: {step.tip}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-5">
            <div className="text-xs uppercase tracking-[0.2em] text-cyan-100">สิ่งที่จะได้ในระบบ</div>
            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl bg-emerald-400/10 p-4 text-sm text-emerald-100">Guest mode เริ่มเร็ว</div>
              <div className="rounded-2xl bg-sky-400/10 p-4 text-sm text-sky-100">Feedback ทันทีหลังตอบ</div>
              <div className="rounded-2xl bg-fuchsia-400/10 p-4 text-sm text-fuchsia-100">XP, Levels และ Ethics</div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-between gap-3">
          <div className="flex gap-3">
            <button type="button" onClick={onPrevious} disabled={isFirst} className="button-secondary disabled:opacity-40">
              ย้อนกลับ
            </button>
            {!isLast ? (
              <button type="button" onClick={onNext} className="button-primary">
                ขั้นต่อไป
              </button>
            ) : (
              <button type="button" onClick={onFinish} className="button-primary">
                พร้อมเริ่มภารกิจ
              </button>
            )}
          </div>
          <button type="button" onClick={onDismiss} className="rounded-2xl px-4 py-3 text-sm text-slate-300">
            ข้ามไปก่อน
          </button>
        </div>
      </section>
    </div>
  );
}

function GuestForm({ onSubmit }: { onSubmit: (nickname: string) => Promise<void> }) {
  return (
    <form
      className="mt-4 space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const nickname = String(formData.get("nickname") || "").trim();
        if (nickname) {
          void onSubmit(nickname);
          event.currentTarget.reset();
        }
      }}
    >
      <input
        type="text"
        name="nickname"
        placeholder="ตั้งชื่อนักสำรวจของคุณ"
        className="w-full rounded-2xl border border-white/10 bg-slate-900/90 px-4 py-4 text-white outline-none ring-0 placeholder:text-slate-500"
        maxLength={24}
      />
      <button type="submit" className="button-primary w-full">
        เริ่มผจญภัย
      </button>
    </form>
  );
}
