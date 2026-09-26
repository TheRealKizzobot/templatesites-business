/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverComponents: ['better-sqlite3'],
  serverExternalPackages: ['better-sqlite3'],
};

export default nextConfig;