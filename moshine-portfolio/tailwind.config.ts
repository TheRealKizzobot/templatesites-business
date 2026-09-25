import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#ffffff',
          secondary: '#faf8f5',
          accent: '#f0ede6',
        },
        text: {
          primary: '#1c1a18',
          secondary: '#6b6864',
          muted: '#a8a4a0',
        },
        brand: {
          50: '#fdf8f3',
          100: '#f7efe5',
          200: '#ebdfd1',
          300: '#d8c9b3',
          400: '#c1aa8f',
          500: '#a88e6b',
          600: '#8c7454',
          700: '#6f5c42',
          800: '#5a4a35',
          900: '#483a2a',
        },
        border: '#e8e4dd',
        error: '#c94a4a',
        success: '#3d7a4e',
        warning: '#b07d2b',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(28,25,23,.04), 0 4px 12px rgba(28,25,23,.06)',
        lift: '0 6px 16px rgba(28,25,23,.10), 0 2px 6px rgba(28,25,23,.06)',
      },
      borderRadius: {
        xl: '16px',
      },
    },
  },
  plugins: [],
};

export default config;