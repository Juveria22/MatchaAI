import { Link } from "react-router-dom";
import ChatWidget from "../components/ChatWidget";

const LIST = "flex flex-col gap-[9px] text-sm leading-normal text-soft";
const NAME = "text-ink font-semibold";

export default function Resources() {
  return (
    <div className="relative min-h-screen font-sans text-ink">
      <div className="pointer-events-none fixed inset-0 z-0">
        <img
          src="/uploads/IMG_1588.JPG"
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
        <section className="mx-auto max-w-[960px] px-8 pb-20 pt-[112px]">
          <h1 className="font-script text-[clamp(42px,5.6vw,66px)] leading-tight">
            When you need more than matcha
          </h1>
          <p
            className="mb-[30px] mt-3.5 max-w-[640px] text-[15.5px] leading-[1.65] text-soft"
            style={{ textWrap: "pretty" }}
          >
            matchai is a nice place to vent and reset, but it isn't therapy. If
            you're in crisis or need real support, please reach out to one of
            these.
          </p>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
            <div className="m-glass px-6 py-[22px]">
              <div className="mb-3 font-sans text-base font-bold">
                Emergency &amp; crisis lines
              </div>
              <div className={LIST}>
                <div>
                  <strong className={NAME}>911 (U.S.)</strong> for any
                  life-threatening emergency
                </div>
                <div>
                  <strong className={NAME}>988</strong> Suicide &amp; Crisis
                  Lifeline, call or text,{" "}
                  <a href="https://988lifeline.org" className="underline">
                    988lifeline.org
                  </a>
                </div>
                <div>
                  <strong className={NAME}>Crisis Text Line</strong> text HOME to
                  741741, free 24/7
                </div>
                <div>
                  <strong className={NAME}>Veterans Crisis Line</strong> call
                  988, then press 1
                </div>
                <div>
                  <strong className={NAME}>Trans Lifeline</strong> 877-565-8860,{" "}
                  <a href="https://translifeline.org" className="underline">
                    translifeline.org
                  </a>
                </div>
              </div>
            </div>

            <div className="m-glass px-6 py-[22px]">
              <div className="mb-3 font-sans text-base font-bold">
                Professional &amp; self-care
              </div>
              <div className={LIST}>
                <div>
                  <a href="https://www.betterhelp.com" className="underline">
                    BetterHelp
                  </a>{" "}
                  online therapy with licensed therapists
                </div>
                <div>
                  <a href="https://www.talkspace.com" className="underline">
                    Talkspace
                  </a>{" "}
                  therapy &amp; psychiatry by chat or video
                </div>
                <div>
                  <a href="https://findahelpline.com" className="underline">
                    Find a Helpline
                  </a>{" "}
                  global directory of hotlines
                </div>
                <div>
                  <a href="https://openpathcollective.org" className="underline">
                    Open Path Collective
                  </a>{" "}
                  affordable therapy sessions
                </div>
                <div>
                  <a href="https://www.headspace.com" className="underline">
                    Headspace
                  </a>{" "}
                  &amp;{" "}
                  <a href="https://www.calm.com" className="underline">
                    Calm
                  </a>{" "}
                  meditation &amp; sleep
                </div>
              </div>
            </div>
          </div>

          <p className="mt-[26px] text-[13.5px] text-soft">
            matchai can help you pause, breathe, and sort through a rough day.
            For anything heavier, a real human is the right call.
          </p>
        </section>

        <footer className="border-t border-line">
          <div className="mx-auto flex max-w-[960px] flex-wrap items-center gap-5 px-8 py-[26px] text-[13px] text-soft">
            <span>© 2026 matchai, a small corner of calm on the internet</span>
            <div className="ml-auto flex gap-[18px]">
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
