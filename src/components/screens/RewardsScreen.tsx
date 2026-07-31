import { useState } from 'react'
import { useApp } from '../../contexts/AppContext'
import { useAuth } from '../../contexts/AuthContext'

export function RewardsScreen() {
  const { state, addStars, addCoins } = useApp()
  const { state: authState } = useAuth()
  const user = authState.user!
  const { stats } = state
  const [claimedDaily, setClaimedDaily] = useState(false)
  const [showUnlockAnimation, setShowUnlockAnimation] = useState<string | null>(null)

  const rewardItems = [
    { id: 'r1', title: 'Gold Frame Avatar', icon: '🖼️', cost: 200, unlocked: stats.starsEarned >= 200, category: 'avatar' as const },
    { id: 'r2', title: 'Galaxy Theme', icon: '🌌', cost: 500, unlocked: stats.starsEarned >= 500, category: 'theme' as const },
    { id: 'r3', title: 'Super Star Badge', icon: '🌟', cost: 100, unlocked: stats.starsEarned >= 100, category: 'badge' as const },
    { id: 'r4', title: '2x XP Boost (1 Day)', icon: '⚡', cost: 300, unlocked: stats.starsEarned >= 300, category: 'boost' as const },
    { id: 'r5', title: 'Rainbow Avatar', icon: '🌈', cost: 400, unlocked: stats.starsEarned >= 400, category: 'avatar' as const },
    { id: 'r6', title: 'Champion Badge', icon: '🏆', cost: 1000, unlocked: stats.starsEarned >= 1000, category: 'badge' as const },
  ]

  const handleClaimDaily = () => {
    if (claimedDaily) return
    setClaimedDaily(true)
    addStars(50)
    addCoins(20)
  }

  const handleUnlock = (id: string, cost: number) => {
    if (stats.starsEarned < cost) return
    setShowUnlockAnimation(id)
    setTimeout(() => setShowUnlockAnimation(null), 2000)
  }

  return (
    <div className="flex flex-col gap-4 px-4 py-4 pb-6 animate-slideUp">
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-2xl bg-amber-500 flex items-center justify-center text-xl shadow-md">🏆</div>
        <div>
          <h1 className="text-lg font-black text-gray-900">Rewards</h1>
          <p className="text-[10px] text-gray-500 font-semibold">Earn stars & unlock amazing rewards!</p>
        </div>
      </div>

      {/* Wallet cards */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { icon: '⭐', label: 'Stars', value: stats.starsEarned.toLocaleString(), color: '#F59E0B', bg: '#FFFBEB' },
          { icon: '🪙', label: 'Coins', value: stats.coins.toLocaleString(), color: '#EAB308', bg: '#FEFCE8' },
          { icon: '⚡', label: 'XP', value: stats.xp.toLocaleString(), color: '#7C3AED', bg: '#F5F3FF' },
        ].map((w) => (
          <div key={w.label} className="rounded-2xl p-3 text-center border shadow-xs"
            style={{ background: w.bg, borderColor: w.color + '33' }}>
            <div className="text-2xl">{w.icon}</div>
            <div className="text-base font-black" style={{ color: w.color }}>{w.value}</div>
            <div className="text-[10px] font-bold text-gray-500">{w.label}</div>
          </div>
        ))}
      </div>

      {/* Daily Reward */}
      <div
        className="relative rounded-3xl p-5 overflow-hidden"
        style={{ background: claimedDaily ? 'linear-gradient(135deg, #ECFDF5, #D1FAE5)' : 'linear-gradient(135deg, #7C3AED, #9333EA)', border: claimedDaily ? '2px solid #6EE7B7' : 'none' }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className={`text-xs font-bold mb-1 ${claimedDaily ? 'text-emerald-600' : 'text-purple-200'}`}>
              {claimedDaily ? '✅ Claimed Today!' : '🎁 Daily Reward'}
            </div>
            <h3 className={`text-base font-black ${claimedDaily ? 'text-emerald-900' : 'text-white'}`}>
              {claimedDaily ? 'Come back tomorrow!' : `Claim +50⭐ & +20🪙!`}
            </h3>
            <p className={`text-xs font-semibold mt-1 ${claimedDaily ? 'text-emerald-700' : 'text-purple-200'}`}>
              {claimedDaily ? `Great job, ${user.name}! Keep the streak!` : `Don't miss your daily bonus, ${user.name}!`}
            </p>
          </div>
          <button
            onClick={handleClaimDaily}
            disabled={claimedDaily}
            className={`px-4 py-2.5 rounded-2xl font-extrabold text-sm shadow-md transition-all cursor-pointer ${claimedDaily ? 'bg-emerald-200 text-emerald-700 cursor-not-allowed' : 'bg-white text-purple-700 hover:scale-105 active:scale-95'}`}
          >
            {claimedDaily ? '✓ Done' : '🎁 Claim!'}
          </button>
        </div>

        {/* Streak dots */}
        <div className="flex gap-1.5 mt-4">
          {[...Array(7)].map((_, i) => (
            <div key={i} className={`flex-1 h-1.5 rounded-full ${i < stats.dayStreak ? (claimedDaily ? 'bg-emerald-400' : 'bg-white') : 'bg-white/30'}`} />
          ))}
        </div>
        <div className={`text-[10px] font-bold mt-1 ${claimedDaily ? 'text-emerald-600' : 'text-purple-200'}`}>
          🔥 {stats.dayStreak} day streak!
        </div>
      </div>

      {/* Weekly Rewards */}
      <div>
        <h2 className="text-sm font-black text-gray-900 mb-3">Weekly Bonuses 🗓️</h2>
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {[
            { day: 'Mon', reward: '20⭐', done: true },
            { day: 'Tue', reward: '30⭐', done: true },
            { day: 'Wed', reward: '50⭐', done: true },
            { day: 'Thu', reward: '40⭐', done: false },
            { day: 'Fri', reward: '60⭐', done: false },
            { day: 'Sat', reward: '80⭐', done: false },
            { day: 'Sun', reward: '100⭐', done: false },
          ].map((d) => (
            <div key={d.day} className={`flex flex-col items-center gap-1 p-3 rounded-2xl shrink-0 border-2 min-w-[56px] ${d.done ? 'bg-amber-50 border-amber-300' : 'bg-gray-50 border-gray-200'}`}>
              <span className={`text-xl ${d.done ? 'opacity-100' : 'opacity-40'}`}>{d.done ? '✅' : '🎁'}</span>
              <span className="text-[10px] font-black text-gray-700">{d.day}</span>
              <span className={`text-[9px] font-bold ${d.done ? 'text-amber-600' : 'text-gray-400'}`}>{d.reward}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reward Store */}
      <div>
        <h2 className="text-sm font-black text-gray-900 mb-3">🛒 Reward Store</h2>
        <div className="grid grid-cols-2 gap-3">
          {rewardItems.map((item) => (
            <div key={item.id}
              className={`rounded-3xl p-4 flex flex-col items-center gap-2 border-2 transition-all ${item.unlocked ? 'bg-white border-purple-200 shadow-sm' : 'bg-gray-50 border-gray-200 opacity-70'}`}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${item.unlocked ? 'bg-purple-100' : 'bg-gray-100'}`}>
                {showUnlockAnimation === item.id ? (
                  <span className="animate-bounceIn">🎉</span>
                ) : item.icon}
              </div>
              <div className="text-center">
                <div className="text-xs font-black text-gray-900">{item.title}</div>
                <div className="flex items-center gap-1 justify-center mt-1">
                  <span className="text-[10px]">⭐</span>
                  <span className="text-[10px] font-black text-amber-600">{item.cost}</span>
                </div>
              </div>
              <button
                onClick={() => handleUnlock(item.id, item.cost)}
                disabled={!item.unlocked || showUnlockAnimation === item.id}
                className={`w-full py-1.5 rounded-xl text-[10px] font-extrabold transition-all cursor-pointer ${item.unlocked ? 'bg-purple-600 text-white hover:bg-purple-700 active:scale-95' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                {item.unlocked ? (showUnlockAnimation === item.id ? '🎉 Unlocked!' : 'Unlock Now') : `🔒 Need ${item.cost}⭐`}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
