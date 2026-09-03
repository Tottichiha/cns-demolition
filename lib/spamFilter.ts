/**
 * Spam scoring for the contact form.
 *
 * Score-based, not hard rules — a real customer typing fast in all lowercase
 * should never be blocked. Each signal adds points; BLOCK_THRESHOLD is set so
 * that it takes two or more independent bot tells to reject a submission.
 */

export const BLOCK_THRESHOLD = 5;

export type SpamInput = {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  message?: string;
  /** honeypot — must stay empty */
  website?: string;
  /** ms epoch stamped when the form mounted */
  loadedAt?: number;
};

export type SpamVerdict = {
  block: boolean;
  score: number;
  reasons: string[];
};

/** Gmail ignores dots and anything after "+", so one account yields infinite aliases. */
export function normalizeEmail(raw: string): string {
  const email = (raw || '').trim().toLowerCase();
  const at = email.lastIndexOf('@');
  if (at < 1) return email;
  let local = email.slice(0, at);
  const domain = email.slice(at + 1);
  if (domain === 'gmail.com' || domain === 'googlemail.com') {
    local = local.split('+')[0].replace(/\./g, '');
    return `${local}@gmail.com`;
  }
  local = local.split('+')[0];
  return `${local}@${domain}`;
}

const VOWELS = /[aeiouAEIOU]/;
const URL_RE = /(https?:\/\/|www\.|\[url|<a\s)/i;

/** Count lower->upper / upper->lower transitions. Random strings switch constantly. */
function caseSwitches(s: string): number {
  let n = 0;
  for (let i = 1; i < s.length; i++) {
    const a = s[i - 1];
    const b = s[i];
    if (/[a-zA-Z]/.test(a) && /[a-zA-Z]/.test(b)) {
      const aUp = a === a.toUpperCase();
      const bUp = b === b.toUpperCase();
      if (aUp !== bUp) n++;
    }
  }
  return n;
}

export function scoreSubmission(input: SpamInput): SpamVerdict {
  const reasons: string[] = [];
  let score = 0;

  const name = (input.name || '').trim();
  const phone = (input.phone || '').trim();
  const email = (input.email || '').trim();
  const message = (input.message || '').trim();

  // --- Hard tells: any one of these is decisive -----------------------------

  // 1. Honeypot. A hidden field no human ever sees or fills.
  if ((input.website || '').trim() !== '') {
    score += 10;
    reasons.push('honeypot filled');
  }

  // 2. Submitted faster than a human can type the form.
  if (typeof input.loadedAt === 'number' && input.loadedAt > 0) {
    const elapsed = Date.now() - input.loadedAt;
    if (elapsed < 3000) {
      score += 10;
      reasons.push(`submitted in ${elapsed}ms`);
    } else if (elapsed > 24 * 60 * 60 * 1000) {
      score += 5;
      reasons.push('stale form token');
    }
  }

  // --- Name signals ---------------------------------------------------------

  if (name.length >= 8 && !VOWELS.test(name)) {
    score += 5;
    reasons.push('name has no vowels');
  }
  if (name.length >= 12 && !/\s/.test(name) && caseSwitches(name) >= 6) {
    score += 5;
    reasons.push('name is random mixed case');
  }
  if (URL_RE.test(name)) {
    score += 6;
    reasons.push('url in name');
  }

  // --- Email signals --------------------------------------------------------

  const at = email.lastIndexOf('@');
  if (at > 0) {
    const local = email.slice(0, at);
    const domain = email.slice(at + 1).toLowerCase();
    const dots = (local.match(/\./g) || []).length;
    if ((domain === 'gmail.com' || domain === 'googlemail.com') && dots >= 4) {
      score += 6;
      reasons.push(`gmail dot-abuse (${dots} dots)`);
    }
  }

  // --- Message signals ------------------------------------------------------

  if (message.length > 0 && /^[\d\s.,-]+$/.test(message)) {
    score += 6;
    reasons.push('message is digits only');
  }
  if (message.length < 8) {
    score += 3;
    reasons.push('message too short');
  }
  if (URL_RE.test(message)) {
    score += 4;
    reasons.push('url in message');
  }
  if (/\b(seo|backlink|crypto|bitcoin|loan|casino|viagra|rank your site|guest post|web design services)\b/i.test(message)) {
    score += 5;
    reasons.push('solicitation keyword');
  }
  // One long unbroken token, e.g. a pasted random string.
  if (/^\S{20,}$/.test(message)) {
    score += 4;
    reasons.push('message is one long token');
  }

  // --- Phone signals --------------------------------------------------------

  const digits = phone.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 15) {
    score += 3;
    reasons.push('phone not a plausible length');
  }
  if (/^(\d)\1+$/.test(digits)) {
    score += 5;
    reasons.push('phone is a repeated digit');
  }

  return { block: score >= BLOCK_THRESHOLD, score, reasons };
}

/** Escape user text before it goes into the notification email's HTML. */
export function escapeHtml(s: string): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Cloudflare Turnstile. Inert until TURNSTILE_SECRET_KEY is set, so the site
 * keeps working before the keys exist; adding the env vars turns it on.
 */
export async function verifyTurnstile(token: string | undefined, ip?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured yet
  if (!token) return false;
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.append('remoteip', ip);
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });
    const data = (await r.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}
