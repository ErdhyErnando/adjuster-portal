/**
 * Shared case types used by case list, case detail, and dashboard.
 *
 * The cases route uses the same domain terms found in atlas-cmp-test while
 * keeping dashboard-compatible aliases such as statusInitial/currentStatus.
 */

export type CaseLineOfBusiness = 'Marine' | 'Property' | 'Engineering'

export type CaseDivision = 'Marine Cargo' | 'Property' | 'Heavy Equipment'

/** Report progress/status shown to adjusters. */
export type CaseReportProgress = 'IA' | 'PR' | 'SUR' | 'DFR' | 'FR'

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
  /** Current report progress code. Mirrors statusInitial for older widgets. */
  status: CaseReportProgress
  /** Current milestone label, e.g. "Draft Final Report". */
  currentStatus: string
  /** Short report progress code, e.g. "IA", "DFR", "FR". */
  statusInitial: CaseReportProgress
  /** Date when the current report progress was reached (ISO). */
  statusDate: string
  insured: string
  insurer: string
  /** Full broker name. Do not replace with initials in the cases table. */
  broker: string
  /** Backward-compatible display division alias. Mirrors typeOfDivision. */
  division: CaseDivision
  /** Broad LOB used for filtering/grouping. */
  lineOfBusiness: CaseLineOfBusiness
  /** Display division/type: Marine Cargo, Property, or Heavy Equipment. */
  typeOfDivision: CaseDivision
  /** ISO date when the case was instructed. */
  dateOfInstruction: string
  /** ISO date of loss. */
  dateOfLoss: string
  /** Computed aging in days from dateOfInstruction. */
  agingDays: number
  /** Instruction notes from insurer/broker/client. */
  instructionNotes: string
  /** Internal adjuster notes/remarks. */
  adjusterNotes: string
  /** Estimated fee in IDR rupiah integer. */
  feeEstimate: number
  /** Gross claim exposure in IDR rupiah integer. */
  grossClaim?: number
}

export type CaseListItem = CaseSummary

export interface CaseDetail extends CaseSummary {
  insurerRef: string
  noPolicy: string
  specialAccount: string
  assignment: string
  objectClaim: string
  location: CaseLocation
  messages: CaseMessage[]
}
