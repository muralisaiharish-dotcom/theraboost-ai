import { useState } from 'react'
import type { UserRole } from '../../types'

interface BottomNavProps {
  activeScreen: string
  onNavigate: (screen: string) => void
  userRole: UserRole
}

const CHILD_TABS = [
  {
    id: 'Home',
    label: 'Home',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#7C3AED' : 'none'}
        stroke={active ? '#7C3AED' : '#9CA3AF'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
        <path d="M9 21V12h6v9" />
      </svg>
    ),
  },
  {
    id: 'My Jungle',
    label: 'Jungle',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#10B981' : 'none'}
        stroke={active ? '#10B981' : '#9CA3AF'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L4 12h4v8h8v-8h4L12 2z" />
      </svg>
    ),
  },
  {
    id: 'Speech Practice',
    label: 'Practice',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#7C3AED' : 'none'}
        stroke={active ? '#7C3AED' : '#9CA3AF'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
        <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" />
      </svg>
    ),
  },
  {
    id: 'Matching Games',
    label: 'Games',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#7C3AED' : 'none'}
        stroke={active ? '#7C3AED' : '#9CA3AF'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="9" height="9" rx="2" />
        <rect x="13" y="2" width="9" height="9" rx="2" />
        <rect x="2" y="13" width="9" height="9" rx="2" />
        <path d="M18 17h-2m-2 0h2m0 0V15m0 2v2" />
      </svg>
    ),
  },
  {
    id: 'Reward Videos',
    label: 'Rewards',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#7C3AED' : 'none'}
        stroke={active ? '#7C3AED' : '#9CA3AF'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    id: 'Magic Scanner',
    label: 'Scanner',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#10B981' : 'none'}
        stroke={active ? '#10B981' : '#9CA3AF'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
  },
  {
    id: 'Profile',
    label: 'Profile',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#7C3AED' : 'none'}
        stroke={active ? '#7C3AED' : '#9CA3AF'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
]

const PARENT_TABS = [
  {
    id: 'Home',
    label: 'Dashboard',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#7C3AED' : 'none'}
        stroke={active ? '#7C3AED' : '#9CA3AF'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    id: 'My Progress',
    label: 'Reports',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#7C3AED' : 'none'}
        stroke={active ? '#7C3AED' : '#9CA3AF'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
  },
  {
    id: 'Achievements',
    label: 'Milestones',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#7C3AED' : 'none'}
        stroke={active ? '#7C3AED' : '#9CA3AF'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
  {
    id: 'Profile',
    label: 'Profile',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#7C3AED' : 'none'}
        stroke={active ? '#7C3AED' : '#9CA3AF'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
]

export function BottomNav({ activeScreen, onNavigate, userRole }: BottomNavProps) {
  const [ripple, setRipple] = useState<string | null>(null)
  const tabs = userRole === 'parent' ? PARENT_TABS : CHILD_TABS

  const handleTap = (id: string) => {
    setRipple(id)
    setTimeout(() => setRipple(null), 400)
    onNavigate(id)
  }

  return (
    <nav
      className="shrink-0 flex items-center justify-around bg-white border-t border-purple-100"
      style={{
        height: '64px',
        paddingBottom: 'env(safe-area-inset-bottom, 4px)',
        boxShadow: '0 -4px 20px rgba(108,77,230,0.08)',
      }}
      aria-label="Main navigation"
    >
      {tabs.map((tab) => {
        const isActive = activeScreen === tab.id ||
          (tab.id === 'Speech Practice' && ['Speech Practice', 'Flash Cards', 'Personalized Reinforcement'].includes(activeScreen)) ||
          (tab.id === 'Reward Videos' && ['Reward Videos', 'Rewards Store'].includes(activeScreen))

        return (
          <button
            key={tab.id}
            onClick={() => handleTap(tab.id)}
            aria-label={tab.label}
            aria-current={isActive ? 'page' : undefined}
            className="relative flex flex-col items-center justify-center gap-0.5 px-3 py-1 min-w-[52px] cursor-pointer transition-transform active:scale-90"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            {/* Ripple */}
            {ripple === tab.id && (
              <span
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'rgba(124, 58, 237, 0.12)',
                  animation: 'ripple 0.4s ease-out forwards',
                }}
              />
            )}

            {/* Active indicator pill */}
            {isActive && (
              <span
                className="absolute top-1 left-1/2 -translate-x-1/2 h-1 rounded-full"
                style={{
                  width: '24px',
                  background: 'linear-gradient(90deg, #7C3AED, #A855F7)',
                  animation: 'slideIndicator 0.25s ease-out',
                }}
              />
            )}

            <span className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'scale-100'}`}>
              {tab.icon(isActive)}
            </span>
            <span
              className="text-[10px] font-extrabold leading-none transition-colors duration-200"
              style={{ color: isActive ? '#7C3AED' : '#9CA3AF' }}
            >
              {tab.label}
            </span>
          </button>
        )
      })}

      <style>{`
        @keyframes ripple {
          from { opacity: 0.5; transform: scale(0.8); }
          to { opacity: 0; transform: scale(1.5); }
        }
        @keyframes slideIndicator {
          from { transform: translateX(-50%) scaleX(0); }
          to { transform: translateX(-50%) scaleX(1); }
        }
      `}</style>
    </nav>
  )
}
