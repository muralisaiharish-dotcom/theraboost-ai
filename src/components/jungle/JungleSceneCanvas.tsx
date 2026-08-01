import { useState } from 'react'
import type { JungleEcosystemData } from '../../engine/jungleEngine'
import { jungleAudio } from '../../engine/jungleAudio'

interface JungleSceneCanvasProps {
  ecosystem: JungleEcosystemData
  onTriggerSimulated?: (triggerName: string, effectName: string, xp: number, stars: number, health: string) => void
}

export function JungleSceneCanvas({ ecosystem, onTriggerSimulated }: JungleSceneCanvasProps) {
  const [activeEffect, setActiveEffect] = useState<string | null>(null)
  const [effectMessage, setEffectMessage] = useState<string | null>(null)
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true)

  const triggerAnimation = (type: string, message: string, xp: number, stars: number, health: string) => {
    setActiveEffect(type)
    setEffectMessage(message)

    if (soundEnabled) {
      if (type === 'tree') jungleAudio.playGrowthShimmer()
      else if (type === 'flower') jungleAudio.playUnlockChime()
      else if (type === 'bird') jungleAudio.playBirdChirp()
      else if (type === 'streak') jungleAudio.playSplashSound()
      else jungleAudio.playUnlockChime()
    }

    if (onTriggerSimulated) {
      onTriggerSimulated(type, message, xp, stars, health)
    }

    setTimeout(() => {
      setActiveEffect(null)
      setEffectMessage(null)
    }, 4500)
  }

  return (
    <div className="relative w-full h-[420px] sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl border-2 border-emerald-500/30 select-none bg-[#081812] flex flex-col justify-between">
      {/* ── Visual Environment Backdrop ── */}
      <div className="absolute inset-0 z-0">
        {/* Dynamic Sky Gradient based on Weather State */}
        <div
          className={`absolute inset-0 transition-colors duration-1000 ${
            ecosystem.weatherState === 'sunshine'
              ? 'bg-gradient-to-b from-[#103E2F] via-[#0E2E23] to-[#071912]'
              : ecosystem.weatherState === 'glowing'
              ? 'bg-gradient-to-b from-[#0D3327] via-[#0A261D] to-[#05130E]'
              : ecosystem.weatherState === 'cloudy'
              ? 'bg-gradient-to-b from-[#1C2C28] via-[#111F1C] to-[#0A1210]'
              : 'bg-gradient-to-b from-[#0E1B17] via-[#0B1512] to-[#050B09]'
          }`}
        />

        {/* Radiant Sun Rays / Shimmer Beam */}
        {(ecosystem.weatherState === 'sunshine' || activeEffect === 'motivation') && (
          <div
            className="absolute top-0 right-1/4 w-96 h-[400px] opacity-40 pointer-events-none animate-pulse"
            style={{
              background: 'radial-gradient(ellipse at top, rgba(253, 224, 71, 0.4) 0%, rgba(52, 211, 153, 0.1) 60%, transparent 80%)',
              transform: 'rotate(-25deg)',
              transformOrigin: 'top right',
            }}
          />
        )}

        {/* Prismatic Rainbow Overlay (Unlocked or Motivation High) */}
        {(ecosystem.weatherState === 'sunshine' || activeEffect === 'motivation' || ecosystem.unlockables.find(u => u.id === 'rainbow')?.unlocked) && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[90%] sm:w-[600px] h-32 opacity-80 pointer-events-none transition-all duration-700 animate-pulse">
            <svg viewBox="0 0 600 120" fill="none" className="w-full h-full">
              <path d="M 50 120 A 250 100 0 0 1 550 120" stroke="rgba(239, 68, 68, 0.5)" strokeWidth="6" fill="none" />
              <path d="M 60 120 A 240 94 0 0 1 540 120" stroke="rgba(249, 115, 22, 0.5)" strokeWidth="6" fill="none" />
              <path d="M 70 120 A 230 88 0 0 1 530 120" stroke="rgba(234, 179, 8, 0.5)" strokeWidth="6" fill="none" />
              <path d="M 80 120 A 220 82 0 0 1 520 120" stroke="rgba(34, 197, 94, 0.5)" strokeWidth="6" fill="none" />
              <path d="M 90 120 A 210 76 0 0 1 510 120" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="6" fill="none" />
              <path d="M 100 120 A 200 70 0 0 1 500 120" stroke="rgba(168, 85, 247, 0.5)" strokeWidth="6" fill="none" />
            </svg>
          </div>
        )}

        {/* Mountain & Deep Forest Silhouettes */}
        <svg className="absolute bottom-0 inset-x-0 w-full h-48 text-emerald-950/60 pointer-events-none" viewBox="0 0 1200 300" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,300 L0,180 Q150,120 300,160 Q450,200 600,130 Q750,70 900,140 Q1050,210 1200,150 L1200,300 Z" />
          <path fill="rgba(6, 44, 30, 0.8)" d="M0,300 L0,220 Q200,170 400,210 Q600,250 800,180 Q1000,110 1200,200 L1200,300 Z" />
        </svg>

        {/* Ancient Glowing Sun Temple Ruins (Background Right) */}
        <div className={`absolute bottom-28 right-8 sm:right-20 flex flex-col items-center transition-all duration-700 ${activeEffect === 'achievement' ? 'scale-110 drop-shadow-[0_0_25px_rgba(234,179,8,0.9)]' : 'opacity-85'}`}>
          <div className="relative">
            <div className="w-24 sm:w-32 h-20 bg-gradient-to-t from-[#12281D] via-[#1E3E2F] to-[#2B5440] rounded-t-xl border-t-2 border-amber-400/50 flex flex-col items-center justify-between p-2 shadow-2xl">
              <div className="flex gap-2 text-amber-400/80 text-[10px] font-mono tracking-widest animate-pulse">
                🏛️ ᚱᚢᚾᛖᛋ 🏛️
              </div>
              <div className="w-8 h-10 bg-amber-400/30 rounded-t-md border border-amber-300/60 flex items-center justify-center">
                <span className={`text-base transition-transform ${activeEffect === 'achievement' ? 'animate-spin' : ''}`}>✨</span>
              </div>
            </div>
            <div className="w-32 sm:w-40 h-6 bg-[#0E2017] rounded-sm border-t border-emerald-700/60 flex items-center justify-center">
              <span className="text-[10px] font-extrabold text-amber-300/80 tracking-wider uppercase">Ancient Sun Temple</span>
            </div>
          </div>
        </div>

        {/* Flowing River & Animated Wave Gradient */}
        <div className="absolute bottom-0 inset-x-0 h-28 pointer-events-none">
          <svg className="w-full h-full text-teal-700/40 animate-pulse" style={{ animationDuration: '4s' }} viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path fill="url(#riverGradient)" d="M0,60 Q300,10 600,70 Q900,110 1200,40 L1200,120 L0,120 Z" />
            <defs>
              <linearGradient id="riverGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0D5C46" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#148064" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0B4B39" stopOpacity="0.9" />
              </linearGradient>
            </defs>
          </svg>

          {/* Water Splash & Wave Ripples */}
          <div className="absolute inset-0 bg-gradient-to-t from-teal-500/10 via-transparent to-transparent flex items-center justify-around">
            <span className="text-xs opacity-70 animate-bounce" style={{ animationDuration: '3s' }}>💦</span>
            <span className="text-xs opacity-70 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>🌊</span>
            <span className="text-xs opacity-70 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>💦</span>
          </div>

          {/* Waterfall Cascade (Left Side) */}
          <div className="absolute bottom-0 left-6 sm:left-12 w-12 sm:w-16 h-28 flex flex-col items-center">
            <div className="w-full h-full bg-gradient-to-b from-teal-300/60 via-cyan-400/40 to-teal-500/80 rounded-t-lg border-x border-cyan-200/40 animate-pulse" />
            <div className="absolute -top-3 w-16 h-4 bg-teal-200/40 rounded-full blur-sm" />
            <div className="absolute bottom-0 flex gap-1">
              <span className="text-xs animate-ping">💦</span>
              <span className="text-xs animate-ping" style={{ animationDelay: '0.3s' }}>✨</span>
            </div>
          </div>
        </div>

        {/* ── Dynamic Flora & Wildlife Layers ── */}
        
        {/* Growing Trees Layer (Speech Practice Trigger) */}
        <div className="absolute bottom-20 inset-x-4 sm:inset-x-12 flex items-end justify-between pointer-events-none">
          <div className={`flex flex-col items-center transition-all duration-700 ${activeEffect === 'tree' ? 'scale-125 -translate-y-2' : ''}`}>
            <div className="w-20 h-24 sm:w-28 sm:h-32 bg-emerald-500/20 rounded-full border border-emerald-400/40 flex items-center justify-center text-4xl sm:text-5xl shadow-lg backdrop-blur-xs">
              🌳
            </div>
            <div className="w-4 h-12 bg-amber-900/80 rounded-b-md border-x border-amber-950" />
          </div>

          <div className={`flex flex-col items-center transition-all duration-700 ${activeEffect === 'tree' ? 'scale-125 -translate-y-3' : ''}`}>
            <div className="w-24 h-28 sm:w-36 sm:h-40 bg-emerald-400/25 rounded-full border border-emerald-300/50 flex items-center justify-center text-5xl sm:text-6xl shadow-xl backdrop-blur-xs">
              🌴
            </div>
            <div className="w-6 h-16 bg-amber-950/90 rounded-b-md border-x border-amber-900" />
          </div>

          <div className={`flex flex-col items-center transition-all duration-700 ${activeEffect === 'tree' ? 'scale-125 -translate-y-2' : ''}`}>
            <div className="w-16 h-20 sm:w-24 sm:h-28 bg-emerald-600/20 rounded-full border border-emerald-500/40 flex items-center justify-center text-3xl sm:text-4xl shadow-lg backdrop-blur-xs">
              🌲
            </div>
            <div className="w-3 h-10 bg-amber-900/80 rounded-b-md border-x border-amber-950" />
          </div>
        </div>

        {/* Blooming Flowers (Flash Cards Trigger) */}
        <div className="absolute bottom-12 inset-x-8 sm:inset-x-24 flex justify-around pointer-events-none">
          <span className={`text-2xl sm:text-3xl transition-transform duration-500 ${activeEffect === 'flower' ? 'scale-150 animate-bounce' : 'animate-pulse'}`}>🌸</span>
          <span className={`text-2xl sm:text-3xl transition-transform duration-500 ${activeEffect === 'flower' ? 'scale-150 animate-bounce' : 'animate-pulse'}`} style={{ animationDelay: '0.2s' }}>🌺</span>
          <span className={`text-2xl sm:text-3xl transition-transform duration-500 ${activeEffect === 'flower' ? 'scale-150 animate-bounce' : 'animate-pulse'}`} style={{ animationDelay: '0.4s' }}>🌻</span>
          <span className={`text-2xl sm:text-3xl transition-transform duration-500 ${activeEffect === 'flower' ? 'scale-150 animate-bounce' : 'animate-pulse'}`} style={{ animationDelay: '0.6s' }}>🌷</span>
          <span className={`text-2xl sm:text-3xl transition-transform duration-500 ${activeEffect === 'flower' ? 'scale-150 animate-bounce' : 'animate-pulse'}`} style={{ animationDelay: '0.8s' }}>🌹</span>
        </div>

        {/* Flying Butterflies (Matching Games Trigger) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-1/3 left-1/4 text-2xl transition-all duration-1000 ${activeEffect === 'butterfly' ? 'scale-150 translate-x-12 -translate-y-8 animate-spin' : 'animate-bounce'}`}>
            🦋
          </div>
          <div className={`absolute top-1/2 right-1/3 text-xl transition-all duration-1000 ${activeEffect === 'butterfly' ? 'scale-150 -translate-x-16 -translate-y-12 animate-spin' : 'animate-bounce'}`} style={{ animationDelay: '0.5s' }}>
            🦋
          </div>
          <div className={`absolute top-1/4 right-1/4 text-2xl transition-all duration-1000 ${activeEffect === 'butterfly' ? 'scale-150 translate-x-8 translate-y-6 animate-spin' : 'animate-bounce'}`} style={{ animationDelay: '0.8s' }}>
            🦋
          </div>
        </div>

        {/* Landing Birds (Reward Videos Trigger) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-12 left-16 text-3xl transition-all duration-700 ${activeEffect === 'bird' ? 'scale-150 translate-y-20 rotate-12' : 'animate-pulse'}`}>
            🦜
          </div>
          <div className={`absolute top-20 right-28 text-3xl transition-all duration-700 ${activeEffect === 'bird' ? 'scale-150 translate-y-16 -rotate-12' : 'animate-pulse'}`} style={{ animationDelay: '0.4s' }}>
            🦚
          </div>
        </div>

        {/* Elephant, Monkeys & Wildlife Ground */}
        <div className="absolute bottom-16 left-1/3 pointer-events-none flex gap-6 items-end">
          <span className={`text-4xl sm:text-5xl transition-transform ${activeEffect === 'streak' ? 'scale-125 animate-bounce' : ''}`}>🐘</span>
          <span className={`text-2xl sm:text-3xl transition-transform ${activeEffect === 'tree' ? 'scale-125 -translate-y-6' : ''}`}>🐒</span>
          <span className={`text-2xl sm:text-3xl transition-transform ${activeEffect === 'motivation' ? 'scale-125 animate-bounce' : ''}`}>🦌</span>
        </div>

        {/* Starlight Fireflies Floating Upwards */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_10px_#FDE047] opacity-80 animate-ping"
              style={{
                top: `${15 + (i * 7) % 70}%`,
                left: `${10 + (i * 8) % 80}%`,
                animationDuration: `${2 + (i % 3)}s`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>

        {/* Floating Leaves */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute text-sm opacity-60 animate-bounce"
              style={{
                top: `${5 + i * 14}%`,
                left: `${(i * 18 + 5) % 90}%`,
                animationDuration: `${3.5 + i}s`,
              }}
            >
              🍃
            </div>
          ))}
        </div>
      </div>

      {/* ── Top Bar Header Badge & Sound Toggle ── */}
      <div className="relative z-10 p-4 flex items-start justify-between">
        <div className="bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 rounded-2xl px-4 py-2 flex items-center gap-3 shadow-lg">
          <span className="text-2xl">🌳</span>
          <div>
            <h3 className="text-xs font-black tracking-wide text-emerald-300 uppercase">Living Ecosystem State</h3>
            <p className="text-sm font-bold text-white flex items-center gap-2">
              <span>{ecosystem.healthLevel}</span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[11px] px-2 py-0.5 rounded-full border border-emerald-500/30">
                {ecosystem.healthScore}% Health
              </span>
            </p>
          </div>
        </div>

        {/* Sound Synthesizer Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 rounded-2xl px-3 py-2 text-xs font-bold text-emerald-200 hover:text-white cursor-pointer transition-all active:scale-95 flex items-center gap-1.5 shadow-lg"
          >
            <span>{soundEnabled ? '🔊 Sound On' : '🔇 Audio Muted'}</span>
          </button>
        </div>
      </div>

      {/* ── Live Transformation Event Banner ── */}
      {effectMessage && (
        <div className="relative z-20 mx-4 bg-gradient-to-r from-amber-500 via-emerald-600 to-teal-600 text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-2xl border border-amber-300/60 flex items-center justify-between animate-bounce">
          <div className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <span>{effectMessage}</span>
          </div>
          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-wider">Transformation Live</span>
        </div>
      )}

      {/* ── Bottom Interactive Live Controls ── */}
      <div className="relative z-10 p-3 sm:p-4 bg-emerald-950/90 backdrop-blur-md border-t border-emerald-500/30 flex flex-col gap-2">
        <div className="flex items-center justify-between text-[11px] font-bold text-emerald-300 px-1">
          <span className="flex items-center gap-1.5">
            <span className="animate-pulse text-amber-400">⚡</span>
            <span>Test Real-Time Therapy Transformation Triggers:</span>
          </span>
          <span className="text-[10px] text-emerald-400/70 hidden sm:inline">Click any button below to see the ecosystem transform!</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5">
          <button
            onClick={() =>
              triggerAnimation(
                'tree',
                'Speech Practice completed! 3 Mahogany Trees Grew 🌳',
                25,
                15,
                '+4%'
              )
            }
            className="bg-emerald-900/60 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-100 text-[11px] font-bold py-2 px-2 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1 truncate"
          >
            <span>🗣️</span>
            <span className="truncate">Speech Tree</span>
          </button>

          <button
            onClick={() =>
              triggerAnimation(
                'flower',
                'Flashcards mastered! Golden Orchids Bloomed 🌸',
                20,
                15,
                '+3%'
              )
            }
            className="bg-emerald-900/60 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-100 text-[11px] font-bold py-2 px-2 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1 truncate"
          >
            <span>🃏</span>
            <span className="truncate">Flash Flowers</span>
          </button>

          <button
            onClick={() =>
              triggerAnimation(
                'butterfly',
                'Matching Game complete! Butterflies Arrived 🦋',
                30,
                20,
                '+5%'
              )
            }
            className="bg-emerald-900/60 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-100 text-[11px] font-bold py-2 px-2 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1 truncate"
          >
            <span>🧩</span>
            <span className="truncate">Match Butterfly</span>
          </button>

          <button
            onClick={() =>
              triggerAnimation(
                'bird',
                'Reward Video watched! Exotic Birds Landed 🦜',
                15,
                10,
                '+2%'
              )
            }
            className="bg-emerald-900/60 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-100 text-[11px] font-bold py-2 px-2 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1 truncate"
          >
            <span>🎬</span>
            <span className="truncate">Reward Birds</span>
          </button>

          <button
            onClick={() =>
              triggerAnimation(
                'achievement',
                'Achievement Unlocked! Sun Temple Lit Up 🏛️',
                100,
                50,
                '+10%'
              )
            }
            className="bg-emerald-900/60 hover:bg-amber-600/50 border border-amber-500/40 text-amber-100 text-[11px] font-bold py-2 px-2 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1 truncate"
          >
            <span>🏆</span>
            <span className="truncate">Temple Glow</span>
          </button>

          <button
            onClick={() =>
              triggerAnimation(
                'streak',
                '7-Day Streak active! River & Waterfall Expanded 💦',
                50,
                30,
                '+8%'
              )
            }
            className="bg-emerald-900/60 hover:bg-cyan-600/50 border border-cyan-500/40 text-cyan-100 text-[11px] font-bold py-2 px-2 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1 truncate"
          >
            <span>🔥</span>
            <span className="truncate">River Streak</span>
          </button>

          <button
            onClick={() =>
              triggerAnimation(
                'motivation',
                'High Motivation Boost! Radiant Rainbow Appeared 🌈',
                40,
                25,
                '+6%'
              )
            }
            className="bg-emerald-900/60 hover:bg-purple-600/50 border border-purple-500/40 text-purple-100 text-[11px] font-bold py-2 px-2 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1 col-span-2 sm:col-span-1 truncate"
          >
            <span>🌈</span>
            <span className="truncate">Motivation</span>
          </button>
        </div>
      </div>
    </div>
  )
}
