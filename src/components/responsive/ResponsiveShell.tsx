import { ReactNode } from 'react'
import { useIsMobile } from '../../hooks/useIsMobile'
import { MobileShell } from '../mobile/MobileShell'
import { Header } from '../Header'
import { Sidebar } from '../Sidebar'
import { useApp } from '../../contexts/AppContext'
import { useAuth } from '../../contexts/AuthContext'

// Right Panels
import { HomeRightPanel } from '../HomeRightPanel'
import { SpeechRightPanel } from '../SpeechRightPanel'
import { MatchingRightPanel } from '../MatchingRightPanel'
import { RewardRightPanel } from '../RewardRightPanel'
import { MyProgressRightPanel } from '../MyProgressRightPanel'
import { ReinforcementRightPanel } from '../ReinforcementRightPanel'
import { RightPanel } from '../RightPanel'
import { CATEGORIES } from '../../data/flashcards'

interface ResponsiveShellProps {
  children: ReactNode
}

export function ResponsiveShell({ children }: ResponsiveShellProps) {
  const isMobile = useIsMobile(768)
  const { state: appState, navigate } = useApp()
  const { state: authState } = useAuth()
  const user = authState.user!
  const { stats, activeScreen } = appState

  // If on mobile device, render the mobile phone shell
  if (isMobile) {
    return <MobileShell>{children}</MobileShell>
  }

  // ── Laptop / Desktop Layout ──
  const renderRightPanel = () => {
    switch (activeScreen) {
      case 'Home':
        return <HomeRightPanel stats={stats} />
      case 'Speech Practice':
        return <SpeechRightPanel stats={stats} onOpenReport={() => navigate('My Progress')} />
      case 'Matching Games':
        return <MatchingRightPanel stats={stats} onOpenReport={() => navigate('My Progress')} />
      case 'Reward Videos':
        return <RewardRightPanel stats={stats} onOpenReport={() => navigate('My Progress')} />
      case 'My Progress':
      case 'Achievements':
        return <MyProgressRightPanel stats={stats} />
      case 'Personalized Reinforcement':
        return <ReinforcementRightPanel stats={stats} userName={user.name} />
      case 'Flash Cards':
        return (
          <RightPanel
            stats={stats}
            categories={CATEGORIES}
            activeCategory="Animals"
            onSelectCategory={() => {}}
            onOpenReport={() => navigate('My Progress')}
            onOpenCategoryModal={() => {}}
          />
        )
      default:
        return <HomeRightPanel stats={stats} />
    }
  }

  return (
    <div className="flex flex-col h-screen w-screen bg-[#F4F2FD] overflow-hidden text-gray-900 select-none">
      {/* Top Desktop Header Navigation */}
      <Header
        starsEarned={stats.starsEarned}
        sessionProgress={stats.sessionProgress}
        onOpenSettings={() => navigate('Settings')}
        userName={user.name}
        userAvatar={user.avatar}
      />

      {/* Main Desktop Dashboard Layout */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar
          activeNav={activeScreen}
          userLevel={user.level}
          onNavChange={(nav) => navigate(nav)}
        />

        {/* Main Content Workspace Center Area */}
        <main className="flex-1 flex flex-col p-5 overflow-y-auto min-w-0 h-full">
          {children}
        </main>

        {/* Right Sidebar Panel */}
        <div className="py-5 pr-5 shrink-0 hidden lg:block">
          {renderRightPanel()}
        </div>
      </div>
    </div>
  )
}
