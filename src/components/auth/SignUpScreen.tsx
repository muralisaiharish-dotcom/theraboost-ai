import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import type { UserRole } from '../../types'

interface SignUpScreenProps {
  onNavigateLogin: () => void
}

const AVATARS = ['👦', '👧', '🧒', '👶', '🐣', '🦊', '🐼', '🐨', '🦄', '🐸']

function isValidEmail(v: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) }

export function SignUpScreen({ onNavigateLogin }: SignUpScreenProps) {
  const { register } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [age, setAge] = useState('')
  const [role, setRole] = useState<UserRole>('child')
  const [avatar, setAvatar] = useState('👦')
  const [showAvatarPicker, setShowAvatarPicker] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!name.trim()) e.name = 'Name is required.'
    if (!email.trim()) e.email = 'Email is required.'
    else if (!isValidEmail(email)) e.email = 'Enter a valid email.'
    if (!password) e.password = 'Password is required.'
    else if (password.length < 6) e.password = 'Password must be at least 6 characters.'
    if (password !== confirmPassword) e.confirm = 'Passwords do not match.'
    if (role === 'child' && age && (isNaN(Number(age)) || Number(age) < 3 || Number(age) > 18)) {
      e.age = 'Age must be between 3 and 18.'
    }
    return e
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setIsLoading(true)
    const result = await register({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      avatar,
      role,
      age: age ? Number(age) : undefined,
      password,
    })
    setIsLoading(false)
    if (result.success) {
      setSuccess(true)
    } else {
      setErrors({ auth: result.error || 'Registration failed.' })
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-6 gap-6 animate-bounceIn"
        style={{ background: 'linear-gradient(135deg, #EDE9FF, #F5F3FF)' }}>
        <div className="text-7xl animate-float">{avatar}</div>
        <div className="text-center">
          <h2 className="text-2xl font-black text-purple-950">Welcome, {name}! 🎉</h2>
          <p className="text-sm font-semibold text-purple-600 mt-2">Your account is ready. Let's start learning!</p>
        </div>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-xl animate-starPop" style={{ animationDelay: `${i * 0.1}s` }}>⭐</span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-white">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
        <button onClick={onNavigateLogin} className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 cursor-pointer transition-all">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>
        <div>
          <h1 className="text-lg font-black text-gray-900">Create Account</h1>
          <p className="text-xs font-semibold text-gray-500">Join TheraBoost AI today!</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 px-5 py-5 pb-8">
        {errors.auth && (
          <div role="alert" className="flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-bold"
            style={{ background: '#FFF1F2', border: '1.5px solid #FECDD3', color: '#BE123C' }}>
            ⚠️ {errors.auth}
          </div>
        )}

        {/* Avatar Picker */}
        <div className="flex flex-col items-center gap-2">
          <button type="button" onClick={() => setShowAvatarPicker(!showAvatarPicker)}
            className="w-16 h-16 rounded-full bg-purple-100 border-4 border-purple-300 flex items-center justify-center text-4xl cursor-pointer hover:scale-105 transition-transform shadow-md">
            {avatar}
          </button>
          <span className="text-xs font-bold text-purple-600 cursor-pointer" onClick={() => setShowAvatarPicker(!showAvatarPicker)}>
            {showAvatarPicker ? 'Close' : 'Choose Avatar'}
          </span>
          {showAvatarPicker && (
            <div className="flex flex-wrap gap-2 justify-center p-3 bg-purple-50 rounded-2xl border border-purple-100">
              {AVATARS.map((av) => (
                <button key={av} type="button"
                  onClick={() => { setAvatar(av); setShowAvatarPicker(false) }}
                  className={`w-10 h-10 rounded-xl text-2xl flex items-center justify-center transition-all cursor-pointer ${av === avatar ? 'bg-purple-600 scale-110 shadow-md' : 'bg-white hover:bg-purple-100'}`}>
                  {av}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Role Selector */}
        <div>
          <label className="text-xs font-bold text-gray-700 block mb-2">I am a...</label>
          <div className="grid grid-cols-2 gap-2">
            {(['child', 'parent'] as UserRole[]).map((r) => (
              <button key={r} type="button" onClick={() => setRole(r)}
                className={`py-2.5 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer border-2 ${role === r ? 'bg-purple-600 text-white border-purple-600 shadow-md' : 'bg-white text-gray-700 border-gray-200 hover:border-purple-300'}`}>
                {r === 'child' ? '🧒' : '👩‍👦'} {r === 'child' ? 'Child' : 'Parent'}
              </button>
            ))}
          </div>
        </div>

        {/* Name */}
        <InputField label="Full Name" id="su-name" placeholder="Enter your name" value={name}
          onChange={setName} error={errors.name} icon="👤" />

        {/* Email */}
        <InputField label="Email" id="su-email" type="email" placeholder="Enter your email" value={email}
          onChange={setEmail} error={errors.email} icon="✉️" />

        {/* Age (child only) */}
        {role === 'child' && (
          <InputField label="Age" id="su-age" type="number" placeholder="Your age (e.g. 8)" value={age}
            onChange={setAge} error={errors.age} icon="🎂" />
        )}

        {/* Password */}
        <div>
          <label htmlFor="su-password" className="text-xs font-bold text-gray-700 block mb-1">Password</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">🔒</span>
            <input id="su-password" type={showPassword ? 'text' : 'password'} value={password}
              onChange={(e) => setPassword(e.target.value)} placeholder="Create a password (min 6 chars)"
              className={`w-full pl-10 pr-11 py-3 rounded-xl border bg-gray-50 text-sm font-semibold text-gray-800 placeholder-gray-400 outline-none transition-all focus:bg-white focus:ring-2 ${errors.password ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-purple-500 focus:ring-purple-100'}`} />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-xs font-bold text-red-600">⚠ {errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <InputField label="Confirm Password" id="su-confirm" type="password" placeholder="Re-enter your password"
          value={confirmPassword} onChange={setConfirmPassword} error={errors.confirm} icon="🔑" />

        {/* Submit */}
        <button type="submit" disabled={isLoading}
          className="w-full py-3.5 rounded-2xl text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-70 transition-all hover:scale-[1.02] active:scale-[0.97] mt-1"
          style={{ background: isLoading ? '#9f7aea' : 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
          {isLoading ? (
            <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeDasharray="40" strokeDashoffset="15" />
            </svg> Creating account...</>
          ) : '✨ Create My Account'}
        </button>

        <p className="text-center text-xs font-bold text-gray-500">
          Already have an account?{' '}
          <button type="button" onClick={onNavigateLogin} className="text-purple-600 font-extrabold cursor-pointer">Sign In</button>
        </p>
      </form>
    </div>
  )
}

// Reusable input field component
function InputField({ label, id, type = 'text', placeholder, value, onChange, error, icon }: {
  label: string; id: string; type?: string; placeholder: string
  value: string; onChange: (v: string) => void; error?: string; icon: string
}) {
  return (
    <div>
      <label htmlFor={id} className="text-xs font-bold text-gray-700 block mb-1">{label}</label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">{icon}</span>
        <input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
          className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-gray-50 text-sm font-semibold text-gray-800 placeholder-gray-400 outline-none transition-all focus:bg-white focus:ring-2 ${error ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-purple-500 focus:ring-purple-100'}`} />
      </div>
      {error && <p className="mt-1 text-xs font-bold text-red-600">⚠ {error}</p>}
    </div>
  )
}
