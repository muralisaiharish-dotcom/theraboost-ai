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
  name: string
  email: string
  avatar: string   // emoji avatar
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
