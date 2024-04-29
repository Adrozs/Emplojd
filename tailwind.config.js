/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: "#0783F6",
      },
      fontFamily: {
        Glockenspiel: ["Glockenspiel", "Inter"],
      },
      screens: {
        sm: "640px", // Small devices (phones, 640px and up)
        md: "768px",
        ls: "900px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
  plugins: [],
};
