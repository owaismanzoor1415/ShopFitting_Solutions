/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
     fontFamily: {
  sans: ['"Inter"', 'sans-serif'],
},
      colors: {
        primary: {
          50:  '#ffe5e5',
          100: '#ffcccc',
          200: '#ff9999',
          300: '#ff6666',
          400: '#ee2222',
          500: '#CC0001',
          600: '#a80001',
          700: '#8a0001',
          800: '#6a0001',
          900: '#500001',
        },
        australia: {
          red:   '#CC0001',
          white: '#FFFFFF',
          blue:  '#00308F',
          gold:  '#FFCD00',
          navy:  '#00308F',
        },
      },
    },
  },
  plugins: [],
}
