import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

export function ParentDashboardScreen() {
  const { state: authState } = useAuth()
  const parentName = authState.user?.name || 'Parent'
  const [downloading, setDownloading] = useState(false)

  const handleDownloadPDF = () => {
    setDownloading(true)
    setTimeout(() => {
      setDownloading(false)
      window.print()
    }, 1000)
  }

  return (
    <div className="flex flex-col gap-4 px-4 py-4 pb-6 animate-slideUp">
      {/* Header Greeting */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-black text-gray-900">Welcome, {parentName}! 👩‍👦</h1>
          <p className="text-[10px] text-gray-500 font-semibold">Child progress & analytics portal</p>
        </div>

        <button
          onClick={handleDownloadPDF}
          disabled={downloading}
          className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs px-3 py-1.5 rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer disabled:opacity-50"
        >
          <span>{downloading ? '⏳' : '📑'}</span>
          <span>{downloading ? 'Preparing...' : 'PDF Report'}</span>
        </button>
      </div>

      {/* Child Summary Overview Card */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white rounded-3xl p-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-3xl border border-white/30">
            👦
          </div>
          <div>
            <div className="text-xs font-bold text-purple-200">Active Learner</div>
            <h2 className="text-base font-black">Rahul's Profile</h2>
            <div className="text-[10px] text-purple-200 font-semibold mt-0.5">
              Level 3 • 1,250⭐ • 7-Day Streak 🔥
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xl font-black text-amber-300">88%</div>
          <div className="text-[9px] font-bold text-purple-200">Speech Accuracy</div>
        </div>
      </div>

      {/* Quick Analytics Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl p-3 border border-purple-100 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-500">Weekly Practice</span>
            <span className="text-xs">⏱️</span>
          </div>
          <div className="text-xl font-black text-gray-900 mt-1">4h 30m</div>
          <span className="text-[9px] font-extrabold text-emerald-600 mt-1">+15% vs last week</span>
        </div>

        <div className="bg-white rounded-2xl p-3 border border-purple-100 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-500">Words Mastered</span>
            <span className="text-xs">🗣️</span>
          </div>
          <div className="text-xl font-black text-gray-900 mt-1">64 / 100</div>
          <span className="text-[9px] font-extrabold text-purple-600 mt-1">64% category complete</span>
        </div>
      </div>

      {/* Speech Performance Breakdown */}
      <div className="bg-white rounded-3xl p-4 border border-purple-100 shadow-xs flex flex-col gap-3">
        <h3 className="font-black text-sm text-gray-900">Speech Accuracy Breakdown</h3>
        <div className="flex flex-col gap-2.5">
          {[
            { metric: 'Pronunciation Accuracy', score: 92, color: 'bg-emerald-500' },
            { metric: 'Sentence Fluency', score: 84, color: 'bg-blue-500' },
            { metric: 'Vocabulary Recall', score: 88, color: 'bg-purple-500' },
            { metric: 'Listening Comprehension', score: 90, color: 'bg-amber-500' },
          ].map((item) => (
            <div key={item.metric}>
              <div className="flex items-center justify-between text-xs font-bold text-gray-700 mb-1">
                <span>{item.metric}</span>
                <span>{item.score}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Parent Recommendations */}
      <div className="bg-purple-50 border border-purple-100 rounded-3xl p-4 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs font-black text-purple-900">
          <span>💡</span>
          <span>Therapist & AI Insights</span>
        </div>
        <p className="text-xs text-purple-800 font-semibold leading-relaxed">
          Rahul showed significant improvement in multi-syllable word pronunciation this week! Encourage practice with <strong>'Transport'</strong> flash cards to build vocabulary.
        </p>
      </div>

      {/* Reward History */}
      <div className="bg-white rounded-3xl p-4 border border-purple-100 shadow-xs">
        <h3 className="font-black text-sm text-gray-900 mb-3">Recent Milestones & Badges</h3>
        <div className="flex flex-col gap-2">
          {[
            { badge: 'Speech Champion', date: 'July 24', icon: '🎙️' },
            { badge: 'Super Matcher', date: 'July 26', icon: '🧩' },
            { badge: '7-Day Streak Master', date: 'Yesterday', icon: '🔥' },
          ].map((m) => (
            <div key={m.badge} className="flex items-center justify-between p-2.5 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="flex items-center gap-2.5">
                <span className="text-lg">{m.icon}</span>
                <span className="text-xs font-black text-gray-900">{m.badge}</span>
              </div>
              <span className="text-[10px] font-bold text-gray-400">{m.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
