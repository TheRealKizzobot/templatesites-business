'use client';

import Link from 'next/link';
import { useCart } from '@/components/cart/cart-provider';
import { computeTotals, formatCents } from '@/lib/format';

export default function CartPage() {
  const { items, isHydrated, setQty, removeItem, subtotalCents } = useCart();
  const totals = computeTotals(subtotalCents);

  if (isHydrated && items.length === 0) {
    return (
      <main id="main" className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-bg-secondary">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#5a4a42" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </div>
        <h1 className="mt-6 text-3xl">Your cart is empty</h1>
        <p className="mt-3 text-text-secondary">
          Fancy adding something to it? Browse the collection and find a piece worth keeping.
        </p>
        <Link href="/shop" className="btn btn-primary mt-8">
          Continue shopping
        </Link>
      </main>
    );
  }

  return (
    <main id="main" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl">Your cart</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_340px]">
        {/* Items */}
        <div>
          {!isHydrated ? (
            <p className="text-text-secondary">Loading your cart…</p>
          ) : (
            <ul className="divide-y divide-border rounded-xl border border-border bg-white shadow-soft">
              {items.map((item) => (
                <li key={item.id} className="flex flex-wrap items-center gap-4 p-4 sm:flex-nowrap">
                  <Link href={`/product/${item.id}`} className="shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="h-20 w-20 rounded-lg bg-bg-secondary object-cover"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/product/${item.id}`}
                      className="font-display text-lg font-semibold text-text-primary hover:text-brand-600"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-text-secondary">{formatCents(item.price_cents)} each</p>
                  </div>

                  <div className="flex items-center rounded-full border border-border">
                    <button
                      type="button"
                      className="min-h-[44px] min-w-[44px] rounded-l-full text-xl leading-none text-brand-700 hover:bg-brand-50 disabled:opacity-40"
                      onClick={() => setQty(item.id, item.qty - 1)}
                      disabled={item.qty <= 1}
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      −
                    </button>
                    <span className="min-w-[40px] text-center text-sm font-semibold" aria-live="polite">
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      className="min-h-[44px] min-w-[44px] rounded-r-full text-xl leading-none text-brand-700 hover:bg-brand-50 disabled:opacity-40"
                      onClick={() => setQty(item.id, item.qty + 1)}
                      disabled={item.qty >= item.maxQty}
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      +
                    </button>
                  </div>

                  <p className="w-20 text-right font-semibold text-text-primary">
                    {formatCents(item.price_cents * item.qty)}
                  </p>

                  <button
                    type="button"
                    className="min-h-[44px] min-w-[44px] rounded-full text-text-secondary transition-colors hover:bg-error/5 hover:text-error"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}

          <Link href="/shop" className="btn btn-ghost mt-6">
            ← Continue shopping
          </Link>
        </div>

        {/* Summary */}
        <aside className="h-fit rounded-xl border border-border bg-bg-secondary p-6 lg:sticky lg:top-24">
          <h2 className="text-xl font-semibold">Order summary</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-text-secondary">Subtotal</dt>
              <dd className="font-medium">{formatCents(totals.subtotal_cents)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-text-secondary">Shipping</dt>
              <dd className="font-medium">
                {totals.shipping_cents === 0 ? (
                  <span className="text-success">Free</span>
                ) : (
                  formatCents(totals.shipping_cents)
                )}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-text-secondary">Tax (8.5%)</dt>
              <dd className="font-medium">{formatCents(totals.tax_cents)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base">
              <dt className="font-semibold">Total</dt>
              <dd className="text-xl font-bold text-brand-800">{formatCents(totals.total_cents)}</dd>
            </div>
          </dl>
          {totals.shipping_cents > 0 && (
            <p className="mt-3 text-xs text-text-secondary">
              Free shipping when your subtotal reaches $100.
            </p>
          )}
          <Link
            href="/checkout"
            className="btn btn-primary mt-6 w-full"
            aria-disabled={items.length === 0}
          >
            Proceed to checkout
          </Link>
        </aside>
      </div>
    </main>
  );
}