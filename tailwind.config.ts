import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
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
