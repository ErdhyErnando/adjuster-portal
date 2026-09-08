import { ref } from "vue";
import { getIous } from "@/services/iouService";
import type { IouItem } from "@/types/iou";

export function useIous() {
  const data = ref<IouItem[]>([]);
  const isLoading = ref(false);
  const error = ref<Error | null>(null);

  async function loadIous() {
    isLoading.value = true;
    error.value = null;

    try {
      data.value = await getIous();
    } catch (err) {
      error.value = err instanceof Error ? err : new Error("Failed to load cash advance list");
    } finally {
      isLoading.value = false;
    }
  }

  return {
    data,
    isLoading,
    error,
    loadIous,
  };
}
