import { useEffect, useRef, useState } from "react";

/* ── scroll-reveal hook ── */
function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ── morphing blob (matches hero) ── */
function MorphBlob({ color, delay = 0, id }) {
  const paths = [
    "M60,-45C72,-28,72,14,58,47C44,80,16,104,-18,104C-52,103,-92,77,-105,43C-118,9,-103,-34,-78,-62C-53,-90,-18,-102,16,-97C50,-92,48,-62,60,-45Z",
    "M55,-38C74,-15,94,18,89,49C84,79,54,107,18,115C-18,123,-60,110,-84,82C-108,54,-115,11,-101,-26C-87,-63,-53,-93,-17,-98C19,-103,36,-61,55,-38Z",
    "M44,-32C63,-12,88,17,88,46C88,76,64,106,31,117C-2,127,-44,117,-72,93C-100,68,-114,29,-107,-8C-100,-45,-72,-79,-39,-90C-6,-101,25,-53,44,-32Z",
    "M60,-45C72,-28,72,14,58,47C44,80,16,104,-18,104C-52,103,-92,77,-105,43C-118,9,-103,-34,-78,-62C-53,-90,-18,-102,16,-97C50,-92,48,-62,60,-45Z",
  ];
  return (
    <svg viewBox="-130 -130 260 260" style={{ width: "100%", height: "100%" }}>
      <defs>
        <radialGradient id={`pjblob${id}`} cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor={color} stopOpacity="0.42" />
          <stop offset="100%" stopColor={color} stopOpacity="0.03" />
        </radialGradient>
      </defs>
      <path fill={`url(#pjblob${id})`}>
        <animate
          attributeName="d"
          dur={`${8 + delay}s`}
          repeatCount="indefinite"
          values={paths.join(";")}
          calcMode="spline"
          keySplines="0.45 0 0.55 1;0.45 0 0.55 1;0.45 0 0.55 1"
        />
      </path>
    </svg>
  );
}

/* ── typewriter terminal inside each card ── */
function MiniTerminal({ lines, triggered }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (!triggered) return;
    if (shown >= lines.length) return;
    const t = setTimeout(() => setShown(s => s + 1), 260 + shown * 90);
    return () => clearTimeout(t);
  }, [triggered, shown, lines.length]);

  return (
    <div className="pj-mini-term">
      <div className="pj-mini-term-head">
        <span className="pj-mini-dot" style={{ background: "#ff5f57" }} />
        <span className="pj-mini-dot" style={{ background: "#ffbd2e" }} />
        <span className="pj-mini-dot" style={{ background: "#28c840" }} />
        <span className="pj-mini-term-label">highlights.py</span>
      </div>
      <div className="pj-mini-term-body">
        {lines.slice(0, shown).map((l, i) => (
          <div key={i} className="pj-mini-line">
            <span className="pj-mini-ln">{String(i + 1).padStart(2, "0")}</span>
            <span style={{ color: l.color, whiteSpace: "pre" }}>{l.text}</span>
          </div>
        ))}
        {shown < lines.length && (
          <div className="pj-mini-line">
            <span className="pj-mini-ln">{String(shown + 1).padStart(2, "0")}</span>
            <span className="pj-mini-tcursor" />
          </div>
        )}
      </div>
    </div>
  );
}

/* ── orbiting dots on hover ── */
function OrbitDots({ active, color }) {
  return (
    <div className={`pj-orbit-wrap ${active ? "active" : ""}`} style={{ "--orb-color": color }}>
      {[0, 1, 2].map(i => (
        <span key={i} className="pj-orbit-dot" style={{ "--i": i }} />
      ))}
    </div>
  );
}

const ACCENT = {
  rose:   { color: "#ff3b6b", glow: "rgba(255,59,107,0.18)",  border: "rgba(255,59,107,0.32)",  bg: "rgba(255,59,107,0.06)"  },
  violet: { color: "#9b5de5", glow: "rgba(155,93,229,0.18)",  border: "rgba(155,93,229,0.32)",  bg: "rgba(155,93,229,0.06)"  },
  cyan:   { color: "#00f5d4", glow: "rgba(0,245,212,0.15)",   border: "rgba(0,245,212,0.3)",    bg: "rgba(0,245,212,0.05)"   },
};

const projects = [
  {
    title: "Hospital Workflow System",
    emoji: "🏥",
    desc: "A scalable hospital web application offering tailored modules for admins, doctors, and receptionists. Features appointment management, patient records, and role-specific dashboards.",
    tech: ["Python", "Django", "MySQL", "Bootstrap", "GitHub"],
    highlights: [
      { text: "# Role-based access · 3 user types", color: "#c084fc" },
      { text: '  patient_records = manage()',         color: "#86efac" },
      { text: '  appointments = schedule()',           color: "#86efac" },
      { text: "  return ScalableApp() 🚀",             color: "#67e8f9" },
    ],
    accent: "rose",
    type: "Full-Stack Web App",
    number: "01",
  },
  {
    title: "Billing Software",
    emoji: "🧾",
    desc: "A comprehensive billing and invoice management system with customer management, invoice generation, and automated notifications. Includes import/export and advanced search.",
    tech: ["Django", "PostgreSQL", "JavaScript", "Bootstrap"],
    highlights: [
      { text: "# Invoice engine · full CRUD",        color: "#c084fc" },
      { text: '  data = import_export()',             color: "#86efac" },
      { text: '  notify = email_trigger()',           color: "#86efac" },
      { text: "  return CleanInvoice() 📄",           color: "#67e8f9" },
    ],
    accent: "violet",
    type: "Business Application",
    number: "02",
  },
  {
    title: "Smart Vehicle Management",
    emoji: "🚗",
    desc: "A web application to manage vehicle rentals, services, and users with separate admin access. Tracks maintenance schedules, rental status, and generates reports.",
    tech: ["Python", "Django", "MySQL", "Bootstrap", "Git"],
    highlights: [
      { text: "# Admin & user dashboards",            color: "#c084fc" },
      { text: '  fleet = track_rentals()',            color: "#86efac" },
      { text: '  reports = generate_pdf()',           color: "#86efac" },
      { text: "  return FleetControl() 🚗",           color: "#67e8f9" },
    ],
    accent: "cyan",
    type: "Management System",
    number: "03",
  },
];

/* ── single project card ── */
function ProjectCard({ p, index, visible }) {
  const [hovered, setHovered] = useState(false);
  const acc = ACCENT[p.accent];

  return (
    <div
      className={`pj-card ${visible ? "visible" : ""}`}
      style={{
        animationDelay: `${index * 0.14}s`,
        "--acc": acc.color,
        "--acc-glow": acc.glow,
        "--acc-border": acc.border,
        "--acc-bg": acc.bg,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="pj-top-bar" />
      <OrbitDots active={hovered} color={acc.color} />

      {/* banner */}
      <div className="pj-banner">
        <div className="pj-banner-left">
          <span className="pj-number">{p.number}</span>
          <span className="pj-emoji">{p.emoji}</span>
        </div>
        <span className="pj-type">{p.type}</span>
        <div className="pj-banner-grid" />
      </div>

      <div className="pj-body">
        <h3 className="pj-title">{p.title}</h3>
        <p className="pj-desc">{p.desc}</p>
        <MiniTerminal lines={p.highlights} triggered={visible} />

        <div className="pj-tech">
          {p.tech.map((t, j) => <span key={j} className="pj-badge">{t}</span>)}
        </div>

        <div className="pj-actions">
          <a href="https://github.com/niharadhanesh" target="_blank" rel="noreferrer" className="pj-btn-ghost">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
            </svg>
            Source
          </a>
          <a href="#" className="pj-btn-primary">
            Live Demo
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [secRef, secVisible] = useReveal(0.08);
  const [gridRef, gridVisible] = useReveal(0.08);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Bebas+Neue&family=Crimson+Pro:ital,wght@0,300;1,300&family=Share+Tech+Mono&display=swap');

        #projects {
          --rose:    #ff3b6b;
          --violet:  #9b5de5;
          --cyan:    #00f5d4;
          --ink:     #f5f0ff;
          --ink2:    #8b7da8;
          --ink3:    #4a3f62;
          --bg:      #07050f;
          --ff-head: 'Bebas Neue', sans-serif;
          --ff-body: 'Space Grotesk', sans-serif;
          --ff-mono: 'Share Tech Mono', monospace;
          position: relative;
          padding: 110px 0 120px;
          background: var(--bg);
          overflow: hidden;
          font-family: var(--ff-body);
          color: var(--ink);
        }
        #projects::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(155,93,229,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(155,93,229,0.03) 1px, transparent 1px);
          background-size: 80px 80px;
        }

        .pj-blob { position: absolute; pointer-events: none; z-index: 0; }
        /* Moved right blob down and inward so it's fully visible */
        .pj-blob-a { width:520px; height:520px; top:60px; right:-60px; animation:pj-orbit 32s linear infinite; }
        /* Left blob removed */
        @keyframes pj-orbit {
          0%  { transform:rotate(0deg)   translateX(24px) rotate(0deg)   }
          100%{ transform:rotate(360deg) translateX(24px) rotate(-360deg) }
        }

        .pj-container { max-width:1200px; margin:0 auto; padding:0 6%; position:relative; z-index:2; }

        .pj-eyebrow {
          font-family: var(--ff-mono); font-size:.68rem; letter-spacing:.28em;
          text-transform:uppercase; color:var(--rose);
          display:flex; align-items:center; gap:12px; margin-bottom:18px;
        }
        .pj-eyebrow-line { height:1px; width:36px; background:rgba(255,59,107,0.35); }

        .pj-heading {
          font-family:var(--ff-head); font-size:clamp(3rem,6vw,5.5rem);
          line-height:.92; letter-spacing:.02em; margin-bottom:10px; color:var(--ink);
        }
        .pj-heading-accent {
          background:linear-gradient(90deg,var(--rose),var(--violet));
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
        }
        .pj-subtitle {
          font-family:'Crimson Pro',serif; font-style:italic;
          font-size:clamp(1rem,1.4vw,1.2rem); color:var(--ink2);
          font-weight:300; margin-bottom:60px;
        }
        .pj-divider {
          width:48px; height:2px;
          background:linear-gradient(90deg,var(--rose),var(--violet));
          margin-bottom:50px; border-radius:2px;
        }

        /* count row */
        .pj-count-row {
          display:flex; align-items:center; justify-content:space-between;
          margin-bottom:32px; flex-wrap:wrap; gap:12px;
        }
        .pj-count { font-family:var(--ff-mono); font-size:.62rem; letter-spacing:.14em; color:var(--ink3); display:flex; align-items:center; gap:8px; }
        .pj-count em { color:var(--cyan); font-style:normal; font-size:.72rem; }
        .pj-more-link {
          font-family:var(--ff-mono); font-size:.65rem; letter-spacing:.1em;
          text-transform:uppercase; color:var(--violet); text-decoration:none;
          display:flex; align-items:center; gap:6px; transition:color .2s;
        }
        .pj-more-link:hover { color:var(--ink); }

        /* grid */
        .pj-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }

        /* card */
        .pj-card {
          border-radius:20px; background:rgba(255,255,255,0.022);
          border:1px solid rgba(155,93,229,0.1);
          overflow:hidden; display:flex; flex-direction:column;
          position:relative;
          transition:transform .35s ease,border-color .35s ease,box-shadow .35s ease;
          opacity:0; transform:translateY(24px) scale(0.97);
        }
        .pj-card.visible { animation:pj-card-in .5s ease forwards; }
        @keyframes pj-card-in { to { opacity:1; transform:translateY(0) scale(1); } }
        .pj-card:hover {
          transform:translateY(-10px);
          border-color:var(--acc-border);
          box-shadow:0 28px 70px rgba(0,0,0,.55), 0 0 40px var(--acc-glow);
        }

        .pj-top-bar {
          height:2px;
          background:linear-gradient(90deg,transparent,var(--acc),transparent);
          opacity:0; transition:opacity .35s;
        }
        .pj-card:hover .pj-top-bar { opacity:1; }

        /* orbit dots */
        .pj-orbit-wrap {
          position:absolute; top:0; right:0;
          width:90px; height:90px; pointer-events:none; z-index:5;
          opacity:0; transition:opacity .4s;
        }
        .pj-orbit-wrap.active { opacity:1; }
        .pj-orbit-dot {
          position:absolute; width:5px; height:5px; border-radius:50%;
          background:var(--orb-color); top:50%; left:50%;
          transform-origin:0 0;
          animation:pj-orbit-spin 2.4s linear infinite;
          animation-delay:calc(var(--i) * -0.8s);
        }
        @keyframes pj-orbit-spin {
          0%   { transform:rotate(calc(var(--i)*120deg))       translateX(32px) scale(1);   opacity:.9; }
          50%  { transform:rotate(calc(var(--i)*120deg+180deg)) translateX(32px) scale(.55); opacity:.4; }
          100% { transform:rotate(calc(var(--i)*120deg+360deg)) translateX(32px) scale(1);   opacity:.9; }
        }

        /* banner */
        .pj-banner {
          height:96px; display:flex; align-items:center;
          justify-content:space-between; padding:18px 22px;
          position:relative; overflow:hidden;
          background:var(--acc-bg);
          border-bottom:1px solid rgba(155,93,229,0.08);
        }
        .pj-banner-grid {
          position:absolute; inset:0; pointer-events:none;
          background-image:
            linear-gradient(rgba(255,255,255,.028) 1px,transparent 1px),
            linear-gradient(90deg,rgba(255,255,255,.028) 1px,transparent 1px);
          background-size:22px 22px;
        }
        .pj-banner-left { display:flex; align-items:center; gap:12px; position:relative; z-index:1; }
        .pj-number {
          font-family:var(--ff-head); font-size:3rem; line-height:1;
          color:var(--acc); opacity:.18; letter-spacing:.02em;
        }
        .pj-emoji { font-size:2.2rem; filter:drop-shadow(0 0 12px rgba(255,255,255,.2)); }
        .pj-type {
          font-family:var(--ff-mono); font-size:.6rem; letter-spacing:.12em;
          text-transform:uppercase; padding:5px 12px; border-radius:4px;
          background:rgba(0,0,0,.4); border:1px solid rgba(255,255,255,.07);
          color:var(--ink3); position:relative; z-index:1;
        }

        /* body */
        .pj-body { padding:22px 22px 20px; flex:1; display:flex; flex-direction:column; gap:14px; }
        .pj-title {
          font-family:var(--ff-head); font-size:1.5rem;
          letter-spacing:.03em; color:var(--ink); line-height:1.1;
        }
        .pj-desc { font-size:.84rem; color:var(--ink2); line-height:1.85; flex:1; }

        /* mini terminal */
        .pj-mini-term {
          border-radius:10px; background:rgba(5,2,12,.95);
          border:1px solid rgba(155,93,229,0.15); overflow:hidden;
        }
        .pj-mini-term-head {
          display:flex; align-items:center; gap:5px; padding:7px 12px;
          background:rgba(255,255,255,.014);
          border-bottom:1px solid rgba(255,255,255,.05);
        }
        .pj-mini-dot { width:9px; height:9px; border-radius:50%; }
        .pj-mini-term-label { font-family:var(--ff-mono); font-size:.6rem; color:var(--ink3); margin-left:6px; }
        .pj-mini-term-body { padding:10px 12px 12px; font-family:var(--ff-mono); font-size:.68rem; line-height:1.85; min-height:88px; }
        .pj-mini-line { display:flex; gap:10px; align-items:baseline; }
        .pj-mini-ln { color:rgba(255,255,255,.1); font-size:.58rem; min-width:14px; text-align:right; user-select:none; }
        .pj-mini-tcursor {
          display:inline-block; width:6px; height:11px;
          background:var(--cyan); border-radius:1px; vertical-align:middle;
          animation:pj-blink .9s step-end infinite;
        }
        @keyframes pj-blink { 0%,100%{opacity:1} 50%{opacity:0} }

        /* tech */
        .pj-tech { display:flex; flex-wrap:wrap; gap:6px; }
        .pj-badge {
          font-family:var(--ff-mono); font-size:.62rem;
          padding:4px 10px; border-radius:4px;
          background:rgba(155,93,229,.05); border:1px solid rgba(155,93,229,.13);
          color:var(--ink2); letter-spacing:.06em; transition:all .2s;
        }
        .pj-card:hover .pj-badge { border-color:var(--acc-border); color:var(--ink); }

        /* actions */
        .pj-actions { display:flex; gap:8px; }
        .pj-btn-ghost {
          display:inline-flex; align-items:center; gap:6px;
          padding:10px 16px; border-radius:6px;
          font-family:var(--ff-body); font-size:.8rem; font-weight:500;
          border:1px solid rgba(255,255,255,.1); color:var(--ink2);
          text-decoration:none; background:transparent; transition:all .25s;
        }
        .pj-btn-ghost:hover { border-color:rgba(255,255,255,.22); color:var(--ink); }
        .pj-btn-primary {
          display:inline-flex; align-items:center; gap:6px;
          padding:10px 18px; border-radius:6px;
          font-family:var(--ff-body); font-size:.8rem; font-weight:600;
          background:var(--acc-bg); border:1px solid var(--acc-border);
          color:var(--acc); text-decoration:none;
          transition:all .25s; position:relative; overflow:hidden;
        }
        .pj-btn-primary::before {
          content:''; position:absolute; inset:0;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.07),transparent);
          transform:translateX(-100%); transition:transform .5s;
        }
        .pj-btn-primary:hover::before { transform:translateX(100%); }
        .pj-btn-primary:hover { box-shadow:0 0 22px var(--acc-glow); }

        /* responsive */
        @media (max-width:1024px) { .pj-grid { grid-template-columns:repeat(2,1fr); } }
        @media (max-width:640px) {
          #projects { padding:80px 0 90px; }
          .pj-grid { grid-template-columns:1fr; }
        }
      `}</style>

      <section id="projects">
        {/* Only the right blob remains, repositioned downward and inward */}
        <div className="pj-blob pj-blob-a"><MorphBlob color="#ff3b6b" delay={2} id="a" /></div>

        <div className="pj-container" ref={secRef}>

          {/* ── header ── */}
          <div className="pj-eyebrow" style={{ opacity:secVisible?1:0, transform:secVisible?"none":"translateY(16px)", transition:"opacity .6s ease,transform .6s ease" }}>
            <span className="pj-eyebrow-line" />
            My Work
            <span className="pj-eyebrow-line" />
          </div>

          <h2 className="pj-heading" style={{ opacity:secVisible?1:0, transform:secVisible?"none":"translateY(20px)", transition:"opacity .7s .1s ease,transform .7s .1s ease" }}>
            Featured<br /><span className="pj-heading-accent">Projects</span>
          </h2>

          <p className="pj-subtitle" style={{ opacity:secVisible?1:0, transform:secVisible?"none":"translateY(14px)", transition:"opacity .7s .2s ease,transform .7s .2s ease" }}>
            Production-grade Django apps I've shipped from idea to deployment.
          </p>

          <div className="pj-divider" style={{ opacity:secVisible?1:0, transform:secVisible?"scaleX(1)":"scaleX(0)", transformOrigin:"left", transition:"opacity .6s .3s ease,transform .6s .3s ease" }} />

          <div className="pj-count-row" style={{ opacity:secVisible?1:0, transition:"opacity .6s .4s ease" }}>
            <div className="pj-count">
              <em>{projects.length}</em> featured projects · <em>10+</em> total shipped
            </div>
            <a href="https://github.com/niharadhanesh" target="_blank" rel="noreferrer" className="pj-more-link">
              View all on GitHub
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>

          <div className="pj-grid" ref={gridRef}>
            {projects.map((p, i) => (
              <ProjectCard key={i} p={p} index={i} visible={gridVisible} />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}