import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getBlogPosts, getBlogPostBySlug, BlogPost } from '../../lib/getData';

interface BlogPostProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogPostPage({ post, relatedPosts }: BlogPostProps) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.meta_description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://cnsdemo.com/blog/${post.slug}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.meta_description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://cnsdemo.com/blog/${post.slug}`} />
        <meta property="article:published_time" content={post.date} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": post.title.replace(' | C&S Demolition', ''),
              "description": post.meta_description,
              "datePublished": post.date,
              "author": {
                "@type": "Organization",
                "name": "C&S Demolition",
                "url": "https://cnsdemo.com"
              },
              "publisher": {
                "@type": "Organization",
                "name": "C&S Demolition",
                "url": "https://cnsdemo.com"
              },
              "url": `https://cnsdemo.com/blog/${post.slug}`,
              "mainEntityOfPage": `https://cnsdemo.com/blog/${post.slug}`
            })
          }}
        />
      </Head>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-brand-dark text-white py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <nav className="text-sm text-gray-400 mb-5 flex flex-wrap gap-1">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-white">Blog</Link>
              <span>/</span>
              <span className="text-gray-300">{post.category}</span>
            </nav>
            <span className="text-brand-orange text-xs font-bold uppercase tracking-widest mb-3 block">
              {post.category}
            </span>
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              {post.title.replace(' | C&S Demolition', '')}
            </h1>
            <p className="text-gray-300 text-lg mb-4">{post.excerpt}</p>
            <p className="text-gray-500 text-sm">
              {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              {' · '}
              <span>C&amp;S Demolition</span>
            </p>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="prose prose-lg max-w-none">
            {post.sections.map((section, i) => (
              <section key={i} className="mb-10">
                <h2 className="text-2xl font-bold text-brand-dark mb-4">{section.heading}</h2>
                {section.body.split('\n\n').map((para, j) => (
                  <p key={j} className="text-gray-700 mb-4 leading-relaxed">
                    {para}
                  </p>
                ))}
              </section>
            ))}
          </div>

          {/* CTA box */}
          <div className="bg-brand-dark text-white rounded-xl p-8 my-12 text-center">
            <h3 className="text-2xl font-bold mb-3">Need a Demolition Estimate in Southern California?</h3>
            <p className="text-gray-300 mb-6">
              C&amp;S Demolition is a CA-licensed contractor serving 125+ cities across Orange County, Los Angeles, Riverside, and San Bernardino Counties. Free on-site estimates, same-week availability.
            </p>
            <a
              href="tel:+15622046335"
              className="inline-block bg-brand-orange text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-orange-600 transition-colors"
            >
              📞 (562) 204-6335 — Free Estimate
            </a>
          </div>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-brand-dark mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="border border-gray-200 rounded-xl p-5 hover:border-brand-orange transition-colors"
                  >
                    <span className="text-xs text-brand-orange font-semibold uppercase">{related.category}</span>
                    <h3 className="font-bold text-sm mt-1 leading-snug">
                      {related.title.replace(' | C&S Demolition', '')}
                    </h3>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getBlogPosts();
  return {
    paths: posts.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BlogPostProps> = async ({ params }) => {
  const post = getBlogPostBySlug(params?.slug as string);
  if (!post) return { notFound: true };

  const allPosts = getBlogPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  return { props: { post, relatedPosts } };
};
