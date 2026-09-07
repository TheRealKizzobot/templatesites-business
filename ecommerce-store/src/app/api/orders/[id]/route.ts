import { NextRequest, NextResponse } from 'next/server';
import { getOrderById, getOrderItems, setOrderStatus } from '@/lib/store';
import { isAdminRequest } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  }
  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ ok: false, error: 'Invalid order id.' }, { status: 400 });
  }
  const order = getOrderById(id);
  if (!order) {
    return NextResponse.json({ ok: false, error: 'Order not found.' }, { status: 404 });
  }
  return NextResponse.json({ ok: true, data: { order, items: getOrderItems(id) } });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  }
  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ ok: false, error: 'Invalid order id.' }, { status: 400 });
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

  const status = (body as { status?: unknown })?.status;
  if (status !== 'shipped' && status !== 'cancelled') {
    return NextResponse.json(
      { ok: false, error: 'Status must be one of: shipped, cancelled.' },
      { status: 400 }
    );
  }

  const order = getOrderById(id);
  if (!order) {
    return NextResponse.json({ ok: false, error: 'Order not found.' }, { status: 404 });
  }
  if (order.status === 'cancelled') {
    return NextResponse.json(
      { ok: false, error: 'Cancelled orders cannot be modified.' },
      { status: 409 }
    );
  }

  const updated = setOrderStatus(id, status);
  return NextResponse.json({ ok: true, data: updated });
}