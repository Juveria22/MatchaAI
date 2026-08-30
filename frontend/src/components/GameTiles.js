const ICON = {
  fill: "none",
  stroke: "#33502A",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const svgStyle = { display: "block", width: "44%", maxWidth: 46, height: "auto" };

export const GAMES = [
  {
    id: "whisk",
    name: "Whisk the Matcha",
    meta: "1 min",
    title: "Whisk the Matcha",
    hint: "move in slow circles inside the bowl",
    icon: (
      <svg viewBox="0 0 48 48" role="img" aria-label="Bowl and whisk line icon" style={svgStyle} {...ICON}>
        <path d="M9 26h30c0 7.5-6.7 13-15 13S9 33.5 9 26Z" />
        <path d="M12.5 26c3 2.4 7 3.6 11.5 3.6S32.5 28.4 35.5 26" />
        <path d="M30 8.5v8.5" />
        <path d="M26.5 17h7l-1.1 7.5h-4.8Z" />
        <path d="M28.4 17v7.5M31.1 17v7.5" />
      </svg>
    ),
  },
  {
    id: "catch",
    name: "Leaf Catch",
    meta: "2 min",
    title: "Leaf Catch",
    hint: "move your cup left and right",
    icon: (
      <svg viewBox="0 0 48 48" role="img" aria-label="Tea leaf line icon" style={svgStyle} {...ICON}>
        <path d="M12 37C10 22 18 11 34 9c2 16-8 27-22 28Z" />
        <path d="M12.5 36.5C18 30 25.5 22 31.5 13" />
      </svg>
    ),
  },
  {
    id: "memory",
    name: "Memory Match",
    meta: "3 min",
    title: "Memory Match",
    hint: "flip two cards, find the pair",
    icon: (
      <svg viewBox="0 0 48 48" role="img" aria-label="Playing cards line icon" style={svgStyle} {...ICON}>
        <rect x="9" y="15" width="17" height="23" rx="3" transform="rotate(-11 17.5 26.5)" />
        <rect x="22" y="12" width="17" height="23" rx="3" transform="rotate(11 30.5 23.5)" />
        <path d="M30.5 19.5l3 4-3 4-3-4Z" />
      </svg>
    ),
  },
  {
    id: "pearl",
    name: "Pearl Pop",
    meta: "survival",
    title: "Pearl Pop",
    hint: "tap pearls as they float up",
    icon: (
      <svg viewBox="0 0 48 48" role="img" aria-label="Boba cup line icon" style={svgStyle} {...ICON}>
        <path d="M15 18h18l-1.9 19.6a3.2 3.2 0 0 1-3.2 2.9h-7.8a3.2 3.2 0 0 1-3.2-2.9Z" />
        <path d="M12.5 14.5h23" />
        <path d="M28 8l-2.2 6.5" />
        <circle cx="21" cy="34" r="1.7" />
        <circle cx="26.5" cy="35.2" r="1.7" />
        <circle cx="24" cy="29.5" r="1.7" />
      </svg>
    ),
  },
  {
    id: "zen",
    name: "Zen Garden",
    meta: "free play",
    title: "Zen Garden",
    hint: "press and drag to rake",
    icon: (
      <svg viewBox="0 0 48 48" role="img" aria-label="Stacked stones line icon" style={svgStyle} {...ICON}>
        <ellipse cx="24" cy="35.5" rx="13" ry="4.6" />
        <ellipse cx="24" cy="26.5" rx="9.6" ry="4" />
        <ellipse cx="24" cy="18.5" rx="6.6" ry="3.4" />
        <path d="M24 12.5v-2" />
      </svg>
    ),
  },
  {
    id: "breath",
    name: "Breathing Cup",
    meta: "2 min",
    title: "Breathing Cup",
    hint: "follow the circle",
    icon: (
      <svg viewBox="0 0 48 48" role="img" aria-label="Cloud line icon" style={svgStyle} {...ICON}>
        <path d="M15 34h19.5a6.2 6.2 0 0 0 .5-12.4A9.2 9.2 0 0 0 17.6 18.8 7.6 7.6 0 0 0 15 34Z" />
        <path d="M20 39h9" />
      </svg>
    ),
  },
];

export function GAME_BY_ID(id) {
  return GAMES.find((g) => g.id === id);
}

const jost = "'Jost', sans-serif";

// six up game grid. pass onPick to open in place, otherwise it links to /play
export function GameTiles({ onPick, LinkComponent }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: "18px 16px",
        marginTop: 18,
      }}
    >
      {GAMES.map((g) => {
        const body = (
          <>
            <div
              className="m-tile"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                aspectRatio: "5 / 4",
                background: "#D3DCB6",
                border: "1px solid var(--m-line)",
                borderRadius: 9,
              }}
            >
              {g.icon}
            </div>
            <div>
              <div
                style={{
                  fontFamily: jost,
                  fontWeight: 500,
                  fontSize: 13.5,
                  lineHeight: 1.25,
                }}
              >
                {g.name}
              </div>
              <div
                style={{
                  fontFamily: jost,
                  fontSize: 11.5,
                  color: "var(--m-soft)",
                  marginTop: 1,
                }}
              >
                {g.meta}
              </div>
            </div>
          </>
        );

        const shell = {
          display: "flex",
          flexDirection: "column",
          gap: 8,
          color: "var(--m-ink)",
          cursor: "pointer",
        };

        if (onPick) {
          return (
            <div
              key={g.id}
              className="m-gamecard"
              onClick={() => onPick(g.id)}
              style={shell}
            >
              {body}
            </div>
          );
        }

        const Anchor = LinkComponent || "a";
        return (
          <Anchor
            key={g.id}
            className="m-gamecard"
            to={"/play#" + g.id}
            href={"/play#" + g.id}
            style={shell}
          >
            {body}
          </Anchor>
        );
      })}
    </div>
  );
}
