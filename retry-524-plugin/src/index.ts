// Retry utility for handling Cloudflare 524 and other transient errors
// Use this for API calls that might hit Cloudflare 524 timeouts
// Works in browser, Node.js, Cloudflare Workers, and Edge runtimes

export interface RetryOptions {
  maxRetries?: number;
  baseDelay?: number;
  maxDelay?: number;
  backoffMultiplier?: number;
  retryableStatuses?: number[];
  onRetry?: (attempt: number, error: Error, response?: Response) => void;
  timeout?: number;
  shouldRetry?: (error: unknown, response?: Response) => boolean;
}

const DEFAULT_OPTIONS: Required<RetryOptions> = {
  maxRetries: 3,
  baseDelay: 1000,
  maxDelay: 10000,
  backoffMultiplier: 2,
  retryableStatuses: [524, 502, 503, 504, 408, 429],
  onRetry: () => {},
  timeout: 120000,
  shouldRetry: (error, response) => {
    if (response && [524, 502, 503, 504, 408, 429].includes(response.status)) {
      return true;
    }
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return true;
    }
    if (error instanceof DOMException && error.name === 'AbortError') {
      return true;
    }
    return false;
  },
};

export interface FetchWithRetryOptions extends RequestInit {
  retry?: RetryOptions;
}

export async function fetchWithRetry<T = unknown>(
  url: string | URL | Request,
  options: FetchWithRetryOptions = {}
): Promise<Response> {
  const { retry, signal, ...fetchOptions } = options;
  const config = { ...DEFAULT_OPTIONS, ...retry };

  let lastError: Error;
  let lastResponse: Response | null = null;

  for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.timeout);

    // Combine signals
    const abortSignal = options.signal
      ? AbortSignal.any([options.signal, controller.signal])
      : controller.signal;

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: abortSignal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (config.retryableStatuses.includes(response.status) && attempt < config.maxRetries) {
          const delay = Math.min(
            config.baseDelay * Math.pow(config.backoffMultiplier, attempt),
            config.maxDelay
          );

          config.onRetry(attempt + 1, new Error(`HTTP ${response.status}`), response);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }

        // Return response even if not ok (let caller handle)
        return response;
      }

      return response;
    } catch (error) {
      const fetchError = error as Error;

      // Check if error is retryable
      const isRetryable = config.shouldRetry(error, null);

      if (isRetryable && attempt < config.maxRetries) {
        const delay = Math.min(
          config.baseDelay * Math.pow(config.backoffMultiplier, attempt),
          config.maxDelay
        );

        config.onRetry(attempt + 1, fetchError, null);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }

      throw error;
    }
  }

  // This should never be reached due to the throw above, but TypeScript needs it
  throw new Error('Max retries exceeded');
}

// Simplified fetch that returns parsed JSON
export async function fetchJson<T = unknown>(
  url: string | URL | Request,
  options: FetchWithRetryOptions = {}
): Promise<T> {
  const response = await fetchWithRetry(url, options);
  return response.json() as Promise<T>;
}

// React hook for use in components
export function useRetryableFetch() {
  return async <T>(url: string | URL | Request, options?: FetchWithRetryOptions) => {
    const response = await fetchWithRetry(url, options);
    return response.json() as Promise<T>;
  };
}

// Cloudflare Worker script for handling 524 errors at the edge
// Deploy this as a Cloudflare Worker in front of your origin
export const cloudflareWorkerScript = `
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
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

// Express/Next.js middleware for handling retries
export function createRetryMiddleware(config: RetryOptions = {}) {
  return async function retryMiddleware(req: Request, next: () => Promise<Response>) {
    const response = await fetchWithRetry(req, {
      method: req.method,
      headers: req.headers,
      body: req.body,
      retry: config,
    });
    return response;
  };
}

// Export default configuration
export const defaultRetryConfig: RetryOptions = {
  maxRetries: 3,
  baseDelay: 1000,
  maxDelay: 10000,
  backoffMultiplier: 2,
  retryableStatuses: [524, 502, 503, 504, 408, 429],
  onRetry: (attempt, error, response) => {
    console.log(`Retry attempt ${attempt}: ${error.message}${response ? ` (HTTP ${response.status})` : ''}`);
  },
  timeout: 120000,
  shouldRetry: (error, response) => {
    if (response && [524, 502, 503, 504, 408, 429].includes(response.status)) {
      return true;
    }
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return true;
    }
    if (error instanceof DOMException && error.name === 'AbortError') {
      return true;
    }
    return false;
  },
};

export default {
  fetchWithRetry,
  fetchJson,
  useRetryableFetch,
  cloudflareWorkerScript,
  createRetryMiddleware,
  defaultRetryConfig,
};