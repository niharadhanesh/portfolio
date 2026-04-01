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

/* ── animated counter (same as hero/about) ── */
function Counter({ to, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref  = useRef(null);
  const done = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const n = parseFloat(to);
        const s = performance.now();
        const tick = (now) => {
          const p    = Math.min((now - s) / 1500, 1);
          const ease = 1 - Math.pow(1 - p, 4);
          setVal(+(n * ease).toFixed(1));
          if (p < 1) requestAnimationFrame(tick); else setVal(n);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val % 1 === 0 ? Math.floor(val) : val}{suffix}</span>;
}

/* ── morphing blob ── */
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
        <radialGradient id={`expblob${id}`} cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor={color} stopOpacity="0.38" />
          <stop offset="100%" stopColor={color} stopOpacity="0.03" />
        </radialGradient>
      </defs>
      <path fill={`url(#expblob${id})`}>
        <animate
          attributeName="d" dur={`${8 + delay}s`} repeatCount="indefinite"
          values={paths.join(";")} calcMode="spline"
          keySplines="0.45 0 0.55 1;0.45 0 0.55 1;0.45 0 0.55 1"
        />
      </path>
    </svg>
  );
}

/* ── scanning line animation for active card ── */
function ScanLine() {
  return <div className="exp-scan" />;
}

/* ── timeline dot with pulse ── */
function TimelineDot({ icon, active, color }) {
  return (
    <div className={`exp-tl-dot ${active ? "active" : ""}`} style={{ "--dot-color": color }}>
      <span className="exp-tl-icon">{icon}</span>
      {active && <span className="exp-tl-pulse" />}
    </div>
  );
}

const experiences = [
  {
    type: "work",
    role: "Python Developer",
    company: "Altos Technologies",
    period: "2024 – 2025",
    current: true,
    accent: "#ff3b6b",
    icon: "💼",
    points: [
      "Developed and maintained 10+ production-ready Django applications following MVT architecture",
      "Built RESTful APIs for user management, authentication, and role-based access control",
      "Improved page load performance by ~30% through query optimization and efficient ORM usage",
      "Implemented responsive UI using Bootstrap, ensuring compatibility across mobile and desktop",
      "Used Git for version control and collaborated with cross-functional teams",
    ],
    tags: ["Python", "Django", "Vercel", "Bootstrap", "Git", "MySQL"],
    stat: { n: "10", s: "+", l: "projects shipped" },
  },
  {
    type: "work",
    role: "Python Fullstack Intern",
    company: "STC Technologies",
    period: "2023 – 2024",
    current: false,
    accent: "#9b5de5",
    icon: "🎓",
    points: [
      "Gained comprehensive experience in full-stack web development using Python and Django",
      "Built and deployed dynamic web applications with responsive interfaces",
      "Worked with HTML, CSS, JavaScript, and Bootstrap for frontend development",
    ],
    tags: ["Python", "Django", "HTML", "CSS", "JavaScript", "Bootstrap"],
    stat: { n: "6", s: " MO", l: "internship" },
  },
];

const education = [
  {
    degree: "Diploma in Computer Hardware Engineering",
    school: "EKNMPTC IHRD",
    period: "2020 – 2023",
    desc: "Gained programming skills and practical coding experience. Foundation in computer science fundamentals.",
    icon: "🎓",
    accent: "#00f5d4",
  },
  {
    degree: "Plus Two (Higher Secondary)",
    school: "Rajas HSS",
    period: "2018 – 2020",
    desc: "Completed higher secondary education with focus on science and mathematics.",
    icon: "📚",
    accent: "#c084fc",
  },
];

/* ── Work experience card ── */
function ExpCard({ e, index, visible }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`exp-item ${visible ? "visible" : ""}`}
      style={{ animationDelay: `${index * 0.18}s` }}
    >
      <TimelineDot icon={e.icon} active={e.current} color={e.accent} />

      <div
        className="exp-card"
        style={{ "--acc": e.accent, "--acc-glow": `${e.accent}28`, "--acc-border": `${e.accent}44` }}
        onClick={() => setExpanded(x => !x)}
      >
        {e.current && <ScanLine />}

        <div className="exp-card-top">
          <div className="exp-card-meta">
            {e.current && (
              <div className="exp-current-badge">
                <span className="exp-live-dot" />
                Current Role
              </div>
            )}
            <div className="exp-header-row">
              <div>
                <div className="exp-role">{e.role}</div>
                <div className="exp-company">{e.company}</div>
              </div>
              <div className="exp-period-wrap">
                <span className="exp-period">{e.period}</span>
                <span className="exp-expand-icon" style={{ transform: expanded ? "rotate(180deg)" : "none" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </span>
              </div>
            </div>
          </div>

          {/* stat badge */}
          <div className="exp-stat-badge">
            <span className="exp-stat-num"><Counter to={e.stat.n} suffix={e.stat.s} /></span>
            <span className="exp-stat-lbl">{e.stat.l}</span>
          </div>
        </div>

        {/* points */}
        <div className={`exp-points ${expanded ? "expanded" : ""}`}>
          {e.points.map((pt, j) => (
            <div key={j} className="exp-point" style={{ animationDelay: `${j * 0.06}s` }}>
              <span className="exp-bullet" style={{ background: e.accent }} />
              {pt}
            </div>
          ))}
        </div>

        {/* tags */}
        <div className="exp-tags">
          {e.tags.map((t, j) => (
            <span key={j} className="exp-tag" style={{ "--tag-color": e.accent }}>{t}</span>
          ))}
        </div>

        <div className="exp-expand-hint">
          {expanded ? "Click to collapse" : "Click to expand details"}
        </div>
      </div>
    </div>
  );
}

/* ── Education card ── */
function EduCard({ ed, index, visible }) {
  return (
    <div
      className={`edu-card ${visible ? "visible" : ""}`}
      style={{ animationDelay: `${0.3 + index * 0.14}s`, "--edu-acc": ed.accent }}
    >
      <div className="edu-top-line" />
      <div className="edu-inner">
        <div className="edu-icon-wrap">
          <span className="edu-icon">{ed.icon}</span>
        </div>
        <div className="edu-content">
          <div className="edu-degree">{ed.degree}</div>
          <div className="edu-school">{ed.school}</div>
          <div className="edu-period">{ed.period}</div>
          <div className="edu-desc">{ed.desc}</div>
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const [secRef,  secVisible]  = useReveal(0.08);
  const [leftRef, leftVisible] = useReveal(0.1);
  const [rightRef, rightVisible] = useReveal(0.1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Bebas+Neue&family=Crimson+Pro:ital,wght@0,300;1,300&family=Share+Tech+Mono&display=swap');

        #experience {
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
        #experience::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(155,93,229,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(155,93,229,0.03) 1px, transparent 1px);
          background-size: 80px 80px;
        }

        /* blobs — right blob pulled up and shrunk; left blob unchanged */
        .exp-blob { position:absolute; pointer-events:none; z-index:0; }
        .exp-blob-a { width:360px; height:360px; bottom:80px; right:-60px; animation:exp-orbit 28s linear infinite; }
        .exp-blob-b { width:360px;height:360px;top:10%;left:-100px; animation:exp-orbit 22s linear infinite reverse; }
        @keyframes exp-orbit {
          0%  { transform:rotate(0deg)   translateX(22px) rotate(0deg)   }
          100%{ transform:rotate(360deg) translateX(22px) rotate(-360deg) }
        }

        .exp-container { max-width:1200px; margin:0 auto; padding:0 6%; position:relative; z-index:2; }

        /* header */
        .exp-eyebrow {
          font-family:var(--ff-mono); font-size:.68rem; letter-spacing:.28em;
          text-transform:uppercase; color:var(--violet);
          display:flex; align-items:center; gap:12px; margin-bottom:18px;
        }
        .exp-eyebrow-line { height:1px; width:36px; background:rgba(155,93,229,0.38); }
        .exp-heading {
          font-family:var(--ff-head); font-size:clamp(3rem,6vw,5.5rem);
          line-height:.92; letter-spacing:.02em; margin-bottom:10px; color:var(--ink);
        }
        .exp-heading-accent {
          background:linear-gradient(90deg,var(--violet),var(--cyan));
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
        }
        .exp-subtitle {
          font-family:'Crimson Pro',serif; font-style:italic;
          font-size:clamp(1rem,1.4vw,1.2rem); color:var(--ink2);
          font-weight:300; margin-bottom:60px;
        }
        .exp-divider {
          width:48px; height:2px;
          background:linear-gradient(90deg,var(--violet),var(--cyan));
          margin-bottom:60px; border-radius:2px;
        }

        /* layout */
        .exp-layout { display:grid; grid-template-columns:3fr 2fr; gap:60px; align-items:start; }

        /* ── col labels ── */
        .exp-col-label {
          font-family:var(--ff-mono); font-size:.68rem; letter-spacing:.18em;
          text-transform:uppercase; color:var(--ink3);
          display:flex; align-items:center; gap:10px; margin-bottom:28px;
        }
        .exp-col-label::before { content:'//'; color:var(--rose); opacity:.7; }

        /* ── timeline ── */
        .exp-timeline { position:relative; padding-left:52px; }
        .exp-timeline-track {
          position:absolute; left:19px; top:0; bottom:0; width:1px;
          background:linear-gradient(to bottom, var(--rose) 0%, var(--violet) 50%, transparent 100%);
          opacity:.35;
        }
        .exp-timeline-track::after {
          content:'';
          position:absolute; top:0; left:0; right:0; bottom:0;
          background:linear-gradient(to bottom, var(--cyan), transparent);
          opacity:.6;
          animation:exp-trackflow 3s ease-in-out infinite;
        }
        @keyframes exp-trackflow {
          0%   { transform:translateY(-100%); opacity:.6; }
          100% { transform:translateY(200%);  opacity:0;  }
        }

        /* item */
        .exp-item {
          position:relative; margin-bottom:28px;
          opacity:0; transform:translateX(-20px);
        }
        .exp-item.visible { animation:exp-slide-in .55s ease forwards; }
        @keyframes exp-slide-in { to { opacity:1; transform:translateX(0); } }

        /* dot */
        .exp-tl-dot {
          position:absolute; left:-52px; top:16px;
          width:38px; height:38px; border-radius:50%;
          background:rgba(8,4,16,.98); border:2px solid rgba(155,93,229,.18);
          display:flex; align-items:center; justify-content:center;
          font-size:1.1rem; z-index:2;
          transition:border-color .3s, box-shadow .3s;
        }
        .exp-tl-dot.active {
          border-color:var(--dot-color);
          box-shadow:0 0 18px var(--dot-color), 0 0 40px rgba(255,59,107,.12);
        }
        .exp-tl-icon { position:relative; z-index:1; }
        .exp-tl-pulse {
          position:absolute; inset:-6px; border-radius:50%;
          border:1px solid var(--dot-color); opacity:.5;
          animation:exp-pulse 2s ease-in-out infinite;
        }
        @keyframes exp-pulse {
          0%,100% { transform:scale(1);   opacity:.5; }
          50%     { transform:scale(1.18); opacity:.1; }
        }

        /* card */
        .exp-card {
          border-radius:18px; background:rgba(255,255,255,.022);
          border:1px solid rgba(155,93,229,.1);
          overflow:hidden; position:relative;
          transition:border-color .3s,box-shadow .3s;
          cursor:pointer;
        }
        .exp-card:hover {
          border-color:var(--acc-border);
          box-shadow:0 18px 56px rgba(0,0,0,.5), 0 0 30px var(--acc-glow);
        }

        /* scan animation (active card) */
        .exp-scan {
          position:absolute; top:0; left:0; right:0; height:2px;
          background:linear-gradient(90deg,transparent,var(--rose) 40%,var(--violet) 60%,transparent);
          animation:exp-scan-anim 3s ease-in-out infinite;
          z-index:5;
        }
        @keyframes exp-scan-anim { 0%,100%{opacity:.25} 50%{opacity:1} }

        .exp-card-top {
          display:flex; align-items:flex-start; justify-content:space-between;
          gap:12px; padding:20px 22px 14px; flex-wrap:wrap;
        }
        .exp-card-meta { flex:1; min-width:0; }

        .exp-current-badge {
          display:inline-flex; align-items:center; gap:6px;
          font-family:var(--ff-mono); font-size:.62rem;
          letter-spacing:.1em; color:#4ade80; margin-bottom:10px;
        }
        .exp-live-dot {
          width:6px; height:6px; border-radius:50%; background:#4ade80;
          animation:exp-live-pulse 1.8s ease-in-out infinite;
          box-shadow:0 0 8px #4ade80;
        }
        @keyframes exp-live-pulse {
          0%,100% { transform:scale(1); opacity:1; }
          50%     { transform:scale(1.5); opacity:.5; }
        }

        .exp-header-row {
          display:flex; align-items:flex-start; justify-content:space-between; gap:12px;
        }
        .exp-role { font-family:var(--ff-head); font-size:1.55rem; letter-spacing:.02em; color:var(--ink); line-height:1.05; }
        .exp-company { font-family:var(--ff-mono); font-size:.7rem; letter-spacing:.1em; color:var(--acc); margin-top:4px; text-transform:uppercase; }

        .exp-period-wrap { display:flex; flex-direction:column; align-items:flex-end; gap:6px; flex-shrink:0; }
        .exp-period {
          font-family:var(--ff-mono); font-size:.7rem; letter-spacing:.1em;
          padding:4px 12px; border-radius:4px;
          background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.08);
          color:var(--ink3); white-space:nowrap;
        }
        .exp-expand-icon { color:var(--ink3); transition:transform .3s; line-height:0; }

        /* stat badge */
        .exp-stat-badge {
          padding:12px 16px; border-radius:10px;
          background:rgba(255,255,255,.018); border:1px solid rgba(155,93,229,.1);
          text-align:center; flex-shrink:0; min-width:80px;
        }
        .exp-stat-num {
          font-family:var(--ff-head); font-size:1.8rem; line-height:1; display:block;
          background:linear-gradient(135deg,var(--ink) 40%,var(--ink2));
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
        }
        .exp-stat-lbl {
          font-family:var(--ff-mono); font-size:.55rem; letter-spacing:.1em;
          text-transform:uppercase; color:var(--ink3); margin-top:3px; display:block;
        }

        /* points */
        .exp-points {
          max-height:0; overflow:hidden;
          transition:max-height .4s ease, padding .3s ease;
          padding:0 22px;
        }
        .exp-points.expanded { max-height:400px; padding:4px 22px 16px; }
        .exp-point {
          display:flex; align-items:flex-start; gap:10px;
          font-size:.84rem; color:var(--ink2); line-height:1.65; margin-bottom:7px;
          opacity:0; transform:translateX(-8px);
          animation:exp-pt-in .35s ease forwards;
        }
        .exp-points.expanded .exp-point { animation:exp-pt-in .35s ease forwards; }
        @keyframes exp-pt-in { to { opacity:1; transform:translateX(0); } }
        .exp-bullet { width:5px; height:5px; border-radius:50%; flex-shrink:0; margin-top:7px; }

        /* tags */
        .exp-tags { display:flex; flex-wrap:wrap; gap:6px; padding:0 22px 16px; }
        .exp-tag {
          font-family:var(--ff-mono); font-size:.62rem; letter-spacing:.06em;
          padding:4px 10px; border-radius:4px;
          background:color-mix(in srgb, var(--tag-color) 8%, transparent);
          border:1px solid color-mix(in srgb, var(--tag-color) 24%, transparent);
          color:var(--tag-color); transition:all .2s;
        }
        .exp-card:hover .exp-tag { filter:brightness(1.15); }

        .exp-expand-hint {
          text-align:center; font-family:var(--ff-mono); font-size:.58rem;
          letter-spacing:.12em; text-transform:uppercase; color:var(--ink3);
          padding:10px 22px 14px; border-top:1px solid rgba(155,93,229,.08);
          transition:color .2s;
        }
        .exp-card:hover .exp-expand-hint { color:var(--ink2); }

        /* ── education cards ── */
        .edu-card {
          border-radius:16px; background:rgba(255,255,255,.022);
          border:1px solid rgba(155,93,229,.1);
          overflow:hidden; margin-bottom:14px;
          position:relative; transition:all .3s;
          opacity:0; transform:translateX(20px);
        }
        .edu-card.visible { animation:exp-slide-right .55s ease forwards; }
        @keyframes exp-slide-right { to { opacity:1; transform:translateX(0); } }
        .edu-top-line {
          height:2px;
          background:linear-gradient(90deg,transparent,var(--edu-acc),transparent);
          opacity:.6;
        }
        .edu-card:hover {
          border-color:color-mix(in srgb,var(--edu-acc) 30%,transparent);
          box-shadow:0 12px 40px rgba(0,0,0,.4);
          transform:translateY(-3px);
        }
        .edu-inner { display:flex; gap:14px; padding:18px 20px; }
        .edu-icon-wrap {
          width:40px; height:40px; border-radius:10px; flex-shrink:0;
          background:color-mix(in srgb,var(--edu-acc) 8%,transparent);
          border:1px solid color-mix(in srgb,var(--edu-acc) 22%,transparent);
          display:flex; align-items:center; justify-content:center; font-size:1.3rem;
        }
        .edu-degree { font-family:var(--ff-body); font-weight:700; font-size:.92rem; color:var(--ink); margin-bottom:3px; }
        .edu-school { font-family:var(--ff-mono); font-size:.65rem; letter-spacing:.08em; color:var(--edu-acc); text-transform:uppercase; margin-bottom:4px; }
        .edu-period { font-family:var(--ff-mono); font-size:.65rem; color:var(--ink3); margin-bottom:7px; }
        .edu-desc { font-size:.8rem; color:var(--ink2); line-height:1.6; }

        /* ── stats strip (bottom) ── */
        .exp-stats-strip {
          display:flex; gap:0;
          margin-top:64px;
          border:1px solid rgba(155,93,229,.12); border-radius:16px;
          overflow:hidden; background:rgba(255,255,255,.016);
        }
        .exp-strip-cell {
          flex:1; padding:20px 16px; text-align:center;
          border-right:1px solid rgba(155,93,229,.08); transition:background .25s;
        }
        .exp-strip-cell:last-child { border-right:none; }
        .exp-strip-cell:hover { background:rgba(155,93,229,.05); }
        .exp-strip-num {
          font-family:var(--ff-head); font-size:clamp(1.8rem,3vw,2.4rem); line-height:1;
          background:linear-gradient(135deg,var(--ink) 40%,var(--ink2));
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
          display:block;
        }
        .exp-strip-lbl {
          font-family:var(--ff-mono); font-size:.58rem; letter-spacing:.14em;
          text-transform:uppercase; color:var(--ink3); margin-top:4px; display:block;
        }

        /* ── responsive ── */
        @media (max-width:900px) {
          .exp-layout { grid-template-columns:1fr; gap:40px; }
        }
        @media (max-width:600px) {
          #experience { padding:80px 0 90px; }
          .exp-timeline { padding-left:44px; }
          .exp-tl-dot { left:-44px; width:32px; height:32px; font-size:.9rem; }
          .exp-card-top { flex-direction:column; }
          .exp-stats-strip { flex-wrap:wrap; }
          .exp-strip-cell { flex:1 1 45%; border-bottom:1px solid rgba(155,93,229,.08); }
        }
      `}</style>

      <section id="experience">
        {/* Right blob: shrunk from 480px → 360px, moved up from bottom:-160px → bottom:80px, pulled inward from right:-120px → right:-60px */}
        <div className="exp-blob exp-blob-a"><MorphBlob color="#9b5de5" delay={3} id="a" /></div>
        <div className="exp-blob exp-blob-b"><MorphBlob color="#00f5d4" delay={6} id="b" /></div>

        <div className="exp-container" ref={secRef}>

          {/* ── header ── */}
          <div className="exp-eyebrow" style={{ opacity:secVisible?1:0, transform:secVisible?"none":"translateY(16px)", transition:"opacity .6s ease,transform .6s ease" }}>
            <span className="exp-eyebrow-line" />
            Background
            <span className="exp-eyebrow-line" />
          </div>

          <h2 className="exp-heading" style={{ opacity:secVisible?1:0, transform:secVisible?"none":"translateY(20px)", transition:"opacity .7s .1s ease,transform .7s .1s ease" }}>
            Experience &amp;<br /><span className="exp-heading-accent">Education</span>
          </h2>

          <p className="exp-subtitle" style={{ opacity:secVisible?1:0, transform:secVisible?"none":"translateY(14px)", transition:"opacity .7s .2s ease,transform .7s .2s ease" }}>
            Where I've worked, learned, and grown as a developer.
          </p>

          <div className="exp-divider" style={{ opacity:secVisible?1:0, transform:secVisible?"scaleX(1)":"scaleX(0)", transformOrigin:"left", transition:"opacity .6s .3s ease,transform .6s .3s ease" }} />

          {/* ── two-col layout ── */}
          <div className="exp-layout">

            {/* ──── LEFT: work ──── */}
            <div ref={leftRef}>
              <div className="exp-col-label">Work Experience</div>
              <div className="exp-timeline">
                <div className="exp-timeline-track" />
                {experiences.map((e, i) => (
                  <ExpCard key={i} e={e} index={i} visible={leftVisible} />
                ))}
              </div>
            </div>

            {/* ──── RIGHT: education ──── */}
            <div ref={rightRef}>
              <div className="exp-col-label" style={{ "--rose": "#c084fc" }}>Education</div>
              {education.map((ed, i) => (
                <EduCard key={i} ed={ed} index={i} visible={rightVisible} />
              ))}

              {/* quick-stats panel */}
              <div className="exp-stats-strip" style={{ opacity:rightVisible?1:0, transition:"opacity .8s .4s ease" }}>
                {[
                  { n: "1.5", s: "+", l: "Yrs Exp" },
                  { n: "10",  s: "+", l: "Projects" },
                  { n: "30",  s: "%", l: "Perf Gain" },
                  { n: "4",   s: "+", l: "Domains" },
                ].map(d => (
                  <div className="exp-strip-cell" key={d.l}>
                    <span className="exp-strip-num"><Counter to={d.n} suffix={d.s} /></span>
                    <span className="exp-strip-lbl">{d.l}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}