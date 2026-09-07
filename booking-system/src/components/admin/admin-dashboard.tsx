'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  CAPACITY_PER_SLOT,
  STATUSES,
  countRemainingCovers,
  partySizeLabel,
  type BookingRow,
  type BookingStatus,
} from '@/lib/booking';

type Filter = 'all' | BookingStatus;

const BADGE: Record<BookingStatus, string> = {
  pending: 'bg-warning/10 text-warning',
  confirmed: 'bg-success/10 text-success',
  completed: 'bg-brand-100 text-brand-800',
  cancelled: 'bg-error/10 text-error',
};

export default function AdminDashboard() {
  const [all, setAll] = useState<BookingRow[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busyId, setBusyId] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<BookingRow | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/bookings');
      const json = (await res.json()) as { ok?: boolean; data?: BookingRow[]; error?: string };
      if (!json.ok) throw new Error(json.error || 'Failed to load bookings.');
      setAll(json.data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load bookings.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (!deleteTarget) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setDeleteTarget(null);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [deleteTarget]);

  const bookings = useMemo(
    () => (filter === 'all' ? all : all.filter((b) => b.status === filter)),
    [all, filter]
  );

  async function act(
    id: number,
    method: 'PATCH' | 'DELETE',
    status?: BookingStatus
  ) {
    setBusyId(id);
    setNotice('');
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: status ? JSON.stringify({ status }) : undefined,
      });
      const json = (await res.json()) as {
        ok?: boolean;
        data?: BookingRow;
        error?: string;
      };
      if (!res.ok || !json.ok) throw new Error(json.error || 'Request failed.');
      if (method === 'DELETE') {
        setAll((prev) => prev.filter((b) => b.id !== id));
        setNotice(`Booking #${id} deleted.`);
      } else if (json.data) {
        const updated = json.data;
        setAll((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
        setNotice(`Booking #${id} → ${updated.status}.`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Request failed.');
    } finally {
      setBusyId(null);
    }
  }

  async function onLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.reload();
  }

  return (
    <div>
      <header className="border-b border-brand-200/40 bg-brand-800 text-brand-50">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div>
            <h1 className="text-2xl">Admin Panel</h1>
            <p className="text-sm text-brand-200">
              Ember &amp; Wood · {all.length} booking{all.length === 1 ? '' : 's'}
            </p>
          </div>
          <button type="button" className="btn-secondary" onClick={onLogout}>
            Sign out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="label mb-0 flex items-center gap-2">
            <span>Filter</span>
            <select
              className="field w-auto"
              value={filter}
              onChange={(e) => setFilter(e.target.value as Filter)}
            >
              <option value="all">All statuses</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
          </label>

          <div aria-live="polite">
            {notice && <p className="text-sm font-medium text-success">{notice}</p>}
            {error && <p className="text-sm text-error">{error}</p>}
          </div>
        </div>

        {loading ? (
          <p className="text-text-secondary" role="status">
            Loading bookings…
          </p>
        ) : bookings.length === 0 ? (
          <p className="text-text-secondary">No bookings match this filter.</p>
        ) : (
          <>
            <div className="hidden md:block overflow-hidden rounded-xl shadow-soft">
              <div className="max-h-[65vh] overflow-auto">
                <table className="w-full border-collapse">
                  <caption className="sr-only">All booking requests</caption>
                  <thead>
                    <tr className="sticky top-0 bg-brand-100 text-left text-sm text-brand-900">
                      <th scope="col" className="px-4 py-3 font-semibold">Date</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Time</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Party</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Guest Name</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Phone</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Email</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Status</th>
                      <th scope="col" className="px-4 py-3 text-right font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-hairline bg-white">
                    {bookings.map((b) => (
                      <tr
                        key={b.id}
                        className="odd:bg-white even:bg-bg-secondary"
                      >
                        <td className="px-4 py-3 align-top">{b.date}</td>
                        <td className="px-4 py-3 align-top">{b.time}</td>
                        <td className="px-4 py-3 align-top">
                          {partySizeLabel(b.party_size)}
                          <div className="text-xs text-text-secondary">
                            <CapacityPill bookings={all} date={b.date} time={b.time} />
                          </div>
                        </td>
                        <td className="px-4 py-3 align-top font-medium" title={b.notes || undefined}>
                          {b.name}
                          {b.notes && (
                            <span className="sr-only"> — note: {b.notes}</span>
                          )}
                        </td>
                        <td className="px-4 py-3 align-top">{b.phone}</td>
                        <td className="px-4 py-3 align-top">{b.email}</td>
                        <td className="px-4 py-3 align-top">
                          <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${BADGE[b.status]}`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right align-top">
                          <RowActions booking={b} busyId={busyId} onAct={act} onDelete={setDeleteTarget} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <ul className="space-y-4 md:hidden">
              {bookings.map((b) => (
                <li key={b.id} className="card p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">{b.name}</p>
                      <p className="text-sm text-text-secondary">{b.email}</p>
                      <p className="text-sm text-text-secondary">{b.phone}</p>
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${BADGE[b.status]}`}>
                      {b.status}
                    </span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    <p>
                      <span className="text-text-secondary">Date</span>
                      <br />
                      {b.date}
                    </p>
                    <p>
                      <span className="text-text-secondary">Time</span>
                      <br />
                      {b.time}
                    </p>
                    <p>
                      <span className="text-text-secondary">Party</span>
                      <br />
                      {partySizeLabel(b.party_size)}
                    </p>
                    <p>
                      <span className="text-text-secondary">Capacity</span>
                      <br />
                      <CapacityPill bookings={all} date={b.date} time={b.time} compact />
                    </p>
                  </div>
                  {b.notes && (
                    <p className="mt-3 text-sm italic text-text-secondary">{b.notes}</p>
                  )}
                  <RowActions booking={b} busyId={busyId} onAct={act} onDelete={setDeleteTarget} />
                </li>
              ))}
            </ul>
          </>
        )}

        {deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-brand-900/50"
              onClick={() => setDeleteTarget(null)}
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="delete-title"
              className="card relative w-full max-w-md p-6"
            >
              <h2 id="delete-title" className="text-xl">Delete this booking?</h2>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {deleteTarget.name} · {deleteTarget.date} at {deleteTarget.time} ·{' '}
                {deleteTarget.email}. This cannot be undone.
              </p>
              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  className="btn-secondary"
                  autoFocus
                  onClick={() => setDeleteTarget(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn-danger"
                  disabled={busyId === deleteTarget.id}
                  onClick={() => {
                    const target = deleteTarget;
                    setDeleteTarget(null);
                    void act(target.id, 'DELETE');
                  }}
                >
                  {busyId === deleteTarget.id ? 'Deleting…' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function CapacityPill({
  bookings,
  date,
  time,
  compact,
}: {
  bookings: BookingRow[];
  date: string;
  time: string;
  compact?: boolean;
}) {
  const remaining = countRemainingCovers(bookings, date, time);
  const used = CAPACITY_PER_SLOT - remaining;
  const full = remaining <= 0;
  const text = compact ? `${used}/${CAPACITY_PER_SLOT}` : `${used}/${CAPACITY_PER_SLOT} used`;
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${
        full
          ? 'bg-error/10 text-error'
          : remaining <= 4
            ? 'bg-warning/10 text-warning'
            : 'bg-success/10 text-success'
      }`}
      title={`${remaining} cover${remaining === 1 ? '' : 's'} remaining`}
    >
      {text}
    </span>
  );
}

function RowActions({
  booking,
  busyId,
  onAct,
  onDelete,
}: {
  booking: BookingRow;
  busyId: number | null;
  onAct: (id: number, method: 'PATCH' | 'DELETE', status?: BookingStatus) => Promise<void>;
  onDelete: (booking: BookingRow) => void;
}) {
  const busy = busyId === booking.id;
  const common = {
    disabled: busy,
    className:
      'inline-flex min-h-[44px] items-center justify-center rounded-full px-3 py-2 text-xs font-semibold transition-colors',
  };

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 md:mt-0 md:justify-end">
      {booking.status === 'pending' && (
        <button
          {...common}
          onClick={() => onAct(booking.id, 'PATCH', 'confirmed')}
          className={`${common.className} bg-success text-white hover:bg-success/90`}
        >
          Confirm
        </button>
      )}
      {booking.status === 'confirmed' && (
        <button
          {...common}
          onClick={() => onAct(booking.id, 'PATCH', 'completed')}
          className={`${common.className} bg-brand-100 text-brand-800 hover:bg-brand-200`}
        >
          Mark done
        </button>
      )}
      {(booking.status === 'pending' ||
        booking.status === 'confirmed' ||
        booking.status === 'completed') && (
        <button
          {...common}
          onClick={() => onAct(booking.id, 'PATCH', 'cancelled')}
          className={`${common.className} border border-hairline text-text-secondary hover:bg-bg-secondary`}
        >
          Cancel
        </button>
      )}
      <button
        {...common}
        onClick={() => onDelete(booking)}
        className={`${common.className} border border-error/25 text-error hover:bg-error/5`}
      >
        {busy ? '…' : 'Delete'}
      </button>
    </div>
  );
}