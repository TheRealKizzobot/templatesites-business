import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function getCart(): { items: { id: number; name: string; price_cents: number; image: string; qty: number }[] } {
  if (typeof window === 'undefined') return { items: [] };
  try {
    const raw = window.localStorage.getItem('northlight-cart-v1');
    if (!raw) return { items: [] };
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return { items: [] };
    return { items: parsed as any };
  } catch {
    return { items: [] };
  }
}

function saveCart(cart: { items: { id: number; name: string; price_cents: number; image: string; qty: number }[] }) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem('northlight-cart-v1', JSON.stringify(cart.items));
  } catch {
    // storage unavailable — keep cart in memory only
  }
}

export async function GET() {
  const cart = getCart();
  return NextResponse.json({ ok: true, data: { items: cart.items, count: cart.items.length } });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId, quantity }: { productId: number; quantity: number } = body;

    if (!Number.isInteger(productId) || productId <= 0) {
      return NextResponse.json({ ok: false, error: 'Valid product_id is required.' }, { status: 400 });
    }
    if (!Number.isInteger(quantity) || quantity < 1) {
      return NextResponse.json({ ok: false, error: 'Quantity must be at least 1.' }, { status: 400 });
    }

    const db = getDb();
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(productId) as any;

    if (!product) {
      return NextResponse.json({ ok: false, error: `Product #${productId} no longer exists.` }, { status: 400 });
    }
    if (product.stock <= 0) {
      return NextResponse.json({ ok: false, error: `"${product.name}" is out of stock. Please remove it from your cart.` }, { status: 409 });
    }
    if (product.stock < quantity) {
      return NextResponse.json({ ok: false, error: `Only ${product.stock} of "${product.name}" left in stock. Please adjust the quantity.` }, { status: 409 });
    }

    const cart = getCart();
    const existing = cart.items.find((i) => i.id === productId);

    if (existing) {
      const newQty = Math.min(existing.qty + quantity, product.stock);
      cart.items = cart.items.map((i) =>
        i.id === productId ? { ...i, qty: newQty } : i
      );
    } else {
      cart.items.push({
        id: productId,
        name: product.name,
        price_cents: product.price_cents,
        image: product.image,
        qty: Math.min(quantity, product.stock),
      });
    }

    saveCart(cart);
    return NextResponse.json({ ok: true, data: { items: cart.items, count: cart.items.length } });
  } catch (err) {
    console.error('[api/cart]', err);
    return NextResponse.json({ ok: false, error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}