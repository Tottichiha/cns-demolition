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

export default function SchemaMarkup({ city, service, faqs }: SchemaProps) {
  const graph: object[] = [
    {
      // One business entity for the whole site lives on the homepage (#business).
      // City pages describe the service offered there and point back to it,
      // instead of claiming an office address in every city.
      '@type': 'Service',
      '@id': `https://cnsdemo.com/demolition/${service.service_slug}/${city.slug}#service`,
      serviceType: service.service_name,
      name: `${service.service_name} in ${city.city}, CA`,
      description: service.description,
      url: `https://cnsdemo.com/demolition/${service.service_slug}/${city.slug}`,
      provider: { '@id': 'https://cnsdemo.com/#business' },
      areaServed: {
        '@type': 'City',
        name: city.city,
        containedInPlace: { '@type': 'AdministrativeArea', name: `${city.county} County, CA` },
      },
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }) }}
    />
  );
}
