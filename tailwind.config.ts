import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        secondary: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
          950: '#4a044e',
        },
        accent: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
          950: '#422006',
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        'swipe-left': {
          '0%': { transform: 'translateX(0) rotate(0)', opacity: '1' },
          '100%': { transform: 'translateX(-150%) rotate(-30deg)', opacity: '0' }
        },
        'swipe-right': {
          '0%': { transform: 'translateX(0) rotate(0)', opacity: '1' },
          '100%': { transform: 'translateX(150%) rotate(30deg)', opacity: '0' }
        },
        'swipe-up': {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(-150%) scale(0.8)', opacity: '0' }
        },
        'pulse-scale': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' }
        },
        'card-in': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      },
      fontFamily: {
        'elegant': ['Playfair Display', 'serif'],
        'elegant-script': ['Cormorant Garamond', 'serif'],
        'jakarta': ['Plus Jakarta Sans', 'sans-serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'swipe-left': 'swipe-left 0.5s cubic-bezier(0.17, 0.67, 0.83, 0.67) forwards',
        'swipe-right': 'swipe-right 0.5s cubic-bezier(0.17, 0.67, 0.83, 0.67) forwards',
        'swipe-up': 'swipe-up 0.5s cubic-bezier(0.17, 0.67, 0.83, 0.67) forwards',
        'pulse-scale': 'pulse-scale 1.5s ease-in-out infinite',
        'card-in': 'card-in 0.5s ease-out forwards'
      }
    },
  },
  plugins: [],
};
export default config;
