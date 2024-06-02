/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/swiper/swiper-bundle.min.css",
    "node_modules/swiper/swiper.min.css",
    "node_modules/swiper/css",
    "node_modules/swiper/css/pagination",
    "node_modules/swiper/css/free-mode",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        customBlue: "#0EA5E9",
        customCyan: "rgb(202, 129, 237)",
        customDarkBg: "#2C3135",
        typingColor: "#075985",
        typingColorDark: "#059669",
      },
      fontFamily: {
        Glockenspiel: ["Glockenspiel", "Inter"],
      },
      screens: {
        sm: "400px",
        md: "500px",
        ls: "800px",
        lg: "1200px",
        xl: "1600px",
        xxl: "2400px",
      },
      backgroundImage: {
        "gradient-to-tl-purple-sky":
          "linear-gradient(to top left, #9D4EDD, #00BFFF)",
        "gradient-to-140-sky-violet":
          "linear-gradient(140deg, #4086C6, #CA81ED)",
        "dark-gradient-to-140-purple-slate":
          "linear-gradient(140deg, #5B21B6, #6B7280)",
      },
    },
  },
  plugins: [],
};
