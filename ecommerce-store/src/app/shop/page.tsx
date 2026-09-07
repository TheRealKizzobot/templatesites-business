'use client';

import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductCard from '@/components/site/product-card';
import { CATEGORIES } from '@/lib/catalog';
import type { Product } from '@/lib/store';

interface ProductListData {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  categories: string[];
}

function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const catParam = searchParams.get('category') ?? '';
  const qParam = searchParams.get('q') ?? '';
  const pageParam = Math.max(1, Number(searchParams.get('page')) || 1);

  const [category, setCategory] = useState(catParam);
  const [q, setQ] = useState(qParam);
  const [appliedQ, setAppliedQ] = useState(qParam);
  const [page, setPage] = useState(pageParam);
  const [data, setData] = useState<ProductListData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Debounce the search query.
  useEffect(() => {
    const t = setTimeout(() => setAppliedQ(q), 300);
    return () => clearTimeout(t);
  }, [q]);

  // Mirror filter changes to the URL (skipping the first render).
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (appliedQ) params.set('q', appliedQ);
    if (page > 1) params.set('page', String(page));
    const qs = params.toString();
    router.replace(qs ? `/shop?${qs}` : '/shop', { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, appliedQ, page, router]);

  // Fetch the product list whenever filters change.
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (appliedQ) params.set('q', appliedQ);
    params.set('page', String(page));
    params.set('pageSize', '12');

    fetch(`/api/products?${params.toString()}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Request failed'))))
      .then((json) => {
        if (cancelled) return;
        if (json.ok) {
          setData(json.data as ProductListData);
        } else {
          setError(json.error ?? 'Failed to load products.');
        }
      })
      .catch(() => {
        if (!cancelled) setError('Could not load products — please try again.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [category, appliedQ, page]);

  const changeCategory = useCallback((value: string) => {
    setCategory(value);
    setPage(1);
  }, []);

  const changeSearch = useCallback((value: string) => {
    setQ(value);
    setPage(1);
  }, []);

  const goToPage = useCallback((p: number) => {
    setPage(p);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const visibleCategories = data?.categories ?? CATEGORIES;

  return (
    <main id="main">
      {/* Hero */}
      <section className="bg-bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            Northlight Goods
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl">Shop our collection</h1>
          <p className="mt-4 max-w-xl text-lg text-text-secondary">
            Furniture, lighting, textiles, tableware and decor. Free US shipping on orders
            over $100 — otherwise a flat $8.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-white p-3 shadow-soft">
          <label htmlFor="shop-search" className="sr-only">
            Search products
          </label>
          <input
            id="shop-search"
            type="search"
            value={q}
            onChange={(e) => changeSearch(e.target.value)}
            placeholder="Search products…"
            className="field min-h-[44px] max-w-xs flex-1"
            autoComplete="off"
          />
          <label htmlFor="shop-category" className="sr-only">
            Filter by category
          </label>
          <select
            id="shop-category"
            value={category}
            onChange={(e) => changeCategory(e.target.value)}
            className="field min-h-[44px] w-full sm:w-auto"
          >
            <option value="">All categories</option>
            {visibleCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <p className="mt-6 text-sm text-text-secondary" aria-live="polite">
          {loading ? 'Loading products…' : `${data?.total ?? 0} product${(data?.total ?? 0) === 1 ? '' : 's'}`}
          {appliedQ ? ` for “${appliedQ}”` : ''}
          {category ? ` in ${category}` : ''}
        </p>

        {error ? (
          <div className="mt-8 rounded-xl border border-error/25 bg-error/5 p-6 text-error" role="alert">
            {error}
          </div>
        ) : (
          <>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data?.items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {!loading && data && data.items.length === 0 && (
              <div className="mt-16 text-center">
                <p className="text-2xl font-display text-text-primary">No products found</p>
                <p className="mt-2 text-text-secondary">
                  Try a different search or category.
                </p>
                <button
                  type="button"
                  className="btn btn-secondary mt-6"
                  onClick={() => {
                    setQ('');
                    setAppliedQ('');
                    changeCategory('');
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}

            {data && data.totalPages > 1 && (
              <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Pagination">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  disabled={page <= 1}
                  onClick={() => goToPage(page - 1)}
                >
                  Previous
                </button>
                <span className="min-w-[88px] text-center text-sm text-text-secondary" aria-live="polite">
                  Page {data.page} of {data.totalPages}
                </span>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  disabled={page >= data.totalPages}
                  onClick={() => goToPage(page + 1)}
                >
                  Next
                </button>
              </nav>
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-[50vh]" />}>
      <ShopContent />
    </Suspense>
  );
}