/**
 * Client-safe money + date helpers.
 * NO node imports here — this module is imported by client components
 * (cart, checkout, product pages) AND re-exported from lib/store.ts so the
 * server and browser always agree on pricing rules.
 */

export const TAX_RATE = 0.085;
export const SHIPPING_FLAT_CENTS = 800;
export const FREE_SHIPPING_THRESHOLD_CENTS = 10000;
export const MAX_QTY_PER_ITEM = 20;

export function formatCents(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export function computeShipping(subtotalCents: number): number {
  return subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS ? 0 : SHIPPING_FLAT_CENTS;
}

export function computeTax(subtotalCents: number): number {
  return Math.round(subtotalCents * TAX_RATE);
}

/** Same shape as the server's computeTotals (snake_case) so totals always match. */
export function computeTotals(subtotalCents: number) {
  const shipping_cents = computeShipping(subtotalCents);
  const tax_cents = computeTax(subtotalCents);
  return {
    subtotal_cents: subtotalCents,
    shipping_cents,
    tax_cents,
    total_cents: subtotalCents + shipping_cents + tax_cents,
  };
}

/** Normalize SQLite datetime strings ("YYYY-MM-DD HH:MM:SS" or "... +HH:00") to a Date. */
export function parseDate(value: string | Date): Date {
  if (value instanceof Date) return value;
  let s = value.trim();
  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(s)) {
    // SQLite datetime('now') — stored as UTC with no timezone marker.
    return new Date(`${s.replace(' ', 'T')}Z`);
  }
  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} [+-]\d{2}:\d{2}$/.test(s)) {
    s = s.replace(' ', 'T');
  }
  return new Date(s);
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date.getTime());
  d.setDate(d.getDate() + days);
  return d;
}

export function formatDate(value: string | Date): string {
  const d = parseDate(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function formatShortDate(value: string | Date): string {
  const d = parseDate(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function formatDateTime(value: string | Date): string {
  const d = parseDate(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}