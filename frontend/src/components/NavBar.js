import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/matchai", label: "matchai" },
  { to: "/play", label: "Play" },
  { to: "/resources", label: "Resources" },
];

// half pill stuck to the top edge
// slides up and fades out on any scroll down, comes back only at the very top
export default function NavBar({ onToggleTheme, themeIcon }) {
  const [hidden, setHidden] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    let last = window.scrollY || 0;
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      const atTop = y <= 12;
      const down = y > last + 2;
      last = y;
      setHidden(!atTop && (down || y > 80));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={"m-nav font-sans" + (hidden ? " m-nav--hidden" : "")}>
      <Link
        to="/"
        className="flex items-center font-script text-[32px] font-normal not-italic leading-none tracking-normal text-ink"
      >
        matchai
      </Link>

      <div className="flex gap-[26px] font-sans text-[11.5px] font-normal not-italic uppercase tracking-[2px]">
        {LINKS.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className={
              "m-navlink" +
              (pathname === l.to
                ? " border-b-[1.5px] border-accent pb-0.5 hover:text-ink"
                : "")
            }
          >
            {l.label}
          </Link>
        ))}
      </div>

      <button
        type="button"
        onClick={onToggleTheme}
        aria-label="Switch light or dark mode"
        title="Switch light or dark mode"
        className="ml-[18px] inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-line bg-transparent text-sm leading-none text-ink transition-colors hover:border-accent hover:text-accent"
      >
        {themeIcon}
      </button>
    </nav>
  );
}
