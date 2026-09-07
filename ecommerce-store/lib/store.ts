import { getDb } from './db';
import {
  TAX_RATE,
  SHIPPING_FLAT_CENTS,
  FREE_SHIPPING_THRESHOLD_CENTS,
  MAX_QTY_PER_ITEM,
  formatCents,
  computeShipping,
  computeTax,
  computeTotals,
} from './format';
import { PRODUCT_IMAGES } from './catalog';

export {
  TAX_RATE,
  SHIPPING_FLAT_CENTS,
  FREE_SHIPPING_THRESHOLD_CENTS,
  MAX_QTY_PER_ITEM,
  formatCents,
  computeShipping,
  computeTax,
  computeTotals,
} from './format';
export { PRODUCT_IMAGES } from './catalog';

export type Category = string;

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price_cents: number;
  category: Category;
  image: string;
  stock: number;
  rating: number;
  created_at: string;
}

export interface Order {
  id: number;
  order_number: string;
  customer_name: string;
  email: string;
  phone: string;
  address_line: string;
  city: string;
  state: string;
  zip: string;
  status: 'placed' | 'shipped' | 'cancelled';
  subtotal_cents: number;
  shipping_cents: number;
  tax_cents: number;
  total_cents: number;
  created_at: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  name: string;
  unit_price_cents: number;
  qty: number;
  line_total_cents: number;
}

export const ORDER_STATUSES = ['placed', 'shipped', 'cancelled'] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export function generateOrderNumber(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let out = '';
  for (let i = 0; i < 6; i += 1) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return `ORD-${out}`;
}

// ---- Product queries ----

export function getCategories(): Category[] {
  const db = getDb();
  const rows = db
    .prepare('SELECT DISTINCT category FROM products ORDER BY category ASC')
    .all() as { category: string }[];
  return rows.map((r) => r.category);
}

export function getProductById(id: number): Product | null {
  const db = getDb();
  return (db.prepare('SELECT * FROM products WHERE id = ?').get(id) as Product) ?? null;
}

export interface ProductListResult {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  categories: Category[];
}

export function listProducts(params: {
  category?: string;
  q?: string;
  page?: number;
  pageSize?: number;
}): ProductListResult {
  const db = getDb();
  const page = Math.max(1, Number(params.page) || 1);
  const pageSize = Math.min(48, Math.max(1, Number(params.pageSize) || 12));

  const where: string[] = [];
  const args: Array<string | number> = [];

  if (params.category) {
    where.push('category = ?');
    args.push(params.category);
  }
  if (params.q) {
    // Escape LIKE wildcards so a search for "%" or "_" can't match everything.
    const escaped = params.q.replace(/[\\%_]/g, (m) => `\\${m}`);
    where.push("(name LIKE ? ESCAPE '\\' OR description LIKE ? ESCAPE '\\')");
    args.push(`%${escaped}%`, `%${escaped}%`);
  }

  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const total = (
    db.prepare(`SELECT COUNT(*) AS n FROM products ${whereSql}`).get(...args) as { n: number }
  ).n;

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);

  const items = db
    .prepare(
      `SELECT * FROM products ${whereSql}
       ORDER BY datetime(created_at) DESC, id DESC
       LIMIT ? OFFSET ?`
    )
    .all(...args, pageSize, (safePage - 1) * pageSize) as Product[];

  return {
    items,
    total,
    page: safePage,
    pageSize,
    totalPages,
    categories: getCategories(),
  };
}

export function getFeaturedProducts(limit = 4): Product[] {
  const db = getDb();
  return db
    .prepare(
      'SELECT * FROM products ORDER BY rating DESC, id ASC LIMIT ?'
    )
    .all(limit) as Product[];
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  const db = getDb();
  return db
    .prepare(
      'SELECT * FROM products WHERE category = ? AND id != ? ORDER BY rating DESC, id ASC LIMIT ?'
    )
    .all(product.category, product.id, limit) as Product[];
}

// ---- Cart / order math ----
// computeShipping / computeTax / computeTotals are re-exported from
// ../src/lib/format (client-safe) so browser and server always agree.

// ---- Order creation / mutating ----

export interface OrderInput {
  customer: { name: string; email: string; phone: string };
  shipping: { address_line: string; city: string; state: string; zip: string };
  items: Array<{ product_id: number; qty: number }>;
}

export function validateOrderInput(body: unknown): { ok: true; value: OrderInput } | { ok: false; message: string } {
  if (!body || typeof body !== 'object') {
    return { ok: false, message: 'Request body must be an object.' };
  }
  const b = body as Record<string, unknown>;
  const customer = (b.customer ?? {}) as Record<string, unknown>;
  const shipping = (b.shipping ?? {}) as Record<string, unknown>;
  const items = Array.isArray(b.items) ? b.items : [];

  const name = typeof customer.name === 'string' ? customer.name.trim() : '';
  const email = typeof customer.email === 'string' ? customer.email.trim() : '';
  const phone = typeof customer.phone === 'string' ? customer.phone.trim() : '';
  const addressLine = typeof shipping.address_line === 'string' ? shipping.address_line.trim() : '';
  const city = typeof shipping.city === 'string' ? shipping.city.trim() : '';
  const state = typeof shipping.state === 'string' ? shipping.state.trim() : '';
  const zip = typeof shipping.zip === 'string' ? shipping.zip.trim() : '';

  if (!name) return { ok: false, message: 'Customer name is required.' };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: 'A valid email address is required.' };
  }
  if (!phone) return { ok: false, message: 'Phone number is required.' };
  if (!addressLine) return { ok: false, message: 'Street address is required.' };
  if (!city) return { ok: false, message: 'City is required.' };
  if (!state) return { ok: false, message: 'State / region is required.' };
  if (!zip) return { ok: false, message: 'ZIP / postal code is required.' };

  if (items.length === 0) {
    return { ok: false, message: 'Your cart is empty.' };
  }
  if (items.length > 30) {
    return { ok: false, message: 'Too many line items.' };
  }

  const seen = new Set<number>();
  const parsedItems: OrderInput['items'] = [];
  for (const raw of items) {
    const item = (raw ?? {}) as Record<string, unknown>;
    const productId = Number(item.product_id);
    const qty = Number(item.qty);
    if (!Number.isInteger(productId) || productId <= 0) {
      return { ok: false, message: 'Every item needs a valid product_id.' };
    }
    if (!Number.isInteger(qty) || qty < 1 || qty > MAX_QTY_PER_ITEM) {
      return { ok: false, message: `Quantity must be between 1 and ${MAX_QTY_PER_ITEM}.` };
    }
    if (seen.has(productId)) {
      return { ok: false, message: 'Each product can only appear once per order.' };
    }
    seen.add(productId);
    parsedItems.push({ product_id: productId, qty });
  }

  return {
    ok: true,
    value: {
      customer: { name, email, phone },
      shipping: { address_line: addressLine, city, state, zip },
      items: parsedItems,
    },
  };
}

export function createOrder(input: OrderInput): { ok: true; order: Order; items: OrderItem[] } | { ok: false; error: string; code: number } {
  const db = getDb();

  const products: Product[] = [];
  for (const line of input.items) {
    const product = getProductById(line.product_id);
    if (!product) {
      return { ok: false, code: 400, error: `Product #${line.product_id} no longer exists.` };
    }
    if (line.qty > product.stock) {
      return {
        ok: false,
        code: 409,
        error:
          product.stock <= 0
            ? `"${product.name}" is out of stock. Please remove it from your cart.`
            : `Only ${product.stock} of "${product.name}" left in stock. Please adjust the quantity.`,
      };
    }
    products.push(product);
  }

  const subtotalCents = products.reduce(
    (sum, p, i) => sum + p.price_cents * input.items[i].qty,
    0
  );
  const totals = computeTotals(subtotalCents);

  const upsertOrder = (): { order: Order; items: OrderItem[] } => {
    const orderNumber = generateOrderNumber();
    try {
      const info = db
        .prepare(
          `INSERT INTO orders
             (order_number, customer_name, email, phone, address_line, city, state, zip, status,
              subtotal_cents, shipping_cents, tax_cents, total_cents)
           VALUES
             (@order_number, @customer_name, @email, @phone, @address_line, @city, @state, @zip, 'placed',
              @subtotal_cents, @shipping_cents, @tax_cents, @total_cents)`
        )
        .run({
          order_number: orderNumber,
          customer_name: input.customer.name,
          email: input.customer.email,
          phone: input.customer.phone,
          address_line: input.shipping.address_line,
          city: input.shipping.city,
          state: input.shipping.state,
          zip: input.shipping.zip,
          subtotal_cents: totals.subtotal_cents,
          shipping_cents: totals.shipping_cents,
          tax_cents: totals.tax_cents,
          total_cents: totals.total_cents,
        });

      const orderId = Number(info.lastInsertRowid);
      const insertItem = db.prepare(
        `INSERT INTO order_items (order_id, product_id, name, unit_price_cents, qty, line_total_cents)
         VALUES (?, ?, ?, ?, ?, ?)`
      );
      for (const p of products) {
        const line = input.items.find((i) => i.product_id === p.id)!;
        insertItem.run(orderId, p.id, p.name, p.price_cents, line.qty, p.price_cents * line.qty);
      }

      const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId) as Order;
      const items = db
        .prepare('SELECT * FROM order_items WHERE order_id = ? ORDER BY id ASC')
        .all(orderId) as OrderItem[];
      return { order, items };
    } catch (err) {
      if (
        err &&
        typeof err === 'object' &&
        'code' in err &&
        (err as { code?: string }).code === 'SQLITE_CONSTRAINT_UNIQUE'
      ) {
        throw new Error('DUPLICATE');
      }
      throw err;
    }
  };

  let created: { order: Order; items: OrderItem[] } | null = null;
  try {
    created = db.transaction(() => {
      const decrement = db.prepare('UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?');
      for (const p of products) {
        const line = input.items.find((i) => i.product_id === p.id)!;
        const result = decrement.run(line.qty, p.id, line.qty);
        if (result.changes === 0) {
          throw new StockError(`Insufficient stock for "${p.name}".`);
        }
      }
      return upsertOrder();
    })();
  } catch (err) {
    if (err instanceof StockError) {
      return { ok: false, code: 409, error: err.message };
    }
    if (err instanceof Error && err.message === 'DUPLICATE') {
      return { ok: false, code: 500, error: 'Could not generate a unique order number. Please try again.' };
    }
    throw err;
  }

  return { ok: true, order: created.order, items: created.items };
}

class StockError extends Error {}

export function listOrders(): Order[] {
  const db = getDb();
  return db
    .prepare('SELECT * FROM orders ORDER BY datetime(created_at) DESC, id DESC')
    .all() as Order[];
}

export function getOrderById(id: number): Order | null {
  const db = getDb();
  return (db.prepare('SELECT * FROM orders WHERE id = ?').get(id) as Order) ?? null;
}

export function getOrderItems(orderId: number): OrderItem[] {
  const db = getDb();
  return db
    .prepare('SELECT * FROM order_items WHERE order_id = ? ORDER BY id ASC')
    .all(orderId) as OrderItem[];
}

export function setOrderStatus(id: number, status: OrderStatus): Order | null {
  const db = getDb();
  const order = getOrderById(id);
  if (!order) return null;

  db.transaction(() => {
    if (status === 'cancelled' && order.status !== 'cancelled') {
      const items = getOrderItems(id);
      const restock = db.prepare('UPDATE products SET stock = stock + ? WHERE id = ?');
      for (const item of items) {
        restock.run(item.qty, item.product_id);
      }
    }
    db.prepare('UPDATE orders SET status = ? WHERE id = ?').run(status, id);
  })();

  return getOrderById(id);
}

export function adminCreateProduct(input: {
  name: string;
  price_cents: number;
  description: string;
  category: string;
  image: string;
  stock: number;
  rating: number;
}): Product {
  const db = getDb();
  const slug = createProductSlugSync(input.name);
  const info = db
    .prepare(
      `INSERT INTO products (name, slug, description, price_cents, category, image, stock, rating)
       VALUES (@name, @slug, @description, @price_cents, @category, @image, @stock, @rating)`
    )
    .run({ ...input, slug });
  return getProductById(Number(info.lastInsertRowid)) as Product;
}

function createProductSlugSync(name: string): string {
  const db = getDb();
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 48);
  const stem = base || 'product';
  for (let i = 0; i < 10; i += 1) {
    const candidate = i === 0 ? stem : `${stem}-${i + 1}`;
    const exists = db.prepare('SELECT 1 FROM products WHERE slug = ?').get(candidate);
    if (!exists) return candidate;
  }
  return `${stem}-${Date.now()}`;
}

export function adminUpdateProduct(
  id: number,
  changes: Partial<Pick<Product, 'name' | 'price_cents' | 'description' | 'category' | 'image' | 'stock' | 'rating'>>
): Product | null {
  const db = getDb();
  const current = getProductById(id);
  if (!current) return null;

  const fields: string[] = [];
  const set: Array<string | number | null> = [];
  const allowed = ['name', 'price_cents', 'description', 'category', 'image', 'stock', 'rating'] as const;
  for (const key of allowed) {
    if (changes[key] !== undefined) {
      fields.push(`${key} = ?`);
      set.push(changes[key] as string | number);
    }
  }
  if (fields.length === 0) return current;
  set.push(id);
  db.prepare(`UPDATE products SET ${fields.join(', ')} WHERE id = ?`).run(...set);
  return getProductById(id);
}

export function adminDeleteProduct(id: number): boolean {
  const db = getDb();
  const info = db.prepare('DELETE FROM products WHERE id = ?').run(id);
  return info.changes > 0;
}