'use client';

import Link from 'next/link';
import { useSettings } from '@/components/site/settings-context';
import { formatNumber, timeAgo } from '@/lib/format';
import type { FeedItem } from '@/app/dashboard/page';

const PLATFORM_COLORS: Record<string, string> = {
  X: 'bg-brand-800 text-brand-50 dark:bg-brand-200 dark:text-brand-900',
  Instagram: 'bg-warning/20 text-warning dark:bg-warning/30 dark:text-warning',
  LinkedIn: 'bg-success/20 text-success dark:bg-success/30 dark:text-success',
};

export default function Feed({ items, loading }: { items: FeedItem[]; loading: boolean }) {
  const { pollFreq } = useSettings();

  if (loading) {
    return (
      <section className="card mt-6 p-2" aria-label="Loading feed">
        <div className="space-y-1">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse rounded-lg p-3">
              <div className="h-3 w-1/3 rounded bg-bg-tertiary dark:bg-bg-tertiary" />
              <div className="mt-2 h-4 w-3/4 rounded bg-bg-tertiary dark:bg-bg-tertiary" />
              <div className="mt-2 h-3 w-full rounded bg-bg-tertiary dark:bg-bg-tertiary" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Content feed" aria-live="polite">
      <div className="mt-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-text-primary">Live feed</h2>
        <span className="text-xs text-text-secondary">
          {pollFreq === 0 ? 'paused' : `every ${pollFreq / 1000}s`}
        </span>
      </div>

      <ul className="mt-3 space-y-3">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={`/content/${item.id}`}
              className="block rounded-xl border border-border bg-white p-4 shadow-soft transition-shadow hover:shadow-lift dark:bg-bg-secondary animate-fade-in"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-text-primary">{item.handle}</span>
                  <span className="text-xs text-text-secondary">{item.author}</span>
                  <span className={`pill ${PLATFORM_COLORS[item.platform] ?? 'bg-bg-tertiary text-text-secondary dark:bg-bg-tertiary dark:text-text-secondary'}`}>
                    {item.platform}
                  </span>
                </div>
                <span className="text-xs text-text-secondary">{timeAgo(item.created_at)}</span>
              </div>

              <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-text-primary">
                {item.title}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm text-text-secondary">{item.body}</p>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                <span className="inline-flex items-center gap-1.5 text-text-primary" aria-label={`${formatNumber(item.views)} views`}>
                  <span aria-hidden="true">👁</span>
                  <span className="tabular-nums">{formatNumber(item.views)}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-text-primary" aria-label={`${formatNumber(item.engagement)} engagements`}>
                  <span aria-hidden="true">❤</span>
                  <span className="tabular-nums">{formatNumber(item.engagement)}</span>
                </span>
                <span className="ml-auto text-xs font-medium text-text-secondary">
                  View detail →
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}