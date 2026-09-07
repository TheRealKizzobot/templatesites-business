#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const Database = require('better-sqlite3');

const dataDir = path.join(__dirname, '..', 'data');
const dbPath = path.join(dataDir, 'booking.db');
fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    party_size INTEGER NOT NULL CHECK (party_size BETWEEN 1 AND 8),
    notes TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','completed','cancelled')),
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE INDEX IF NOT EXISTS idx_bookings_slot ON bookings (date, time, status);
`);

const existing = db.prepare('SELECT COUNT(*) AS n FROM bookings').get().n;
if (existing > 0) {
  console.log(`[seed] Database already exists at ${dbPath}`);
  console.log(`[seed] Table bookings already contains ${existing} rows — skipping inserts.`);
  db.close();
  process.exit(0);
}

function daysFromNow(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

const insert = db.prepare(`
  INSERT INTO bookings (name, email, phone, date, time, party_size, notes, status)
  VALUES (@name, @email, @phone, @date, @time, @party_size, @notes, @status)
`);

// Lunch slots 11:00–12:30 (15-min), dinner 17:00–21:00 (15-min).
// Statuses: pending/confirmed/completed/cancelled. No slot is exhausted
// (each used slot holds far fewer than the 24-cover capacity).
const bookings = [
  { name: 'Maya Novak', email: 'maya.novak@example.com', phone: '555-010-2201', date: daysFromNow(2), time: '19:00', party_size: 4, notes: 'Anniversary — window table if possible.', status: 'pending' },
  { name: 'Theo Lindqvist', email: 'theo@example.com', phone: '555-010-2202', date: daysFromNow(3), time: '11:30', party_size: 2, notes: 'Vegetarian options please.', status: 'pending' },
  { name: 'Priya Raman', email: 'priya.raman@example.com', phone: '555-010-2203', date: daysFromNow(4), time: '18:00', party_size: 6, notes: 'Birthday dinner — bringing a cake.', status: 'confirmed' },
  { name: 'Jonas Weber', email: 'jonas@example.com', phone: '555-010-2204', date: daysFromNow(5), time: '20:30', party_size: 3, notes: '', status: 'confirmed' },
  { name: 'Ava Brennan', email: 'ava.b@example.com', phone: '555-010-2205', date: daysFromNow(6), time: '12:15', party_size: 2, notes: 'Business lunch — quiet table.', status: 'confirmed' },
  { name: 'Sofia Marchetti', email: 'sofia@example.com', phone: '555-010-2206', date: daysFromNow(7), time: '19:45', party_size: 5, notes: 'Wine pairing requested.', status: 'completed' },
  { name: 'Hugo Fontaine', email: 'hugo@example.com', phone: '555-010-2207', date: daysFromNow(9), time: '11:00', party_size: 2, notes: '', status: 'completed' },
  { name: 'Nora Adeyemi', email: 'nora@example.com', phone: '555-010-2208', date: daysFromNow(6), time: '21:00', party_size: 4, notes: 'Dropped reservation — will call to reschedule.', status: 'cancelled' },
];

const inserted = db.transaction((rows) => {
  for (const b of rows) insert.run(b);
  return rows.length;
})(bookings);

const byStatus = db
  .prepare('SELECT status, COUNT(*) AS n FROM bookings GROUP BY status ORDER BY status')
  .all();
const summary = byStatus.map((r) => `${r.status}: ${r.n}`).join(', ');

console.log(`[seed] Created database at ${dbPath}`);
console.log(`[seed] Inserted ${inserted} sample bookings (${summary}).`);
console.log('[seed] Admin login uses ADMIN_PASSWORD env (fallback "admin123").');

db.close();