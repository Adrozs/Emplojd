/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: "#0783F6",
        customCyan: 'rgb(202, 129, 237)',
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
        "gradient-to-r-custom":
          "linear-gradient(140deg, #4086C6, #CA81ED)",
      },
    },
  },
  plugins: [],
};
