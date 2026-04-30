import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import CTA from '../../../components/CTA';
import SchemaMarkup from '../../../components/SchemaMarkup';
import {
  getAllCityServicePairs,
  getCityBySlug,
  getServiceBySlug,
  getCitiesByCounty,
  getServices,
  City,
  Service,
} from '../../../lib/getData';

interface PageProps {
  city: City;
  service: Service;
  nearbyCities: City[];
  allServices: Service[];
}

export default function ServiceCityPage({ city, service, nearbyCities, allServices }: PageProps) {
  const title = `${service.service_name} in ${city.city}, CA | C&S Demolition`;
  const description = `Need ${service.service_name.toLowerCase()} in ${city.city}, ${city.county} County? C&S Demolition (Scrapit LLC) is your licensed local contractor. Free estimates. ${service.duration} turnaround. Serving ${city.city} and all of ${city.county} County.`;

  const nearbyList = city.nearby_cities.split(',').map((c) => c.trim()).filter(Boolean);

  const faqs = [
    {
      q: `How much does ${service.service_name.toLowerCase()} cost in ${city.city}?`,
      a: `In ${city.city} and the surrounding ${city.county} County area, ${service.service_name.toLowerCase()} typically costs between $${Number(service.avg_cost_low).toLocaleString()} and $${Number(service.avg_cost_high).toLocaleString()} depending on scope, access, and materials. Contact us for a free on-site estimate tailored to your specific project.`,
    },
    {
      q: `Do I need a permit for ${service.service_name.toLowerCase()} in ${city.city}?`,
      a: `Permit requirements vary by project type and ${city.city} municipal code. C&S Demolition handles all permit research and filing on your behalf, so you never have to deal with the city directly. We're familiar with ${city.county} County regulations and have existing relationships with local building departments.`,
    },
    {
      q: `How long does ${service.service_name.toLowerCase()} take in ${city.city}?`,
      a: `Most ${service.service_name.toLowerCase()} projects in ${city.city} are completed in ${service.duration}. Timeline depends on project size, permit requirements, and access to the site. We'll give you a firm schedule before any work begins.`,
    },
    {
      q: `Is C&S Demolition licensed and insured in California?`,
      a: `Yes. C&S Demolition is a DBA of Scrapit LLC, a fully licensed California contractor. We carry general liability insurance and workers' compensation coverage on every project in ${city.city} and throughout ${city.county} County.`,
    },
    {
      q: `Do you haul away debris after ${service.service_name.toLowerCase()} in ${city.city}?`,
      a: `Absolutely. Full debris removal and site cleanup is included in every C&S Demolition project. We haul everything away and leave your ${city.city} property broom-clean and ready for the next phase of your project.`,
    },
  ];

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://cnsdemo.com/demolition/${service.service_slug}/${city.slug}`} />
        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://cnsdemo.com/demolition/${service.service_slug}/${city.slug}`} />
        <SchemaMarkup city={city} service={service} />
      </Head>

      <Header />

      <main>
        {/* Hero */}
        <section className="bg-brand-dark text-white py-16">
          <div className="max-w-4xl mx-auto px-4">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-1">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <Link href="/services" className="hover:text-white">Services</Link>
              <span>/</span>
              <Link href={`/demolition/${service.service_slug}`} className="hover:text-white">{service.service_name}</Link>
              <span>/</span>
              <span className="text-white">{city.city}</span>
            </nav>

            <h1 className="text-4xl font-bold mb-4">
              {service.service_name} in {city.city}, CA
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Licensed demolition contractor serving {city.city} and all of {city.county} County. Fast turnaround, fully insured, free estimates.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="bg-brand-orange px-3 py-1 rounded-full">✓ CA Licensed Contractor</span>
              <span className="bg-gray-700 px-3 py-1 rounded-full">✓ Free Estimates</span>
              <span className="bg-gray-700 px-3 py-1 rounded-full">✓ Fully Insured</span>
              <span className="bg-gray-700 px-3 py-1 rounded-full">✓ Same-Week Availability</span>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-12">

          {/* Service Overview */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-brand-dark mb-4">
              Professional {service.service_name} Services in {city.city}
            </h2>
            <p className="text-gray-700 mb-4">
              C&S Demolition has been serving {city.city} homeowners and contractors with reliable {service.service_name.toLowerCase()} services. As a DBA of Scrapit LLC, we bring the full backing of a licensed, bonded, and insured demolition company to every project in {city.county} County.
            </p>
            <p className="text-gray-700 mb-4">
              {service.description} Our {city.city} team is familiar with local building codes, HOA requirements, and municipal permit processes — so your project stays on schedule from day one.
            </p>
            <p className="text-gray-700">
              Whether you&apos;re a homeowner preparing for a renovation, a contractor clearing a site, or a property manager handling a rehab, we deliver clean, efficient demolition work that meets California standards.
            </p>
          </section>

          {/* Cost Section */}
          <section className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-12">
            <h2 className="text-xl font-bold mb-3">
              {service.service_name} Cost in {city.city}
            </h2>
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
              Pricing in {city.city} depends on square footage, materials, access, permit fees, and disposal costs. The best way to get an accurate number is a free on-site estimate — we&apos;ll come to you.
            </p>
          </section>

          {/* Why C&S */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-brand-dark mb-6">
              Why {city.city} Homeowners Choose C&S Demolition
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                ['Licensed & Insured', `California-licensed contractor operating as C&S Demolition / Scrapit LLC. Fully covered for every job in ${city.city}.`],
                ['Local Knowledge', `We know ${city.county} County permit offices, inspectors, and local ordinances. No surprises.`],
                ['All-Inclusive Pricing', 'Demolition, haul-away, and site cleanup are all included. No hidden fees or surprise charges.'],
                ['Fast Turnaround', `Most projects in ${city.city} are completed within ${service.duration}. We work around your schedule.`],
                ['DBA of Scrapit LLC', 'Backed by the full resources of Scrapit LLC — equipment, crews, and experience on thousands of SoCal projects.'],
                ['Free On-Site Estimates', `We come to your ${city.city} property, assess the project in person, and give you a written quote the same day.`],
              ].map(([title, text]) => (
                <div key={title} className="flex gap-3 p-4 bg-white border border-gray-200 rounded-lg">
                  <span className="text-brand-orange text-xl mt-0.5">✓</span>
                  <div>
                    <p className="font-semibold text-gray-900">{title}</p>
                    <p className="text-sm text-gray-600">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <CTA city={city.city} service={service.service_name} />

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-brand-dark mb-6">
              Frequently Asked Questions — {service.service_name} in {city.city}
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="border border-gray-200 rounded-lg p-5 group">
                  <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                    {faq.q}
                    <span className="text-brand-orange ml-2">+</span>
                  </summary>
                  <p className="mt-3 text-gray-700 text-sm leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Service Area Map + Nearby Cities */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-brand-dark mb-4">
              Serving {city.city} and Nearby Areas
            </h2>
            <p className="text-gray-700 mb-6">
              Our {city.city} demolition crews also serve the surrounding communities of {nearbyList.join(', ')}, and throughout {city.county} County. If you&apos;re not sure whether we cover your area, just call — we likely do.
            </p>

            {/* Embedded map */}
            <div className="rounded-xl overflow-hidden border border-gray-200 mb-6" style={{ height: '300px' }}>
              <iframe
                title={`C&S Demolition service area in ${city.city}, CA`}
                width="100%"
                height="100%"
                loading="lazy"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(city.city + ', ' + city.county + ' County, CA')}&z=11&output=embed`}
              />
            </div>

            {/* Nearby city links */}
            <div className="flex flex-wrap gap-2">
              {nearbyCities.slice(0, 12).map((c) => (
                <Link
                  key={c.slug}
                  href={`/demolition/${service.service_slug}/${c.slug}`}
                  className="text-sm bg-gray-100 hover:bg-brand-orange hover:text-white px-3 py-1.5 rounded-full transition-colors"
                >
                  {service.service_short} in {c.city}
                </Link>
              ))}
            </div>
          </section>

          {/* Other Services */}
          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">
              More Demolition Services in {city.city}
            </h2>
            <p className="text-gray-600 mb-4">
              C&amp;S Demolition handles all types of demolition in {city.city}. Explore our other services:
            </p>
            <div className="flex flex-wrap gap-2">
              {allServices
                .filter((s) => s.service_slug !== service.service_slug)
                .map((s) => (
                  <Link
                    key={s.service_slug}
                    href={`/demolition/${s.service_slug}/${city.slug}`}
                    className="text-sm bg-white border border-gray-200 hover:border-brand-orange hover:text-brand-orange px-3 py-1.5 rounded-full transition-colors"
                  >
                    {s.service_short} in {city.city}
                  </Link>
                ))}
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}

// ─── Data Fetching ────────────────────────────────────────────────────────────

export const getStaticPaths: GetStaticPaths = async () => {
  const pairs = getAllCityServicePairs();
  const paths = pairs.map(({ citySlug, serviceSlug }) => ({
    params: { service: serviceSlug, city: citySlug },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const citySlug = params?.city as string;
  const serviceSlug = params?.service as string;

  const city = getCityBySlug(citySlug);
  const service = getServiceBySlug(serviceSlug);

  if (!city || !service) return { notFound: true };

  // Get nearby cities from same county (excluding current city)
  const nearbyCities = getCitiesByCounty(city.county)
    .filter((c) => c.slug !== city.slug)
    .slice(0, 12);

  return {
    props: { city, service, nearbyCities, allServices: getServices() },
  };
};
