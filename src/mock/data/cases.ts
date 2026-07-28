import type { CaseDivision, CaseLineOfBusiness, CaseReportProgress, CaseSummary } from '@/types/case'

/**
 * Atlas case summary mock data.
 *
 * The list is aligned with the atlas-cmp-test domain model and enhanced for
 * the adjuster cases route: LOB, division/type, DOL, full broker names,
 * report-progress status, instruction notes, and adjuster notes.
 */

const insurers = [
  'PT AVRIST GENERAL INSURANCE',
  'PT ASURANSI JIWA MANULIFE INDONESIA',
  'PT PRUDENTIAL LIFE ASSURANCE',
  'PT ASURANSI UMUM BCA',
  'PT MANDIRI AXA GENERAL INSURANCE',
  'PT ASURANSI MULTI ARTHA GUNA',
  'PT ASURANSI SINAR MAS',
  'PT ASURANSI JASINDO',
  'PT ASURANSI ADIRA DINAMIKA',
  'PT ASURANSI RAMAYANA',
] as const

const brokers = [
  'PT INDOSURANCE BROKER UTAMA (IBU)',
  'PT MARSH INDONESIA',
  'PT AON INDONESIA',
  'PT WILLIS TOWERS WATSON',
  'PT REINDO BROKER',
  'PT MAI BROKER',
] as const

const classifications: Array<{
  lineOfBusiness: CaseLineOfBusiness
  typeOfDivision: CaseDivision
}> = [
  { lineOfBusiness: 'Marine', typeOfDivision: 'Marine Cargo' },
  { lineOfBusiness: 'Property', typeOfDivision: 'Property' },
  { lineOfBusiness: 'Engineering', typeOfDivision: 'Heavy Equipment' },
] as const

const instructionNotes = [
  'Confirm cause of loss and collect supporting cargo documents.',
  'Arrange site survey and verify repair/reinstatement estimate.',
  'Review chronology, photos, and equipment maintenance records.',
  'Prioritize reserve recommendation for insurer review.',
  'Validate salvage opportunity and third-party recovery potential.',
] as const

const adjusterNotes = [
  'Awaiting additional photos from insured before report update.',
  'Survey completed; draft findings under internal review.',
  'Broker requested expedited update before weekly claims meeting.',
  'Need insurer confirmation on policy deductible application.',
  'Documents complete; report can proceed to next milestone.',
] as const

function statusFromValue(value: number): { currentStatus: string, status: CaseReportProgress } {
  if (value >= 95)
    return { currentStatus: 'Final Report', status: 'FR' }
  if (value >= 80)
    return { currentStatus: 'Draft Final Report', status: 'DFR' }
  if (value >= 55)
    return { currentStatus: 'Status Update Report', status: 'SUR' }
  if (value >= 40)
    return { currentStatus: 'Preliminary Report', status: 'PR' }
  return { currentStatus: 'Initial Assessment', status: 'IA' }
}

function calculateAgingDays(dateOfInstruction: string): number {
  const instruction = new Date(dateOfInstruction)
  const now = new Date('2026-07-09')
  const diff = now.getTime() - instruction.getTime()
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)))
}

const rawCases: Array<{
  id: string
  caseNumb: number
  atlasRef: string
  caseStatus: number
  insured: string
  dateOfInstruction: string
  dateOfLoss: string
}> = [
  { id: '550e8400-e29b-41d4-a716-446655440001', caseNumb: 96933, atlasRef: '96933.M.11.2025/MC/LA', caseStatus: 95, insured: 'PT Indomaret Mitrabuana', dateOfInstruction: '2025-11-12', dateOfLoss: '2025-11-02' },
  { id: '550e8400-e29b-41d4-a716-446655440002', caseNumb: 97845, atlasRef: '97845.M.11.2025/JKTA', caseStatus: 65, insured: 'PT Astra International', dateOfInstruction: '2025-11-05', dateOfLoss: '2025-11-03' },
  { id: '550e8400-e29b-41d4-a716-446655440003', caseNumb: 97846, atlasRef: '97846.M.11.2025/JKTB', caseStatus: 40, insured: 'PT Unilever Indonesia', dateOfInstruction: '2025-11-07', dateOfLoss: '2025-11-05' },
  { id: '550e8400-e29b-41d4-a716-446655440004', caseNumb: 97847, atlasRef: '97847.M.11.2025/JKTC', caseStatus: 30, insured: 'PT Pertamina Persero', dateOfInstruction: '2025-11-10', dateOfLoss: '2025-11-08' },
  { id: '550e8400-e29b-41d4-a716-446655440005', caseNumb: 97848, atlasRef: '97848.M.11.2025/JKTD', caseStatus: 55, insured: 'PT Bank Central Asia', dateOfInstruction: '2025-11-08', dateOfLoss: '2025-11-06' },
  { id: '550e8400-e29b-41d4-a716-446655440006', caseNumb: 97849, atlasRef: '97849.M.11.2025/JKTE', caseStatus: 70, insured: 'PT Telkom Indonesia', dateOfInstruction: '2025-11-15', dateOfLoss: '2025-11-10' },
  { id: '550e8400-e29b-41d4-a716-446655440007', caseNumb: 97850, atlasRef: '97850.M.11.2025/JKTF', caseStatus: 85, insured: 'PT Gudang Garam', dateOfInstruction: '2025-11-18', dateOfLoss: '2025-11-12' },
  { id: '550e8400-e29b-41d4-a716-446655440008', caseNumb: 97851, atlasRef: '97851.M.11.2025/JKTG', caseStatus: 25, insured: 'PT Semen Indonesia', dateOfInstruction: '2025-11-20', dateOfLoss: '2025-11-15' },
  { id: '550e8400-e29b-41d4-a716-446655440009', caseNumb: 97852, atlasRef: '97852.M.11.2025/JKTH', caseStatus: 90, insured: 'PT Garuda Indonesia', dateOfInstruction: '2025-11-22', dateOfLoss: '2025-11-18' },
  { id: '550e8400-e29b-41d4-a716-446655440010', caseNumb: 97853, atlasRef: '97853.M.11.2025/JKTI', caseStatus: 45, insured: 'PT Indofood Sukses Makmur', dateOfInstruction: '2025-11-25', dateOfLoss: '2025-11-20' },
  { id: '550e8400-e29b-41d4-a716-446655440011', caseNumb: 97854, atlasRef: '97854.M.11.2025/JKTJ', caseStatus: 75, insured: 'PT Bank Mandiri', dateOfInstruction: '2025-11-28', dateOfLoss: '2025-11-22' },
  { id: '550e8400-e29b-41d4-a716-446655440012', caseNumb: 97855, atlasRef: '97855.M.12.2025/JKTK', caseStatus: 60, insured: 'PT Krakatau Steel', dateOfInstruction: '2025-12-01', dateOfLoss: '2025-11-25' },
  { id: '550e8400-e29b-41d4-a716-446655440013', caseNumb: 97856, atlasRef: '97856.M.12.2025/JKTL', caseStatus: 35, insured: 'PT Adaro Energy', dateOfInstruction: '2025-12-04', dateOfLoss: '2025-11-28' },
  { id: '550e8400-e29b-41d4-a716-446655440014', caseNumb: 97857, atlasRef: '97857.M.12.2025/JKTM', caseStatus: 100, insured: 'PT Vale Indonesia', dateOfInstruction: '2025-12-07', dateOfLoss: '2025-12-01' },
  { id: '550e8400-e29b-41d4-a716-446655440015', caseNumb: 97858, atlasRef: '97858.M.12.2025/JKTN', caseStatus: 50, insured: 'PT Freeport Indonesia', dateOfInstruction: '2025-12-10', dateOfLoss: '2025-12-05' },
  { id: '550e8400-e29b-41d4-a716-446655440016', caseNumb: 97859, atlasRef: '97859.M.12.2025/JKTO', caseStatus: 65, insured: 'PT Pupuk Indonesia', dateOfInstruction: '2025-12-13', dateOfLoss: '2025-12-08' },
  { id: '550e8400-e29b-41d4-a716-446655440017', caseNumb: 97860, atlasRef: '97860.M.12.2025/JKTP', caseStatus: 80, insured: 'PT Pelindo III', dateOfInstruction: '2025-12-16', dateOfLoss: '2025-12-10' },
  { id: '550e8400-e29b-41d4-a716-446655440018', caseNumb: 97861, atlasRef: '97861.M.12.2025/JKTQ', caseStatus: 20, insured: 'PT Angkasa Pura II', dateOfInstruction: '2025-12-19', dateOfLoss: '2025-12-15' },
  { id: '550e8400-e29b-41d4-a716-446655440019', caseNumb: 97862, atlasRef: '97862.M.12.2025/JKTR', caseStatus: 55, insured: 'PT Jasa Marga', dateOfInstruction: '2025-12-22', dateOfLoss: '2025-12-18' },
  { id: '550e8400-e29b-41d4-a716-446655440020', caseNumb: 97863, atlasRef: '97863.M.12.2025/JKTS', caseStatus: 40, insured: 'PT Waskita Karya', dateOfInstruction: '2025-12-25', dateOfLoss: '2025-12-20' },
  { id: '550e8400-e29b-41d4-a716-446655440021', caseNumb: 97864, atlasRef: '97864.M.12.2025/JKTT', caseStatus: 95, insured: 'PT Adhi Karya', dateOfInstruction: '2025-12-28', dateOfLoss: '2025-12-22' },
  { id: '550e8400-e29b-41d4-a716-446655440022', caseNumb: 97865, atlasRef: '97865.M.12.2025/JKTU', caseStatus: 70, insured: 'PT Wijaya Karya', dateOfInstruction: '2026-01-02', dateOfLoss: '2025-12-28' },
  { id: '550e8400-e29b-41d4-a716-446655440023', caseNumb: 97866, atlasRef: '97866.M.01.2026/JKTV', caseStatus: 30, insured: 'PT PP Persero', dateOfInstruction: '2026-01-05', dateOfLoss: '2026-01-01' },
  { id: '550e8400-e29b-41d4-a716-446655440024', caseNumb: 97867, atlasRef: '97867.M.01.2026/JKTW', caseStatus: 85, insured: 'PT Hutama Karya', dateOfInstruction: '2026-01-08', dateOfLoss: '2026-01-03' },
  { id: '550e8400-e29b-41d4-a716-446655440025', caseNumb: 97868, atlasRef: '97868.M.01.2026/JKTX', caseStatus: 60, insured: 'PT Nindya Karya', dateOfInstruction: '2026-01-11', dateOfLoss: '2026-01-06' },
]

export const casesMockData: CaseSummary[] = rawCases.map((raw, index) => {
  const { currentStatus, status } = statusFromValue(raw.caseStatus)
  const agingDays = calculateAgingDays(raw.dateOfInstruction)
  const classification = classifications[index % classifications.length]

  return {
    ...raw,
    status,
    currentStatus,
    statusInitial: status,
    statusDate: raw.dateOfInstruction,
    insurer: insurers[index % insurers.length],
    broker: brokers[index % brokers.length],
    division: classification.typeOfDivision,
    lineOfBusiness: classification.lineOfBusiness,
    typeOfDivision: classification.typeOfDivision,
    agingDays,
    instructionNotes: instructionNotes[index % instructionNotes.length],
    adjusterNotes: adjusterNotes[index % adjusterNotes.length],
    feeEstimate: 4_000_000 + (index % 9) * 500_000,
    grossClaim: 650_000_000 + (index % 12) * 125_000_000,
  }
})

/**
 * Most recent cases for the dashboard widget.
 * Sorted by instruction date descending and limited to the top 12 so
 * the dashboard Recent Cases table can demonstrate pagination.
 */
export const recentCasesMockData: CaseSummary[] = [...casesMockData]
  .sort((a, b) => new Date(b.dateOfInstruction).getTime() - new Date(a.dateOfInstruction).getTime())
