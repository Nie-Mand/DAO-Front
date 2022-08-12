/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}', './public/**/*.{svg}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF1E2E',
        'dark-primary': '#C2000E',
        blueish: '#00002a',
        'more-blue': '#000014',
        polygon: '#8247e5',
      },
      animation: {
        'spin-slow': 'spin 50s linear infinite',
        tilt: 'tilt 10s infinite linear',
      },
      keyframes: {
        tilt: {
          '0%, 50%, 100%': {
            transform: 'rotate(0deg)',
          },
          '25%': {
            transform: 'rotate(0.5deg)',
          },
          '75%': {
            transform: 'rotate(-0.5deg)',
          },
        },
      },
    },
  },
  plugins: [],
}
