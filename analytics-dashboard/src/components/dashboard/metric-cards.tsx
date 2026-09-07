'use client';

import type { SeriesPoint } from '@/app/dashboard/page';

interface Props {
  totals: { views: number; engagement: number; active_users: number } | null;
  series: SeriesPoint[];
  loading: boolean;
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 10_000) return `${(n / 1000).toFixed(0)}k`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

function deltaPct(current: number, prev: number): { label: string; up: boolean } | null {
  if (!prev) return null;
  const delta = ((current - prev) / prev) * 100;
  return { label: `${delta >= 0 ? '+' : ''}${delta.toFixed(1)}%`, up: delta >= 0 };
}

export default function MetricCards({ totals, series, loading }: Props) {
  const today = series.length > 0 ? series[series.length - 1] : null;
  const yesterday = series.length > 1 ? series[series.length - 2] : null;

  const viewsDelta = today && yesterday ? deltaPct(today.views, yesterday.views) : null;
  const engDelta = today && yesterday ? deltaPct(today.engagement, yesterday.engagement) : null;

  const cards = [
    {
      label: 'Views',
      value: totals ? formatNumber(totals.views) : '—',
      sub: viewsDelta
        ? `${viewsDelta.label} vs yesterday`
        : 'all time',
      up: viewsDelta?.up,
    },
    {
      label: 'Engagement',
      value: totals ? formatNumber(totals.engagement) : '—',
      sub: engDelta
        ? `${engDelta.label} vs yesterday`
        : 'all time',
      up: engDelta?.up,
    },
    {
      label: 'Active now',
      value: totals ? formatNumber(totals.active_users) : '—',
      sub: 'on posts right now',
      up: true,
    },
  ];

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
      {cards.map((card) => (
        <article key={card.label} className="card p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
            {card.label}
          </p>
          <p className="mt-2 text-3xl font-bold text-text-primary tabular-nums">
            {loading ? '…' : card.value}
          </p>
          <p className={`mt-1 text-xs font-medium ${card.up === false ? 'text-error' : 'text-success'}`}>
            {card.sub}
          </p>
        </article>
      ))}
    </div>
  );
}