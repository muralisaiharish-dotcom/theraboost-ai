import { useState } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { AppProvider, useApp } from './contexts/AppContext'

import { LoadingScreen } from './components/mobile/LoadingScreen'
import { ResponsiveShell } from './components/responsive/ResponsiveShell'
import { ResponsiveAuthScreen } from './components/responsive/ResponsiveAuthScreen'

// Main Application Screens
import { HomeScreen } from './components/screens/HomeScreen'
import { SpeechScreen } from './components/screens/SpeechScreen'
import { FlashCardsScreen } from './components/screens/FlashCardsScreen'
import { GamesScreen } from './components/screens/GamesScreen'
import { RewardVideosScreen } from './components/screens/RewardVideosScreen'
import { RewardsScreen } from './components/screens/RewardsScreen'
import { MyProgressScreen } from './components/screens/MyProgressScreen'
import { AchievementsScreen } from './components/screens/AchievementsScreen'
import { ReinforcementScreen } from './components/screens/ReinforcementScreen'
import { ProfileScreen } from './components/screens/ProfileScreen'
import { SettingsScreen } from './components/screens/SettingsScreen'
import { ParentDashboardScreen } from './components/screens/ParentDashboardScreen'

function AppContent() {
  const { state: authState } = useAuth()
  const { state: appState } = useApp()
  const [showSplash, setShowSplash] = useState(true)

  // Initial Splash Screen
  if (showSplash) {
    return <LoadingScreen onDone={() => setShowSplash(false)} />
  }

  // Unauthenticated Responsive Auth Flow (Laptop & Mobile)
  if (!authState.isAuthenticated) {
    return <ResponsiveAuthScreen />
  }

  // Authenticated Responsive Application (Laptop & Mobile)
  const { activeScreen } = appState
  const user = authState.user!

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case 'Home':
        return user.role === 'parent' ? <ParentDashboardScreen /> : <HomeScreen />
      case 'Speech Practice':
        return <SpeechScreen />
      case 'Flash Cards':
        return <FlashCardsScreen />
      case 'Matching Games':
        return <GamesScreen />
      case 'Reward Videos':
        return <RewardVideosScreen />
      case 'My Progress':
        return <MyProgressScreen />
      case 'Achievements':
        return <AchievementsScreen />
      case 'Personalized Reinforcement':
      case 'Personalized Schedules':
        return <ReinforcementScreen />
      case 'Rewards':
        return <RewardsScreen />
      case 'Profile':
        return <ProfileScreen />
      case 'Settings':
        return <SettingsScreen />
      default:
        return <HomeScreen />
    }
  }

  return (
    <ResponsiveShell>
      {renderActiveScreen()}
    </ResponsiveShell>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  )
}
