import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest } from '@/lib/auth';
import { NEXT_STATUSES, type BookingStatus } from '@/lib/booking-store';
import { getBookings, setBookings } from '@/lib/cookie-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  }

  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ ok: false, error: 'Invalid booking id.' }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Request body must be valid JSON.' }, { status: 400 });
  }

  const b = (body ?? {}) as Record<string, unknown>;
  const status = typeof b.status === 'string' ? b.status : '';

  const bookings = await getBookings();
  const booking = bookings.find((row) => row.id === id);
  if (!booking) {
    return NextResponse.json({ ok: false, error: 'Booking not found.' }, { status: 404 });
  }

  if (!NEXT_STATUSES[booking.status as BookingStatus].includes(status as BookingStatus)) {
    return NextResponse.json(
      {
        ok: false,
        error: `Cannot transition from "${booking.status}" to "${status}".`,
      },
      { status: 400 }
    );
  }

  booking.status = status as BookingStatus;
  await setBookings(bookings);

  const updated = bookings.find((row) => row.id === id);
  return NextResponse.json({ ok: true, data: updated });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  }

  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ ok: false, error: 'Invalid booking id.' }, { status: 400 });
  }

  const bookings = await getBookings();
  const filtered = bookings.filter((row) => row.id !== id);
  if (filtered.length === bookings.length) {
    return NextResponse.json({ ok: false, error: 'Booking not found.' }, { status: 404 });
  }

  await setBookings(filtered);
  return NextResponse.json({ ok: true, data: { id } });
}
