import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'border': 'var(--border)',
        'error': 'var(--error)',
        'success': 'var(--success)',
        'warning': 'var(--warning)',
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
      fontSize: {
        md: ['1rem', { lineHeight: '1.6rem' }],
      },
      borderRadius: {
        md: '8px',
        xl: '16px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(26,26,26,.04)',
        lift: '0 4px 12px rgba(26,26,26,.06)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;