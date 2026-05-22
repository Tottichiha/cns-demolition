import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LAST_UPDATED = '2024-01-15';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | C&amp;S Demolition</title>
        <meta
          name="description"
          content="Privacy Policy for C&S Demolition (Scrapit LLC). How we collect, use, and protect your personal information in compliance with California privacy law (CCPA)."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://cnsdemo.com/privacy" />
        <meta property="og:title" content="Privacy Policy | C&S Demolition" />
        <meta property="og:description" content="Privacy Policy for C&S Demolition (Scrapit LLC). How we collect, use, and protect your information under California privacy law (CCPA)." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cnsdemo.com/privacy" />
        <meta name="twitter:card" content="summary" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: 'Privacy Policy | C&S Demolition',
              url: 'https://cnsdemo.com/privacy',
              description: 'Privacy Policy for C&S Demolition. How we collect, use, and protect your personal information.',
              breadcrumb: {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cnsdemo.com' },
                  { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: 'https://cnsdemo.com/privacy' },
                ],
              },
            }),
          }}
        />
      </Head>

      <Header />

      <main>
        <section className="bg-brand-dark text-white py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <nav className="text-sm text-gray-400 mb-4 flex flex-wrap gap-1">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white">Privacy Policy</span>
            </nav>
            <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
            <p className="text-gray-400 text-sm">Last updated: {new Date(LAST_UPDATED).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="prose prose-lg max-w-none text-gray-700">

            <section className="mb-8">
              <h2 className="text-xl font-bold text-brand-dark mb-3">1. Overview</h2>
              <p className="mb-4">
                C&amp;S Demolition is a DBA of Scrapit LLC, a California-licensed demolition contractor (License #1126325) operating at cnsdemo.com. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website or contact us for services.
              </p>
              <p>
                We are committed to protecting your privacy and complying with the California Consumer Privacy Act (CCPA) and other applicable privacy laws. By using this website, you agree to the terms of this Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-brand-dark mb-3">2. Information We Collect</h2>
              <p className="mb-3">We collect the following types of information:</p>
              <p className="font-semibold mb-2">Information you provide directly:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Name and contact information (phone number, email address)</li>
                <li>Property address for estimate requests</li>
                <li>Project details and description you submit through our contact form</li>
              </ul>
              <p className="font-semibold mb-2">Information collected automatically:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>IP address and approximate geographic location</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent on the site</li>
                <li>Referring website or search query</li>
                <li>Phone call tracking data (if you call via tracked phone number)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-brand-dark mb-3">3. How We Use Your Information</h2>
              <p className="mb-3">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Respond to your estimate requests and inquiries</li>
                <li>Schedule and confirm on-site estimates and job appointments</li>
                <li>Send you a written quote and project communications</li>
                <li>Improve our website and understand how visitors use it (via Google Analytics)</li>
                <li>Comply with legal obligations</li>
              </ul>
              <p className="mt-4">
                We do <strong>not</strong> sell, rent, or share your personal information with third parties for marketing purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-brand-dark mb-3">4. Google Analytics</h2>
              <p>
                This website uses Google Analytics, a web analytics service provided by Google LLC. Google Analytics uses cookies and similar technologies to collect anonymized data about website usage. This data is processed by Google and used to help us understand visitor behavior and improve our site. You can opt out of Google Analytics tracking by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-brand-orange hover:underline">Google Analytics Opt-out Browser Add-on</a>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-brand-dark mb-3">5. Cookies</h2>
              <p>
                Our website uses cookies to improve your browsing experience. These include session cookies (necessary for site functionality) and analytics cookies (Google Analytics). You can control cookies through your browser settings. Disabling cookies may affect some website functionality.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-brand-dark mb-3">6. Data Retention</h2>
              <p>
                We retain contact form submissions and quote-related communications for as long as needed to fulfill the requested services and comply with applicable laws. Analytics data is retained according to Google Analytics default retention settings (26 months). You may request deletion of your personal data at any time (see Section 8).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-brand-dark mb-3">7. California Privacy Rights (CCPA)</h2>
              <p className="mb-3">As a California resident, you have the following rights under the California Consumer Privacy Act:</p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li><strong>Right to Know:</strong> You may request information about what personal data we have collected about you.</li>
                <li><strong>Right to Delete:</strong> You may request that we delete personal data we have collected about you, subject to certain exceptions.</li>
                <li><strong>Right to Opt-Out:</strong> We do not sell personal information. If this changes, we will notify you and provide an opt-out mechanism.</li>
                <li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising your privacy rights.</li>
              </ul>
              <p>
                To exercise your rights, contact us at <a href="mailto:contactus@cnsdemo.com" className="text-brand-orange hover:underline">contactus@cnsdemo.com</a> or call <a href="tel:+15622046335" className="text-brand-orange hover:underline">(562) 204-6335</a>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-brand-dark mb-3">8. Contact Us</h2>
              <p className="mb-4">For any privacy-related questions or requests, contact:</p>
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <p className="font-semibold">C&amp;S Demolition / Scrapit LLC</p>
                <p>CA Contractor License #1126325</p>
                <p>Email: <a href="mailto:contactus@cnsdemo.com" className="text-brand-orange hover:underline">contactus@cnsdemo.com</a></p>
                <p>Phone: <a href="tel:+15622046335" className="text-brand-orange hover:underline">(562) 204-6335</a></p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-brand-dark mb-3">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy periodically. The "Last updated" date at the top of this page will reflect any changes. Continued use of our website after changes constitutes acceptance of the updated policy.
              </p>
            </section>

          </div>

          <div className="mt-12 border-t border-gray-200 pt-8 flex flex-wrap gap-4">
            <Link href="/contact" className="text-brand-orange hover:underline font-semibold">Get a Free Estimate →</Link>
            <Link href="/about" className="text-gray-600 hover:text-brand-orange">About C&S Demolition</Link>
            <Link href="/services" className="text-gray-600 hover:text-brand-orange">Our Services</Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
