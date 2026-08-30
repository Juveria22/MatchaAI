import { Link } from "react-router-dom";
import ChatWidget from "../components/ChatWidget";

const jost = "'Jost', -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";
const script = "'Parisienne', cursive";

const card = {
  background: "color-mix(in srgb, var(--m-card) 86%, transparent)",
  backdropFilter: "blur(8px)",
  border: "1px solid var(--m-line)",
  borderRadius: 18,
  padding: "22px 24px",
};

const list = {
  display: "flex",
  flexDirection: "column",
  gap: 9,
  fontSize: 14,
  lineHeight: 1.5,
  color: "var(--m-soft)",
};

const strong = { color: "var(--m-ink)" };
const ul = { textDecoration: "underline" };

export default function Resources() {
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
          src="/uploads/IMG_1588.JPG"
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
        <section
          style={{ maxWidth: 960, margin: "0 auto", padding: "112px 32px 80px" }}
        >
          <h1
            style={{
              margin: 0,
              fontFamily: script,
              fontWeight: 400,
              fontSize: "clamp(42px, 5.6vw, 66px)",
              lineHeight: 1.1,
            }}
          >
            When you need more than matcha
          </h1>
          <p
            style={{
              margin: "14px 0 30px",
              color: "var(--m-soft)",
              fontSize: 15.5,
              lineHeight: 1.65,
              maxWidth: 640,
              textWrap: "pretty",
            }}
          >
            matchai is a nice place to vent and reset, but it isn't therapy. If
            you're in crisis or need real support, please reach out to one of
            these.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 16,
            }}
          >
            <div style={card}>
              <div
                style={{
                  fontFamily: jost,
                  fontWeight: 700,
                  fontSize: 16,
                  marginBottom: 12,
                }}
              >
                Emergency &amp; crisis lines
              </div>
              <div style={list}>
                <div>
                  <strong style={strong}>911 (U.S.)</strong> for any
                  life-threatening emergency
                </div>
                <div>
                  <strong style={strong}>988</strong> Suicide &amp; Crisis
                  Lifeline, call or text,{" "}
                  <a href="https://988lifeline.org" style={ul}>
                    988lifeline.org
                  </a>
                </div>
                <div>
                  <strong style={strong}>Crisis Text Line</strong> text HOME to
                  741741, free 24/7
                </div>
                <div>
                  <strong style={strong}>Veterans Crisis Line</strong> call 988,
                  then press 1
                </div>
                <div>
                  <strong style={strong}>Trans Lifeline</strong> 877-565-8860,{" "}
                  <a href="https://translifeline.org" style={ul}>
                    translifeline.org
                  </a>
                </div>
              </div>
            </div>

            <div style={card}>
              <div
                style={{
                  fontFamily: jost,
                  fontWeight: 700,
                  fontSize: 16,
                  marginBottom: 12,
                }}
              >
                Professional &amp; self-care
              </div>
              <div style={list}>
                <div>
                  <a href="https://www.betterhelp.com" style={ul}>
                    BetterHelp
                  </a>{" "}
                  online therapy with licensed therapists
                </div>
                <div>
                  <a href="https://www.talkspace.com" style={ul}>
                    Talkspace
                  </a>{" "}
                  therapy &amp; psychiatry by chat or video
                </div>
                <div>
                  <a href="https://findahelpline.com" style={ul}>
                    Find a Helpline
                  </a>{" "}
                  global directory of hotlines
                </div>
                <div>
                  <a href="https://openpathcollective.org" style={ul}>
                    Open Path Collective
                  </a>{" "}
                  affordable therapy sessions
                </div>
                <div>
                  <a href="https://www.headspace.com" style={ul}>
                    Headspace
                  </a>{" "}
                  &amp;{" "}
                  <a href="https://www.calm.com" style={ul}>
                    Calm
                  </a>{" "}
                  meditation &amp; sleep
                </div>
              </div>
            </div>
          </div>

          <p style={{ margin: "26px 0 0", fontSize: 13.5, color: "var(--m-soft)" }}>
            matchai can help you pause, breathe, and sort through a rough day.
            For anything heavier, a real human is the right call.
          </p>
        </section>

        <footer style={{ borderTop: "1px solid var(--m-line)" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              flexWrap: "wrap",
              maxWidth: 960,
              margin: "0 auto",
              padding: "26px 32px",
              fontSize: 13,
              color: "var(--m-soft)",
            }}
          >
            <span>© 2026 matchai, a small corner of calm on the internet</span>
            <div style={{ display: "flex", gap: 18, marginLeft: "auto" }}>
              <Link to="/" className="m-navlink">
                Home
              </Link>
              <Link to="/matchai" className="m-navlink">
                matchai
              </Link>
              <Link to="/play" className="m-navlink">
                Play
              </Link>
            </div>
          </div>
        </footer>

        <ChatWidget mode="floating" />
      </div>
    </div>
  );
}
