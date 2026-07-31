import { useApp } from '../contexts/AppContext'

interface AIRecommendationCardProps {
  compact?: boolean
}

export function AIRecommendationCard({ compact = false }: AIRecommendationCardProps) {
  const { aiRecommendation, navigate } = useApp()

  const stars = Array(5).fill('⭐').join('')

  if (compact) {
    return (
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white rounded-2xl p-3 shadow-sm border border-purple-400/30 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-xl shrink-0 border border-white/30">
            🤖
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-bold text-purple-200 uppercase tracking-wider">Recommended Reward</div>
            <div className="text-xs font-black truncate">{aiRecommendation.videoTitle}</div>
            <div className="text-[9px] text-amber-300 font-extrabold flex items-center gap-1">
              <span>{stars}</span>
              <span>{aiRecommendation.confidence}% match</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate('Reward Videos')}
          className="bg-amber-400 hover:bg-amber-300 text-purple-950 font-black text-[10px] px-2.5 py-1.5 rounded-xl shadow-xs cursor-pointer shrink-0 transition-transform active:scale-95"
        >
          Watch →
        </button>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-950 text-white rounded-3xl p-4 shadow-md border border-purple-500/30 relative overflow-hidden">
      {/* Glow ambient background */}
      <div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #f59e0b, transparent 70%)' }}
      />

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl animate-bounce" style={{ animationDuration: '2s' }}>🤖</span>
          <span className="text-xs font-black tracking-wider uppercase text-purple-200">
            AI Recommended Reward
          </span>
        </div>
        <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-black px-2.5 py-0.5 rounded-full">
          Confidence: {aiRecommendation.confidence}%
        </span>
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15 mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-12 h-12 rounded-xl bg-amber-400 text-purple-950 flex items-center justify-center text-2xl shrink-0 font-black shadow-inner">
            🎬
          </div>
          <div className="min-w-0">
            <div className="text-[10px] text-purple-200 font-bold uppercase">{aiRecommendation.category}</div>
            <h3 className="text-sm font-black text-white truncate">{aiRecommendation.videoTitle}</h3>
            <div className="text-xs text-amber-300 mt-0.5">{stars}</div>
          </div>
        </div>

        <button
          onClick={() => navigate('Reward Videos')}
          className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-purple-950 font-black text-xs px-3.5 py-2 rounded-xl shadow-md cursor-pointer transition-all hover:scale-105 active:scale-95 shrink-0"
        >
          Watch Now →
        </button>
      </div>

      <div className="bg-purple-950/60 rounded-xl p-2.5 border border-purple-700/50 flex items-start gap-2">
        <span className="text-xs shrink-0 mt-0.5">💡</span>
        <div className="text-[11px] text-purple-200 font-semibold leading-relaxed">
          <strong className="text-white">Why this recommendation?</strong> {aiRecommendation.reason}
        </div>
      </div>
    </div>
  )
}
