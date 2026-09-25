import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf7f3',
          100: '#f7eae0',
          200: '#f0d9c6',
          300: '#e3c4a7',
          400: '#d4a373',
          500: '#c08a5a',
          600: '#a8723f',
          700: '#8c5a2f',
          800: '#6b4320',
          900: '#3d2818',
        },
      },
      fontFamily: {
        display: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(0,0,0,.04), 0 4px 12px rgba(0,0,0,.06)',
        lift: '0 6px 16px rgba(0,0,0,.10), 0 2px 6px rgba(0,0,0,.06)',
      },
      borderRadius: {
        xl: '16px',
      },
    },
  },
  plugins: [],
};

export default config;