/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#324E9A',
        accent: '#F0F4FF',
      },
      scale: {
        '-100': '-1',
      },
    },
  },
  plugins: [],
}
