import fs from 'fs';
import path from 'path';

export interface City {
  city: string;
  county: string;
  zip: string;
  slug: string;
  lat: string;
  lng: string;
  nearby_cities: string;
}

export interface Service {
  service_slug: string;
  service_name: string;
  service_short: string;
  description: string;
  avg_cost_low: string;
  avg_cost_high: string;
  duration: string;
}

function parseCSV<T>(filePath: string): T[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',');

  return lines.slice(1).map((line) => {
    const values: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    const obj: Record<string, string> = {};
    headers.forEach((header, i) => {
      obj[header.trim()] = (values[i] || '').replace(/^"|"$/g, '');
    });
    return obj as T;
  });
}

const dataDir = path.join(process.cwd(), 'data');

export function getCities(): City[] {
  return parseCSV<City>(path.join(dataDir, 'cities.csv'));
}

export function getServices(): Service[] {
  return parseCSV<Service>(path.join(dataDir, 'services.csv'));
}

export function getCityBySlug(slug: string): City | undefined {
  return getCities().find((c) => c.slug === slug);
}

export function getServiceBySlug(slug: string): Service | undefined {
  return getServices().find((s) => s.service_slug === slug);
}

export function getCitiesByCounty(county: string): City[] {
  return getCities().filter((c) => c.county.toLowerCase() === county.toLowerCase());
}

export function getCounties(): string[] {
  const cities = getCities();
  return [...new Set(cities.map((c) => c.county))].sort();
}

export interface BlogPost {
  slug: string;
  title: string;
  meta_description: string;
  date: string;
  category: string;
  excerpt: string;
  sections: { heading: string; body: string }[];
}

export function getBlogPosts(): BlogPost[] {
  const filePath = path.join(dataDir, 'blog-posts.json');
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getBlogPosts().find((p) => p.slug === slug);
}

export function getBlogCategories(): string[] {
  return [...new Set(getBlogPosts().map((p) => p.category))].sort();
}

// Generate all city+service combos for getStaticPaths
export function getAllCityServicePairs(): { citySlug: string; serviceSlug: string }[] {
  const cities = getCities();
  const services = getServices();
  const pairs: { citySlug: string; serviceSlug: string }[] = [];
  cities.forEach((city) => {
    services.forEach((service) => {
      pairs.push({ citySlug: city.slug, serviceSlug: service.service_slug });
    });
  });
  return pairs;
}
