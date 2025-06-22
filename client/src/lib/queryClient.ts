import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

// Placeholder for API requests
// In a real app, this would contain your logic for making authenticated API calls

/**
 * Makes an API request.
 * @param method - The HTTP method (e.g., "GET", "POST").
 * @param url - The URL to make the request to.
 * @param data - The data to send with the request.
 * @returns A promise that resolves with the response data.
 */
export const apiRequest = async (method: string, url: string, data?: any) => {
  console.log(`Making ${method} request to ${url} with data:`, data);
  // This is a placeholder. A real implementation would use fetch or a library like axios.
  // For now, we'll return a resolved promise to avoid breaking the mutation hooks.
  if (url.includes("waitlist") || url.includes("community")) {
    return { success: true, message: "Request received." };
  }
  return Promise.resolve();
};

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey[0] as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
