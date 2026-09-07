#!/usr/bin/env node
/**
 * Metrics — Analytics Dashboard seed script.
 * Creates data/analytics.db, 18 content items, and 7 days of daily_stats
 * per item so charts have history on first run. Idempotent: existing DB
 * with content is left untouched.
 */
const path = require('node:path');
const fs = require('node:fs');

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DATA_DIR, 'analytics.db');

let Database;
try {
  Database = require('better-sqlite3');
} catch {
  console.error('[seed] better-sqlite3 is not installed. Run `npm install` first.');
  process.exit(1);
}

fs.mkdirSync(DATA_DIR, { recursive: true });

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');
db.exec(`
  CREATE TABLE IF NOT EXISTS content (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    handle TEXT NOT NULL,
    author TEXT NOT NULL,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    platform TEXT NOT NULL,
    tags TEXT NOT NULL,
    views INTEGER NOT NULL DEFAULT 0,
    engagement INTEGER NOT NULL DEFAULT 0,
    active_users INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS daily_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content_id INTEGER NOT NULL REFERENCES content(id) ON DELETE CASCADE,
    stat_date TEXT NOT NULL,
    views INTEGER NOT NULL DEFAULT 0,
    engagement INTEGER NOT NULL DEFAULT 0,
    UNIQUE (content_id, stat_date)
  );

  CREATE INDEX IF NOT EXISTS idx_content_created ON content (created_at DESC);
  CREATE INDEX IF NOT EXISTS idx_daily_stats_content ON daily_stats (content_id, stat_date);
`);

const existing = db.prepare('SELECT COUNT(*) AS n FROM content').get().n;
if (existing > 0) {
  console.log(`[seed] Database already seeded (${existing} content items) — skipping.`);
  db.close();
  process.exit(0);
}

/** Deterministic-but-varied pseudo random so a fresh seed looks organic. */
let seedState = 42;
function rnd() {
  seedState = (seedState * 1664525 + 1013904223) % 4294967296;
  return seedState / 4294967296;
}
function randInt(min, max) {
  return Math.floor(rnd() * (max - min + 1)) + min;
}

const PLATFORMS = [
  ['X', '#c94a4a'],
  ['Instagram', '#b07d2b'],
  ['LinkedIn', '#3d7a4e'],
] ;

const ITEMS = [
  ['@northlight', 'Maya Chen', 'Spring lookbook is live', 'Our spring lookbook is live — 22 pages of slower, warmer homes. Link in bio.', 'X', 'launch,spring,home'],
  ['@northlight', 'Maya Chen', 'Candle restock', 'The Wick Candle Set is back in stock. 8oz, 45h burn, made in Portland.', 'X', 'candles,restock,home'],
  ['@taskflowhq', 'Daria Kim', 'New board templates', 'Just shipped 12 new board templates for product teams. Free for everyone.', 'X', 'launch,productivity,saas'],
  ['@taskflowhq', 'Daria Kim', 'We hit 40k makers', '40,000 makers now plan their week with TaskFlow. Thank you! Chart below is 7-day signups.', 'X', 'milestone,saas,growth'],
  ['@metricsapp', 'Leo Park', 'Realtime dashboards', 'Why we rebuilt our realtime layer: polling is dead, push is the future. Full write-up.', 'LinkedIn', 'engineering,realtime,data'],
  ['@metricsapp', 'Leo Park', '7-day engagement deep dive', 'Engagement is up 18% week-over-week after the notification cleanup. Details in the thread.', 'X', 'growth,engagement,data'],
  ['@metricsapp', 'Leo Park', 'Charting at scale', '120k points per view and still 60fps. How we memoize Recharts.', 'LinkedIn', 'engineering,charts,data'],
  ['@emberwood', 'Sam Rivera', 'Reservation windows open', 'Dinner reservations for March are open. 17:00–21:00, 15-minute slots.', 'Instagram', 'restaurant,reservations,local'],
  ['@emberwood', 'Sam Rivera', 'Chef’s tasting menu', 'Five courses, five wines, one long table. Saturdays in the back room.', 'Instagram', 'menus,food,local'],
  ['@emberwood', 'Sam Rivera', 'Sunday suppers', 'Family-style suppers every Sunday. $32 per guest, kids eat free.', 'X', 'menus,family,local'],
  ['@northlight', 'Maya Chen', 'Textiles restock', 'Hand-woven throws, 60 colors. Once they’re gone, they’re gone until autumn.', 'Instagram', 'textiles,restock,home'],
  ['@northlight', 'Maya Chen', 'Designing for slow living', 'A short film about how we choose every material that enters the shop.', 'Instagram', 'film,craft,home'],
  ['@taskflowhq', 'Daria Kim', 'Keyboard-first tips', '10 shortcuts that save our team an hour a day. #productivity', 'X', 'tips,productivity,saas'],
  ['@taskflowhq', 'Daria Kim', 'Integrations roundup', 'Slack, GitHub, Notion and 40 more. Your tasks, wherever you work.', 'LinkedIn', 'integrations,productivity,saas'],
  ['@metricsapp', 'Leo Park', 'Trending topics API', 'We shipped a trending topics endpoint — 5 lines to drop it into your dashboard.', 'X', 'api,realtime,data'],
  ['@metricsapp', 'Leo Park', 'What we measure', 'Views are vanity, engagement is sanity, retention is the whole game. Our framework.', 'LinkedIn', 'metrics,engagement,data'],
  ['@emberwood', 'Sam Rivera', 'Farm visit', 'We visited the dairy that makes our burrata. Photos from the road.', 'Instagram', 'food,local,behindthescenes'],
  ['@emberwood', 'Sam Rivera', 'Book your table', 'Walk-ins welcome, reservations recommended. See you at Ember & Wood.', 'Instagram', 'reservations,local,food'],
];

const now = Date.now();
const HOUR = 1000 * 60 * 60;
const DAY = 24 * HOUR;

const insertContent = db.prepare(
  `INSERT INTO content (handle, author, title, body, platform, tags, views, engagement, active_users, created_at)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
);
const insertStat = db.prepare(
  `INSERT INTO daily_stats (content_id, stat_date, views, engagement)
   VALUES (?, ?, ?, ?)`
);

ITEMS.forEach((item, i) => {
  const [handle, author, title, body, platform, tags] = item;
  // Older items get more history; recency is spread over the last 36 hours.
  const created = new Date(now - i * (3.5 * HOUR) - randInt(0, 4) * HOUR);
  const baseViews = randInt(900, 42000);
  const baseEng = Math.round(baseViews * (0.04 + rnd() * 0.10));
  const active = randInt(8, 140);

  const { lastInsertRowid } = insertContent.run(
    handle, author, title, body, platform, tags,
    baseViews, baseEng, active,
    created.toISOString().replace('T', ' ').slice(0, 19)
  );
  const contentId = Number(lastInsertRowid);

  // Per-item growth curve: some posts pop, others plateau.
  const growth = 0.5 + rnd() * 1.6;
  for (let d = 6; d >= 0; d -= 1) {
    const day = new Date(created.getTime() - d * DAY);
    const ageDays = 6 - d;
    const viewShare = Math.max(0.02, 1 - ageDays * 0.18 * growth);
    const dayViews = Math.max(40, Math.round(baseViews * viewShare * (0.75 + rnd() * 0.5)));
    const dayEng = Math.max(3, Math.round(dayViews * (0.04 + rnd() * 0.09)));
    insertStat.run(contentId, day.toISOString().slice(0, 10), dayViews, dayEng);
  }
});

console.log(`[seed] Created ${ITEMS.length} content items with 7 days of history each.`);
console.log('[seed] Simulator bumps views/engagement every 5s while the server runs.');
console.log('[seed] Run `npm run dev` then open http://localhost:3000/dashboard');
db.close();