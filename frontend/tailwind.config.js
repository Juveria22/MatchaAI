/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      // the palette lives in css vars so the light / dark toggle is one swap
      colors: {
        bg: "var(--m-bg)",
        bg2: "var(--m-bg2)",
        card: "var(--m-card)",
        ink: "var(--m-ink)",
        soft: "var(--m-soft)",
        accent: "var(--m-accent)",
        deep: "var(--m-deep)",
        line: "var(--m-line)",
        blush: "var(--m-blush)",
      },
      fontFamily: {
        sans: ["Jost", "-apple-system", "Segoe UI", "Helvetica", "sans-serif"],
        serif: ["Cormorant Garamond", "Georgia", "Times New Roman", "serif"],
        script: ["Parisienne", "cursive"],
      },
      keyframes: {
        dots: {
          "0%, 80%, 100%": { opacity: ".25", transform: "translateY(0)" },
          "40%": { opacity: "1", transform: "translateY(-2px)" },
        },
        rise: {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(-560px)" },
        },
        pop: {
          from: { transform: "scale(1)", opacity: "1" },
          to: { transform: "scale(1.7)", opacity: "0" },
        },
      },
      animation: {
        dots: "dots 1.2s infinite",
      },
    },
  },
  plugins: [],
};
