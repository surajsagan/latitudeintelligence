import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          0: '#04060a',
          1: '#070b14',
          2: '#0a1020',
          3: '#0e1730'
        },
        fg: {
          DEFAULT: '#e8eef8',
          dim: '#aab4c5',
          mute: '#6c7689'
        }
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace']
      },
      maxWidth: {
        site: '1280px'
      }
    }
  },
  plugins: []
};

export default config;
