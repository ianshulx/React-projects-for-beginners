/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        backdrop: "#121212",
        primary: "#1ed760",
        highlight: "#1fdf64",
        active: "#282828",
        link: "#b3b3b3",
        footer: "#181818",
      },
      fontSize: {
        s: "0.813rem",
      },
      boxShadow: {
        spotify: "0 2px 4px 0 rgb(0 0 0 / 20%)",
      },
      transitionProperty: {
        play: "opacity, bottom",
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    // require("@tailwindcss/line-clamp"),
  ],
};
