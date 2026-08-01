import { useMemo } from 'react'
import { useApp } from '../../contexts/AppContext'
import { computeJungleEcosystem } from '../../engine/jungleEngine'
import { JungleSceneCanvas } from '../jungle/JungleSceneCanvas'

export function MyJungleScreen() {
  const { state, motivationScore } = useApp()

  const ecosystem = useMemo(() => {
    return computeJungleEcosystem(
      state.stats,
      state.activityLog,
      state.speechScore,
      state.learnedCardIds,
      motivationScore
    )
  }, [state.stats, state.activityLog, state.speechScore, state.learnedCardIds, motivationScore])

  return (
    <div className="min-h-full bg-[#071610] text-white p-4 sm:p-6 lg:p-8 space-y-8 select-none">
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-emerald-950 via-[#0B251B] to-emerald-950 p-6 rounded-3xl border border-emerald-500/30 shadow-2xl relative overflow-hidden">
        <div className="space-y-1.5 z-10">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-black px-3 py-1 rounded-full border border-emerald-500/30 uppercase tracking-widest">
              🌳 Dynamic Therapy Visualizer
            </span>
            <span className="bg-amber-500/20 text-amber-300 text-xs font-extrabold px-3 py-1 rounded-full border border-amber-500/30">
              Level {ecosystem.ecosystemLevel} Forest
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-3">
            Living Reinforcement Ecosystem
          </h1>
          <p className="text-emerald-200/80 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Instead of basic stars or numbers, every speech attempt, flashcard, and activity directly grows and transforms your child's personal magical jungle.
          </p>
        </div>

        {/* Top Quick Stats Badge */}
        <div className="flex items-center gap-3 z-10 shrink-0">
          <div className="bg-emerald-900/50 border border-emerald-500/30 rounded-2xl p-3.5 text-center min-w-[90px]">
            <span className="text-xs font-extrabold text-emerald-300 block">Forest Age</span>
            <span className="text-xl sm:text-2xl font-black text-white">{ecosystem.forestAgeDays} Days</span>
          </div>
          <div className="bg-emerald-900/50 border border-emerald-500/30 rounded-2xl p-3.5 text-center min-w-[90px]">
            <span className="text-xs font-extrabold text-amber-300 block">Ecosystem</span>
            <span className="text-xl sm:text-2xl font-black text-amber-400">Lvl {ecosystem.ecosystemLevel}</span>
          </div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* ── Main Living Jungle Interactive Scene ── */}
      <JungleSceneCanvas ecosystem={ecosystem} />

      {/* ── AI Intelligence Cards Section ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 🌿 AI Jungle Health Score Card */}
        <div className="bg-gradient-to-br from-emerald-950/90 via-[#0B251B] to-emerald-950/80 p-6 rounded-3xl border border-emerald-500/30 shadow-2xl flex flex-col justify-between space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-2xl shadow-inner">
                🌿
              </div>
              <div>
                <h3 className="text-base font-black text-white tracking-wide">AI Jungle Health Score</h3>
                <span className="text-xs font-bold text-emerald-300">{ecosystem.healthLevel}</span>
              </div>
            </div>
            {/* Big Health % Circle Badge */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex flex-col items-center justify-center shadow-lg border border-emerald-300/40">
              <span className="text-xl font-black text-white leading-none">{ecosystem.healthScore}%</span>
              <span className="text-[9px] font-bold text-emerald-100 uppercase mt-0.5">Health</span>
            </div>
          </div>

          {/* Reasons List */}
          <div className="bg-emerald-900/30 border border-emerald-800/40 rounded-2xl p-4 space-y-2">
            <span className="text-xs font-extrabold text-emerald-300 block uppercase tracking-wider">Health Factors & Reasons:</span>
            <div className="space-y-1 text-xs font-semibold text-emerald-100/90">
              {ecosystem.healthReasons.map((reason, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span>{reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendation */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-start gap-3">
            <span className="text-xl">💡</span>
            <div>
              <span className="text-xs font-black text-amber-300 block uppercase tracking-wider">AI Ecosystem Recommendation</span>
              <p className="text-xs font-bold text-amber-100/90 mt-0.5 leading-relaxed">
                "{ecosystem.aiRecommendation}"
              </p>
            </div>
          </div>
        </div>

        {/* 🦜 AI Nature Guide Card */}
        <div className="bg-gradient-to-br from-teal-950/90 via-[#0C2A24] to-emerald-950/80 p-6 rounded-3xl border border-teal-500/30 shadow-2xl flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-3xl shadow-inner animate-bounce" style={{ animationDuration: '3s' }}>
              🦜
            </div>
            <div>
              <h3 className="text-base font-black text-white tracking-wide">AI Nature Guide</h3>
              <span className="text-xs font-bold text-teal-300">Personalized Forest Companion</span>
            </div>
          </div>

          {/* Speech Bubble */}
          <div className="relative bg-teal-900/40 border border-teal-500/30 rounded-2xl p-5 shadow-inner">
            <p className="text-xs sm:text-sm font-semibold text-teal-100 leading-relaxed italic">
              "{ecosystem.aiGuideSpeech}"
            </p>
          </div>

          {/* Dynamic Therapy Impact Banner */}
          <div className="bg-emerald-900/40 border border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">📈</span>
              <div>
                <span className="text-xs font-black text-emerald-300 block">Today's Ecosystem Transformation</span>
                <span className="text-[11px] font-bold text-emerald-100">3 Speech Trees Grew & 12 Flowers Bloomed</span>
              </div>
            </div>
            <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-emerald-500/30">
              Active Growth
            </span>
          </div>
        </div>
      </div>

      {/* ── 10 Ecosystem Metrics Grid ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
            <span>📊</span> Ecosystem Vital Metrics
          </h2>
          <span className="text-xs text-emerald-300 font-bold">10 Live Parameters</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {/* 1. Health % */}
          <div className="bg-emerald-950/60 border border-emerald-500/25 rounded-2xl p-4 flex flex-col justify-between space-y-2 hover:border-emerald-500/50 transition-all">
            <div className="flex items-center justify-between text-emerald-300 text-xs font-bold">
              <span>Health Score</span>
              <span>🌿</span>
            </div>
            <span className="text-2xl font-black text-white">{ecosystem.healthScore}%</span>
            <span className="text-[10px] text-emerald-300/70 font-semibold">{ecosystem.healthLevel}</span>
          </div>

          {/* 2. Level */}
          <div className="bg-emerald-950/60 border border-emerald-500/25 rounded-2xl p-4 flex flex-col justify-between space-y-2 hover:border-emerald-500/50 transition-all">
            <div className="flex items-center justify-between text-emerald-300 text-xs font-bold">
              <span>Ecosystem Level</span>
              <span>⭐</span>
            </div>
            <span className="text-2xl font-black text-amber-400">Lvl {ecosystem.ecosystemLevel}</span>
            <span className="text-[10px] text-emerald-300/70 font-semibold">{state.stats.xp} Total XP</span>
          </div>

          {/* 3. Forest Age */}
          <div className="bg-emerald-950/60 border border-emerald-500/25 rounded-2xl p-4 flex flex-col justify-between space-y-2 hover:border-emerald-500/50 transition-all">
            <div className="flex items-center justify-between text-emerald-300 text-xs font-bold">
              <span>Forest Age</span>
              <span>⏳</span>
            </div>
            <span className="text-2xl font-black text-white">{ecosystem.forestAgeDays} Days</span>
            <span className="text-[10px] text-emerald-300/70 font-semibold">{state.stats.dayStreak}-Day Active Streak</span>
          </div>

          {/* 4. Total Trees */}
          <div className="bg-emerald-950/60 border border-emerald-500/25 rounded-2xl p-4 flex flex-col justify-between space-y-2 hover:border-emerald-500/50 transition-all">
            <div className="flex items-center justify-between text-emerald-300 text-xs font-bold">
              <span>Total Trees</span>
              <span>🌳</span>
            </div>
            <span className="text-2xl font-black text-emerald-300">{ecosystem.totalTrees}</span>
            <span className="text-[10px] text-emerald-300/70 font-semibold">From Speech Practice</span>
          </div>

          {/* 5. Flowers Bloomed */}
          <div className="bg-emerald-950/60 border border-emerald-500/25 rounded-2xl p-4 flex flex-col justify-between space-y-2 hover:border-emerald-500/50 transition-all">
            <div className="flex items-center justify-between text-emerald-300 text-xs font-bold">
              <span>Flowers Bloomed</span>
              <span>🌸</span>
            </div>
            <span className="text-2xl font-black text-pink-300">{ecosystem.flowersBloomed}</span>
            <span className="text-[10px] text-emerald-300/70 font-semibold">From Flash Cards</span>
          </div>

          {/* 6. Animals Unlocked */}
          <div className="bg-emerald-950/60 border border-emerald-500/25 rounded-2xl p-4 flex flex-col justify-between space-y-2 hover:border-emerald-500/50 transition-all">
            <div className="flex items-center justify-between text-emerald-300 text-xs font-bold">
              <span>Animals Unlocked</span>
              <span>🦁</span>
            </div>
            <span className="text-2xl font-black text-amber-300">{ecosystem.animalsUnlockedCount}</span>
            <span className="text-[10px] text-emerald-300/70 font-semibold">Wildlife In Ecosystem</span>
          </div>

          {/* 7. Waterfalls */}
          <div className="bg-emerald-950/60 border border-emerald-500/25 rounded-2xl p-4 flex flex-col justify-between space-y-2 hover:border-emerald-500/50 transition-all">
            <div className="flex items-center justify-between text-emerald-300 text-xs font-bold">
              <span>Waterfalls</span>
              <span>💦</span>
            </div>
            <span className="text-2xl font-black text-cyan-300">{ecosystem.waterfallsCount}</span>
            <span className="text-[10px] text-emerald-300/70 font-semibold">Consistency Stream</span>
          </div>

          {/* 8. Ancient Temples */}
          <div className="bg-emerald-950/60 border border-emerald-500/25 rounded-2xl p-4 flex flex-col justify-between space-y-2 hover:border-emerald-500/50 transition-all">
            <div className="flex items-center justify-between text-emerald-300 text-xs font-bold">
              <span>Ancient Temples</span>
              <span>🏛️</span>
            </div>
            <span className="text-2xl font-black text-amber-400">{ecosystem.ancientTemplesCount}</span>
            <span className="text-[10px] text-emerald-300/70 font-semibold">Major Milestones</span>
          </div>

          {/* 9. Fireflies */}
          <div className="bg-emerald-950/60 border border-emerald-500/25 rounded-2xl p-4 flex flex-col justify-between space-y-2 hover:border-emerald-500/50 transition-all">
            <div className="flex items-center justify-between text-emerald-300 text-xs font-bold">
              <span>Starlight Fireflies</span>
              <span>🌟</span>
            </div>
            <span className="text-2xl font-black text-yellow-300">{ecosystem.firefliesCount}</span>
            <span className="text-[10px] text-emerald-300/70 font-semibold">From Stars Earned</span>
          </div>

          {/* 10. Rare Species */}
          <div className="bg-emerald-950/60 border border-emerald-500/25 rounded-2xl p-4 flex flex-col justify-between space-y-2 hover:border-emerald-500/50 transition-all">
            <div className="flex items-center justify-between text-emerald-300 text-xs font-bold">
              <span>Rare Species</span>
              <span>🦚</span>
            </div>
            <span className="text-2xl font-black text-purple-300">{ecosystem.rareSpeciesCount}</span>
            <span className="text-[10px] text-emerald-300/70 font-semibold">Mythic & Legendary</span>
          </div>
        </div>
      </div>

      {/* ── Unlockable Animals & Ecosystem Wonders (13 Features) ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
              <span>✨</span> Ecosystem Species & Magical Wonders
            </h2>
            <p className="text-xs text-emerald-200/70 font-semibold">
              Every species & wonder unlocks automatically as therapy milestones are reached.
            </p>
          </div>
          <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
            {ecosystem.unlockables.filter((u) => u.unlocked).length} / {ecosystem.unlockables.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {ecosystem.unlockables.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-3xl border transition-all flex flex-col justify-between space-y-3 relative overflow-hidden ${
                item.unlocked
                  ? 'bg-gradient-to-b from-emerald-950/80 to-[#0A2218] border-emerald-500/40 shadow-xl'
                  : 'bg-emerald-950/30 border-emerald-900/30 opacity-60 grayscale'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-md border ${
                      item.unlocked
                        ? 'bg-emerald-500/20 border-emerald-400/50'
                        : 'bg-emerald-950/50 border-emerald-900/40'
                    }`}
                  >
                    {item.emoji}
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white">{item.name}</h3>
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                        item.rarity === 'Mythic'
                          ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                          : item.rarity === 'Legendary'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : item.rarity === 'Rare'
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      }`}
                    >
                      {item.rarity}
                    </span>
                  </div>
                </div>

                <span className="text-xs font-black">
                  {item.unlocked ? '✅' : '🔒'}
                </span>
              </div>

              <p className="text-xs font-semibold text-emerald-200/80 leading-relaxed">
                {item.description}
              </p>

              {/* Requirement & Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-extrabold text-emerald-300/80">
                  <span>Req: {item.requiredActivity}</span>
                  <span>
                    {item.unlocked ? 'Unlocked' : `${item.currentCount} / ${item.requiredCount}`}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-emerald-950 rounded-full overflow-hidden border border-emerald-800/40">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full transition-all"
                    style={{
                      width: item.unlocked
                        ? '100%'
                        : `${Math.min(100, (item.currentCount / item.requiredCount) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Recent Ecosystem Transformations Feed ── */}
      <div className="bg-gradient-to-br from-emerald-950/70 via-[#091F16] to-emerald-950/70 p-6 rounded-3xl border border-emerald-500/30 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-black tracking-wide text-white flex items-center gap-2">
            <span>📜</span> Recent Transformation History
          </h2>
          <span className="text-xs font-bold text-emerald-400/80">Therapy Activity Log</span>
        </div>

        <div className="space-y-2.5">
          {ecosystem.transformationHistory.map((item) => (
            <div
              key={item.id}
              className="bg-emerald-900/30 border border-emerald-800/40 rounded-2xl p-3.5 flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-lg shrink-0">
                  {item.icon}
                </div>
                <div>
                  <span className="font-extrabold text-white block">{item.trigger}</span>
                  <span className="text-emerald-300/80 font-medium">{item.effect}</span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-400/60 shrink-0">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
