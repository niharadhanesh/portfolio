export default function Footer() {
  return (
    <>
      <style>{`
        .footer {
          position: relative;
          z-index: 1;
          border-top: 1px solid var(--border);
          padding: 32px 0;
        }
        .footer-inner {
          width: 90%;
          max-width: 1140px;
          margin: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }
        .footer-logo {
          font-family: var(--font-display);
          font-size: 1.2rem;
          background: linear-gradient(135deg, var(--rose-light), var(--lavender));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .footer-copy {
          font-size: 0.82rem;
          color: var(--text-dim);
          font-family: var(--font-mono);
        }
        .footer-copy span { color: var(--rose); }
        .footer-links {
          display: flex;
          gap: 16px;
        }
        .footer-link {
          font-size: 0.82rem;
          color: var(--text-dim);
          transition: color 0.2s;
        }
        .footer-link:hover { color: var(--rose-light); }
        @media (max-width: 600px) {
          .footer-inner { flex-direction: column; text-align: center; }
        }
      `}</style>
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-logo">Nihara.</div>
          <div className="footer-copy">
            © 2026 Nihara Dhanesh. Built with <span>♥</span> in Kerala.
          </div>
          <div className="footer-links">
            <a href="#home" className="footer-link">Home</a>
            <a href="#projects" className="footer-link">Projects</a>
            <a href="#contact" className="footer-link">Contact</a>
          </div>
        </div>
      </footer>
    </>
  );
}