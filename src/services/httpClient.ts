/**
 * Lightweight fetch helper for the external Rails API.
 *
 * MVP uses mock services, so this client is not actively used for data yet.
 * It is provided as the future integration boundary so service files can be
 * switched from mock imports to real HTTP calls without touching components.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export interface HttpClientOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

function buildUrl(path: string, params?: HttpClientOptions["params"]): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${API_BASE_URL}${normalizedPath}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, String(value));
      }
    });
  }

  return url.toString();
}

export async function httpClient<T>(path: string, options: HttpClientOptions = {}): Promise<T> {
  const { params, ...init } = options;
  const url = buildUrl(path, params);

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...init.headers,
    },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}
