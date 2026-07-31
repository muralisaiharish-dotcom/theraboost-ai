import { useState } from 'react'

export function AchievementsScreen() {
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
    <div className="flex flex-col gap-4 px-4 py-4 pb-6 animate-slideUp">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 flex items-center justify-center text-xl text-white shadow-md">🏆</div>
          <div>
            <h1 className="text-lg font-black text-gray-900">Achievements</h1>
            <p className="text-[10px] text-gray-500 font-semibold">Celebrate your trophies & milestones!</p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-3 py-1 rounded-xl text-amber-900 font-black text-xs">
          <span>🏅</span>
          <span>4 / 6</span>
        </div>
      </div>

      {/* Filter Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer whitespace-nowrap ${
              filterCategory === cat
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Badges 2-Column Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filteredBadges.map((badge) => (
          <div
            key={badge.id}
            className={`rounded-2xl p-3 border flex flex-col justify-between transition-all ${
              badge.unlocked
                ? 'bg-white border-purple-100 shadow-2xs hover:shadow-md'
                : 'bg-gray-50/70 border-gray-200 opacity-75'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className={`w-11 h-11 rounded-xl ${badge.badgeColor} border flex items-center justify-center text-2xl shadow-2xs`}>
                {badge.icon}
              </div>
              <span
                className={`text-[9px] font-black px-2 py-0.5 rounded-lg ${
                  badge.unlocked
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {badge.unlocked ? '✓ Unlocked' : '🔒 Locked'}
              </span>
            </div>

            <div>
              <h3 className="font-black text-xs text-gray-900 mb-1 leading-snug">{badge.title}</h3>
              <p className="text-[10px] text-gray-500 font-semibold leading-tight mb-2 line-clamp-2">
                {badge.description}
              </p>

              <div className="flex items-center justify-between text-[9px] font-bold text-gray-400 border-t border-gray-100 pt-2">
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
