/**
 * Cash advance (IOU) list types.
 *
 * Statuses are intentionally a small 4-state workflow (Draft → Pending →
 * Approved / Rejected) for the MVP. The approval grid on the submit form
 * hints at a future multi-level workflow — keep status logic centralized in
 * components/ious/iouListUtils.ts so the set can grow without touching pages.
 */

export type IouStatus = 'draft' | 'pending' | 'approved' | 'rejected'

export interface IouItem {
  id: string
  /** Display reference, e.g. "IOU/2026/001". */
  iouRef: string
  /** Atlas case reference the advance belongs to, e.g. "97870.M.11.2025/MC/LA". */
  caseNo: string
  /** Adjuster who submitted the request. */
  adjusterName: string
  /** Client / insurer the expenses will be charged to. */
  insurer: string
  /** Adjuster division (Marine Cargo, Property, Heavy Equipment). */
  division: string
  /** Requested amount in IDR rupiah integer. */
  amount: number
  status: IouStatus
  /** ISO datetime when the request was submitted. */
  submittedAt: string
}