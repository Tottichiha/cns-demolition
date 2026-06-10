import Link from 'next/link';

interface BlogConversionCTAProps {
  variant: 'asbestos' | 'cost';
}

// Hard conversion block rendered directly under the post intro on asbestos
// and cost-research blog posts. Honest positioning only: C&S Demolition is a
// licensed DEMOLITION contractor (CA License #1126325) — asbestos abatement
// itself is performed by licensed abatement specialists before demo work.
// Never add reviews/ratings/star claims here (no real reviews exist yet).
export default function BlogConversionCTA({ variant }: BlogConversionCTAProps) {
  const isAsbestos = variant === 'asbestos';
  return (
    <aside className="bg-white border-2 border-brand-orange rounded-xl p-6 sm:p-7 mb-10 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">
        {isAsbestos ? 'Abatement vs. Demolition — Who Does What' : 'Free On-Site Estimate · Lump-Sum Pricing'}
      </p>
      <p className="text-xl sm:text-2xl font-bold text-brand-dark mb-3">
        {isAsbestos
          ? 'Planning Demolition After Abatement?'
          : 'Done Researching? Get a Real Price for Your Project'}
      </p>
      {isAsbestos ? (
        <p className="text-gray-700 leading-relaxed mb-5">
          A quick note on who does what: asbestos abatement is performed by licensed asbestos
          abatement specialists, and it must be completed <strong>before</strong> any teardown
          begins. C&amp;S Demolition handles the <strong>demolition side</strong> of your project —
          we&apos;re a CA-licensed demolition contractor (License #1126325). Once your property has
          been cleared by an abatement crew, we take it from there: permits, teardown, haul-away,
          and site cleanup.
        </p>
      ) : (
        <p className="text-gray-700 leading-relaxed mb-5">
          Online cost ranges only get you so far — access, materials, and permits make every site
          different. C&amp;S Demolition (CA License #1126325) gives you a free on-site estimate with
          a written <strong>lump-sum price</strong> — no hourly billing, no hidden fees, no
          surprises. Serving 123+ cities across Southern California.
        </p>
      )}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/free-estimate"
          className="bg-brand-orange text-white font-bold px-6 py-3 rounded-lg text-center hover:bg-orange-600 transition-colors"
        >
          {isAsbestos ? 'Get a Free Demolition Quote' : 'Get a Free On-Site Estimate'}
        </Link>
        <a
          href="tel:+15622046335"
          className="border-2 border-brand-orange text-brand-orange font-bold px-6 py-3 rounded-lg text-center hover:bg-orange-50 transition-colors"
        >
          📞 (562) 204-6335
        </a>
      </div>
    </aside>
  );
}
