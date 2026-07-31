import { useState } from 'react'
import { useApp } from '../contexts/AppContext'

interface MotivationScoreCardProps {
  compact?: boolean
}

const LEVEL_CONFIG = {
  'Excellent': {
    emoji: '🚀',
    mascot: '🌟',
    gradient: 'from-emerald-500 via-teal-500 to-green-600',
    glow: 'shadow-emerald-500/30',
    bgGlow: 'from-emerald-50 via-teal-50/60 to-white',
    ring: 'ring-emerald-200',
    badge: 'bg-emerald-500',
    bar: 'bg-gradient-to-r from-emerald-400 to-teal-500',
    label: 'Excellent',
    tagline: 'Absolutely crushing it! 🔥',
  },
  'Good': {
    emoji: '⚡',
    mascot: '😊',
    gradient: 'from-blue-500 via-indigo-500 to-violet-500',
    glow: 'shadow-blue-500/30',
    bgGlow: 'from-blue-50 via-indigo-50/60 to-white',
    ring: 'ring-blue-200',
    badge: 'bg-blue-500',
    bar: 'bg-gradient-to-r from-blue-400 to-indigo-500',
    label: 'Good',
    tagline: 'Great progress! Keep it up 💪',
  },
  'Average': {
    emoji: '🎯',
    mascot: '🤔',
    gradient: 'from-amber-400 via-orange-500 to-yellow-500',
    glow: 'shadow-amber-500/30',
    bgGlow: 'from-amber-50 via-orange-50/60 to-white',
    ring: 'ring-amber-200',
    badge: 'bg-amber-500',
    bar: 'bg-gradient-to-r from-amber-400 to-orange-500',
    label: 'Average',
    tagline: 'You can do better! Try more 🌱',
  },
  'Needs Motivation': {
    emoji: '💫',
    mascot: '😴',
    gradient: 'from-rose-500 via-red-500 to-pink-600',
    glow: 'shadow-rose-500/30',
    bgGlow: 'from-rose-50 via-red-50/60 to-white',
    ring: 'ring-rose-200',
    badge: 'bg-rose-500',
    bar: 'bg-gradient-to-r from-rose-400 to-red-500',
    label: 'Needs Motivation',
    tagline: 'Let\'s wake up and learn! 🌈',
  },
}

const BREAKDOWN_LABELS: Record<string, { label: string; icon: string }> = {
  streak: { label: 'Day Streak', icon: '🔥' },
  sessionCompletion: { label: 'Weekly Goal', icon: '🎯' },
  rewardResponse: { label: 'Reward Response', icon: '🎬' },
  timeSpent: { label: 'Time Spent', icon: '⏱️' },
  speechPractice: { label: 'Speech Practice', icon: '🎙️' },
  gamesCompleted: { label: 'Games Completed', icon: '🎮' },
}

export function MotivationScoreCard({ compact = false }: MotivationScoreCardProps) {
  const { motivationScore } = useApp()
  const { score, level, levelColor, trendPct, suggestions, breakdown } = motivationScore
  const [showBreakdown, setShowBreakdown] = useState(false)

  const cfg = LEVEL_CONFIG[level]

  // SVG circle gauge math
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference * (1 - score / 100)

  if (compact) {
    return (
      <div className={`bg-gradient-to-br ${cfg.bgGlow} rounded-2xl p-3 border ${cfg.ring} shadow-sm flex items-center justify-between hover:shadow-md transition-all duration-300`}>
        <div className="flex items-center gap-2.5">
          <div
            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cfg.gradient} flex items-center justify-center font-black text-white text-base shadow-md`}
          >
            {score}
          </div>
          <div>
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Motivation Score</div>
            <div className="text-xs font-black" style={{ color: levelColor }}>
              {cfg.emoji} {level}
            </div>
          </div>
        </div>
        <span className={`text-[9px] font-extrabold px-2 py-1 rounded-lg text-white ${cfg.badge}`}>
          {trendPct >= 0 ? `+${trendPct}%` : `${trendPct}%`} 📈
        </span>
      </div>
    )
  }

  return (
    <div className={`relative rounded-3xl overflow-hidden border ${cfg.ring} shadow-xl ${cfg.glow} group transition-all duration-500`}>
      {/* Premium gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${cfg.bgGlow} opacity-90`} />
      <div className={`absolute -top-16 -right-16 w-56 h-56 bg-gradient-to-br ${cfg.gradient} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity duration-700`} />
      <div className={`absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br ${cfg.gradient} opacity-10 rounded-full blur-2xl`} />

      <div className="relative z-10 p-4 flex flex-col gap-4">

        {/* ── Header ── */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${cfg.gradient} flex items-center justify-center shadow-md text-lg ring-2 ring-white/60`}>
              {cfg.emoji}
            </div>
            <div>
              <h3 className="font-black text-sm text-gray-900 leading-tight">Child Motivation Index</h3>
              <p className="text-[10px] font-semibold text-gray-500">{cfg.tagline}</p>
            </div>
          </div>
          <span className={`text-[10px] font-black px-3 py-1 rounded-full text-white bg-gradient-to-r ${cfg.gradient} shadow-md`}>
            {level}
          </span>
        </div>

        {/* ── Score Gauge + Mascot ── */}
        <div className="flex items-center gap-4">
          {/* Animated SVG Ring */}
          <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
            <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
              {/* Track */}
              <circle cx="48" cy="48" r={radius} fill="none" stroke="#E9D5FF" strokeWidth="8" opacity="0.5" />
              {/* Progress */}
              <circle
                cx="48"
                cy="48"
                r={radius}
                fill="none"
                stroke="url(#scoreGrad)"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                className="transition-all duration-1500 ease-out"
                style={{ filter: 'drop-shadow(0 0 4px rgba(139,92,246,0.5))' }}
              />
              <defs>
                <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={levelColor} stopOpacity="0.8" />
                  <stop offset="100%" stopColor={levelColor} />
                </linearGradient>
              </defs>
            </svg>
            {/* Score number in center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
              <span className="text-2xl font-black text-gray-900 tracking-tighter">{score}</span>
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">/ 100</span>
            </div>
          </div>

          {/* Right side info */}
          <div className="flex-1 min-w-0 flex flex-col gap-2">
            {/* Mascot + Trend */}
            <div className="flex items-center justify-between">
              <div className="text-3xl leading-none">{cfg.mascot}</div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-black ${trendPct >= 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                <span>{trendPct >= 0 ? '📈' : '📉'}</span>
                <span>{trendPct >= 0 ? `+${trendPct}%` : `${trendPct}%`} vs 3d ago</span>
              </div>
            </div>

            {/* Mini bar chart for score */}
            <div>
              <div className="text-[9px] font-bold text-gray-500 mb-1 uppercase tracking-wide">Overall Score</div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                <div
                  className={`h-full rounded-full ${cfg.bar} transition-all duration-1000 ease-out`}
                  style={{ width: `${score}%` }}
                />
              </div>
              <div className="flex justify-between mt-0.5">
                <span className="text-[8px] text-gray-400 font-bold">0</span>
                <span className="text-[8px] text-gray-400 font-bold">100</span>
              </div>
            </div>

            {/* Toggle breakdown button */}
            <button
              onClick={() => setShowBreakdown(!showBreakdown)}
              className={`text-[10px] font-black px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${showBreakdown ? `bg-gradient-to-r ${cfg.gradient} text-white border-transparent shadow-sm` : 'bg-white text-gray-600 border-gray-200 hover:border-purple-300 hover:text-purple-700'}`}
            >
              {showBreakdown ? '▲ Hide Breakdown' : '▼ Show Breakdown'}
            </button>
          </div>
        </div>

        {/* ── Score Breakdown Bars (Animated) ── */}
        {showBreakdown && (
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-3 border border-white/80 shadow-inner flex flex-col gap-2">
            <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Score Breakdown</div>
            {Object.entries(breakdown).map(([key, val]) => {
              const meta = BREAKDOWN_LABELS[key]
              return (
                <div key={key} className="flex items-center gap-2">
                  <span className="text-sm w-5 text-center shrink-0">{meta?.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[9px] font-bold text-gray-600 truncate">{meta?.label}</span>
                      <span className="text-[9px] font-black text-gray-800 ml-1">{val}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${cfg.bar} transition-all duration-700 ease-out`}
                        style={{ width: `${val}%` }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* ── AI Suggestions ── */}
        {suggestions.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase text-purple-700 tracking-widest">
                AI Motivation Tips
              </span>
            </div>
            {suggestions.map((s, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 text-xs font-semibold text-gray-700 bg-white/80 backdrop-blur-sm p-2.5 rounded-xl border border-white shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-200 group/item cursor-default"
              >
                <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${cfg.gradient} flex items-center justify-center shrink-0 shadow-sm`}>
                  <span className="text-white text-[10px]">✨</span>
                </div>
                <span className="pt-0.5 leading-relaxed">{s}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
