import { SITE } from "../content";

/* ── validation ─────────────────────────────────────────── */
export const isEvm = (a: string) => /^0x[0-9a-fA-F]{40}$/.test(a.trim());

export const isUrl = (u: string) => {
  try {
    const { protocol } = new URL(u.trim());
    return protocol === "https:" || protocol === "http:";
  } catch {
    return false;
  }
};

export const cleanHandle = (h: string) => h.trim().replace(/^@+/, "").replace(/\s+/g, "");

/* ── referral codes ─────────────────────────────────────── */
/** Deterministic 6-char code from a wallet — same wallet, same code, no server needed. */
export function refCodeFor(wallet: string) {
  const s = wallet.trim().toLowerCase();
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(36).toUpperCase().padStart(6, "0").slice(0, 6);
}

export const refLink = (code: string) =>
  `${typeof window !== "undefined" ? window.location.origin : SITE.origin}/?ref=${code}`;

/** Reads ?ref= once and remembers it, so it survives a page reload. */
export function captureRef(): string | null {
  if (typeof window === "undefined") return null;
  const fromUrl = new URLSearchParams(window.location.search).get("ref");
  if (fromUrl) {
    const code = fromUrl.trim().toUpperCase().slice(0, 12);
    localStorage.setItem(KEYS.referredBy, code);
    return code;
  }
  return localStorage.getItem(KEYS.referredBy);
}

/* ── local storage (no auth, by design) ─────────────────── */
export const KEYS = {
  draft: "dawgz_draft_v1",
  submitted: "dawgz_submitted_v1",
  referredBy: "dawgz_referred_by",
};

export type Draft = {
  handle: string;
  wallet: string;
  quoteUrl: string;
  liked: boolean;
};

export const emptyDraft: Draft = { handle: "", wallet: "", quoteUrl: "", liked: false };

export function loadDraft(): Draft {
  try {
    const raw = localStorage.getItem(KEYS.draft);
    return raw ? { ...emptyDraft, ...JSON.parse(raw) } : emptyDraft;
  } catch {
    return emptyDraft;
  }
}

export function saveDraft(d: Draft) {
  try {
    localStorage.setItem(KEYS.draft, JSON.stringify(d));
  } catch {
    /* private mode — the form still works, it just won't persist */
  }
}

export type Submitted = { code: string; wallet: string } | null;

export function loadSubmitted(): Submitted {
  try {
    const raw = localStorage.getItem(KEYS.submitted);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function markSubmitted(s: NonNullable<Submitted>) {
  try {
    localStorage.setItem(KEYS.submitted, JSON.stringify(s));
  } catch {
    /* ignore */
  }
}
