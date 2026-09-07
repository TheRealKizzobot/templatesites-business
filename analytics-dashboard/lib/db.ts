import Database from 'better-sqlite3';
import path from 'node:path';
import fs from 'node:fs';

let db: Database.Database | null = null;

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DATA_DIR, 'analytics.db');

export function getDb(): Database.Database {
  if (!db) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    db = new Database(DB_PATH);
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
  }
  return db;
}