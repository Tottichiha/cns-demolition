import React, { useState, useMemo, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

// ── Types ──────────────────────────────────────────────────────────────────
interface Project {
  name: string;
  cat: string;
  images: string[];
}

// ── Project data ───────────────────────────────────────────────────────────
const projectsData: Project[] = [
  {
    name: 'Burnt House Demolition - Crestline, CA',
    cat: 'residential',
    images: [
      'https://911junkca.com/wp-content/uploads/2026/05/1.jpg',
      'https://911junkca.com/wp-content/uploads/2026/05/2.jpg',
      'https://911junkca.com/wp-content/uploads/2026/05/3.jpg',
      'https://911junkca.com/wp-content/uploads/2026/05/4.jpg',
      'https://911junkca.com/wp-content/uploads/2026/05/5.jpg',
      'https://911junkca.com/wp-content/uploads/2026/05/6.jpg',
      'https://911junkca.com/wp-content/uploads/2026/05/7.jpg',
    ],
  },
  {
    name: 'Garage Demolition - Venice, CA',
    cat: 'residential',
    images: [
      'https://911junkca.com/wp-content/uploads/2026/05/1-1.jpg',
      'https://911junkca.com/wp-content/uploads/2026/05/2-1.jpg',
      'https://911junkca.com/wp-content/uploads/2026/05/3-1.jpg',
      'https://911junkca.com/wp-content/uploads/2026/05/4-1.jpg',
    ],
  },
  {
    name: 'House Addition Demo',
    cat: 'residential',
    images: [
      'https://911junkca.com/wp-content/uploads/2026/05/IMG_0137-rotated.jpeg',
      'https://911junkca.com/wp-content/uploads/2026/05/IMG_0138-rotated.jpeg',
      'https://911junkca.com/wp-content/uploads/2026/05/IMG_0139-rotated.jpeg',
      'https://911junkca.com/wp-content/uploads/2026/05/IMG_0140-rotated.jpeg',
      'https://911junkca.com/wp-content/uploads/2026/05/IMG_0141-rotated.jpeg',
    ],
  },
  {
    name: 'Residential Interior Demo',
    cat: 'interior',
    images: [
      'https://911junkca.com/wp-content/uploads/2026/05/78310873236__C043B115-1741-49C7-9963-B694A0CA503D-rotated.jpeg',
      'https://911junkca.com/wp-content/uploads/2026/05/IMG_9472-rotated.jpeg',
      'https://911junkca.com/wp-content/uploads/2026/05/IMG_9474-rotated.jpeg',
      'https://911junkca.com/wp-content/uploads/2026/05/IMG_9475-rotated.jpeg',
    ],
  },
  {
    name: 'Shed Demolition',
    cat: 'residential',
    images: [
      'https://911junkca.com/wp-content/uploads/2026/05/IMG_8765.jpeg',
      'https://911junkca.com/wp-content/uploads/2026/05/IMG_8766-rotated.jpeg',
      'https://911junkca.com/wp-content/uploads/2026/05/IMG_8768-rotated.jpeg',
    ],
  },
  {
    name: 'Commercial Freezer Demolition',
    cat: 'commercial',
    images: [
      'https://911junkca.com/wp-content/uploads/2026/05/1-rotated.jpeg',
      'https://911junkca.com/wp-content/uploads/2026/05/10-rotated.jpeg',
      'https://911junkca.com/wp-content/uploads/2026/05/2-rotated.jpeg',
      'https://911junkca.com/wp-content/uploads/2026/05/3-rotated.jpeg',
      'https://911junkca.com/wp-content/uploads/2026/05/4.jpeg',
      'https://911junkca.com/wp-content/uploads/2026/05/5-rotated.jpeg',
      'https://911junkca.com/wp-content/uploads/2026/05/6-rotated.jpeg',
      'https://911junkca.com/wp-content/uploads/2026/05/7-rotated.jpeg',
    ],
  },
  {
    name: 'Commercial Interior Demo',
    cat: 'commercial',
    images: [
      'https://911junkca.com/wp-content/uploads/2026/05/C2FC23EE-6D1C-4312-A641-3AB13DB0C431-rotated.jpg',
      'https://911junkca.com/wp-content/uploads/2026/05/IMG_1332-rotated.jpeg',
      'https://911junkca.com/wp-content/uploads/2026/05/IMG_1333.jpeg',
      'https://911junkca.com/wp-content/uploads/2026/05/IMG_9491-rotated.jpeg',
      'https://911junkca.com/wp-content/uploads/2026/05/IMG_9496-rotated.jpeg',
      'https://911junkca.com/wp-content/uploads/2026/05/IMG_9500-rotated.jpeg',
      'https://911junkca.com/wp-content/uploads/2026/05/IMG_9502-rotated.jpeg',
    ],
  },
  {
    name: 'Philips - Commercial Walls Demo',
    cat: 'commercial',
    images: [
      'https://911junkca.com/wp-content/uploads/2026/05/IMG_2150.jpeg',
      'https://911junkca.com/wp-content/uploads/2026/05/IMG_2152.jpeg',
      'https://911junkca.com/wp-content/uploads/2026/05/IMG_2153.jpeg',
      'https://911junkca.com/wp-content/uploads/2026/05/IMG_2156.jpeg',
      'https://911junkca.com/wp-content/uploads/2026/05/IMG_2810.jpeg',
      'https://911junkca.com/wp-content/uploads/2026/05/IMG_2813.jpeg',
      'https://911junkca.com/wp-content/uploads/2026/05/IMG_2814.jpeg',
      'https://911junkca.com/wp-content/uploads/2026/05/IMG_2826.jpeg',
    ],
  },
  {
    name: 'Interior Demolition - Encino',
    cat: 'interior',
    images: [
      'https://911junkca.com/wp-content/uploads/2026/05/1-2.jpg',
      'https://911junkca.com/wp-content/uploads/2026/05/10.jpg',
      'https://911junkca.com/wp-content/uploads/2026/05/11.jpg',
      'https://911junkca.com/wp-content/uploads/2026/05/12.jpg',
      'https://911junkca.com/wp-content/uploads/2026/05/13.jpg',
      'https://911junkca.com/wp-content/uploads/2026/05/2-2.jpg',
      'https://911junkca.com/wp-content/uploads/2026/05/3-2.jpg',
      'https://911junkca.com/wp-content/uploads/2026/05/4-2.jpg',
    ],
  },
  {
    name: 'Concrete Slab Removal',
    cat: 'concrete',
    images: [
      'https://911junkca.com/wp-content/uploads/2026/05/1-1-rotated.jpeg',
      'https://911junkca.com/wp-content/uploads/2026/05/2-1-rotated.jpeg',
      'https://911junkca.com/wp-content/uploads/2026/05/3-1-rotated.jpeg',
      'https://911junkca.com/wp-content/uploads/2026/05/4-1-rotated.jpeg',
      'https://911junkca.com/wp-content/uploads/2026/05/5-1-rotated.jpeg',
      'https://911junkca.com/wp-content/uploads/2026/05/Concrete-slab-removal.jpg',
    ],
  },
];

const FILTERS = [
  { key: 'all', label: 'All Projects' },
  { key: 'residential', label: 'Residential' },
  { key: 'commercial', label: 'Commercial' },
  { key: 'interior', label: 'Interior' },
  { key: 'concrete', label: 'Concrete' },
];

// ── Lightbox ───────────────────────────────────────────────────────────────
function Lightbox({
  project,
  initialIndex,
  onClose,
}: {
  project: Project;
  initialIndex: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(initialIndex);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIdx((i) => (i + 1) % project.images.length);
      if (e.key === 'ArrowLeft') setIdx((i) => (i - 1 + project.images.length) % project.images.length);
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose, project.images.length]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          className="absolute -top-10 right-0 text-white text-3xl leading-none hover:text-gray-300"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        {/* Image */}
        <img
          src={project.images[idx]}
          alt={`${project.name} — photo ${idx + 1}`}
          className="w-full max-h-[75vh] object-contain rounded-lg"
          loading="lazy"
        />

        {/* Caption */}
        <p className="text-white text-center mt-3 text-sm">
          {project.name} — {idx + 1} / {project.images.length}
        </p>

        {/* Prev / Next */}
        {project.images.length > 1 && (
          <>
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/80 text-xl"
              onClick={() => setIdx((i) => (i - 1 + project.images.length) % project.images.length)}
              aria-label="Previous"
            >
              ┹
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/80 text-xl"
              onClick={() => setIdx((i) => (i + 1) % project.images.length)}
              aria-label="Next"
            >
              ›
            </button>
          </>
        )}

        {/* Thumbnails */}
        {project.images.length > 1 && (
          <div className="flex gap-2 mt-3 justify-center overflow-x-auto pb-1">
            {project.images.map((src, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`shrink-0 w-14 h-14 rounded overflow-hidden border-2 transition-colors ${
                  i === idx ? 'border-orange-500' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Gallery page ───────────────────────────────────────────────────────────
const title = 'Project Gallery | C&S Demolition Portfolio — SoCal Projects';
const description =
  'Browse real demolition projects completed by C&S Demolition across Southern California — residential teardowns, commercial interiors, concrete removal, and more. CA License #1126325.';

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightbox, setLightbox] = useState<{ project: Project; index: number } | null>(null);

  const filtered = useMemo(
    () =>
      activeFilter === 'all'
        ? projectsData
        : projectsData.filter((p) => p.cat === activeFilter),
    [activeFilter]
  );

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    '@id': 'https://cnsdemo.com/gallery',
    name: title,
    description,
    url: 'https://cnsdemo.com/gallery',
    author: {
      '@type': 'Organization',
      '@id': 'https://cnsdemo.com/#business',
      name: 'C&S Demolition',
    },
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://cnsdemo.com/gallery" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cnsdemo.com/gallery" />
        <meta
          property="og:image"
          content="https://cnsdemo.com/api/og?title=Project+Gallery&sub=C%26S+Demolition+Portfolio&type=gallery"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content="https://cnsdemo.com/api/og?title=Project+Gallery&sub=C%26S+Demolition+Portfolio&type=gallery"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>

      <Header />

      <main>
        {/* Hero */}
        <section className="bg-brand-dark text-white py-14 px-4">
          <div className="max-w-4xl mx-auto">
            <nav className="text-sm text-gray-400 mb-5 flex flex-wrap gap-1">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white">Project Gallery</span>
            </nav>
            <span className="text-brand-orange text-xs font-bold uppercase tracking-widest mb-3 block">
              Real Projects · Real Results
            </span>
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              C&amp;S Demolition Project Portfolio
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl">
              Browse completed demolition projects across Southern California — from burnt-house teardowns and garage removals to commercial interior gut-outs and concrete slab removal. CA License #1126325.
            </p>
          </div>
        </section>

        {/* Trust bar */}
        <div className="bg-brand-orange text-white py-3 px-4">
          <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-6 text-sm font-semibold">
            <span>✓ {projectsData.length} Projects Shown</span>
            <span>✓ CA License #1126325</span>
            <span>✓ Residential · Commercial · Interior · Concrete</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12">

          {/* Filter bar */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                  activeFilter === f.key
                    ? 'bg-brand-orange text-white border-brand-orange'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-brand-orange hover:text-brand-orange'
                }`}
              >
                {f.label}
                {f.key !== 'all' && (
                  <span className="ml-1.5 text-xs opacity-70">
                    ({projectsData.filter((p) => p.cat === f.key).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Project grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <div
                key={project.name}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
              >
                {/* Cover image */}
                <button
                  className="relative w-full h-52 overflow-hidden block"
                  onClick={() => setLightbox({ project, index: 0 })}
                  aria-label={`View photos of ${project.name}`}
                >
                  <img
                    src={project.images[0]}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {project.images.length > 1 && (
                    <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                      +{project.images.length - 1} more
                    </span>
                  )}
                  <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 bg-white text-brand-dark font-semibold text-sm px-3 py-1 rounded-lg transition-opacity">
                      View Photos
                    </span>
                  </span>
                </button>

                {/* Card body */}
                <div className="p-4">
                  <span className="inline-block text-xs font-bold uppercase tracking-wide text-brand-orange bg-orange-50 px-2 py-0.5 rounded mb-2 capitalize">
                    {project.cat}
                  </span>
                  <h2 className="font-bold text-brand-dark text-sm leading-snug mb-3">
                    {project.name}
                  </h2>

                  {/* Thumbnail strip */}
                  {project.images.length > 1 && (
                    <div className="flex gap-1.5 overflow-x-auto pb-1">
                      {project.images.slice(0, 5).map((src, i) => (
                        <button
                          key={i}
                          onClick={() => setLightbox({ project, index: i })}
                          className="shrink-0 w-10 h-10 rounded overflow-hidden border border-gray-200 hover:border-brand-orange transition-colors"
                          aria-label={`Photo ${i + 1} of ${project.name}`}
                        >
                          <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
                        </button>
                      ))}
                      {project.images.length > 5 && (
                        <button
                          onClick={() => setLightbox({ project, index: 5 })}
                          className="shrink-0 w-10 h-10 rounded border border-gray-200 bg-gray-50 hover:border-brand-orange text-xs text-gray-600 font-bold flex items-center justify-center"
                        >
                          +{project.images.length - 5}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <section className="mt-16 bg-brand-orange text-white rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">
              Need a Demolition Estimate?
            </h2>
            <p className="text-orange-100 mb-6 max-w-xl mx-auto">
              We serve 123+ cities across Southern California. Free on-site estimates — written quote before we leave your property.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+15622046335"
                className="inline-block bg-white text-brand-orange font-bold px-10 py-4 rounded-lg text-xl hover:bg-gray-100 transition-colors"
              >
                📞 (562) 204-6335
              </a>
              <Link
                href="/contact"
                className="inline-block border-2 border-white text-white font-bold px-10 py-4 rounded-lg text-lg hover:bg-white hover:text-brand-orange transition-colors"
              >
                Get Free Estimate
              </Link>
            </div>
          </section>

        </div>
      </main>

      <Footer />

      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          project={lightbox.project}
          initialIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}
