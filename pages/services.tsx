import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getServices, Service } from '../lib/getData';

interface PageProps {
  services: Service[];
}

export default function ServicesPage({ services }: PageProps) {
  return (
    <>
      <Head>
        <title>Demolition Services in Southern California | C&amp;S Demolition</title>
        <meta
          name="description"
          content="Full-service demolition contractor in Southern California. Interior demo, pool removal, concrete breaking, garage teardown, and more. CA Licensed #1126325. Free estimates."
        />
        <link rel="canonical" href="https://cnsdemo.com/services" />
        <meta property="og:title" content="Demolition Services in Southern California | C&S Demolition" />
        <meta property="og:description" content="Licensed demolition contractor serving Orange County, LA, Riverside & San Bernardino. Interior demo, pool removal, concrete, and 18 more services. Free estimates." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cnsdemo.com/services" />
        <meta property="og:image" content="https://cnsdemo.com/api/og?title=Demolition+Services+in+Southern+California&sub=19+Services+%C2%B7+CA+Lic+%231126325+%C2%B7+Free+Estimates&type=services" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://cnsdemo.com/api/og?title=Demolition+Services+in+Southern+California&sub=19+Services+%C2%B7+CA+Lic+%231126325+%C2%B7+Free+Estimates&type=services" />
        <meta name="twitter:image:alt" content="Demolition Services in Southern California — C&S Demolition" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': ['LocalBusiness', 'HomeAndConstructionBusiness', 'GeneralContractor'],
                  '@id': 'https://cnsdemo.com/services#business',
                  name: 'C&S Demolition',
                  legalName: 'Scrapit LLC',
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
                  areaServed: { '@type': 'AdministrativeArea', name: 'Southern California' },
                  hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Demolition Services',
                    itemListElement: services.map((s) => ({
                      '@type': 'Offer',
                      itemOffered: {
                        '@type': 'Service',
                        name: s.service_name,
                        description: s.description,
                      },
                      priceRange: `$${Number(s.avg_cost_low).toLocaleString()}–$${Number(s.avg_cost_high).toLocaleString()}`,
                      priceCurrency: 'USD',
                    })),
                  },
                },
                {
                  '@type': 'BreadcrumbList',
                  itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cnsdemo.com' },
                    { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://cnsdemo.com/services' },
                  ],
                },
              ],
            })
          }}
        />
      </Head>
      <Header />
      <main>
        <section className="bg-brand-dark text-white py-16 px-4">
          <div className="max-w-5xl mx-auto text-center">
          <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-1 justify-center">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white">Services</span>
          </nav>
          <h1 className="text-4xl font-bold mb-4">Demolition Services in Southern California</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
            C&amp;S Demolition is a CA-licensed contractor handling all types of demolition across Orange County, Los Angeles, Riverside, and San Bernardino Counties.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm mb-8">
            <span className="bg-brand-orange px-3 py-1 rounded-full">✓ CA Licensed #1126325</span>
            <span className="bg-gray-700 px-3 py-1 rounded-full">✓ Fully Insured</span>
            <span className="bg-gray-700 px-3 py-1 rounded-full">✓ Permit Handling</span>
            <span className="bg-gray-700 px-3 py-1 rounded-full">✓ Free On-Site Estimates</span>
          </div>
          <a
            href="tel:+15622046335"
            className="inline-block bg-brand-orange text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-orange-600 transition-colors"
          >
            📞 (562) 204-6335 — Get a Free Estimate
          </a>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 py-14">
          <p className="text-center text-gray-600 mb-10 text-lg">
            We offer {services.length} demolition services throughout Southern California. Click any service to see cities served and pricing.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.service_slug}
                href={`/demolition/${service.service_slug}`}
                className="border border-gray-200 rounded-xl p-6 hover:border-brand-orange hover:shadow-md transition-all flex flex-col"
              >
                <h2 className="font-bold text-gray-900 text-lg mb-2">{service.service_name}</h2>
                <p className="text-sm text-gray-600 mb-4 flex-1">{service.description}</p>
                <div className="mt-auto">
                  <p className="text-sm font-semibold text-brand-orange mb-1">
                    ${Number(service.avg_cost_low).toLocaleString()} – ${Number(service.avg_cost_high).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400">{service.duration} · Free estimate</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Cost comparison table */}
        <section className="max-w-5xl mx-auto px-4 pb-14">
          <h2 className="text-2xl font-bold text-brand-dark mb-3">Demolition Cost Guide — Southern California</h2>
          <p className="text-gray-600 mb-6">
            All prices are typical ranges for projects in Southern California. Final cost depends on project size, site access, permit requirements, and hazmat conditions. Get a free on-site estimate for an exact quote.
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-brand-dark text-white">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Service</th>
                  <th className="text-left px-4 py-3 font-semibold">Typical Cost</th>
                  <th className="text-left px-4 py-3 font-semibold">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {services.map((s, i) => (
                  <tr key={s.service_slug} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 font-medium">
                      <Link href={`/demolition/${s.service_slug}`} className="text-brand-orange hover:underline">
                        {s.service_name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      ${Number(s.avg_cost_low).toLocaleString()} – ${Number(s.avg_cost_high).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{s.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            * Prices are estimates for Orange County and Los Angeles County. Actual pricing provided in free on-site estimate. Permit fees included.
          </p>
        </section>

        {/* E-E-A-T content section */}
        <section className="max-w-5xl mx-auto px-4 pb-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-brand-dark mb-4">
                Why C&amp;S Demolition for All Your Teardown Needs
              </h2>
              <p className="text-gray-700 mb-4">
                C&amp;S Demolition is a DBA of Scrapit LLC, a California-licensed demolition contractor (License #1126325) serving 123+ cities across Southern California. We specialize exclusively in demolition — not general contracting — which means our crews are experienced, our equipment is right for the job, and our pricing is sharp.
              </p>
              <p className="text-gray-700 mb-4">
                Every project is all-inclusive: free on-site estimate, permit handling, demolition, debris haul-away, and a broom-clean site. We work with homeowners, remodelers, general contractors, property managers, and developers across Orange, Los Angeles, Riverside, and San Bernardino Counties.
              </p>
              <p className="text-gray-700">
                We carry general liability insurance and workers&apos; compensation coverage on every job. Certificates of Insurance are available upon request before work begins.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-brand-dark mb-4">
                What&apos;s Always Included
              </h2>
              <ul className="space-y-2 text-gray-700">
                {[
                  'Free on-site estimate — written quote same day',
                  'Permit research, filing, and inspection coordination',
                  'Full debris removal to licensed disposal facilities',
                  'Responsible recycling (concrete, metal, clean wood)',
                  'Broom-clean site at job completion',
                  'CA License #1126325 — licensed, bonded, insured',
                  'General liability + workers\' comp on every job',
                  'Coordination with your GC or renovation team',
                  'Asbestos survey coordination (pre-1980 structures)',
                  'No hourly billing — lump-sum pricing only',
                ].map((item, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span className="text-brand-orange font-bold flex-shrink-0 mt-0.5">✓</span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 border-t border-gray-200 py-14 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-brand-dark mb-4">Not Sure What You Need?</h2>
            <p className="text-gray-600 mb-8">
              Call us and describe your project — we'll tell you exactly what type of demolition is required, what permits are needed, and what it will cost. No pressure, no obligation.
            </p>
            <a
              href="tel:+15622046335"
              className="inline-block bg-brand-orange text-white font-bold px-10 py-4 rounded-lg text-xl hover:bg-orange-600 transition-colors"
            >
              📞 (562) 204-6335
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const services = getServices();
  return { props: { services } };
};
