import { useCallback, useEffect, useRef, useState } from "react";
import { askMatchai } from "../api";

const GREETING =
  "Hi, I'm matchai. Good to see you. What's on your mind today?";

const FALLBACK =
  "I'm having a little trouble reaching the server right now. Take a slow breath and try again in a moment. I'll be here.";

const CHIPS = [
  "I'm feeling overwhelmed",
  "Help me unwind",
  "Guide me through a breath",
];

const SANS = "'Jost', -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";

function Dots() {
  return (
    <div
      style={{
        alignSelf: "flex-start",
        display: "flex",
        gap: 4,
        background: "var(--m-bg2)",
        padding: "12px 14px",
        borderRadius: "16px 16px 16px 4px",
      }}
    >
      {[0, 0.2, 0.4].map((d) => (
        <div
          key={d}
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--m-soft)",
            animation: `m-dots 1.2s ${d}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function Bubble({ role, text, fontSize }) {
  const mine = role === "user";
  return (
    <div
      style={{
        alignSelf: mine ? "flex-end" : "flex-start",
        maxWidth: "85%",
        background: mine ? "var(--m-deep)" : "var(--m-bg2)",
        color: mine ? "#253317" : "var(--m-ink)",
        padding: "10px 14px",
        borderRadius: mine ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
        fontSize,
        lineHeight: 1.5,
        whiteSpace: "pre-wrap",
      }}
    >
      {text}
    </div>
  );
}

// shared chat. mode inline embeds it, mode floating is the corner bubble
export default function ChatWidget({
  mode = "floating",
  flush = false,
  greeting = GREETING,
}) {
  const [msgs, setMsgs] = useState([]);
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const scrollDown = useCallback(() => {
    setTimeout(() => {
      const el = scrollRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    }, 50);
  }, []);

  useEffect(scrollDown, [msgs, busy, scrollDown]);

  const sendText = useCallback(
    async (text) => {
      if (!text || busy) return;
      setMsgs((m) => [...m, { role: "user", text }]);
      setBusy(true);
      try {
        const reply = await askMatchai(text);
        setMsgs((m) => [...m, { role: "assistant", text: reply }]);
      } catch (e) {
        setMsgs((m) => [...m, { role: "assistant", text: FALLBACK }]);
      }
      setBusy(false);
    },
    [busy]
  );

  const sendFromInput = () => {
    const el = inputRef.current;
    if (!el) return;
    const t = el.value.trim();
    el.value = "";
    sendText(t);
  };

  const onKey = (e) => {
    if (e.key === "Enter") sendFromInput();
  };

  const thread = (fontSize) => (
    <div
      ref={scrollRef}
      style={{
        flex: 1,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        padding: mode === "inline" ? "16px 18px" : "14px 16px",
      }}
    >
      <Bubble role="assistant" text={greeting} fontSize={fontSize} />
      {msgs.map((m, i) => (
        <Bubble key={i} role={m.role} text={m.text} fontSize={fontSize} />
      ))}
      {busy && <Dots />}
    </div>
  );

  const inputRow = (small) => (
    <div
      style={{
        display: "flex",
        gap: 8,
        padding: small ? "10px 12px" : "12px 14px",
        borderTop: "1px solid var(--m-line)",
      }}
    >
      <input
        ref={inputRef}
        onKeyDown={onKey}
        placeholder={
          small ? "What's on your mind?" : "Tell matchai what's on your mind…"
        }
        style={{
          flex: 1,
          border: "1px solid var(--m-line)",
          background: "var(--m-bg)",
          borderRadius: 12,
          padding: small ? "9px 13px" : "10px 14px",
          fontFamily: SANS,
          fontSize: small ? 13.5 : 14,
          color: "var(--m-ink)",
          outline: "none",
        }}
      />
      <button
        type="button"
        onClick={sendFromInput}
        style={{
          border: "none",
          background: "var(--m-deep)",
          color: "#253317",
          borderRadius: 12,
          padding: small ? "9px 15px" : "10px 16px",
          fontFamily: SANS,
          fontWeight: 600,
          fontSize: small ? 13 : 13.5,
          cursor: "pointer",
        }}
      >
        Send
      </button>
    </div>
  );

  if (mode === "inline") {
    return (
      <div
        style={{
          fontFamily: SANS,
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          minHeight: flush ? 0 : 420,
          background: flush
            ? "color-mix(in srgb, var(--m-card) 82%, transparent)"
            : "var(--m-card)",
          border: flush ? "none" : "1px solid var(--m-line)",
          borderRadius: flush ? 0 : 22,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "14px 18px",
            borderBottom: "1px solid var(--m-line)",
            background: "color-mix(in srgb, var(--m-bg2) 90%, transparent)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 1,
            }}
          >
            <div
              style={{
                fontFamily:
                  "'Cormorant Garamond', Georgia, 'Times New Roman', serif",
                fontWeight: 600,
                fontSize: 19,
                color: "var(--m-ink)",
              }}
            >
              matchai
            </div>
            <div style={{ fontSize: 12, color: "var(--m-soft)" }}>
              wellness chat, vent or relieve stress
            </div>
          </div>
        </div>

        {thread(14)}

        {msgs.length === 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              padding: "0 18px 12px",
            }}
          >
            {CHIPS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => sendText(c)}
                style={{
                  border: "1px solid var(--m-line)",
                  background: "var(--m-card)",
                  color: "var(--m-soft)",
                  borderRadius: 999,
                  padding: "7px 13px",
                  fontFamily: SANS,
                  fontSize: 12.5,
                  cursor: "pointer",
                }}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {inputRow(false)}

        <div
          style={{
            padding: "0 18px 10px",
            fontSize: 10.5,
            color: "var(--m-soft)",
            opacity: 0.75,
          }}
        >
          matchai is not a replacement for therapy. In crisis? Call or text 988
          (U.S.).
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        right: 22,
        bottom: 22,
        zIndex: 900,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 12,
        fontFamily: SANS,
      }}
    >
      {open && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "min(370px, calc(100vw - 44px))",
            height: "min(520px, calc(100vh - 120px))",
            background: "var(--m-card)",
            border: "1px solid var(--m-line)",
            borderRadius: 22,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 16px",
              borderBottom: "1px solid var(--m-line)",
              background: "var(--m-bg2)",
            }}
          >
            <div
              style={{
                fontFamily:
                  "'Cormorant Garamond', Georgia, 'Times New Roman', serif",
                fontWeight: 600,
                fontSize: 18,
                color: "var(--m-ink)",
              }}
            >
              matchai
            </div>
            <div style={{ fontSize: 11.5, color: "var(--m-soft)" }}>
              here to listen
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              style={{
                marginLeft: "auto",
                border: "none",
                background: "none",
                color: "var(--m-soft)",
                fontSize: 16,
                cursor: "pointer",
                padding: "2px 6px",
              }}
            >
              ✕
            </button>
          </div>

          {thread(13.5)}
          {inputRow(true)}

          <div
            style={{
              padding: "0 16px 9px",
              fontSize: 10,
              color: "var(--m-soft)",
              opacity: 0.75,
            }}
          >
            Not a replacement for therapy. In crisis? Call or text 988 (U.S.).
          </div>
        </div>
      )}

      {!open && (
        <div
          style={{
            background: "var(--m-card)",
            border: "1px solid var(--m-line)",
            borderRadius: "14px 14px 4px 14px",
            padding: "8px 13px",
            fontSize: 12.5,
            color: "var(--m-ink)",
          }}
        >
          Want to talk? I'm right here.
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Chat with matchai"
        style={{
          position: "relative",
          width: 64,
          height: 64,
          border: "none",
          background: "none",
          padding: 0,
          color: "var(--m-accent)",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
          }}
        >
          <svg
            width="56"
            height="56"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.3 9.3 0 0 1-3.3-.6L3 21l1.8-4.9A8.2 8.2 0 0 1 3.6 11.5 8.4 8.4 0 0 1 12 3.1a8.4 8.4 0 0 1 9 8.4z" />
          </svg>
        </span>
      </button>
    </div>
  );
}
