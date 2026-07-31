import { useState, useMemo } from 'react'
import { useApp } from '../../contexts/AppContext'
import { generateSchedule, getAIScheduleInsight } from '../../engine/ScheduleEngine'
import { AIRecommendationCard } from '../AIRecommendationCard'

type ScheduleTab = 'Today' | 'Tomorrow' | 'This Week'

export function ReinforcementScreen() {
  const { navigate, state, aiRecommendation } = useApp()
  const [activeTab, setActiveTab] = useState<ScheduleTab>('Today')

  const activities = useMemo(() => {
    return generateSchedule(
      {
        activityLog: state.activityLog,
        rewardHistory: state.rewardHistory,
        speechScore: state.speechScore,
        cardsLearned: state.stats.cardsLearned,
        dayStreak: state.stats.dayStreak,
        preferredCategory: aiRecommendation.category,
        weeklyCompleted: state.stats.weeklyCompleted,
        weeklyGoal: state.stats.weeklyGoal,
      },
      activeTab,
    )
  }, [state.activityLog, state.rewardHistory, state.speechScore, state.stats, aiRecommendation.category, activeTab])

  const insightText = useMemo(() => {
    return getAIScheduleInsight(activities, 'Rahul')
  }, [activities])

  return (
    <div className="flex flex-col gap-4 px-4 py-4 pb-6 animate-slideUp">
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-2xl bg-purple-600 flex items-center justify-center text-xl text-white shadow-md">📅</div>
        <div>
          <h1 className="text-lg font-black text-gray-900">Personalized Schedule</h1>
          <p className="text-[10px] text-gray-500 font-semibold">AI-generated daily learning reinforcement</p>
        </div>
      </div>

      {/* AI Recommendation Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-3xl p-4 shadow-sm flex items-center gap-3">
        <div className="text-3xl animate-float">🤖</div>
        <div>
          <div className="text-xs font-black">AI Learning Assistant</div>
          <div className="text-[10px] text-purple-200 font-semibold mt-0.5 leading-relaxed">
            {insightText}
          </div>
        </div>
      </div>

      {/* Smart AI Recommended Reward */}
      <AIRecommendationCard compact />

      {/* Tabs */}
      <div className="flex gap-1.5 bg-white p-1 rounded-2xl border border-purple-100 shadow-2xs">
        {(['Today', 'Tomorrow', 'This Week'] as ScheduleTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-1.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer ${
              activeTab === tab
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-gray-600 hover:bg-purple-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Timeline List */}
      <div className="flex flex-col gap-3">
        {activities.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-purple-100 p-3.5 shadow-2xs flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center text-xl shrink-0">
                {item.icon}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-xs text-gray-900 truncate">{item.title}</h3>
                  <span
                    className={`text-[8px] font-black px-1.5 py-0.5 rounded-md shrink-0 ${
                      item.memoryStrength === 'Weak'
                        ? 'bg-red-100 text-red-700'
                        : item.memoryStrength === 'Medium'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {item.memoryStrength} Priority
                  </span>
                </div>
                <p className="text-[10px] text-gray-500 font-semibold mt-0.5 truncate">{item.subtitle}</p>
                <div className="text-[9px] font-bold text-gray-400 mt-1">⏰ {item.time}</div>
              </div>
            </div>

            <button
              onClick={() => navigate(item.screen)}
              className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-xs cursor-pointer transition-transform active:scale-95 shrink-0"
            >
              Start →
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
