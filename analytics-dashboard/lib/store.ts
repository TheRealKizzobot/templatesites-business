import { getDb } from './db';

export interface ContentItem {
  id: number;
  handle: string;
  author: string;
  title: string;
  body: string;
  platform: string;
  tags: string;
  views: number;
  engagement: number;
  active_users: number;
  created_at: string;
}

export interface DailyStat {
  stat_date: string;
  views: number;
  engagement: number;
}

export interface SeriesPoint {
  date: string;
  views: number;
  engagement: number;
}

export interface TrendingTopic {
  tag: string;
  posts: number;
  views: number;
  engagement: number;
}

export interface Metrics {
  totals: { views: number; engagement: number; active_users: number };
  series: SeriesPoint[];
  trending: TrendingTopic[];
}

function parseTags(tags: string): string[] {
  return tags
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
}

/** Last N days as 'YYYY-MM-DD' (local calendar), oldest -> newest. */
export function lastNDates(n: number): string[] {
  const out: string[] = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  for (let i = n - 1; i >= 0; i -= 1) {
    const day = new Date(d);
    day.setDate(d.getDate() - i);
    out.push(localDate(day));
  }
  return out;
}

export function listContent(limit = 50): ContentItem[] {
  const db = getDb();
  return db
    .prepare(
      `SELECT * FROM content
       ORDER BY datetime(created_at) DESC, id DESC
       LIMIT ?`
    )
    .all(limit) as ContentItem[];
}

export function getContentById(id: number): ContentItem | null {
  const db = getDb();
  return (
    (db.prepare(`SELECT * FROM content WHERE id = ?`).get(id) as ContentItem) ?? null
  );
}

export function getDailyStats(contentId: number, days = 7): DailyStat[] {
  const db = getDb();
  return db
    .prepare(
      `SELECT stat_date, views, engagement FROM daily_stats
       WHERE content_id = ?
       ORDER BY stat_date ASC
       LIMIT ?`
    )
    .all(contentId, days) as DailyStat[];
}

export function getSeries(days = 7): SeriesPoint[] {
  const db = getDb();
  const dates = lastNDates(days);
  const rows = db
    .prepare(
      `SELECT stat_date, SUM(views) AS views, SUM(engagement) AS engagement
       FROM daily_stats
       WHERE stat_date >= ?
       GROUP BY stat_date
       ORDER BY stat_date ASC`
    )
    .all(dates[0]) as { stat_date: string; views: number; engagement: number }[];
  const byDate = new Map(rows.map((r) => [r.stat_date, r]));
  return dates.map((date) => {
    const row = byDate.get(date);
    return {
      date,
      views: row?.views ?? 0,
      engagement: row?.engagement ?? 0,
    };
  });
}

export function getTrending(limit = 6): TrendingTopic[] {
  const db = getDb();
  // Simple: aggregate media tags by recent 7-day views — this surfaces
  // "what's moving" without overcomplicating the demo.
  const rows = db
    .prepare(
      `SELECT
         COUNT(DISTINCT c.id) AS posts,
         SUM(c.views) AS views,
         SUM(c.engagement) AS engagement
       FROM content c`
    )
    .get() as { posts: number; views: number; engagement: number };

  const items = listContent(200);
  const tagStats = new Map<
    string,
    { posts: number; views: number; engagement: number }
  >();
  for (const item of items) {
    // Weight recent items a bit more so trending feels live.
    const weight = Math.max(0.5, 1 - (Date.now() - Date.parse(item.created_at)) / (1000 * 60 * 60 * 24 * 14));
    for (const tag of parseTags(item.tags)) {
      const key = tag.toLowerCase();
      const cur = tagStats.get(key) ?? { posts: 0, views: 0, engagement: 0 };
      cur.posts += 1;
      cur.views += Math.round(item.views * weight);
      cur.engagement += Math.round(item.engagement * weight);
      tagStats.set(key, cur);
    }
  }
  const out = [...tagStats.entries()]
    .map(([tag, s]) => ({ tag, ...s }))
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
  if (out.length === 0) {
    return [{ tag: '#analytics', posts: rows.posts, views: rows.views, engagement: rows.engagement }];
  }
  return out;
}

export function getMetrics(days = 7): Metrics {
  const db = getDb();
  const totals = db
    .prepare(
      `SELECT
         COALESCE(SUM(views), 0) AS views,
         COALESCE(SUM(engagement), 0) AS engagement,
         COALESCE(SUM(active_users), 0) AS active_users
       FROM content`
    )
    .get() as { views: number; engagement: number; active_users: number };
  return {
    totals: {
      views: Number(totals.views),
      engagement: Number(totals.engagement),
      active_users: Number(totals.active_users),
    },
    series: getSeries(days),
    trending: getTrending(),
  };
}

/** Bump a live "tick": increment views/engagement on a few random items. */
export function simulateTick(): { touched: number } {
  const db = getDb();
  const items = db
    .prepare(`SELECT id FROM content ORDER BY RANDOM() LIMIT 3`)
    .all() as { id: number }[];
  const today = localDate(new Date());
  for (const { id } of items) {
    const views = Math.floor(Math.random() * 14) + 4;
    const engagement = Math.floor(Math.random() * 6) + 1;
    // "Active now" follows the newest engagement: small, fluctuating, alive.
    const active = Math.max(2, Math.round(views / 3) + Math.floor(Math.random() * 6));
    db.prepare(
      `UPDATE content
       SET views = views + ?, engagement = engagement + ?, active_users = ?
       WHERE id = ?`
    ).run(views, engagement, active, id);
    db.prepare(
      `INSERT INTO daily_stats (content_id, stat_date, views, engagement)
       VALUES (?, ?, ?, ?)
       ON CONFLICT(content_id, stat_date)
       DO UPDATE SET views = views + excluded.views,
                     engagement = engagement + excluded.engagement`
    ).run(id, today, views, engagement);
  }
  return { touched: items.length };
}

/** Format a Date as a local-calendar 'YYYY-MM-DD' (not UTC). Used by the simulator
 *  and seed so that bumps land on the same day the 7-day chart reads, regardless
 *  of where the server is hosted. */
export function localDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}