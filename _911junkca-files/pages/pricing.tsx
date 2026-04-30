import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getServices, Service } from '../lib/getData';

interface PricingProps {
  services: Service[];
}

export default function PricingPage({ services }: PricingProps) {
  return (
    <>
      <Head>
        <title>Junk Removal Pricing | 911 Junk CA</title>
        <meta
          name="description"
          content="Transparent, upfront pricing for junk removal in Los Angeles and Orange County. No hidden fees. See typical costs for all our services and get a free quote today."
        />
        <link rel="canonical" href="https://911junkca.com/pricing" />
      </Head>
      <Header />
      <main>
        <section className="bg-brand-dark text-white py-16 px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Junk Removal Pricing</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            No hidden fees. No surprises. We give you a firm price before we start — and we stick to it.
          </p>
        </section>

        {/* How pricing works */}
        <section className="max-w-3xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-brand-dark mb-4">How We Price Jobs</h2>
          <p className="text-gray-700 mb-4">
            Our pricing is based on how much space your items take up in our truck — not by the hour. That means you know exactly what you&apos;re paying before we touch a single thing.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
            {[
              ['1/8 Truck', 'A few small items — single furniture pieces, a few boxes of junk'],
              ['1/2 Truck', 'Medium cleanout — several pieces of furniture or a garage partial'],
              ['Full Truck', 'Full cleanout — entire room, garage, estate, or large debris pile'],
            ].map(([size, desc]) => (
              <div key={size} className="bg-white border border-gray-200 rounded-xl p-5 text-center shadow-sm">
                <p className="font-bold text-brand-green text-lg mb-2">{size}</p>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-sm">
            Call <a href="tel:+15622046335" className="text-brand-green font-semibold">562-204-6335</a> and we&apos;ll give you a free estimate over the phone or come out to quote in person — whatever works best for you.
          </p>
        </section>

        {/* Service pricing table */}
        <section className="bg-white border-t border-gray-100 py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-brand-dark mb-8 text-center">Typical Pricing by Service</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand-dark text-white">
                    <th className="text-left px-4 py-3 rounded-tl-lg">Service</th>
                    <th className="text-left px-4 py-3">Typical Range</th>
                    <th className="text-left px-4 py-3">Duration</th>
                    <th className="text-left px-4 py-3 rounded-tr-lg"></th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((s, i) => (
                    <tr key={s.service_slug} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-4 py-3 font-medium">{s.service_name}</td>
                      <td className="px-4 py-3 text-brand-green font-semibold">
                        ${Number(s.avg_cost_low).toLocaleString()} – ${Number(s.avg_cost_high).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-gray-600">{s.duration}</td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/junk-removal/${s.service_slug}`}
                          className="text-brand-green hover:underline font-medium"
                        >
                          Book →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              * Prices are estimates for the Los Angeles and Orange County area. Actual pricing depends on volume, access, and item type. Contact us for an exact quote.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand-green text-white py-16 px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Get Your Free Quote Today</h2>
          <p className="text-green-100 max-w-xl mx-auto mb-8">
            Same-day service available. We come to you, assess the job, and give you a firm price — no obligation.
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

export const getStaticProps: GetStaticProps<PricingProps> = async () => {
  return { props: { services: getServices() } };
};
