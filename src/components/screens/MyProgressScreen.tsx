import { useState } from 'react'
import { useApp } from '../../contexts/AppContext'
import { useAuth } from '../../contexts/AuthContext'
import { AIInsightsCard } from '../AIInsightsCard'
import { triggerPrintReport } from '../PrintableReport'

export function MyProgressScreen() {
  const { state, motivationScore, aiRecommendation } = useApp()
  const { state: authState } = useAuth()
  const parentName = authState.user?.name || 'Parent'
  const [activeTab, setActiveTab] = useState('Overview')

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

  const skillsData = [
    { skill: 'Pronunciation', pct: state.speechScore, color: 'bg-emerald-500' },
    { skill: 'Vocabulary', pct: Math.min(100, 60 + state.stats.cardsLearned * 2), color: 'bg-purple-500' },
    { skill: 'Fluency', pct: 78, color: 'bg-blue-500' },
    { skill: 'Listening', pct: 88, color: 'bg-amber-500' },
    { skill: 'Memory', pct: 90, color: 'bg-pink-500' },
    { skill: 'Sentence Formation', pct: 75, color: 'bg-indigo-500' },
  ]

  const handlePrint = () => {
    triggerPrintReport(state, 'Rahul', parentName, motivationScore, aiRecommendation, 'Progress')
  }

  return (
    <div className="flex flex-col gap-4 px-4 py-4 pb-6 animate-slideUp">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-xl text-white shadow-md">📊</div>
          <div>
            <h1 className="text-lg font-black text-gray-900">My Progress</h1>
            <p className="text-[10px] text-gray-500 font-semibold">Track your learning journey!</p>
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs px-3 py-1.5 rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5"
        >
          <span>📑</span>
          <span>PDF Report</span>
        </button>
      </div>

      {/* Sub Navigation */}
      <div className="flex gap-1 bg-white p-1 rounded-2xl border border-purple-100 shadow-2xs overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-1 py-1.5 px-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Summary 2x2 Metric Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl p-3 border border-purple-100 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-500 block">Activities</span>
            <span className="text-xl font-black text-gray-900">{state.stats.weeklyCompleted}/{state.stats.weeklyGoal}</span>
            <span className="text-[9px] font-extrabold text-emerald-600 block mt-0.5">
              {Math.round((state.stats.weeklyCompleted / state.stats.weeklyGoal) * 100)}% of goal
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">📋</div>
        </div>

        <div className="bg-white rounded-2xl p-3 border border-purple-100 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-500 block">Stars</span>
            <span className="text-xl font-black text-gray-900">{state.stats.starsEarned}⭐</span>
            <span className="text-[9px] font-extrabold text-amber-600 block mt-0.5">Keep it up!</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl">⭐</div>
        </div>

        <div className="bg-white rounded-2xl p-3 border border-purple-100 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-500 block">Day Streak</span>
            <span className="text-xl font-black text-gray-900">{state.stats.dayStreak} 🔥</span>
            <span className="text-[9px] font-extrabold text-blue-600 block mt-0.5">Consecutive</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">🔥</div>
        </div>

        <div className="bg-white rounded-2xl p-3 border border-purple-100 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-500 block">Cards Learned</span>
            <span className="text-xl font-black text-gray-900">{state.stats.cardsLearned}</span>
            <span className="text-[9px] font-extrabold text-purple-600 block mt-0.5">Mastered</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl">🃏</div>
        </div>
      </div>

      {activeTab === 'Reports' ? (
        /* Reports Tab */
        <div className="flex flex-col gap-3">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-3xl p-5 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="font-black text-base">Clinician & Parent Report</h3>
              <p className="text-xs text-purple-200 font-semibold mt-1">
                Export comprehensive progress analysis and AI insights for therapist reviews.
              </p>
            </div>
            <button
              onClick={handlePrint}
              className="bg-amber-400 hover:bg-amber-300 text-purple-950 font-black text-xs px-4 py-2.5 rounded-2xl shadow-md transition-all hover:scale-105 cursor-pointer shrink-0"
            >
              Print / Save PDF →
            </button>
          </div>
          <AIInsightsCard />
        </div>
      ) : activeTab === 'Skills' ? (
        /* Skill Breakdown Tab */
        <div className="flex flex-col gap-3">
          <div className="bg-white rounded-3xl p-4 border border-purple-100 shadow-xs flex flex-col gap-3">
            <h3 className="font-black text-sm text-gray-900">Skill Breakdown</h3>
            <div className="flex flex-col gap-2.5">
              {skillsData.map((item) => (
                <div key={item.skill}>
                  <div className="flex items-center justify-between text-xs font-bold text-gray-700 mb-1">
                    <span>{item.skill}</span>
                    <span>{item.pct}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <AIInsightsCard />
        </div>
      ) : (
        /* Overview & Activities Tabs */
        <>
          <div className="bg-white rounded-3xl p-4 border border-purple-100 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-black text-sm text-gray-900">Weekly Activity</h3>
              <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">Activities / Day</span>
            </div>

            <div className="h-36 flex items-end justify-between gap-1 pt-4 pb-2 px-2">
              {weeklyData.map((d) => {
                const hPct = (d.activities / 45) * 100
                return (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                    <span className="text-[9px] font-bold text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      {d.activities}
                    </span>
                    <div
                      className="w-full max-w-[24px] bg-purple-500 rounded-xl group-hover:bg-purple-600 transition-all shadow-xs"
                      style={{ height: `${hPct}%` }}
                    />
                    <span className="text-[10px] font-black text-gray-500 mt-1">{d.day}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Recent Activity Log from state */}
          <div className="bg-white rounded-3xl p-4 border border-purple-100 shadow-xs">
            <h3 className="font-black text-sm text-gray-900 mb-3">Recent Activity Log</h3>
            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
              {state.activityLog.length === 0 ? (
                <p className="text-xs text-gray-400 font-semibold text-center py-4">
                  No activity logged yet. Start a session to build your log!
                </p>
              ) : (
                state.activityLog.slice(-10).reverse().map((act) => (
                  <div key={act.id} className="flex items-center justify-between p-2.5 rounded-2xl bg-purple-50/40 border border-purple-100/60">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-lg shrink-0">
                        {act.activityType === 'speech' ? '🎙️' : act.activityType === 'flashcard' ? '🃏' : act.activityType === 'matching_game' ? '🧩' : '🎬'}
                      </div>
                      <div>
                        <h4 className="font-black text-xs text-gray-900 leading-tight">{act.title}</h4>
                        <p className="text-[10px] text-gray-500 font-semibold">
                          {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg">
                      <span>⭐</span>
                      <span>+{act.starsEarned}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
