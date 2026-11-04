import { NextRequest, NextResponse } from 'next/server';
import { getProducts, setProducts } from '@/lib/cookie-store';
import { seedProducts } from '@/lib/seed-cookie';
import { PRODUCT_IMAGES } from '@/lib/catalog';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  await seedProducts();
  
  const products = await getProducts();
  const params = req.nextUrl.searchParams;
  const category = params.get('category') ?? undefined;
  const q = params.get('q') ?? undefined;
  const page = Number(params.get('page')) || 1;
  const pageSize = Math.min(48, Math.max(1, Number(params.get('pageSize')) || 12));
  
  let filtered = [...products];
  if (category) {
    filtered = filtered.filter(p => p.category === category);
  }
  if (q) {
    const search = q.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(search) || p.description.toLowerCase().includes(search)
    );
  }
  
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);
  
  const categories = [...new Set(products.map(p => p.category))].sort();
  
  return NextResponse.json({ 
    ok: true, 
    data: { items, total, page: safePage, pageSize, totalPages, categories } 
  });
}
