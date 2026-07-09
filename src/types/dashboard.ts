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
  /** Total gross claim exposure for active cases (aligned with Atlas CMP). */
  totalGrossClaim?: number // IDR
}

export interface StatusBreakdownItem {
  status: string
  label: string
  count: number
}

export interface LineOfBusinessSummary {
  category: string
  value: number
}

export interface AdjusterDashboard {
  adjuster: AdjusterProfile
  stats: DashboardStats
  statusBreakdown: StatusBreakdownItem[]
  lineOfBusinessSummary: LineOfBusinessSummary[]
  recentCases: CaseListItem[]
}
