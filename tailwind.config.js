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
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
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
