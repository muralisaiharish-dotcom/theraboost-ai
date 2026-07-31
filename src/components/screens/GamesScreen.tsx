import { useState, useEffect, useRef } from 'react'
import { DynamicCardIllustration } from '../MatchingGameIllustrations'
import { useApp } from '../../contexts/AppContext'

interface CardItem { id: number; itemKey: string; isFlipped: boolean; isMatched: boolean }

const ALL_ITEM_KEYS = ['dog', 'apple', 'soccer', 'cat', 'beachball', 'lion', 'elephant', 'banana', 'carrot', 'car']

const LEVEL_CONFIG = {
  Easy: { pairs: 4, time: 60 },
  Medium: { pairs: 6, time: 90 },
  Hard: { pairs: 10, time: 120 },
}

export function GamesScreen() {
  const { addStars } = useApp()
  const [level, setLevel] = useState<'Easy' | 'Medium' | 'Hard'>('Easy')
  const [cards, setCards] = useState<CardItem[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedCount, setMatchedCount] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(60)
  const [isTimerRunning, setIsTimerRunning] = useState(true)
  const [isGameCompleted, setIsGameCompleted] = useState(false)
  const [stars, setStars] = useState(0)
  const audioCtxRef = useRef<AudioContext | null>(null)

  const { pairs, time } = LEVEL_CONFIG[level]

  const playTone = (freq: number, dur: number) => {
    try {
      if (!audioCtxRef.current) {
        const AC = window.AudioContext || (window as any).webkitAudioContext
        audioCtxRef.current = new AC()
      }
      const ctx = audioCtxRef.current
      const osc = ctx.createOscillator(); const gain = ctx.createGain()
      osc.connect(gain); gain.connect(ctx.destination)
      osc.frequency.value = freq; osc.type = 'sine'
      gain.gain.setValueAtTime(0.1, ctx.currentTime)
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + dur)
      osc.start(ctx.currentTime); osc.stop(ctx.currentTime + dur)
    } catch { /* ignore */ }
  }

  const buildDeck = (lvl: typeof level) => {
    const { pairs: p } = LEVEL_CONFIG[lvl]
    const keys = ALL_ITEM_KEYS.slice(0, p)
    const doubled = [...keys, ...keys].map((key, idx) => ({ id: idx, itemKey: key, isFlipped: false, isMatched: false }))
    return doubled.sort(() => Math.random() - 0.5)
  }

  const initGame = (lvl: typeof level) => {
    setCards(buildDeck(lvl))
    setFlippedCards([]); setMatchedCount(0); setIsGameCompleted(false); setStars(0)
    setTimeRemaining(LEVEL_CONFIG[lvl].time); setIsTimerRunning(true)
  }

  useEffect(() => { initGame(level) }, [level])

  useEffect(() => {
    if (!isTimerRunning || isGameCompleted) return
    const t = setInterval(() => {
      setTimeRemaining((p) => {
        if (p <= 1) { clearInterval(t); setIsTimerRunning(false); return 0 }
        return p - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [isTimerRunning, isGameCompleted])

  const handleCardTap = (cardId: number) => {
    if (isProcessing || isGameCompleted) return
    const card = cards.find((c) => c.id === cardId)
    if (!card || card.isFlipped || card.isMatched) return
    playTone(440, 0.08)

    const newFlipped = [...flippedCards, cardId]
    setCards((p) => p.map((c) => c.id === cardId ? { ...c, isFlipped: true } : c))
    setFlippedCards(newFlipped)

    if (newFlipped.length === 2) {
      setIsProcessing(true)
      const [a, b] = newFlipped.map((id) => cards.find((c) => c.id === id)!)
      if (a.itemKey === b.itemKey) {
        playTone(660, 0.15)
        setTimeout(() => {
          setCards((p) => p.map((c) => newFlipped.includes(c.id) ? { ...c, isMatched: true } : c))
          setFlippedCards([])
          setMatchedCount((p) => {
            const next = p + 1
            if (next === pairs) {
              setIsGameCompleted(true); setIsTimerRunning(false)
              const earnedStars = timeRemaining > time * 0.7 ? 3 : timeRemaining > time * 0.4 ? 2 : 1
              setStars(earnedStars); addStars(earnedStars * 10)
            }
            return next
          })
          setIsProcessing(false)
        }, 500)
      } else {
        playTone(220, 0.12)
        setTimeout(() => {
          setCards((p) => p.map((c) => newFlipped.includes(c.id) ? { ...c, isFlipped: false } : c))
          setFlippedCards([]); setIsProcessing(false)
        }, 900)
      }
    }
  }

  const cols = level === 'Easy' ? 4 : level === 'Medium' ? 4 : 5

  return (
    <div className="flex flex-col gap-4 px-4 py-4 pb-6 animate-slideUp">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500 flex items-center justify-center text-xl shadow-md">🧩</div>
          <div>
            <h1 className="text-lg font-black text-gray-900">Matching Game</h1>
            <p className="text-[10px] text-gray-500 font-semibold">Find all matching pairs!</p>
          </div>
        </div>
        {/* Level */}
        <div className="flex gap-1">
          {(['Easy', 'Medium', 'Hard'] as const).map((lvl) => (
            <button key={lvl} onClick={() => setLevel(lvl)}
              className={`px-2.5 py-1 rounded-xl text-[10px] font-extrabold transition-all cursor-pointer ${level === lvl ? 'bg-emerald-500 text-white shadow-sm' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'}`}>
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2 bg-white rounded-2xl px-3 py-2 border border-gray-100 shadow-xs">
          <span className="text-sm">⏱️</span>
          <span className={`text-sm font-black ${timeRemaining < 15 ? 'text-red-600 animate-pulse' : 'text-gray-900'}`}>
            {Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, '0')}
          </span>
        </div>
        <div className="flex items-center gap-2 bg-white rounded-2xl px-3 py-2 border border-gray-100 shadow-xs">
          <span className="text-sm">🎯</span>
          <span className="text-sm font-black text-gray-900">{matchedCount}/{pairs}</span>
        </div>
        <button onClick={() => initGame(level)}
          className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-all">
          🔄
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500"
          style={{ width: `${(matchedCount / pairs) * 100}%`, background: 'linear-gradient(90deg, #10B981, #059669)' }} />
      </div>

      {/* Game Grid */}
      <div className={`grid gap-2`} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardTap(card.id)}
            disabled={card.isMatched || isProcessing}
            className={`aspect-square rounded-2xl flex items-center justify-center transition-all cursor-pointer overflow-hidden border-2 ${
              card.isMatched ? 'border-emerald-300 bg-emerald-50 scale-95 opacity-70' :
              card.isFlipped ? 'border-purple-400 bg-white shadow-md' :
              'border-purple-100 bg-gradient-to-br from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 active:scale-95'
            }`}
            style={{ minHeight: '52px' }}
          >
            {(card.isFlipped || card.isMatched) ? (
              <div className="w-full h-full flex items-center justify-center p-1.5">
                <DynamicCardIllustration itemKey={card.itemKey} />
              </div>
            ) : (
              <span className="text-white text-lg font-black opacity-60">?</span>
            )}
          </button>
        ))}
      </div>

      {/* Victory Overlay */}
      {isGameCompleted && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm"
          onClick={(e) => e.stopPropagation()}>
          <div className="bg-white rounded-[32px] p-8 mx-6 flex flex-col items-center gap-4 shadow-2xl animate-bounceIn">
            <div className="text-6xl">🎉</div>
            <h2 className="text-2xl font-black text-gray-900">Level Complete!</h2>
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <span key={i} className={`text-3xl transition-all ${i <= stars ? 'animate-starPop' : 'opacity-20'}`}
                  style={{ animationDelay: `${(i - 1) * 0.15}s` }}>⭐</span>
              ))}
            </div>
            <p className="text-sm font-semibold text-gray-500 text-center">
              {stars === 3 ? 'Perfect! You matched all pairs in record time! 🏆' :
               stars === 2 ? 'Great job! You completed all matches! 🌟' : 'You did it! All pairs matched! 💪'}
            </p>
            <div className="flex gap-3 w-full">
              <button onClick={() => initGame(level)}
                className="flex-1 py-3 rounded-2xl font-extrabold text-sm text-white shadow-md cursor-pointer transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}>
                🔄 Play Again
              </button>
              {level !== 'Hard' && (
                <button onClick={() => setLevel(level === 'Easy' ? 'Medium' : 'Hard')}
                  className="flex-1 py-3 rounded-2xl font-extrabold text-sm text-white shadow-md cursor-pointer transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                  Next Level →
                </button>
              )}
            </div>
          </div>
          {/* Confetti particles */}
          {[...Array(16)].map((_, i) => (
            <div key={i} className="fixed pointer-events-none"
              style={{
                left: `${Math.random() * 100}%`, top: '-20px',
                width: '8px', height: '8px', borderRadius: '2px',
                background: ['#7C3AED', '#EC4899', '#F59E0B', '#10B981'][i % 4],
                animation: `confettiFall ${1.5 + Math.random()}s ease-in ${Math.random() * 0.5}s forwards`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }} />
          ))}
        </div>
      )}

      {/* Time Up */}
      {!isTimerRunning && !isGameCompleted && timeRemaining === 0 && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-[32px] p-8 mx-6 flex flex-col items-center gap-4 shadow-2xl animate-bounceIn">
            <div className="text-6xl">⏰</div>
            <h2 className="text-2xl font-black text-gray-900">Time's Up!</h2>
            <p className="text-sm font-semibold text-gray-500">{matchedCount}/{pairs} pairs matched. Try again!</p>
            <button onClick={() => initGame(level)}
              className="w-full py-3 rounded-2xl font-extrabold text-sm text-white shadow-md cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
              🔄 Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
