// backend wiring for the matchai fastapi service
// set the url at build time: REACT_APP_API_BASE=https://matchaibackend.onrender.com
// window.MATCHAI_API_BASE still wins, handy for quick testing
const DEFAULT_BASE = "https://matchaibackend.onrender.com";

export function apiBase() {
  const b =
    (typeof window !== "undefined" && window.MATCHAI_API_BASE) ||
    process.env.REACT_APP_API_BASE ||
    DEFAULT_BASE;
  return String(b).replace(/\/+$/, "");
}

export function sessionId() {
  let id = null;
  try {
    id = localStorage.getItem("matchai-session-id");
  } catch (e) {}
  if (!id) {
    id =
      window.crypto && window.crypto.randomUUID
        ? window.crypto.randomUUID()
        : "sess-" + Date.now() + "-" + Math.random().toString(36).slice(2);
    try {
      localStorage.setItem("matchai-session-id", id);
    } catch (e) {}
  }
  return id;
}

// post /chat -> { response }
export async function askMatchai(text) {
  const res = await fetch(apiBase() + "/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: text, session_id: sessionId() }),
  });
  if (!res.ok) throw new Error("backend " + res.status);
  const data = await res.json();
  const reply = data && (data.response || data.reply || data.message);
  if (!reply) throw new Error("empty response");
  return reply;
}

// get /leaderboard -> [{ name, score }]
export async function getLeaderboard() {
  const res = await fetch(apiBase() + "/leaderboard");
  if (!res.ok) throw new Error("backend " + res.status);
  return res.json();
}

// post /leaderboard -> top five
export async function postScore(name, score) {
  const res = await fetch(apiBase() + "/leaderboard", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, score }),
  });
  if (!res.ok) throw new Error("backend " + res.status);
  return res.json();
}
