import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B0B0B",
        charcoal: "#141210",
        gold: {
          DEFAULT: "#D4AF37",
          soft: "#E8CE7A",
          deep: "#9C7B25",
        },
        bronze: "#7A5C33",
        ivory: "#FFFFFF",
        mist: "#A0A0A0",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "gold-line": "linear-gradient(90deg, transparent, #D4AF37, transparent)",
        "vignette": "radial-gradient(120% 120% at 50% 0%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 100%)",
      },
      boxShadow: {
        gold: "0 0 40px -10px rgba(212,175,55,0.35)",
        card: "0 20px 60px -20px rgba(0,0,0,0.6)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.9s ease forwards",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
