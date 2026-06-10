import Link from 'next/link';

interface GuideLink {
  href: string;
  anchor: string;
  blurb: string;
}

// Curated contextual cross-links between guides. Keyed by blog post slug —
// the block only renders on posts listed here. Keep anchors natural and
// varied (no exact-match stuffing), max 1–2 links per target per post.
const GUIDE_LINKS: Record<string, GuideLink[]> = {
  'deck-demolition-cost-guide': [
    {
      href: '/blog/concrete-demolition-cost-guide',
      anchor: 'concrete demolition cost guide',
      blurb: 'Taking out a concrete patio or slab along with the deck? See per-square-foot breaking, hauling, and recycling pricing across SoCal.',
    },
  ],
  'fence-wall-removal-guide': [
    {
      href: '/blog/concrete-demolition-cost-guide',
      anchor: 'concrete removal pricing',
      blurb: 'Block walls and their footings are concrete jobs at heart — see what concrete demolition costs in Orange County, LA, and the Inland Empire.',
    },
    {
      href: '/blog/whole-house-demolition-cost',
      anchor: 'what whole-house demolition costs in SoCal',
      blurb: 'Clearing more than a fence line? Here is the full cost picture for taking down an entire house, foundation included.',
    },
  ],
  'stucco-drywall-removal-guide': [
    {
      href: '/blog/whole-house-demolition-cost',
      anchor: 'whole-house demolition cost guide',
      blurb: 'When a gut job turns into a full teardown: what house demolition costs in Southern California and what drives the number.',
    },
    {
      href: '/blog/concrete-demolition-cost-guide',
      anchor: 'concrete demolition cost breakdown',
      blurb: 'Stripping stucco ahead of a bigger exterior remodel? Slab, driveway, and flatwork removal pricing is covered here.',
    },
  ],
};

interface RelatedGuidesProps {
  slug: string;
}

export default function RelatedGuides({ slug }: RelatedGuidesProps) {
  const links = GUIDE_LINKS[slug];
  if (!links || links.length === 0) return null;

  return (
    <aside className="bg-gray-50 border border-gray-200 rounded-xl p-6 my-10">
      <h2 className="text-xl font-bold text-brand-dark mb-4">Related Cost Guides</h2>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href} className="text-sm text-gray-700 leading-relaxed">
            <Link href={link.href} className="text-brand-orange font-semibold hover:underline">
              {link.anchor}
            </Link>
            {' — '}
            {link.blurb}
          </li>
        ))}
      </ul>
    </aside>
  );
}
