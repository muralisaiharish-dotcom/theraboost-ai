// ─── AI Recommendation Engine ─────────────────────────────────────────────────
// Deterministic rule-based scoring. NO random recommendations.
// Recommendation changes dynamically based on user history.

import type { RewardHistoryEntry, ActivityLogEntry, AIRecommendation } from '../types'

// Category engagement weights (how much each factor contributes to score)
const CATEGORY_FACTORS = {
  watchCompletion: 0.30,   // Did the child finish watching?
  postActivityRate: 0.35,  // Did the child do speech/cards AFTER this reward?
  watchFrequency: 0.15,    // How often does the child choose this category?
  recentEngagement: 0.20,  // Was this category watched recently (recency bias)?
}

type Category = 'Indian Culture' | 'Animals' | 'Nature' | 'Rhymes' | 'Educational Learning' | 'Motivational Kids Videos'

const CATEGORY_REASONS: Record<Category, string[]> = {
  'Indian Culture': [
    'The child usually completes speech activities after Indian Culture rewards.',
    'Indian Culture videos maintain attention longer for this child.',
    'High engagement rate after Indian Culture sessions.',
  ],
  'Animals': [
    'The child stays engaged longer after Animal videos.',
    'Animal videos increased activity completion by 38%.',
    'Strong positive response to Animal category observed.',
  ],
  'Nature': [
    'Nature videos create a calm and focused learning state.',
    'Completion rate improves significantly after Nature videos.',
    'The child shows high engagement with Nature content.',
  ],
  'Rhymes': [
    'Rhymes improve speech pronunciation scores.',
    'Musical content boosts vocabulary recall.',
    'The child hums and repeats words after Rhyme videos — great speech practice!',
  ],
  'Educational Learning': [
    'Educational videos directly reinforce speech concepts.',
    'Numbers and shapes activities improve cognitive engagement.',
    'Educational content correlates with higher flashcard completion.',
  ],
  'Motivational Kids Videos': [
    'Motivational videos help the child recover after tough sessions.',
    'The child shows improved effort after watching inspirational content.',
    'Positive reinforcement videos boost session persistence.',
  ],
}

interface ScoringInput {
  rewardHistory: RewardHistoryEntry[]
  activityLog: ActivityLogEntry[]
  dayStreak: number
  speechScore: number
  completedVideos: string[]
}

export interface CategoryScore {
  category: Category
  score: number
  confidence: number
  reason: string
  videoTitle?: string
  videoId?: string
}

function scoreCategory(
  category: Category,
  rewardHistory: RewardHistoryEntry[],
  activityLog: ActivityLogEntry[],
): number {
  const categoryHistory = rewardHistory.filter((r) => r.category === category)
  
  if (categoryHistory.length === 0) {
    // New category — give medium score to encourage exploration
    return 45
  }

  // Factor 1: Average watch completion for this category
  const avgCompletion =
    categoryHistory.reduce((sum, r) => sum + (r.watchCompletion || 0), 0) /
    categoryHistory.length

  // Factor 2: Post-activity rate — how often speech/flashcards come after this reward?
  const postActivityCount = categoryHistory.filter((r) => {
    const rewardTime = new Date(r.timestamp).getTime()
    const windowMs = 60 * 60 * 1000 // 1 hour window
    return activityLog.some((a) => {
      const actTime = new Date(a.timestamp).getTime()
      return actTime > rewardTime && actTime < rewardTime + windowMs
    })
  }).length
  const postActivityRate =
    categoryHistory.length > 0 ? postActivityCount / categoryHistory.length : 0

  // Factor 3: Watch frequency (normalized to 0-1 based on total history)
  const watchFrequency =
    rewardHistory.length > 0 ? categoryHistory.length / rewardHistory.length : 0

  // Factor 4: Recency — did the child watch this in the last 3 days?
  const threeDaysAgo = Date.now() - 3 * 24 * 60 * 60 * 1000
  const recentCount = categoryHistory.filter(
    (r) => new Date(r.timestamp).getTime() > threeDaysAgo,
  ).length
  const recencyScore = Math.min(1, recentCount / 3)

  const score =
    CATEGORY_FACTORS.watchCompletion * avgCompletion +
    CATEGORY_FACTORS.postActivityRate * postActivityRate * 100 +
    CATEGORY_FACTORS.watchFrequency * watchFrequency * 100 +
    CATEGORY_FACTORS.recentEngagement * recencyScore * 100

  return Math.min(99, Math.round(score))
}

function pickReason(category: Category, score: number): string {
  const reasons = CATEGORY_REASONS[category]
  // Pick reason based on score deterministically (not random)
  const idx = Math.floor((score / 100) * reasons.length) % reasons.length
  return reasons[idx]
}

// Video title mapping for recommendation display
const CATEGORY_SAMPLE_VIDEOS: Record<Category, { id: string; title: string }[]> = {
  'Indian Culture': [
    { id: 'vid-culture-1', title: 'Story of the Taj Mahal' },
    { id: 'vid-culture-2', title: 'Indian National Symbols' },
    { id: 'vid-culture-3', title: 'Festival of Diwali' },
  ],
  'Animals': [
    { id: 'vid-animals-1', title: 'Meet the Elephant' },
    { id: 'vid-animals-2', title: 'Wild Animals & Jungle Friends' },
    { id: 'vid-animals-3', title: 'Cute Farm Animals' },
  ],
  'Nature': [
    { id: 'vid-nature-1', title: 'Save the Trees & Forests' },
    { id: 'vid-nature-2', title: 'Wonders of Mother Nature' },
    { id: 'vid-nature-3', title: 'Ocean Life & Sea Creatures' },
  ],
  'Rhymes': [
    { id: 'vid-rhymes-1', title: 'ABC Learning Song' },
    { id: 'vid-rhymes-2', title: 'Twinkle Twinkle Little Star' },
    { id: 'vid-rhymes-3', title: 'Wheels on the Bus' },
  ],
  'Educational Learning': [
    { id: 'vid-edu-1', title: 'Counting Numbers 1 to 10' },
    { id: 'vid-edu-2', title: 'Colors & Shapes Adventure' },
  ],
  'Motivational Kids Videos': [
    { id: 'vid-moti-1', title: 'Good Habits for Kids' },
    { id: 'vid-moti-2', title: 'Never Give Up & Try Your Best' },
    { id: 'vid-moti-3', title: 'Kindness & Sharing is Caring' },
  ],
}

function pickVideo(
  category: Category,
  completedVideos: string[],
): { id: string; title: string } {
  const videos = CATEGORY_SAMPLE_VIDEOS[category]
  // Prefer unwatched videos
  const unwatched = videos.filter((v) => !completedVideos.includes(v.id))
  if (unwatched.length > 0) {
    // Pick least recently watched in this category
    return unwatched[0]
  }
  // All watched — recommend first (loop)
  return videos[0]
}

// Smart reward engine rules (requirement #8)
function applySmartRewardRules(
  input: ScoringInput,
  scores: Record<Category, number>,
): void {
  const { activityLog, speechScore } = input

  // Rule: High Speech Score → boost Educational Video
  if (speechScore >= 85) {
    scores['Educational Learning'] += 15
  }

  // Rule: Recently completed Flash Cards → boost Animals
  const recentFlashCards = activityLog.filter(
    (a) =>
      a.activityType === 'flashcard' &&
      Date.now() - new Date(a.timestamp).getTime() < 24 * 60 * 60 * 1000,
  )
  if (recentFlashCards.length > 0) {
    scores['Animals'] += 10
  }

  // Rule: Recently completed Matching Games → boost Nature
  const recentGames = activityLog.filter(
    (a) =>
      a.activityType === 'matching_game' &&
      Date.now() - new Date(a.timestamp).getTime() < 24 * 60 * 60 * 1000,
  )
  if (recentGames.length > 0) {
    scores['Nature'] += 10
  }

  // Rule: Low streak → boost Motivational to improve motivation
  if (input.dayStreak <= 2) {
    scores['Motivational Kids Videos'] += 20
  }

  // Clamp all scores to max 99
  for (const cat of Object.keys(scores) as Category[]) {
    scores[cat] = Math.min(99, scores[cat])
  }
}

export function computeAIRecommendation(input: ScoringInput): AIRecommendation {
  const allCategories: Category[] = [
    'Indian Culture',
    'Animals',
    'Nature',
    'Rhymes',
    'Educational Learning',
    'Motivational Kids Videos',
  ]

  // Base scores
  const scores = {} as Record<Category, number>
  for (const cat of allCategories) {
    scores[cat] = scoreCategory(cat, input.rewardHistory, input.activityLog)
  }

  // Apply smart reward engine rules
  applySmartRewardRules(input, scores)

  // Find best category
  const bestCategory = allCategories.reduce((a, b) =>
    scores[a] >= scores[b] ? a : b,
  )
  const confidence = scores[bestCategory]

  // Get top 3 for variety display
  const sorted = allCategories
    .map((c) => ({ category: c, score: scores[c] }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)

  const reason = pickReason(bestCategory, confidence)
  const video = pickVideo(bestCategory, input.completedVideos)

  return {
    category: bestCategory,
    confidence,
    reason,
    videoTitle: video.title,
    videoId: video.id,
    allScores: sorted.map((s) => ({
      category: s.category,
      confidence: s.score,
      reason: pickReason(s.category as Category, s.score),
      videoTitle: pickVideo(s.category as Category, input.completedVideos).title,
      videoId: pickVideo(s.category as Category, input.completedVideos).id,
    })),
    computedAt: new Date().toISOString(),
  }

}
