/**
 * Shared case types used by case list, case detail, and dashboard.
 */

export interface CaseSummary {
  id: string
  caseNumb: number
  caseRef: string
  currentStatus: string
  statusInitial: string
  statusDate: string // ISO date
  insured: string
  insurer: string
  broker: string
  division: string
  instructionDate: string // ISO date
  agingDays: number
  feeEstimate: number // IDR
}

export type CaseListItem = CaseSummary
