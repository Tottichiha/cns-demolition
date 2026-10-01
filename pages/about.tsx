import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

const title = 'About C&S Demolition | Licensed SoCal Demolition Contractor';
const description =
  'C&S Demolition is a licensed California demolition contractor (CSLB #1126325) based in Anaheim, serving LA, Orange, Riverside and San Bernardino counties.';

export default function AboutPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'GeneralContractor',
        foundingDate: '2014',
        '@id': 'https://cnsdemo.com/#business',
        name: 'C&S Demolition',
        legalName: 'SCRAPIT, LLC',
        description,
        url: 'https://cnsdemo.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://cnsdemo.com/logo.svg',
          width: 300,
          height: 60,
        },
        image: 'https://cnsdemo.com/api/og?title=About+C%26S+Demolition&sub=Licensed+CA+Contractor+%23+1126325&type=about',
        telephone: '+15622046335',
        email: 'contactus@cnsdemo.com',
        numberOfEmployees: { '@type': 'QuantitativeValue', value: 15 },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Anaheim',
          addressRegion: 'CA',
          postalCode: '92807',
          addressCountry: 'US',
        },
        areaServed: [
          { '@type': 'County', name: 'Los Angeles County', containedInPlace: { '@type': 'State', name: 'California' } },
          { '@type': 'County', name: 'Orange County', containedInPlace: { '@type': 'State', name: 'California' } },
          { '@type': 'County', name: 'Riverside County', containedInPlace: { '@type': 'State', name: 'California' } },
          { '@type': 'County', name: 'San Bernardino County', containedInPlace: { '@type': 'State', name: 'California' } },
        ],
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          name: 'California Contractors State License Board License',
          credentialCategory: 'License',
          recognizedBy: { '@type': 'Organization', name: 'California Contractors State License Board', url: 'https://www.cslb.ca.gov' },
          identifier: '1126325',
        },
        sameAs: ['https://www.google.com/maps/place/?q=place_id:ChIJQ2nILkGFumUR_lO7TYcl4CM'],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cnsdemo.com' },
          { '@type': 'ListItem', position: 2, name: 'About', item: 'https://cnsdemo.com/about' },
        ],
      },
      {
        '@type': 'AboutPage',
        '@id': 'https://cnsdemo.com/about',
        name: title,
        description,
        url: 'https://cnsdemo.com/about',
        about: { '@id': 'https://cnsdemo.com/#business' },
        author: {
          '@type': 'Person',
          name: 'Tony S.',
          jobTitle: 'Founder & Owner',
          worksFor: { '@id': 'https://cnsdemo.com/#business' },
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://cnsdemo.com/about" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cnsdemo.com/about" />
        <meta property="og:image" content="https://cnsdemo.com/api/og?title=About+C%26S+Demolition&sub=Licensed+CA+Contractor+%23+1126325&type=about" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://cnsdemo.com/api/og?title=About+C%26S+Demolition&sub=Licensed+CA+Contractor+%23+1126325&type=about" />
        <meta name="twitter:image:alt" content="About C&S Demolition — CA Licensed Contractor #1126325" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <Header />

      <main>
        {/* Hero */}
        <section className="bg-brand-dark text-white py-14 px-4">
          <div className="max-w-4xl mx-auto">
            <nav className="text-sm text-gray-400 mb-5 flex flex-wrap gap-1">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white">About</span>
            </nav>
            <span className="text-brand-orange text-xs font-bold uppercase tracking-widest mb-3 block">
              CA License #1126325 · Verified by CSLB
            </span>
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              Southern California's Trusted Demolition Contractor
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl">
              Since 2014, C&amp;S Demolition has been tearing down, clearing out, and cleaning up across Los Angeles, Orange County, Riverside, and San Bernardino. A small, licensed crew that does the job right.
            </p>
          </div>
        </section>

        {/* Trust bar */}
        <div className="bg-brand-orange text-white py-4 px-4">
          <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8 text-sm font-semibold">
            <span>✓ CA License #1126325</span>
            <span>✓ Fully Insured</span>
            <span>✓ 14+ Years Experience</span>
            <span>✓ Licensed · Bonded · Insured</span>
            <span>✓ 123+ Cities Served</span>
            <span>✓ Free On-Site Estimates</span>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-16">

          {/* Founder story */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            <div>
              <h2 className="text-3xl font-bold text-brand-dark mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Tony started C&amp;S Demolition in 2014 because demolition is what he loves doing. Taking a structure down safely, sorting what can be recycled, and leaving a clean site for the next trade never gets old for him. He still runs the company himself, and the mission hasn't changed: demolition work that homeowners and contractors can actually trust. That means showing up when we said, doing the scope we bid, and leaving the site clean.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Every project starts with a look at the site or the plans, so we bid the real scope instead of guessing over the phone. The written bid spells out what's included, what isn't, and who handles permits and utility shutoffs. Then we treat the job site like it's our own property.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Today, C&amp;S Demolition runs a four-person crew and serves 123+ cities across Los Angeles, Orange County, Riverside, and San Bernardino counties, from single-room interior teardowns and block walls to whole-house teardowns and commercial interior demolition. Small enough that the owner is on your job, big enough to run night shifts in an occupied mall.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We're proud to hold an active California Contractors State License Board (CSLB) license — <strong>License #1126325</strong> — which you can verify directly at <a href="https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx" target="_blank" rel="noopener noreferrer" className="text-brand-orange hover:underline">cslb.ca.gov</a>. That license means we carry the required liability and workers' comp insurance, pass background checks, and meet California's professional standards for demolition work.
              </p>
            </div>
            <div>
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 mb-6">
                <h3 className="font-bold text-brand-dark text-lg mb-4">Company at a Glance</h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex gap-3"><span className="text-brand-orange font-bold w-28 shrink-0">Founded</span><span>2014, Southern California</span></li>
                  <li className="flex gap-3"><span className="text-brand-orange font-bold w-28 shrink-0">Crew</span><span>Four-person crew, owner on site</span></li>
                  <li className="flex gap-3"><span className="text-brand-orange font-bold w-28 shrink-0">License</span><span>CA CSLB #1126325 (Active)</span></li>
                  <li className="flex gap-3"><span className="text-brand-orange font-bold w-28 shrink-0">Insurance</span><span>General Liability + Workers' Comp</span></li>
                  <li className="flex gap-3"><span className="text-brand-orange font-bold w-28 shrink-0">Team Size</span><span>15 licensed professionals</span></li>
                  <li className="flex gap-3"><span className="text-brand-orange font-bold w-28 shrink-0">Service Area</span><span>123+ cities, 4 SoCal counties</span></li>
                  <li className="flex gap-3"><span className="text-brand-orange font-bold w-28 shrink-0">Pricing</span><span>Lump-sum, all-inclusive — no hourly billing</span></li>
                  <li className="flex gap-3"><span className="text-brand-orange font-bold w-28 shrink-0">Estimates</span><span>Free on-site, same-day written quote</span></li>
                  <li className="flex gap-3"><span className="text-brand-orange font-bold w-28 shrink-0">Payment</span><span>Residential: deposit is the lesser of 10% or $1,000 (CA law). Commercial: Net 30.</span></li>
                  <li className="flex gap-3"><span className="text-brand-orange font-bold w-28 shrink-0">Phone</span><a href="tel:+15622046335" className="text-brand-orange hover:underline">(562) 204-6335</a></li>
                  <li className="flex gap-3"><span className="text-brand-orange font-bold w-28 shrink-0">Email</span><a href="mailto:contactus@cnsdemo.com" className="text-brand-orange hover:underline">contactus@cnsdemo.com</a></li>
                </ul>
              </div>
              <a
                href="https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white border-2 border-brand-orange rounded-xl p-4 text-center hover:bg-brand-red-tint transition-colors"
              >
                <p className="text-brand-orange font-bold text-sm">Verify Our License on CSLB.ca.gov →</p>
                <p className="text-gray-500 text-xs mt-1">License #1126325 · Active · General Building Contractor</p>
              </a>
            </div>
          </div>

          {/* What we do */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-brand-dark mb-3 text-center">What We Do</h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
              From a single wall to an entire structure, we have the equipment and licensing to handle it. All projects include debris removal and site cleanup.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Interior Demolition', href: '/demolition/interior-demolition', desc: 'Kitchens, bathrooms, walls, ceilings — surgical teardowns that protect the rest of your structure.' },
                { name: 'Whole House Demolition', href: '/demolition/whole-house-demolition', desc: 'Complete structural teardown of houses and commercial buildings with full debris haul-away.' },
                { name: 'Concrete Removal', href: '/demolition/concrete-removal', desc: 'Driveways, slabs, footings, foundations — broken up and hauled away clean.' },
                { name: 'Garage Demolition', href: '/demolition/garage-demolition', desc: 'Detached and attached garage teardowns with permit coordination and slab removal options.' },
                { name: 'Deck & Patio Demolition', href: '/demolition/deck-demolition', desc: 'Wood and composite decks, concrete patios, pergolas — removed and cleared for new construction.' },
                { name: 'Wall Removal', href: '/demolition/wall-removal', desc: 'Load-bearing and non-load-bearing wall removal with structural assessment and post-demo framing.' },
                { name: 'Shed Demolition', href: '/demolition/shed-demolition', desc: 'Sheds, carports, and small outbuildings — removed and site left clean and cleared same day.' },
                { name: 'Commercial Demolition', href: '/demolition/commercial-demolition', desc: 'Tenant improvements, retail buildouts, office gut-outs, and industrial site clearance.' },
              ].map((svc) => (
                <Link
                  key={svc.href}
                  href={svc.href}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:border-brand-orange hover:shadow-md transition-all"
                >
                  <h3 className="font-bold text-brand-dark mb-2">{svc.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{svc.desc}</p>
                  <span className="text-brand-orange text-sm font-semibold mt-3 block">Learn more →</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Why choose us */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-brand-dark mb-3 text-center">Why Clients Choose C&amp;S Demolition</h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
              Here's what we focus on for every client.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  title: 'We Pull Every Permit',
                  body: 'Unpermitted demolition work can delay your sale, invalidate your insurance, and trigger fines from the city. We handle every permit — residential demolition, grading, asbestos clearance — so your project closes clean.',
                },
                {
                  title: 'Free On-Site Estimates',
                  body: 'Phone estimates for demolition are guesswork. We come to your property, walk the project, assess for hazmat conditions, and hand you a written quote before we leave. No surprises on final billing.',
                },
                {
                  title: 'We Handle Hazmat',
                  body: 'Older properties in Southern California commonly contain asbestos (drywall, popcorn ceilings, floor tiles) and lead paint. We coordinate licensed testing and abatement before any demolition begins, keeping your crew and neighbors safe.',
                },
                {
                  title: 'All-Inclusive Pricing',
                  body: "Our quotes include labor, equipment, dumpsters, debris hauling, and dump fees. We don't low-ball the demo and then charge extra for disposal — you know the full cost before work starts.",
                },
                {
                  title: 'We Work Around Contractors',
                  body: "Whether you're a homeowner, GC, or developer, we sync our schedule with your project timeline. We don't disappear mid-project, and we leave the site ready for the next trade.",
                },
                {
                  title: 'Licensed, Insured, Verifiable',
                  body: "CSLB License #1126325, active general liability, and workers' compensation insurance. You can verify our license in 30 seconds at cslb.ca.gov. We carry the paper — ask to see it on site.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="font-bold text-brand-dark mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Coverage area */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-brand-dark mb-3 text-center">Where We Work</h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
              C&amp;S Demolition serves 123 cities across four Southern California counties. Our crews operate out of the South Bay and can mobilize to any project within a 60-mile radius same week.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {[
                { county: 'Los Angeles County', cities: '51 cities', href: '/county/los-angeles' },
                { county: 'Orange County', cities: '35 cities', href: '/county/orange' },
                { county: 'Riverside County', cities: '20 cities', href: '/county/riverside' },
                { county: 'San Bernardino County', cities: '17 cities', href: '/county/san-bernardino' },
              ].map((c) => (
                <Link key={c.href} href={c.href} className="bg-brand-dark text-white rounded-xl p-5 text-center hover:bg-gray-800 transition-colors">
                  <p className="font-bold text-sm mb-1">{c.county}</p>
                  <p className="text-brand-orange text-lg font-bold">{c.cities}</p>
                </Link>
              ))}
            </div>
            <p className="text-center">
              <Link href="/service-areas" className="text-brand-orange font-semibold hover:underline">
                View full service area map and city list →
              </Link>
            </p>
          </div>

          {/* Resource links */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-brand-dark mb-8 text-center">Learn More</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Link href="/blog" className="bg-white border border-gray-200 rounded-xl p-6 hover:border-brand-orange hover:shadow-md transition-all text-center">
                <p className="text-2xl mb-2">📰</p>
                <p className="font-bold text-brand-dark mb-1">Resource Center</p>
                <p className="text-sm text-gray-600">Cost guides, permit tips, how-to articles</p>
              </Link>
              <Link href="/services" className="bg-white border border-gray-200 rounded-xl p-6 hover:border-brand-orange hover:shadow-md transition-all text-center">
                <p className="text-2xl mb-2">🔧</p>
                <p className="font-bold text-brand-dark mb-1">All Services</p>
                <p className="text-sm text-gray-600">Full list of demolition services we offer</p>
              </Link>
              <Link href="/contact" className="bg-white border border-gray-200 rounded-xl p-6 hover:border-brand-orange hover:shadow-md transition-all text-center">
                <p className="text-2xl mb-2">📞</p>
                <p className="font-bold text-brand-dark mb-1">Get a Free Estimate</p>
                <p className="text-sm text-gray-600">We come to you — same-day written quote</p>
              </Link>
            </div>
          </div>

          {/* CTA */}
          <section className="bg-brand-orange text-white rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Ready to Start Your Demolition Project?</h2>
            <p className="text-red-100 mb-6 max-w-xl mx-auto">
              Call us or send a message. We schedule free on-site estimates within 24–48 hours and deliver a written quote before we leave your property.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+15622046335"
                className="inline-block bg-white text-brand-orange font-bold px-10 py-4 rounded-lg text-xl hover:bg-gray-100 transition-colors"
              >
                📞 (562) 204-6335
              </a>
              <Link
                href="/contact"
                className="inline-block border-2 border-white text-white font-bold px-10 py-4 rounded-lg text-lg hover:bg-white hover:text-brand-orange transition-colors"
              >
                Send a Message
              </Link>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}
