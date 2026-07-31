// ─── Reward Tracker ───────────────────────────────────────────────────────────
// Tracks every reward event. Prevents duplicate stars/XP.
// Maintains full history with statistics.

import type { RewardHistoryEntry } from '../types'
import { storageGet, storageSet, STORAGE_KEYS } from './storage'

// Returns all reward history
export function getRewardHistory(): RewardHistoryEntry[] {
  return storageGet<RewardHistoryEntry[]>(STORAGE_KEYS.REWARD_HISTORY, [])
}

// Returns set of video IDs that have already been awarded
export function getAwardedVideoIds(): Set<string> {
  return new Set(storageGet<string[]>(STORAGE_KEYS.AWARDED_REWARD_IDS, []))
}

// Check if a specific video reward has already been awarded (dedup)
export function isRewardAlreadyAwarded(videoId: string): boolean {
  return getAwardedVideoIds().has(videoId)
}

// Log a new reward event — idempotent (will not add duplicate if already awarded)
export function logRewardEvent(entry: Omit<RewardHistoryEntry, 'id'>): {
  wasNew: boolean
  entry: RewardHistoryEntry | null
} {
  // Prevent duplicate awards for the same video
  if (entry.videoId && isRewardAlreadyAwarded(entry.videoId)) {
    return { wasNew: false, entry: null }
  }

  const newEntry: RewardHistoryEntry = {
    ...entry,
    id: `reward-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  }

  // Append to history
  const history = getRewardHistory()
  storageSet(STORAGE_KEYS.REWARD_HISTORY, [...history, newEntry])

  // Mark videoId as awarded (dedup store)
  if (entry.videoId) {
    const awarded = storageGet<string[]>(STORAGE_KEYS.AWARDED_REWARD_IDS, [])
    storageSet(STORAGE_KEYS.AWARDED_REWARD_IDS, [...awarded, entry.videoId])
  }

  return { wasNew: true, entry: newEntry }
}

// Statistics
export function getRewardStatsByCategory(): Record<string, {
  count: number
  totalStars: number
  avgCompletion: number
}> {
  const history = getRewardHistory()
  const stats: Record<string, { count: number; totalStars: number; avgCompletion: number }> = {}

  for (const entry of history) {
    if (!stats[entry.category]) {
      stats[entry.category] = { count: 0, totalStars: 0, avgCompletion: 0 }
    }
    stats[entry.category].count++
    stats[entry.category].totalStars += (entry.starsEarned || 0)
    stats[entry.category].avgCompletion =
      (stats[entry.category].avgCompletion * (stats[entry.category].count - 1) +
        (entry.watchCompletion || 100)) /
      stats[entry.category].count
  }

  return stats
}

export function getMostWatchedCategory(): string | null {
  const stats = getRewardStatsByCategory()
  const categories = Object.entries(stats)
  if (categories.length === 0) return null
  return categories.sort((a, b) => b[1].count - a[1].count)[0][0]
}

export function getLeastWatchedCategory(): string | null {
  const stats = getRewardStatsByCategory()
  const categories = Object.entries(stats)
  if (categories.length === 0) return null
  return categories.sort((a, b) => a[1].count - b[1].count)[0][0]
}

export function getMostEffectiveCategory(
  activityLog: import('../types').ActivityLogEntry[],
): string | null {
  const history = getRewardHistory()
  if (history.length === 0) return null

  // Effectiveness = how often activities follow this reward within 1 hour
  const effectiveness: Record<string, { rewards: number; followedByActivity: number }> = {}

  for (const reward of history) {
    if (!effectiveness[reward.category]) {
      effectiveness[reward.category] = { rewards: 0, followedByActivity: 0 }
    }
    effectiveness[reward.category].rewards++

    const rewardTime = new Date(reward.timestamp).getTime()
    const hasFollow = activityLog.some((a) => {
      const actTime = new Date(a.timestamp).getTime()
      return actTime > rewardTime && actTime < rewardTime + 60 * 60 * 1000
    })
    if (hasFollow) effectiveness[reward.category].followedByActivity++
  }

  const rates = Object.entries(effectiveness).map(([cat, data]) => ({
    cat,
    rate: data.rewards > 0 ? data.followedByActivity / data.rewards : 0,
  }))

  if (rates.length === 0) return null
  return rates.sort((a, b) => b.rate - a.rate)[0].cat
}

export function getTotalRewardEarned(): { count: number; totalStars: number } {
  const history = getRewardHistory()
  return {
    count: history.length,
    totalStars: history.reduce((sum, r) => sum + (r.starsEarned || 0), 0),
  }
}

export function getRecentRewards(limit = 10): RewardHistoryEntry[] {
  return getRewardHistory()
    .slice()
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit)
}
