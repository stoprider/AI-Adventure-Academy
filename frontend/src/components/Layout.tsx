import { Link, NavLink, Outlet } from "react-router-dom";
import { Player, ToastMessage } from "../types";

interface LayoutProps {
  player: Player | null;
  soundEnabled: boolean;
  onToggleSound: () => void;
  toast: ToastMessage | null;
}

const navItems = [
  { to: "/", label: "Home" },
  { to: "/missions", label: "Missions" },
  { to: "/detect", label: "Detect" },
  { to: "/ethics", label: "Ethics" },
  { to: "/classroom", label: "Classroom" },
  { to: "/admin", label: "Admin" }
];

export function Layout({ player, soundEnabled, onToggleSound, toast }: LayoutProps) {
  return (
    <div className="min-h-screen px-4 py-4 text-slate-50 md:px-8">
      <header className="mx-auto mb-6 flex max-w-7xl flex-col gap-4 rounded-[2rem] border border-white/10 bg-slate-900/70 px-5 py-4 backdrop-blur md:flex-row md:items-center md:justify-between">
        <div>
          <Link to="/" className="font-display text-2xl font-bold text-white">
            AI Adventure Academy
          </Link>
          <p className="text-sm text-slate-300">เมืองแห่งอนาคตกำลังรอนักสำรวจ AI คนใหม่</p>
        </div>

        <nav className="flex flex-wrap gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive ? "bg-cyan-300 text-slate-950" : "bg-white/5 text-slate-200 hover:bg-white/10"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button className="button-secondary" onClick={onToggleSound}>
            เสียง: {soundEnabled ? "เปิด" : "ปิด"}
          </button>
          {player ? (
            <div className="rounded-2xl bg-white/5 px-4 py-3 text-sm">
              <div className="font-semibold text-white">{player.nickname}</div>
              <div className="text-slate-300">Lv.{player.level} • XP {player.xp} • Coins {player.coins}</div>
            </div>
          ) : (
            <div className="rounded-2xl bg-white/5 px-4 py-3 text-sm text-slate-300">Guest Mode</div>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-7xl">
        <Outlet />
      </main>

      {toast && (
        <div className="surface-elevated fixed bottom-4 right-4 z-50 max-w-sm rounded-3xl border border-emerald-300/30 bg-emerald-500/15 p-4 shadow-2xl backdrop-blur">
          <div className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-200">{toast.title}</div>
          <div className="mt-1 text-sm text-white">{toast.description}</div>
        </div>
      )}
    </div>
  );
}
