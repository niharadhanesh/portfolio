const projects = [
  {
    title: "Hospital Workflow System",
    emoji: "🏥",
    desc: "A scalable hospital web application offering tailored modules for admins, doctors, and receptionists. Features appointment management, patient records, and role-specific dashboards.",
    tech: ["Python", "Django", "MySQL", "Bootstrap", "GitHub"],
    highlights: ["Role-based access for 3 user types", "Patient record management", "Appointment scheduling"],
    color: "rose",
    type: "Full‑Stack Web App",
  },
  {
    title: "Billing Software",
    emoji: "🧾",
    desc: "A comprehensive billing and invoice management system with customer management, invoice generation, and automated notifications. Includes import/export and advanced search.",
    tech: ["Django", "PostgreSQL", "JavaScript", "Bootstrap"],
    highlights: ["Add / edit / delete invoices", "Import & export data", "Email notifications"],
    color: "lav",
    type: "Business Application",
  },
  {
    title: "Smart Vehicle Management Portal",
    emoji: "🚗",
    desc: "A web application to manage vehicle rentals, services, and users with separate admin access. Tracks maintenance schedules, rental status, and generates reports.",
    tech: ["Python", "Django", "MySQL", "Bootstrap", "Git"],
    highlights: ["Admin & user dashboards", "Rental & service tracking", "Report generation"],
    color: "rose",
    type: "Management System",
  },
  
];

export default function Projects() {
  return (
    <>
      <style>{`
        #projects { background: rgba(255,255,255,0.01); }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }
        .proj-card {
          border-radius: 22px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          overflow: hidden;
          transition: all 0.4s ease;
          display: flex;
          flex-direction: column;
        }
        .proj-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 60px rgba(0,0,0,0.5);
        }
        .proj-card.rose:hover { border-color: rgba(244,63,110,0.3); box-shadow: 0 24px 60px rgba(0,0,0,0.5), 0 0 40px rgba(244,63,110,0.08); }
        .proj-card.lav:hover { border-color: rgba(192,132,252,0.3); box-shadow: 0 24px 60px rgba(0,0,0,0.5), 0 0 40px rgba(192,132,252,0.08); }
        .proj-banner {
          height: 130px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 26px;
          position: relative;
          overflow: hidden;
        }
        .proj-banner.rose {
          background: linear-gradient(135deg, rgba(244,63,110,0.12), rgba(244,63,110,0.04));
        }
        .proj-banner.lav {
          background: linear-gradient(135deg, rgba(192,132,252,0.12), rgba(192,132,252,0.04));
        }
        .proj-banner::before {
          content: '';
          position: absolute;
          top: -30px; right: -30px;
          width: 120px; height: 120px;
          border-radius: 50%;
          background: rgba(255,255,255,0.03);
        }
        .proj-emoji { font-size: 2.8rem; }
        .proj-type {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 50px;
          background: rgba(0,0,0,0.3);
          color: var(--text-dim);
        }
        .proj-body { padding: 24px 26px; flex: 1; display: flex; flex-direction: column; }
        .proj-title {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 10px;
        }
        .proj-desc {
          color: var(--text-muted);
          font-size: 0.88rem;
          line-height: 1.7;
          margin-bottom: 16px;
          flex: 1;
        }
        .proj-highlights {
          margin-bottom: 16px;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .proj-hl {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          color: var(--text-dim);
        }
        .proj-hl::before {
          content: '';
          display: inline-block;
          width: 4px; height: 4px;
          border-radius: 50%;
          background: var(--rose);
          flex-shrink: 0;
        }
        .proj-card.lav .proj-hl::before { background: var(--lavender); }
        .proj-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-bottom: 20px;
        }
        .proj-tech span {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          padding: 4px 11px;
          border-radius: 50px;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border);
          color: var(--text-muted);
        }
        .proj-actions {
          display: flex;
          gap: 10px;
        }
        .proj-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 0.85rem;
          font-weight: 500;
          transition: all 0.25s ease;
          border: 1px solid var(--border);
          color: var(--text-muted);
          background: transparent;
        }
        .proj-btn:hover { color: var(--text); border-color: rgba(255,255,255,0.2); }
        .proj-btn.primary {
          background: rgba(244,63,110,0.1);
          border-color: rgba(244,63,110,0.2);
          color: var(--rose-light);
        }
        .proj-card.lav .proj-btn.primary {
          background: rgba(192,132,252,0.1);
          border-color: rgba(192,132,252,0.2);
          color: var(--lavender-light);
        }
        .proj-btn.primary:hover { background: rgba(244,63,110,0.18); }

        @media (max-width: 640px) {
          .projects-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section id="projects" className="section">
        <div className="container">
          <div className="section-label">My Work</div>
          <h2 className="section-title">Featured <span>Projects</span></h2>
          <div className="divider" />

          <div className="projects-grid">
            {projects.map((p, i) => (
              <div className={`proj-card ${p.color}`} key={i}>
                <div className={`proj-banner ${p.color}`}>
                  <span className="proj-emoji">{p.emoji}</span>
                  <span className="proj-type">{p.type}</span>
                </div>
                <div className="proj-body">
                  <div className="proj-title">{p.title}</div>
                  <div className="proj-desc">{p.desc}</div>
                  <div className="proj-highlights">
                    {p.highlights.map((h, j) => (
                      <div className="proj-hl" key={j}>{h}</div>
                    ))}
                  </div>
                  <div className="proj-tech">
                    {p.tech.map((t, j) => <span key={j}>{t}</span>)}
                  </div>
                  <div className="proj-actions">
                    <a href="https://github.com/niharadhanesh" target="_blank" rel="noreferrer" className="proj-btn">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
                      </svg>
                      Code
                    </a>
                    <a href="#" className="proj-btn primary">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                      </svg>
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}