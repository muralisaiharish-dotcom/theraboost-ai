import { useState } from 'react'
import { useApp } from '../contexts/AppContext'

interface GoalTask {
  id: string
  label: string
  icon: string
  screen: string
  done: boolean
  stars: number
  estMinutes: number
}

const ALL_TASKS: GoalTask[] = [
  { id: 't1', label: 'Speech Practice', icon: '🎙️', screen: 'Speech Practice', done: true, stars: 20, estMinutes: 10 },
  { id: 't2', label: 'Flash Cards', icon: '🃏', screen: 'Flash Cards', done: true, stars: 15, estMinutes: 8 },
  { id: 't3', label: 'Matching Game', icon: '🧩', screen: 'Matching Games', done: false, stars: 25, estMinutes: 12 },
]

interface TodayGoalModalProps {
  onClose: () => void
}

export function TodayGoalModal({ onClose }: TodayGoalModalProps) {
  const { navigate, addStars } = useApp()
  const [tasks, setTasks] = useState<GoalTask[]>(ALL_TASKS)
  const [goalBonusClaimed, setGoalBonusClaimed] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const completedCount = tasks.filter((t) => t.done).length
  const totalCount = tasks.length
  const progressPct = Math.round((completedCount / totalCount) * 100)
  const allDone = completedCount === totalCount

  const remainingTasks = tasks.filter((t) => !t.done)
  const estMinutesLeft = remainingTasks.reduce((sum, t) => sum + t.estMinutes, 0)
  const totalStarsEarnable = tasks.filter((t) => !t.done).reduce((s, t) => s + t.stars, 0) +
    (allDone && !goalBonusClaimed ? 50 : 0)

  const handleCompleteTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId && !t.done) {
          addStars(t.stars)
          return { ...t, done: true }
        }
        return t
      })
    )
  }

  const handleClaimBonus = () => {
    if (goalBonusClaimed) return
    setGoalBonusClaimed(true)
    addStars(50)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 2500)
  }

  const handleGoToActivity = (screen: string) => {
    onClose()
    navigate(screen)
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div
        className="bg-white rounded-3xl shadow-2xl border border-purple-100 w-full max-w-sm flex flex-col overflow-hidden"
        style={{ animation: 'scaleUp 0.25s ease-out both' }}
      >
        {/* Confetti overlay */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
            <div className="text-5xl flex gap-3 animate-bounce">
              <span>🎉</span><span className="animate-spin">⭐</span><span>🏆</span>
            </div>
          </div>
        )}

        {/* Header */}
        <div
          className="px-5 py-5 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #9333EA 100%)' }}
        >
          <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-20 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #fff, transparent 70%)', transform: 'translate(30%, -30%)' }} />

          <div className="flex items-start justify-between relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">🎯</span>
                <h3 className="font-black text-white text-base">Today's Goal</h3>
              </div>
              <p className="text-purple-200 text-[10px] font-semibold">
                {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-xs font-black cursor-pointer transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Progress ring + stat */}
          <div className="flex items-center gap-4 mt-4 relative z-10">
            <div className="relative w-14 h-14 shrink-0">
              <svg width="56" height="56" className="-rotate-90">
                <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="5" />
                <circle
                  cx="28" cy="28" r="22" fill="none" stroke="#FDE047" strokeWidth="5"
                  strokeDasharray={2 * Math.PI * 22}
                  strokeDashoffset={2 * Math.PI * 22 - (progressPct / 100) * 2 * Math.PI * 22}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-xs font-black">{progressPct}%</span>
              </div>
            </div>
            <div>
              <p className="text-white font-black text-sm">{completedCount} / {totalCount} Tasks</p>
              <p className="text-purple-200 text-[10px] font-semibold mt-0.5">
                {allDone ? 'All done! Amazing! 🌟' : `~${estMinutesLeft} min remaining`}
              </p>
              {!allDone && (
                <p className="text-yellow-300 text-[10px] font-black mt-0.5">+{totalStarsEarnable} ⭐ earnable</p>
              )}
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="px-5 py-4 flex flex-col gap-3 overflow-y-auto max-h-60">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${
                task.done
                  ? 'bg-emerald-50 border-emerald-200'
                  : 'bg-purple-50/60 border-purple-100 hover:border-purple-300'
              }`}
            >
              {/* Check / Circle */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 ${
                  task.done
                    ? 'bg-emerald-500 text-white shadow-xs'
                    : 'bg-white border-2 border-purple-200 text-gray-300'
                }`}
              >
                {task.done ? '✓' : '○'}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span>{task.icon}</span>
                  <span className={`text-xs font-black ${task.done ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                    {task.label}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] font-semibold text-gray-400">+{task.stars} ⭐</span>
                  <span className="text-[10px] text-gray-300">•</span>
                  <span className="text-[10px] font-semibold text-gray-400">~{task.estMinutes} min</span>
                </div>
              </div>

              {/* Action */}
              {task.done ? (
                <span className="text-[9px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                  Done ✓
                </span>
              ) : (
                <div className="flex gap-1.5">
                  <button
                    onClick={() => handleCompleteTask(task.id)}
                    className="text-[9px] font-black bg-purple-100 text-purple-700 px-2 py-1 rounded-lg hover:bg-purple-200 cursor-pointer transition-colors"
                  >
                    Mark Done
                  </button>
                  <button
                    onClick={() => handleGoToActivity(task.screen)}
                    className="text-[9px] font-black bg-purple-600 text-white px-2 py-1 rounded-lg hover:bg-purple-700 cursor-pointer transition-colors"
                  >
                    Go →
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer: Bonus or CTA */}
        <div className="px-5 pb-5 pt-2 border-t border-purple-50">
          {allDone ? (
            goalBonusClaimed ? (
              <div className="flex items-center justify-center gap-2 bg-amber-50 border border-amber-200 rounded-2xl py-3">
                <span>🏆</span>
                <span className="text-xs font-black text-amber-800">Goal Bonus Claimed! +50 ⭐</span>
              </div>
            ) : (
              <button
                onClick={handleClaimBonus}
                className="w-full py-3 rounded-2xl font-extrabold text-sm text-white shadow-md cursor-pointer hover:scale-105 transition-all"
                style={{ background: 'linear-gradient(135deg, #D97706, #F59E0B)' }}
              >
                🎉 Claim Goal Bonus! +50 ⭐
              </button>
            )
          ) : (
            <button
              onClick={() => handleGoToActivity(remainingTasks[0]?.screen || 'Home')}
              className="w-full py-3 rounded-2xl font-extrabold text-sm text-white shadow-md cursor-pointer hover:scale-105 transition-all"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}
            >
              Continue → {remainingTasks[0]?.icon} {remainingTasks[0]?.label}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
