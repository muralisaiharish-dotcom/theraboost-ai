import { useState } from 'react'
import { UserStats } from '../types'
import { TodayGoalModal } from './TodayGoalModal'
import { TipForYouModal } from './TipForYouModal'
import { MotivationScoreCard } from './MotivationScoreCard'

interface HomeRightPanelProps {
  stats: UserStats
}

export function HomeRightPanel({ stats }: HomeRightPanelProps) {
  const [goalOpen, setGoalOpen] = useState(false)
  const [tipOpen, setTipOpen] = useState(false)

  const weekDays = [
    { day: 'M', checked: true },
    { day: 'T', checked: true },
    { day: 'W', checked: true },
    { day: 'T', checked: true },
    { day: 'F', checked: true },
    { day: 'S', checked: true },
    { day: 'S', checked: false },
  ]

  return (
    <>
      {/* ── Modals ─────────────────────────────────────────────────────── */}
      {goalOpen && <TodayGoalModal onClose={() => setGoalOpen(false)} />}
      {tipOpen && (
        <TipForYouModal
          onClose={() => setTipOpen(false)}
          userProgress={stats.sessionProgress}
        />
      )}

      <aside className="w-80 flex flex-col gap-4 shrink-0 h-full overflow-y-auto pr-1 select-none">
        {/* ── Motivation Index Widget ── */}
        <MotivationScoreCard compact />

        {/* ── 1. Daily Streak Widget ──────────────────────────────────────── */}

        <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">🔥</span>
              <h3 className="font-black text-gray-900 text-sm">Daily Streak</h3>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-black text-gray-900">{stats.dayStreak}</span>
                <span className="text-sm font-black text-gray-600">days</span>
              </div>
              <p className="text-xs font-extrabold text-amber-600 mt-0.5">Great going!</p>
            </div>

            {/* 3D Star Mascot */}
            <div className="w-16 h-16 shrink-0 flex items-center justify-center animate-bounce" style={{ animationDuration: '2.5s' }}>
              <svg width="60" height="60" viewBox="0 0 100 100" fill="none" className="drop-shadow-md">
                <polygon points="50,5 64,34 95,38 72,60 78,92 50,76 22,92 28,60 5,38 36,34" fill="#FBBF24" />
                <polygon points="50,12 61,36 86,40 67,58 72,83 50,70 28,83 33,58 14,40 39,36" fill="#F59E0B" />
                {/* Eyes */}
                <circle cx="40" cy="45" r="4" fill="#1E1B4B" />
                <circle cx="60" cy="45" r="4" fill="#1E1B4B" />
                <circle cx="42" cy="43" r="1.5" fill="white" />
                <circle cx="62" cy="43" r="1.5" fill="white" />
                {/* Smile */}
                <path d="M43 55 Q 50 63 57 55" stroke="#7C2D12" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                {/* Cheeks */}
                <circle cx="34" cy="50" r="3" fill="#FCA5A5" />
                <circle cx="66" cy="50" r="3" fill="#FCA5A5" />
              </svg>
            </div>
          </div>

          {/* Weekday checkmark dots */}
          <div className="flex items-center justify-between bg-amber-50/70 rounded-2xl p-2.5 border border-amber-100">
            {weekDays.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black transition-all ${
                    item.checked
                      ? 'bg-amber-400 text-white shadow-xs'
                      : 'bg-white text-gray-300 border border-gray-200'
                  }`}
                >
                  {item.checked ? '✓' : ''}
                </div>
                <span className="text-[10px] font-black text-gray-500">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── 2. Today's Goal Widget ───────────────────────────────────────── */}
        <button
          id="todays-goal-card"
          onClick={() => setGoalOpen(true)}
          className="w-full text-left bg-white rounded-3xl p-5 border border-purple-100 shadow-xs hover:shadow-md hover:border-purple-300 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">🎯</span>
              <h3 className="font-black text-gray-900 text-sm">Today's Goal</h3>
            </div>
            <span className="text-[11px] font-black text-purple-600 hover:text-purple-800">
              View Details →
            </span>
          </div>

          <div className="text-xs font-bold text-gray-600 mb-2">Complete 3 activities</div>

          {/* Goal Progress Bar */}
          <div className="mb-4">
            <div className="h-3 bg-purple-100 rounded-full overflow-hidden mb-1">
              <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500" style={{ width: '66%' }} />
            </div>
            <div className="text-right text-xs font-black text-purple-700">2 / 3</div>
          </div>

          {/* Celebrating Mascot Box */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-3 border border-purple-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏆</span>
              <div>
                <div className="text-xs font-black text-purple-900">You're almost there!</div>
                <div className="text-[10px] text-purple-600 font-bold">Tap to see your tasks</div>
              </div>
            </div>
            {/* Elephant mascot head */}
            <div className="w-10 h-10 shrink-0 text-3xl animate-bounce" style={{ animationDuration: '2s' }}>
              🐘
            </div>
          </div>
        </button>

        {/* ── 3. Tip for You Widget ────────────────────────────────────────── */}
        <button
          id="tip-for-you-card"
          onClick={() => setTipOpen(true)}
          className="w-full text-left bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 rounded-3xl p-5 border border-blue-100 shadow-xs relative overflow-hidden hover:shadow-md hover:border-purple-200 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">💡</span>
            <h3 className="font-black text-gray-900 text-sm">Tip for You</h3>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1 pr-2">
              <p className="text-xs text-gray-700 font-semibold leading-relaxed mb-3">
                Practice a little every day and celebrate every small win!
              </p>
              {/* Pagination dots */}
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                <span className="w-2 h-2 rounded-full bg-purple-200" />
                <span className="w-2 h-2 rounded-full bg-purple-200" />
                <span className="w-2 h-2 rounded-full bg-purple-200" />
              </div>
            </div>

            {/* Girl mascot waving */}
            <div className="w-16 h-16 shrink-0 flex items-center justify-center">
              <span className="text-4xl">👧</span>
            </div>
          </div>

          {/* "Tap to read more" label */}
          <div className="mt-2 text-[10px] font-extrabold text-purple-500 text-right">
            Tap for more tips →
          </div>
        </button>
      </aside>
    </>
  )
}
