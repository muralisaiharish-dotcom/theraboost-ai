import { useState, useEffect } from 'react'
import { FLASHCARD_DATA, CATEGORIES } from '../../data/flashcards'
import { DynamicIllustration } from '../Illustrations'
import { useApp } from '../../contexts/AppContext'

export function FlashCardsScreen() {
  const { cardLearned } = useApp()
  const [activeCategory, setActiveCategory] = useState('Animals')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  const cards = FLASHCARD_DATA[activeCategory] || FLASHCARD_DATA.Animals
  const card = cards[currentIndex] || cards[0]

  useEffect(() => { setCurrentIndex(0); setIsFlipped(false) }, [activeCategory])

  const speakWord = () => {
    if (!card) return
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(card.word)
      u.rate = 0.85; u.pitch = 1.1
      u.onstart = () => setIsSpeaking(true)
      u.onend = () => setIsSpeaking(false)
      u.onerror = () => setIsSpeaking(false)
      window.speechSynthesis.speak(u)
    } else { setIsSpeaking(true); setTimeout(() => setIsSpeaking(false), 1200) }
  }

  const handleNext = () => { setIsFlipped(false); setCurrentIndex((p) => (p + 1) % cards.length) }
  const handlePrev = () => { setIsFlipped(false); setCurrentIndex((p) => (p - 1 + cards.length) % cards.length) }

  const handleLearned = () => {
    cardLearned()
    setShowCelebration(true)
    setTimeout(() => { setShowCelebration(false); handleNext() }, 1200)
  }

  return (
    <div className="flex flex-col gap-4 px-4 py-4 pb-6 animate-slideUp">
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-2xl bg-pink-500 flex items-center justify-center text-xl shadow-md">🃏</div>
        <div>
          <h1 className="text-lg font-black text-gray-900">Flash Cards</h1>
          <p className="text-[10px] text-gray-500 font-semibold">Tap to flip and learn new words!</p>
        </div>
      </div>

      {/* Category Chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer shrink-0 ${activeCategory === cat.id ? 'text-white shadow-sm' : 'bg-white text-gray-700 border border-gray-200'}`}
            style={activeCategory === cat.id ? { background: cat.color } : {}}>
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3 bg-white rounded-2xl p-3 border border-gray-100 shadow-xs">
        <div className="text-xs font-black text-gray-700">{currentIndex + 1}/{cards.length}</div>
        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / cards.length) * 100}%`, background: card.borderColor }} />
        </div>
        <span className="text-xs font-bold text-gray-500">{activeCategory}</span>
      </div>

      {/* 3D Flip Card */}
      <div className="perspective-1000 h-72 cursor-pointer" onClick={() => { setIsFlipped(!isFlipped); if (!isFlipped) speakWord() }}>
        <div className={`relative w-full h-full transform-style-3d transition-all duration-500 ${isFlipped ? 'rotate-y-180' : ''}`}>
          {/* Front */}
          <div className="absolute inset-0 backface-hidden rounded-[28px] border-2 shadow-lg flex flex-col items-center justify-center p-6 gap-3"
            style={{ background: card.bgColor, borderColor: card.borderColor + '60' }}>
            <div className="text-5xl">{card.emoji}</div>
            <div className="flex items-center justify-center p-3 rounded-2xl bg-white/60">
              <div className="scale-75"><DynamicIllustration keyName={card.illustrationKey} /></div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black" style={{ color: card.borderColor }}>{card.word}</div>
              <div className="text-gray-500 text-xs font-semibold mt-1">{card.phonetic}</div>
            </div>
            <button onClick={(e) => { e.stopPropagation(); speakWord() }}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${isSpeaking ? 'scale-110 bg-white shadow-lg animate-pulse' : 'bg-white/80 shadow-sm hover:shadow-md'}`}
              style={{ color: card.borderColor }}>
              🔊
            </button>
            <span className="text-[10px] font-bold text-gray-400 mt-1">Tap to flip & see meaning</span>
          </div>

          {/* Back */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-[28px] border-2 shadow-lg flex flex-col justify-between p-6"
            style={{ background: card.bgColor, borderColor: card.borderColor + '60' }}>
            <div>
              <div className="text-base font-black mb-1" style={{ color: card.borderColor }}>📖 Definition</div>
              <p className="text-gray-800 text-sm font-semibold leading-relaxed">{card.definition}</p>
            </div>
            <div>
              <div className="text-xs font-black text-gray-500 mb-1">Example Sentence:</div>
              <p className="text-gray-700 text-xs font-semibold italic leading-relaxed bg-white/60 rounded-xl p-3">
                "{card.sentence}"
              </p>
            </div>
            <div className="text-center text-[10px] font-bold text-gray-400">Tap to flip back</div>
          </div>
        </div>
      </div>

      {/* Celebration overlay */}
      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="bg-emerald-500 text-white px-8 py-4 rounded-3xl text-lg font-black shadow-2xl animate-bounceIn flex items-center gap-3">
            <span className="animate-starPop text-2xl">⭐</span>
            Word Learned! +15 stars
            <span className="animate-starPop text-2xl" style={{ animationDelay: '0.1s' }}>⭐</span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button onClick={handlePrev}
          className="flex-1 py-3 rounded-2xl bg-gray-50 text-gray-700 font-extrabold text-xs border border-gray-200 hover:bg-gray-100 transition-all cursor-pointer">
          ‹ Previous
        </button>
        <button onClick={handleLearned}
          className="flex-1 py-3 rounded-2xl font-extrabold text-xs text-white shadow-md transition-all cursor-pointer hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}>
          ✓ Learned! +15⭐
        </button>
        <button onClick={handleNext}
          className="flex-1 py-3 rounded-2xl font-extrabold text-xs text-white shadow-md transition-all cursor-pointer hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
          Next ›
        </button>
      </div>

      {/* Category stats */}
      <div className="grid grid-cols-3 gap-2">
        {CATEGORIES.slice(0, 3).map((cat) => (
          <div key={cat.id} className="bg-white rounded-2xl p-3 border border-gray-100 shadow-xs text-center">
            <span className="text-xl">{cat.icon}</span>
            <div className="text-xs font-black text-gray-900 mt-1">{cat.name}</div>
            <div className="h-1.5 bg-gray-100 rounded-full mt-1.5 overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${cat.progress}%`, background: cat.color }} />
            </div>
            <div className="text-[9px] font-bold mt-0.5" style={{ color: cat.color }}>{cat.progress}%</div>
          </div>
        ))}
      </div>
    </div>
  )
}
