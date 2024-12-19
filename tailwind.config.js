/** @type {import('tailwindcss').Config} */

import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cyan: {
          100: "hsl(189, 41%, 97%)",
          300: "hsl(185, 41%, 84%)",
          500: "hsl(172, 67%, 45%)",
          700: "hsl(184, 14%, 56%)",
          800: "hsl(186, 14%, 43%)",
          900: "hsl(183, 100%, 15%)",
        },
      },
    },
    fontFamily: {
      sans: ["Space Mono", ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
};
