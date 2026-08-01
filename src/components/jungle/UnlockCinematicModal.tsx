import { useEffect } from 'react'
import type { UnlockableItem } from '../../engine/jungleEngine'
import { jungleAudio } from '../../engine/jungleAudio'

interface UnlockCinematicModalProps {
  item: UnlockableItem | null
  onClose: () => void
}

export function UnlockCinematicModal({ item, onClose }: UnlockCinematicModalProps) {
  useEffect(() => {
    if (item) {
      jungleAudio.playUnlockChime()
    }
  }, [item])

  if (!item) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in select-none">
      {/* Particle Canvas Effect Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-amber-300 shadow-[0_0_15px_#FCD34D] animate-ping"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${1.5 + Math.random() * 2}s`,
              animationDelay: `${Math.random()}s`,
            }}
          />
        ))}
      </div>

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#0F2A1E] via-[#081812] to-[#040C09] border-2 border-amber-400/80 rounded-3xl p-6 sm:p-8 text-center shadow-2xl space-y-5 animate-scale-up overflow-hidden">
        {/* Glow Halo */}
        <div className="absolute -top-20 -left-20 w-56 h-56 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Celebration Badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-emerald-950 font-black text-xs px-4 py-1.5 rounded-full shadow-lg uppercase tracking-widest animate-bounce">
          <span>✨ UNLOCKED ECOSYSTEM WONDER! ✨</span>
        </div>

        {/* Large Animated Emoji Illustration */}
        <div className="relative mx-auto w-32 h-32 rounded-3xl bg-gradient-to-br from-emerald-500/30 to-amber-500/30 border border-amber-300/50 flex items-center justify-center text-7xl shadow-2xl animate-pulse">
          <span>{item.emoji}</span>
          <div className="absolute -bottom-2 right-0 bg-amber-400 text-emerald-950 text-[10px] font-black px-2 py-0.5 rounded-full border border-amber-200">
            {item.rarity}
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-1.5">
          <h2 className="text-2xl font-black text-white tracking-wide">{item.name}</h2>
          <p className="text-xs font-semibold text-emerald-200/90 leading-relaxed max-w-xs mx-auto">
            {item.description}
          </p>
        </div>

        {/* Requirement Fullfilled Banner */}
        <div className="bg-emerald-900/40 border border-emerald-500/30 rounded-2xl p-3 text-xs font-bold text-emerald-300 flex items-center justify-center gap-2">
          <span>🎉 Met Requirement:</span>
          <span className="text-white font-extrabold">{item.requiredActivity}</span>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-emerald-950 font-black text-sm py-3.5 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer border border-amber-300 uppercase tracking-wider"
        >
          Welcome to My Jungle! 🌳
        </button>
      </div>
    </div>
  )
}
