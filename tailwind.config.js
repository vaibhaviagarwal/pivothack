/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        midnight: {
          DEFAULT: '#12071f',
          soft: '#1c0f2e',
          deep: '#0a0414',
          ink: '#1a0f28',
        },
        panel: {
          DEFAULT: 'rgba(42, 26, 58, 0.72)',
          soft: 'rgba(52, 33, 70, 0.55)',
        },
        gold: {
          DEFAULT: '#e0b64a',
          soft: '#f0d488',
          deep: '#b8892b',
          dim: '#c9a227',
        },
        lavender: {
          DEFAULT: '#b9a6e0',
          light: '#ded1f7',
          deep: '#7c5cff',
        },
        cream: '#f4eefb',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', '"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.18em',
        widest3: '0.3em',
        widest4: '0.42em',
      },
      boxShadow: {
        glow: '0 0 20px 4px rgba(224, 182, 74, 0.35)',
        'glow-lg': '0 0 60px 12px rgba(224, 182, 74, 0.28)',
        panel: '0 18px 50px -20px rgba(0, 0, 0, 0.85)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        petal: {
          '0%': { transform: 'translate3d(0, 110vh, 0) rotate(0deg)', opacity: 0 },
          '8%': { opacity: 1 },
          '88%': { opacity: 1 },
          '100%': { transform: 'translate3d(var(--drift, 40px), -12vh, 0) rotate(320deg)', opacity: 0 },
        },
        twinkle: {
          '0%, 100%': { opacity: 0.15, transform: 'scale(0.7)' },
          '50%': { opacity: 0.9, transform: 'scale(1)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-1.2deg)' },
          '50%': { transform: 'rotate(1.2deg)' },
        },
        rise: {
          '0%': { transform: 'translateY(0) scale(0.6)', opacity: 0 },
          '15%': { opacity: 1 },
          '100%': { transform: 'translateY(-70px) scale(1.1)', opacity: 0 },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(10px, -8px)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-slower': 'float 10s ease-in-out infinite',
        petal: 'petal linear infinite',
        twinkle: 'twinkle 4s ease-in-out infinite',
        sway: 'sway 5s ease-in-out infinite',
        rise: 'rise 1.8s ease-out forwards',
        drift: 'drift 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
