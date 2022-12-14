/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    colors: {
      white: '#fff',
      'gray-900': '#121214',
      'gray-800': '#202024',
      'gray-300': '#c4c4cc',
      'gray-100': '#e1e1e6',

      'green-500': '#00875f',
      'green-300': '#00b37e'
    },
    fontSize: {
      md: '1.125rem',
      lg: '1.25rem',
      xl: '1.5rem',
      '2xl': '2rem'
    }
  },
  plugins: []
}
