import { useState } from 'react'
import heroIllustration from '../../assets/hero-illustration.png'
import { useAuth } from '../../contexts/AuthContext'
import { Toast } from '../common/Toast'

interface LoginScreenProps {
  onNavigateSignUp: () => void
  onNavigateForgot: () => void
}

function isValidEmail(v: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) }

export function LoginScreen({ onNavigateSignUp, onNavigateForgot }: LoginScreenProps) {
  const { login, loginWithGoogle } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({ email: '', password: '', auth: '' })
  const [toastMessage, setToastMessage] = useState<{ message: string; type: 'error' | 'success' | 'info' } | null>(null)

  const handleEmailChange = (v: string) => {
    setEmail(v)
    if (errors.email || errors.auth) setErrors((p) => ({ ...p, email: '', auth: '' }))
  }
  const handlePasswordChange = (v: string) => {
    setPassword(v)
    if (errors.password || errors.auth) setErrors((p) => ({ ...p, password: '', auth: '' }))
  }

  const validate = () => {
    const e = { email: '', password: '', auth: '' }
    if (!email.trim()) e.email = 'Email is required.'
    else if (!isValidEmail(email)) e.email = 'Please enter a valid email address.'
    if (!password) e.password = 'Password is required.'
    return e
  }

  const handleLogin = async (ev: React.FormEvent) => {
    ev.preventDefault()
    const errs = validate()
    if (errs.email || errs.password) { setErrors(errs); return }
    setIsLoading(true)
    const result = await login(email.trim(), password)
    setIsLoading(false)
    if (!result.success) setErrors((p) => ({ ...p, auth: result.error || 'Login failed.' }))
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    setErrors({ email: '', password: '', auth: '' })
    setToastMessage(null)
    const result = await loginWithGoogle()
    setIsLoading(false)
    if (!result.success) {
      const msg = result.error || 'Google Sign-In failed. Please try again.'
      setErrors((p) => ({ ...p, auth: msg }))
      setToastMessage({ message: msg, type: 'error' })
    }
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ background: '#EDE9FF' }}>
      {/* Hero top section */}
      <div className="relative flex-shrink-0 flex flex-col items-center pt-8 pb-4 px-6 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-30 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #c4b5fd, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #a78bfa, transparent 70%)' }} />

        {/* Logo */}
        <div className="flex items-center gap-2 mb-5 z-10">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #a78bfa)' }}>
            ☁️
          </div>
          <div>
            <div className="text-lg font-black text-purple-950 leading-tight">
              Reinforce<span className="text-purple-600">AI</span>
            </div>
            <div className="text-[10px] font-semibold text-purple-400">AI-Powered Smart Reinforcement for Speech Therapy</div>
          </div>
        </div>

        {/* Hero illustration */}
        <img
          src={heroIllustration}
          alt="ReinforceAI learning mascots"
          className="w-full max-w-[220px] object-contain drop-shadow-xl z-10 animate-float"
          style={{ maxHeight: '160px' }}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
        />

        {/* Hero text */}
        <div className="text-center z-10 mt-3">
          <h1 className="text-xl font-black text-purple-950 leading-tight">
            Every word you speak is<br />
            <span className="text-purple-600">a step forward!</span> 🚀
          </h1>
          <p className="text-xs text-purple-700 font-semibold mt-1">
            Practice, play and learn with ReinforceAI
          </p>
        </div>
      </div>

      {/* Login card */}
      <div className="flex-1 bg-white rounded-t-[32px] px-6 pt-6 pb-8 flex flex-col gap-4"
        style={{ boxShadow: '0 -8px 40px rgba(124,58,237,0.1)' }}>

        <div className="text-center">
          <h2 className="text-xl font-black text-gray-900">Welcome Back! 👋</h2>
          <p className="text-xs text-gray-500 font-semibold mt-1">Log in to continue your learning journey</p>
        </div>

        {/* Auth error */}
        {errors.auth && (
          <div role="alert" className="flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-bold animate-errorShake"
            style={{ background: 'linear-gradient(135deg,#FFF1F2,#FFE4E6)', border: '1.5px solid #FECDD3', color: '#BE123C' }}>
            <span>⚠️</span> {errors.auth}
          </div>
        )}

        <form onSubmit={handleLogin} noValidate className="flex flex-col gap-3">
          {/* Email */}
          <div>
            <label htmlFor="mob-email" className="text-xs font-bold text-gray-700 block mb-1">
              Email or Phone
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">✉️</span>
              <input
                id="mob-email"
                type="text"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                placeholder="Enter your email"
                autoComplete="email"
                aria-invalid={!!errors.email}
                disabled={isLoading}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-gray-50 text-sm font-semibold text-gray-800 placeholder-gray-400 outline-none transition-all focus:bg-white focus:ring-2 disabled:opacity-60 ${errors.email ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-purple-500 focus:ring-purple-100'}`}
              />
            </div>
            {errors.email && <p role="alert" className="mt-1 text-xs font-bold text-red-600 animate-errorFadeIn">⚠ {errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="mob-password" className="text-xs font-bold text-gray-700">Password</label>
              <button type="button" onClick={onNavigateForgot}
                className="text-xs font-bold text-purple-600 hover:text-purple-700 cursor-pointer">
                Forgot?
              </button>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">🔒</span>
              <input
                id="mob-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                aria-invalid={!!errors.password}
                disabled={isLoading}
                className={`w-full pl-10 pr-11 py-3 rounded-xl border bg-gray-50 text-sm font-semibold text-gray-800 placeholder-gray-400 outline-none transition-all focus:bg-white focus:ring-2 disabled:opacity-60 ${errors.password ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-purple-500 focus:ring-purple-100'}`}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer">
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && <p role="alert" className="mt-1 text-xs font-bold text-red-600 animate-errorFadeIn">⚠ {errors.password}</p>}
          </div>

          {/* Remember Me */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 accent-purple-600" />
            <span className="text-xs font-bold text-gray-600">Remember me</span>
          </label>

          {/* Login Button */}
          <button
            id="mob-login-submit"
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-2xl text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.97] shadow-lg cursor-pointer disabled:opacity-70"
            style={{ background: isLoading ? '#9f7aea' : 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeDasharray="40" strokeDashoffset="15" />
                </svg>
                Signing in...
              </>
            ) : 'Login →'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-[10px] font-bold text-gray-400">or continue with</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        {/* Prominent Continue with Google Button */}
        <button
          id="mob-google-continue"
          type="button"
          disabled={isLoading}
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-black text-gray-700 transition-all hover:scale-[1.01] active:scale-[0.98] hover:shadow-sm hover:border-purple-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
        >
          {isLoading ? (
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#7C3AED" strokeWidth="3" strokeDasharray="40" strokeDashoffset="15" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" className="shrink-0">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
          )}
          Continue with Google
        </button>

        {/* Toast Error Notification */}
        {toastMessage && (
          <Toast
            message={toastMessage.message}
            type={toastMessage.type}
            onClose={() => setToastMessage(null)}
          />
        )}

        {/* Sign up link */}
        <p className="text-center text-xs font-bold text-gray-500">
          Don't have an account?{' '}
          <button type="button" onClick={onNavigateSignUp}
            className="text-purple-600 font-extrabold hover:text-purple-700 cursor-pointer">
            Sign Up
          </button>
        </p>

        {/* Security badge */}
        <div className="flex items-center gap-2.5 rounded-2xl p-3"
          style={{ background: 'linear-gradient(135deg,#f5f3ff,#ede9ff)', border: '1px solid #ddd6fe' }}>
          <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center text-white text-sm flex-shrink-0 shadow-md">🛡️</div>
          <div>
            <div className="text-xs font-black text-purple-900">Your data is safe with us!</div>
            <div className="text-[10px] font-semibold text-purple-600">Top-notch security keeps your info protected.</div>
          </div>
          <div className="text-2xl ml-auto">🔐</div>
        </div>

        {/* Demo hint */}
        <div className="text-center text-[10px] font-semibold text-gray-400">
          Demo: child@reinforce.ai / Reinforce123 | parent@reinforce.ai / Parent123
        </div>
      </div>
    </div>
  )
}
