import { useState, useEffect, useRef } from 'react'
import { useApp } from '../contexts/AppContext'

interface NotificationItem {
  id: string
  title: string
  body: string
  icon: string
  time: string
  read: boolean
  type: 'reminder' | 'reward' | 'achievement' | 'goal' | 'parent'
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Daily Practice Reminder 🌟',
    body: "It's time for your daily speech practice! Keep your 7-day streak going!",
    icon: '🎙️',
    time: '2 min ago',
    read: false,
    type: 'reminder',
  },
  {
    id: 'n2',
    title: 'Achievement Unlocked! 🏆',
    body: "You've unlocked the 'Super Matcher' badge. Congratulations!",
    icon: '🏆',
    time: '25 min ago',
    read: false,
    type: 'achievement',
  },
  {
    id: 'n3',
    title: 'Stars Earned ⭐',
    body: "Great job! You earned 45 stars from today's flash card session.",
    icon: '⭐',
    time: '1 hr ago',
    read: false,
    type: 'reward',
  },
  {
    id: 'n4',
    title: "Today's Goal Almost Complete 🎯",
    body: "You've completed 2 of 3 activities. One more to go — you can do it!",
    icon: '🎯',
    time: '2 hrs ago',
    read: true,
    type: 'goal',
  },
  {
    id: 'n5',
    title: '🔥 Streak Reminder',
    body: "Don't forget to practice today to keep your 7-day streak alive!",
    icon: '🔥',
    time: 'Yesterday',
    read: true,
    type: 'reminder',
  },
]

const TYPE_COLORS: Record<NotificationItem['type'], string> = {
  reminder: '#7C3AED',
  reward: '#D97706',
  achievement: '#059669',
  goal: '#2563EB',
  parent: '#EC4899',
}

interface NotificationPanelProps {
  onClose: () => void
}

export function NotificationPanel({ onClose }: NotificationPanelProps) {
  const { markNotificationsRead } = useApp()
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS)
  const panelRef = useRef<HTMLDivElement>(null)

  const unreadCount = notifications.filter((n) => !n.read).length

  // Mark all as read when opened
  useEffect(() => {
    markNotificationsRead()
  }, [markNotificationsRead])

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  const markOneRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    markNotificationsRead()
  }

  const clearAll = () => {
    setNotifications([])
    markNotificationsRead()
  }

  return (
    <div
      ref={panelRef}
      className="absolute right-0 top-full mt-2 w-80 bg-white rounded-3xl shadow-2xl border border-purple-100 z-50 overflow-hidden"
      style={{
        animation: 'slideDownFade 0.25s ease-out both',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-purple-50">
        <div className="flex items-center gap-2">
          <span className="text-base">🔔</span>
          <h3 className="font-black text-gray-900 text-sm">Notifications</h3>
          {unreadCount > 0 && (
            <span className="bg-rose-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-[10px] font-extrabold text-purple-600 hover:text-purple-800 cursor-pointer"
            >
              Mark all read
            </button>
          )}
          <button
            onClick={onClose}
            className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer transition-colors text-xs font-black"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Notification List */}
      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center px-4">
            <span className="text-4xl mb-2">🎉</span>
            <p className="text-xs font-extrabold text-gray-600">All caught up!</p>
            <p className="text-[10px] font-semibold text-gray-400 mt-0.5">No new notifications</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <button
              key={notif.id}
              onClick={() => markOneRead(notif.id)}
              className={`w-full text-left flex items-start gap-3 px-4 py-3.5 border-b border-gray-50 transition-colors cursor-pointer ${
                notif.read ? 'bg-white hover:bg-gray-50' : 'bg-purple-50/60 hover:bg-purple-50'
              }`}
            >
              {/* Icon */}
              <div
                className="w-9 h-9 rounded-2xl flex items-center justify-center text-base shrink-0 shadow-xs"
                style={{ background: TYPE_COLORS[notif.type] + '20' }}
              >
                {notif.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-1">
                  <p className={`text-xs font-black leading-snug ${notif.read ? 'text-gray-700' : 'text-gray-900'}`}>
                    {notif.title}
                  </p>
                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-purple-600 shrink-0 mt-1" />
                  )}
                </div>
                <p className="text-[10px] font-semibold text-gray-500 mt-0.5 leading-snug line-clamp-2">
                  {notif.body}
                </p>
                <p className="text-[9px] font-bold mt-1" style={{ color: TYPE_COLORS[notif.type] }}>
                  {notif.time}
                </p>
              </div>
            </button>
          ))
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="px-5 py-3 border-t border-purple-50 flex justify-end">
          <button
            onClick={clearAll}
            className="text-[10px] font-extrabold text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  )
}
