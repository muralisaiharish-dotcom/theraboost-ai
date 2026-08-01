import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useApp } from '../../contexts/AppContext'

export function SettingsScreen() {
  const { logout, state: authState } = useAuth()
  const { resetFlashcardProgress } = useApp()
  const user = authState.user!

  const [sound, setSound] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [language, setLanguage] = useState('English')
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showResetProgressModal, setShowResetProgressModal] = useState(false)

  return (
    <div className="flex flex-col gap-4 px-4 py-4 pb-6 animate-slideUp">
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-2xl bg-gray-800 flex items-center justify-center text-xl text-white shadow-md">⚙️</div>
        <div>
          <h1 className="text-lg font-black text-gray-900">Settings</h1>
          <p className="text-[10px] text-gray-500 font-semibold">Preferences & Account Control</p>
        </div>
      </div>

      {/* App Preferences */}
      <div className="bg-white rounded-3xl border border-gray-100 p-4 shadow-xs flex flex-col gap-3">
        <h2 className="text-xs font-black text-gray-400 uppercase tracking-wider">Preferences</h2>

        {/* Sound Toggle */}
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-2.5">
            <span className="text-lg">🔊</span>
            <div>
              <div className="text-xs font-black text-gray-900">Sound Effects & Voice</div>
              <div className="text-[10px] font-semibold text-gray-400">Play audio feedback in games</div>
            </div>
          </div>
          <button
            onClick={() => setSound(!sound)}
            className={`w-11 h-6 rounded-full p-1 transition-colors cursor-pointer ${sound ? 'bg-purple-600' : 'bg-gray-200'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${sound ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>

        <div className="h-px bg-gray-100" />

        {/* Push Notifications Toggle */}
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-2.5">
            <span className="text-lg">🔔</span>
            <div>
              <div className="text-xs font-black text-gray-900">Daily Reminders</div>
              <div className="text-[10px] font-semibold text-gray-400">Practice notifications</div>
            </div>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`w-11 h-6 rounded-full p-1 transition-colors cursor-pointer ${notifications ? 'bg-purple-600' : 'bg-gray-200'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${notifications ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>

        <div className="h-px bg-gray-100" />

        {/* Language Selector */}
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-2.5">
            <span className="text-lg">🌐</span>
            <div>
              <div className="text-xs font-black text-gray-900">Language</div>
              <div className="text-[10px] font-semibold text-gray-400">Application interface language</div>
            </div>
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-50 border border-gray-200 text-xs font-bold text-gray-700 px-2.5 py-1 rounded-xl outline-none cursor-pointer"
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Tamil</option>
            <option>Telugu</option>
            <option>Spanish</option>
          </select>
        </div>
      </div>

      {/* Security & Account */}
      <div className="bg-white rounded-3xl border border-gray-100 p-4 shadow-xs flex flex-col gap-3">
        <h2 className="text-xs font-black text-gray-400 uppercase tracking-wider">Account & Security</h2>

        <button
          onClick={() => setShowPasswordModal(true)}
          className="flex items-center justify-between py-1.5 cursor-pointer text-left"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-lg">🔒</span>
            <span className="text-xs font-black text-gray-900">Change Password</span>
          </div>
          <span className="text-gray-400 font-black text-xs">›</span>
        </button>

        <div className="h-px bg-gray-100" />

        <div className="flex items-center justify-between py-1.5">
          <div className="flex items-center gap-2.5">
            <span className="text-lg">🛡️</span>
            <div>
              <div className="text-xs font-black text-gray-900">Privacy & Data</div>
              <div className="text-[10px] font-semibold text-gray-400">COPPA & FERPA Compliant</div>
            </div>
          </div>
          <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Secured</span>
        </div>

        <div className="h-px bg-gray-100" />

        <button
          onClick={() => setShowResetProgressModal(true)}
          className="flex items-center justify-between py-1.5 cursor-pointer text-left text-purple-700"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-lg">🔄</span>
            <div>
              <div className="text-xs font-black">Reset Flash Card Progress</div>
              <div className="text-[10px] font-semibold text-gray-400">Parent/Admin: Clear completed cards to re-earn stars</div>
            </div>
          </div>
          <span className="font-black text-xs">›</span>
        </button>

        <div className="h-px bg-gray-100" />

        <button
          onClick={() => setShowDeleteModal(true)}
          className="flex items-center justify-between py-1.5 cursor-pointer text-left text-red-600"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-lg">🗑️</span>
            <span className="text-xs font-black">Delete Account</span>
          </div>
          <span className="font-black text-xs">›</span>
        </button>
      </div>

      {/* App Info */}
      <div className="text-center text-[10px] font-semibold text-gray-400 mt-2">
        ReinforceAI v1.0.0 PWA<br />
        Logged in as {user.email}
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-xs flex flex-col gap-4 shadow-2xl animate-scaleUp">
            <h3 className="text-base font-black text-gray-900">Change Password</h3>
            <input
              type="password"
              placeholder="Current password"
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-semibold outline-none focus:border-purple-500"
            />
            <input
              type="password"
              placeholder="New password"
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-semibold outline-none focus:border-purple-500"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-xs flex flex-col gap-4 shadow-2xl animate-scaleUp">
            <h3 className="text-base font-black text-red-600">Delete Account</h3>
            <p className="text-xs text-gray-500 font-semibold">
              Are you sure? All progress, stars, and activity data will be permanently removed.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  setShowDeleteModal(false)
                  await logout()
                }}
                className="flex-1 py-2 rounded-xl bg-red-600 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Reset Flash Card Progress Modal */}
      {showResetProgressModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-xs flex flex-col gap-4 shadow-2xl animate-scaleUp">
            <h3 className="text-base font-black text-purple-900">Reset Flash Card Progress</h3>
            <p className="text-xs text-gray-500 font-semibold">
              Parent/Admin Control: Resetting will clear completed cards so stars can be re-earned.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowResetProgressModal(false)}
                className="flex-1 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetFlashcardProgress()
                  setShowResetProgressModal(false)
                }}
                className="flex-1 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold shadow-xs cursor-pointer"
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
