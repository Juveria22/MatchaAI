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
    <nav
      className={"m-nav" + (hidden ? " m-nav--hidden" : "")}
      style={{
        position: "fixed",
        top: 0,
        left: "50%",
        transform: "translate(-50%, 0)",
        zIndex: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 26,
        padding: "13px 34px 14px",
        background: "color-mix(in srgb, var(--m-bg) 88%, transparent)",
        backdropFilter: "blur(16px)",
        border: "1px solid var(--m-line)",
        borderTop: "none",
        borderRadius: "0 0 999px 999px",
        boxShadow: "0 14px 34px -22px rgba(0,0,0,.4)",
        maxWidth: "calc(100vw - 24px)",
      }}
    >
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          fontFamily: "'Parisienne', cursive",
          fontWeight: 400,
          fontSize: 32,
          lineHeight: 1,
          color: "var(--m-ink)",
        }}
      >
        matchai
      </Link>

      <div
        style={{
          display: "flex",
          gap: 26,
          fontFamily: "'Jost', sans-serif",
          fontSize: 11.5,
          fontWeight: 400,
          letterSpacing: 2,
          textTransform: "uppercase",
        }}
      >
        {LINKS.map((l) => {
          const active = pathname === l.to;
          return (
            <Link
              key={l.to}
              to={l.to}
              className="m-navlink"
              style={
                active
                  ? {
                      borderBottom: "1.5px solid var(--m-accent)",
                      paddingBottom: 2,
                    }
                  : undefined
              }
            >
              {l.label}
            </Link>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onToggleTheme}
        aria-label="Switch light or dark mode"
        title="Switch light or dark mode"
        className="m-themebtn"
        style={{
          marginLeft: 18,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 32,
          height: 32,
          border: "1px solid var(--m-line)",
          background: "transparent",
          borderRadius: 999,
          color: "var(--m-ink)",
          fontSize: 14,
          lineHeight: 1,
          cursor: "pointer",
        }}
      >
        {themeIcon}
      </button>
    </nav>
  );
}
