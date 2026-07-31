import { useState } from 'react'

export function Achievements() {
  const [filterCategory, setFilterCategory] = useState('All')

  const achievementBadges = [
    {
      id: 'ach-1',
      title: 'Speech Champion',
      description: 'Pronounce 50 words with >90% accuracy',
      category: 'Speech',
      icon: '🎙️',
      unlocked: true,
      progress: '50 / 50',
      unlockedDate: 'Unlocked July 24',
      badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-300',
    },
    {
      id: 'ach-2',
      title: 'Super Matcher',
      description: 'Match 10 pairs in under 90 seconds',
      category: 'Games',
      icon: '🧩',
      unlocked: true,
      progress: '10 / 10',
      unlockedDate: 'Unlocked July 26',
      badgeColor: 'bg-purple-100 text-purple-700 border-purple-300',
    },
    {
      id: 'ach-3',
      title: '7-Day Streak Master',
      description: 'Practice every single day for a full week',
      category: 'Streak',
      icon: '🔥',
      unlocked: true,
      progress: '7 / 7 Days',
      unlockedDate: 'Unlocked Yesterday',
      badgeColor: 'bg-orange-100 text-orange-700 border-orange-300',
    },
    {
      id: 'ach-4',
      title: 'Culture Explorer',
      description: 'Watch 5 reward videos about Indian culture',
      category: 'Videos',
      icon: '🎬',
      unlocked: true,
      progress: '5 / 5',
      unlockedDate: 'Unlocked Today',
      badgeColor: 'bg-indigo-100 text-indigo-700 border-indigo-300',
    },
    {
      id: 'ach-5',
      title: 'Flash Card Genius',
      description: 'Master 100 flash cards across all categories',
      category: 'Cards',
      icon: '🃏',
      unlocked: false,
      progress: '64 / 100',
      unlockedDate: 'In Progress (64%)',
      badgeColor: 'bg-gray-100 text-gray-400 border-gray-200',
    },
    {
      id: 'ach-6',
      title: 'Star Collector',
      description: 'Earn 2,000 total stars across all exercises',
      category: 'Rewards',
      icon: '⭐',
      unlocked: false,
      progress: '1,250 / 2,000',
      unlockedDate: 'In Progress (62%)',
      badgeColor: 'bg-gray-100 text-gray-400 border-gray-200',
    },
  ]

  const categories = ['All', 'Speech', 'Games', 'Streak', 'Videos', 'Cards']

  const filteredBadges =
    filterCategory === 'All'
      ? achievementBadges
      : achievementBadges.filter((b) => b.category === filterCategory)

  return (
    <div className="flex-1 flex flex-col gap-5 select-none min-h-0 overflow-y-auto pr-1">
      {/* Header Bar */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3.5">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-500/25 shrink-0">
            <span className="text-2xl">🏆</span>
          </div>

          <div>
            <h1 className="text-2xl font-black text-purple-950 tracking-tight leading-none">
              Achievements
            </h1>
            <p className="text-gray-500 text-xs font-semibold mt-1">
              Celebrate your milestones, trophies, and learning achievements!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-2 rounded-2xl text-amber-900 font-black text-sm shadow-2xs">
          <span className="text-base">🏅</span>
          <span>4 / 6 Unlocked</span>
        </div>
      </div>

      {/* Filter Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar shrink-0">
        {categories.map((cat) => {
          const isActive = filterCategory === cat
          return (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-1.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-purple-50/80 hover:bg-purple-100/80 text-purple-700 border border-purple-100'
              }`}
            >
              {cat}
            </button>
          )
        })}
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-3 gap-4 shrink-0">
        {filteredBadges.map((badge) => (
          <div
            key={badge.id}
            className={`rounded-3xl p-5 border flex flex-col justify-between transition-all group ${
              badge.unlocked
                ? 'bg-white border-purple-100 shadow-2xs hover:shadow-md hover:-translate-y-1'
                : 'bg-gray-50/70 border-gray-200 opacity-75'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-14 h-14 rounded-2xl ${badge.badgeColor} border flex items-center justify-center text-3xl shadow-xs group-hover:scale-110 transition-transform`}>
                {badge.icon}
              </div>
              <span
                className={`text-[10px] font-black px-2.5 py-1 rounded-xl ${
                  badge.unlocked
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {badge.unlocked ? '✓ Unlocked' : '🔒 Locked'}
              </span>
            </div>

            <div>
              <h3 className="font-black text-sm text-gray-900 mb-1 leading-snug">
                {badge.title}
              </h3>
              <p className="text-xs text-gray-500 font-medium leading-snug mb-3">
                {badge.description}
              </p>

              <div className="flex items-center justify-between text-[11px] font-bold text-gray-400 border-t border-gray-100 pt-2.5">
                <span>{badge.progress}</span>
                <span className="text-purple-700 font-extrabold">{badge.unlockedDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
