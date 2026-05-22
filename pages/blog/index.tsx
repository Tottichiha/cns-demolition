import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getBlogPosts, getBlogCategories, getCities, BlogPost } from '../../lib/getData';

interface BlogIndexProps {
  posts: BlogPost[];
  categories: string[];
  totalCities: number;
}

export default function BlogIndex({ posts, categories, totalCities }: BlogIndexProps) {
  return (
    <>
      <Head>
        <title>Demolition Tips, Cost Guides & How-To Articles | C&amp;S Demolition</title>
        <meta
          name="description"
          content="Expert demolition cost guides, permit tips, and how-to articles for Southern California homeowners and contractors — from C&S Demolition. Licensed CA contractor. Free estimates. (562) 204-6335."
        />
        <link rel="canonical" href="https://cnsdemo.com/blog" />
        <meta property="og:title" content="Demolition Tips, Cost Guides & How-To Articles | C&S Demolition" />
        <meta property="og:description" content="Expert demolition tips, cost guides, and permit advice for Southern California. Interior demo, pool removal, concrete breaking, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cnsdemo.com/blog" />
        <meta property="og:image" content="https://cnsdemo.com/api/og?title=Demolition+Resource+Center&sub=Cost+Guides+%C2%B7+How-To+%C2%B7+Permit+Tips&type=blog" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://cnsdemo.com/api/og?title=Demolition+Resource+Center&sub=Cost+Guides+%C2%B7+How-To+%C2%B7+Permit+Tips&type=blog" />
        <meta name="twitter:image:alt" content="Demolition Resource Center — Cost Guides & How-To Articles" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'CollectionPage',
                  '@id': 'https://cnsdemo.com/blog',
                  name: 'Demolition Resource Center | C&S Demolition',
                  description: 'Expert demolition cost guides, permit tips, and how-to articles for Southern California homeowners and contractors from CA-licensed demolition professionals.',
                  url: 'https://cnsdemo.com/blog',
                  publisher: {
                    '@type': 'Organization',
                    name: 'C&S Demolition',
                    url: 'https://cnsdemo.com',
                    logo: { '@type': 'ImageObject', url: 'https://cnsdemo.com/logo.svg' },
                  },
                  breadcrumb: {
                    '@type': 'BreadcrumbList',
                    itemListElement: [
                      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cnsdemo.com' },
                      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://cnsdemo.com/blog' },
                    ],
                  },
                },
                {
                  '@type': 'ItemList',
                  name: 'Demolition Articles & Guides',
                  description: 'Cost guides, how-to articles, and permit guides for demolition projects in Southern California.',
                  numberOfItems: posts.length,
                  itemListElement: posts.slice(0, 20).map((post, i) => ({
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
        <section className="bg-brand-dark text-white py-14 px-4 text-center">
          <p className="text-brand-orange text-sm font-bold uppercase tracking-widest mb-3">
            Demolition Resource Center
          </p>
          <h1 className="text-4xl font-bold mb-3">
            Demolition Tips &amp; Cost Guides for Southern California
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Expert cost breakdowns, permit guides, and how-to advice from C&amp;S Demolition — licensed CA demolition contractors serving {totalCities}+ cities.
          </p>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            <span className="text-sm font-semibold text-gray-500 self-center mr-2">Browse by:</span>
            {categories.map((cat) => {
              const slug = cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
              return (
                <Link
                  key={cat}
                  href={`/blog/category/${slug}`}
                  className="text-sm bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-full text-gray-700 hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-colors"
                >
                  {cat}
                </Link>
              );
            })}
          </div>

          {/* Post grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
        </div>

        {/* CTA */}
        <section className="bg-brand-orange text-white py-14 px-4 text-center">
          <h2 className="text-3xl font-bold mb-3">Ready for a Free Demolition Estimate?</h2>
          <p className="text-orange-100 max-w-xl mx-auto mb-6">
            We come to your property, assess the project in person, and give you a written quote the same day — no obligation.
          </p>
          <a
            href="tel:+15622046335"
            className="inline-block bg-white text-brand-orange font-bold px-10 py-4 rounded-lg text-xl hover:bg-gray-100 transition-colors"
          >
            📞 (562) 204-6335
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps<BlogIndexProps> = async () => {
  const posts = getBlogPosts().sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const categories = getBlogCategories();
  const totalCities = getCities().length;
  return { props: { posts, categories, totalCities } };
};
