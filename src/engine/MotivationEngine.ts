// ─── Motivation Engine ────────────────────────────────────────────────────────
// Calculates a real-time motivation score from multiple activity signals.

import type { MotivationScore, ActivityLogEntry, RewardHistoryEntry } from '../types'

interface MotivationInput {
  dayStreak: number
  activityLog: ActivityLogEntry[]
  rewardHistory: RewardHistoryEntry[]
  speechScore: number
  cardsLearned: number
  starsEarned: number
  weeklyCompleted: number
  weeklyGoal: number
}

const WEIGHTS = {
  streak: 0.20,
  sessionCompletion: 0.20,
  rewardResponse: 0.20,
  timeSpent: 0.15,
  speechPractice: 0.15,
  gamesCompleted: 0.10,
}

function getLevel(score: number): MotivationScore['level'] {
  if (score >= 80) return 'Excellent'
  if (score >= 60) return 'Good'
  if (score >= 40) return 'Average'
  return 'Needs Motivation'
}

function getLevelColor(level: MotivationScore['level']): string {
  switch (level) {
    case 'Excellent': return '#10B981'
    case 'Good': return '#3B82F6'
    case 'Average': return '#F59E0B'
    case 'Needs Motivation': return '#EF4444'
  }
}

function buildSuggestions(score: number, input: MotivationInput): string[] {
  const suggestions: string[] = []
  const { dayStreak, speechScore, activityLog, weeklyCompleted, weeklyGoal } = input

  if (dayStreak < 3) {
    suggestions.push('Try to practice 3 days in a row to build your streak! 🔥')
  }
  if (speechScore < 80) {
    suggestions.push('More speech practice sessions will boost your pronunciation score.')
  }
  if (weeklyCompleted < weeklyGoal * 0.5) {
    suggestions.push(`You're ${weeklyGoal - weeklyCompleted} activities away from your weekly goal! 🎯`)
  }

  const recentSpeech = activityLog.filter(
    (a) => a.activityType === 'speech' &&
    Date.now() - new Date(a.timestamp).getTime() < 2 * 24 * 60 * 60 * 1000,
  )
  if (recentSpeech.length === 0) {
    suggestions.push('Try a short Speech Practice session — even 5 minutes helps! 🎙️')
  }

  if (score < 60) {
    suggestions.push('Watch a motivational reward video to boost your energy! 🌈')
    suggestions.push('Remember: every word practiced is a step forward! ⭐')
  }

  if (suggestions.length === 0) {
    suggestions.push('Amazing work! Keep up the great learning momentum! 🌟')
    suggestions.push('You\'re on fire! Try unlocking a new video category today! 🚀')
  }

  return suggestions.slice(0, 3)
}

export function computeMotivationScore(input: MotivationInput): MotivationScore {
  const now = Date.now()
  const oneDayMs = 24 * 60 * 60 * 1000
  const sevenDaysMs = 7 * oneDayMs

  // Factor 1: Streak (0-100)
  const streakScore = Math.min(100, (input.dayStreak / 14) * 100)

  // Factor 2: Session completion rate this week (0-100)
  const completionScore = Math.min(
    100,
    (input.weeklyCompleted / Math.max(1, input.weeklyGoal)) * 100,
  )

  // Factor 3: Reward response — did activities happen after rewards? (0-100)
  const rewardTriggeredActivities = input.rewardHistory.filter((r) => {
    const rewardTime = new Date(r.timestamp).getTime()
    return input.activityLog.some((a) => {
      const actTime = new Date(a.timestamp).getTime()
      return actTime > rewardTime && actTime < rewardTime + 2 * 60 * 60 * 1000
    })
  }).length
  const rewardResponseScore =
    input.rewardHistory.length > 0
      ? Math.min(100, (rewardTriggeredActivities / input.rewardHistory.length) * 100)
      : 50

  // Factor 4: Time spent (activities in last 7 days, 0-100)
  const recentActivities = input.activityLog.filter(
    (a) => now - new Date(a.timestamp).getTime() < sevenDaysMs,
  ).length
  const timeSpentScore = Math.min(100, (recentActivities / 20) * 100)

  // Factor 5: Speech practice frequency (0-100)
  const speechSessions = input.activityLog.filter(
    (a) =>
      a.activityType === 'speech' &&
      now - new Date(a.timestamp).getTime() < sevenDaysMs,
  ).length
  const speechScore = Math.min(100, (speechSessions / 5) * 100)

  // Factor 6: Games completed this week (0-100)
  const gamesThisWeek = input.activityLog.filter(
    (a) =>
      a.activityType === 'matching_game' &&
      now - new Date(a.timestamp).getTime() < sevenDaysMs,
  ).length
  const gamesScore = Math.min(100, (gamesThisWeek / 5) * 100)

  // Weighted sum
  const totalScore = Math.round(
    WEIGHTS.streak * streakScore +
    WEIGHTS.sessionCompletion * completionScore +
    WEIGHTS.rewardResponse * rewardResponseScore +
    WEIGHTS.timeSpent * timeSpentScore +
    WEIGHTS.speechPractice * speechScore +
    WEIGHTS.gamesCompleted * gamesScore,
  )

  const level = getLevel(totalScore)

  // Trend: compare to 3 days ago estimate
  const olderActivities = input.activityLog.filter(
    (a) =>
      now - new Date(a.timestamp).getTime() > 3 * oneDayMs &&
      now - new Date(a.timestamp).getTime() < 7 * oneDayMs,
  ).length
  const recentCount = input.activityLog.filter(
    (a) => now - new Date(a.timestamp).getTime() < 3 * oneDayMs,
  ).length
  const trendPct =
    olderActivities > 0
      ? Math.round(((recentCount - olderActivities) / olderActivities) * 100)
      : 0

  const suggestions = buildSuggestions(totalScore, input)

  return {
    score: totalScore,
    level,
    levelColor: getLevelColor(level),
    trendPct,
    suggestions,
    computedAt: new Date().toISOString(),
    breakdown: {
      streak: Math.round(streakScore),
      sessionCompletion: Math.round(completionScore),
      rewardResponse: Math.round(rewardResponseScore),
      timeSpent: Math.round(timeSpentScore),
      speechPractice: Math.round(speechScore),
      gamesCompleted: Math.round(gamesScore),
    },
  }
}
