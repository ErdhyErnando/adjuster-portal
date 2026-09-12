import { dashboardMockData } from "@/mock/data/dashboard";
import type { AdjusterDashboard } from "@/types/dashboard";

/**
 * Fetch the adjuster dashboard.
 *
 * MVP: returns typed mock data with a simulated network delay.
 * When the Rails API is ready, replace the mock import with a call to
 * `httpClient<AdjusterDashboard>('/api/v1/adjuster/dashboard')`.
 */
export async function getDashboard(): Promise<AdjusterDashboard> {
  // Simulate a short async boundary so the UI can exercise loading states.
  await new Promise((resolve) => setTimeout(resolve, 400));
  return dashboardMockData;
}
