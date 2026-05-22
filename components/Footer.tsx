import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-gray-400 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Company info */}
        <div>
          <h3 className="text-white font-bold mb-3 text-lg">C&amp;S Demolition</h3>
          <p className="text-sm mb-2">A licensed DBA of Scrapit LLC. Serving Southern California with professional demolition services since day one.</p>
          <div className="space-y-1 text-sm mt-3">
            <p className="text-white font-semibold">CA Contractor License #1126325</p>
            <p>⭐ 4.9 / 5 · 87 Verified Reviews</p>
            <a href="tel:+15622046335" className="text-brand-orange hover:text-orange-400 font-semibold block">
              (562) 204-6335
            </a>
            <a href="mailto:contactus@cnsdemo.com" className="hover:text-white text-xs">
              contactus@cnsdemo.com
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white font-bold mb-3">Services</h3>
          <ul className="text-sm space-y-1.5">
            <li><Link href="/demolition/interior-demolition" className="hover:text-white">Interior Demolition</Link></li>
            <li><Link href="/demolition/pool-demolition" className="hover:text-white">Pool Demolition</Link></li>
            <li><Link href="/demolition/concrete-removal" className="hover:text-white">Concrete Removal</Link></li>
            <li><Link href="/demolition/garage-demolition" className="hover:text-white">Garage Demolition</Link></li>
            <li><Link href="/demolition/whole-house-demolition" className="hover:text-white">Whole House Demo</Link></li>
            <li><Link href="/demolition/commercial-demolition" className="hover:text-white">Commercial Demo</Link></li>
            <li><Link href="/services" className="text-brand-orange hover:text-orange-400">All 19 Services →</Link></li>
          </ul>
        </div>

        {/* Service Areas */}
        <div>
          <h3 className="text-white font-bold mb-3">Service Areas</h3>
          <ul className="text-sm space-y-1.5">
            <li><Link href="/county/orange" className="hover:text-white">Orange County</Link></li>
            <li><Link href="/county/los-angeles" className="hover:text-white">Los Angeles County</Link></li>
            <li><Link href="/county/riverside" className="hover:text-white">Riverside County</Link></li>
            <li><Link href="/county/san-bernardino" className="hover:text-white">San Bernardino County</Link></li>
            <li><Link href="/demolition/interior-demolition/anaheim" className="hover:text-white">Anaheim</Link></li>
            <li><Link href="/demolition/interior-demolition/irvine" className="hover:text-white">Irvine</Link></li>
            <li><Link href="/service-areas" className="text-brand-orange hover:text-orange-400">All 123 Cities →</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white font-bold mb-3">Resources</h3>
          <ul className="text-sm space-y-1.5">
            <li><Link href="/blog" className="hover:text-white">Demolition Blog</Link></li>
            <li><Link href="/blog/category/cost-guides" className="hover:text-white">Cost Guides</Link></li>
            <li><Link href="/blog/category/how-to-guides" className="hover:text-white">How-To Guides</Link></li>
            <li><Link href="/blog/category/permits-regulations" className="hover:text-white">Permit Guides</Link></li>
            <li><Link href="/about" className="hover:text-white">About C&amp;S Demolition</Link></li>
            <li><Link href="/contact" className="hover:text-white">Free Estimate</Link></li>
            <li>
              <a
                href="https://www.cslb.ca.gov/onlineservices/checklicenseii/checklicense.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white text-xs"
              >
                Verify License at CSLB.ca.gov ↗
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Trust bar */}
      <div className="border-t border-gray-700 py-4 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-2 text-xs">
          <span>© {new Date().getFullYear()} C&S Demolition / Scrapit LLC. All rights reserved. &nbsp;·&nbsp; <Link href="/privacy" className="hover:text-white">Privacy Policy</Link></span>
          <span className="text-gray-500">
            CA License #1126325 · Licensed · Bonded · Insured · Serving 123+ SoCal Cities
          </span>
        </div>
      </div>
    </footer>
  );
}
