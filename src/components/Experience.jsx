const experiences = [
  {
    type: "work",
    role: "Python Developer",
    company: "Altos Technologies",
    period: "2024 – 2025",
    current: true,
    color: "rose",
    icon: "💼",
    points: [
      "Developed and maintained 3+ production-ready Django applications following MVT architecture",
      "Built RESTful APIs for user management, authentication, and role-based access control",
      "Improved page load performance by ~30% through query optimization and efficient ORM usage",
      "Implemented responsive UI using Bootstrap, ensuring compatibility across mobile and desktop",
      "Used Git for version control and collaborated with cross-functional teams",
    ],
    tags: ["Python", "Django", "REST API", "Bootstrap", "Git", "MySQL"],
  },
  {
    type: "work",
    role: "Python Fullstack Intern",
    company: "STC Technologies",
    period: "2023 – 2024",
    current: false,
    color: "lav",
    icon: "🎓",
    points: [
      "Gained comprehensive experience in full-stack web development using Python and Django",
      "Built and deployed dynamic web applications with responsive interfaces",
      "Worked with HTML, CSS, JavaScript, and Bootstrap for frontend development",
      "Developed efficient backend functionality and RESTful endpoints",
    ],
    tags: ["Python", "Django", "HTML", "CSS", "JavaScript", "Bootstrap"],
  },
];

const education = [
  {
    degree: "Diploma in Computer Hardware Engineering",
    school: "EKNMPTC IHRD",
    period: "2020 – 2023",
    desc: "Gained programming skills and practical coding experience. Foundation in computer science fundamentals.",
    icon: "🎓",
  },
  {
    degree: "Plus Two (Higher Secondary)",
    school: "Rajas HSS",
    period: "2018 – 2020",
    desc: "Completed higher secondary education with focus on science and mathematics.",
    icon: "📚",
  },
];

export default function Experience() {
  return (
    <>
      <style>{`
        #experience { background: rgba(255,255,255,0.015); }
        .exp-layout {
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: 60px;
          align-items: start;
        }
        .exp-col-label {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-dim);
          margin-bottom: 24px;
        }
        .timeline { position: relative; }
        .timeline::before {
          content: '';
          position: absolute;
          left: 19px;
          top: 0; bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, var(--rose), var(--lavender), transparent);
        }
        .timeline-item { position: relative; padding-left: 52px; margin-bottom: 36px; }
        .timeline-dot {
          position: absolute;
          left: 0; top: 4px;
          width: 38px; height: 38px;
          border-radius: 50%;
          background: var(--bg-deep);
          border: 2px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem;
          transition: all 0.3s ease;
          z-index: 1;
        }
        .timeline-item:hover .timeline-dot {
          border-color: var(--rose);
          box-shadow: 0 0 16px rgba(244,63,110,0.3);
        }
        .exp-card {
          padding: 22px 22px 18px;
          border-radius: 16px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          transition: all 0.3s ease;
        }
        .exp-card:hover {
          border-color: rgba(244,63,110,0.2);
          background: var(--bg-card-hover);
          box-shadow: 0 12px 32px rgba(0,0,0,0.3);
        }
        .exp-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px; gap: 12px; flex-wrap: wrap; }
        .exp-role { font-weight: 700; font-size: 1.05rem; color: var(--text); }
        .exp-period {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-dim);
          padding: 3px 10px;
          border-radius: 50px;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--border);
          white-space: nowrap;
        }
        .exp-company { font-size: 0.9rem; color: var(--rose-light); margin-bottom: 14px; font-weight: 500; }
        .exp-points { margin-bottom: 14px; display: flex; flex-direction: column; gap: 6px; }
        .exp-point {
          display: flex; align-items: flex-start; gap: 8px;
          font-size: 0.86rem; color: var(--text-muted); line-height: 1.5;
        }
        .exp-bullet {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--rose);
          margin-top: 7px;
          flex-shrink: 0;
        }
        .exp-tags { display: flex; flex-wrap: wrap; gap: 7px; }
        .exp-tag {
          font-family: var(--font-mono);
          font-size: 0.73rem;
          padding: 3px 10px;
          border-radius: 50px;
          background: rgba(244,63,110,0.07);
          color: var(--rose-light);
          border: 1px solid rgba(244,63,110,0.15);
        }
        .current-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          color: #4ade80;
          margin-bottom: 10px;
        }
        .current-dot { width: 6px; height: 6px; border-radius: 50%; background: #4ade80; animation: pulse-dot 2s infinite; }
        .edu-item {
          display: flex;
          gap: 14px;
          padding: 18px;
          border-radius: 14px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          margin-bottom: 14px;
          transition: all 0.3s ease;
        }
        .edu-item:hover { border-color: rgba(192,132,252,0.2); background: var(--bg-card-hover); }
        .edu-icon { font-size: 1.5rem; flex-shrink: 0; margin-top: 2px; }
        .edu-degree { font-weight: 600; font-size: 0.95rem; color: var(--text); margin-bottom: 2px; }
        .edu-school { font-size: 0.85rem; color: var(--lavender); margin-bottom: 4px; }
        .edu-period { font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-dim); margin-bottom: 6px; }
        .edu-desc { font-size: 0.82rem; color: var(--text-dim); line-height: 1.5; }

        @media (max-width: 900px) {
          .exp-layout { grid-template-columns: 1fr; gap: 40px; }
        }
      `}</style>

      <section id="experience" className="section">
        <div className="container">
          <div className="section-label">Background</div>
          <h2 className="section-title">Experience & <span>Education</span></h2>
          <div className="divider" />

          <div className="exp-layout">
            <div>
              <div className="exp-col-label">// Work Experience</div>
              <div className="timeline">
                {experiences.map((e, i) => (
                  <div className="timeline-item" key={i}>
                    <div className="timeline-dot">{e.icon}</div>
                    <div className="exp-card">
                      {e.current && (
                        <div className="current-badge">
                          <span className="current-dot" /> Current Role
                        </div>
                      )}
                      <div className="exp-header">
                        <div className="exp-role">{e.role}</div>
                        <div className="exp-period">{e.period}</div>
                      </div>
                      <div className="exp-company">{e.company}</div>
                      <div className="exp-points">
                        {e.points.map((pt, j) => (
                          <div className="exp-point" key={j}>
                            <span className="exp-bullet" />
                            {pt}
                          </div>
                        ))}
                      </div>
                      <div className="exp-tags">
                        {e.tags.map((t, j) => <span className="exp-tag" key={j}>{t}</span>)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="exp-col-label">// Education</div>
              {education.map((ed, i) => (
                <div className="edu-item" key={i}>
                  <div className="edu-icon">{ed.icon}</div>
                  <div>
                    <div className="edu-degree">{ed.degree}</div>
                    <div className="edu-school">{ed.school}</div>
                    <div className="edu-period">{ed.period}</div>
                    <div className="edu-desc">{ed.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}