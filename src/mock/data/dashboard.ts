import type { AdjusterDashboard } from "@/types/dashboard";
import { recentCasesMockData } from "./cases";

export const dashboardMockData: AdjusterDashboard = {
  adjuster: {
    name: "Budi Santoso",
    initial: "BS",
    division: "Marine & Energy",
  },
  stats: {
    totalActiveCases: 25,
    closedThisYear: 0,
    pendingIOU: 3,
    totalEstimatedFees: 146_500_000,
    totalGrossClaim: 93_018_155_379,
  },
  statusBreakdown: [
    { status: "IA", label: "Initial Assessment", count: 5 },
    { status: "PR", label: "Preliminary Report", count: 4 },
    { status: "SUR", label: "Status Update Report", count: 9 },
    { status: "DFR", label: "Draft Final Report", count: 4 },
    { status: "FR", label: "Final Report", count: 3 },
  ],
  lineOfBusinessSummary: [
    { category: "Property", value: 50 },
    { category: "Engineering", value: 80 },
    { category: "Marine", value: 38 },
  ],
  recentCases: recentCasesMockData,
};
