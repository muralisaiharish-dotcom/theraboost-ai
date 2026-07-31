import { useState } from 'react'
import { useIsMobile } from '../../hooks/useIsMobile'
import { LoginScreen } from '../auth/LoginScreen'
import { LoginPage } from '../LoginPage'
import { SignUpScreen } from '../auth/SignUpScreen'
import { ForgotPasswordScreen } from '../auth/ForgotPasswordScreen'
import { useAuth } from '../../contexts/AuthContext'

type AuthFlowState = 'login' | 'signup' | 'forgot'

export function ResponsiveAuthScreen() {
  const isMobile = useIsMobile(768)
  const { login } = useAuth()
  const [authFlow, setAuthFlow] = useState<AuthFlowState>('login')

  if (isMobile) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-purple-950 overflow-hidden">
        <div
          className="relative flex flex-col overflow-hidden shadow-2xl"
          style={{
            width: 'min(390px, 100vw)',
            height: 'min(844px, 100dvh)',
            background: '#EDE9FF',
            borderRadius: 'clamp(0px, 3vw, 44px)',
          }}
        >
          {authFlow === 'login' && (
            <LoginScreen
              onNavigateSignUp={() => setAuthFlow('signup')}
              onNavigateForgot={() => setAuthFlow('forgot')}
            />
          )}
          {authFlow === 'signup' && (
            <SignUpScreen onNavigateLogin={() => setAuthFlow('login')} />
          )}
          {authFlow === 'forgot' && (
            <ForgotPasswordScreen onNavigateLogin={() => setAuthFlow('login')} />
          )}
        </div>
      </div>
    )
  }

  // ── Laptop / Desktop Split Layout ──
  if (authFlow === 'signup') {
    return (
      <div className="flex h-screen w-screen bg-[#EDE9FF] items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
          <SignUpScreen onNavigateLogin={() => setAuthFlow('login')} />
        </div>
      </div>
    )
  }

  if (authFlow === 'forgot') {
    return (
      <div className="flex h-screen w-screen bg-[#EDE9FF] items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
          <ForgotPasswordScreen onNavigateLogin={() => setAuthFlow('login')} />
        </div>
      </div>
    )
  }

  return (
    <LoginPage
      onLogin={(user) => {
        // Authenticate via context
        login(user.email, 'Thera123')
      }}
    />
  )
}
