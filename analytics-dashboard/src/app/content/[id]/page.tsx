'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { formatNumber, formatShortDay, timeAgo, formatDateLong } from '@/lib/format';

interface ContentDetail {
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

interface SeriesPoint {
  date: string;
  views: number;
  engagement: number;
}

const PLATFORM_COLORS: Record<string, string> = {
  X: 'bg-brand-900 text-brand-50',
  Instagram: 'bg-brand-600 text-brand-50',
  LinkedIn: 'bg-success text-white',
};

export default function ContentDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const [content, setContent] = useState<ContentDetail | null>(null);
  const [series, setSeries] = useState<SeriesPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/content/${id}`)
      .then((res) => res.json())
      .then((json) => {
        if (cancelled) return;
        if (json.ok) {
          setContent(json.data.content as ContentDetail);
          setSeries(json.data.series as SeriesPoint[]);
        } else {
          setError(json.error ?? 'Content not found.');
        }
      })
      .catch(() => {
        if (!cancelled) setError('Could not load this content.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return <p className="text-text-secondary">Loading…</p>;
  }

  if (error || !content) {
    return (
      <div>
        <div className="rounded-xl border border-error/25 bg-error/5 p-5 text-error" role="alert">
          {error ?? 'Content not found.'}
        </div>
        <Link href="/dashboard" className="btn btn-secondary mt-6">
          Back to dashboard
        </Link>
      </div>
    );
  }

  const tags = content.tags.split(',').map((t) => t.trim()).filter(Boolean);

  return (
    <div className="mx-auto max-w-4xl">
      <Link href="/dashboard" className="btn btn-ghost">
        ← Dashboard
      </Link>

      <article className="card mt-4 p-6" aria-labelledby="content-title">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-text-primary">{content.handle}</span>
          <span className="text-sm text-text-secondary">{content.author}</span>
          <span className={`pill ${PLATFORM_COLORS[content.platform] ?? 'bg-brand-100 text-brand-800'}`}>
            {content.platform}
          </span>
          <span className="ml-auto text-sm text-text-secondary">{timeAgo(content.created_at)}</span>
        </div>

        <h1 id="content-title" className="mt-3 font-display text-2xl font-semibold leading-snug text-text-primary sm:text-3xl">
          {content.title}
        </h1>
        <p className="mt-3 whitespace-pre-line text-base leading-relaxed text-text-secondary">
          {content.body}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="pill bg-brand-100 text-brand-800 dark:bg-brand-200/20 dark:text-brand-800">
              #{tag}
            </span>
          ))}
        </div>

        <p className="mt-4 text-xs text-text-secondary">Posted {formatDateLong(content.created_at)}</p>
      </article>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="card p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">Views</p>
          <p className="mt-2 text-2xl font-bold text-text-primary tabular-nums">
            {formatNumber(content.views)}
          </p>
        </div>
        <div className="card p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">Engagement</p>
          <p className="mt-2 text-2xl font-bold text-text-primary tabular-nums">
            {formatNumber(content.engagement)}
          </p>
        </div>
        <div className="card p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">Active now</p>
          <p className="mt-2 text-2xl font-bold text-text-primary tabular-nums">
            {formatNumber(content.active_users)}
          </p>
        </div>
      </div>

      <section className="card mt-6 p-4 sm:p-6" aria-labelledby="chart-heading">
        <h2 id="chart-heading" className="text-xl font-semibold text-text-primary">
          7-day performance
        </h2>
        <div className="mt-4 h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={series} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="detailViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--brand-50)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="var(--brand-50)" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="detailEng" x1="0" y1="0" x2="0" y2="1">
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
                contentStyle={{ borderRadius: 12, border: '1px solid var(--border)', fontSize: 13 }}
                labelFormatter={(date: string) => formatShortDay(date)}
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
                fill="url(#detailViews)"
                dot={false}
                activeDot={{ r: 5 }}
                animationDuration={400}
              />
              <Area
                type="monotone"
                dataKey="engagement"
                stroke="var(--warning)"
                strokeWidth={2}
                fill="url(#detailEng)"
                dot={false}
                activeDot={{ r: 5 }}
                animationDuration={400}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}