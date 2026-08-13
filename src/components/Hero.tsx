import { useEffect, useState } from "react";
import { SITE, DAWGZ_IMAGES } from "../content";
import { useParallax } from "../hooks/useReveal";
import { Win } from "./Win";

const HERO_STATS: [string, string][] = [
  [SITE.supply, "Supply"],
  [SITE.price, "Mint"],
  ["Robinhood", "Chain"],
  [SITE.token, "Backed by"],
];

export default function Hero({ onApply }: { onApply: () => void }) {
  const drift = useParallax(0.08);
  const [booted, setBooted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const anim = (d: number): React.CSSProperties =>
    booted ? { animation: `boot 0.7s cubic-bezier(0.2,0.9,0.3,1) ${d}s both` } : { opacity: 0 };

  return (
    <section
      id="top"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "120px 0 90px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* floating desktop junk — parallax */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "14%",
          left: "4%",
          width: 260,
          maxWidth: "44vw",
          transform: `translateY(${-drift}px) rotate(-4deg)`,
          zIndex: 0,
          opacity: 0.95,
        }}
        className="float"
      >
        <Win title="System message" tone="dim">
          <p className="mono" style={{ margin: "6px 0 16px", fontSize: 17 }}>
            you don't exist
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            <span className="win__btn" style={{ width: 62, height: 24 }}>Ok</span>
            <span className="win__btn" style={{ width: 62, height: 24 }}>Cancel</span>
          </div>
        </Win>
      </div>

      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "12%",
          right: "3%",
          width: 210,
          maxWidth: "38vw",
          transform: `translateY(${drift * 1.4}px) rotate(5deg)`,
          zIndex: 0,
        }}
      >
        <Win title="dawg_final_FINAL.jpg" tone="blue">
          <img
            src={DAWGZ_IMAGES[2]}
            alt=""
            style={{ width: "100%", display: "block", border: "2px solid #14140f" }}
          />
        </Win>
      </div>

      <div className="wrap" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <p className="mono" style={{ ...anim(0.05), color: "var(--yellow)", letterSpacing: "0.2em", margin: "0 0 18px" }}>
          {SITE.supply} ON {SITE.chain.toUpperCase()}
        </p>

        <h1 className="h-xl sticker jitter" style={anim(0.12)}>
          DAWGZ
        </h1>

        <p
          className="lede"
          style={{
            ...anim(0.22),
            maxWidth: 520,
            margin: "26px auto 0",
            fontFamily: "var(--pixel)",
            fontSize: 19,
          }}
        >
          {SITE.tagline} Backed by {SITE.token}. No leash, no roadmap theatre, no apologies.
        </p>

        <div
          style={{
            ...anim(0.3),
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            justifyContent: "center",
            margin: "36px 0 0",
          }}
        >
          <button className="btn" onClick={onApply}>
            Get on the list
          </button>
          <a className="btn btn--ghost" href="#about">
            What is this
          </a>
        </div>

        {/* stat strip — a Win95 status bar */}
        <div
          style={{
            ...anim(0.4),
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))",
            gap: 6,
            maxWidth: 720,
            margin: "52px auto 0",
          }}
        >
          {HERO_STATS.map(([v, l]) => (
            <div
              key={l}
              className="tray"
              style={{ background: "var(--chrome)", color: "var(--ink)", padding: "12px 10px" }}
            >
              <p style={{ margin: 0, fontFamily: "var(--display)", fontSize: "1.05rem" }}>{v}</p>
              <p className="mono" style={{ margin: "2px 0 0", opacity: 0.6, fontSize: 13 }}>
                {l}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p
        className="mono blink"
        aria-hidden
        style={{ position: "absolute", bottom: 46, left: "50%", transform: "translateX(-50%)", opacity: 0.7 }}
      >
        ▼ scroll
      </p>
    </section>
  );
}
