'use client';

import StoryModal, { useStoryModal } from './StoryModal';

export default function About() {
  const { open, setOpen } = useStoryModal();

  return (
    <section id="about">
      <div className="coord-tick">
        <span>SECTION · 01</span>
        <span>ABOUT</span>
      </div>
      <div className="wrap">
        <div className="section-head" data-reveal>
          <span className="section-tag">About Latitude Intelligence</span>
          <h2 className="section-title">
            A research consultancy where <em>spatial intelligence</em> meets scientific eloquence.
          </h2>
          <p className="section-sub">
            Empowering researchers, scholars, and institutions through expert guidance — at the
            intersection of GeoAI, healthcare analytics, and high-impact publication.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-prose" data-reveal>
            <p>
              Founded in <strong> January 2026</strong>, Latitude Intelligence was
              established by a team of motivated young researchers led by{' '}
              <strong>Suraj Sagan (Ph.D.)</strong>, bringing over{' '}
              <strong>four years of research experience in HealthGIS and Spatial Analytics</strong>.
            </p>
            <p>
              We exist at the meeting point of GeoAI, scientific storytelling, and academic
              mentorship — translating raw spatial coordinates and research evidence into the
              rigorous language of science, and equipping the next generation of researchers to
              wield it.
            </p>
            <p>We don’t just process data; we uncover its deeper meaning, and give it a voice.</p>
            <button className="read-more" type="button" onClick={() => setOpen(true)}>
              Read the full story
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div data-reveal data-reveal-delay="2">
            <div className="about-card">
              <h4>Vision</h4>
              <p>
                To be the global catalyst where{' '}
                <em style={{ color: 'var(--accent-3)' }}>spatial intelligence meets scientific eloquence</em>,
                empowering researchers and organizations to solve the world’s most complex challenges
                through data, direction, and dialogue.
              </p>
            </div>
            <div className="about-card">
              <h4>Mission</h4>
              <p>
                To bridge the gap between raw data and impactful truth by delivering world-class
                GeoAI analytics, precision scientific writing, and transformative research training —
                giving every dataset a direction and every breakthrough a voice.
              </p>
            </div>
          </div>
        </div>
      </div>

      <StoryModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
