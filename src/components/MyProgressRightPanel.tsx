import { UserStats } from '../types'

interface MyProgressRightPanelProps {
  stats: UserStats
}

export function MyProgressRightPanel({ stats }: MyProgressRightPanelProps) {
  const weekDays = [
    { label: 'M', active: true },
    { label: 'T', active: true },
    { label: 'W', active: true },
    { label: 'T', active: true },
    { label: 'F', active: true },
    { label: 'S', active: true },
    { label: 'S', active: true },
  ]

  // Radar Chart calculation for 6 Skills: Pronunciation, Vocabulary, Fluency, Listening, Comprehension, Confidence
  // Points on hex grid at angles: 270 (top), 330, 30, 90 (bottom), 150, 210 degrees
  const skillScores = [
    { name: 'Pronunciation', score: 75, angle: 270 },
    { name: 'Vocabulary', score: 68, angle: 330 },
    { name: 'Fluency', score: 60, angle: 30 },
    { name: 'Listening', score: 70, angle: 90 },
    { name: 'Comprehension', score: 65, angle: 150 },
    { name: 'Confidence', score: 80, angle: 210 },
  ]

  const cx = 110
  const cy = 95
  const maxR = 60

  // Calculate Radar Polygon Points
  const radarPoints = skillScores
    .map((s) => {
      const rad = (s.angle * Math.PI) / 180
      const r = (s.score / 100) * maxR
      const x = cx + r * Math.cos(rad)
      const y = cy + r * Math.sin(rad)
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')

  // Grid concentric rings (20%, 40%, 60%, 80%, 100%)
  const gridRings = [0.2, 0.4, 0.6, 0.8, 1.0]

  return (
    <aside className="w-80 flex flex-col gap-4 shrink-0 h-full overflow-y-auto pr-1 select-none">
      {/* ── 1. Learning Streak Card ────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-xs">
        <h3 className="font-black text-gray-900 text-sm mb-3">Learning Streak</h3>

        <div className="flex items-center gap-4 mb-4">
          {/* Animated 3D Flame Mascot */}
          <div className="w-16 h-16 shrink-0 flex items-center justify-center animate-bounce" style={{ animationDuration: '2.5s' }}>
            <svg width="56" height="56" viewBox="0 0 100 100" fill="none" className="drop-shadow-md">
              {/* Outer Flame */}
              <path
                d="M 50 5 C 75 35 90 60 90 75 C 90 90 70 98 50 98 C 30 98 10 90 10 75 C 10 60 25 35 50 5 Z"
                fill="#FF4757"
              />
              {/* Inner Flame Orange */}
              <path
                d="M 50 25 C 68 45 78 65 78 78 C 78 88 65 92 50 92 C 35 92 22 88 22 78 C 22 65 32 45 50 25 Z"
                fill="#FFA500"
              />
              {/* Core Yellow */}
              <path
                d="M 50 45 C 60 60 68 72 68 80 C 68 86 60 88 50 88 C 40 88 32 86 32 80 C 32 72 40 60 50 45 Z"
                fill="#FFD700"
              />
              {/* Cute Eyes & Smile */}
              <circle cx="42" cy="62" r="3.5" fill="#2C1810" />
              <circle cx="41" cy="60.5" r="1.2" fill="white" />
              <circle cx="58" cy="62" r="3.5" fill="#2C1810" />
              <circle cx="57" cy="60.5" r="1.2" fill="white" />
              <path d="M 45 68 Q 50 73 55 68" stroke="#2C1810" strokeWidth="2" strokeLinecap="round" fill="none" />
            </svg>
          </div>

          <div>
            <div className="text-3xl font-black text-purple-950 leading-none">
              {stats.dayStreak || 7} Days
            </div>
            <div className="flex items-center gap-1 mt-1">
              <span className="font-extrabold text-xs text-gray-900">Awesome!</span>
              <span className="text-xs">🔥</span>
            </div>
            <p className="text-gray-400 text-xs font-semibold mt-0.5">
              Keep your streak alive!
            </p>
          </div>
        </div>

        {/* 7 Days Circles Row */}
        <div className="flex justify-between items-center bg-purple-50/60 p-2.5 rounded-2xl border border-purple-100">
          {weekDays.map((day, idx) => (
            <div
              key={idx}
              className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs transition-all ${
                day.active
                  ? 'bg-purple-600 text-white shadow-xs scale-105'
                  : 'bg-white text-gray-400 border border-gray-200'
              }`}
            >
              {day.label}
            </div>
          ))}
        </div>
      </div>

      {/* ── 2. Skills Progress Radar Chart Card ────────────────────────── */}
      <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-xs relative">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-black text-gray-900 text-sm">Skills Progress</h3>
          <button className="text-indigo-600 hover:text-indigo-800 text-xs font-extrabold hover:underline cursor-pointer">
            View Details
          </button>
        </div>

        {/* Radar SVG Diagram */}
        <div className="relative w-full h-[210px] flex items-center justify-center">
          <svg width="220" height="200" viewBox="0 0 220 190" className="overflow-visible">
            {/* Concentric Grid Hexagons */}
            {gridRings.map((factor, idx) => {
              const pts = skillScores
                .map((s) => {
                  const rad = (s.angle * Math.PI) / 180
                  const r = maxR * factor
                  const x = cx + r * Math.cos(rad)
                  const y = cy + r * Math.sin(rad)
                  return `${x.toFixed(1)},${y.toFixed(1)}`
                })
                .join(' ')
              return (
                <polygon
                  key={idx}
                  points={pts}
                  fill="none"
                  stroke="#EDE9FE"
                  strokeWidth="1"
                  strokeDasharray={idx === 4 ? 'none' : '2 2'}
                />
              )
            })}

            {/* Axis Lines from Center to Vertices */}
            {skillScores.map((s, idx) => {
              const rad = (s.angle * Math.PI) / 180
              const x = cx + maxR * Math.cos(rad)
              const y = cy + maxR * Math.sin(rad)
              return (
                <line
                  key={idx}
                  x1={cx}
                  y1={cy}
                  x2={x}
                  y2={y}
                  stroke="#EDE9FE"
                  strokeWidth="1"
                />
              );
            })}

            {/* Radar Polygon Shape */}
            <polygon
              points={radarPoints}
              fill="#8B5CF6"
              fillOpacity="0.25"
              stroke="#7C3AED"
              strokeWidth="2"
            />

            {/* Vertex Dots */}
            {skillScores.map((s, idx) => {
              const rad = (s.angle * Math.PI) / 180
              const r = (s.score / 100) * maxR
              const x = cx + r * Math.cos(rad)
              const y = cy + r * Math.sin(rad)
              return (
                <circle
                  key={idx}
                  cx={x}
                  cy={y}
                  r="3.5"
                  fill="#7C3AED"
                  stroke="white"
                  strokeWidth="1.5"
                />
              )
            })}
          </svg>

          {/* Labels & Percentage Badges overlaid around chart */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 text-center">
            <span className="text-[10px] font-black text-gray-500 block">Pronunciation</span>
            <span className="text-xs font-black text-purple-900">75%</span>
          </div>

          <div className="absolute top-8 right-0 text-right">
            <span className="text-[10px] font-black text-gray-500 block">Vocabulary</span>
            <span className="text-xs font-black text-purple-900">68%</span>
          </div>

          <div className="absolute bottom-8 right-0 text-right">
            <span className="text-[10px] font-black text-gray-500 block">Fluency</span>
            <span className="text-xs font-black text-purple-900">60%</span>
          </div>

          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-center">
            <span className="text-[10px] font-black text-gray-500 block">Listening</span>
            <span className="text-xs font-black text-purple-900">70%</span>
          </div>

          <div className="absolute bottom-8 left-0 text-left">
            <span className="text-[10px] font-black text-gray-500 block">Comprehension</span>
            <span className="text-xs font-black text-purple-900">65%</span>
          </div>

          <div className="absolute top-8 left-0 text-left">
            <span className="text-[10px] font-black text-gray-500 block">Confidence</span>
            <span className="text-xs font-black text-purple-900">80%</span>
          </div>
        </div>
      </div>

      {/* ── 3. Weekly Goal Card ────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-black text-gray-900 text-sm">Weekly Goal</h3>
          <button className="text-indigo-600 hover:text-indigo-800 text-xs font-extrabold hover:underline cursor-pointer">
            Edit Goal
          </button>
        </div>

        <div className="flex items-center gap-3 mb-3">
          {/* Target Dartboard Graphic */}
          <div className="w-12 h-12 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center shrink-0 shadow-2xs text-2xl">
            🎯
          </div>
          <div className="flex-1">
            <div className="font-black text-gray-900 text-xs mb-1">
              Complete 40 activities
            </div>
            {/* Progress Bar */}
            <div className="w-full h-3 bg-purple-100 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full transition-all duration-500"
                style={{ width: '70%' }}
              />
            </div>
          </div>
          <span className="font-black text-xs text-purple-900 shrink-0">28 / 40</span>
        </div>

        {/* Goal Reminder Banner */}
        <div className="bg-purple-50/80 rounded-2xl p-2.5 text-center border border-purple-100">
          <span className="text-purple-700 font-extrabold text-xs">
            2 days left to achieve your goal!
          </span>
        </div>
      </div>
    </aside>
  )
}
