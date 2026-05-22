import { City, Service } from '../lib/getData';

export interface FAQ {
  q: string;
  a: string;
}

interface SchemaProps {
  city: City;
  service: Service;
  faqs?: FAQ[];
}

function buildHowToSteps(city: City, service: Service) {
  return [
    {
      name: 'Free On-Site Estimate',
      text: `We visit your ${city.city} property, measure the project, check for hazardous materials, and provide a written lump-sum estimate the same day — no obligation.`,
    },
    {
      name: 'Permit Filing',
      text: `We handle the complete permit application with ${city.permit_office || `the ${city.city} Building Department`} on your behalf. Permit fees are included in your quote.`,
    },
    {
      name: 'Site Preparation and Utility Disconnect',
      text: `Utilities to the work area are capped or disconnected. Dust barriers are set up and the perimeter is secured before any demolition begins.`,
    },
    {
      name: service.service_name,
      text: `Our ${city.city} crew performs the ${service.service_name.toLowerCase()} efficiently. Debris is loaded into trucks as work progresses. Most projects in ${city.city} complete in ${service.duration}.`,
    },
    {
      name: 'Debris Removal, Cleanup, and Permit Closeout',
      text: `All debris is hauled to licensed Southern California facilities. The site is left broom-clean. We coordinate final inspection and officially close the permit with ${city.permit_office || `${city.city} Building Department`}.`,
    },
  ];
}

export default function SchemaMarkup({ city, service, faqs }: SchemaProps) {
  const graph: object[] = [
    {
      '@type': ['LocalBusiness', 'HomeAndConstructionBusiness', 'GeneralContractor'],
      '@id': `https://cnsdemo.com/demolition/${service.service_slug}/${city.slug}#business`,
      name: 'C&S Demolition',
      alternateName: 'Scrapit LLC',
      legalName: 'Scrapit LLC',
      description: `C&S Demolition is a California-licensed contractor (License #1126325) specializing in ${service.service_name.toLowerCase()} and all types of residential and commercial demolition in ${city.city}, ${city.county} County, CA.`,
      url: 'https://cnsdemo.com',
      telephone: '+15622046335',
      email: 'contactus@cnsdemo.com',
      license: '1126325',
      slogan: 'Licensed. Insured. All-Inclusive.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Serving All of Southern California',
        addressLocality: city.city,
        addressRegion: 'CA',
        postalCode: city.zip,
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: city.lat,
        longitude: city.lng,
      },
      areaServed: [
        {
          '@type': 'City',
          name: city.city,
          containedInPlace: {
            '@type': 'AdministrativeArea',
            name: `${city.county} County`,
          },
        },
        {
          '@type': 'AdministrativeArea',
          name: `${city.county} County, CA`,
        },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Demolition Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              serviceType: service.service_name,
              name: `${service.service_name} in ${city.city}, CA`,
              description: service.description,
              provider: {
                '@type': 'LocalBusiness',
                name: 'C&S Demolition',
                url: 'https://cnsdemo.com',
              },
              areaServed: {
                '@type': 'City',
                name: city.city,
              },
            },
            priceRange: `$${Number(service.avg_cost_low).toLocaleString()}–$${Number(service.avg_cost_high).toLocaleString()}`,
            priceCurrency: 'USD',
          },
        ],
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '87',
        bestRating: '5',
        worstRating: '1',
      },
      priceRange: '$$',
      paymentAccepted: 'Cash, Check, Credit Card, Zelle',
      currenciesAccepted: 'USD',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '07:00',
          closes: '18:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Saturday',
          opens: '08:00',
          closes: '16:00',
        },
      ],
      sameAs: [
        'https://www.yelp.com/biz/cns-demolition',
        'https://www.facebook.com/cnsdemo',
        'https://www.bbb.org/us/ca/long-beach/profile/demolition-contractors',
        'https://www.linkedin.com/company/cns-demolition',
      ],
      knowsAbout: [
        'Demolition Contracting',
        'Interior Demolition',
        'Pool Demolition',
        'Concrete Removal',
        'Selective Demolition',
        'Commercial Demolition',
        'Residential Demolition',
        'California Building Permits',
        'Asbestos Abatement Coordination',
        service.service_name,
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cnsdemo.com' },
        { '@type': 'ListItem', position: 2, name: 'Demolition Services', item: 'https://cnsdemo.com/services' },
        { '@type': 'ListItem', position: 3, name: service.service_name, item: `https://cnsdemo.com/demolition/${service.service_slug}` },
        { '@type': 'ListItem', position: 4, name: city.city, item: `https://cnsdemo.com/demolition/${service.service_slug}/${city.slug}` },
      ],
    },
  ];

  if (faqs && faqs.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    });
  }

  // HowTo schema — maps the 5-step process visible on every city/service page
  const howToSteps = buildHowToSteps(city, service);
  graph.push({
    '@type': 'HowTo',
    name: `How to Get ${service.service_name} in ${city.city}, CA`,
    description: `Step-by-step process for ${service.service_name.toLowerCase()} projects in ${city.city}, ${city.county} County, CA with C&S Demolition.`,
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      minValue: Number(service.avg_cost_low),
      maxValue: Number(service.avg_cost_high),
    },
    step: howToSteps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }) }}
    />
  );
}
