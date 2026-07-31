import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import type { UserInfo, AuthState, AuthAction } from '../types'

// ─── Demo credentials ─────────────────────────────────────────────────────────
const DEMO_USERS: Array<{ email: string; password: string; user: UserInfo }> = [
  {
    email: 'child@theraboost.ai',
    password: 'Thera123',
    user: {
      name: 'Rahul',
      email: 'child@theraboost.ai',
      avatar: '👦',
      level: 3,
      role: 'child',
      age: 8,
    },
  },
  {
    email: 'parent@theraboost.ai',
    password: 'Parent123',
    user: {
      name: 'Priya',
      email: 'parent@theraboost.ai',
      avatar: '👩',
      level: 1,
      role: 'parent',
    },
  },
]

const SESSION_KEY = 'theraboost_session'

// ─── Reducer ──────────────────────────────────────────────────────────────────
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, isAuthenticated: true, isLoading: false }
    case 'LOGOUT':
      return { user: null, isAuthenticated: false, isLoading: false }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      }
    default:
      return state
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────
interface AuthContextValue {
  state: AuthState
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  register: (info: Omit<UserInfo, 'level'> & { password: string }) => Promise<{ success: boolean; error?: string }>
  updateUser: (updates: Partial<UserInfo>) => void
  isChild: boolean
  isParent: boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

// ─── Provider ─────────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isLoading: true,
    isAuthenticated: false,
  })

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(SESSION_KEY)
      if (saved) {
        const user: UserInfo = JSON.parse(saved)
        dispatch({ type: 'LOGIN', payload: user })
      } else {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    } catch {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [])

  // ── Login ─────────────────────────────────────────────────────────────────
  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    dispatch({ type: 'SET_LOADING', payload: true })

    // Simulate network latency
    await new Promise((r) => setTimeout(r, 1200))

    const trimmed = email.trim().toLowerCase()
    const match = DEMO_USERS.find(
      (u) => u.email.toLowerCase() === trimmed && u.password === password
    )

    if (match) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(match.user))
      dispatch({ type: 'LOGIN', payload: match.user })
      return { success: true }
    } else {
      dispatch({ type: 'SET_LOADING', payload: false })
      return { success: false, error: 'Invalid email or password.' }
    }
  }

  // ── Register ──────────────────────────────────────────────────────────────
  const register = async (
    info: Omit<UserInfo, 'level'> & { password: string }
  ): Promise<{ success: boolean; error?: string }> => {
    dispatch({ type: 'SET_LOADING', payload: true })
    await new Promise((r) => setTimeout(r, 1000))

    const { password: _pwd, ...rest } = info
    const newUser: UserInfo = { ...rest, level: 1 }

    // Persist to localStorage (offline-first)
    const stored = JSON.parse(localStorage.getItem('theraboost_users') || '[]') as Array<UserInfo & { password: string }>
    const exists = stored.some((u) => u.email.toLowerCase() === info.email.toLowerCase())
    if (exists) {
      dispatch({ type: 'SET_LOADING', payload: false })
      return { success: false, error: 'An account with this email already exists.' }
    }

    stored.push({ ...newUser, password: _pwd })
    localStorage.setItem('theraboost_users', JSON.stringify(stored))
    localStorage.setItem(SESSION_KEY, JSON.stringify(newUser))
    dispatch({ type: 'LOGIN', payload: newUser })
    return { success: true }
  }

  // ── Logout ────────────────────────────────────────────────────────────────
  const logout = () => {
    localStorage.removeItem(SESSION_KEY)
    dispatch({ type: 'LOGOUT' })
  }

  // ── Update User ───────────────────────────────────────────────────────────
  const updateUser = (updates: Partial<UserInfo>) => {
    dispatch({ type: 'UPDATE_USER', payload: updates })
    if (state.user) {
      const updated = { ...state.user, ...updates }
      localStorage.setItem(SESSION_KEY, JSON.stringify(updated))
    }
  }

  const isChild = state.user?.role === 'child'
  const isParent = state.user?.role === 'parent'

  return (
    <AuthContext.Provider value={{ state, login, logout, register, updateUser, isChild, isParent }}>
      {children}
    </AuthContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
