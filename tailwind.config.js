/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chalkboard: {
          black: '#1A1A1A',
          dark: '#2D2D2D',
        },
        chalk: {
          white: '#F5F5F5',
          faded: '#B0B0B0',
          red: '#FF6B6B',
          green: '#7ED687',
          pink: '#FF6B9D',
          yellow: '#FFE066',
          blue: '#87CEEB',
          orange: '#FFB347',
          tan: '#DEB887',
        }
      },
      fontFamily: {
        chalk: ['Caveat', 'cursive'],
        hand: ['Patrick Hand', 'cursive'],
      },
      boxShadow: {
        'chalk': '0 0 2px rgba(255,255,255,0.3)',
      }
    },
  },
  plugins: [],
}
