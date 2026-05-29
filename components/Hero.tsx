import HeroCanvas from './HeroCanvas';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-canvas-wrap" aria-hidden="true">
        <HeroCanvas />
        <div className="scanline" />
        <div className="hero-vignette" />
      </div>

      <div className="hero-inner">
        <div className="eyebrow" data-reveal>
          <span className="pulse" />
          <span>Research Intelligence · GeoAI · Scientific Writing</span>
        </div>

        <h1 data-reveal data-reveal-delay="1">
          Planning, Powered by
          <br />
          <em>Research-Grade</em> Intelligence
        </h1>

        <p className="subtitle" data-reveal data-reveal-delay="2">
          Transforming complex research, geospatial intelligence, and scientific writing into
          meaningful global impact.
        </p>

        <div className="hero-ctas" data-reveal data-reveal-delay="3">
          <a className="btn btn-primary" href="#contact">
            Contact Us
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </a>
          <a className="btn btn-secondary" href="#services">
            Explore Services
            <span className="arrow" aria-hidden="true">
              ↓
            </span>
          </a>
        </div>
      </div>

      <div className="hero-rail" data-reveal data-reveal-delay="4">
        <div className="hero-rail-inner">
          <div>
            <span className="k">Discipline</span>
            <span className="v">
              HealthGIS · <span className="ac">GeoAI</span>
            </span>
          </div>
          <div>
            <span className="k">Founded</span>
            <span className="v">
              January <span className="ac">2026</span>
            </span>
          </div>
          <div>
            <span className="k">Publications</span>
            <span className="v">
              <span className="ac">10+</span> peer-reviewed
            </span>
          </div>
          <div>
            <span className="k">Headquarters</span>
            <span className="v">
              Mysuru · <span className="ac">12.30°N</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
