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
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          transition: all 0.4s ease;
          padding: 0;
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
          position: relative;
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
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
        }
        .hamburger span {
          display: block;
          width: 24px;
          height: 2px;
          background: var(--text);
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
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
        .mobile-close {
          position: absolute;
          top: 22px; right: 5%;
          font-size: 2rem;
          color: var(--text-muted);
          background: none; border: none; cursor: pointer;
        }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .hamburger { display: flex; }
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
          <button className={`hamburger ${open ? "open" : ""}`} onClick={() => setOpen(!open)} aria-label="menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <button className="mobile-close" onClick={() => setOpen(false)}>✕</button>
        {links.map((l) => (
          <a key={l.href} href={l.href} className="mobile-link" onClick={() => handleNav(l.href)}>
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}