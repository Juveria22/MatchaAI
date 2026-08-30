import { useCallback, useEffect, useState } from "react";
import { getLeaderboard, postScore, savedName, rememberName } from "../api";

// whisk and memory score in seconds, lower wins. catch and pearl score a count
export const SCORING = {
  whisk: { kind: "time", label: "fastest froth", unit: "s" },
  memory: { kind: "time", label: "fastest clear", unit: "s" },
  catch: { kind: "count", label: "most gathered", unit: "" },
  pearl: { kind: "count", label: "most popped", unit: "" },
};

function fmt(score, kind) {
  if (kind === "time") return Number(score).toFixed(1) + "s";
  return String(Math.round(score));
}

// top five for one game, plus a save row when you just finished a round
export default function Leaderboard({ game, score = null, onSaved }) {
  const conf = SCORING[game];
  const [rows, setRows] = useState([]);
  const [name, setName] = useState(savedName);
  const [saved, setSaved] = useState(false);
  const [state, setState] = useState("loading");

  const load = useCallback(async () => {
    try {
      setRows(await getLeaderboard(game));
      setState("ok");
    } catch (e) {
      setState("offline");
    }
  }, [game]);

  useEffect(() => {
    setSaved(false);
    load();
  }, [load, score]);

  if (!conf) return null;

  const save = async () => {
    const who = (name || "anonymous").trim();
    rememberName(who);
    try {
      setRows(await postScore(game, who, score));
      setState("ok");
    } catch (e) {
      setState("offline");
    }
    setSaved(true);
    if (onSaved) onSaved();
  };

  return (
    <div className="mt-4 rounded-2xl border border-line bg-bg2/70 p-4">
      <div className="flex items-baseline gap-3">
        <div className="font-sans text-[13px] font-semibold uppercase tracking-[2px] text-soft">
          {conf.label}
        </div>
        <span className="ml-auto font-sans text-[11.5px] text-soft">top 5</span>
      </div>

      {score !== null && !saved && (
        <div className="mt-3 flex flex-wrap items-center gap-2 rounded-xl border border-line bg-card p-3">
          <span className="font-sans text-[13.5px] text-ink">
            you scored{" "}
            <strong className="font-semibold">{fmt(score, conf.kind)}</strong>
          </span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="your name"
            maxLength={24}
            className="ml-auto w-32 rounded-xl border border-line bg-bg px-3 py-2 font-sans text-[13px] text-ink outline-none"
          />
          <button type="button" onClick={save} className="m-btn text-[13px]">
            save score
          </button>
        </div>
      )}

      {saved && (
        <div className="mt-3 font-sans text-[13px] text-soft">
          saved, nice work ♡
        </div>
      )}

      {state === "offline" ? (
        <div className="mt-3 font-sans text-[13px] text-soft">
          scores are offline right now, the game still works
        </div>
      ) : rows.length === 0 ? (
        <div className="mt-3 font-sans text-[13px] text-soft">
          no scores yet, be the first
        </div>
      ) : (
        <ol className="mt-3 flex flex-col gap-1">
          {rows.map((r, i) => (
            <li
              key={i}
              className="flex items-baseline gap-3 font-sans text-[13.5px] text-ink"
            >
              <span className="w-4 text-soft">{i + 1}</span>
              <span className="truncate">{r.name}</span>
              <span className="ml-auto tabular-nums text-soft">
                {fmt(r.score, conf.kind)}
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
