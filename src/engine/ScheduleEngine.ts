// ─── Schedule Engine ──────────────────────────────────────────────────────────
// Generates personalized schedules based on performance history, skill gaps,
// and favourite reward categories. Tomorrow's schedule adapts based on today.

import type { ActivityLogEntry, RewardHistoryEntry, ScheduleEntry } from '../types'

type Skill = 'Speech Practice' | 'Flash Cards' | 'Matching Games' | 'Reward Videos'

interface ScheduleInput {
  activityLog: ActivityLogEntry[]
  rewardHistory: RewardHistoryEntry[]
  speechScore: number
  cardsLearned: number
  dayStreak: number
  preferredCategory?: string
  weeklyCompleted: number
  weeklyGoal: number
}

type Priority = 'Strong' | 'Medium' | 'Weak'

function getSkillPriority(
  skill: Skill,
  activityLog: ActivityLogEntry[],
  speechScore: number,
): Priority {
  const oneDayMs = 24 * 60 * 60 * 1000
  const threeDaysMs = 3 * oneDayMs
  const now = Date.now()

  switch (skill) {
    case 'Speech Practice': {
      const recentSpeech = activityLog.filter(
        (a) => a.activityType === 'speech' && now - new Date(a.timestamp).getTime() < threeDaysMs,
      ).length
      if (speechScore >= 85 && recentSpeech >= 2) return 'Strong'
      if (speechScore >= 70 || recentSpeech >= 1) return 'Medium'
      return 'Weak'
    }
    case 'Flash Cards': {
      const recentCards = activityLog.filter(
        (a) => a.activityType === 'flashcard' && now - new Date(a.timestamp).getTime() < threeDaysMs,
      ).length
      if (recentCards >= 3) return 'Strong'
      if (recentCards >= 1) return 'Medium'
      return 'Weak'
    }
    case 'Matching Games': {
      const recentGames = activityLog.filter(
        (a) => a.activityType === 'matching_game' && now - new Date(a.timestamp).getTime() < threeDaysMs,
      ).length
      if (recentGames >= 2) return 'Strong'
      if (recentGames >= 1) return 'Medium'
      return 'Weak'
    }
    case 'Reward Videos':
      return 'Strong'
  }
}

function getTimeSlot(index: number, todayOrTomorrow: 'today' | 'tomorrow'): string {
  const slots = todayOrTomorrow === 'today'
    ? ['09:30 AM', '11:00 AM', '02:00 PM', '04:30 PM', '07:00 PM']
    : ['10:00 AM', '12:00 PM', '03:00 PM', '05:30 PM', '07:30 PM']
  return slots[index % slots.length]
}

function buildScheduleEntry(
  skill: Skill,
  priority: Priority,
  timeSlot: string,
  rewardCategory: string,
  index: number,
): ScheduleEntry {
  const subtitleMap: Record<Skill, string[]> = {

    'Speech Practice': [
      'Practice 15 words from your weak list',
      'Focus on pronunciation with new vocabulary',
      'Review sentences you found difficult',
      'Short 5-min speaking exercise',
    ],
    'Flash Cards': [
      'Animals & Nature category',
      'Transport & Vehicles',
      'Fruits, Colors & Shapes',
      'Review last session\'s cards',
    ],
    'Matching Games': [
      'Match shapes and patterns',
      'Color and object pairs',
      'Number matching challenge',
      'Sound-image matching',
    ],
    'Reward Videos': [
      `Watch ${rewardCategory} video — you earned it!`,
      'Fun reward for completing activities',
      `Your favourite: ${rewardCategory}`,
      'Relax and enjoy your reward!',
    ],
  }

  const iconMap: Record<Skill, string> = {
    'Speech Practice': '🎙️',
    'Flash Cards': '🃏',
    'Matching Games': '🧩',
    'Reward Videos': '🎬',
  }

  const subtitle = subtitleMap[skill][index % subtitleMap[skill].length]

  return {
    id: `${skill.toLowerCase().replace(/ /g, '-')}-${Date.now()}-${index}`,
    title: priority === 'Weak' ? `${skill} – Focus Session` : skill,
    subtitle,
    skill,
    memoryStrength: priority,
    time: timeSlot,
    icon: iconMap[skill],
    screen: skill,
    aiGenerated: true,
    reason: priority === 'Weak'
      ? `${skill} hasn't been practiced recently — this is today's priority.`
      : priority === 'Medium'
      ? `Good consistency in ${skill} — keep the momentum!`
      : `You're excelling at ${skill}! Quick review session.`,
  }
}

export function generateSchedule(
  input: ScheduleInput,
  day: 'Today' | 'Tomorrow' | 'This Week',
): ScheduleEntry[] {
  const skills: Skill[] = ['Speech Practice', 'Flash Cards', 'Matching Games', 'Reward Videos']
  const todayOrTomorrow = day === 'Today' ? 'today' : 'tomorrow'

  // For "This Week" — create a 5-day plan
  if (day === 'This Week') {
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    return weekDays.flatMap((dayName, dayIdx) => {
      const daySkills: Skill[] = dayIdx % 2 === 0
        ? ['Speech Practice', 'Flash Cards', 'Reward Videos']
        : ['Matching Games', 'Flash Cards', 'Reward Videos']
      return daySkills.map((skill, i) => ({
        ...buildScheduleEntry(
          skill,
          getSkillPriority(skill, input.activityLog, input.speechScore),
          `${dayName} – ${['10:00 AM', '02:00 PM', '07:00 PM'][i]}`,
          input.preferredCategory || 'Animals',
          i,
        ),
        id: `week-${dayName}-${i}`,
      }))
    })
  }

  // Sort skills by priority — weakest skills get earlier time slots
  const prioritized = skills
    .map((skill) => ({
      skill,
      priority: getSkillPriority(skill, input.activityLog, input.speechScore),
    }))
    .sort((a, b) => {
      const order: Record<Priority, number> = { Weak: 0, Medium: 1, Strong: 2 }
      // Reward Videos always last
      if (a.skill === 'Reward Videos') return 1
      if (b.skill === 'Reward Videos') return -1
      return order[a.priority] - order[b.priority]
    })

  return prioritized.map(({ skill, priority }, i) =>
    buildScheduleEntry(
      skill,
      priority,
      getTimeSlot(i, todayOrTomorrow),
      input.preferredCategory || 'Animals',
      i,
    ),
  )

}

export function getAIScheduleInsight(entries: ScheduleEntry[], childName: string): string {
  const weakCount = entries.filter((e) => e.memoryStrength === 'Weak').length
  const weakSkills = entries.filter((e) => e.memoryStrength === 'Weak').map((e) => e.skill)

  if (weakCount === 0) {
    return `${childName} is performing consistently across all activities. Today's schedule focuses on reinforcement.`
  }
  if (weakCount === 1) {
    return `Based on recent sessions, ${childName} needs focused practice in ${weakSkills[0]}. It's scheduled as the first activity today.`
  }
  return `${childName} has ${weakCount} skills that need attention: ${weakSkills.join(' and ')}. These are prioritized in today's schedule.`
}
