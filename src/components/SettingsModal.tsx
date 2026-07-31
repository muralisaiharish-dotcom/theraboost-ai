import { useState } from 'react'

interface SettingsModalProps {
  onClose: () => void
}

export function SettingsModal({ onClose }: SettingsModalProps) {
  const [speechSpeed, setSpeechSpeed] = useState(0.85)
  const [soundEffects, setSoundEffects] = useState(true)
  const [autoFlip, setAutoFlip] = useState(false)

  return (
    <div className="fixed inset-0 bg-purple-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md border-4 border-purple-300 shadow-2xl relative animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 text-gray-500 hover:bg-purple-100 hover:text-purple-700 font-black text-lg flex items-center justify-center transition-colors cursor-pointer"
        >
          ✕
        </button>

        <div className="mb-6">
          <div className="inline-block bg-purple-100 text-purple-800 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-2">
            Preferences
          </div>
          <h2 className="text-3xl font-black text-gray-900">App Settings</h2>
          <p className="text-gray-500 text-sm font-medium">Customize sound, voice, and flashcard preferences.</p>
        </div>

        <div className="space-y-4 mb-6">
          {/* Voice Speed */}
          <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100">
            <div className="flex justify-between items-center mb-2">
              <span className="font-extrabold text-sm text-gray-800">Voice Pronunciation Speed</span>
              <span className="text-xs font-black text-purple-700">{speechSpeed}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.1"
              value={speechSpeed}
              onChange={(e) => setSpeechSpeed(parseFloat(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>

          {/* Sound Effects Toggle */}
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
            <div>
              <div className="font-extrabold text-sm text-gray-800">Sound Effects & Celebrations</div>
              <div className="text-xs text-gray-500 font-medium">Play stars sound & animations</div>
            </div>
            <button
              onClick={() => setSoundEffects(!soundEffects)}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                soundEffects ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform absolute top-0.5 ${
                  soundEffects ? 'left-6.5' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          {/* Auto Flip Toggle */}
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
            <div>
              <div className="font-extrabold text-sm text-gray-800">Auto Speak Word</div>
              <div className="text-xs text-gray-500 font-medium">Pronounce word automatically when flipped</div>
            </div>
            <button
              onClick={() => setAutoFlip(!autoFlip)}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                autoFlip ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform absolute top-0.5 ${
                  autoFlip ? 'left-6.5' : 'left-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-sm py-3 rounded-2xl transition-all cursor-pointer shadow-md"
        >
          Save Settings
        </button>
      </div>
    </div>
  )
}
