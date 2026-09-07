'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSettings } from '@/components/site/settings-context';
import MetricCards from '@/components/dashboard/metric-cards';
import Feed from '@/components/dashboard/feed';
import Trending from '@/components/dashboard/trending';

export interface FeedItem {
  id: number;
  handle: string;
  author: string;
  title: string;
  body: string;
  platform: string;
  tags: string;
  views: number;
  engagement: number;
  active_users: number;
  created_at: string;
}

export interface SeriesPoint {
  date: string;
  views: number;
  engagement: number;
}

export interface MetricsData {
  totals: { views: number; engagement: number; active_users: number };
  series: SeriesPoint[];
  trending: { tag: string; posts: number; views: number; engagement: number }[];
}

export default function DashboardPage() {
  const { pollFreq } = useSettings();
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const [mRes, fRes] = await Promise.all([
        fetch('/api/metrics'),
        fetch('/api/feed'),
      ]);
      const [mJson, fJson] = await Promise.all([mRes.json(), fRes.json()]);
      if (mJson.ok) setMetrics(mJson.data as MetricsData);
      if (fJson.ok) setFeed((fJson.data as { items: FeedItem[] }).items);
      setError(null);
    } catch {
      setError('Could not reach the live feed. Is the server running?');
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    if (pollFreq === 0) return;
    const id = window.setInterval(refresh, pollFreq);
    return () => window.clearInterval(id);
  }, [pollFreq, refresh]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="min-w-0">
        <header className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h1 className="text-3xl font-semibold text-text-primary">Dashboard</h1>
            <p className="mt-1 text-sm text-text-secondary">
              Live content analytics
            </p>
          </div>
          <span className="pill bg-success/10 text-success" role="status">
            <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
            Live
          </span>
        </header>

        {error && (
          <div className="mt-4 rounded-xl border border-error/25 bg-error/5 p-4 text-sm text-error" role="alert">
            {error}
          </div>
        )}

        <MetricCards
          totals={metrics?.totals ?? null}
          series={metrics?.series ?? []}
          loading={!metrics}
        />

        {(pollFreq || 5000) < 10000 && (
          <p className="mt-2 text-xs text-text-secondary" aria-live="polite">
            Feed refreshes every {(pollFreq || 5000) / 1000}s — watch the numbers move.
          </p>
        )}

        <Feed items={feed} loading={feed.length === 0 && !error} />
      </div>

      <aside className="min-w-0">
        <Trending items={metrics?.trending ?? []} loading={!metrics} />
        <div className="card mt-4 p-4">
          <h2 className="text-lg font-semibold text-text-primary">How this works</h2>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            A background simulator bumps views and engagement on random posts every few
            seconds, so the cards and feed behave like a real analytics product.
            Set your polling interval in Settings.
          </p>
        </div>
      </aside>
    </div>
  );
}