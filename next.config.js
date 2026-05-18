/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.cnsdemo.com' }],
        destination: 'https://cnsdemo.com/:path*',
        permanent: true,
      },
    ];
  },
  // Generate sitemap at build time
  async headers() {
    return [
      {
        source: '/sitemap.xml',
        headers: [{ key: 'Content-Type', value: 'application/xml' }],
      },
    ];
  },
};

module.exports = nextConfig;
