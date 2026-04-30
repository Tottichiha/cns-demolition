import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-brand-dark text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-brand-orange font-bold text-2xl">C&S</span>
          <span className="font-semibold text-lg">Demolition</span>
          <span className="text-sm text-gray-400 hidden sm:inline">| A DBA of Scrapit LLC</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/services" className="hover:text-brand-orange transition-colors">Services</Link>
          <Link href="/service-areas" className="hover:text-brand-orange transition-colors">Service Areas</Link>
          <Link href="/contact" className="hover:text-brand-orange transition-colors hidden sm:inline">Free Estimate</Link>
          <a
            href="tel:+15622046335"
            className="bg-brand-orange text-white px-4 py-2 rounded font-semibold hover:bg-orange-600 transition-colors"
          >
            Call Now
          </a>
        </nav>
      </div>
    </header>
  );
}
