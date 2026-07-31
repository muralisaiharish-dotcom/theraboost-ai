import { useState } from 'react'

export function MyProgressScreen() {
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

  const recentActivities = [
    {
      id: 'act-1',
      title: 'Speech Practice',
      subtitle: 'Pronounced 15 new words',
      time: 'Today, 10:30 AM',
      stars: 15,
      icon: '🎙️',
      color: 'bg-emerald-100 text-emerald-700',
    },
    {
      id: 'act-2',
      title: 'Flash Cards',
      subtitle: 'Learned 20 new flash cards',
      time: 'Today, 09:15 AM',
      stars: 10,
      icon: '🃏',
      color: 'bg-pink-100 text-pink-700',
    },
    {
      id: 'act-3',
      title: 'Matching Games',
      subtitle: 'Completed Level 3',
      time: 'Yesterday, 06:45 PM',
      stars: 20,
      icon: '🧩',
      color: 'bg-purple-100 text-purple-700',
    },
    {
      id: 'act-4',
      title: 'Reward Videos',
      subtitle: 'Watched 2 videos',
      time: 'Yesterday, 05:10 PM',
      stars: 10,
      icon: '🎬',
      color: 'bg-indigo-100 text-indigo-700',
    },
  ]

  const skillsData = [
    { skill: 'Pronunciation', pct: 92, color: 'bg-emerald-500' },
    { skill: 'Vocabulary', pct: 85, color: 'bg-purple-500' },
    { skill: 'Fluency', pct: 78, color: 'bg-blue-500' },
    { skill: 'Listening', pct: 88, color: 'bg-amber-500' },
    { skill: 'Memory', pct: 90, color: 'bg-pink-500' },
    { skill: 'Sentence Formation', pct: 75, color: 'bg-indigo-500' },
  ]

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

        <select className="bg-purple-50 border border-purple-200 text-purple-900 font-extrabold text-xs px-3 py-1.5 rounded-xl outline-none cursor-pointer">
          <option>This Week</option>
          <option>Last Week</option>
          <option>This Month</option>
        </select>
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
            <span className="text-xl font-black text-gray-900">28/40</span>
            <span className="text-[9px] font-extrabold text-emerald-600 block mt-0.5">70% of goal</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">📋</div>
        </div>

        <div className="bg-white rounded-2xl p-3 border border-purple-100 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-500 block">Stars</span>
            <span className="text-xl font-black text-gray-900">120/200</span>
            <span className="text-[9px] font-extrabold text-amber-600 block mt-0.5">Keep it up!</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl">⭐</div>
        </div>

        <div className="bg-white rounded-2xl p-3 border border-purple-100 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-500 block">Time Spent</span>
            <span className="text-xl font-black text-gray-900">4h 30m</span>
            <span className="text-[9px] font-extrabold text-blue-600 block mt-0.5">This week</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">⏳</div>
        </div>

        <div className="bg-white rounded-2xl p-3 border border-purple-100 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-500 block">Sessions</span>
            <span className="text-xl font-black text-gray-900">12</span>
            <span className="text-[9px] font-extrabold text-purple-600 block mt-0.5">Consistent</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl">🏆</div>
        </div>
      </div>

      {activeTab === 'Skills' ? (
        /* Skill Breakdown Tab */
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
      ) : (
        /* Weekly Activity Chart */
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
      )}

      {/* Recent Activities List */}
      <div className="bg-white rounded-3xl p-4 border border-purple-100 shadow-xs">
        <h3 className="font-black text-sm text-gray-900 mb-3">Recent Activities</h3>
        <div className="flex flex-col gap-2">
          {recentActivities.map((act) => (
            <div key={act.id} className="flex items-center justify-between p-2.5 rounded-2xl bg-purple-50/40 border border-purple-100/60">
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-xl ${act.color} flex items-center justify-center text-lg shrink-0`}>
                  {act.icon}
                </div>
                <div>
                  <h4 className="font-black text-xs text-gray-900 leading-tight">{act.title}</h4>
                  <p className="text-[10px] text-gray-500 font-semibold">{act.subtitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg">
                <span>⭐</span>
                <span>+{act.stars}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
