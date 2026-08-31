import { useCallback, useEffect, useRef, useState } from "react";
import { askMatchai } from "../api";

const GREETING = "Hi, I'm matchai. Good to see you. What's on your mind today?";

const FALLBACK =
  "I'm having a little trouble reaching the server right now. Take a slow breath and try again in a moment. I'll be here.";

const CHIPS = [
  "I'm feeling overwhelmed",
  "Help me unwind",
  "Guide me through a breath",
];

function Dots() {
  return (
    <div className="flex self-start gap-1 rounded-t-2xl rounded-br-2xl rounded-bl bg-bg2 px-3.5 py-3">
      {[0, 0.2, 0.4].map((d) => (
        <div
          key={d}
          className="h-1.5 w-1.5 animate-dots rounded-full bg-soft"
          style={{ animationDelay: d + "s" }}
        />
      ))}
    </div>
  );
}

// matchai is a calm voice, no emoji in replies
const EMOJI =
  /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{20E3}\u{1F3FB}-\u{1F3FF}]/gu;

function stripEmoji(text) {
  return String(text).replace(EMOJI, "").replace(/[ \t]{2,}/g, " ").trim();
}

function Bubble({ role, text, small, typing }) {
  const mine = role === "user";
  return (
    <div
      className={
        "max-w-[85%] whitespace-pre-wrap px-3.5 py-2.5 leading-normal " +
        (small ? "text-[13.5px] " : "text-sm ") +
        (mine
          ? "self-end rounded-t-2xl rounded-bl-2xl rounded-br bg-deep text-[#253317]"
          : "self-start rounded-t-2xl rounded-br-2xl rounded-bl bg-bg2 text-ink")
      }
    >
      {text}
      {typing && (
        <span className="ml-[1px] inline-block h-[1em] w-[2px] translate-y-[2px] animate-blink bg-current align-baseline" />
      )}
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

  // types the newest reply out one letter at a time
  useEffect(() => {
    const i = msgs.length - 1;
    const m = msgs[i];
    if (!m || m.role !== "assistant" || m.shown >= m.text.length) return;
    const t = setTimeout(() => {
      setMsgs((ms) =>
        ms.map((x, j) =>
          j === i ? { ...x, shown: Math.min(x.text.length, x.shown + 2) } : x
        )
      );
    }, 18);
    return () => clearTimeout(t);
  }, [msgs]);

  const sendText = useCallback(
    async (text) => {
      if (!text || busy) return;
      setMsgs((m) => [...m, { role: "user", text }]);
      setBusy(true);
      try {
        const reply = await askMatchai(text);
        setMsgs((m) => [
          ...m,
          { role: "assistant", text: stripEmoji(reply), shown: 0 },
        ]);
      } catch (e) {
        setMsgs((m) => [...m, { role: "assistant", text: FALLBACK, shown: 0 }]);
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

  const thread = (small) => (
    <div
      ref={scrollRef}
      className={
        "flex flex-1 flex-col gap-2.5 overflow-y-auto " +
        (small ? "px-4 py-3.5" : "px-[18px] py-4")
      }
    >
      <Bubble role="assistant" text={greeting} small={small} />
      {msgs.map((m, i) => {
        const partial = m.shown == null ? m.text : m.text.slice(0, m.shown);
        return (
          <Bubble
            key={i}
            role={m.role}
            text={partial}
            small={small}
            typing={m.shown != null && m.shown < m.text.length}
          />
        );
      })}
      {busy && <Dots />}
    </div>
  );

  const inputRow = (small) => (
    <div
      className={
        "flex gap-2 border-t border-line " + (small ? "px-3 py-2.5" : "px-3.5 py-3")
      }
    >
      <input
        ref={inputRef}
        onKeyDown={onKey}
        placeholder={
          small ? "What's on your mind?" : "Tell matchai what's on your mind…"
        }
        className={
          "flex-1 rounded-xl border border-line bg-bg font-sans text-ink outline-none " +
          (small ? "px-3 py-2 text-[13.5px]" : "px-3.5 py-2.5 text-sm")
        }
      />
      <button
        type="button"
        onClick={sendFromInput}
        className={
          "cursor-pointer rounded-xl border-none bg-deep font-sans font-semibold text-[#253317] " +
          (small ? "px-4 py-2 text-[13px]" : "px-4 py-2.5 text-[13.5px]")
        }
      >
        Send
      </button>
    </div>
  );

  if (mode === "inline") {
    return (
      <div
        className={
          "flex h-full w-full flex-col overflow-hidden font-sans " +
          (flush
            ? "min-h-0 border-none"
            : "min-h-[420px] rounded-[22px] border border-line bg-card")
        }
        style={
          flush
            ? { background: "color-mix(in srgb, var(--m-card) 82%, transparent)" }
            : undefined
        }
      >
        <div
          className="flex items-center gap-3 border-b border-line px-[18px] py-3.5 backdrop-blur"
          style={{ background: "color-mix(in srgb, var(--m-bg2) 90%, transparent)" }}
        >
          <div className="flex flex-col items-start gap-px">
            <div className="font-serif text-[19px] font-semibold text-ink">
              matchai
            </div>
            <div className="text-xs text-soft">
              wellness chat, vent or relieve stress
            </div>
          </div>
        </div>

        {thread(false)}

        {msgs.length === 0 && (
          <div className="flex flex-wrap gap-2 px-[18px] pb-3">
            {CHIPS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => sendText(c)}
                className="cursor-pointer rounded-full border border-line bg-card px-3.5 py-[7px] font-sans text-[12.5px] text-soft"
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {inputRow(false)}

        <div className="px-[18px] pb-2.5 text-[10.5px] text-soft opacity-75">
          matchai is not a replacement for therapy. In crisis? Call or text 988
          (U.S.).
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-[22px] right-[22px] z-[900] flex flex-col items-end gap-3 font-sans">
      {open && (
        <div className="flex h-[min(520px,calc(100vh-120px))] w-[min(370px,calc(100vw-44px))] flex-col overflow-hidden rounded-[22px] border border-line bg-card">
          <div className="flex items-center gap-2.5 border-b border-line bg-bg2 px-4 py-3">
            <div className="font-serif text-[18px] font-semibold text-ink">
              matchai
            </div>
            <div className="text-[11.5px] text-soft">here to listen</div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="ml-auto cursor-pointer border-none bg-transparent px-1.5 py-0.5 text-base text-soft"
            >
              ✕
            </button>
          </div>

          {thread(true)}
          {inputRow(true)}

          <div className="px-4 pb-2 text-[10px] text-soft opacity-75">
            Not a replacement for therapy. In crisis? Call or text 988 (U.S.).
          </div>
        </div>
      )}

      {!open && (
        <div className="rounded-t-[14px] rounded-bl-[14px] rounded-br border border-line bg-card px-3.5 py-2 text-[12.5px] text-ink">
          Want to talk? I'm right here.
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Chat with matchai"
        className="relative h-16 w-16 cursor-pointer border-none bg-transparent p-0 text-accent"
      >
        <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2">
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
