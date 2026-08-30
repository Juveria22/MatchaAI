import { useCallback, useEffect, useState } from "react";

export const PALETTES = {
  Linen: {
    bg: "#F8F4ED",
    bg2: "#F1E9DD",
    card: "#FFFDFA",
    ink: "#2B3527",
    soft: "#616D57",
    accent: "#5D7F45",
    deep: "#4C6B3C",
    line: "#E5DCCC",
    blush: "#C99298",
  },
  "Dark Matcha": {
    bg: "#0E1A0A",
    bg2: "#14240E",
    card: "#182B11",
    ink: "#F1F6EA",
    soft: "#9CB187",
    accent: "#A9C98C",
    deep: "#6E9152",
    line: "#2A4420",
    blush: "#D18F8F",
  },
};

const KEY = "matchai-theme";

export function storedTheme() {
  try {
    const s = localStorage.getItem(KEY);
    if (s && PALETTES[s]) return s;
  } catch (e) {}
  return "Linen";
}

export function applyPalette(name) {
  const p = PALETTES[name] || PALETTES.Linen;
  const root = document.documentElement.style;
  Object.entries(p).forEach(([k, v]) => root.setProperty("--m-" + k, v));
}

// palette state, sets the css vars, used by every page
export function useTheme() {
  const [theme, setTheme] = useState(storedTheme);

  useEffect(() => {
    applyPalette(theme);
    try {
      localStorage.setItem(KEY, theme);
    } catch (e) {}
  }, [theme]);

  const toggle = useCallback(
    () => setTheme((t) => (t === "Linen" ? "Dark Matcha" : "Linen")),
    []
  );

  return { theme, toggle, icon: theme === "Linen" ? "\u263E" : "\u2600" };
}

// read a live css var, for canvas drawing
export function cssVar(name, fallback) {
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return v || fallback;
}
