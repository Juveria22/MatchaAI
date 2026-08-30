import { useCallback, useEffect, useRef, useState } from "react";

const DRINKS = [
  { name: "matcha latte", top: "#8AD45A", bottom: "#F5F0E0", edge: "#4FB227" },
  { name: "strawberry", top: "#E8A5B0", bottom: "#FBEFF0", edge: "#D98A98" },
  { name: "brown boba", top: "#B08A66", bottom: "#EFE3D3", edge: "#96714C" },
  { name: "hojicha", top: "#A9805B", bottom: "#F3E9DC", edge: "#8A6543" },
  { name: "ube cream", top: "#A08BC0", bottom: "#F1ECF8", edge: "#8672A8" },
  { name: "yuzu fizz", top: "#E3C36A", bottom: "#FBF4DF", edge: "#C9A946" },
];

function shuffled() {
  return [...DRINKS, ...DRINKS]
    .map((d, i) => ({ ...d, key: i }))
    .sort(() => Math.random() - 0.5);
}

// flip two cards, find the pair, six pairs
// score is how many seconds it takes to clear the board
export default function MemoryMatch({ onFinish }) {
  const [state, setState] = useState(null);
  const [elapsed, setElapsed] = useState(null);
  const startedAt = useRef(0);
  const finishRef = useRef(onFinish);
  finishRef.current = onFinish;

  const build = useCallback(() => {
    startedAt.current = 0;
    setElapsed(null);
    setState({ deck: shuffled(), up: [], matched: {}, moves: 0, lock: false });
  }, []);

  useEffect(build, [build]);

  const flip = (i) => {
    const m = state;
    if (!m || m.lock || m.up.includes(i) || m.matched[m.deck[i].name]) return;
    if (!startedAt.current) startedAt.current = performance.now();

    const up = [...m.up, i];
    if (up.length < 2) {
      setState({ ...m, up });
      return;
    }
    const match = m.deck[up[0]].name === m.deck[up[1]].name;
    if (match) {
      const matched = { ...m.matched, [m.deck[i].name]: true };
      setState({ ...m, up: [], matched, moves: m.moves + 1 });
      if (Object.keys(matched).length === 6) {
        const secs = Number(((performance.now() - startedAt.current) / 1000).toFixed(1));
        setElapsed(secs);
        if (finishRef.current) finishRef.current(secs);
      }
    } else {
      setState({ ...m, up, moves: m.moves + 1, lock: true });
      setTimeout(
        () => setState((s) => (s ? { ...s, up: [], lock: false } : s)),
        850
      );
    }
  };

  if (!state) return null;

  const pairs = Object.keys(state.matched).length;
  const status =
    pairs === 6
      ? "cleared in " + elapsed + "s, " + state.moves + " moves ♡"
      : pairs + " of 6 pairs, " + state.moves + " moves";

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-[repeat(4,84px)] justify-center gap-3">
        {state.deck.map((c, i) => {
          const revealed = state.up.includes(i) || state.matched[c.name];
          return (
            <div
              key={c.key}
              onClick={() => flip(i)}
              className="relative h-[106px] w-[84px] cursor-pointer"
            >
              <div
                className="absolute inset-0 items-center justify-center rounded-[14px] bg-accent"
                style={{ display: revealed ? "none" : "flex" }}
              >
                <div className="h-6 w-4 -rotate-[14deg] rounded-tr-full rounded-bl-full bg-[rgba(252,251,245,.6)]" />
              </div>

              <div
                className="absolute inset-0 flex-col items-center justify-center gap-[7px] rounded-[14px] border-[1.5px] bg-card"
                style={{
                  display: revealed ? "flex" : "none",
                  borderColor: c.edge,
                }}
              >
                <div className="relative h-12 w-[38px]">
                  <div
                    className="absolute left-1/2 top-[-9px] h-[17px] w-[3px] rounded-sm"
                    style={{
                      background: c.edge,
                      transform: "translateX(4px) rotate(9deg)",
                    }}
                  />
                  <div
                    className="absolute inset-0 rounded-t-[6px] rounded-b-[13px] border-[1.5px] border-[rgba(43,43,43,.45)]"
                    style={{
                      background:
                        "linear-gradient(180deg, " +
                        c.top +
                        " 46%, " +
                        c.bottom +
                        " 46%)",
                    }}
                  >
                    <div className="absolute left-2 top-[21px] h-1 w-1 rounded-full bg-[#2B2B2B]" />
                    <div className="absolute right-2 top-[21px] h-1 w-1 rounded-full bg-[#2B2B2B]" />
                    <div className="absolute left-1/2 top-[27px] h-1 w-2 -translate-x-1/2 rounded-b-lg border-b-[1.5px] border-[#2B2B2B]" />
                  </div>
                </div>
                <div className="text-[10.5px] text-soft">{c.name}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-4 font-sans text-[13.5px] text-soft">
        <span>{status}</span>
        <button type="button" onClick={build} className="m-pill">
          shuffle again
        </button>
      </div>
    </div>
  );
}
