const PROGRAMS = [
  'Research Methodology',
  'Scientific Writing',
  'GIS & Spatial Analysis',
  'Academic Publishing',
  'Manuscript Development',
  'Thesis Writing',
  'GeoAI for Research',
  'Spatial Statistics',
  'Medical Research Analytics'
];

export default function Programs() {
  return (
    <section id="programs">
      <div className="coord-tick">
        <span>SECTION · 04</span>
        <span>PROGRAMS</span>
      </div>
      <div className="wrap">
        <div className="section-head" data-reveal>
          <span className="section-tag">Programs We Train</span>
          <h2 className="section-title">
            A curriculum built for <em>researchers who ship</em>.
          </h2>
        </div>

        <div className="programs-grid">
          {PROGRAMS.map((p, i) => (
            <a
              key={p}
              className="program"
              href="#contact"
              data-reveal
              data-reveal-delay={i % 3}
            >
              <div className="program-index">P · {String(i + 1).padStart(2, '0')}</div>
              <h4 className="program-title">{p}</h4>
              <div className="program-arrow" aria-hidden="true">
                ↗
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
