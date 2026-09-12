import { iousMockDataSorted } from "@/mock/data/ious";
import type { IouItem } from "@/types/iou";

/**
 * Fetch the adjuster's cash advance (IOU) list.
 *
 * MVP: returns typed mock data with a simulated network delay.
 * When the Rails API is ready, replace the mock import with a call to
 * `httpClient<IouItem[]>('/api/v1/adjuster/ious')`.
 */
export async function getIous(): Promise<IouItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return iousMockDataSorted;
}
