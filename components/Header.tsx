import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-brand-dark text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <span className="text-brand-orange font-bold text-2xl">C&amp;S</span>
          <span className="font-semibold text-lg">Demolition</span>
          <span className="text-xs text-gray-400 hidden md:inline ml-1">CA Lic #1126325</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/services" className="hover:text-brand-orange transition-colors hidden sm:inline">Services</Link>
          <Link href="/service-areas" className="hover:text-brand-orange transition-colors hidden sm:inline">Areas</Link>
          <Link href="/blog" className="hover:text-brand-orange transition-colors hidden md:inline">Blog</Link>
          <Link href="/contact" className="hover:text-brand-orange transition-colors hidden sm:inline">Free Estimate</Link>
          <a
            href="tel:+15622046335"
            className="bg-brand-orange text-white px-4 py-2 rounded font-semibold hover:bg-orange-600 transition-colors text-sm whitespace-nowrap"
          >
            📞 (562) 204-6335
          </a>
        </nav>
      </div>
    </header>
  );
}
