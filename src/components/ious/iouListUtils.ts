import type { IouStatus } from "@/types/iou";

export const ALL = "all" as const;
export const DEFAULT_PAGE_SIZE = 10;

export type AllFilter = typeof ALL;

export function statusLabel(status: IouStatus): string {
  switch (status) {
    case "draft":
      return "Draft";
    case "pending":
      return "Pending Approval";
    case "approved":
      return "Approved";
    case "rejected":
      return "Rejected";
  }
}

export function statusBadgeClass(status: IouStatus): string {
  switch (status) {
    case "approved":
      return "bg-emerald-500/15 text-emerald-600";
    case "pending":
      return "bg-amber-500/15 text-amber-600";
    case "rejected":
      return "bg-red-500/15 text-red-600";
    case "draft":
      return "bg-slate-500/15 text-slate-500";
  }
}
