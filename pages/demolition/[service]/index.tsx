import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { getServices, getCities, getRelatedBlogPosts, Service, City, BlogPost } from '../../../lib/getData';

interface PageProps {
  service: Service;
  cities: City[];
  allServices: Service[];
  relatedPosts: BlogPost[];
}

// What's included + process vary by service type — grouped here for DRY template
function getServiceInclusions(service: Service): string[] {
  const base = [
    'Free on-site estimate with written quote',
    'All permit research, filing, and inspection coordination',
    'Full debris removal and haul-away to licensed facilities',
    'Broom-clean site at job completion',
    'CA Licensed contractor (License #1126325)',
    'General liability and workers\' comp insurance on every job',
  ];

  const extras: Record<string, string[]> = {
    'pool-demolition': [
      'Pool draining and disconnection of pool equipment',
      'Breaking and removal of pool shell (full removal) or partial fill-in',
      'Compacted backfill with engineered soil report',
      'Coordination with structural engineer if required by city',
    ],
    'whole-house-demolition': [
      'Utility disconnection coordination (gas, water, electric, sewer)',
      'Asbestos survey coordination (required for pre-1980 structures)',
      'Foundation removal or retention (your choice)',
      'Final grading and site leveling',
    ],
    'interior-demolition': [
      'Dust barriers and containment setup to protect adjacent spaces',
      'Asbestos/lead paint pre-screening on request',
      'Structural wall assessment before any bearing wall removal',
    ],
    'commercial-demolition': [
      'Certified asbestos and hazmat survey coordination',
      'Coordination with general contractor or project manager',
      'SCAQMD compliance documentation',
      'Night and weekend scheduling available',
    ],
  };

  return [...base, ...(extras[service.service_slug] || [])];
}

// Services with a matching in-depth cost guide on the blog — linked from the
// cost overview section with a descriptive, keyword-bearing anchor.
const COST_GUIDE_LINKS: Record<string, { href: string; anchor: string }> = {
  'concrete-removal': {
    href: '/blog/concrete-demolition-cost-guide',
    anchor: 'concrete demolition cost guide for Southern California',
  },
  'whole-house-demolition': {
    href: '/blog/whole-house-demolition-cost',
    anchor: 'whole-house demolition cost breakdown',
  },
};

function getServiceFAQs(service: Service, cityCount: number) {
  return [
    {
      q: `How much does ${service.service_name.toLowerCase()} cost in Southern California?`,
      a: `${service.service_name} in Southern California typically costs between $${Number(service.avg_cost_low).toLocaleString()} and $${Number(service.avg_cost_high).toLocaleString()} depending on project size, materials, site access, and permit requirements. C&S Demolition provides free on-site estimates with a written lump-sum quote the same day — no hourly billing surprises.`,
    },
    {
      q: `Do I need a permit for ${service.service_name.toLowerCase()} in California?`,
      a: `In most Southern California cities, ${service.service_name.toLowerCase()} requires a demolition permit from the city building department. Permit requirements vary by city and project type. C&S Demolition handles all permit research, application, and inspection coordination on your behalf — you never have to deal with the building department directly.`,
    },
    {
      q: `How long does ${service.service_name.toLowerCase()} take?`,
      a: `Most ${service.service_name.toLowerCase()} projects are completed in ${service.duration}. The timeline depends on project scope, permit processing time, and site access. We provide a firm start date and estimated completion window before any work begins.`,
    },
    {
      q: `Is asbestos a concern with ${service.service_name.toLowerCase()}?`,
      a: `California requires asbestos surveys before demolition of structures built before 1980. C&S Demolition coordinates certified asbestos testing and, when required, proper abatement before any ${service.service_name.toLowerCase()} work begins. We manage the entire process and ensure full compliance with SCAQMD regulations.`,
    },
    {
      q: `What cities do you serve for ${service.service_name.toLowerCase()}?`,
      a: `C&S Demolition provides ${service.service_name.toLowerCase()} services in ${cityCount}+ cities across Southern California, including all of Orange County, Los Angeles County, Riverside County, and San Bernardino County. Click any city below for pricing and availability specific to your area.`,
    },
  ];
}

export default function ServiceIndexPage({ service, cities, allServices, relatedPosts }: PageProps) {
  const title = `${service.service_name} in Southern California | C&S Demolition`;
  const description = `Licensed ${service.service_name.toLowerCase()} contractor serving ${cities.length}+ cities across Southern California. CA License #1126325. $${Number(service.avg_cost_low).toLocaleString()}–$${Number(service.avg_cost_high).toLocaleString()} typical. Free on-site estimates. Call (562) 204-6335.`;

  const laCities = cities.filter((c) => c.county === 'Los Angeles');
  const ocCities = cities.filter((c) => c.county === 'Orange');
  const rivCities = cities.filter((c) => c.county === 'Riverside');
  const sbCities = cities.filter((c) => c.county === 'San Bernardino');

  const countyGroups = [
    { name: 'Orange County', cities: ocCities },
    { name: 'Los Angeles County', cities: laCities },
    { name: 'Riverside County', cities: rivCities },
    { name: 'San Bernardino County', cities: sbCities },
  ].filter((g) => g.cities.length > 0);

  const inclusions = getServiceInclusions(service);
  const faqs = getServiceFAQs(service, cities.length);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'HomeAndConstructionBusiness', 'GeneralContractor'],
        '@id': `https://cnsdemo.com/demolition/${service.service_slug}#business`,
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
        areaServed: {
          '@type': 'AdministrativeArea',
          name: 'Southern California',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `${service.service_name} Services`,
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                serviceType: service.service_name,
                name: `${service.service_name} in Southern California`,
                description: service.description,
              },
              priceRange: `$${Number(service.avg_cost_low).toLocaleString()}–$${Number(service.avg_cost_high).toLocaleString()}`,
              priceCurrency: 'USD',
            },
          ],
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cnsdemo.com' },
          { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://cnsdemo.com/services' },
          { '@type': 'ListItem', position: 3, name: service.service_name, item: `https://cnsdemo.com/demolition/${service.service_slug}` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
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
        <link rel="canonical" href={`https://cnsdemo.com/demolition/${service.service_slug}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://cnsdemo.com/demolition/${service.service_slug}`} />
        <meta property="og:image" content={`https://cnsdemo.com/api/og?title=${encodeURIComponent(service.service_name + ' in Southern California')}&sub=${encodeURIComponent('CA Lic #1126325 · ' + cities.length + ' Cities · Free Estimates')}&type=service`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`https://cnsdemo.com/api/og?title=${encodeURIComponent(service.service_name + ' in Southern California')}&sub=${encodeURIComponent('CA Lic #1126325 · ' + cities.length + ' Cities · Free Estimates')}&type=service`} />
        <meta name="twitter:image:alt" content={`${service.service_name} in Southern California — C&S Demolition`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <Header />

      <main>
        {/* Hero */}
        <section className="bg-brand-dark text-white py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-1">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <Link href="/services" className="hover:text-white">Services</Link>
              <span>/</span>
              <span className="text-white">{service.service_name}</span>
            </nav>
            <h1 className="text-4xl font-bold mb-4">{service.service_name} in Southern California</h1>
            <p className="text-xl text-gray-300 mb-4">
              {service.description} C&amp;S Demolition is a CA-licensed contractor (License #1126325) serving {cities.length}+ cities across Southern California. Free on-site estimates — we come to you.
            </p>
            <div className="flex flex-wrap gap-3 text-sm mb-8">
              <span className="bg-brand-orange px-3 py-1 rounded-full">✓ CA Licensed #1126325</span>
              <span className="bg-gray-700 px-3 py-1 rounded-full">✓ Free Estimates</span>
              <span className="bg-gray-700 px-3 py-1 rounded-full">✓ Fully Insured</span>
              <span className="bg-gray-700 px-3 py-1 rounded-full">
                ✓ ${Number(service.avg_cost_low).toLocaleString()}–${Number(service.avg_cost_high).toLocaleString()} typical
              </span>
            </div>
            <a
              href="tel:+15622046335"
              className="inline-block bg-brand-orange text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-orange-600 transition-colors"
            >
              📞 (562) 204-6335 — Get a Free Estimate
            </a>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 py-12">

          {/* Service description + context */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-brand-dark mb-4">
              Professional {service.service_name} — What to Expect
            </h2>
            <p className="text-gray-700 mb-4">
              C&amp;S Demolition provides professional {service.service_name.toLowerCase()} services throughout Southern California. As a DBA of Scrapit LLC, we bring full licensing, bonding, and insurance to every project — residential or commercial — in Orange County, Los Angeles County, Riverside County, and San Bernardino County.
            </p>
            <p className="text-gray-700 mb-4">
              {service.description} Our crews are experienced with California building code requirements, local permit offices, and HOA restrictions across all 123+ cities in our service area. We price every job as a lump sum — no hourly billing, no surprise charges for disposal or permits.
            </p>
            <p className="text-gray-700">
              Every {service.service_name.toLowerCase()} project includes a pre-work walkthrough, permit handling (when required), the full demolition scope, debris haul-away to licensed facilities, and a broom-clean site. We coordinate directly with your general contractor, property manager, or renovation team to keep your project on schedule.
            </p>
          </section>

          {/* Cost overview */}
          <section className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-12">
            <h2 className="text-xl font-bold mb-4">{service.service_name} Cost in Southern California</h2>
            <div className="flex gap-8 mb-4">
              <div>
                <p className="text-sm text-gray-500">Typical Range</p>
                <p className="text-2xl font-bold text-brand-orange">
                  ${Number(service.avg_cost_low).toLocaleString()} – ${Number(service.avg_cost_high).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Typical Duration</p>
                <p className="text-2xl font-bold text-gray-700">{service.duration}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Pricing varies by project size, materials, permit requirements, and site access. Factors that increase cost include reinforced concrete, hazardous materials (asbestos, lead paint), limited equipment access, and multi-story structures. The most accurate way to price your project is a free on-site estimate — we come to your property and provide a written quote the same day.
            </p>
            {COST_GUIDE_LINKS[service.service_slug] && (
              <p className="text-sm text-gray-600 mt-3">
                For itemized pricing, cost factors, and real project examples, read our{' '}
                <Link
                  href={COST_GUIDE_LINKS[service.service_slug].href}
                  className="text-brand-orange font-semibold hover:underline"
                >
                  {COST_GUIDE_LINKS[service.service_slug].anchor}
                </Link>
                .
              </p>
            )}
          </section>

          {/* What's included */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-brand-dark mb-4">What&apos;s Included in Every Job</h2>
            <p className="text-gray-700 mb-4">
              Every C&amp;S Demolition project is all-inclusive. The following is always included in your quote — no add-ons, no surprises:
            </p>
            <ul className="space-y-2">
              {inclusions.map((item, i) => (
                <li key={i} className="flex gap-2 items-start text-gray-700">
                  <span className="text-brand-orange font-bold mt-0.5 flex-shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Cities by county */}
          {countyGroups.map((group) => (
            <section key={group.name} className="mb-12">
              <h2 className="text-2xl font-bold text-brand-dark mb-2">
                {service.service_name} — {group.name}
              </h2>
              <p className="text-gray-600 mb-6">
                Click any city to see local pricing, permit requirements, and availability for {service.service_name.toLowerCase()} in that area.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {group.cities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/demolition/${service.service_slug}/${city.slug}`}
                    className="border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium hover:border-brand-orange hover:text-brand-orange transition-colors"
                  >
                    {city.city}
                  </Link>
                ))}
              </div>
            </section>
          ))}

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-brand-dark mb-6">
              Frequently Asked Questions — {service.service_name}
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details key={i} className="border border-gray-200 rounded-lg p-5">
                  <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                    {faq.q}
                    <span className="text-brand-orange ml-2">+</span>
                  </summary>
                  <p className="mt-3 text-gray-700 text-sm leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Related blog posts */}
          {relatedPosts.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-dark mb-2">Related Guides &amp; Articles</h2>
              <p className="text-gray-600 mb-6">
                Expert cost breakdowns, permit guides, and how-to articles about {service.service_name.toLowerCase()} from C&amp;S Demolition:
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

          {/* Other services */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-brand-dark mb-4">More Demolition Services</h2>
            <p className="text-gray-600 mb-4">C&amp;S Demolition handles all types of demolition throughout Southern California:</p>
            <div className="flex flex-wrap gap-2">
              {allServices
                .filter((s) => s.service_slug !== service.service_slug)
                .map((s) => (
                  <Link
                    key={s.service_slug}
                    href={`/demolition/${s.service_slug}`}
                    className="text-sm border border-gray-200 hover:border-brand-orange hover:text-brand-orange px-3 py-1.5 rounded-full transition-colors"
                  >
                    {s.service_name}
                  </Link>
                ))}
            </div>
          </section>

          <section className="bg-brand-orange text-white rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Get a Free {service.service_name} Estimate</h2>
            <p className="text-orange-100 mb-2">
              We come to your property, assess the project in person, and give you a written lump-sum quote the same day.
            </p>
            <p className="text-orange-200 text-sm mb-6">
              CA Licensed #1126325 · Fully Insured · {cities.length}+ SoCal Cities
            </p>
            <a
              href="tel:+15622046335"
              className="inline-block bg-white text-brand-orange font-bold px-8 py-4 rounded-lg text-lg hover:bg-gray-100 transition-colors"
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
  const services = getServices();
  return {
    paths: services.map((s) => ({ params: { service: s.service_slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const services = getServices();
  const service = services.find((s) => s.service_slug === params?.service);
  if (!service) return { notFound: true };
  const cities = getCities();
  // Extract keywords for related post matching: service name words + slug words
  const serviceWords = service.service_name.toLowerCase().split(/\s+/);
  const relatedPosts = getRelatedBlogPosts(serviceWords, 3);
  return { props: { service, cities, allServices: services, relatedPosts } };
};
