import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-gray-400 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white font-bold mb-3">
            <span className="text-brand-green">911 JUNK</span> CA
          </h3>
          <p className="text-sm">Southern California&apos;s #1 junk removal service. Serving Los Angeles and Orange County.</p>
          <p className="text-sm mt-2">
            <a href="tel:+15622046335" className="hover:text-white">📞 562-204-6335</a>
          </p>
        </div>
        <div>
          <h3 className="text-white font-bold mb-3">Services</h3>
          <ul className="text-sm space-y-1">
            <li><Link href="/junk-removal/junk-removal" className="hover:text-white">Junk Removal</Link></li>
            <li><Link href="/junk-removal/furniture-removal" className="hover:text-white">Furniture Removal</Link></li>
            <li><Link href="/junk-removal/appliance-removal" className="hover:text-white">Appliance Removal</Link></li>
            <li><Link href="/junk-removal/garage-cleanout" className="hover:text-white">Garage Cleanout</Link></li>
            <li><Link href="/junk-removal/estate-cleanout" className="hover:text-white">Estate Cleanout</Link></li>
            <li><Link href="/services" className="hover:text-white">All Services →</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-bold mb-3">Service Areas</h3>
          <ul className="text-sm space-y-1">
            <li><Link href="/county/orange" className="hover:text-white">Orange County</Link></li>
            <li><Link href="/county/los-angeles" className="hover:text-white">Los Angeles County</Link></li>
            <li><Link href="/service-areas" className="hover:text-white">All Areas →</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 text-center py-4 text-xs">
        © {new Date().getFullYear()} 911 Junk CA. All rights reserved. | 911junkca.com
      </div>
    </footer>
  );
}
