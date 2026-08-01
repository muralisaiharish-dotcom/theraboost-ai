// ─── Core Domain Types ───────────────────────────────────────────────────────

export interface Flashcard {
  id: string
  word: string
  phonetic: string
  definition: string
  sentence: string
  category: string
  emoji: string
  bgColor: string
  borderColor: string
  illustrationKey: string
}

export interface Category {
  id: string
  name: string
  icon: string
  count: number
  color: string
  accentColor: string
  progress: number
}

// ─── User Role ───────────────────────────────────────────────────────────────

export type UserRole = 'child' | 'parent'

/**
 * Single source of truth for the authenticated user's identity.
 * Every component that displays the user's name/avatar must read from this.
 */
export interface UserInfo {
  uid?: string
  name: string
  email: string
  avatar: string   // emoji avatar or fallback
  photoURL?: string // Google profile picture URL
  level: number
  role: UserRole
  age?: number
}

// ─── Stats ───────────────────────────────────────────────────────────────────

export interface UserStats {
  cardsLearned: number
  starsEarned: number
  dayStreak: number
  sessionProgress: number
  coins: number
  xp: number
  totalActivities: number
  weeklyGoal: number
  weeklyCompleted: number
}

// ─── Skill Progress ───────────────────────────────────────────────────────────

export interface SkillProgress {
  pronunciation: number
  vocabulary: number
  fluency: number
  listening: number
  memory: number
  sentenceFormation: number
}

// ─── Notifications ────────────────────────────────────────────────────────────

export interface NotificationItem {
  id: string
  title: string
  body: string
  icon: string
  time: string
  read: boolean
  type: 'reminder' | 'reward' | 'achievement' | 'goal' | 'parent'
}

// ─── Rewards ─────────────────────────────────────────────────────────────────

export interface RewardItem {
  id: string
  title: string
  description: string
  icon: string
  cost: number  // stars needed to unlock
  unlocked: boolean
  category: 'avatar' | 'theme' | 'badge' | 'boost'
}

// ─── Weekly Chart Data ────────────────────────────────────────────────────────

export interface WeeklyDataPoint {
  day: string
  activities: number
  stars: number
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface AuthState {
  user: UserInfo | null
  isLoading: boolean
  isAuthenticated: boolean
}

export type AuthAction =
  | { type: 'LOGIN'; payload: UserInfo }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'UPDATE_USER'; payload: Partial<UserInfo> }

// ─── Smart Reinforcement Domain Types ──────────────────────────────────────────

export interface RewardHistoryEntry {
  id: string
  videoId?: string
  title: string
  category: 'Indian Culture' | 'Animals' | 'Nature' | 'Rhymes' | 'Educational Learning' | 'Motivational Kids Videos'
  starsEarned?: number
  watchDuration?: number // seconds
  watchCompletion?: number // 0 to 100 percentage
  timestamp: string
}

export interface ActivityLogEntry {
  id: string
  activityType: 'speech' | 'flashcard' | 'matching_game' | 'reward_video'
  title: string
  duration?: number // minutes
  score?: number    // accuracy / score 0-100
  starsEarned: number
  timestamp: string
}

export interface MotivationScore {
  score: number // 0 - 100
  level: 'Excellent' | 'Good' | 'Average' | 'Needs Motivation'
  levelColor: string
  trendPct: number
  suggestions: string[]
  computedAt: string
  breakdown: {
    streak: number
    sessionCompletion: number
    rewardResponse: number
    timeSpent: number
    speechPractice: number
    gamesCompleted: number
  }
}

export interface CategoryScoreItem {
  category: 'Indian Culture' | 'Animals' | 'Nature' | 'Rhymes' | 'Educational Learning' | 'Motivational Kids Videos'
  confidence: number
  reason: string
  videoTitle: string
  videoId: string
}

export interface AIRecommendation {
  category: 'Indian Culture' | 'Animals' | 'Nature' | 'Rhymes' | 'Educational Learning' | 'Motivational Kids Videos'
  confidence: number // 0-100%
  reason: string
  videoTitle: string
  videoId: string
  allScores?: CategoryScoreItem[]
  computedAt: string
}

export interface ScheduleEntry {
  id: string
  title: string
  subtitle: string
  skill: 'Speech Practice' | 'Flash Cards' | 'Matching Games' | 'Reward Videos'
  memoryStrength: 'Strong' | 'Medium' | 'Weak'
  time: string
  icon: string
  screen: string
  completed?: boolean
  aiGenerated?: boolean
  reason?: string
}

export interface AnalyticsData {
  mostEffectiveReward: string
  leastEffectiveReward: string
  favouriteCategory: string
  avgSessionTimeMinutes: number
  activitiesCompleted: number
  completionRate: number
  weeklyEngagement: number[]
  monthlyEngagement: number[]
  totalRewardsEarned: number
  totalStarsEarned: number
  mostWatchedVideos: Array<{ title: string; count: number; category: string }>
  speechAccuracyTrend: number[]
  learningTrend: number[]
  aiSummary: string
  aiInsights: string[]
  generatedAt: string
}

// ─── Magic Scanner Types ──────────────────────────────────────────────────────

export type MagicSymbolId = 'star' | 'smile' | 'music' | 'moon' | 'heart' | 'rainbow'

export interface MagicSymbolConfig {
  id: MagicSymbolId
  name: string
  symbol: string
  xp: number
  stars: number
  rewardText: string
  unlockedPerk?: string
  description: string
  badgeColor: string
  glowColor: string
}

export interface MagicScanLog {
  id: string
  symbolId: MagicSymbolId
  name: string
  symbol: string
  xpEarned: number
  starsEarned: number
  rewardText: string
  confidence: number
  timestamp: string
}


