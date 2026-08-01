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
import { MagicRewardScannerScreen } from './components/screens/MagicRewardScannerScreen'
import { MyJungleScreen } from './components/screens/MyJungleScreen'

function AppContent() {
  const { state: authState } = useAuth()
  const { state: appState } = useApp()
  const [showSplash, setShowSplash] = useState(true)

  // Initial Splash Screen
  if (showSplash) {
    return <LoadingScreen onDone={() => setShowSplash(false)} />
  }

  // ── Firebase Auth Loading State ──
  // Show a full-page spinner while Firebase checks whether the user is already logged in.
  if (authState.isLoading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #2D1B69 50%, #1E1B4B 100%)' }}>
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-xl animate-pulse"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #a78bfa)' }}
          >
            ☁️
          </div>
          <svg className="animate-spin w-8 h-8 text-purple-400" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeDasharray="60" strokeDashoffset="30" />
          </svg>
          <p className="text-purple-200 font-bold text-sm">Checking session...</p>
        </div>
      </div>
    )
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
      case 'My Jungle':
        return <MyJungleScreen />
      case 'Speech Practice':
        return <SpeechScreen />
      case 'Flash Cards':
        return <FlashCardsScreen />
      case 'Matching Games':
        return <GamesScreen />
      case 'Reward Videos':
        return <RewardVideosScreen />
      case 'Magic Scanner':
        return <MagicRewardScannerScreen />
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
