import { NextRequest, NextResponse } from 'next/server';
import { createOrder, getOrderItems, listOrders, validateOrderInput } from '@/lib/store';
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

  const validated = validateOrderInput(body);
  if (!validated.ok) {
    return NextResponse.json({ ok: false, error: validated.message }, { status: 400 });
  }

  const result = createOrder(validated.value);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: result.code });
  }

  return NextResponse.json(
    { ok: true, data: { order: result.order, items: result.items } },
    { status: 201 }
  );
}