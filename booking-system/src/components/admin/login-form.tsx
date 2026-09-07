'use client';

import { useState } from 'react';

export default function LoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const json = (await res.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;
      if (!res.ok || !json?.ok) {
        setError(json?.error || 'Incorrect password.');
        return;
      }
      window.location.reload();
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="card w-full max-w-md p-8">
        <h1 className="text-3xl">Admin sign in</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Ember &amp; Wood — booking management
        </p>

        <form className="mt-6" onSubmit={onSubmit} noValidate>
          <label className="label" htmlFor="admin-password">
            Password
          </label>
          <input
            id="admin-password"
            className="field"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'login-error' : undefined}
          />

          {error && (
            <p id="login-error" role="alert" className="mt-3 text-sm text-error">
              {error}
            </p>
          )}

          <button type="submit" className="btn-primary mt-6 w-full" disabled={busy}>
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}