import { City, Service } from '../lib/getData';

interface SchemaProps {
  city: City;
  service: Service;
}

export default function SchemaMarkup({ city, service }: SchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `https://cnsdemo.com/demolition/${service.service_slug}/${city.slug}#business`,
        name: 'C&S Demolition',
        alternateName: 'Scrapit LLC',
        description: `Licensed demolition contractor serving ${city.city}, ${city.county} County, CA. Specializing in ${service.service_name.toLowerCase()} and all types of residential and commercial demolition.`,
        url: 'https://cnsdemo.com',
        telephone: '+15622046335',
        email: 'info@cnsdemo.com',
        address: {
          '@type': 'PostalAddress',
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
        areaServed: {
          '@type': 'City',
          name: city.city,
          containedInPlace: {
            '@type': 'AdministrativeArea',
            name: `${city.county} County`,
          },
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Demolition Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: service.service_name,
                description: service.description,
              },
              priceRange: `$${service.avg_cost_low}–$${service.avg_cost_high}`,
            },
          ],
        },
        priceRange: '$$',
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
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '87',
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
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
