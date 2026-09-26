import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { isAdminRequest } from '@/lib/auth';
import {
  NEXT_STATUSES,
  STATUSES,
  type BookingRow,
  type BookingStatus,
} from '@/lib/booking';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function parseId(raw: string): number | null {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!isAdminRequest(req)) {
    return NextResponse.json(
      { ok: false, error: 'Unauthorized.' },
      { status: 401 }
    );
  }
  const db = getDb();

  const { id } = await context.params;
  const numId = parseId(id);
  if (numId === null) {
    return NextResponse.json(
      { ok: false, error: 'Invalid booking id.' },
      { status: 400 }
    );
  }

  const existing = db.prepare('SELECT * FROM bookings WHERE id = ?').get(numId) as
    | BookingRow
    | undefined;
  if (!existing) {
    return NextResponse.json(
      { ok: false, error: 'Booking not found.' },
      { status: 404 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Request body must be valid JSON.' },
      { status: 400 }
    );
  }

  const next = (body as { status?: unknown })?.status;
  if (typeof next !== 'string' || !STATUSES.includes(next as BookingStatus)) {
    return NextResponse.json(
      { ok: false, error: `Invalid status. Allowed: ${STATUSES.join(', ')}.` },
      { status: 400 }
    );
  }

  if (next === existing.status) {
    return NextResponse.json({ ok: true, data: existing });
  }

  const allowed = NEXT_STATUSES[existing.status];
  if (!allowed.includes(next as BookingStatus)) {
    return NextResponse.json(
      {
        ok: false,
        error: `Cannot change a ${existing.status} booking to ${next}. Allowed transitions from ${existing.status}: ${allowed.length ? allowed.join(', ') : 'none'}.`,
      },
      { status: 400 }
    );
  }

  db.prepare('UPDATE bookings SET status = ? WHERE id = ?').run(next, numId);
  const updated = db.prepare('SELECT * FROM bookings WHERE id = ?').get(numId) as BookingRow;
  return NextResponse.json({ ok: true, data: updated });
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!isAdminRequest(req)) {
    return NextResponse.json(
      { ok: false, error: 'Unauthorized.' },
      { status: 401 }
    );
  }
  const db = getDb();

  const { id } = await context.params;
  const numId = parseId(id);
  if (numId === null) {
    return NextResponse.json(
      { ok: false, error: 'Invalid booking id.' },
      { status: 400 }
    );
  }

  const info = db.prepare('DELETE FROM bookings WHERE id = ?').run(numId);
  if (info.changes === 0) {
    return NextResponse.json(
      { ok: false, error: 'Booking not found.' },
      { status: 404 }
    );
  }

  return NextResponse.json({ ok: true, data: { deleted: numId } });
}