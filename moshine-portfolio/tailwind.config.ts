import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // MoshineSites brand palette (consistent across all templates)
        bg: {
          primary: "#ffffff",
          secondary: "#f4efe8",
          accent: "#e8ddd2",
        },
        brand: {
          DEFAULT: "#5a4a42",
          light: "#8a7a72",
        },
        text: {
          primary: "#1a1a1a",
          secondary: "#6b6b6b",
          muted: "#a0a0a0",
        },
        border: "#e0ddd8",
        error: "#c94a4a",
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Georgia', 'serif'],
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
        "3xl": "64px",
      },
      maxWidth: {
        content: "1100px",
      },
    },
  },
  plugins: [],
};

export default config;
