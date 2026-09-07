'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatCents, formatShortDate } from '@/lib/format';
import type { Order, OrderItem } from '@/lib/store';
import StatusBadge from '@/components/admin/status-badge';

interface OrderWithItems extends Order {
  items: OrderItem[];
}

interface Metrics {
  total_orders: number;
  revenue_cents: number;
  items_sold: number;
  avg_order_value_cents: number;
}

function computeMetrics(orders: OrderWithItems[]): Metrics {
  const active = orders.filter((o) => o.status !== 'cancelled');
  const revenue_cents = active.reduce((sum, o) => sum + o.total_cents, 0);
  const items_sold = active.reduce(
    (sum, o) => sum + o.items.reduce((s, i) => s + i.qty, 0),
    0
  );
  return {
    total_orders: active.length,
    revenue_cents,
    items_sold,
    avg_order_value_cents: active.length > 0 ? Math.round(revenue_cents / active.length) : 0,
  };
}

const CARD_STYLES = [
  'bg-white',
  'bg-brand-50',
  'bg-white',
  'bg-brand-100',
];

export default function AdminDashboard() {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/orders')
      .then((res) => res.json())
      .then((json) => {
        if (cancelled) return;
        if (json.ok) {
          setOrders(json.data as OrderWithItems[]);
        } else {
          setError(json.error ?? 'Failed to load orders.');
        }
      })
      .catch(() => {
        if (!cancelled) setError('Could not load orders.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const metrics = computeMetrics(orders);
  const cards = [
    { label: 'Total orders', value: String(metrics.total_orders) },
    { label: 'Revenue', value: formatCents(metrics.revenue_cents) },
    { label: 'Items sold', value: String(metrics.items_sold) },
    { label: 'Avg order value', value: formatCents(metrics.avg_order_value_cents) },
  ];
  const recent = orders.slice(0, 5);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">Dashboard</h2>
          <p className="mt-1 text-sm text-text-secondary">
            A quick look at how the store is doing.
          </p>
        </div>
        <Link href="/admin/orders" className="btn btn-secondary">
          View all orders
        </Link>
      </div>

      {error ? (
        <div className="mt-8 rounded-xl border border-error/25 bg-error/5 p-5 text-error" role="alert">
          {error}
        </div>
      ) : loading ? (
        <p className="mt-8 text-text-secondary">Loading dashboard…</p>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card, i) => (
              <div key={card.label} className={`card p-5 ${CARD_STYLES[i % CARD_STYLES.length]}`}>
                <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  {card.label}
                </p>
                <p className="mt-2 text-2xl font-bold text-brand-800">{card.value}</p>
              </div>
            ))}
          </div>

          <section className="mt-10" aria-labelledby="recent-orders-heading">
            <h3 id="recent-orders-heading" className="text-xl font-semibold text-text-primary">
              Recent orders
            </h3>
            <div className="mt-4 overflow-hidden rounded-xl border border-border bg-white shadow-soft">
              <table className="w-full text-left text-sm">
                <thead className="bg-bg-secondary text-xs uppercase tracking-wide text-text-secondary">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">Order</th>
                    <th scope="col" className="px-4 py-3 font-semibold hidden sm:table-cell">Customer</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Date</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Total</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recent.map((order) => (
                    <tr key={order.id} className="hover:bg-brand-50/60">
                      <td className="px-4 py-3">
                        <Link href={`/admin/orders/${order.id}`} className="font-medium text-brand-700 hover:underline">
                          {order.order_number}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-text-secondary hidden sm:table-cell">
                        {order.customer_name}
                      </td>
                      <td className="px-4 py-3 text-text-secondary">{formatShortDate(order.created_at)}</td>
                      <td className="px-4 py-3 font-semibold">{formatCents(order.total_cents)}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={order.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {recent.length === 0 && (
                <p className="px-4 py-8 text-center text-text-secondary">No orders yet.</p>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}