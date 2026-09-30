import { useState, useRef, FormEvent } from 'react';

const JOB_TYPES = [
  'Commercial / Interior Demolition',
  'Whole House or Garage',
  'Concrete or Block Wall',
  'Kitchen, Bath or Flooring',
  'Yard / Site Clearing',
  'Other / Not Sure',
];

const field =
  'w-full mt-1.5 text-base px-3.5 py-3 border border-[#CFC8C6] rounded-lg bg-white text-brand-ink placeholder:text-[#6E6563] focus:outline-none focus:border-brand-red focus:ring-4 focus:ring-brand-red/20';

// Posts to the same /api/contact endpoint as the contact page, with the same
// honeypot + loadedAt anti-spam fields and the GA4 form_submit event.
export default function HomeBidForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: JOB_TYPES[0], message: '' });
  const [website, setWebsite] = useState('');
  const loadedAt = useRef<number>(Date.now());

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, website, loadedAt: loadedAt.current, turnstileToken: '' }),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('sent');
      if (typeof window.gtag === 'function')
        window.gtag('event', 'form_submit', { event_category: 'contact', event_label: 'homepage_bid' });
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="bg-white border border-brand-line rounded-2xl p-8 shadow-[0_20px_50px_-30px_rgba(40,20,20,0.35)]">
        <h3 className="font-display text-3xl font-extrabold mb-2">Got it. Thanks.</h3>
        <p className="text-brand-ink-2">We&apos;ll look it over and get back to you with questions or a price. Need us sooner? Call <a className="font-semibold text-brand-red" href="tel:+15622046335">(562) 204-6335</a>.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bg-white border border-brand-line rounded-2xl p-7 sm:p-8 shadow-[0_20px_50px_-30px_rgba(40,20,20,0.35)]">
      <h3 className="font-display text-3xl font-extrabold mb-2">Request a bid</h3>
      {/* Honeypot. Hidden from people, irresistible to bots. Do not remove. */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
        <label htmlFor="hp-website">Website</label>
        <input id="hp-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>
      <div className="grid sm:grid-cols-2 gap-x-4">
        <label className="block text-sm font-semibold mt-4">Name
          <input className={field} name="name" autoComplete="name" required value={form.name} onChange={onChange} />
        </label>
        <label className="block text-sm font-semibold mt-4">Phone
          <input className={field} name="phone" type="tel" autoComplete="tel" required value={form.phone} onChange={onChange} />
        </label>
      </div>
      <label className="block text-sm font-semibold mt-4">Email
        <input className={field} name="email" type="email" autoComplete="email" required value={form.email} onChange={onChange} />
      </label>
      <label className="block text-sm font-semibold mt-4">Type of job
        <select className={field} name="service" value={form.service} onChange={onChange}>
          {JOB_TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </label>
      <label className="block text-sm font-semibold mt-4">Project details
        <textarea className={`${field} min-h-[120px] resize-y`} name="message" required placeholder="City, rough size, what comes out, when you need it done" value={form.message} onChange={onChange} />
      </label>
      {status === 'error' && (
        <p className="mt-4 text-sm font-semibold text-brand-red-deep">That didn&apos;t send. Please call (562) 204-6335 or email contactus@cnsdemo.com.</p>
      )}
      <button type="submit" disabled={status === 'sending'} className="mt-5 w-full bg-brand-red hover:bg-brand-red-deep disabled:opacity-60 text-white font-display font-bold text-lg py-3.5 rounded-lg transition-colors">
        {status === 'sending' ? 'Sending…' : 'Send request'}
      </button>
    </form>
  );
}
