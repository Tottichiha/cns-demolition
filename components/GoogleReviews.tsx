// Real Google Business Profile reviews strip. Displays the live rating and a
// verbatim customer quote, both verifiable on the public Google listing.
// Deliberately NO aggregateRating schema — Google's guidelines prohibit
// marking up third-party (GBP) reviews as self-serving structured data.

const GOOGLE_LISTING_URL =
  'https://www.google.com/maps/place/?q=place_id:ChIJQ2nILkGFumUR_lO7TYcl4CM';
const WRITE_REVIEW_URL =
  'https://search.google.com/local/writereview?placeid=ChIJQ2nILkGFumUR_lO7TYcl4CM';

export default function GoogleReviews() {
  return (
    <section className="bg-brand-dark text-white py-12 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-yellow-400 text-2xl tracking-tight" aria-hidden="true">
            ★★★★★
          </span>
          <span className="font-bold text-xl">5.0 on Google</span>
        </div>
        <blockquote className="text-lg text-gray-200 italic mb-4">
          &ldquo;Many thanks to them, and we couldn&apos;t be more pleased with their work!&rdquo;
        </blockquote>
        <p className="text-sm text-gray-400 mb-6">— from our Google reviews</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={GOOGLE_LISTING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors text-sm"
          >
            Read our reviews on Google
          </a>
          <a
            href={WRITE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-orange text-white font-semibold px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors text-sm"
          >
            Worked with us? Leave a review
          </a>
        </div>
      </div>
    </section>
  );
}
