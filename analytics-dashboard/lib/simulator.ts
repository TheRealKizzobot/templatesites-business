import { simulateTick } from './store';
import { getDb } from './db';

/**
 * Live data simulator.
 * Starts a module-scoped interval that bumps views / engagement on random
 * content every SIMULATOR_INTERVAL_MS (default 5000) so the dashboard feed
 * and metric cards visibly change while the server runs.
 *
 * Guarded with globalThis so dev-mode HMR / multiple API-route imports never
 * spawn duplicate timers in one process.
 */

const INTERVAL_MS = Math.max(
  1000,
  Number(process.env.SIMULATOR_INTERVAL_MS) || 5000
);

const GLOBAL_KEY = '__metrics_simulator_started__';
let simulatorTimer: ReturnType<typeof setInterval> | null = null;

export function startSimulator(): void {
  if (typeof window !== 'undefined') return; // server-only
  const g = globalThis as Record<string, unknown>;
  if (g[GLOBAL_KEY]) return;
  g[GLOBAL_KEY] = true;

  // Touch the DB once on startup so a fresh (seeded) DB is guaranteed ready.
  // Defer DB access to first tick to avoid failing at module import time on
  // serverless platforms (Vercel) where the filesystem may not be ready yet.
  const timer = setInterval(() => {
    try {
      // Ensure DB is accessible (creates data/ dir and tables if needed)
      getDb();
      const { touched } = simulateTick();
      if (touched === 0) {
        console.warn('[simulator] No content to simulate — run `npm run seed`.');
      }
    } catch (err) {
      // DB might not exist yet (not seeded). Log once per minute instead of every tick.
      const now = Date.now();
      if (!g.__simulator_last_error__ || now - g.__simulator_last_error__ > 60000) {
        console.error('[simulator] tick failed', err);
        g.__simulator_last_error__ = now;
      }
    }
  }, INTERVAL_MS);

  // Don't keep the process alive just for the timer when the server shuts down.
  timer.unref?.();
  simulatorTimer = timer;
  console.log(`[simulator] live updates every ${INTERVAL_MS}ms`);
}

// Allow graceful shutdown (useful for tests)
export function stopSimulator(): void {
  if (simulatorTimer) {
    clearInterval(simulatorTimer);
    simulatorTimer = null;
    const g = globalThis as Record<string, unknown>;
    delete g[GLOBAL_KEY];
    console.log('[simulator] stopped');
  }
}

// Start once when this module is first imported on the server.
// Errors in startSimulator are now handled inside the interval callback.
startSimulator();