import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — Simonyan Family Clinic
        // deep green / muted teal / warm beige / milk-white / neutrals
        forest: {
          50: "#f2f6f3",
          100: "#e1ebe3",
          200: "#c3d7c8",
          300: "#9cbba4",
          400: "#719a7c",
          500: "#4f7d5c",
          600: "#3b6347",
          700: "#2f4f39",
          800: "#223829",
          900: "#1b2e21",
          950: "#0e1a13",
        },
        teal: {
          50: "#f1f7f6",
          100: "#dcebe8",
          200: "#b9d7d1",
          300: "#8fbdb4",
          400: "#659e94",
          500: "#4a8177",
          600: "#39655d",
          700: "#30524c",
          800: "#29423e",
          900: "#233734",
          950: "#111e1c",
        },
        sand: {
          50: "#fbf9f4",
          100: "#f6f1e5",
          200: "#ece0c8",
          300: "#dfcba2",
          400: "#cdad76",
          500: "#bd9457",
          600: "#a77c47",
          700: "#8a633c",
          800: "#705135",
          900: "#5c432e",
          950: "#312218",
        },
        milk: "#fbfaf7",
        ink: {
          900: "#1c2420",
          700: "#3a453f",
          500: "#5e6b63",
          300: "#94a099",
          100: "#dfe5e1",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        georgian: ["var(--font-georgian)", "system-ui", "sans-serif"],
        armenian: ["var(--font-armenian)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        soft: "0 8px 30px -12px rgba(27, 46, 33, 0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
