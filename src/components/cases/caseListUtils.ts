import type { CaseReportProgress } from "@/types/case";

export const ALL = "all" as const;
export const DEFAULT_PAGE_SIZE = 15;
export const COMPACT_PAGE_SIZE = 10;

export type AllFilter = typeof ALL;
export type DateFilter = AllFilter | "dol-2026" | "dol-2025" | "last-90" | "older-90";

export function uniqueSorted<T extends string>(items: T[]): T[] {
  return [...new Set(items)].sort((a, b) => a.localeCompare(b));
}

export function statusLabel(status: CaseReportProgress): string {
  switch (status) {
    case "IA":
      return "Initial Assessment";
    case "PR":
      return "Preliminary Report";
    case "SUR":
      return "Status Update Report";
    case "DFR":
      return "Draft Final Report";
    case "FR":
      return "Final Report";
  }
}

export function statusBadgeClass(status: CaseReportProgress): string {
  switch (status) {
    case "FR":
      return "bg-emerald-500/15 text-emerald-600";
    case "DFR":
      return "bg-orange-500/15 text-orange-600";
    case "SUR":
      return "bg-amber-500/15 text-amber-600";
    case "PR":
      return "bg-violet-500/15 text-violet-600";
    case "IA":
      return "bg-indigo-500/15 text-indigo-600";
  }
}

export function agingClass(days: number): string {
  if (days < 90) return "text-emerald-600";
  if (days <= 180) return "text-amber-600";
  return "text-red-600";
}

export function progressBarClass(status: CaseReportProgress): string {
  switch (status) {
    case "FR":
      return "bg-emerald-500";
    case "DFR":
      return "bg-orange-500";
    case "SUR":
      return "bg-amber-500";
    case "PR":
      return "bg-violet-500";
    case "IA":
      return "bg-indigo-500";
  }
}
