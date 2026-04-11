/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'bounce-once': {
          '0%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-12px)' },
          '60%': { transform: 'translateY(-6px)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212,168,32,0)' },
          '50%': { boxShadow: '0 0 0 8px rgba(212,168,32,0.2)' },
        },
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        'fade-up': 'fade-up 0.5s ease-out forwards',
        shimmer: 'shimmer 2s linear infinite',
        'bounce-once': 'bounce-once 0.6s ease-out',
        'spin-slow': 'spin-slow 3s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      colors: {
        cream:      'var(--color-cream)',
        ink:        'var(--color-ink)',
        muted:      'var(--color-muted)',
        line:       'var(--color-line)',
        navy:       'var(--color-navy)',
        navysoft:   'var(--color-navysoft)',
        midnight:   'var(--color-midnight)',
        gold:       'var(--color-gold)',
        goldsoft:   'var(--color-goldsoft)',
        surface:    'var(--color-surface)',
        surfacealt: 'var(--color-surfacealt)',
      },
    },
  },
  plugins: [],
}
