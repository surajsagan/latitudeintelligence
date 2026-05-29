const EXPERTISE = [
  'Spatial Data Science & GeoAI',
  'Advanced Spatial Modeling',
  'Urban Green Space Optimization',
  'GIS & Geospatial Intelligence',
  'Healthcare Analytics',
  'Public Health Mapping',
  'NLP & Rule-Based Automation',
  'Research Methodology',
  'Spatial Statistics',
  'Predictive Modeling'
];

export default function Founder() {
  return (
    <section id="founder">
      <div className="coord-tick">
        <span>SECTION · 02</span>
        <span>FOUNDER</span>
      </div>
      <div className="wrap">
        <div className="section-head" data-reveal>
          <span className="section-tag">Meet the Founder</span>
          <h2 className="section-title">
            A spatial data scientist with a writer’s <em>discipline</em>.
          </h2>
        </div>

        <div className="founder-grid">
          <div data-reveal>
            <div
              className="founder-portrait"
              aria-label="Portrait of Suraj Sagan, founder of Latitude Intelligence"
            >
              <div className="portrait-frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/suraj-sagan.jpeg"
                  alt="Suraj Sagan, founder of Latitude Intelligence"
                  loading="lazy"
                  decoding="async"
                />
                <div className="grade" />
                <div className="vignette" />
                <div className="scan" />
              </div>
              <div className="portrait-coord">
                <span className="dot" />
                12.30°N · 76.65°E
              </div>
              <div className="portrait-chip">
                <span className="live" />
                Founder · Ph.D.
              </div>
            </div>
          </div>

          <div data-reveal data-reveal-delay="2">
            <h3 className="founder-name">Suraj Sagan</h3>
            <div className="founder-role">Founder · Latitude Intelligence</div>
            <p className="founder-bio">
              Suraj Sagan is a spatial data scientist, innovator, and the founder of Latitude
              Intelligence. Driven by a passion for translating complex spatial data into impactful
              real-world solutions, he specializes in bridging the gap between advanced GeoAI
              analytics and high-impact scientific communication. Through Latitude Intelligence, he
              spearheads initiatives that empower researchers and organizations globally to uncover
              the stories hidden within data and articulate them with precision.
            </p>

            <ul className="cred-list">
              <li>Ph.D. Scholar in Spatial Data Science &amp; Healthcare Analytics</li>
              <li>Senior Research Fellow (SRF), Department of Biotechnology (DBT) BUILDER Project</li>
              <li>Background in Marine Geology</li>
            </ul>

            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--fg-mute)',
                margin: '10px 0 14px'
              }}
            >
              Research Expertise
            </div>
            <div className="expertise-grid">
              {EXPERTISE.map((e) => (
                <div className="chip" key={e}>
                  <span className="chip-dot" />
                  {e}
                </div>
              ))}
            </div>

            <div className="pub-callout">
              <span className="label">Featured Publication · Springer Nature, 2026</span>
              <h4 className="pub-title">
                GIS-based assessment of urban green space availability and utilization barriers among
                high-risk type-2 diabetic patients in Mysuru, India
              </h4>
              <div className="pub-meta">
                Discover Public Health · 10+ Research Publications across high-impact journals
              </div>
            </div>

            <div className="socials">
              <a
                className="social-link"
                href="https://www.linkedin.com/in/surajsagan/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.42 0h4.37v1.92h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 7v7.44h-4.56v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.54 1.72-2.54 3.5V22H7.64V8z" />
                </svg>
                LinkedIn
              </a>
              <a
                className="social-link"
                href="https://scholar.google.com/citations?user=YKftYEQAAAAJ&hl=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L1 7l11 6 9-4.9V17h2V7L12 1zM3 14v3c0 1.66 4.03 4 9 4s9-2.34 9-4v-3l-9 4.9L3 14z" />
                </svg>
                Google Scholar
              </a>
              <a
                className="social-link"
                href="https://orcid.org/0009-0004-1406-1426"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zM7.37 18.42H5.59V7.43h1.78v10.99zM6.48 6.52a1.06 1.06 0 1 1 0-2.12 1.06 1.06 0 0 1 0 2.12zM18.4 13.06c0 3.5-2.5 5.36-5.84 5.36H8.97V7.43h3.74c3.6 0 5.69 2.13 5.69 5.63zm-1.83.04c0-2.55-1.62-4.05-4.04-4.05h-1.79v8.05h1.49c2.65 0 4.34-1.52 4.34-4z" />
                </svg>
                ORCID
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
