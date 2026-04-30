/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
