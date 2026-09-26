import { NextRequest, NextResponse } from 'next/server';
import { listOrders, getOrderById, getOrderItems, setOrderStatus } from '@/lib/store';
import { isAdminRequest } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  }

  const orders = listOrders();
  const data = orders.map((order) => ({
    ...order,
    items: getOrderItems(order.id),
  }));

  return NextResponse.json({ ok: true, data });
}

export async function PATCH(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Request body must be valid JSON.' }, { status: 400 });
  }

  const { id, status } = body as { id?: unknown; status?: unknown };

  if (!Number.isInteger(id as number) || (id as number) <= 0) {
    return NextResponse.json({ ok: false, error: 'Valid order id is required.' }, { status: 400 });
  }

  if (status !== 'shipped' && status !== 'cancelled') {
    return NextResponse.json({ ok: false, error: 'Status must be one of: shipped, cancelled.' }, { status: 400 });
  }

  const order = getOrderById(id as number);
  if (!order) {
    return NextResponse.json({ ok: false, error: 'Order not found.' }, { status: 404 });
  }

  if (order.status === 'cancelled') {
    return NextResponse.json({ ok: false, error: 'Cancelled orders cannot be modified.' }, { status: 409 });
  }

  const updated = setOrderStatus(id as number, status as 'shipped' | 'cancelled');
  return NextResponse.json({ ok: true, data: updated });
}