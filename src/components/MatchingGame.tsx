import { useState, useEffect, useRef } from 'react'
import { DynamicCardIllustration } from './MatchingGameIllustrations'
import { MATCHING_ITEMS } from '../data/matchingData'
import { useApp } from '../contexts/AppContext'

interface MatchingGameProps {
  onScoreUpdate?: (stars: number) => void
}

export interface CardItem {
  id: number
  itemKey: string
  name: string
  emoji: string
  isFlipped: boolean
  isMatched: boolean
}

export function MatchingGame({ onScoreUpdate }: MatchingGameProps) {
  const { addStars, updateProgress } = useApp()
  const [level, setLevel] = useState<'Easy' | 'Medium' | 'Hard'>('Easy')
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [cards, setCards] = useState<CardItem[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedPairsCount, setMatchedPairsCount] = useState(0)
  const [hintsLeft, setHintsLeft] = useState(2)
  const [isProcessing, setIsProcessing] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(90)
  const [isTimerRunning, setIsTimerRunning] = useState(true)
  const [isGameCompleted, setIsGameCompleted] = useState(false)
  const [isHinting, setIsHinting] = useState(false)

  // Web Audio Context synth for sound effects
  const audioCtxRef = useRef<AudioContext | null>(null)

  const playSound = (type: 'flip' | 'match' | 'mismatch' | 'victory' | 'hint') => {
    if (!soundEnabled) return
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        audioCtxRef.current = new AudioContextClass()
      }
      const ctx = audioCtxRef.current
      if (ctx.state === 'suspended') {
        ctx.resume()
      }

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)

      const now = ctx.currentTime

      if (type === 'flip') {
        osc.type = 'sine'
        osc.frequency.setValueAtTime(320, now)
        osc.frequency.exponentialRampToValueAtTime(540, now + 0.08)
        gain.gain.setValueAtTime(0.12, now)
        gain.gain.linearRampToValueAtTime(0.01, now + 0.08)
        osc.start(now)
        osc.stop(now + 0.08)
      } else if (type === 'match') {
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(523.25, now)
        osc.frequency.setValueAtTime(659.25, now + 0.1)
        osc.frequency.setValueAtTime(783.99, now + 0.2)
        gain.gain.setValueAtTime(0.2, now)
        gain.gain.linearRampToValueAtTime(0.01, now + 0.35)
        osc.start(now)
        osc.stop(now + 0.35)
      } else if (type === 'mismatch') {
        osc.type = 'sawtooth'
        osc.frequency.setValueAtTime(220, now)
        osc.frequency.linearRampToValueAtTime(160, now + 0.15)
        gain.gain.setValueAtTime(0.1, now)
        gain.gain.linearRampToValueAtTime(0.01, now + 0.15)
        osc.start(now)
        osc.stop(now + 0.15)
      } else if (type === 'victory') {
        osc.type = 'sine'
        const notes = [523.25, 659.25, 783.99, 1046.5]
        notes.forEach((freq, i) => {
          const noteOsc = ctx.createOscillator()
          const noteGain = ctx.createGain()
          noteOsc.type = 'triangle'
          noteOsc.connect(noteGain)
          noteGain.connect(ctx.destination)
          noteOsc.frequency.setValueAtTime(freq, now + i * 0.12)
          noteGain.gain.setValueAtTime(0.25, now + i * 0.12)
          noteGain.gain.linearRampToValueAtTime(0.01, now + i * 0.12 + 0.25)
          noteOsc.start(now + i * 0.12)
          noteOsc.stop(now + i * 0.12 + 0.25)
        })
      } else if (type === 'hint') {
        osc.type = 'sine'
        osc.frequency.setValueAtTime(600, now)
        osc.frequency.linearRampToValueAtTime(900, now + 0.2)
        gain.gain.setValueAtTime(0.15, now)
        gain.gain.linearRampToValueAtTime(0.01, now + 0.2)
        osc.start(now)
        osc.stop(now + 0.2)
      }
    } catch {
      // Audio fallback
    }
  }

  // Determine number of pairs based on difficulty level
  const getPairCount = () => {
    if (level === 'Easy') return 4
    if (level === 'Medium') return 6
    return 8 // Hard
  }

  // Initialize and Shuffle Deck randomly
  const initializeDeck = () => {
    const pairCount = getPairCount()

    // Shuffle item bank to get random unique items for this game session
    const shuffledItems = [...MATCHING_ITEMS].sort(() => Math.random() - 0.5)
    const selectedItems = shuffledItems.slice(0, pairCount)

    // Create twin card pairs
    const rawDeck: Omit<CardItem, 'id'>[] = []
    selectedItems.forEach((item) => {
      rawDeck.push({
        itemKey: item.key,
        name: item.name,
        emoji: item.emoji,
        isFlipped: false,
        isMatched: false,
      })
      rawDeck.push({
        itemKey: item.key,
        name: item.name,
        emoji: item.emoji,
        isFlipped: false,
        isMatched: false,
      })
    })

    // Fisher-Yates Random Shuffle
    for (let i = rawDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[rawDeck[i], rawDeck[j]] = [rawDeck[j], rawDeck[i]]
    }

    // Assign unique numeric IDs
    const finalDeck: CardItem[] = rawDeck.map((card, idx) => ({
      ...card,
      id: idx,
    }))

    setCards(finalDeck)
    setFlippedCards([])
    setMatchedPairsCount(0)
    setHintsLeft(2)
    setIsProcessing(false)
    setTimeRemaining(level === 'Easy' ? 60 : level === 'Medium' ? 90 : 120)
    setIsTimerRunning(true)
    setIsGameCompleted(false)
  }

  useEffect(() => {
    initializeDeck()
  }, [level])

  // Timer Countdown Effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning && timeRemaining > 0 && !isGameCompleted) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1)
      }, 1000)
    } else if (timeRemaining === 0 && !isGameCompleted) {
      setIsTimerRunning(false)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, timeRemaining, isGameCompleted])

  // Handle Card Tap / Click
  const handleCardClick = (card: CardItem) => {
    if (
      card.isFlipped ||
      card.isMatched ||
      isProcessing ||
      isHinting ||
      flippedCards.length >= 2
    ) {
      return
    }

    playSound('flip')

    const newFlipped = [...flippedCards, card.id]
    setFlippedCards(newFlipped)

    setCards((prev) =>
      prev.map((c) => (c.id === card.id ? { ...c, isFlipped: true } : c))
    )

    if (newFlipped.length === 2) {
      setIsProcessing(true)
      const firstCard = cards.find((c) => c.id === newFlipped[0])!
      const secondCard = card

      if (firstCard.itemKey === secondCard.itemKey) {
        // MATCH!
        setTimeout(() => {
          playSound('match')
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstCard.id || c.id === secondCard.id
                ? { ...c, isMatched: true, isFlipped: true }
                : c
            )
          )
          setFlippedCards([])
          setIsProcessing(false)

          const newMatchCount = matchedPairsCount + 1
          setMatchedPairsCount(newMatchCount)

          // Award stars locally and globally
          addStars(15)
          if (onScoreUpdate) onScoreUpdate(15)

          // Check Win Condition
          const totalPairsNeeded = getPairCount()
          if (newMatchCount === totalPairsNeeded) {
            setIsGameCompleted(true)
            setIsTimerRunning(false)
            playSound('victory')

            // Update child progress automatically
            updateProgress(85)
          }
        }, 350)
      } else {
        // MISMATCH
        setTimeout(() => {
          playSound('mismatch')
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstCard.id || c.id === secondCard.id
                ? { ...c, isFlipped: false }
                : c
            )
          )
          setFlippedCards([])
          setIsProcessing(false)
        }, 850)
      }
    }
  }

  // Handle Hint Action
  const handleHint = () => {
    if (hintsLeft <= 0 || isProcessing || isHinting || isGameCompleted) return

    const unmatchedCards = cards.filter((c) => !c.isMatched)
    if (unmatchedCards.length < 2) return

    const keyMap = new Map<string, CardItem[]>()
    unmatchedCards.forEach((c) => {
      const list = keyMap.get(c.itemKey) || []
      list.push(c)
      keyMap.set(c.itemKey, list)
    })

    let hintPair: CardItem[] | null = null
    for (const [, list] of keyMap.entries()) {
      if (list.length >= 2) {
        hintPair = list.slice(0, 2)
        break
      }
    }

    if (!hintPair) return

    playSound('hint')
    setHintsLeft((prev) => prev - 1)
    setIsHinting(true)

    const pairIds = [hintPair[0].id, hintPair[1].id]
    setCards((prev) =>
      prev.map((c) => (pairIds.includes(c.id) ? { ...c, isFlipped: true } : c))
    )

    setTimeout(() => {
      setCards((prev) =>
        prev.map((c) =>
          pairIds.includes(c.id) && !c.isMatched ? { ...c, isFlipped: false } : c
        )
      )
      setIsHinting(false)
    }, 1400)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const totalPairs = getPairCount()
  const gridCols = totalPairs <= 4 ? 'grid-cols-4' : totalPairs <= 6 ? 'grid-cols-4' : 'grid-cols-4 sm:grid-cols-4'

  return (
    <div className="flex-1 flex flex-col gap-4 select-none min-h-0">
      {/* ── Top Header Section ───────────────────────────────────────────── */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-500/25 shrink-0">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path
                d="M19.439 7.85c-.049-.322.059-.648.289-.878l1.568-1.568c.47-.47.47-1.23 0-1.7l-1.99-1.99c-.47-.47-1.23-.47-1.7 0l-1.568 1.568c-.23.23-.556.338-.878.289C13.882 3.38 12.5 2 12.5 2S11.118 3.38 9.848 3.571c-.322.049-.648-.059-.878-.289L7.402 1.714c-.47-.47-1.23-.47-1.7 0l-1.99 1.99c-.47.47-.47 1.23 0 1.7l1.568 1.568c.23.23.338.556.289.878C5.38 9.118 4 10.5 4 10.5s1.38 1.382 1.571 2.652c.049.322-.059.648-.289.878L3.714 15.598c-.47.47-.47 1.23 0 1.7l1.99 1.99c.47.47 1.23.47 1.7 0l1.568-1.568c.23-.23.556-.338.878-.289C11.118 19.38 12.5 20.76 12.5 20.76s1.382-1.38 2.652-1.571c.322-.049.648.059.878.289l1.568 1.568c.47.47 1.23.47 1.7 0l1.99-1.99c.47-.47.47-1.23 0-1.7l-1.568-1.568c-.23-.23-.338-.556-.289-.878C19.38 13.882 20.76 12.5 20.76 12.5s-1.38-1.382-1.571-2.652z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-black text-purple-950 tracking-tight leading-none">
              Matching Games
            </h1>
            <p className="text-gray-500 text-xs font-semibold mt-1">
              Match the unique pairs and boost memory!
            </p>
          </div>
        </div>

        {/* Level Selector & Sound Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative">
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as 'Easy' | 'Medium' | 'Hard')}
              className="appearance-none bg-purple-50 hover:bg-purple-100/80 border border-purple-200 text-purple-900 font-extrabold text-xs px-3.5 py-2.5 pr-8 rounded-2xl cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="Easy">Easy (4 Pairs)</option>
              <option value="Medium">Medium (6 Pairs)</option>
              <option value="Hard">Hard (8 Pairs)</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-purple-700 text-xs font-black">
              ⌄
            </div>
          </div>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all cursor-pointer border ${
              soundEnabled
                ? 'bg-purple-100 border-purple-200 text-purple-700 hover:bg-purple-200'
                : 'bg-gray-100 border-gray-200 text-gray-400 hover:bg-gray-200'
            }`}
            title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>
        </div>
      </div>

      {/* ── Main Game Card Workspace ─────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-purple-100 shadow-xs flex flex-col justify-between flex-1 min-h-0 relative">
        {/* Top Status Bar inside Card */}
        <div className="flex items-center justify-between mb-3 shrink-0">
          {/* Timer Pill */}
          <div className="flex items-center gap-2 bg-purple-50/80 border border-purple-100 px-3.5 py-1.5 rounded-2xl text-purple-900 font-black text-xs sm:text-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" strokeLinecap="round" />
            </svg>
            <span>{formatTime(timeRemaining)}</span>
          </div>

          {/* Center Status */}
          <div className="flex items-center gap-2 bg-purple-100/60 px-3 py-1.5 rounded-2xl">
            <span className="text-xs font-extrabold text-purple-950">
              Matched: {matchedPairsCount} / {totalPairs}
            </span>
          </div>

          {/* Star Counter Pill */}
          <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-2xl text-amber-900 font-black text-xs sm:text-sm">
            <span>⭐</span>
            <span>+{matchedPairsCount * 15}</span>
          </div>
        </div>

        {/* ── Cards Grid ───────────────────────────────────────── */}
        <div className={`flex-1 grid ${gridCols} gap-3 sm:gap-3.5 p-1 items-center justify-center min-h-0 overflow-y-auto`}>
          {cards.map((card) => {
            const isFlipped = card.isFlipped || card.isMatched

            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(card)}
                className={`relative w-full aspect-square max-h-[130px] rounded-2xl cursor-pointer perspective-1000 select-none transition-all duration-300 ${
                  card.isMatched
                    ? 'scale-[0.97]'
                    : 'hover:scale-[1.03] active:scale-[0.96]'
                }`}
              >
                <div
                  className={`w-full h-full rounded-2xl transform-style-3d transition-transform duration-500 ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* CARD BACK (Unflipped State) */}
                  <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 border border-purple-400 flex flex-col items-center justify-center shadow-xs backface-hidden hover:from-purple-600 hover:to-indigo-700 transition-colors">
                    <span className="text-white font-black text-2xl sm:text-3xl select-none opacity-85">?</span>
                    <span className="text-[9px] font-bold text-purple-200 uppercase tracking-widest mt-0.5">TheraBoost</span>
                  </div>

                  {/* CARD FRONT (Revealed / Matched State) */}
                  <div
                    className={`absolute inset-0 w-full h-full rounded-2xl rotate-y-180 backface-hidden flex flex-col items-center justify-between p-2 transition-all ${
                      card.isMatched
                        ? 'bg-emerald-50/80 border-2 border-emerald-500 shadow-md shadow-emerald-500/10'
                        : 'bg-white border-2 border-purple-300 shadow-sm hover:border-purple-500'
                    }`}
                  >
                    {/* Unique SVG Illustration */}
                    <div className="w-full flex-1 flex items-center justify-center min-h-0 pt-0.5">
                      <DynamicCardIllustration keyName={card.itemKey} />
                    </div>

                    {/* Item Name Label & Emoji */}
                    <div className="w-full bg-purple-50/90 rounded-xl py-0.5 px-1 flex items-center justify-center gap-1 border border-purple-100 shrink-0">
                      <span className="text-[11px] sm:text-xs font-black text-purple-950 truncate max-w-[80px]">
                        {card.name}
                      </span>
                      <span className="text-xs">{card.emoji}</span>
                    </div>

                    {/* Matched Green Checkmark Badge */}
                    {card.isMatched && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-black shadow-xs">
                        ✓
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Bottom Action Control Buttons ───────────────────────────────── */}
        <div className="flex items-center justify-between pt-3 mt-2 border-t border-purple-100 shrink-0 gap-2">
          {/* Hint Button */}
          <button
            onClick={handleHint}
            disabled={hintsLeft <= 0 || isProcessing || isHinting}
            className={`flex items-center gap-1.5 border px-4 py-2 rounded-2xl font-black text-xs transition-all cursor-pointer relative ${
              hintsLeft > 0 && !isProcessing
                ? 'bg-white hover:bg-purple-50 border-purple-200 text-purple-900 shadow-2xs hover:scale-105 active:scale-95'
                : 'bg-gray-100 border-gray-200 text-gray-400 opacity-60 cursor-not-allowed'
            }`}
          >
            <span className="text-sm">💡</span>
            <span>Hint</span>
            {hintsLeft > 0 && (
              <span className="w-4 h-4 rounded-full bg-purple-600 text-white text-[10px] font-black flex items-center justify-center ml-0.5">
                {hintsLeft}
              </span>
            )}
          </button>

          {/* Reshuffle / Reset Game Button */}
          <button
            onClick={initializeDeck}
            className="flex items-center gap-1.5 bg-white hover:bg-purple-50 border border-purple-200 text-purple-900 px-4 py-2 rounded-2xl font-black text-xs shadow-2xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0118.8-4.3M22 12.5a10 10 0 01-18.8 4.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Reshuffle Deck</span>
          </button>

          {/* New Game Button */}
          <button
            onClick={initializeDeck}
            className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-5 py-2 rounded-2xl font-extrabold text-xs shadow-md shadow-purple-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span className="text-xs">▶</span>
            <span>New Game</span>
          </button>
        </div>

        {/* ── Level Complete Modal Popup ─────────────────────────────────── */}
        {isGameCompleted && (
          <div className="absolute inset-0 bg-purple-950/60 backdrop-blur-xs rounded-3xl flex items-center justify-center p-4 z-40 animate-fadeIn">
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center border border-purple-100 shadow-2xl animate-scaleUp relative overflow-hidden">
              {/* Confetti particles */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-3 pointer-events-none">
                <span className="text-xl animate-bounce" style={{ animationDelay: '0.1s' }}>🎉</span>
                <span className="text-xl animate-bounce" style={{ animationDelay: '0.2s' }}>✨</span>
                <span className="text-xl animate-bounce" style={{ animationDelay: '0.3s' }}>🌟</span>
              </div>

              <div className="w-16 h-16 rounded-full bg-amber-100 border-4 border-amber-300 flex items-center justify-center text-3xl mx-auto mb-2 mt-2 animate-bounce">
                🏆
              </div>
              <h3 className="text-xl font-black text-purple-950 mb-1">Awesome Job! 🎉</h3>
              <p className="text-gray-500 text-xs font-semibold mb-4">
                You matched all <span className="font-black text-purple-700">{totalPairs} pairs</span> with 100% accuracy!
              </p>

              <div className="bg-purple-50/90 rounded-2xl p-3 mb-5 flex justify-around border border-purple-100">
                <div>
                  <span className="text-[10px] text-gray-500 font-bold block">Stars Earned</span>
                  <span className="text-lg font-black text-amber-600">+{matchedPairsCount * 15} ⭐</span>
                </div>
                <div className="w-px bg-purple-200" />
                <div>
                  <span className="text-[10px] text-gray-500 font-bold block">Pairs Matched</span>
                  <span className="text-lg font-black text-emerald-600">{matchedPairsCount}/{totalPairs}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={initializeDeck}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-extrabold text-xs py-3 rounded-2xl shadow-md transition-all hover:scale-105 cursor-pointer"
                >
                  Play Again 🔄
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
