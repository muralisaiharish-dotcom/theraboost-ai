import { useState, useRef } from 'react'
import { useApp } from '../contexts/AppContext'
import { NotificationPanel } from './NotificationPanel'

interface HeaderProps {
  starsEarned: number
  sessionProgress: number
  onOpenSettings?: () => void
  userName: string
  userAvatar: string
}

export function Header({ starsEarned, sessionProgress, onOpenSettings, userName, userAvatar }: HeaderProps) {
  const { state, markNotificationsRead } = useApp()
  const [notifOpen, setNotifOpen] = useState(false)
  const bellRef = useRef<HTMLDivElement>(null)

  // Circular ring stroke calculation
  const radius = 14
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (sessionProgress / 100) * circumference

  const handleBellClick = () => {
    setNotifOpen((prev) => {
      if (!prev) markNotificationsRead()
      return !prev
    })
  }

  return (
    <header className="flex items-center justify-between px-8 py-3.5 bg-white/80 backdrop-blur-md border-b border-purple-100 shrink-0 z-30">
      {/* Brand Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-purple-500/20">
          <svg width="24" height="24" viewBox="0 0 100 100" fill="none">
            <path d="M 22 35 L 12 10 L 38 25 Z" fill="white" opacity="0.9" />
            <path d="M 78 35 L 88 10 L 62 25 Z" fill="white" opacity="0.9" />
            <rect x="18" y="22" width="64" height="54" rx="26" fill="white" />
            <rect x="24" y="28" width="52" height="42" rx="20" fill="#7C5FE6" />
            <ellipse cx="50" cy="49" rx="16" ry="12" fill="#1E1B4B" />
            <circle cx="43" cy="48" r="3" fill="#38BDF8" />
            <circle cx="57" cy="48" r="3" fill="#38BDF8" />
          </svg>
        </div>
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1 leading-none">
            <span className="text-xl font-black text-purple-900 tracking-tight">Reinforce</span>
            <span className="text-xl font-black text-indigo-600">AI</span>
          </div>
          <span className="text-[10px] font-extrabold text-purple-400 tracking-wide mt-0.5">
            AI-Powered Smart Reinforcement for Speech Therapy
          </span>
        </div>
      </div>

      {/* User Greeting Profile — reads from shared auth state, never hardcoded */}
      <div className="flex items-center gap-3 bg-purple-50/70 border border-purple-100 px-4 py-1.5 rounded-full">
        <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-purple-400 to-pink-400 p-0.5 shadow-sm">
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
            {userAvatar && (userAvatar.startsWith('http') || userAvatar.startsWith('data:')) ? (
              <img
                src={userAvatar}
                alt={userName}
                className="w-full h-full object-cover rounded-full"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
              />
            ) : (
              <span className="text-lg">{userAvatar || '👦'}</span>
            )}
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
        </div>
        <div>
          <div className="flex items-center gap-1">
            <span className="font-black text-gray-900 text-sm">Hi {userName}!</span>
            <span className="text-sm">👋</span>
          </div>
          <p className="text-gray-500 text-xs font-semibold">Keep going, you're doing great!</p>
        </div>
      </div>

      {/* Right Stats & Action Badges */}
      <div className="flex items-center gap-4">
        {/* Stars Earned Badge */}
        <div className="flex items-center gap-2.5 bg-white border border-gray-100 px-4 py-2 rounded-2xl shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-lg shadow-2xs">
            ⭐
          </div>
          <div>
            <div className="font-black text-gray-900 text-sm leading-none">{starsEarned.toLocaleString()}</div>
            <div className="text-gray-400 text-[11px] font-bold">Stars Earned</div>
          </div>
        </div>

        {/* Session Progress Badge */}
        <div className="flex items-center gap-2.5 bg-white border border-gray-100 px-4 py-2 rounded-2xl shadow-xs">
          <div className="relative w-8 h-8">
            <svg width="32" height="32" className="-rotate-90">
              <circle cx="16" cy="16" r={radius} fill="none" stroke="#EDE9FE" strokeWidth="3.5" />
              <circle
                cx="16"
                cy="16"
                r={radius}
                fill="none"
                stroke="#7C5FE6"
                strokeWidth="3.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] font-black text-purple-900">{sessionProgress}%</span>
            </div>
          </div>
          <div>
            <div className="font-black text-gray-900 text-sm leading-none">{sessionProgress}%</div>
            <div className="text-gray-400 text-[11px] font-bold">Session Progress</div>
          </div>
        </div>

        {/* Notification Bell Button — relative container for the dropdown */}
        <div className="relative" ref={bellRef}>
          <button
            id="notification-bell"
            onClick={handleBellClick}
            aria-label="Open notifications"
            className="w-10 h-10 rounded-2xl bg-white border border-gray-100 flex items-center justify-center relative hover:border-purple-200 transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6C4DE6" strokeWidth="2.5">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {state.notificationCount > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center border-2 border-white">
                {state.notificationCount}
              </div>
            )}
          </button>

          {/* Notification Panel Dropdown */}
          {notifOpen && <NotificationPanel onClose={() => setNotifOpen(false)} />}
        </div>

        {/* Settings Button */}
        <button
          onClick={onOpenSettings}
          className="flex items-center gap-2 bg-white border border-gray-200 hover:border-purple-300 text-gray-700 px-4 py-2 rounded-2xl text-xs font-black shadow-xs hover:shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
          <span>Settings</span>
        </button>
      </div>
    </header>
  )
}
