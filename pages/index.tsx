import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getCounties, getCities, getServices, getBlogPosts, getBlogCategories, Service, BlogPost } from '../lib/getData';

interface HomeProps {
  counties: string[];
  totalCities: number;
  services: Service[];
  latestPosts: BlogPost[];
  categories: string[];
}

function categoryToSlug(cat: string): string {
  return cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function Home({ counties, totalCities, services, latestPosts, categories }: HomeProps) {
  const faqs = [
    {
      q: 'How much does demolition cost in Southern California?',
      a: 'Demolition costs in Southern California range from $400 for a simple shed or fence removal to $35,000+ for whole-house demolition. Interior demolition runs $1,500–$8,000 depending on scope. Pool removal costs $3,500–$15,000. Concrete removal is $3–$8 per square foot. The biggest cost factors are square footage, hazardous materials (asbestos, lead paint), permit requirements, and debris disposal. C&S Demolition provides free on-site estimates with a written quote the same day.',
    },
    {
      q: 'Is C&S Demolition licensed and insured in California?',
      a: 'Yes. C&S Demolition is a DBA of Scrapit LLC, a fully licensed California contractor (License #1126325). We carry general liability insurance and workers\' compensation coverage on every project. You can verify our license at CSLB.ca.gov. We provide Certificates of Insurance upon request before any project begins.',
    },
    {
      q: 'Do you pull demolition permits?',
      a: 'Yes — we handle the complete permit process on your behalf. This includes researching requirements, filing applications, scheduling inspections, and obtaining final sign-offs. We are familiar with the building departments in all 123+ cities we serve across Orange, Los Angeles, Riverside, and San Bernardino Counties. Permit fees are included in your project estimate.',
    },
    {
      q: 'What areas does C&S Demolition serve?',
      a: `We serve ${totalCities}+ cities across four Southern California counties: Orange County (Anaheim, Irvine, Huntington Beach, and 32+ more), Los Angeles County (Long Beach, Torrance, Pasadena, and 48+ more), Riverside County (Riverside, Corona, Temecula, and 17+ more), and San Bernardino County (Ontario, Rancho Cucamonga, Fontana, and 14+ more). If you\'re not sure whether we cover your city, just call — we very likely do.`,
    },
    {
      q: 'Do you check for asbestos before demolition?',
      a: 'Yes. California law requires asbestos surveys before demolition of structures built before 1980. C&S Demolition coordinates certified asbestos testing and, when required, proper abatement before any teardown work begins. We work with licensed abatement contractors and handle all coordination so you don\'t have to manage multiple vendors.',
    },
    {
      q: 'Is debris removal included in your price?',
      a: 'Yes — full debris removal and broom-clean site cleanup is always included. We haul everything to licensed disposal and recycling facilities in Southern California. Concrete is crushed and recycled; metal is sent to scrap; clean wood goes to recycling centers. No surprise disposal charges at the end of the job — it\'s all in your quote.',
    },
    {
      q: 'How quickly can C&S Demolition start a project?',
      a: 'For projects that don\'t require permits (many shed, fence, and flooring removal jobs), we can often schedule within a few days of your estimate. Permitted projects depend on city processing times — we advise you on realistic timelines upfront. Most permitted projects in Orange County and LA County start within 1–3 weeks of estimate approval.',
    },
    {
      q: 'What is the difference between selective demolition and full demolition?',
      a: 'Selective demolition means removing specific elements (a wall, a floor, cabinets, a chimney) while preserving the surrounding structure. Full demolition means tearing down the entire structure. C&S Demolition specializes in both. Selective demo is common in remodeling projects where precision matters — we use hand tools alongside equipment to avoid damaging adjacent finishes.',
    },
  ];

  return (
    <>
      <Head>
        <title>Demolition Contractor in Southern California | C&amp;S Demolition</title>
        <meta
          name="description"
          content={`Licensed demolition contractor serving ${totalCities}+ cities in Southern California. Interior demo, pool removal, concrete breaking, garage teardown, and more. Free estimates. Call (562) 204-6335.`}
        />
        <link rel="canonical" href="https://cnsdemo.com" />
        <meta property="og:title" content="Demolition Contractor in Southern California | C&S Demolition" />
        <meta property="og:description" content={`Licensed CA demolition contractor serving ${totalCities}+ SoCal cities. Interior demo, pool removal, concrete, and more. Free estimates. (562) 204-6335.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cnsdemo.com" />
        <meta property="og:image" content="https://cnsdemo.com/api/og?title=Demolition+Contractor+in+Southern+California&sub=CA+License+%231126325+%C2%B7+123%2B+SoCal+Cities&type=home" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://cnsdemo.com/api/og?title=Demolition+Contractor+in+Southern+California&sub=CA+License+%231126325+%C2%B7+123%2B+SoCal+Cities&type=home" />
        <meta name="twitter:image:alt" content="Demolition Contractor in Southern California — C&S Demolition, CA Lic #1126325" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["LocalBusiness", "HomeAndConstructionBusiness", "GeneralContractor"],
              "@id": "https://cnsdemo.com/#business",
              "name": "C&S Demolition",
              "alternateName": "Scrapit LLC",
              "legalName": "Scrapit LLC",
              "description": `C&S Demolition (License #1126325) is a California-licensed demolition contractor serving ${totalCities}+ cities across Southern California. We specialize in residential and commercial demolition, pool removal, interior demo, concrete breaking, and all types of teardown work throughout Orange County, Los Angeles County, Riverside County, and San Bernardino County.`,
              "url": "https://cnsdemo.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://cnsdemo.com/logo.svg",
                "width": 300,
                "height": 60
              },
              "image": "https://cnsdemo.com/api/og?title=Demolition+Contractor+in+Southern+California&sub=CA+License+%231126325+%C2%B7+123%2B+SoCal+Cities&type=home",
              "telephone": "+15622046335",
              "email": "contactus@cnsdemo.com",
              "license": "1126325",
              "slogan": "Licensed. Insured. All-Inclusive.",
              "priceRange": "$$",
              "paymentAccepted": "Cash, Check, Credit Card, Zelle",
              "currenciesAccepted": "USD",
              "areaServed": [
                { "@type": "AdministrativeArea", "name": "Orange County, CA" },
                { "@type": "AdministrativeArea", "name": "Los Angeles County, CA" },
                { "@type": "AdministrativeArea", "name": "Riverside County, CA" },
                { "@type": "AdministrativeArea", "name": "San Bernardino County, CA" }
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Long Beach",
                "addressRegion": "CA",
                "postalCode": "90802",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 33.7701,
                "longitude": -118.1937
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
                  "opens": "07:00",
                  "closes": "18:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Saturday",
                  "opens": "08:00",
                  "closes": "16:00"
                }
              ],
              "sameAs": [
                "https://www.yelp.com/biz/cns-demolition",
                "https://www.facebook.com/cnsdemo",
                "https://www.bbb.org/us/ca/long-beach/profile/demolition-contractors",
                "https://www.linkedin.com/company/cns-demolition"
              ],
              "knowsAbout": [
                "Demolition Contracting", "Interior Demolition", "Pool Demolition",
                "Concrete Removal", "Selective Demolition", "Commercial Demolition",
                "California Building Permits", "Asbestos Abatement Coordination"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Demolition Services",
                "itemListElement": services.map((s) => ({
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": s.service_name,
                    "description": s.description,
                    "provider": { "@type": "LocalBusiness", "name": "C&S Demolition" }
                  },
                  "priceRange": `$${Number(s.avg_cost_low).toLocaleString()}–$${Number(s.avg_cost_high).toLocaleString()}`,
                  "priceCurrency": "USD"
                }))
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqs.map((faq) => ({
                "@type": "Question",
                "name": faq.q,
                "acceptedAnswer": { "@type": "Answer", "text": faq.a }
              }))
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://cnsdemo.com/#website",
              "name": "C&S Demolition",
              "url": "https://cnsdemo.com",
              "description": "California-licensed demolition contractor serving 123+ cities across Southern California. Interior demo, pool removal, concrete removal, garage teardown, and more.",
              "inLanguage": "en-US",
              "publisher": { "@id": "https://cnsdemo.com/#business" }
            })
          }}
        />
      </Head>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-brand-dark text-white py-20 px-4 text-center">
          <p className="text-brand-orange text-sm font-bold uppercase tracking-widest mb-4">
            CA License #1126325 — Serving {totalCities}+ SoCal Cities
          </p>
          <h1 className="text-5xl font-bold mb-4">
            Demolition Contractor in Southern California
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            C&amp;S Demolition is a licensed, fully insured demolition company serving Orange County, Los Angeles County, Riverside, and San Bernardino. Interior demo, pool removal, concrete breaking, and more — free on-site estimates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+15622046335" className="bg-brand-orange text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-orange-600 transition-colors">
              📞 (562) 204-6335 — Free Estimate
            </a>
            <Link href="/service-areas" className="border-2 border-white text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-gray-800 transition-colors">
              View Service Areas
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-8 text-sm">
            <span className="bg-gray-800 px-4 py-2 rounded-full">✓ CA Licensed #1126325</span>
            <span className="bg-gray-800 px-4 py-2 rounded-full">✓ Fully Insured</span>
            <span className="bg-gray-800 px-4 py-2 rounded-full">✓ Permit Handling</span>
            <span className="bg-gray-800 px-4 py-2 rounded-full">✓ Debris Removal Included</span>
          </div>
        </section>

        {/* Services */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-brand-dark text-center mb-4">Our Demolition Services</h2>
          <p className="text-center text-gray-600 mb-10">
            From single-room teardowns to full structural demolition — licensed, insured, and all-inclusive.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link
                key={s.service_slug}
                href={`/demolition/${s.service_slug}`}
                className="border border-gray-200 rounded-xl p-6 hover:border-brand-orange hover:shadow-md transition-all"
              >
                <h3 className="font-bold text-lg mb-2">{s.service_name}</h3>
                <p className="text-sm text-gray-600 mb-3">{s.description.slice(0, 100)}...</p>
                <p className="text-sm font-semibold text-brand-orange">
                  From ${Number(s.avg_cost_low).toLocaleString()} — {s.duration} →
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Why Choose */}
        <section className="bg-gray-50 py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-brand-dark text-center mb-10">Why Choose C&amp;S Demolition</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                ['CA Licensed Contractor', 'License #1126325. We\'re not a handyman with a sledgehammer — we\'re a fully licensed California demolition contractor backed by the resources of Scrapit LLC.'],
                ['All-Inclusive Pricing', 'Demo, haul-away, and site cleanup are all in your quote. No hidden fees, no surprise disposal charges at the end of the job.'],
                ['Permit Handling', 'We research, file, and coordinate all permits on your behalf. We know the building departments across all 5 SoCal counties.'],
                ['Upfront Lump-Sum Pricing', 'No hourly billing and no surprise add-ons — the written quote is the price. Demo, permits, haul-away, and cleanup all included.'],
                ['Same-Week Availability', 'We keep our schedule moving. Most projects can start within the same week as your estimate.'],
                ['Full Debris Removal', 'Everything gets hauled away and disposed of responsibly. Concrete gets crushed and recycled. Your site is left broom-clean.'],
              ].map(([title, text]) => (
                <div key={title} className="bg-white border border-gray-200 rounded-xl p-6">
                  <p className="font-bold text-brand-orange text-lg mb-2">✓ {title}</p>
                  <p className="text-sm text-gray-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-brand-dark text-center mb-4">Demolition Services Across Southern California</h2>
          <p className="text-center text-gray-600 mb-10">
            We serve {totalCities}+ cities across {counties.length} counties. Click any county to see cities and services.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
            {counties.map((county) => (
              <Link
                key={county}
                href={`/county/${county.toLowerCase().replace(/ /g, '-')}`}
                className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:border-brand-orange transition-colors"
              >
                <p className="font-semibold text-sm">{county}</p>
                <p className="text-xs text-gray-500">County</p>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/service-areas" className="text-brand-orange font-semibold hover:underline">
              View all {totalCities}+ service area cities →
            </Link>
          </div>
        </section>

        {/* SEO Content + Internal Links */}
        <section className="bg-gray-50 py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-brand-dark mb-6">Licensed Demolition Contractor Serving All of Southern California</h2>
            <p className="text-gray-700 mb-4">
              C&amp;S Demolition (a DBA of Scrapit LLC) is a California-licensed demolition contractor serving homeowners, remodelers, property managers, and general contractors throughout Southern California. Whether you need a single wall removed or a complete property cleared, our crews deliver clean, efficient work on time and on budget.
            </p>
            <p className="text-gray-700 mb-4">
              We specialize in <Link href="/demolition/interior-demolition" className="text-brand-orange hover:underline">interior demolition</Link>, <Link href="/demolition/pool-demolition" className="text-brand-orange hover:underline">pool demolition and removal</Link>, <Link href="/demolition/concrete-removal" className="text-brand-orange hover:underline">concrete breaking and removal</Link>, <Link href="/demolition/kitchen-demolition" className="text-brand-orange hover:underline">kitchen demolition</Link>, <Link href="/demolition/bathroom-demolition" className="text-brand-orange hover:underline">bathroom teardowns</Link>, and <Link href="/demolition/garage-demolition" className="text-brand-orange hover:underline">garage demolition</Link> throughout Orange County and Los Angeles County.
            </p>
            <p className="text-gray-700 mb-6">
              Every project includes full debris removal, responsible disposal, and a broom-clean site. We handle permits, coordinate inspections, and work around your renovation timeline. Call for a free on-site estimate — we come to you.
            </p>
            <div className="flex flex-wrap gap-2">
              {services.map((s) => (
                <Link
                  key={s.service_slug}
                  href={`/demolition/${s.service_slug}`}
                  className="text-sm border border-gray-300 hover:border-brand-orange hover:text-brand-orange px-3 py-1.5 rounded-full transition-colors"
                >
                  {s.service_name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Blog preview */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-brand-dark text-center mb-3">Demolition Resource Center</h2>
          <p className="text-center text-gray-600 mb-6">
            Cost guides, permit tips, and how-to articles from C&amp;S Demolition's licensed professionals.
          </p>
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            <Link href="/blog" className="text-sm bg-brand-dark text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors font-semibold">
              All Articles
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/blog/category/${categoryToSlug(cat)}`}
                className="text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-full hover:bg-brand-orange hover:text-white transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:border-brand-orange hover:shadow-md transition-all flex flex-col"
              >
                <span className="text-xs font-semibold text-brand-orange uppercase tracking-wide mb-2">
                  {post.category}
                </span>
                <h3 className="font-bold text-gray-900 text-base mb-2 leading-snug flex-1">
                  {post.title.replace(' | C&S Demolition', '')}
                </h3>
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
                <span className="text-sm text-brand-orange font-semibold mt-auto">Read more →</span>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/blog" className="text-brand-orange font-semibold hover:underline">
              View all demolition articles and guides →
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-brand-dark text-center mb-10">
            Frequently Asked Questions — Demolition in Southern California
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="border border-gray-200 rounded-lg p-5 bg-white">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                  {faq.q}
                  <span className="text-brand-orange ml-2 text-lg">+</span>
                </summary>
                <p className="mt-3 text-gray-700 text-sm leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand-orange text-white py-16 px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Get Your Free Demolition Estimate Today</h2>
          <p className="text-orange-100 max-w-xl mx-auto mb-8">
            We come to your property, assess the project in person, and give you a written quote the same day — no obligation.
          </p>
          <a href="tel:+15622046335" className="inline-block bg-white text-brand-orange font-bold px-10 py-4 rounded-lg text-xl hover:bg-gray-100 transition-colors">
            📞 (562) 204-6335
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}

// High-value cost guides pinned in the homepage Resource Center grid,
// ahead of the latest posts.
const FEATURED_GUIDE_SLUGS = ['whole-house-demolition-cost', 'concrete-demolition-cost-guide'];

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const allPosts = getBlogPosts();
  const featuredGuides = FEATURED_GUIDE_SLUGS
    .map((slug) => allPosts.find((p) => p.slug === slug))
    .filter((p): p is BlogPost => Boolean(p));
  const latestPosts = [
    ...featuredGuides,
    ...allPosts
      .filter((p) => !FEATURED_GUIDE_SLUGS.includes(p.slug))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
  ].slice(0, 3);

  return {
    props: {
      counties: getCounties(),
      totalCities: getCities().length,
      services: getServices(),
      latestPosts,
      categories: getBlogCategories(),
    },
  };
};
