import { UserStats } from '../types'
import { VIDEO_CATEGORIES } from './RewardVideosData'
import { WaterDropMascot } from './RewardVideoThumbnails'

interface RewardRightPanelProps {
  stats: UserStats
  onOpenReport?: () => void
}

export function RewardRightPanel({ stats, onOpenReport }: RewardRightPanelProps) {
  return (
    <aside className="w-80 flex flex-col gap-4 shrink-0 h-full overflow-y-auto pr-1 select-none">
      {/* ── 1. Today's Progress Card ────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-black text-gray-900 text-sm">Today's Progress</h3>
          <button
            onClick={onOpenReport}
            className="text-indigo-600 hover:text-indigo-800 text-xs font-black hover:underline cursor-pointer"
          >
            View All
          </button>
        </div>

        {/* 3 Metrics Row */}
        <div className="grid grid-cols-3 gap-2.5">
          {/* Videos Watched Circle */}
          <div className="flex flex-col items-center justify-center p-2 rounded-2xl bg-purple-50/50 border border-purple-100/80">
            <div className="relative w-12 h-12 flex items-center justify-center mb-1">
              <svg width="44" height="44" className="-rotate-90">
                <circle cx="22" cy="22" r="17" fill="none" stroke="#EDE9FE" strokeWidth="4" />
                <circle
                  cx="22"
                  cy="22"
                  r="17"
                  fill="none"
                  stroke="#6C4DE6"
                  strokeWidth="4"
                  strokeDasharray={106.8}
                  strokeDashoffset={106.8 - (stats.sessionProgress / 100) * 106.8}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-[11px] font-black text-purple-950">{stats.sessionProgress}%</span>
            </div>
            <span className="text-[10px] font-extrabold text-gray-500 text-center leading-tight">
              Videos Watched
            </span>
          </div>

          {/* Stars Earned */}
          <div className="flex flex-col items-center justify-center p-2 rounded-2xl bg-amber-50/60 border border-amber-100/80">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-xl mb-1 shadow-2xs">
              ⭐
            </div>
            <span className="font-black text-gray-900 text-base leading-none">15</span>
            <span className="text-[10px] font-extrabold text-gray-500 text-center leading-tight mt-0.5">
              Stars Earned
            </span>
          </div>

          {/* Day Streak */}
          <div className="flex flex-col items-center justify-center p-2 rounded-2xl bg-orange-50/60 border border-orange-100/80">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-xl mb-1 shadow-2xs">
              🔥
            </div>
            <span className="font-black text-gray-900 text-base leading-none">{stats.dayStreak}</span>
            <span className="text-[10px] font-extrabold text-gray-500 text-center leading-tight mt-0.5">
              Day Streak
            </span>
          </div>
        </div>
      </div>

      {/* ── 2. Unlock More Videos! Banner (Purple Gradient Card) ──────────── */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 rounded-3xl p-5 text-white relative overflow-hidden shadow-md shadow-purple-500/20">
        {/* Background glow */}
        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10 blur-sm pointer-events-none" />

        <div className="relative z-10 flex items-start justify-between">
          <div className="flex-1 pr-2">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-black leading-tight">Unlock More Videos!</h3>
              <span className="text-sm">🔒</span>
            </div>
            <p className="text-purple-100 text-xs font-medium leading-snug mb-3">
              Collect more stars by completing activities to unlock exciting reward videos.
            </p>

            {/* Stars Progress Bar */}
            <div className="flex items-center gap-2">
              <div className="flex-1 h-3 bg-purple-900/40 rounded-full p-0.5 overflow-hidden backdrop-blur-xs">
                <div className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full w-[50%] shadow-xs transition-all duration-700" />
              </div>
              <span className="text-[11px] font-black text-amber-300">15/30 Stars</span>
            </div>
          </div>

          {/* Cute Waving Purple Mascot */}
          <div className="w-16 h-16 shrink-0 relative flex items-center justify-center animate-float">
            <svg width="56" height="56" viewBox="0 0 100 100" fill="none" className="drop-shadow-lg">
              <path d="M 25 35 L 15 10 L 40 25 Z" fill="#93C5FD" />
              <path d="M 75 35 L 85 10 L 60 25 Z" fill="#93C5FD" />
              <rect x="18" y="22" width="64" height="54" rx="26" fill="white" />
              <rect x="24" y="28" width="52" height="42" rx="20" fill="#7C5FE6" />
              <ellipse cx="50" cy="49" rx="16" ry="12" fill="#1E1B4B" />
              <circle cx="43" cy="48" r="3" fill="#38BDF8" />
              <circle cx="57" cy="48" r="3" fill="#38BDF8" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── 3. Video Categories Card ──────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-xs">
        <div className="flex items-center justify-between mb-3.5">
          <h3 className="font-black text-gray-900 text-sm">Video Categories</h3>
          <button className="text-indigo-600 hover:text-indigo-800 text-xs font-black hover:underline cursor-pointer">
            View All
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          {VIDEO_CATEGORIES.map((cat) => (
            <div
              key={cat.name}
              className="flex items-center justify-between p-2.5 rounded-2xl bg-gray-50/70 hover:bg-purple-50/60 border border-gray-100 hover:border-purple-100 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-lg">{cat.icon}</span>
                <span className="font-bold text-xs text-gray-800">{cat.name}</span>
              </div>
              <span className="font-black text-xs text-gray-400 bg-white px-2 py-0.5 rounded-lg border border-gray-100">
                {(cat as any).count || (cat.name === 'All' ? 19 : 3)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 4. Screen Time Tip Card ───────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 rounded-3xl p-4 border border-sky-100 relative overflow-hidden shadow-xs">
        <div className="flex items-start justify-between">
          <div className="flex-1 pr-2">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-sm">💡</span>
              <span className="font-black text-sky-950 text-xs">Screen Time Tip</span>
            </div>
            <p className="text-sky-900 text-xs font-bold leading-relaxed">
              Take breaks, drink water, and come back to learn more!
            </p>
          </div>

          {/* Water Drop Mascot */}
          <div className="w-14 h-14 shrink-0 flex items-center justify-center animate-bounce" style={{ animationDuration: '3.5s' }}>
            <WaterDropMascot />
          </div>
        </div>
      </div>
    </aside>
  )
}
