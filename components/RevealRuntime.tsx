'use client';

import { useEffect } from 'react';

/**
 * Global runtime: reveal-on-scroll, counters, magnetic buttons, service-card glow,
 * parallax, story modal open/close, and contact form glow tracking.
 * Reads data-attributes from the DOM so components stay declarative.
 */
export default function RevealRuntime() {
  useEffect(() => {
    /* -------- Reveal on scroll -------- */
    const revealEls = document.querySelectorAll<HTMLElement>('[data-reveal]');

    const revealInView = () => {
      const vh = window.innerHeight;
      revealEls.forEach((el) => {
        if (el.classList.contains('in')) return;
        const r = el.getBoundingClientRect();
        if (r.top < vh && r.bottom > 0) el.classList.add('in');
      });
    };
    revealInView();

    let ioFired = false;
    const io = new IntersectionObserver(
      (entries) => {
        ioFired = true;
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));

    const onScroll = () => revealInView();
    window.addEventListener('scroll', onScroll, { passive: true });

    const safety1 = window.setTimeout(() => {
      if (!ioFired) revealInView();
    }, 800);
    const safety2 = window.setTimeout(() => {
      revealEls.forEach((el) => el.classList.add('in'));
    }, 2400);

    /* -------- Counters -------- */
    const countEls = document.querySelectorAll<HTMLElement>('[data-count]');
    const started = new WeakSet<HTMLElement>();
    const runCount = (el: HTMLElement) => {
      if (started.has(el)) return;
      started.add(el);
      const target = parseInt(el.getAttribute('data-count') || '0', 10);
      const dur = 1400;
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * eased).toString();
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const checkCounts = () => {
      const vh = window.innerHeight;
      countEls.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.9 && r.bottom > 0) runCount(el);
      });
    };
    checkCounts();
    window.addEventListener('scroll', checkCounts, { passive: true });
    const countIo = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && runCount(e.target as HTMLElement)),
      { threshold: 0.4 }
    );
    countEls.forEach((el) => countIo.observe(el));
    const safety3 = window.setTimeout(checkCounts, 1200);

    /* -------- Magnetic buttons + glow tracking -------- */
    const magnetic = document.querySelectorAll<HTMLElement>(
      '.btn, .nav-cta, .social-link, .read-more'
    );
    const moveHandlers = new Map<HTMLElement, (e: MouseEvent) => void>();
    const leaveHandlers = new Map<HTMLElement, () => void>();
    magnetic.forEach((el) => {
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
        el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
        el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
      };
      const onLeave = () => {
        el.style.transform = '';
      };
      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
      moveHandlers.set(el, onMove);
      leaveHandlers.set(el, onLeave);
    });

    const serviceCards = document.querySelectorAll<HTMLElement>('.service-card');
    const cardMoveHandlers = new Map<HTMLElement, (e: MouseEvent) => void>();
    serviceCards.forEach((card) => {
      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
        card.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
      };
      card.addEventListener('mousemove', onMove);
      cardMoveHandlers.set(card, onMove);
    });

    /* -------- Parallax -------- */
    const parallaxEls = document.querySelectorAll<HTMLElement>('[data-parallax]');
    const onParallaxScroll = () => {
      const vh = window.innerHeight;
      parallaxEls.forEach((el) => {
        const r = el.getBoundingClientRect();
        const k = (r.top + r.height / 2 - vh / 2) / vh;
        const amt = parseFloat(el.getAttribute('data-parallax') || '14');
        el.style.transform = `translateY(${k * -amt}px)`;
      });
    };
    onParallaxScroll();
    window.addEventListener('scroll', onParallaxScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', checkCounts);
      window.removeEventListener('scroll', onParallaxScroll);
      io.disconnect();
      countIo.disconnect();
      clearTimeout(safety1);
      clearTimeout(safety2);
      clearTimeout(safety3);
      moveHandlers.forEach((h, el) => el.removeEventListener('mousemove', h));
      leaveHandlers.forEach((h, el) => el.removeEventListener('mouseleave', h));
      cardMoveHandlers.forEach((h, el) => el.removeEventListener('mousemove', h));
    };
  }, []);

  return null;
}
