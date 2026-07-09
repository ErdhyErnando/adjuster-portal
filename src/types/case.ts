/**
 * Shared case types used by case list, case detail, and dashboard.
 *
 * Field naming is aligned with the existing Atlas case model
 * (atlasRef, dateOfInstruction, dateOfLoss, caseStatus, lineOfBusiness,
 * typeOfDivision, etc.) while keeping the MVP-required display fields.
 */

export interface CaseLocation {
  address: string
}

export interface CaseMessage {
  id: string
  sender: string
  senderName: string
  message: string
  timestamp: string
}

export interface CaseSummary {
  id: string
  caseNumb: number
  /** Human-readable Atlas case reference, e.g. "96933.M.11.2025/MC/LA". */
  atlasRef: string
  /** Numeric completion/progress status (0–100). */
  caseStatus: number
  /** Current milestone label, e.g. "Final Report Issued". */
  currentStatus: string
  /** Short status initial, e.g. "FR", "DFR", "SUR". */
  statusInitial: string
  /** Date when the current status was reached (ISO). */
  statusDate: string
  insured: string
  insurer: string
  broker: string
  /** Line-of-business division used for list grouping, e.g. "Marine Cargo". */
  division: string
  /** ISO date when the case was instructed. */
  dateOfInstruction: string
  /** ISO date of loss. */
  dateOfLoss: string
  /** Computed aging in days from dateOfInstruction. */
  agingDays: number
  /** Estimated fee in IDR rupiah integer. */
  feeEstimate: number
}

export type CaseListItem = CaseSummary

export interface CaseDetail extends CaseSummary {
  insurerRef: string
  noPolicy: string
  specialAccount: string
  assignment: string
  lineOfBusiness: string
  typeOfDivision: string
  objectClaim: string
  location: CaseLocation
  messages: CaseMessage[]
}
