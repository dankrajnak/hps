import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import taiwindAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        display: ["PP Eiko"],
        sans: ["var(--font-inconsolata)", ...fontFamily.sans],
      },

      colors: {},
    },
    colors: {
      green: "#61bb46",
      yellow: "#fdb827",
      orange: "#f5821f",
      red: "#e03a3e",
      purple: "#963d97",
      background: "#ffffff",
      white: "#fff",
      neutral: {
        "50": "#fafafa",
        "100": "#f5f5f5",
        "200": "#e5e5e5",
        "300": "#d4d4d4",
        "400": "#a3a3a3",
        "500": "#737373",
        "600": "#525252",
        "700": "#404040",
        "800": "#262626",
        "900": "#171717",
        "950": "#0a0a0a",
      },
    },
  },
  plugins: [taiwindAnimate],
} satisfies Config;
