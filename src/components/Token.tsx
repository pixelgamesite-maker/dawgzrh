import { SITE, SYSTEMS } from "../content";
import { Reveal, Win, Eyebrow } from "./Win";

export default function Token() {
  return (
    <section className="section" id="token">
      <div className="wrap">
        <Reveal dir="pop">
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <Eyebrow>the token</Eyebrow>
            <h2 className="h-xl sticker" style={{ fontSize: "clamp(3rem,13vw,7rem)" }}>
              {SITE.token}
            </h2>
            <p className="lede" style={{ maxWidth: 560, margin: "24px auto 0", opacity: 0.8 }}>
              Every dawg is backed by {SITE.token}. It pays out staking, funds the games, and
              gets burned every time somebody rerolls a trait they hate. Supply and distribution
              are published at mint — not before, not by leak.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))" }}>
          {SYSTEMS.map((s, i) => (
            <Reveal key={s.name} dir="up" delay={i * 0.07}>
              <Win title={s.name.toLowerCase().replace(/\s+/g, "_") + ".exe"} tone={i % 2 ? "red" : "blue"} dark>
                <h3 className="h-md" style={{ textTransform: "uppercase", color: "#fff" }}>{s.name}</h3>
                <p className="mono" style={{ margin: "10px 0 0", opacity: 0.7, lineHeight: 1.6 }}>
                  {s.desc}
                </p>
              </Win>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
