import { useState, useEffect } from 'react'
import { SPEECH_SENTENCES, SpeechSentence } from '../../data/speechPracticeData'
import { DynamicIllustration } from '../Illustrations'
import { useApp } from '../../contexts/AppContext'

export function SpeechScreen() {
  const { addStars, addXP } = useApp()
  const [selectedLevel, setSelectedLevel] = useState<'Easy' | 'Medium' | 'Hard'>('Easy')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [showScore, setShowScore] = useState(false)
  const [metrics, setMetrics] = useState({
    pronunciation: { status: 'Excellent', stars: 5, score: 95 },
    fluency: { status: 'Good', stars: 4, score: 85 },
    accuracy: { status: 'Excellent', stars: 5, score: 92 },
    completeness: { status: 'Good', stars: 4, score: 88 },
    overallScore: 88,
  })

  const filteredSentences = SPEECH_SENTENCES.filter((s) => s.level === selectedLevel)
  const currentItem: SpeechSentence = filteredSentences[currentIndex] || filteredSentences[0] || SPEECH_SENTENCES[0]

  useEffect(() => { setCurrentIndex(0); setShowScore(false) }, [selectedLevel])

  const handleListen = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(currentItem.sentence)
      u.rate = 0.8; u.pitch = 1.1
      u.onstart = () => setIsPlayingAudio(true)
      u.onend = () => setIsPlayingAudio(false)
      u.onerror = () => setIsPlayingAudio(false)
      window.speechSynthesis.speak(u)
    }
  }

  const simulateEvaluation = () => {
    const p = Math.floor(Math.random() * 10) + 90
    const f = Math.floor(Math.random() * 15) + 80
    const a = Math.floor(Math.random() * 10) + 88
    const c = Math.floor(Math.random() * 12) + 82
    const avg = Math.round((p + f + a + c) / 4)
    setMetrics({
      pronunciation: { status: p > 90 ? 'Excellent' : 'Good', stars: p > 90 ? 5 : 4, score: p },
      fluency: { status: f > 88 ? 'Excellent' : 'Good', stars: f > 88 ? 5 : 4, score: f },
      accuracy: { status: a > 90 ? 'Excellent' : 'Good', stars: a > 90 ? 5 : 4, score: a },
      completeness: { status: c > 88 ? 'Excellent' : 'Good', stars: c > 88 ? 5 : 4, score: c },
      overallScore: avg,
    })
    setShowScore(true)
    addStars(Math.round(avg / 10))
    addXP(15)
  }

  const handleToggleRecord = () => {
    if (isRecording) { setIsRecording(false); return }
    setIsRecording(true)
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (SR) {
      try {
        const recognition = new SR()
        recognition.lang = 'en-US'; recognition.interimResults = false
        recognition.onresult = () => { setIsRecording(false); simulateEvaluation() }
        recognition.onerror = () => { setIsRecording(false); simulateEvaluation() }
        recognition.start(); return
      } catch { /* fallback */ }
    }
    setTimeout(() => { setIsRecording(false); simulateEvaluation() }, 2500)
  }

  const handleNext = () => { setCurrentIndex((p) => (p + 1) % filteredSentences.length); setShowScore(false) }
  const handlePrev = () => { setCurrentIndex((p) => (p - 1 + filteredSentences.length) % filteredSentences.length); setShowScore(false) }

  const renderHighlighted = () => currentItem.sentence.split(' ').map((word, idx) => {
    const clean = word.replace(/[^a-zA-Z]/g, '').toLowerCase()
    const isHL = currentItem.highlightedWords.some((hw) => hw.toLowerCase() === clean)
    return (
      <span key={idx}>
        <span className={isHL ? 'text-purple-600 font-black underline decoration-dotted cursor-pointer' : 'text-gray-900 font-extrabold'}
          onClick={() => { if ('speechSynthesis' in window) { const u = new SpeechSynthesisUtterance(clean); u.rate = 0.8; window.speechSynthesis.speak(u) } }}>
          {word}
        </span>{' '}
      </span>
    )
  })

  return (
    <div className="flex flex-col gap-4 px-4 py-4 pb-6 animate-slideUp">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-purple-600 flex items-center justify-center text-xl shadow-md">🎙️</div>
          <div>
            <h1 className="text-lg font-black text-gray-900">Speech Practice</h1>
            <p className="text-[10px] text-gray-500 font-semibold">Speak clearly & improve communication!</p>
          </div>
        </div>
        {/* Level Selector */}
        <div className="flex gap-1">
          {(['Easy', 'Medium', 'Hard'] as const).map((lvl) => (
            <button key={lvl} onClick={() => setSelectedLevel(lvl)}
              className={`px-2.5 py-1 rounded-xl text-[10px] font-extrabold transition-all cursor-pointer ${selectedLevel === lvl ? 'bg-purple-600 text-white shadow-sm' : 'bg-purple-50 text-purple-700 border border-purple-100'}`}>
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Main Practice Card */}
      <div className="bg-white rounded-[28px] border-2 border-purple-100 shadow-md p-5 flex flex-col items-center gap-4">
        {/* Tag + Speaker */}
        <div className="w-full flex items-center justify-between">
          <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-[10px] font-black border border-purple-100">
            Repeat the Sentence
          </span>
          <button onClick={handleListen} aria-label="Listen to sentence"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${isPlayingAudio ? 'bg-purple-600 text-white scale-110 animate-pulse' : 'bg-purple-100 text-purple-700 hover:bg-purple-600 hover:text-white'}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Illustration */}
        <div className="flex items-center justify-center p-2 rounded-full bg-gradient-to-b from-purple-100/60 to-indigo-50/60">
          <div className="scale-75"><DynamicIllustration keyName={currentItem?.illustrationKey || 'cat'} /></div>
        </div>

        {/* Sentence */}
        <div className="text-center px-2">
          <h2 className="text-xl font-black text-gray-900 leading-snug">"{renderHighlighted()}"</h2>
          <p className="text-[10px] font-bold text-gray-400 mt-1">{currentItem?.targetPhonetics}</p>
        </div>

        {/* Pagination dots */}
        <div className="flex gap-1.5">
          {filteredSentences.map((_, i) => (
            <div key={i} onClick={() => { setCurrentIndex(i); setShowScore(false) }}
              className={`h-2 rounded-full cursor-pointer transition-all ${i === currentIndex ? 'bg-purple-600 w-5' : 'bg-purple-200 w-2'}`} />
          ))}
        </div>

        {/* Mic Button */}
        <div className="flex flex-col items-center gap-2">
          {/* Waveform rings (visible while recording) */}
          {isRecording && (
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-rose-500 opacity-20 scale-150 animate-pulse" />
              <div className="absolute inset-0 rounded-full bg-rose-500 opacity-10 scale-[2] animate-pulse" style={{ animationDelay: '0.3s' }} />
            </div>
          )}

          <button onClick={handleToggleRecord}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-lg z-10 relative ${isRecording ? 'bg-rose-500 text-white scale-110 animate-pulse-ring' : 'bg-gradient-to-tr from-purple-600 to-indigo-600 text-white hover:scale-105 shadow-purple-500/30'}`}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
              <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className="text-[10px] font-bold text-gray-500">
            {isRecording ? '🔴 Listening... Speak now!' : 'Tap the mic and start speaking'}
          </span>
        </div>

        {/* Waveform bars when recording */}
        {isRecording && (
          <div className="flex items-center justify-center gap-0.5 h-8">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-1 rounded-full animate-waveBar"
                style={{
                  height: `${Math.random() * 24 + 8}px`,
                  background: 'linear-gradient(to top, #7C3AED, #A855F7)',
                  animationDelay: `${i * 0.08}s`,
                }} />
            ))}
          </div>
        )}

        {/* Prev / Next */}
        <div className="w-full flex items-center justify-between pt-1">
          <button onClick={handlePrev}
            className="flex items-center gap-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 px-4 py-2 rounded-xl font-extrabold text-xs transition-all cursor-pointer border border-purple-100">
            ‹ Previous
          </button>
          <button onClick={handleNext}
            className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2 rounded-xl font-extrabold text-xs transition-all cursor-pointer shadow-sm">
            Next ›
          </button>
        </div>
      </div>

      {/* Score Card */}
      {showScore && (
        <div className="bg-white rounded-[28px] border-2 border-purple-100 shadow-md p-5 animate-bounceIn">
          <h3 className="font-black text-gray-900 text-sm mb-4">How did you do? 🏆</h3>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[
              { label: 'Pronunciation', icon: '📶', data: metrics.pronunciation, color: '#10B981', bg: '#ECFDF5' },
              { label: 'Fluency', icon: '〰️', data: metrics.fluency, color: '#3B82F6', bg: '#EFF6FF' },
              { label: 'Accuracy', icon: '🎯', data: metrics.accuracy, color: '#7C3AED', bg: '#F5F3FF' },
              { label: 'Completeness', icon: '🧩', data: metrics.completeness, color: '#F59E0B', bg: '#FFFBEB' },
            ].map((m) => (
              <div key={m.label} className="rounded-2xl p-3 text-center flex flex-col items-center"
                style={{ background: m.bg, border: `1px solid ${m.color}33` }}>
                <span className="text-xs font-extrabold mb-1" style={{ color: m.color }}>{m.label}</span>
                <span className="text-base">{m.icon}</span>
                <span className="text-xs font-black text-gray-900">{m.data.status}</span>
                <div className="flex gap-0.5 mt-1">
                  {[1,2,3,4,5].map((s) => (
                    <span key={s} className="text-amber-400 text-xs">{s <= m.data.stars ? '★' : '☆'}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* Overall ring */}
          <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-3">
            <div className="relative w-16 h-16 shrink-0">
              <svg width="64" height="64" className="-rotate-90">
                <circle cx="32" cy="32" r="26" fill="none" stroke="#E5E7EB" strokeWidth="6" />
                <circle cx="32" cy="32" r="26" fill="none" stroke="#22C55E" strokeWidth="6"
                  strokeDasharray={2 * Math.PI * 26}
                  strokeDashoffset={2 * Math.PI * 26 * (1 - metrics.overallScore / 100)} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-base font-black text-gray-900">{metrics.overallScore}%</span>
              </div>
            </div>
            <div>
              <div className="font-black text-gray-900 text-sm">Overall Score</div>
              <div className="text-emerald-600 text-xs font-extrabold">
                {metrics.overallScore >= 90 ? '🌟 Excellent!' : metrics.overallScore >= 80 ? '👍 Great Job!' : '💪 Keep Going!'}
              </div>
              <div className="flex items-center gap-1 mt-1 text-xs font-bold text-amber-600">
                <span>⭐</span>
                <span>+{Math.round(metrics.overallScore / 10)} stars earned!</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
