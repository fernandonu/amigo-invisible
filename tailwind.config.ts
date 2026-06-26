import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        christmas: {
          red: '#CC0000',
          green: '#006400',
          gold: '#FFD700',
          darkred: '#8B0000',
          darkgreen: '#004d00',
          cream: '#FFFDD0',
        },
      },
      animation: {
        'snow-fall': 'snowFall linear infinite',
        'light-blink': 'lightBlink 1.5s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite',
      },
      keyframes: {
        snowFall: {
          '0%': { transform: 'translateY(-10vh) translateX(0px)', opacity: '1' },
          '100%': { transform: 'translateY(110vh) translateX(30px)', opacity: '0.3' },
        },
        lightBlink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        twinkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.3', transform: 'scale(0.8)' },
        },
      },
      backgroundImage: {
        'christmas-gradient': 'linear-gradient(135deg, #0d1b2a 0%, #1a0a0a 25%, #0a1f0a 50%, #1a0a0a 75%, #0d1b2a 100%)',
        'card-glass': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      },
      fontFamily: {
        display: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
