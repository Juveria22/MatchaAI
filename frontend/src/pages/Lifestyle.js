import { Link } from "react-router-dom";
import ChatWidget from "../components/ChatWidget";
import { GameTiles } from "../components/GameTiles";

const serif = "'Cormorant Garamond', Georgia, 'Times New Roman', serif";
const script = "'Parisienne', cursive";
const jost = "'Jost', sans-serif";

const eyebrow = {
  fontFamily: jost,
  fontSize: 10.5,
  fontWeight: 400,
  letterSpacing: 3.4,
  textTransform: "uppercase",
  color: "var(--m-soft)",
};

const RITUALS = [
  {
    name: "The Pour",
    img: "/uploads/IMG_5307.JPG",
    alt: "Tall iced matcha topped with a dusting of matcha",
    objectPosition: undefined,
    body:
      "Water and matcha meet here. In chanoyu, the tea ceremony, water is cooled to about 70 to 80°C before it touches the powder. Cooler water keeps the tea sweet and rounded; boiling water scorches it and turns it bitter.",
  },
  {
    name: "The Whisk",
    img: "/uploads/IMG_5296.JPG",
    alt: "Whisking matcha in a ceramic bowl",
    objectPosition: undefined,
    body:
      'The chasen is cut from a single length of bamboo, a design refined in 16th-century Japan. Brisk "W" strokes fold air into the tea until it turns bright and frothy. Evenness, not speed, is the mark of a bowl made with care.',
  },
  {
    name: "The Pause",
    img: "/uploads/IMG_4249-87eab6c2.JPG",
    alt: "Layered iced matcha in a mason jar held up to the light",
    objectPosition: "50% 58%",
    body:
      'Before drinking, the bowl is turned and cradled in both hands. Chanoyu calls this spirit ichigo ichie, "one time, one meeting", a reminder that this exact cup will never come again. The pause is the ceremony, not a break from it.',
  },
];

const JOURNAL = [
  {
    href: "https://hsph.harvard.edu/news/matcha-brain-heart-gut-health/",
    img: "/uploads/IMG_1588-0778db98.JPG",
    alt: "Layered iced matcha latte in a mason jar beside roses in a glass vase",
    objectPosition: "50% 62%",
    kicker: "wellness, Harvard T.H. Chan",
    title: "What a daily cup of matcha may do for you",
    body:
      "Harvard nutrition researchers on matcha's links to brain, heart, and gut health.",
  },
  {
    href: "https://health.clevelandclinic.org/4-7-8-breathing",
    img: "/uploads/IMG_6507.JPG",
    alt: "Iced matcha topped with rose petals on a lace table",
    kicker: "mind, Cleveland Clinic",
    title: "The 4-7-8 breath, step by step",
    body:
      "A simple way to lengthen the exhale and settle the nervous system.",
  },
  {
    href:
      "https://www.healthline.com/health/microbreaks-health-benefits-work-from-home",
    img: "/uploads/IMG_1755.JPG",
    alt: "Iced matcha with a glass straw beside waxflowers",
    objectPosition: "50% 88%",
    kicker: "ritual, Healthline",
    title: "Why tiny breaks matter more than you think",
    body: "The case for stepping away for a few minutes, backed by the research.",
  },
];

export default function Lifestyle() {
  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: serif,
        color: "var(--m-ink)",
      }}
    >
      {/* HERO */}
      <section
        style={{
          position: "relative",
          minHeight: "86vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "96px 32px 88px",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0 }}>
          <img
            src="/uploads/IMG_5105.JPG"
            alt="A glass of iced matcha ringed with pink roses"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "100% 30%",
              transform: "scale(1.05) translateX(-2%)",
              filter: "saturate(1.2) contrast(1.06) brightness(1.05)",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(48,40,32,.4) 0%, rgba(48,40,32,.22) 40%, color-mix(in srgb, var(--m-bg) 82%, transparent) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: 1140,
          }}
        >
          <div
            style={{
              fontFamily: jost,
              fontSize: 11,
              letterSpacing: 4.5,
              textTransform: "uppercase",
              color: "#F3E7DA",
            }}
          >
            mind over matter
          </div>
          <h1
            style={{
              margin: "18px 0 0",
              fontFamily: script,
              fontWeight: 400,
              fontSize: "clamp(52px, 7.4vw, 104px)",
              lineHeight: 1.06,
              color: "#FFFFFF",
              textWrap: "balance",
              textShadow: "0 2px 30px rgba(0,0,0,.35)",
            }}
          >
            A living practice for a calmer mind
          </h1>
          <p
            style={{
              margin: "22px 0 0",
              maxWidth: "46ch",
              fontSize: 21,
              lineHeight: 1.55,
              fontStyle: "italic",
              color: "rgba(255,252,246,.94)",
              textShadow: "0 1px 18px rgba(0,0,0,.4)",
              textWrap: "pretty",
            }}
          >
            Enjoy articles, mini games, and small breaks with matchai.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 12,
              marginTop: 38,
            }}
          >
            <a
              href="#ritual"
              className="m-cta-solid"
              style={{
                background: "var(--m-deep)",
                border: "1.5px solid var(--m-deep)",
                color: "#253317",
                borderRadius: 999,
                padding: "14px 32px",
                fontFamily: jost,
                fontSize: 11.5,
                letterSpacing: 2.6,
                textTransform: "uppercase",
              }}
            >
              Begin the ritual
            </a>
            <Link
              to="/matchai"
              className="m-cta-ghost"
              style={{
                border: "1.5px solid rgba(255,255,255,.85)",
                color: "#FFFFFF",
                background: "rgba(40,34,28,.52)",
                backdropFilter: "blur(6px)",
                borderRadius: 999,
                padding: "14px 32px",
                fontFamily: jost,
                fontSize: 11.5,
                letterSpacing: 2.6,
                textTransform: "uppercase",
              }}
            >
              Talk to matchai
            </Link>
          </div>
        </div>
      </section>

      {/* RITUAL */}
      <section
        id="ritual"
        style={{ maxWidth: 1140, margin: "0 auto", padding: "84px 32px 40px" }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={eyebrow}>the ritual</div>
          <h2
            style={{
              margin: "10px 0 0",
              fontFamily: script,
              fontWeight: 400,
              fontSize: "clamp(40px, 5.2vw, 66px)",
              lineHeight: 1.12,
            }}
          >
            A few slow minutes, every day
          </h2>
          <p
            style={{
              margin: "14px auto 0",
              maxWidth: "50ch",
              color: "var(--m-soft)",
              fontSize: 18,
              lineHeight: 1.7,
              textWrap: "pretty",
            }}
          >
            Three slow steps that turn making a drink into an actual break.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 22,
            marginTop: 48,
          }}
        >
          {RITUALS.map((r) => (
            <div key={r.name}>
              <div
                className="m-reveal"
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "2 / 3",
                  borderRadius: 4,
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                <div
                  className="m-reveal-strip"
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <img
                    src={r.img}
                    alt={r.alt}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      flex: "none",
                      objectFit: "cover",
                      objectPosition: r.objectPosition,
                    }}
                  />
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      flex: "none",
                      boxSizing: "border-box",
                      background: "var(--m-card)",
                      border: "1px solid var(--m-line)",
                      padding: "34px 30px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      gap: 14,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: jost,
                        fontSize: 10,
                        letterSpacing: 2.8,
                        textTransform: "uppercase",
                        color: "var(--m-soft)",
                      }}
                    >
                      why it matters
                    </div>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "clamp(16px, 1.5vw, 19.5px)",
                        lineHeight: 1.72,
                        color: "var(--m-ink)",
                        textWrap: "pretty",
                      }}
                    >
                      {r.body}
                    </p>
                  </div>
                </div>
              </div>
              <div
                style={{
                  marginTop: 16,
                  textAlign: "center",
                  fontSize: 27,
                  fontWeight: 500,
                  fontStyle: "italic",
                  letterSpacing: 0.2,
                }}
              >
                {r.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* JOURNAL */}
      <section
        style={{ maxWidth: 1140, margin: "0 auto", padding: "64px 32px" }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={eyebrow}>the journal</div>
          <h2
            style={{
              margin: "10px 0 0",
              fontFamily: script,
              fontWeight: 400,
              fontSize: "clamp(36px, 4.6vw, 56px)",
              lineHeight: 1.12,
            }}
          >
            Notes on slow living
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 22,
            marginTop: 32,
          }}
        >
          {JOURNAL.map((a) => (
            <a
              key={a.href}
              href={a.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                background: "var(--m-card)",
                border: "1px solid var(--m-line)",
                borderRadius: 4,
                overflow: "hidden",
                color: "var(--m-ink)",
              }}
            >
              <img
                src={a.img}
                alt={a.alt}
                loading="lazy"
                style={{
                  display: "block",
                  width: "100%",
                  aspectRatio: "3 / 2",
                  objectFit: "cover",
                  objectPosition: a.objectPosition,
                }}
              />
              <div style={{ padding: "22px 22px 26px", textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: jost,
                    fontSize: 10,
                    letterSpacing: 2.4,
                    textTransform: "uppercase",
                    color: "var(--m-soft)",
                  }}
                >
                  {a.kicker}
                </div>
                <div
                  style={{
                    marginTop: 8,
                    fontFamily: serif,
                    fontSize: 27,
                    fontWeight: 500,
                    lineHeight: 1.22,
                  }}
                >
                  {a.title}
                </div>
                <p
                  style={{
                    margin: "9px 0 0",
                    fontSize: 15.5,
                    lineHeight: 1.55,
                    color: "var(--m-soft)",
                  }}
                >
                  {a.body}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* LITTLE GAMES */}
      <section
        style={{
          background: "var(--m-bg2)",
          borderTop: "1px solid var(--m-line)",
          borderBottom: "1px solid var(--m-line)",
        }}
      >
        <div
          style={{ maxWidth: 1140, margin: "0 auto", padding: "58px 32px 62px" }}
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
              Little Games
            </h2>
            <Link
              to="/play"
              style={{
                fontFamily: jost,
                fontSize: 13,
                fontWeight: 500,
                color: "var(--m-accent)",
              }}
            >
              See All
            </Link>
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
          <GameTiles LinkComponent={Link} />
        </div>
      </section>

      {/* CHAT */}
      <section
        style={{ maxWidth: 1000, margin: "0 auto", padding: "76px 32px 84px" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div style={eyebrow}>matchai</div>
          <h2
            style={{
              margin: "10px 0 0",
              fontFamily: script,
              fontWeight: 400,
              fontSize: "clamp(38px, 4.8vw, 58px)",
              lineHeight: 1.14,
            }}
          >
            matchai, whenever you need it
          </h2>
          <p
            style={{
              margin: "16px 0 0",
              maxWidth: "48ch",
              fontSize: 19,
              lineHeight: 1.7,
              fontStyle: "italic",
              color: "var(--m-soft)",
              textWrap: "pretty",
            }}
          >
            matchai is a chat away on every page. Bring a messy thought, a rough
            afternoon, or nothing at all.
          </p>
          <div
            style={{
              display: "grid",
              width: "100%",
              maxWidth: 680,
              minHeight: 520,
              marginTop: 34,
            }}
          >
            <ChatWidget mode="inline" />
          </div>
          <p
            style={{
              margin: "18px 0 0",
              fontSize: 12,
              color: "var(--m-soft)",
              opacity: 0.8,
            }}
          >
            Not a replacement for therapy or professional care. In crisis, see{" "}
            <Link to="/resources" style={{ textDecoration: "underline" }}>
              resources
            </Link>
            .
          </p>
        </div>
      </section>

      <footer
        style={{
          borderTop: "1px solid var(--m-line)",
          background: "var(--m-bg2)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            maxWidth: 1140,
            margin: "0 auto",
            padding: 38,
            fontFamily: jost,
            fontSize: 12,
            letterSpacing: 1.2,
            color: "var(--m-soft)",
            textAlign: "center",
          }}
        >
          <span
            style={{ fontFamily: script, fontSize: 30, color: "var(--m-ink)" }}
          >
            matchai
          </span>
          <span>© 2026, made for slow days</span>
          <div style={{ display: "flex", gap: 18 }}>
            <Link to="/matchai" className="m-navlink">
              matchai
            </Link>
            <Link to="/play" className="m-navlink">
              Play
            </Link>
            <Link to="/resources" className="m-navlink">
              Resources
            </Link>
          </div>
        </div>
      </footer>

      <ChatWidget mode="floating" />
    </div>
  );
}
