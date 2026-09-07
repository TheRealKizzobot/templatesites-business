import { NextRequest, NextResponse } from 'next/server';
import { adminUpdateProduct, adminDeleteProduct } from '@/lib/store';
import { isAdminRequest } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type PATCH_BODY = {
  name?: unknown;
  price_cents?: unknown;
  category?: unknown;
  image?: unknown;
  stock?: unknown;
  rating?: unknown;
  description?: unknown;
};


function validatePatch(body: PATCH_BODY): { ok: true; changes: Record<string, string | number> } | { ok: false; error: string } {
  const changes: Record<string, string | number> = {};

  if (body.name !== undefined) {
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    if (name.length < 2 || name.length > 120) {
      return { ok: false, error: 'Name must be between 2 and 120 characters.' };
    }
    changes.name = name;
  }
  if (body.price_cents !== undefined) {
    const price_cents = Number(body.price_cents);
    if (!Number.isInteger(price_cents) || price_cents <= 0 || price_cents > 100_000_000) {
      return { ok: false, error: 'price_cents must be a positive whole number of cents.' };
    }
    changes.price_cents = price_cents;
  }
  if (body.category !== undefined) {
    const category = typeof body.category === 'string' ? body.category.trim() : '';
    if (category.length < 2 || category.length > 60) {
      return { ok: false, error: 'Category must be between 2 and 60 characters.' };
    }
    changes.category = category;
  }
  if (body.image !== undefined) {
    const image = typeof body.image === 'string' ? body.image.trim() : '';
    if (!image.startsWith('/images/products/') || !image.endsWith('.svg')) {
      return { ok: false, error: 'Image must point to a product SVG in /images/products.' };
    }
    changes.image = image;
  }
  if (body.stock !== undefined) {
    const stock = Number(body.stock);
    if (!Number.isInteger(stock) || stock < 0 || stock > 1_000_000) {
      return { ok: false, error: 'Stock must be a whole number between 0 and 1,000,000.' };
    }
    changes.stock = stock;
  }
  if (body.rating !== undefined) {
    const rating = Number(body.rating);
    if (!Number.isFinite(rating) || rating < 0 || rating > 5) {
      return { ok: false, error: 'Rating must be between 0 and 5.' };
    }
    changes.rating = rating;
  }
  if (body.description !== undefined) {
    const description = typeof body.description === 'string' ? body.description.trim() : '';
    if (description.length < 10) {
      return { ok: false, error: 'Description must be at least 10 characters.' };
    }
    changes.description = description;
  }

  return { ok: true, changes };
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  }

  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ ok: false, error: 'Invalid product id.' }, { status: 400 });
  }

  let body: PATCH_BODY;
  try {
    body = (await req.json()) as PATCH_BODY;
  } catch {
    return NextResponse.json({ ok: false, error: 'Request body must be valid JSON.' }, { status: 400 });
  }

  const validated = validatePatch(body);
  if (!validated.ok) {
    return NextResponse.json({ ok: false, error: validated.error }, { status: 400 });
  }

  const product = adminUpdateProduct(id, validated.changes);
  if (!product) {
    return NextResponse.json({ ok: false, error: 'Product not found.' }, { status: 404 });
  }
  return NextResponse.json({ ok: true, data: product });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  }

  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ ok: false, error: 'Invalid product id.' }, { status: 400 });
  }

  const deleted = adminDeleteProduct(id);
  if (!deleted) {
    return NextResponse.json({ ok: false, error: 'Product not found.' }, { status: 404 });
  }
  return NextResponse.json({ ok: true, data: { deleted: id } });
}