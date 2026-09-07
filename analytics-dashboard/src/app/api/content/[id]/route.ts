import { NextRequest, NextResponse } from 'next/server';
import { getContentById, getDailyStats } from '@/lib/store';
import '@/lib/simulator';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ ok: false, error: 'Invalid content id.' }, { status: 400 });
  }
  const content = getContentById(id);
  if (!content) {
    return NextResponse.json({ ok: false, error: 'Content not found.' }, { status: 404 });
  }
  const daily = getDailyStats(id, 7).map((d) => ({
    date: d.stat_date,
    views: d.views,
    engagement: d.engagement,
  }));
  return NextResponse.json({ ok: true, data: { content, series: daily } });
}