type Service = {
  num: string;
  title: string;
  desc: string;
  items: string[];
  icon: React.ReactNode;
};

const SERVICES: Service[] = [
  {
    num: '01 — Research Intelligence',
    title: 'Plan, structure, execute research with research-grade precision.',
    desc: 'For researchers, scholars, professionals, and institutions producing high-quality reports, theses, and manuscripts.',
    items: [
      'Thesis planning',
      'Research structuring',
      'Evidence-based report writing',
      'Research consulting',
      'Manuscript planning'
    ],
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M4 4h16v4H4zM4 12h10v8H4zM18 12h2v8h-2z" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    num: '02 — Academic Writing & Publication',
    title: 'Scientific communication, sharpened for high-impact journals.',
    desc: 'End-to-end support that turns rigorous work into clear, publishable manuscripts.',
    items: [
      'Thesis writing assistance',
      'Manuscript editing',
      'Journal formatting',
      'Research proposal writing',
      'Statistical interpretation',
      'Publication support'
    ],
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M5 3h11l3 3v15H5z" />
        <path d="M14 3v4h5M8 12h8M8 16h8M8 8h4" />
      </svg>
    )
  },
  {
    num: '03 — GIS & Spatial Analytics',
    title: 'Research-grade geospatial intelligence, end-to-end.',
    desc: 'From remote-sensed imagery to publication-ready cartography and decision dashboards.',
    items: [
      'GIS mapping',
      'Remote sensing',
      'Public health GIS',
      'Disease mapping',
      'Environmental analysis',
      'Groundwater maps',
      'Population density maps',
      'Catchment terrain analysis',
      'Spatial statistics',
      'Disaster management mapping'
    ],
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c3 3.5 3 14 0 18M12 3c-3 3.5-3 14 0 18" />
      </svg>
    )
  },
  {
    num: '04 — Research Training & Capacity',
    title: 'Train researchers to independently do better research.',
    desc: 'Live cohorts, workshops, and one-on-one mentoring that build durable craft.',
    items: [
      'Webinars',
      'Workshops',
      'Certifications',
      'One-on-one mentoring',
      'GIS training',
      'Research methodology',
      'Scientific writing training'
    ],
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 3l9 4-9 4-9-4 9-4z" />
        <path d="M3 12l9 4 9-4M3 17l9 4 9-4" />
      </svg>
    )
  }
];

export default function Services() {
  return (
    <section id="services">
      <div className="coord-tick">
        <span>SECTION · 03</span>
        <span>SERVICES</span>
      </div>
      <div className="wrap">
        <div className="section-head" data-reveal>
          <span className="section-tag">What We Do</span>
          <h2 className="section-title">
            Four disciplines. <em>One ecosystem</em> for research that matters.
          </h2>
          <p className="section-sub">
            From the first thesis outline to the published manuscript — and every map, model, and
            mentorship session in between.
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <article className="service-card" data-reveal data-reveal-delay={i} key={s.num}>
              <div className="service-icon" aria-hidden="true">
                {s.icon}
              </div>
              <div className="service-num">{s.num}</div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
              <ul className="service-list">
                {s.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
