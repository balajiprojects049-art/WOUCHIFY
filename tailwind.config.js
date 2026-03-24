/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
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
        cream: '#F7F4EE',
        ink: '#121826',
        muted: '#667085',
        line: '#E6E2DA',
        navy: '#1F1F22',
        navysoft: '#2A2A2F',
        midnight: '#141417',
        gold: '#C89B1E',
        goldsoft: '#E8D39A',
      },
    },
  },
  plugins: [],
}
