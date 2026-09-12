import type { IouItem, IouStatus } from "@/types/iou";

/**
 * Cash advance (IOU) mock data.
 *
 * Aligned with the adjuster domain: adjusters, divisions and insurers reuse
 * the names found in the case mock, and each IOU references a realistic
 * Atlas case number. Sorted by submission date descending so the list
 * behaves like a real tracker out of the box.
 */

const adjusters = ["Budi Santoso", "Rina Wijaya", "Andi Pratama", "Dewi Lestari"] as const;

const insurers = [
  "PT AVRIST GENERAL INSURANCE",
  "PT ASURANSI UMUM BCA",
  "PT MANDIRI AXA GENERAL INSURANCE",
  "PT ASURANSI MULTI ARTHA GUNA",
  "PT ASURANSI SINAR MAS",
  "PT ASURANSI ADIRA DINAMIKA",
] as const;

const divisions = ["Marine Cargo", "Property", "Heavy Equipment"] as const;

const atlasRefs = [
  "96933.M.11.2025/MC/LA",
  "97845.M.11.2025/JKTA",
  "97847.M.11.2025/JKTC",
  "97849.M.11.2025/JKTE",
  "97851.M.11.2025/JKTG",
  "97853.M.11.2025/JKTI",
  "97855.M.12.2025/JKTK",
  "97857.M.12.2025/JKTM",
  "97859.M.12.2025/JKTO",
  "97861.M.12.2025/JKTQ",
  "97863.M.12.2025/JKTS",
  "97865.M.12.2025/JKTU",
  "97867.M.01.2026/JKTW",
  "97868.M.01.2026/JKTX",
] as const;

/** Deterministic status spread: 4 drafts, 8 pending, 9 approved, 4 rejected. */
const statusSequence: IouStatus[] = [
  "pending",
  "approved",
  "pending",
  "draft",
  "approved",
  "pending",
  "rejected",
  "approved",
  "draft",
  "pending",
  "approved",
  "approved",
  "rejected",
  "pending",
  "approved",
  "draft",
  "pending",
  "approved",
  "rejected",
  "approved",
  "pending",
  "approved",
  "draft",
  "pending",
  "approved",
];

const submittedDates = [
  "2026-07-08",
  "2026-07-06",
  "2026-07-03",
  "2026-06-30",
  "2026-06-27",
  "2026-06-24",
  "2026-06-20",
  "2026-06-15",
  "2026-06-10",
  "2026-06-05",
  "2026-05-29",
  "2026-05-22",
  "2026-05-15",
  "2026-05-08",
  "2026-04-30",
  "2026-04-22",
  "2026-04-15",
  "2026-04-08",
  "2026-03-30",
  "2026-03-20",
  "2026-03-10",
  "2026-02-25",
  "2026-02-12",
  "2026-01-30",
  "2026-01-15",
];

/** Realistic requested amounts (IDR): short surveys ≈ 2–8jt, longer ones 10–25jt. */
const amounts = [
  4_500_000, 7_250_000, 3_800_000, 12_500_000, 5_600_000, 8_900_000, 6_400_000, 15_750_000,
  2_950_000, 9_100_000, 11_200_000, 5_400_000, 18_300_000, 7_800_000, 4_200_000, 6_900_000,
  10_500_000, 13_400_000, 8_200_000, 16_600_000, 5_100_000, 9_800_000, 3_600_000, 14_900_000,
  7_350_000,
];

export const iousMockData: IouItem[] = statusSequence.map((status, index) => ({
  id: `iou-${String(index + 1).padStart(3, "0")}`,
  iouRef: `IOU/2026/${String(index + 1).padStart(3, "0")}`,
  caseNo: atlasRefs[index % atlasRefs.length],
  adjusterName: adjusters[index % adjusters.length],
  insurer: insurers[index % insurers.length],
  division: divisions[index % divisions.length],
  amount: amounts[index],
  status,
  submittedAt: `${submittedDates[index]}T09:${String(10 + index).padStart(2, "0")}:00+07:00`,
}));

/** Sort by submission date descending (newest first). */
export const iousMockDataSorted: IouItem[] = [...iousMockData].sort(
  (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
);
