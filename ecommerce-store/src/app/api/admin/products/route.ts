import { NextRequest, NextResponse } from 'next/server';
import { adminCreateProduct } from '@/lib/store';
import { isAdminRequest } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';


interface ProductInput {
  name: string;
  price_cents: number;
  category: string;
  image: string;
  stock: number;
  rating: number;
  description: string;
}

function parseProductInput(
  body: unknown
): { ok: true; value: ProductInput } | { ok: false; error: string } {
  const b = (body ?? {}) as Record<string, unknown>;

  const name = typeof b.name === 'string' ? b.name.trim() : '';
  if (name.length < 2 || name.length > 120) {
    return { ok: false, error: 'Name must be between 2 and 120 characters.' };
  }

  const price_cents = Number(b.price_cents);
  if (!Number.isInteger(price_cents) || price_cents <= 0 || price_cents > 100_000_000) {
    return { ok: false, error: 'price_cents must be a positive whole number of cents.' };
  }

  const category = typeof b.category === 'string' ? b.category.trim() : '';
  if (category.length < 2 || category.length > 60) {
    return { ok: false, error: 'Category must be between 2 and 60 characters.' };
  }

  const image = typeof b.image === 'string' ? b.image.trim() : '';
  if (!image.startsWith('/images/products/') || !image.endsWith('.svg')) {
    return { ok: false, error: 'Image must point to a product SVG in /images/products.' };
  }

  const stock = Number(b.stock);
  if (!Number.isInteger(stock) || stock < 0 || stock > 1_000_000) {
    return { ok: false, error: 'Stock must be a whole number between 0 and 1,000,000.' };
  }

  const rating = Number(b.rating);
  if (!Number.isFinite(rating) || rating < 0 || rating > 5) {
    return { ok: false, error: 'Rating must be between 0 and 5.' };
  }

  const description = typeof b.description === 'string' ? b.description.trim() : '';
  if (description.length < 10) {
    return { ok: false, error: 'Description must be at least 10 characters.' };
  }

  return { ok: true, value: { name, price_cents, category, image, stock, rating, description } };
}

export async function POST(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Request body must be valid JSON.' }, { status: 400 });
  }

  const parsed = parseProductInput(body);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }

  const product = adminCreateProduct(parsed.value);
  return NextResponse.json({ ok: true, data: product }, { status: 201 });
}