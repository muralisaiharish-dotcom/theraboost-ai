import { useApp } from '../../contexts/AppContext'
import { useAuth } from '../../contexts/AuthContext'

export function HomeScreen() {
  const { navigate, state } = useApp()
  const { state: authState } = useAuth()
  const user = authState.user!
  const { stats } = state

  const activities = [
    { id: 'Speech Practice', label: 'Speech Practice', icon: '🎙️', color: '#7C3AED', bg: '#F5F3FF', desc: 'Practice new words & sentences', cta: 'Start' },
    { id: 'Flash Cards', label: 'Flash Cards', icon: '🃏', color: '#EC4899', bg: '#FDF2F8', desc: 'Flip & learn vocabulary cards', cta: 'Learn' },
    { id: 'Matching Games', label: 'Matching Games', icon: '🧩', color: '#10B981', bg: '#ECFDF5', desc: 'Play fun memory games', cta: 'Play' },
    { id: 'Reward Videos', label: 'Reward Videos', icon: '🎬', color: '#F59E0B', bg: '#FFFBEB', desc: 'Watch & earn rewards', cta: 'Watch' },
  ]

  const circumference = 2 * Math.PI * 18
  const progressOffset = circumference - (stats.weeklyCompleted / stats.weeklyGoal) * circumference

  return (
    <div className="flex flex-col gap-4 px-4 py-4 pb-6 animate-slideUp">
      {/* ── Greeting Banner ── */}
      <div
        className="relative rounded-3xl p-4 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #9333EA 50%, #A855F7 100%)' }}
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #fff, transparent 70%)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-12 w-16 h-16 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #fff, transparent 70%)', transform: 'translateY(50%)' }} />

        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-200 text-xs font-bold mb-0.5">
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}
            </p>
            <h1 className="text-white text-xl font-black leading-tight">
              Hi {user.name}! 👋
            </h1>
            <p className="text-purple-200 text-xs font-semibold mt-1">Let's make today a great learning day!</p>
          </div>

          {/* Streak */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center gap-0.5"
              style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <span className="text-2xl">🔥</span>
              <span className="text-white text-xs font-black leading-none">{stats.dayStreak}</span>
            </div>
            <span className="text-purple-200 text-[9px] font-bold mt-1">Day Streak</span>
          </div>
        </div>

        {/* Weekly Goal Progress */}
        <div className="flex items-center gap-3 mt-3 bg-white/10 rounded-2xl px-3 py-2">
          <div className="relative w-10 h-10 shrink-0">
            <svg width="40" height="40" className="-rotate-90">
              <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
              <circle cx="20" cy="20" r="18" fill="none" stroke="#FDE047" strokeWidth="4"
                strokeDasharray={circumference} strokeDashoffset={progressOffset} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-[9px] font-black">
                {Math.round((stats.weeklyCompleted / stats.weeklyGoal) * 100)}%
              </span>
            </div>
          </div>
          <div>
            <div className="text-white text-xs font-black">Today's Goal</div>
            <div className="text-purple-200 text-[10px] font-semibold">
              {stats.weeklyCompleted}/{stats.weeklyGoal} activities this week
            </div>
          </div>
        </div>
      </div>

      {/* ── Hero Banner ── */}
      <div
        className="relative rounded-3xl p-5 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #EDE9FF 0%, #FAF5FF 50%, #FCE7F3 100%)', border: '1px solid #DDD6FE' }}
      >
        <div className="max-w-[65%]">
          <h2 className="text-lg font-black text-gray-900 leading-tight">
            Every word you speak<br />
            <span className="text-purple-700">is a step forward!</span>
          </h2>
          <p className="text-xs text-gray-500 font-semibold mt-1 mb-3">
            Practice, play and learn with TheraBoost AI
          </p>
          <button
            onClick={() => navigate('Speech Practice')}
            className="flex items-center gap-1.5 text-xs font-black text-white px-4 py-2 rounded-xl shadow-md transition-all hover:scale-105 cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}
          >
            Let's Begin →
          </button>
        </div>

        {/* Mascot SVG */}
        <div className="absolute right-3 bottom-0 w-24 h-24 animate-float">
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-lg">
            <circle cx="80" cy="65" r="42" fill="#FED7AA" />
            <path d="M40 60 Q 40 25 80 22 Q 120 25 120 60 Q 110 35 80 32 Q 50 35 40 60 Z" fill="#3B0764" />
            <circle cx="68" cy="62" r="5" fill="#1E1B4B" /><circle cx="92" cy="62" r="5" fill="#1E1B4B" />
            <circle cx="70" cy="60" r="1.5" fill="white" /><circle cx="94" cy="60" r="1.5" fill="white" />
            <path d="M72 75 Q 80 84 88 75" stroke="#9A3412" strokeWidth="3" fill="none" strokeLinecap="round" />
            <ellipse cx="60" cy="68" rx="5" ry="3" fill="#FCA5A5" opacity="0.6" />
            <ellipse cx="100" cy="68" rx="5" ry="3" fill="#FCA5A5" opacity="0.6" />
            <path d="M42 120 C 42 98 118 98 118 120 L 125 160 L 35 160 Z" fill="#7C3AED" />
            <circle cx="80" cy="125" r="10" fill="#9333EA" />
            <rect x="105" y="90" width="10" height="24" rx="5" fill="#94A3B8" />
            <circle cx="110" cy="86" r="8" fill="#EC4899" />
            <path d="M125 78 Q 130 86 125 94" stroke="#A855F7" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* ── Today's Activities ── */}
      <div>
        <h2 className="text-sm font-black text-gray-900 mb-3">Today's Activities</h2>
        <div className="grid grid-cols-2 gap-3">
          {activities.map((act) => (
            <button
              key={act.id}
              onClick={() => navigate(act.id)}
              className="flex flex-col items-start p-4 rounded-3xl border transition-all hover:scale-[1.02] active:scale-[0.97] cursor-pointer text-left shadow-sm hover:shadow-md"
              style={{ background: act.bg, borderColor: act.color + '33' }}
            >
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl mb-2 shadow-sm"
                style={{ background: act.color }}>
                <span>{act.icon}</span>
              </div>
              <div className="text-xs font-black text-gray-900 leading-tight">{act.label}</div>
              <div className="text-[10px] font-semibold text-gray-500 mt-0.5 mb-2 leading-snug">{act.desc}</div>
              <span className="text-[10px] font-black px-2.5 py-1 rounded-xl text-white"
                style={{ background: act.color }}>
                {act.cta} →
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Continue Learning ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-black text-gray-900">Continue Learning</h2>
          <button onClick={() => navigate('My Progress')}
            className="text-[10px] font-black text-purple-600 hover:underline cursor-pointer">
            View All →
          </button>
        </div>
        <div className="flex flex-col gap-2.5">
          {[
            { id: 'Speech Practice', title: 'Speech Practice', sub: "Fruits Names", progress: 60, color: '#7C3AED', icon: '🎙️' },
            { id: 'Matching Games', title: 'Matching Game', sub: 'Fruits & Colors', progress: 40, color: '#10B981', icon: '🧩' },
          ].map((item) => (
            <button key={item.id} onClick={() => navigate(item.id)}
              className="w-full flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-gray-100 shadow-xs hover:shadow-sm transition-all cursor-pointer text-left">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{ background: item.color + '20', color: item.color }}>
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-gray-900">{item.title}</span>
                  <span className="text-[9px] font-black px-2 py-0.5 rounded-full"
                    style={{ background: item.color + '20', color: item.color }}>
                    In Progress
                  </span>
                </div>
                <p className="text-[10px] text-gray-500 font-semibold mb-1.5">{item.sub}</p>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${item.progress}%`, background: item.color }} />
                </div>
              </div>
              <span className="text-xs font-black shrink-0" style={{ color: item.color }}>{item.progress}%</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Quick Access ── */}
      <div>
        <h2 className="text-sm font-black text-gray-900 mb-3">Quick Access</h2>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'My Progress', icon: '📊', label: 'Progress' },
            { id: 'Achievements', icon: '🏆', label: 'Badges' },
            { id: 'Personalized Reinforcement', icon: '📅', label: 'Schedule' },
          ].map((q) => (
            <button key={q.id} onClick={() => navigate(q.id)}
              className="flex flex-col items-center gap-1.5 py-3 rounded-2xl bg-white border border-gray-100 shadow-xs hover:shadow-sm hover:border-purple-200 transition-all cursor-pointer">
              <span className="text-xl">{q.icon}</span>
              <span className="text-[10px] font-black text-gray-700">{q.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Motivation tip ── */}
      <div className="flex items-center gap-3 bg-gradient-to-r from-purple-50 via-indigo-50 to-pink-50 border border-purple-100 rounded-3xl p-4">
        <div className="w-9 h-9 rounded-2xl bg-purple-600 flex items-center justify-center text-lg shrink-0 shadow-sm">☁️</div>
        <div>
          <div className="text-xs font-black text-purple-950">You're doing awesome, {user.name}! 🌟</div>
          <div className="text-[10px] text-purple-700 font-semibold">Keep practicing and unlocking new achievements!</div>
        </div>
      </div>
    </div>
  )
}
