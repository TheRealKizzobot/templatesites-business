/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Reverse proxy rewrites for dev mode (ports per CLAUDE.md)
  async rewrites() {
    return [
      { source: "/restaurant/:path*", destination: "http://localhost:3000/:path*" },
      { source: "/taskflow/:path*", destination: "http://localhost:3001/:path*" },
      { source: "/booking/:path*", destination: "http://localhost:3000/:path*" },
      { source: "/shop/:path*", destination: "http://localhost:3020/:path*" },
      { source: "/metrics/:path*", destination: "http://localhost:3010/:path*" },
    ];
  },
};

export default nextConfig;