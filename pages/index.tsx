import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HomeBidForm from '../components/HomeBidForm';
import { useState } from 'react';
import { Barlow, Barlow_Semi_Condensed } from 'next/font/google';
import { getCounties, getCities, getServices, getBlogPosts, getBlogCategories, Service, BlogPost } from '../lib/getData';

const display = Barlow_Semi_Condensed({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-display' });
const body = Barlow({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });

interface HomeProps {
  counties: string[];
  totalCities: number;
  services: Service[];
  latestPosts: BlogPost[];
  categories: string[];
}

function categoryToSlug(cat: string): string {
  return cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function Home({ counties, totalCities, services, latestPosts, categories }: HomeProps) {
  const faqs = [
    {
      q: 'Is C&S Demolition licensed and insured in California?',
      a: 'Yes. C&S Demolition is a DBA of Scrapit LLC, a fully licensed California contractor (License #1126325). We carry general liability insurance and workers\' compensation coverage on every project. You can verify our license at CSLB.ca.gov. We provide Certificates of Insurance upon request before any project begins.',
    },
    {
      q: 'Do you pull demolition permits?',
      a: 'Yes — we handle the complete permit process on your behalf. This includes researching requirements, filing applications, scheduling inspections, and obtaining final sign-offs. We are familiar with the building departments in all 123+ cities we serve across Orange, Los Angeles, Riverside, and San Bernardino Counties. Your written bid spells out which permits the job needs and who pulls them.',
    },
    {
      q: 'What areas does C&S Demolition serve?',
      a: `We serve ${totalCities}+ cities across four Southern California counties: Orange County (Anaheim, Irvine, Huntington Beach, and 32+ more), Los Angeles County (Long Beach, Torrance, Pasadena, and 48+ more), Riverside County (Riverside, Corona, Temecula, and 17+ more), and San Bernardino County (Ontario, Rancho Cucamonga, Fontana, and 14+ more). If you\'re not sure whether we cover your city, just call — we very likely do.`,
    },
    {
      q: 'Do you check for asbestos before demolition?',
      a: 'Yes. California law requires asbestos surveys before demolition of structures built before 1980. C&S Demolition coordinates certified asbestos testing and, when required, proper abatement before any teardown work begins. We work with licensed abatement contractors and handle all coordination so you don\'t have to manage multiple vendors.',
    },
    {
      q: 'Is debris removal included in your price?',
      a: 'Yes — full debris removal and broom-clean site cleanup is always included. We haul everything to licensed disposal and recycling facilities in Southern California. Concrete is crushed and recycled; metal is sent to scrap; clean wood goes to recycling centers. No surprise disposal charges at the end of the job — it\'s all in your quote.',
    },
    {
      q: 'How quickly can C&S Demolition start a project?',
      a: 'For projects that don\'t require permits (many shed, fence, and flooring removal jobs), we can often schedule within a few days of your estimate. Permitted projects depend on city processing times — we advise you on realistic timelines upfront. Most permitted projects in Orange County and LA County start within 1–3 weeks of estimate approval.',
    },
    {
      q: 'What is the difference between selective demolition and full demolition?',
      a: 'Selective demolition means removing specific elements (a wall, a floor, cabinets, a chimney) while preserving the surrounding structure. Full demolition means tearing down the entire structure. C&S Demolition specializes in both. Selective demo is common in remodeling projects where precision matters — we use hand tools alongside equipment to avoid damaging adjacent finishes.',
    },
  ];

  return (
    <>
      <Head>
        <title>Demolition Contractor in Southern California | C&amp;S Demolition</title>
        <meta
          name="description"
          content={`Licensed demolition contractor serving ${totalCities}+ cities in Southern California. Interior demo, concrete breaking, garage teardown, and more. Free estimates. Call (562) 204-6335.`}
        />
        <link rel="canonical" href="https://cnsdemo.com" />
        <meta property="og:title" content="Demolition Contractor in Southern California | C&S Demolition" />
        <meta property="og:description" content={`Licensed CA demolition contractor serving ${totalCities}+ SoCal cities. Interior demo, concrete, and more. Free estimates. (562) 204-6335.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cnsdemo.com" />
        <meta property="og:image" content="https://cnsdemo.com/api/og?title=Demolition+Contractor+in+Southern+California&sub=CA+License+%231126325+%C2%B7+123%2B+SoCal+Cities&type=home" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://cnsdemo.com/api/og?title=Demolition+Contractor+in+Southern+California&sub=CA+License+%231126325+%C2%B7+123%2B+SoCal+Cities&type=home" />
        <meta name="twitter:image:alt" content="Demolition Contractor in Southern California — C&S Demolition, CA Lic #1126325" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["LocalBusiness", "HomeAndConstructionBusiness", "GeneralContractor"],
              "@id": "https://cnsdemo.com/#business",
              "name": "C&S Demolition",
              "alternateName": "Scrapit LLC",
              "legalName": "Scrapit LLC",
              "description": `C&S Demolition (License #1126325) is a California-licensed demolition contractor serving ${totalCities}+ cities across Southern California. We specialize in residential and commercial demolition, interior demo, concrete breaking, and all types of teardown work throughout Orange County, Los Angeles County, Riverside County, and San Bernardino County.`,
              "url": "https://cnsdemo.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://cnsdemo.com/logo.svg",
                "width": 300,
                "height": 60
              },
              "image": "https://cnsdemo.com/api/og?title=Demolition+Contractor+in+Southern+California&sub=CA+License+%231126325+%C2%B7+123%2B+SoCal+Cities&type=home",
              "telephone": "+15622046335",
              "email": "contactus@cnsdemo.com",
              "license": "1126325",
              "slogan": "Licensed. Insured. All-Inclusive.",
              "priceRange": "$$",
              "paymentAccepted": "Cash, Check, Credit Card, Zelle",
              "currenciesAccepted": "USD",
              "areaServed": [
                { "@type": "AdministrativeArea", "name": "Orange County, CA" },
                { "@type": "AdministrativeArea", "name": "Los Angeles County, CA" },
                { "@type": "AdministrativeArea", "name": "Riverside County, CA" },
                { "@type": "AdministrativeArea", "name": "San Bernardino County, CA" }
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Long Beach",
                "addressRegion": "CA",
                "postalCode": "90802",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 33.7701,
                "longitude": -118.1937
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
                  "opens": "07:00",
                  "closes": "18:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Saturday",
                  "opens": "08:00",
                  "closes": "16:00"
                }
              ],
              "sameAs": [
                "https://www.yelp.com/biz/cns-demolition",
                "https://www.facebook.com/cnsdemo",
                "https://www.bbb.org/us/ca/long-beach/profile/demolition-contractors",
                "https://www.linkedin.com/company/cns-demolition"
              ],
              "knowsAbout": [
                "Demolition Contracting", "Interior Demolition",
                "Concrete Removal", "Selective Demolition", "Commercial Demolition",
                "California Building Permits", "Asbestos Abatement Coordination"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Demolition Services",
                "itemListElement": services.map((s) => ({
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": s.service_name,
                    "description": s.description,
                    "provider": { "@type": "LocalBusiness", "name": "C&S Demolition" }
                  }
                }))
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqs.map((faq) => ({
                "@type": "Question",
                "name": faq.q,
                "acceptedAnswer": { "@type": "Answer", "text": faq.a }
              }))
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://cnsdemo.com/#website",
              "name": "C&S Demolition",
              "url": "https://cnsdemo.com",
              "description": "California-licensed demolition contractor serving 123+ cities across Southern California. Interior demo, concrete removal, garage teardown, and more.",
              "inLanguage": "en-US",
              "publisher": { "@id": "https://cnsdemo.com/#business" }
            })
          }}
        />
      </Head>
      <div className={`${display.variable} ${body.variable} font-barlow text-brand-ink`}>
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-16 sm:pt-20 text-center">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="font-display font-extrabold uppercase leading-[1.02] text-[clamp(2.3rem,6vw,4.6rem)] [text-wrap:balance] cns-lift">
              Licensed Southern California <span className="text-brand-red">Demolition</span> Contractor
            </h1>
            <p className="max-w-[62ch] mx-auto mt-6 text-brand-ink-2 text-lg cns-lift [animation-delay:.08s]">
              Commercial interior demo, whole-house teardowns, concrete and block wall removal across Los Angeles, Orange, Riverside and San Bernardino counties. One lump-sum bid, and the site left clean.
            </p>
            <div className="flex flex-wrap justify-center gap-3.5 mt-8 cns-lift [animation-delay:.16s]">
              <a href="#bid" className="font-display font-bold text-lg px-6 py-3 rounded-full bg-brand-red text-white border-2 border-brand-red hover:bg-brand-red-deep hover:border-brand-red-deep transition-colors">Request a bid</a>
              <a href="tel:+15622046335" className="font-display font-bold text-lg px-6 py-3 rounded-full text-brand-red bg-white border-2 border-brand-red hover:bg-brand-red-tint transition-colors">Call (562) 204-6335</a>
            </div>
          </div>
          <div className="mt-14 grid grid-cols-2 md:grid-cols-[1.2fr_1fr_1fr_1.2fr] gap-1.5 md:h-[clamp(220px,34vw,420px)]" aria-label="Recent C&S Demolition job sites">
            {HERO_PHOTOS.map((p) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={p.src} src={p.src} alt={p.alt} className="w-full h-full object-cover aspect-[4/3] md:aspect-auto" />
            ))}
          </div>
        </section>

        {/* Intro + facts */}
        <section className="py-[clamp(64px,9vw,112px)]">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-14 items-center">
              <div>
                <span className="inline-flex items-center gap-2.5 font-semibold text-brand-red text-[15px] before:content-[''] before:w-1 before:h-[18px] before:bg-brand-red before:rounded-sm">
                  Welcome to C&amp;S Demolition
                </span>
                <h2 className="font-display font-extrabold text-[clamp(2.2rem,4.6vw,3.8rem)] leading-[1.02] mt-3.5 [text-wrap:balance]">
                  A local crew that bids it straight <span className="text-brand-red">and cleans up after.</span>
                </h2>
                <p className="text-brand-ink-2 max-w-[60ch] mt-5">
                  We&apos;re a licensed Southern California demolition contractor working for general contractors, property managers and homeowners. You get a written lump-sum price, a crew that shows up when we said, and debris hauled and recycled, not left in a pile.
                </p>
                <p className="text-brand-ink-2 max-w-[60ch] mt-4">Send us plans and we&apos;ll bid from them. No plans? We&apos;ll walk the site.</p>
              </div>
              <div className="justify-self-center relative w-[min(300px,80vw)] aspect-square rounded-full border-[3px] border-brand-red grid place-items-center text-center" aria-hidden="true">
                <svg viewBox="0 0 300 300" className="absolute inset-0 w-full h-full cns-spin">
                  <defs><path id="cns-ring" d="M150,150 m-122,0 a122,122 0 1,1 244,0 a122,122 0 1,1 -244,0" /></defs>
                  <text className="font-display" fontWeight={700} fontSize={13} letterSpacing="2.3" fill="#C4262E">
                    <textPath href="#cns-ring">LICENSED · BONDED · INSURED · SOUTHERN CALIFORNIA · </textPath>
                  </text>
                </svg>
                <div>
                  <b className="block font-display text-[clamp(2.2rem,5vw,3.1rem)] leading-none">CSLB</b>
                  <b className="block font-display text-[clamp(2.2rem,5vw,3.1rem)] leading-none text-brand-red">#1126325</b>
                  <small className="block font-semibold text-brand-ink-2 mt-1.5 text-sm">Demolition contractor</small>
                </div>
              </div>
            </div>
            <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 border-y border-brand-line">
              {FACTS.map(([title, sub], i) => (
                <div key={title} className={`p-6 ${i % 2 ? 'border-l border-brand-line' : ''} ${i === 2 ? 'lg:border-l lg:border-brand-line' : ''} ${i > 1 ? 'border-t lg:border-t-0 border-brand-line' : ''}`}>
                  <b className="block font-display text-2xl font-extrabold">{title}</b>
                  <span className="text-brand-ink-2 text-[15px]">{sub}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[15px] text-brand-ink-2">
              <span className="text-brand-red font-bold">★★★★★</span> 5.0 on Google.{' '}
              <a href={GOOGLE_LISTING_URL} target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-brand-red underline-offset-4">Read our reviews</a>
            </p>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="bg-brand-bg-2 py-[clamp(64px,9vw,112px)]">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-wrap justify-between items-end gap-6 mb-10">
              <h2 className="font-display font-extrabold text-[clamp(2.2rem,4.6vw,3.8rem)] leading-[1.02]">What we <span className="text-brand-red">tear out</span></h2>
              <p className="max-w-[46ch] text-brand-ink-2">From a single block wall to a full retail gut on night shifts. Same crew, same written scope.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SERVICE_CARDS.map((c) => (
                <Link key={c.title} href={c.href} className={`group relative min-h-[400px] lg:min-h-[460px] rounded-2xl overflow-hidden text-white flex items-end isolate ${c.wide ? 'sm:col-span-2' : ''}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.img} alt={c.alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover -z-20 transition-transform duration-700 group-hover:scale-[1.04]" />
                  <span className="absolute inset-0 -z-10 bg-gradient-to-t from-[rgba(26,20,19,0.92)] via-[rgba(26,20,19,0.55)] to-[rgba(26,20,19,0.05)]" />
                  <div className="p-7">
                    <h3 className="font-display font-extrabold text-[clamp(1.9rem,2.6vw,2.3rem)] leading-[1.05]">{c.title}</h3>
                    <ul className="mt-3.5 text-[15.5px] leading-snug space-y-1.5">
                      {c.items.map((it) => (
                        <li key={it} className="relative pl-[22px] before:content-[''] before:absolute before:left-0 before:top-[.62em] before:w-3 before:h-[3px] before:bg-brand-red before:rounded-sm">{it}</li>
                      ))}
                    </ul>
                  </div>
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mt-10">
              {services.map((s) => (
                <Link key={s.service_slug} href={`/demolition/${s.service_slug}`} className="text-sm bg-white border border-brand-line hover:border-brand-red hover:text-brand-red px-3.5 py-1.5 rounded-full transition-colors">
                  {s.service_name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Before / after */}
        <section className="py-[clamp(64px,9vw,112px)]">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-wrap justify-between items-end gap-6 mb-10">
              <h2 className="font-display font-extrabold text-[clamp(2.2rem,4.6vw,3.8rem)] leading-[1.02]">Before <span className="text-brand-red">&amp;</span> after</h2>
              <p className="max-w-[46ch] text-brand-ink-2">Drag the slider. A fire-damaged house in Crestline, cleared to dirt.</p>
            </div>
            <BeforeAfter />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mt-3">
              {GALLERY.map((g) => (
                <figure key={g.src} className="m-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.src} alt={g.alt} loading="lazy" className="aspect-[4/3] object-cover w-full rounded-xl" />
                  <figcaption className="text-sm text-brand-ink-2 mt-1.5">{g.caption}</figcaption>
                </figure>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/gallery" className="font-semibold text-brand-red hover:underline underline-offset-4">See more of our work →</Link>
            </div>
          </div>
        </section>

        {/* Bid form */}
        <section id="bid" className="bg-brand-bg-2 py-[clamp(64px,9vw,112px)] scroll-mt-16">
          <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-[1fr_1.1fr] gap-14 items-start">
            <div>
              <span className="inline-flex items-center gap-2.5 font-semibold text-brand-red text-[15px] before:content-[''] before:w-1 before:h-[18px] before:bg-brand-red before:rounded-sm">Get a bid</span>
              <h2 className="font-display font-extrabold text-[clamp(2.2rem,4.6vw,3.8rem)] leading-[1.02] mt-3.5">Tell us what&apos;s <span className="text-brand-red">coming down.</span></h2>
              <p className="text-brand-ink-2 max-w-[48ch] mt-5">Send plans, photos or a short description. We&apos;ll get back to you with questions or a lump-sum price.</p>
              <dl className="grid sm:grid-cols-2 gap-x-7 gap-y-6 mt-9">
                <div><dt className="font-semibold text-[15px] text-brand-ink-2">Call</dt><dd className="font-display text-[22px] font-bold mt-1"><a href="tel:+15622046335">(562) 204-6335</a></dd></div>
                <div><dt className="font-semibold text-[15px] text-brand-ink-2">Email</dt><dd className="font-display text-[22px] font-bold mt-1 break-all"><a href="mailto:contactus@cnsdemo.com">contactus@cnsdemo.com</a></dd></div>
                <div><dt className="font-semibold text-[15px] text-brand-ink-2">Service area</dt><dd className="font-display text-[22px] font-bold mt-1">{counties.length} SoCal counties</dd></div>
                <div><dt className="font-semibold text-[15px] text-brand-ink-2">License</dt><dd className="font-display text-[22px] font-bold mt-1">CSLB #1126325</dd></div>
              </dl>
            </div>
            <HomeBidForm />
          </div>
        </section>

        {/* Service areas */}
        <section className="py-[clamp(56px,7vw,88px)]">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-display font-extrabold text-[clamp(2rem,3.6vw,3rem)] leading-[1.05]">Where we <span className="text-brand-red">work</span></h2>
            <p className="text-brand-ink-2 mt-3 max-w-[60ch]">{totalCities}+ cities across {counties.length} Southern California counties. Pick a county to see cities and services.</p>
            <div className="flex flex-wrap gap-3 mt-7">
              {counties.map((county) => (
                <Link key={county} href={`/county/${county.toLowerCase().replace(/ /g, '-')}`} className="font-display font-bold text-lg px-5 py-2.5 rounded-full border-2 border-brand-line hover:border-brand-red hover:text-brand-red transition-colors">
                  {county} County
                </Link>
              ))}
              <Link href="/service-areas" className="font-display font-bold text-lg px-5 py-2.5 text-brand-red hover:underline underline-offset-4">All {totalCities}+ cities →</Link>
            </div>
          </div>
        </section>

        {/* Guides */}
        <section className="bg-brand-bg-2 py-[clamp(56px,7vw,88px)]">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-wrap justify-between items-end gap-6 mb-8">
              <h2 className="font-display font-extrabold text-[clamp(2rem,3.6vw,3rem)] leading-[1.05]">Guides <span className="text-brand-red">&amp;</span> articles</h2>
              <Link href="/blog" className="font-semibold text-brand-red hover:underline underline-offset-4">All articles →</Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {latestPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="bg-white border border-brand-line rounded-2xl p-6 hover:border-brand-red transition-colors flex flex-col">
                  <span className="text-sm font-semibold text-brand-red mb-2">{post.category}</span>
                  <h3 className="font-display font-bold text-xl leading-snug flex-1">{post.title.replace(' | C&S Demolition', '')}</h3>
                  <p className="text-sm text-brand-ink-2 mt-2 line-clamp-2">{post.excerpt}</p>
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {categories.map((cat) => (
                <Link key={cat} href={`/blog/category/${categoryToSlug(cat)}`} className="text-sm bg-white border border-brand-line hover:border-brand-red hover:text-brand-red px-3.5 py-1.5 rounded-full transition-colors">{cat}</Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-[clamp(56px,7vw,88px)]">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="font-display font-extrabold text-[clamp(2rem,3.6vw,3rem)] leading-[1.05] mb-8">Common questions</h2>
            <div className="divide-y divide-brand-line border-y border-brand-line">
              {faqs.map((faq) => (
                <details key={faq.q} className="group py-5">
                  <summary className="font-display font-bold text-xl cursor-pointer list-none flex justify-between items-center gap-4">
                    {faq.q}
                    <span className="text-brand-red text-2xl transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-brand-ink-2 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <style jsx global>{`
        @keyframes cns-lift { from { transform: translateY(14px); } to { transform: none; } }
        @keyframes cns-spin { to { transform: rotate(360deg); } }
        .cns-lift { animation: cns-lift .9s cubic-bezier(.22,1,.36,1) both; }
        .cns-spin { animation: cns-spin 40s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .cns-lift, .cns-spin { animation: none !important; } }
      `}</style>
      </div>
    </>
  );
}

function BeforeAfter() {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-brand-line select-none">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/projects/crestline_fire_demo_before_1.jpg" alt="Crestline house before demolition" className="absolute inset-0 w-full h-full object-cover" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/projects/crestline_fire_demo_after_7.jpg" alt="Crestline lot after demolition, cleared" className="absolute inset-0 w-full h-full object-cover" style={{ clipPath: `inset(0 0 0 ${pos}%)` }} />
      <span className="absolute top-3.5 left-3.5 px-3 py-1.5 rounded-full bg-white text-sm font-semibold pointer-events-none">Before</span>
      <span className="absolute top-3.5 right-3.5 px-3 py-1.5 rounded-full bg-white text-sm font-semibold pointer-events-none">After</span>
      <div className="absolute top-0 bottom-0 w-[3px] bg-white -translate-x-1/2 pointer-events-none" style={{ left: `${pos}%` }}>
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-brand-red text-white grid place-items-center text-xl">⇆</span>
      </div>
      <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))} aria-label="Compare before and after" className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize m-0" />
    </div>
  );
}

const GOOGLE_LISTING_URL = 'https://www.google.com/maps/place/?q=place_id:ChIJQ2nILkGFumUR_lO7TYcl4CM';

const HERO_PHOTOS = [
  { src: '/images/projects/commercial_warehouse_demo_wall_2826.jpg', alt: 'Warehouse interior wall coming down inside a cleared commercial space' },
  { src: '/images/projects/crestline_fire_demo_excavator_4.jpg', alt: 'Excavator clearing a fire-damaged house in Crestline' },
  { src: '/images/projects/chino_hills_asphalt_milling_2700.jpg', alt: 'Asphalt being broken up and removed in Chino Hills' },
  { src: '/images/projects/venice_garage_demo_after_4.jpg', alt: 'Venice lot cleared after a detached garage was removed' },
];

const FACTS: [string, string][] = [
  ['CSLB #1126325', 'California licensed contractor'],
  ['$100K worker bond', 'LLC employee bond on file with CSLB'],
  ['SB (Micro) certified', 'California small business'],
  ['4 counties', 'LA, Orange, Riverside, San Bernardino'],
];

const SERVICE_CARDS = [
  { title: 'Commercial & Interior Demolition', href: '/demolition/commercial-demolition', wide: true, img: '/images/projects/commercial_warehouse_demo_containment_2151.jpg', alt: 'Plastic containment set up inside a warehouse before interior demolition', items: ['Retail, office and warehouse interior gut-outs', 'Night shifts in occupied malls and centers', 'Dust containment and HEPA air scrubbers', 'Ceilings, walls, flooring and fixtures to the slab'] },
  { title: 'Whole-House & Garage Teardowns', href: '/demolition/whole-house-demolition', img: '/images/projects/crestline_fire_demo_before_1.jpg', alt: 'Fire-damaged house in Crestline before demolition', items: ['Houses, garages, ADUs and additions', 'Fire-damaged structures', 'Foundations and slabs out'] },
  { title: 'Concrete & Block Walls', href: '/demolition/concrete-removal', img: '/images/projects/pasadena_concrete_IMG_4590_upright.jpg', alt: 'Concrete being broken out in a Pasadena yard', items: ['Driveways, patios and slabs', 'Block walls and footings, by hand or machine', 'Asphalt and tennis courts'] },
  { title: 'Kitchens, Baths & Floors', href: '/demolition/kitchen-demolition', img: '/images/projects/encino_interior_demo_12.jpg', alt: 'Kitchen and interior finishes removed in an Encino home', items: ['Remodel strip-outs to studs', 'Tile, glue-down wood and LVP', 'Drywall, plaster and stucco'] },
  { title: 'Yard & Site Clearing', href: '/demolition/shed-demolition', img: '/images/projects/shed_demo_framing_8765.jpg', alt: 'Wood-framed shed being taken down', items: ['Sheds, patio covers and pergolas', 'Carports and decks', 'Chimneys and fireplaces'] },
];

const GALLERY = [
  { src: '/images/projects/commercial_warehouse_demo_cleared_2850.jpg', alt: 'Warehouse interior cleared after demolition', caption: 'Warehouse interior, cleared' },
  { src: '/images/projects/chino_hills_asphalt_after_2706.jpg', alt: 'Chino Hills lot after asphalt removal', caption: 'Asphalt removal, Chino Hills' },
  { src: '/images/projects/pasadena_concrete_after_IMG_4589_upright.jpg', alt: 'Pasadena yard after concrete removal', caption: 'Concrete out, Pasadena' },
  { src: '/images/projects/venice_garage_demo_before_1.jpg', alt: 'Venice detached garage before demolition', caption: 'Garage teardown, Venice' },
];

// High-value cost guides pinned in the homepage Resource Center grid,
// ahead of the latest posts.
const FEATURED_GUIDE_SLUGS = ['whole-house-demolition-cost', 'concrete-demolition-cost-guide'];

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const allPosts = getBlogPosts();
  const featuredGuides = FEATURED_GUIDE_SLUGS
    .map((slug) => allPosts.find((p) => p.slug === slug))
    .filter((p): p is BlogPost => Boolean(p));
  const latestPosts = [
    ...featuredGuides,
    ...allPosts
      .filter((p) => !FEATURED_GUIDE_SLUGS.includes(p.slug))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
  ].slice(0, 3);

  return {
    props: {
      counties: getCounties(),
      totalCities: getCities().length,
      services: getServices(),
      latestPosts,
      categories: getBlogCategories(),
    },
  };
};
