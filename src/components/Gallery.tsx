import { useEffect, useState } from "react";
import { DAWGZ_IMAGES, TRAITS } from "../content";
import { Reveal, Win, Eyebrow } from "./Win";

export default function Gallery() {
  const [cur, setCur] = useState(0);

  // slow auto-advance; pauses while the user is on another tab
  useEffect(() => {
    const t = setInterval(() => setCur((c) => (c + 1) % DAWGZ_IMAGES.length), 3400);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="section" id="dawgz">
      <div className="wrap">
        <Reveal>
          <Eyebrow>the litter</Eyebrow>
          <h2 className="h-lg" style={{ marginBottom: 12 }}>
            Every dawg is a different kind of wrong
          </h2>
          <p className="lede muted" style={{ maxWidth: 620, marginBottom: 40 }}>
            Nine trait categories, layered by hand, generated once. Some combinations should
            never have shipped. Those are the good ones.
          </p>
        </Reveal>

        <div style={{ display: "grid", gap: 26, gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))" }}>
          <Reveal dir="pop">
            <Win title={`dawg_${String(cur + 1).padStart(4, "0")}.jpg — Preview`} tone="blue">
              <div className="inset" style={{ padding: 6, background: "#0f0f0d" }}>
                <img
                  key={cur}
                  src={DAWGZ_IMAGES[cur]}
                  alt={`DAWGZ sample ${cur + 1}`}
                  style={{
                    width: "100%",
                    aspectRatio: "1/1",
                    objectFit: "cover",
                    display: "block",
                    animation: "boot 0.45s ease both",
                  }}
                />
              </div>
              <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
                {DAWGZ_IMAGES.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setCur(i)}
                    aria-label={`Show sample ${i + 1}`}
                    className="win__btn"
                    style={{
                      width: 46,
                      height: 46,
                      padding: 0,
                      backgroundImage: `url(${src})`,
                      backgroundSize: "cover",
                      outline: i === cur ? "3px solid var(--red)" : "none",
                      outlineOffset: -3,
                    }}
                  />
                ))}
              </div>
            </Win>
          </Reveal>

          <Reveal dir="right" delay={0.08}>
            <Win title="traits.dll" tone="dim" dark>
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))",
                  gap: 8,
                }}
              >
                {TRAITS.map((t, i) => (
                  <li
                    key={t}
                    className="mono"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "10px 12px",
                      background: "rgba(255,255,255,0.05)",
                      borderLeft: `4px solid ${i % 3 === 0 ? "var(--red)" : i % 3 === 1 ? "var(--yellow)" : "var(--lime)"}`,
                    }}
                  >
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mono" style={{ marginTop: 18, opacity: 0.55, lineHeight: 1.6 }}>
                Rarity is published at reveal. Nothing is hidden, nothing is pre-sold, and no
                trait is reserved for the team.
              </p>
            </Win>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
