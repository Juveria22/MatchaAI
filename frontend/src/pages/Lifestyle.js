import { Link } from "react-router-dom";
import ChatWidget from "../components/ChatWidget";
import { GameTiles } from "../components/GameTiles";

const RITUALS = [
  {
    name: "The Pour",
    img: "/uploads/IMG_5307.JPG",
    alt: "Tall iced matcha topped with a dusting of matcha",
    body:
      "Water and matcha meet here. In chanoyu, the tea ceremony, water is cooled to about 70 to 80°C before it touches the powder. Cooler water keeps the tea sweet and rounded; boiling water scorches it and turns it bitter.",
  },
  {
    name: "The Whisk",
    img: "/uploads/IMG_5296.JPG",
    alt: "Whisking matcha in a ceramic bowl",
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
    body: "A simple way to lengthen the exhale and settle the nervous system.",
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

const EYEBROW = "font-sans text-[10.5px] uppercase tracking-[3.4px] text-soft";

export default function Lifestyle() {
  return (
    <div className="min-h-screen font-serif text-ink">
      <section className="relative flex min-h-[86vh] flex-col items-center justify-center overflow-hidden px-8 pb-[88px] pt-24 text-center">
        <div className="absolute inset-0">
          <img
            src="/uploads/IMG_5105.JPG"
            alt="A glass of iced matcha ringed with pink roses"
            className="h-full w-full object-cover"
            style={{
              objectPosition: "100% 30%",
              transform: "scale(1.05) translateX(-2%)",
              filter: "saturate(1.2) contrast(1.06) brightness(1.05)",
            }}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(48,40,32,.4) 0%, rgba(48,40,32,.22) 40%, color-mix(in srgb, var(--m-bg) 82%, transparent) 100%)",
          }}
        />
        <div className="relative flex max-w-[1140px] flex-col items-center">
          <div className="font-sans text-[11px] uppercase tracking-[4.5px] text-[#F3E7DA]">
            mind over matter
          </div>
          <h1
            className="mt-[18px] font-script text-[clamp(52px,7.4vw,104px)] leading-[1.06] text-white"
            style={{
              textWrap: "balance",
              textShadow: "0 2px 30px rgba(0,0,0,.35)",
            }}
          >
            A living practice for a calmer mind
          </h1>
          <p
            className="mt-[22px] max-w-[46ch] text-[21px] italic leading-[1.55] text-[rgba(255,252,246,.94)]"
            style={{
              textShadow: "0 1px 18px rgba(0,0,0,.4)",
              textWrap: "pretty",
            }}
          >
            Enjoy articles, mini games, and small breaks with matchai.
          </p>
          <div className="mt-[38px] flex flex-wrap justify-center gap-3">
            <a
              href="#ritual"
              className="rounded-full border-[1.5px] border-deep bg-deep px-8 py-3.5 font-sans text-[11.5px] uppercase tracking-[2.6px] text-[#253317] transition-colors hover:border-accent hover:bg-accent hover:text-bg"
            >
              Begin the ritual
            </a>
            <Link
              to="/matchai"
              className="rounded-full border-[1.5px] border-white/85 bg-[rgba(40,34,28,.52)] px-8 py-3.5 font-sans text-[11.5px] uppercase tracking-[2.6px] text-white backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
            >
              Talk to matchai
            </Link>
          </div>
        </div>
      </section>

      <section id="ritual" className="mx-auto max-w-[1140px] px-8 pb-10 pt-[84px]">
        <div className="text-center">
          <div className={EYEBROW}>the ritual</div>
          <h2 className="mt-2.5 font-script text-[clamp(40px,5.2vw,66px)] leading-[1.12]">
            A few slow minutes, every day
          </h2>
          <p
            className="mx-auto mt-3.5 max-w-[50ch] text-lg leading-[1.7] text-soft"
            style={{ textWrap: "pretty" }}
          >
            Three slow steps that turn making a drink into an actual break.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-[22px]">
          {RITUALS.map((r) => (
            <div key={r.name}>
              <div className="m-reveal relative aspect-[2/3] w-full cursor-pointer overflow-hidden rounded">
                <div className="m-reveal-strip">
                  <img
                    src={r.img}
                    alt={r.alt}
                    loading="lazy"
                    className="h-full w-full flex-none object-cover"
                    style={{ objectPosition: r.objectPosition }}
                  />
                  <div className="flex h-full w-full flex-none flex-col justify-center gap-3.5 border border-line bg-card px-[30px] py-[34px] box-border">
                    <div className="font-sans text-[10px] uppercase tracking-[2.8px] text-soft">
                      why it matters
                    </div>
                    <p
                      className="m-0 text-[clamp(16px,1.5vw,19.5px)] leading-[1.72] text-ink"
                      style={{ textWrap: "pretty" }}
                    >
                      {r.body}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center text-[27px] font-medium italic tracking-[.2px]">
                {r.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1140px] px-8 py-16">
        <div className="text-center">
          <div className={EYEBROW}>the journal</div>
          <h2 className="mt-2.5 font-script text-[clamp(36px,4.6vw,56px)] leading-[1.12]">
            Notes on slow living
          </h2>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-[22px]">
          {JOURNAL.map((a) => (
            <a
              key={a.href}
              href={a.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded border border-line bg-card text-ink"
            >
              <img
                src={a.img}
                alt={a.alt}
                loading="lazy"
                className="block aspect-[3/2] w-full object-cover"
                style={{ objectPosition: a.objectPosition }}
              />
              <div className="px-[22px] pb-[26px] pt-[22px] text-center">
                <div className="font-sans text-[10px] uppercase tracking-[2.4px] text-soft">
                  {a.kicker}
                </div>
                <div className="mt-2 font-serif text-[27px] font-medium leading-[1.22]">
                  {a.title}
                </div>
                <p className="mt-2.5 text-[15.5px] leading-[1.55] text-soft">
                  {a.body}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-bg2">
        <div className="mx-auto max-w-[1140px] px-8 pb-[62px] pt-[58px]">
          <div className="flex items-center gap-3.5">
            <h2 className="font-sans text-2xl font-semibold tracking-[-.2px]">
              Little Games
            </h2>
            <Link to="/play" className="font-sans text-[13px] font-medium text-accent">
              See All
            </Link>
            <span className="ml-auto font-sans text-xs text-soft">6 games</span>
          </div>
          <GameTiles LinkComponent={Link} />
        </div>
      </section>

      <section className="mx-auto max-w-[1000px] px-8 pb-[84px] pt-[76px]">
        <div className="flex flex-col items-center text-center">
          <div className={EYEBROW}>matchai</div>
          <h2 className="mt-2.5 font-script text-[clamp(38px,4.8vw,58px)] leading-[1.14]">
            matchai, whenever you need it
          </h2>
          <p
            className="mt-4 max-w-[48ch] text-[19px] italic leading-[1.7] text-soft"
            style={{ textWrap: "pretty" }}
          >
            matchai is a chat away on every page. Bring a messy thought, a rough
            afternoon, or nothing at all.
          </p>
          <div className="mt-[34px] grid min-h-[520px] w-full max-w-[680px]">
            <ChatWidget mode="inline" />
          </div>
          <p className="mt-[18px] text-xs text-soft opacity-80">
            Not a replacement for therapy or professional care. In crisis, see{" "}
            <Link to="/resources" className="underline">
              resources
            </Link>
            .
          </p>
        </div>
      </section>

      <footer className="border-t border-line bg-bg2">
        <div className="mx-auto flex max-w-[1140px] flex-col items-center gap-3 p-[38px] text-center font-sans text-xs tracking-[1.2px] text-soft">
          <span className="font-script text-[30px] text-ink">matchai</span>
          <span>© 2026, made for slow days</span>
          <div className="flex gap-[18px]">
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
