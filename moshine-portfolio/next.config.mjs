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
      { source: '/restaurant', destination: 'https://restaurant-site-tawny.vercel.app', permanent: false },
      { source: '/taskflow', destination: 'https://taskflow-saas-lac.vercel.app', permanent: false },
      { source: '/booking', destination: 'https://booking-system-olive-eight.vercel.app', permanent: false },
      { source: '/shop', destination: 'https://ecommerce-store-five-phi.vercel.app', permanent: false },
      { source: '/metrics', destination: 'https://analytics-dashboard-five-kohl.vercel.app', permanent: false },
    ];
  },
};

export default nextConfig;
