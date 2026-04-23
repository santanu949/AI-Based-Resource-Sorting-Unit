/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0F19',
        card: 'rgba(20, 25, 40, 0.6)',
        primary: '#10B981',
        accent: '#06B6D4'
      }
    },
  },
  plugins: [],
}
