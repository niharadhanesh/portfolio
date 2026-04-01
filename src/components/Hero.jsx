import { useEffect, useRef, useState } from "react";

/* ── MORPHING BLOB ── */
function MorphBlob({ color, delay = 0 }) {
  const paths = [
    "M60,-45C72,-28,72,14,58,47C44,80,16,104,-18,104C-52,103,-92,77,-105,43C-118,9,-103,-34,-78,-62C-53,-90,-18,-102,16,-97C50,-92,48,-62,60,-45Z",
    "M55,-38C74,-15,94,18,89,49C84,79,54,107,18,115C-18,123,-60,110,-84,82C-108,54,-115,11,-101,-26C-87,-63,-53,-93,-17,-98C19,-103,36,-61,55,-38Z",
    "M44,-32C63,-12,88,17,88,46C88,76,64,106,31,117C-2,127,-44,117,-72,93C-100,68,-114,29,-107,-8C-100,-45,-72,-79,-39,-90C-6,-101,25,-53,44,-32Z",
    "M60,-45C72,-28,72,14,58,47C44,80,16,104,-18,104C-52,103,-92,77,-105,43C-118,9,-103,-34,-78,-62C-53,-90,-18,-102,16,-97C50,-92,48,-62,60,-45Z",
  ];
  return (
    <svg viewBox="-130 -130 260 260" style={{ width: "100%", height: "100%" }}>
      <defs>
        <radialGradient id={`bg${delay}`} cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor={color} stopOpacity="0.5" />
          <stop offset="100%" stopColor={color} stopOpacity="0.04" />
        </radialGradient>
      </defs>
      <path fill={`url(#bg${delay})`}>
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

/* ── 3D TILT CARD ── */
function TiltCard({ children, style = {}, disabled = false }) {
  const ref = useRef(null);
  const raf = useRef(null);
  const cur = useRef({ rx: 0, ry: 0 });
  const tgt = useRef({ rx: 0, ry: 0 });

  useEffect(() => {
    if (disabled) return;
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      tgt.current.rx = ((e.clientY - r.top) / r.height - 0.5) * -16;
      tgt.current.ry = ((e.clientX - r.left) / r.width - 0.5) * 16;
    };
    const onLeave = () => { tgt.current.rx = 0; tgt.current.ry = 0; };
    const tick = () => {
      cur.current.rx += (tgt.current.rx - cur.current.rx) * 0.1;
      cur.current.ry += (tgt.current.ry - cur.current.ry) * 0.1;
      el.style.transform = `perspective(900px) rotateX(${cur.current.rx}deg) rotateY(${cur.current.ry}deg)`;
      raf.current = requestAnimationFrame(tick);
    };
    tick();
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, [disabled]);

  return (
    <div ref={ref} style={{ willChange: "transform", ...style }}>
      {children}
    </div>
  );
}

/* ── SCRAMBLE TEXT ── */
function useScramble(final, delay = 0) {
  const [text, setText] = useState(final);
  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#@$%&";
    let iter = 0, iv;
    const go = () => {
      iv = setInterval(() => {
        setText(
          final
            .split("")
            .map((ch, i) =>
              i < iter ? ch : ch === " " ? " " : chars[Math.floor(Math.random() * chars.length)]
            )
            .join("")
        );
        iter += 0.6;
        if (iter >= final.length) { clearInterval(iv); setText(final); }
      }, 35);
    };
    const t = setTimeout(go, delay);
    return () => { clearTimeout(t); clearInterval(iv); };
  }, [final, delay]);
  return text;
}

/* ── TYPEWRITER ── */
function useTypewriter(words) {
  const [idx, setIdx]       = useState(0);
  const [shown, setShown]   = useState("");
  const [typing, setTyping] = useState(true);
  useEffect(() => {
    const cur = words[idx];
    if (typing) {
      if (shown.length < cur.length) {
        const t = setTimeout(() => setShown(cur.slice(0, shown.length + 1)), 65);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 2400);
        return () => clearTimeout(t);
      }
    } else {
      if (shown.length > 0) {
        const t = setTimeout(() => setShown(shown.slice(0, -1)), 35);
        return () => clearTimeout(t);
      } else {
        setIdx((i) => (i + 1) % words.length);
        setTyping(true);
      }
    }
  }, [shown, typing, idx, words]);
  return shown;
}

/* ── COUNTER ── */
function Counter({ to, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref  = useRef(null);
  const done = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !done.current) {
          done.current = true;
          const n = parseFloat(to);
          const s = performance.now();
          const tick = (now) => {
            const p    = Math.min((now - s) / 1500, 1);
            const ease = 1 - Math.pow(1 - p, 4);
            setVal(+(n * ease).toFixed(1));
            if (p < 1) requestAnimationFrame(tick);
            else setVal(n);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return (
    <span ref={ref}>
      {val % 1 === 0 ? Math.floor(val) : val}
      {suffix}
    </span>
  );
}

/* ── TICKER ── */
function Ticker() {
  const items = ["Django","Python","REST APIs","PostgreSQL","MySQL","Git","Bootstrap","Full-Stack"];
  return (
    <div className="nd2-ticker-wrap">
      <div className="nd2-ticker">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="nd2-tick-item">
            <span className="nd2-tick-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── TERMINAL LINES ── */
const CODE = [
  { t: "class NiharaDhanesh(Developer):", c: "#c084fc" },
  { t: '  role = "Python & Django"',      c: "#f9a8d4" },
  { t: '  xp   = "1.5+ years"',           c: "#f9a8d4" },
  { t: "  skills = [",                     c: "#f1e9f5" },
  { t: '    "Django", "REST APIs",',       c: "#86efac" },
  { t: '    "MySQL", "PostgreSQL",',       c: "#86efac" },
  { t: '    "Bootstrap", "Git"',           c: "#86efac" },
  { t: "  ]",                              c: "#f1e9f5" },
  { t: "  def build(self, idea):",         c: "#c084fc" },
  { t: "    return ScalableApp(idea) 🚀",  c: "#67e8f9" },
];

function TerminalLines() {
  const [vis, setVis] = useState(0);
  const [ch,  setCh]  = useState(0);
  useEffect(() => {
    if (vis >= CODE.length) return;
    const cur = CODE[vis].t;
    if (ch < cur.length) {
      const t = setTimeout(() => setCh((c) => c + 1), 30);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => { setVis((v) => v + 1); setCh(0); }, 110);
      return () => clearTimeout(t);
    }
  }, [vis, ch]);
  return (
    <div className="nd2-term-body">
      {CODE.slice(0, vis).map((l, i) => (
        <div key={i} className="nd2-cline">
          <span className="nd2-ln">{String(i + 1).padStart(2, "0")}</span>
          <span style={{ color: l.c, whiteSpace: "pre" }}>{l.t}</span>
        </div>
      ))}
      {vis < CODE.length && (
        <div className="nd2-cline">
          <span className="nd2-ln">{String(vis + 1).padStart(2, "0")}</span>
          <span style={{ color: CODE[vis].c, whiteSpace: "pre" }}>
            {CODE[vis].t.slice(0, ch)}
          </span>
          <span className="nd2-tcursor" />
        </div>
      )}
    </div>
  );
}

const roles = [
  "Python Developer",
  "Django Specialist",
  "Full‑Stack Developer",
  "Web Developer",
];

/* ── HOOK: detect mobile to disable tilt ── */
function useIsMobile(bp = 768) {
  const [is, setIs] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= bp : false
  );
  useEffect(() => {
    const fn = () => setIs(window.innerWidth <= bp);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, [bp]);
  return is;
}

export default function Hero() {
  const role    = useTypewriter(roles);
  const nameA   = useScramble("NIHARA", 300);
  const nameB   = useScramble("DHANESH", 800);
  const isMobile = useIsMobile(768);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Bebas+Neue&family=Crimson+Pro:ital,wght@0,300;1,300&family=Share+Tech+Mono&display=swap');

        .nd2-hero {
          --rose:    #ff3b6b;
          --violet:  #9b5de5;
          --cyan:    #00f5d4;
          --ink:     #f5f0ff;
          --ink2:    #8b7da8;
          --ink3:    #4a3f62;
          --bg:      #07050f;
          --ff-head: 'Bebas Neue', sans-serif;
          --ff-body: 'Space Grotesk', sans-serif;
          --ff-serif:'Crimson Pro', serif;
          --ff-mono: 'Share Tech Mono', monospace;
          min-height: 100vh;
          background: var(--bg);
          color: var(--ink);
          font-family: var(--ff-body);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          /* account for fixed navbar */
          padding-top: 74px;
        }

        /* ── blobs ── */
        .nd2-blob { position: absolute; pointer-events: none; z-index: 0; }
        .nd2-blob-a { width:700px;height:700px;top:-200px;left:-200px; animation:nd2-orbit 30s linear infinite; }
        .nd2-blob-b { width:550px;height:550px;bottom:-180px;right:-150px; animation:nd2-orbit 38s linear infinite reverse; }
        .nd2-blob-c { width:380px;height:380px;top:40%;left:45%; animation:nd2-orbit 22s linear infinite; }
        @keyframes nd2-orbit {
          0%  { transform:rotate(0deg)   translateX(28px) rotate(0deg)   }
          100%{ transform:rotate(360deg) translateX(28px) rotate(-360deg) }
        }

        /* ── grid ── */
        .nd2-grid {
          position:absolute;inset:0;pointer-events:none;z-index:1;
          background-image:
            linear-gradient(rgba(155,93,229,0.04) 1px,transparent 1px),
            linear-gradient(90deg,rgba(155,93,229,0.04) 1px,transparent 1px);
          background-size:80px 80px;
        }

        /* ── main 2-col split ── */
        .nd2-main {
          flex:1;display:grid;grid-template-columns:1fr 1fr;
          position:relative;z-index:3;
        }

        /* ────────── LEFT ────────── */
        .nd2-left {
          padding: 6% 5% 6% 7%;
          display:flex;flex-direction:column;justify-content:center;
          border-right:1px solid rgba(155,93,229,0.1);
          position:relative;
        }
        .nd2-eyebrow {
          font-family:var(--ff-mono);font-size:0.68rem;letter-spacing:0.28em;
          text-transform:uppercase;color:var(--rose);margin-bottom:22px;
          display:flex;align-items:center;gap:10px;
          opacity:0;animation:nd2-up 0.6s 0.1s ease forwards;
        }
        .nd2-eyebrow-line{flex:1;height:1px;background:rgba(255,59,107,0.3);max-width:36px;}

        .nd2-name {
          font-family:var(--ff-head);
          font-size:clamp(4.2rem,9vw,10rem);
          line-height:0.88;letter-spacing:0.02em;margin-bottom:14px;
          opacity:0;animation:nd2-up 0.7s 0.25s ease forwards;
        }
        .nd2-name-solid { display:block; color:var(--ink); }
        .nd2-name-outline {
          display:block;
          -webkit-text-stroke:2px var(--violet);
          color:transparent;position:relative;
        }
            .nd2-name-outline::after {
        content: attr(data-text);
        position: absolute;
        left: 0;
        top: 0;

        background: linear-gradient(
          90deg,
          #ffffff 0%,
          #ffffff 25%,
          #ff3b6b 50%,
          #00f5d4 75%,
          #ffffff 100%
        );

        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;

        background-size: 300%;
        animation: nd2-nameshine 6s 1.5s ease-in-out infinite;
      }
        @keyframes nd2-nameshine{
          0%  {background-position:200% center}
          100%{background-position:-200% center}
        }

        .nd2-subtitle {
          font-family:var(--ff-serif);font-style:italic;
          font-size:clamp(0.95rem,1.6vw,1.4rem);color:var(--ink2);
          margin-bottom:28px;font-weight:300;
          opacity:0;animation:nd2-up 0.7s 0.4s ease forwards;
        }

        .nd2-role {
          font-family:var(--ff-mono);font-size:clamp(0.75rem,1.1vw,0.9rem);
          color:var(--cyan);display:flex;align-items:center;gap:8px;margin-bottom:28px;
          opacity:0;animation:nd2-up 0.7s 0.54s ease forwards;
        }
        .nd2-role-prefix{color:var(--ink3)}
        .nd2-role-cur{
          display:inline-block;width:2px;height:0.9em;
          background:var(--cyan);animation:nd2-blink 1s step-end infinite;
        }
        @keyframes nd2-blink{0%,100%{opacity:1}50%{opacity:0}}

        .nd2-desc {
          font-size:clamp(0.82rem,1vw,0.96rem);color:var(--ink2);
          line-height:1.9;max-width:420px;margin-bottom:36px;
          opacity:0;animation:nd2-up 0.7s 0.67s ease forwards;
        }
        .nd2-desc em{color:var(--ink);font-style:normal;font-weight:500}

        .nd2-cta {
          display:flex;gap:10px;flex-wrap:wrap;
          opacity:0;animation:nd2-up 0.7s 0.8s ease forwards;
        }
        .nd2-btn-main {
          font-family:var(--ff-body);font-weight:600;font-size:0.84rem;
          padding:13px 26px;background:var(--rose);color:#fff;
          border:none;border-radius:6px;cursor:pointer;text-decoration:none;
          letter-spacing:0.04em;position:relative;overflow:hidden;
          transition:transform 0.25s,box-shadow 0.25s;
          display:inline-flex;align-items:center;gap:8px;
        }
        .nd2-btn-main::before {
          content:'';position:absolute;inset:0;
          background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.18) 50%,transparent 100%);
          transform:translateX(-100%);transition:transform 0.5s ease;
        }
        .nd2-btn-main:hover::before{transform:translateX(100%)}
        .nd2-btn-main:hover{transform:translateY(-2px);box-shadow:0 12px 36px rgba(255,59,107,0.45)}
        .nd2-btn-ghost {
          font-family:var(--ff-body);font-size:0.84rem;padding:12px 20px;
          background:transparent;color:var(--ink2);
          border:1px solid rgba(255,255,255,0.1);border-radius:6px;
          cursor:pointer;text-decoration:none;transition:all 0.25s;
          display:inline-flex;align-items:center;gap:8px;
        }
        .nd2-btn-ghost:hover{border-color:var(--violet);color:var(--ink);background:rgba(155,93,229,0.07)}

        .nd2-corner {
          position:absolute;bottom:28px;left:7%;
          font-family:var(--ff-mono);font-size:0.6rem;color:var(--ink3);letter-spacing:0.1em;
          opacity:0;animation:nd2-up 0.6s 1.2s ease forwards;
        }

        /* ────────── RIGHT ────────── */
        .nd2-right {
          padding:5% 6% 5% 5%;
          display:flex;flex-direction:column;justify-content:space-between;gap:24px;
          position:relative;
        }

        /* stats 2×2 grid */
        .nd2-stats-top {
          display:grid;grid-template-columns:1fr 1fr;gap:12px;
          opacity:0;animation:nd2-from-right 0.8s 0.6s ease forwards;
        }
        .nd2-stat-card {
          background:rgba(255,255,255,0.03);
          border:1px solid rgba(155,93,229,0.12);
          border-radius:12px;padding:18px 16px;
          position:relative;overflow:hidden;
          transition:border-color 0.3s,background 0.3s;
        }
        .nd2-stat-card::before {
          content:'';position:absolute;top:0;left:0;right:0;height:2px;
          background:linear-gradient(90deg,var(--rose),var(--violet));
          opacity:0;transition:opacity 0.3s;
        }
        .nd2-stat-card:hover{border-color:rgba(155,93,229,0.3);background:rgba(155,93,229,0.05)}
        .nd2-stat-card:hover::before{opacity:1}
        .nd2-stat-n {
          font-family:var(--ff-head);font-size:clamp(2rem,3.5vw,3.2rem);
          line-height:1;display:block;
          background:linear-gradient(135deg,var(--ink) 40%,var(--ink2));
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
        }
        .nd2-stat-l {
          font-family:var(--ff-mono);font-size:0.6rem;letter-spacing:0.14em;
          text-transform:uppercase;color:var(--ink3);margin-top:5px;display:block;
        }

        /* terminal */
        .nd2-terminal-wrap {
          flex:1;opacity:0;
          animation:nd2-from-right 0.9s 0.75s ease forwards;
          min-height:220px;
        }
        .nd2-tiltcard {
          background:rgba(8,4,16,0.97);
          border:1px solid rgba(155,93,229,0.18);
          border-radius:14px;overflow:hidden;height:100%;
          box-shadow:0 24px 80px rgba(0,0,0,0.6),0 0 0 1px rgba(155,93,229,0.06);
        }
        .nd2-tiltcard::before {
          content:'';display:block;height:2px;
          background:linear-gradient(90deg,transparent,var(--rose) 35%,var(--violet) 65%,transparent);
          animation:nd2-glowbar 3.5s ease-in-out infinite;
        }
        @keyframes nd2-glowbar{0%,100%{opacity:0.35}50%{opacity:1}}
        .nd2-term-head {
          display:flex;align-items:center;gap:6px;
          padding:10px 14px;background:rgba(255,255,255,0.018);
          border-bottom:1px solid rgba(255,255,255,0.05);
        }
        .nd2-dot{width:11px;height:11px;border-radius:50%;}
        .nd2-term-title{font-family:var(--ff-mono);font-size:0.68rem;color:var(--ink3);margin-left:8px;flex:1}
        .nd2-term-tag {
          font-family:var(--ff-mono);font-size:0.56rem;padding:2px 8px;border-radius:4px;
          background:rgba(0,245,212,0.07);color:rgba(0,245,212,0.65);
          border:1px solid rgba(0,245,212,0.14);
        }
        .nd2-term-body{padding:14px 16px 18px;font-family:var(--ff-mono);font-size:clamp(0.62rem,1vw,0.78rem);line-height:1.85;}
        .nd2-cline{display:flex;gap:12px;align-items:baseline;}
        .nd2-ln{color:rgba(255,255,255,0.1);font-size:0.6rem;min-width:16px;text-align:right;user-select:none}
        .nd2-tcursor{
          display:inline-block;width:7px;height:12px;background:var(--cyan);
          border-radius:1px;vertical-align:middle;margin-left:1px;
          animation:nd2-blink 0.9s step-end infinite;
        }

        /* skill badges */
        .nd2-skills {
          display:flex;flex-wrap:wrap;gap:6px;
          opacity:0;animation:nd2-from-right 0.8s 0.9s ease forwards;
        }
        .nd2-skill-badge {
          font-family:var(--ff-mono);font-size:0.63rem;
          padding:5px 10px;border-radius:4px;
          border:1px solid rgba(155,93,229,0.16);background:rgba(155,93,229,0.05);
          color:var(--ink2);letter-spacing:0.06em;transition:all 0.2s;cursor:default;
        }
        .nd2-skill-badge:hover{border-color:var(--violet);color:var(--ink);background:rgba(155,93,229,0.1)}

        /* ── ticker ── */
        .nd2-ticker-wrap {
          position:relative;z-index:4;
          border-top:1px solid rgba(155,93,229,0.1);
          border-bottom:1px solid rgba(155,93,229,0.1);
          overflow:hidden;padding:10px 0;background:rgba(155,93,229,0.025);
        }
        .nd2-ticker{display:flex;white-space:nowrap;animation:nd2-scroll 24s linear infinite;}
        @keyframes nd2-scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .nd2-tick-item {
          font-family:var(--ff-mono);font-size:0.68rem;letter-spacing:0.16em;text-transform:uppercase;
          color:var(--ink3);padding:0 26px;display:inline-flex;align-items:center;gap:12px;
          transition:color 0.2s;
        }
        .nd2-tick-item:hover{color:var(--ink2)}
        .nd2-tick-dot{width:4px;height:4px;border-radius:50%;background:var(--rose);opacity:0.5;flex-shrink:0}

        /* ── keyframes ── */
        @keyframes nd2-up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes nd2-from-right{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}

        /* ════════════════════════════════════════
           RESPONSIVE
           ════════════════════════════════════════ */

        /* ── Tablet: 601px – 900px ── */
        @media (min-width:601px) and (max-width:900px) {
          .nd2-hero { padding-top:68px; }
          .nd2-main { grid-template-columns:1fr; }
          .nd2-left {
            padding:52px 6% 36px;
            border-right:none;
            border-bottom:1px solid rgba(155,93,229,0.1);
            align-items:center;text-align:center;
          }
          .nd2-eyebrow { justify-content:center; }
          .nd2-name { font-size:clamp(5rem,13vw,8.5rem); text-align:center; }
          .nd2-desc { max-width:560px;text-align:center; }
          .nd2-cta { justify-content:center; }
          .nd2-role { justify-content:center; }
          .nd2-corner { display:none; }
          .nd2-right {
            padding:36px 6% 48px;
            flex-direction:row;
            flex-wrap:wrap;
            align-items:flex-start;
            gap:20px;
          }
          .nd2-stats-top {
            grid-template-columns:repeat(4,1fr);
            width:100%;
            gap:10px;
          }
          .nd2-terminal-wrap {
            flex:1;min-width:calc(60% - 10px);min-height:240px;
          }
          .nd2-skills {
            min-width:calc(40% - 10px);
            flex:1;
            align-content:flex-start;
          }
          .nd2-stat-n { font-size:clamp(1.8rem,3vw,2.6rem); }
        }

        /* ── Mobile: ≤ 600px ── */
        @media (max-width:600px) {
          .nd2-hero { padding-top:62px; overflow-x:hidden; }
          .nd2-blob-a { width:400px;height:400px;top:-120px;left:-120px; }
          .nd2-blob-b { width:320px;height:320px;bottom:-100px;right:-100px; }
          .nd2-blob-c { display:none; }
          .nd2-grid { background-size:50px 50px; }

          .nd2-main { grid-template-columns:1fr; }

          /* ── LEFT mobile ── */
          .nd2-left {
            padding:42px 5% 32px;
            border-right:none;
            border-bottom:1px solid rgba(155,93,229,0.1);
            align-items:flex-start;
          }
          .nd2-eyebrow { font-size:0.6rem;letter-spacing:0.18em;margin-bottom:16px; }
          .nd2-name { font-size:clamp(3.4rem,17vw,5.5rem); margin-bottom:10px; }
          .nd2-name-outline { -webkit-text-stroke:1.5px var(--violet); }
          .nd2-subtitle { font-size:0.92rem; margin-bottom:20px; }
          .nd2-role { font-size:0.73rem; margin-bottom:20px; }
          .nd2-desc { font-size:0.82rem;line-height:1.75;margin-bottom:28px; }
          .nd2-cta { gap:8px; }
          .nd2-btn-main { font-size:0.8rem;padding:12px 20px; }
          .nd2-btn-ghost { font-size:0.8rem;padding:11px 16px; }
          .nd2-corner { display:none; }

          /* ── RIGHT mobile ── */
          .nd2-right { padding:28px 5% 40px;gap:20px; }

          .nd2-stats-top {
            grid-template-columns:1fr 1fr;
            gap:10px;
          }
          .nd2-stat-card { padding:14px 12px;border-radius:10px; }
          .nd2-stat-n { font-size:clamp(1.8rem,8vw,2.4rem); }
          .nd2-stat-l { font-size:0.56rem; }

          .nd2-terminal-wrap { min-height:200px; }
          .nd2-term-body { padding:10px 12px 14px;font-size:0.65rem;line-height:1.7; }
          .nd2-term-tag { display:none; }

          .nd2-skills { gap:5px; }
          .nd2-skill-badge { font-size:0.6rem;padding:4px 8px; }
        }

        /* ── Very small phones: ≤ 380px ── */
        @media (max-width:380px) {
          .nd2-name { font-size:clamp(2.8rem,15vw,4.5rem); }
          .nd2-cta { flex-direction:column; }
          .nd2-btn-main, .nd2-btn-ghost { justify-content:center;width:100%; }
          .nd2-stats-top { grid-template-columns:1fr 1fr; }
        }
      `}</style>

      <div id="home" className="nd2-hero">
        {/* Blobs */}
        <div className="nd2-blob nd2-blob-a"><MorphBlob color="#9b5de5" delay={0} /></div>
      
        <div className="nd2-blob nd2-blob-c"><MorphBlob color="#00f5d4" delay={6} /></div>
        <div className="nd2-grid" />

        {/* ── MAIN GRID ── */}
        <div className="nd2-main">

          {/* ──── LEFT ──── */}
          <div className="nd2-left">
            <div className="nd2-eyebrow">
              <span className="nd2-eyebrow-line" />
              Python · Django · Full-Stack
              <span className="nd2-eyebrow-line" />
            </div>

           <h1 className="nd2-name">
            <span className="nd2-name-outline" data-text={nameA}>{nameA}</span>
            <span className="nd2-name-solid">{nameB}</span>
          </h1>

            <p className="nd2-subtitle">Focused on building efficient and scalable web solutions.</p>

            <div className="nd2-role">
              <span className="nd2-role-prefix">&gt;_</span>
              <span>{role}</span>
              <span className="nd2-role-cur" />
            </div>

            <p className="nd2-desc">
              Building <em>production-grade Django applications</em> with 1.5+ years of experience.
              Passionate about <em>clean architecture</em>, scalable APIs, and high-performance code
              that works reliably in the real world.
            </p>

            <div className="nd2-cta">
              <a href="#projects" className="nd2-btn-main">
                View Projects
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              <a href="mailto:niharadhanesh875@gmail.com" className="nd2-btn-ghost">
                Hire Me
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
              <a href="/resume.pdf" download className="nd2-btn-ghost">
                CV
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
              </a>
            </div>

            <div className="nd2-corner">&lt; nihara.py · python 3.11 · django 5 /&gt;</div>
          </div>

          {/* ──── RIGHT ──── */}
          <div className="nd2-right">

            {/* Stats */}
            <div className="nd2-stats-top">
              {[
                { n: "1.5", s: "+", l: "Years Experience" },
                { n: "10",  s: "+", l: "Django Projects" },
                { n: "30",  s: "%", l: "Performance Gain" },
                { n: "20",  s: "+", l: "Total Projects" },
              ].map((d) => (
                <div className="nd2-stat-card" key={d.l}>
                  <span className="nd2-stat-n"><Counter to={d.n} suffix={d.s} /></span>
                  <span className="nd2-stat-l">{d.l}</span>
                </div>
              ))}
            </div>

            {/* 3-D tilt terminal (tilt disabled on mobile) */}
            <div className="nd2-terminal-wrap">
              <TiltCard style={{ height: "100%" }} disabled={isMobile}>
                <div className="nd2-tiltcard">
                  <div className="nd2-term-head">
                    <span className="nd2-dot" style={{ background: "#ff5f57" }} />
                    <span className="nd2-dot" style={{ background: "#ffbd2e" }} />
                    <span className="nd2-dot" style={{ background: "#28c840" }} />
                    <span className="nd2-term-title">nihara.py</span>
                    <span className="nd2-term-tag">● python 3.11</span>
                  </div>
                  <TerminalLines />
                </div>
              </TiltCard>
            </div>

            {/* Skills */}
            <div className="nd2-skills">
              {["Django","Python","REST APIs","MySQL","PostgreSQL","Bootstrap","Git"].map((s) => (
                <span key={s} className="nd2-skill-badge">{s}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Ticker */}
        <Ticker />
      </div>
    </>
  );
}