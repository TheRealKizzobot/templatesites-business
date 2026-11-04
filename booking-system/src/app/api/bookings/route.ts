import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest } from '@/lib/auth';
import {
  CAPACITY_PER_SLOT,
  STATUSES,
  validateBookingInput,
  type BookingRow,
  type BookingStatus,
  getAllBookings,
  createBooking,
} from '@/lib/booking-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json(
      { ok: false, error: 'Unauthorized.' },
      { status: 401 }
    );
  }

  const status = req.nextUrl.searchParams.get('status');
  const bookings = await getAllBookings();

  if (status) {
    if (!STATUSES.includes(status as BookingStatus)) {
      return NextResponse.json(
        { ok: false, error: `Invalid status filter. Allowed: ${STATUSES.join(', ')}.` },
        { status: 400 }
      );
    }
    const rows = bookings
      .filter(b => b.status === status)
      .sort((a, b) => {
        if (a.date !== b.date) return b.date.localeCompare(a.date);
        if (a.time !== b.time) return b.time.localeCompare(a.time);
        return b.id - a.id;
      });
    return NextResponse.json({ ok: true, data: rows });
  }

  const rows = bookings.sort((a, b) => {
    if (a.date !== b.date) return b.date.localeCompare(a.date);
    if (a.time !== b.time) return b.time.localeCompare(a.time);
    return b.id - a.id;
  });
  return NextResponse.json({ ok: true, data: rows });
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Request body must be valid JSON.' },
      { status: 400 }
    );
  }

  const result = validateBookingInput(body);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.message }, { status: 400 });
  }
  const { value } = result;

  const bookings = await getAllBookings();
  const capacity = bookings
    .filter(b => b.date === value.date && b.time === value.time && b.status !== 'cancelled')
    .reduce((sum, b) => sum + b.party_size, 0);

  const remaining = CAPACITY_PER_SLOT - capacity;
  if (value.party_size > remaining) {
    const error =
      remaining <= 0
        ? `Sorry — we're fully booked for ${value.date} at ${value.time}. Please try another time.`
        : `Sorry — only ${remaining} cover${remaining === 1 ? '' : 's'} left for ${value.date} at ${value.time}. Please adjust your party size or pick another time.`;
    return NextResponse.json({ ok: false, error }, { status: 409 });
  }

  const created = await createBooking(value);
  if (!created) {
    return NextResponse.json({ ok: false, error: 'Unable to create booking.' }, { status: 409 });
  }

  return NextResponse.json({ ok: true, data: created }, { status: 201 });
}
