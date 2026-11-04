import { cookies } from 'next/headers';

const ANALYTICS_KEY = 'metricsapp_analytics';

export interface StoredAnalytics {
  content: Array<{
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
  }>;
  daily_stats: Array<{
    id: number;
    content_id: number;
    stat_date: string;
    views: number;
    engagement: number;
  }>;
}

export async function getAnalytics(): Promise<StoredAnalytics | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(ANALYTICS_KEY)?.value;
  if (!raw) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(raw));
    if (parsed && typeof parsed === 'object') return parsed;
    return null;
  } catch {
    return null;
  }
}

export async function setAnalytics(data: StoredAnalytics): Promise<void> {
  const cookieStore = await cookies();
  const value = encodeURIComponent(JSON.stringify(data));
  cookieStore.set(ANALYTICS_KEY, value, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: false,
    sameSite: 'lax'
  });
}
