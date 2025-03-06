/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-dark": "linear-gradient(135deg, #011f30, #003E4F)",
      },
    },
  },
  plugins: [],
};