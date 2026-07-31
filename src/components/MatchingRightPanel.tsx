import { UserStats } from '../types'

interface MatchingRightPanelProps {
  stats: UserStats
  onOpenReport?: () => void
}

export function MatchingRightPanel({ stats, onOpenReport }: MatchingRightPanelProps) {
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
          {/* Activities Completed Circle */}
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
              Activities Completed
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

      {/* ── 2. Level Progress Card (Purple Banner) ────────────────────────── */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 rounded-3xl p-5 text-white relative overflow-hidden shadow-md shadow-purple-500/20">
        {/* Background decorative circles */}
        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10 blur-sm pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-indigo-400/20 blur-sm pointer-events-none" />

        <div className="relative z-10 flex items-start justify-between">
          <div className="flex-1 pr-2">
            <span className="text-purple-200 text-[11px] font-black uppercase tracking-wider block mb-0.5">
              Level Progress
            </span>
            <h3 className="text-xl font-black mb-1 leading-tight">Level 2</h3>
            <p className="text-purple-100 text-xs font-semibold leading-snug mb-3">
              Keep going! You're almost a star learner!
            </p>

            {/* Green Progress Bar */}
            <div className="flex items-center gap-2">
              <div className="flex-1 h-3 bg-purple-900/40 rounded-full p-0.5 overflow-hidden backdrop-blur-xs">
                <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full w-[70%] shadow-xs transition-all duration-700" />
              </div>
              <span className="text-xs font-black text-emerald-300">70%</span>
            </div>
          </div>

          {/* 3D Trophy Graphic */}
          <div className="w-16 h-16 shrink-0 relative flex items-center justify-center animate-float">
            <svg width="60" height="60" viewBox="0 0 100 100" fill="none" className="drop-shadow-lg">
              {/* Cup Handles */}
              <path d="M 20 28 C 5 28 5 54 26 54 M 80 28 C 95 28 95 54 74 54" stroke="#FFD700" strokeWidth="6" strokeLinecap="round" fill="none" />
              {/* Cup Base & Stem */}
              <path d="M 38 72 L 62 72 M 50 56 L 50 72 M 30 84 H 70 V 90 H 30 Z" stroke="#FFD700" strokeWidth="6" strokeLinecap="round" fill="#FFA500" />
              <rect x="34" y="80" width="32" height="12" rx="3" fill="#D4AF37" stroke="#FFD700" strokeWidth="2" />
              {/* Cup Main */}
              <path d="M 22 20 H 78 V 40 C 78 60 50 64 50 64 C 50 64 22 60 22 40 Z" fill="#FFD700" stroke="#FFA500" strokeWidth="3" />
              <path d="M 26 24 H 74 V 36 C 74 52 50 56 50 56 C 50 56 26 52 26 36 Z" fill="#FFEC8B" opacity="0.6" />
              {/* Star on Cup */}
              <polygon points="50,30 53,38 61,38 54,43 57,51 50,46 43,51 46,43 39,38 47,38" fill="#FF6B6B" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── 3. How to Play Card ───────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-xs relative overflow-hidden">
        <h3 className="font-black text-gray-900 text-sm mb-3.5">How to Play</h3>

        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-3 flex-1 pr-2">
            {/* Step 1 */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-black text-xs shrink-0 shadow-2xs">
                🔍
              </div>
              <p className="text-gray-600 text-xs font-bold leading-tight">
                Look at all the cards carefully.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xs shrink-0 shadow-2xs">
                👆
              </div>
              <p className="text-gray-600 text-xs font-bold leading-tight">
                Tap on two cards to reveal them.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-black text-xs shrink-0 shadow-2xs">
                ✓
              </div>
              <p className="text-gray-600 text-xs font-bold leading-tight">
                Match the pairs and earn stars!
              </p>
            </div>
          </div>

          {/* Happy 3D Star Graphic */}
          <div className="w-16 h-16 shrink-0 flex items-center justify-center animate-bounce" style={{ animationDuration: '3s' }}>
            <svg width="56" height="56" viewBox="0 0 100 100" fill="none" className="drop-shadow-md">
              <polygon points="50,5 63,33 95,38 72,61 77,93 50,78 23,93 28,61 5,38 37,33" fill="#FFD700" stroke="#FFA500" strokeWidth="3" />
              <polygon points="50,12 60,35 85,39 65,58 70,83 50,70 30,83 35,58 15,39 40,35" fill="#FFEAA7" opacity="0.7" />
              {/* Cute Star Eyes & Smile */}
              <circle cx="40" cy="45" r="3.5" fill="#2C1810" />
              <circle cx="39" cy="43.5" r="1.2" fill="white" />
              <circle cx="60" cy="45" r="3.5" fill="#2C1810" />
              <circle cx="59" cy="43.5" r="1.2" fill="white" />
              <circle cx="34" cy="50" r="3" fill="#FF6B81" opacity="0.6" />
              <circle cx="66" cy="50" r="3" fill="#FF6B81" opacity="0.6" />
              <path d="M 44 52 Q 50 58 56 52" stroke="#2C1810" strokeWidth="2" strokeLinecap="round" fill="none" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── 4. Top Achievements Card ──────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-black text-gray-900 text-sm">Top Achievements</h3>
          <button className="text-indigo-600 hover:text-indigo-800 text-xs font-black hover:underline cursor-pointer">
            View All
          </button>
        </div>

        {/* 3 Achievement Ribbon Badges */}
        <div className="grid grid-cols-3 gap-2 text-center">
          {/* Badge 1: Super Matcher */}
          <div className="flex flex-col items-center group cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center text-2xl mb-1 shadow-2xs group-hover:scale-110 transition-transform">
              🎖️
            </div>
            <span className="font-black text-xs text-gray-900 leading-tight">Super Matcher</span>
            <span className="text-[9px] font-bold text-gray-400 mt-0.5">Match 10 pairs</span>
          </div>

          {/* Badge 2: Memory Master */}
          <div className="flex flex-col items-center group cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center text-2xl mb-1 shadow-2xs group-hover:scale-110 transition-transform">
              🏅
            </div>
            <span className="font-black text-xs text-gray-900 leading-tight">Memory Master</span>
            <span className="text-[9px] font-bold text-gray-400 mt-0.5">Complete 5 levels</span>
          </div>

          {/* Badge 3: Quick Thinker */}
          <div className="flex flex-col items-center group cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-2xl mb-1 shadow-2xs group-hover:scale-110 transition-transform">
              ⚡
            </div>
            <span className="font-black text-xs text-gray-900 leading-tight">Quick Thinker</span>
            <span className="text-[9px] font-bold text-gray-400 mt-0.5">Finish in 2 mins</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
