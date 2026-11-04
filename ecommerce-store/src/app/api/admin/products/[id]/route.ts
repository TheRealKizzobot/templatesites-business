import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest } from '@/lib/auth';
import { getProducts, setProducts } from '@/lib/cookie-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  }

  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ ok: false, error: 'Invalid product id.' }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Request body must be valid JSON.' }, { status: 400 });
  }

  const b = (body ?? {}) as Record<string, unknown>;
  const products = await getProducts();
  const product = products.find((p) => p.id === id);
  
  if (!product) {
    return NextResponse.json({ ok: false, error: 'Product not found.' }, { status: 404 });
  }

  if (typeof b.name === 'string') product.name = b.name.trim();
  if (typeof b.description === 'string') product.description = b.description.trim();
  if (typeof b.price_cents === 'number') product.price_cents = b.price_cents;
  if (typeof b.category === 'string') product.category = b.category.trim();
  if (typeof b.image === 'string') product.image = b.image.trim();
  if (typeof b.stock === 'number') product.stock = b.stock;
  if (typeof b.rating === 'number') product.rating = b.rating;

  await setProducts(products);
  return NextResponse.json({ ok: true, data: product });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  }

  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ ok: false, error: 'Invalid product id.' }, { status: 400 });
  }

  const products = await getProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) {
    return NextResponse.json({ ok: false, error: 'Product not found.' }, { status: 404 });
  }

  await setProducts(filtered);
  return NextResponse.json({ ok: true, data: { id } });
}
