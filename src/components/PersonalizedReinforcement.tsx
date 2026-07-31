import { useState } from 'react'

type MemoryStrength = 'Strong' | 'Medium' | 'Weak'
type ScheduleTab = 'Today' | 'Tomorrow' | 'This Week' | 'Custom'

interface ScheduleActivity {
  id: string
  title: string
  subtitle: string
  memoryStrength: MemoryStrength
  time: string
  icon: string
  iconBg: string
  actionLabel: string
  completed?: boolean
}

const SCHEDULE_DATA: Record<ScheduleTab, ScheduleActivity[]> = {
  Today: [
    {
      id: 'sp-1',
      title: 'Speech Practice – Pronunciation',
      subtitle: 'Review words: 15 difficult words',
      memoryStrength: 'Strong',
      time: '10:00 AM',
      icon: '🎙️',
      iconBg: 'bg-emerald-500',
      actionLabel: 'Start Now',
    },
    {
      id: 'fc-1',
      title: 'Flash Cards – Daily Review',
      subtitle: 'Topic: Fruits, Animals, Objects',
      memoryStrength: 'Medium',
      time: '02:00 PM',
      icon: '🃏',
      iconBg: 'bg-blue-500',
      actionLabel: 'Start Now',
    },
    {
      id: 'mg-1',
      title: 'Matching Games – Concepts',
      subtitle: 'Match shapes, colors and more',
      memoryStrength: 'Weak',
      time: '05:30 PM',
      icon: '🧩',
      iconBg: 'bg-rose-500',
      actionLabel: 'Start Now',
    },
    {
      id: 'rv-1',
      title: 'Reward Videos',
      subtitle: 'Watch and relax!',
      memoryStrength: 'Strong',
      time: '07:00 PM',
      icon: '▶️',
      iconBg: 'bg-purple-600',
      actionLabel: 'Watch Now',
    },
  ],
  Tomorrow: [
    {
      id: 'sp-2',
      title: 'Speech Practice – Fluency',
      subtitle: 'Practice 10 sentences aloud',
      memoryStrength: 'Medium',
      time: '09:30 AM',
      icon: '🎙️',
      iconBg: 'bg-emerald-500',
      actionLabel: 'Start Now',
    },
    {
      id: 'mg-2',
      title: 'Matching Games – Colors',
      subtitle: 'Color matching challenge',
      memoryStrength: 'Weak',
      time: '03:00 PM',
      icon: '🧩',
      iconBg: 'bg-rose-500',
      actionLabel: 'Start Now',
    },
    {
      id: 'rv-2',
      title: 'Reward Videos',
      subtitle: 'Fun learning videos',
      memoryStrength: 'Strong',
      time: '06:00 PM',
      icon: '▶️',
      iconBg: 'bg-purple-600',
      actionLabel: 'Watch Now',
    },
  ],
  'This Week': [
    {
      id: 'sp-3',
      title: 'Speech Practice – Vocabulary',
      subtitle: 'New word set: 20 words',
      memoryStrength: 'Weak',
      time: 'Mon – 10:00 AM',
      icon: '🎙️',
      iconBg: 'bg-emerald-500',
      actionLabel: 'Start Now',
    },
    {
      id: 'fc-3',
      title: 'Flash Cards – Animals',
      subtitle: 'Review animal category',
      memoryStrength: 'Strong',
      time: 'Tue – 11:00 AM',
      icon: '🃏',
      iconBg: 'bg-blue-500',
      actionLabel: 'Start Now',
    },
    {
      id: 'mg-3',
      title: 'Matching Games – Numbers',
      subtitle: '1 to 20 number matching',
      memoryStrength: 'Medium',
      time: 'Wed – 04:00 PM',
      icon: '🧩',
      iconBg: 'bg-rose-500',
      actionLabel: 'Start Now',
    },
    {
      id: 'rv-3',
      title: 'Reward Videos',
      subtitle: 'Weekend special playlist',
      memoryStrength: 'Strong',
      time: 'Sat – 07:00 PM',
      icon: '▶️',
      iconBg: 'bg-purple-600',
      actionLabel: 'Watch Now',
    },
  ],
  Custom: [
    {
      id: 'custom-1',
      title: 'Custom Session – Mixed Review',
      subtitle: 'AI-picked based on your weak areas',
      memoryStrength: 'Weak',
      time: 'Flexible',
      icon: '🤖',
      iconBg: 'bg-indigo-500',
      actionLabel: 'Start Now',
    },
  ],
}

const strengthConfig: Record<MemoryStrength, { label: string; dotColor: string; badgeBg: string; badgeText: string }> = {
  Strong: {
    label: 'Memory Strength: Strong',
    dotColor: 'bg-emerald-400',
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-emerald-700',
  },
  Medium: {
    label: 'Memory Strength: Medium',
    dotColor: 'bg-amber-400',
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-700',
  },
  Weak: {
    label: 'Memory Strength: Weak',
    dotColor: 'bg-rose-400',
    badgeBg: 'bg-rose-50',
    badgeText: 'text-rose-700',
  },
}

interface PersonalizedReinforcementProps {
  userName: string
}

export function PersonalizedReinforcement({ userName }: PersonalizedReinforcementProps) {
  const [activeTab, setActiveTab] = useState<ScheduleTab>('Today')
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())
  const [editMode, setEditMode] = useState(false)

  const tabs: ScheduleTab[] = ['Today', 'Tomorrow', 'This Week', 'Custom']
  const tabIcons: Record<ScheduleTab, string> = {
    Today: '📅',
    Tomorrow: '📅',
    'This Week': '📅',
    Custom: '✏️',
  }

  const activities = SCHEDULE_DATA[activeTab]

  const handleAction = (id: string) => {
    setCompletedIds((prev) => new Set([...prev, id]))
  }

  return (
    <div className="flex-1 flex flex-col gap-4 min-w-0">
      {/* ── Page Title Banner ─────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-xs flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-2xl shrink-0 shadow-md shadow-purple-300/40">
          📆
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-black text-gray-900 leading-tight">
            Personalized Reinforcement Schedules
          </h1>
          <p className="text-sm text-gray-500 font-semibold mt-0.5">
            AI-powered schedules designed to reinforce learning at the right time.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs px-4 py-2 rounded-xl border border-purple-200 transition-all hover:scale-105 cursor-pointer shrink-0">
          <span className="text-purple-500">ℹ️</span> How it works?
        </button>
      </div>

      {/* ── Smart Reinforcement Info Banner ───────────────────────────────── */}
      <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-purple-100 rounded-3xl p-5 flex items-center gap-5 shadow-xs">
        {/* Brain Illustration */}
        <div className="shrink-0 w-20 h-20 flex items-center justify-center">
          <svg viewBox="0 0 100 100" width="80" height="80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="50" cy="55" rx="38" ry="32" fill="#DDD6FE" />
            <ellipse cx="50" cy="52" rx="30" ry="26" fill="#C4B5FD" />
            <path d="M30 52 Q35 38 50 38 Q65 38 70 52" stroke="#7C3AED" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M50 38 Q50 30 55 25" stroke="#7C3AED" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <circle cx="57" cy="22" r="4" fill="#A78BFA" />
            <circle cx="68" cy="32" r="3" fill="#C4B5FD" />
            <circle cx="32" cy="35" r="3" fill="#C4B5FD" />
            <path d="M34 58 Q38 65 50 65 Q62 65 66 58" stroke="#7C3AED" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Glasses */}
            <circle cx="41" cy="50" r="7" stroke="#7C3AED" strokeWidth="2" fill="white" fillOpacity="0.6" />
            <circle cx="59" cy="50" r="7" stroke="#7C3AED" strokeWidth="2" fill="white" fillOpacity="0.6" />
            <line x1="48" y1="50" x2="52" y2="50" stroke="#7C3AED" strokeWidth="2" />
            <circle cx="40" cy="50" r="2.5" fill="#7C3AED" />
            <circle cx="58" cy="50" r="2.5" fill="#7C3AED" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-black text-purple-800 text-base mb-1">Smart Reinforcement for Better Learning</h2>
          <p className="text-sm text-gray-600 font-semibold leading-relaxed">
            We show activities and reviews to {userName} at the perfect time based on his performance and memory strength.
          </p>
          <p className="text-sm text-purple-600 font-bold mt-1.5">
            More practice today → Stronger memory tomorrow! 👍
          </p>
        </div>
        {/* Bar chart decoration */}
        <div className="shrink-0 hidden lg:flex items-end gap-1 h-14 opacity-60">
          {[40, 65, 55, 80, 70, 90].map((h, i) => (
            <div
              key={i}
              className="w-3 rounded-t-md bg-gradient-to-t from-purple-500 to-indigo-400"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>

      {/* ── Schedule Tabs + Edit ───────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl border border-purple-100 shadow-xs overflow-hidden">
        {/* Tab Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-0 border-b border-purple-50">
          <div className="flex items-center gap-1">
            <span className="font-black text-gray-900 text-sm mr-3">Your Schedule</span>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-t-xl text-xs font-bold transition-all cursor-pointer border-b-2 ${
                  activeTab === tab
                    ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                    : 'text-gray-500 hover:text-purple-700 hover:bg-purple-50 border-transparent'
                }`}
              >
                <span>{tabIcons[tab]}</span>
                {tab}
              </button>
            ))}
          </div>
          <button
            onClick={() => setEditMode((p) => !p)}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl transition-all hover:scale-105 cursor-pointer mb-1 ${
              editMode
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-purple-600 hover:text-purple-800 bg-purple-50 hover:bg-purple-100'
            }`}
          >
            ✏️ {editMode ? 'Done Editing' : 'Edit Schedule'}
          </button>
        </div>

        {/* Activity List */}
        <div className="divide-y divide-purple-50">
          {activities.map((activity) => {
            const isCompleted = completedIds.has(activity.id)
            const sc = strengthConfig[activity.memoryStrength]
            return (
              <div
                key={activity.id}
                className={`flex items-center gap-4 px-5 py-4 group transition-all ${
                  isCompleted ? 'opacity-60 bg-gray-50/60' : 'hover:bg-purple-50/30'
                }`}
              >
                {/* Strength dot */}
                <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${sc.dotColor} shadow-sm ring-2 ring-white`} />

                {/* Icon */}
                <div
                  className={`w-11 h-11 rounded-2xl ${activity.iconBg} flex items-center justify-center text-xl shrink-0 shadow-sm`}
                >
                  {activity.icon}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className={`font-black text-sm ${isCompleted ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                    {activity.title}
                  </div>
                  <div className="text-xs text-gray-500 font-semibold mt-0.5">{activity.subtitle}</div>
                  <span
                    className={`inline-block mt-1.5 text-[10px] font-black px-2 py-0.5 rounded-full ${sc.badgeBg} ${sc.badgeText}`}
                  >
                    {sc.label}
                  </span>
                </div>

                {/* Time + Action */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-bold">
                    <span>🕐</span>
                    {activity.time}
                  </div>
                  {isCompleted ? (
                    <span className="flex items-center gap-1 bg-emerald-100 text-emerald-700 text-xs font-black px-4 py-1.5 rounded-xl">
                      ✅ Done!
                    </span>
                  ) : (
                    <button
                      onClick={() => handleAction(activity.id)}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-black px-5 py-1.5 rounded-xl shadow-md shadow-purple-300/40 hover:scale-105 transition-all cursor-pointer"
                    >
                      {activity.actionLabel}
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom motivation strip */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-t border-purple-100 px-5 py-3 flex items-center gap-2">
          <span className="text-lg">⏰</span>
          <p className="text-xs text-purple-700 font-bold flex-1">
            Consistent practice with timely reviews helps build stronger memory and confidence!
          </p>
          <span className="text-lg">✨</span>
        </div>
      </div>
    </div>
  )
}
