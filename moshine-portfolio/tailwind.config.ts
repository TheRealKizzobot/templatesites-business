import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bg-primary': 'var(--bg-primary)',
        'bg-surface': 'var(--bg-surface)',
        'bg-elevated': 'var(--bg-elevated)',
        'bg-dark': 'var(--bg-dark)',
        'bg-dark-surface': 'var(--bg-dark-surface)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-tertiary': 'var(--text-tertiary)',
        'text-on-dark': 'var(--text-on-dark)',
        'text-on-dark-muted': 'var(--text-on-dark-muted)',
        brand: 'var(--brand)',
        'brand-light': 'var(--brand-light)',
        'brand-dark': 'var(--brand-dark)',
        border: 'var(--border)',
        'border-subtle': 'var(--border-subtle)',
        'border-dark': 'var(--border-dark)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '12px',
      },
      boxShadow: {
        soft: '0 1px 3px rgba(9,9,11,.06), 0 4px 16px rgba(9,9,11,.04)',
        card: '0 1px 2px rgba(9,9,11,.04), 0 4px 12px rgba(9,9,11,.05)',
        'card-hover': '0 4px 12px rgba(9,9,11,.08), 0 12px 28px rgba(9,9,11,.10)',
        'card-dark': '0 1px 2px rgba(0,0,0,.3), 0 4px 16px rgba(0,0,0,.2)',
        'card-dark-hover': '0 4px 12px rgba(0,0,0,.4), 0 16px 32px rgba(0,0,0,.25)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      maxWidth: {
        'screen-sm': '30rem',
        'screen-md': '42rem',
        'screen-lg': '54rem',
        'screen-xl': '64rem',
      },
    },
  },
  plugins: [],
};

export default config;
