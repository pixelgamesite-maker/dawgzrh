import type { ReactNode, CSSProperties } from "react";
import { useReveal } from "../hooks/useReveal";

type RevealDir = "up" | "left" | "right" | "pop";

/** Scroll-reveal wrapper. Wrap anything; it slides in once. */
export function Reveal({
  children,
  dir = "up",
  delay = 0,
  as: Tag = "div",
  className = "",
  style,
}: {
  children: ReactNode;
  dir?: RevealDir;
  delay?: number;
  as?: "div" | "section" | "li";
  className?: string;
  style?: CSSProperties;
}) {
  const { ref, shown } = useReveal();
  return (
    <Tag
      ref={ref as never}
      className={`reveal reveal--${dir} ${shown ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}s`, ...style }}
    >
      {children}
    </Tag>
  );
}

/** The signature device: every block of content is a desktop window. */
export function Win({
  title,
  children,
  tone = "blue",
  dark = false,
  className = "",
  style,
  onClose,
}: {
  title: string;
  children: ReactNode;
  tone?: "blue" | "red" | "dim";
  dark?: boolean;
  className?: string;
  style?: CSSProperties;
  onClose?: () => void;
}) {
  return (
    <div className={`win ${dark ? "win--dark" : ""} ${className}`} style={style}>
      <div className={`win__bar ${tone === "red" ? "win__bar--red" : tone === "dim" ? "win__bar--dim" : ""}`}>
        <span className="win__title">{title}</span>
        <div className="win__btns" aria-hidden={!onClose}>
          <span className="win__btn">_</span>
          <span className="win__btn">□</span>
          <button
            className="win__btn"
            onClick={onClose}
            aria-label={onClose ? "Close" : undefined}
            tabIndex={onClose ? 0 : -1}
          >
            ×
          </button>
        </div>
      </div>
      <div className="win__body">{children}</div>
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}
