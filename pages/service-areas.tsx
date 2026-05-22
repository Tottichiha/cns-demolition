import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getCounties, getCitiesByCounty, getCities, getServices, City, Service } from '../lib/getData';

interface CountyData {
  county: string;
  slug: string;
  cities: City[];
}

interface PageProps {
  countyData: CountyData[];
  totalCities: number;
  services: Service[];
}

export default function ServiceAreasPage({ countyData, totalCities, services }: PageProps) {
  const title = `Demolition Service Areas in Southern California | C&S Demolition`;
  const description = `C&S Demolition serves ${totalCities} cities throughout Southern California — Orange County, Los Angeles County, Riverside County, and San Bernardino County. CA Licensed #1126325.`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="https://cnsdemo.com/service-areas" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cnsdemo.com/service-areas" />
        <meta property="og:image" content={`https://cnsdemo.com/api/og?title=Demolition+Service+Areas+in+Southern+California&sub=${encodeURIComponent(totalCities + ' Cities · 4 Counties · CA Lic #1126325')}&type=areas`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`https://cnsdemo.com/api/og?title=Demolition+Service+Areas+in+Southern+California&sub=${encodeURIComponent(totalCities + ' Cities · 4 Counties · CA Lic #1126325')}&type=areas`} />
        <meta name="twitter:image:alt" content="Demolition Service Areas in Southern California — C&S Demolition" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': ['LocalBusiness', 'HomeAndConstructionBusiness', 'GeneralContractor'],
                  name: 'C&S Demolition',
                  legalName: 'Scrapit LLC',
                  url: 'https://cnsdemo.com',
                  telephone: '+15622046335',
                  license: '1126325',
                  aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: '4.9',
                    reviewCount: '87',
                    bestRating: '5',
                  },
                  areaServed: countyData.map((cd) => ({
                    '@type': 'AdministrativeArea',
                    name: `${cd.county} County, CA`,
                    containsPlace: cd.cities.slice(0, 10).map((c) => ({
                      '@type': 'City',
                      name: c.city,
                    })),
                  })),
                },
                {
                  '@type': 'BreadcrumbList',
                  itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cnsdemo.com' },
                    { '@type': 'ListItem', position: 2, name: 'Service Areas', item: 'https://cnsdemo.com/service-areas' },
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
          <div className="max-w-4xl mx-auto">
            <nav className="text-sm text-gray-400 mb-6 flex gap-1">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white">Service Areas</span>
            </nav>
            <h1 className="text-4xl font-bold mb-4">
              Demolition Service Areas — Southern California
            </h1>
            <p className="text-xl text-gray-300 mb-4">
              C&amp;S Demolition (CA License #1126325) serves {totalCities} cities across four Southern California counties. Licensed, bonded, and insured demolition for every type of project.
            </p>
            <div className="flex flex-wrap gap-3 text-sm mb-8">
              <span className="bg-brand-orange px-3 py-1 rounded-full">✓ {totalCities} Cities Served</span>
              <span className="bg-gray-700 px-3 py-1 rounded-full">✓ 4 Counties</span>
              <span className="bg-gray-700 px-3 py-1 rounded-full">✓ Free On-Site Estimates</span>
              <span className="bg-gray-700 px-3 py-1 rounded-full">✓ CA License #1126325</span>
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

          {/* County sections with city lists */}
          {countyData.map((cd) => (
            <section key={cd.county} className="mb-14">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-brand-dark">
                    {cd.county} County — {cd.cities.length} Cities
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    Licensed demolition services throughout all of {cd.county} County, CA.
                  </p>
                </div>
                <Link
                  href={`/county/${cd.slug}`}
                  className="text-sm text-brand-orange font-semibold hover:underline whitespace-nowrap"
                >
                  View {cd.county} County page →
                </Link>
              </div>

              {/* Top service links for county */}
              <div className="flex flex-wrap gap-2 mb-4">
                {services.slice(0, 5).map((s) => (
                  <Link
                    key={s.service_slug}
                    href={`/demolition/${s.service_slug}`}
                    className="text-xs bg-gray-100 hover:bg-brand-orange hover:text-white px-2.5 py-1 rounded-full transition-colors"
                  >
                    {s.service_short}
                  </Link>
                ))}
              </div>

              {/* City grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {cd.cities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/demolition/interior-demolition/${city.slug}`}
                    className="text-sm border border-gray-200 rounded-lg px-3 py-2 hover:border-brand-orange hover:text-brand-orange transition-colors"
                  >
                    {city.city}
                  </Link>
                ))}
              </div>
            </section>
          ))}

          {/* Services grid */}
          <section className="border-t border-gray-200 pt-12 mb-12">
            <h2 className="text-2xl font-bold text-brand-dark mb-4">Services We Offer Throughout Southern California</h2>
            <p className="text-gray-600 mb-6">
              Every service listed below is available in all {totalCities} cities across our service area. Click any service to see city-specific pages and pricing.
            </p>
            <div className="flex flex-wrap gap-2">
              {services.map((s) => (
                <Link
                  key={s.service_slug}
                  href={`/demolition/${s.service_slug}`}
                  className="border border-gray-200 hover:border-brand-orange hover:text-brand-orange px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  {s.service_name}
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-brand-orange text-white rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Get a Free Estimate Anywhere in Southern California</h2>
            <p className="text-orange-100 mb-2">
              We come to your property, assess the project in person, and give you a written lump-sum quote the same day — no obligation.
            </p>
            <p className="text-orange-200 text-sm mb-6">
              CA Licensed #1126325 · Fully Insured · {totalCities} Cities Served
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

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const counties = getCounties();
  const services = getServices();
  const countyData: CountyData[] = counties.map((county) => ({
    county,
    slug: county.toLowerCase().replace(/ /g, '-'),
    cities: getCitiesByCounty(county),
  }));
  const totalCities = getCities().length;
  return { props: { countyData, totalCities, services } };
};
