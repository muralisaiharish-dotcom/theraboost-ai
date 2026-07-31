import { createContext, useContext, useReducer, ReactNode, useCallback, useMemo } from 'react'
import type {
  UserStats,
  WeeklyDataPoint,
  RewardHistoryEntry,
  ActivityLogEntry,
  MotivationScore,
  AIRecommendation,
} from '../types'
import { computeAIRecommendation } from '../engine/AIRecommendationEngine'
import { computeMotivationScore } from '../engine/MotivationEngine'
import { getRewardHistory, logRewardEvent } from '../engine/RewardTracker'
import { storageGet, storageSet, STORAGE_KEYS } from '../engine/storage'

// Helpers to load persisted progress from localStorage safely
function loadPersistedLearnedCards(): string[] {
  return storageGet<string[]>(STORAGE_KEYS.LEARNED_CARDS, [])
}

function loadPersistedCompletedCategories(): string[] {
  return storageGet<string[]>(STORAGE_KEYS.COMPLETED_CATEGORIES, [])
}

function loadPersistedActivityLog(): ActivityLogEntry[] {
  return storageGet<ActivityLogEntry[]>(STORAGE_KEYS.ACTIVITY_LOG, [])
}

function loadPersistedCompletedVideos(): string[] {
  return storageGet<string[]>(STORAGE_KEYS.COMPLETED_VIDEOS, [])
}

function loadPersistedUnlockedVideos(): string[] {
  return storageGet<string[]>(STORAGE_KEYS.UNLOCKED_VIDEOS, ['vid-culture-1']) // Default unlock first video
}

// ─── State ────────────────────────────────────────────────────────────────────
interface AppState {
  stats: UserStats
  activeScreen: string
  activeSubScreen: string | null
  notificationCount: number
  weeklyData: WeeklyDataPoint[]
  learnedCardIds: string[]
  completedCategoryIds: string[]
  rewardHistory: RewardHistoryEntry[]
  activityLog: ActivityLogEntry[]
  completedVideos: string[]
  unlockedVideoIds: string[]
  speechScore: number
}

type AppAction =
  | { type: 'SET_SCREEN'; payload: string }
  | { type: 'SET_SUB_SCREEN'; payload: string | null }
  | { type: 'ADD_STARS'; payload: number }
  | { type: 'ADD_COINS'; payload: number }
  | { type: 'ADD_XP'; payload: number }
  | { type: 'CARD_LEARNED' }
  | {
      type: 'MARK_CARD_LEARNED'
      payload: { cardId: string; category: string; allCategoryCardIds: string[] }
    }
  | { type: 'RESET_FLASHCARD_PROGRESS' }
  | { type: 'UPDATE_PROGRESS'; payload: number }
  | { type: 'MARK_NOTIFICATIONS_READ' }
  | { type: 'INCREMENT_STREAK' }
  | { type: 'LOG_ACTIVITY'; payload: Omit<ActivityLogEntry, 'id'> }
  | { type: 'LOG_REWARD'; payload: Omit<RewardHistoryEntry, 'id'> }
  | { type: 'UPDATE_SPEECH_SCORE'; payload: number }
  | { type: 'UNLOCK_VIDEO'; payload: { videoId: string; cost: number } }

const initialLearnedCards = loadPersistedLearnedCards()
const initialCompletedCategories = loadPersistedCompletedCategories()
const initialActivityLog = loadPersistedActivityLog()
const initialRewardHistory = getRewardHistory()
const initialCompletedVideos = loadPersistedCompletedVideos()
const initialUnlockedVideos = loadPersistedUnlockedVideos()

const initialStats: UserStats = {
  cardsLearned: initialLearnedCards.length,
  starsEarned: 1250 + initialLearnedCards.length * 15 + initialRewardHistory.reduce((s, r) => s + (r.starsEarned || 0), 0),
  dayStreak: 7,
  sessionProgress: Math.min(100, 65 + initialLearnedCards.length * 2),
  coins: 340,
  xp: 350 + initialLearnedCards.length * 10,
  totalActivities: 28 + initialActivityLog.length,
  weeklyGoal: 40,
  weeklyCompleted: Math.min(40, 28 + initialActivityLog.length),
}

const initialWeeklyData: WeeklyDataPoint[] = [
  { day: 'Mon', activities: 22, stars: 40 },
  { day: 'Tue', activities: 32, stars: 60 },
  { day: 'Wed', activities: 34, stars: 80 },
  { day: 'Thu', activities: 33, stars: 68 },
  { day: 'Fri', activities: 40, stars: 95 },
  { day: 'Sat', activities: 29, stars: 84 },
  { day: 'Sun', activities: 26, stars: 50 },
]

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_SCREEN':
      return { ...state, activeScreen: action.payload, activeSubScreen: null }
    case 'SET_SUB_SCREEN':
      return { ...state, activeSubScreen: action.payload }
    case 'ADD_STARS':
      return {
        ...state,
        stats: {
          ...state.stats,
          starsEarned: state.stats.starsEarned + action.payload,
          sessionProgress: Math.min(100, state.stats.sessionProgress + 2),
        },
      }
    case 'ADD_COINS':
      return {
        ...state,
        stats: { ...state.stats, coins: state.stats.coins + action.payload },
      }
    case 'ADD_XP':
      return {
        ...state,
        stats: { ...state.stats, xp: state.stats.xp + action.payload },
      }
    case 'CARD_LEARNED':
      return {
        ...state,
        stats: {
          ...state.stats,
          cardsLearned: state.stats.cardsLearned + 1,
          starsEarned: state.stats.starsEarned + 15,
          xp: state.stats.xp + 10,
          sessionProgress: Math.min(100, state.stats.sessionProgress + 5),
        },
      }
    case 'MARK_CARD_LEARNED': {
      const { cardId, category, allCategoryCardIds } = action.payload

      if (state.learnedCardIds.includes(cardId)) {
        return state
      }

      const updatedLearnedCardIds = [...state.learnedCardIds, cardId]
      storageSet(STORAGE_KEYS.LEARNED_CARDS, updatedLearnedCardIds)

      const isCategoryNowComplete =
        allCategoryCardIds.length > 0 &&
        allCategoryCardIds.every((id) => updatedLearnedCardIds.includes(id))

      const isCategoryFirstTimeComplete =
        isCategoryNowComplete && !state.completedCategoryIds.includes(category)

      let updatedCompletedCategories = state.completedCategoryIds
      if (isCategoryFirstTimeComplete) {
        updatedCompletedCategories = [...state.completedCategoryIds, category]
        storageSet(STORAGE_KEYS.COMPLETED_CATEGORIES, updatedCompletedCategories)
      }

      const starReward = 15 + (isCategoryFirstTimeComplete ? 50 : 0)
      const xpReward = 10 + (isCategoryFirstTimeComplete ? 30 : 0)

      // Also append to activity log
      const newActivity: ActivityLogEntry = {
        id: `card-${cardId}-${Date.now()}`,
        activityType: 'flashcard',
        title: `Flashcard Learned: ${cardId}`,
        starsEarned: starReward,
        timestamp: new Date().toISOString(),
      }
      const newLog = [...state.activityLog, newActivity]
      storageSet(STORAGE_KEYS.ACTIVITY_LOG, newLog)

      return {
        ...state,
        learnedCardIds: updatedLearnedCardIds,
        completedCategoryIds: updatedCompletedCategories,
        activityLog: newLog,
        stats: {
          ...state.stats,
          cardsLearned: updatedLearnedCardIds.length,
          starsEarned: state.stats.starsEarned + starReward,
          xp: state.stats.xp + xpReward,
          totalActivities: state.stats.totalActivities + 1,
          weeklyCompleted: Math.min(state.stats.weeklyGoal, state.stats.weeklyCompleted + 1),
          sessionProgress: Math.min(100, state.stats.sessionProgress + (isCategoryFirstTimeComplete ? 10 : 4)),
        },
      }
    }
    case 'RESET_FLASHCARD_PROGRESS': {
      storageSet(STORAGE_KEYS.LEARNED_CARDS, [])
      storageSet(STORAGE_KEYS.COMPLETED_CATEGORIES, [])

      return {
        ...state,
        learnedCardIds: [],
        completedCategoryIds: [],
        stats: {
          ...state.stats,
          cardsLearned: 0,
        },
      }
    }
    case 'UPDATE_PROGRESS':
      return {
        ...state,
        stats: {
          ...state.stats,
          sessionProgress: Math.min(100, action.payload),
        },
      }
    case 'MARK_NOTIFICATIONS_READ':
      return { ...state, notificationCount: 0 }
    case 'INCREMENT_STREAK':
      return {
        ...state,
        stats: { ...state.stats, dayStreak: state.stats.dayStreak + 1 },
      }
    case 'LOG_ACTIVITY': {
      const newEntry: ActivityLogEntry = {
        ...action.payload,
        id: `act-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      }
      const updatedLog = [...state.activityLog, newEntry]
      storageSet(STORAGE_KEYS.ACTIVITY_LOG, updatedLog)

      return {
        ...state,
        activityLog: updatedLog,
        stats: {
          ...state.stats,
          totalActivities: state.stats.totalActivities + 1,
          weeklyCompleted: Math.min(state.stats.weeklyGoal, state.stats.weeklyCompleted + 1),
          starsEarned: state.stats.starsEarned + (action.payload.starsEarned || 0),
          sessionProgress: Math.min(100, state.stats.sessionProgress + 5),
        },
      }
    }
    case 'LOG_REWARD': {
      const result = logRewardEvent(action.payload)
      if (!result.wasNew || !result.entry) {
        return state // Duplicate reward prevented!
      }

      const updatedHistory = [...state.rewardHistory, result.entry]
      const updatedCompletedVids = action.payload.videoId
        ? Array.from(new Set([...state.completedVideos, action.payload.videoId]))
        : state.completedVideos

      if (action.payload.videoId) {
        storageSet(STORAGE_KEYS.COMPLETED_VIDEOS, updatedCompletedVids)
      }

      return {
        ...state,
        rewardHistory: updatedHistory,
        completedVideos: updatedCompletedVids,
      }
    }
    case 'UPDATE_SPEECH_SCORE':
      return { ...state, speechScore: action.payload }
    case 'UNLOCK_VIDEO': {
      const { videoId, cost } = action.payload
      if (state.stats.starsEarned < cost || state.unlockedVideoIds.includes(videoId)) {
        return state
      }
      const updatedUnlocked = [...state.unlockedVideoIds, videoId]
      storageSet(STORAGE_KEYS.UNLOCKED_VIDEOS, updatedUnlocked)
      
      return {
        ...state,
        unlockedVideoIds: updatedUnlocked,
        stats: {
          ...state.stats,
          starsEarned: state.stats.starsEarned - cost,
        }
      }
    }
    default:
      return state
  }
}

// ─── Context Value Interface ──────────────────────────────────────────────────
interface AppContextValue {
  state: AppState
  motivationScore: MotivationScore
  aiRecommendation: AIRecommendation
  navigate: (screen: string) => void
  navigateSub: (screen: string | null) => void
  addStars: (n: number) => void
  addCoins: (n: number) => void
  addXP: (n: number) => void
  cardLearned: () => void
  markCardLearned: (cardId: string, category: string, allCategoryCardIds: string[]) => void
  resetFlashcardProgress: () => void
  isCardLearned: (cardId: string) => boolean
  isCategoryCompleted: (category: string) => boolean
  updateProgress: (n: number) => void
  markNotificationsRead: () => void
  logActivity: (entry: Omit<ActivityLogEntry, 'id'>) => void
  logReward: (entry: Omit<RewardHistoryEntry, 'id'>) => void
  updateSpeechScore: (score: number) => void
  unlockVideo: (videoId: string, cost: number) => void
}

const AppContext = createContext<AppContextValue | null>(null)

// ─── Provider ─────────────────────────────────────────────────────────────────
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, {
    stats: initialStats,
    activeScreen: 'Home',
    activeSubScreen: null,
    notificationCount: 3,
    weeklyData: initialWeeklyData,
    learnedCardIds: initialLearnedCards,
    completedCategoryIds: initialCompletedCategories,
    rewardHistory: initialRewardHistory,
    activityLog: initialActivityLog,
    completedVideos: initialCompletedVideos,
    unlockedVideoIds: initialUnlockedVideos,
    speechScore: 88,
  })

  // Dynamically calculated Motivation Score
  const motivationScore = useMemo(() => {
    return computeMotivationScore({
      dayStreak: state.stats.dayStreak,
      activityLog: state.activityLog,
      rewardHistory: state.rewardHistory,
      speechScore: state.speechScore,
      cardsLearned: state.stats.cardsLearned,
      starsEarned: state.stats.starsEarned,
      weeklyCompleted: state.stats.weeklyCompleted,
      weeklyGoal: state.stats.weeklyGoal,
    })
  }, [state.stats, state.activityLog, state.rewardHistory, state.speechScore])

  // Dynamically calculated AI Recommendation
  const aiRecommendation = useMemo(() => {
    return computeAIRecommendation({
      rewardHistory: state.rewardHistory,
      activityLog: state.activityLog,
      dayStreak: state.stats.dayStreak,
      speechScore: state.speechScore,
      completedVideos: state.completedVideos,
    })
  }, [state.rewardHistory, state.activityLog, state.stats.dayStreak, state.speechScore, state.completedVideos])

  const navigate = useCallback((screen: string) => dispatch({ type: 'SET_SCREEN', payload: screen }), [])
  const navigateSub = useCallback((screen: string | null) => dispatch({ type: 'SET_SUB_SCREEN', payload: screen }), [])
  const addStars = useCallback((n: number) => dispatch({ type: 'ADD_STARS', payload: n }), [])
  const addCoins = useCallback((n: number) => dispatch({ type: 'ADD_COINS', payload: n }), [])
  const addXP = useCallback((n: number) => dispatch({ type: 'ADD_XP', payload: n }), [])
  const cardLearned = useCallback(() => dispatch({ type: 'CARD_LEARNED' }), [])

  const markCardLearned = useCallback(
    (cardId: string, category: string, allCategoryCardIds: string[]) => {
      dispatch({
        type: 'MARK_CARD_LEARNED',
        payload: { cardId, category, allCategoryCardIds },
      })
    },
    []
  )

  const resetFlashcardProgress = useCallback(() => {
    dispatch({ type: 'RESET_FLASHCARD_PROGRESS' })
  }, [])

  const isCardLearned = useCallback(
    (cardId: string) => state.learnedCardIds.includes(cardId),
    [state.learnedCardIds]
  )

  const isCategoryCompleted = useCallback(
    (category: string) => state.completedCategoryIds.includes(category),
    [state.completedCategoryIds]
  )

  const updateProgress = useCallback((n: number) => dispatch({ type: 'UPDATE_PROGRESS', payload: n }), [])
  const markNotificationsRead = useCallback(() => dispatch({ type: 'MARK_NOTIFICATIONS_READ' }), [])

  const logActivity = useCallback((entry: Omit<ActivityLogEntry, 'id'>) => {
    dispatch({ type: 'LOG_ACTIVITY', payload: entry })
  }, [])

  const logReward = useCallback((entry: Omit<RewardHistoryEntry, 'id'>) => {
    dispatch({ type: 'LOG_REWARD', payload: entry })
  }, [])

  const updateSpeechScore = useCallback((score: number) => {
    dispatch({ type: 'UPDATE_SPEECH_SCORE', payload: score })
  }, [])

  const unlockVideo = useCallback((videoId: string, cost: number) => {
    dispatch({ type: 'UNLOCK_VIDEO', payload: { videoId, cost } })
  }, [])

  return (
    <AppContext.Provider
      value={{
        state,
        motivationScore,
        aiRecommendation,
        navigate,
        navigateSub,
        addStars,
        addCoins,
        addXP,
        cardLearned,
        markCardLearned,
        resetFlashcardProgress,
        isCardLearned,
        isCategoryCompleted,
        updateProgress,
        markNotificationsRead,
        logActivity,
        logReward,
        updateSpeechScore,
        unlockVideo,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useApp(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
