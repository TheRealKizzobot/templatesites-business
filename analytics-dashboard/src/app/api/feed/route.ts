import { NextResponse } from 'next/server';
import { listContent, seed } from '@/lib/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  // Auto-seed if database is empty
  seed();
  const items = listContent(20).map((item) => ({
    id: item.id,
    handle: item.handle,
    author: item.author,
    title: item.title,
    body: item.body,
    platform: item.platform,
    tags: item.tags,
    views: item.views,
    engagement: item.engagement,
    active_users: item.active_users,
    created_at: item.created_at,
  }));
  return NextResponse.json({ ok: true, data: { items } });
}