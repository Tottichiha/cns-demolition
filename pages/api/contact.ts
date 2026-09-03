import type { NextApiRequest, NextApiResponse } from 'next';
import { scoreSubmission, normalizeEmail, escapeHtml, verifyTurnstile } from '../../lib/spamFilter';

/**
 * Blocked senders, from the BLOCKED_EMAILS env var (comma-separated).
 * Values are normalized the same way inbound addresses are, so one entry
 * kills every Gmail dot/+tag alias that account can produce.
 * Kept out of source so no real address lands in the repo.
 */
const BLOCKED_EMAILS = new Set<string>(
  (process.env.BLOCKED_EMAILS || '')
    .split(',')
    .map(e => normalizeEmail(e.trim()))
    .filter(Boolean)
);

/** Best-effort per-IP throttle. Serverless instances are short-lived, so this
 *  catches bursts from one warm instance rather than acting as a hard limit. */
const RATE_WINDOW_MS = 60 * 60 * 1000;
const RATE_MAX = 3;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter(t => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 500) hits.clear(); // keep memory bounded
  return recent.length > RATE_MAX;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, email, service, message, website, loadedAt, turnstileToken } = req.body || {};

  if (!name || !phone || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const ip =
    (req.headers['x-forwarded-for'] as string || '').split(',')[0].trim() ||
    req.socket.remoteAddress ||
    'unknown';

  // Respond 200 on every rejection. A bot that sees an error retries with
  // different values; one that sees success moves on.
  const silentOk = (why: string, extra?: unknown) => {
    console.warn(`[contact] blocked (${why})`, { ip, name, email, extra });
    return res.status(200).json({ success: true });
  };

  if (rateLimited(ip)) return silentOk('rate limit');

  const normalized = normalizeEmail(String(email));
  if (BLOCKED_EMAILS.has(normalized)) return silentOk('blocklist', normalized);

  const verdict = scoreSubmission({ name, phone, email, service, message, website, loadedAt });
  if (verdict.block) return silentOk('spam score', verdict);

  if (!(await verifyTurnstile(turnstileToken, ip))) return silentOk('turnstile');

  const safe = {
    name: escapeHtml(String(name)),
    phone: escapeHtml(String(phone)),
    email: escapeHtml(String(email)),
    service: escapeHtml(String(service || 'Not specified')),
    message: escapeHtml(String(message)),
  };

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'C&S Demolition <noreply@cnsdemo.com>',
        to: process.env.CONTACT_EMAIL || 'contactus@cnsdemo.com',
        reply_to: String(email),
        subject: `New Estimate Request — ${service || 'General'} — ${name}`,
        text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nService: ${service || 'Not specified'}\n\nMessage:\n${message}\n\n---\nSpam score: ${verdict.score} (block at 5)`,
        html: `
          <h2>New Estimate Request — C&S Demolition</h2>
          <table cellpadding="8" style="border-collapse:collapse;width:100%;max-width:600px">
            <tr><td style="font-weight:bold;width:120px">Name</td><td>${safe.name}</td></tr>
            <tr><td style="font-weight:bold">Phone</td><td><a href="tel:${safe.phone}">${safe.phone}</a></td></tr>
            <tr><td style="font-weight:bold">Email</td><td><a href="mailto:${safe.email}">${safe.email}</a></td></tr>
            <tr><td style="font-weight:bold">Service</td><td>${safe.service}</td></tr>
            <tr><td style="font-weight:bold;vertical-align:top">Message</td><td>${safe.message.replace(/\n/g, '<br>')}</td></tr>
          </table>
          <p style="color:#888;font-size:12px">Spam score ${verdict.score} of 5${verdict.reasons.length ? ` — ${escapeHtml(verdict.reasons.join(', '))}` : ''}</p>
        `,
      }),
    });

    if (!r.ok) {
      const body = await r.json();
      console.error('Resend error:', body);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Email send error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
