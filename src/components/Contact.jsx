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
        <radialGradient id={`ctblob${id}`} cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor={color} stopOpacity="0.38" />
          <stop offset="100%" stopColor={color} stopOpacity="0.03" />
        </radialGradient>
      </defs>
      <path fill={`url(#ctblob${id})`}>
        <animate
          attributeName="d" dur={`${8 + delay}s`} repeatCount="indefinite"
          values={paths.join(";")} calcMode="spline"
          keySplines="0.45 0 0.55 1;0.45 0 0.55 1;0.45 0 0.55 1"
        />
      </path>
    </svg>
  );
}

/* ── floating particles ── */
function Particles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    dur: Math.random() * 8 + 6,
    delay: Math.random() * 4,
  }));
  return (
    <div className="ct-particles" aria-hidden="true">
      {particles.map(p => (
        <span
          key={p.id}
          className="ct-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ── contact card ── */
function ContactCard({ item, index, visible }) {
  const [hovered, setHovered] = useState(false);
  const accentMap = {
    rose:   { color: "#ff3b6b", glow: "rgba(255,59,107,0.18)", border: "rgba(255,59,107,0.32)", bg: "rgba(255,59,107,0.07)" },
    violet: { color: "#9b5de5", glow: "rgba(155,93,229,0.18)",  border: "rgba(155,93,229,0.32)",  bg: "rgba(155,93,229,0.07)"  },
    cyan:   { color: "#00f5d4", glow: "rgba(0,245,212,0.15)",   border: "rgba(0,245,212,0.30)",   bg: "rgba(0,245,212,0.06)"  },
  };
  const acc = accentMap[item.accent];

  return (
    <a
      href={item.href}
      target={item.href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className={`ct-card ${visible ? "visible" : ""}`}
      style={{
        animationDelay: `${index * 0.12}s`,
        "--acc": acc.color,
        "--acc-glow": acc.glow,
        "--acc-border": acc.border,
        "--acc-bg": acc.bg,
        textDecoration: "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="ct-card-top-bar" />
      <div className="ct-card-inner">
        <div className="ct-icon-wrap">
          {item.icon}
          {hovered && <span className="ct-icon-ring" />}
        </div>
        <div className="ct-card-text">
          <div className="ct-card-label">{item.label}</div>
          <div className="ct-card-value">{item.value}</div>
        </div>
        <div className="ct-card-arrow">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </a>
  );
}

const contactItems = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: "Email",
    value: "niharadhanesh875@gmail.com",
    href: "mailto:niharadhanesh875@gmail.com",
    accent: "rose",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.22 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l1.45-1.45a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 13.92v3z"/>
      </svg>
    ),
    label: "Phone",
    value: "+91 9544144283",
    href: "tel:+919544144283",
    accent: "violet",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: "Location",
    value: "Kannur, Kerala, India",
    href: "https://maps.google.com/?q=Kannur,Kerala",
    accent: "cyan",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
    label: "LinkedIn",
    value: "Connect with me",
    href: "https://linkedin.com/in/nihara-dhanesh-813b053a4",
    accent: "violet",
  },
];

export default function Contact() {
  const [secRef,   secVisible]   = useReveal(0.08);
  const [leftRef,  leftVisible]  = useReveal(0.1);
  const [rightRef, rightVisible] = useReveal(0.1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Bebas+Neue&family=Crimson+Pro:ital,wght@0,300;1,300&family=Share+Tech+Mono&display=swap');

        #contact {
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
        #contact::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(155,93,229,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(155,93,229,0.03) 1px, transparent 1px);
          background-size: 80px 80px;
        }

        /* blobs */
        .ct-blob { position: absolute; pointer-events: none; z-index: 0; }
        .ct-blob-a { width: 420px; height: 420px; top: 40px; right: -60px; animation: ct-orbit 30s linear infinite; }
        .ct-blob-b { width: 320px; height: 320px; bottom: 60px; left: -80px; animation: ct-orbit 24s linear infinite reverse; }
        @keyframes ct-orbit {
          0%   { transform: rotate(0deg)   translateX(20px) rotate(0deg)   }
          100% { transform: rotate(360deg) translateX(20px) rotate(-360deg) }
        }

        /* particles */
        .ct-particles { position: absolute; inset: 0; pointer-events: none; z-index: 0; }
        .ct-particle {
          position: absolute; border-radius: 50%;
          background: rgba(155, 93, 229, 0.35);
          animation: ct-float linear infinite;
        }
        @keyframes ct-float {
          0%   { transform: translateY(0)   scale(1);   opacity: 0; }
          20%  { opacity: 0.6; }
          80%  { opacity: 0.3; }
          100% { transform: translateY(-80px) scale(0.5); opacity: 0; }
        }

        .ct-container { max-width: 1200px; margin: 0 auto; padding: 0 6%; position: relative; z-index: 2; }

        /* header */
        .ct-eyebrow {
          font-family: var(--ff-mono); font-size: .68rem; letter-spacing: .28em;
          text-transform: uppercase; color: var(--rose);
          display: flex; align-items: center; gap: 12px; margin-bottom: 18px;
        }
        .ct-eyebrow-line { height: 1px; width: 36px; background: rgba(255,59,107,0.38); }
        .ct-heading {
          font-family: var(--ff-head); font-size: clamp(3rem, 6vw, 5.5rem);
          line-height: .92; letter-spacing: .02em; margin-bottom: 10px; color: var(--ink);
        }
        .ct-heading-accent {
          background: linear-gradient(90deg, var(--rose), var(--violet));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .ct-subtitle {
          font-family: 'Crimson Pro', serif; font-style: italic;
          font-size: clamp(1rem, 1.4vw, 1.2rem); color: var(--ink2);
          font-weight: 300; margin-bottom: 60px;
        }
        .ct-divider {
          width: 48px; height: 2px;
          background: linear-gradient(90deg, var(--rose), var(--violet));
          margin-bottom: 60px; border-radius: 2px;
        }

        /* layout */
        .ct-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; }

        /* col label */
        .ct-col-label {
          font-family: var(--ff-mono); font-size: .68rem; letter-spacing: .18em;
          text-transform: uppercase; color: var(--ink3);
          display: flex; align-items: center; gap: 10px; margin-bottom: 28px;
        }
        .ct-col-label::before { content: '//'; color: var(--rose); opacity: .7; }

        /* tagline */
        .ct-tagline {
          font-size: .9rem; line-height: 1.9; color: var(--ink2);
          margin-bottom: 32px; padding: 20px 22px;
          border-radius: 14px; border: 1px solid rgba(155,93,229,.1);
          background: rgba(255,255,255,.018); position: relative; overflow: hidden;
        }
        .ct-tagline::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, var(--rose), transparent);
          opacity: .5;
          animation: ct-scan 4s ease-in-out infinite;
        }
        @keyframes ct-scan { 0%,100% { opacity: .2; } 50% { opacity: .8; } }
        .ct-tagline strong { color: var(--rose); font-weight: 600; }

        /* cards grid */
        .ct-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        /* single card */
        .ct-card {
          border-radius: 16px; background: rgba(255,255,255,.022);
          border: 1px solid rgba(155,93,229,.1);
          overflow: hidden; display: flex; flex-direction: column;
          position: relative;
          opacity: 0; transform: translateY(18px) scale(0.97);
          transition: border-color .3s, box-shadow .3s, transform .3s;
        }
        .ct-card.visible { animation: ct-card-in .5s ease forwards; }
        @keyframes ct-card-in { to { opacity: 1; transform: translateY(0) scale(1); } }
        .ct-card:hover {
          transform: translateY(-6px) !important;
          border-color: var(--acc-border);
          box-shadow: 0 20px 50px rgba(0,0,0,.5), 0 0 28px var(--acc-glow);
        }
        .ct-card-top-bar {
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--acc), transparent);
          opacity: 0; transition: opacity .3s;
        }
        .ct-card:hover .ct-card-top-bar { opacity: 1; }
        .ct-card-inner { display: flex; align-items: center; gap: 14px; padding: 18px 16px; }
        .ct-icon-wrap {
          width: 42px; height: 42px; border-radius: 12px; flex-shrink: 0;
          background: var(--acc-bg); border: 1px solid var(--acc-border);
          display: flex; align-items: center; justify-content: center;
          color: var(--acc); position: relative;
          transition: box-shadow .3s;
        }
        .ct-card:hover .ct-icon-wrap { box-shadow: 0 0 16px var(--acc-glow); }
        .ct-icon-ring {
          position: absolute; inset: -5px; border-radius: 50%;
          border: 1px solid var(--acc); opacity: .4;
          animation: ct-ring 1.4s ease-out forwards;
        }
        @keyframes ct-ring { 0% { transform: scale(.8); opacity: .6; } 100% { transform: scale(1.5); opacity: 0; } }
        .ct-card-label {
          font-family: var(--ff-mono); font-size: .6rem; letter-spacing: .12em;
          text-transform: uppercase; color: var(--ink3); margin-bottom: 4px;
        }
        .ct-card-value { font-size: .82rem; color: var(--ink); font-weight: 500; word-break: break-word; line-height: 1.4; }
        .ct-card-arrow { margin-left: auto; flex-shrink: 0; color: var(--ink3); transition: color .2s, transform .2s; }
        .ct-card:hover .ct-card-arrow { color: var(--acc); transform: translateX(3px); }

        /* ── CTA box ── */
        .ct-cta-wrap {
          opacity: 0; transform: translateX(24px);
        }
        .ct-cta-wrap.visible { animation: ct-slide-right .6s ease forwards; }
        @keyframes ct-slide-right { to { opacity: 1; transform: translateX(0); } }

        .ct-cta {
          border-radius: 22px; overflow: hidden; position: relative;
          border: 1px solid rgba(155,93,229,.15);
          background: rgba(255,255,255,.02);
        }
        .ct-cta-scan {
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, var(--rose) 40%, var(--violet) 60%, transparent);
          animation: ct-cta-scan 3.5s ease-in-out infinite; z-index: 5;
        }
        @keyframes ct-cta-scan { 0%,100% { opacity: .2; } 50% { opacity: 1; } }
        .ct-cta-glow {
          position: absolute; top: -80px; left: 50%; transform: translateX(-50%);
          width: 300px; height: 300px; border-radius: 50%;
          background: radial-gradient(circle, rgba(255,59,107,.1), transparent 70%);
          pointer-events: none;
          animation: ct-glow-pulse 4s ease-in-out infinite;
        }
        @keyframes ct-glow-pulse { 0%,100% { opacity: .6; } 50% { opacity: 1; } }
        .ct-cta-inner { padding: 44px 36px; text-align: center; position: relative; z-index: 1; }

        .ct-cta-emoji {
          font-size: 3rem; display: block; margin-bottom: 18px;
          animation: ct-wave 2.5s ease-in-out infinite;
          transform-origin: 70% 70%;
        }
        @keyframes ct-wave {
          0%,100% { transform: rotate(0deg); }
          20%     { transform: rotate(-12deg); }
          40%     { transform: rotate(12deg); }
          60%     { transform: rotate(-6deg); }
          80%     { transform: rotate(6deg); }
        }

        .ct-cta-title {
          font-family: var(--ff-head); font-size: 2.2rem; letter-spacing: .04em;
          color: var(--ink); line-height: 1; margin-bottom: 14px;
        }
        .ct-cta-title span {
          background: linear-gradient(90deg, var(--rose), var(--violet));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .ct-cta-desc {
          font-size: .88rem; color: var(--ink2); line-height: 1.75;
          margin: 0 auto 28px; max-width: 320px;
        }

        .ct-cta-buttons { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .ct-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 22px; border-radius: 8px;
          font-family: var(--ff-body); font-size: .85rem; font-weight: 600;
          background: linear-gradient(135deg, var(--rose), var(--violet));
          color: #fff; text-decoration: none;
          transition: all .25s; position: relative; overflow: hidden;
          box-shadow: 0 0 24px rgba(255,59,107,.25);
        }
        .ct-btn-primary::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.15), transparent);
          transform: translateX(-100%); transition: transform .5s;
        }
        .ct-btn-primary:hover::before { transform: translateX(100%); }
        .ct-btn-primary:hover { box-shadow: 0 0 36px rgba(255,59,107,.45); transform: translateY(-2px); }
        .ct-btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 22px; border-radius: 8px;
          font-family: var(--ff-body); font-size: .85rem; font-weight: 500;
          background: transparent; border: 1px solid rgba(155,93,229,.3);
          color: var(--ink2); text-decoration: none; transition: all .25s;
        }
        .ct-btn-ghost:hover { border-color: var(--violet); color: var(--ink); box-shadow: 0 0 18px rgba(155,93,229,.2); transform: translateY(-2px); }

        /* availability */
        .ct-avail {
          display: inline-flex; align-items: center; gap: 8px; margin-top: 24px;
          font-family: var(--ff-mono); font-size: .62rem; letter-spacing: .12em;
          text-transform: uppercase; color: var(--ink3);
          padding: 8px 16px; border-radius: 20px;
          background: rgba(74,222,128,.05); border: 1px solid rgba(74,222,128,.18);
        }
        .ct-avail-dot {
          width: 7px; height: 7px; border-radius: 50%; background: #4ade80;
          box-shadow: 0 0 8px #4ade80;
          animation: ct-avail-pulse 1.8s ease-in-out infinite;
        }
        @keyframes ct-avail-pulse {
          0%,100% { transform: scale(1); opacity: 1; }
          50%     { transform: scale(1.5); opacity: .5; }
        }

        /* divider strip */
        .ct-strip {
          display: flex; margin-top: 64px;
          border: 1px solid rgba(155,93,229,.12); border-radius: 16px;
          overflow: hidden; background: rgba(255,255,255,.014);
        }
        .ct-strip-cell {
          flex: 1; padding: 18px 16px; text-align: center;
          border-right: 1px solid rgba(155,93,229,.08);
          transition: background .25s; display: flex; flex-direction: column; gap: 4px;
        }
        .ct-strip-cell:last-child { border-right: none; }
        .ct-strip-cell:hover { background: rgba(155,93,229,.05); }
        .ct-strip-icon { font-size: 1.3rem; }
        .ct-strip-label {
          font-family: var(--ff-mono); font-size: .58rem; letter-spacing: .14em;
          text-transform: uppercase; color: var(--ink3);
        }
        .ct-strip-val {
          font-family: var(--ff-mono); font-size: .7rem; color: var(--cyan);
        }

        /* responsive */
        @media (max-width: 900px) { .ct-layout { grid-template-columns: 1fr; gap: 40px; } }
        @media (max-width: 540px) {
          #contact { padding: 80px 0 90px; }
          .ct-cards { grid-template-columns: 1fr; }
          .ct-cta-inner { padding: 30px 20px; }
        }
      `}</style>

      <section id="contact">
        <div className="ct-blob ct-blob-a"><MorphBlob color="#ff3b6b" delay={2} id="a" /></div>
        <div className="ct-blob ct-blob-b"><MorphBlob color="#9b5de5" delay={5} id="b" /></div>
        <Particles />

        <div className="ct-container" ref={secRef}>

          {/* header */}
          <div className="ct-eyebrow" style={{ opacity: secVisible ? 1 : 0, transform: secVisible ? "none" : "translateY(16px)", transition: "opacity .6s ease, transform .6s ease" }}>
            <span className="ct-eyebrow-line" />
            Get In Touch
            <span className="ct-eyebrow-line" />
          </div>

          <h2 className="ct-heading" style={{ opacity: secVisible ? 1 : 0, transform: secVisible ? "none" : "translateY(20px)", transition: "opacity .7s .1s ease, transform .7s .1s ease" }}>
            Let's<br /><span className="ct-heading-accent">Work Together</span>
          </h2>

          <p className="ct-subtitle" style={{ opacity: secVisible ? 1 : 0, transform: secVisible ? "none" : "translateY(14px)", transition: "opacity .7s .2s ease, transform .7s .2s ease" }}>
            Open to roles, freelance, and interesting collaborations.
          </p>

          <div className="ct-divider" style={{ opacity: secVisible ? 1 : 0, transform: secVisible ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "opacity .6s .3s ease, transform .6s .3s ease" }} />

          <div className="ct-layout">

            {/* LEFT */}
            <div ref={leftRef}>
              <div className="ct-col-label">Contact Info</div>

              <div className="ct-tagline" style={{ opacity: leftVisible ? 1 : 0, transform: leftVisible ? "none" : "translateY(14px)", transition: "opacity .6s ease, transform .6s ease" }}>
                I'm currently <strong>open to new opportunities</strong> — whether that's a full-time role,
                freelance project, or an interesting collaboration. If you're building something great,
                I'd love to hear about it.
              </div>

              <div className="ct-cards">
                {contactItems.map((item, i) => (
                  <ContactCard key={i} item={item} index={i} visible={leftVisible} />
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div ref={rightRef}>
              <div className="ct-col-label">Drop a Message</div>

              <div className={`ct-cta-wrap ${rightVisible ? "visible" : ""}`}>
                <div className="ct-cta">
                  <div className="ct-cta-scan" />
                  <div className="ct-cta-glow" />
                  <div className="ct-cta-inner">
                    <span className="ct-cta-emoji">👋</span>
                    <div className="ct-cta-title">Open to <span>Opportunities</span></div>
                    <p className="ct-cta-desc">
                      Looking for a Python Django developer who ships clean, scalable code?
                      Let's connect and build something amazing together.
                    </p>
                    <div className="ct-cta-buttons">
                      <a href="mailto:niharadhanesh875@gmail.com" className="ct-btn-primary">
                        Send an Email
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </a>
                      <a href="https://linkedin.com/in/nihara-dhanesh-813b053a4" target="_blank" rel="noreferrer" className="ct-btn-ghost">
                        LinkedIn
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                          <circle cx="4" cy="4" r="2"/>
                        </svg>
                      </a>
                    </div>
                    <div className="ct-avail">
                      <span className="ct-avail-dot" />
                      Available for opportunities
                    </div>
                  </div>
                </div>
              </div>

              {/* quick info strip */}
              <div className="ct-strip" style={{ opacity: rightVisible ? 1 : 0, transition: "opacity .8s .5s ease" }}>
                {[
                  { icon: "📍", label: "Location", val: "Kannur, Kerala" },
                  { icon: "⏱️", label: "Response", val: "< 24 hrs" },
                  { icon: "🌐", label: "Available", val: "Remote / Onsite" },
                ].map(d => (
                  <div className="ct-strip-cell" key={d.label}>
                    <span className="ct-strip-icon">{d.icon}</span>
                    <span className="ct-strip-label">{d.label}</span>
                    <span className="ct-strip-val">{d.val}</span>
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