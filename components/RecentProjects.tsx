import Link from 'next/link';
import { PROJECTS, Project } from '../lib/projectPhotos';

function ProjectCard({ project }: { project: Project }) {
  // Lead with the most representative shot; show up to 3 in a strip.
  const photos = project.photos.slice(0, 3);
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
      <div className={`grid ${photos.length === 1 ? 'grid-cols-1' : photos.length === 2 ? 'grid-cols-2' : 'grid-cols-3'} gap-0.5 bg-gray-100`}>
        {photos.map((photo) => (
          <div key={photo.src} className="relative aspect-[4/3]">
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded">
              {photo.label}
            </span>
          </div>
        ))}
      </div>
      <div className="p-5">
        <h3 className="font-bold text-gray-900 mb-1">
          {project.title}
          {project.city && <span className="text-gray-500 font-normal"> — {project.city}, CA</span>}
        </h3>
        <p className="text-sm text-gray-600 mb-3">{project.blurb}</p>
        <Link
          href={`/demolition/${project.serviceSlug}`}
          className="text-sm text-brand-orange font-semibold hover:underline"
        >
          {project.serviceName} services →
        </Link>
      </div>
    </div>
  );
}

export default function RecentProjects() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-brand-dark text-center mb-3">Recent Projects</h2>
      <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
        Real photos from real C&amp;S Demolition job sites across Southern California — no stock images.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {PROJECTS.slice(0, 6).map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
      <p className="text-center text-sm text-gray-500 mt-8">
        Want your project here next?{' '}
        <a href="tel:+15622046335" className="text-brand-orange font-semibold hover:underline">
          Call (562) 204-6335
        </a>{' '}
        for a free on-site estimate.
      </p>
    </section>
  );
}
