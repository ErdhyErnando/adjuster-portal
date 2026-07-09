import type { AdjusterDashboard } from '@/types/dashboard'
import { recentCasesMockData } from './cases'

export const dashboardMockData: AdjusterDashboard = {
  adjuster: {
    name: 'Budi Santoso',
    initial: 'BS',
    division: 'Marine & Energy',
  },
  stats: {
    totalActiveCases: 24,
    closedThisYear: 1,
    pendingIOU: 3,
    totalEstimatedFees: 146_500_000,
    totalGrossClaim: 93_018_155_379,
  },
  statusBreakdown: [
    { status: 'FR', label: 'Final Report', count: 2 },
    { status: 'DFR', label: 'Draft Final Report', count: 3 },
    { status: 'SUR', label: 'Status Update Report', count: 4 },
    { status: 'IR', label: 'Interim Report', count: 6 },
    { status: 'PR', label: 'Preliminary Report', count: 4 },
    { status: 'IA', label: 'Initial Assessment', count: 3 },
    { status: 'AA', label: 'Adjuster Appointment', count: 2 },
    { status: 'CLOSED', label: 'Closed', count: 1 },
  ],
  lineOfBusinessSummary: [
    { category: 'Property', value: 50 },
    { category: 'Engineering', value: 80 },
    { category: 'Marine', value: 38 },
  ],
  recentCases: recentCasesMockData,
}
