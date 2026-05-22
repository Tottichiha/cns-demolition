import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getBlogPosts, getBlogPostBySlug, getServices, BlogPost, Service } from '../../lib/getData';

interface BlogPostProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
  services: Service[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function estimateWordCount(post: BlogPost): number {
  const allText = post.sections.map((s) => s.heading + ' ' + s.body).join(' ');
  return Math.round(allText.replace(/\s+/g, ' ').split(' ').length);
}

function estimateReadTime(post: BlogPost): number {
  return Math.max(1, Math.round(estimateWordCount(post) / 200));
}

function headingToQuestion(heading: string): string {
  const trimmed = heading.trim();
  if (trimmed.endsWith('?')) return trimmed;
  const lower = trimmed.toLowerCase();
  const starters = ['why ', 'how ', 'what ', 'when ', 'where ', 'which ', 'is ', 'are ', 'do ', 'does ', 'can ', 'should ', 'will ', 'who '];
  if (starters.some((s) => lower.startsWith(s))) return `${trimmed}?`;
  return `What should you know about ${lower}?`;
}

function generateBlogFAQs(post: BlogPost) {
  const skipKeywords = ['call c&s', 'free estimate', 'contact us', 'schedule', 'get a free', 'ready to', 'call us'];
  return post.sections
    .filter((s) => {
      const h = s.heading.toLowerCase();
      return !skipKeywords.some((kw) => h.includes(kw));
    })
    .slice(0, 5)
    .map((section) => ({
      q: headingToQuestion(section.heading),
      a: section.body.split('\n\n')[0].replace(/\n/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 600),
    }));
}

function buildHowToSchema(post: BlogPost) {
  const steps = post.sections.filter((s) => {
    const h = s.heading.toLowerCase();
    const skip = ['call c&s', 'free estimate', 'contact us', 'schedule', 'get a free', 'ready to'];
    return !skip.some((kw) => h.includes(kw));
  });
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: post.title.replace(' | C&S Demolition', ''),
    description: post.excerpt,
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: 'Varies by project — call for free estimate',
    },
    totalTime: `PT${estimateReadTime(post) + 30}M`,
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.heading,
      text: s.body.split('\n\n')[0].replace(/\n/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 500),
    })),
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function BlogPostPage({ post, relatedPosts, services }: BlogPostProps) {
  const cleanTitle = post.title.replace(' | C&S Demolition', '');
  const readTime = estimateReadTime(post);
  const wordCount = estimateWordCount(post);
  const faqs = generateBlogFAQs(post);
  const isHowTo = post.category === 'How-To Guides';
  const showToC = post.sections.length >= 4;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': ['Article', 'TechArticle'],
    headline: cleanTitle,
    description: post.meta_description,
    datePublished: post.date,
    dateModified: post.date,
    wordCount,
    inLanguage: 'en-US',
    author: {
      '@type': 'Person',
      name: 'C&S Demolition Team',
      jobTitle: 'Licensed Demolition Contractor',
      worksFor: {
        '@type': 'Organization',
        name: 'C&S Demolition',
        url: 'https://cnsdemo.com',
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'C&S Demolition',
      url: 'https://cnsdemo.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cnsdemo.com/logo.png',
      },
    },
    url: `https://cnsdemo.com/blog/${post.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://cnsdemo.com/blog/${post.slug}`,
    },
    keywords: post.title
      .replace(' | C&S Demolition', '')
      .split(/\s+/)
      .filter((w) => w.length > 4)
      .join(', '),
    about: {
      '@type': 'Thing',
      name: 'Demolition Services in Southern California',
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cnsdemo.com' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://cnsdemo.com/blog' },
        { '@type': 'ListItem', position: 3, name: post.category, item: `https://cnsdemo.com/blog/category/${post.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}` },
        { '@type': 'ListItem', position: 4, name: cleanTitle, item: `https://cnsdemo.com/blog/${post.slug}` },
      ],
    },
  };

  const faqSchema = faqs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      }
    : null;

  const howToSchema = isHowTo ? buildHowToSchema(post) : null;

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
        <meta property="og:image" content={`https://cnsdemo.com/api/og?title=${encodeURIComponent(cleanTitle)}&sub=${encodeURIComponent(post.category + ' · C&S Demolition')}&type=blog`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`https://cnsdemo.com/api/og?title=${encodeURIComponent(cleanTitle)}&sub=${encodeURIComponent(post.category + ' · C&S Demolition')}&type=blog`} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:section" content={post.category} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
        {howToSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />}
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
              <Link href={`/blog/category/${post.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`} className="hover:text-white">{post.category}</Link>
            </nav>
            <Link
              href={`/blog/category/${post.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
              className="text-brand-orange text-xs font-bold uppercase tracking-widest mb-3 block hover:text-orange-300 transition-colors"
            >
              {post.category}
            </Link>
            <h1 className="text-4xl font-bold mb-4 leading-tight">{cleanTitle}</h1>
            <p className="text-gray-300 text-lg mb-4">{post.excerpt}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <span>
                {new Date(post.date + 'T12:00:00').toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span>·</span>
              <span>{readTime} min read</span>
              <span>·</span>
              <span>{wordCount.toLocaleString()} words</span>
              <span>·</span>
              <span>C&amp;S Demolition</span>
            </div>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 py-12">

          {/* Table of Contents */}
          {showToC && (
            <nav className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-10">
              <p className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">In This Article</p>
              <ol className="space-y-1.5">
                {post.sections
                  .filter((s) => {
                    const h = s.heading.toLowerCase();
                    return !['call c&s', 'free estimate', 'contact us', 'ready to', 'get a free'].some((kw) => h.includes(kw));
                  })
                  .map((section, i) => (
                    <li key={i}>
                      <a
                        href={`#section-${i}`}
                        className="text-sm text-brand-orange hover:underline leading-snug"
                      >
                        {i + 1}. {section.heading}
                      </a>
                    </li>
                  ))}
              </ol>
            </nav>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {post.sections.map((section, i) => {
              const isCTA = ['call c&s', 'free estimate', 'contact us', 'ready to', 'get a free'].some((kw) =>
                section.heading.toLowerCase().includes(kw)
              );
              return (
                <section key={i} id={`section-${i}`} className="mb-10">
                  <h2 className="text-2xl font-bold text-brand-dark mb-4">{section.heading}</h2>
                  {section.body.split('\n\n').map((para, j) => {
                    // Render numbered lists (lines starting with digits)
                    if (para.match(/^\d+\./m)) {
                      const lines = para.split('\n').filter(Boolean);
                      return (
                        <ol key={j} className="list-decimal list-inside text-gray-700 mb-4 space-y-1">
                          {lines.map((line, k) => (
                            <li key={k} className="leading-relaxed text-sm">{line.replace(/^\d+\.\s*/, '')}</li>
                          ))}
                        </ol>
                      );
                    }
                    // Render bullet lists (lines starting with -)
                    if (para.match(/^-\s/m)) {
                      const lines = para.split('\n').filter(Boolean);
                      return (
                        <ul key={j} className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                          {lines.map((line, k) => (
                            <li key={k} className="leading-relaxed text-sm">{line.replace(/^-\s*/, '')}</li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <p key={j} className="text-gray-700 mb-4 leading-relaxed">
                        {para}
                      </p>
                    );
                  })}
                  {/* Inline CTA after section 2 */}
                  {i === 1 && !isCTA && (
                    <div className="bg-brand-orange/10 border border-brand-orange/30 rounded-lg p-4 my-6 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-sm">Need a free demolition estimate?</p>
                        <p className="text-xs text-gray-600">CA Licensed #1126325 · Serving 123+ SoCal Cities · Same-week availability</p>
                      </div>
                      <a
                        href="tel:+15622046335"
                        className="flex-shrink-0 bg-brand-orange text-white font-bold px-4 py-2 rounded-lg text-sm hover:bg-orange-600 transition-colors"
                      >
                        📞 (562) 204-6335
                      </a>
                    </div>
                  )}
                </section>
              );
            })}
          </div>

          {/* FAQ Section */}
          {faqs.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-dark mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <details key={i} className="border border-gray-200 rounded-lg p-5 group">
                    <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-gray-900">
                      {faq.q}
                      <span className="text-brand-orange ml-2 flex-shrink-0">+</span>
                    </summary>
                    <p className="mt-3 text-gray-700 text-sm leading-relaxed">{faq.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Main CTA box */}
          <div className="bg-brand-dark text-white rounded-xl p-8 my-12 text-center">
            <h3 className="text-2xl font-bold mb-3">Need a Demolition Estimate in Southern California?</h3>
            <p className="text-gray-300 mb-2">
              C&amp;S Demolition is a CA-licensed contractor (License #1126325) serving 123+ cities across Orange County, Los Angeles, Riverside, and San Bernardino Counties.
            </p>
            <p className="text-gray-400 text-sm mb-6">Free on-site estimates · Same-week availability · All-inclusive pricing</p>
            <a
              href="tel:+15622046335"
              className="inline-block bg-brand-orange text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-orange-600 transition-colors"
            >
              📞 (562) 204-6335 — Free Estimate
            </a>
          </div>

          {/* Author Bio — E-E-A-T signal */}
          <div className="border border-gray-200 rounded-xl p-6 mb-10 flex gap-4 items-start">
            <div className="flex-shrink-0 w-14 h-14 bg-brand-orange rounded-full flex items-center justify-center text-white font-bold text-xl">
              C&amp;S
            </div>
            <div>
              <p className="font-bold text-gray-900 mb-0.5">Written by the C&amp;S Demolition Team</p>
              <p className="text-xs text-brand-orange font-semibold mb-2 uppercase tracking-wide">CA Licensed Contractor · License #1126325</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                C&amp;S Demolition (DBA of Scrapit LLC) is a California-licensed demolition contractor based in Long Beach, serving Orange County, Los Angeles County, Riverside, and San Bernardino. Our content is written by field-experienced demolition professionals who handle permits, asbestos assessments, and complex teardown projects daily across Southern California.
              </p>
              <div className="flex gap-3 mt-3">
                <Link href="/services" className="text-xs text-brand-orange hover:underline">Our Services</Link>
                <Link href="/service-areas" className="text-xs text-brand-orange hover:underline">Service Areas</Link>
                <Link href="/contact" className="text-xs text-brand-orange hover:underline">Contact Us</Link>
              </div>
            </div>
          </div>

          {/* Related Services — internal linking hub */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-brand-dark mb-3">
              Demolition Services We Offer
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              C&amp;S Demolition handles every type of residential and commercial demolition across Southern California — licensed, insured, all-inclusive. Browse our services:
            </p>
            <div className="flex flex-wrap gap-2">
              {services.map((s) => (
                <Link
                  key={s.service_slug}
                  href={`/demolition/${s.service_slug}`}
                  className="text-sm border border-gray-200 hover:border-brand-orange hover:text-brand-orange px-3 py-1.5 rounded-full transition-colors"
                >
                  {s.service_name}
                </Link>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <Link href="/service-areas" className="text-brand-orange hover:underline font-medium">
                Browse 123+ service cities →
              </Link>
              <Link href="/contact" className="text-brand-orange hover:underline font-medium">
                Get a free estimate →
              </Link>
            </div>
          </section>

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
                    <p className="text-xs text-gray-500 mt-2">{related.excerpt.slice(0, 80)}…</p>
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

// ─── Data Fetching ────────────────────────────────────────────────────────────

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

  return { props: { post, relatedPosts, services: getServices() } };
};
