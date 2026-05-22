import { GetServerSideProps } from 'next';
import { getAllCityServicePairs, getCounties, getServices, getBlogPosts, getBlogCategories } from '../lib/getData';

function categoryToSlug(cat: string): string {
  return cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function Sitemap() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = 'https://cnsdemo.com';

  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/services', priority: '0.8', changefreq: 'monthly' },
    { url: '/service-areas', priority: '0.8', changefreq: 'monthly' },
    { url: '/blog', priority: '0.8', changefreq: 'weekly' },
    { url: '/contact', priority: '0.7', changefreq: 'monthly' },
    { url: '/about', priority: '0.7', changefreq: 'monthly' },
  ];

  const counties = getCounties();
  const countyPages = counties.map((county) => ({
    url: `/county/${county.toLowerCase().replace(/ /g, '-')}`,
    priority: '0.7',
    changefreq: 'monthly',
  }));

  const services = getServices();
  const serviceIndexPages = services.map((s) => ({
    url: `/demolition/${s.service_slug}`,
    priority: '0.7',
    changefreq: 'monthly',
  }));

  const pairs = getAllCityServicePairs();
  const landingPages = pairs.map(({ citySlug, serviceSlug }) => ({
    url: `/demolition/${serviceSlug}/${citySlug}`,
    priority: '0.6',
    changefreq: 'monthly',
  }));

  const categories = getBlogCategories();
  const categoryPages = categories.map((cat) => ({
    url: `/blog/category/${categoryToSlug(cat)}`,
    priority: '0.7',
    changefreq: 'weekly',
  }));

  const blogPosts = getBlogPosts();
  const blogPages = blogPosts.map((post) => ({
    url: `/blog/${post.slug}`,
    priority: '0.6',
    changefreq: 'monthly',
    lastmod: post.date,
  }));

  const allPages = [...staticPages, ...countyPages, ...serviceIndexPages, ...categoryPages, ...landingPages, ...blogPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>${(page as { lastmod?: string }).lastmod ? `\n    <lastmod>${(page as { lastmod?: string }).lastmod}</lastmod>` : ''}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200');
  res.write(sitemap);
  res.end();

  return { props: {} };
};

export default Sitemap;
