/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FDFCF7',
          100: '#FAF5E8',
          200: '#F5E7C4',
          300: '#EED496',
          400: '#E4BF62',
          500: '#D4AF37', // Royal Gold
          600: '#B88B22',
          700: '#946B13',
          800: '#75510C',
          900: '#523706',
        },
        burgundy: {
          50: '#FAF2F4',
          100: '#F5E3E7',
          200: '#ECC6CE',
          300: '#DE9FA8',
          400: '#C76A7D',
          500: '#A83B52',
          600: '#8E283E',
          700: '#731A2D',
          800: '#5C1221', // Deep ceremonial wedding burgundy
          900: '#3D0914',
          950: '#25040B',
        },
        cream: {
          50: '#FFFEFA',
          100: '#FFFDF5',
          200: '#FAF6EA',
          300: '#F4EED8',
          400: '#ECE2C0',
          500: '#DFD1A5',
        }
      },
      fontFamily: {
        moul: ['Moul', 'serif'],
        kantumruy: ['"Kantumruy Pro"', 'sans-serif'],
        siemreap: ['Siemreap', 'sans-serif'],
        battambang: ['Battambang', 'sans-serif'],
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'float-delayed': 'float 4s ease-in-out 2s infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'spin-slow': 'spin 14s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.88', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
