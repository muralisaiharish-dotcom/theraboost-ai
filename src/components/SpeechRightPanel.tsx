import { UserStats } from '../types'

interface SpeechRightPanelProps {
  stats: UserStats
  onOpenReport?: () => void
}

export function SpeechRightPanel({ stats, onOpenReport }: SpeechRightPanelProps) {
  const recommendations = [
    { id: 1, title: 'Daily Greetings', desc: 'Practice common greetings', icon: '👦', bg: 'bg-emerald-100' },
    { id: 2, title: 'Food & Drinks', desc: 'Learn food vocabulary', icon: '🧺', bg: 'bg-amber-100' },
    { id: 3, title: 'Action Words', desc: 'Practice action verbs', icon: '🏃', bg: 'bg-pink-100' },
  ]

  const weekDays = [
    { day: 'M', status: 'checked' },
    { day: 'T', status: 'active' },
    { day: 'W', status: 'active' },
    { day: 'T', status: 'active' },
    { day: 'F', status: 'active' },
    { day: 'S', status: 'checked' },
    { day: 'S', status: 'upcoming' },
  ]

  return (
    <aside className="w-80 flex flex-col gap-4 shrink-0 h-full overflow-y-auto pr-1">
      {/* ── Today's Progress Card ────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-black text-gray-900 text-sm">Today's Progress</h3>
          <button
            onClick={onOpenReport}
            className="text-purple-600 hover:text-purple-800 text-xs font-black hover:underline cursor-pointer"
          >
            View All
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          <div className="bg-purple-50 border border-purple-100 rounded-2xl p-2.5 flex flex-col items-center justify-center text-center">
            <div className="relative w-8 h-8 mb-1">
              <svg width="32" height="32" className="-rotate-90">
                <circle cx="16" cy="16" r="12" fill="none" stroke="#EDE9FE" strokeWidth="3" />
                <circle
                  cx="16"
                  cy="16"
                  r="12"
                  fill="none"
                  stroke="#7C5FE6"
                  strokeWidth="3"
                  strokeDasharray={2 * Math.PI * 12}
                  strokeDashoffset={2 * Math.PI * 12 * (1 - 0.65)}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-[9px] font-black text-purple-900">
                65%
              </div>
            </div>
            <span className="text-[10px] font-bold text-gray-500 leading-tight">Activities Completed</span>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-2.5 flex flex-col items-center justify-center text-center">
            <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-base mb-1">
              ⭐
            </div>
            <span className="font-black text-gray-900 text-base leading-none">{stats.starsEarned}</span>
            <span className="text-gray-400 text-[10px] font-bold mt-1 leading-tight">Stars Earned</span>
          </div>

          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-2.5 flex flex-col items-center justify-center text-center">
            <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-base mb-1">
              🔥
            </div>
            <span className="font-black text-gray-900 text-base leading-none">{stats.dayStreak}</span>
            <span className="text-gray-400 text-[10px] font-bold mt-1 leading-tight">Day Streak</span>
          </div>
        </div>
      </div>

      {/* ── Your Practice Streak Card ────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-xs">
        <h3 className="font-black text-gray-900 text-sm mb-3">Your Practice Streak</h3>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-3xl animate-bounce" style={{ animationDuration: '2s' }}>
            🔥
          </div>
          <div>
            <div className="text-xl font-black text-orange-600 leading-none mb-0.5">7 Days</div>
            <div className="text-xs font-bold text-gray-600">Awesome! 🔥 Keep your streak alive!</div>
          </div>
        </div>

        {/* Weekly Day Circles */}
        <div className="flex items-center justify-between px-1">
          {weekDays.map((d, i) => (
            <div
              key={i}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${d.status === 'checked'
                ? 'bg-purple-600 text-white'
                : d.status === 'active'
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-100 text-purple-400'
                }`}
            >
              {d.status === 'checked' ? '✓' : d.day}
            </div>
          ))}
        </div>
      </div>

      {/* ── Recommended for You Section ─────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-black text-gray-900 text-sm">Recommended for You</h3>
          <button className="text-purple-600 hover:text-purple-800 text-xs font-black hover:underline cursor-pointer">
            View All
          </button>
        </div>

        <div className="space-y-2.5">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="flex items-center justify-between p-2.5 rounded-2xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50/50 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${rec.bg} flex items-center justify-center text-xl`}>
                  {rec.icon}
                </div>
                <div>
                  <div className="font-black text-xs text-gray-900">{rec.title}</div>
                  <div className="text-[11px] text-gray-400 font-bold">{rec.desc}</div>
                </div>
              </div>
              <button className="bg-gray-50 hover:bg-purple-600 hover:text-white border border-gray-200 text-purple-700 font-extrabold text-xs px-3.5 py-1.5 rounded-xl transition-all cursor-pointer">
                Start
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Practice Tip Banner ────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-purple-100 via-indigo-50 to-purple-50 rounded-3xl p-4 border border-purple-200 relative overflow-hidden shadow-xs">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center text-xl shrink-0">
            💡
          </div>
          <div>
            <div className="font-black text-purple-950 text-xs mb-1">Practice Tip</div>
            <p className="text-purple-900 text-xs font-bold leading-relaxed">
              Speak slowly, clearly and with confidence. You've got this!
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
