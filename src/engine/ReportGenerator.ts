// ─── Report Generator ─────────────────────────────────────────────────────────
// Generates printable/PDF reports using window.print() + @media print CSS.

import type { AnalyticsData, MotivationScore, AIRecommendation, RewardHistoryEntry } from '../types'

interface ReportData {
  childName: string
  parentName: string
  generatedDate: string
  reportType: 'Weekly' | 'Monthly' | 'Progress' | 'Speech' | 'Reward' | 'Learning'
  analytics: AnalyticsData
  motivationScore: MotivationScore
  aiRecommendation: AIRecommendation
  rewardHistory: RewardHistoryEntry[]
  speechScore: number
  dayStreak: number
  starsEarned: number
}

export function generatePrintableHTML(data: ReportData): string {
  const {
    childName,
    parentName,
    generatedDate,
    reportType,
    analytics,
    motivationScore,
    aiRecommendation,
    rewardHistory,
    speechScore,
    dayStreak,
    starsEarned,
  } = data

  const recentRewards = rewardHistory.slice(-10)

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>ReinforceAI — ${reportType} Report — ${childName}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; color: #1e1b4b; background: #fff; padding: 32px; }
    h1 { font-size: 24px; font-weight: 900; color: #7c3aed; margin-bottom: 4px; }
    h2 { font-size: 16px; font-weight: 800; color: #312e81; margin: 24px 0 10px; border-left: 4px solid #7c3aed; padding-left: 10px; }
    h3 { font-size: 13px; font-weight: 700; color: #4c1d95; margin-bottom: 6px; }
    p { font-size: 12px; color: #374151; line-height: 1.6; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #7c3aed; padding-bottom: 16px; margin-bottom: 24px; }
    .header-right { text-align: right; font-size: 11px; color: #6b7280; }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
    .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 16px; }
    .card { border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; }
    .card .label { font-size: 10px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; }
    .card .value { font-size: 24px; font-weight: 900; color: #1e1b4b; }
    .card .sub { font-size: 11px; color: #7c3aed; font-weight: 600; margin-top: 2px; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; }
    .badge-excellent { background: #d1fae5; color: #065f46; }
    .badge-good { background: #dbeafe; color: #1e40af; }
    .badge-average { background: #fef3c7; color: #92400e; }
    .badge-needs { background: #fee2e2; color: #991b1b; }
    table { width: 100%; border-collapse: collapse; margin-top: 8px; }
    th { background: #f5f3ff; font-size: 11px; font-weight: 700; color: #6b7280; text-align: left; padding: 8px 12px; border-bottom: 2px solid #e5e7eb; }
    td { font-size: 11px; padding: 7px 12px; border-bottom: 1px solid #f3f4f6; color: #374151; }
    tr:hover td { background: #f9fafb; }
    .ai-box { background: #f5f3ff; border: 1px solid #ddd6fe; border-radius: 12px; padding: 16px; margin-bottom: 16px; }
    .ai-box p { color: #4c1d95; font-size: 12px; line-height: 1.7; }
    .insight { display: flex; gap: 8px; margin-bottom: 8px; font-size: 12px; color: #374151; align-items: flex-start; }
    .insight::before { content: '💡'; flex-shrink: 0; }
    .bar-wrap { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
    .bar-label { font-size: 11px; font-weight: 600; color: #374151; width: 140px; flex-shrink: 0; }
    .bar { height: 10px; background: #ede9fe; border-radius: 6px; flex: 1; overflow: hidden; }
    .bar-fill { height: 100%; background: linear-gradient(90deg, #7c3aed, #6d28d9); border-radius: 6px; }
    .bar-val { font-size: 11px; font-weight: 700; color: #7c3aed; width: 36px; text-align: right; }
    .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e7eb; font-size: 10px; color: #9ca3af; text-align: center; }
    @media print {
      body { padding: 16px; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body>
  <!-- Header -->
  <div class="header">
    <div>
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
        <span style="font-size:28px">☁️</span>
        <h1>ReinforceAI</h1>
      </div>
      <p style="font-size:13px;color:#6b7280;font-weight:600;">${reportType} Progress Report — ${childName}</p>
    </div>
    <div class="header-right">
      <div style="font-weight:800;color:#1e1b4b;">Generated For</div>
      <div style="margin:2px 0">${parentName}</div>
      <div>${generatedDate}</div>
      <div style="margin-top:4px;color:#7c3aed;font-weight:700;">${reportType} Report</div>
    </div>
  </div>

  <!-- Overview Metrics -->
  <h2>📊 Overview</h2>
  <div class="grid-3">
    <div class="card">
      <div class="label">Speech Accuracy</div>
      <div class="value">${speechScore}%</div>
      <div class="sub">Current Session</div>
    </div>
    <div class="card">
      <div class="label">Day Streak</div>
      <div class="value">${dayStreak} 🔥</div>
      <div class="sub">Consecutive Days</div>
    </div>
    <div class="card">
      <div class="label">Stars Earned</div>
      <div class="value">${starsEarned} ⭐</div>
      <div class="sub">Total Lifetime</div>
    </div>
    <div class="card">
      <div class="label">Completion Rate</div>
      <div class="value">${analytics.completionRate}%</div>
      <div class="sub">Weekly Goal Progress</div>
    </div>
    <div class="card">
      <div class="label">Total Rewards</div>
      <div class="value">${analytics.totalRewardsEarned}</div>
      <div class="sub">Videos Watched</div>
    </div>
    <div class="card">
      <div class="label">Avg Session Time</div>
      <div class="value">${analytics.avgSessionTimeMinutes}m</div>
      <div class="sub">Per Session</div>
    </div>
  </div>

  <!-- Motivation Score -->
  <h2>💪 Motivation Score</h2>
  <div class="card" style="margin-bottom:16px;">
    <div style="display:flex;align-items:center;gap:16px;">
      <div style="text-align:center;">
        <div style="font-size:48px;font-weight:900;color:${motivationScore.levelColor};">${motivationScore.score}</div>
        <div class="badge badge-${motivationScore.level.toLowerCase().replace(' ', '-')}">${motivationScore.level}</div>
      </div>
      <div>
        <h3>Motivation Breakdown</h3>
        ${Object.entries(motivationScore.breakdown).map(([k, v]) => `
          <div class="bar-wrap">
            <div class="bar-label">${k.replace(/([A-Z])/g, ' $1').trim()}</div>
            <div class="bar"><div class="bar-fill" style="width:${v}%"></div></div>
            <div class="bar-val">${v}%</div>
          </div>
        `).join('')}
        <p style="margin-top:8px;color:#7c3aed;font-size:11px;font-weight:600;">
          ${motivationScore.trendPct > 0 ? '📈' : '📉'} Trend: ${motivationScore.trendPct > 0 ? '+' : ''}${motivationScore.trendPct}% vs last 3 days
        </p>
      </div>
    </div>
  </div>

  <!-- AI Recommendation -->
  <h2>🤖 AI Recommendation</h2>
  <div class="ai-box">
    <h3>Recommended Reward: ${aiRecommendation.videoTitle}</h3>
    <p style="margin-top:6px;">Category: <strong>${aiRecommendation.category}</strong> — Confidence: <strong>${aiRecommendation.confidence}%</strong></p>
    <p style="margin-top:6px;"><em>${aiRecommendation.reason}</em></p>
  </div>

  <!-- Reward Effectiveness -->
  <h2>🏆 Reward Effectiveness</h2>
  <div class="grid-2">
    <div class="card">
      <div class="label">Most Effective Reward</div>
      <div style="font-size:16px;font-weight:800;color:#059669;margin-top:4px;">${analytics.mostEffectiveReward} Videos</div>
      <p style="font-size:11px;color:#374151;margin-top:4px;">Highest activity completion rate after watching</p>
    </div>
    <div class="card">
      <div class="label">Favourite Category</div>
      <div style="font-size:16px;font-weight:800;color:#7c3aed;margin-top:4px;">${analytics.favouriteCategory}</div>
      <p style="font-size:11px;color:#374151;margin-top:4px;">Most frequently chosen by the child</p>
    </div>
  </div>

  <!-- Speech Accuracy -->
  <h2>🎙️ Speech Accuracy Trend (7 Days)</h2>
  <div class="card" style="margin-bottom:16px;">
    <div style="display:flex;align-items:flex-end;gap:8px;height:80px;padding-top:8px;">
      ${analytics.speechAccuracyTrend.map((v, i) => `
        <div style="display:flex;flex-direction:column;align-items:center;gap:4px;flex:1;">
          <div style="font-size:10px;font-weight:700;color:#7c3aed;">${v}%</div>
          <div style="width:100%;background:linear-gradient(to top,#7c3aed,#a78bfa);border-radius:4px 4px 0 0;height:${(v / 100) * 60}px;max-height:60px;"></div>
          <div style="font-size:9px;color:#6b7280;">D${i + 1}</div>
        </div>
      `).join('')}
    </div>
  </div>

  <!-- AI Summary -->
  <h2>🤖 AI Therapist Summary</h2>
  <div class="ai-box">
    <p>${analytics.aiSummary}</p>
  </div>

  <!-- AI Insights -->
  <h2>💡 AI Insights</h2>
  <div class="card" style="margin-bottom:16px;">
    ${analytics.aiInsights.map((insight) => `<div class="insight">${insight}</div>`).join('')}
  </div>

  <!-- Reward History -->
  <h2>📋 Recent Reward History</h2>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Video Title</th>
        <th>Category</th>
        <th>Stars</th>
        <th>Watch %</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      ${recentRewards.length === 0
        ? '<tr><td colspan="6" style="text-align:center;color:#9ca3af;">No reward history yet</td></tr>'
        : recentRewards.map((r, i) => `
        <tr>
          <td>${i + 1}</td>
          <td style="font-weight:600;">${r.title}</td>
          <td>${r.category}</td>
          <td style="color:#f59e0b;font-weight:700;">+${r.starsEarned} ⭐</td>
          <td>${r.watchCompletion ?? 100}%</td>
          <td>${new Date(r.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <!-- Footer -->
  <div class="footer">
    ReinforceAI — AI-Powered Smart Reinforcement for Speech Therapy | Generated on ${generatedDate} | Confidential — For Parent/Therapist Use Only
  </div>
</body>
</html>
`
}

export function printReport(data: ReportData): void {
  const html = generatePrintableHTML(data)
  const printWindow = window.open('', '_blank', 'width=900,height=700')
  if (!printWindow) {
    // Fallback: inject into current page
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    document.body.appendChild(iframe)
    iframe.contentDocument?.write(html)
    iframe.contentDocument?.close()
    iframe.contentWindow?.print()
    setTimeout(() => document.body.removeChild(iframe), 1000)
    return
  }
  printWindow.document.write(html)
  printWindow.document.close()
  printWindow.onload = () => {
    printWindow.print()
  }
}
