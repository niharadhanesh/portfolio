import { useEffect, useRef, useState } from "react";

/* ── scroll-reveal hook ── */
function useReveal(threshold = 0.15) {
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

/* ── animated counter ── */
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
          const p    = Math.min((now - s) / 1600, 1);
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

/* ── typewriter for terminal log ── */
function useTypewriter(lines) {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone]       = useState(false);

  useEffect(() => {
    if (done) return;
    if (lineIdx >= lines.length) { setDone(true); return; }
    const cur = lines[lineIdx];
    if (charIdx < cur.length) {
      const t = setTimeout(() => setCharIdx(c => c + 1), 22);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => { setLineIdx(l => l + 1); setCharIdx(0); }, 80);
      return () => clearTimeout(t);
    }
  }, [lineIdx, charIdx, done, lines]);

  return { lineIdx, charIdx, done };
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
        <radialGradient id={`abblob${id}`} cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor={color} stopOpacity="0.32" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </radialGradient>
      </defs>
      <path fill={`url(#abblob${id})`}>
        <animate
          attributeName="d" dur={`${8 + delay}s`} repeatCount="indefinite"
          values={paths.join(";")} calcMode="spline"
          keySplines="0.45 0 0.55 1;0.45 0 0.55 1;0.45 0 0.55 1"
        />
      </path>
    </svg>
  );
}

const LOG_LINES = [
  { prefix: "loc",  color: "#00f5d4", value: "Kannur, Kerala 🇮🇳" },
  { prefix: "role", color: "#c084fc", value: "Python Django Developer" },
  { prefix: "xp",   color: "#86efac", value: "1.5+ Years" },
  { prefix: "edu",  color: "#fbbf24", value: "Diploma · EKNMPTC IHRD" },
  { prefix: "mail", color: "#f9a8d4", value: "niharadhanesh875@gmail.com" },
  { prefix: "open", color: "#00f5d4", value: "Hiring ✅" },
];

function TerminalLog({ triggered }) {
  const flat = LOG_LINES.map(l => `${l.prefix}: ${l.value}`);
  const { lineIdx, charIdx, done } = useTypewriter(triggered ? flat : []);

  return (
    <div className="ab-term-body">
      <div className="ab-term-prompt">
        <span style={{ color: "#86efac" }}>nihara</span>
        <span style={{ color: "#8b7da8" }}>@</span>
        <span style={{ color: "#c084fc" }}>portfolio</span>
        <span style={{ color: "#8b7da8" }}>:~$</span>
        <span style={{ color: "#f5f0ff", marginLeft: 8 }}>cat profile.json</span>
      </div>

      {LOG_LINES.slice(0, lineIdx).map((l, i) => (
        <div key={i} className="ab-log-row">
          <span className="ab-log-key" style={{ color: l.color }}>{l.prefix}</span>
          <span className="ab-log-sep">:</span>
          <span className="ab-log-val">{l.value}</span>
        </div>
      ))}

      {!done && lineIdx < LOG_LINES.length && (
        <div className="ab-log-row">
          <span className="ab-log-key" style={{ color: LOG_LINES[lineIdx].color }}>
            {LOG_LINES[lineIdx].prefix}
          </span>
          <span className="ab-log-sep">:</span>
          <span className="ab-log-val">
            {LOG_LINES[lineIdx].value.slice(0, charIdx - LOG_LINES[lineIdx].prefix.length - 2)}
          </span>
          <span className="ab-tcursor" />
        </div>
      )}

      {done && (
        <div className="ab-term-prompt" style={{ marginTop: 10 }}>
          <span style={{ color: "#86efac" }}>nihara</span>
          <span style={{ color: "#8b7da8" }}>@portfolio</span>
          <span style={{ color: "#8b7da8" }}>:~$</span>
          <span className="ab-tcursor" style={{ marginLeft: 8 }} />
        </div>
      )}
    </div>
  );
}

const highlights = [
  {
    icon: "🎯",
    tag: "problem solver",
    title: "Real-World Impact",
    desc: "Tackled domain challenges in healthcare, billing, and fleet management — shipping code that works under production pressure.",
    accent: "#ff3b6b",
  },
  {
    icon: "⚡",
    tag: "performance",
    title: "~30% Faster",
    desc: "Optimised Django ORM queries and caching strategy to cut average page load time by 30% across active projects.",
    accent: "#fbbf24",
  },
  {
    icon: "⚙️",
    tag: "backend",
    title: "Django Expert",
    desc: "10+ production Django apps shipped with auth systems, role-based access, REST APIs, and clean MVT architecture.",
    accent: "#44B78B",
  },
  {
    icon: "📱",
    tag: "frontend",
    title: "Pixel-Perfect UI",
    desc: "Every interface adapts flawlessly across mobile, tablet, and desktop — no janky viewports, ever.",
    accent: "#9b5de5",
  },
];

export default function About() {
  const [secRef,  secVisible]  = useReveal(0.1);
  const [leftRef, leftVisible] = useReveal(0.15);
  const [termRef, termVisible] = useReveal(0.2);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Bebas+Neue&family=Crimson+Pro:ital,wght@0,300;1,300&family=Share+Tech+Mono&display=swap');

        /* ── section shell ── */
        #about {
          --rose:   #ff3b6b;
          --violet: #9b5de5;
          --cyan:   #00f5d4;
          --ink:    #f5f0ff;
          --ink2:   #8b7da8;
          --ink3:   #4a3f62;
          --bg:     #07050f;
          --ff-head:'Bebas Neue', sans-serif;
          --ff-body:'Space Grotesk', sans-serif;
          --ff-serif:'Crimson Pro', serif;
          --ff-mono:'Share Tech Mono', monospace;
          position: relative;
          padding: 110px 0 120px;
          background: var(--bg);
          overflow: hidden;
          font-family: var(--ff-body);
          color: var(--ink);
        }

        /* subtle grid */
        #about::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(155,93,229,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(155,93,229,0.035) 1px, transparent 1px);
          background-size: 80px 80px;
        }

        /* ── blobs ── */
        /* Low opacity + pointer-events:none so they NEVER block text */
        .ab-blob {
          position: absolute;
          pointer-events: none;
          z-index: 0;       /* behind z-index:2 container */
        }
        /* Top-left: offset so only ~60% of blob visible, well clear of heading */
        .ab-blob-a {
          width: 420px; height: 420px;
          top: 40px; left: -120px;
          animation: ab-orbit 28s linear infinite;
        }
        /* Right side: vertically centred, pulled inward so it doesn't touch edge */
        .ab-blob-b {
          width: 360px; height: 360px;
          top: 50%; right: -80px;
          transform: translateY(-50%);
          animation: ab-orbit 34s linear infinite reverse;
        }
        @keyframes ab-orbit {
          0%   { transform: rotate(0deg)   translateX(20px) rotate(0deg);   }
          100% { transform: rotate(360deg) translateX(20px) rotate(-360deg); }
        }
        /* Override transform on blob-b since we set translateY via inline — use a wrapper trick */
        .ab-blob-b-wrap {
          position: absolute;
          pointer-events: none;
          z-index: 0;
          width: 360px; height: 360px;
          top: 50%; right: -80px;
          margin-top: -180px; /* half of height */
        }
        .ab-blob-b-wrap > div {
          width: 100%; height: 100%;
          animation: ab-orbit 34s linear infinite reverse;
        }

        .ab-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 6%;
          position: relative;
          z-index: 2;   /* above blobs */
        }

        /* ── section header ── */
        .ab-eyebrow {
          font-family: var(--ff-mono);
          font-size: 0.68rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--rose);
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
        }
        .ab-eyebrow-line {
          height: 1px;
          width: 36px;
          background: rgba(255,59,107,0.35);
        }

        .ab-heading {
          font-family: var(--ff-head);
          font-size: clamp(3rem, 6vw, 5.5rem);
          line-height: 0.92;
          letter-spacing: 0.02em;
          margin-bottom: 10px;
          color: var(--ink);
        }
        .ab-heading-accent {
          background: linear-gradient(90deg, var(--rose), var(--violet));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .ab-subtitle {
          font-family: var(--ff-serif);
          font-style: italic;
          font-size: clamp(1rem, 1.4vw, 1.2rem);
          color: var(--ink2);
          font-weight: 300;
          margin-bottom: 60px;
        }

        .ab-divider {
          width: 48px; height: 2px;
          background: linear-gradient(90deg, var(--rose), var(--violet));
          margin-bottom: 60px;
          border-radius: 2px;
        }

        /* ── main grid ── */
        .ab-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 60px;
          align-items: start;
        }

        /* ── LEFT ── */
        .ab-bio-block {
          opacity: 0;
          transform: translateX(-28px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .ab-bio-block.visible {
          opacity: 1;
          transform: none;
        }

        .ab-bio {
          font-size: clamp(0.88rem, 1.1vw, 1rem);
          color: var(--ink2);
          line-height: 1.95;
          margin-bottom: 20px;
          position: relative;
          padding-left: 18px;
        }
        .ab-bio::before {
          content: '';
          position: absolute;
          left: 0; top: 6px; bottom: 6px;
          width: 2px;
          background: linear-gradient(180deg, var(--rose), transparent);
          border-radius: 2px;
        }
        .ab-bio em {
          color: var(--ink);
          font-style: normal;
          font-weight: 600;
        }

        /* ── highlights grid ── */
        .ab-highlights {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 36px;
        }
        .ab-hl-card {
          padding: 20px 16px;
          border-radius: 14px;
          background: rgba(255,255,255,0.022);
          border: 1px solid rgba(155,93,229,0.12);
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease, border-color 0.3s ease, background 0.3s ease;
          opacity: 0;
          transform: translateY(20px);
          cursor: default;
        }
        .ab-hl-card.visible {
          animation: ab-card-in 0.5s ease forwards;
        }
        @keyframes ab-card-in {
          to { opacity: 1; transform: translateY(0); }
        }
        .ab-hl-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 2px;
          background: var(--card-accent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .ab-hl-card:hover {
          transform: translateY(-4px);
          border-color: rgba(155,93,229,0.26);
          background: rgba(155,93,229,0.05);
        }
        .ab-hl-card:hover::before { opacity: 1; }

        .ab-hl-tag {
          font-family: var(--ff-mono);
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--card-col);
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .ab-hl-tag::before {
          content: '//';
          opacity: 0.5;
        }

        .ab-hl-icon {
          font-size: 1.5rem;
          margin-bottom: 8px;
          display: block;
          filter: drop-shadow(0 0 8px rgba(255,255,255,0.1));
        }
        .ab-hl-title {
          font-family: var(--ff-body);
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 5px;
        }
        .ab-hl-desc {
          font-size: 0.77rem;
          color: var(--ink2);
          line-height: 1.6;
        }

        /* ── stat ribbon ── */
        .ab-stats-row {
          display: flex;
          gap: 0;
          margin-top: 36px;
          border: 1px solid rgba(155,93,229,0.14);
          border-radius: 14px;
          overflow: hidden;
          background: rgba(255,255,255,0.018);
        }
        .ab-stat-cell {
          flex: 1;
          padding: 18px 16px;
          text-align: center;
          border-right: 1px solid rgba(155,93,229,0.1);
          transition: background 0.25s;
        }
        .ab-stat-cell:last-child { border-right: none; }
        .ab-stat-cell:hover { background: rgba(155,93,229,0.05); }
        .ab-stat-num {
          font-family: var(--ff-head);
          font-size: clamp(1.8rem, 3vw, 2.4rem);
          line-height: 1;
          background: linear-gradient(135deg, var(--ink) 40%, var(--ink2));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: block;
        }
        .ab-stat-lbl {
          font-family: var(--ff-mono);
          font-size: 0.58rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ink3);
          margin-top: 4px;
          display: block;
        }

        /* ── RIGHT: terminal + social ── */
        .ab-right-col {
          opacity: 0;
          transform: translateX(28px);
          transition: opacity 0.8s 0.18s ease, transform 0.8s 0.18s ease;
        }
        .ab-right-col.visible {
          opacity: 1;
          transform: none;
        }

        /* terminal card */
        .ab-terminal {
          background: rgba(8,4,16,0.95);
          border: 1px solid rgba(155,93,229,0.2);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(155,93,229,0.06);
          margin-bottom: 18px;
        }
        .ab-terminal::before {
          content: '';
          display: block;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--rose) 35%, var(--violet) 65%, transparent);
          animation: ab-glow 3.5s ease-in-out infinite;
        }
        @keyframes ab-glow { 0%,100%{opacity:0.3}50%{opacity:1} }

        .ab-term-head {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 14px;
          background: rgba(255,255,255,0.016);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .ab-dot { width: 11px; height: 11px; border-radius: 50%; }
        .ab-term-title {
          font-family: var(--ff-mono);
          font-size: 0.68rem;
          color: var(--ink3);
          margin-left: 8px;
          flex: 1;
        }
        .ab-term-badge {
          font-family: var(--ff-mono);
          font-size: 0.56rem;
          padding: 2px 8px;
          border-radius: 4px;
          background: rgba(0,245,212,0.07);
          color: rgba(0,245,212,0.65);
          border: 1px solid rgba(0,245,212,0.15);
        }
        .ab-term-body {
          padding: 16px 18px 20px;
          font-family: var(--ff-mono);
          font-size: 0.76rem;
          line-height: 1.9;
          min-height: 210px;
        }
        .ab-term-prompt {
          margin-bottom: 10px;
          font-size: 0.72rem;
        }
        .ab-log-row {
          display: flex;
          gap: 0;
          align-items: baseline;
          white-space: pre;
        }
        .ab-log-key  { min-width: 44px; font-weight: 600; }
        .ab-log-sep  { color: var(--ink3); margin: 0 8px; }
        .ab-log-val  { color: var(--ink2); }
        .ab-tcursor {
          display: inline-block;
          width: 7px; height: 13px;
          background: var(--cyan);
          border-radius: 1px;
          vertical-align: middle;
          margin-left: 1px;
          animation: ab-blink 0.9s step-end infinite;
        }
        @keyframes ab-blink { 0%,100%{opacity:1}50%{opacity:0} }

        /* social buttons */
        .ab-social {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 10px;
        }
        .ab-social-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 16px 10px;
          border-radius: 12px;
          background: rgba(255,255,255,0.022);
          border: 1px solid rgba(155,93,229,0.12);
          color: var(--ink2);
          font-family: var(--ff-mono);
          font-size: 0.62rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
        }
        .ab-social-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: var(--btn-glow);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .ab-social-btn:hover::before { opacity: 1; }
        .ab-social-btn:hover {
          border-color: var(--btn-border);
          color: var(--ink);
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .ab-social-icon {
          width: 22px; height: 22px;
          position: relative; z-index: 1;
        }

        /* ── reveal keyframes ── */
        @keyframes ab-up {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:none; }
        }

        /* ── responsive ── */
        @media (max-width: 900px) {
          .ab-grid { grid-template-columns: 1fr; gap: 48px; }
          .ab-bio-block { transition-delay: 0s; }
          /* hide right-side blob on small screens to avoid obscuring content */
          .ab-blob-b-wrap { display: none; }
        }
        @media (max-width: 600px) {
          #about { padding: 80px 0 90px; }
          .ab-highlights { grid-template-columns: 1fr 1fr; }
          .ab-stats-row { flex-wrap: wrap; }
          .ab-stat-cell {
            flex: 1 1 45%;
            border-bottom: 1px solid rgba(155,93,229,0.1);
          }
          .ab-social { grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
          .ab-blob-a { width: 280px; height: 280px; top: 20px; left: -100px; }
        }
        @media (max-width: 420px) {
          .ab-highlights { grid-template-columns: 1fr; }
          .ab-social { grid-template-columns: 1fr 1fr 1fr; }
        }
      `}</style>

      <section id="about" ref={secRef}>

        {/* ── blob top-left: partially off-screen left, clear of heading text ── */}
        <div className="ab-blob ab-blob-a">
          <MorphBlob color="#9b5de5" delay={3} id="a" />
        </div>

        {/* ── blob right-side centre: uses margin-top trick to vertically centre ── */}
        <div className="ab-blob-b-wrap">
          <div>
            <MorphBlob color="#ff3b6b" delay={6} id="b" />
          </div>
        </div>

        <div className="ab-container">

          {/* ── header ── */}
          <div className="ab-eyebrow" style={{
            opacity: secVisible ? 1 : 0,
            transform: secVisible ? "none" : "translateY(16px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}>
            <span className="ab-eyebrow-line" />
            About Me
            <span className="ab-eyebrow-line" />
          </div>

          <h2 className="ab-heading" style={{
            opacity: secVisible ? 1 : 0,
            transform: secVisible ? "none" : "translateY(20px)",
            transition: "opacity 0.7s 0.1s ease, transform 0.7s 0.1s ease",
          }}>
            The developer<br />
            <span className="ab-heading-accent">behind the code</span>
          </h2>

          <p className="ab-subtitle" style={{
            opacity: secVisible ? 1 : 0,
            transform: secVisible ? "none" : "translateY(14px)",
            transition: "opacity 0.7s 0.2s ease, transform 0.7s 0.2s ease",
          }}>
            Turning ideas into production-grade software — one clean commit at a time.
          </p>

          <div className="ab-divider" style={{
            opacity: secVisible ? 1 : 0,
            transform: secVisible ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
            transition: "opacity 0.6s 0.3s ease, transform 0.6s 0.3s ease",
          }} />

          {/* ── grid ── */}
          <div className="ab-grid">

            {/* ──── LEFT ──── */}
            <div
              ref={leftRef}
              className={`ab-bio-block ${leftVisible ? "visible" : ""}`}
            >
              <p className="ab-bio">
                I'm a <em>Python Django Developer</em> from Kannur, Kerala, with
                hands-on experience building production-ready web applications from the ground up.
                I care deeply about code quality, performance, and building things that{" "}
                <em>actually work at scale</em>.
              </p>
              <p className="ab-bio">
                At Altos Technologies, I developed and shipped <em>10+ Django websites</em>,
                built authentication systems, designed role-based access, and cut load
                times by optimising queries and ORM usage.
                I'm comfortable owning both the backend logic and the frontend experience.
              </p>
              <p className="ab-bio">
                I thrive in collaborative environments, version-control everything, and write
                code the next developer won't curse at. Always learning, always shipping.
              </p>

              {/* highlight cards */}
              <div className="ab-highlights">
                {highlights.map((h, i) => (
                  <div
                    key={i}
                    className={`ab-hl-card ${leftVisible ? "visible" : ""}`}
                    style={{
                      "--card-accent": h.accent,
                      "--card-col": h.accent,
                      animationDelay: `${0.12 + i * 0.1}s`,
                    }}
                  >
                    <span className="ab-hl-tag">{h.tag}</span>
                    <span className="ab-hl-icon">{h.icon}</span>
                    <div className="ab-hl-title">{h.title}</div>
                    <div className="ab-hl-desc">{h.desc}</div>
                  </div>
                ))}
              </div>

              {/* stat ribbon */}
              <div className="ab-stats-row">
                {[
                  { n: "1.5", s: "+", l: "Yrs Exp" },
                  { n: "10",  s: "+", l: "Projects" },
                  { n: "30",  s: "%", l: "Perf Gain" },
                  { n: "4",   s: "+", l: "Domains" },
                ].map((d) => (
                  <div className="ab-stat-cell" key={d.l}>
                    <span className="ab-stat-num"><Counter to={d.n} suffix={d.s} /></span>
                    <span className="ab-stat-lbl">{d.l}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ──── RIGHT ──── */}
            <div
              ref={termRef}
              className={`ab-right-col ${termVisible ? "visible" : ""}`}
            >
              {/* terminal */}
              <div className="ab-terminal">
                <div className="ab-term-head">
                  <span className="ab-dot" style={{ background: "#ff5f57" }} />
                  <span className="ab-dot" style={{ background: "#ffbd2e" }} />
                  <span className="ab-dot" style={{ background: "#28c840" }} />
                  <span className="ab-term-title">profile.json</span>
                  <span className="ab-term-badge">● live</span>
                </div>
                <TerminalLog triggered={termVisible} />
              </div>

              {/* social */}
              <div className="ab-social">
                <a
                  href="https://linkedin.com/in/nihara-dhanesh-813b053a4"
                  target="_blank" rel="noreferrer"
                  className="ab-social-btn"
                  style={{ "--btn-glow": "rgba(10,102,194,0.08)", "--btn-border": "rgba(10,102,194,0.4)" }}
                >
                  <svg className="ab-social-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                  LinkedIn
                </a>
                <a
                  href="https://github.com/niharadhanesh"
                  target="_blank" rel="noreferrer"
                  className="ab-social-btn"
                  style={{ "--btn-glow": "rgba(155,93,229,0.07)", "--btn-border": "rgba(155,93,229,0.35)" }}
                >
                  <svg className="ab-social-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
                  </svg>
                  GitHub
                </a>
                <a
                  href="mailto:niharadhanesh875@gmail.com"
                  className="ab-social-btn"
                  style={{ "--btn-glow": "rgba(255,59,107,0.07)", "--btn-border": "rgba(255,59,107,0.35)" }}
                >
                  <svg className="ab-social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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