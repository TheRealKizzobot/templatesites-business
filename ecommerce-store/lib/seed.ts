/**
 * TypeScript wrapper for the CommonJS seed module.
 * Re-exports the seed and getDb functions with proper types.
 */
import { seed as seedFn, getDb as getDbFn } from './seed.cjs';

export const seed = seedFn;
export const getDb = getDbFn;
export type { };