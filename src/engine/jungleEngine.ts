import type { UserStats, ActivityLogEntry, MotivationScore } from '../types'

export interface UnlockableItem {
  id: string
  name: string
  emoji: string
  category: 'animal' | 'wonder' | 'nature'
  requiredActivity: string
  requiredCount: number
  currentCount: number
  unlocked: boolean
  description: string
  rarity: 'Common' | 'Rare' | 'Legendary' | 'Mythic'
}

export interface JungleEcosystemData {
  healthScore: number // 0 - 100
  healthLevel: string
  healthReasons: string[]
  aiRecommendation: string
  aiGuideSpeech: string
  ecosystemLevel: number
  forestAgeDays: number
  totalTrees: number
  flowersBloomed: number
  butterfliesCount: number
  birdsCount: number
  waterfallsCount: number
  ancientTemplesCount: number
  firefliesCount: number
  rareSpeciesCount: number
  animalsUnlockedCount: number
  riverExpansionPct: number
  weatherState: 'sunshine' | 'glowing' | 'cloudy' | 'rain'
  unlockables: UnlockableItem[]
  transformationHistory: Array<{
    id: string
    time: string
    trigger: string
    effect: string
    icon: string
  }>
}

export function computeJungleEcosystem(
  stats: UserStats,
  activityLog: ActivityLogEntry[],
  speechScore: number,
  learnedCardIds: string[],
  motivationScore: MotivationScore
): JungleEcosystemData {
  // Activity breakdowns
  const speechActivities = activityLog.filter((a) => a.activityType === 'speech').length
  const flashcardActivities = activityLog.filter((a) => a.activityType === 'flashcard').length
  const matchingGames = activityLog.filter((a) => a.activityType === 'matching_game').length
  const rewardVideos = activityLog.filter((a) => a.activityType === 'reward_video').length

  // Ecosystem Metrics
  const totalTrees = Math.max(12, 10 + speechActivities * 3 + Math.floor(speechScore / 10))
  const flowersBloomed = Math.max(28, 25 + learnedCardIds.length * 4 + flashcardActivities * 5)
  const butterfliesCount = Math.max(8, 6 + matchingGames * 4)
  const birdsCount = Math.max(5, 4 + rewardVideos * 3)
  const riverExpansionPct = Math.min(100, Math.max(35, stats.dayStreak * 12))
  const waterfallsCount = Math.max(1, Math.min(5, Math.floor(stats.dayStreak / 2)))
  const ancientTemplesCount = Math.max(1, Math.min(4, Math.floor(stats.xp / 200)))
  const firefliesCount = Math.max(15, 12 + Math.floor(stats.starsEarned / 50))
  
  const ecosystemLevel = Math.max(1, Math.floor(stats.xp / 150) + 1)
  const forestAgeDays = Math.max(1, stats.dayStreak + Math.floor(stats.totalActivities / 3))

  // Determine weather based on motivation
  let weatherState: 'sunshine' | 'glowing' | 'cloudy' | 'rain' = 'glowing'
  if (motivationScore.score >= 80) {
    weatherState = 'sunshine'
  } else if (motivationScore.score >= 60) {
    weatherState = 'glowing'
  } else if (motivationScore.score >= 40) {
    weatherState = 'cloudy'
  } else {
    weatherState = 'rain'
  }

  // Health Score Calculation
  const healthFactors = [
    speechScore > 75 ? 25 : 15,
    motivationScore.score >= 70 ? 25 : 15,
    stats.dayStreak >= 3 ? 25 : 15,
    stats.totalActivities >= 10 ? 25 : 15,
  ]
  const healthScore = Math.min(100, healthFactors.reduce((a, b) => a + b, 0))

  let healthLevel = 'Flourishing & Vibrant'
  if (healthScore < 60) healthLevel = 'Needs Care & Attention'
  else if (healthScore < 80) healthLevel = 'Healthy & Growing'

  const healthReasons = [
    speechScore > 80 ? '• Excellent Speech Practice confidence' : '• Steady Speech Practice effort',
    motivationScore.score >= 70 ? '• High Motivation & Active Engagement' : '• Regular Participation',
    stats.dayStreak >= 3 ? `• ${stats.dayStreak}-Day Active Therapy Streak` : '• Ongoing Therapy Journey',
    rewardVideos > 0 ? '• Healthy Balance of Learning & Smart Rewards' : '• Active Learning Progress',
  ]

  // Dynamic AI Recommendation based on next unlockable target
  let aiRecommendation = 'Complete one more Speech Practice session to grow majestic mahogany trees!'
  if (matchingGames < 3) {
    aiRecommendation = 'Complete one more Matching Game to attract a new majestic Elephant 🐘 to your river bank!'
  } else if (learnedCardIds.length < 10) {
    aiRecommendation = 'Practice 3 more Flash Cards to bloom golden orchids across the forest floor 🌸!'
  } else if (rewardVideos < 2) {
    aiRecommendation = 'Watch a Smart Reward Video to attract colourful Peacocks 🦚 to your jungle!'
  }

  // AI Nature Guide Speech
  const aiGuideSpeech = `Great job! Your forest has become noticeably greener and more vibrant today because your speech confidence improved to ${speechScore}%. Keep practicing to unlock rare species and ancient temples!`

  // Catalog of 13 Unlockables
  const unlockables: UnlockableItem[] = [
    {
      id: 'elephant',
      name: 'Gentle Elephant',
      emoji: '🐘',
      category: 'animal',
      requiredActivity: 'Matching Games',
      requiredCount: 3,
      currentCount: matchingGames,
      unlocked: matchingGames >= 2,
      description: 'Loves drinking at the expanding river bank during high streaks.',
      rarity: 'Rare',
    },
    {
      id: 'parrot',
      name: 'Jungle Parrot',
      emoji: '🦜',
      category: 'animal',
      requiredActivity: 'Speech Practice',
      requiredCount: 2,
      currentCount: speechActivities,
      unlocked: speechActivities >= 1,
      description: 'Echoes back your speech practice words with joyful chirps.',
      rarity: 'Common',
    },
    {
      id: 'lion',
      name: 'Golden Lion',
      emoji: '🦁',
      category: 'animal',
      requiredActivity: 'Total Activities',
      requiredCount: 15,
      currentCount: stats.totalActivities,
      unlocked: stats.totalActivities >= 12,
      description: 'Guards the ancient jungle temple and symbolizes bravery.',
      rarity: 'Legendary',
    },
    {
      id: 'monkey',
      name: 'Playful Monkey',
      emoji: '🐒',
      category: 'animal',
      requiredActivity: 'Flash Cards',
      requiredCount: 5,
      currentCount: flashcardActivities,
      unlocked: flashcardActivities >= 2,
      description: 'Swings across the tall trees grown from speech practice.',
      rarity: 'Common',
    },
    {
      id: 'butterfly_garden',
      name: 'Butterfly Garden',
      emoji: '🦋',
      category: 'wonder',
      requiredActivity: 'Matching Games',
      requiredCount: 2,
      currentCount: matchingGames,
      unlocked: matchingGames >= 1,
      description: 'A magical meadow where iridescent butterflies dance in the sun.',
      rarity: 'Common',
    },
    {
      id: 'deer',
      name: 'Forest Deer',
      emoji: '🦌',
      category: 'animal',
      requiredActivity: 'Speech Practice',
      requiredCount: 5,
      currentCount: speechActivities,
      unlocked: speechActivities >= 3,
      description: 'Grazes peacefully among blooming wildflowers and lush grass.',
      rarity: 'Rare',
    },
    {
      id: 'turtle_pond',
      name: 'Lotus Turtle Pond',
      emoji: '🐢',
      category: 'wonder',
      requiredActivity: 'Daily Streak',
      requiredCount: 5,
      currentCount: stats.dayStreak,
      unlocked: stats.dayStreak >= 4,
      description: 'A calm water pond created by your consistent daily streak.',
      rarity: 'Rare',
    },
    {
      id: 'peacock',
      name: 'Royal Peacock',
      emoji: '🦚',
      category: 'animal',
      requiredActivity: 'Reward Videos',
      requiredCount: 2,
      currentCount: rewardVideos,
      unlocked: rewardVideos >= 1,
      description: 'Displays brilliant feathers whenever a reward video is watched.',
      rarity: 'Rare',
    },
    {
      id: 'ancient_tree',
      name: 'Great Banyan Tree',
      emoji: '🌳',
      category: 'nature',
      requiredActivity: 'Speech Score',
      requiredCount: 80,
      currentCount: speechScore,
      unlocked: speechScore >= 75,
      description: 'The ancient heart of the jungle, growing taller with speech confidence.',
      rarity: 'Legendary',
    },
    {
      id: 'waterfall',
      name: 'Emerald Waterfall',
      emoji: '💦',
      category: 'wonder',
      requiredActivity: 'Daily Streak',
      requiredCount: 7,
      currentCount: stats.dayStreak,
      unlocked: stats.dayStreak >= 5,
      description: 'Cascades down ancient mossy rocks, fed by your continuous streak.',
      rarity: 'Legendary',
    },
    {
      id: 'temple',
      name: 'Sun Temple',
      emoji: '🏛',
      category: 'wonder',
      requiredActivity: 'XP Level',
      requiredCount: 300,
      currentCount: stats.xp,
      unlocked: stats.xp >= 250,
      description: 'Glows with gold runes when major therapy achievements are unlocked.',
      rarity: 'Mythic',
    },
    {
      id: 'rainbow',
      name: 'Prismatic Rainbow',
      emoji: '🌈',
      category: 'nature',
      requiredActivity: 'Motivation Score',
      requiredCount: 75,
      currentCount: motivationScore.score,
      unlocked: motivationScore.score >= 70,
      description: 'Arcs across the canopy during high motivation & joy.',
      rarity: 'Legendary',
    },
    {
      id: 'fireflies',
      name: 'Starlight Fireflies',
      emoji: '🌟',
      category: 'nature',
      requiredActivity: 'Stars Earned',
      requiredCount: 500,
      currentCount: stats.starsEarned,
      unlocked: stats.starsEarned >= 300,
      description: 'Illuminates the dark forest at dusk with dancing light points.',
      rarity: 'Common',
    },
  ]

  const animalsUnlockedCount = unlockables.filter((u) => u.category === 'animal' && u.unlocked).length
  const rareSpeciesCount = unlockables.filter((u) => (u.rarity === 'Legendary' || u.rarity === 'Mythic') && u.unlocked).length

  // Generate Transformation History log
  const transformationHistory = [
    {
      id: 't-1',
      time: '10 mins ago',
      trigger: 'Speech Practice Completed',
      effect: '3 Tall Mahogany Trees Grew & Forest Canopy Expanded',
      icon: '🌳',
    },
    {
      id: 't-2',
      time: '1 hour ago',
      trigger: 'Flash Cards Mastered',
      effect: '12 Golden Lotus Flowers Bloomed across River Bank',
      icon: '🌸',
    },
    {
      id: 't-3',
      time: 'Yesterday',
      trigger: '7-Day Therapy Streak Reached',
      effect: 'Emerald Waterfall & Flowing River Expanded',
      icon: '💦',
    },
    {
      id: 't-4',
      time: '2 days ago',
      trigger: 'Matching Game Champion',
      effect: 'Swarm of 8 Iridescent Butterflies Arrived',
      icon: '🦋',
    },
  ]

  return {
    healthScore,
    healthLevel,
    healthReasons,
    aiRecommendation,
    aiGuideSpeech,
    ecosystemLevel,
    forestAgeDays,
    totalTrees,
    flowersBloomed,
    butterfliesCount,
    birdsCount,
    waterfallsCount,
    ancientTemplesCount,
    firefliesCount,
    rareSpeciesCount,
    animalsUnlockedCount,
    riverExpansionPct,
    weatherState,
    unlockables,
    transformationHistory,
  }
}
