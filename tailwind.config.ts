import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#fff",
        secondary: "#64748B",
        blue: "#0EA5E9",
        "bg-primary": "#FFFFFF",
        "bg-blue": "#0EA5E9",
        "bg-secondary": "#F9FAFB",
      },
    },
  },
  plugins: [],
} satisfies Config;
