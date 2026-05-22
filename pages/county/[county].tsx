import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getCounties, getCitiesByCounty, getServices, getRelatedBlogPosts, City, Service, BlogPost } from '../../lib/getData';

interface PageProps {
  county: string;
  countySlug: string;
  cities: City[];
  services: Service[];
  relatedPosts: BlogPost[];
}

export default function CountyPage({ county, countySlug, cities, services, relatedPosts }: PageProps) {
  const title = `Demolition Contractor in ${county} County, CA | C&S Demolition`;
  const description = `Licensed demolition contractor serving all ${cities.length} cities in ${county} County, CA. Interior demo, pool removal, concrete removal, and more. CA License #1126325. Free on-site estimates. Call (562) 204-6335.`;

  const topCities = cities.slice(0, 6).map((c) => c.city).join(', ');

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'HomeAndConstructionBusiness', 'GeneralContractor'],
        '@id': `https://cnsdemo.com/county/${countySlug}#business`,
        name: 'C&S Demolition',
        legalName: 'Scrapit LLC',
        description,
        url: 'https://cnsdemo.com',
        telephone: '+15622046335',
        email: 'contactus@cnsdemo.com',
        license: '1126325',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Long Beach',
          addressRegion: 'CA',
          postalCode: '90802',
          addressCountry: 'US',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '87',
          bestRating: '5',
        },
        areaServed: {
          '@type': 'AdministrativeArea',
          name: `${county} County, CA`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cnsdemo.com' },
          { '@type': 'ListItem', position: 2, name: 'Service Areas', item: 'https://cnsdemo.com/service-areas' },
          { '@type': 'ListItem', position: 3, name: `${county} County`, item: `https://cnsdemo.com/county/${countySlug}` },
        ],
      },
      {
        '@type': 'ItemList',
        name: `Cities in ${county} County Served by C&S Demolition`,
        numberOfItems: cities.length,
        itemListElement: cities.map((city, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: city.city,
          url: `https://cnsdemo.com/demolition/interior-demolition/${city.slug}`,
        })),
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://cnsdemo.com/county/${countySlug}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://cnsdemo.com/county/${countySlug}`} />
        <meta property="og:image" content={`https://cnsdemo.com/api/og?title=${encodeURIComponent('Demolition Contractor in ' + county + ' County, CA')}&sub=${encodeURIComponent(cities.length + ' Cities · CA Lic #1126325 · Free Estimates')}&type=county`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <Header />

      <main>
        <section className="bg-brand-dark text-white py-16 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-1">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <Link href="/service-areas" className="hover:text-white">Service Areas</Link>
              <span>/</span>
              <span className="text-white">{county} County</span>
            </nav>
            <h1 className="text-4xl font-bold mb-4">
              Demolition Contractor in {county} County, CA
            </h1>
            <p className="text-xl text-gray-300 mb-4">
              C&amp;S Demolition serves all {cities.length} cities in {county} County with licensed, fully insured demolition services. Residential and commercial — interior demo, pool removal, concrete, and more.
            </p>
            <p className="text-gray-400 mb-6">
              Serving {topCities}{cities.length > 6 ? `, and ${cities.length - 6} more cities` : ''} throughout {county} County.
            </p>
            <div className="flex flex-wrap gap-3 text-sm mb-8">
              <span className="bg-brand-orange px-3 py-1 rounded-full">✓ CA Licensed #1126325</span>
              <span className="bg-gray-700 px-3 py-1 rounded-full">✓ Free On-Site Estimates</span>
              <span className="bg-gray-700 px-3 py-1 rounded-full">✓ All-Inclusive Pricing</span>
            </div>
            <a
              href="tel:+15622046335"
              className="inline-block bg-brand-orange text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-orange-600 transition-colors"
            >
              📞 (562) 204-6335 — Free Estimate
            </a>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 py-12">

          {/* About section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-brand-dark mb-4">
              Demolition Services Across {county} County
            </h2>
            <p className="text-gray-700 mb-4">
              C&amp;S Demolition (a DBA of Scrapit LLC) provides licensed demolition contracting services throughout all of {county} County, California. We are a fully licensed (CA License #1126325), bonded, and insured demolition company specializing in residential and commercial teardown work of every scale.
            </p>
            <p className="text-gray-700 mb-4">
              Our {county} County crews are experienced with local building departments, permit requirements, and HOA regulations across all {cities.length} cities in the county. We handle the full scope: free on-site estimate, permit filing, demolition, debris haul-away, and a broom-clean site at job completion.
            </p>
            <p className="text-gray-700">
              Every project is priced as a lump sum — no hourly billing, no surprise disposal fees. We coordinate asbestos surveys (required for pre-1980 structures), utility disconnections, and final inspections as part of every job.
            </p>
          </section>

          {/* Services Grid */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Our Demolition Services in {county} County</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((s) => (
                <Link
                  key={s.service_slug}
                  href={`/demolition/${s.service_slug}`}
                  className="border border-gray-200 rounded-lg p-5 hover:border-brand-orange transition-colors"
                >
                  <h3 className="font-bold text-lg mb-1">{s.service_name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{s.description}</p>
                  <p className="text-sm text-brand-orange font-medium">
                    From ${Number(s.avg_cost_low).toLocaleString()} · {s.duration} →
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* Cities Grid */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">All Cities We Serve in {county} County</h2>
            <p className="text-gray-600 mb-6">
              We provide demolition services in all {cities.length} cities throughout {county} County. Click any city to see service-specific pages, local pricing, and permit office information.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {cities.map((city) => (
                <div key={city.slug} className="border border-gray-200 rounded-lg p-3">
                  <p className="font-semibold text-sm mb-2">{city.city}</p>
                  <div className="flex flex-col gap-1">
                    {services.slice(0, 3).map((s) => (
                      <Link
                        key={s.service_slug}
                        href={`/demolition/${s.service_slug}/${city.slug}`}
                        className="text-xs text-brand-orange hover:underline"
                      >
                        {s.service_short}
                      </Link>
                    ))}
                    <Link
                      href={`/demolition/whole-house-demolition/${city.slug}`}
                      className="text-xs text-gray-400 hover:text-brand-orange"
                    >
                      + more →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Related blog posts */}
          {relatedPosts.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-dark mb-2">Demolition Guides for {county} County</h2>
              <p className="text-gray-600 mb-6">
                Helpful cost guides, permit tips, and how-to articles relevant to demolition projects in {county} County:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="bg-white border border-gray-200 rounded-xl p-5 hover:border-brand-orange hover:shadow-md transition-all flex flex-col"
                  >
                    <span className="text-xs font-semibold text-brand-orange uppercase tracking-wide mb-2">
                      {post.category}
                    </span>
                    <h3 className="font-bold text-gray-900 text-base mb-2 leading-snug flex-1">
                      {post.title.replace(' | C&S Demolition', '')}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2 mb-3">{post.excerpt}</p>
                    <span className="text-sm text-brand-orange font-semibold mt-auto">Read more →</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* CTA */}
          <section className="bg-brand-orange text-white rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">
              Get a Free Demolition Estimate in {county} County
            </h2>
            <p className="text-orange-100 mb-2">
              We come to your property anywhere in {county} County, assess the project in person, and give you a written lump-sum quote the same day.
            </p>
            <p className="text-orange-200 text-sm mb-6">
              CA Licensed #1126325 · Fully Insured · {cities.length} cities in {county} County
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
  const counties = getCounties();
  const paths = counties.map((county) => ({
    params: { county: county.toLowerCase().replace(/ /g, '-') },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const countySlug = params?.county as string;
  const counties = getCounties();
  const county = counties.find(
    (c) => c.toLowerCase().replace(/ /g, '-') === countySlug
  );
  if (!county) return { notFound: true };

  const cities = getCitiesByCounty(county);
  const services = getServices();
  // Related posts: county name + 'demolition' keywords
  const countyWords = county.toLowerCase().split(/\s+/);
  const relatedPosts = getRelatedBlogPosts([...countyWords, 'cost', 'permit'], 3);
  return { props: { county, countySlug, cities, services, relatedPosts } };
};
