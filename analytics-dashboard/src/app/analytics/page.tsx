'use client';

import { useEffect, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { formatNumber, formatShortDay } from '@/lib/format';

interface SeriesPoint {
  date: string;
  views: number;
  engagement: number;
}

interface MetricsData {
  totals: { views: number; engagement: number; active_users: number };
  series: SeriesPoint[];
  trending: { tag: string; posts: number; views: number; engagement: number }[];
}

function tooltipLabel(date: string): string {
  return formatShortDay(date);
}

export default function AnalyticsPage() {
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/metrics')
      .then((res) => res.json())
      .then((json) => {
        if (cancelled) return;
        if (json.ok) setMetrics(json.data as MetricsData);
        else setError(json.error ?? 'Failed to load metrics.');
      })
      .catch(() => {
        if (!cancelled) setError('Could not load metrics.');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <div className="rounded-xl border border-error/25 bg-error/5 p-5 text-error" role="alert">
        {error}
      </div>
    );
  }

  const series = metrics?.series ?? [];
  const totalViews = series.reduce((s, p) => s + p.views, 0);
  const totalEng = series.reduce((s, p) => s + p.engagement, 0);

  return (
    <div className="mx-auto max-w-4xl">
      <header>
        <h1 className="text-3xl font-semibold text-text-primary">7-day overview</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Aggregate views and engagement across all content, updated live.
        </p>
      </header>

      {!metrics ? (
        <div className="card mt-6 h-80 animate-pulse" aria-label="Loading chart" />
      ) : (
        <>
          <div className="card mt-6 p-4 sm:p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-xl font-semibold text-text-primary">Performance</h2>
              <p className="text-sm text-text-secondary">
                <span className="font-semibold text-text-primary">{totalViews.toLocaleString()}</span>{' '}
                views ·{' '}
                <span className="font-semibold text-text-primary">{totalEng.toLocaleString()}</span>{' '}
                engagement
              </p>
            </div>
            <div className="mt-4 h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={series} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="viewsFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--brand)" stopOpacity={0.32} />
                      <stop offset="100%" stopColor="var(--brand)" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="engFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--warning)" stopOpacity={0.28} />
                      <stop offset="100%" stopColor="var(--warning)" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickFormatter={formatShortDay}
                    tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                    stroke="var(--border)"
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tickFormatter={formatNumber}
                    tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                    stroke="var(--border)"
                    tickLine={false}
                    axisLine={false}
                    width={44}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: '1px solid var(--border)',
                      fontSize: 13,
                    }}
                    labelFormatter={tooltipLabel}
                    formatter={(value: number | string | Array<number | string>, name: string) => [
                      formatNumber(Number(value)),
                      name === 'views' ? 'Views' : 'Engagement',
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="var(--brand-50)"
                    strokeWidth={2}
                    fill="url(#viewsFill)"
                    dot={false}
                    activeDot={{ r: 5 }}
                    animationDuration={400}
                  />
                  <Area
                    type="monotone"
                    dataKey="engagement"
                    stroke="var(--warning)"
                    strokeWidth={2}
                    fill="url(#engFill)"
                    dot={false}
                    activeDot={{ r: 5 }}
                    animationDuration={400}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="card p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                Best posting day
              </p>
              <p className="mt-2 text-2xl font-bold text-text-primary">
                {series.length
                  ? formatShortDay([...series].sort((a, b) => b.views - a.views)[0].date)
                  : '—'}
              </p>
            </div>
            <div className="card p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                Highest engagement rate
              </p>
              <p className="mt-2 text-2xl font-bold text-text-primary">
                {series.length
                  ? (() => {
                      const best = series
                        .filter((p) => p.views > 0)
                        .sort((a, b) => b.engagement / b.views - a.engagement / a.views)[0];
                      return best ? formatShortDay(best.date) : '—';
                    })()
                  : '—'}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}