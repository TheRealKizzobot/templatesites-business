'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { formatCents, formatDateTime } from '@/lib/format';
import type { Order, OrderItem } from '@/lib/store';
import StatusBadge from '@/components/admin/status-badge';
import ConfirmDialog from '@/components/admin/confirm-dialog';

interface OrderWithItems extends Order {
  items: OrderItem[];
}

const FILTERS = ['all', 'placed', 'shipped', 'cancelled'] as const;

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('all');
  const [cancelTarget, setCancelTarget] = useState<OrderWithItems | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);

  const load = useCallback(() => {
    fetch('/api/orders')
      .then((res) => res.json())
      .then((json) => {
        if (json.ok) setOrders(json.data as OrderWithItems[]);
        else setError(json.error ?? 'Failed to load orders.');
      })
      .catch(() => setError('Could not load orders.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const patchStatus = async (order: OrderWithItems, status: 'shipped' | 'cancelled') => {
    setBusyId(order.id);
    try {
      const res = await fetch(`/api/orders/${order.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const json = await res.json();
      if (json.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === order.id ? { ...o, ...json.data } : o))
        );
      } else {
        setError(json.error ?? 'Could not update the order.');
      }
    } catch {
      setError('Network error — the order was not updated.');
    } finally {
      setBusyId(null);
      setCancelTarget(null);
    }
  };

  const visible = filter === 'all' ? orders : orders.filter((o) => o.status === filter);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">Orders</h2>
          <p className="mt-1 text-sm text-text-secondary">
            Confirm, ship, or cancel customer orders.
          </p>
        </div>
        <label htmlFor="order-filter" className="sr-only">
          Filter by status
        </label>
        <select
          id="order-filter"
          className="field min-h-[44px] w-auto"
          value={filter}
          onChange={(e) => setFilter(e.target.value as (typeof FILTERS)[number])}
        >
          {FILTERS.map((f) => (
            <option key={f} value={f}>
              {f === 'all' ? 'All statuses' : f.charAt(0).toUpperCase() + f.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="mt-6 rounded-xl border border-error/25 bg-error/5 p-4 text-error" role="alert">
          {error}
        </div>
      )}

      {loading ? (
        <p className="mt-8 text-text-secondary">Loading orders…</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-white shadow-soft">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-bg-secondary text-xs uppercase tracking-wide text-text-secondary">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Order</th>
                <th scope="col" className="px-4 py-3 font-semibold">Customer</th>
                <th scope="col" className="px-4 py-3 font-semibold">Date</th>
                <th scope="col" className="px-4 py-3 font-semibold">Total</th>
                <th scope="col" className="px-4 py-3 font-semibold">Items</th>
                <th scope="col" className="px-4 py-3 font-semibold">Status</th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {visible.map((order) => (
                <tr key={order.id} className="hover:bg-brand-50/60">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="font-medium text-brand-700 hover:underline"
                    >
                      {order.order_number}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-text-primary">{order.customer_name}</p>
                    <p className="text-xs text-text-secondary">{order.email}</p>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">{formatDateTime(order.created_at)}</td>
                  <td className="px-4 py-3 font-semibold">{formatCents(order.total_cents)}</td>
                  <td className="px-4 py-3 text-text-secondary">
                    {order.items.reduce((sum, i) => sum + i.qty, 0)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/orders/${order.id}`} className="btn btn-secondary btn-sm">
                        View
                      </Link>
                      {order.status === 'placed' && (
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          disabled={busyId === order.id}
                          onClick={() => patchStatus(order, 'shipped')}
                        >
                          Mark shipped
                        </button>
                      )}
                      {order.status !== 'cancelled' && (
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          disabled={busyId === order.id}
                          onClick={() => setCancelTarget(order)}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {visible.length === 0 && (
            <p className="px-4 py-10 text-center text-text-secondary">
              No {filter === 'all' ? '' : filter + ' '}orders to show.
            </p>
          )}
        </div>
      )}

      <ConfirmDialog
        open={Boolean(cancelTarget)}
        title="Cancel this order?"
        message={
          cancelTarget
            ? `Order ${cancelTarget.order_number} for ${cancelTarget.customer_name} (${formatCents(
                cancelTarget.total_cents
              )}) will be cancelled and its items returned to stock. This cannot be undone.`
            : ''
        }
        confirmLabel="Cancel order"
        onConfirm={() => {
          if (cancelTarget) patchStatus(cancelTarget, 'cancelled');
        }}
        onCancel={() => setCancelTarget(null)}
      />
    </div>
  );
}