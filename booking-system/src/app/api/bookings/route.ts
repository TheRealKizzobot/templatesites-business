import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import {
  ADMIN_COOKIE,
  isAdminRequest,
  verifyAdminToken,
} from '@/lib/auth';
import {
  CAPACITY_PER_SLOT,
  STATUSES,
  validateBookingInput,
  type BookingRow,
  type BookingStatus,
} from '@/lib/booking';

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
  const db = getDb();

  if (status) {
    if (!STATUSES.includes(status as BookingStatus)) {
      return NextResponse.json(
        { ok: false, error: `Invalid status filter. Allowed: ${STATUSES.join(', ')}.` },
        { status: 400 }
      );
    }
    const rows = db
      .prepare(
        'SELECT * FROM bookings WHERE status = ? ORDER BY date DESC, time DESC, id DESC'
      )
      .all(status);
    return NextResponse.json({ ok: true, data: rows });
  }

  const rows = db
    .prepare('SELECT * FROM bookings ORDER BY date DESC, time DESC, id DESC')
    .all();
  return NextResponse.json({ ok: true, data: rows });
}

export async function POST(req: NextRequest) {
  const db = getDb();

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

  const capacity = db
    .prepare(
      `SELECT COALESCE(SUM(party_size), 0) AS covers
       FROM bookings
       WHERE date = ? AND time = ? AND status != 'cancelled'`
    )
    .get(value.date, value.time) as { covers: number };

  const remaining = CAPACITY_PER_SLOT - capacity.covers;
  if (value.party_size > remaining) {
    const error =
      remaining <= 0
        ? `Sorry — we're fully booked for ${value.date} at ${value.time}. Please try another time.`
        : `Sorry — only ${remaining} cover${remaining === 1 ? '' : 's'} left for ${value.date} at ${value.time}. Please adjust your party size or pick another time.`;
    return NextResponse.json({ ok: false, error }, { status: 409 });
  }

  const info = db
    .prepare(
      `INSERT INTO bookings (name, email, phone, date, time, party_size, notes, status)
       VALUES (@name, @email, @phone, @date, @time, @party_size, @notes, 'pending')`
    )
    .run({ ...value, notes: value.notes ?? '' });

  const created = db
    .prepare('SELECT * FROM bookings WHERE id = ?')
    .get(info.lastInsertRowid) as BookingRow;

  return NextResponse.json({ ok: true, data: created }, { status: 201 });
}