module.exports = {
  content: [
    "./src/**/*.{html,ts,css,scss}",
    "node_modules/ngx-toastr/toastr.css"
  ],
  theme: {
    extend: {
      //--------------------
      animation: {
        'progress': 'progress 3s linear forwards',
      },
      keyframes: {
        progress: {
          '0%': { width: '100%' },
          '100%': { width: '0%' },
        }
      },
      //---------------------
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
    },

  },
  plugins: [],
  important: false,
  darkMode: "class",
};
