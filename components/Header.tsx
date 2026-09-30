import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white/95 backdrop-blur text-brand-ink border-b border-brand-line sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-baseline gap-2 flex-shrink-0">
          <span className="font-extrabold text-2xl tracking-tight">
            C&amp;S <span className="text-brand-red">DEMOLITION</span>
          </span>
          <span className="text-xs text-brand-ink-2 hidden md:inline">CA Lic #1126325</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm font-semibold">
          <Link href="/services" className="hover:text-brand-red transition-colors hidden sm:inline">Services</Link>
          <Link href="/service-areas" className="hover:text-brand-red transition-colors hidden sm:inline">Areas</Link>
          <Link href="/gallery" className="hover:text-brand-red transition-colors hidden md:inline">Projects</Link>
          <Link href="/blog" className="hover:text-brand-red transition-colors hidden md:inline">Blog</Link>
          <Link href="/about" className="hover:text-brand-red transition-colors hidden lg:inline">About</Link>
          <Link href="/contact" className="hover:text-brand-red transition-colors hidden sm:inline">Get a Bid</Link>
          <a
            href="tel:+15622046335"
            className="bg-brand-red text-white px-4 py-2 rounded-full font-bold hover:bg-brand-red-deep transition-colors whitespace-nowrap"
          >
            (562) 204-6335
          </a>
        </nav>
      </div>
    </header>
  );
}
