import { ReactNode } from 'react'
import { MobileHeader } from './MobileHeader'
import { BottomNav } from './BottomNav'
import { useApp } from '../../contexts/AppContext'
import { useAuth } from '../../contexts/AuthContext'

interface MobileShellProps {
  children: ReactNode
}

export function MobileShell({ children }: MobileShellProps) {
  const { state: appState, navigate } = useApp()
  const { state: authState } = useAuth()
  const user = authState.user!

  return (
    /* ── Outer stage: full viewport, dark purple gradient background ── */
    <div
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #2D1B69 50%, #1E1B4B 100%)' }}
    >
      {/* Decorative floating orbs behind the phone */}
      <div className="absolute top-10 left-10 w-48 h-48 rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7C3AED, transparent 70%)' }} />
      <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #A855F7, transparent 70%)' }} />

      {/* ── Phone frame ── */}
      <div
        className="relative flex flex-col overflow-hidden shadow-2xl"
        style={{
          width: 'min(390px, 100vw)',
          height: 'min(844px, 100dvh)',
          background: '#F4F2FD',
          borderRadius: 'clamp(0px, 3vw, 44px)',
          boxShadow: '0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.15)',
        }}
      >
        {/* ── Top Header ── */}
        <MobileHeader
          screenTitle={appState.activeScreen}
          starsEarned={appState.stats.starsEarned}
          notificationCount={appState.notificationCount}
          userAvatar={user.avatar}
          userName={user.name}
          userRole={user.role}
        />

        {/* ── Scrollable Content Area ── */}
        <main
          className="flex-1 overflow-y-auto overflow-x-hidden"
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <style>{`main::-webkit-scrollbar { display: none; }`}</style>
          {children}
        </main>

        {/* ── Bottom Navigation ── */}
        <BottomNav
          activeScreen={appState.activeScreen}
          onNavigate={navigate}
          userRole={user.role}
        />
      </div>
    </div>
  )
}
