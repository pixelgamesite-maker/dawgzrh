import type { ReactNode } from "react";

export default function StepCard({
  n,
  title,
  hint,
  done,
  locked,
  children,
}: {
  n: number;
  title: string;
  hint?: string;
  done: boolean;
  locked: boolean;
  children?: ReactNode;
}) {
  return (
    <div
      className="win"
      style={{
        opacity: locked ? 0.45 : 1,
        filter: locked ? "grayscale(1)" : "none",
        transition: "opacity 0.25s, filter 0.25s",
      }}
      aria-disabled={locked}
    >
      <div className={`win__bar ${done ? "" : locked ? "win__bar--dim" : "win__bar--red"}`}>
        <span className="win__title">
          Step {n} of 4 — {title}
        </span>
        {done && <span className="mono" style={{ paddingRight: 6 }}>done ✓</span>}
      </div>

      <div style={{ padding: 14 }}>
        {hint && (
          <p className="mono" style={{ margin: "0 0 10px", color: "rgba(20,20,15,0.7)", lineHeight: 1.55 }}>
            {hint}
          </p>
        )}
        <fieldset disabled={locked} style={{ border: "none", margin: 0, padding: 0 }}>
          {children}
        </fieldset>
      </div>
    </div>
  );
}
