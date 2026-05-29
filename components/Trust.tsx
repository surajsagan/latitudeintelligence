export default function Trust() {
  return (
    <section id="trust">
      <div className="coord-tick">
        <span>SECTION · 05</span>
        <span>CREDIBILITY</span>
      </div>
      <div className="wrap">
        <div className="section-head" data-reveal>
          <span className="section-tag">Trusted by researchers &amp; institutions</span>
          <h2 className="section-title">
            Work that holds up to <em>peer review</em>.
          </h2>
        </div>
        <div className="trust-grid">
          <div className="trust-cell" data-reveal>
            <div className="trust-value">
              <span data-count="10">0</span>
              <span className="plus">+</span>
            </div>
            <div className="trust-label">Publications</div>
          </div>
          <div className="trust-cell" data-reveal data-reveal-delay="1">
            <div className="trust-value">
              <span data-count="4">0</span>
              <span className="plus">+ yrs</span>
            </div>
            <div className="trust-label">Research Experience</div>
          </div>
          <div className="trust-cell" data-reveal data-reveal-delay="2">
            <div className="trust-value">
              GIS · <span style={{ color: 'var(--accent-3)' }}>GeoAI</span>
            </div>
            <div className="trust-label">Specialist Expertise</div>
          </div>
          <div className="trust-cell" data-reveal data-reveal-delay="3">
            <div className="trust-value">Multi-Software</div>
            <div className="trust-label">Verified Analytics Stack</div>
          </div>
        </div>
      </div>
    </section>
  );
}
