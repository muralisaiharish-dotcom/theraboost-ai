import type { UserStats, ActivityLogEntry, MotivationScore } from '../types'
import { storageGet, storageSet, STORAGE_KEYS } from './storage'

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
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic'
}

export interface TransformationEvent {
  id: string
  timestamp: string
  timeAgo: string
  activity: string
  effect: string
  icon: string
  xpEarned: number
  starsEarned: number
  healthChange: string
}

export interface JungleEcosystemData {
  healthScore: number // 0 - 100
  healthLevel: 'Dead Forest' | 'Growing Forest' | 'Healthy Jungle' | 'Magical Rainforest'
  healthReasons: string[]
  aiRecommendation: string
  aiGuideSpeech: string
  ecosystemLevel: number
  ecosystemStageName: 'Seed' | 'Forest' | 'Jungle' | 'Rainforest' | 'Sacred Forest'
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
  transformationHistory: TransformationEvent[]
}

const JUNGLE_TRANSFORMATIONS_KEY = 'REINFORCE_AI_JUNGLE_TRANSFORMATIONS_V2'

export function getPersistedTransformations(): TransformationEvent[] {
  const stored = storageGet<TransformationEvent[]>(JUNGLE_TRANSFORMATIONS_KEY as unknown as STORAGE_KEYS, [])
  if (stored && stored.length > 0) return stored

  // Default initial transformation entries
  return [
    {
      id: 'tf-1',
      timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      timeAgo: '10 mins ago',
      activity: 'Speech Practice Completed',
      effect: '3 Mahogany Trees Grew & Canopy Expanded',
      icon: '🌳',
      xpEarned: 25,
      starsEarned: 15,
      healthChange: '+4%',
    },
    {
      id: 'tf-2',
      timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      timeAgo: '1 hour ago',
      activity: 'Flash Cards Mastered',
      effect: '12 Golden Orchids Bloomed across Valley',
      icon: '🌸',
      xpEarned: 20,
      starsEarned: 15,
      healthChange: '+3%',
    },
    {
      id: 'tf-3',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      timeAgo: 'Yesterday',
      activity: '7-Day Therapy Streak Reached',
      effect: 'Emerald Waterfall & River Expanded',
      icon: '💦',
      xpEarned: 50,
      starsEarned: 30,
      healthChange: '+8%',
    },
    {
      id: 'tf-4',
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      timeAgo: '2 days ago',
      activity: 'Matching Game Champion',
      effect: '8 Iridescent Butterflies Arrived',
      icon: '🦋',
      xpEarned: 30,
      starsEarned: 20,
      healthChange: '+5%',
    },
  ]
}

export function logJungleTransformation(event: Omit<TransformationEvent, 'id' | 'timestamp' | 'timeAgo'>) {
  const current = getPersistedTransformations()
  const newEntry: TransformationEvent = {
    ...event,
    id: `tf-${Date.now()}`,
    timestamp: new Date().toISOString(),
    timeAgo: 'Just now',
  }
  const updated = [newEntry, ...current].slice(0, 20) // Keep top 20
  storageSet(JUNGLE_TRANSFORMATIONS_KEY as unknown as STORAGE_KEYS, updated)
  return updated
}

export function computeJungleEcosystem(
  stats: UserStats,
  activityLog: ActivityLogEntry[],
  speechScore: number,
  learnedCardIds: string[],
  motivationScore: MotivationScore
): JungleEcosystemData {
  // Activity counts
  const speechActivities = activityLog.filter((a) => a.activityType === 'speech').length
  const flashcardActivities = activityLog.filter((a) => a.activityType === 'flashcard').length
  const matchingGames = activityLog.filter((a) => a.activityType === 'matching_game').length
  const rewardVideos = activityLog.filter((a) => a.activityType === 'reward_video').length

  // Ecosystem Stage & Level based on XP
  let ecosystemLevel = 1
  let ecosystemStageName: 'Seed' | 'Forest' | 'Jungle' | 'Rainforest' | 'Sacred Forest' = 'Seed'

  if (stats.xp >= 1000) {
    ecosystemLevel = 5
    ecosystemStageName = 'Sacred Forest'
  } else if (stats.xp >= 700) {
    ecosystemLevel = 4
    ecosystemStageName = 'Rainforest'
  } else if (stats.xp >= 400) {
    ecosystemLevel = 3
    ecosystemStageName = 'Jungle'
  } else if (stats.xp >= 200) {
    ecosystemLevel = 2
    ecosystemStageName = 'Forest'
  } else {
    ecosystemLevel = 1
    ecosystemStageName = 'Seed'
  }

  // Forest Age = Days active
  const forestAgeDays = Math.max(1, stats.dayStreak + Math.floor(stats.totalActivities / 3))

  // Dynamically computed Ecosystem Counts
  const totalTrees = Math.max(12, 10 + speechActivities * 3 + Math.floor(speechScore / 10))
  const flowersBloomed = Math.max(28, 25 + learnedCardIds.length * 4 + flashcardActivities * 5)
  const butterfliesCount = Math.max(8, 6 + matchingGames * 4 + (learnedCardIds.length >= 20 ? 10 : 0))
  const birdsCount = Math.max(5, 4 + rewardVideos * 3)
  const riverExpansionPct = Math.min(100, Math.max(35, stats.dayStreak * 12))
  const waterfallsCount = stats.dayStreak >= 7 ? 3 : Math.max(1, Math.floor(stats.dayStreak / 2))
  const ancientTemplesCount = ecosystemLevel >= 5 ? 3 : Math.max(1, Math.floor(stats.xp / 300))
  const firefliesCount = stats.starsEarned >= 100 ? Math.max(25, Math.floor(stats.starsEarned / 10)) : 12

  // Determine weather state based on motivation score
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

  // Jungle Health Score Calculation (0-100)
  // Health = Speech + Consistency + Streak + Motivation + Completed Activities + Reward Balance + AI Engagement
  const speechFactor = (speechScore / 100) * 20
  const streakFactor = Math.min(20, (stats.dayStreak / 7) * 20)
  const motivationFactor = (motivationScore.score / 100) * 20
  const activityFactor = Math.min(20, (stats.totalActivities / 30) * 20)
  const cardFactor = Math.min(20, (learnedCardIds.length / 20) * 20)

  const healthScore = Math.min(100, Math.round(speechFactor + streakFactor + motivationFactor + activityFactor + cardFactor))

  let healthLevel: 'Dead Forest' | 'Growing Forest' | 'Healthy Jungle' | 'Magical Rainforest' = 'Healthy Jungle'
  if (healthScore <= 30) {
    healthLevel = 'Dead Forest'
  } else if (healthScore <= 60) {
    healthLevel = 'Growing Forest'
  } else if (healthScore <= 80) {
    healthLevel = 'Healthy Jungle'
  } else {
    healthLevel = 'Magical Rainforest'
  }

  const healthReasons = [
    `• Speech Practice score is ${speechScore}% (${speechScore >= 80 ? 'Excellent' : 'Good'})`,
    `• Active Streak is ${stats.dayStreak} days (${stats.dayStreak >= 7 ? '7-Day Waterfalls Active' : 'Building Streak'})`,
    `• Motivation Score is ${motivationScore.score}% (${motivationScore.score >= 80 ? 'Radiant Rainbow Active' : 'Positive Trend'})`,
    `• Completed ${stats.totalActivities} Total Therapy Activities across Modules`,
  ]

  // AI Ecosystem Recommendation based on Weakest Module
  let aiRecommendation = ''
  if (speechScore < 75 || speechActivities < flashcardActivities) {
    aiRecommendation = 'Speech Practice needs attention. Complete 1 speech session to grow 3 tall mahogany trees!'
  } else if (learnedCardIds.length < 10) {
    aiRecommendation = 'Flash Cards module is lowest. Learn 2 more flash cards to bloom orchids across the forest!'
  } else if (motivationScore.score < 60) {
    aiRecommendation = 'Motivation is dipping. Watch a Smart Reward Video to bring sunshine and exotic birds!'
  } else if (stats.dayStreak < 7) {
    aiRecommendation = 'Keep your daily streak going for 7 days to unlock the Emerald Waterfall 💦!'
  } else {
    aiRecommendation = 'Complete 1 more Matching Game to attract a gentle Elephant 🐘 to your river bank!'
  }

  // Dynamic AI Nature Guide Message
  let aiGuideSpeech = ''
  if (speechScore >= 85) {
    aiGuideSpeech = `Sensational job! Your speech confidence reached ${speechScore}% today, causing your forest canopy to expand with 3 new majestic trees!`
  } else if (learnedCardIds.length >= 10) {
    aiGuideSpeech = `Fantastic effort! You've mastered ${learnedCardIds.length} flashcards, filling the valley floor with vibrant blooming flowers.`
  } else if (stats.dayStreak >= 5) {
    aiGuideSpeech = `Your ${stats.dayStreak}-day streak has widened the jungle river and brought crystal water flowing through your ecosystem!`
  } else {
    aiGuideSpeech = `Welcome to your personal living jungle! Every therapy activity you complete will directly grow trees, bloom flowers, and attract wildlife.`
  }

  // 13 Unlockable Species & Wonders with Exact Requirements
  const unlockables: UnlockableItem[] = [
    {
      id: 'elephant',
      name: 'Gentle Elephant',
      emoji: '🐘',
      category: 'animal',
      requiredActivity: '3 Matching Games',
      requiredCount: 3,
      currentCount: matchingGames,
      unlocked: matchingGames >= 3,
      description: 'Loves drinking at the expanding river bank during high streaks.',
      rarity: 'Epic',
    },
    {
      id: 'monkey',
      name: 'Playful Monkey',
      emoji: '🐒',
      category: 'animal',
      requiredActivity: '5 Flash Cards',
      requiredCount: 5,
      currentCount: learnedCardIds.length,
      unlocked: learnedCardIds.length >= 5,
      description: 'Swings across the tall trees grown from speech practice.',
      rarity: 'Common',
    },
    {
      id: 'lion',
      name: 'Golden Lion',
      emoji: '🦁',
      category: 'animal',
      requiredActivity: '100 Total Activities',
      requiredCount: 100,
      currentCount: stats.totalActivities,
      unlocked: stats.totalActivities >= 100,
      description: 'Guards the sacred forest temple and symbolizes immense bravery.',
      rarity: 'Legendary',
    },
    {
      id: 'parrot',
      name: 'Jungle Parrot',
      emoji: '🦜',
      category: 'animal',
      requiredActivity: '90% Speech Accuracy',
      requiredCount: 90,
      currentCount: speechScore,
      unlocked: speechScore >= 90,
      description: 'Echoes back your speech practice words with joyful chirps.',
      rarity: 'Rare',
    },
    {
      id: 'peacock',
      name: 'Royal Peacock',
      emoji: '🦚',
      category: 'animal',
      requiredActivity: '5 Reward Videos',
      requiredCount: 5,
      currentCount: rewardVideos,
      unlocked: rewardVideos >= 5,
      description: 'Displays brilliant feathers whenever reward videos are enjoyed.',
      rarity: 'Rare',
    },
    {
      id: 'butterflies',
      name: 'Butterfly Haven',
      emoji: '🦋',
      category: 'wonder',
      requiredActivity: '20 Flash Cards',
      requiredCount: 20,
      currentCount: learnedCardIds.length,
      unlocked: learnedCardIds.length >= 20,
      description: 'A magical meadow where iridescent butterflies dance in the sun.',
      rarity: 'Common',
    },
    {
      id: 'ancient_temple',
      name: 'Ancient Sun Temple',
      emoji: '🏛',
      category: 'wonder',
      requiredActivity: 'Level 5 (Sacred Forest)',
      requiredCount: 5,
      currentCount: ecosystemLevel,
      unlocked: ecosystemLevel >= 5,
      description: 'Glows with gold runes when major therapy achievements are unlocked.',
      rarity: 'Mythic',
    },
    {
      id: 'waterfall',
      name: 'Emerald Waterfall',
      emoji: '💦',
      category: 'wonder',
      requiredActivity: '7-Day Streak',
      requiredCount: 7,
      currentCount: stats.dayStreak,
      unlocked: stats.dayStreak >= 7,
      description: 'Cascades down ancient mossy rocks, fed by your continuous streak.',
      rarity: 'Legendary',
    },
    {
      id: 'rainbow',
      name: 'Prismatic Rainbow',
      emoji: '🌈',
      category: 'nature',
      requiredActivity: 'Motivation > 90',
      requiredCount: 90,
      currentCount: motivationScore.score,
      unlocked: motivationScore.score >= 90,
      description: 'Arcs across the canopy during peak motivation & joy.',
      rarity: 'Epic',
    },
    {
      id: 'fireflies',
      name: 'Starlight Fireflies',
      emoji: '🌟',
      category: 'nature',
      requiredActivity: '100 Stars Earned',
      requiredCount: 100,
      currentCount: stats.starsEarned,
      unlocked: stats.starsEarned >= 100,
      description: 'Illuminates the dark forest at dusk with dancing light points.',
      rarity: 'Common',
    },
    {
      id: 'ancient_tree',
      name: 'Great Banyan Tree',
      emoji: '🌳',
      category: 'nature',
      requiredActivity: '50 Speech Sessions',
      requiredCount: 50,
      currentCount: speechActivities,
      unlocked: speechActivities >= 50,
      description: 'The ancient heart of the jungle, growing taller with speech practice.',
      rarity: 'Mythic',
    },
  ]

  const transformationHistory = getPersistedTransformations()

  const animalsUnlockedCount = unlockables.filter((u) => u.category === 'animal' && u.unlocked).length
  const rareSpeciesCount = unlockables.filter((u) => (u.rarity === 'Epic' || u.rarity === 'Legendary' || u.rarity === 'Mythic') && u.unlocked).length

  return {
    healthScore,
    healthLevel,
    healthReasons,
    aiRecommendation,
    aiGuideSpeech,
    ecosystemLevel,
    ecosystemStageName,
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
