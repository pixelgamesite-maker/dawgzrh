import { BREEDS } from "../content";
import { Reveal, Eyebrow } from "./Win";

export default function Breeds() {
  return (
    <section className="section" id="breeds">
      <div className="wrap">
        <Reveal>
          <Eyebrow>five breeds</Eyebrow>
          <h2 className="h-lg" style={{ marginBottom: 34 }}>
            Pick your poison
          </h2>
        </Reveal>

        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {BREEDS.map((b, i) => (
            <Reveal as="li" key={b.name} dir="up" delay={i * 0.06}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "clamp(14px,3vw,28px)",
                  padding: "18px 0",
                  borderBottom: "2px solid rgba(0,0,0,0.35)",
                }}
              >
                <img
                  src={b.img}
                  alt=""
                  style={{
                    width: 78,
                    height: 78,
                    objectFit: "cover",
                    flexShrink: 0,
                    border: "3px solid var(--ink)",
                    boxShadow: "4px 4px 0 rgba(0,0,0,0.45)",
                    transform: i % 2 ? "rotate(2.5deg)" : "rotate(-2.5deg)",
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 className="h-md" style={{ textTransform: "uppercase" }}>{b.name}</h3>
                  <p className="mono" style={{ margin: "6px 0 0", opacity: 0.7 }}>{b.desc}</p>
                </div>
                <span
                  className="mono"
                  style={{ color: "var(--yellow)", opacity: 0.8, flexShrink: 0 }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
