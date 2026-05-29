'use client';

import { useEffect, useState } from 'react';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // Smooth scroll for in-page anchors
    const handler = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute('href')!.slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      const y = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: 'smooth' });
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`} aria-label="Primary">
      <a className="brand" href="#top" aria-label="Latitude Intelligence">
        <span className="brand-mark" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/latitude-mark.png" alt="" />
        </span>
        <span className="brand-name">
          Latitude <em>Intelligence</em>
        </span>
        <span className="brand-tag">EST. 2026</span>
      </a>
      <div className="nav-links">
        <a href="#about">About</a>
        <a href="#founder">Founder</a>
        <a href="#services">Services</a>
        <a href="#programs">Programs</a>
        <a href="#contact">Contact</a>
      </div>
      <a className="nav-cta" href="#contact">
        <span className="dot" />
        Start a Project
      </a>
    </nav>
  );
}
