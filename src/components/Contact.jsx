const contactItems = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: "Email",
    value: "niharadhanesh875@gmail.com",
    href: "mailto:niharadhanesh875@gmail.com",
    color: "rose",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.22 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l1.45-1.45a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 13.92v3z"/>
      </svg>
    ),
    label: "Phone",
    value: "+91 9544144283",
    href: "tel:+919544144283",
    color: "lav",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: "Location",
    value: "Kannur, Kerala, India",
    href: "https://maps.google.com/?q=Kannur,Kerala",
    color: "rose",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
    label: "LinkedIn",
    value: "Connect with me",
    href: "https://linkedin.com",
    color: "lav",
  },
];

export default function Contact() {
  return (
    <>
      <style>{`
        #contact {
          background: linear-gradient(to bottom, transparent, rgba(244,63,110,0.03));
        }
        .contact-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: start;
        }
        .contact-left { }
        .contact-tagline {
          color: var(--text-muted);
          font-size: 1.05rem;
          line-height: 1.85;
          margin-bottom: 36px;
        }
        .contact-tagline strong { color: var(--rose-light); }
        .contact-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .contact-card {
          padding: 20px 18px;
          border-radius: 16px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .contact-card:hover {
          background: var(--bg-card-hover);
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.35);
        }
        .contact-card.rose:hover { border-color: rgba(244,63,110,0.25); }
        .contact-card.lav:hover { border-color: rgba(192,132,252,0.25); }
        .cc-icon {
          width: 44px; height: 44px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .cc-icon.rose { background: rgba(244,63,110,0.1); color: var(--rose-light); }
        .cc-icon.lav { background: rgba(192,132,252,0.1); color: var(--lavender-light); }
        .cc-label {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-dim);
        }
        .cc-value {
          font-size: 0.88rem;
          color: var(--text);
          font-weight: 500;
          word-break: break-word;
        }

        .contact-right { }
        .cta-box {
          background: linear-gradient(135deg, rgba(244,63,110,0.08), rgba(192,132,252,0.08));
          border: 1px solid rgba(244,63,110,0.15);
          border-radius: 22px;
          padding: 40px 36px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .cta-box::before {
          content: '';
          position: absolute;
          top: -60px; left: 50%;
          transform: translateX(-50%);
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(244,63,110,0.12), transparent 70%);
          pointer-events: none;
        }
        .cta-emoji { font-size: 3rem; margin-bottom: 16px; display: block; }
        .cta-title {
          font-family: var(--font-display);
          font-size: 1.7rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 12px;
          line-height: 1.2;
        }
        .cta-title span { color: var(--rose-light); }
        .cta-desc {
          color: var(--text-muted);
          font-size: 0.92rem;
          line-height: 1.7;
          margin-bottom: 28px;
          max-width: 340px;
          margin-left: auto;
          margin-right: auto;
        }
        .cta-buttons { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .availability-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 24px;
          font-size: 0.82rem;
          color: var(--text-dim);
          font-family: var(--font-mono);
        }
        .avail-dot { width: 8px; height: 8px; border-radius: 50%; background: #4ade80; animation: pulse-dot 2s infinite; }

        @media (max-width: 900px) {
          .contact-layout { grid-template-columns: 1fr; gap: 40px; }
        }
        @media (max-width: 500px) {
          .contact-cards { grid-template-columns: 1fr; }
        }
      `}</style>

      <section id="contact" className="section">
        <div className="container">
          <div className="section-label">Get In Touch</div>
          <h2 className="section-title">Let's <span>work together</span></h2>
          <div className="divider" />

          <div className="contact-layout">
            <div className="contact-left">
              <p className="contact-tagline">
                I'm currently <strong>open to new opportunities</strong> — whether that's
                a full-time role, freelance project, or an interesting collaboration.
                If you're building something great, I'd love to hear about it.
              </p>
              <div className="contact-cards">
                {contactItems.map((item, i) => (
                  <a className={`contact-card ${item.color}`} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" key={i}>
                    <div className={`cc-icon ${item.color}`}>{item.icon}</div>
                    <div>
                      <div className="cc-label">{item.label}</div>
                      <div className="cc-value">{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="contact-right">
              <div className="cta-box">
                <span className="cta-emoji">👋</span>
                <div className="cta-title">Open to <span>opportunities</span></div>
                <p className="cta-desc">
                  Looking for a Python Django developer who ships clean, scalable code?
                  Let's connect and build something amazing together.
                </p>
                <div className="cta-buttons">
                  <a href="mailto:niharadhanesh875@gmail.com" className="btn btn-primary">
                    Send an Email
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="btn btn-outline">
                    LinkedIn
                  </a>
                </div>
                <div className="availability-row">
                  <span className="avail-dot" />
                  Available for opportunities
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}