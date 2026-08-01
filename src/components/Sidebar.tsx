interface SidebarProps {
  activeNav: string
  onNavChange: (nav: string) => void
  userLevel: number
}

export function Sidebar({ activeNav, onNavChange, userLevel }: SidebarProps) {
  const navItems = [
    { id: 'Home', label: 'Home', icon: '🏠' },
    { id: 'Speech Practice', label: 'Speech Practice', icon: '🎙️' },
    { id: 'Flash Cards', label: 'Flash Cards', icon: '🃏' },
    { id: 'Matching Games', label: 'Matching Games', icon: '🧩' },
    { id: 'Reward Videos', label: 'Reward Videos', icon: '🎬' },
    { id: 'Magic Scanner', label: 'Magic Scanner', icon: '📷' },
    { id: 'My Progress', label: 'My Progress', icon: '📊' },
    { id: 'Personalized Reinforcement', label: 'Personalized Schedules', icon: '📅' },
    { id: 'Achievements', label: 'Achievements', icon: '🏆' },
    { id: 'Settings', label: 'Settings', icon: '⚙️' },
  ]

  return (
    <aside className="w-60 bg-[#1E1B4B] text-white flex flex-col justify-between p-4 shrink-0 h-full overflow-y-auto select-none border-r border-indigo-900/50">
      <div className="flex flex-col gap-1">
        {/* Brand Header */}
        <div className="flex items-center gap-2.5 px-3 py-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center text-xl shadow-md shadow-purple-900/50">
            ☁️
          </div>
          <div>
            <span className="font-black text-base tracking-tight text-white block leading-none">
              Reinforce<span className="text-purple-400">AI</span>
            </span>
            <span className="text-[10px] text-purple-300 font-bold block mt-0.5">AI-Powered Smart Reinforcement</span>
          </div>
        </div>

        {/* Navigation Items */}
        {navItems.map((item) => {
          const isActive = activeNav === item.id || (activeNav === 'Personalized Schedules' && item.id === 'Personalized Reinforcement')
          return (
            <button
              key={item.id}
              onClick={() => onNavChange(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl transition-all text-left font-bold text-xs cursor-pointer ${
                isActive
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50 scale-[1.02]'
                  : 'text-purple-200/80 hover:bg-purple-900/40 hover:text-white'
              }`}
            >
              <span className="text-base leading-none">{item.icon}</span>
              <span className="truncate">{item.label}</span>
            </button>
          )
        })}
      </div>

      {/* Sidebar Footer Card with Elephant Mascot */}
      <div className="flex flex-col gap-3 mt-4">
        <div className="bg-purple-900/40 border border-purple-800/50 rounded-3xl p-3.5 flex flex-col gap-2 relative overflow-hidden">
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-1.5">
              <span className="text-amber-400 text-sm">⭐</span>
              <span className="text-xs font-black text-white">Level {userLevel}</span>
            </div>
            <span className="text-[9px] text-purple-300 font-bold">Keep practicing!</span>
          </div>

          {/* XP Bar */}
          <div className="w-full h-1.5 bg-purple-950 rounded-full overflow-hidden z-10">
            <div className="h-full bg-gradient-to-r from-amber-400 to-purple-400 rounded-full" style={{ width: '70%' }} />
          </div>
          <span className="text-[9px] font-extrabold text-purple-300 block text-right z-10">350 / 500 XP</span>

          {/* Cute Elephant Mascot Illustration */}
          <div className="flex justify-center mt-1">
            <div className="w-20 h-20 relative flex items-center justify-center animate-bounce" style={{ animationDuration: '3s' }}>
              <span className="text-5xl">🐘</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

