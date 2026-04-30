import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getCounties, getCitiesByCounty, getCities } from '../lib/getData';

interface PageProps {
  counties: string[];
  cityCounts: Record<string, number>;
  totalCities: number;
}

export default function ServiceAreasPage({ counties, cityCounts, totalCities }: PageProps) {
  return (
    <>
      <Head>
        <title>Junk Removal Service Areas in Los Angeles & Orange County | 911 Junk CA</title>
        <meta
          name="description"
          content={`911 Junk CA serves ${totalCities}+ cities throughout Los Angeles and Orange Counties. Licensed CA junk removal contractor. Same-day service available.`}
        />
        <link rel="canonical" href="https://911junkca.com/service-areas" />
      </Head>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-brand-dark mb-4">
          Junk Removal Service Areas — Los Angeles & Orange County
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          911 Junk CA (Scrapit LLC) serves {totalCities}+ cities across Los Angeles and Orange Counties. We provide licensed, insured junk removal services throughout both counties with same-day availability.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {counties.map((county) => (
            <div key={county} className="border border-gray-200 rounded-xl p-6 hover:border-brand-green transition-colors">
              <h2 className="text-xl font-bold mb-1">
                <Link href={`/county/${county.toLowerCase().replace(/ /g, '-')}`} className="hover:text-brand-green">
                  {county} County
                </Link>
              </h2>
              <p className="text-sm text-gray-500 mb-3">{cityCounts[county]} cities covered</p>
              <Link
                href={`/county/${county.toLowerCase().replace(/ /g, '-')}`}
                className="text-sm text-brand-green font-medium hover:underline"
              >
                View all {county} County cities →
              </Link>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const counties = getCounties();
  const cityCounts: Record<string, number> = {};
  counties.forEach((county) => {
    cityCounts[county] = getCitiesByCounty(county).length;
  });
  const totalCities = getCities().length;
  return { props: { counties, cityCounts, totalCities } };
};
