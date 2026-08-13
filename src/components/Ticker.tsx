import { TICKER } from "../content";

export default function Ticker({ reverse = false }: { reverse?: boolean }) {
  const items = [...TICKER, ...TICKER];
  return (
    <div className="ticker" aria-hidden>
      <div
        className="ticker__track"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {items.map((t, i) => (
          <span key={i} className="ticker__item">
            {t} <span style={{ opacity: 0.55 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
