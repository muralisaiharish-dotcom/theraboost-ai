import { useApp } from '../contexts/AppContext'
import { useAuth } from '../contexts/AuthContext'
import { computeAnalytics } from '../engine/AnalyticsEngine'
import { printReport } from '../engine/ReportGenerator'

interface PrintableReportProps {
  reportType?: 'Weekly' | 'Monthly' | 'Progress' | 'Speech' | 'Reward' | 'Learning'
  onComplete?: () => void
}

export function triggerPrintReport(
  state: ReturnType<typeof useApp>['state'],
  userName: string,
  parentName: string,
  motivationScore: ReturnType<typeof useApp>['motivationScore'],
  aiRecommendation: ReturnType<typeof useApp>['aiRecommendation'],
  reportType: 'Weekly' | 'Monthly' | 'Progress' | 'Speech' | 'Reward' | 'Learning' = 'Progress',
) {
  const analytics = computeAnalytics({
    activityLog: state.activityLog,
    rewardHistory: state.rewardHistory,
    speechScore: state.speechScore,
    cardsLearned: state.stats.cardsLearned,
    dayStreak: state.stats.dayStreak,
    starsEarned: state.stats.starsEarned,
    weeklyCompleted: state.stats.weeklyCompleted,
    weeklyGoal: state.stats.weeklyGoal,
    userName,
  })

  printReport({
    childName: userName,
    parentName,
    generatedDate: new Date().toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    reportType,
    analytics,
    motivationScore,
    aiRecommendation,
    rewardHistory: state.rewardHistory,
    speechScore: state.speechScore,
    dayStreak: state.stats.dayStreak,
    starsEarned: state.stats.starsEarned,
  })
}

export function PrintReportButton({ reportType = 'Progress' }: PrintableReportProps) {
  const { state, motivationScore, aiRecommendation } = useApp()
  const { state: authState } = useAuth()
  const parentName = authState.user?.name || 'Parent'

  const handlePrint = () => {
    triggerPrintReport(state, 'Rahul', parentName, motivationScore, aiRecommendation, reportType)
  }

  return (
    <button
      onClick={handlePrint}
      className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs px-3.5 py-2 rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer"
    >
      <span>📑</span>
      <span>Download PDF Report</span>
    </button>
  )
}
