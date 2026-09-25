// Retry utility for handling Cloudflare 524 and other transient errors
// Use this for API calls that might hit Cloudflare 524 timeouts

export interface RetryOptions {
  maxRetries?: number;
  baseDelay?: number;
  maxDelay?: number;
  backoffMultiplier?: number;
  retryableStatuses?: number[];
  onRetry?: (attempt: number, error: Error) => void;
}

const DEFAULT_OPTIONS: Required<RetryOptions> = {
  maxRetries: 3,
  baseDelay: 1000,
  maxDelay: 10000,
  backoffMultiplier: 2,
  retryableStatuses: [524, 502, 503, 504, 408, 429],
  onRetry: () => {},
};

export async function fetchWithRetry<T>(
  url: string,
  options: RequestInit = {},
  retryOptions: RetryOptions = {}
): Promise<T> {
  const config = { ...DEFAULT_OPTIONS, ...retryOptions };
  let lastError: Error;

  for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120000); // 120s timeout

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (config.retryableStatuses.includes(response.status) && attempt < config.maxRetries) {
          const delay = Math.min(
            config.baseDelay * Math.pow(config.backoffMultiplier, attempt),
            config.maxDelay
          );

          config.onRetry(attempt + 1, new Error(`HTTP ${response.status}`));
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }

        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json() as T;
    } catch (error) {
      lastError = error as Error;

      // Check if error is retryable
      const isRetryable = error instanceof TypeError && error.message.includes('fetch') ||
        (error as Error).name === 'AbortError' ||
        config.retryableStatuses.some(status =>
          (error as Error).message.includes(String(status))
        );

      if (isRetryable && attempt < config.maxRetries) {
        const delay = Math.min(
          config.baseDelay * Math.pow(config.backoffMultiplier, attempt),
          config.maxDelay
        );

        config.onRetry(attempt + 1, lastError);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }

      throw error;
    }
  }

  throw lastError!;
}

// React hook for use in components
export function useRetryableFetch<T>() {
  return async (url: string, options?: RequestInit, retryOptions?: RetryOptions) => {
    return fetchWithRetry<T>(url, options, retryOptions);
  };
}

// Cloudflare Worker script for handling 524 errors at the edge
// Deploy this as a Cloudflare Worker in front of your origin
export const cloudflareWorkerScript = `
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const maxRetries = 2
  const baseDelay = 1000

  for (let attempt = 0; attempt <= 2; attempt++) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 110000) // 110s (under Cloudflare's 120s)

      const response = await fetch(request, {
        signal: controller.signal,
        cf: {
          cacheTtl: 0,
          cacheEverything: false,
        }
      })

      clearTimeout(timeoutId)

      // If successful or non-retryable error, return
      if (response.ok || ![524, 502, 503, 504, 408, 429].includes(response.status)) {
        return response
      }

      // Retryable error - wait and retry
      if (attempt < 2) {
        await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempt)))
        continue
      }

      return response
    } catch (error) {
      if (attempt < 2) {
        await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempt)))
        continue
      }
      return new Response('Origin timeout after retries', { status: 504 })
    }
  }

  return new Response('Origin timeout', { status: 504 })
}
`