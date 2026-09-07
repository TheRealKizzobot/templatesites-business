import { NextRequest, NextResponse } from 'next/server';
import { listProducts } from '@/lib/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const result = listProducts({
    category: params.get('category') ?? undefined,
    q: params.get('q') ?? undefined,
    page: Number(params.get('page')) || 1,
    pageSize: Number(params.get('pageSize')) || 12,
  });
  return NextResponse.json({ ok: true, data: result });
}