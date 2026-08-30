import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ChatWidget from "../components/ChatWidget";
import { GameTiles, GAME_BY_ID } from "../components/GameTiles";
import WhiskGame from "../games/WhiskGame";
import LeafCatch from "../games/LeafCatch";
import MemoryMatch from "../games/MemoryMatch";
import PearlPop from "../games/PearlPop";
import ZenGarden from "../games/ZenGarden";
import BreathingCup from "../games/BreathingCup";

const jost = "'Jost', -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";
const script = "'Parisienne', cursive";

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

function GameBoard({ id, pace }) {
  if (id === "whisk") return <WhiskGame />;
  if (id === "catch") return <LeafCatch pace={pace} />;
  if (id === "memory") return <MemoryMatch />;
  if (id === "pearl") return <PearlPop pace={pace} />;
  if (id === "zen") return <ZenGarden />;
  if (id === "breath") return <BreathingCup />;
  return null;
}

export default function Play({ pace = 1 }) {
  const { hash } = useLocation();
  const [game, setGame] = useState(null);

  // /play#whisk opens a game straight away, the home page links like that
  useEffect(() => {
    const h = (hash || "").replace("#", "");
    if (GAME_BY_ID(h)) setGame(h);
  }, [hash]);

  const meta = game ? GAME_BY_ID(game) : null;

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        fontFamily: jost,
        color: "var(--m-ink)",
      }}
    >
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <img
          src="/uploads/IMG_6739.JPG"
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.5,
            filter: "saturate(.85)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, color-mix(in srgb, var(--m-bg) 62%, transparent) 0%, color-mix(in srgb, var(--m-bg) 85%, transparent) 55%, color-mix(in srgb, var(--m-bg) 95%, transparent) 100%)",
          }}
        />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <header
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "110px 24px 10px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontFamily: script,
              fontWeight: 400,
              fontSize: "clamp(42px, 6vw, 68px)",
              lineHeight: 1.1,
            }}
          >
            The Calm Corner
          </h1>
          <p
            style={{
              margin: "10px 0 0",
              color: "var(--m-soft)",
              fontSize: 16,
              maxWidth: 520,
            }}
          >
            Six small games. No timers, no scores, no way to lose.
          </p>
        </header>

        {meta && (
          <section style={{ maxWidth: 720, margin: "26px auto 0", padding: "0 24px" }}>
            <div
              style={{
                background: "color-mix(in srgb, var(--m-card) 92%, transparent)",
                backdropFilter: "blur(10px)",
                border: "1px solid var(--m-line)",
                borderRadius: 24,
                padding: "20px 22px 24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 14,
                  marginBottom: 14,
                }}
              >
                <button
                  type="button"
                  onClick={() => setGame(null)}
                  style={{
                    border: "1px solid var(--m-line)",
                    background: "var(--m-bg)",
                    color: "var(--m-soft)",
                    borderRadius: 999,
                    padding: "7px 14px",
                    fontFamily: jost,
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                >
                  ← all games
                </button>
                <h2
                  style={{
                    margin: 0,
                    fontFamily: script,
                    fontWeight: 400,
                    fontSize: 30,
                    lineHeight: 1.1,
                  }}
                >
                  {meta.title}
                </h2>
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: 13,
                    color: "var(--m-soft)",
                  }}
                >
                  {meta.hint}
                </span>
              </div>

              <GameBoard id={game} pace={pace} />
            </div>
          </section>
        )}

        <section
          style={{ maxWidth: 1140, margin: "30px auto 0", padding: "0 32px 80px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <h2
              style={{
                margin: 0,
                fontFamily: jost,
                fontWeight: 600,
                fontSize: 24,
                letterSpacing: -0.2,
              }}
            >
              All Games
            </h2>
            <span
              style={{
                marginLeft: "auto",
                fontFamily: jost,
                fontSize: 12,
                color: "var(--m-soft)",
              }}
            >
              6 games
            </span>
          </div>

          <GameTiles onPick={setGame} />

          <p style={{ margin: "26px 2px 0", fontSize: 13, color: "var(--m-soft)" }}>
            Games not helping today?{" "}
            <Link to="/resources" style={{ textDecoration: "underline" }}>
              Support resources
            </Link>
            , or talk to matchai from the bubble in the corner.
          </p>
        </section>

        <section
          style={{ maxWidth: 1120, margin: "0 auto", padding: "10px 32px 76px" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontFamily: script,
                fontWeight: 400,
                fontSize: "clamp(34px, 4.2vw, 52px)",
                lineHeight: 1.12,
              }}
            >
              Coming soon
            </h2>
            <span
              style={{
                marginLeft: "auto",
                fontSize: 11,
                letterSpacing: 2.5,
                textTransform: "uppercase",
                color: "var(--m-soft)",
              }}
            >
              in the works
            </span>
          </div>
          <p
            style={{
              margin: "10px 0 26px",
              color: "var(--m-soft)",
              fontSize: 15.5,
              maxWidth: "60ch",
              textWrap: "pretty",
            }}
          >
            Four things being built next for matchai.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 16,
            }}
          >
            {SOON.map((s) => (
              <div
                key={s.tag}
                style={{
                  background: "color-mix(in srgb, var(--m-card) 86%, transparent)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid var(--m-line)",
                  borderRadius: 18,
                  padding: 24,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontSize: 11,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    color: "var(--m-soft)",
                  }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "var(--m-accent)",
                      flex: "none",
                    }}
                  />
                  {s.tag}
                </div>
                <div
                  style={{
                    marginTop: 12,
                    fontFamily: script,
                    fontWeight: 400,
                    fontSize: 30,
                    lineHeight: 1.25,
                  }}
                >
                  {s.title}
                </div>
                <p
                  style={{
                    margin: "8px 0 0",
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "var(--m-soft)",
                    textWrap: "pretty",
                  }}
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
