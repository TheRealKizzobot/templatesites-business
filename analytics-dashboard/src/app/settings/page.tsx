'use client';

import { useSettings, type PollFreq, type Theme } from '@/components/site/settings-context';

const THEME_OPTIONS: { value: Theme; label: string; hint: string }[] = [
  { value: 'light', label: 'Light', hint: 'Warm paper with dark brand ink' },
  { value: 'dark', label: 'Dark', hint: 'Espresso surface for low-light work' },
  { value: 'system', label: 'System', hint: 'Follow your OS preference' },
];

const POLL_OPTIONS: { value: PollFreq; label: string; hint: string }[] = [
  { value: 3000, label: '3 seconds', hint: 'Fastest — watch numbers tick live' },
  { value: 5000, label: '5 seconds', hint: 'Default balance of freshness and load' },
  { value: 10000, label: '10 seconds', hint: 'Gentler on the network' },
  { value: 0, label: 'Paused', hint: 'One refresh on load, then static' },
];

export default function SettingsPage() {
  const { theme, setTheme, pollFreq, setPollFreq } = useSettings();

  return (
    <div className="mx-auto max-w-2xl">
      <header>
        <h1 className="text-3xl font-semibold text-text-primary">Settings</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Preferences persist in this browser only.
        </p>
      </header>

      <section className="card mt-6 p-5 sm:p-6" aria-labelledby="theme-heading">
        <h2 id="theme-heading" className="text-xl font-semibold text-text-primary">
          Appearance
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Theme">
          {THEME_OPTIONS.map((opt) => {
            const active = theme === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setTheme(opt.value)}
                className={`rounded-xl border p-4 text-left transition-colors ${
                  active
                    ? 'border-brand-700 bg-brand-50 dark:border-brand-400 dark:bg-brand-900/30'
                    : 'border-border bg-white hover:border-brand-300 dark:border-brand-400 dark:bg-brand-900/30'
                }`}
              >
                <span className={`block font-semibold ${active ? 'text-text-primary' : 'text-text-primary'}`}>
                  {opt.label}
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-text-secondary">
                  {opt.hint}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="card mt-6 p-5 sm:p-6" aria-labelledby="polling-heading">
        <h2 id="polling-heading" className="text-xl font-semibold text-text-primary">
          Live updates
        </h2>
        <p className="mt-1 text-sm text-text-secondary">
          How often the dashboard and feed re-query the analytics API.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Polling interval">
          {POLL_OPTIONS.map((opt) => {
            const active = pollFreq === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setPollFreq(opt.value)}
                className={`rounded-xl border p-4 text-left transition-colors ${
                  active
                    ? 'border-brand-700 bg-brand-50 dark:border-brand-400 dark:bg-brand-900/30'
                    : 'border-border bg-white hover:border-brand-300 dark:border-brand-400 dark:bg-brand-900/30'
                }`}
              >
                <span className="block font-semibold text-text-primary">{opt.label}</span>
                <span className="mt-1 block text-xs leading-relaxed text-text-secondary">
                  {opt.hint}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <p className="mt-6 text-xs text-text-secondary">
        Refresh the dashboard to see your new polling interval take effect immediately — it
        is applied live via Settings context.
      </p>
    </div>
  );
}