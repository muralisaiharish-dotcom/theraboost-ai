import { useState } from 'react'

interface ForgotPasswordScreenProps {
  onNavigateLogin: () => void
}

function isValidEmail(v: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) }

export function ForgotPasswordScreen({ onNavigateLogin }: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!email.trim()) { setError('Email is required.'); return }
    if (!isValidEmail(email)) { setError('Please enter a valid email.'); return }
    setError('')
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setIsLoading(false)
    setSent(true)
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
        <button onClick={onNavigateLogin}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 cursor-pointer transition-all">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>
        <div>
          <h1 className="text-lg font-black text-gray-900">Forgot Password</h1>
          <p className="text-xs font-semibold text-gray-500">We'll send you a reset link</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
        {sent ? (
          /* ── Success State ── */
          <div className="flex flex-col items-center gap-4 text-center animate-bounceIn">
            <div className="text-7xl animate-float">📬</div>
            <div>
              <h2 className="text-xl font-black text-gray-900">Check your inbox!</h2>
              <p className="text-sm font-semibold text-gray-500 mt-2 max-w-xs">
                We've sent a password reset link to <strong>{email}</strong>. Please check your email and follow the instructions.
              </p>
            </div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-lg animate-starPop" style={{ animationDelay: `${i * 0.1}s` }}>⭐</span>
              ))}
            </div>
            <button onClick={onNavigateLogin}
              className="px-8 py-3 rounded-2xl text-white font-extrabold text-sm shadow-lg transition-all hover:scale-105 cursor-pointer mt-2"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
              Back to Login →
            </button>
          </div>
        ) : (
          /* ── Form State ── */
          <>
            <div className="text-center">
              <div className="text-6xl mb-4 animate-float">🔐</div>
              <h2 className="text-xl font-black text-gray-900">Reset Password</h2>
              <p className="text-sm font-semibold text-gray-500 mt-2 max-w-xs">
                Enter your registered email and we'll send you a secure reset link.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="w-full flex flex-col gap-4">
              <div>
                <label htmlFor="fp-email" className="text-xs font-bold text-gray-700 block mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">✉️</span>
                  <input
                    id="fp-email"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError('') }}
                    placeholder="Enter your email"
                    autoComplete="email"
                    aria-invalid={!!error}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-gray-50 text-sm font-semibold text-gray-800 placeholder-gray-400 outline-none transition-all focus:bg-white focus:ring-2 ${error ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-purple-500 focus:ring-purple-100'}`}
                  />
                </div>
                {error && <p role="alert" className="mt-1 text-xs font-bold text-red-600 animate-errorFadeIn">⚠ {error}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-2xl text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-70 transition-all hover:scale-[1.02] active:scale-[0.97]"
                style={{ background: isLoading ? '#9f7aea' : 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}
              >
                {isLoading ? (
                  <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeDasharray="40" strokeDashoffset="15" />
                  </svg> Sending link...</>
                ) : '📧 Send Reset Link'}
              </button>
            </form>

            <button onClick={onNavigateLogin}
              className="text-sm font-bold text-purple-600 hover:text-purple-800 cursor-pointer">
              ← Back to Login
            </button>
          </>
        )}
      </div>
    </div>
  )
}
