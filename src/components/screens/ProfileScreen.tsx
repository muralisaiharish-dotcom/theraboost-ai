import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useApp } from '../../contexts/AppContext'

const AVATARS = ['👦', '👧', '🧒', '👶', '🐣', '🦊', '🐼', '🐨', '🦄', '🐸', '🤖', '👩']

export function ProfileScreen() {
  const { state: authState, logout, updateUser } = useAuth()
  const { state: appState, navigate } = useApp()
  const user = authState.user!
  const { stats } = appState
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editName, setEditName] = useState(user.name)
  const [showAvatarPicker, setShowAvatarPicker] = useState(false)

  const xpPercent = Math.min(100, (stats.xp % 500) / 500 * 100)

  const handleSave = () => {
    if (editName.trim()) updateUser({ name: editName.trim() })
    setEditMode(false)
  }

  const handleLogout = () => { logout() }

  const menuItems = [
    { icon: '📊', label: 'My Progress', screen: 'My Progress' },
    { icon: '🏆', label: 'Achievements', screen: 'Achievements' },
    { icon: '📅', label: 'My Schedule', screen: 'Personalized Reinforcement' },
    { icon: '🎬', label: 'Reward Videos', screen: 'Reward Videos' },
    { icon: '⚙️', label: 'Settings', screen: 'Settings' },
  ]

  return (
    <div className="flex flex-col gap-4 px-4 py-4 pb-6 animate-slideUp">
      {/* Profile Card */}
      <div
        className="relative rounded-[28px] p-6 flex flex-col items-center gap-3 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #9333EA 60%, #A855F7 100%)' }}
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #fff, transparent 70%)', transform: 'translate(40%, -40%)' }} />

        {/* Avatar */}
        <div className="relative">
          <button
            onClick={() => setShowAvatarPicker(!showAvatarPicker)}
            className="w-20 h-20 rounded-full bg-white/20 border-4 border-white/40 flex items-center justify-center text-5xl cursor-pointer hover:scale-105 transition-transform shadow-lg"
          >
            {user.avatar}
          </button>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-amber-400 rounded-full border-2 border-white flex items-center justify-center text-xs font-black text-white shadow-sm">
            {user.level}
          </div>
        </div>

        {/* Avatar Picker */}
        {showAvatarPicker && (
          <div className="flex flex-wrap gap-2 justify-center p-3 bg-white/15 rounded-2xl backdrop-blur-sm">
            {AVATARS.map((av) => (
              <button key={av} onClick={() => { updateUser({ avatar: av }); setShowAvatarPicker(false) }}
                className={`w-10 h-10 rounded-xl text-2xl flex items-center justify-center cursor-pointer transition-all ${av === user.avatar ? 'bg-white scale-110 shadow-md' : 'bg-white/20 hover:bg-white/40'}`}>
                {av}
              </button>
            ))}
          </div>
        )}

        {/* Name / Edit */}
        {editMode ? (
          <div className="flex items-center gap-2">
            <input value={editName} onChange={(e) => setEditName(e.target.value)}
              className="bg-white/20 text-white font-black text-lg border border-white/30 rounded-xl px-3 py-1.5 outline-none placeholder-white/50 w-40"
              placeholder="Your name" autoFocus />
            <button onClick={handleSave} className="bg-white text-purple-700 px-3 py-1.5 rounded-xl font-extrabold text-xs cursor-pointer">Save</button>
            <button onClick={() => setEditMode(false)} className="text-white/70 font-bold text-xs cursor-pointer">Cancel</button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <h2 className="text-white text-xl font-black">{user.name}</h2>
            <button onClick={() => setEditMode(true)} className="text-white/70 text-sm cursor-pointer hover:text-white">✏️</button>
          </div>
        )}

        <div className="text-purple-200 text-xs font-semibold">{user.email}</div>

        {/* XP Bar */}
        <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
          <div className="h-full bg-amber-400 rounded-full transition-all duration-700" style={{ width: `${xpPercent}%` }} />
        </div>
        <div className="flex items-center justify-between w-full text-[10px] font-bold text-purple-200">
          <span>Level {user.level}</span>
          <span>{stats.xp % 500} / 500 XP to Level {user.level + 1}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { icon: '⭐', label: 'Stars', value: stats.starsEarned.toLocaleString(), color: '#F59E0B' },
          { icon: '🔥', label: 'Streak', value: `${stats.dayStreak}d`, color: '#EF4444' },
          { icon: '📋', label: 'Activities', value: stats.totalActivities.toString(), color: '#10B981' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-3 border border-gray-100 shadow-xs text-center">
            <div className="text-xl">{s.icon}</div>
            <div className="text-base font-black" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[10px] font-bold text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Menu Items */}
      <div className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <button key={item.screen} onClick={() => navigate(item.screen)}
            className="flex items-center gap-3 bg-white rounded-2xl p-4 border border-gray-100 shadow-xs hover:shadow-sm hover:border-purple-200 transition-all cursor-pointer text-left">
            <span className="text-xl w-8 text-center">{item.icon}</span>
            <span className="flex-1 text-sm font-extrabold text-gray-900">{item.label}</span>
            <span className="text-gray-400 font-black">›</span>
          </button>
        ))}
      </div>

      {/* Role badge */}
      <div className="flex items-center gap-2 bg-purple-50 border border-purple-100 rounded-2xl p-3">
        <span className="text-xl">{user.role === 'parent' ? '👩‍👦' : '🧒'}</span>
        <div>
          <div className="text-xs font-black text-purple-900">
            {user.role === 'parent' ? 'Parent Account' : 'Child Account'}
          </div>
          <div className="text-[10px] font-semibold text-purple-600">
            {user.role === 'parent' ? 'Full access to reports & analytics' : `Age: ${user.age || 'Not set'} • Level ${user.level} learner`}
          </div>
        </div>
      </div>

      {/* Logout */}
      {!showLogoutConfirm ? (
        <button onClick={() => setShowLogoutConfirm(true)}
          className="w-full py-3.5 rounded-2xl border-2 border-red-200 text-red-600 font-extrabold text-sm flex items-center justify-center gap-2 hover:bg-red-50 transition-all cursor-pointer">
          🚪 Log Out
        </button>
      ) : (
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 flex flex-col gap-3">
          <div className="text-center">
            <div className="text-2xl mb-2">😢</div>
            <div className="font-black text-gray-900 text-sm">Are you sure you want to log out?</div>
            <div className="text-xs text-gray-500 font-semibold mt-1">Your progress is saved!</div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowLogoutConfirm(false)}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 font-extrabold text-sm text-gray-700 cursor-pointer hover:bg-gray-50 transition-all">
              Cancel
            </button>
            <button onClick={handleLogout}
              className="flex-1 py-2.5 rounded-xl bg-red-500 font-extrabold text-sm text-white cursor-pointer hover:bg-red-600 transition-all">
              Yes, Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
