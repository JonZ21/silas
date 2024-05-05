/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  corePlugins: {
    container: false, // to prevent Tailwind from adding default container styles
  },
  theme: {
    extend: {
      fontFamily: {
        riffle: ["Riffle", "sans-serif"],
        Esteban: ["Esteban", "serif"],
      },
      spacing: {
        reset: "0",
      },
    },
  },
  plugins: [],
};
