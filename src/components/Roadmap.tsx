import { ROADMAP } from "../content";
import { Reveal, Win, Eyebrow } from "./Win";

export default function Roadmap() {
  return (
    <section className="section" id="roadmap">
      <div className="wrap">
        <Reveal>
          <Eyebrow>installing…</Eyebrow>
          <h2 className="h-lg" style={{ marginBottom: 30 }}>
            What actually happens next
          </h2>
        </Reveal>

        <Reveal dir="up">
          <Win title="DAWGZ Setup — 20% complete" tone="blue">
            {/* Win95 chunk progress bar */}
            <div className="inset" style={{ padding: 3, marginBottom: 24 }}>
              <div style={{ display: "flex", gap: 3 }}>
                {Array.from({ length: 20 }).map((_, i) => (
                  <span
                    key={i}
                    style={{
                      flex: 1,
                      height: 20,
                      background: i < 4 ? "var(--blue)" : "transparent",
                    }}
                  />
                ))}
              </div>
            </div>

            <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 2 }}>
              {ROADMAP.map((r, i) => {
                const live = r.state === "live";
                return (
                  <Reveal as="li" key={r.title} dir="left" delay={i * 0.06}>
                    <div
                      style={{
                        display: "flex",
                        gap: 14,
                        alignItems: "flex-start",
                        padding: "14px 12px",
                        background: live ? "rgba(26,79,214,0.12)" : "transparent",
                        borderLeft: `5px solid ${live ? "var(--lime)" : "rgba(20,20,15,0.25)"}`,
                      }}
                    >
                      <span
                        className="mono"
                        aria-hidden
                        style={{ color: live ? "#1a7a2e" : "rgba(20,20,15,0.45)", paddingTop: 2 }}
                      >
                        {live ? "▶" : "…"}
                      </span>
                      <div>
                        <p
                          style={{
                            margin: 0,
                            fontFamily: "var(--display)",
                            fontSize: "1rem",
                            textTransform: "uppercase",
                            color: "var(--ink)",
                          }}
                        >
                          {r.title}
                          {live && (
                            <span className="mono" style={{ marginLeft: 10, color: "#1a7a2e" }}>
                              live now
                            </span>
                          )}
                        </p>
                        <p className="mono" style={{ margin: "5px 0 0", color: "rgba(20,20,15,0.7)" }}>
                          {r.desc}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </ol>
          </Win>
        </Reveal>
      </div>
    </section>
  );
}
