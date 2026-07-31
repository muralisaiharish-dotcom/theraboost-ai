// ─── Unified localStorage Storage Adapter ─────────────────────────────────────
// All keys are namespaced under 'theraboost_' prefix.
// This module is the single source of truth for all persistence.
// To swap to Firebase: replace read/write implementations here only.

const PREFIX = 'theraboost_'

function key(name: string): string {
  return `${PREFIX}${name}`
}

export function storageGet<T>(name: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key(name))
    if (raw === null) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function storageSet<T>(name: string, value: T): void {
  try {
    localStorage.setItem(key(name), JSON.stringify(value))
  } catch {
    // Quota exceeded or private mode — silently fail
  }
}

export function storageRemove(name: string): void {
  try {
    localStorage.removeItem(key(name))
  } catch {}
}

export function storageAppend<T>(name: string, item: T): void {
  const existing = storageGet<T[]>(name, [])
  storageSet(name, [...existing, item])
}

// ─── Named Storage Keys ───────────────────────────────────────────────────────
export const STORAGE_KEYS = {
  REWARD_HISTORY: 'reward_history',
  ACTIVITY_LOG: 'activity_log',
  MOTIVATION_SCORE: 'motivation_score',
  VIDEO_PROGRESS: 'video_progress',
  COMPLETED_VIDEOS: 'completed_videos',
  LEARNED_CARDS: 'learned_cards',
  COMPLETED_CATEGORIES: 'completed_categories',
  SESSION: 'session',
  USERS: 'users',
  AWARDED_REWARD_IDS: 'awarded_reward_ids',
  UNLOCKED_VIDEOS: 'unlocked_videos',
} as const
