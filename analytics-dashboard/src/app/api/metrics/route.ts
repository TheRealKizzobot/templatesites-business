import { NextResponse } from 'next/server';
import { getAnalytics, setAnalytics } from '@/lib/cookie-store';
import { seedAnalytics } from '@/lib/seed-cookie';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function lastNDates(n: number): string[] {
  const out: string[] = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  for (let i = n - 1; i >= 0; i -= 1) {
    const day = new Date(d);
    day.setDate(d.getDate() - i);
    out.push(`${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`);
  }
  return out;
}

export async function GET(req: Request) {
  await seedAnalytics();
  const data = await getAnalytics();
  
  if (!data) {
    return NextResponse.json({ ok: true, data: { totals: { views: 0, engagement: 0, active_users: 0 }, series: [], trending: [] } });
  }
  
  const totals = {
    views: data.content.reduce((sum, c) => sum + c.views, 0),
    engagement: data.content.reduce((sum, c) => sum + c.engagement, 0),
    active_users: data.content.reduce((sum, c) => sum + c.active_users, 0),
  };
  
  const days = 7;
  const dates = lastNDates(days);
  const byDate = new Map<string, { views: number; engagement: number }>();
  
  for (const stat of data.daily_stats) {
    const cur = byDate.get(stat.stat_date) || { views: 0, engagement: 0 };
    cur.views += stat.views;
    cur.engagement += stat.engagement;
    byDate.set(stat.stat_date, cur);
  }
  
  const series = dates.map(date => {
    const row = byDate.get(date);
    return { date, views: row?.views ?? 0, engagement: row?.engagement ?? 0 };
  });
  
  // Simple trending
  const tagStats = new Map<string, { posts: number; views: number; engagement: number }>();
  for (const item of data.content) {
    const tags = item.tags.split(',').map(t => t.trim()).filter(Boolean);
    for (const tag of tags) {
      const key = tag.toLowerCase();
      const cur = tagStats.get(key) || { posts: 0, views: 0, engagement: 0 };
      cur.posts += 1;
      cur.views += item.views;
      cur.engagement += item.engagement;
      tagStats.set(key, cur);
    }
  }
  
  const trending = [...tagStats.entries()]
    .map(([tag, s]) => ({ tag, ...s }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 6);
  
  return NextResponse.json({ ok: true, data: { totals, series, trending } });
}
