export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <div className="footer-brand-lockup">
            <span className="brand-mark" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/latitude-mark.png" alt="" />
            </span>
            <span className="brand-name">
              Latitude <em>Intelligence</em>
            </span>
          </div>
          <div className="footer-logo-card" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/latitude-logo.png" alt="Latitude Intelligence official logo" />
          </div>
          <p className="footer-blurb">
            Where spatial intelligence meets scientific eloquence. Bridging raw data and global
            impact through GeoAI, mentorship, and precise articulation.
          </p>
        </div>

        <div>
          <h5>Navigate</h5>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#founder">Founder</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#programs">Programs</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div>
          <h5>Contact</h5>
          <ul>
            <li><a href="mailto:info@latitudeintelligence.in">info@latitudeintelligence.in</a></li>
            <li><a href="tel:+918105220702">+91 8105 220 702</a></li>
            <li>
              <a href="https://www.linkedin.com/in/surajsagan/" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h5>Office</h5>
          <ul>
            <li style={{ color: 'var(--fg-dim)', fontSize: 13.5, lineHeight: 1.6 }}>
              #7, Kaveri Nagara,<br />
              Bannimantapa,<br />
              Mysuru&#8209;15
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bot">
        <span>© Latitude Intelligence 2026 · All rights reserved</span>
        <span>12.30°N · 76.65°E</span>
      </div>
    </footer>
  );
}
