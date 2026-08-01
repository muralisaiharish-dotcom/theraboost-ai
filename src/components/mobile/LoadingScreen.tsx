import { useEffect, useState } from 'react'

interface LoadingScreenProps {
  onDone: () => void
}

export function LoadingScreen({ onDone }: LoadingScreenProps) {
  const [phase, setPhase] = useState<'logo' | 'text' | 'done'>('logo')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('text'), 600)
    const t2 = setTimeout(() => setPhase('done'), 1800)
    const t3 = setTimeout(() => onDone(), 2000)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onDone])

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center z-50 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #4C1D95 50%, #7C3AED 100%)' }}
    >
      {/* Background sparkles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            top: `${10 + Math.sin(i * 0.9) * 40}%`,
            left: `${5 + (i / 11) * 90}%`,
            opacity: 0.3 + (i % 3) * 0.2,
            animation: `float ${2 + (i % 3) * 0.7}s ease-in-out infinite`,
            animationDelay: `${i * 0.2}s`,
          }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="#A78BFA">
            <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5Z" />
          </svg>
        </div>
      ))}

      {/* Logo */}
      <div
        className="flex flex-col items-center gap-4"
        style={{
          animation: phase === 'logo' ? 'splashLogo 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' : 'none',
        }}
      >
        {/* Cloud mascot */}
        <div
          className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl shadow-2xl animate-float"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))',
            border: '2px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(12px)',
          }}
        >
          ☁️
        </div>

        {/* Brand name */}
        {(phase === 'text' || phase === 'done') && (
          <div className="text-center animate-fadeIn">
            <div className="text-3xl font-black text-white tracking-tight">
              Reinforce<span className="text-purple-300">AI</span>
            </div>
            <div className="text-purple-300 text-sm font-semibold mt-1">
              AI-Powered Smart Reinforcement ✨
            </div>
          </div>
        )}

        {/* Loading dots */}
        {phase === 'text' && (
          <div className="flex gap-2 mt-2 animate-fadeIn">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-purple-300"
                style={{ animation: `float 1s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom tagline */}
      {phase !== 'logo' && (
        <div
          className="absolute bottom-12 text-purple-400 text-xs font-semibold tracking-wide animate-fadeIn"
        >
          Every word is a step forward 🚀
        </div>
      )}

      <style>{`
        @keyframes splashLogo {
          0% { transform: scale(0.5) rotate(-10deg); opacity: 0; }
          60% { transform: scale(1.1) rotate(3deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
