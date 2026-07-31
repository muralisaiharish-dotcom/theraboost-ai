import { useState } from 'react'

interface MyProgressProps {
  onNavTabChange?: (tab: string) => void
}

export function MyProgress({ onNavTabChange }: MyProgressProps) {
  const [activeTab, setActiveTab] = useState('Overview')
  const [hoveredDay, setHoveredDay] = useState<number | null>(null)

  const tabs = [
    { id: 'Overview', label: 'Overview', icon: '⊞' },
    { id: 'Activities', label: 'Activities', icon: '📊' },
    { id: 'Skills', label: 'Skills', icon: '🏆' },
    { id: 'Reports', label: 'Reports', icon: '📑' },
  ]

  const weeklyData = [
    { day: 'Mon', activities: 22, stars: 40 },
    { day: 'Tue', activities: 32, stars: 60 },
    { day: 'Wed', activities: 34, stars: 80 },
    { day: 'Thu', activities: 33, stars: 68 },
    { day: 'Fri', activities: 40, stars: 95 },
    { day: 'Sat', activities: 29, stars: 84 },
    { day: 'Sun', activities: 26, stars: 50 },
  ]

  const recentActivities = [
    {
      id: 'act-1',
      title: 'Speech Practice',
      subtitle: 'Pronounced 15 new words',
      time: 'Today, 10:30 AM',
      stars: 15,
      icon: '🎙️',
      color: 'bg-emerald-100 text-emerald-700',
    },
    {
      id: 'act-2',
      title: 'Flash Cards',
      subtitle: 'Learned 20 new flash cards',
      time: 'Today, 09:15 AM',
      stars: 10,
      icon: '🃏',
      color: 'bg-pink-100 text-pink-700',
    },
    {
      id: 'act-3',
      title: 'Matching Games',
      subtitle: 'Completed Level 3',
      time: 'Yesterday, 06:45 PM',
      stars: 20,
      icon: '🧩',
      color: 'bg-purple-100 text-purple-700',
    },
    {
      id: 'act-4',
      title: 'Reward Videos',
      subtitle: 'Watched 2 videos',
      time: 'Yesterday, 05:10 PM',
      stars: 10,
      icon: '🎬',
      color: 'bg-indigo-100 text-indigo-700',
    },
  ]

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
    if (onNavTabChange) onNavTabChange(tabId)
  }

  return (
    <div className="flex-1 flex flex-col gap-5 select-none min-h-0 overflow-y-auto pr-1">
      {/* ── 1. Top Header Section ─────────────────────────────────────────── */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3.5">
          {/* Bar Chart Icon Circle */}
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-500/25 shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 20V10M12 20V4M6 20v-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div>
            <h1 className="text-2xl font-black text-purple-950 tracking-tight leading-none">
              My Progress
            </h1>
            <p className="text-gray-500 text-xs font-semibold mt-1">
              Track your learning journey and see how far you've come!
            </p>
          </div>
        </div>

        {/* Date Range Selector Dropdown */}
        <div className="relative">
          <select className="appearance-none bg-purple-50 hover:bg-purple-100/80 border border-purple-200 text-purple-900 font-extrabold text-xs px-4 py-2.5 pr-8 rounded-2xl cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-purple-400">
            <option value="This Week">📅 This Week</option>
            <option value="Last Week">📅 Last Week</option>
            <option value="This Month">📅 This Month</option>
            <option value="All Time">📅 All Time</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-purple-700 text-xs font-black">
            ⌄
          </div>
        </div>
      </div>

      {/* ── 2. Sub-navigation Tab Bar ─────────────────────────────────────── */}
      <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-purple-100/80 shadow-2xs shrink-0">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/20'
                  : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* ── 3. 4 Summary Metric Cards Grid ────────────────────────────────── */}
      <div className="grid grid-cols-4 gap-4 shrink-0">
        {/* Card 1: Activities Completed */}
        <div className="bg-white rounded-3xl p-4 border border-purple-100/90 shadow-2xs flex items-center justify-between relative overflow-hidden">
          <div>
            <div className="flex items-center gap-1.5 text-gray-500 text-xs font-bold mb-1">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-black">
                ✓
              </span>
              <span>Activities Completed</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-gray-900">28</span>
              <span className="text-sm font-bold text-gray-400">/ 40</span>
            </div>
            <span className="text-[11px] font-extrabold text-emerald-600 block mt-1">
              70% of weekly goal
            </span>
          </div>
          {/* Clipboard Graphic */}
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-2xl shrink-0 shadow-2xs">
            📋
          </div>
        </div>

        {/* Card 2: Stars Earned */}
        <div className="bg-white rounded-3xl p-4 border border-purple-100/90 shadow-2xs flex items-center justify-between relative overflow-hidden">
          <div>
            <div className="flex items-center gap-1.5 text-gray-500 text-xs font-bold mb-1">
              <span className="text-base">⭐</span>
              <span>Stars Earned</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-gray-900">120</span>
              <span className="text-sm font-bold text-gray-400">/ 200</span>
            </div>
            <span className="text-[11px] font-extrabold text-amber-600 block mt-1">
              Keep collecting!
            </span>
          </div>
          {/* Cute Happy Star Graphic */}
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-2xl shrink-0 shadow-2xs animate-bounce" style={{ animationDuration: '3s' }}>
            🌟
          </div>
        </div>

        {/* Card 3: Time Spent */}
        <div className="bg-white rounded-3xl p-4 border border-purple-100/90 shadow-2xs flex items-center justify-between relative overflow-hidden">
          <div>
            <div className="flex items-center gap-1.5 text-gray-500 text-xs font-bold mb-1">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-black">
                🕒
              </span>
              <span>Time Spent</span>
            </div>
            <div className="text-2xl font-black text-gray-900 leading-none mb-1">
              4h 30m
            </div>
            <span className="text-[11px] font-extrabold text-blue-600 block mt-1">
              This week
            </span>
          </div>
          {/* Hourglass Graphic */}
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-2xl shrink-0 shadow-2xs">
            ⏳
          </div>
        </div>

        {/* Card 4: Sessions Completed */}
        <div className="bg-white rounded-3xl p-4 border border-purple-100/90 shadow-2xs flex items-center justify-between relative overflow-hidden">
          <div>
            <div className="flex items-center gap-1.5 text-gray-500 text-xs font-bold mb-1">
              <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-[10px] font-black">
                📊
              </span>
              <span>Sessions Completed</span>
            </div>
            <div className="text-2xl font-black text-gray-900 leading-none mb-1">
              12
            </div>
            <span className="text-[11px] font-extrabold text-purple-600 block mt-1">
              Great consistency!
            </span>
          </div>
          {/* 3D Trophy Graphic */}
          <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-2xl shrink-0 shadow-2xs">
            🏆
          </div>
        </div>
      </div>

      {/* ── 4. Weekly Activity Overview Chart ────────────────────────────── */}
      <div className="bg-white rounded-3xl p-5 border border-purple-100/90 shadow-xs flex flex-col shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-black text-gray-900 text-base">Weekly Activity Overview</h3>
          <div className="flex items-center gap-4 text-xs font-extrabold">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-xs bg-purple-600" />
              <span className="text-gray-600">Activities</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-amber-400">⭐</span>
              <span className="text-gray-600">Stars Earned</span>
            </div>
          </div>
        </div>

        {/* Dual-Axis Visual Chart (SVG + HTML Bars) */}
        <div className="relative h-48 w-full flex items-end justify-between px-8 pt-4 pb-6">
          {/* Y-Axis Grid Lines & Left/Right Labels */}
          <div className="absolute inset-x-8 top-4 bottom-8 flex flex-col justify-between pointer-events-none text-[10px] font-bold text-gray-400">
            {[50, 40, 30, 20, 10, 0].map((val, idx) => (
              <div key={idx} className="relative w-full border-b border-gray-100/80 flex items-center justify-between h-0">
                <span className="absolute -left-6 -top-2">{val}</span>
                <span className="absolute -right-6 -top-2">{val * 2}</span>
              </div>
            ))}
          </div>

          {/* Golden Line Graph Overlay for Stars Earned */}
          <svg className="absolute inset-x-8 top-4 bottom-8 w-[calc(100%-4rem)] h-[calc(100%-3rem)] pointer-events-none overflow-visible">
            {/* Smooth Line Path */}
            <path
              d="M 35 110 L 115 80 L 195 50 L 275 68 L 355 25 L 435 42 L 515 95"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Star Node Markers */}
            {[
              { x: 35, y: 110, val: 40 },
              { x: 115, y: 80, val: 60 },
              { x: 195, y: 50, val: 80 },
              { x: 275, y: 68, val: 68 },
              { x: 355, y: 25, val: 95 },
              { x: 435, y: 42, val: 84 },
              { x: 515, y: 95, val: 50 },
            ].map((pt, idx) => (
              <g key={idx}>
                <circle cx={pt.x} cy={pt.y} r="7" fill="#FBBF24" stroke="white" strokeWidth="2" />
                <polygon
                  points={`${pt.x},${pt.y - 4} ${pt.x + 1.5},${pt.y - 1} ${pt.x + 4},${pt.y - 1} ${pt.x + 2},${pt.y + 1} ${pt.x + 3},${pt.y + 4} ${pt.x},${pt.y + 2} ${pt.x - 3},${pt.y + 4} ${pt.x - 2},${pt.y + 1} ${pt.x - 4},${pt.y - 1} ${pt.x - 1.5},${pt.y - 1}`}
                  fill="#78350F"
                />
              </g>
            ))}
          </svg>

          {/* Bar Column Items */}
          {weeklyData.map((d, idx) => {
            const isHovered = hoveredDay === idx
            const heightPercent = (d.activities / 50) * 100

            return (
              <div
                key={d.day}
                onMouseEnter={() => setHoveredDay(idx)}
                onMouseLeave={() => setHoveredDay(null)}
                className="flex-1 flex flex-col items-center justify-end h-full z-10 cursor-pointer group"
              >
                {/* Tooltip on hover */}
                {isHovered && (
                  <div className="absolute -top-10 bg-purple-950 text-white text-[11px] font-black px-2.5 py-1 rounded-xl shadow-lg border border-purple-800 animate-fadeIn z-30">
                    {d.activities} Activities ({d.stars} Stars)
                  </div>
                )}

                {/* Purple Bar */}
                <div
                  className="w-10 rounded-2xl bg-purple-500 group-hover:bg-purple-600 transition-all shadow-xs"
                  style={{ height: `${heightPercent}%` }}
                />

                {/* Day Label */}
                <span className="text-xs font-black text-gray-500 mt-2">
                  {d.day}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── 5. Bottom Row: Recent Activities & Encouragement Card ─────────── */}
      <div className="grid grid-cols-3 gap-4 shrink-0">
        {/* Recent Activities List (2 Cols Wide) */}
        <div className="col-span-2 bg-white rounded-3xl p-5 border border-purple-100/90 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-3.5">
            <h3 className="font-black text-gray-900 text-base">Recent Activities</h3>
            <button className="text-indigo-600 hover:text-indigo-800 text-xs font-extrabold hover:underline cursor-pointer">
              View All
            </button>
          </div>

          <div className="flex flex-col gap-2.5">
            {recentActivities.map((act) => (
              <div
                key={act.id}
                className="flex items-center justify-between p-3 rounded-2xl bg-purple-50/40 hover:bg-purple-50 border border-purple-100/60 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-2xl ${act.color} flex items-center justify-center text-xl shrink-0 shadow-2xs`}>
                    {act.icon}
                  </div>
                  <div>
                    <h4 className="font-black text-xs text-gray-900 leading-tight">
                      {act.title}
                    </h4>
                    <p className="text-[11px] text-gray-500 font-medium">
                      {act.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-gray-400">{act.time}</span>
                  <div className="flex items-center gap-1 font-black text-xs text-amber-600 bg-amber-50 border border-amber-200 px-2 py-1 rounded-xl">
                    <span>⭐</span>
                    <span>+{act.stars}</span>
                  </div>
                  <span className="text-gray-400 font-black text-xs">›</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Encouragement Card (1 Col Wide) */}
        <div className="bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-100 rounded-3xl p-5 border border-purple-100 shadow-xs flex items-center justify-between relative overflow-hidden">
          <div className="flex-1 pr-2">
            <div className="bg-white/80 backdrop-blur-xs px-3 py-1 rounded-full text-purple-900 text-xs font-black inline-block mb-2 shadow-2xs">
              Great job!
            </div>
            <h4 className="font-black text-purple-950 text-sm leading-snug">
              You're on the right track! 🎉
            </h4>
          </div>

          {/* Waving Boy Mascot Graphic */}
          <div className="w-20 h-20 shrink-0 relative flex items-center justify-center animate-float">
            <svg width="76" height="76" viewBox="0 0 100 100" fill="none" className="drop-shadow-md">
              {/* Hair */}
              <circle cx="50" cy="38" r="22" fill="#451A03" />
              <path d="M 30 38 Q 50 18 70 38 Z" fill="#451A03" />
              {/* Face */}
              <circle cx="50" cy="44" r="18" fill="#FDE68A" />
              {/* Eyes & Smile */}
              <circle cx="43" cy="42" r="2.5" fill="#1E293B" />
              <circle cx="57" cy="42" r="2.5" fill="#1E293B" />
              <path d="M 44 48 Q 50 54 56 48" fill="#EF4444" />
              {/* Shirt & Waving Arm */}
              <path d="M 32 62 L 68 62 L 60 92 L 40 92 Z" fill="#6C4DE6" />
              <path d="M 68 64 Q 85 45 80 35" stroke="#FDE68A" strokeWidth="6" strokeLinecap="round" fill="none" />
              <circle cx="80" cy="35" r="4" fill="#FDE68A" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
