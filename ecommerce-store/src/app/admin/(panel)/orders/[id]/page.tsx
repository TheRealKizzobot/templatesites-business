'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { formatCents, formatDateTime } from '@/lib/format';
import type { Order, OrderItem } from '@/lib/store';
import StatusBadge from '@/components/admin/status-badge';
import ConfirmDialog from '@/components/admin/confirm-dialog';

export default function AdminOrderDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const [order, setOrder] = useState<Order | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);

  const load = useCallback(() => {
    fetch(`/api/orders/${id}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.ok) {
          setOrder(json.data.order as Order);
          setItems(json.data.items as OrderItem[]);
        } else {
          setError(json.error ?? 'Order not found.');
        }
      })
      .catch(() => setError('Could not load this order.'))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const patchStatus = async (status: 'shipped' | 'cancelled') => {
    if (!order) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/orders/${order.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const json = await res.json();
      if (json.ok) setOrder(json.data as Order);
      else setError(json.error ?? 'Could not update the order.');
    } catch {
      setError('Network error — the order was not updated.');
    } finally {
      setBusy(false);
      setConfirmCancel(false);
    }
  };

  if (loading) return <p className="text-text-secondary">Loading order…</p>;
  if (error || !order)
    return (
      <div>
        <div className="rounded-xl border border-error/25 bg-error/5 p-5 text-error" role="alert">
          {error ?? 'Order not found.'}
        </div>
        <Link href="/admin/orders" className="btn btn-secondary mt-6">
          Back to orders
        </Link>
      </div>
    );

  return (
    <div>
      <Link href="/admin/orders" className="btn btn-ghost">
        ← Back to orders
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">{order.order_number}</h2>
          <p className="mt-1 text-sm text-text-secondary">Placed {formatDateTime(order.created_at)}</p>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={order.status} />
          {order.status === 'placed' && (
            <button
              type="button"
              className="btn btn-primary"
              disabled={busy}
              onClick={() => patchStatus('shipped')}
            >
              Mark shipped
            </button>
          )}
          {order.status !== 'cancelled' && (
            <button
              type="button"
              className="btn btn-danger"
              disabled={busy}
              onClick={() => setConfirmCancel(true)}
            >
              Cancel order
            </button>
          )}
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* Items */}
        <section className="rounded-xl border border-border bg-white p-6 shadow-soft" aria-labelledby="items-heading">
          <h3 id="items-heading" className="text-xl font-semibold text-text-primary">
            Items
          </h3>
          <table className="mt-4 w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-text-secondary">
              <tr>
                <th scope="col" className="py-2 font-semibold">Product</th>
                <th scope="col" className="py-2 font-semibold">Qty</th>
                <th scope="col" className="py-2 font-semibold">Unit price</th>
                <th scope="col" className="py-2 text-right font-semibold">Line total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="py-3 font-medium text-text-primary">{item.name}</td>
                  <td className="py-3 text-text-secondary">{item.qty}</td>
                  <td className="py-3 text-text-secondary">{formatCents(item.unit_price_cents)}</td>
                  <td className="py-3 text-right font-semibold">{formatCents(item.line_total_cents)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Customer + totals */}
        <div className="space-y-6">
          <section className="rounded-xl border border-border bg-white p-6 shadow-soft" aria-labelledby="customer-heading">
            <h3 id="customer-heading" className="text-xl font-semibold text-text-primary">
              Customer
            </h3>
            <dl className="mt-4 space-y-2 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-wide text-text-secondary">Name</dt>
                <dd className="font-medium text-text-primary">{order.customer_name}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-text-secondary">Email</dt>
                <dd className="text-text-primary">{order.email}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-text-secondary">Phone</dt>
                <dd className="text-text-primary">{order.phone}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-text-secondary">Ship to</dt>
                <dd className="leading-relaxed text-text-primary">
                  {order.address_line}
                  <br />
                  {order.city}, {order.state} {order.zip}
                </dd>
              </div>
            </dl>
          </section>

          <section className="rounded-xl border border-border bg-bg-secondary p-6" aria-labelledby="totals-heading">
            <h3 id="totals-heading" className="text-xl font-semibold text-text-primary">
              Totals
            </h3>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-text-secondary">Subtotal</dt>
                <dd className="font-medium">{formatCents(order.subtotal_cents)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-text-secondary">Shipping</dt>
                <dd className="font-medium">
                  {order.shipping_cents === 0 ? <span className="text-success">Free</span> : formatCents(order.shipping_cents)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-text-secondary">Tax</dt>
                <dd className="font-medium">{formatCents(order.tax_cents)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-2 text-base">
                <dt className="font-semibold">Total</dt>
                <dd className="text-lg font-bold text-brand-800">{formatCents(order.total_cents)}</dd>
              </div>
            </dl>
          </section>
        </div>
      </div>

      <ConfirmDialog
        open={confirmCancel}
        title="Cancel this order?"
        message={`Order ${order.order_number} will be cancelled and its items returned to stock. This cannot be undone.`}
        confirmLabel="Cancel order"
        onConfirm={() => patchStatus('cancelled')}
        onCancel={() => setConfirmCancel(false)}
      />
    </div>
  );
}