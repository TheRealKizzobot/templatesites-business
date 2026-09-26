import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type CartItem = {
  id: number;
  name: string;
  price_cents: number;
  image: string;
  qty: number;
};

type CartResponse = {
  ok: true;
  data: {
    items: CartItem[];
    count: number;
  };
} | {
  ok: false;
  error: string;
};

export async function GET(): Promise<NextResponse<CartResponse>> {
  // Cart is managed client-side via localStorage
  // Server doesn't have access to client localStorage
  // Return empty cart - client will hydrate from localStorage
  return NextResponse.json({ ok: true, data: { items: [], count: 0 } });
}

export async function POST(req: NextRequest): Promise<NextResponse<CartResponse>> {
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
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(productId) as {
      id: number;
      name: string;
      price_cents: number;
      image: string;
      stock: number;
    } | undefined;

    if (!product) {
      return NextResponse.json({ ok: false, error: `Product #${productId} no longer exists.` }, { status: 400 });
    }
    if (product.stock <= 0) {
      return NextResponse.json({ ok: false, error: `"${product.name}" is out of stock. Please remove it from your cart.` }, { status: 409 });
    }
    if (product.stock < quantity) {
      return NextResponse.json({ ok: false, error: `Only ${product.stock} of "${product.name}" left in stock. Please adjust the quantity.` }, { status: 409 });
    }

    // Return the validated product data so client can add to localStorage cart
    const item: CartItem = {
      id: product.id,
      name: product.name,
      price_cents: product.price_cents,
      image: product.image,
      qty: Math.min(quantity, product.stock),
    };

    return NextResponse.json({ ok: true, data: { items: [item], count: 1 } });
  } catch (err) {
    console.error('[api/cart]', err);
    return NextResponse.json({ ok: false, error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}