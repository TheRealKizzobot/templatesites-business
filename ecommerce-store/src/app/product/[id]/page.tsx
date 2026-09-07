'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { formatCents, MAX_QTY_PER_ITEM } from '@/lib/format';
import { galleryImages } from '@/lib/catalog';
import { useCart } from '@/components/cart/cart-provider';
import ProductCard from '@/components/site/product-card';
import Stars from '@/components/site/stars';
import type { Product } from '@/lib/store';

interface Review {
  name: string;
  role: string;
  rating: number;
  text: string;
}

const REVIEW_POOL: Review[] = [
  {
    name: 'Claire M.',
    role: 'Verified buyer',
    rating: 5,
    text: 'Exactly as pictured and better in person. The quality is obvious the moment you unpack it.',
  },
  {
    name: 'Jordan T.',
    role: 'Verified buyer',
    rating: 4,
    text: 'Really well made and arrived sooner than expected. Would buy from Northlight again without hesitation.',
  },
  {
    name: 'Samira K.',
    role: 'Verified buyer',
    rating: 5,
    text: 'Beautiful finish and the details are thoughtful — you can tell someone actually cared when designing this.',
  },
];

function pickReviews(productId: number): Review[] {
  const start = productId % REVIEW_POOL.length;
  return [
    REVIEW_POOL[start],
    REVIEW_POOL[(start + 1) % REVIEW_POOL.length],
    REVIEW_POOL[(start + 2) % REVIEW_POOL.length],
  ];
}

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const { addItem } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!Number.isInteger(id) || id <= 0) {
      setNotFound(true);
      return;
    }
    let cancelled = false;
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((json) => {
        if (cancelled) return;
        if (json.ok && json.data) {
          setProduct(json.data as Product);
          // Related: same category, excluding this product.
          const params = new URLSearchParams({ category: json.data.category, pageSize: '48' });
          return fetch(`/api/products?${params.toString()}`)
            .then((r) => r.json())
            .then((list) => {
              if (cancelled || !list.ok) return;
              const others = (list.data.items as Product[]).filter((p) => p.id !== id);
              setRelated(others.slice(0, 3));
            })
            .catch(() => undefined);
        }
        setNotFound(true);
      })
      .catch(() => setNotFound(true));
    return () => {
      cancelled = true;
    };
  }, [id]);

  const thumbnails = useMemo(
    () => (product ? galleryImages(product.image, product.category) : []),
    [product]
  );

  useEffect(() => {
    if (added) {
      const t = setTimeout(() => setAdded(false), 1500);
      return () => clearTimeout(t);
    }
  }, [added]);

  if (notFound) {
    return (
      <main id="main" className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-3xl">Product not found</h1>
        <p className="mt-3 text-text-secondary">
          It may have been removed from the collection.
        </p>
        <Link href="/shop" className="btn btn-primary mt-8">
          Back to shop
        </Link>
      </main>
    );
  }

  if (!product) {
    return (
      <main id="main" className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6">
        <p className="text-text-secondary">Loading product…</p>
      </main>
    );
  }

  const outOfStock = product.stock <= 0;
  // Buyers can order up to the available stock, but never more than 20 per item —
  // the same cap the server enforces (MAX_QTY_PER_ITEM in lib/format.ts).
  const maxOrderQty = Math.max(0, Math.min(product.stock, MAX_QTY_PER_ITEM));
  const reviews = pickReviews(product.id);
  const descriptionParagraphs = product.description.split('\n\n').filter(Boolean);

  const handleAdd = () => {
    if (outOfStock) return;
    addItem({
      id: product.id,
      name: product.name,
      price_cents: product.price_cents,
      image: product.image,
      slug: product.slug,
      maxQty: maxOrderQty,
      qty,
    });
    setAdded(true);
  };

  return (
    <main id="main" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="text-sm text-text-secondary">
        <Link href="/shop" className="hover:text-brand-700">
          Shop
        </Link>
        <span className="mx-2" aria-hidden="true">
          /
        </span>
        <span>{product.category}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="overflow-hidden rounded-xl border border-border bg-bg-secondary shadow-soft">
            <img
              src={thumbnails[activeImage] ?? product.image}
              alt={product.name}
              width={800}
              height={800}
              className="aspect-square w-full object-cover"
            />
          </div>
          {thumbnails.length > 1 && (
            <div className="mt-4 flex gap-3" role="group" aria-label="Product images">
              {thumbnails.map((img, i) => (
                <button
                  key={img + String(i)}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1} of ${thumbnails.length}`}
                  aria-pressed={activeImage === i}
                  className={`min-h-[44px] overflow-hidden rounded-lg border-2 bg-bg-secondary transition-colors ${
                    activeImage === i ? 'border-brand-500' : 'border-transparent hover:border-border'
                  }`}
                >
                  <img src={img} alt="" width={96} height={96} className="h-24 w-24 object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-secondary">
            {product.category}
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl">{product.name}</h1>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Stars rating={product.rating} />
            <span className="text-sm text-text-secondary">{product.rating.toFixed(1)} · {reviews.length} reviews</span>
          </div>

          <p className="mt-4 text-3xl font-bold text-brand-500">{formatCents(product.price_cents)}</p>

          <p className="mt-3" aria-live="polite">
            {outOfStock ? (
              <span className="pill bg-text-secondary/10 text-text-secondary">Out of stock</span>
            ) : product.stock <= 5 ? (
              <span className="pill bg-warning/10 text-warning">Only {product.stock} left in stock</span>
            ) : (
              <span className="pill bg-success/10 text-success">In stock</span>
            )}
          </p>

          <div className="mt-6 space-y-4 text-text-secondary">
            {descriptionParagraphs.map((paragraph, i) => (
              <p key={i} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Quantity + add to cart */}
          <div className="mt-8 flex flex-wrap items-end gap-4">
            <div>
              <label htmlFor="qty" className="label">
                Quantity
              </label>
              <div className="flex items-center rounded-full border border-border">
                <button
                  type="button"
                  className="min-h-[44px] min-w-[44px] rounded-l-full text-xl leading-none text-brand-700 hover:bg-brand-50 disabled:opacity-40"
                  onClick={() => setQty((v) => Math.max(1, v - 1))}
                  disabled={outOfStock || qty <= 1}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="min-w-[48px] text-center text-sm font-semibold" aria-live="polite">
                  {qty}
                </span>
                <button
                  type="button"
                  className="min-h-[44px] min-w-[44px] rounded-r-full text-xl leading-none text-brand-700 hover:bg-brand-50 disabled:opacity-40"
                  onClick={() => setQty((v) => Math.min(maxOrderQty, v + 1))}
                  disabled={qty >= maxOrderQty}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <p className="mt-1 text-xs text-text-secondary">Max {maxOrderQty} per order</p>
            </div>

            <button
              type="button"
              className="btn btn-primary min-w-[220px] flex-1 sm:flex-none"
              onClick={handleAdd}
              disabled={outOfStock}
            >
              {outOfStock ? 'Out of stock' : added ? 'Added ✓' : 'Add to cart'}
            </button>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-16 border-t border-border pt-12">
        <h2 className="text-2xl">Customer reviews</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <article key={review.name} className="card p-6">
              <div className="flex items-center justify-between gap-2">
                <Stars rating={review.rating} size="sm" />
                <span className="text-xs text-text-secondary">{review.role}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">“{review.text}”</p>
              <p className="mt-4 text-sm font-semibold text-text-primary">{review.name}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-16 border-t border-border pt-12">
          <h2 className="text-2xl">Related products</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}