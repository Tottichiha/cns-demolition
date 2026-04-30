import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-gray-400 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white font-bold mb-3">C&S Demolition</h3>
          <p className="text-sm">A licensed DBA of Scrapit LLC. Serving Southern California with professional demolition services.</p>
          <p className="text-sm mt-2">CA Contractor License #1126325</p>
        </div>
        <div>
          <h3 className="text-white font-bold mb-3">Services</h3>
          <ul className="text-sm space-y-1">
            <li><Link href="/demolition/interior-demolition" className="hover:text-white">Interior Demolition</Link></li>
            <li><Link href="/demolition/pool-demolition" className="hover:text-white">Pool Demolition</Link></li>
            <li><Link href="/demolition/concrete-removal" className="hover:text-white">Concrete Removal</Link></li>
            <li><Link href="/demolition/garage-demolition" className="hover:text-white">Garage Demolition</Link></li>
            <li><Link href="/services" className="hover:text-white">All Services →</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-bold mb-3">Service Areas</h3>
          <ul className="text-sm space-y-1">
            <li><Link href="/county/orange" className="hover:text-white">Orange County</Link></li>
            <li><Link href="/county/los-angeles" className="hover:text-white">Los Angeles County</Link></li>
            <li><Link href="/county/riverside" className="hover:text-white">Riverside County</Link></li>
            <li><Link href="/county/san-bernardino" className="hover:text-white">San Bernardino County</Link></li>
            <li><Link href="/service-areas" className="hover:text-white">All Areas →</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 text-center py-4 text-xs">
        © {new Date().getFullYear()} C&S Demolition / Scrapit LLC. All rights reserved.
      </div>
    </footer>
  );
}
