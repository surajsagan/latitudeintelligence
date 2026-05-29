'use client';

import { useRef, useState, FormEvent } from 'react';

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const validate = (form: HTMLFormElement) => {
    let ok = true;
    form.querySelectorAll<HTMLInputElement>('[required]').forEach((input) => {
      const field = input.closest('.field');
      const valid = input.checkValidity() && input.value.trim() !== '';
      field?.classList.toggle('invalid', !valid);
      if (!valid) ok = false;
    });
    return ok;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!validate(form)) return;
    setStatus('submitting');

    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus('success');
      form.reset();
    } catch (err: unknown) {
      // Fall back to mailto so the user is never blocked
      const subject = `New inquiry — ${data.service || 'Latitude Intelligence'}`;
      const body = `Name: ${data.name}
Role: ${data.role || '—'}
Email: ${data.email}
Phone: ${data.phone || '—'}
Service: ${data.service || '—'}
Deadline: ${data.deadline || '—'}

Project details:
${data.details || '—'}`;
      window.location.href = `mailto:info@latitudeintelligence.in?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      setErrorMsg(err instanceof Error ? err.message : 'Network error');
      setStatus('success'); // still show success — mailto opened
      form.reset();
    }
  };

  const clearInvalid = (e: React.FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const input = e.currentTarget;
    const field = input.closest('.field');
    if (field?.classList.contains('invalid') && input.value.trim() !== '') {
      field.classList.remove('invalid');
    }
  };

  return (
    <section id="contact">
      <div className="coord-tick">
        <span>SECTION · 06</span>
        <span>CONTACT</span>
      </div>
      <div className="wrap">
        <div className="section-head" data-reveal>
          <span className="section-tag">Start a Project</span>
          <h2 className="section-title">
            Let’s build research that <em>matters</em>.
          </h2>
          <p className="section-sub">
            Tell us about your project — manuscript, map, model, or mentorship. We’ll review your
            request and respond shortly.
          </p>
        </div>

        <div className="contact-wrap">
          <div className="contact-info" data-reveal>
            <p>
              For research collaborations, manuscript support, GIS commissions, or training cohorts —
              reach the team directly.
            </p>
            <ul className="contact-list">
              <li>
                <span className="ico" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                </span>
                <span>
                  <small>Email</small>
                  <a href="mailto:info@latitudeintelligence.in">info@latitudeintelligence.in</a>
                </span>
              </li>
              <li>
                <span className="ico" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <path d="M5 4h4l2 5-2 1a12 12 0 006 6l1-2 5 2v4a2 2 0 01-2 2A17 17 0 013 6a2 2 0 012-2z" />
                  </svg>
                </span>
                <span>
                  <small>Phone · WhatsApp</small>
                  <a href="tel:+918105220702">+91 8105 220 702</a>
                </span>
              </li>
              <li>
                <span className="ico" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <path d="M12 22s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </span>
                <span>
                  <small>Office</small>
                  <span>#7, Kaveri Nagara, Bannimantapa, Mysuru&#8209;15</span>
                </span>
              </li>
            </ul>

            <div className="calendly-card">
              <span className="label">Schedule a call</span>
              <h4>Book a 30-min consult</h4>
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                Open Calendly
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M5 3h8v8M13 3L3 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </a>
            </div>
          </div>

          <form
            className="contact-form"
            ref={formRef}
            noValidate
            onSubmit={onSubmit}
            data-reveal
            data-reveal-delay="2"
          >
            <div className="field-row">
              <div className="field">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" required autoComplete="name" placeholder="Dr. Jane Doe" onInput={clearInvalid} />
                <span className="err">Please enter your name.</span>
              </div>
              <div className="field">
                <label htmlFor="role">Role / Designation</label>
                <input type="text" id="role" name="role" autoComplete="organization-title" placeholder="Ph.D. Scholar, Researcher, Faculty…" />
              </div>
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" required autoComplete="email" placeholder="you@institution.edu" onInput={clearInvalid} />
                <span className="err">A valid email is required.</span>
              </div>
              <div className="field">
                <label htmlFor="phone">Phone / WhatsApp</label>
                <input type="tel" id="phone" name="phone" autoComplete="tel" placeholder="+91 …" />
              </div>
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="service">Service Interested In</label>
                <select id="service" name="service" required defaultValue="" onInput={clearInvalid}>
                  <option value="" disabled>
                    Select a service…
                  </option>
                  <option>Research Intelligence</option>
                  <option>Academic Writing &amp; Publication</option>
                  <option>GIS &amp; Spatial Analytics</option>
                  <option>Research Training &amp; Capacity Building</option>
                  <option>Other / Consult</option>
                </select>
                <span className="err">Please choose a service.</span>
              </div>
              <div className="field">
                <label htmlFor="deadline">Deadline / Timeline</label>
                <input type="text" id="deadline" name="deadline" placeholder="e.g. 6 weeks, by Aug 2026" />
              </div>
            </div>

            <div className="field">
              <label htmlFor="details">Requirement / Project Details</label>
              <textarea
                id="details"
                name="details"
                required
                placeholder="Brief context — discipline, data, scope, journals you’re targeting…"
                onInput={clearInvalid}
              />
              <span className="err">Please describe your project.</span>
            </div>

            <div className={`form-success${status === 'success' ? ' show' : ''}`}>
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M3 8.5l3.2 3 6.8-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>
                Thanks for reaching us. We will get back to you soon — a confirmation has been queued
                to your inbox.
              </span>
            </div>

            <div className="form-submit">
              <span className="form-disclaimer">
                Your details route to info@latitudeintelligence.in · usual reply within 24h
              </span>
              <button type="submit" className="btn btn-primary" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending…' : 'Send Inquiry'}
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
