// Real C&S Demolition project photos (privacy-screened: no faces, plates,
// or addresses). Source originals live in the company portfolio; web-sized
// copies in /public/images/projects/. Every entry describes only what the
// photo actually shows — do not add cities or claims not visible/known.

export interface ProjectPhoto {
  src: string;
  alt: string;
  label: 'Before' | 'During' | 'After';
}

export interface Project {
  title: string;
  city: string | null;
  serviceSlug: string;
  serviceName: string;
  blurb: string;
  photos: ProjectPhoto[];
}

export const PROJECTS: Project[] = [
  {
    title: 'Fire-Damaged Cabin Demolition',
    city: 'Crestline',
    serviceSlug: 'whole-house-demolition',
    serviceName: 'Whole-House Demolition',
    blurb:
      'Burnt mountain A-frame taken down, debris hauled off, and the hillside lot graded clean — working carefully around the surrounding pines.',
    photos: [
      {
        src: '/images/projects/crestline_fire_demo_before_1.jpg',
        alt: 'Fire-damaged A-frame cabin before demolition in Crestline, CA',
        label: 'Before',
      },
      {
        src: '/images/projects/crestline_fire_demo_excavator_4.jpg',
        alt: 'Excavator demolishing burnt house structure in Crestline, San Bernardino County',
        label: 'During',
      },
      {
        src: '/images/projects/crestline_fire_demo_after_7.jpg',
        alt: 'Cleared and graded lot after fire-damage house demolition in Crestline, CA',
        label: 'After',
      },
    ],
  },
  {
    title: 'Detached Garage Demolition',
    city: 'Venice',
    serviceSlug: 'garage-demolition',
    serviceName: 'Garage Demolition',
    blurb:
      'Backyard garage taken down, slab removed, and the pad graded level — compact equipment keeps tight residential lots intact.',
    photos: [
      {
        src: '/images/projects/venice_garage_demo_before_1.jpg',
        alt: 'Skid steer at detached garage before demolition in Venice, Los Angeles',
        label: 'Before',
      },
      {
        src: '/images/projects/venice_garage_demo_after_4.jpg',
        alt: 'Graded pad after garage demolition and slab removal in Venice, CA',
        label: 'After',
      },
    ],
  },
  {
    title: 'Full Interior Strip-Out',
    city: 'Encino',
    serviceSlug: 'interior-demolition',
    serviceName: 'Interior Demolition',
    blurb:
      'Complete interior demolition down to studs and slab — drywall, flooring, cabinetry, and fixtures removed and hauled off, ready for the remodel crew.',
    photos: [
      {
        src: '/images/projects/encino_interior_demo_13.jpg',
        alt: 'Room stripped to studs and slab during interior demolition in Encino, CA',
        label: 'After',
      },
      {
        src: '/images/projects/encino_interior_demo_12.jpg',
        alt: 'Interior demolition strip-out to framing in Encino, Los Angeles County',
        label: 'After',
      },
    ],
  },
  {
    title: 'Concrete Breakout & Removal',
    city: 'Pasadena',
    serviceSlug: 'concrete-removal',
    serviceName: 'Concrete Removal',
    blurb:
      'Old backyard walkway and patio slabs broken out along the fence line and hauled away, leaving the ground ready for new landscaping.',
    photos: [
      {
        src: '/images/projects/pasadena_concrete_IMG_4590_upright.jpg',
        alt: 'Broken concrete slabs stacked during concrete removal in Pasadena, CA',
        label: 'During',
      },
      {
        src: '/images/projects/pasadena_concrete_after_IMG_4589_upright.jpg',
        alt: 'Backyard cleared to bare dirt after concrete demolition in Pasadena',
        label: 'After',
      },
    ],
  },
  {
    title: 'Asphalt Removal & Site Clearance',
    city: 'Chino Hills',
    serviceSlug: 'driveway-removal',
    serviceName: 'Driveway Removal',
    blurb:
      'Old asphalt parking area milled out and hauled off, then the ground cleared and leveled for the next phase of construction.',
    photos: [
      {
        src: '/images/projects/chino_hills_asphalt_milling_2700.jpg',
        alt: 'Milling machine grinding out asphalt pavement in Chino Hills, CA',
        label: 'During',
      },
      {
        src: '/images/projects/chino_hills_asphalt_after_2706.jpg',
        alt: 'Site cleared and leveled after asphalt removal in Chino Hills, San Bernardino County',
        label: 'After',
      },
    ],
  },
  {
    title: 'Commercial Interior Demolition',
    city: null,
    serviceSlug: 'commercial-demolition',
    serviceName: 'Commercial Demolition',
    blurb:
      'Selective strip-out of interior walls and finishes, opening the space for its next tenant improvement build-out.',
    photos: [
      {
        src: '/images/projects/commercial_interior_demo_9491.jpg',
        alt: 'Interior wall opened to framing during commercial demolition with debris bin staged',
        label: 'During',
      },
    ],
  },
  {
    title: 'Commercial Warehouse Interior Demolition',
    city: null,
    serviceSlug: 'commercial-demolition',
    serviceName: 'Commercial Demolition',
    blurb:
      'Full interior strip-out of a clear-span warehouse — partitions, ceiling grid, and fixtures removed under dust containment, leaving a wide-open shell ready for the next build-out.',
    photos: [
      {
        src: '/images/projects/commercial_warehouse_demo_containment_2151.jpg',
        alt: 'Temporary dust-containment wall inside a clear-span warehouse during interior demolition',
        label: 'During',
      },
      {
        src: '/images/projects/commercial_warehouse_demo_wall_2826.jpg',
        alt: 'Interior metal-stud wall removed to framing with debris staged during warehouse demolition',
        label: 'During',
      },
      {
        src: '/images/projects/commercial_warehouse_demo_cleared_2850.jpg',
        alt: 'Wide-open warehouse interior swept clean after commercial interior demolition',
        label: 'After',
      },
    ],
  },
  {
    title: 'Shed Demolition',
    city: null,
    serviceSlug: 'shed-demolition',
    serviceName: 'Shed Demolition',
    blurb:
      'Backyard shed stripped to framing before full teardown and haul-away.',
    photos: [
      {
        src: '/images/projects/shed_demo_framing_8765.jpg',
        alt: 'Backyard shed stripped to framing during shed demolition',
        label: 'During',
      },
    ],
  },
];

export function getProjectsForService(serviceSlug: string): Project[] {
  return PROJECTS.filter((p) => p.serviceSlug === serviceSlug);
}
