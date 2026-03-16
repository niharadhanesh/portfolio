export default function About() {
  const highlights = [
    { icon: "🎯", title: "Problem Solver", desc: "Tackled real-world challenges in healthcare, billing, and fleet management systems." },
    { icon: "⚡", title: "Performance Focus", desc: "Improved page load times by ~30% through query optimization and smart ORM usage." },
    { icon: "🔗", title: "API Expert", desc: "Built RESTful APIs for auth, user management, and role-based access at production scale." },
    { icon: "📱", title: "Responsive Design", desc: "Every project seamlessly adapts across mobile, tablet and desktop viewports." },
  ];

  const facts = [
    { label: "Location", value: "Kannur, Kerala 🇮🇳" },
    { label: "Role", value: "Python Django Developer" },
    { label: "Experience", value: "1.5+ Years" },
    { label: "Education", value: "Diploma, EKNMPTC IHRD" },
    { label: "Email", value: "niharadhanesh875@gmail.com" },
    { label: "Status", value: "Open to Opportunities ✅" },
  ];

  return (
    <>
      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 70px;
          align-items: start;
        }
        .about-left { }
        .about-bio {
          color: var(--text-muted);
          font-size: 1.02rem;
          line-height: 1.9;
          margin-bottom: 20px;
        }
        .about-bio strong { color: var(--rose-light); font-weight: 600; }
        .about-highlights {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-top: 32px;
        }
        .highlight-card {
          padding: 18px 16px;
          border-radius: 14px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          transition: all 0.3s ease;
        }
        .highlight-card:hover {
          border-color: rgba(244,63,110,0.2);
          background: var(--bg-card-hover);
          transform: translateY(-3px);
        }
        .hl-icon {
          font-size: 1.4rem;
          margin-bottom: 8px;
          display: block;
        }
        .hl-title {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text);
          margin-bottom: 4px;
        }
        .hl-desc {
          font-size: 0.8rem;
          color: var(--text-dim);
          line-height: 1.5;
        }
        .about-right { }
        .facts-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 28px;
          margin-bottom: 20px;
        }
        .facts-title {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-dim);
          margin-bottom: 18px;
        }
        .fact-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 11px 0;
          border-bottom: 1px solid var(--border);
          font-size: 0.9rem;
        }
        .fact-row:last-child { border-bottom: none; }
        .fact-label { color: var(--text-dim); }
        .fact-value { color: var(--text); font-weight: 500; text-align: right; max-width: 55%; }
        .fact-value a { color: var(--rose-light); }
        .social-row {
          display: flex;
          gap: 12px;
          margin-top: 20px;
        }
        .social-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          border-radius: 12px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          color: var(--text-muted);
          font-size: 0.85rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        .social-btn:hover {
          color: var(--text);
          border-color: rgba(244,63,110,0.3);
          background: rgba(244,63,110,0.06);
        }
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr; gap: 40px; }
          .about-highlights { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 480px) {
          .about-highlights { grid-template-columns: 1fr; }
        }
      `}</style>

      <section id="about" className="section">
        <div className="container">
          <div className="section-label">About Me</div>
          <h2 className="section-title">The developer <span>behind the code</span></h2>
          <div className="divider" />

          <div className="about-grid">
            <div className="about-left">
              <p className="about-bio">
                I'm a <strong>Python Django Developer</strong> from Kannur, Kerala, with
                hands-on experience building production-ready web applications from the ground up.
                I care deeply about code quality, performance, and building things that{" "}
                <strong>actually work at scale</strong>.
              </p>
              <p className="about-bio">
                At Altos Technologies, I developed and shipped <strong>3+ Django applications</strong>,
                built authentication systems, designed role-based access, and slashed load
                times by optimizing queries and ORM usage. I'm comfortable owning both the
                backend logic and the frontend experience.
              </p>
              <p className="about-bio">
                I thrive in collaborative environments, version-control everything, and write
                code that the next developer won't curse at. Always learning, always building.
              </p>

              <div className="about-highlights">
                {highlights.map((h, i) => (
                  <div className="highlight-card" key={i}>
                    <span className="hl-icon">{h.icon}</span>
                    <div className="hl-title">{h.title}</div>
                    <div className="hl-desc">{h.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="about-right">
              <div className="facts-card">
                <div className="facts-title">// Quick Facts</div>
                {facts.map((f, i) => (
                  <div className="fact-row" key={i}>
                    <span className="fact-label">{f.label}</span>
                    <span className="fact-value">
                      {f.label === "Email"
                        ? <a href={`mailto:${f.value}`}>{f.value}</a>
                        : f.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="social-row">
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                  LinkedIn
                </a>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="social-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
                  </svg>
                  GitHub
                </a>
                <a href="mailto:niharadhanesh875@gmail.com" className="social-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}