'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  DINNER_SLOTS,
  LUNCH_SLOTS,
  MAX_PARTY_SIZE,
  MIN_PARTY_SIZE,
  localToday,
  partySizeLabel,
  validateBookingInput,
  type BookingInput,
  type FieldName,
} from '@/lib/booking';

const EMPTY: BookingInput = {
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  party_size: 2,
  notes: '',
};

const PARTY_SIZES = Array.from(
  { length: MAX_PARTY_SIZE - MIN_PARTY_SIZE + 1 },
  (_, i) => MIN_PARTY_SIZE + i
);

type FieldErrors = Partial<Record<FieldName, string>>;

export default function BookingWidget() {
  const today = useMemo(() => localToday(), []);
  const [form, setForm] = useState<BookingInput>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState('');
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState<BookingInput | null>(null);

  useEffect(() => {
    if (!success) return;
    const timer = setTimeout(() => setSuccess(null), 4000);
    return () => clearTimeout(timer);
  }, [success]);

  function setField<K extends keyof BookingInput>(key: K, value: BookingInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
    setServerError('');
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const result = validateBookingInput(form);
    if (!result.ok) {
      setErrors((e) => ({ ...e, [result.field]: result.message }));
      setServerError('');
      return;
    }

    setBusy(true);
    setServerError('');
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.value),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setServerError(json.error || 'Something went wrong — please try again.');
        return;
      }
      setSuccess(result.value);
      setForm(EMPTY);
    } catch {
      setServerError('Network error — please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="card p-6 sm:p-8"
      aria-label="Table booking form"
    >
      {success && (
        <div role="status" className="mb-5 flex items-start gap-3 rounded-md border border-success/30 bg-success/10 px-4 py-3 text-sm text-success">
          <svg
            aria-hidden="true"
            className="mt-0.5 h-5 w-5 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
          <p className="flex-1">
            Reservation confirmed for <strong>{success.date}</strong> at{' '}
            <strong>{success.time}</strong>. Confirmation email sent to{' '}
            {success.email}.
          </p>
          <button
            type="button"
            aria-label="Dismiss confirmation"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-success transition-colors hover:bg-success/10"
            onClick={() => setSuccess(null)}
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-2xl">Request a table</h2>
        <p className="mt-1 text-sm text-text-secondary">
          We seat on a first-confirmed basis and confirm every request by email.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="bk-name">
            Name <span className="text-error">*</span>
          </label>
          <input
            id="bk-name"
            className="field"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(e) => setField('name', e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'err-name' : undefined}
          />
          {errors.name && (
            <span id="err-name" className="mt-1 block text-sm text-error">
              {errors.name}
            </span>
          )}
        </div>

        <div>
          <label className="label" htmlFor="bk-phone">
            Phone <span className="text-error">*</span>
          </label>
          <input
            id="bk-phone"
            className="field"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => setField('phone', e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'err-phone' : undefined}
          />
          {errors.phone && (
            <span id="err-phone" className="mt-1 block text-sm text-error">
              {errors.phone}
            </span>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="label" htmlFor="bk-email">
            Email <span className="text-error">*</span>
          </label>
          <input
            id="bk-email"
            className="field"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => setField('email', e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'err-email' : undefined}
          />
          {errors.email && (
            <span id="err-email" className="mt-1 block text-sm text-error">
              {errors.email}
            </span>
          )}
        </div>

        <div>
          <label className="label" htmlFor="bk-date">
            Date <span className="text-error">*</span>
          </label>
          <input
            id="bk-date"
            className="field"
            type="date"
            min={today}
            value={form.date}
            onChange={(e) => setField('date', e.target.value)}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? 'err-date' : undefined}
          />
          {errors.date && (
            <span id="err-date" className="mt-1 block text-sm text-error">
              {errors.date}
            </span>
          )}
        </div>

        <div>
          <label className="label" htmlFor="bk-time">
            Time <span className="text-error">*</span>
          </label>
          <select
            id="bk-time"
            className="field"
            value={form.time}
            onChange={(e) => setField('time', e.target.value)}
            aria-invalid={Boolean(errors.time)}
            aria-describedby={errors.time ? 'err-time' : undefined}
          >
            <option value="">Select a time</option>
            <optgroup label="Lunch">
              {LUNCH_SLOTS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </optgroup>
            <optgroup label="Dinner">
              {DINNER_SLOTS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </optgroup>
          </select>
          {errors.time && (
            <span id="err-time" className="mt-1 block text-sm text-error">
              {errors.time}
            </span>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="label" htmlFor="bk-party">
            Party size <span className="text-error">*</span>
          </label>
          <select
            id="bk-party"
            className="field"
            value={form.party_size}
            onChange={(e) => setField('party_size', Number(e.target.value))}
            aria-invalid={Boolean(errors.party_size)}
            aria-describedby={errors.party_size ? 'err-party' : undefined}
          >
            {PARTY_SIZES.map((n) => (
              <option key={n} value={n}>
                {partySizeLabel(n)}
              </option>
            ))}
          </select>
          {errors.party_size && (
            <span id="err-party" className="mt-1 block text-sm text-error">
              {errors.party_size}
            </span>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="label" htmlFor="bk-notes">
            Notes <span className="font-normal text-text-secondary">(optional)</span>
          </label>
          <textarea
            id="bk-notes"
            className="field min-h-[96px] resize-y"
            rows={3}
            placeholder="Allergies, celebrations, seating preferences…"
            value={form.notes}
            onChange={(e) => setField('notes', e.target.value)}
          />
        </div>
      </div>

      {serverError && (
        <p role="alert" className="mt-4 rounded-md border border-error/30 bg-error/5 px-4 py-3 text-sm text-error">
          {serverError}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" className="btn-primary w-full sm:w-auto" disabled={busy}>
          {busy ? 'Booking…' : 'Book table'}
        </button>
        <p className="text-xs text-text-secondary sm:ml-2">
          We&apos;ll confirm availability by email within the hour.
        </p>
      </div>
    </form>
  );
}