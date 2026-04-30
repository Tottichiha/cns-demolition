import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, email, service, message } = req.body;

  if (!name || !phone || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

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
        reply_to: email,
        subject: `New Estimate Request — ${service || 'General'} — ${name}`,
        text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nService: ${service || 'Not specified'}\n\nMessage:\n${message}`,
        html: `
          <h2>New Estimate Request — C&S Demolition</h2>
          <table cellpadding="8" style="border-collapse:collapse;width:100%;max-width:600px">
            <tr><td style="font-weight:bold;width:120px">Name</td><td>${name}</td></tr>
            <tr><td style="font-weight:bold">Phone</td><td><a href="tel:${phone}">${phone}</a></td></tr>
            <tr><td style="font-weight:bold">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="font-weight:bold">Service</td><td>${service || 'Not specified'}</td></tr>
            <tr><td style="font-weight:bold;vertical-align:top">Message</td><td>${message.replace(/\n/g, '<br>')}</td></tr>
          </table>
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
