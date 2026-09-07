import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bg-primary': '#ffffff',
        'bg-secondary': '#f4efe8',
        'text-primary': '#1a1a1a',
        'text-secondary': '#6b6b6b',
        border: '#e0ddd8',
        error: '#c94a4a',
        success: '#3d7a4e',
        warning: '#b07d2b',
        brand: {
          50: '#faf8f6',
          100: '#f0ece8',
          200: '#ddd4cd',
          300: '#c4b7ae',
          400: '#a98f82',
          500: '#5a4a42',
          600: '#4a3d37',
          700: '#3b312c',
          800: '#2c2521',
          900: '#1d1815',
        },
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
      borderRadius: {
        xl: '16px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(26,26,26,.04), 0 4px 12px rgba(26,26,26,.06)',
        lift: '0 6px 16px rgba(26,26,26,.10), 0 2px 6px rgba(26,26,26,.06)',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;