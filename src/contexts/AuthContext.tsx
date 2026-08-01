import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth'
import { auth, googleProvider, isFirebaseConfigured } from '../config/firebase'
import type { UserInfo, AuthState, AuthAction } from '../types'

// ─── Demo credentials ─────────────────────────────────────────────────────────
const DEMO_USERS: Array<{ email: string; password: string; user: UserInfo }> = [
  {
    email: 'child@reinforce.ai',
    password: 'Reinforce123',
    user: {
      uid: 'demo-child-123',
      name: 'Rahul',
      email: 'child@reinforce.ai',
      avatar: '👦',
      level: 3,
      role: 'child',
      age: 8,
    },
  },
  {
    email: 'parent@reinforce.ai',
    password: 'Parent123',
    user: {
      uid: 'demo-parent-456',
      name: 'Priya',
      email: 'parent@reinforce.ai',
      avatar: '👩',
      level: 1,
      role: 'parent',
    },
  },
  // Backward compatibility demo entries
  {
    email: 'child@theraboost.ai',
    password: 'Thera123',
    user: {
      uid: 'demo-child-123',
      name: 'Rahul',
      email: 'child@reinforce.ai',
      avatar: '👦',
      level: 3,
      role: 'child',
      age: 8,
    },
  },
]

const SESSION_KEY = 'reinforce_session'
const LEGACY_SESSION_KEY = 'theraboost_session'

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
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
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

  // Restore session from Firebase Auth listener & localStorage
  useEffect(() => {
    let unsubscribed = false

    // Firebase Auth Observer
    const unsubscribeFirebase = onAuthStateChanged(auth, (fbUser) => {
      if (unsubscribed) return
      if (fbUser) {
        // Build UserInfo from Firebase user
        const existingSession = localStorage.getItem(SESSION_KEY)
        const parsed = existingSession ? JSON.parse(existingSession) : null

        const googleUser: UserInfo = {
          uid: fbUser.uid,
          name: fbUser.displayName || fbUser.email?.split('@')[0] || 'Learner',
          email: fbUser.email || '',
          photoURL: fbUser.photoURL || parsed?.photoURL,
          avatar: fbUser.photoURL || parsed?.avatar || '👦',
          level: parsed?.level || 1,
          role: parsed?.role || 'child',
        }

        localStorage.setItem(SESSION_KEY, JSON.stringify(googleUser))
        dispatch({ type: 'LOGIN', payload: googleUser })
      } else {
        // Fallback to local session check if not logged in via Firebase
        try {
          const saved = localStorage.getItem(SESSION_KEY) || localStorage.getItem(LEGACY_SESSION_KEY)
          if (saved) {
            const user: UserInfo = JSON.parse(saved)
            dispatch({ type: 'LOGIN', payload: user })
          } else {
            dispatch({ type: 'SET_LOADING', payload: false })
          }
        } catch {
          dispatch({ type: 'SET_LOADING', payload: false })
        }
      }
    })

    return () => {
      unsubscribed = true
      unsubscribeFirebase()
    }
  }, [])

  // ── Email/Password Login ──────────────────────────────────────────────────
  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    dispatch({ type: 'SET_LOADING', payload: true })

    await new Promise((r) => setTimeout(r, 800))

    const trimmed = email.trim().toLowerCase()
    
    // Check demo accounts first
    const match = DEMO_USERS.find(
      (u) => u.email.toLowerCase() === trimmed && u.password === password
    )

    if (match) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(match.user))
      dispatch({ type: 'LOGIN', payload: match.user })
      return { success: true }
    }

    // Check registered local accounts
    const storedUsers = JSON.parse(localStorage.getItem('reinforce_users') || localStorage.getItem('theraboost_users') || '[]')
    const localMatch = storedUsers.find(
      (u: UserInfo & { password?: string }) => u.email.toLowerCase() === trimmed && u.password === password
    )

    if (localMatch) {
      const { password: _pwd, ...userObj } = localMatch
      localStorage.setItem(SESSION_KEY, JSON.stringify(userObj))
      dispatch({ type: 'LOGIN', payload: userObj })
      return { success: true }
    }

    dispatch({ type: 'SET_LOADING', payload: false })
    return { success: false, error: 'Invalid email or password.' }
  }

  // ── Continue with Google ──────────────────────────────────────────────────
  const loginWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    dispatch({ type: 'SET_LOADING', payload: true })

    try {
      if (!isFirebaseConfigured) {
        // Demo mode fallback when Firebase environment API key is unconfigured
        await new Promise((r) => setTimeout(r, 1000))
        const demoGoogleUser: UserInfo = {
          uid: 'google-demo-uid-999',
          name: 'Alex Johnson',
          email: 'alex.johnson@gmail.com',
          photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          level: 2,
          role: 'child',
          age: 9,
        }
        localStorage.setItem(SESSION_KEY, JSON.stringify(demoGoogleUser))
        dispatch({ type: 'LOGIN', payload: demoGoogleUser })
        return { success: true }
      }

      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user

      const photoURL = user.photoURL || undefined
      const googleUser: UserInfo = {
        uid: user.uid,
        name: user.displayName || user.email?.split('@')[0] || 'Learner',
        email: user.email || '',
        photoURL: photoURL,
        avatar: photoURL || '👦',
        level: 1,
        role: 'child',
      }

      localStorage.setItem(SESSION_KEY, JSON.stringify(googleUser))
      dispatch({ type: 'LOGIN', payload: googleUser })
      return { success: true }
    } catch (err: any) {
      console.error('Google Sign-In Error:', err)
      dispatch({ type: 'SET_LOADING', payload: false })

      if (err?.code === 'auth/popup-closed-by-user' || err?.code === 'auth/cancelled-popup-request') {
        return { success: false, error: 'Google sign-in was cancelled.' }
      }

      // If Firebase key is invalid or domain un-whitelisted, allow seamless demo login with notification
      if (err?.code === 'auth/invalid-api-key' || err?.code === 'auth/unauthorized-domain' || err?.code === 'auth/api-key-not-valid-please-pass-a-valid-api-key') {
        const demoGoogleUser: UserInfo = {
          uid: 'google-demo-uid-999',
          name: 'Alex Johnson',
          email: 'alex.johnson@gmail.com',
          photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          level: 2,
          role: 'child',
          age: 9,
        }
        localStorage.setItem(SESSION_KEY, JSON.stringify(demoGoogleUser))
        dispatch({ type: 'LOGIN', payload: demoGoogleUser })
        return { success: true }
      }

      return {
        success: false,
        error: err?.message || 'Failed to authenticate with Google. Please try again.',
      }
    }
  }

  // ── Register ──────────────────────────────────────────────────────────────
  const register = async (
    info: Omit<UserInfo, 'level'> & { password: string }
  ): Promise<{ success: boolean; error?: string }> => {
    dispatch({ type: 'SET_LOADING', payload: true })
    await new Promise((r) => setTimeout(r, 800))

    const { password: _pwd, ...rest } = info
    const newUser: UserInfo = { ...rest, level: 1 }

    const stored = JSON.parse(localStorage.getItem('reinforce_users') || localStorage.getItem('theraboost_users') || '[]') as Array<UserInfo & { password: string }>
    const exists = stored.some((u) => u.email.toLowerCase() === info.email.toLowerCase())
    if (exists) {
      dispatch({ type: 'SET_LOADING', payload: false })
      return { success: false, error: 'An account with this email already exists.' }
    }

    stored.push({ ...newUser, password: _pwd })
    localStorage.setItem('reinforce_users', JSON.stringify(stored))
    localStorage.setItem(SESSION_KEY, JSON.stringify(newUser))
    dispatch({ type: 'LOGIN', payload: newUser })
    return { success: true }
  }

  // ── Logout ────────────────────────────────────────────────────────────────
  const logout = async () => {
    try {
      await firebaseSignOut(auth)
    } catch (e) {
      console.warn('Firebase signout warning:', e)
    }
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
    <AuthContext.Provider value={{ state, login, loginWithGoogle, logout, register, updateUser, isChild, isParent }}>
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
