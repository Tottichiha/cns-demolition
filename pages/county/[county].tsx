import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getCounties, getCitiesByCounty, getServices, City, Service } from '../../lib/getData';

interface PageProps {
  county: string;
  cities: City[];
  services: Service[];
}

export default function CountyPage({ county, cities, services }: PageProps) {
  const title = `Demolition Contractor in ${county} County, CA | C&S Demolition`;
  const description = `Licensed demolition services throughout ${county} County, CA. C&S Demolition (Scrapit LLC) serves all ${cities.length} cities in ${county} County. Interior demo, pool removal, concrete, and more. Free estimates.`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`https://cnsdemo.com/county/${county.toLowerCase().replace(/ /g, '-')}`} />
      </Head>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-6 flex gap-1">
          <Link href="/" className="hover:text-brand-orange">Home</Link>
          <span>/</span>
          <Link href="/service-areas" className="hover:text-brand-orange">Service Areas</Link>
          <span>/</span>
          <span className="text-gray-700">{county} County</span>
        </nav>

        <h1 className="text-4xl font-bold text-brand-dark mb-4">
          Demolition Contractor in {county} County, CA
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          C&S Demolition serves all of {county} County with licensed, insured demolition services. From Anaheim to San Clemente, we handle residential and commercial demo projects of every size. Call for a free estimate.
        </p>

        {/* Services Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Our Demolition Services in {county} County</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((s) => (
              <div key={s.service_slug} className="border border-gray-200 rounded-lg p-5 hover:border-brand-orange transition-colors">
                <h3 className="font-bold text-lg mb-1">{s.service_name}</h3>
                <p className="text-sm text-gray-600 mb-3">{s.description}</p>
                <p className="text-sm text-brand-orange font-medium">
                  From ${Number(s.avg_cost_low).toLocaleString()} · {s.duration}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Cities Grid */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Cities We Serve in {county} County</h2>
          <p className="text-gray-600 mb-6">
            We provide demolition services in all {cities.length} cities throughout {county} County. Click any city to see service-specific pages and pricing.
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
                    href={`/demolition/interior-demolition/${city.slug}`}
                    className="text-xs text-gray-400 hover:text-brand-orange"
                  >
                    + more →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
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
  return { props: { county, cities, services } };
};
