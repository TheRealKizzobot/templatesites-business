import { NextResponse } from 'next/server';
import { getMetrics } from '@/lib/store';
import '@/lib/simulator'; // ensure the live ticker is running

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const metrics = getMetrics(7);
  return NextResponse.json({ ok: true, data: metrics });
}