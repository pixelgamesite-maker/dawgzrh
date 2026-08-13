import { useEffect, useState } from "react";
import { SITE } from "../content";

const NAV: [string, string][] = [
  ["About", "#about"],
  ["Dawgz", "#dawgz"],
  ["$DAWGZ", "#token"],
  ["FAQ", "#faq"],
];

export default function Header({ onApply }: { onApply: () => void }) {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 80,
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "10px clamp(12px,3vw,26px)",
        background: solid ? "rgba(6,42,40,0.92)" : "transparent",
        backdropFilter: solid ? "blur(10px)" : "none",
        borderBottom: solid ? "2px solid rgba(0,0,0,0.5)" : "2px solid transparent",
        transition: "background 0.25s, border-color 0.25s",
      }}
    >
      <a href="#top" style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <img
          src="/1.jpg"
          alt=""
          width={34}
          height={34}
          style={{
            objectFit: "cover",
            border: "2px solid #14140f",
            boxShadow: "3px 3px 0 rgba(0,0,0,0.5)",
          }}
        />
        <span
          style={{
            fontFamily: "var(--display)",
            fontSize: "1.15rem",
            letterSpacing: "0.04em",
          }}
        >
          DAWGZ
        </span>
      </a>

      <nav style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4 }}>
        <div className="mono" style={{ display: "none", gap: 4 }} data-desktop-nav>
          {NAV.map(([label, href]) => (
            <a key={href} href={href} style={{ padding: "8px 12px", opacity: 0.8 }}>
              {label}
            </a>
          ))}
        </div>

        <a
          href={SITE.x}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="DAWGZ on X"
          className="win__btn"
          style={{ width: 34, height: 30 }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
          </svg>
        </a>

        <button className="btn btn--red" style={{ padding: "11px 18px" }} onClick={onApply}>
          Get on the list
        </button>
      </nav>

      {/* nav links only above 760px, kept here to avoid a second stylesheet */}
      <style>{`
        @media (min-width: 760px) { [data-desktop-nav] { display: flex !important; } }
      `}</style>
    </header>
  );
}
