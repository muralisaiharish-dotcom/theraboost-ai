import { useState, useEffect } from 'react'
import { SPEECH_SENTENCES, SpeechSentence } from '../data/speechPracticeData'
import { DynamicIllustration } from './Illustrations'

interface SpeechPracticeProps {
  onScoreUpdate?: (newScore: number) => void
}

export function SpeechPractice({ onScoreUpdate }: SpeechPracticeProps) {
  const [selectedLevel, setSelectedLevel] = useState<'Easy' | 'Medium' | 'Hard'>('Easy')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [levelDropdownOpen, setLevelDropdownOpen] = useState(false)

  // Evaluation Metrics State
  const [metrics, setMetrics] = useState({
    pronunciation: { status: 'Excellent', stars: 5, score: 95 },
    fluency: { status: 'Good', stars: 4, score: 85 },
    accuracy: { status: 'Excellent', stars: 5, score: 92 },
    completeness: { status: 'Good', stars: 4, score: 88 },
    overallScore: 85,
  })

  // Filter sentences by level
  const filteredSentences = SPEECH_SENTENCES.filter((s) => s.level === selectedLevel)
  const currentItem: SpeechSentence = filteredSentences[currentIndex] || filteredSentences[0] || SPEECH_SENTENCES[0]

  useEffect(() => {
    setCurrentIndex(0)
  }, [selectedLevel])

  // Pronounce full sentence aloud using Web Speech API
  const handleListenSentence = () => {
    if (!currentItem) return
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(currentItem.sentence)
      utterance.rate = 0.8
      utterance.pitch = 1.1

      utterance.onstart = () => setIsPlayingAudio(true)
      utterance.onend = () => setIsPlayingAudio(false)
      utterance.onerror = () => setIsPlayingAudio(false)

      window.speechSynthesis.speak(utterance)
    } else {
      setIsPlayingAudio(true)
      setTimeout(() => setIsPlayingAudio(false), 1500)
    }
  }

  // Handle Speech Recording simulator
  const handleToggleRecord = () => {
    if (isRecording) {
      setIsRecording(false)
      return
    }

    setIsRecording(true)

    // Check SpeechRecognition if available
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition()
        recognition.lang = 'en-US'
        recognition.interimResults = false

        recognition.onresult = () => {
          setIsRecording(false)
          simulateEvaluation()
        }

        recognition.onerror = () => {
          setIsRecording(false)
          simulateEvaluation()
        }

        recognition.start()
        return
      } catch (err) {
        // Fallback
      }
    }

    // Fallback timer simulation
    setTimeout(() => {
      setIsRecording(false)
      simulateEvaluation()
    }, 2500)
  }

  const simulateEvaluation = () => {
    const pScore = Math.floor(Math.random() * 10) + 90
    const fScore = Math.floor(Math.random() * 15) + 80
    const aScore = Math.floor(Math.random() * 10) + 88
    const cScore = Math.floor(Math.random() * 12) + 82
    const avg = Math.round((pScore + fScore + aScore + cScore) / 4)

    setMetrics({
      pronunciation: { status: pScore > 90 ? 'Excellent' : 'Good', stars: pScore > 90 ? 5 : 4, score: pScore },
      fluency: { status: fScore > 88 ? 'Excellent' : 'Good', stars: fScore > 88 ? 5 : 4, score: fScore },
      accuracy: { status: aScore > 90 ? 'Excellent' : 'Good', stars: aScore > 90 ? 5 : 4, score: aScore },
      completeness: { status: cScore > 88 ? 'Excellent' : 'Good', stars: cScore > 88 ? 5 : 4, score: cScore },
      overallScore: avg,
    })

    if (onScoreUpdate) onScoreUpdate(avg)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredSentences.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredSentences.length) % filteredSentences.length)
  }

  // Format target sentence with highlighted bold purple words
  const renderSentenceWithHighlights = () => {
    if (!currentItem) return null
    const words = currentItem.sentence.split(' ')

    return words.map((word, idx) => {
      const cleanWord = word.replace(/[^a-zA-Z]/g, '').toLowerCase()
      const isHighlighted = currentItem.highlightedWords.some(
        (hw) => hw.toLowerCase() === cleanWord
      )

      return (
        <span key={idx}>
          <span
            className={
              isHighlighted
                ? 'text-purple-600 font-black font-sans hover:underline cursor-pointer'
                : 'text-gray-900 font-extrabold'
            }
            onClick={() => {
              if ('speechSynthesis' in window) {
                const u = new SpeechSynthesisUtterance(cleanWord)
                u.rate = 0.8
                window.speechSynthesis.speak(u)
              }
            }}
          >
            {word}
          </span>{' '}
        </span>
      )
    })
  }

  return (
    <div className="flex flex-col flex-1 h-full min-h-0 overflow-y-auto pr-1 space-y-4 pb-6">
      {/* ── Section Header ────────────────────────────────────────────── */}
      <div className="flex items-center justify-between shrink-0 px-1 pt-1">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-purple-600 text-white flex items-center justify-center text-xl shadow-md shadow-purple-500/20 shrink-0">
            🎙️
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 leading-tight">Speech Practice</h1>
            <p className="text-gray-500 text-xs font-semibold">
              Speak clearly and improve your communication skills!
            </p>
          </div>
        </div>

        {/* Level Dropdown Selector */}
        <div className="relative shrink-0">
          <button
            onClick={() => setLevelDropdownOpen(!levelDropdownOpen)}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl text-xs font-extrabold text-purple-900 shadow-xs border border-purple-100 hover:border-purple-300 transition-all cursor-pointer"
          >
            <span>Level: {selectedLevel}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {levelDropdownOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-white rounded-2xl shadow-xl border border-purple-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
              {(['Easy', 'Medium', 'Hard'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => {
                    setSelectedLevel(lvl)
                    setLevelDropdownOpen(false)
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-bold transition-colors ${
                    lvl === selectedLevel ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Level: {lvl}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Central Practice Hero Card ──────────────────────────────────── */}
      <div className="bg-white rounded-[32px] p-6 border-2 border-purple-100 shadow-md flex flex-col items-center justify-between space-y-4">
        {/* Top Tag & Audio Speaker */}
        <div className="w-full flex items-center justify-between">
          <div className="bg-purple-50 text-purple-700 px-4 py-1.5 rounded-full text-xs font-black tracking-wide border border-purple-100">
            Repeat the Sentence
          </div>

          <button
            onClick={handleListenSentence}
            aria-label="Listen to sentence"
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isPlayingAudio
                ? 'bg-purple-600 text-white scale-110 animate-pulse'
                : 'bg-purple-100 text-purple-700 hover:bg-purple-600 hover:text-white shadow-xs'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 010 7.07 M19.07 4.93a10 10 0 010 14.14" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Center Character Illustration */}
        <div className="flex items-center justify-center my-1">
          <div className="relative p-2 rounded-full bg-gradient-to-b from-purple-100/60 to-indigo-50/60 scale-90">
            <DynamicIllustration keyName={currentItem?.illustrationKey || 'cat'} />
          </div>
        </div>

        {/* Target Sentence Display */}
        <div className="text-center max-w-lg px-2">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-snug">
            "{renderSentenceWithHighlights()}"
          </h2>
          <p className="text-xs font-bold text-gray-400 mt-1">{currentItem?.targetPhonetics}</p>
        </div>

        {/* Pagination Dots */}
        <div className="flex gap-1.5 my-1">
          {filteredSentences.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all ${
                i === currentIndex ? 'bg-purple-600 w-6' : 'bg-purple-200 hover:bg-purple-300'
              }`}
            />
          ))}
        </div>

        {/* Microphone Interactive Record Button */}
        <div className="flex flex-col items-center my-2">
          <button
            onClick={handleToggleRecord}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-lg ${
              isRecording
                ? 'bg-rose-500 text-white scale-110 animate-pulse-ring'
                : 'bg-gradient-to-tr from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white hover:scale-105 shadow-purple-500/30'
            }`}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
              <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className="text-[11px] font-bold text-gray-500 mt-2">
            {isRecording ? 'Listening... Speak now!' : 'Tap the mic and start speaking'}
          </span>
        </div>

        {/* Bottom Navigation Control Buttons */}
        <div className="w-full flex items-center justify-between pt-2">
          <button
            onClick={handlePrev}
            className="flex items-center gap-2 bg-purple-50 hover:bg-purple-100 text-purple-700 px-5 py-2 rounded-2xl font-extrabold text-xs transition-all cursor-pointer border border-purple-100"
          >
            ‹ Previous
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-2 rounded-2xl font-extrabold text-xs transition-all shadow-md shadow-purple-500/20 cursor-pointer"
          >
            Next ›
          </button>
        </div>
      </div>

      {/* ── "How did you do?" Speech Analysis Card ──────────────────────── */}
      <div className="bg-white rounded-[32px] p-6 border-2 border-purple-100 shadow-md">
        <h3 className="font-black text-gray-900 text-base mb-4">How did you do?</h3>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* 4 Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1 w-full">
            {/* Pronunciation */}
            <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-3 text-center flex flex-col items-center justify-center">
              <div className="text-emerald-700 font-extrabold text-xs mb-1">Pronunciation</div>
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-lg mb-1">
                📶
              </div>
              <div className="font-black text-gray-900 text-xs">{metrics.pronunciation.status}</div>
              <div className="flex gap-0.5 mt-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="text-amber-400 text-xs">
                    {s <= metrics.pronunciation.stars ? '★' : '☆'}
                  </span>
                ))}
              </div>
            </div>

            {/* Fluency */}
            <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-3 text-center flex flex-col items-center justify-center">
              <div className="text-blue-700 font-extrabold text-xs mb-1">Fluency</div>
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-lg mb-1">
                〰️
              </div>
              <div className="font-black text-gray-900 text-xs">{metrics.fluency.status}</div>
              <div className="flex gap-0.5 mt-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="text-amber-400 text-xs">
                    {s <= metrics.fluency.stars ? '★' : '☆'}
                  </span>
                ))}
              </div>
            </div>

            {/* Accuracy */}
            <div className="bg-purple-50/70 border border-purple-100 rounded-2xl p-3 text-center flex flex-col items-center justify-center">
              <div className="text-purple-700 font-extrabold text-xs mb-1">Accuracy</div>
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-lg mb-1">
                🎯
              </div>
              <div className="font-black text-gray-900 text-xs">{metrics.accuracy.status}</div>
              <div className="flex gap-0.5 mt-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="text-amber-400 text-xs">
                    {s <= metrics.accuracy.stars ? '★' : '☆'}
                  </span>
                ))}
              </div>
            </div>

            {/* Completeness */}
            <div className="bg-amber-50/70 border border-amber-100 rounded-2xl p-3 text-center flex flex-col items-center justify-center">
              <div className="text-amber-700 font-extrabold text-xs mb-1">Completeness</div>
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-lg mb-1">
                🧩
              </div>
              <div className="font-black text-gray-900 text-xs">{metrics.completeness.status}</div>
              <div className="flex gap-0.5 mt-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="text-amber-400 text-xs">
                    {s <= metrics.completeness.stars ? '★' : '☆'}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Overall Score Ring */}
          <div className="flex flex-col items-center justify-center shrink-0 border-t sm:border-t-0 sm:border-l border-gray-100 pt-4 sm:pt-0 sm:pl-4">
            <div className="relative w-24 h-24">
              <svg width="96" height="96" className="-rotate-90">
                <circle cx="48" cy="48" r="40" fill="none" stroke="#E5E7EB" strokeWidth="8" />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  fill="none"
                  stroke="#22C55E"
                  strokeWidth="8"
                  strokeDasharray={2 * Math.PI * 40}
                  strokeDashoffset={2 * Math.PI * 40 * (1 - metrics.overallScore / 100)}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-gray-900 leading-none">{metrics.overallScore}%</span>
                <span className="text-[10px] font-extrabold text-emerald-600 mt-0.5">Great Job!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Row */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
            <span>⭐</span>
            <span>You sound great! Keep practicing to get even better!</span>
          </div>
          <button className="text-purple-600 hover:text-purple-800 text-xs font-black hover:underline cursor-pointer">
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}
