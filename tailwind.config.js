/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,css,scss}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        signup: "url('/signup.png')",
      },
      colors: {
        "dark-gray": "#E2E0E0",
        "gray-color": "#A5A5A5",
        "light-color": "#9E9292",
        "background-color": "#F5F1EE",
        "dark-brown": "#311f13",
        "yellow-color": "#FFD43B",
        "light-brown": "#A46016",
      },
      screens: {
        'min767': { 'min': '767px' },
      },
    },
  },
  plugins: [],
  important: true,
  darkMode: "class",
};
