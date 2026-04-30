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
      </Head>
      <Header />
      <main>
        <section className="bg-brand-dark text-white py-16 px-4 text-center">
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
