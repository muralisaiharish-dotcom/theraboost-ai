import { useApp } from '../contexts/AppContext'
import { computeAnalytics } from '../engine/AnalyticsEngine'
import { useAuth } from '../contexts/AuthContext'

export function AIInsightsCard() {
  const { state } = useApp()
  const { state: authState } = useAuth()
  const userName = authState.user?.name || 'Child'

  const analytics = computeAnalytics({
    activityLog: state.activityLog,
    rewardHistory: state.rewardHistory,
    speechScore: state.speechScore,
    cardsLearned: state.stats.cardsLearned,
    dayStreak: state.stats.dayStreak,
    starsEarned: state.stats.starsEarned,
    weeklyCompleted: state.stats.weeklyCompleted,
    weeklyGoal: state.stats.weeklyGoal,
    userName,
  })

  return (
    <div className="bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 border border-purple-100 rounded-3xl p-4 shadow-xs flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🤖</span>
          <h3 className="font-black text-sm text-purple-950">Therapist & AI Insights</h3>
        </div>
        <span className="text-[10px] font-extrabold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
          Live AI Engine
        </span>
      </div>

      {/* AI Summary Paragraph */}
      <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-3 border border-purple-100/80">
        <p className="text-xs text-purple-900 font-semibold leading-relaxed">
          {analytics.aiSummary}
        </p>
      </div>

      {/* Bulleted Insights */}
      <div className="flex flex-col gap-2">
        {analytics.aiInsights.map((insight, idx) => (
          <div
            key={idx}
            className="flex items-start gap-2 bg-white/60 p-2.5 rounded-xl border border-purple-100 text-xs font-bold text-purple-950"
          >
            <span className="text-purple-600 shrink-0 mt-0.5">💡</span>
            <span className="leading-snug">{insight}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
