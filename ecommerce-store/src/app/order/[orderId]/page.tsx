'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCart, type OrderRecord } from '@/components/cart/cart-provider';
import { addDays, formatCents, formatDate, parseDate } from '@/lib/format';

export default function OrderConfirmationPage() {
  const params = useParams<{ orderId: string }>();
  const orderId = params.orderId;
  const { getOrder } = useCart();

  const [record, setRecord] = useState<OrderRecord | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setRecord(getOrder());
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (ready && (!record || record.order.order_number !== orderId)) {
    return (
      <main id="main" className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-3xl">Order not found</h1>
        <p className="mt-3 text-text-secondary">
          We couldn’t find that order in this browser session.
        </p>
        <Link href="/shop" className="btn btn-primary mt-8">
          Continue shopping
        </Link>
      </main>
    );
  }

  if (!record) {
    return (
      <main id="main" className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <p className="text-text-secondary">Loading your order…</p>
      </main>
    );
  }

  const order = record.order as Record<string, unknown>;
  const items = record.items as Array<Record<string, unknown>>;
  const totalCents = Number(order.total_cents) || 0;
  const subtotalCents = Number(order.subtotal_cents) || 0;
  const shippingCents = Number(order.shipping_cents) || 0;
  const taxCents = Number(order.tax_cents) || 0;
  const estimated = addDays(parseDate(String(order.created_at ?? '')), 5);

  return (
    <main id="main" className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="text-center">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <h1 className="mt-5 text-4xl">Order confirmed</h1>
        <p className="mt-3 text-text-secondary">
          Thanks, {String(order.customer_name ?? '')}. A confirmation email is on its way to{' '}
          <span className="font-medium text-text-primary">{String(order.email ?? '')}</span>.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="card p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">Order number</p>
          <p className="mt-1 text-lg font-bold text-brand-800">{String(order.order_number ?? '')}</p>
        </div>
        <div className="card p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">Order date</p>
          <p className="mt-1 text-lg font-bold text-brand-800">{formatDate(String(order.created_at ?? ''))}</p>
        </div>
        <div className="card p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">Estimated delivery</p>
          <p className="mt-1 text-lg font-bold text-brand-800">{formatDate(estimated)}</p>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Items */}
        <section className="card p-6" aria-labelledby="order-items-heading">
          <h2 id="order-items-heading" className="text-xl font-semibold">
            Items
          </h2>
          <ul className="mt-4 divide-y divide-border">
            {items.map((item) => (
              <li key={String(item.name)} className="flex items-center justify-between gap-4 py-3">
                <div>
                  <p className="font-medium text-text-primary">{String(item.name ?? '')}</p>
                  <p className="text-sm text-text-secondary">
                    {String(item.qty ?? '')} × {formatCents(Number(item.unit_price_cents) || 0)}
                  </p>
                </div>
                <p className="font-semibold">{formatCents(Number(item.line_total_cents) || 0)}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Summary + shipping */}
        <div className="space-y-6">
          <section className="card p-6" aria-labelledby="totals-heading">
            <h2 id="totals-heading" className="text-xl font-semibold">
              Total
            </h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-text-secondary">Subtotal</dt>
                <dd className="font-medium">{formatCents(subtotalCents)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-text-secondary">Shipping</dt>
                <dd className="font-medium">
                  {shippingCents === 0 ? <span className="text-success">Free</span> : formatCents(shippingCents)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-text-secondary">Tax</dt>
                <dd className="font-medium">{formatCents(taxCents)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-3 text-base">
                <dt className="font-semibold">Total</dt>
                <dd className="text-xl font-bold text-brand-800">{formatCents(totalCents)}</dd>
              </div>
            </dl>
          </section>

          <section className="card p-6" aria-labelledby="shipping-details-heading">
            <h2 id="shipping-details-heading" className="text-xl font-semibold">
              Shipping to
            </h2>
            <address className="mt-3 text-sm not-italic leading-relaxed text-text-secondary">
              {String(order.customer_name ?? '')}
              <br />
              {String(order.address_line ?? '')}
              <br />
              {String(order.city ?? '')}, {String(order.state ?? '')} {String(order.zip ?? '')}
            </address>
          </section>
        </div>
      </div>

      <div className="mt-10 text-center">
        <Link href="/shop" className="btn btn-primary">
          Continue shopping
        </Link>
      </div>
    </main>
  );
}