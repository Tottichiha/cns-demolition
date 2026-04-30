import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getServices, Service } from '../lib/getData';

interface ServicesProps {
  services: Service[];
}

export default function ServicesPage({ services }: ServicesProps) {
  return (
    <>
      <Head>
        <title>Junk Removal Services | 911 Junk CA</title>
        <meta
          name="description"
          content="911 Junk CA offers full-service junk removal across Southern California — furniture, appliances, garage cleanouts, construction debris, and more. Free quotes. Same-day service."
        />
        <link rel="canonical" href="https://911junkca.com/services" />
      </Head>
      <Header />
      <main>
        <section className="bg-brand-dark text-white py-16 px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Junk Removal Services</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            From a single couch to a full estate cleanout — we handle it all across Los Angeles and Orange County. Same-day service. Free upfront pricing.
          </p>
        </section>

        <section className="max-w-5xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {services.map((s) => (
              <div key={s.service_slug} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-brand-dark mb-2">{s.service_name}</h2>
                <p className="text-gray-600 text-sm mb-4">{s.description}</p>
                <div className="flex gap-6 mb-4 text-sm">
                  <div>
                    <p className="text-gray-500">Typical Cost</p>
                    <p className="font-bold text-brand-green">
                      ${Number(s.avg_cost_low).toLocaleString()} – ${Number(s.avg_cost_high).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Duration</p>
                    <p className="font-bold text-gray-700">{s.duration}</p>
                  </div>
                </div>
                <Link
                  href={`/junk-removal/${s.service_slug}`}
                  className="inline-block text-sm font-semibold text-brand-green hover:underline"
                >
                  View service areas →
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-brand-green text-white py-16 px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Book?</h2>
          <p className="text-green-100 max-w-xl mx-auto mb-8">
            Call us for a free quote. Same-day and next-day service available across Southern California.
          </p>
          <a href="tel:+15622046335" className="bg-white text-brand-green font-bold px-10 py-4 rounded-lg text-xl hover:bg-gray-100 transition-colors">
            📞 562-204-6335
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps<ServicesProps> = async () => {
  return { props: { services: getServices() } };
};
