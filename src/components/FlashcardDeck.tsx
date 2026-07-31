import React, { useState, useEffect } from 'react'
import { Flashcard } from '../types'
import { DynamicIllustration } from './Illustrations'
import { TheraMascot } from './Mascot'
import { useApp } from '../contexts/AppContext'
import { FLASHCARD_DATA } from '../data/flashcards'

interface FlashcardDeckProps {
  cards: Flashcard[]
  categoryName: string
  categories: Array<{ id: string; name: string }>
  onSelectCategory: (category: string) => void
  onShuffle: () => void
  onCardLearned: () => void
  onOpenSpeechModal: (card: Flashcard) => void
}

export function FlashcardDeck({
  cards,
  categoryName,
  categories,
  onSelectCategory,
  onShuffle,
  onOpenSpeechModal,
}: FlashcardDeckProps) {
  const { markCardLearned, isCardLearned, isCategoryCompleted, resetFlashcardProgress } = useApp()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [celebrationText, setCelebrationText] = useState<string | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [showResetModal, setShowResetModal] = useState(false)

  const currentCard = cards[currentIndex] || cards[0]
  const isLearned = currentCard ? isCardLearned(currentCard.id) : false

  // Reset index when cards change
  useEffect(() => {
    setCurrentIndex(0)
    setIsFlipped(false)
  }, [categoryName])

  // Speech Synthesis Audio function
  const speakWord = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    if (!currentCard) return

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(currentCard.word)
      utterance.rate = 0.85
      utterance.pitch = 1.1

      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)

      window.speechSynthesis.speak(utterance)
    } else {
      setIsSpeaking(true)
      setTimeout(() => setIsSpeaking(false), 1200)
    }
  }

  const handleNext = () => {
    setIsFlipped(false)
    setCurrentIndex((prev) => (prev + 1) % cards.length)
  }

  const handlePrev = () => {
    setIsFlipped(false)
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length)
  }

  const handleKnowThis = () => {
    if (!currentCard || isLearned) return

    const categoryCards = FLASHCARD_DATA[categoryName] || cards
    const allCategoryCardIds = categoryCards.map((c) => c.id)
    const wasCategoryCompleteBefore = isCategoryCompleted(categoryName)

    const willCategoryComplete = allCategoryCardIds.every(
      (id) => id === currentCard.id || isCardLearned(id)
    )

    markCardLearned(currentCard.id, categoryName, allCategoryCardIds)

    if (willCategoryComplete && !wasCategoryCompleteBefore) {
      setCelebrationText(`Category Complete! 🎉 +50 Bonus Stars! ⭐`)
    } else {
      setCelebrationText(`Word Learned! +15 Stars ⭐`)
    }

    setTimeout(() => {
      setCelebrationText(null)
      handleNext()
    }, 1400)
  }

  const handleRepeat = () => {
    setIsFlipped(false)
    speakWord()
  }

  return (
    <div className="flex flex-col flex-1 h-full min-h-0 relative">
      {/* ── Deck Top Header Controls ──────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-4 shrink-0 px-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-100 border border-purple-200 flex items-center justify-center text-2xl shadow-sm">
            🎴
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 leading-tight">Flash Cards</h1>
            <p className="text-gray-500 text-xs font-semibold">Learn new words with fun flash cards!</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Category Dropdown Pill */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl text-sm font-extrabold text-gray-700 shadow-sm border border-gray-100 hover:border-purple-200 transition-all cursor-pointer"
            >
              <span>{categoryName}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-xl border border-purple-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onSelectCategory(cat.name)
                      setDropdownOpen(false)
                    }}
                    className={`w-full text-left px-4 py-2 text-xs font-bold transition-colors ${
                      cat.name === categoryName ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Shuffle Button */}
          <button
            onClick={onShuffle}
            className="flex items-center gap-1.5 bg-white hover:bg-purple-50 px-4 py-2 rounded-xl text-sm font-extrabold text-purple-700 shadow-sm border border-purple-100 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Shuffle</span>
          </button>

          {/* Reset Button */}
          <button
            onClick={() => setShowResetModal(true)}
            className="text-xs font-extrabold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 px-3.5 py-2 rounded-xl transition-all cursor-pointer"
          >
            🔄 Reset
          </button>

          {/* Index Counter Pill */}
          <div className="bg-purple-100 text-purple-800 px-3.5 py-1.5 rounded-full text-xs font-black tracking-wide">
            {currentIndex + 1} / {cards.length}
          </div>
        </div>
      </div>

      {/* ── Main Flashcard Stage ────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center relative min-h-0 py-2">
        {/* Celebration Particles Overlay */}
        {celebrationText && (
          <div className="absolute inset-0 pointer-events-none z-40 flex items-center justify-center">
            <div className="bg-emerald-500 text-white px-8 py-4 rounded-3xl text-lg font-black shadow-2xl animate-bounceIn flex items-center gap-3">
              <span className="animate-starPop text-2xl">⭐</span>
              <span>{celebrationText}</span>
              <span className="animate-starPop text-2xl" style={{ animationDelay: '0.1s' }}>
                ⭐
              </span>
            </div>
          </div>
        )}

        <div className="w-full max-w-xl flex items-center justify-between gap-4">
          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous card"
            className="w-13 h-13 rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 transition-all hover:scale-110 active:scale-95 flex items-center justify-center shadow-md cursor-pointer shrink-0"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* 3D Flip Card Container */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-96 h-96 sm:w-[400px] sm:h-[400px] perspective-1000 cursor-pointer group shrink-0 relative"
          >
            <div
              className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* ── CARD FRONT ─────────────────────────────────────────── */}
              <div className="absolute inset-0 w-full h-full bg-white rounded-[32px] p-6 flex flex-col items-center justify-between border-4 border-purple-200 shadow-xl shadow-purple-500/10 backface-hidden">
                {/* Completed Badge & Speaker Audio Trigger Button */}
                <div className="w-full flex items-center justify-between">
                  {isLearned ? (
                    <div className="bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-xs flex items-center gap-1">
                      <span>✓</span>
                      <span>Completed</span>
                    </div>
                  ) : (
                    <div />
                  )}
                  <button
                    onClick={speakWord}
                    aria-label="Pronounce word"
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      isSpeaking
                        ? 'bg-purple-600 text-white scale-110 animate-pulse-ring'
                        : 'bg-purple-600 text-white hover:bg-purple-700 hover:scale-105 shadow-md'
                    }`}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>

                {/* Card Artwork Illustration */}
                <div className="flex-1 flex items-center justify-center my-2">
                  <DynamicIllustration keyName={currentCard?.illustrationKey || 'elephant'} />
                </div>

                {/* Card Word Title */}
                <div className="text-center pb-2">
                  <h2 className="text-4xl font-black text-gray-900 tracking-tight">
                    {currentCard?.word}
                  </h2>
                </div>
              </div>

              {/* ── CARD BACK ──────────────────────────────────────────── */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-purple-900 to-indigo-950 text-white rounded-[32px] p-7 flex flex-col justify-between border-4 border-purple-400 shadow-2xl rotate-y-180 backface-hidden">
                <div>
                  <div className="flex items-center justify-between text-purple-300 text-xs font-black tracking-widest uppercase mb-2">
                    <span>{currentCard?.category}</span>
                    <span>Phonetics: {currentCard?.phonetic}</span>
                  </div>

                  <h3 className="text-3xl font-black text-white mb-2">{currentCard?.word}</h3>

                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-3 border border-white/15">
                    <p className="text-purple-100 text-sm font-medium leading-relaxed">
                      "{currentCard?.definition}"
                    </p>
                  </div>

                  <div className="bg-purple-800/40 rounded-2xl p-3 border border-purple-400/20">
                    <span className="text-xs text-purple-300 font-bold block mb-1">Example Sentence:</span>
                    <p className="text-white text-xs font-medium italic">
                      "{currentCard?.sentence}"
                    </p>
                  </div>
                </div>

                {/* Back Card Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onOpenSpeechModal(currentCard)
                    }}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-md hover:scale-105 transition-all flex items-center justify-center gap-2"
                  >
                    <span>🎙️</span> Practice Speaking
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      speakWord()
                    }}
                    className="bg-white/20 hover:bg-white/30 text-white font-extrabold text-xs py-3 px-4 rounded-xl transition-all flex items-center justify-center"
                  >
                    🔊 Listen
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            aria-label="Next card"
            className="w-13 h-13 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-all hover:scale-110 active:scale-95 flex items-center justify-center shadow-lg shadow-purple-500/30 cursor-pointer shrink-0"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Flip Hint */}
        <div className="mt-3 flex items-center gap-1.5 text-gray-500 text-xs font-bold animate-bounce">
          <span>👆</span>
          <span>Tap card to flip</span>
        </div>
      </div>

      {/* ── Bottom Action Buttons ────────────────────────────────────────── */}
      <div className="flex items-center justify-center gap-4 mt-2 shrink-0 z-10">
        <button
          onClick={handleRepeat}
          className="flex items-center gap-2.5 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 px-7 py-3 rounded-2xl font-extrabold text-sm shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M1 4v6h6M23 20v-6h-6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Repeat</span>
        </button>

        {isLearned ? (
          <button
            disabled
            className="flex items-center gap-2.5 bg-emerald-100 text-emerald-800 border border-emerald-300 px-8 py-3 rounded-2xl font-extrabold text-sm shadow-xs cursor-default opacity-95"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Completed ✓</span>
          </button>
        ) : (
          <button
            onClick={handleKnowThis}
            className="flex items-center gap-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 rounded-2xl font-extrabold text-sm shadow-lg shadow-purple-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>I Know This (+15⭐)</span>
          </button>
        )}
      </div>

      {/* Mascot */}
      <div className="absolute bottom-0 left-2 pointer-events-none z-0">
        <TheraMascot message={isLearned ? 'Card completed! Great job! ⭐' : 'Keep learning new words! ⭐'} />
      </div>

      {/* Parent Reset Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center border border-purple-100 shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-purple-100 text-purple-700 text-2xl flex items-center justify-center mx-auto mb-3">
              🔄
            </div>
            <h3 className="text-lg font-black text-gray-900 mb-1">Reset Flash Card Progress?</h3>
            <p className="text-xs text-gray-500 font-semibold mb-5">
              Parent/Admin Control: Resetting will clear completed cards so stars can be earned again.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetModal(false)}
                className="flex-1 py-2.5 rounded-2xl border border-gray-200 text-gray-700 font-extrabold text-xs cursor-pointer hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetFlashcardProgress()
                  setShowResetModal(false)
                }}
                className="flex-1 py-2.5 rounded-2xl bg-purple-600 text-white font-extrabold text-xs cursor-pointer hover:bg-purple-700 shadow-md"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
