import { useState } from 'react'
import heroIllustration from '../assets/hero-illustration.png'
import type { UserInfo } from '../types'

// ─── Demo credentials ───────────────────────────────────────────────────────
const DEMO_EMAIL = 'child@theraboost.ai'
const DEMO_PASSWORD = 'Thera123'

// ─── Email format validator ──────────────────────────────────────────────────
function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

interface LoginPageProps {
  onLogin: (user: UserInfo) => void
}

interface FormErrors {
  email: string
  password: string
  auth: string
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({ email: '', password: '', auth: '' })

  // Clear individual field errors as the user types
  const handleEmailChange = (val: string) => {
    setEmail(val)
    if (errors.email) setErrors((prev) => ({ ...prev, email: '' }))
    if (errors.auth) setErrors((prev) => ({ ...prev, auth: '' }))
  }

  const handlePasswordChange = (val: string) => {
    setPassword(val)
    if (errors.password) setErrors((prev) => ({ ...prev, password: '' }))
    if (errors.auth) setErrors((prev) => ({ ...prev, auth: '' }))
  }

  // ── Client-side validation ────────────────────────────────────────────────
  const validate = (): FormErrors => {
    const next: FormErrors = { email: '', password: '', auth: '' }
    const trimmedEmail = email.trim()

    if (!trimmedEmail) {
      next.email = 'Email is required.'
    } else if (!isValidEmail(trimmedEmail)) {
      next.email = 'Please enter a valid email address.'
    }

    if (!password) {
      next.password = 'Password is required.'
    }

    return next
  }

  // ── Form submission ───────────────────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    // Step 1: client-side validation
    const fieldErrors = validate()
    if (fieldErrors.email || fieldErrors.password) {
      setErrors(fieldErrors)
      return
    }

    // Step 2: simulate async authentication
    setIsLoading(true)
    setErrors({ email: '', password: '', auth: '' })

    await new Promise((resolve) => setTimeout(resolve, 1200))

    setIsLoading(false)

    // Step 3: check credentials (preserve email on failure)
    const trimmedEmail = email.trim().toLowerCase()
    if (trimmedEmail === DEMO_EMAIL.toLowerCase() && password === DEMO_PASSWORD) {
      // Build the authenticated user object — single source of truth
      const user: UserInfo = {
        name: 'Rahul',
        email: DEMO_EMAIL,
        avatar: '👦',
        level: 3,
        role: 'child',
      }
      onLogin(user)
    } else {
      setErrors({ email: '', password: '', auth: 'Invalid email or password.' })
    }
  }

  const floatingLetters = [
    { letter: 'A', color: '#FF6B9D', top: '18%', left: '62%', rotate: '-10deg', size: '2.8rem' },
    { letter: 'B', color: '#FFB347', top: '35%', left: '68%', rotate: '8deg', size: '2.4rem' },
    { letter: 'C', color: '#4CAF50', top: '52%', left: '64%', rotate: '-5deg', size: '2.6rem' },
  ]

  const sparkles = [
    { top: '15%', left: '55%', color: '#7C3AED', size: '1rem' },
    { top: '28%', left: '72%', color: '#F59E0B', size: '0.7rem' },
    { top: '45%', left: '58%', color: '#7C3AED', size: '0.5rem' },
    { top: '60%', left: '74%', color: '#F59E0B', size: '0.9rem' },
    { top: '20%', left: '40%', color: '#EC4899', size: '0.6rem' },
  ]

  return (
    <div className="flex h-screen w-screen overflow-hidden" style={{ background: '#EDE9FF' }}>
      {/* ── Left Hero Panel ─────────────────────────────────── */}
      <div className="relative flex-1 flex flex-col justify-between p-10 overflow-hidden select-none">

        {/* Background decorative cloud blobs */}
        <div className="absolute top-[-60px] right-[-40px] w-72 h-72 rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #c4b5fd 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-80px] left-[-50px] w-80 h-80 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)' }} />

        {/* Logo */}
        <div className="flex items-center gap-3 z-10">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #a78bfa)' }}>
            ☁️
          </div>
          <div>
            <div className="text-xl font-black text-purple-950 leading-tight">
              TheraBoost <span className="text-purple-600">AI</span>
            </div>
            <div className="text-xs font-semibold text-purple-400 tracking-wide">Learn • Practice • Grow</div>
          </div>
        </div>

        {/* Hero Text */}
        <div className="z-10 mt-8">
          <h1 className="text-5xl font-black text-purple-950 leading-tight mb-4">
            Every word<br />
            <span className="text-purple-600">you speak</span> is<br />
            a step forward!
          </h1>
          <p className="text-purple-700 font-semibold text-base max-w-xs leading-relaxed">
            Practice, play and learn with TheraBoost AI. Your journey to confident communication starts here!
          </p>

          {/* Speech waveform badge */}
          <div className="mt-6 inline-flex items-center gap-3 bg-white rounded-2xl px-5 py-3 shadow-md">
            <div className="flex items-end gap-0.5 h-6">
              {[3, 6, 9, 12, 9, 7, 11, 8, 5, 10, 7, 4].map((h, i) => (
                <div
                  key={i}
                  className="w-1 rounded-full"
                  style={{
                    height: `${h}px`,
                    background: 'linear-gradient(to top, #7C3AED, #a78bfa)',
                    animationDelay: `${i * 0.1}s`,
                    animation: 'waveBar 1.2s ease-in-out infinite alternate',
                  }}
                />
              ))}
            </div>
            <span className="text-purple-700 font-bold text-sm">Voice Active</span>
          </div>
        </div>

        {/* Floating Letters */}
        {floatingLetters.map(({ letter, color, top, left, rotate, size }) => (
          <div
            key={letter}
            className="absolute font-black animate-float pointer-events-none"
            style={{ top, left, color, fontSize: size, transform: `rotate(${rotate})`, textShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 5 }}
          >
            {letter}
          </div>
        ))}

        {/* Sparkles */}
        {sparkles.map((s, i) => (
          <div
            key={i}
            className="absolute pointer-events-none"
            style={{ top: s.top, left: s.left, zIndex: 5 }}
          >
            <svg width={s.size} height={s.size} viewBox="0 0 24 24" fill={s.color} style={{ animation: `float ${2 + i * 0.3}s ease-in-out infinite`, animationDelay: `${i * 0.4}s` }}>
              <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5Z" />
            </svg>
          </div>
        ))}

        {/* Hero Illustration */}
        <div className="relative z-10 flex-1 flex items-end justify-start">
          <img
            src={heroIllustration}
            alt="TheraBoost AI learning mascots"
            className="w-full max-w-md object-contain drop-shadow-xl"
            style={{ maxHeight: '360px', marginBottom: '-10px' }}
            onError={(e) => {
              // Fallback emoji illustration if image fails
              const target = e.currentTarget as HTMLImageElement
              target.style.display = 'none'
              const fallback = target.nextElementSibling as HTMLElement
              if (fallback) fallback.style.display = 'flex'
            }}
          />
          {/* Emoji Fallback */}
          <div className="hidden items-center gap-4 text-8xl" style={{ filter: 'drop-shadow(0 8px 16px rgba(124,58,237,0.2))' }}>
            <span>🧒</span><span>🐘</span>
          </div>
        </div>
      </div>

      {/* ── Right Login Panel ─────────────────────────────── */}
      <div className="flex items-stretch justify-end" style={{ width: '480px', padding: '20px 20px 20px 0' }}>
        <div className="relative flex flex-col w-full bg-white rounded-3xl shadow-2xl p-8 overflow-y-auto"
          style={{ boxShadow: '0 24px 80px rgba(124,58,237,0.12)', border: '1px solid rgba(167,139,250,0.15)' }}>

          {/* Language Selector – top right */}
          <div className="absolute top-5 right-5">
            <button className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl px-3 py-1.5 transition-all cursor-pointer">
              🌐 English <span className="text-gray-400">∨</span>
            </button>
          </div>

          {/* Cloud mascot icon */}
          <div className="flex justify-center mt-4 mb-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-lg animate-float"
              style={{ background: 'linear-gradient(135deg, #ede9ff, #c4b5fd)' }}>
              ☁️
            </div>
          </div>

          {/* Welcome heading */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-black text-gray-900 mb-1">Welcome Back! 👋</h2>
            <p className="text-sm font-semibold text-gray-500 leading-relaxed">
              Log in to continue your learning journey<br />with TheraBoost AI.
            </p>
          </div>

          {/* ── Global auth error banner ── */}
          {errors.auth && (
            <div
              id="login-error-auth"
              role="alert"
              className="flex items-center gap-2.5 mb-4 px-4 py-3 rounded-2xl text-sm font-bold"
              style={{
                background: 'linear-gradient(135deg, #FFF1F2, #FFE4E6)',
                border: '1.5px solid #FECDD3',
                color: '#BE123C',
                animation: 'errorShake 0.4s ease-out',
              }}
            >
              <span className="text-base flex-shrink-0">⚠️</span>
              {errors.auth}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} noValidate className="flex flex-col gap-4">
            {/* Email / Phone */}
            <div>
              <label htmlFor="login-email" className="block text-sm font-bold text-gray-700 mb-1.5">
                Email or Phone Number
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-base pointer-events-none">
                  ✉️
                </span>
                <input
                  id="login-email"
                  type="text"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  placeholder="Enter your email or phone number"
                  autoComplete="email"
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  aria-invalid={!!errors.email}
                  disabled={isLoading}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-gray-50 text-sm font-semibold text-gray-800 placeholder-gray-400 outline-none transition-all focus:bg-white focus:ring-2 disabled:opacity-60 disabled:cursor-not-allowed ${
                    errors.email
                      ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                      : 'border-gray-200 focus:border-purple-500 focus:ring-purple-100'
                  }`}
                />
              </div>
              {errors.email && (
                <p
                  id="email-error"
                  role="alert"
                  className="mt-1.5 flex items-center gap-1 text-xs font-bold text-red-600"
                  style={{ animation: 'errorFadeIn 0.25s ease-out' }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="login-password" className="text-sm font-bold text-gray-700">Password</label>
                <button type="button" className="text-sm font-bold text-purple-600 hover:text-purple-700 transition-colors cursor-pointer">
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-base pointer-events-none">
                  🔒
                </span>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  aria-invalid={!!errors.password}
                  disabled={isLoading}
                  className={`w-full pl-10 pr-11 py-3 rounded-xl border bg-gray-50 text-sm font-semibold text-gray-800 placeholder-gray-400 outline-none transition-all focus:bg-white focus:ring-2 disabled:opacity-60 disabled:cursor-not-allowed ${
                    errors.password
                      ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                      : 'border-gray-200 focus:border-purple-500 focus:ring-purple-100'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && (
                <p
                  id="password-error"
                  role="alert"
                  className="mt-1.5 flex items-center gap-1 text-xs font-bold text-red-600"
                  style={{ animation: 'errorFadeIn 0.25s ease-out' }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                  </svg>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Login Button */}
            <button
              id="login-submit"
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-2xl text-white font-extrabold text-base flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-purple-300/60 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{ background: isLoading ? '#9f7aea' : 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeDasharray="40" strokeDashoffset="15" />
                  </svg>
                  Signing in...
                </>
              ) : (
                <>Login →</>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs font-bold text-gray-400">or continue with</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Social Logins – show info message; do NOT bypass validation */}
          <div className="flex gap-2.5">
            <button
              id="login-google"
              type="button"
              disabled={isLoading}
              onClick={() =>
                setErrors((prev) => ({
                  ...prev,
                  auth: 'Social login is not available yet. Please use your email and password.',
                }))
              }
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-sm font-bold text-gray-700 transition-all hover:border-gray-300 hover:shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
            <button
              id="login-apple"
              type="button"
              disabled={isLoading}
              onClick={() =>
                setErrors((prev) => ({
                  ...prev,
                  auth: 'Social login is not available yet. Please use your email and password.',
                }))
              }
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-sm font-bold text-gray-700 transition-all hover:border-gray-300 hover:shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#000">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Apple
            </button>
            <button
              id="login-parent"
              type="button"
              disabled={isLoading}
              onClick={() =>
                setErrors((prev) => ({
                  ...prev,
                  auth: 'Social login is not available yet. Please use your email and password.',
                }))
              }
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-sm font-bold text-gray-700 transition-all hover:border-gray-300 hover:shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Parent Login
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm font-bold text-gray-500 mt-4">
            Don't have an account?{' '}
            <button type="button" className="text-purple-600 font-extrabold hover:text-purple-700 transition-colors cursor-pointer">
              Sign Up
            </button>
          </p>

          {/* Security Badge */}
          <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl p-3.5"
            style={{ background: 'linear-gradient(135deg, #f5f3ff, #ede9ff)', border: '1px solid #ddd6fe' }}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center text-white text-sm flex-shrink-0 shadow-md">
                🛡️
              </div>
              <div>
                <div className="text-xs font-black text-purple-900">Your data is safe with us!</div>
                <div className="text-xs font-semibold text-purple-600 leading-tight mt-0.5">
                  We use top-notch security to keep<br />your information protected.
                </div>
              </div>
            </div>
            <div className="text-3xl flex-shrink-0">🔐</div>
          </div>
        </div>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes waveBar {
          0%   { transform: scaleY(0.4); }
          100% { transform: scaleY(1); }
        }
        @keyframes errorFadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes errorShake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-6px); }
          40%       { transform: translateX(6px); }
          60%       { transform: translateX(-4px); }
          80%       { transform: translateX(4px); }
        }
      `}</style>
    </div>
  )
}
