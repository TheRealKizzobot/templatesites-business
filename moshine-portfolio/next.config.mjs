/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      { source: '/restaurant', destination: 'https://restaurant-site-i0ohcnv5o-therealkizzobots-projects.vercel.app', permanent: false },
      { source: '/taskflow', destination: 'https://taskflow-saas-iv2o8mnxg-therealkizzobots-projects.vercel.app', permanent: false },
      { source: '/booking', destination: 'https://booking-system-qy0lo5jiy-therealkizzobots-projects.vercel.app', permanent: false },
      { source: '/shop', destination: 'https://ecommerce-store-fpm2jmhl5-therealkizzobots-projects.vercel.app', permanent: false },
      { source: '/metrics', destination: 'https://analytics-dashboard-l8d23xnk8-therealkizzobots-projects.vercel.app', permanent: false },
    ];
  },
};

export default nextConfig;
