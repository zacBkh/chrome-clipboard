/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-primary': '#16161a',
        'dark-secondary': '#242629',

        'purple-primary': '#7f5af0',
        'purple-secondary': '#8b6aee',

        'grey-hover': '#a2a3a35c',
      },
    },
  },
  plugins: [],
}
