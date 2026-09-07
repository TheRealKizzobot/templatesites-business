'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (json.ok) {
        router.replace('/admin');
        router.refresh();
        return;
      }
      setError(json.error || 'Incorrect password.');
    } catch {
      setError('Could not reach the server — please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main id="main" className="flex min-h-[80vh] items-center justify-center bg-bg-secondary px-4 py-16">
      <div className="w-full max-w-sm rounded-xl border border-border bg-white p-8 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
          Northlight Goods
        </p>
        <h1 className="mt-2 text-2xl">Admin sign in</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Enter the admin password from your environment configuration.
        </p>

        {error && (
          <div className="mt-4 rounded-md border border-error/25 bg-error/5 p-3 text-sm text-error" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
          <div>
            <label htmlFor="admin-password" className="label">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              className="field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full" disabled={submitting || !password}>
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </main>
  );
}