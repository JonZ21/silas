/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        riffle: ['Riffle', 'sans-serif'],
        Esteban: ['Esteban', 'serif'],
      }
    }
  },
  plugins: [],
}

