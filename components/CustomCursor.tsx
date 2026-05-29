'use client';

import { useEffect } from 'react';

/**
 * Custom blend-mode cursor (dot + ring) — only mounts on fine-pointer devices.
 */
export default function CustomCursor() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = document.createElement('div');
    const ring = document.createElement('div');
    dot.className = 'cursor-dot';
    ring.className = 'cursor-ring';
    document.body.appendChild(ring);
    document.body.appendChild(dot);

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener('mousemove', onMove);

    let raf = 0;
    const tick = () => {
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    tick();

    const hoverSel =
      'a, button, .program, .service-card, .chip, input, select, textarea, .read-more, .nav-cta, .social-link';
    const over = (e: Event) => {
      if ((e.target as HTMLElement).closest(hoverSel)) ring.classList.add('hover');
    };
    const out = (e: Event) => {
      if ((e.target as HTMLElement).closest(hoverSel)) ring.classList.remove('hover');
    };
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
      dot.remove();
      ring.remove();
    };
  }, []);

  return null;
}
