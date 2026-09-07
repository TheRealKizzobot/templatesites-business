#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const Database = require('better-sqlite3');

const dataDir = path.join(__dirname, '..', 'data');
const dbPath = path.join(dataDir, 'store.db');
fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

const TAX_RATE = 0.085;
const SHIPPING_FLAT_CENTS = 800;
const FREE_SHIPPING_THRESHOLD_CENTS = 10000;
const SHIPPING_MSG =
  'Free US shipping on orders over $100 — otherwise a flat $8.00. Tax calculated at checkout (8.5%).';

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL DEFAULT '',
    price_cents INTEGER NOT NULL,
    category TEXT NOT NULL,
    image TEXT NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    rating REAL NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_number TEXT NOT NULL UNIQUE,
    customer_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address_line TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'placed' CHECK (status IN ('placed','shipped','cancelled')),
    subtotal_cents INTEGER NOT NULL,
    shipping_cents INTEGER NOT NULL,
    tax_cents INTEGER NOT NULL,
    total_cents INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    unit_price_cents INTEGER NOT NULL,
    qty INTEGER NOT NULL,
    line_total_cents INTEGER NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_products_category ON products (category);
  CREATE INDEX IF NOT EXISTS idx_orders_created ON orders (created_at);
  CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items (order_id);
`);

const existingProducts = db
  .prepare('SELECT COUNT(*) AS n FROM products')
  .get().n;
const existingOrders = db.prepare('SELECT COUNT(*) AS n FROM orders').get().n;

if (existingProducts > 0 || existingOrders > 0) {
  console.log(`[seed] Database already exists at ${dbPath}`);
  console.log(`[seed] products: ${existingProducts}, orders: ${existingOrders} — skipping inserts.`);
  db.close();
  process.exit(0);
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const products = [
  // ---- Furniture ----
  {
    name: 'Willow Armchair',
    slug: slugify('Willow Armchair'),
    description:
      'A low-slung armchair wrapped in brushed linen, built on a solid oak frame that only gets better with age. The generous seat is filled with a feather-blend cushion that keeps its shape through long afternoons.\n\nThe Willow is scaled for smaller rooms: just wide enough to curl up in, with arms pitched at the perfect resting height for a book and a cup of tea.\n\nPair it with a Northlight throw and a floor lamp for a reading corner worth staying in.',
    price_cents: 48000,
    category: 'Furniture',
    image: '/images/products/chair.svg',
    stock: 8,
    rating: 4.9,
  },
  {
    name: 'Harbor Lounge Chair',
    slug: slugify('Harbor Lounge Chair'),
    description:
      'A relaxed lounge silhouette with a deep seat, low back, and rounded arms — the piece you sink into at the end of the day. Upholstered in a heathered taupe weave that hides everyday life gracefully.\n\nThe frame is kiln-dried hardwood with no-sag springs, so the Harbor keeps its comfort for decades, not seasons.\n\nA natural fit for living rooms, studies, and reading nooks alike.',
    price_cents: 39500,
    category: 'Furniture',
    image: '/images/products/chair.svg',
    stock: 6,
    rating: 4.7,
  },
  {
    name: 'Maple Side Table',
    slug: slugify('Maple Side Table'),
    description:
      'A compact side table turned from solid maple, with a gentle splayed leg and a raised lip that keeps books and cups where they belong. The satin finish is soft to the touch and wipes clean in seconds.\n\nAt 18 inches, it tucks neatly beside sofas, beds, and armchairs without crowding the room.\n\nSmall enough to move around the house on a whim; sturdy enough to stay for years.',
    price_cents: 18500,
    category: 'Furniture',
    image: '/images/products/sideboard.svg',
    stock: 15,
    rating: 4.5,
  },
  // ---- Lighting ----
  {
    name: 'Halo Table Lamp',
    slug: slugify('Halo Table Lamp'),
    description:
      'A softly glowing table lamp with a linen drum shade and a turned walnut base. The light is warm and even — bright enough to read by, gentle enough for a midweek evening.\n\nEvery Halo is hand-assembled and tested for a flicker-free dimmable output.\n\nLives beautifully on nightstands, desks, and sideboards.',
    price_cents: 12900,
    category: 'Lighting',
    image: '/images/products/lamp.svg',
    stock: 20,
    rating: 4.8,
  },
  {
    name: 'Corda Pendant Light',
    slug: slugify('Corda Pendant Light'),
    description:
      'A sculptural pendant with a sand-cast brass canopy and a matte opal glass shade. The cord is cloth-wrapped in a natural twill weave that softens the industrial form.\n\nDrops a focused pool of light over dining tables and kitchen islands alike.\n\nCompatible with any standard ceiling fixture and supplied with a 3-meter drop.',
    price_cents: 21900,
    category: 'Lighting',
    image: '/images/products/lamp.svg',
    stock: 0,
    rating: 4.6,
  },
  {
    name: 'Ember Floor Lamp',
    slug: slugify('Ember Floor Lamp'),
    description:
      'A tall floor lamp with a tapered steel stem and a wide paper shade that washes the corner in warm, diffused light. The foot is weighted so the Ember stands steady on carpet and hardwood.\n\nA rotary dimmer on the stem lets you slide from bright task light to a low, lantern-like glow.\n\nThe finishing piece for a reading chair or a sofa arm.',
    price_cents: 15800,
    category: 'Lighting',
    image: '/images/products/lamp.svg',
    stock: 9,
    rating: 4.4,
  },
  {
    name: 'Wick Candle Set',
    slug: slugify('Wick Candle Set'),
    description:
      'Three hand-poured candles in a votive trio — cedar, amber, and fig leaf — each burning for roughly 25 hours. The wax is a clean soy blend with cotton wicks that burn without soot.\n\nArrives in a gift-ready kraft box with a striker card.\n\nA low-effort way to change the mood of any room.',
    price_cents: 3200,
    category: 'Lighting',
    image: '/images/products/candle.svg',
    stock: 0,
    rating: 4.3,
  },
  // ---- Textiles ----
  {
    name: 'Heirloom Throw Blanket',
    slug: slugify('Heirloom Throw Blanket'),
    description:
      'A heavyweight wool-blend throw woven in a classic plaid, finished with a hand-knotted fringe. Dense enough to feel substantial, soft enough to keep on the couch year-round.\n\nPre-washed so it is pill-resistant and ready for the first nap right out of the box.\n\nA natural match for the Willow Armchair or the Harbor Lounge Chair.',
    price_cents: 9800,
    category: 'Textiles',
    image: '/images/products/textile.svg',
    stock: 18,
    rating: 4.8,
  },
  {
    name: 'Brushed Cotton Duvet Cover',
    slug: slugify('Brushed Cotton Duvet Cover'),
    description:
      'A soft-washed cotton duvet cover with a stonewashed hand and a clean, unbothered drape. The brushed weave traps warmth without the weight, making it a year-round favorite.\n\nHidden button closure and corner ties keep the insert exactly where it belongs.\n\nAvailable in sizes that fit the deeper comforters common in modern bedding.',
    price_cents: 12900,
    category: 'Textiles',
    image: '/images/products/textile.svg',
    stock: 14,
    rating: 4.5,
  },
  {
    name: 'Linen Kitchen Towel Set',
    slug: slugify('Linen Kitchen Towel Set'),
    description:
      'Four absorbent flax-linen towels in muted earth tones, sized to lift a full sheet pan or dry the good glasses without lint. The open weave dries quickly and softens with each wash.\n\nHangs on a loop stitched in at the corner.\n\nThe set that makes you want to do the dishes.',
    price_cents: 3600,
    category: 'Textiles',
    image: '/images/products/textile.svg',
    stock: 24,
    rating: 4.4,
  },
  // ---- Tableware ----
  {
    name: 'Speckled Stoneware Mug',
    slug: slugify('Speckled Stoneware Mug'),
    description:
      'A generous 14 oz stoneware mug with a speckled glaze that varies slightly from piece to piece — no two are identical. The handle is sized for a full four-finger grip and the base sets down with a satisfying clunk.\n\nDishwasher, microwave, and oven safe.\n\nMakes the first coffee of the morning feel intentional.',
    price_cents: 2200,
    category: 'Tableware',
    image: '/images/products/cup.svg',
    stock: 40,
    rating: 4.7,
  },
  {
    name: 'Stoneware Dinner Plate Set',
    slug: slugify('Stoneware Dinner Plate Set'),
    description:
      'A four-piece set of dinner plates in a warm oatmeal glaze with a subtle reactive rim. The plates are hearty without being heavy and stack neatly for everyday storage.\n\nFired at high temperature for a surface that stands up to knives and years of use.\n\nAn easy upgrade for weeknight dinners and Sunday suppers alike.',
    price_cents: 6400,
    category: 'Tableware',
    image: '/images/products/bowl.svg',
    stock: 16,
    rating: 4.6,
  },
  {
    name: 'Layered Glass Serving Bowl',
    slug: slugify('Layered Glass Serving Bowl'),
    description:
      'A hand-blown glass bowl with a soft ribbed profile that plays with light across the table. Sized for salads, fruit, or the occasional holiday centerpiece.\n\nBlemish-free borosilicate glass that stays cool and clear through years of service.\n\nThe kind of piece guests always ask about.',
    price_cents: 5200,
    category: 'Tableware',
    image: '/images/products/bowl.svg',
    stock: 22,
    rating: 4.5,
  },
  // ---- Decor ----
  {
    name: 'Provence Ceramic Vase',
    slug: slugify('Provence Ceramic Vase'),
    description:
      'A hand-thrown ceramic vase with a matte glaze and a slightly asymmetrical silhouette. The wide neck takes a full market bunch without fuss, while the weighted base keeps tall stems steady.\n\nGlazed by hand, so each vase carries its own faint brush marks.\n\nBeautiful empty by a window; even better with two weeks of fresh flowers.',
    price_cents: 4600,
    category: 'Decor',
    image: '/images/products/vase.svg',
    stock: 11,
    rating: 4.9,
  },
  {
    name: 'Terracotta Planter',
    slug: slugify('Terracotta Planter'),
    description:
      'A hand-finished terracotta planter with a drainage saucer and a soft, unglazed body that ages beautifully as it patrols through seasons. The narrow lip keeps the planter cool and the roots happy.\n\nWeathered by hand for a mottled, one-of-a-kind finish.\n\nGive it a generous Monstera or keep it bare as quiet sculpture.',
    price_cents: 3800,
    category: 'Decor',
    image: '/images/products/planter.svg',
    stock: 19,
    rating: 4.6,
  },
  {
    name: 'Dried Floral Arrangement',
    slug: slugify('Dried Floral Arrangement'),
    description:
      'A hand-tied bunch of preserved grasses, papery seed heads, and soft-toned blooms, bound with natural twine. It holds its shape for a year or more with zero watering and zero guilt.\n\nStems are wired, so you can bend and style it to your space.\n\nArrives ready to drop into a vase or lean against a shelf.',
    price_cents: 4400,
    category: 'Decor',
    image: '/images/products/floral.svg',
    stock: 13,
    rating: 4.4,
  },
];

const insertProduct = db.prepare(`
  INSERT INTO products (name, slug, description, price_cents, category, image, stock, rating)
  VALUES (@name, @slug, @description, @price_cents, @category, @image, @stock, @rating)
`);

const productIds = {};
for (const p of products) {
  insertProduct.run(p);
  const row = db
    .prepare('SELECT id, name FROM products WHERE slug = ?')
    .get(p.slug);
  productIds[row.name] = row.id;
}

function daysFromNow(days, hour = 14, minute = 32) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(hour, minute, 0, 0);
  const pad = (n) => String(n).padStart(2, '0');
  const offset = -d.getTimezoneOffset() / 60;
  const tz = `${offset >= 0 ? '+' : '-'}${pad(Math.abs(offset))}:00`;
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:00 ${tz}`;
}

function computeTotals(subtotalCents) {
  const shippingCents = subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS ? 0 : SHIPPING_FLAT_CENTS;
  const taxCents = Math.round(subtotalCents * TAX_RATE);
  return {
    subtotal_cents: subtotalCents,
    shipping_cents: shippingCents,
    tax_cents: taxCents,
    total_cents: subtotalCents + shippingCents + taxCents,
  };
}

const orderNumbers = ['ORD-72KQ4M', 'ORD-N8PL2A', 'ORD-X5RD7B'];
const orders = [
  {
    order_number: orderNumbers[0],
    customer_name: 'Maya Novak',
    email: 'maya.novak@example.com',
    phone: '555-010-2201',
    address_line: '428 Elm Row',
    city: 'Portland',
    state: 'OR',
    zip: '97205',
    status: 'placed',
    created_at: daysFromNow(-1, 15, 44),
    items: [
      { product_id: productIds['Willow Armchair'], qty: 1 },
      { product_id: productIds['Heirloom Throw Blanket'], qty: 1 },
      { product_id: productIds['Halo Table Lamp'], qty: 1 },
    ],
  },
  {
    order_number: orderNumbers[1],
    customer_name: 'Theo Lindqvist',
    email: 'theo.l@example.com',
    phone: '555-011-8843',
    address_line: '12 Birch Court',
    city: 'Boulder',
    state: 'CO',
    zip: '80301',
    status: 'placed',
    created_at: daysFromNow(-3, 11, 12),
    items: [
      { product_id: productIds['Speckled Stoneware Mug'], qty: 4 },
      { product_id: productIds['Layered Glass Serving Bowl'], qty: 1 },
    ],
  },
  {
    order_number: orderNumbers[2],
    customer_name: 'Priya Raman',
    email: 'priya.raman@example.com',
    phone: '555-012-7709',
    address_line: '7 Ash Grove',
    city: 'Austin',
    state: 'TX',
    zip: '78704',
    status: 'shipped',
    created_at: daysFromNow(-6, 9, 28),
    items: [
      { product_id: productIds['Provence Ceramic Vase'], qty: 2 },
      { product_id: productIds['Wick Candle Set'], qty: 1 },
    ],
  },
];

const insertOrder = db.prepare(`
  INSERT INTO orders
    (order_number, customer_name, email, phone, address_line, city, state, zip, status,
     subtotal_cents, shipping_cents, tax_cents, total_cents, created_at)
  VALUES
    (@order_number, @customer_name, @email, @phone, @address_line, @city, @state, @zip, @status,
     @subtotal_cents, @shipping_cents, @tax_cents, @total_cents, @created_at)
`);
const insertItem = db.prepare(`
  INSERT INTO order_items (order_id, product_id, name, unit_price_cents, qty, line_total_cents)
  VALUES (?, ?, ?, ?, ?, ?)
`);

let orderCount = 0;
let itemCount = 0;

for (const order of orders) {
  let subtotal = 0;
  const lines = [];
  for (const line of order.items) {
    const name = Object.keys(productIds).find((k) => productIds[k] === line.product_id);
    const prod = products.find((x) => x.name === name);
    const lineTotal = prod.price_cents * line.qty;
    subtotal += lineTotal;
    lines.push({ id: productIds[prod.name], p: prod, qty: line.qty, lineTotal });
  }
  const totals = computeTotals(subtotal);
  const info = insertOrder.run({ ...order, ...totals });
  const orderId = Number(info.lastInsertRowid);
  for (const l of lines) {
    insertItem.run(orderId, l.id, l.p.name, l.p.price_cents, l.qty, l.lineTotal);
    // Seeded orders are real sales: decrement inventory exactly like createOrder
    // would at checkout, so cancelling a seeded order in the admin panel
    // restocks to the true pre-sale level instead of inflating inventory.
    db.prepare('UPDATE products SET stock = MAX(0, stock - ?) WHERE id = ?').run(l.qty, l.id);
    itemCount += 1;
  }
  orderCount += 1;
}

const pCount = db.prepare('SELECT COUNT(*) AS n FROM products').get().n;
const oCount = db.prepare('SELECT COUNT(*) AS n FROM orders').get().n;
const byCat = db
  .prepare('SELECT category, COUNT(*) AS n FROM products GROUP BY category ORDER BY category')
  .all();
const catSummary = byCat.map((r) => `${r.category}: ${r.n}`).join(', ');
const byStatus = db
  .prepare('SELECT status, COUNT(*) AS n FROM orders GROUP BY status ORDER BY status')
  .all();
const statusSummary = byStatus.map((r) => `${r.status}: ${r.n}`).join(', ');

console.log(`[seed] Created database at ${dbPath}`);
console.log(`[seed] Products: ${pCount} across ${catSummary}.`);
console.log(`[seed] Orders: ${oCount} (${statusSummary}) with ${itemCount} order items.`);
console.log(`[seed] Prices range $${(Math.min(...products.map((p) => p.price_cents)) / 100).toFixed(2)}–$${(Math.max(...products.map((p) => p.price_cents)) / 100).toFixed(2)}.`);
console.log(`[seed] Out of stock (stock = 0): ${products.filter((p) => p.stock === 0).map((p) => p.name).join(', ') || 'none'}.`);
console.log(`[seed] Shipping: ${SHIPPING_MSG}`);
console.log('[seed] Admin login uses ADMIN_PASSWORD env (fallback "admin123").');

db.close();