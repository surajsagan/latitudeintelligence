'use client';

import { useEffect, useState } from 'react';

export default function StoryModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.documentElement.classList.add('no-scroll');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.classList.remove('no-scroll');
    };
  }, [open, onClose]);

  return (
    <div
      className={`modal-backdrop${open ? ' open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="storyTitle"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal">
        <button className="modal-close" aria-label="Close" onClick={onClose}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
        <div className="modal-eyebrow">Founder’s Note · The Story Behind Latitude Intelligence</div>
        <h3 id="storyTitle">A map, a pulse, and the courage to listen.</h3>
        <div className="story-body">
          <p>
            Every great venture begins when someone looks at a map and decides to see more than just
            lines, data points, and boundaries. For Suraj Sagan, the inception of{' '}
            <strong>Latitude Intelligence</strong> wasn’t just a business decision; it was the natural
            convergence of a lifelong obsession with space, science, and human impact.
          </p>
          <p>
            Named in a quiet nod to the boundless curiosity of Carl Sagan—who famously reminded us
            that we are a way for the cosmos to know itself—Latitude Intelligence was born out of a
            simple, powerful realization:{' '}
            <strong>Data has a pulse, but only if you know where to look, and how to tell its story.</strong>
          </p>
          <p>
            As a spatial data scientist embedded in the world of healthcare analytics, Suraj spent
            years watching a profound disconnect in the scientific community. He saw brilliant
            research stifled by complex formatting, critical public health insights lost in
            translation, and visionary scholars struggling to bridge the gap between advanced
            technology and impactful publication. He watched raw medical metrics and spatial
            coordinates that could save lives get treated like static numbers, rather than dynamic
            narratives waiting to be told.
          </p>
          <p>
            He realized the world didn’t just need more data; it needed a complete ecosystem. What
            good is groundbreaking GeoAI if it cannot be articulated into a high-impact manuscript?
            What good is advanced spatial analysis if the next generation of researchers isn’t
            equipped to wield it?
          </p>
          <p>
            Driven by the grit of a researcher and the vision of an innovator, Latitude Intelligence
            was founded to be the ultimate bridge between raw data and global impact.
          </p>
          <p>
            We realized that to truly transform the landscape of science, we couldn’t just stop at
            the analytics. That is why we built a holistic powerhouse. We don’t just map
            coordinates; we translate them into the rigorous language of science through expert
            technical and manuscript writing. We don’t just build dashboards; we step into the arena
            to train and mentor researchers in GIS, GeoAI, and advanced research methodology—
            empowering them to decode the world around them.
          </p>
          <p>We do this because a breakthrough only matters if it is understood, published, and shared.</p>
          <p>
            At Latitude Intelligence, we don’t just process data; we uncover its deeper meaning and
            give it a voice. Because when you give data both the right direction and the power of
            precise articulation, there is no limit to where it can take us.
          </p>
        </div>
      </div>
    </div>
  );
}

export function useStoryModal() {
  const [open, setOpen] = useState(false);
  return { open, setOpen };
}
