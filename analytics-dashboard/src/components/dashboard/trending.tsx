'use client';

import { formatNumber } from '@/lib/format';

interface TrendingItem {
  tag: string;
  posts: number;
  views: number;
  engagement: number;
}

export default function Trending({
  items,
  loading,
}: {
  items: TrendingItem[];
  loading: boolean;
}) {
  return (
    <section aria-label="Trending topics" className="min-w-0">
      <h2 className="text-xl font-semibold text-text-primary">Trending</h2>
      <div className="card mt-3 divide-y divide-border p-2">
        {loading
          ? [0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse space-y-2 rounded-lg p-3">
                <div className="h-3 w-2/5 rounded bg-brand-100 dark:bg-brand-200/20" />
                <div className="h-3 w-3/5 rounded bg-brand-100 dark:bg-brand-200/20" />
              </div>
            ))
          : items.map((item, idx) => (
              <div key={item.tag} className="flex items-baseline justify-between gap-3 p-3">
                <div className="min-w-0">
                  <p className="flex items-baseline gap-2">
                    <span className="text-xs font-bold text-text-secondary">#{idx + 1}</span>
                    <span className="truncate font-semibold text-text-primary">#{item.tag}</span>
                  </p>
                  <p className="mt-0.5 text-xs text-text-secondary">
                    {item.posts} post{item.posts === 1 ? '' : 's'} · {formatNumber(item.views)} views
                  </p>
                </div>
                <span className="shrink-0 text-xs font-medium text-brand-700 dark:text-brand-100">
                  {formatNumber(item.engagement)}
                </span>
              </div>
            ))}
      </div>
    </section>
  );
}