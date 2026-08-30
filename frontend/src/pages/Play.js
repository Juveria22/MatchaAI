import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ChatWidget from "../components/ChatWidget";
import Leaderboard, { SCORING } from "../components/Leaderboard";
import { GameTiles, GAME_BY_ID } from "../components/GameTiles";
import WhiskGame from "../games/WhiskGame";
import LeafCatch from "../games/LeafCatch";
import MemoryMatch from "../games/MemoryMatch";
import PearlPop from "../games/PearlPop";
import ZenGarden from "../games/ZenGarden";
import BreathingCup from "../games/BreathingCup";

const SOON = [
  {
    tag: "accounts",
    title: "Account-based access and memory",
    body:
      "Sign in and matchai picks up where you left off, carrying your history between visits and devices.",
  },
  {
    tag: "research",
    title: "A model that fetches new matcha papers",
    body:
      "A program that tracks the latest academic literature on matcha and surfaces what is worth reading.",
  },
  {
    tag: "game",
    title: "Juvi's Matcharia Cafe",
    body:
      "A Papa's-games-inspired cafe sim: take orders, whisk, layer, and serve matcha drinks under a ticking clock.",
  },
  {
    tag: "journal",
    title: "A journal page that keeps your entries",
    body:
      "Write a few lines whenever you like, and look back at what you have written over time.",
  },
];

function GameBoard({ id, pace, onFinish }) {
  if (id === "whisk") return <WhiskGame onFinish={onFinish} />;
  if (id === "catch") return <LeafCatch pace={pace} onFinish={onFinish} />;
  if (id === "memory") return <MemoryMatch onFinish={onFinish} />;
  if (id === "pearl") return <PearlPop pace={pace} onFinish={onFinish} />;
  if (id === "zen") return <ZenGarden />;
  if (id === "breath") return <BreathingCup />;
  return null;
}

export default function Play({ pace = 1 }) {
  const { hash } = useLocation();
  const [game, setGame] = useState(null);
  const [score, setScore] = useState(null);

  // /play#whisk opens a game straight away, the home page links like that
  useEffect(() => {
    const h = (hash || "").replace("#", "");
    if (GAME_BY_ID(h)) {
      setGame(h);
      setScore(null);
    }
  }, [hash]);

  const open = (id) => {
    setGame(id);
    setScore(null);
  };

  const meta = game ? GAME_BY_ID(game) : null;
  const scorable = game ? !!SCORING[game] : false;

  return (
    <div className="relative min-h-screen font-sans text-ink">
      <div className="pointer-events-none fixed inset-0 z-0">
        <img
          src="/uploads/IMG_6739.JPG"
          alt=""
          className="h-full w-full object-cover opacity-50"
          style={{ filter: "saturate(.85)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in srgb, var(--m-bg) 62%, transparent) 0%, color-mix(in srgb, var(--m-bg) 85%, transparent) 55%, color-mix(in srgb, var(--m-bg) 95%, transparent) 100%)",
          }}
        />
      </div>

      <div className="relative z-[1]">
        <header className="flex flex-col items-center px-6 pb-2.5 pt-[110px] text-center">
          <h1 className="font-script text-[clamp(42px,6vw,68px)] leading-tight">
            The Calm Corner
          </h1>
          <p className="mt-2.5 max-w-[520px] text-base text-soft">
            Six small games. Four keep a score, two never will.
          </p>
        </header>

        {meta && (
          <section className="mx-auto mt-[26px] max-w-[720px] px-6">
            <div
              className="rounded-3xl border border-line px-[22px] pb-6 pt-5 backdrop-blur-md"
              style={{
                background: "color-mix(in srgb, var(--m-card) 92%, transparent)",
              }}
            >
              <div className="mb-3.5 flex items-baseline gap-3.5">
                <button
                  type="button"
                  onClick={() => setGame(null)}
                  className="m-pill"
                >
                  ← all games
                </button>
                <h2 className="font-script text-[30px] leading-tight">
                  {meta.title}
                </h2>
                <span className="ml-auto text-[13px] text-soft">{meta.hint}</span>
              </div>

              <GameBoard id={game} pace={pace} onFinish={setScore} />

              {scorable && <Leaderboard game={game} score={score} />}
            </div>
          </section>
        )}

        <section className="mx-auto mt-[30px] max-w-[1140px] px-8 pb-20">
          <div className="flex items-center gap-3.5">
            <h2 className="font-sans text-2xl font-semibold tracking-[-.2px]">
              All Games
            </h2>
            <span className="ml-auto font-sans text-xs text-soft">6 games</span>
          </div>

          <GameTiles onPick={open} />

          <p className="mt-[26px] px-0.5 text-[13px] text-soft">
            Games not helping today?{" "}
            <Link to="/resources" className="underline">
              Support resources
            </Link>
            , or talk to matchai from the bubble in the corner.
          </p>
        </section>

        <section className="mx-auto max-w-[1120px] px-8 pb-[76px] pt-2.5">
          <div className="flex flex-wrap items-baseline gap-4">
            <h2 className="font-script text-[clamp(34px,4.2vw,52px)] leading-[1.12]">
              Coming soon
            </h2>
            <span className="ml-auto text-[11px] uppercase tracking-[2.5px] text-soft">
              in the works
            </span>
          </div>
          <p
            className="mb-[26px] mt-2.5 max-w-[60ch] text-[15.5px] text-soft"
            style={{ textWrap: "pretty" }}
          >
            Four things being built next for matchai.
          </p>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
            {SOON.map((s) => (
              <div key={s.tag} className="m-glass p-6">
                <div className="flex items-center gap-2.5 text-[11px] uppercase tracking-[2px] text-soft">
                  <span className="h-[7px] w-[7px] flex-none rounded-full bg-accent" />
                  {s.tag}
                </div>
                <div className="mt-3 font-script text-[30px] leading-[1.25]">
                  {s.title}
                </div>
                <p
                  className="mt-2 text-sm leading-[1.6] text-soft"
                  style={{ textWrap: "pretty" }}
                >
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <ChatWidget mode="floating" />
      </div>
    </div>
  );
}
