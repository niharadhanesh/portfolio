import { useState, useEffect } from "react";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href) => {
    setActive(href);
    setOpen(false);
  };

  return (
    <>
      <style>{`
        .navbar {
          position: fixed;
          top: 0; left: 0;
          width: 100%;
          z-index: 1000;
          transition: all 0.4s ease;
        }
        .navbar.scrolled {
          background: rgba(13, 8, 18, 0.92);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(244, 63, 110, 0.1);
        }
        .nav-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 5%;
          max-width: 1140px;
          margin: auto;
        }
        .nav-logo {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, var(--rose-light), var(--lavender));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.02em;
        }
        .nav-links {
          display: flex;
          gap: 6px;
          align-items: center;
        }
        .nav-link {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-muted);
          padding: 7px 14px;
          border-radius: 50px;
          transition: all 0.25s ease;
          font-family: var(--font-body);
        }
        .nav-link:hover { color: var(--text); }
        .nav-link.active {
          color: var(--rose-light);
          background: rgba(244, 63, 110, 0.1);
        }
        .nav-cta {
          background: linear-gradient(135deg, var(--rose), #e8275a);
          color: #fff !important;
          box-shadow: 0 4px 16px rgba(244,63,110,0.3);
        }
        .nav-cta:hover {
          box-shadow: 0 6px 24px rgba(244,63,110,0.5);
          transform: translateY(-1px);
        }

        /* Icon-only toggle button */
        .menu-toggle {
          display: none;
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: rgba(244, 63, 110, 0.08);
          border: 1px solid rgba(244, 63, 110, 0.25);
          cursor: pointer;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
          padding: 0;
          flex-shrink: 0;
        }
        .menu-toggle:hover {
          background: rgba(244, 63, 110, 0.15);
          border-color: rgba(244, 63, 110, 0.45);
        }
        .toggle-icon {
          width: 18px;
          height: 14px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .toggle-icon span {
          display: block;
          width: 100%;
          height: 2px;
          border-radius: 2px;
          background: var(--rose-light);
          transition: all 0.3s ease;
          transform-origin: center;
        }
        .menu-toggle.open .toggle-icon span:nth-child(1) {
          transform: translateY(6px) rotate(45deg);
        }
        .menu-toggle.open .toggle-icon span:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .menu-toggle.open .toggle-icon span:nth-child(3) {
          transform: translateY(-6px) rotate(-45deg);
        }

        /* Mobile overlay */
        .mobile-menu {
          display: none;
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(13, 8, 18, 0.97);
          backdrop-filter: blur(20px);
          z-index: 999;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          animation: fadeIn 0.25s ease;
        }
        .mobile-menu.open { display: flex; }
        .mobile-link {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-muted);
          transition: color 0.2s;
        }
        .mobile-link:hover { color: var(--rose-light); }

        /* Close button inside overlay — X icon only, no text */
        .mobile-close {
          position: absolute;
          top: 20px; right: 5%;
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: rgba(244, 63, 110, 0.08);
          border: 1px solid rgba(244, 63, 110, 0.25);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          transition: all 0.25s ease;
        }
        .mobile-close:hover {
          background: rgba(244, 63, 110, 0.18);
          border-color: rgba(244, 63, 110, 0.5);
        }
        .close-icon {
          width: 14px;
          height: 14px;
          position: relative;
        }
        .close-icon::before,
        .close-icon::after {
          content: '';
          position: absolute;
          top: 50%; left: 0;
          width: 100%;
          height: 2px;
          border-radius: 2px;
          background: var(--rose-light);
        }
        .close-icon::before { transform: translateY(-50%) rotate(45deg); }
        .close-icon::after  { transform: translateY(-50%) rotate(-45deg); }

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .menu-toggle { display: flex; }
        }
      `}</style>

      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">
          <a href="#home" className="nav-logo">Nihara.</a>
          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`nav-link ${l.label === "Contact" ? "nav-cta" : ""} ${active === l.href ? "active" : ""}`}
                  onClick={() => handleNav(l.href)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            className={`menu-toggle ${open ? "open" : ""}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <div className="toggle-icon">
              <span />
              <span />
              <span />
            </div>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <button className="mobile-close" onClick={() => setOpen(false)} aria-label="Close menu">
          <div className="close-icon" />
        </button>
        {links.map((l) => (
          <a key={l.href} href={l.href} className="mobile-link" onClick={() => handleNav(l.href)}>
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}