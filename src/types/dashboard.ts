import type { CaseListItem } from './case'

/**
 * Dashboard response shape returned by the adjuster dashboard endpoint.
 */

export interface AdjusterProfile {
  name: string
  initial: string
  division: string
}

export interface DashboardStats {
  totalActiveCases: number
  closedThisYear: number
  pendingIOU: number
  totalEstimatedFees: number // IDR
}

export interface StatusBreakdownItem {
  status: string
  count: number
}

export interface AdjusterDashboard {
  adjuster: AdjusterProfile
  stats: DashboardStats
  statusBreakdown: StatusBreakdownItem[]
  recentCases: CaseListItem[]
}
