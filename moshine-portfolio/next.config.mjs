/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Reverse proxy rewrites for dev mode
  async rewrites() {
    return [
      { source: "/restaurant/:path*", destination: "http://localhost:3001/:path*" },
      { source: "/taskflow/:path*", destination: "http://localhost:3002/:path*" },
      { source: "/booking/:path*", destination: "http://localhost:3003/:path*" },
      { source: "/shop/:path*", destination: "http://localhost:3000/:path*" },
      { source: "/metrics/:path*", destination: "http://localhost:3005/:path*" },
    ];
  },
};

export default nextConfig;