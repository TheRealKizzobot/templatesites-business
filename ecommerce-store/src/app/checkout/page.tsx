'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/cart/cart-provider';
import { computeTotals, formatCents } from '@/lib/format';

type Errors = Partial<Record<string, string>>;

function validateField(name: string, value: string): string | null {
  const v = value.trim();
  switch (name) {
    case 'name':
      return v.length >= 2 ? null : 'Please enter your full name.';
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : 'Please enter a valid email address.';
    case 'phone':
      return v.replace(/\D/g, '').length >= 7 ? null : 'Please enter a valid phone number.';
    case 'street':
      return v.length >= 3 ? null : 'Please enter your street address.';
    case 'city':
      return v.length >= 2 ? null : 'Please enter your city.';
    case 'state':
      return v.length >= 2 ? null : 'Please enter your state or region.';
    case 'zip':
      return v.length >= 3 ? null : 'Please enter your ZIP / postal code.';
    case 'card': {
      const digits = v.replace(/\D/g, '');
      return digits.length >= 13 && digits.length <= 19 ? null : 'Please enter a valid card number.';
    }
    case 'expiry': {
      const m = /^(0[1-9]|1[0-2])\/\d{2}$/.exec(v);
      if (!m) return 'Use MM/YY format.';
      return null;
    }
    case 'cvv': {
      const digits = v.replace(/\D/g, '');
      return digits.length >= 3 && digits.length <= 4 ? null : 'Please enter the 3 or 4 digit CVV.';
    }
    default:
      return null;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotalCents, isHydrated, clearCart, saveOrder } = useCart();
  const totals = computeTotals(subtotalCents);

  const [values, setValues] = useState<Record<string, string>>({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    card: '',
    expiry: '',
    cvv: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const setValue = useCallback((name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const formatCard = useCallback((raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  }, []);

  const formatExpiry = useCallback((raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }, []);

  const validateAll = useCallback((): Errors => {
    const next: Errors = {};
    for (const key of Object.keys(values)) {
      const message = validateField(key, values[key]);
      if (message) next[key] = message;
    }
    return next;
  }, [values]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const nextErrors = validateAll();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);
    setServerError(null);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: {
            name: values.name,
            email: values.email,
            phone: values.phone,
          },
          shipping: {
            address_line: values.street,
            city: values.city,
            state: values.state,
            zip: values.zip,
          },
          items: items.map((i) => ({ product_id: i.id, qty: i.qty })),
        }),
      });
      const json = await res.json();
      if (json.ok && json.data) {
        saveOrder({ order: json.data.order, items: json.data.items });
        clearCart();
        router.push(`/order/${json.data.order.order_number}`);
        return;
      }
      setServerError(json.error || 'Something went wrong. Try again.');
    } catch {
      setServerError('Something went wrong. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const formValid =
    values.name.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()) &&
    values.phone.replace(/\D/g, '').length >= 7 &&
    values.street.trim().length >= 3 &&
    values.city.trim().length >= 2 &&
    values.state.trim().length >= 2 &&
    values.zip.trim().length >= 3 &&
    values.card.replace(/\D/g, '').length >= 13 &&
    /^(0[1-9]|1[0-2])\/\d{2}$/.test(values.expiry) &&
    values.cvv.replace(/\D/g, '').length >= 3;

  if (isHydrated && items.length === 0) {
    return (
      <main id="main" className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-3xl">Nothing to check out</h1>
        <p className="mt-3 text-text-secondary">Your cart is empty.</p>
        <Link href="/shop" className="btn btn-primary mt-8">
          Continue shopping
        </Link>
      </main>
    );
  }

  return (
    <main id="main" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl">Checkout</h1>

      {serverError && (
        <div
          className="mt-6 rounded-xl border border-error/25 bg-error/5 p-4 text-error"
          role="alert"
        >
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
        {/* Form */}
        <div className="space-y-8">
          <section className="rounded-xl border border-border bg-white p-6 shadow-soft" aria-labelledby="billing-heading">
            <h2 id="billing-heading" className="text-xl font-semibold">
              Billing
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="label">
                  Full name
                </label>
                <input
                  id="name"
                  className={`field ${errors.name ? 'field-error' : ''}`}
                  value={values.name}
                  onChange={(e) => setValue('name', e.target.value)}
                  autoComplete="name"
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
                <label htmlFor="email" className="label">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className={`field ${errors.email ? 'field-error' : ''}`}
                  value={values.email}
                  onChange={(e) => setValue('email', e.target.value)}
                  autoComplete="email"
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
                <label htmlFor="phone" className="label">
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  className={`field ${errors.phone ? 'field-error' : ''}`}
                  value={values.phone}
                  onChange={(e) => setValue('phone', e.target.value)}
                  autoComplete="tel"
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'err-phone' : undefined}
                />
                {errors.phone && (
                  <span id="err-phone" className="mt-1 block text-sm text-error">
                    {errors.phone}
                  </span>
                )}
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-white p-6 shadow-soft" aria-labelledby="shipping-heading">
            <h2 id="shipping-heading" className="text-xl font-semibold">
              Shipping address
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="street" className="label">
                  Street address
                </label>
                <input
                  id="street"
                  className={`field ${errors.street ? 'field-error' : ''}`}
                  value={values.street}
                  onChange={(e) => setValue('street', e.target.value)}
                  autoComplete="street-address"
                  aria-invalid={Boolean(errors.street)}
                  aria-describedby={errors.street ? 'err-street' : undefined}
                />
                {errors.street && (
                  <span id="err-street" className="mt-1 block text-sm text-error">
                    {errors.street}
                  </span>
                )}
              </div>
              <div>
                <label htmlFor="city" className="label">
                  City
                </label>
                <input
                  id="city"
                  className={`field ${errors.city ? 'field-error' : ''}`}
                  value={values.city}
                  onChange={(e) => setValue('city', e.target.value)}
                  autoComplete="address-level2"
                  aria-invalid={Boolean(errors.city)}
                  aria-describedby={errors.city ? 'err-city' : undefined}
                />
                {errors.city && (
                  <span id="err-city" className="mt-1 block text-sm text-error">
                    {errors.city}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="state" className="label">
                    State
                  </label>
                  <input
                    id="state"
                    className={`field ${errors.state ? 'field-error' : ''}`}
                    value={values.state}
                    onChange={(e) => setValue('state', e.target.value)}
                    autoComplete="address-level1"
                    aria-invalid={Boolean(errors.state)}
                    aria-describedby={errors.state ? 'err-state' : undefined}
                  />
                  {errors.state && (
                    <span id="err-state" className="mt-1 block text-sm text-error">
                      {errors.state}
                    </span>
                  )}
                </div>
                <div>
                  <label htmlFor="zip" className="label">
                    ZIP
                  </label>
                  <input
                    id="zip"
                    className={`field ${errors.zip ? 'field-error' : ''}`}
                    value={values.zip}
                    onChange={(e) => setValue('zip', e.target.value)}
                    autoComplete="postal-code"
                    aria-invalid={Boolean(errors.zip)}
                    aria-describedby={errors.zip ? 'err-zip' : undefined}
                  />
                  {errors.zip && (
                    <span id="err-zip" className="mt-1 block text-sm text-error">
                      {errors.zip}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-white p-6 shadow-soft" aria-labelledby="payment-heading">
            <h2 id="payment-heading" className="text-xl font-semibold">
              Payment
            </h2>
            <p className="mt-1 text-xs text-text-secondary">
              Demo only — no real payment is processed.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="card" className="label">
                  Card number
                </label>
                <input
                  id="card"
                  inputMode="numeric"
                  className={`field ${errors.card ? 'field-error' : ''}`}
                  value={values.card}
                  onChange={(e) => setValue('card', formatCard(e.target.value))}
                  placeholder="4242 4242 4242 4242"
                  autoComplete="cc-number"
                  aria-invalid={Boolean(errors.card)}
                  aria-describedby={errors.card ? 'err-card' : undefined}
                />
                {errors.card && (
                  <span id="err-card" className="mt-1 block text-sm text-error">
                    {errors.card}
                  </span>
                )}
              </div>
              <div>
                <label htmlFor="expiry" className="label">
                  Expiry
                </label>
                <input
                  id="expiry"
                  inputMode="numeric"
                  className={`field ${errors.expiry ? 'field-error' : ''}`}
                  value={values.expiry}
                  onChange={(e) => setValue('expiry', formatExpiry(e.target.value))}
                  placeholder="MM/YY"
                  autoComplete="cc-exp"
                  aria-invalid={Boolean(errors.expiry)}
                  aria-describedby={errors.expiry ? 'err-expiry' : undefined}
                />
                {errors.expiry && (
                  <span id="err-expiry" className="mt-1 block text-sm text-error">
                    {errors.expiry}
                  </span>
                )}
              </div>
              <div>
                <label htmlFor="cvv" className="label">
                  CVV
                </label>
                <input
                  id="cvv"
                  inputMode="numeric"
                  className={`field ${errors.cvv ? 'field-error' : ''}`}
                  value={values.cvv}
                  onChange={(e) => setValue('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="123"
                  autoComplete="cc-csc"
                  aria-invalid={Boolean(errors.cvv)}
                  aria-describedby={errors.cvv ? 'err-cvv' : undefined}
                />
                {errors.cvv && (
                  <span id="err-cvv" className="mt-1 block text-sm text-error">
                    {errors.cvv}
                  </span>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* Order summary */}
        <aside className="h-fit rounded-xl border border-border bg-bg-secondary p-6 lg:sticky lg:top-24">
          <h2 className="text-xl font-semibold">Order summary</h2>
          <ul className="mt-4 space-y-3">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-md bg-white object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-text-primary">{item.name}</p>
                  <p className="text-xs text-text-secondary">Qty {item.qty}</p>
                </div>
                <p className="text-sm font-semibold">{formatCents(item.price_cents * item.qty)}</p>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-3 border-t border-border pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-text-secondary">Subtotal</dt>
              <dd className="font-medium">{formatCents(totals.subtotal_cents)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-text-secondary">Shipping</dt>
              <dd className="font-medium">
                {totals.shipping_cents === 0 ? <span className="text-success">Free</span> : formatCents(totals.shipping_cents)}
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
          <button
            type="submit"
            className="btn btn-primary mt-6 w-full"
            disabled={!formValid || submitting || items.length === 0}
          >
            {submitting ? 'Processing…' : 'Place order'}
          </button>
          <p className="mt-3 text-center text-xs text-text-secondary">
            By placing your order you agree to our friendly demo terms.
          </p>
        </aside>
      </form>
    </main>
  );
}