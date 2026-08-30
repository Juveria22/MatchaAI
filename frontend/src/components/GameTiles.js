const ICON = {
  fill: "none",
  stroke: "#33502A",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const svgClass = "block h-auto w-[44%] max-w-[46px]";

export const GAMES = [
  {
    id: "whisk",
    name: "Whisk the Matcha",
    meta: "1 min",
    title: "Whisk the Matcha",
    hint: "move in slow circles inside the bowl",
    scored: true,
    icon: (
      <svg viewBox="0 0 48 48" role="img" aria-label="Bowl and whisk line icon" className={svgClass} {...ICON}>
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
    meta: "1 min",
    title: "Leaf Catch",
    hint: "move your cup left and right",
    scored: true,
    icon: (
      <svg viewBox="0 0 48 48" role="img" aria-label="Tea leaf line icon" className={svgClass} {...ICON}>
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
    scored: true,
    icon: (
      <svg viewBox="0 0 48 48" role="img" aria-label="Playing cards line icon" className={svgClass} {...ICON}>
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
    scored: true,
    icon: (
      <svg viewBox="0 0 48 48" role="img" aria-label="Boba cup line icon" className={svgClass} {...ICON}>
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
    scored: false,
    icon: (
      <svg viewBox="0 0 48 48" role="img" aria-label="Stacked stones line icon" className={svgClass} {...ICON}>
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
    scored: false,
    icon: (
      <svg viewBox="0 0 48 48" role="img" aria-label="Cloud line icon" className={svgClass} {...ICON}>
        <path d="M15 34h19.5a6.2 6.2 0 0 0 .5-12.4A9.2 9.2 0 0 0 17.6 18.8 7.6 7.6 0 0 0 15 34Z" />
        <path d="M20 39h9" />
      </svg>
    ),
  },
];

export function GAME_BY_ID(id) {
  return GAMES.find((g) => g.id === id);
}

// six up game grid. pass onPick to open in place, otherwise it links to /play
export function GameTiles({ onPick, LinkComponent }) {
  return (
    <div className="mt-[18px] grid grid-cols-6 gap-x-4 gap-y-[18px]">
      {GAMES.map((g) => {
        const body = (
          <>
            <div className="m-tile">{g.icon}</div>
            <div>
              <div className="font-sans text-[13.5px] font-medium leading-tight">
                {g.name}
              </div>
              <div className="mt-px font-sans text-[11.5px] text-soft">
                {g.meta}
                {g.scored ? " · scored" : ""}
              </div>
            </div>
          </>
        );

        const cls = "m-gamecard flex cursor-pointer flex-col gap-2 text-ink";

        if (onPick) {
          return (
            <div key={g.id} className={cls} onClick={() => onPick(g.id)}>
              {body}
            </div>
          );
        }

        const Anchor = LinkComponent || "a";
        return (
          <Anchor
            key={g.id}
            className={cls}
            to={"/play#" + g.id}
            href={"/play#" + g.id}
          >
            {body}
          </Anchor>
        );
      })}
    </div>
  );
}
