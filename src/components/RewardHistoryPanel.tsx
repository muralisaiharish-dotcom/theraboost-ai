import { useApp } from '../contexts/AppContext'

export function RewardHistoryPanel() {
  const { state } = useApp()
  const { rewardHistory } = state

  const recent = rewardHistory
    .slice()
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  if (recent.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-xs text-center">
        <div className="text-3xl mb-2">🎬</div>
        <h3 className="font-black text-xs text-gray-900">No Reward History Yet</h3>
        <p className="text-[10px] text-gray-500 font-semibold mt-0.5">
          Watch reward videos after completing activities to start building history!
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-3xl p-4 border border-purple-100 shadow-xs flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🏆</span>
          <h3 className="font-black text-sm text-gray-900">Reward Video History</h3>
        </div>
        <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
          {recent.length} videos unlocked
        </span>
      </div>

      <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-1">
        {recent.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3 rounded-2xl bg-purple-50/50 border border-purple-100/60 hover:bg-purple-50 transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center text-lg shrink-0 shadow-xs">
                🎬
              </div>
              <div className="min-w-0">
                <h4 className="font-black text-xs text-gray-900 truncate leading-tight">{item.title}</h4>
                <div className="flex items-center gap-2 text-[10px] text-gray-500 font-semibold mt-0.5">
                  <span className="bg-purple-100 text-purple-800 font-bold px-1.5 py-0.2 rounded-md">
                    {item.category}
                  </span>
                  <span>•</span>
                  <span>{new Date(item.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end shrink-0">
              <span className="text-xs font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-100">
                +{item.starsEarned} ⭐
              </span>
              <span className="text-[9px] font-bold text-emerald-600 mt-1">
                {item.watchCompletion ?? 100}% watched
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
