import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { refLink } from "../../lib/wl";
import { SITE } from "../../content";

export default function ReferralPanel({ code, onClose }: { code: string; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const [count, setCount] = useState<number | null>(null);
  const link = refLink(code);

  useEffect(() => {
    let alive = true;
    (async () => {
      const { count: c, error } = await supabase
        .from("whitelist")
        .select("*", { count: "exact", head: true })
        .eq("referred_by", code);
      if (alive && !error) setCount(c ?? 0);
    })();
    return () => {
      alive = false;
    };
  }, [code]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      // clipboard blocked — select the text instead
      const el = document.getElementById("ref-link") as HTMLInputElement | null;
      el?.select();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const tweet =
    `https://x.com/intent/post?text=${encodeURIComponent(
      `I'm on the ${SITE.name} list. ${SITE.supply} dawgz on ${SITE.chain}, backed by ${SITE.token}.`
    )}&url=${encodeURIComponent(link)}`;

  return (
    <div style={{ textAlign: "center" }}>
      <p className="mono" style={{ color: "#1a7a2e", margin: "0 0 6px", letterSpacing: "0.16em" }}>
        APPLICATION SAVED
      </p>
      <h2 className="h-md" style={{ color: "var(--ink)", textTransform: "uppercase", marginBottom: 10 }}>
        You're on the list
      </h2>
      <p className="mono" style={{ color: "rgba(20,20,15,0.7)", margin: "0 0 20px", lineHeight: 1.6 }}>
        Selected wallets are announced before mint. Every fren who applies through your link is
        credited to you and moves you up.
      </p>

      <label className="mono" style={{ display: "block", textAlign: "left", color: "rgba(20,20,15,0.7)", marginBottom: 6 }}>
        Your referral link
      </label>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input id="ref-link" className="field" readOnly value={link} onFocus={(e) => e.target.select()} />
        <button className="btn" style={{ padding: "12px 16px", boxShadow: "3px 3px 0 var(--ink)" }} onClick={copy}>
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <div className="inset" style={{ padding: "12px 14px", display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
        <span className="mono" style={{ color: "rgba(20,20,15,0.7)" }}>Frens referred</span>
        <span className="mono" style={{ color: "var(--ink)", fontWeight: 700 }}>
          {count === null ? "…" : count}
        </span>
      </div>

      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
        <a className="btn btn--red" href={tweet} target="_blank" rel="noopener noreferrer">
          Share on X
        </a>
        <button className="btn" onClick={onClose} style={{ background: "var(--chrome)" }}>
          Close
        </button>
      </div>
    </div>
  );
}
