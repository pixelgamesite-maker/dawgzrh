import { ABOUT, DAWGZ_IMAGES, SITE } from "../content";
import { Reveal, Win, Eyebrow } from "./Win";

export default function About() {
  return (
    <section className="section" id="about">
      <div className="wrap">
        <Reveal>
          <Eyebrow>readme.txt</Eyebrow>
          <h2 className="h-lg" style={{ maxWidth: 800, marginBottom: 40 }}>
            {ABOUT.heading}
          </h2>
        </Reveal>

        <div
          style={{
            display: "grid",
            gap: 26,
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            alignItems: "start",
          }}
        >
          <Reveal dir="left">
            <Win title="C:\dawgz\about.txt" tone="blue">
              {ABOUT.body.map((p, i) => (
                <p
                  key={i}
                  className="lede"
                  style={{ margin: i ? "16px 0 0" : 0, color: "#1c1c16" }}
                >
                  {p}
                </p>
              ))}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))",
                  gap: 8,
                  marginTop: 26,
                }}
              >
                {ABOUT.stats.map(([v, l]) => (
                  <div key={l} className="inset" style={{ padding: "12px 10px" }}>
                    <p style={{ margin: 0, fontFamily: "var(--display)", fontSize: "1rem", color: "var(--ink)" }}>
                      {v}
                    </p>
                    <p className="mono" style={{ margin: "2px 0 0", fontSize: 13, opacity: 0.6, color: "var(--ink)" }}>
                      {l}
                    </p>
                  </div>
                ))}
              </div>
            </Win>
          </Reveal>

          <Reveal dir="right" delay={0.1}>
            <Win title="properties" tone="red" dark>
              <img
                src={DAWGZ_IMAGES[1]}
                alt="A DAWGZ character: bulldog in a rainbow clown wig"
                style={{ width: "100%", display: "block", border: "2px solid #000" }}
              />
              <dl style={{ margin: "18px 0 0", display: "grid", gap: 10 }}>
                {[
                  ["Chain", SITE.chain],
                  ["Token", SITE.token],
                  ["Supply", SITE.supply],
                  ["Access", "Whitelist only"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 12,
                      borderBottom: "1px dashed rgba(255,255,255,0.18)",
                      paddingBottom: 8,
                    }}
                  >
                    <dt className="mono" style={{ opacity: 0.55 }}>{k}</dt>
                    <dd className="mono" style={{ margin: 0, color: "var(--yellow)" }}>{v}</dd>
                  </div>
                ))}
              </dl>
            </Win>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
