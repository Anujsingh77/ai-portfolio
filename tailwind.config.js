/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        ink: {
          950: "#05070d",
          900: "#0a0e1a",
          850: "#0e1424",
          800: "#131a2e",
          700: "#1a2338",
          600: "#232e48",
          500: "#4b5578",
        },
        mist: {
          50: "#fafcff",
          100: "#f1f5fb",
          200: "#e4ebf5",
          300: "#c3cce2",
          400: "#98a3c2",
          500: "#717da3",
        },
        neon: {
          violet: "#7c6cff",
          blue: "#00d4ff",
          pink: "#ff6cf0",
        },
        aqua: {
          500: "#06b6d4",
          600: "#0891b2",
          400: "#38bdf8",
        },
      },
      backgroundImage: {
        "grid-dark":
          "linear-gradient(rgba(124,108,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(124,108,255,0.06) 1px, transparent 1px)",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.28)",
        "glass-light": "0 8px 32px rgba(15,23,42,0.08)",
        neon: "0 0 24px rgba(124,108,255,0.35)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        blob: "blob 12s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        blob: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(20px,-15px) scale(1.05)" },
          "66%": { transform: "translate(-15px,10px) scale(0.97)" },
        },
      },
    },
  },
  plugins: [],
};
