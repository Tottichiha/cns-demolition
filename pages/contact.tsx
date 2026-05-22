import Head from 'next/head';
import { useState, FormEvent } from 'react';
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
        <meta name="description" content="Request a free on-site demolition estimate. C&S Demolition serves 125+ SoCal cities — interior demo, pool removal, concrete, and more. Licensed & insured." />
        <link rel="canonical" href="https://cnsdemo.com/contact" />
        <meta property="og:title" content="Free Estimate | C&S Demolition" />
        <meta property="og:description" content="Request a free on-site demolition estimate. C&S Demolition serves 123+ SoCal cities. Licensed & insured. Call (562) 204-6335." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cnsdemo.com/contact" />
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
                  aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: '4.9',
                    reviewCount: '87',
                    bestRating: '5',
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

      <main className="bg-gray-50 min-h-screen py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-brand-dark mb-2">Get a Free Estimate</h1>
          <p className="text-gray-600 mb-8">
            Tell us about your project and we&apos;ll get back to you within 24 hours. Or call us directly at{' '}
            <a href="tel:+15622046335" className="text-brand-orange font-semibold">(562) 204-6335</a>.
          </p>

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
        </div>
      </main>

      <Footer />
    </>
  );
}
