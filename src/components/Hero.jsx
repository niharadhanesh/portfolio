import { useEffect, useRef, useState } from "react";

const roles = [
  "Python Developer",
  "Django Specialist",
  "Web Developer",
  "Full‑Stack Developer",
];

const codeLines = [
  { text: 'class NiharaDhanesh(Developer):', color: '#c084fc' },
  { text: '  role = "Python & Django"', color: '#fb7aa0' },
  { text: '  experience = "1.5+ years"', color: '#fb7aa0' },
  { text: '  skills = [', color: '#e2e8f0' },
  { text: '    "Django", "REST APIs",', color: '#4ade80' },
  { text: '    "MySQL", "PostgreSQL",', color: '#4ade80' },
  { text: '    "Bootstrap", "Git"', color: '#4ade80' },
  { text: '  ]', color: '#e2e8f0' },
  { text: '  def build(self, idea):', color: '#c084fc' },
  { text: '    return ScalableApp(idea) 🚀', color: '#38bdf8' },
];

function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let W, H;
    let particles = [];
    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * (W || 800),
        y: Math.random() * (H || 600),
        r: Math.random() * 1.8 + 0.4,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        alpha: Math.random() * 0.5 + 0.15,
        color: Math.random() > 0.5 ? "244,63,110" : "192,132,252",
      });
    }
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(192,132,252,${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 0, opacity: 0.7,
      }}
    />
  );
}

function CodeTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [charCount, setCharCount] = useState(0);
  useEffect(() => {
    if (visibleLines >= codeLines.length) return;
    const current = codeLines[visibleLines].text;
    if (charCount < current.length) {
      const t = setTimeout(() => setCharCount((c) => c + 1), 36);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => { setVisibleLines((v) => v + 1); setCharCount(0); }, 140);
      return () => clearTimeout(t);
    }
  }, [visibleLines, charCount]);

  return (
    <div className="code-terminal">
      <div className="terminal-header">
        <div className="t-dot" style={{ background: "#ff5f57" }} />
        <div className="t-dot" style={{ background: "#ffbd2e" }} />
        <div className="t-dot" style={{ background: "#28c840" }} />
        <span className="t-filename">nihara.py</span>
      </div>
      <div className="terminal-body">
        {codeLines.slice(0, visibleLines).map((line, i) => (
          <div key={i} className="code-line">
            <span className="line-num">{String(i + 1).padStart(2, "0")}</span>
            <span style={{ color: line.color, whiteSpace: "pre" }}>{line.text}</span>
          </div>
        ))}
        {visibleLines < codeLines.length && (
          <div className="code-line">
            <span className="line-num">{String(visibleLines + 1).padStart(2, "0")}</span>
            <span style={{ color: codeLines[visibleLines].color, whiteSpace: "pre" }}>
              {codeLines[visibleLines].text.slice(0, charCount)}
            </span>
            <span className="term-cursor" />
          </div>
        )}
      </div>
    </div>
  );
}

function useTypewriter(words) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  useEffect(() => {
    const current = words[index];
    if (typing) {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 75);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 2000);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
        return () => clearTimeout(t);
      } else {
        setIndex((i) => (i + 1) % words.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, index, words]);
  return displayed;
}

export default function Hero() {
  const displayed = useTypewriter(roles);

  return (
    <>
      <style>{`
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 80px;
          position: relative;
          z-index: 1;
          overflow: hidden;
        }
        .hero-bg-text {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          font-family: var(--font-display);
          font-size: clamp(8rem, 18vw, 18rem);
          font-weight: 700;
          color: transparent;
          -webkit-text-stroke: 1px rgba(244,63,110,0.045);
          white-space: nowrap;
          pointer-events: none;
          z-index: 0;
          user-select: none;
          letter-spacing: -0.04em;
        }
        .hero-scanline {
          position: absolute;
          left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(244,63,110,0.3) 30%, rgba(192,132,252,0.3) 70%, transparent 100%);
          animation: line-scan 6s ease-in-out infinite;
          z-index: 0;
        }
        .hero-scanline-top    { top: 30%; }
        .hero-scanline-bottom { bottom: 30%; animation-delay: 3s; }
        @keyframes line-scan {
          0%, 100% { opacity: 0; transform: scaleX(0.3); }
          50%       { opacity: 1; transform: scaleX(1); }
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 460px;
          gap: 60px;
          align-items: center;
          width: 90%;
          max-width: 1200px;
          margin: auto;
          position: relative;
          z-index: 2;
        }

        /* ── LEFT ── */
        @keyframes slideInLeft  { from { opacity:0; transform:translateX(-24px); } to { opacity:1; transform:translateX(0); } }
        @keyframes slideInRight { from { opacity:0; transform:translateX(24px);  } to { opacity:1; transform:translateX(0); } }
        @keyframes slideInUp    { from { opacity:0; transform:translateY(24px);  } to { opacity:1; transform:translateY(0); } }

        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--lavender);
          margin-bottom: 22px;
          padding: 8px 18px;
          border: 1px solid rgba(192,132,252,0.2);
          border-radius: 50px;
          background: rgba(192,132,252,0.05);
          opacity: 0;
          animation: slideInLeft 0.7s 0.1s ease forwards;
        }
        .dot-live {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #4ade80;
          position: relative;
          flex-shrink: 0;
        }
        .dot-live::after {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          border: 1px solid rgba(74,222,128,0.5);
          animation: pulse-ring 2s ease infinite;
        }
        @keyframes pulse-ring {
          0%   { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2.2); opacity: 0; }
        }

        .hero-name {
          font-family: var(--font-display);
          font-size: clamp(3rem, 6.5vw, 5.6rem);
          font-weight: 700;
          line-height: 1.0;
          margin-bottom: 6px;
          opacity: 0;
          animation: slideInUp 0.8s 0.25s ease forwards;
        }
        .hero-name .word-hi {
          color: var(--text-dim);
          font-weight: 300;
          font-style: italic;
          font-size: 0.5em;
          display: block;
          margin-bottom: 4px;
          font-family: var(--font-display);
        }
        .hero-name .word-first {
          display: inline;
          background: linear-gradient(120deg, #fb7aa0 0%, #f43f6e 35%, #c084fc 75%, #a78bfa 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer-name 4s linear infinite;
        }
        .hero-name .word-last {
          display: block;
          color: var(--text);
          -webkit-text-fill-color: var(--text);
        }
        @keyframes shimmer-name {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        .hero-role-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 26px;
          margin-top: 18px;
          opacity: 0;
          animation: slideInUp 0.8s 0.4s ease forwards;
        }
        .role-prefix {
          font-family: var(--font-mono);
          font-size: 1rem;
          color: var(--text-dim);
        }
        .hero-role {
          font-family: var(--font-mono);
          font-size: clamp(1rem, 2.2vw, 1.25rem);
          color: var(--rose-light);
          display: flex;
          align-items: center;
          gap: 3px;
          min-height: 1.6em;
        }
        .role-cursor {
          display: inline-block;
          width: 2px; height: 1.1em;
          background: var(--rose);
          border-radius: 1px;
          animation: blink 1s step-end infinite;
        }

        .hero-desc {
          color: var(--text-muted);
          font-size: 1rem;
          line-height: 1.9;
          max-width: 520px;
          margin-bottom: 34px;
          opacity: 0;
          animation: slideInUp 0.8s 0.55s ease forwards;
        }
        .hero-desc strong { color: var(--text); font-weight: 600; }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 46px;
          opacity: 0;
          animation: slideInUp 0.8s 0.7s ease forwards;
        }
        .btn-glow {
          background: linear-gradient(135deg, #f43f6e, #c084fc);
          color: #fff;
          padding: 13px 30px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.95rem;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          transition: all 0.3s ease;
          box-shadow: 0 6px 28px rgba(244,63,110,0.38), 0 2px 8px rgba(0,0,0,0.3);
          position: relative;
          overflow: hidden;
          text-decoration: none;
        }
        .btn-glow::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #fb7aa0, #e879f9);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .btn-glow:hover::after { opacity: 1; }
        .btn-glow:hover { transform: translateY(-3px); box-shadow: 0 14px 40px rgba(244,63,110,0.55); }
        .btn-glow > * { position: relative; z-index: 1; }
        .btn-ghost {
          background: rgba(255,255,255,0.04);
          color: var(--text);
          padding: 12px 26px;
          border-radius: 50px;
          font-weight: 500;
          font-size: 0.95rem;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid rgba(255,255,255,0.1);
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .btn-ghost:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(244,63,110,0.35);
          transform: translateY(-2px);
        }

        .hero-stats {
          display: flex;
          opacity: 0;
          animation: slideInUp 0.8s 0.85s ease forwards;
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          max-width: 460px;
          background: rgba(255,255,255,0.02);
        }
        .stat-cell {
          flex: 1;
          text-align: center;
          padding: 16px 10px;
          position: relative;
          transition: background 0.3s;
          cursor: default;
        }
        .stat-cell:not(:last-child)::after {
          content: '';
          position: absolute;
          right: 0; top: 20%; bottom: 20%;
          width: 1px;
          background: var(--border);
        }
        .stat-cell:hover { background: rgba(244,63,110,0.05); }
        .stat-num {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 700;
          background: linear-gradient(135deg, var(--rose-light), var(--lavender));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          display: block;
        }
        .stat-lbl {
          font-size: 0.68rem;
          color: var(--text-dim);
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-top: 5px;
          display: block;
        }

        /* ── RIGHT ── */
        .hero-right {
          position: relative;
          opacity: 0;
          animation: slideInRight 0.9s 0.5s ease forwards;
        }
        .terminal-glow-bar {
          height: 2px;
          background: linear-gradient(90deg, transparent, #f43f6e 40%, #c084fc 60%, transparent);
          border-radius: 2px 2px 0 0;
          animation: glow-sweep 3s ease-in-out infinite;
        }
        @keyframes glow-sweep {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 1; }
        }
        .code-terminal {
          background: rgba(10, 6, 16, 0.94);
          border: 1px solid rgba(255,255,255,0.07);
          border-top: none;
          border-radius: 0 0 16px 16px;
          overflow: hidden;
          box-shadow:
            0 0 0 1px rgba(244,63,110,0.06),
            0 28px 80px rgba(0,0,0,0.65),
            0 0 60px rgba(192,132,252,0.06);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .code-terminal:hover {
          transform: translateY(-5px);
          box-shadow:
            0 0 0 1px rgba(244,63,110,0.14),
            0 36px 90px rgba(0,0,0,0.7),
            0 0 80px rgba(192,132,252,0.1);
        }
        .terminal-header {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 13px 18px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          background: rgba(255,255,255,0.018);
        }
        .t-dot { width: 12px; height: 12px; border-radius: 50%; opacity: 0.85; }
        .t-filename {
          font-family: var(--font-mono);
          font-size: 0.76rem;
          color: var(--text-dim);
          margin-left: 8px;
        }
        .terminal-body {
          padding: 18px 20px 22px;
          min-height: 270px;
          font-family: var(--font-mono);
          font-size: 0.84rem;
          line-height: 1.75;
        }
        .code-line {
          display: flex;
          align-items: baseline;
          gap: 16px;
          animation: fadeLine 0.18s ease;
        }
        @keyframes fadeLine {
          from { opacity: 0; transform: translateX(-5px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .line-num {
          color: rgba(255,255,255,0.15);
          font-size: 0.72rem;
          min-width: 18px;
          text-align: right;
          user-select: none;
          flex-shrink: 0;
        }
        .term-cursor {
          display: inline-block;
          width: 8px; height: 14px;
          background: var(--rose-light);
          border-radius: 1px;
          animation: blink 0.9s step-end infinite;
          vertical-align: middle;
          margin-left: 1px;
        }

        /* Floating side badges */
        .side-badges {
          position: absolute;
          right: -72px;
          top: 10px;
          bottom: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          pointer-events: none;
        }
        .side-badge {
          background: rgba(10, 6, 16, 0.92);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 11px 15px;
          backdrop-filter: blur(16px);
          display: flex;
          align-items: center;
          gap: 10px;
          white-space: nowrap;
          pointer-events: auto;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .side-badge:nth-child(1) {
          border-color: rgba(244,63,110,0.2);
          animation: floatA 4s ease-in-out infinite;
        }
        .side-badge:nth-child(2) {
          border-color: rgba(192,132,252,0.2);
          animation: floatB 4.8s ease-in-out infinite;
        }
        .side-badge:nth-child(3) {
          border-color: rgba(74,222,128,0.2);
          animation: floatA 5.2s 0.6s ease-in-out infinite;
        }
        .side-badge:hover { transform: translateX(-6px) scale(1.04); box-shadow: 0 8px 28px rgba(0,0,0,0.4); }
        @keyframes floatA { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-9px);} }
        @keyframes floatB { 0%,100%{transform:translateY(0);} 50%{transform:translateY(10px);} }
        .sb-icon {
          width: 34px; height: 34px;
          border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem;
          flex-shrink: 0;
        }
        .sb-icon.rose  { background: rgba(244,63,110,0.12); }
        .sb-icon.lav   { background: rgba(192,132,252,0.12); }
        .sb-icon.green { background: rgba(74,222,128,0.12); }
        .sb-title { font-size: 0.8rem; font-weight: 600; color: var(--text); display: block; }
        .sb-sub   { font-size: 0.7rem; color: var(--text-dim); display: block; font-family: var(--font-mono); }

        /* Scroll cue */
        .scroll-cue {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          color: var(--text-dim);
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          opacity: 0;
          animation: slideInUp 0.7s 1.4s ease forwards;
          z-index: 2;
        }
        .mouse-outline {
          width: 22px; height: 35px;
          border: 1.5px solid rgba(255,255,255,0.14);
          border-radius: 11px;
          display: flex;
          justify-content: center;
          padding-top: 6px;
        }
        .mouse-wheel {
          width: 3px; height: 7px;
          background: var(--rose);
          border-radius: 2px;
          animation: wheel-drop 2s ease-in-out infinite;
        }
        @keyframes wheel-drop {
          0%  { transform: translateY(0);   opacity: 1; }
          75% { transform: translateY(10px); opacity: 0; }
          76% { transform: translateY(0);   opacity: 0; }
          100%{ transform: translateY(0);   opacity: 1; }
        }
        .scroll-chevrons { display: flex; flex-direction: column; align-items: center; gap: 2px; }
        .scroll-chev {
          width: 7px; height: 7px;
          border-right: 1.5px solid rgba(255,255,255,0.2);
          border-bottom: 1.5px solid rgba(255,255,255,0.2);
          transform: rotate(45deg);
        }
        .scroll-chev:nth-child(1) { animation: chev 1.5s 0.0s ease infinite; }
        .scroll-chev:nth-child(2) { animation: chev 1.5s 0.2s ease infinite; }
        .scroll-chev:nth-child(3) { animation: chev 1.5s 0.4s ease infinite; }
        @keyframes chev {
          0%,100% { opacity: 0.15; }
          50%     { opacity: 0.75; }
        }

        /* ── Responsive: Tablet ── */
        @media (max-width: 1100px) {
          .side-badges { display: none; }
          .hero-grid { grid-template-columns: 1fr 400px; gap: 40px; }
        }

        /* ── Responsive: Standard Mobile (≤860px) — Galaxy S20 Ultra etc ── */
        @media (max-width: 860px) {
          .hero-grid {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 44px;
          }
          .hero-eyebrow  { margin: 0 auto 22px; }
          .hero-desc     { margin-left: auto; margin-right: auto; }
          .hero-actions  { justify-content: center; }
          .hero-stats    { max-width: 100%; margin: 0 auto; }
          .hero-right    { max-width: 480px; margin: 0 auto; }
          .hero-role-row { justify-content: center; }
        }

        /* ── Responsive: Small Mobile (≤480px) ── */
        @media (max-width: 480px) {
          .hero-stats { flex-wrap: wrap; }
          .stat-cell  { min-width: 45%; }
          .hero-name  { font-size: 2.8rem; }
        }

        /* ── Responsive: Galaxy Z Fold 5 folded & ultra-narrow (≤345px) ── */
        @media (max-width: 345px) {
          .hero {
            padding-top: 70px;
            padding-bottom: 60px;
          }

          .hero-grid {
            width: 94%;
            gap: 32px;
          }

          /* Eyebrow badge — shrink text & padding to fit narrow screen */
          .hero-eyebrow {
            font-size: 0.62rem;
            letter-spacing: 0.08em;
            padding: 6px 12px;
            gap: 7px;
            max-width: 100%;
            white-space: normal;
            text-align: center;
            line-height: 1.4;
          }

          /* Name — scale down for ~260px viewport */
          .hero-name {
            font-size: clamp(1.9rem, 9.5vw, 2.4rem);
            line-height: 1.08;
          }
          .hero-name .word-hi {
            font-size: 0.55em;
          }

          /* Role row — wrap so prefix + role don't overflow */
          .hero-role-row {
            flex-wrap: wrap;
            justify-content: center;
            gap: 4px;
            margin-top: 12px;
            margin-bottom: 16px;
          }
          .role-prefix {
            font-size: 0.82rem;
          }
          .hero-role {
            font-size: 0.85rem;
          }

          /* Description */
          .hero-desc {
            font-size: 0.83rem;
            line-height: 1.7;
            margin-bottom: 22px;
          }

          /* Buttons — full-width stacked column */
          .hero-actions {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
            margin-bottom: 28px;
          }
          .btn-glow,
          .btn-ghost {
            width: 100%;
            justify-content: center;
            padding: 12px 16px;
            font-size: 0.85rem;
            border-radius: 12px;
            box-sizing: border-box;
          }

          /* Stats card — 2×2 grid layout */
          .hero-stats {
            flex-wrap: wrap;
            border-radius: 12px;
            max-width: 100%;
          }
          .stat-cell {
            min-width: 50%;
            flex: 0 0 50%;
            padding: 12px 6px;
            box-sizing: border-box;
          }
          /* Override the pseudo-element divider and use explicit borders */
          .stat-cell:not(:last-child)::after {
            display: none;
          }
          .stat-cell:nth-child(1),
          .stat-cell:nth-child(2) {
            border-bottom: 1px solid var(--border);
          }
          .stat-cell:nth-child(odd) {
            border-right: 1px solid var(--border);
          }
          .stat-num {
            font-size: 1.35rem;
          }
          .stat-lbl {
            font-size: 0.58rem;
            letter-spacing: 0.04em;
          }

          /* Terminal — scale down to prevent overflow */
          .terminal-body {
            padding: 10px 12px 14px;
            font-size: 0.68rem;
            line-height: 1.65;
            min-height: 190px;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }
          .terminal-header {
            padding: 9px 12px;
            gap: 5px;
          }
          .t-dot {
            width: 9px;
            height: 9px;
          }
          .t-filename {
            font-size: 0.65rem;
            margin-left: 6px;
          }
          .code-line {
            gap: 8px;
          }
          .line-num {
            font-size: 0.58rem;
            min-width: 12px;
          }
          .term-cursor {
            width: 5px;
            height: 10px;
          }

          /* bg watermark text */
          .hero-bg-text {
            font-size: clamp(4.5rem, 28vw, 7rem);
          }

          /* Scroll cue — hide to save vertical space */
          .scroll-cue {
            display: none;
          }
        }
      `}</style>

      <section id="home" className="hero">
        <ParticleCanvas />
        <div className="hero-bg-text" aria-hidden="true">ND</div>
        <div className="hero-scanline hero-scanline-top" />
        <div className="hero-scanline hero-scanline-bottom" />

        <div className="hero-grid">

          {/* ── LEFT ── */}
          <div className="hero-left">
            <div className="hero-eyebrow">
              <span className="dot-live" />
              Open to new opportunities
            </div>

            <h1 className="hero-name">
              <span className="word-hi">Hi, I'm</span>
              <span className="word-first">Nihara </span>
              <span className="word-last">Dhanesh</span>
            </h1>

            <div className="hero-role-row">
              <span className="role-prefix">&gt;_</span>
              <div className="hero-role">
                {displayed}
                <span className="role-cursor" />
              </div>
            </div>

           <p className="hero-desc">
                Building <strong>production-grade Django applications</strong> with 1.5+ years
                of hands-on experience. Passionate about writing
                <strong> clean, scalable, high-performance</strong> code that delivers
                reliable results and works smoothly in production.
            </p>

            <div className="hero-actions">
              <a href="#projects" className="btn-glow">
                <span>View Projects</span>
                <span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
              <a href="mailto:niharadhanesh875@gmail.com" className="btn-ghost">
                Hire Me
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
              <a href="/resume.pdf" download className="btn-ghost">
                Download CV
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
              </a>
            </div>

            <div className="hero-stats">
              {[
                { num: "1.5+", lbl: "Years Exp" },
                { num: "10+",   lbl: "Django Apps" },
                { num: "30%",  lbl: "Perf Boost" },
                { num: "20+",   lbl: "Projects" },
              ].map((s) => (
                <div className="stat-cell" key={s.lbl}>
                  <span className="stat-num">{s.num}</span>
                  <span className="stat-lbl">{s.lbl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className="hero-right">
            <div className="terminal-glow-bar" />
            <CodeTerminal />

            <div className="side-badges">
              <div className="side-badge">
                <div className="sb-icon rose">🐍</div>
                <div>
                  <span className="sb-title">Python</span>
                  <span className="sb-sub">Django · REST</span>
                </div>
              </div>
              <div className="side-badge">
                <div className="sb-icon lav">🗄️</div>
                <div>
                  <span className="sb-title">Databases</span>
                  <span className="sb-sub">MySQL · PostgreSQL</span>
                </div>
              </div>
              <div className="side-badge">
                <div className="sb-icon green">⚡</div>
                <div>
                  <span className="sb-title">Performance</span>
                  <span className="sb-sub">~30% faster</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="scroll-cue">
          <div className="mouse-outline">
            <div className="mouse-wheel" />
          </div>
          <div className="scroll-chevrons">
            <div className="scroll-chev" />
            <div className="scroll-chev" />
            <div className="scroll-chev" />
          </div>
          <span>Scroll</span>
        </div>
      </section>
    </>
  );
}