import { useState, useEffect } from "react";

const links = [
  { label: "Home",       href: "#home" },
  { label: "About",      href: "#about" },
  { label: "Skills",     href: "#skills" },
  { label: "Projects",   href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [active, setActive]     = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* lock body scroll when overlay is open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleNav = (href) => { setActive(href); setOpen(false); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Bebas+Neue&family=Share+Tech+Mono&display=swap');

        /* ── tokens (mirror Hero) ── */
        :root {
          --nb-rose:   #ff3b6b;
          --nb-violet: #9b5de5;
          --nb-cyan:   #00f5d4;
          --nb-ink:    #f5f0ff;
          --nb-ink2:   #8b7da8;
          --nb-ink3:   #4a3f62;
          --nb-bg:     #07050f;
          --nb-mono:   'Share Tech Mono', monospace;
          --nb-head:   'Bebas Neue', sans-serif;
          --nb-body:   'Space Grotesk', sans-serif;
        }

        /* ── base reset for navbar elements ── */
        .nb * { box-sizing: border-box; margin: 0; padding: 0; }
        .nb a { text-decoration: none; }
        .nb ul { list-style: none; }
        .nb button { font-family: inherit; cursor: pointer; }

        /* ── bar ── */
        .nb {
          position: fixed;
          top: 0; left: 0;
          width: 100%;
          z-index: 1000;
          transition: background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
          border-bottom: 1px solid transparent;
        }
        .nb.scrolled {
          background: rgba(7, 5, 15, 0.88);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          border-bottom-color: rgba(155, 93, 229, 0.12);
          box-shadow: 0 4px 40px rgba(0,0,0,0.5);
        }

        /* glowing top stripe — only when scrolled */
        .nb.scrolled::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--nb-rose) 35%, var(--nb-violet) 65%, transparent);
          opacity: 0.6;
        }

        .nb-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 6%;
          max-width: 1400px;
          margin: 0 auto;
          gap: 24px;
        }

        /* ── logo ── */
        .nb-logo {
          font-family: var(--nb-head);
          font-size: 1.75rem;
          letter-spacing: 0.08em;
          background: linear-gradient(90deg, var(--nb-rose), var(--nb-violet));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          flex-shrink: 0;
          transition: opacity 0.2s;
        }
        .nb-logo:hover { opacity: 0.85; }

        /* ── desktop links ── */
        .nb-links {
          display: flex;
          align-items: center;
          gap: 2px;
        }
        .nb-link {
          font-family: var(--nb-mono);
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--nb-ink2);
          padding: 7px 13px;
          border-radius: 4px;
          transition: color 0.2s, background 0.2s;
          position: relative;
        }
        .nb-link::after {
          content: '';
          position: absolute;
          bottom: 2px; left: 13px; right: 13px;
          height: 1px;
          background: var(--nb-rose);
          transform: scaleX(0);
          transition: transform 0.25s ease;
          transform-origin: left;
        }
        .nb-link:hover { color: var(--nb-ink); }
        .nb-link:hover::after { transform: scaleX(1); }
        .nb-link.active { color: var(--nb-rose); }
        .nb-link.active::after { transform: scaleX(1); }

        /* ── status pill ── */
        .nb-pill {
          font-family: var(--nb-mono);
          font-size: 0.62rem;
          letter-spacing: 0.12em;
          padding: 6px 13px;
          border: 1px solid rgba(0, 245, 212, 0.22);
          border-radius: 4px;
          color: var(--nb-cyan);
          display: flex;
          align-items: center;
          gap: 7px;
          white-space: nowrap;
          flex-shrink: 0;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .nb-pill:hover {
          border-color: rgba(0, 245, 212, 0.4);
          box-shadow: 0 0 14px rgba(0, 245, 212, 0.12);
        }
        .nb-pulse {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--nb-cyan);
          flex-shrink: 0;
          animation: nb-pulse 2s ease infinite;
        }
        @keyframes nb-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,245,212,0.5); }
          50%       { box-shadow: 0 0 0 5px rgba(0,245,212,0); }
        }

        /* ── hamburger ── */
        .nb-toggle {
          display: none;
          width: 40px; height: 40px;
          border-radius: 6px;
          background: rgba(155, 93, 229, 0.06);
          border: 1px solid rgba(155, 93, 229, 0.2);
          align-items: center;
          justify-content: center;
          transition: background 0.2s, border-color 0.2s;
          flex-shrink: 0;
        }
        .nb-toggle:hover {
          background: rgba(155, 93, 229, 0.12);
          border-color: rgba(155, 93, 229, 0.4);
        }
        .nb-bars {
          width: 18px; height: 13px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
        }
        .nb-bars span {
          display: block;
          width: 100%; height: 1.5px;
          border-radius: 2px;
          background: var(--nb-violet);
          transition: transform 0.3s ease, opacity 0.3s ease, width 0.3s ease;
          transform-origin: center;
        }
        .nb-bars span:nth-child(2) { width: 75%; align-self: flex-end; }
        .nb-toggle.open .nb-bars span:nth-child(1) { transform: translateY(5.75px) rotate(45deg); width: 100%; }
        .nb-toggle.open .nb-bars span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .nb-toggle.open .nb-bars span:nth-child(3) { transform: translateY(-5.75px) rotate(-45deg); }

        /* ── mobile overlay ── */
        .nb-overlay {
          position: fixed;
          inset: 0;
          z-index: 999;
          background: rgba(7, 5, 15, 0.97);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .nb-overlay.open {
          opacity: 1;
          pointer-events: all;
        }

        /* grid decoration inside overlay */
        .nb-overlay::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(155,93,229,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(155,93,229,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        /* overlay links — animate in staggered */
        .nb-m-link {
          font-family: var(--nb-head);
          font-size: clamp(2.5rem, 10vw, 4rem);
          letter-spacing: 0.06em;
          color: var(--nb-ink3);
          position: relative;
          z-index: 1;
          transform: translateY(16px);
          opacity: 0;
          transition: color 0.2s, letter-spacing 0.2s, opacity 0.35s ease, transform 0.35s ease;
        }
        .nb-overlay.open .nb-m-link {
          opacity: 1;
          transform: translateY(0);
        }
        .nb-overlay.open .nb-m-link:nth-child(1) { transition-delay: 0.05s; }
        .nb-overlay.open .nb-m-link:nth-child(2) { transition-delay: 0.10s; }
        .nb-overlay.open .nb-m-link:nth-child(3) { transition-delay: 0.15s; }
        .nb-overlay.open .nb-m-link:nth-child(4) { transition-delay: 0.20s; }
        .nb-overlay.open .nb-m-link:nth-child(5) { transition-delay: 0.25s; }
        .nb-overlay.open .nb-m-link:nth-child(6) { transition-delay: 0.30s; }

        .nb-m-link:hover { color: var(--nb-ink); letter-spacing: 0.1em; }
        .nb-m-link.active {
          background: linear-gradient(90deg, var(--nb-rose), var(--nb-violet));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* overlay bottom tag */
        .nb-overlay-tag {
          position: absolute;
          bottom: 32px;
          font-family: var(--nb-mono);
          font-size: 0.62rem;
          color: var(--nb-ink3);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          z-index: 1;
          opacity: 0;
          transition: opacity 0.4s 0.35s ease;
        }
        .nb-overlay.open .nb-overlay-tag { opacity: 1; }

        /* ── responsive ── */
        @media (max-width: 960px) {
          .nb-pill { display: none; }
        }
        @media (max-width: 768px) {
          .nb-links  { display: none; }
          .nb-toggle { display: flex; }
          .nb-inner  { padding: 16px 5%; }
        }
        @media (max-width: 480px) {
          .nb-logo { font-size: 1.5rem; }
          .nb-inner { padding: 14px 5%; }
        }
      `}</style>

      {/* ── bar ── */}
      <nav className={`nb ${scrolled ? "scrolled" : ""}`}>
        <div className="nb-inner">
          <a href="#home" className="nb-logo">Nihara.</a>

          <ul className="nb-links">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`nb-link ${active === l.href ? "active" : ""}`}
                  onClick={() => handleNav(l.href)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="nb-pill">
            <span className="nb-pulse" />
            Available for work
          </div>

          <button
            className={`nb-toggle ${open ? "open" : ""}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <div className="nb-bars">
              <span /><span /><span />
            </div>
          </button>
        </div>
      </nav>

      {/* ── mobile overlay ── */}
      <div className={`nb-overlay ${open ? "open" : ""}`} aria-hidden={!open}>
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className={`nb-m-link ${active === l.href ? "active" : ""}`}
            onClick={() => handleNav(l.href)}
          >
            {l.label}
          </a>
        ))}

        <span className="nb-overlay-tag">&lt; nihara.py · python 3.11 /&gt;</span>
      </div>
    </>
  );
}