import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page Not Found | C&amp;S Demolition</title>
        <meta name="description" content="The page you're looking for doesn't exist. Browse our demolition services, service areas, or contact C&S Demolition for a free estimate." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <Header />

      <main>
        <section className="bg-brand-dark text-white py-20 px-4 text-center">
          <p className="text-brand-orange text-6xl font-bold mb-4">404</p>
          <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
          <p className="text-gray-300 text-lg max-w-md mx-auto mb-8">
            That page doesn't exist or may have moved. Here's where you probably want to go:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/" className="bg-brand-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
              Home
            </Link>
            <Link href="/services" className="bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors">
              Services
            </Link>
            <Link href="/service-areas" className="bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors">
              Service Areas
            </Link>
            <Link href="/blog" className="bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors">
              Contact
            </Link>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-xl font-bold text-brand-dark mb-6 text-center">Popular Pages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: 'Interior Demolition', href: '/demolition/interior-demolition' },
              { label: 'Concrete Removal', href: '/demolition/concrete-removal' },
              { label: 'Garage Demolition', href: '/demolition/garage-demolition' },
              { label: 'Whole House Demo', href: '/demolition/whole-house-demolition' },
              { label: 'Commercial Demolition', href: '/demolition/commercial-demolition' },
              { label: 'Orange County Demo', href: '/county/orange' },
              { label: 'Los Angeles Demo', href: '/county/los-angeles' },
              { label: 'About C&S Demolition', href: '/about' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="bg-white border border-gray-200 rounded-xl px-5 py-3 text-gray-800 hover:border-brand-orange hover:text-brand-orange transition-colors text-sm font-medium"
              >
                {link.label} →
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-brand-orange text-white py-12 px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">Need a Demolition Estimate?</h2>
          <p className="text-orange-100 mb-6">CA License #1126325 · Serving 123+ SoCal Cities · Free On-Site Estimates</p>
          <a href="tel:+15622046335" className="inline-block bg-white text-brand-orange font-bold px-10 py-4 rounded-lg text-xl hover:bg-gray-100 transition-colors">
            📞 (562) 204-6335
          </a>
        </section>
      </main>

      <Footer />
    </>
  );
}
