import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { CelebrationOverlay } from "./components/CelebrationOverlay";
import { Layout } from "./components/Layout";
import { useAcademy } from "./hooks/useAcademy";
import { AdminPage } from "./pages/AdminPage";
import { ClassroomDemoPage } from "./pages/ClassroomDemoPage";
import { DetectPage } from "./pages/DetectPage";
import { EthicsPage } from "./pages/EthicsPage";
import { HomePage } from "./pages/HomePage";
import { MissionDetailPage } from "./pages/MissionDetailPage";
import { MissionsPage } from "./pages/MissionsPage";
import { CelebrationState, OnboardingStep, ToastMessage } from "./types";

const onboardingSteps: OnboardingStep[] = [
  {
    id: "welcome",
    title: "ยินดีต้อนรับสู่นักสำรวจ AI",
    description: "ที่นี่เด็กจะได้ลองใช้ AI ผ่านภารกิจสั้น ๆ แบบเกมผจญภัย ไม่ต้องกลัวศัพท์ยาก",
    tip: "เริ่มจากด่านง่ายก่อนแล้วค่อยเก็บ XP ไปทีละขั้น"
  },
  {
    id: "play",
    title: "เล่นภารกิจให้เป็น",
    description: "เลือกด่าน พิมพ์คำตอบ หรือเขียน prompt แล้วดู feedback ทันทีว่าควรปรับอะไร",
    tip: "คำตอบที่ชัดขึ้นมักได้คะแนนดีขึ้น"
  },
  {
    id: "grow",
    title: "เก็บ XP และใช้ AI อย่างฉลาด",
    description: "ผ่านด่านเพื่อปลดล็อกเลเวลใหม่ พร้อมฝึกเรื่อง fake news, privacy และการคิดอย่างมีวิจารณญาณ",
    tip: "AI เก่งมาก แต่เรายังต้องตรวจสอบคำตอบเสมอ"
  }
];

export function App() {
  const { player, progress, missions, dailyChallenge, loading, registerGuest, soundEnabled, updateSound, syncProgress } = useAcademy();
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(() => !sessionStorage.getItem("ai-adventure-onboarding-seen"));
  const [onboardingStepIndex, setOnboardingStepIndex] = useState(0);
  const [celebration, setCelebration] = useState<CelebrationState | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const playUiTone = (kind: "open" | "step" | "success") => {
    if (!soundEnabled || typeof window === "undefined") return;
    const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const frequencies = kind === "success" ? [440, 660] : kind === "step" ? [520] : [360];

    oscillator.type = "sine";
    oscillator.frequency.value = frequencies[0];
    oscillator.connect(gain);
    gain.connect(context.destination);
    gain.gain.value = 0.0001;

    const now = context.currentTime;
    gain.gain.exponentialRampToValueAtTime(0.03, now + 0.01);
    if (frequencies[1]) {
      oscillator.frequency.setValueAtTime(frequencies[0], now);
      oscillator.frequency.linearRampToValueAtTime(frequencies[1], now + 0.12);
    }
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
    oscillator.start(now);
    oscillator.stop(now + 0.2);
    void context.close().catch(() => undefined);
  };

  useEffect(() => {
    if (showOnboarding) {
      playUiTone("open");
    }
  }, [showOnboarding]);

  const publishToast = (title: string, description: string) => {
    setToast({ id: Date.now(), title, description });
  };

  const handleRegisterGuest = async (nickname: string) => {
    await registerGuest(nickname);
    publishToast("Explorer Ready", `ยินดีต้อนรับ ${nickname} พร้อมเริ่มภารกิจแรกแล้ว`);
    playUiTone("success");
    setShowOnboarding(false);
    sessionStorage.setItem("ai-adventure-onboarding-seen", "true");
  };

  const handleDismissOnboarding = () => {
    setShowOnboarding(false);
    sessionStorage.setItem("ai-adventure-onboarding-seen", "true");
  };

  const handleNextOnboarding = () => {
    setOnboardingStepIndex((current) => {
      const next = Math.min(current + 1, onboardingSteps.length - 1);
      if (next !== current) playUiTone("step");
      return next;
    });
  };

  const handlePreviousOnboarding = () => {
    setOnboardingStepIndex((current) => {
      const next = Math.max(current - 1, 0);
      if (next !== current) playUiTone("step");
      return next;
    });
  };

  const handleFinishOnboarding = () => {
    publishToast("พร้อมลุย", "เปิด Mission Hub แล้วเลือกด่านแรกได้เลย");
    playUiTone("success");
    handleDismissOnboarding();
  };

  const handleCommitProgress = async (payload: {
    missionId: string;
    score: number;
    completed: boolean;
    xpEarned: number;
    coinsEarned: number;
  }) => {
    const previousLevel = player?.level ?? 1;
    const hadCompletedMission = progress.some((item) => item.mission_id === payload.missionId && item.completed === 1);
    await syncProgress(payload);
    publishToast(
      payload.completed ? "Mission Complete" : "Mission Updated",
      payload.completed
        ? `เก่งมาก ได้รับ ${payload.xpEarned} XP และ ${payload.coinsEarned} Coins`
        : `บันทึกคะแนนแล้ว ลองปรับคำตอบอีกนิดเพื่อปลดล็อกด่านนี้`
    );
    if (payload.completed && !hadCompletedMission) {
      playUiTone("success");
      const nextLevelXp = (player?.xp ?? 0) + payload.xpEarned;
      const estimatedLevel = nextLevelXp >= 400 ? 7 : nextLevelXp >= 310 ? 6 : nextLevelXp >= 230 ? 5 : nextLevelXp >= 160 ? 4 : nextLevelXp >= 100 ? 3 : nextLevelXp >= 50 ? 2 : 1;
      if (estimatedLevel > previousLevel) {
        window.setTimeout(() => {
          publishToast("Level Up", `ยอดเยี่ยม เลื่อนเป็น Level ${estimatedLevel} แล้ว`);
        }, 500);
      }
    }
  };

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-xl text-white">Loading academy...</div>;
  }

  return (
    <Routes>
      <Route
        element={
          <>
            <Layout
              player={player}
              soundEnabled={soundEnabled}
              onToggleSound={() => updateSound(!soundEnabled)}
              toast={toast}
            />
            <CelebrationOverlay celebration={celebration} onClose={() => setCelebration(null)} />
          </>
        }
      >
        <Route
          path="/"
          element={
            <HomePage
              player={player}
              missions={missions}
              progress={progress}
              dailyChallenge={dailyChallenge}
              onStartGuest={handleRegisterGuest}
              showOnboarding={showOnboarding}
              onDismissOnboarding={handleDismissOnboarding}
              onboardingStep={onboardingSteps[onboardingStepIndex]}
              onboardingStepIndex={onboardingStepIndex}
              onboardingTotalSteps={onboardingSteps.length}
              onNextOnboarding={handleNextOnboarding}
              onPreviousOnboarding={handlePreviousOnboarding}
              onFinishOnboarding={handleFinishOnboarding}
            />
          }
        />
        <Route path="/missions" element={<MissionsPage missions={missions} progress={progress} />} />
        <Route
          path="/missions/:missionId"
          element={
            <MissionDetailPage
              missions={missions}
              player={player}
              onCommitProgress={handleCommitProgress}
              onCelebrate={setCelebration}
            />
          }
        />
        <Route path="/detect" element={<DetectPage />} />
        <Route path="/ethics" element={<EthicsPage />} />
        <Route path="/classroom" element={<ClassroomDemoPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Route>
    </Routes>
  );
}
