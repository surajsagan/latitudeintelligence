import { NextResponse } from 'next/server';

export const runtime = 'edge';

type Payload = {
  name?: string;
  role?: string;
  email?: string;
  phone?: string;
  service?: string;
  deadline?: string;
  details?: string;
};

const TO = process.env.CONTACT_TO_EMAIL || 'info@latitudeintelligence.in';
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM =
  process.env.RESEND_FROM_EMAIL || 'Latitude Intelligence <onboarding@resend.dev>';

function esc(s = '') {
  return String(s).replace(/[&<>"]/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] || c)
  );
}

function buildTeamEmail(p: Payload) {
  const subject = `New inquiry — ${p.service || 'Latitude Intelligence'}`;
  const html = `
  <div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;line-height:1.6">
    <h2>New project inquiry</h2>
    <table cellpadding="6" style="border-collapse:collapse">
      <tr><td><b>Name</b></td><td>${esc(p.name)}</td></tr>
      <tr><td><b>Role</b></td><td>${esc(p.role || '—')}</td></tr>
      <tr><td><b>Email</b></td><td>${esc(p.email)}</td></tr>
      <tr><td><b>Phone</b></td><td>${esc(p.phone || '—')}</td></tr>
      <tr><td><b>Service</b></td><td>${esc(p.service || '—')}</td></tr>
      <tr><td><b>Deadline</b></td><td>${esc(p.deadline || '—')}</td></tr>
    </table>
    <h3>Project details</h3>
    <p style="white-space:pre-wrap">${esc(p.details || '—')}</p>
  </div>`;
  return { subject, html };
}

function buildConfirmEmail() {
  return {
    subject: 'Thank you for reaching Latitude Intelligence',
    html: `
    <div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;line-height:1.6">
      <p>Thank you for reaching Latitude Intelligence.</p>
      <p>Our team will review your request and respond shortly.</p>
      <p style="color:#666;font-size:13px;margin-top:24px">
        — The Latitude Intelligence Team<br/>
        <a href="mailto:info@latitudeintelligence.in">info@latitudeintelligence.in</a>
      </p>
    </div>`
  };
}

async function sendViaResend(to: string, subject: string, html: string) {
  if (!RESEND_API_KEY) return null;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ from: RESEND_FROM, to, subject, html })
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
  return res.json();
}

export async function POST(req: Request) {
  let data: Payload;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  if (!data.name || !data.email || !data.details) {
    return NextResponse.json({ error: 'missing_fields' }, { status: 400 });
  }

  const { subject, html } = buildTeamEmail(data);
  const confirm = buildConfirmEmail();

  if (!RESEND_API_KEY) {
    // Dev mode: log to server, frontend will still mark success
    console.log('[contact] NEW INQUIRY (no RESEND_API_KEY configured):', data);
    return NextResponse.json({ ok: true, mode: 'logged' });
  }

  try {
    // 1) Notify the team
    await sendViaResend(TO, subject, html);
    // 2) Confirm to the user
    if (data.email) await sendViaResend(data.email, confirm.subject, confirm.html);
    return NextResponse.json({ ok: true, mode: 'email_sent' });
  } catch (err) {
    console.error('[contact] send failed', err);
    return NextResponse.json(
      { error: 'send_failed', message: (err as Error).message },
      { status: 502 }
    );
  }
}
