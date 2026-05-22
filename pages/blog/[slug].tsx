import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getBlogPosts, getBlogPostBySlug, getServices, BlogPost, Service } from '../../lib/getData';

interface BlogPostProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
  services: Service[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function estimateWordCount(post: BlogPost): number {
  const allText = post.sections.map((s) => s.heading + ' ' + s.body).join(' ');
  return Math.round(allText.replace(/\s+/g, ' ').split(' ').length);
}

function estimateReadTime(post: BlogPost): number {
  return Math.max(1, Math.round(estimateWordCount(post) / 200));
}

function headingToQuestion(heading: string): string {
  const trimmed = heading.trim();
  if (trimmed.endsWith('?')) return trimmed;
  const lower = trimmed.toLowerCase();
  const starters = ['why ', 'how ', 'what ', 'when ', 'where ', 'which ', 'is ', 'are ', 'do ', 'does ', 'can ', 'should ', 'will ', 'who '];
  if (starters.some((s) => lower.startsWith(s))) return `${trimmed}?`;
  return `What should you know about ${lower}?`;
}

function generateBlogFAQs(post: BlogPost) {
  const skipKeywords = ['call c&s', 'free estimate', 'contact us', 'schedule', 'get a free', 'ready to', 'call us'];
  return post.sections
    .filter((s) => {
      const h = s.heading.toLowerCase();
      return !skipKeywords.some((kw) => h.includes(kw));
    })
    .slice(0, 5)
    .map((section) => ({
      q: headingToQuestion(section.heading),
      a: section.body.split('\n\n')[0].replace(/\n/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 600),
    }));
}

function buildHowToSchema(post: BlogPost) {
  const steps = post.sections.filter((s) => {
    const h = s.heading.toLowerCase();
    const skip = ['call c&s', 'free estimate', 'contact us', 'schedule', 'get a free', 'ready to'];
    return !skip.some((kw) => h.includes(kw));
  });
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: post.title.replace(' | C&S Demolition', ''),
    description: post.excerpt,
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: 'Varies by project — call for free estimate',
    },
    totalTime: `PT${estimateReadTime(post) + 30}M`,
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.heading,
      text: s.body.split('\n\n')[0].replace(/\n/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 500),
    })),
  };
}

// ─── Extended guide content per category (adds depth / word count to thin posts) ─

interface ExtendedSection {
  heading: string;
  body: string;
}

function generateExtendedGuide(post: BlogPost): ExtendedSection[] {
  const slug = post.slug;
  const isPool = slug.includes('pool');
  const isInterior = slug.includes('interior') || slug.includes('kitchen') || slug.includes('bathroom') || slug.includes('wall');
  const isConcrete = slug.includes('concrete') || slug.includes('driveway');
  const isGarage = slug.includes('garage') || slug.includes('shed');
  const isCommercial = slug.includes('commercial');
  const isHouse = slug.includes('house') || slug.includes('whole');

  if (post.category === 'Cost Guides') {
    const serviceType = isPool ? 'pool demolition' : isInterior ? 'interior demolition' : isConcrete ? 'concrete removal' : isGarage ? 'garage demolition' : isHouse ? 'house demolition' : isCommercial ? 'commercial demolition' : 'demolition';
    return [
      {
        heading: 'What Drives Demolition Costs in Southern California',
        body: `Several factors consistently affect ${serviceType} pricing across Orange County, Los Angeles County, Riverside, and San Bernardino. The most significant is project size — more square footage means more labor hours, more equipment time, and more disposal volume. A single bathroom demolition in Anaheim might cost $900 while a full-home interior gut in Irvine runs $12,000 or more.\n\nHazardous materials are a major cost driver. California requires asbestos testing before demolition of structures built before 1980. If asbestos or lead paint is found, abatement must happen before any teardown work begins. Abatement runs $1,500–$8,000 depending on the extent of contamination. Most properties in older SoCal neighborhoods (pre-1980 builds in Long Beach, Pasadena, Santa Ana) carry at least some risk.\n\nPermit requirements add both time and cost. Most cities in Southern California require demolition permits — Orange County cities like Anaheim and Santa Ana charge $150–$600 for residential permits. Los Angeles permits run higher, often $400–$1,200. Cities like Irvine and Chino Hills have efficient online permit systems; others require in-person filings. C&S Demolition handles this process and includes permit fees in project estimates.`,
      },
      {
        heading: 'How to Get the Best Price on Your Demolition Project',
        body: `The single most effective way to control costs is to get multiple on-site estimates rather than phone quotes. Phone quotes for demolition are notoriously inaccurate — contractors can't assess asbestos risk, access limitations, or concrete thickness over the phone. An on-site estimate takes 30–45 minutes and gives you a written lump-sum price you can actually compare.\n\nTiming affects pricing. Demolition contractors in Southern California are busiest in spring and early summer (March–June) when renovation season peaks. Projects scheduled in late summer or fall often get more competitive pricing and faster start dates. Emergency or same-week demolition always costs more — give contractors at least one week of lead time when possible.\n\nBundle work when you can. If you need multiple types of demolition (a garage teardown plus a concrete driveway removal), bundling with one contractor is almost always cheaper than hiring two separate crews. The setup, equipment mobilization, and disposal run costs are shared across the full scope.`,
      },
      {
        heading: 'Questions to Ask Your Demolition Contractor',
        body: `Before hiring any demolition contractor in California, ask these questions: Are you licensed with the California Contractors State License Board (CSLB)? You can verify any contractor's license at cslb.ca.gov in 30 seconds. The license number should be on every estimate, invoice, and business card.\n\nAsk specifically whether permits are included. Some contractors offer low bids that exclude permit fees — this is a common bait-and-switch. A legitimate all-inclusive quote covers the permit application, inspection fees, and the contractor's time coordinating with the building department.\n\nAsk about debris disposal. "We'll haul it away" doesn't tell you much. Ask where the debris goes. Licensed disposal facilities (legal) cost more than illegal dumping — unscrupulous contractors can pass the lower cost to you initially, then you bear the liability when the waste shows up in an unpermitted dump site. C&S Demolition disposes at licensed SoCal facilities and provides documentation on request.`,
      },
    ];
  }

  if (post.category === 'How-To Guides') {
    return [
      {
        heading: 'Safety and Preparation Before Any Demolition Work',
        body: `Demolition is hazardous work even when it looks simple. Before any teardown begins, utilities must be properly handled. Electrical should be de-energized at the breaker and ideally disconnected at the panel for the affected circuits. Gas lines must be shut off at the meter and capped by a licensed plumber — not just closed at the appliance shutoff. Water should be shut off at the main if plumbing is involved.\n\nPersonal protective equipment (PPE) is non-negotiable: safety glasses, dust respirator (N95 minimum — P100 recommended for older structures), hard hat, work gloves, and steel-toed boots. Drywall and plaster dust contains silica — a known carcinogen. Pre-1980 materials may contain asbestos, which is invisible and odorless but extremely dangerous. If you're hiring a contractor, verify they use proper respiratory protection and containment.\n\nFor any structural element — load-bearing walls, floor joists, roof framing — do not proceed without a structural assessment. In California, permits are required for load-bearing wall removal and structural demolition. DIY permits are available for homeowners in some cities, but the inspection process is the same. Consult a structural engineer if you're not certain what's load-bearing.`,
      },
      {
        heading: 'Understanding the Demolition Permit Process in California',
        body: `California cities manage demolition permits through their local building departments. For residential demolition, the homeowner or a licensed contractor can pull the permit. Commercial demolition always requires a licensed contractor. The process typically involves submitting a permit application (online in most cities), paying permit fees, passing an asbestos/hazardous materials survey (required for pre-1980 structures), and scheduling a pre-demolition inspection.\n\nTimelines vary significantly by city. Irvine and Aliso Viejo (Orange County) have online permit systems and typically issue residential demolition permits in 5–10 business days. Los Angeles City permits can take 3–6 weeks depending on the project scope. Cities in the Inland Empire (Riverside, San Bernardino County) often process faster — 3–7 business days for straightforward projects.\n\nAfter demolition, a final inspection is required in most cities before the permit can be closed. Unpermitted demolition work is a serious liability — it can prevent property sale, invalidate homeowner's insurance, and result in fines. If you discover a prior owner did unpermitted demo work, a retroactive permit (and potentially a structural engineer letter) may be required before you can sell or refinance.`,
      },
      {
        heading: 'Choosing a Licensed Demolition Contractor in Southern California',
        body: `California requires demolition contractors to hold an active CSLB license. The two most common license types for demolition are C-21 (Building Moving/Demolition) and B (General Building Contractor). Verify that the contractor holds an active license at cslb.ca.gov before signing any contract.\n\nBeyond licensure, confirm the contractor carries general liability insurance (minimum $1M per occurrence) and workers' compensation insurance covering all employees. Ask for a certificate of insurance before work starts. If a worker is injured on your property and the contractor doesn't have workers' comp, you could be liable.\n\nGet at least two on-site estimates before committing. Compare the scope of work in each estimate carefully — make sure they include the same items (permits, debris haul-away, site cleanup). The lowest bid isn't always the best deal. Check reviews on Google, Yelp, and the CSLB's own complaint history before hiring.`,
      },
    ];
  }

  if (post.category === 'City Guides') {
    const cityName = post.slug
      .replace('-demolition', '').replace('-contractor', '')
      .split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      .replace(' Ca', '').trim();
    return [
      {
        heading: 'How Local Regulations Affect Demolition Projects in Southern California',
        body: `Every city in Southern California has its own building department, fee schedule, and permit requirements for demolition work. What's allowed in Anaheim may require additional steps in Santa Ana or Irvine. Cities in unincorporated areas of Los Angeles County are handled by the County's Department of Regional Planning and Building & Safety — a separate process from the 88 incorporated cities in LA County.\n\nSome cities have streamlined online permit portals (Irvine, Chino Hills, Riverside) while others still require in-person visits for demolition permit applications. Fees range from $150 for simple residential permits in smaller cities to $800+ in Los Angeles City for larger projects. Environmental review is required for commercial demolition near sensitive habitats or historical preservation zones.\n\nFor pre-1980 structures — common throughout most SoCal neighborhoods — South Coast Air Quality Management District (SCAQMD) Rule 1403 requires asbestos surveys and notification before any demolition begins. This applies to both residential and commercial projects and carries serious fines for non-compliance. A licensed contractor handles this process as standard practice.`,
      },
      {
        heading: 'The Demolition Permit Process: City-by-City Overview',
        body: `In Orange County, the permit process is relatively streamlined across most cities. Anaheim, Santa Ana, Irvine, Huntington Beach, and Fullerton all have online permit portals. Most residential demolition permits in OC are approved within 5–10 business days. Fees run $200–$600 for standard residential projects.\n\nLos Angeles County is more complex due to its size. LA City projects go through the Department of Building and Safety (LADBS), which has an online permit portal (permit.ladbs.org). Processing takes 2–6 weeks depending on project type. Cities like Long Beach, Torrance, and Pasadena have their own independent departments. Many LA County cities now accept online applications, but inspections still require in-person coordination.\n\nRiverside County and San Bernardino County cities tend to have faster processing — smaller workloads and efficient staffing. Cities like Riverside, Corona, Ontario, and Rancho Cucamonga typically turn around permits in 3–7 business days. Fee structures are lower than LA and OC, generally $150–$400 for residential demolition.`,
      },
      {
        heading: 'What to Expect When Hiring a Demolition Contractor Locally',
        body: `When getting estimates in Southern California, you should expect any reputable contractor to offer a free on-site visit rather than a phone quote. Demolition pricing is highly site-specific — access limitations, material composition, and proximity to neighboring structures all affect scope and cost in ways that can't be assessed remotely.\n\nExpect the estimate to cover permit handling. In most SoCal cities, a licensed contractor can pull permits on your behalf as your "contractor of record." This is the most common arrangement and removes the permit burden from you entirely. The contractor files the application, pays fees (included in your quote), schedules inspections, and obtains the final permit closure.\n\nTimeline expectations vary by project type. Simple shed demolitions or fence removals that don't require permits can often be scheduled same-week. Interior demolition requiring permits typically takes 1–3 weeks from estimate to work start. Pool demolition — which requires structural engineer reports in many cities — can take 3–6 weeks from permit filing to project start. Plan accordingly when coordinating with renovation contractors.`,
      },
    ];
  }

  if (post.category === 'Permits & Regulations') {
    return [
      {
        heading: 'California Demolition Law and Permit Requirements',
        body: `California law requires permits for most types of demolition work through the local city or county building department. The California Building Code (CBC) — which all California jurisdictions adopt with local amendments — governs demolition scope, safety requirements, and inspection protocols. However, enforcement and specific requirements vary significantly by city.\n\nFor residential demolition, the permit requirement threshold varies. Some cities require permits for any exterior structural demolition; others only require permits for work that affects load-bearing elements or exceeds a certain scope. Interior non-structural demolition (removing drywall, tile, cabinets) is permit-exempt in most California cities when performed as part of a remodel — but the renovation permit covers the work. When in doubt, call your city's building department to confirm requirements before starting.\n\nCommercial demolition always requires permits in California, regardless of scope. This includes tenant improvement demolition (office build-outs, retail teardowns), which requires both a building permit and compliance with SCAQMD Rule 1403 for pre-1980 buildings. The rule mandates asbestos surveys, notification, and proper abatement before any commercial demolition — violations carry fines up to $1,000 per day.`,
      },
      {
        heading: 'SCAQMD Rule 1403: What Every Southern California Property Owner Needs to Know',
        body: `South Coast Air Quality Management District Rule 1403 governs asbestos emissions from demolition and renovation activities across Los Angeles, Orange, Riverside, and San Bernardino counties. The rule requires property owners and contractors to: conduct an asbestos survey by an AHERA-certified inspector before any demolition begins; notify SCAQMD at least 10 working days before demolition starts (for commercial projects exceeding threshold quantities); and use licensed asbestos abatement contractors when asbestos-containing materials are identified.\n\nFor residential properties, the 10-day notification requirement applies to buildings with 5+ dwelling units. Single-family homes and smaller residential projects have simplified requirements but still must be surveyed and abated if asbestos is found. Older homes in cities like Compton, Hawthorne, Bellflower, and East LA commonly contain asbestos in floor tiles, drywall texture (popcorn ceilings), pipe insulation, and roofing materials.\n\nA pre-demolition asbestos survey costs $200–$600 for a typical single-family home and $500–$2,500 for commercial buildings. Lab analysis takes 3–7 business days. If abatement is required, add $1,500–$8,000+ depending on scope. C&S Demolition coordinates the survey and abatement vendors as part of every project — you get a single point of contact for the full process.`,
      },
      {
        heading: 'Common Permit Mistakes — and How to Avoid Them',
        body: `The most common permit mistake in Southern California is starting demolition without a permit and hoping for forgiveness later. This strategy rarely works. Building inspectors and code enforcement officers are active throughout LA, Orange County, and the Inland Empire. Unpermitted work is identified during property sales, refinancing appraisals, and neighbor complaints — all points when the consequences are expensive and time-sensitive.\n\nThe second most common mistake is relying on the seller's word that prior work was permitted. Always pull a property's permit history from the city's online records before buying or renovating. LADBS, Anaheim Building, and most SoCal cities have online permit search. If you find unpermitted demolition in a property you own, consult with a contractor or building official about retroactive permitting before beginning any new work — retroactive permits often require additional inspections and engineer letters.\n\nFor contractors: never start work before the permit is issued and posted on-site. Many permits are issued same-day online (Irvine, Chino Hills), but others require 5–10 business day review. Starting before permit issuance — even with an application pending — is a permit violation that can result in stop-work orders and doubled permit fees. Schedule project starts around permit processing timelines.`,
      },
    ];
  }

  if (post.category === 'Commercial') {
    return [
      {
        heading: 'Commercial Demolition in Southern California: What\'s Different',
        body: `Commercial demolition differs from residential in scope, regulation, and coordination requirements. Where a residential garage demo can often be completed in a day with a crew of 2–3, commercial buildout demolition in a multi-tenant office building requires coordination with property management, neighboring tenants, utility providers, and city building departments — often months of planning before a sledgehammer swings.\n\nThe regulatory layer is heavier. SCAQMD Rule 1403 requires written asbestos surveys and SCAQMD notification before any commercial demolition in Southern California. The notification — submitted 10 working days before demolition start — must include survey results, scope of work, and contractor license information. Projects that disturb more than 100 linear feet of asbestos-containing pipe insulation or more than 160 square feet of surface material require certified abatement contractors.\n\nCode compliance is also more complex. California Title 24 energy compliance, accessibility (ADA/CBC Chapter 11B), and fire code requirements all potentially apply to commercial demolition and rebuild projects. A commercial demolition contractor should be coordinating with your architect or GC to ensure the demo scope aligns with the rebuild plans and any required building department pre-approvals.`,
      },
      {
        heading: 'Types of Commercial Demolition in Southern California',
        body: `Tenant improvement (TI) demolition is the most common commercial scope — removing the previous tenant's buildout to prepare for a new occupant or ownership. TI demo in Orange County and LA County office parks typically involves removing partitions, ceilings, flooring, HVAC drops, and electrical systems. A 5,000 sq ft office gut runs $8,000–$25,000 depending on material complexity and waste volumes.\n\nRetail demolition ranges from strip mall gut-outs to full-store teardowns. Retail spaces often have more complex flooring (polished concrete under carpet, multiple layered tile systems) and extensive electrical for point-of-sale systems. Anchor store demolitions in regional malls require working around live adjacent tenants — noise restrictions, working hours limits (typically 7AM–6PM), and dust containment are critical.\n\nIndustrial demolition — warehouses, manufacturing floors, equipment rooms — involves larger structural elements, heavier concrete slabs, and more complex hazmat profiles (lead paint on steel, PCBs in older transformers, hydraulic oil contamination). Industrial demo pricing varies widely: $5–$25+ per square foot depending on structure type and hazmat conditions. Engage a contractor with commercial insurance and SCAQMD compliance experience for any industrial project.`,
      },
      {
        heading: 'SCAQMD, AQMDs, and Environmental Compliance for Commercial Demo',
        body: `The South Coast Air Quality Management District (SCAQMD) governs air quality compliance for demolition in the four-county Southern California region: Los Angeles, Orange, Riverside, and San Bernardino. Rule 1403 — the primary demolition-related regulation — requires property owners to notify SCAQMD of any demolition involving asbestos-containing materials (ACMs) above threshold amounts.\n\nFor commercial demolition, the notification must be submitted online via SCAQMD's Electronic Reporting System (ERS) at least 10 working days before demolition begins. The notification requires: certified asbestos inspector's survey results, quantity and location of all ACMs, demolition start and completion dates, contractor name and license number, and abatement contractor information if ACMs exceed threshold quantities.\n\nCommon violations in commercial demolition include starting demolition before the 10-day notification period expires, failing to properly characterize materials (assuming something isn't ACM without testing), and using non-certified abatement contractors for work above threshold quantities. SCAQMD fines for Rule 1403 violations start at $1,000 per day and can reach $75,000 per violation for serious infractions. C&S Demolition handles all SCAQMD compliance documentation as part of every commercial demolition project.`,
      },
    ];
  }

  // Default extended guide for any category not matched
  return [
    {
      heading: 'Why Licensed Demolition Matters in California',
      body: `California's demolition industry is regulated by the CSLB (Contractors State License Board), which requires all contractors performing demolition work to hold an active license. Unlicensed demolition work is illegal in California — it also voids homeowner's insurance coverage for any damage that occurs during the work.\n\nA licensed contractor (like C&S Demolition, License #1126325) carries the required bonding and insurance, passes CSLB background checks, and meets California's minimum standards for contractor competency. You can verify any California contractor's license at cslb.ca.gov in 30 seconds. If a contractor can't provide a license number that verifies as active, don't hire them.\n\nBeyond the license, look for general liability insurance (minimum $1M per occurrence) and workers' compensation coverage. A Certificate of Insurance should be available before work begins. If a worker is injured on your property and the contractor doesn't have workers' comp, California law can make you liable for the worker's medical costs and lost wages.`,
    },
    {
      heading: 'Planning Your Demolition Project: A Step-by-Step Overview',
      body: `Start with an on-site estimate. Phone quotes for demolition are guesswork — a contractor can't accurately price a project without seeing the site, assessing access, and evaluating material conditions. Good contractors provide free on-site estimates with written quotes on the same day.\n\nOnce you've selected a contractor, confirm permit requirements before setting a start date. In most Southern California cities, demolition permits take 3–10 business days to process (commercial permits often longer). Your contractor should handle the permit application — this is standard practice and the permit fees should be included in your quote.\n\nSchedule your project around the permit timeline and any downstream renovation contractors. If you're doing a kitchen remodel, the demo contractor should finish and clear the site before the tile contractor arrives. Coordinate these schedules upfront to avoid costly delays. Most demolition contractors in SoCal can mobilize within 3–5 days of permit issuance.`,
    },
  ];
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function BlogPostPage({ post, relatedPosts, services }: BlogPostProps) {
  const cleanTitle = post.title.replace(' | C&S Demolition', '');
  const extGuide = generateExtendedGuide(post);
  const extWordCount = extGuide.reduce((acc, s) => acc + s.body.split(/\s+/).length + s.heading.split(/\s+/).length, 0);
  const baseWordCount = estimateWordCount(post);
  const wordCount = baseWordCount + extWordCount;
  const readTime = Math.max(1, Math.round(wordCount / 200));
  const faqs = generateBlogFAQs(post);
  const isHowTo = post.category === 'How-To Guides';
  const showToC = post.sections.length >= 4 || extGuide.length > 0;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': ['Article', 'TechArticle'],
    headline: cleanTitle,
    description: post.meta_description,
    datePublished: post.date,
    dateModified: post.date,
    wordCount,
    inLanguage: 'en-US',
    author: {
      '@type': 'Person',
      name: 'C&S Demolition Team',
      jobTitle: 'Licensed Demolition Contractor',
      worksFor: {
        '@type': 'Organization',
        name: 'C&S Demolition',
        url: 'https://cnsdemo.com',
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'C&S Demolition',
      url: 'https://cnsdemo.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cnsdemo.com/logo.png',
      },
    },
    url: `https://cnsdemo.com/blog/${post.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://cnsdemo.com/blog/${post.slug}`,
    },
    keywords: post.title
      .replace(' | C&S Demolition', '')
      .split(/\s+/)
      .filter((w) => w.length > 4)
      .join(', '),
    about: {
      '@type': 'Thing',
      name: 'Demolition Services in Southern California',
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cnsdemo.com' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://cnsdemo.com/blog' },
        { '@type': 'ListItem', position: 3, name: post.category, item: `https://cnsdemo.com/blog/category/${post.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}` },
        { '@type': 'ListItem', position: 4, name: cleanTitle, item: `https://cnsdemo.com/blog/${post.slug}` },
      ],
    },
  };

  const faqSchema = faqs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      }
    : null;

  const howToSchema = isHowTo ? buildHowToSchema(post) : null;

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.meta_description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://cnsdemo.com/blog/${post.slug}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.meta_description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://cnsdemo.com/blog/${post.slug}`} />
        <meta property="og:image" content={`https://cnsdemo.com/api/og?title=${encodeURIComponent(cleanTitle)}&sub=${encodeURIComponent(post.category + ' · C&S Demolition')}&type=blog`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`https://cnsdemo.com/api/og?title=${encodeURIComponent(cleanTitle)}&sub=${encodeURIComponent(post.category + ' · C&S Demolition')}&type=blog`} />
        <meta name="twitter:image:alt" content={`${cleanTitle} — C&S Demolition`} />
        <meta name="author" content="C&S Demolition Team" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:modified_time" content={post.date} />
        <meta property="article:author" content="C&S Demolition Team" />
        <meta property="article:section" content={post.category} />
        <meta property="article:tag" content={post.category} />
        <meta property="article:tag" content="Demolition" />
        <meta property="article:tag" content="Southern California" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
        {howToSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />}
      </Head>

      <Header />

      <main>
        {/* Hero */}
        <section className="bg-brand-dark text-white py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <nav className="text-sm text-gray-400 mb-5 flex flex-wrap gap-1">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-white">Blog</Link>
              <span>/</span>
              <Link href={`/blog/category/${post.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`} className="hover:text-white">{post.category}</Link>
            </nav>
            <Link
              href={`/blog/category/${post.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
              className="text-brand-orange text-xs font-bold uppercase tracking-widest mb-3 block hover:text-orange-300 transition-colors"
            >
              {post.category}
            </Link>
            <h1 className="text-4xl font-bold mb-4 leading-tight">{cleanTitle}</h1>
            <p className="text-gray-300 text-lg mb-4">{post.excerpt}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <span>
                {new Date(post.date + 'T12:00:00').toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span>·</span>
              <span>{readTime} min read</span>
              <span>·</span>
              <span>{wordCount.toLocaleString()} words</span>
              <span>·</span>
              <span>C&amp;S Demolition</span>
            </div>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 py-12">

          {/* Table of Contents */}
          {showToC && (
            <nav className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-10">
              <p className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">In This Article</p>
              <ol className="space-y-1.5">
                {post.sections
                  .filter((s) => {
                    const h = s.heading.toLowerCase();
                    return !['call c&s', 'free estimate', 'contact us', 'ready to', 'get a free'].some((kw) => h.includes(kw));
                  })
                  .map((section, i) => (
                    <li key={i}>
                      <a
                        href={`#section-${i}`}
                        className="text-sm text-brand-orange hover:underline leading-snug"
                      >
                        {i + 1}. {section.heading}
                      </a>
                    </li>
                  ))}
                {extGuide.map((section, i) => (
                  <li key={`ext-${i}`}>
                    <a
                      href={`#ext-section-${i}`}
                      className="text-sm text-brand-orange hover:underline leading-snug"
                    >
                      {post.sections.length + i + 1}. {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {post.sections.map((section, i) => {
              const isCTA = ['call c&s', 'free estimate', 'contact us', 'ready to', 'get a free'].some((kw) =>
                section.heading.toLowerCase().includes(kw)
              );
              return (
                <section key={i} id={`section-${i}`} className="mb-10">
                  <h2 className="text-2xl font-bold text-brand-dark mb-4">{section.heading}</h2>
                  {section.body.split('\n\n').map((para, j) => {
                    // Render numbered lists (lines starting with digits)
                    if (para.match(/^\d+\./m)) {
                      const lines = para.split('\n').filter(Boolean);
                      return (
                        <ol key={j} className="list-decimal list-inside text-gray-700 mb-4 space-y-1">
                          {lines.map((line, k) => (
                            <li key={k} className="leading-relaxed text-sm">{line.replace(/^\d+\.\s*/, '')}</li>
                          ))}
                        </ol>
                      );
                    }
                    // Render bullet lists (lines starting with -)
                    if (para.match(/^-\s/m)) {
                      const lines = para.split('\n').filter(Boolean);
                      return (
                        <ul key={j} className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                          {lines.map((line, k) => (
                            <li key={k} className="leading-relaxed text-sm">{line.replace(/^-\s*/, '')}</li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <p key={j} className="text-gray-700 mb-4 leading-relaxed">
                        {para}
                      </p>
                    );
                  })}
                  {/* Inline CTA after section 2 */}
                  {i === 1 && !isCTA && (
                    <div className="bg-brand-orange/10 border border-brand-orange/30 rounded-lg p-4 my-6 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-sm">Need a free demolition estimate?</p>
                        <p className="text-xs text-gray-600">CA Licensed #1126325 · Serving 123+ SoCal Cities · Same-week availability</p>
                      </div>
                      <a
                        href="tel:+15622046335"
                        className="flex-shrink-0 bg-brand-orange text-white font-bold px-4 py-2 rounded-lg text-sm hover:bg-orange-600 transition-colors"
                      >
                        📞 (562) 204-6335
                      </a>
                    </div>
                  )}
                </section>
              );
            })}
          </div>

          {/* Extended Guide — supplementary depth content per category */}
          {extGuide.length > 0 && (
            <div className="mt-10">
              {extGuide.map((section, i) => (
                <section key={i} id={`ext-section-${i}`} className="mb-10">
                  <h2 className="text-2xl font-bold text-brand-dark mb-4">{section.heading}</h2>
                  {section.body.split('\n\n').map((para, j) => (
                    <p key={j} className="text-gray-700 mb-4 leading-relaxed">{para}</p>
                  ))}
                </section>
              ))}
            </div>
          )}

          {/* FAQ Section */}
          {faqs.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-dark mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <details key={i} className="border border-gray-200 rounded-lg p-5 group">
                    <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-gray-900">
                      {faq.q}
                      <span className="text-brand-orange ml-2 flex-shrink-0">+</span>
                    </summary>
                    <p className="mt-3 text-gray-700 text-sm leading-relaxed">{faq.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Main CTA box */}
          <div className="bg-brand-dark text-white rounded-xl p-8 my-12 text-center">
            <h3 className="text-2xl font-bold mb-3">Need a Demolition Estimate in Southern California?</h3>
            <p className="text-gray-300 mb-2">
              C&amp;S Demolition is a CA-licensed contractor (License #1126325) serving 123+ cities across Orange County, Los Angeles, Riverside, and San Bernardino Counties.
            </p>
            <p className="text-gray-400 text-sm mb-6">Free on-site estimates · Same-week availability · All-inclusive pricing</p>
            <a
              href="tel:+15622046335"
              className="inline-block bg-brand-orange text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-orange-600 transition-colors"
            >
              📞 (562) 204-6335 — Free Estimate
            </a>
          </div>

          {/* Author Bio — E-E-A-T signal */}
          <div className="border border-gray-200 rounded-xl p-6 mb-10 flex gap-4 items-start">
            <div className="flex-shrink-0 w-14 h-14 bg-brand-orange rounded-full flex items-center justify-center text-white font-bold text-xl">
              C&amp;S
            </div>
            <div>
              <p className="font-bold text-gray-900 mb-0.5">Written by the C&amp;S Demolition Team</p>
              <p className="text-xs text-brand-orange font-semibold mb-2 uppercase tracking-wide">CA Licensed Contractor · License #1126325</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                C&amp;S Demolition (DBA of Scrapit LLC) is a California-licensed demolition contractor based in Long Beach, serving Orange County, Los Angeles County, Riverside, and San Bernardino. Our content is written by field-experienced demolition professionals who handle permits, asbestos assessments, and complex teardown projects daily across Southern California.
              </p>
              <div className="flex gap-3 mt-3">
                <Link href="/services" className="text-xs text-brand-orange hover:underline">Our Services</Link>
                <Link href="/service-areas" className="text-xs text-brand-orange hover:underline">Service Areas</Link>
                <Link href="/contact" className="text-xs text-brand-orange hover:underline">Contact Us</Link>
              </div>
            </div>
          </div>

          {/* Related Services — internal linking hub */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-brand-dark mb-3">
              Demolition Services We Offer
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              C&amp;S Demolition handles every type of residential and commercial demolition across Southern California — licensed, insured, all-inclusive. Browse our services:
            </p>
            <div className="flex flex-wrap gap-2">
              {services.map((s) => (
                <Link
                  key={s.service_slug}
                  href={`/demolition/${s.service_slug}`}
                  className="text-sm border border-gray-200 hover:border-brand-orange hover:text-brand-orange px-3 py-1.5 rounded-full transition-colors"
                >
                  {s.service_name}
                </Link>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <Link href="/service-areas" className="text-brand-orange hover:underline font-medium">
                Browse 123+ service cities →
              </Link>
              <Link href="/contact" className="text-brand-orange hover:underline font-medium">
                Get a free estimate →
              </Link>
            </div>
          </section>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-brand-dark mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="border border-gray-200 rounded-xl p-5 hover:border-brand-orange transition-colors"
                  >
                    <span className="text-xs text-brand-orange font-semibold uppercase">{related.category}</span>
                    <h3 className="font-bold text-sm mt-1 leading-snug">
                      {related.title.replace(' | C&S Demolition', '')}
                    </h3>
                    <p className="text-xs text-gray-500 mt-2">{related.excerpt.slice(0, 80)}…</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}

// ─── Data Fetching ────────────────────────────────────────────────────────────

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getBlogPosts();
  return {
    paths: posts.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BlogPostProps> = async ({ params }) => {
  const post = getBlogPostBySlug(params?.slug as string);
  if (!post) return { notFound: true };

  const allPosts = getBlogPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  return { props: { post, relatedPosts, services: getServices() } };
};
