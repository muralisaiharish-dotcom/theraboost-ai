import { useState } from 'react'

interface Tip {
  id: number
  category: string
  categoryColor: string
  text: string
  detail: string
  emoji: string
}

const ALL_TIPS: Tip[] = [
  {
    id: 1,
    category: 'Speech',
    categoryColor: '#7C3AED',
    emoji: '🎙️',
    text: 'Practice a little every day and celebrate every small win!',
    detail:
      'Even 10 minutes of daily practice builds strong speech habits. Consistency beats long irregular sessions. Celebrate each new word you learn!',
  },
  {
    id: 2,
    category: 'Memory',
    categoryColor: '#2563EB',
    emoji: '🧩',
    text: 'Matching games sharpen your memory and word recall speed.',
    detail:
      'Playing the matching game daily helps build visual-spatial memory. Try to beat your previous time and see how fast you can match all pairs!',
  },
  {
    id: 3,
    category: 'Vocabulary',
    categoryColor: '#EC4899',
    emoji: '📚',
    text: 'Learning 3 new words each day builds a powerful vocabulary over time.',
    detail:
      'Use the Flash Cards to learn 3 new words every day. Review them by flipping the card and repeating the definition out loud for best results.',
  },
  {
    id: 4,
    category: 'Motivation',
    categoryColor: '#D97706',
    emoji: '🌟',
    text: 'Every star you earn is proof of how hard you are working!',
    detail:
      "Earning stars isn't just about points — they show your growth. Keep completing activities and watch your star count soar to new heights!",
  },
  {
    id: 5,
    category: 'AI Insight',
    categoryColor: '#059669',
    emoji: '🤖',
    text: 'AI Tip: Repeat difficult words aloud 3 times to lock them in memory.',
    detail:
      'The spaced repetition method works best: say a word, wait a few seconds, say it again. Your brain creates stronger memory pathways each time.',
  },
  {
    id: 6,
    category: 'Fluency',
    categoryColor: '#7C3AED',
    emoji: '💬',
    text: 'Try using new words in a full sentence to improve fluency.',
    detail:
      "Instead of just saying 'elephant', try: 'The big elephant has a long trunk.' Full sentences build fluency faster than single-word practice.",
  },
]

interface TipForYouModalProps {
  onClose: () => void
  userProgress: number
}

export function TipForYouModal({ onClose, userProgress }: TipForYouModalProps) {
  // Start index varies by progress so tips rotate based on learning state
  const startIdx = Math.floor(userProgress / 20) % ALL_TIPS.length
  const [currentIdx, setCurrentIdx] = useState(startIdx)

  const tip = ALL_TIPS[currentIdx]

  const handleNext = () => setCurrentIdx((i) => (i + 1) % ALL_TIPS.length)
  const handlePrev = () => setCurrentIdx((i) => (i - 1 + ALL_TIPS.length) % ALL_TIPS.length)

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div
        className="bg-white rounded-3xl shadow-2xl border border-purple-100 w-full max-w-sm overflow-hidden"
        style={{ animation: 'scaleUp 0.25s ease-out both' }}
      >
        {/* Header */}
        <div
          className="px-5 py-5 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #EDE9FF 0%, #FAF5FF 50%, #FCE7F3 100%)',
            borderBottom: '1px solid #DDD6FE',
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-purple-600 flex items-center justify-center text-xl shadow-sm">
                💡
              </div>
              <div>
                <h3 className="font-black text-gray-900 text-sm">Tip for You</h3>
                <p className="text-[10px] font-semibold text-purple-600">AI-Powered Learning Tips</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-purple-100 hover:bg-purple-200 flex items-center justify-center text-purple-700 text-xs font-black cursor-pointer transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tip Card Body */}
        <div className="px-5 py-5">
          {/* Category Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span
              className="text-[10px] font-black px-2.5 py-1 rounded-full text-white"
              style={{ background: tip.categoryColor }}
            >
              {tip.emoji} {tip.category}
            </span>
            <span className="text-[10px] font-semibold text-gray-400">
              Tip {currentIdx + 1} of {ALL_TIPS.length}
            </span>
          </div>

          {/* Main tip quote */}
          <div
            className="rounded-2xl p-4 mb-4 border"
            style={{ background: tip.categoryColor + '10', borderColor: tip.categoryColor + '30' }}
          >
            <p className="text-sm font-black text-gray-900 leading-snug">
              "{tip.text}"
            </p>
          </div>

          {/* Detail explanation */}
          <p className="text-xs text-gray-600 font-semibold leading-relaxed mb-4">
            {tip.detail}
          </p>

          {/* Progress dots */}
          <div className="flex items-center justify-center gap-1.5 mb-5">
            {ALL_TIPS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIdx(i)}
                className="rounded-full transition-all cursor-pointer"
                style={{
                  width: i === currentIdx ? '20px' : '8px',
                  height: '8px',
                  background: i === currentIdx ? tip.categoryColor : '#DDD6FE',
                }}
              />
            ))}
          </div>

          {/* Prev / Next Navigation */}
          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              className="flex-1 py-2.5 rounded-2xl font-extrabold text-xs text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 cursor-pointer transition-all"
            >
              ‹ Previous
            </button>
            <button
              onClick={handleNext}
              className="flex-1 py-2.5 rounded-2xl font-extrabold text-xs text-white shadow-md cursor-pointer transition-all hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${tip.categoryColor}, ${tip.categoryColor}CC)` }}
            >
              Next Tip ›
            </button>
          </div>
        </div>

        {/* Footer motivational badge */}
        <div className="px-5 pb-4">
          <div
            className="flex items-center gap-2 rounded-2xl px-4 py-2.5"
            style={{ background: 'linear-gradient(90deg, #F5F3FF, #FDF2F8)', border: '1px solid #DDD6FE' }}
          >
            <span className="text-base">👧</span>
            <p className="text-[10px] font-semibold text-purple-800">
              Based on your progress ({userProgress}%), these tips are personalized for you!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
