import { UserStats } from '../types'

interface ReportModalProps {
  stats: UserStats
  userName: string
  onClose: () => void
}

export function ReportModal({ stats, userName, onClose }: ReportModalProps) {
  return (
    <div className="fixed inset-0 bg-purple-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 w-full max-w-lg border-4 border-purple-300 shadow-2xl relative animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 text-gray-500 hover:bg-purple-100 hover:text-purple-700 font-black text-lg flex items-center justify-center transition-colors cursor-pointer"
        >
          ✕
        </button>

        <div className="mb-6">
          <div className="inline-block bg-purple-100 text-purple-800 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-2">
            Learning Analytics
          </div>
          <h2 className="text-3xl font-black text-gray-900">{userName}'s Daily Report</h2>
          <p className="text-gray-500 text-sm font-medium">
            Great progress today! Keep up the daily practice for optimal speech therapy gains.
          </p>
        </div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-purple-50 p-3 rounded-2xl border border-purple-100 text-center">
            <div className="text-2xl mb-1">🃏</div>
            <div className="font-black text-xl text-purple-900">{stats.cardsLearned}</div>
            <div className="text-[11px] font-bold text-gray-500">Cards Mastered</div>
          </div>
          <div className="bg-amber-50 p-3 rounded-2xl border border-amber-100 text-center">
            <div className="text-2xl mb-1">⭐</div>
            <div className="font-black text-xl text-amber-900">{stats.starsEarned}</div>
            <div className="text-[11px] font-bold text-gray-500">Total Stars</div>
          </div>
          <div className="bg-orange-50 p-3 rounded-2xl border border-orange-100 text-center">
            <div className="text-2xl mb-1">🔥</div>
            <div className="font-black text-xl text-orange-900">{stats.dayStreak} Days</div>
            <div className="text-[11px] font-bold text-gray-500">Active Streak</div>
          </div>
        </div>

        {/* Weekly Activity Chart Simulation */}
        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="font-black text-xs text-gray-800">Weekly Practice Time</span>
            <span className="text-xs font-bold text-purple-700">Avg. 18 mins / day</span>
          </div>
          <div className="flex items-end justify-between h-28 gap-2 pt-2">
            {[
              { day: 'Mon', height: '60%', count: '15m' },
              { day: 'Tue', height: '80%', count: '20m' },
              { day: 'Wed', height: '40%', count: '10m' },
              { day: 'Thu', height: '90%', count: '25m' },
              { day: 'Fri', height: '70%', count: '18m' },
              { day: 'Sat', height: '100%', count: '30m' },
              { day: 'Sun', height: '65%', count: '16m' },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center h-full justify-end">
                <span className="text-[10px] font-bold text-gray-400 mb-1">{bar.count}</span>
                <div
                  className="w-full bg-gradient-to-t from-purple-600 to-indigo-500 rounded-t-lg transition-all"
                  style={{ height: bar.height }}
                />
                <span className="text-[10px] font-black text-gray-700 mt-1">{bar.day}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-sm py-3 rounded-2xl transition-all cursor-pointer shadow-md"
        >
          Close Report
        </button>
      </div>
    </div>
  )
}
