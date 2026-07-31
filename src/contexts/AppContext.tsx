import { createContext, useContext, useReducer, ReactNode, useCallback } from 'react'
import type { UserStats, WeeklyDataPoint } from '../types'

// ─── State ────────────────────────────────────────────────────────────────────
interface AppState {
  stats: UserStats
  activeScreen: string
  activeSubScreen: string | null
  notificationCount: number
  weeklyData: WeeklyDataPoint[]
}

type AppAction =
  | { type: 'SET_SCREEN'; payload: string }
  | { type: 'SET_SUB_SCREEN'; payload: string | null }
  | { type: 'ADD_STARS'; payload: number }
  | { type: 'ADD_COINS'; payload: number }
  | { type: 'ADD_XP'; payload: number }
  | { type: 'CARD_LEARNED' }
  | { type: 'UPDATE_PROGRESS'; payload: number }
  | { type: 'MARK_NOTIFICATIONS_READ' }
  | { type: 'INCREMENT_STREAK' }

const initialStats: UserStats = {
  cardsLearned: 12,
  starsEarned: 1250,
  dayStreak: 7,
  sessionProgress: 65,
  coins: 340,
  xp: 350,
  totalActivities: 28,
  weeklyGoal: 40,
  weeklyCompleted: 28,
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
    default:
      return state
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────
interface AppContextValue {
  state: AppState
  navigate: (screen: string) => void
  navigateSub: (screen: string | null) => void
  addStars: (n: number) => void
  addCoins: (n: number) => void
  addXP: (n: number) => void
  cardLearned: () => void
  updateProgress: (n: number) => void
  markNotificationsRead: () => void
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
  })

  const navigate = useCallback((screen: string) => dispatch({ type: 'SET_SCREEN', payload: screen }), [])
  const navigateSub = useCallback((screen: string | null) => dispatch({ type: 'SET_SUB_SCREEN', payload: screen }), [])
  const addStars = useCallback((n: number) => dispatch({ type: 'ADD_STARS', payload: n }), [])
  const addCoins = useCallback((n: number) => dispatch({ type: 'ADD_COINS', payload: n }), [])
  const addXP = useCallback((n: number) => dispatch({ type: 'ADD_XP', payload: n }), [])
  const cardLearned = useCallback(() => dispatch({ type: 'CARD_LEARNED' }), [])
  const updateProgress = useCallback((n: number) => dispatch({ type: 'UPDATE_PROGRESS', payload: n }), [])
  const markNotificationsRead = useCallback(() => dispatch({ type: 'MARK_NOTIFICATIONS_READ' }), [])

  return (
    <AppContext.Provider
      value={{
        state,
        navigate,
        navigateSub,
        addStars,
        addCoins,
        addXP,
        cardLearned,
        updateProgress,
        markNotificationsRead,
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
