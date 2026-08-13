import { useState } from "react";
import { FAQS } from "../content";
import { Reveal, Eyebrow } from "./Win";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section" id="faq">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <Reveal>
          <Eyebrow>help</Eyebrow>
          <h2 className="h-lg" style={{ marginBottom: 26 }}>
            Frequently barked questions
          </h2>
        </Reveal>

        <div style={{ display: "grid", gap: 8 }}>
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} dir="up" delay={i * 0.04}>
                <div className="win">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "14px 16px",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      color: "var(--ink)",
                    }}
                  >
                    <span
                      className="mono"
                      aria-hidden
                      style={{ color: "var(--red)", fontSize: 18, width: 16 }}
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                    <span style={{ fontFamily: "var(--display)", fontSize: "0.95rem", textTransform: "uppercase" }}>
                      {f.q}
                    </span>
                  </button>
                  {isOpen && (
                    <p
                      className="mono"
                      style={{
                        margin: 0,
                        padding: "0 16px 16px 44px",
                        color: "rgba(20,20,15,0.75)",
                        lineHeight: 1.65,
                      }}
                    >
                      {f.a}
                    </p>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
