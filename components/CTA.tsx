interface CTAProps {
  city: string;
  service: string;
}

export default function CTA({ city, service }: CTAProps) {
  return (
    <section className="bg-brand-orange text-white rounded-xl p-8 my-12 text-center">
      <h2 className="text-2xl font-bold mb-3">
        Ready to Start Your {service} Project in {city}?
      </h2>
      <p className="mb-6 text-orange-100">
        Get a free, no-obligation estimate from C&S Demolition. We serve {city} and all surrounding areas. Fast response, licensed &amp; insured.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="tel:+15622046335"
          className="bg-white text-brand-orange font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
        >
          📞 Call for a Free Quote
        </a>
        <a
          href="/contact"
          className="border-2 border-white text-white font-bold px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors"
        >
          Request Online Estimate
        </a>
      </div>
    </section>
  );
}
