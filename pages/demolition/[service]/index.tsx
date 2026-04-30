import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { getServices, getCities, Service, City } from '../../../lib/getData';

interface PageProps {
  service: Service;
  cities: City[];
  allServices: Service[];
}

export default function ServiceIndexPage({ service, cities, allServices }: PageProps) {
  const title = `${service.service_name} in Southern California | C&S Demolition`;
  const description = `Licensed ${service.service_name.toLowerCase()} contractor serving ${cities.length}+ cities across Southern California. CA License #1126325. Free on-site estimates. Call (562) 204-6335.`;

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
      </Head>
      <Header />
      <main>
        <section className="bg-brand-dark text-white py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-1">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white">{service.service_name}</span>
            </nav>
            <h1 className="text-4xl font-bold mb-4">
              {service.service_name} in Southern California
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              {service.description} C&amp;S Demolition is a CA-licensed contractor serving {cities.length}+ cities across Southern California. Free on-site estimates — we come to you.
            </p>
            <div className="flex flex-wrap gap-3 text-sm mb-8">
              <span className="bg-brand-orange px-3 py-1 rounded-full">✓ CA Licensed #1126325</span>
              <span className="bg-gray-700 px-3 py-1 rounded-full">✓ Free Estimates</span>
              <span className="bg-gray-700 px-3 py-1 rounded-full">✓ Fully Insured</span>
              <span className="bg-gray-700 px-3 py-1 rounded-full">
                ✓ ${Number(service.avg_cost_low).toLocaleString()} – ${Number(service.avg_cost_high).toLocaleString()} typical
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
              Pricing varies by project size, materials, permit requirements, and site access. The best way to get an accurate number is a free on-site estimate — we come to your property and give you a written quote the same day.
            </p>
          </section>

          {/* Cities by county */}
          {countyGroups.map((group) => (
            <section key={group.name} className="mb-12">
              <h2 className="text-2xl font-bold text-brand-dark mb-2">
                {service.service_name} — {group.name} ({group.cities.length} cities)
              </h2>
              <p className="text-gray-600 mb-6">
                Click any city to see pricing, details, and availability for {service.service_name.toLowerCase()} in that area.
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
            <h2 className="text-2xl font-bold mb-3">Ready to Get Started?</h2>
            <p className="text-orange-100 mb-6">
              Free on-site estimates across all of Southern California. We come to your property, assess the project, and provide a written quote — same day.
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
  return { props: { service, cities, allServices: services } };
};
