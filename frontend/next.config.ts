/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // проксируємо всі запити /api/* на бекенд
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://backend:4000/api/:path*',
      },
    ]
  },
}

module.exports = nextConfig