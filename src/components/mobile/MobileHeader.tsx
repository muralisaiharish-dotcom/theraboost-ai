import type { UserRole } from '../../types'
import { useApp } from '../../contexts/AppContext'

interface MobileHeaderProps {
  screenTitle: string
  starsEarned: number
  notificationCount: number
  userAvatar: string
  userName: string
  userRole: UserRole
}

const SCREEN_TITLES: Record<string, string> = {
  'Home': 'TheraBoost AI',
  'Speech Practice': 'Speech Practice',
  'Flash Cards': 'Flash Cards',
  'Matching Games': 'Matching Games',
  'Reward Videos': 'Reward Videos',
  'My Progress': 'My Progress',
  'Achievements': 'Achievements',
  'Personalized Reinforcement': 'My Schedule',
  'Profile': 'Profile',
  'Settings': 'Settings',
  'Rewards Store': 'Rewards',
}

export function MobileHeader({
  screenTitle,
  starsEarned,
  notificationCount,
  userRole,
}: MobileHeaderProps) {
  const { markNotificationsRead } = useApp()
  const displayTitle = SCREEN_TITLES[screenTitle] || screenTitle
  const isHome = screenTitle === 'Home'

  return (
    <header
      className="shrink-0 flex items-center justify-between px-4 bg-white/90 border-b border-purple-100 z-30"
      style={{
        height: '56px',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        paddingTop: 'env(safe-area-inset-top, 0px)',
      }}
    >
      {/* Left: Logo or Back button */}
      {isHome ? (
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-base shadow-sm"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
          >
            ☁️
          </div>
          <div className="leading-none">
            <div className="text-sm font-black text-purple-900 leading-none">
              TheraBoost <span className="text-purple-500">AI</span>
            </div>
            <div className="text-[9px] font-bold text-purple-400 mt-0.5">
              {userRole === 'parent' ? 'Parent Dashboard' : 'Speak • Practice • Shine'}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-1.5">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-base shadow-sm"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
          >
            ☁️
          </div>
          <span className="text-sm font-black text-purple-900">{displayTitle}</span>
        </div>
      )}

      {/* Right: Stars + Bell */}
      <div className="flex items-center gap-2">
        {/* Stars */}
        <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-xl">
          <span className="text-sm">⭐</span>
          <span className="text-xs font-black text-amber-700">{starsEarned.toLocaleString()}</span>
        </div>

        {/* Notification Bell */}
        <button
          onClick={markNotificationsRead}
          aria-label={`${notificationCount} notifications`}
          className="relative w-8 h-8 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-100 hover:border-purple-200 transition-all cursor-pointer"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2.3">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center border border-white">
              {notificationCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
