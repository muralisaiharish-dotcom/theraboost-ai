import { Category, UserStats } from '../types'

interface RightPanelProps {
  stats: UserStats
  categories: Category[]
  activeCategory: string
  onSelectCategory: (category: string) => void
  onOpenReport?: () => void
  onOpenCategoryModal?: () => void
}

export function RightPanel({
  stats,
  categories,
  activeCategory,
  onSelectCategory,
  onOpenReport,
  onOpenCategoryModal,
}: RightPanelProps) {
  const currentCat = categories.find((c) => c.name === activeCategory) || categories[0]

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
            View Report
          </button>
        </div>

        {/* 3 Stats Row Badges */}
        <div className="grid grid-cols-3 gap-2.5 mb-4">
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-2.5 flex flex-col items-center justify-center text-center">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-base mb-1">
              🃏
            </div>
            <span className="font-black text-gray-900 text-base leading-none">{stats.cardsLearned}</span>
            <span className="text-gray-400 text-[10px] font-bold mt-1 leading-tight">Cards Learned</span>
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

        {/* Active Category Progress Bar */}
        <div className="bg-purple-50/80 rounded-2xl p-3.5 border border-purple-100">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xl">{currentCat.icon}</span>
              <span className="font-black text-gray-900 text-xs">{currentCat.name}</span>
            </div>
            <span className="font-black text-purple-700 text-xs">{currentCat.progress}%</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2.5 bg-purple-200/60 rounded-full overflow-hidden mb-1">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${currentCat.progress}%` }}
            />
          </div>

          <div className="flex justify-end text-[11px] font-bold text-gray-400">
            <span>{Math.round((currentCat.progress / 100) * currentCat.count)} / {currentCat.count} Cards</span>
          </div>
        </div>
      </div>

      {/* ── Choose Category Grid ────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-xs">
        <h3 className="font-black text-gray-900 text-sm mb-3">Choose Category</h3>

        <div className="grid grid-cols-3 gap-2.5 mb-3">
          {categories.map((cat) => {
            const isSelected = cat.name === activeCategory
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.name)}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-500/25 scale-[1.03]'
                    : 'bg-gray-50 hover:bg-purple-50 border border-gray-100 hover:border-purple-200 text-gray-700'
                }`}
              >
                <span className="text-2xl mb-1">{cat.icon}</span>
                <span className="font-black text-xs text-center truncate w-full">{cat.name}</span>
              </button>
            )
          })}
        </div>

        {/* View All Categories Button */}
        <button
          onClick={onOpenCategoryModal}
          className="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 font-extrabold text-xs py-2.5 rounded-2xl flex items-center justify-center gap-2 border border-purple-100 transition-all cursor-pointer"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>View All Categories</span>
        </button>
      </div>

      {/* ── Learning Tip Card ───────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-3xl p-4 border border-amber-100 relative overflow-hidden shadow-xs">
        <div className="flex items-start gap-3">
          {/* Star Mascot Graphic */}
          <div className="w-14 h-14 shrink-0 flex items-center justify-center text-4xl animate-bounce" style={{ animationDuration: '2.5s' }}>
            ⭐
          </div>
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="font-black text-amber-900 text-xs">Learning Tip</span>
              <span className="text-xs">❤️</span>
            </div>
            <p className="text-amber-800 text-xs font-bold leading-relaxed">
              Practice a little every day to improve your memory and speaking!
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
