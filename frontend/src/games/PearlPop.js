import { useCallback, useEffect, useRef, useState } from "react";

const SLOTS = 14;
const MISS_LIMIT = 10;

function blank() {
  return Array.from({ length: SLOTS }, (_, i) => ({
    id: i,
    active: false,
    popped: false,
    alt: false,
    left: 50,
    size: 34,
    dur: 8,
    pastel: false,
  }));
}

// pearls float up from the bottom, tap them, ten missed ends the round
// score is how many you popped
export default function PearlPop({ pace = 1, onFinish }) {
  const [pearls, setPearls] = useState(blank);
  const [popped, setPopped] = useState(0);
  const [missed, setMissed] = useState(0);
  const [over, setOver] = useState(false);
  const lastSpawn = useRef(0);
  const paceRef = useRef(pace);
  paceRef.current = pace;
  const poppedRef = useRef(0);
  poppedRef.current = popped;
  const finishRef = useRef(onFinish);
  finishRef.current = onFinish;

  const reset = useCallback(() => {
    setPearls(blank());
    setPopped(0);
    setMissed(0);
    setOver(false);
  }, []);

  useEffect(() => {
    if (over) return;
    let raf;
    const tick = (now) => {
      if (now - lastSpawn.current > 950 / paceRef.current) {
        lastSpawn.current = now;
        setPearls((ps) => {
          const i = ps.findIndex((p) => !p.active);
          if (i < 0) return ps;
          const next = ps.slice();
          next[i] = {
            ...next[i],
            active: true,
            popped: false,
            alt: !next[i].alt,
            left: 5 + Math.random() * 85,
            size: 30 + Math.random() * 26,
            dur: (8 - Math.random() * 2.5) / paceRef.current,
          };
          return next;
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [over]);

  const pop = (id) => {
    setPearls((ps) =>
      ps.map((p) => (p.id === id && !p.popped ? { ...p, popped: true } : p))
    );
    setPopped((n) => n + 1);
  };

  const retire = (id) => {
    setPearls((ps) => {
      const p = ps.find((q) => q.id === id);
      if (p && p.active && !p.popped) {
        setMissed((m) => {
          const next = m + 1;
          if (next >= MISS_LIMIT) {
            setOver(true);
            if (finishRef.current) finishRef.current(poppedRef.current);
          }
          return next;
        });
      }
      return ps.map((q) =>
        q.id === id ? { ...q, active: false, popped: false } : q
      );
    });
  };

  useEffect(() => {
    if (over) setPearls((ps) => ps.map((p) => ({ ...p, active: false })));
  }, [over]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative h-[420px] w-full max-w-[1140px] overflow-hidden rounded-[18px] bg-gradient-to-b from-[#F3EBDD] to-[#EAD9C4]">
        {pearls.map((p) => (
          <div
            key={p.id}
            onPointerDown={() => pop(p.id)}
            onAnimationEnd={() => retire(p.id)}
            className="absolute bottom-[-70px] cursor-pointer rounded-full"
            style={{
              display: p.active ? "block" : "none",
              left: p.left + "%",
              width: p.size,
              height: p.size,
              background: p.pastel
                ? "radial-gradient(circle at 35% 30%, #F5C9CF, #E8A5B0)"
                : "radial-gradient(circle at 35% 30%, #6B5442, #3A2E24)",
              boxShadow: "inset -4px -5px 8px rgba(0,0,0,.28)",
              animation: p.popped
                ? "m-pop .25s ease forwards"
                : (p.alt ? "m-rise2 " : "m-rise ") + p.dur + "s linear forwards",
            }}
          >
            <div className="absolute left-[22%] top-[16%] h-[18%] w-[28%] -rotate-[20deg] rounded-full bg-white/60" />
          </div>
        ))}

        <div className="absolute left-3.5 top-3 rounded-full bg-[rgba(252,251,245,.85)] px-3.5 py-1.5 text-[13px] text-[#2B3A26]">
          popped, {popped}, missed {missed} of {MISS_LIMIT}
        </div>

        {over && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3.5 bg-[rgba(252,251,245,.86)] text-[#2B3A26]">
            <div className="font-script text-[38px] leading-tight">
              ten slipped by
            </div>
            <div className="font-sans text-sm text-[#5B6B4E]">
              you popped {popped} along the way ♡
            </div>
            <button type="button" onClick={reset} className="m-btn">
              pour another cup
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
