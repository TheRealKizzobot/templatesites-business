import { cookies } from 'next/headers';

const PRODUCT_KEY = 'northlight_products';
const ORDER_KEY = 'northlight_orders';
const CART_KEY = 'northlight_cart_session';

export interface StoredProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  price_cents: number;
  category: string;
  image: string;
  stock: number;
  rating: number;
  created_at: string;
}

export interface StoredOrderItem {
  id: number;
  order_id: number;
  product_id: number;
  name: string;
  unit_price_cents: number;
  qty: number;
  line_total_cents: number;
}

export interface StoredOrder {
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
  items: StoredOrderItem[];
}

export interface StoredCartItem {
  product_id: number;
  qty: number;
}

function getCookieValue(name: string): string | undefined {
  // This will be called from server components/routes
  try {
    // We'll use cookies() from next/headers in the functions
    return undefined;
  } catch {
    return undefined;
  }
}

export async function getProducts(): Promise<StoredProduct[]> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(PRODUCT_KEY)?.value;
  if (!raw) return [];
  try {
    const parsed = JSON.parse(decodeURIComponent(raw));
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch {
    return [];
  }
}

export async function setProducts(products: StoredProduct[]): Promise<void> {
  const cookieStore = await cookies();
  // Use a cookie that can store reasonable data - for small stores it's fine
  // In practice, httpOnly cookies have size limits, but for demo data it's okay
  const value = encodeURIComponent(JSON.stringify(products));
  cookieStore.set(PRODUCT_KEY, value, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    httpOnly: false, // Need to be readable by client
    sameSite: 'lax'
  });
}

export async function getOrders(): Promise<StoredOrder[]> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(ORDER_KEY)?.value;
  if (!raw) return [];
  try {
    const parsed = JSON.parse(decodeURIComponent(raw));
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch {
    return [];
  }
}

export async function setOrders(orders: StoredOrder[]): Promise<void> {
  const cookieStore = await cookies();
  const value = encodeURIComponent(JSON.stringify(orders));
  cookieStore.set(ORDER_KEY, value, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: false,
    sameSite: 'lax'
  });
}

export async function getCartSession(): Promise<StoredCartItem[]> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(CART_KEY)?.value;
  if (!raw) return [];
  try {
    const parsed = JSON.parse(decodeURIComponent(raw));
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch {
    return [];
  }
}

export async function setCartSession(cart: StoredCartItem[]): Promise<void> {
  const cookieStore = await cookies();
  const value = encodeURIComponent(JSON.stringify(cart));
  cookieStore.set(CART_KEY, value, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    httpOnly: false,
    sameSite: 'lax'
  });
}
