import { UserStats } from '../types'

interface ReinforcementRightPanelProps {
  stats: UserStats
  userName: string
}

type MemorySegment = { label: string; value: number; color: string; stroke: string }

export function ReinforcementRightPanel({ stats, userName }: ReinforcementRightPanelProps) {
  // Donut chart: Strong 45%, Medium 35%, Weak 20%
  const segments: MemorySegment[] = [
    { label: 'Strong', value: 45, color: '#10B981', stroke: 'text-emerald-500' },
    { label: 'Medium', value: 35, color: '#F59E0B', stroke: 'text-amber-500' },
    { label: 'Weak', value: 20, color: '#F43F5E', stroke: 'text-rose-500' },
  ]

  // Build SVG donut slices
  const r = 52
  const cx = 70
  const cy = 70
  const circumference = 2 * Math.PI * r
  let cumulative = 0

  const slices = segments.map((seg) => {
    const offset = circumference * (1 - cumulative / 100)
    const dashArray = `${(seg.value / 100) * circumference} ${circumference}`
    cumulative += seg.value
    return { ...seg, offset, dashArray }
  })

  const completedToday = 3
  const totalToday = 4

  return (
    <aside className="w-72 flex flex-col gap-4 shrink-0 h-full overflow-y-auto pr-1 select-none">
      {/* ── Schedule Summary ─────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-black text-gray-900 text-sm">Schedule Summary</h3>
          {/* Calendar illustration */}
          <div className="w-12 h-12 shrink-0">
            <svg viewBox="0 0 48 48" width="48" height="48" fill="none">
              <rect x="4" y="8" width="40" height="36" rx="6" fill="#EDE9FE" />
              <rect x="4" y="8" width="40" height="14" rx="6" fill="#7C3AED" />
              <rect x="4" y="16" width="40" height="6" fill="#7C3AED" />
              <rect x="14" y="4" width="4" height="8" rx="2" fill="#6D28D9" />
              <rect x="30" y="4" width="4" height="8" rx="2" fill="#6D28D9" />
              {/* Check */}
              <circle cx="29" cy="35" r="8" fill="#10B981" />
              <path d="M25 35 L28 38 L33 32" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              {/* Grid dots */}
              {[14, 22].map((x) =>
                [28, 36].map((y) => <circle key={`${x}${y}`} cx={x} cy={y} r="2" fill="#C4B5FD" />),
              )}
            </svg>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {/* Activities Today */}
          <div className="flex items-center gap-3 bg-purple-50 rounded-2xl px-3 py-2.5">
            <span className="text-xl">📅</span>
            <div>
              <div className="font-black text-gray-900 text-lg leading-none">
                {completedToday}/{totalToday}
              </div>
              <div className="text-xs font-bold text-gray-500 mt-0.5">Activities Today</div>
            </div>
          </div>

          {/* Total Practice Time */}
          <div className="flex items-center gap-3 bg-indigo-50 rounded-2xl px-3 py-2.5">
            <span className="text-xl">⏱️</span>
            <div>
              <div className="font-black text-gray-900 text-lg leading-none">2h 30m</div>
              <div className="text-xs font-bold text-gray-500 mt-0.5">Total Practice Time</div>
            </div>
          </div>

          {/* Topics Covered */}
          <div className="flex items-center gap-3 bg-emerald-50 rounded-2xl px-3 py-2.5">
            <span className="text-xl">🎯</span>
            <div>
              <div className="font-black text-gray-900 text-lg leading-none">3</div>
              <div className="text-xs font-bold text-gray-500 mt-0.5">Topics Covered</div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-black text-gray-600">Today's Progress</span>
            <span className="text-xs font-black text-purple-600">{completedToday}/{totalToday}</span>
          </div>
          <div className="h-3 bg-purple-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-700"
              style={{ width: `${(completedToday / totalToday) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── Memory Strength Overview ──────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-black text-gray-900 text-sm">Memory Strength Overview</h3>
          <button className="text-[10px] font-black text-purple-600 hover:text-purple-800 cursor-pointer hover:underline transition-all">
            View Details
          </button>
        </div>

        {/* Donut Chart */}
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <svg width="140" height="140" viewBox="0 0 140 140">
              <circle cx={cx} cy={cy} r={r} fill="white" />
              {slices.map((s, i) => (
                <circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="none"
                  stroke={s.color}
                  strokeWidth="24"
                  strokeDasharray={s.dashArray}
                  strokeDashoffset={s.offset}
                  transform={`rotate(-90 ${cx} ${cy})`}
                  style={{ transition: 'stroke-dasharray 0.5s ease' }}
                />
              ))}
              {/* Center hole */}
              <circle cx={cx} cy={cy} r="34" fill="white" />
              <text x={cx} y={cy - 4} textAnchor="middle" fontSize="11" fontWeight="900" fill="#1F2937">
                Total
              </text>
              <text x={cx} y={cy + 10} textAnchor="middle" fontSize="10" fontWeight="700" fill="#7C3AED">
                100%
              </text>
            </svg>
          </div>

          {/* Legend */}
          <div className="flex flex-col gap-2.5 flex-1">
            {segments.map((seg) => (
              <div key={seg.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
                  <span className="text-xs font-bold text-gray-700">{seg.label}</span>
                </div>
                <span className="text-sm font-black text-gray-900">{seg.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2 flex items-center gap-2">
          <span className="text-sm">📈</span>
          <p className="text-[10px] text-amber-700 font-bold">
            Keep practicing weak areas! You're doing great!
          </p>
        </div>
      </div>

      {/* ── Why These Times ───────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-4 border border-indigo-100 shadow-xs flex gap-3 items-start">
        <div className="text-2xl shrink-0 mt-0.5">⏰</div>
        <div>
          <h3 className="font-black text-gray-900 text-sm mb-1">Why these times?</h3>
          <p className="text-[11px] text-gray-600 font-semibold leading-relaxed">
            We use spaced repetition to show activities when you're most likely to remember. This improves long-term learning!
          </p>
        </div>
      </div>

      {/* ── Next Review Boost ─────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-5 border border-amber-200 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-black text-gray-900 text-sm">Next Review Boost</h3>
          <span className="flex items-center gap-1 bg-amber-100 text-amber-700 text-[10px] font-black px-2 py-0.5 rounded-full">
            ⭐ {stats.starsEarned.toLocaleString()} Stars
          </span>
        </div>

        <div className="flex items-start gap-3 mb-3">
          {/* Star mascot */}
          <div className="text-3xl animate-bounce shrink-0" style={{ animationDuration: '2s' }}>
            ⭐
          </div>
          <p className="text-xs text-gray-600 font-semibold leading-relaxed">
            Complete all scheduled activities today and earn{' '}
            <span className="font-black text-amber-600">bonus</span> stars!
          </p>
        </div>

        {/* Progress bar */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-bold text-gray-500">{completedToday} / {totalToday} completed</span>
        </div>
        <div className="h-2.5 bg-amber-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400 transition-all duration-700"
            style={{ width: `${(completedToday / totalToday) * 100}%` }}
          />
        </div>
        <div className="text-right mt-1">
          <span className="text-[10px] font-black text-amber-600">{completedToday} / {totalToday}</span>
        </div>
      </div>

      {/* ── AI Tip Card ───────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl p-4 text-white shadow-md shadow-purple-300/30">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">🤖</span>
          <span className="font-black text-sm">AI Tip for {userName}</span>
        </div>
        <p className="text-[11px] font-semibold leading-relaxed text-purple-100">
          Your best learning window is <span className="text-white font-black">10 AM – 12 PM</span>. Speech Practice is scheduled at this time for maximum memory retention!
        </p>
      </div>
    </aside>
  )
}
