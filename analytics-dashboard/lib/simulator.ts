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

export function startSimulator(): void {
  if (typeof window !== 'undefined') return; // server-only
  const g = globalThis as Record<string, unknown>;
  if (g[GLOBAL_KEY]) return;
  g[GLOBAL_KEY] = true;

  // Touch the DB once on startup so a fresh (seeded) DB is guaranteed ready.
  try {
    getDb();
  } catch {
    // If the DB is missing, the seed script hasn't run yet — log and continue;
    // API routes will surface a clear error.
    console.warn('[simulator] analytics.db not ready — did you run `npm run seed`?');
  }

  const timer = setInterval(() => {
    try {
      const { touched } = simulateTick();
      if (touched === 0) {
        console.warn('[simulator] No content to simulate — run `npm run seed`.');
      }
    } catch (err) {
      console.error('[simulator] tick failed', err);
    }
  }, INTERVAL_MS);

  // Don't keep the process alive just for the timer when the server shuts down.
  timer.unref?.();
  console.log(`[simulator] live updates every ${INTERVAL_MS}ms`);
}

// Start once when this module is first imported on the server.
startSimulator();