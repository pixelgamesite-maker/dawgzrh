import { useEffect, useState } from "react";
import { SITE } from "../../content";
import { supabase } from "../../lib/supabase";
import {
  cleanHandle, isEvm, isUrl, loadDraft, saveDraft, refCodeFor,
  loadSubmitted, markSubmitted, captureRef, emptyDraft, type Draft,
} from "../../lib/wl";
import StepCard from "./StepCard";
import ReferralPanel from "./ReferralPanel";

export default function WhitelistModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [d, setD] = useState<Draft>(emptyDraft);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [code, setCode] = useState<string | null>(null);
  const [referredBy, setReferredBy] = useState<string | null>(null);

  /* ── restore local state (no accounts, by design) ── */
  useEffect(() => {
    setD(loadDraft());
    const prev = loadSubmitted();
    if (prev) setCode(prev.code);
    setReferredBy(captureRef());
  }, []);

  useEffect(() => {
    saveDraft(d);
  }, [d]);

  /* ── close on Escape ── */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const s1 = cleanHandle(d.handle).length > 1;
  const s2 = d.liked;
  const s3 = isUrl(d.quoteUrl);
  const s4 = isEvm(d.wallet);
  const doneCount = [s1, s2, s3, s4].filter(Boolean).length;
  const ready = doneCount === 4;

  async function submit() {
    if (!ready || sending) return;
    setError("");
    setSending(true);

    const myCode = refCodeFor(d.wallet);
    const { error: e } = await supabase.from("whitelist").insert([
      {
        wallet: d.wallet.trim().toLowerCase(),
        x_handle: cleanHandle(d.handle),
        quote_url: d.quoteUrl.trim(),
        ref_code: myCode,
        referred_by: referredBy && referredBy !== myCode ? referredBy : null,
      },
    ]);
    setSending(false);

    if (e) {
      // 23505 = unique violation: this wallet already applied, so just show its link
      if ((e as { code?: string }).code === "23505") {
        markSubmitted({ code: myCode, wallet: d.wallet });
        setCode(myCode);
        return;
      }
      setError("Couldn't save your application. Check your connection and try again.");
      return;
    }

    markSubmitted({ code: myCode, wallet: d.wallet });
    setCode(myCode);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Whitelist application"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(3,24,23,0.86)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 14,
      }}
    >
      <div
        className="win"
        style={{
          width: "100%",
          maxWidth: 520,
          maxHeight: "92vh",
          overflowY: "auto",
          animation: "boot 0.3s ease both",
        }}
      >
        <div className="win__bar">
          <span className="win__title">{SITE.name} — Whitelist application</span>
          <div className="win__btns">
            <button className="win__btn" onClick={onClose} aria-label="Close">×</button>
          </div>
        </div>

        <div style={{ padding: "16px" }}>
          {code ? (
            <ReferralPanel code={code} onClose={onClose} />
          ) : (
            <>
              {referredBy && (
                <p className="mono" style={{ margin: "0 0 12px", color: "#1a7a2e" }}>
                  Referred by {referredBy} — credited when you submit.
                </p>
              )}

              {/* progress: chunky Win95 bar */}
              <div className="inset" style={{ padding: 3, marginBottom: 4 }}>
                <div style={{ display: "flex", gap: 3 }}>
                  {Array.from({ length: 16 }).map((_, i) => (
                    <span
                      key={i}
                      style={{
                        flex: 1,
                        height: 16,
                        background: i < doneCount * 4 ? "var(--blue)" : "transparent",
                        transition: "background 0.3s",
                      }}
                    />
                  ))}
                </div>
              </div>
              <p className="mono" style={{ margin: "0 0 16px", color: "rgba(20,20,15,0.6)" }}>
                {doneCount} of 4 steps complete
              </p>

              <div style={{ display: "grid", gap: 10 }}>
                {/* 1 — handle */}
                <StepCard n={1} title="Your X handle" done={s1} locked={false}>
                  <input
                    className="field"
                    placeholder="@yourhandle"
                    value={d.handle}
                    onChange={(e) => setD({ ...d, handle: e.target.value })}
                  />
                </StepCard>

                {/* 2 — follow + like */}
                <StepCard
                  n={2}
                  title="Follow and like the pinned post"
                  hint="Follow @dawgz, like the pinned post, and tag two frens in the replies."
                  done={s2}
                  locked={!s1}
                >
                  <button
                    className="btn btn--red"
                    style={{ width: "100%", boxShadow: "3px 3px 0 var(--ink)" }}
                    onClick={() => {
                      window.open(SITE.pinnedPost, "_blank", "noopener");
                      setD({ ...d, liked: true });
                    }}
                  >
                    {s2 ? "Opened — marked done" : "Open the post on X"}
                  </button>
                </StepCard>

                {/* 3 — quote */}
                <StepCard
                  n={3}
                  title="Quote the post"
                  hint='Quote it with "DAWGZ" and tag two frens, then paste the link to your quote.'
                  done={s3}
                  locked={!s2}
                >
                  <input
                    className={`field ${d.quoteUrl && !s3 ? "field--bad" : ""}`}
                    placeholder="https://x.com/you/status/…"
                    value={d.quoteUrl}
                    onChange={(e) => setD({ ...d, quoteUrl: e.target.value })}
                  />
                  {d.quoteUrl && !s3 && (
                    <p className="mono" style={{ margin: "6px 0 0", color: "var(--red)" }}>
                      That isn't a full link. It should start with https://
                    </p>
                  )}
                </StepCard>

                {/* 4 — wallet */}
                <StepCard
                  n={4}
                  title="Your wallet"
                  hint="The address that will mint. Never share a seed phrase or private key — this form never asks for one."
                  done={s4}
                  locked={!s3}
                >
                  <input
                    className={`field ${d.wallet && !s4 ? "field--bad" : ""}`}
                    placeholder="0x…"
                    value={d.wallet}
                    onChange={(e) => setD({ ...d, wallet: e.target.value })}
                  />
                  {d.wallet && !s4 && (
                    <p className="mono" style={{ margin: "6px 0 0", color: "var(--red)" }}>
                      That address isn't valid. It needs 0x plus 40 characters.
                    </p>
                  )}
                </StepCard>
              </div>

              {error && (
                <p className="mono" style={{ color: "var(--red)", margin: "14px 0 0" }}>
                  {error}
                </p>
              )}

              <button
                className="btn"
                disabled={!ready || sending}
                onClick={submit}
                style={{ width: "100%", marginTop: 16 }}
              >
                {sending ? "Saving…" : ready ? "Submit application" : `${4 - doneCount} steps left`}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
