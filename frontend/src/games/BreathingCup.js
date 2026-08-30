import { useCallback, useEffect, useRef, useState } from "react";

const PHASES = [
  ["Breathe in", 4, 1.32],
  ["Hold", 4, 1.32],
  ["Breathe out", 6, 1],
];

const READY = {
  on: false,
  label: "Ready when you are",
  sub: "in 4, hold 4, out 6",
  scale: 1,
  dur: 1,
};

// 4-4-6 breathing, paced by the circle
export default function BreathingCup() {
  const [br, setBr] = useState(READY);
  const timers = useRef([]);

  const clear = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => clear, [clear]);

  const phase = useCallback(
    (i, cycles) => {
      const [label, dur, scale] = PHASES[i];
      setBr({
        on: true,
        label,
        sub: dur + " seconds, cycle " + (cycles + 1),
        scale,
        dur: i === 1 ? 0.1 : dur,
      });
      timers.current.push(
        setTimeout(
          () => phase((i + 1) % 3, i === 2 ? cycles + 1 : cycles),
          dur * 1000
        )
      );
    },
    []
  );

  const toggle = () => {
    if (br.on) {
      clear();
      setBr({
        on: false,
        label: "Nicely done",
        sub: "come back any time",
        scale: 1,
        dur: 2,
      });
    } else {
      phase(0, 0);
    }
  };

  const ease = "cubic-bezier(.45,0,.55,1)";

  return (
    <div className="flex flex-col items-center gap-5 pb-2 pt-4">
      <div className="relative flex h-[280px] w-[280px] items-center justify-center">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(125,163,92,.28), rgba(125,163,92,.06) 70%)",
            transform: "scale(" + br.scale + ")",
            transition: "transform " + br.dur + "s " + ease,
          }}
        />
        <div
          className="absolute inset-[44px] rounded-full border-[1.5px] border-line bg-card"
          style={{
            transform: "scale(" + br.scale + ")",
            transition: "transform " + br.dur + "s " + ease,
          }}
        />
        <div
          className="flex h-[66px] w-[66px] items-center justify-center rounded-full opacity-95"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, #DCE8CB, var(--m-accent))",
          }}
        >
          <svg
            viewBox="0 0 48 48"
            width="42"
            height="42"
            role="img"
            aria-label="Calm closed eyes"
            fill="none"
            stroke="#26401A"
            strokeWidth="2.4"
            strokeLinecap="round"
          >
            <path d="M14.5 20.5c1.7 2.4 4.9 2.4 6.6 0" />
            <path d="M26.9 20.5c1.7 2.4 4.9 2.4 6.6 0" />
            <path d="M19.6 29.6c2.5 2.1 5.9 2.1 8.4 0" />
          </svg>
        </div>
      </div>

      <div className="text-center">
        <div className="font-sans text-2xl font-bold">{br.label}</div>
        <div className="mt-1 text-sm text-soft">{br.sub}</div>
      </div>

      <button type="button" onClick={toggle} className="m-btn text-[14.5px]">
        {br.on ? "rest" : "begin"}
      </button>
    </div>
  );
}
