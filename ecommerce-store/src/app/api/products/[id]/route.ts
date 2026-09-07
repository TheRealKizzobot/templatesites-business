import { NextRequest, NextResponse } from 'next/server';
import { getProductById } from '@/lib/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ ok: false, error: 'Invalid product id.' }, { status: 400 });
  }
  const product = getProductById(id);
  if (!product) {
    return NextResponse.json({ ok: false, error: 'Product not found.' }, { status: 404 });
  }
  return NextResponse.json({ ok: true, data: product });
}