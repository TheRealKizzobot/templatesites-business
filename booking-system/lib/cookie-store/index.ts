import { cookies } from 'next/headers';

const BOOKINGS_KEY = 'emberwood_bookings';

export interface StoredBooking {
  id: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  party_size: number;
  notes: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
}

export async function getBookings(): Promise<StoredBooking[]> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(BOOKINGS_KEY)?.value;
  if (!raw) return [];
  try {
    const parsed = JSON.parse(decodeURIComponent(raw));
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch {
    return [];
  }
}

export async function setBookings(bookings: StoredBooking[]): Promise<void> {
  const cookieStore = await cookies();
  const value = encodeURIComponent(JSON.stringify(bookings));
  cookieStore.set(BOOKINGS_KEY, value, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: false,
    sameSite: 'lax'
  });
}
