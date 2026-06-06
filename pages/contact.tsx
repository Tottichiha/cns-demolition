import Head from 'next/head';
import { useState, FormEvent } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SERVICES = [
  'Interior Demolition',
  'Pool Demolition & Removal',
  'Shed / Structure Demolition',
  'Deck Demolition',
  'Wall Removal',
  'Concrete Removal',
  'Kitchen Demolition',
  'Bathroom Demolition',
  'Garage Demolition',
  'Fence Removal',
  'Driveway Removal',
  'Chimney Demolition',
  'Commercial Demolition',
  'Mobile Home Demolition',
  'Other / Not Sure',
];

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('sent');
      if (typeof window.gtag === 'function') window.gtag('event', 'form_submit', { event_category: 'contact', event_label: 'free_estimate' });
      setForm({ name: '', phone: '', email: '', service: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <Head>
        <title>Free Estimate | C&S Demolition</title>
        <meta name="description" content="Request a free on-site demolition estimate. C&S Demolition serves 123+ SoCal cities — interior demo, pool removal, concrete, and more. Licensed & insured." />
        <link rel="canonical" href="https://cnsdemo.com/contact" />
        <meta property="og:title" content="Free Estimate | C&S Demolition" />
        <meta property="og:description" content="Request a free on-site demolition estimate. C&S Demolition serves 123+ SoCal cities. Licensed & insured. Call (562) 204-6335." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cnsdemo.com/contact" />
        <meta property="og:image" content="https://cnsdemo.com/api/og?title=Free+Demolition+Estimate&sub=On-Site+%C2%B7+Same-Day+Quote+%C2%B7+CA+Lic+%231126325&type=contact" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://cnsdemo.com/api/og?title=Free+Demolition+Estimate&sub=On-Site+%C2%B7+Same-Day+Quote+%C2%B7+CA+Lic+%231126325&type=contact" />
        <meta name="twitter:image:alt" content="Get a Free Demolition Estimate — C&S Demolition" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': ['LocalBusiness', 'HomeAndConstructionBusiness', 'GeneralContractor'],
                  '@id': 'https://cnsdemo.com/#business',
                  name: 'C&S Demolition',
                  legalName: 'Scrapit LLC',
                  url: 'https://cnsdemo.com',
                  telephone: '+15622046335',
                  email: 'contactus@cnsdemo.com',
                  license: '1126325',
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Long Beach',
                    addressRegion: 'CA',
                    postalCode: '90802',
                    addressCountry: 'US',
                  },
                },
                {
                  '@type': 'ContactPage',
                  '@id': 'https://cnsdemo.com/contact',
                  name: 'Free Demolition Estimate — C&S Demolition',
                  description: 'Request a free on-site demolition estimate. We serve 123+ cities across Southern California.',
                  url: 'https://cnsdemo.com/contact',
                  breadcrumb: {
                    '@type': 'BreadcrumbList',
                    itemListElement: [
                      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cnsdemo.com' },
                      { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://cnsdemo.com/contact' },
                    ],
                  },
                },
              ],
            })
          }}
        />
      </Head>
      <Header />

      <main className="bg-gray-50 min-h-screen">
        {/* Hero */}
        <div className="bg-brand-dark text-white py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <nav className="text-sm text-gray-400 mb-4 flex flex-wrap gap-1">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white">Free Estimate</span>
            </nav>
            <h1 className="text-3xl font-bold mb-2">Get a Free Demolition Estimate</h1>
            <p className="text-gray-300">
              Fill out the form below or call <a href="tel:+15622046335" className="text-brand-orange font-semibold">(562) 204-6335</a>. We respond within 24 hours and schedule an on-site visit for a written quote.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form column */}
          <div className="lg:col-span-2">

          {status === 'sent' ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
              <div className="text-4xl mb-3">✓</div>
              <h2 className="text-xl font-bold text-green-800 mb-2">Message received!</h2>
              <p className="text-green-700">We&apos;ll review your project and reach out within 24 hours to schedule your free on-site estimate.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="John Smith"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="(714) 555-0100"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Type of Service</label>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                >
                  <option value="">Select a service...</option>
                  {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Project Details *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Describe your project — what needs to be demolished, approximate size, city/zip code, and any other relevant details."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent resize-none"
                />
              </div>

              {status === 'error' && (
                <p className="text-red-600 text-sm">Something went wrong. Please try again or call <a href="tel:+15622046335" className="underline">(562) 204-6335</a>.</p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-brand-orange text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Sending...' : 'Request Free Estimate'}
              </button>

              <p className="text-xs text-gray-400 text-center">CA License #1126325 · Licensed &amp; Insured · No spam, ever.</p>
            </form>
          )}
          </div>{/* end form column */}

          {/* Trust sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-bold text-brand-dark mb-4">Why C&amp;S Demolition?</h2>
              <ul className="space-y-3 text-sm text-gray-700">
                {[
                  { icon: '✓', text: 'CA License #1126325 — active, verifiable at cslb.ca.gov' },
                  { icon: '✓', text: 'General liability + workers\' comp on every job' },
                  { icon: '✓', text: 'Free on-site estimate — written quote same day' },
                  { icon: '✓', text: 'All-inclusive: demo, permits, haul-away, cleanup' },
                  { icon: '✓', text: 'Locally owned & operated — based in Long Beach, CA' },
                  { icon: '✓', text: '123+ cities across 4 SoCal counties' },
                  { icon: '✓', text: 'No hourly billing — lump-sum pricing only' },
                ].map((item, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span className="text-brand-orange font-bold flex-shrink-0">{item.icon}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-brand-orange text-white rounded-xl p-6 text-center">
              <p className="font-bold text-lg mb-1">Call or Text</p>
              <a href="tel:+15622046335" className="text-2xl font-bold block hover:text-orange-100 transition-colors">
                (562) 204-6335
              </a>
              <p className="text-orange-100 text-sm mt-2">Mon–Fri 7AM–6PM · Sat 8AM–4PM</p>
            </div>

            <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
              <p className="text-xs text-gray-500 leading-relaxed">
                C&amp;S Demolition is a DBA of Scrapit LLC. CA Contractor License #1126325. We do not share your information with third parties. View our <Link href="/privacy" className="text-brand-orange hover:underline">Privacy Policy</Link>.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
