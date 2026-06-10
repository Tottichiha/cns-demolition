/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,

  async redirects() {
    return [
      // www → non-www canonical redirect
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.cnsdemo.com' }],
        destination: 'https://cnsdemo.com/:path*',
        permanent: true,
      },
      // Conversion path used by blog CTAs — /contact is the free-estimate page
      {
        source: '/free-estimate',
        destination: '/contact',
        permanent: true,
      },
      // Pool demolition discontinued (2026-06-10) — service, city pages, and
      // blog guides removed. Redirect to the services hub / blog index.
      {
        source: '/demolition/pool-demolition',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/demolition/pool-demolition/:city',
        destination: '/services',
        permanent: true,
      },
      ...[
        'above-ground-pool-removal-cost',
        'pool-demolition-cost-orange-county',
        'pool-demolition-los-angeles',
        'pool-demolition-process',
        'pool-removal-irvine',
        'swimming-pool-fill-in-cost',
      ].map((slug) => ({
        source: `/blog/${slug}`,
        destination: '/blog',
        permanent: true,
      })),
    ];
  },

  async headers() {
    return [
      {
        source: '/sitemap.xml',
        headers: [{ key: 'Content-Type', value: 'application/xml' }],
      },
      // Security + performance headers on all pages
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      // Long cache for static assets
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
