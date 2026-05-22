import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { getBlogPosts, getBlogCategories, BlogPost } from '../../../lib/getData';

interface PageProps {
  category: string;
  categorySlug: string;
  posts: BlogPost[];
  allCategories: string[];
}

function categoryToSlug(cat: string): string {
  return cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function categoryDescription(category: string, count: number): string {
  const descs: Record<string, string> = {
    'Cost Guides': `Detailed price breakdowns for ${count} demolition projects across Southern California — covering labor, permits, disposal, and what affects your final cost.`,
    'How-To Guides': `Step-by-step guides for ${count} demolition topics — understanding the process, permit requirements, and what to expect when hiring a contractor.`,
    'City Guides': `Local demolition guides for ${count} cities in Southern California — covering permit offices, local costs, and what makes each city unique.`,
    'Permits & Regulations': `Everything you need to know about ${count} permit and regulatory topics in California demolition — from filing to final inspection.`,
    'Commercial': `${count} guides covering commercial demolition — office buildouts, retail teardowns, industrial sites, and large-scale projects.`,
  };
  return descs[category] || `${count} articles about ${category.toLowerCase()} from C&S Demolition — licensed CA demolition contractor.`;
}

export default function CategoryPage({ category, categorySlug, posts, allCategories }: PageProps) {
  const title = `${category} | Demolition Articles | C&S Demolition`;
  const description = categoryDescription(category, posts.length);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://cnsdemo.com/blog/category/${categorySlug}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://cnsdemo.com/blog/category/${categorySlug}`} />
        <meta property="og:image" content={`https://cnsdemo.com/api/og?title=${encodeURIComponent(category)}&sub=${encodeURIComponent(posts.length + ' Articles · C&S Demolition')}&type=blog`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'CollectionPage',
                  name: `${category} | C&S Demolition`,
                  description,
                  url: `https://cnsdemo.com/blog/category/${categorySlug}`,
                  breadcrumb: {
                    '@type': 'BreadcrumbList',
                    itemListElement: [
                      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cnsdemo.com' },
                      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://cnsdemo.com/blog' },
                      { '@type': 'ListItem', position: 3, name: category, item: `https://cnsdemo.com/blog/category/${categorySlug}` },
                    ],
                  },
                },
                {
                  '@type': 'ItemList',
                  name: `${category} Articles`,
                  numberOfItems: posts.length,
                  itemListElement: posts.map((post, i) => ({
                    '@type': 'ListItem',
                    position: i + 1,
                    url: `https://cnsdemo.com/blog/${post.slug}`,
                    name: post.title.replace(' | C&S Demolition', ''),
                  })),
                },
              ],
            })
          }}
        />
      </Head>

      <Header />

      <main>
        <section className="bg-brand-dark text-white py-14 px-4">
          <div className="max-w-4xl mx-auto">
            <nav className="text-sm text-gray-400 mb-5 flex flex-wrap gap-1">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-white">Blog</Link>
              <span>/</span>
              <span className="text-white">{category}</span>
            </nav>
            <span className="text-brand-orange text-xs font-bold uppercase tracking-widest mb-3 block">
              {posts.length} Articles
            </span>
            <h1 className="text-4xl font-bold mb-4">{category}</h1>
            <p className="text-gray-300 text-lg max-w-2xl">{description}</p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-12">

          {/* Category filter tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="text-sm font-semibold text-gray-500 self-center">Browse:</span>
            <Link
              href="/blog"
              className="text-sm bg-gray-100 hover:bg-brand-orange hover:text-white px-3 py-1.5 rounded-full transition-colors"
            >
              All Posts
            </Link>
            {allCategories.map((cat) => (
              <Link
                key={cat}
                href={`/blog/category/${categoryToSlug(cat)}`}
                className={`text-sm px-3 py-1.5 rounded-full transition-colors ${
                  cat === category
                    ? 'bg-brand-orange text-white'
                    : 'bg-gray-100 hover:bg-brand-orange hover:text-white'
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>

          {/* Post grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:border-brand-orange hover:shadow-md transition-all flex flex-col"
              >
                <span className="text-xs font-semibold text-brand-orange uppercase tracking-wide mb-2">
                  {post.category}
                </span>
                <h2 className="font-bold text-gray-900 text-lg mb-3 leading-snug flex-1">
                  {post.title.replace(' | C&S Demolition', '')}
                </h2>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs text-gray-400">
                    {new Date(post.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="text-sm text-brand-orange font-semibold">Read more →</span>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <section className="bg-brand-orange text-white rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Ready for a Free Demolition Estimate?</h2>
            <p className="text-orange-100 mb-6 max-w-xl mx-auto">
              C&amp;S Demolition is a CA-licensed contractor (License #1126325) serving 123+ cities in Southern California. Free on-site estimates — we come to you.
            </p>
            <a
              href="tel:+15622046335"
              className="inline-block bg-white text-brand-orange font-bold px-10 py-4 rounded-lg text-xl hover:bg-gray-100 transition-colors"
            >
              📞 (562) 204-6335
            </a>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = getBlogCategories();
  return {
    paths: categories.map((cat) => ({
      params: { category: categoryToSlug(cat) },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const categorySlug = params?.category as string;
  const allCategories = getBlogCategories();
  const category = allCategories.find((c) => categoryToSlug(c) === categorySlug);
  if (!category) return { notFound: true };

  const posts = getBlogPosts()
    .filter((p) => p.category === category)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return { props: { category, categorySlug, posts, allCategories } };
};
