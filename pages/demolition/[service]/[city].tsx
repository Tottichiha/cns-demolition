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
  getRelatedBlogPosts,
  getCityContent,
  getServiceContent,
  City,
  Service,
  BlogPost,
  ServiceContentEntry,
} from '../../../lib/getData';

interface PageProps {
  city: City;
  service: Service;
  nearbyCities: City[];
  allServices: Service[];
  relatedPosts: BlogPost[];
  cityContent: string | null;
  serviceContent: ServiceContentEntry | null;
}

// Service/city pages never show dollar prices: drop any excerpt sentence containing "$".
function stripPrices(text: string): string {
  const sentences = text.match(/\S[\s\S]*?(?:[.!?](?=\s|$)|$)/g) || [];
  return sentences.filter((s) => !s.includes('$')).join(' ');
}

export default function ServiceCityPage({ city, service, nearbyCities, allServices, relatedPosts, cityContent, serviceContent }: PageProps) {
  const titleBase = `${service.service_name} in ${city.city}, CA`;
  const title = titleBase.length <= 42 ? `${titleBase} | C&S Demolition` : titleBase;
  const description = `${service.service_name} in ${city.city}, CA by a licensed contractor (CSLB #1126325). Written lump-sum bid, debris hauled, site left clean. (562) 204-6335.`;

  const nearbyList = city.nearby_cities.split(',').map((c) => c.trim()).filter(Boolean);

  const faqs = [
    {
      q: `How much does ${service.service_name.toLowerCase()} cost in ${city.city}?`,
      a: `Cost for ${service.service_name.toLowerCase()} in ${city.city} depends on the size of the job, wall or structure height, site access, whether the work is done by hand or by machine, whether slabs and footings come out, and how many tons of debris go to disposal. C&S Demolition gives a written lump-sum bid after seeing your plans or photos — no hourly billing.`,
    },
    {
      q: `Do I need a permit for ${service.service_name.toLowerCase()} in ${city.city}?`,
      a: `Permit requirements vary by project type and ${city.city} municipal code. Your written bid states which permits the job needs and who pulls them; permit fees are the owner's unless the bid says otherwise.`,
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
        <meta property="og:image" content={`https://cnsdemo.com/api/og?title=${encodeURIComponent(service.service_name + ' in ' + city.city + ', CA')}&sub=${encodeURIComponent('CA Lic #1126325 · Free Estimates · ' + city.county + ' County')}&type=city`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`https://cnsdemo.com/api/og?title=${encodeURIComponent(service.service_name + ' in ' + city.city + ', CA')}&sub=${encodeURIComponent('CA Lic #1126325 · Free Estimates · ' + city.county + ' County')}&type=city`} />
        <meta name="twitter:image:alt" content={`${service.service_name} in ${city.city}, CA — C&S Demolition`} />
        <SchemaMarkup city={city} service={service} faqs={faqs} />
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
              <span className="bg-gray-700 px-3 py-1 rounded-full">✓ Fast Turnaround on Bids</span>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-12">

          {/* Service Overview — unique per-service content */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-brand-dark mb-4">
              Professional {service.service_name} in {city.city}, CA
            </h2>
            {serviceContent ? (
              serviceContent.deep_content.split('\n\n').map((para, i) => (
                <p key={i} className="text-gray-700 mb-4 leading-relaxed">{para}</p>
              ))
            ) : (
              <p className="text-gray-700 mb-4 leading-relaxed">
                {service.description} C&amp;S Demolition is a licensed, insured contractor (DBA of Scrapit LLC) serving {city.city} and all of {city.county} County.
              </p>
            )}
            {serviceContent && serviceContent.included.length > 0 && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 my-6">
                <p className="font-semibold text-gray-900 mb-3">What&apos;s included in our {service.service_name.toLowerCase()}:</p>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                  {serviceContent.included.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-700">
                      <span className="text-brand-orange flex-shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Local Knowledge — unique per-city content */}
          {(cityContent || city.city_note) && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-dark mb-4">
                {service.service_name} in {city.city}: Local Knowledge
              </h2>
              {(cityContent || city.city_note).split('\n\n').map((para, i) => (
                <p key={i} className="text-gray-700 mb-4 leading-relaxed">{para}</p>
              ))}
            </section>
          )}

          {/* Neighborhoods Served */}
          {city.neighborhoods && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-dark mb-4">
                {service.service_name} Services Across {city.city} Neighborhoods
              </h2>
              <p className="text-gray-700 mb-4">
                C&S Demolition serves every neighborhood in {city.city}, including{' '}
                {city.neighborhoods.split(',').map((n) => n.trim()).filter(Boolean).join(', ')}.
                No matter where your property is located, we respond quickly and handle the demolition from teardown to final cleanup.
              </p>
              <div className="flex flex-wrap gap-2">
                {city.neighborhoods.split(',').map((n) => n.trim()).filter(Boolean).map((neighborhood) => (
                  <span
                    key={neighborhood}
                    className="text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full"
                  >
                    {neighborhood}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Permit Information */}
          {city.permit_office && (
            <section className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-12">
              <h2 className="text-xl font-bold text-brand-dark mb-3">
                {city.city} Demolition Permit Information
              </h2>
              <p className="text-gray-700 mb-4">
                {service.service_name} in {city.city} typically requires a demolition permit issued by the city building department. Your written bid states which permits the job needs and who pulls them; permit fees are the owner&apos;s unless the bid says otherwise.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-gray-800 mb-1">Permit Office</p>
                  <p className="text-gray-600">{city.permit_office}</p>
                </div>
                {city.permit_phone && (
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Phone</p>
                    <a href={`tel:${city.permit_phone.replace(/\D/g, '')}`} className="text-brand-orange hover:underline">
                      {city.permit_phone}
                    </a>
                  </div>
                )}
                {city.permit_website && (
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Website</p>
                    <a
                      href={city.permit_website.startsWith('http') ? city.permit_website : `https://${city.permit_website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-orange hover:underline break-all"
                    >
                      {city.permit_website}
                    </a>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Cost Section */}
          <section className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-12">
            <h2 className="text-xl font-bold mb-3">
              {service.service_name} Cost in {city.city}
            </h2>
            <div className="flex gap-8 mb-4">
              <div>
                <p className="text-sm text-gray-500">How We Price</p>
                <p className="text-2xl font-bold text-brand-orange">Written Lump-Sum Bid</p>
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
                ['Clear Permit Scope', `Your written bid states which permits the job needs and who pulls them; permit fees are the owner's unless the bid says otherwise.`],
                ['All-Inclusive Pricing', 'Demolition, haul-away, and site cleanup are all included. No hidden fees or surprise charges.'],
                ['Fast Turnaround', `Most projects in ${city.city} are completed within ${service.duration}. We work around your schedule.`],
                ['DBA of Scrapit LLC', 'Backed by the equipment and crews of Scrapit LLC, and we respond quickly.'],
                ['Free Estimates', `C&S gives a written lump-sum bid after seeing plans or photos of your ${city.city} project, with fast turnaround on bids.`],
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

          {/* Step-by-Step Process */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-brand-dark mb-2">
              How {service.service_name} Works in {city.city}
            </h2>
            <p className="text-gray-600 mb-6">
              From first call to final inspection — here&apos;s exactly what to expect when you hire C&S Demolition for {service.service_name.toLowerCase()} in {city.city}.
            </p>
            <div className="space-y-5">
              {[
                {
                  step: 1,
                  title: 'Free On-Site Estimate',
                  text: `We review your ${city.city} project from plans, photos, or a site visit, note any suspect hazardous materials (asbestos, lead paint) for the owner's survey, and give you a written lump-sum bid with fast turnaround — no obligation. We quote lump-sum only: no hourly billing surprises.`,
                },
                {
                  step: 2,
                  title: `Permits${city.permit_office ? ` — ${city.permit_office}` : ''}`,
                  text: `${service.service_name} in ${city.city} typically requires a demolition permit from ${city.permit_office || `the ${city.city} Building Department`}${city.permit_phone ? ` (${city.permit_phone})` : ''}. Your written bid states which permits the job needs and who pulls them; permit fees are the owner's unless the bid says otherwise.`,
                },
                {
                  step: 3,
                  title: 'Site Preparation',
                  text: `Utilities are disconnected by the owner or GC before demolition starts. Our crew sets up dust control barriers, secures the perimeter, and protects adjacent structures.`,
                },
                {
                  step: 4,
                  title: `${service.service_name} in ${city.city}`,
                  text: `Our ${city.city} crew performs the ${service.service_name.toLowerCase()} efficiently using the right equipment — from precision hand tools for selective work to heavy machinery for larger teardowns. Debris is loaded directly into our trucks as we work. Most ${service.service_name.toLowerCase()} projects in ${city.city} are completed in ${service.duration}.`,
                },
                {
                  step: 5,
                  title: 'Debris Removal and Cleanup',
                  text: `All debris is hauled to licensed facilities in Southern California. We sort recyclable concrete, metal, and clean wood from general waste to minimize landfill impact, leaving your property broom-clean and ready for the next phase.`,
                },
              ].map(({ step, title, text }) => (
                <div key={step} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-brand-orange text-white rounded-full flex items-center justify-center font-bold text-base">
                    {step}
                  </div>
                  <div className="pt-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
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

          {/* Related Blog Posts */}
          {relatedPosts.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-dark mb-4">
                Related Guides &amp; Resources
              </h2>
              <p className="text-gray-600 mb-4">
                Learn more about {service.service_name.toLowerCase()} costs, permits, and processes in Southern California:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedPosts.map((post) => (
                  <a
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="border border-gray-200 rounded-xl p-5 hover:border-brand-orange transition-colors"
                  >
                    <span className="text-xs font-semibold text-brand-orange uppercase block mb-1">
                      {post.category}
                    </span>
                    <h3 className="font-bold text-sm leading-snug text-gray-900">
                      {post.title.replace(' | C&S Demolition', '')}
                    </h3>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed line-clamp-2">
                      {stripPrices(post.excerpt)}
                    </p>
                  </a>
                ))}
              </div>
            </section>
          )}

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

  const cityContent = getCityContent(citySlug);
  const serviceContent = getServiceContent(serviceSlug);

  // Get nearby cities from same county (excluding current city)
  const nearbyCities = getCitiesByCounty(city.county)
    .filter((c) => c.slug !== city.slug)
    .slice(0, 12);

  // Related blog posts: match on service keywords + cost/how-to for this service type
  const serviceKeywords = service.service_slug.split('-').filter((w) => w.length > 3);
  const relatedPosts = getRelatedBlogPosts([...serviceKeywords, city.slug.split('-')[0]], 3);

  return {
    props: { city, service, nearbyCities, allServices: getServices(), relatedPosts, cityContent, serviceContent },
  };
};
