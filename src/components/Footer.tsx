import { useEffect, useState } from "react";
import { SITE } from "../content";
import { Reveal } from "./Win";

export function ClosingCta({ onApply }: { onApply: () => void }) {
  return (
    <section className="section" style={{ textAlign: "center" }}>
      <div className="wrap">
        <Reveal dir="pop">
          <h2 className="h-lg sticker" style={{ marginBottom: 18 }}>
            The list closes when it closes
          </h2>
          <p className="lede muted" style={{ maxWidth: 480, margin: "0 auto 30px" }}>
            Four steps, two minutes. Refer your frens and move up the list.
          </p>
          <button className="btn" onClick={onApply} style={{ fontSize: "1rem", padding: "20px 40px" }}>
            Get on the list
          </button>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer style={{ padding: "60px 0 90px", textAlign: "center" }}>
      <div className="wrap">
        <h3 className="h-md" style={{ margin: "0 0 6px", letterSpacing: "0.06em" }}>DAWGZ</h3>
        <p className="mono muted" style={{ margin: "0 0 24px" }}>
          {SITE.supply} on {SITE.chain}. Backed by {SITE.token}.
        </p>
        <div style={{ display: "flex", gap: 22, justifyContent: "center", flexWrap: "wrap" }}>
          {[
            ["X", SITE.x],
            ["About", "#about"],
            ["FAQ", "#faq"],
          ].map(([l, h]) => (
            <a key={l} href={h} className="mono" style={{ color: "var(--yellow)" }}>
              {l}
            </a>
          ))}
        </div>
        <p className="mono" style={{ marginTop: 30, opacity: 0.4, fontSize: 13 }}>
          Digital collectible. Not an investment. Not financial advice.
        </p>
      </div>
    </footer>
  );
}

export function Taskbar({ onApply }: { onApply: () => void }) {
  const [clock, setClock] = useState("");
  useEffect(() => {
    const tick = () =>
      setClock(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    tick();
    const t = setInterval(tick, 30_000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="taskbar">
      <button className="win__btn" style={{ width: "auto", height: 28, padding: "0 12px", gap: 6 }} onClick={onApply}>
        <strong>Start</strong>
      </button>
      <span className="taskbar__slot">DAWGZ.exe — running</span>
      <span className="tray">{clock}</span>
    </div>
  );
}
