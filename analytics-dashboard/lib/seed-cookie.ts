import { getAnalytics, setAnalytics, type StoredAnalytics } from './cookie-store';

export async function seedAnalytics(): Promise<void> {
  const existing = await getAnalytics();
  if (existing && existing.content && existing.content.length > 0) return;
  
  const data: StoredAnalytics = {
    content: [
      {
        id: 1,
        handle: '@techinsights',
        author: 'Sarah Chen',
        title: 'The Future of AI in Web Development',
        body: 'Exploring how AI tools are revolutionizing the way we build websites and applications.',
        platform: 'Twitter',
        tags: '#AI,#WebDev,#Technology',
        views: 12500,
        engagement: 890,
        active_users: 45,
        created_at: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: 2,
        handle: '@designweekly',
        author: 'Mike Johnson',
        title: 'Minimalist Design Trends 2024',
        body: 'Why less is more in modern user interface design.',
        platform: 'LinkedIn',
        tags: '#Design,#UI,#Minimalism',
        views: 8900,
        engagement: 650,
        active_users: 32,
        created_at: new Date(Date.now() - 172800000).toISOString(),
      },
      {
        id: 3,
        handle: '@codecraft',
        author: 'Emily Davis',
        title: 'React 18 Best Practices',
        body: 'A comprehensive guide to building performant React applications.',
        platform: 'Medium',
        tags: '#React,#JavaScript,#Performance',
        views: 15200,
        engagement: 1200,
        active_users: 67,
        created_at: new Date(Date.now() - 259200000).toISOString(),
      },
    ],
    daily_stats: [
      { id: 1, content_id: 1, stat_date: new Date(Date.now() - 86400000).toISOString().split('T')[0], views: 1200, engagement: 85 },
      { id: 2, content_id: 1, stat_date: new Date().toISOString().split('T')[0], views: 1500, engagement: 95 },
      { id: 3, content_id: 2, stat_date: new Date().toISOString().split('T')[0], views: 890, engagement: 65 },
      { id: 4, content_id: 3, stat_date: new Date().toISOString().split('T')[0], views: 2100, engagement: 180 },
    ],
  };
  
  await setAnalytics(data);
}
