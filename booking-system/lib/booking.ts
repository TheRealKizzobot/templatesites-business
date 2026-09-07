export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export const STATUSES: readonly BookingStatus[] = [
  'pending',
  'confirmed',
  'completed',
  'cancelled',
];

export const LUNCH_SLOTS = [
  '11:00',
  '11:15',
  '11:30',
  '11:45',
  '12:00',
  '12:15',
  '12:30',
] as const;

export const DINNER_SLOTS = [
  '17:00',
  '17:15',
  '17:30',
  '17:45',
  '18:00',
  '18:15',
  '18:30',
  '18:45',
  '19:00',
  '19:15',
  '19:30',
  '19:45',
  '20:00',
  '20:15',
  '20:30',
  '20:45',
  '21:00',
] as const;

export const ALLOWED_TIMES: readonly string[] = [...LUNCH_SLOTS, ...DINNER_SLOTS];

export const CAPACITY_PER_SLOT = 24;

export const MIN_PARTY_SIZE = 1;
export const MAX_PARTY_SIZE = 8;

export const PARTY_SIZE_LABELS: Record<number, string> = {
  1: 'Just me',
  2: '2 people',
  3: '3 people',
  4: '4 people',
  5: '5 people',
  6: '6 people',
  7: '7 people',
  8: '8 people',
};

export function partySizeLabel(size: number): string {
  return PARTY_SIZE_LABELS[size] ?? `${size} people`;
}

export type BookingInput = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  party_size: number;
  notes?: string;
};

export type BookingRow = {
  id: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  party_size: number;
  notes: string;
  status: BookingStatus;
  created_at: string;
};

export type FieldName =
  | 'name'
  | 'email'
  | 'phone'
  | 'date'
  | 'time'
  | 'party_size'
  | 'notes';

export type ValidationResult =
  | { ok: true; value: BookingInput }
  | { ok: false; field: FieldName; message: string };

function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

export function localToday(): string {
  const now = new Date();
  return `${now.getFullYear()}-${pad2(now.getMonth() + 1)}-${pad2(now.getDate())}`;
}

function str(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
}

/**
 * Shared, dependency-free validation used on both the client (friendly
 * inline errors) and server (authoritative gate).
 */
export function validateBookingInput(raw: unknown): ValidationResult {
  const r = (raw ?? {}) as Record<string, unknown>;

  const name = str(r.name);
  if (name.length < 2) {
    return { ok: false, field: 'name', message: 'Please enter your name (at least 2 characters).' };
  }

  const email = str(r.email);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, field: 'email', message: 'Please enter a valid email address.' };
  }

  const phone = str(r.phone);
  if (phone.length < 7) {
    return { ok: false, field: 'phone', message: 'Please enter a valid phone number (at least 7 digits).' };
  }

  const date = str(r.date);
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!match) {
    return { ok: false, field: 'date', message: 'Please choose a date.' };
  }
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const parsed = new Date(year, month - 1, day);
  if (
    parsed.getFullYear() !== year ||
    parsed.getMonth() !== month - 1 ||
    parsed.getDate() !== day
  ) {
    return { ok: false, field: 'date', message: 'That date is not valid.' };
  }
  const today = localToday();
  if (date < today) {
    return { ok: false, field: 'date', message: 'Please choose a date in the future.' };
  }

  const time = str(r.time);
  if (!ALLOWED_TIMES.includes(time)) {
    return { ok: false, field: 'time', message: 'Please choose a lunch or dinner seating time.' };
  }

  const party_size = Number(r.party_size);
  if (
    !Number.isInteger(party_size) ||
    party_size < MIN_PARTY_SIZE ||
    party_size > MAX_PARTY_SIZE
  ) {
    return {
      ok: false,
      field: 'party_size',
      message: `Party size must be between ${MIN_PARTY_SIZE} and ${MAX_PARTY_SIZE} guests.`,
    };
  }

  if (date === today) {
    const [hh, mm] = time.split(':').map(Number);
    const slotMinutes = hh * 60 + mm;
    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    if (slotMinutes <= nowMinutes + 120) {
      return {
        ok: false,
        field: 'time',
        message: "We need at least 2 hours' notice for today — please pick a later time.",
      };
    }
  }

  return {
    ok: true,
    value: { name, email, phone, date, time, party_size, notes: str(r.notes) },
  };
}

export const NEXT_STATUSES: Record<BookingStatus, readonly BookingStatus[]> = {
  pending: ['confirmed', 'cancelled'],
  confirmed: ['completed', 'cancelled'],
  completed: ['cancelled'],
  cancelled: [],
};

export function countRemainingCovers(
  bookings: Pick<BookingRow, 'date' | 'time' | 'party_size' | 'status'>[],
  date: string,
  time: string
): number {
  const used = bookings
    .filter((b) => b.date === date && b.time === time && b.status !== 'cancelled')
    .reduce((sum, b) => sum + b.party_size, 0);
  return CAPACITY_PER_SLOT - used;
}